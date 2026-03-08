# WPS API 深度研究报告

> 研究日期：2026-03-08
> 研究目标：深入了解 WPS API 能力，为架构设计提供依据

---

## 一、API 总览

### 1.1 WPS365 业务域

WPS365 包含近 **20 个业务域**，核心业务域如下：

| 业务域 | 描述 | 核心能力 |
|--------|------|----------|
| **通讯录** | 企业账号体系 | 部门/用户 CRUD、用户组管理、变更事件 |
| **云文档** | 在线文档管理 | 文件上传下载、文件夹管理、权限管理、分享 |
| **消息与会话** | 即时消息 | 群聊管理、发送消息、机器人、会话管理 |
| **工作台** | 企业门户 | 三方系统上架、工作台管理 |
| **日历** | 日程管理 | 日程 CRUD、日程共享 |
| **待办** | 任务管理 | 待办事项管理 |
| **邮箱** | 企业邮箱 | 邮件发送、邮件管理 |
| **会议** | 视频会议 | 会议创建、会议管理 |

### 1.2 API 端点

```
Base URL: https://openapi.wps.cn
API 版本: v7
```

---

## 二、核心 API 接口

### 2.1 通讯录 API

| API 名称 | 方法 | 路径 | 权限 |
|----------|------|------|------|
| 创建部门 | POST | `/v7/depts/create` | 查询和管理通讯录信息 |
| 创建用户 | POST | `/v7/users/create` | 查询和管理通讯录信息 |
| 将用户加入部门 | POST | `/v7/depts/{dept_id}/members/{user_id}/create` | 查询和管理通讯录信息 |
| 查询部门下用户列表 | GET | `/v7/depts/{dept_id}/members` | 查询通讯录信息 |

### 2.2 云文档 API

| API 名称 | 方法 | 路径 | 权限 |
|----------|------|------|------|
| 新建驱动盘 | POST | `/v7/drives/create` | 管理驱动盘 |
| 新建文件（夹） | POST | `/v7/drives/{drive_id}/files/{parent_id}/create` | 查询和管理文件 |
| 获取文件下载信息 | GET | `/v7/drives/{drive_id}/files/{file_id}/download` | 查询文件 |
| 请求文件上传信息 | POST | `/v7/drives/{drive_id}/files/{parent_id}/request_upload` | 查询和管理文件 |

### 2.3 消息与会话 API

| API 名称 | 方法 | 路径 | 权限 |
|----------|------|------|------|
| 发送消息 | POST | `/v7/messages/create` | 查询和管理会话消息 |
| 创建会话 | POST | `/v7/chats/create` | 查询和管理会话 |
| 批量添加群成员 | POST | `/v7/chats/{chat_id}/members/batch_create` | 查询和管理会话 |
| 创建部门群 | POST | `/v7/chats/create_dept_chat` | 读写部门群 |

---

## 三、认证与授权

### 3.1 访问凭证类型

| 凭证类型 | 使用场景 | 数据范围 |
|----------|----------|----------|
| **用户授权凭证** | 操作用户数据资源 | 受限于用户本身权限 |
| **应用授权凭证** | 操作应用自身资源 | 受限于应用数据权限范围 |

### 3.2 选择建议

- 操作用户数据（如在用户空间创建文档）→ **用户授权凭证**
- 操作应用资源（如在应用目录创建文档）→ **应用授权凭证**

---

## 四、签名机制

### 4.1 KSO-1 签名算法

签名仅在「开发者后台-安全设置-接口签名」开启时需要。

#### Header 参数

| Header 名称 | 必填 | 说明 |
|-------------|------|------|
| Content-Type | 是 | 如：application/json |
| X-Kso-Date | 是 | RFC1121 格式日期 |
| X-Kso-Authorization | 是 | KSO-1 签名值 |

#### 签名计算

```
signature = HMAC-SHA256(
  secretKey,
  "KSO-1" + Method + RequestURI + ContentType + KsoDate + sha256(RequestBody)
)
```

### 4.2 TypeScript 实现（待开发）

