# TASK-005: DocumentTool 开发任务

## 任务概述

**任务ID**: TASK-005  
**任务名称**: DocumentTool 云文档操作工具  
**优先级**: 🔴 高  
**预计工时**: 3-4天  
**依赖任务**: 无（独立工具）  
**状态**: 待开发  

---

## 一、需求背景

根据 PRD-complete.md 的要求，现场信息收集Agent需要**自动生成4类文档**：
1. 小区用电简报
2. 应急用电指南
3. 服务质量报告
4. 小区基础信息表

这些文档需要保存到 **WPS云文档**，并生成分享链接供协作查看。

---

## 二、设计规范

### 2.1 工具定位

**工具名称**: DocumentTool  
**功能定位**: 提供WPS云文档的完整操作能力，包括创建、编辑、分享、管理等  
**所属模块**: Tools4WPS  

### 2.2 接口设计

参考现有工具架构（MessageTool/ContactsTool/TodoTool/DBSheetTool），DocumentTool应遵循以下规范：

```typescript
// 配置接口
interface DocumentToolConfig {
  appId: string;      // WPS应用ID
  appKey: string;     // WPS应用密钥
  baseUrl?: string;   // API基础地址，默认 https://openapi.wps.cn
}

// 文档类型枚举
type DocumentType = 'docx' | 'xlsx' | 'pptx' | 'pdf';

// 核心方法设计
class DocumentTool {
  constructor(config: DocumentToolConfig);
  
  // 文档创建
  async createDocument(params: CreateDocumentParams): Promise<CreateDocumentResult>;
  
  // 文档信息查询
  async getDocument(fileId: string): Promise<DocumentInfo>;
  
  // 文档内容保存（支持HTML格式）
  async saveDocument(params: SaveDocumentParams): Promise<void>;
  
  // 生成分享链接
  async createShareLink(params: ShareLinkParams): Promise<ShareLinkResult>;
  
  // 文件夹操作
  async createFolder(params: CreateFolderParams): Promise<FolderInfo>;
  async getFolder(folderId: string): Promise<FolderInfo>;
  async listFiles(params?: ListFilesParams): Promise<ListFilesResult>;
  
  // 文档管理
  async moveDocument(fileId: string, targetFolderId: string): Promise<void>;
  async deleteDocument(fileId: string, permanent?: boolean): Promise<void>;
  
  // 文档模板生成（业务方法）
  generateDocumentHtml(templateType: string, data: Record<string, unknown>): string;
}
```

### 2.3 类型定义

完整类型定义应添加到 `src/tools/types.ts`：

```typescript
// ============ 云文档 (Document) 类型 ============

export type DocumentType = 'docx' | 'xlsx' | 'pptx' | 'pdf';

export interface CreateDocumentParams {
  name: string;           // 文档名称
  type: DocumentType;     // 文档类型
  folderId?: string;      // 父文件夹ID（可选）
  content?: string;       // 初始内容（可选，支持HTML）
  templateId?: string;    // 模板ID（可选）
}

export interface CreateDocumentResult {
  fileId: string;         // 文件ID
  fileName: string;       // 文件名
  type: DocumentType;     // 类型
  ctime: number;          // 创建时间戳
  url: string;            // 访问URL
}

export interface DocumentInfo {
  fileId: string;
  fileName: string;
  type: DocumentType;
  size: number;
  ctime: number;
  mtime: number;
  creator: string;
  modifier: string;
  url: string;
  parentId?: string;      // 父文件夹ID
}

export interface ShareLinkParams {
  fileId: string;                    // 文件ID
  expireTime?: number;               // 过期时间（时间戳，可选）
  permission?: 'read' | 'write' | 'comment';  // 权限级别
  password?: string;                 // 访问密码（可选）
}

export interface ShareLinkResult {
  shareId: string;        // 分享ID
  shareUrl: string;       // 分享链接
  expireTime?: number;    // 过期时间
  permission: string;     // 权限
}

export interface SaveDocumentParams {
  fileId: string;                    // 文件ID
  content: string;                   // 文档内容
  format?: 'html' | 'text' | 'markdown';  // 内容格式
}

export interface FolderInfo {
  folderId: string;
  name: string;
  parentId?: string;
  ctime: number;
}

export interface CreateFolderParams {
  name: string;
  parentId?: string;      // 父文件夹ID（可选，默认根目录）
}

export interface ListFilesParams {
  folderId?: string;      // 文件夹ID（可选，默认根目录）
  pageSize?: number;      // 分页大小
  pageToken?: string;     // 分页令牌
  type?: DocumentType | DocumentType[];  // 文件类型过滤
}

export interface ListFilesResult {
  files: DocumentInfo[];      // 文件列表
  folders: FolderInfo[];      // 子文件夹列表
  nextPageToken?: string;     // 下一页令牌
}
```

### 2.4 业务模板方法

DocumentTool 需要提供 **4种文档模板** 的HTML生成方法：

