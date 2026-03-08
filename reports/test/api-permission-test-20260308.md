# WPS API 权限测试报告

> 测试时间：2026-03-08
> 应用 ID：AK20260308LGOUTU

---

## ✅ 已有权限（可用）

| 权限 | API | 状态 |
|------|-----|------|
| `kso.contact.read` | 用户列表、用户详情 | ✅ 成功 |
| `kso.group.read` | 用户组列表 | ✅ 成功 |
| `kso.chat_message.readwrite` | 发送消息 | ✅ 成功 |
| `kso.chat.read` | 会话列表 | ✅ 成功 |

### 可用功能

- ✅ 获取用户列表
- ✅ 获取用户详情
- ✅ 获取用户组列表
- ✅ 发送消息给用户
- ✅ 获取会话列表

---

## ❌ 权限不足（需申请）

| 权限 | 说明 | 所需权限 scope |
|------|------|----------------|
| 云文档 | 驱动盘、文件操作 | `kso.drive.readwrite` |
| 日历 | 日程管理 | `kso.calendar.readwrite` |
| 会议 | 会议管理 | `kso.meeting.readwrite` |
| 部门详情 | 部门批量查询 | `kso.contact.readwrite` |

---

## 📊 API 端点总结

### 已验证可用的端点

```
GET  /v7/users                    # 用户列表
GET  /v7/users/{user_id}          # 用户详情
GET  /v7/groups                   # 用户组列表
POST /v7/messages/create          # 发送消息
GET  /v7/chats                    # 会话列表
POST /oauth2/token                # 获取 Token
```

### 发送消息的正确格式

```json
{
  "type": "text",
  "receiver": {
    "receiver_id": "用户ID",
    "type": "user"
  },
  "content": {
    "text": {
      "content": "消息内容",
      "type": "plain"
    }
  }
}
```

---

## 🔧 建议申请的权限

如需完整功能，请在开发者后台申请：

| 优先级 | 权限 | 用途 |
|--------|------|------|
| P0 | `kso.drive.readwrite` | 云文档读写 |
| P0 | `kso.contact.readwrite` | 部门管理 |
| P1 | `kso.calendar.readwrite` | 日程管理 |
| P1 | `kso.meeting.readwrite` | 会议管理 |

---

## 📝 测试用户

| 姓名 | User ID | 角色 | 手机 |
|------|---------|------|------|
| 宋戈 | `y8EVn2k` | super-admin | 13980051892 |
| Fiona | `VqygzoY` | normal | 13689092006 |

---

**测试结论**：基础通讯录和消息功能已可用，可开始开发相关 Tools。
