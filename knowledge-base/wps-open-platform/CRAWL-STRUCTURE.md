# WPS开放平台知识库 - 已爬取架构

**爬取时间**：2026-03-08  
**总文档数**：24份  
**总行数**：约462行（部分文档可能为空或内容较少）

---

## 📊 已爬取文档分类

### 1. 核心导航文档（2份）
```
├── README.md                          # 知识库索引
└── homepage.md                        # WPS开放平台主页
```

### 2. 开发指南类（11份）
```
guide/
├── overview.md                        # 学习地图导航（69行）
├── what-is-platform.md                # 开放平台是什么
├── app-system.md                      # 应用体系
├── app-types.md                       # 应用类型与形态
├── permission-system.md               # 应用权限体系
├── identity-system.md                 # 用户身份体系
├── become-developer.md                # 成为开发者
├── create-app.md                      # 创建应用
├── self-app-summary.md                # 企业自建应用概述（70行）
└── self-built-overview.md             # 自建应用概览
```

### 3. API文档类（6份）
```
api/
├── flow.md                            # API调用流程
├── common-params.md                   # 通用参数
├── error-codes.md                     # 通用错误码
├── contacts.md                        # 通讯录API
├── documents.md                       # 云文档API
└── sheets.md                          # 表格API
```

### 4. 认证授权类（2份）
```
auth/
├── oauth.md                           # OAuth认证
└── signature.md                       # 签名机制
```

### 5. 应用开发类（3份）
```
development/
├── cards-overview.md                  # WPS协作卡片
├── bots-overview.md                   # WPS协作机器人
└── multidimensional-tables.md         # 多维表格开发
```

### 6. 其他（1份）
```
└── api-debugger.md                    # API调试器
```

---

## 🔍 内容完整性分析

### ✅ 已采集的核心文档
- 学习地图导航
- 应用类型与形态
- 权限体系
- 企业自建应用概述
- API调用流程
- 部分API文档（通讯录、文档、表格）

### ⚠️ 可能内容不完整的文档
部分文档行数较少，可能只采集到了标题或导航，需要检查：
- guide/what-is-platform.md
- guide/app-system.md
- guide/become-developer.md
- guide/create-app.md
- guide/identity-system.md
- guide/self-built-overview.md

### ❌ 明确缺失的文档类别

#### 开发指南详细步骤
- [ ] 创建企业自建应用（详细步骤）
- [ ] 配置应用基础信息（详细步骤）
- [ ] 配置应用能力信息（详细步骤）
- [ ] 申请应用上架（详细步骤）
- [ ] 企业审核应用（详细步骤）
- [ ] 三方应用上架指南

#### API详细文档
- [ ] 消息与会话API
- [ ] 自动化流程API
- [ ] 待办API
- [ ] 审批API
- [ ] 日历API
- [ ] 其他50+ API模块

#### 认证授权详细文档
- [ ] 访问凭证详细说明
- [ ] 权限申请详细流程
- [ ] 数据权限配置

#### 应用开发详细文档
- [ ] WPS协作工作台小组件开发
- [ ] WPS协作网页应用开发
- [ ] WPS协作服务台开发

---

## 🎯 需要补充爬取的内容

根据overview.md中的导航结构，需要补充以下文档：

### 高优先级（P0）
1. **开发流程详细文档**
   - 创建企业自建应用（详细步骤）
   - 配置应用基础信息（详细步骤）
   - 配置应用能力信息（详细步骤）

2. **核心API详细文档**
   - 通讯录API（详细接口）
   - 云文档API（详细接口）
   - 表格API（详细接口）
   - 消息与会话API

3. **认证授权详细文档**
   - 访问凭证获取方式
   - 签名生成方法
   - 权限申请流程

### 中优先级（P1）
4. **其他API模块**
   - 自动化流程
   - 待办
   - 审批
   - 日历

5. **应用开发详细文档**
   - 协作卡片开发详细
   - 机器人开发详细
   - 小组件开发详细

---

## 📝 爬取策略建议

### 方案1：基于URL结构系统性爬取
从学习地图出发，按照以下路径系统爬取：

```
https://open.wps.cn/documents/app-integration-dev/
├── guide/                             # 开发指南
│   ├── start/                         # 入门
│   ├── self-app/                      # 企业自建应用
│   └── third-party/                   # 第三方应用
├── wps365/                           # WPS365能力
│   └── server/api-description/       # 服务端API
└── client/                           # 客户端能力
```

### 方案2：基于已有文档链接补充
检查每个已采集文档中的内部链接，补充爬取。

### 方案3：手动整理URL清单
根据WPS开放平台文档结构，手动整理完整的URL清单，批量爬取。

---

## 🚀 建议行动

1. **立即检查已有文档内容**
   - 检查行数较少的文档是否内容完整
   - 补充内容不完整的文档

2. **制定完整URL清单**
   - 基于导航结构整理需要爬取的URL
   - 分类优先级

3. **批量爬取**
   - 使用browser-agent批量爬取
   - 分批次进行，及时检查质量

---

**维护者**：PM Agent  
**生成时间**：2026-03-08
