# WPS API 全面测试报告

**测试时间**: 2026-03-08 23:32:59
**测试环境**: 生产环境
**应用ID**: AK20260308LGOUTU

## 测试概览

| 类别 | 测试数 | 通过 | 失败 | 跳过 |
|------|--------|------|------|------|
| 通讯录 | 2 | 1 | 1 | 0 |
| 用户组 | 1 | 1 | 0 | 0 |
| 消息与会话 | 1 | 1 | 0 | 0 |
| 待办 | 3 | 3 | 0 | 0 |
| 日历 | 2 | 0 | 2 | 0 |
| 会议 | 1 | 0 | 1 | 0 |
| 云文档 | 1 | 0 | 1 | 0 |
| 审批 | 1 | 0 | 1 | 0 |
| 公告 | 1 | 0 | 1 | 0 |
| 会议室 | 1 | 0 | 1 | 0 |
| **总计** | **14** | **6** | **8** | **0** |

## 详细结果

### kso


#### ✅ GET /v7/users?status=active&status=notactive&page_size=5
- 名称: 查询企业下所有用户
- 权限: kso.contact.read
- 状态码: 200
- 响应时间: 418ms

#### ❌ GET /v7/depts/root
- 名称: 获取根部门
- 权限: kso.contact.read
- 状态码: 403
- 响应时间: 185ms
- 错误码: 403000001
- 错误信息: Permission denied

#### ✅ GET /v7/groups?page_size=5
- 名称: 获取用户组列表
- 权限: kso.group.read
- 状态码: 200
- 响应时间: 305ms

#### ✅ GET /v7/chats?page_size=5
- 名称: 获取用户会话列表
- 权限: kso.chat.read
- 状态码: 200
- 响应时间: 199ms

#### ✅ POST /v7/todo/tasks
- 名称: 创建待办任务
- 权限: kso.task.readwrite
- 状态码: 200
- 响应时间: 225ms

#### ✅ GET /v7/todo/tasks/5780371
- 名称: 查询待办任务
- 权限: kso.task.read
- 状态码: 200
- 响应时间: 193ms

#### ✅ POST /v7/todo/tasks/5780371/update
- 名称: 更新待办任务
- 权限: kso.task.readwrite
- 状态码: 200
- 响应时间: 216ms

#### ❌ GET /v7/calendars
- 名称: 查询日历列表
- 权限: kso.calendar.read
- 状态码: 403
- 响应时间: 181ms
- 错误码: 403000001
- 错误信息: undefined

#### ❌ GET /v7/calendars/primary
- 名称: 查询主日历信息
- 权限: kso.calendar.read
- 状态码: 403
- 响应时间: 162ms
- 错误码: 403000001
- 错误信息: undefined

#### ❌ GET /v7/meetings?start_time=0&end_time=1772983978739
- 名称: 获取会议列表
- 权限: kso.meeting.read
- 状态码: 403
- 响应时间: 145ms
- 错误码: 400000003
- 错误信息: undefined

#### ❌ GET /v7/drives
- 名称: 获取盘列表
- 权限: kso.drive.readwrite
- 状态码: 403
- 响应时间: 185ms
- 错误码: 403000001
- 错误信息: undefined

#### ❌ GET /v7/workflow/approval_defines?page_size=5
- 名称: 查询审批定义列表
- 权限: kso.workflow.read
- 状态码: 403
- 响应时间: 164ms
- 错误码: 400000003
- 错误信息: undefined

#### ❌ GET /v7/announce/announces?page_size=5
- 名称: 查询公告列表
- 权限: kso.announce.read
- 状态码: 403
- 响应时间: 153ms
- 错误码: 400000003
- 错误信息: undefined

#### ❌ GET /v7/meeting_rooms?page_size=5
- 名称: 查询会议室列表
- 权限: kso.meeting_rooms.read
- 状态码: 403
- 响应时间: 165ms
- 错误码: 400000003
- 错误信息: undefined

## 权限状态

| 权限 | 状态 | 备注 |
|------|------|------|
| kso.contact.read | ✅ | Permission denied |
| kso.group.read | ✅ | 可用 |
| kso.chat.read | ✅ | 可用 |
| kso.task.readwrite | ✅ | 可用 |
| kso.task.read | ✅ | 可用 |
| kso.calendar.read | ❌ | 不可用 |
| kso.meeting.read | ❌ | 不可用 |
| kso.drive.readwrite | ❌ | 不可用 |
| kso.workflow.read | ❌ | 不可用 |
| kso.announce.read | ❌ | 不可用 |
| kso.meeting_rooms.read | ❌ | 不可用 |

## 问题汇总

共发现 8 个失败的 API 调用:

- **GET /v7/depts/root**: Permission denied
- **GET /v7/calendars**: undefined
- **GET /v7/calendars/primary**: undefined
- **GET /v7/meetings?start_time=0&end_time=1772983978739**: undefined
- **GET /v7/drives**: undefined
- **GET /v7/workflow/approval_defines?page_size=5**: undefined
- **GET /v7/announce/announces?page_size=5**: undefined
- **GET /v7/meeting_rooms?page_size=5**: undefined
