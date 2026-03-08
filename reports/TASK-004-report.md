# 开发报告: 待办 Tool (TASK-004)

## 任务概述

开发待办 Tool，实现创建和更新待办任务功能。

## 完成情况

### 文件变更

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/tools/todo.ts` | 新建 | 待办 Tool 实现 |
| `src/tools/types.ts` | 更新 | 添加待办相关类型 |
| `src/tools/index.ts` | 更新 | 导出 TodoTool 和相关类型 |
| `tests/todo.test.ts` | 新建 | 测试文件 |

### 功能实现

#### 1. TodoTool 类

```typescript
class TodoTool {
  // 创建待办任务
  async createTask(params: CreateTaskParams): Promise<TodoResult>;
  
  // 查询待办任务
  async getTask(taskId: string): Promise<TodoTask>;
  
  // 更新待办任务
  async updateTask(params: UpdateTaskParams): Promise<void>;
  
  // 批量创建待办
  async batchCreateTasks(tasks: CreateTaskParams[]): Promise<TodoResult[]>;
  
  // 批量删除待办
  async batchDeleteTasks(taskIds: string[]): Promise<void>;
}
```

#### 2. 类型定义

```typescript
interface TodoTask {
  taskId: string;
  executor: string;
  title: TodoTaskTitle;
  description?: string;
  dueTime?: number;
  status: 'todo' | 'finish';
  priority?: number;
  createTime?: number;
  finishTime?: number;
  creator?: string;
  link?: TodoTaskLink;
  notifyConfig?: TodoNotifyConfig;
}

interface CreateTaskParams {
  executor: string;
  title: TodoTaskTitle;
  description?: string;
  dueTime?: number;
  priority?: number;
  link?: TodoTaskLink;
  reminders?: number[];
}

interface UpdateTaskParams {
  taskId: string;
  status?: 'todo' | 'finish';
  description?: string;
  dueTime?: number;
  priority?: number;
  title?: TodoTaskTitle;
}
```

### API 端点

| API | 方法 | 功能 |
|-----|------|------|
| `/v7/todo/tasks` | POST | 创建待办任务 |
| `/v7/todo/tasks/{task_id}` | GET | 获取待办任务详情 |
| `/v7/todo/tasks/{task_id}/update` | POST | 更新待办任务 |
| `/v7/todo/tasks/batch_create` | POST | 批量创建待办 |
| `/v7/todo/tasks/batch_delete` | POST | 批量删除待办 |

### 测试结果

```
tests/todo.test.ts:
  22 pass
  1 skip
  56 expect() calls

全部测试:
  77 pass
  1 skip
  0 fail
  167 expect() calls
```

## 验收标准

- [x] 创建待办任务正常
- [x] 更新待办任务正常
- [x] 设置截止时间正常
- [x] 设置提醒正常
- [x] 单元测试通过
- [x] 集成测试通过

## 使用示例

```typescript
import { TodoTool } from "./tools";

const todoTool = new TodoTool({
  appId: "YOUR_APP_ID",
  appKey: "YOUR_APP_KEY",
});

// 创建待办
const result = await todoTool.createTask({
  executor: "user-id",
  title: {
    prefix: "[项目]",
    subject: "完成任务A",
  },
  description: "详细描述",
  dueTime: Date.now() + 86400000,
  priority: 1,
  reminders: [60, 30],
});

// 查询待办
const task = await todoTool.getTask(result.taskId);

// 更新待办
await todoTool.updateTask({
  taskId: result.taskId,
  status: 'finish',
});

// 批量创建
const results = await todoTool.batchCreateTasks([
  { executor: "user1", title: { prefix: "[P]", subject: "任务1" } },
  { executor: "user2", title: { prefix: "[P]", subject: "任务2" } },
]);

// 批量删除
await todoTool.batchDeleteTasks([result.taskId]);
```

## 开发时间

约 30 分钟

## 备注

- 遵循 contacts.ts 的实现模式
- 使用 TokenManager 和 Signature 进行认证
- 参数验证完善，错误处理健全
- API 响应字段使用 snake_case，转换为 camelCase
