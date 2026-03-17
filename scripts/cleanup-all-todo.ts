#!/usr/bin/env bun
/**
 * 待办任务批量清理脚本
 * 
 * 功能:
 * 1. 查询个人待办列表
 * 2. 筛选测试待办（包含"[测试]"标题的）
 * 3. 批量删除
 * 
 * 使用方法: bun scripts/cleanup-all-todo.ts
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

async function batchDeleteTasks(taskIds: string[]): Promise<void> {
  if (taskIds.length === 0) return;

  const response = await makeRequest(
    'POST',
    '/v7/todo/tasks/batch_delete',
    JSON.stringify({ ids: taskIds })
  ) as { code: number; msg: string };

  if (response.code !== 0) {
    throw new Error(`Failed to delete tasks: ${response.msg}`);
  }
}

async function cleanupAllTestTodos() {
  console.log("🧹 开始清理测试待办...\n");

  try {
    TokenManager.resetInstance();

    // 获取所有待办（包括已完成和未完成）
    console.log("📋 正在获取待办列表...");
    const { tasks: allTasks } = await getPersonalTasks(undefined, 500);
    console.log(`✅ 共找到 ${allTasks.length} 个待办\n`);

    if (allTasks.length === 0) {
      console.log("✨ 没有发现任何待办，无需清理");
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
      const status = task.my_finished_status === 'finish' ? '✅ 已完成' : '⏳ 未完成';
      console.log(`   ${index + 1}. ${title} (${status})`);
    });
    console.log();

    // 筛选待清理的测试待办（包括已完成和未完成的）
    const tasksToDelete = testTasks;

    if (tasksToDelete.length === 0) {
      console.log("✨ 没有找到测试待办，无需清理");
      return;
    }

    console.log(`🗑️  准备删除 ${tasksToDelete.length} 个测试待办...`);
    console.log("⚠️  此操作不可恢复！\n");

    // 分批删除（每次最多20个）
    const batchSize = 20;
    const taskIds = tasksToDelete.map(t => t.id);
    let deletedCount = 0;

    for (let i = 0; i < taskIds.length; i += batchSize) {
      const batch = taskIds.slice(i, i + batchSize);
      console.log(`   删除批次 ${Math.floor(i / batchSize) + 1}/${Math.ceil(taskIds.length / batchSize)} (${batch.length} 个)...`);
      
      try {
        await batchDeleteTasks(batch);
        deletedCount += batch.length;
        console.log(`   ✅ 已删除 ${batch.length} 个`);
      } catch (error) {
        console.error(`   ❌ 删除失败:`, error instanceof Error ? error.message : error);
      }
    }

    console.log(`\n🎉 清理完成！共删除 ${deletedCount}/${tasksToDelete.length} 个测试待办`);

    // 如果有未删除的，显示原因
    const failedCount = tasksToDelete.length - deletedCount;
    if (failedCount > 0) {
      console.log(`⚠️  ${failedCount} 个待办删除失败，请检查日志`);
    }

  } catch (error) {
    console.error("\n❌ 清理过程出错:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.main) {
  // 添加确认提示
  console.log("=".repeat(60));
  console.log("⚠️  警告：此脚本将删除所有包含[测试]的待办任务！");
  console.log("=".repeat(60));
  console.log();
  
  // 自动执行（不等待用户输入，因为Bun脚本无法交互）
  console.log("🚀 3秒后开始清理...");
  console.log("   按 Ctrl+C 取消\n");
  
  setTimeout(() => {
    cleanupAllTestTodos();
  }, 3000);
}

export { cleanupAllTestTodos, getPersonalTasks, batchDeleteTasks };
