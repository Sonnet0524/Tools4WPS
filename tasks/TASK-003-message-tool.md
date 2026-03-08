# 任务: 开发消息 Tool

> 任务ID: TASK-003
> 优先级: P0
> 状态: ✅ 已完成
> 创建时间: 2026-03-08
> 完成时间: 2026-03-08
> 依赖: TASK-001

---

## 任务目标

开发消息 Tool，实现发送消息功能。

---

## 技术要求

### 文件结构

```
src/tools/
├── message.ts      # 消息 Tool
└── types.ts        # 类型定义 (已有)
```

### 功能需求

#### Tool 定义

```typescript
interface MessageTool {
  // 发送消息给用户
  sendToUser(params: {
    userId: string;
    content: string;
  }): Promise<MessageResult>;
  
  // 发送消息到会话
  sendToChat(params: {
    chatId: string;
    content: string;
  }): Promise<MessageResult>;
  
  // 获取会话列表
  getChats(params: {
    chatType?: 'p2p' | 'group';
    pageSize?: number;
  }): Promise<ChatListResult>;
  
  // 获取会话详情
  getChat(chatId: string): Promise<Chat>;
}
```

#### 数据类型

```typescript
interface MessageResult {
  messageId: string;
  chatId: string;
  ctime: number;
}

interface Chat {
  id: string;
  name?: string;
  type: 'p2p' | 'group';
  status: 'active' | 'inactive';
  ctime: number;
}

interface ChatListResult {
  items: Chat[];
  nextPageToken?: string;
}
```

---

## API 参考

### 发送消息

```http
POST /v7/messages/create
Content-Type: application/json

{
  "type": "text",
  "receiver": {
    "receiver_id": "{user_id}",
    "type": "user" | "chat"
  },
  "content": {
    "text": {
      "content": "消息内容",
      "type": "plain"
    }
  }
}
```

**重要**: `text.type` 必须为 `"plain"`！

### 获取会话列表

```
GET /v7/chats?chat_type={type}&page_size={size}
```

---

## 验收标准

- [x] 发送消息给用户正常
- [x] 发送消息到会话正常
- [x] 获取会话列表正常
- [x] 获取会话详情正常
- [x] 单元测试通过
- [x] 集成测试通过

---

## 参考资料

- API 文档: `knowledge-base/wps-open-platform/api/message/`
- 内容格式: `knowledge-base/wps-open-platform/api/message/content-structure.md`

---

## 预计工时

3-4 小时

---

## 输出要求

完成后提交:
1. 代码文件
2. 测试文件
3. 开发报告
