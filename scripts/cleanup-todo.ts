#!/usr/bin/env bun
/**
 * 待办任务清理脚本
 * 
 * 由于 WPS 待办 API 不提供列举所有待办的接口，
 * 此脚本需要手动提供待办 ID 列表进行批量删除。
 * 
 * 使用方法:
 * 1. 在 WPS 客户端中找到测试创建的待办任务
 * 2. 记录待办任务的 ID
 * 3. 修改下面的 taskIds 数组
 * 4. 运行: bun scripts/cleanup-todo.ts
 */

import { TodoTool } from "../src/tools/todo";
import { TokenManager } from "../src/auth";

// ============================================
// 配置区域 - 修改这里的 taskIds
// ============================================
const taskIdsToDelete: string[] = [
  // 在这里添加要删除的待办任务ID
  // 例如: "task-123456", "task-789012"
];
// ============================================

const appId = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const appKey = process.env.WPS_APP_KEY || "743c057b97227a473d404c1eb7fcebda";
const baseUrl = process.env.WPS_BASE_URL || "https://openapi.wps.cn";

async function cleanupTasks() {
  if (taskIdsToDelete.length === 0) {
    console.log("⚠️  请先在脚本中配置要删除的待办任务ID");
    console.log("编辑 scripts/cleanup-todo.ts 文件，修改 taskIdsToDelete 数组");
    process.exit(1);
  }

  console.log(`🗑️  准备删除 ${taskIdsToDelete.length} 个待办任务...`);

  try {
    TokenManager.resetInstance();
    const todoTool = new TodoTool({ appId, appKey, baseUrl });

    await todoTool.batchDeleteTasks(taskIdsToDelete);

    console.log("✅ 待办任务删除成功！");
    console.log(`已删除任务ID: ${taskIdsToDelete.join(", ")}`);
  } catch (error) {
    console.error("❌ 删除失败:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (import.meta.main) {
  cleanupTasks();
}

export { cleanupTasks };
