# Task: WPS开放平台完整文档爬取（修正版）

## 任务背景

之前爬取失败的原因是**URL结构错误**。现在已从学习地图提取到正确的URL结构。

## 任务目标

使用正确的URL结构，系统性爬取WPS开放平台的完整文档。

## 核心发现

### URL结构对比

**错误**：
- `/guide/start/intro`
- `/guide/start/become-developer`
- `/guide/start/identity`

**正确**：
- `/guide/start/overview`
- `/guide/start/developer`
- `/guide/start/user`

## 任务步骤

### 步骤1：递归提取所有链接

使用 `tools/browser-agent/extract-links.js` 工具：

```bash
# 1. 从学习地图提取链接（已完成）
node extract-links.js "https://open.wps.cn/documents/app-integration-dev/guide/start/learn-map"

# 2. 从每个链接继续提取子链接
# 例如：从 "成为开发者" 页面提取子链接
node extract-links.js "https://open.wps.cn/documents/app-integration-dev/guide/start/developer"

# 3. 重复以上步骤，直到没有新的链接
```

**递归策略**：
- 从学习地图开始（第0层）
- 提取所有链接（第1层）
- 访问每个第1层链接，提取子链接（第2层）
- 继续递归，直到所有链接都被发现
- 去重，生成完整URL清单

### 步骤2：批量爬取文档

使用 `tools/browser-agent/fetch-spa.js` 工具：

```bash
# 批量爬取
for url in $(cat url-list.txt); do
  node fetch-spa.js "$url" "output-path.md"
done
```

**注意**：
- 使用fetch-spa.js（支持SPA页面）
- 等待足够长时间（5秒）
- 滚动页面触发加载
- 检查内容完整性

### 步骤3：组织知识库

将爬取的文档按照以下结构组织：

```
knowledge-base/wps-open-platform/
├── guide/                    # 开发指南
│   ├── start/               # 入门
│   ├── self-app/            # 企业自建应用
│   └── third-party/         # 第三方应用
├── wps365/                  # WPS365能力
│   ├── server/              # 服务端API
│   └── client/              # 客户端能力
├── collaboration-middleware/ # 协作中台
├── mcp-server/              # MCP
└── client/                  # WPS客户端
```

## 重点采集内容

### 高优先级（P0）
1. 开发指南完整文档
   - 成为开发者
   - 开放平台概述
   - 用户身份体系
   - 应用权限体系（已采集）

2. 企业自建应用完整流程
   - 创建应用
   - 配置应用
   - 申请上架
   - 企业审核

3. 认证授权详细文档
   - OAuth流程
   - 签名机制
   - 访问凭证

### 中优先级（P1）
4. 核心API详细文档
   - 通讯录
   - 云文档
   - 表格
   - 消息

5. 应用开发文档
   - 协作卡片
   - 协作机器人
   - 工作台小组件

## 输出要求

### 1. 完整URL清单
- 保存到：`knowledge-base/wps-open-platform/COMPLETE-URL-LIST.md`
- 格式：Markdown表格，包含序号、标题、URL、优先级、状态

### 2. 爬取日志
- 保存到：`knowledge-base/wps-open-platform/CRAWL-LOG.md`
- 记录每个URL的爬取结果
- 标记失败和需要重试的URL

### 3. 知识库文档
- 按结构保存所有爬取的文档
- 确保内容完整（每个文档至少100行以上）

## 质量检查

### 每个文档检查项
- [ ] 文档行数 > 50
- [ ] 不包含"文档不存在"字样
- [ ] 不包含"请登录"提示
- [ ] 内容有意义，不是纯导航

### 批量检查
- [ ] 所有发现的链接都已爬取
- [ ] 优先级P0的文档全部完整
- [ ] 知识库结构清晰

## 工具说明

### extract-links.js
用途：从页面提取所有文档链接
特点：
- 自动过滤非文档链接
- 自动去重
- 支持批量提取

### fetch-spa.js
用途：爬取SPA页面完整内容
特点：
- 等待动态内容加载
- 滚动页面触发懒加载
- 尝试多种内容选择器
- 检测错误信息

## 注意事项

1. **URL正确性**：必须使用从页面提取的实际URL，不要猜测
2. **内容完整性**：检查每个文档的实际内容，不只是标题
3. **递归深度**：控制递归深度，避免无限循环
4. **去重**：同一URL只爬取一次

## 预期成果

- 完整的WPS开放平台文档（50-100+份）
- 清晰的知识库结构
- 准确的URL清单
- 详实的爬取日志

---

**Priority**: P0  
**Assigned to**: Knowledge Researcher  
**Created**: 2026-03-08  
**Deadline**: 立即执行