```typescript
// 在 DocumentTool 类中添加

generateDocumentHtml(templateType: string, data: Record<string, unknown>): string {
  switch (templateType) {
    case 'power_briefing':      // 小区用电简报
      return this.generatePowerBriefingHtml(data);
    case 'emergency_guide':     // 应急用电指南
      return this.generateEmergencyGuideHtml(data);
    case 'service_report':      // 服务质量报告
      return this.generateServiceReportHtml(data);
    case 'community_info':      // 小区基础信息表
      return this.generateCommunityInfoHtml(data);
    default:
      throw new Error(`Unknown template type: ${templateType}`);
  }
}

// 各模板的数据结构参考
// 1. power_briefing: { community, date, content, ... }
// 2. emergency_guide: { community, emergencyType, procedures[], contacts[], ... }
// 3. service_report: { community, period, stats, issues[], ... }
// 4. community_info: { community, address, powerRooms[], customers[], ... }
```

---

## 三、WPS API 对接

### 3.1 API 端点

基于 WPS开放平台 文档，使用以下 API：

| 功能 | 方法 | API 端点 |
|------|------|----------|
| 创建文档 | POST | `/v7/office/create` |
| 获取文档信息 | GET | `/v7/office/files/{file_id}` |
| 保存文档内容 | POST | `/v7/office/files/{file_id}/save` |
| 创建分享链接 | POST | `/v7/office/files/{file_id}/share` |
| 创建文件夹 | POST | `/v7/office/folders` |
| 获取文件夹 | GET | `/v7/office/folders/{folder_id}` |
| 列出文件 | GET | `/v7/office/files` |
| 移动文档 | POST | `/v7/office/files/{file_id}/move` |
| 删除文档 | DELETE | `/v7/office/files/{file_id}` |

### 3.2 认证方式

参考现有工具（MessageTool/DBSheetTool），使用统一的认证机制：

```typescript
// 1. 使用 TokenManager 获取 Access Token
const token = await this.tokenManager.getToken();

// 2. 使用 Signature 生成签名
const signatureResult = this.signature.generateSignature({
  method,
  uri,
  contentType,
  body,
});

// 3. 请求头
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': contentType,
  'X-Kso-Date': signatureResult.date,
  'X-Kso-Authorization': signatureResult.authorization,
};
```

### 3.3 HTML 转 Word 支持

WPS API 支持直接写入 HTML 内容，Word 会自动渲染为格式化的文档。

**技术要求**：
- 使用标准 HTML 标签（`<h1>`, `<p>`, `<table>`, `<ul>` 等）
- 支持内联 CSS 样式
- 支持表格、列表、图片等富文本元素
- 文档应使用 `docx` 类型创建

