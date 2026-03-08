# WPS开放平台知识库

生成时间: 2026-03-08

## 📊 知识库统计

- **总文档数**: 45
- **核心文档**: 23 (行数 > 50)
- **详细文档**: 10 (行数 > 100)
- **覆盖率**: 70% (P0+P1优先级)

## 📚 文档结构

```
knowledge-base/wps-open-platform/
├── guide/                          # 开发指南
│   ├── start/                      # 入门指南
│   │   ├── developer.md           # 成为开发者 ✅
│   │   ├── overview.md            # 开放平台概述 ✅
│   │   ├── user.md                # 用户身份体系 ✅
│   │   ├── permission.md          # 应用权限体系 ✅
│   │   └── app-type.md            # 应用类型与形态 ✅
│   └── self-app/                   # 企业自建应用
│       ├── summary.md              # 自建应用概述 ✅
│       ├── create-app.md           # 创建应用 ✅
│       └── release-app.md          # 申请应用上架 ✅
│
├── wps365/                         # WPS365能力
│   └── server/                     # 服务端API
│       ├── introduce.md            # API简介 ✅
│       ├── certification-authorization-summary.md  # 认证授权 ✅
│       ├── api-description-flow.md # 调用流程 ✅
│       ├── signature-description.md # 签名说明 ⭐(360行)
│       └── errorcode.md            # 通用错误码 ⭐(422行)
│
├── collaboration-middleware/        # 协作中台
│   ├── product.md                  # 产品简介 ✅
│   └── func-list.md                # 功能清单 ✅
│
├── mcp-server/                     # MCP
│   ├── introduction.md             # MCP介绍 ✅
│   └── use-guide.md                # 对接指南 ⭐(319行)
│
├── COMPLETE-URL-LIST.md            # 完整URL清单
└── CRAWL-LOG.md                    # 爬取日志
```

## ⭐ 核心文档推荐

### 1. 签名说明 (360行)
**路径**: `wps365/server/signature-description.md`
**内容**: 详细的API签名算法、参数说明、示例代码

### 2. 通用错误码 (422行)
**路径**: `wps365/server/errorcode.md`
**内容**: 完整的错误码列表、错误原因、解决方案

### 3. MCP对接指南 (319行)
**路径**: `mcp-server/use-guide.md`
**内容**: MCP协议集成、配置步骤、使用示例

## 🚀 快速开始

### 新手入门
1. [开放平台概述](guide/start/overview.md) - 了解WPS开放平台
2. [成为开发者](guide/start/developer.md) - 注册账号和企业
3. [应用类型与形态](guide/start/app-type.md) - 选择适合的应用类型

### 应用开发
1. [创建应用](guide/self-app/create-app.md) - 创建你的第一个应用
2. [认证授权](wps365/server/certification-authorization-summary.md) - 获取访问凭证
3. [API调用流程](wps365/server/api-description-flow.md) - 了解API调用方式

### API开发
1. [签名说明](wps365/server/signature-description.md) - 掌握签名算法
2. [通用错误码](wps365/server/errorcode.md) - 错误处理参考
3. [MCP对接指南](mcp-server/use-guide.md) - MCP协议集成

## 📋 按主题分类

### 认证与授权
- [用户身份体系](guide/start/user.md)
- [应用权限体系](guide/start/permission.md)
- [认证授权](wps365/server/certification-authorization-summary.md)

### API基础
- [WPS365服务端API简介](wps365/server/introduce.md)
- [API调用流程](wps365/server/api-description-flow.md)
- [签名说明](wps365/server/signature-description.md)
- [通用错误码](wps365/server/errorcode.md)

### 应用开发
- [应用类型与形态](guide/start/app-type.md)
- [自建应用概述](guide/self-app/summary.md)
- [创建应用](guide/self-app/create-app.md)
- [申请应用上架](guide/self-app/release-app.md)

### 协作能力
- [协作中台产品简介](collaboration-middleware/product.md)
- [协作中台功能清单](collaboration-middleware/func-list.md)

### MCP集成
- [MCP介绍](mcp-server/introduction.md)
- [MCP对接指南](mcp-server/use-guide.md)

## 🔍 常见问题

### Q1: 如何开始开发？
A: 阅读[成为开发者](guide/start/developer.md)，注册WPS企业账号，然后创建你的第一个应用。

### Q2: API调用失败怎么办？
A: 检查[签名说明](wps365/server/signature-description.md)确保签名正确，查看[通用错误码](wps365/server/errorcode.md)了解错误原因。

### Q3: 如何集成MCP？
A: 参考[MCP对接指南](mcp-server/use-guide.md)，了解MCP协议和集成步骤。

### Q4: 应用如何上架？
A: 完成[申请应用上架](guide/self-app/release-app.md)流程，提交审核。

## 📝 文档来源

所有文档均从WPS开放平台官方网站爬取：
- 网址: https://open.wps.cn
- 爬取时间: 2026-03-08
- 爬取工具: `extract-links.js`, `fetch-spa.js`

## 🔄 更新记录

- **2026-03-08**: 初始爬取，完成P0和P1优先级文档（45个文档）

## 📧 联系方式

如有问题，请访问WPS开放平台官网：https://open.wps.cn
