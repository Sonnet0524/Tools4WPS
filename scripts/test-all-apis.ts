#!/usr/bin/env bun

import { TokenManager, Signature } from "../src/auth";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const APP_ID = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const APP_KEY = process.env.WPS_APP_KEY || "743c057b97227a473d404c1eb7fcebda";
const BASE_URL = "https://openapi.wps.cn";

interface TestResult {
  name: string;
  endpoint: string;
  method: string;
  permission: string;
  status: "success" | "failed" | "skipped";
  statusCode?: number;
  responseTime?: number;
  error?: string;
  errorCode?: number;
  errorMsg?: string;
  dataPreview?: string;
  rawData?: unknown;
}

interface TestSummary {
  total: number;
  success: number;
  failed: number;
  skipped: number;
  byCategory: Record<string, { total: number; success: number; failed: number; skipped: number }>;
  permissions: Record<string, { tested: boolean; working: boolean; error?: string }>;
}

const results: TestResult[] = [];
const summary: TestSummary = {
  total: 0,
  success: 0,
  failed: 0,
  skipped: 0,
  byCategory: {},
  permissions: {},
};

async function callApi(
  tokenManager: TokenManager,
  signature: Signature,
  method: string,
  uri: string,
  body?: object
): Promise<{ code?: number; msg?: string; data?: unknown; responseTime: number; statusCode: number }> {
  const startTime = Date.now();
  const token = await tokenManager.getToken();
  const contentType = "application/json";
  const requestBody = body ? JSON.stringify(body) : "";
  const { date, authorization } = signature.generateSignature({
    method,
    uri,
    contentType,
    body: requestBody,
  });

  const url = `${BASE_URL}${uri}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": contentType,
      "X-Kso-Date": date,
      "X-Kso-Authorization": authorization,
      Authorization: `Bearer ${token}`,
    },
    body: requestBody || undefined,
  });

  const responseTime = Date.now() - startTime;
  const statusCode = response.status;
  const text = await response.text();

  try {
    const data = JSON.parse(text);
    return {
      code: data.code,
      msg: data.msg,
      data: data.data,
      responseTime,
      statusCode,
    };
  } catch {
    return {
      code: -1,
      msg: text.substring(0, 200),
      responseTime,
      statusCode,
    };
  }
}

async function testAPI(
  name: string,
  endpoint: string,
  method: string,
  permission: string,
  category: string,
  tokenManager: TokenManager,
  signature: Signature,
  body?: object
): Promise<TestResult> {
  if (!summary.byCategory[category]) {
    summary.byCategory[category] = { total: 0, success: 0, failed: 0, skipped: 0 };
  }
  summary.byCategory[category].total++;
  summary.total++;

  if (!summary.permissions[permission]) {
    summary.permissions[permission] = { tested: false, working: false };
  }
  summary.permissions[permission].tested = true;

  console.log(`  ${method} ${endpoint}`);

  try {
    const result = await callApi(tokenManager, signature, method, endpoint, body);

    const testResult: TestResult = {
      name,
      endpoint,
      method,
      permission,
      status: result.code === 0 ? "success" : "failed",
      statusCode: result.statusCode,
      responseTime: result.responseTime,
      errorCode: result.code,
      errorMsg: result.msg,
      dataPreview: result.data ? JSON.stringify(result.data).substring(0, 100) : undefined,
      rawData: result.data,
    };

    if (result.code === 0) {
      summary.success++;
      summary.byCategory[category].success++;
      summary.permissions[permission].working = true;
      console.log(`    ✅ 成功 (${result.responseTime}ms)`);
    } else {
      summary.failed++;
      summary.byCategory[category].failed++;
      summary.permissions[permission].error = result.msg;
      console.log(`    ❌ 失败: ${result.code} - ${result.msg}`);
    }

    results.push(testResult);
    return testResult;
  } catch (error) {
    summary.failed++;
    summary.byCategory[category].failed++;
    const testResult: TestResult = {
      name,
      endpoint,
      method,
      permission,
      status: "failed",
      error: String(error),
    };
    results.push(testResult);
    console.log(`    ❌ 异常: ${error}`);
    return testResult;
  }
}

async function runPhase1(tokenManager: TokenManager, signature: Signature) {
  console.log("\n📋 Phase 1: 核心 API\n");
  console.log("通讯录 API:");
  
  await testAPI("查询企业下所有用户", "/v7/users?status=active&status=notactive&page_size=5", "GET", "kso.contact.read", "通讯录", tokenManager, signature);
  await testAPI("获取根部门", "/v7/depts/root", "GET", "kso.contact.read", "通讯录", tokenManager, signature);
  
  const rootDeptResult = results.find(r => r.endpoint === "/v7/depts/root");
  if (rootDeptResult?.status === "success") {
    await testAPI("查询子部门列表", "/v7/depts/0/children", "GET", "kso.contact.read", "通讯录", tokenManager, signature);
    await testAPI("查询部门下用户列表", "/v7/depts/0/members?page_size=5", "GET", "kso.contact.read", "通讯录", tokenManager, signature);
  }

  console.log("\n用户组 API:");
  await testAPI("获取用户组列表", "/v7/groups?page_size=5", "GET", "kso.group.read", "用户组", tokenManager, signature);

  console.log("\n消息与会话 API:");
  await testAPI("获取用户会话列表", "/v7/chats?page_size=5", "GET", "kso.chat.read", "消息与会话", tokenManager, signature);

  console.log("\n待办 API:");
  
  let testExecutor = "test_user_id";
  const usersResult = results.find(r => r.endpoint.includes("/v7/users"));
  if (usersResult?.status === "success" && usersResult.rawData) {
    try {
      const usersData = usersResult.rawData as any;
      if (usersData?.items && usersData.items.length > 0) {
        testExecutor = usersData.items[0].id;
        console.log(`    📍 使用用户ID: ${testExecutor}`);
      }
    } catch (e) {
      console.log("    ⚠️  无法解析用户ID");
    }
  }
  
  const taskResult = await testAPI(
    "创建待办任务",
    "/v7/todo/tasks",
    "POST",
    "kso.task.readwrite",
    "待办",
    tokenManager,
    signature,
    {
      title: {
        prefix: "[测试]",
        subject: "API测试待办"
      },
      description: "这是一个测试待办任务",
      executor: testExecutor,
      due_time: Date.now() + 3600000,
    }
  );

  if (taskResult.status === "success" && taskResult.rawData) {
    try {
      const taskData = taskResult.rawData as any;
      const taskId = taskData?.task_id;
      if (taskId) {
        await testAPI("查询待办任务", `/v7/todo/tasks/${taskId}`, "GET", "kso.task.read", "待办", tokenManager, signature);
        await testAPI("更新待办任务", `/v7/todo/tasks/${taskId}/update`, "POST", "kso.task.readwrite", "待办", tokenManager, signature, { status: "finish" });
      }
    } catch (e) {
      console.log("    ⚠️  无法解析任务ID，跳过后续测试");
    }
  }
}

async function runPhase2(tokenManager: TokenManager, signature: Signature) {
  console.log("\n📋 Phase 2: 扩展 API\n");

  console.log("日历 API:");
  await testAPI("查询日历列表", "/v7/calendars", "GET", "kso.calendar.read", "日历", tokenManager, signature);
  await testAPI("查询主日历信息", "/v7/calendars/primary", "GET", "kso.calendar.read", "日历", tokenManager, signature);

  console.log("\n会议 API:");
  await testAPI("获取会议列表", "/v7/meetings?start_time=0&end_time=" + Date.now(), "GET", "kso.meeting.read", "会议", tokenManager, signature);

  console.log("\n云文档 API:");
  await testAPI("获取盘列表", "/v7/drives", "GET", "kso.drive.readwrite", "云文档", tokenManager, signature);
}

async function runPhase3(tokenManager: TokenManager, signature: Signature) {
  console.log("\n📋 Phase 3: 其他 API\n");

  console.log("审批 API:");
  await testAPI("查询审批定义列表", "/v7/workflow/approval_defines?page_size=5", "GET", "kso.workflow.read", "审批", tokenManager, signature);

  console.log("\n公告 API:");
  await testAPI("查询公告列表", "/v7/announce/announces?page_size=5", "GET", "kso.announce.read", "公告", tokenManager, signature);

  console.log("\n会议室 API:");
  await testAPI("查询会议室列表", "/v7/meeting_rooms?page_size=5", "GET", "kso.meeting_rooms.read", "会议室", tokenManager, signature);
}

function generateReport(): string {
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0];

  let report = `# WPS API 全面测试报告

**测试时间**: ${dateStr} ${timeStr}
**测试环境**: 生产环境
**应用ID**: ${APP_ID}

## 测试概览

| 类别 | 测试数 | 通过 | 失败 | 跳过 |
|------|--------|------|------|------|
`;

  for (const [category, stats] of Object.entries(summary.byCategory)) {
    report += `| ${category} | ${stats.total} | ${stats.success} | ${stats.failed} | ${stats.skipped} |\n`;
  }

  report += `| **总计** | **${summary.total}** | **${summary.success}** | **${summary.failed}** | **${summary.skipped}** |\n`;

  report += `\n## 详细结果\n`;

  const byCategory = results.reduce((acc, r) => {
    if (!acc[r.permission.split(".")[0]]) acc[r.permission.split(".")[0]] = [];
    acc[r.permission.split(".")[0]].push(r);
    return acc;
  }, {} as Record<string, TestResult[]>);

  for (const [category, categoryResults] of Object.entries(byCategory)) {
    report += `\n### ${category}\n\n`;
    for (const result of categoryResults) {
      const icon = result.status === "success" ? "✅" : "❌";
      report += `\n#### ${icon} ${result.method} ${result.endpoint}\n`;
      report += `- 名称: ${result.name}\n`;
      report += `- 权限: ${result.permission}\n`;
      if (result.statusCode) report += `- 状态码: ${result.statusCode}\n`;
      if (result.responseTime) report += `- 响应时间: ${result.responseTime}ms\n`;
      if (result.errorCode !== undefined && result.errorCode !== 0) {
        report += `- 错误码: ${result.errorCode}\n`;
        report += `- 错误信息: ${result.errorMsg}\n`;
      }
      if (result.error) report += `- 异常: ${result.error}\n`;
    }
  }

  report += `\n## 权限状态\n\n`;
  report += `| 权限 | 状态 | 备注 |\n`;
  report += `|------|------|------|\n`;

  for (const [permission, status] of Object.entries(summary.permissions)) {
    const icon = status.working ? "✅" : "❌";
    const note = status.error || (status.working ? "可用" : "不可用");
    report += `| ${permission} | ${icon} | ${note} |\n`;
  }

  report += `\n## 问题汇总\n\n`;

  const failedTests = results.filter(r => r.status === "failed");
  if (failedTests.length > 0) {
    report += `共发现 ${failedTests.length} 个失败的 API 调用:\n\n`;
    for (const test of failedTests) {
      report += `- **${test.method} ${test.endpoint}**: ${test.errorMsg || test.error}\n`;
    }
  } else {
    report += `所有测试的 API 均正常工作。\n`;
  }

  return report;
}

