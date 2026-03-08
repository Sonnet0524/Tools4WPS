# 任务: 开发待办 Tool

> 任务ID: TASK-004
> 优先级: P1
> 状态: ✅ 已完成
> 创建时间: 2026-03-08
> 完成时间: 2026-03-08
> 依赖: TASK-001

---

## 任务目标

开发待办 Tool，实现创建和更新待办功能。

---

## 技术要求

### 文件结构

```
src/tools/
├── todo.ts         # 待办 Tool
└── types.ts        # 类型定义 (已有)
```

### 功能需求

#### Tool 定义

```typescript
interface TodoTool {
  // 创建待办任务
  createTask(params: {
    executor: string;        // 执行人 ID
    title: {
      prefix: string;        // 前缀
      subject: string;       // 主题
    };
    description?: string;    // 描述
    dueTime?: number;        // 截止时间 (毫秒)
    priority?: number;       // 优先级
    link?: {                 // 跳转链接
      pcUrl: string;
      mobileUrl: string;
    };
    reminders?: number[];    // 提醒时间 (提前分钟)
  }): Promise<TodoResult>;
  
  // 更新待办任务
  updateTask(params: {
    taskId: string;
    status?: 'todo' | 'finish';
    description?: string;
    dueTime?: number;
  }): Promise<void>;
}
```

#### 数据类型

```typescript
interface TodoResult {
  taskId: string;
}

interface TodoTask {
  taskId: string;
  executor: string;
  title: {
    prefix: string;
    subject: string;
  };
  description?: string;
  dueTime?: number;
  status: 'todo' | 'finish';
  priority?: number;
}
```

---

## API 参考

### 创建待办

```http
POST /v7/todo/tasks
Content-Type: application/json

{
  "executor": "用户ID",
  "title": {
    "prefix": "前缀",
    "subject": "主题"
  },
  "description": "描述",
  "due_time": 截止时间毫秒,
  "priority": 1,
  "status": "todo",
  "link": {
    "pc_url": "链接",
    "mobile_url": "链接"
  },
  "notify_config": {
    "switch": true,
    "reminders": [
      { "before_due_time": 60 }
    ]
  }
}
```

### 更新待办

```http
POST /v7/todo/tasks/{task_id}/update
Content-Type: application/json

{
  "status": "finish",
  "description": "更新描述"
}
```

---

## 验收标准

- [ ] 创建待办任务正常
- [ ] 更新待办任务正常
- [ ] 设置截止时间正常
- [ ] 设置提醒正常
- [ ] 单元测试通过
- [ ] 集成测试通过

---

## 参考资料

- API 文档: `knowledge-base/wps-open-platform/api/todo/`

---

## 预计工时

2-3 小时

---

## 输出要求

完成后提交:
1. 代码文件
2. 测试文件
3. 开发报告
