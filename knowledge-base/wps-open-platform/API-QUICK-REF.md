# WPS Open Platform API 快速索引

> 生成时间: 2026-03-08
> API 总数: 327

---

## 核心功能 (当前可用权限)

### 通讯录 API (39个)
**权限**: `kso.contact.read` / `kso.contact.readwrite`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/v7/users` | GET | 查询企业下所有用户 |
| `/v7/users/{user_id}` | GET | 查询指定用户 |
| `/v7/users/batch_read` | POST | 批量查询用户 |
| `/v7/users/by_phones` | POST | 根据手机号获取用户 |
| `/v7/users/by_emails` | POST | 根据邮箱获取用户 |
| `/v7/users/create` | POST | 创建用户 |
| `/v7/users/{user_id}/update` | POST | 更新用户 |
| `/v7/users/{user_id}/delete` | POST | 删除用户 |
| `/v7/depts/root` | GET | 获取根部门 |
| `/v7/depts/{dept_id}/children` | GET | 查询子部门列表 |
| `/v7/depts/{dept_id}/members` | GET | 查询部门下用户列表 |

📁 完整文档: `知识库/docs/通讯录/`

---

### 消息与会话 API (30个)
**权限**: `kso.chat.read` / `kso.chat.readwrite` / `kso.chat_message.readwrite`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/v7/messages/create` | POST | 发送消息 ⭐ |
| `/v7/messages/batch_create` | POST | 批量发送消息 |
| `/v7/messages/{message_id}/recall` | POST | 撤回消息 |
| `/v7/chats` | GET | 获取用户会话列表 |
| `/v7/chats/{chat_id}` | GET | 获取会话信息 |
| `/v7/chats/create` | POST | 创建会话 |
| `/v7/chats/get_p2p_chat` | GET | 根据userid获取会话信息 |
| `/v7/chats/{chat_id}/members` | GET | 获取群聊成员列表 |

📁 完整文档: `知识库/docs/消息与会话/`

---

### 待办 API (18个)
**权限**: `kso.task.read` / `kso.task.readwrite`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/v7/todo/tasks` | POST | 创建待办任务 ⭐ |
| `/v7/todo/tasks/{task_id}` | GET | 查询待办任务 |
| `/v7/todo/tasks/{task_id}/update` | POST | 更新待办任务 ⭐ |
| `/v7/todo/tasks/batch_create` | POST | 批量创建待办任务 |
| `/v7/todo/tasks/batch_delete` | POST | 批量删除待办任务 |
| `/v7/todo/personal_tasks` | POST | 创建个人待办 |
| `/v7/todo/personal_tasks/batch_get` | POST | 获取个人待办列表 |

📁 完整文档: `知识库/docs/待办/`

---

### 认证与授权 API (9个)
**权限**: 无 (认证类)

| 端点 | 方法 | 说明 |
|------|------|------|
| `/oauth2/token` | POST | 获取访问凭证 ⭐ |
| `/v7/users/current` | GET | 获取用户信息 |
| `/v7/users/batch_logout` | POST | 用户登出 |

📁 完整文档: `知识库/docs/认证与授权/`

---

## 扩展功能 (待权限生效)

### 日历 API (37个)
**权限**: `kso.calendar.read` / `kso.calendar.readwrite` / `kso.calendar_events.readwrite`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/v7/calendars` | GET | 查询日历列表 |
| `/v7/calendars/primary` | GET | 查询主日历信息 |
| `/v7/calendars/{calendar_id}/events/create` | POST | 创建日程 |
| `/v7/calendars/{calendar_id}/events` | GET | 查询日程列表 |
| `/v7/free_busy_list` | GET | 查询主日历日程忙闲 |

---

### 会议 API (19个)
**权限**: `kso.meeting.read` / `kso.meeting.readwrite`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/v7/meetings` | GET | 获取会议列表 |
| `/v7/meetings/{meeting_id}` | GET | 获取会议详情 |
| `/v7/meetings/{meeting_id}/participants` | GET | 获取会议参会人列表 |
| `/v7/meetings/{meeting_id}/end` | POST | 结束会议 |

---

### 云文档 API (70个)
**权限**: `kso.drive.readwrite` / `kso.file.readwrite` / `kso.file.search`

| 端点 | 方法 | 说明 |
|------|------|------|
| `/v7/drives` | GET | 获取盘列表 |
| `/v7/drives/{drive_id}/files/{parent_id}/children` | GET | 获取子文件列表 |
| `/v7/drives/{drive_id}/files/{parent_id}/create` | POST | 新建文件（夹） |
| `/v7/drives/{drive_id}/files/{file_id}/delete` | POST | 删除文件 |
| `/v7/drives/{drive_id}/files/{file_id}/download` | GET | 获取文件下载信息 |
| `/v7/files/search` | GET | 文件搜索 |

---

## 其他功能

### 用户组 API (18个)
**权限**: `kso.group.read` / `kso.group.readwrite`

### 审批 API (32个)
**权限**: `kso.workflow_approval_*`

### 会议室 API (28个)
**权限**: `kso.meeting_rooms.read` / `kso.meeting_rooms.readwrite`

### 公告 API (4个)
**权限**: `kso.announce.read`

### 打卡 API (8个)
**权限**: `kso.attendance_*`

---

## 快速查找

### 按端点路径查找
```
/v7/users          → 通讯录: 查询用户列表
/v7/groups         → 用户组: 获取用户组列表
/v7/chats          → 消息: 获取会话列表
/v7/messages       → 消息: 发送消息
/v7/todo/tasks     → 待办: 创建待办任务
/v7/calendars      → 日历: 查询日历列表
/v7/meetings       → 会议: 获取会议列表
/v7/drives         → 云文档: 获取盘列表
/v7/files          → 云文档: 文件操作
/oauth2/token      → 认证: 获取访问凭证
```

### 按权限查找
```
kso.contact.*       → 通讯录 API
kso.group.*         → 用户组 API
kso.chat.*          → 会话 API
kso.chat_message.*  → 消息 API
kso.task.*          → 待办 API
kso.calendar.*      → 日历 API
kso.meeting.*       → 会议 API
kso.file.*          → 云文档 API
```

---

## 文档位置

| 类型 | 路径 |
|------|------|
| 完整文档 | `knowledge-base/wps-open-platform/docs/` |
| 合并文档 | `knowledge-base/wps-open-platform/docs/_all-docs-combined.md` |
| API索引 | `knowledge-base/wps-open-platform/api-index.json` |
| 快速参考 | `knowledge-base/wps-open-platform/API-QUICK-REF.md` |

---

**维护者**: PM Agent
**最后更新**: 2026-03-08