async function main() {
  console.log("🚀 WPS API 全面测试\n");
  console.log("=".repeat(60));

  console.log("\n📝 初始化认证模块...");
  const tokenManager = TokenManager.getInstance({
    appId: APP_ID,
    appKey: APP_KEY,
    baseUrl: BASE_URL,
  });
  const signature = new Signature(APP_ID, APP_KEY);

  console.log("✅ 认证模块初始化完成\n");

  await runPhase1(tokenManager, signature);
  await runPhase2(tokenManager, signature);
  await runPhase3(tokenManager, signature);

  console.log("\n" + "=".repeat(60));
  console.log("\n📊 生成测试报告...");

  const report = generateReport();
  const reportsDir = join(process.cwd(), "reports", "test");
  if (!existsSync(reportsDir)) {
    mkdirSync(reportsDir, { recursive: true });
  }
  const reportPath = join(reportsDir, `api-full-test-${new Date().toISOString().split("T")[0].replace(/-/g, "")}.md`);
  writeFileSync(reportPath, report);

  console.log(`✅ 测试报告已保存: ${reportPath}\n`);

  console.log("=".repeat(60));
  console.log("\n🏁 测试完成\n");
  console.log(`📊 测试统计:`);
  console.log(`   - 总测试数: ${summary.total}`);
  console.log(`   - 通过: ${summary.success}`);
  console.log(`   - 失败: ${summary.failed}`);
  console.log(`   - 跳过: ${summary.skipped}\n`);
}

main().catch(console.error);
