# WPS API 全面测试报告 v2

**测试时间**: 2026-03-08 23:32:59
**测试环境**: 生产环境 (https://openapi.wps.cn)
**应用ID**: AK20260308LGOUTU
**授权范围**: 全部权限

---

## 一、测试概览

| 类别 | 测试数 | 通过 | 失败 | 通过率 |
|------|--------|------|------|--------|
| 通讯录 | 2 | 1 | 1 | 50% |
| 用户组 | 1 | 1 | 0 | 100% |
| 消息与会话 | 1 | 1 | 0 | 100% |
| 待办 | 3 | 3 | 0 | 100% |
| 日历 | 2 | 0 | 2 | 0% |
| 会议 | 1 | 0 | 1 | 0% |
| 云文档 | 1 | 0 | 1 | 0% |
| 审批 | 1 | 0 | 1 | 0% |
| 公告 | 1 | 0 | 1 | 0% |
| 会议室 | 1 | 0 | 1 | 0% |
| **总计** | **14** | **6** | **8** | **43%** |

---

## 二、可用 API 列表

### 通讯录 API
| API | 方法 | 权限 | 响应时间 |
|-----|------|------|----------|
| `/v7/users` | GET | kso.contact.read | 418ms |

### 用户组 API
| API | 方法 | 权限 | 响应时间 |
|-----|------|------|----------|
| `/v7/groups` | GET | kso.group.read | 305ms |

### 消息与会话 API
| API | 方法 | 权限 | 响应时间 |
|-----|------|------|----------|
| `/v7/chats` | GET | kso.chat.read | 199ms |

### 待办 API
| API | 方法 | 权限 | 响应时间 |
|-----|------|------|----------|
| `/v7/todo/tasks` | POST | kso.task.readwrite | 225ms |
| `/v7/todo/tasks/{id}` | GET | kso.task.read | 193ms |
| `/v7/todo/tasks/{id}/update` | POST | kso.task.readwrite | 216ms |

---

## 三、不可用 API 及原因

### 权限拒绝 (403000001)

| API | 方法 | 权限 | 错误信息 |
|-----|------|------|----------|
| `/v7/depts/root` | GET | kso.contact.read | Permission denied |
| `/v7/calendars` | GET | kso.calendar.read | 权限不足 |
| `/v7/calendars/primary` | GET | kso.calendar.read | 权限不足 |
| `/v7/drives` | GET | kso.drive.readwrite | 权限不足 |

### 参数或业务错误 (400000003)

| API | 方法 | 权限 | 错误信息 |
|-----|------|------|----------|
| `/v7/meetings` | GET | kso.meeting.read | 业务参数错误 |
| `/v7/workflow/approval_defines` | GET | kso.workflow.read | 业务参数错误 |
| `/v7/announce/announces` | GET | kso.announce.read | 业务参数错误 |
| `/v7/meeting_rooms` | GET | kso.meeting_rooms.read | 业务参数错误 |

---

## 四、权限状态汇总

### 已授权且可用权限

| 权限 | 状态 | 说明 |
|------|------|------|
| `kso.contact.read` | ⚠️ 部分可用 | 用户列表可用，部门接口受限 |
| `kso.group.read` | ✅ 可用 | 完全正常 |
| `kso.chat.read` | ✅ 可用 | 完全正常 |
| `kso.task.read` | ✅ 可用 | 完全正常 |
| `kso.task.readwrite` | ✅ 可用 | 完全正常 |

### 已授权但不可用权限

| 权限 | 错误码 | 可能原因 |
|------|--------|----------|
| `kso.calendar.read` | 403000001 | 企业未开通日历功能 |
| `kso.meeting.read` | 400000003 | 企业未开通会议功能 |
| `kso.drive.readwrite` | 403000001 | 企业未开通云文档功能 |
| `kso.workflow.read` | 400000003 | 企业未开通审批功能 |
| `kso.announce.read` | 400000003 | 企业未开通公告功能 |
| `kso.meeting_rooms.read` | 400000003 | 企业未开通会议室功能 |

---

## 五、问题分析

### 1. 部门 API 权限问题
- **现象**: `/v7/users` 可用，但 `/v7/depts/root` 返回 Permission denied
- **原因**: 可能是企业组织架构配置问题，或需要额外权限范围
- **建议**: 联系 WPS 确认部门 API 权限要求

### 2. 扩展功能不可用
- **现象**: 日历、会议、云文档、审批、公告、会议室 API 全部失败
- **错误码分析**:
  - `403000001`: 权限不足 - 企业可能未订阅相关服务
  - `400000003`: 业务参数错误 - 可能是企业未开通相关功能模块
- **建议**: 确认企业是否已开通 WPS 全套协作功能

---

## 六、测试结论

### 可用功能 (6/14)
- 用户管理 (部分)
- 用户组管理
- 会话管理
- 待办任务管理 (完整)

### 不可用功能 (8/14)
- 部门管理
- 日历
- 会议
- 云文档
- 审批
- 公告
- 会议室

### 总体评估
核心 API 中，用户、用户组、会话、待办功能正常可用。部门 API 和扩展 API 由于权限或企业功能配置原因暂时不可用，建议与 WPS 技术支持确认具体开通条件。
