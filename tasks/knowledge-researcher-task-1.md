# Task: WPS开放平台知识库建设

## 任务背景

项目需要完整采集WPS开放平台的文档，构建知识库，为后续开发Skills和Tools提供信息基础。

## 任务目标

系统性地采集WPS开放平台的所有相关文档，构建结构化的知识库。

## 具体要求

### 1. 文档采集范围

**已采集**:
- ✅ 学习地图: `knowledge-base/wps-learn-map.md`
- ✅ Flow API: `knowledge-base/wps-flow-api.md`

**需要采集的主要类别**:

#### 开发指南类
- [ ] 开放平台概述
- [ ] 应用类型与形态
- [ ] 用户身份体系
- [ ] 应用权限体系
- [ ] 企业自建应用开发流程
- [ ] 三方应用上架指南

#### API文档类
- [ ] 通讯录API
- [ ] 云文档API
- [ ] 智能表格API
- [ ] 自动化流程API
- [ ] 消息与会话API
- [ ] 其他API模块（根据学习地图完整性采集）

#### 认证授权类
- [ ] 认证与授权流程
- [ ] 访问凭证说明
- [ ] 签名机制
- [ ] 权限申请流程

#### 应用开发类
- [ ] WPS协作卡片开发
- [ ] WPS协作工作台小组件开发
- [ ] WPS协作网页应用开发
- [ ] WPS协作机器人开发
- [ ] WPS多维表格开发

### 2. 知识库结构要求

创建以下目录结构：

```
knowledge-base/
├── wps-open-platform/
│   ├── README.md                  # 知识库索引
│   ├── guide/                     # 开发指南
│   │   ├── overview.md
│   │   ├── app-types.md
│   │   ├── identity-system.md
│   │   ├── permission-system.md
│   │   └── development-flow.md
│   ├── api/                       # API文档
│   │   ├── authentication.md
│   │   ├── contacts.md
│   │   ├── documents.md
│   │   ├── sheets.md
│   │   ├── flow.md
│   │   └── ...
│   ├── auth/                      # 认证授权
│   │   ├── oauth.md
│   │   ├── tokens.md
│   │   ├── signature.md
│   │   └── permissions.md
│   └── development/               # 应用开发
│       ├── cards.md
│       ├── widgets.md
│       ├── web-apps.md
│       ├── bots.md
│       └── multidimensional-tables.md
```

### 3. 采集方法

使用 `tools/browser-agent/fetch-page.js` 工具：

```bash
cd tools/browser-agent

# 示例：采集文档
node fetch-page.js "https://open.wps.cn/documents/app-integration-dev/..." ../../knowledge-base/wps-open-platform/...md
```

### 4. 分析要求

采集完成后，需要分析并输出：

1. **API接口清单**
   - 所有可用的API接口
   - 每个接口的功能说明
   - 接口所需的权限

2. **权限体系说明**
   - 权限类型
   - 权限申请流程
   - 权限配置方法

3. **认证授权流程**
   - OAuth流程
   - Token获取方式
   - 签名机制

4. **关键发现**
   - 重要的技术要点
   - 需要注意的限制
   - 最佳实践

## 输出要求

### 1. 知识库文件
- 所有采集的文档保存到 `knowledge-base/wps-open-platform/`
- 创建知识库索引文件 `knowledge-base/wps-open-platform/README.md`

### 2. 调研报告
完成后，编写调研报告：`reports/research/wps-platform-research-YYYYMMDD.md`

报告内容包括：
- 采集的文档清单
- WPS能力全景图
- API接口分类汇总
- 权限体系说明
- 认证授权流程
- 关键技术要点
- 对项目开发的建议

## 注意事项

1. **系统性采集** - 不要遗漏重要文档
2. **保持完整性** - 采集文档的完整内容，不要截断
3. **分类清晰** - 按照知识库结构分类保存
4. **及时汇报** - 遇到问题或完成阶段性工作及时汇报

## 验收标准

- [ ] 所有主要文档类别已采集
- [ ] 知识库目录结构清晰
- [ ] 知识库索引文件完整
- [ ] 调研报告内容详实
- [ ] 关键信息提取准确

---

**Priority**: P0  
**Assigned to**: Knowledge Researcher  
**Created**: 2026-03-08  
**Deadline**: 尽快完成