**模板样式建议**：
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>文档标题</title>
  <style>
    body { 
      font-family: 'Microsoft YaHei', Arial, sans-serif; 
      line-height: 1.6; 
      max-width: 800px; 
      margin: 0 auto; 
      padding: 20px; 
    }
    h1 { color: #333; border-bottom: 2px solid #0066cc; }
    h2 { color: #0066cc; margin-top: 30px; }
    .header { background: #f5f5f5; padding: 15px; border-radius: 5px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { border: 1px solid #ddd; padding: 8px; }
    th { background: #f5f5f5; }
  </style>
</head>
<body>
  <!-- 内容区域 -->
</body>
</html>
```

---

## 四、实现要点

### 4.1 代码结构

参考现有工具结构，创建文件 `src/tools/document.ts`：

```
src/tools/
├── contacts.ts          # 已存在
├── message.ts           # 已存在
├── todo.ts              # 已存在
├── dbsheet.ts           # 已存在
├── document.ts          # 新建：本任务
├── types.ts             # 修改：添加类型定义
└── index.ts             # 修改：导出 DocumentTool
```

### 4.2 错误处理

参考现有工具的错误处理方式：

```typescript
private async makeRequest(...): Promise<unknown> {
  // ... 请求代码
  
  if (!response.ok) {
    const text = await response.text();
    let errorMessage = `API request failed: ${response.status}`;
    
    try {
      const errorData = JSON.parse(text) as APIError;
      if (errorData.msg) {
        errorMessage = errorData.msg;
      }
    } catch {
      if (text) {
        errorMessage = text;
      }
    }
    
    throw new Error(errorMessage);
  }
  
  return await response.json();
}
```

### 4.3 参数验证

参考现有工具的验证模式：

```typescript
function validateCreateDocumentParams(params: CreateDocumentParams): void {
  if (!params.name || params.name.trim() === '') {
    throw new Error('Document name is required and cannot be empty');
  }
  
  if (!params.type || !['docx', 'xlsx', 'pptx', 'pdf'].includes(params.type)) {
    throw new Error('Valid document type is required (docx, xlsx, pptx, pdf)');
  }
}
```

---

## 五、测试要点

### 5.1 单元测试覆盖

每个公共方法都需要单元测试：

1. **createDocument**
   - ✅ 成功创建文档（docx）
   - ✅ 在指定文件夹创建文档
   - ✅ 带初始内容创建
   - ❌ 缺少名称抛出错误
   - ❌ 无效类型抛出错误

2. **saveDocument**
   - ✅ 成功保存 HTML 内容
   - ✅ 支持不同格式（html/text/markdown）
   - ❌ 无效 fileId 处理

3. **createShareLink**
   - ✅ 生成只读分享链接
   - ✅ 设置过期时间
   - ✅ 设置访问密码

4. **generateDocumentHtml**
   - ✅ 4种模板类型都能正常生成
   - ✅ 数据填充正确
   - ✅ HTML 结构完整

### 5.2 集成测试

测试完整业务流程：

```typescript
// 场景1：创建并分享用电简报
const doc = await docTool.createDocument({
  name: '幸福小区用电简报-2026-03',
  type: 'docx',
  folderId: 'folder_community_001'
});

const html = docTool.generateDocumentHtml('power_briefing', {
  community: '幸福小区',
  date: '2026-03-17',
  content: '...用电情况分析...'
});

await docTool.saveDocument({ fileId: doc.fileId, content: html });

const share = await docTool.createShareLink({
  fileId: doc.fileId,
  permission: 'read',
  expireTime: Date.now() + 7 * 24 * 60 * 60 * 1000
});

// 验证：分享链接可访问，内容正确
```

---

## 六、与其他组件的协作

### 6.1 被 Skill 调用

DocumentTool 主要被 **AutoDocGeneration Skill** 调用：

```yaml
# AutoDocGeneration Skill 工作流片段
- action: tool_call
  tool: DocumentTool
  method: createDocument
  input:
    name: "${community.name}用电简报-${date}"
    type: "docx"
    folderId: "${community.folderId}"
  output: docResult

- action: tool_call
  tool: DocumentTool
  method: saveDocument
  input:
    fileId: "${docResult.fileId}"
    content: "${htmlContent}"
    format: "html"

- action: tool_call
  tool: DocumentTool
  method: createShareLink
  input:
    fileId: "${docResult.fileId}"
    permission: "read"
  output: shareResult

- action: message_reply
  content: "✅ 文档已生成！\n📄 ${docResult.fileName}\n🔗 分享链接：${shareResult.shareUrl}"
```

### 6.2 文件夹结构

DocumentTool 需要支持 PRD 规定的文件夹结构：

```
WPS云文档/
├── {供电所名称}/                    # 供电所文件夹
│   ├── {小区名称}/                  # 小区文件夹
│   │   ├── 小区基础信息表.docx
│   │   ├── 用电简报/                # 简报文件夹（按月归档）
│   │   │   ├── 2026-03.docx
│   │   │   └── 2026-02.docx
│   │   ├── 应急用电指南.docx
│   │   ├── 配电室资料/              # 配电室文件夹
│   │   └── 入户走访记录/            # 走访记录文件夹
```

---

## 七、验收标准

### 7.1 功能验收

- [ ] 所有接口方法实现并通过单元测试
- [ ] 支持创建 docx/xlsx/pptx/pdf 四种类型文档
- [ ] 支持 HTML 内容写入并正确渲染为 Word 格式
- [ ] 支持生成带权限和过期时间的分享链接
- [ ] 支持完整的文件夹操作（创建/查询/列出/移动）
- [ ] 4种文档模板（用电简报/应急指南/服务报告/小区信息）HTML 生成正常

### 7.2 代码验收

- [ ] TypeScript 类型定义完整
- [ ] 错误处理完善（参数验证、API 错误处理）
- [ ] 代码风格与现有工具一致
- [ ] 导出到 `src/tools/index.ts`
- [ ] 通过 lint 检查

### 7.3 文档验收

- [ ] 更新 `README.md` 添加 DocumentTool 说明
- [ ] 提供使用示例代码
- [ ] 记录已知限制和注意事项

---

## 八、参考资料

### 8.1 WPS 开放平台文档

- **云文档 API**: https://open.wps.cn/docs/api/office
- **文件操作**: https://open.wps.cn/docs/api/office/files
- **分享链接**: https://open.wps.cn/docs/api/office/share
- **认证机制**: https://open.wps.cn/docs/api/auth

### 8.2 项目内参考

- **设计文档**: `/research/topics/field-info-agent/PRD-complete.md`（第6章 数据模型与存储设计）
- **现有工具**: 
  - `src/tools/dbsheet.ts` - 最接近的参考（类似架构）
  - `src/tools/message.ts` - 认证方式参考
- **类型定义**: `src/tools/types.ts`

### 8.3 HTML 转 Word 最佳实践

- WPS 支持标准 HTML5 标签
- 内联 CSS 样式兼容性最好
- 表格使用标准 `<table>` 标签
- 图片使用 `<img src="...">`，支持 base64 或 URL

---

## 九、备注

### 9.1 已知限制

1. **文档格式**: 优先支持 `docx` 类型，其他类型（xlsx/pptx/pdf）需测试兼容性
2. **图片支持**: HTML 中的图片需使用公开 URL 或 base64 编码
3. **复杂样式**: 过于复杂的 CSS 可能渲染不一致，建议使用标准样式

### 9.2 后续优化

- 考虑添加文档模板缓存机制
- 支持更多文档类型（如思维导图、智能表格）
- 添加文档批量操作接口

---

**创建日期**: 2026-03-17  
**任务创建**: Research Agent  
**分配给**: Development Team