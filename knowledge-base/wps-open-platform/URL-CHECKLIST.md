# WPS开放平台完整文档爬取清单

## 📋 基于学习地图导航的URL清单

### 一、了解阶段（基础概念）

#### 1. 开放平台概述
- [ ] https://open.wps.cn/documents/app-integration-dev/guide/start/intro
  - 保存为：guide/what-is-platform.md

#### 2. 应用体系
- [ ] https://open.wps.cn/documents/app-integration-dev/guide/start/app-system
  - 保存为：guide/app-system.md

#### 3. 应用类型与形态
- [x] https://open.wps.cn/documents/app-integration-dev/guide/start/app-type
  - 已采集：guide/app-types.md

#### 4. 用户身份体系
- [ ] https://open.wps.cn/documents/app-integration-dev/guide/start/identity
  - 保存为：guide/identity-system.md

#### 5. 应用权限体系
- [x] https://open.wps.cn/documents/app-integration-dev/guide/start/permission
  - 已采集：guide/permission-system.md

---

### 二、准备阶段（创建应用）

#### 1. 成为开发者
- [ ] https://open.wps.cn/documents/app-integration-dev/guide/start/become-developer
  - 保存为：guide/become-developer.md

#### 2. 企业自建应用
- [x] https://open.wps.cn/documents/app-integration-dev/guide/self-app/summary
  - 已采集：guide/self-app-summary.md

- [ ] https://open.wps.cn/documents/app-integration-dev/guide/self-built/overview
  - 保存为：guide/self-built-overview.md

- [ ] https://open.wps.cn/documents/app-integration-dev/guide/self-built/create
  - 保存为：guide/create-self-app.md

- [ ] https://open.wps.cn/documents/app-integration-dev/guide/self-built/config
  - 保存为：guide/config-app-info.md

- [ ] https://open.wps.cn/documents/app-integration-dev/guide/self-built/ability
  - 保存为：guide/config-app-ability.md

- [ ] https://open.wps.cn/documents/app-integration-dev/guide/self-built/apply
  - 保存为：guide/apply-app-publish.md

- [ ] https://open.wps.cn/documents/app-integration-dev/guide/self-built/audit
  - 保存为：guide/audit-app.md

#### 3. 第三方应用
- [ ] https://open.wps.cn/documents/app-integration-dev/guide/third-party/overview
  - 保存为：guide/third-party-overview.md

---

### 三、开发阶段（对接能力）

#### 1. API调用流程
- [x] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/flow
  - 已采集：api/flow.md

#### 2. 通用参数
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/common-params
  - 保存为：api/common-params.md

#### 3. 认证与授权
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/auth
  - 保存为：auth/authentication.md

- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/oauth
  - 保存为：auth/oauth.md

#### 4. 签名说明
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/sign
  - 保存为：auth/signature.md

#### 5. 通用错误码
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/error-codes
  - 保存为：api/error-codes.md

---

### 四、API模块文档

#### 核心API
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/contacts
  - 保存为：api/contacts.md

- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/files
  - 保存为：api/files.md

- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/sheets
  - 保存为：api/sheets.md

- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/message
  - 保存为：api/message.md

- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/flow
  - 保存为：api/flow-api.md

#### 其他API模块
- [ ] 待办：https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/todo
- [ ] 审批：https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/approval
- [ ] 日历：https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/calendar
- [ ] 会议：https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/meeting
- [ ] 邮箱：https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/mail

---

### 五、应用开发文档

#### 1. WPS协作卡片
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/client/card/overview
  - 保存为：development/cards-overview.md

#### 2. WPS协作机器人
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/client/bot/overview
  - 保存为：development/bots-overview.md

#### 3. 工作台小组件
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/client/widget/overview
  - 保存为：development/widgets-overview.md

#### 4. 网页应用
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/client/webapp/overview
  - 保存为：development/webapp-overview.md

#### 5. 多维表格
- [ ] https://open.wps.cn/documents/app-integration-dev/wps365/client/bitable/overview
  - 保存为：development/bitable-overview.md

---

## 🎯 爬取优先级

### P0 - 必须立即爬取（内容不完整）
1. 开放平台概述
2. 应用体系
3. 用户身份体系
4. 成为开发者
5. 企业自建应用详细步骤（创建、配置、上架、审核）

### P1 - 核心文档
1. 认证与授权详细文档
2. 签名机制
3. 核心API详细文档（通讯录、文档、表格、消息）

### P2 - 其他API模块
1. 待办、审批、日历等API
2. 其他应用开发文档

---

## 📊 统计

- **总URL数**：约40+
- **已采集**：6份
- **待采集**：34+份

---

**维护者**：PM Agent  
**创建时间**：2026-03-08
