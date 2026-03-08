# 任务: 全面测试 WPS API

> 任务ID: TASK-005
> 优先级: P0
> 状态: ✅ 已完成
> 创建时间: 2026-03-08
> 完成时间: 2026-03-08
> 依赖: TASK-001 (认证模块)

---

## 任务目标

对 WPS 开放平台所有可用 API 进行系统性测试，验证：
1. 权限是否已生效
2. API 调用是否正常
3. 响应数据结构是否符合预期

---

## 测试范围

### Phase 1: 核心 API (优先)

#### 通讯录 API
- [ ] `GET /v7/users` - 查询用户列表
- [ ] `GET /v7/users/{user_id}` - 查询指定用户
- [ ] `POST /v7/users/batch_read` - 批量查询用户
- [ ] `GET /v7/depts/root` - 获取根部门
- [ ] `GET /v7/depts/{dept_id}/children` - 查询子部门
- [ ] `GET /v7/depts/{dept_id}/members` - 查询部门成员
- [ ] `GET /v7/groups` - 获取用户组列表
- [ ] `GET /v7/groups/{group_id}` - 获取用户组详情
- [ ] `GET /v7/groups/{group_id}/members` - 获取用户组成员

#### 消息与会话 API
- [ ] `GET /v7/chats` - 获取会话列表
- [ ] `GET /v7/chats/{chat_id}` - 获取会话信息
- [ ] `GET /v7/chats/{chat_id}/members` - 获取群成员列表
- [ ] `POST /v7/messages/create` - 发送消息 (测试用)
- [ ] `GET /v7/chats/get_p2p_chat` - 获取单聊会话

#### 待办 API
- [ ] `POST /v7/todo/tasks` - 创建待办任务
- [ ] `GET /v7/todo/tasks/{task_id}` - 查询待办任务
- [ ] `POST /v7/todo/tasks/{task_id}/update` - 更新待办任务
- [ ] `POST /v7/todo/personal_tasks` - 创建个人待办
- [ ] `POST /v7/todo/personal_tasks/batch_get` - 获取个人待办列表

### Phase 2: 扩展 API

#### 日历 API
- [ ] `GET /v7/calendars` - 查询日历列表
- [ ] `GET /v7/calendars/primary` - 查询主日历
- [ ] `GET /v7/calendars/{calendar_id}/events` - 查询日程列表
- [ ] `POST /v7/calendars/{calendar_id}/events/create` - 创建日程

#### 会议 API
- [ ] `GET /v7/meetings` - 获取会议列表
- [ ] `GET /v7/meetings/{meeting_id}` - 获取会议详情

#### 云文档 API
- [ ] `GET /v7/drives` - 获取盘列表
- [ ] `GET /v7/drives/{drive_id}/files/{parent_id}/children` - 获取子文件
- [ ] `GET /v7/files/search` - 文件搜索

### Phase 3: 其他 API

#### 审批 API
- [ ] `GET /v7/workflow/approval_defines` - 查询审批定义列表
- [ ] `GET /v7/workflow/approval_instances` - 查询审批实例

#### 公告 API
- [ ] `GET /v7/announce/announces` - 查询公告列表

#### 会议室 API
- [ ] `GET /v7/meeting_rooms` - 查询会议室列表

---

## 测试方法

### 使用现有认证模块

```typescript
import { TokenManager, Signature } from './src/auth';

// 配置
const config = {
  appId: process.env.WPS_APP_ID,
  appKey: process.env.WPS_APP_KEY,
  baseUrl: 'https://openapi.wps.cn'
};

// 获取 Token
const tokenManager = TokenManager.getInstance(config);
const token = await tokenManager.getToken();

// 生成签名
const signature = new Signature(config.appId, config.appKey);
```

### 测试脚本结构

```typescript
// scripts/test-all-apis.ts

interface TestResult {
  api: string;
  method: string;
  status: 'success' | 'failed' | 'skipped';
  statusCode?: number;
  responseTime?: number;
  error?: string;
  data?: any;
}

async function testAPI(
  method: string,
  endpoint: string,
  body?: any
): Promise<TestResult> {
  // 实现测试逻辑
}
```

---

## 输出要求

### 测试报告格式

创建 `reports/test/api-full-test-YYYYMMDD.md`:

```markdown
# WPS API 全面测试报告

**测试时间**: YYYY-MM-DD HH:MM
**测试环境**: 生产环境
**应用ID**: AK20260308LGOUTU

## 测试概览

| 类别 | 测试数 | 通过 | 失败 | 跳过 |
|------|--------|------|------|------|
| 通讯录 | 9 | ? | ? | ? |
| 消息与会话 | 5 | ? | ? | ? |
| 待办 | 5 | ? | ? | ? |
| 日历 | 4 | ? | ? | ? |
| 会议 | 2 | ? | ? | ? |
| 云文档 | 3 | ? | ? | ? |
| 其他 | 4 | ? | ? | ? |

## 详细结果

### 通讯录 API

#### ✅ GET /v7/users
- 状态码: 200
- 响应时间: 120ms
- 数据量: 50 条用户记录

#### ❌ POST /v7/users/create
- 状态码: 403
- 错误: 权限不足

...

## 权限状态

| 权限 | 状态 |
|------|------|
| kso.contact.read | ✅ 可用 |
| kso.contact.readwrite | ❌ 无权限 |
| ...

## 建议

1. [建议内容]
2. [建议内容]
```

---

## 验收标准

- [ ] 所有核心 API 测试完成
- [ ] 测试报告生成
- [ ] 权限状态确认
- [ ] 问题分类记录

---

## 预计工时

1-2 小时

---

## 注意事项

1. 消息发送测试使用测试内容，避免干扰正常业务
2. 待办创建测试后需要清理测试数据
3. 记录所有权限相关的错误码
4. 对于写操作，先测试读取权限是否足够

---

**创建者**: PM Agent
**分配给**: Dev Agent
