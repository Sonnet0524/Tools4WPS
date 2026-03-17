# TASK-006: 云文档工具 (DriveTool) 开发

**任务编号**: TASK-006  
**任务类型**: 工具开发  
**优先级**: 高  
**状态**: 已分配  
**负责人**: dev-team  
**创建时间**: 2026-03-17  
**预计完成**: 2026-03-17

---

## 📋 任务概述

开发云文档 (Drive/Cloud Document) 工具，实现对 WPS 云盘和文件的管理功能。

---

## 🎯 目标

开发 `DriveTool` 类，实现以下核心功能：
1. 获取云盘列表
2. 文件/文件夹列表查询
3. 文件搜索
4. 创建文件/文件夹
5. 删除文件
6. 获取文件下载信息
7. 开启文件分享

---

## 📚 API 参考

**API文档位置**: `knowledge-base/wps-open-platform/docs/云文档/`

**核心API** (参考 api-index.json):

| API | 方法 | 端点 | 权限 |
|-----|------|------|------|
| 获取盘列表 | GET | `/v7/drives` | `kso.drive.readwrite` |
| 获取子文件列表 | GET | `/v7/drives/{drive_id}/files/{parent_id}/children` | `kso.file.readwrite` |
| 文件搜索 | GET | `/v7/files/search` | `kso.file.search` |
| 新建文件(夹) | POST | `/v7/drives/{drive_id}/files/{parent_id}/create` | `kso.file.readwrite` |
| 删除文件 | POST | `/v7/drives/{drive_id}/files/{file_id}/delete` | `kso.file.readwrite` |
| 获取文件下载信息 | GET | `/v7/drives/{drive_id}/files/{file_id}/download` | `kso.file.readwrite` |
| 开启文件分享 | POST | `/v7/drives/{drive_id}/files/{file_id}/open_link` | `kso.file_link.readwrite` |

---

## 📁 文件结构

```
新增文件:
- src/tools/drive.ts           # 云文档工具类
- tests/drive.test.ts          # 单元测试

修改文件:
- src/tools/types.ts           # 添加云文档类型定义
- src/tools/index.ts           # 导出 DriveTool
```

---

## 🔧 开发规范

### 1. 代码风格
- 参考现有工具 (contacts.ts, todo.ts, group.ts 等)
- 使用相同的错误处理方式
- 相同的请求签名方式 (KSO-1)

### 2. 必须实现的方法

```typescript
class DriveTool {
  // 云盘管理
  getDrives(): Promise<Drive[]>
  
  // 文件/文件夹列表
  listFiles(params: ListFilesParams): Promise<FileListResult>
  
  // 文件搜索
  searchFiles(keyword: string, options?: SearchOptions): Promise<FileInfo[]>
  
  // 创建文件夹
  createFolder(params: CreateFolderParams): Promise<FolderInfo>
  
  // 创建文件
  createFile(params: CreateFileParams): Promise<FileInfo>
  
  // 删除文件
  deleteFile(driveId: string, fileId: string): Promise<void>
  
  // 获取文件下载信息
  getDownloadInfo(driveId: string, fileId: string): Promise<DownloadInfo>
  
  // 开启文件分享
  shareFile(params: ShareFileParams): Promise<ShareInfo>
  
  // 辅助方法
  getAllFiles(driveId: string, parentId?: string): Promise<FileInfo[]>
}
```

### 3. 类型定义

在 `src/tools/types.ts` 中添加：

```typescript
export interface Drive {
  id: string;
  name: string;
  type: string;
}

export interface FileInfo {
  id: string;
  name: string;
  type: 'file' | 'folder';
  mimeType?: string;
  size?: number;
  ctime: number;
  mtime: number;
  parentId?: string;
}

export interface FolderInfo {
  id: string;
  name: string;
  parentId?: string;
  ctime: number;
}

export interface ListFilesParams {
  driveId: string;
  parentId?: string;
  pageSize?: number;
  pageToken?: string;
}

export interface FileListResult {
  files: FileInfo[];
  folders: FolderInfo[];
  nextPageToken?: string;
}

export interface CreateFolderParams {
  driveId: string;
  parentId?: string;
  name: string;
}

export interface CreateFileParams {
  driveId: string;
  parentId?: string;
  name: string;
  mimeType?: string;
}

export interface DownloadInfo {
  url: string;
  expiresAt?: number;
}

export interface ShareFileParams {
  driveId: string;
  fileId: string;
  expireDays?: number;
  permission?: 'read' | 'write';
}

export interface ShareInfo {
  shareId: string;
  shareUrl: string;
  expireAt?: number;
}
```

### 4. 测试要求

- **最少 20 个测试用例**
- 包含参数验证测试
- 包含错误处理测试
- 包含成功路径测试
- 企业未开通权限的API应标记为 `.skip`

参考: `tests/group.test.ts` 或 `tests/calendar.test.ts`

---

## ⚠️ 已知限制

**企业可能未开通云文档功能**，API可能返回 403 错误。

处理方式：
1. 测试中使用 `test.skip()` 跳过需要实际API调用的测试
2. 保留参数验证和错误处理的测试
3. 在测试报告中注明限制

---

## ✅ 验收标准

- [ ] `src/tools/drive.ts` 开发完成
- [ ] `tests/drive.test.ts` 测试编写完成 (≥20个测试)
- [ ] `src/tools/types.ts` 类型定义添加
- [ ] `src/tools/index.ts` 导出更新
- [ ] 所有测试通过 (`bun test tests/drive.test.ts`)
- [ ] 代码风格与现有工具一致
- [ ] 完整的 JSDoc 注释
- [ ] 创建开发报告: `reports/2026-03-17-drive-tool-development.md`

---

## 📖 参考资料

1. **现有工具参考**:
   - `src/tools/contacts.ts` - 最简洁的示例
   - `src/tools/group.ts` - 分页处理示例
   - `src/tools/calendar.ts` - 复杂API示例

2. **API 文档**:
   - 读取 `knowledge-base/wps-open-platform/docs/云文档/` 下的文档
   - 查看 `knowledge-base/wps-open-platform/api-index.json` 中的云文档API

3. **认证模块**:
   - 使用 `src/auth/index.ts` 中的 `TokenManager` 和 `Signature`

---

## 📝 报告模板

完成后在 `reports/2026-03-17-drive-tool-development.md` 中填写：

```markdown
# 云文档工具 (DriveTool) 开发完成报告

**日期**: 2026-03-17
**任务**: TASK-006
**状态**: 完成

## 完成内容
- [ ] 工具类开发
- [ ] 类型定义
- [ ] 单元测试 (X pass, Y skip)
- [ ] 导出更新

## API 实现列表
1. getDrives() - ✅
2. listFiles() - ✅
...

## 测试统计
```
总测试: X
通过: Y
跳过: Z
失败: 0
```

## 注意事项
[记录遇到的问题和解决方案]
```

---

## 🚀 开始开发

1. 首先查看现有工具代码了解风格
2. 读取云文档API文档
3. 开发 `src/tools/drive.ts`
4. 开发 `tests/drive.test.ts`
5. 更新 `src/tools/types.ts`
6. 更新 `src/tools/index.ts`
7. 运行测试验证
8. 创建完成报告

**完成后提交代码并创建报告！**