```typescript
// 需要实现
async function kso1Sign(
  method: string,
  uri: string,
  contentType: string,
  requestBody: string,
  accessKey: string,
  secretKey: string
): Promise<{ date: string; authorization: string }>
```

---

## 五、MCP 集成

### 5.1 MCP 协议架构

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Host      │────▶│   Client    │────▶│   Server    │
│ (LLM App)   │     │ (Protocol)  │     │ (WPS API)   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 5.2 已支持的 MCP Server

| MCP Server | 端点 URL |
|------------|----------|
| 日历 | `https://openapi.wps.cn/mcp/v2/kso-calendar/message` |

### 5.3 调用方式

```typescript
// HTTP Header
{
  "Authorization": "Bearer {access_token}"
}
```

---

## 六、错误码

### 6.1 响应格式

```json
{
  "code": 0,        // 0 成功，非 0 失败
  "msg": "success",
  "data": {},
  "more": {}        // 递归定义更多错误
}
```

### 6.2 常见错误码

| 错误码 | 说明 |
|--------|------|
| 0 | 成功 |
| 400000001 | 流量超出 |
| 400000002 | 请求参数格式有误 |
| 400000003 | 请求参数取值无效 |
| 403000001 | 无权限 |
| 429000001 | 请求太频繁 |
| 500000004 | 服务端其他错误 |

完整错误码列表见：`knowledge-base/wps-open-platform/wps365/server/errorcode.md`

---

## 七、待深入研究的内容

### 7.1 需要补充的 API 文档

以下 API 文档需要登录 WPS 开放平台后查看：

| 业务域 | 文档 URL | 状态 |
|--------|----------|------|
| 通讯录详细 API | `/v7/depts/*`, `/v7/users/*` | ❌ 需登录 |
| 云文档详细 API | `/v7/drives/*`, `/v7/files/*` | ❌ 需登录 |
| 表格操作 API | 智能表格相关 | ❌ 需登录 |
| 日历 API | `/v7/calendars/*` | ❌ 需登录 |
| 待办 API | `/v7/todos/*` | ❌ 需登录 |

### 7.2 需要确认的问题

1. **具体接口参数**：每个 API 的请求/响应参数结构
2. **权限细化**：每个 API 需要的具体权限 scope
3. **速率限制**：API 调用的频率限制
4. **回调事件**：支持的事件推送机制

---

## 八、下一步建议

### 8.1 方案 A：注册开发者账号

1. 在 WPS 开放平台注册开发者账号
2. 创建测试应用
3. 获取完整的 API 文档访问权限
4. 在 API 调试平台测试接口

### 8.2 方案 B：基于现有信息启动开发

基于已有信息，可以先开发：

1. **认证模块**：access_token 获取、签名计算
2. **基础 Tool**：基于已知 API 结构开发
3. **MCP Server**：基于现有 MCP 协议实现

### 8.3 推荐路径

```
1. 注册开发者账号 → 获取完整 API 文档
2. 设计认证模块（核心基础）
3. 开发 Phase 1 Tools（通讯录、文档、表格）
4. 集成 MCP 协议
```

---

## 九、技术栈确认

| 项目 | 选择 |
|------|------|
| 语言 | TypeScript 5.x |
| 运行时 | Bun 1.1+ |
| 包管理 | bun |
| MCP SDK | @modelcontextprotocol/sdk |
| 参数验证 | zod |
| HTTP 客户端 | Bun 内置 fetch |

---

## 十、参考资料

| 文档 | 路径 |
|------|------|
| WPS365 API 介绍 | `knowledge-base/wps-open-platform/wps365/server/introduce.md` |
| 签名说明 | `knowledge-base/wps-open-platform/wps365/server/signature-description.md` |
| 错误码 | `knowledge-base/wps-open-platform/wps365/server/errorcode.md` |
| MCP 使用指南 | `knowledge-base/wps-open-platform/mcp-server/use-guide.md` |
| 认证授权概述 | `knowledge-base/wps-open-platform/wps365/server/certification-authorization-summary.md` |

---

**研究者**: PM Agent  
**最后更新**: 2026-03-08
