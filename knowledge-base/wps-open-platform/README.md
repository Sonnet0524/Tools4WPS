# WPS开放平台知识库

> 采集时间：2026-03-08
> 采集范围：WPS开放平台核心文档

## 📚 知识库结构

```
wps-open-platform/
├── README.md                          # 本文件 - 知识库索引
├── homepage.md                        # WPS开放平台主页
├── guide/                             # 开发指南
│   ├── overview.md                    # 学习地图导航
│   ├── app-types.md                   # 应用类型与形态 ✅
│   ├── permission-system.md           # 应用权限体系 ✅
│   ├── self-app-summary.md            # 企业自建应用概述 ✅（新增）
│   ├── become-developer.md            # 成为开发者
│   ├── create-app.md                  # 创建应用
│   ├── identity-system.md             # 用户身份体系
│   └── app-system.md                  # 应用体系
├── api/                               # API文档
│   └── flow.md                        # API调用流程 ✅
├── auth/                              # 认证授权（待采集）
└── development/                       # 应用开发（待采集）
```

## ✅ 已采集文档

### 核心概念文档

| 文档 | 路径 | 状态 | 说明 |
|------|------|------|------|
| WPS开放平台主页 | [homepage.md](homepage.md) | ✅ 完整 | 平台整体介绍 |
| 学习地图 | [guide/overview.md](guide/overview.md) | ✅ 完整 | 文档导航结构 |
| 应用类型与形态 | [guide/app-types.md](guide/app-types.md) | ✅ 完整 | 应用类型和形态说明 |
| 应用权限体系 | [guide/permission-system.md](guide/permission-system.md) | ✅ 完整 | 权限体系4个维度 |
| 企业自建应用概述 | [guide/self-app-summary.md](guide/self-app-summary.md) | ✅ 完整 | 企业自建应用流程 |
| API调用流程 | [api/flow.md](api/flow.md) | ✅ 完整 | API调用的7个步骤 |

### 已有知识库

| 文档 | 路径 | 说明 |
|------|------|------|
| WPS学习地图 | [../wps-learn-map.md](../wps-learn-map.md) | 早期采集 |
| Flow API | [../wps-flow-api.md](../wps-flow-api.md) | 早期采集 |

## 📋 待采集文档

### 开发指南类
- [ ] 创建企业自建应用（详细步骤）
- [ ] 配置应用信息（详细步骤）
- [ ] 用户身份体系（需补充详细内容）
- [ ] 三方应用上架指南

### API文档类
- [ ] 通讯录API
- [ ] 云文档API
- [ ] 智能表格API
- [ ] 消息与会话API
- [ ] 其他API模块

### 认证授权类
- [ ] OAuth流程
- [ ] 访问凭证说明
- [ ] 签名机制
- [ ] 权限申请流程

### 应用开发类
- [ ] WPS协作卡片开发
- [ ] WPS协作工作台小组件开发
- [ ] WPS协作网页应用开发
- [ ] WPS协作机器人开发
- [ ] WPS多维表格开发

## 🎯 核心发现

### 1. 应用类型

WPS开放平台支持3种应用类型：
- **企业自建应用**：企业内部开发，仅企业内可使用
- **第三方企业应用**：三方服务商开发，可在WPS应用市场上架
- **第三方个人应用**：面向个人用户和企业用户（开发中）

### 2. 应用形态

应用可以表现为多种形态：
- 后台服务
- WPS协作网页应用
- WPS协作机器人
- WPS协作工作台小组件

### 3. 权限体系

权限体系包含4个维度：
- **访问凭证（access_token）**：验证应用身份
- **API权限（scope）**：定义可调用的接口
- **可用范围**：定义可使用应用的用户
- **数据权限**：定义可访问的数据范围

### 4. API调用流程

调用API需要7个步骤：
1. 创建应用
2. 申请API权限
3. 获取访问凭证
4. 配置应用数据权限
5. 设置IP白名单（可选）
6. 了解通用参数
7. 了解通用错误码

## 📌 技术要点

### 访问凭证类型
- 不同的access_token代表不同的资源访问权限
- 调用API时必须携带访问凭证

### 数据权限规则
- 通讯录权限范围包含子部门及员工
- 修改用户部门需要同时有用户和部门权限
- 修改部门父级需要同时有上级部门权限

### 安全机制
- 支持IP白名单设置
- 需要签名验证
- 权限申请需要审批流程

## 🔗 重要链接

- WPS开放平台：https://open.wps.cn
- 开发文档：https://open.wps.cn/documents
- API调试平台：https://open.wps.cn/api

## 📝 采集说明

**采集工具**：tools/browser-agent/fetch-page.js

**采集限制**：
- 部分文档使用SPA架构，动态加载内容
- 部分页面需要登录后访问
- 部分URL结构需要进一步探索

**后续建议**：
- 改进browser-agent工具以支持SPA页面
- 使用手动方式补充重要文档
- 定期更新知识库内容

---

**维护者**：Knowledge Researcher
**最后更新**：2026-03-08
