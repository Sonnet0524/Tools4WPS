#!/usr/bin/env bun
/**
 * 待办任务批量完成脚本
 * 
 * 功能:
 * 1. 查询个人待办列表
 * 2. 筛选测试待办（包含"[测试]"标题的）
 * 3. 批量标记为已完成
 * 
 * 使用方法: bun scripts/finish-all-todo.ts
 */

import { TokenManager, Signature } from "../src/auth";

const appId = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const appKey = process.env.WPS_APP_KEY || "743c057b97227a473d404c1eb7fcebda";
const baseUrl = process.env.WPS_BASE_URL || "https://openapi.wps.cn";

interface PersonalTask {
  id: string;
  create_time: number;
  creator: string;
  due_time: number;
  my_finished_status: 'todo' | 'finish';
  title: {
    prefix: string;
    subject: string;
  };
}

async function makeRequest(
  method: string,
  uri: string,
  body?: string
): Promise<unknown> {
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  const token = await tokenManager.getToken();
  const signatureResult = signature.generateSignature({
    method,
    uri,
    contentType: 'application/json',
    body,
  });

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Kso-Date': signatureResult.date,
    'X-Kso-Authorization': signatureResult.authorization,
  };

  const url = `${baseUrl}${uri}`;
  
  const response = await fetch(url, {
    method,
    headers,
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API request failed: ${response.status} - ${text}`);
  }

  return await response.json();
}

async function getPersonalTasks(
  status?: 'todo' | 'finish',
  pageSize: number = 500
): Promise<{ tasks: PersonalTask[]; next_page_token: string }> {
  const body: Record<string, unknown> = {
    page_size: pageSize,
  };

  if (status) {
    body.status = status;
  }

  const response = await makeRequest(
    'POST',
    '/v7/todo/personal_tasks/batch_get_simple',
    JSON.stringify(body)
  ) as { 
    code: number; 
    msg: string; 
    data: { 
      tasks: PersonalTask[]; 
      next_page_token: string;
      total: number;
    } 
  };

  if (response.code !== 0) {
    throw new Error(`Failed to get tasks: ${response.msg}`);
  }

  return {
    tasks: response.data.tasks || [],
    next_page_token: response.data.next_page_token,
  };
}

async function updateTaskStatus(taskId: string, status: 'finish' | 'todo'): Promise<void> {
  const response = await makeRequest(
    'POST',
    `/v7/todo/tasks/${taskId}/update`,
    JSON.stringify({ status })
  ) as { code: number; msg: string };

  if (response.code !== 0) {
    throw new Error(`Failed to update task: ${response.msg}`);
  }
}

async function finishAllTestTodos() {
  console.log("✅ 开始标记测试待办为已完成...\n");

  try {
    TokenManager.resetInstance();

    // 获取所有未完成的待办
    console.log("📋 正在获取未完成的待办列表...");
    const { tasks: allTasks } = await getPersonalTasks('todo', 500);
    console.log(`✅ 共找到 ${allTasks.length} 个未完成待办\n`);

    if (allTasks.length === 0) {
      console.log("✨ 没有未完成的待办");
      return;
    }

    // 筛选测试待办（包含"[测试]"前缀的）
    const testTasks = allTasks.filter(task => 
      task.title?.prefix?.includes('[测试]') || 
      task.title?.subject?.includes('测试')
    );

    console.log(`🎯 找到 ${testTasks.length} 个测试待办：`);
    testTasks.forEach((task, index) => {
      const title = `${task.title?.prefix || ''} ${task.title?.subject || ''}`.trim();
      console.log(`   ${index + 1}. ${title}`);
    });
    console.log();

    if (testTasks.length === 0) {
      console.log("✨ 没有找到测试待办");
      return;
    }

    console.log(`📝 正在标记 ${testTasks.length} 个测试待办为已完成...\n`);

    // 逐个标记为完成
    let finishedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < testTasks.length; i++) {
      const task = testTasks[i];
      const title = `${task.title?.prefix || ''} ${task.title?.subject || ''}`.trim();
      
      console.log(`   [${i + 1}/${testTasks.length}] ${title}...`);
      
      try {
        await updateTaskStatus(task.id, 'finish');
        finishedCount++;
        console.log(`       ✅ 已标记完成`);
      } catch (error) {
        failedCount++;
        console.error(`       ❌ 失败:`, error instanceof Error ? error.message : error);
      }
      
      // 添加小延迟，避免API限流
      if (i < testTasks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`\n🎉 完成！共标记 ${finishedCount}/${testTasks.length} 个测试待办为已完成`);

    if (failedCount > 0) {
      console.log(`⚠️  ${failedCount} 个待办标记失败`);
    }

  } catch (error) {
    console.error("\n❌ 过程出错:", error instanceof Error ? error.message : error);
    
    // 如果是权限错误，给出友好提示
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('403') || errorMessage.includes('user')) {
      console.error("\n⚠️ 权限错误说明：");
      console.error("   此API需要用户身份才能访问个人待办");
      console.error("   应用身份无法直接操作用户的个人待办列表");
      console.error("\n💡 建议：");
      console.error("   请在WPS客户端中手动完成这些待办");
      console.error("   或者联系管理员开通相应权限");
    }
    
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.main) {
  console.log("=".repeat(60));
  console.log("✅ 此脚本将标记所有包含[测试]的待办为已完成");
  console.log("=".repeat(60));
  console.log();
  
  console.log("🚀 3秒后开始...");
  console.log("   按 Ctrl+C 取消\n");
  
  setTimeout(() => {
    finishAllTestTodos();
  }, 3000);
}

export { finishAllTestTodos, getPersonalTasks, updateTaskStatus };
