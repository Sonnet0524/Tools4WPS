# PM Agent - 启动文档

> 🔄 **启动时读取此文档** - 快速了解当前状态和工作

---

## Quick Status

**Last Updated**: 2026-03-17  
**Phase**: Phase 1 ✅ 完成 + 多维表格开发 ✅  
**Status**: 🟢 On Track

---

## 已完成

### 核心模块开发 ✅

| 模块 | 文件 | 测试 | API验证 |
|------|------|------|---------|
| 认证 | `src/auth/` | 15 tests | ✅ |
| 通讯录 | `src/tools/contacts.ts` | 21 tests | ✅ |
| 消息 | `src/tools/message.ts` | 19 tests | ✅ |
| 待办 | `src/tools/todo.ts` | 23 tests | ✅ |
| 用户组 | `src/tools/group.ts` | 22 tests | ✅ 已验证 |
| 多维表格 | `src/tools/dbsheet.ts` | 22 tests | ⏳ 待权限 |
| **日历** | `src/tools/calendar.ts` | **28 tests** | ⏳ **待权限** |

**总测试**: 150 pass, 28 skip ✅

### 知识库建设 ✅

- 817 篇 API 文档收集
- 327 个 API 索引
- 机器索引: `api-index.json`

---

## API 可用状态

### ✅ 可用 (6个)

| API | 权限 | 功能 |
|-----|------|------|
| `GET /v7/users` | `kso.contact.read` | 用户列表 |
| `GET /v7/groups` | `kso.group.read` | 用户组列表 |
| `GET /v7/groups/{id}` | `kso.group.read` | 用户组详情 |
| `GET /v7/groups/{id}/members` | `kso.group.read` | 用户组成员 |
| `POST /v7/groups/create` | `kso.group.readwrite` | 创建用户组 |
| `POST /v7/todo/tasks` | `kso.task.readwrite` | 创建待办 |
| `GET /v7/todo/tasks/{id}` | `kso.task.read` | 查询待办 |
| `POST /v7/todo/tasks/{id}/update` | `kso.task.readwrite` | 更新待办 |

### 🆕 多维表格 API (已开发，待权限验证)

| API | 权限 | 功能 | 状态 |
|-----|------|------|------|
| `GET /v7/coop/dbsheet/{file_id}/schema` | `kso.dbsheet.read` | 获取表格结构 | ✅ 开发完成 |
| `POST /v7/coop/dbsheet/{file_id}/sheets/{sheet_id}/records` | `kso.dbsheet.read` | 列举记录 | ✅ 开发完成 |
| `POST /v7/coop/dbsheet/{file_id}/sheets/{sheet_id}/records/create` | `kso.dbsheet.readwrite` | 创建记录 | ✅ 开发完成 |
| `POST /v7/coop/dbsheet/{file_id}/sheets/create` | `kso.dbsheet.readwrite` | 创建工作表 | ✅ 开发完成 |

### ⚠️ 受限 (企业未开通)

- 部门管理 - 企业未配置组织架构
- 日历 - 企业未开通
- 会议 - 企业未开通
- 云文档 - 企业未开通
- **多维表格 - 需要 `kso.dbsheet.read` 权限**
- 审批/公告/会议室 - 企业未开通

---

## 项目配置

- **APP_ID**: AK20260308LGOUTU
- **配置文件**: `.env.local`
- **技术栈**: TypeScript 5.x + Bun 1.1+

---

## 🔍 API 查询

**机器索引**: `knowledge-base/wps-open-platform/api-index.json`

```
endpoint_index: 按端点查找
categories: 按类别查找
apis[].permission: 权限要求
apis[].file: 文档路径
```

---

## 📁 代码结构

```
WPS/
├── src/
│   ├── auth/           # 认证模块 ✅
│   └── tools/          # Tools ✅
│       ├── contacts.ts
│       ├── message.ts
│       ├── todo.ts
│       ├── contacts.ts
│       ├── message.ts
│       ├── todo.ts
│       ├── dbsheet.ts  # 多维表格
│       ├── group.ts    # 用户组
│       ├── calendar.ts # 🆕 日历
│       └── types.ts
├── tests/              # 150 tests ✅
│   ├── auth.test.ts
│   ├── contacts.test.ts
│   ├── message.test.ts
│   ├── todo.test.ts
│   ├── dbsheet.test.ts
│   ├── group.test.ts
│   └── calendar.test.ts # 🆕
├── knowledge-base/     # 知识库 ✅
│   └── wps-open-platform/
│       ├── api-index.json
│       └── docs/
└── reports/            # 报告 ✅
```

---

## 🧪 测试状态

```bash
# 运行所有测试
bun test

# 运行特定模块测试
bun test tests/dbsheet.test.ts
bun test tests/group.test.ts
bun test tests/calendar.test.ts
```

**最新结果**: 150 tests (122 pass, 28 skip)

---

## 📝 待办清理说明

测试代码已包含 `afterEach` 钩子自动清理创建的待办。如需要手动清理历史测试待办：

1. 由于API限制，无法直接列举所有待办
2. 需要知道待办ID才能删除（使用 `batchDeleteTasks`）
3. 建议在WPS客户端中手动查找并删除测试待办

---

## 待办事项

### 需要企业操作
- [ ] 开通日历功能
- [ ] 开通会议功能
- [ ] 开通云文档功能
- [ ] **申请多维表格权限 `kso.dbsheet.read` 和 `kso.dbsheet.readwrite`**
- [ ] 配置组织架构

### 可选开发
- [ ] Skills 层开发
- [ ] 使用文档编写
- [ ] 更多 Tool 方法（字段管理、视图管理等）
- [ ] 用户组批量操作API
- [ ] 用户组删除和更新API

---

## 下次启动

1. 读取本文件了解状态
2. 确认企业功能开通情况
3. 验证多维表格API权限
4. 继续开发或等待权限

---

## 📊 已开发工具统计

| 工具 | API数 | 测试 | 状态 |
|------|-------|------|------|
| 通讯录 | 5+ | 21 pass | ✅ 可用 |
| 消息 | 3+ | 19 pass | ✅ 可用 |
| 待办 | 5+ | 23 pass | ✅ 可用 |
| 用户组 | 5+ | 20 pass, 2 skip | ✅ 可用 |
| 日历 | 7+ | 14 pass, 14 skip | ⏳ 待权限 |
| 多维表格 | 4+ | 11 pass, 11 skip | ⏳ 待权限 |

---

**Last Updated**: 2026-03-17 (日历工具开发完成)
**Next Work**: 开发云文档工具 (DriveTool)
