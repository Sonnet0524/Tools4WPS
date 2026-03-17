# 多维表格 (DBSheet) 工具使用说明

## 概述

多维表格工具提供了对 WPS 多维表格（智能表格）的 API 操作能力。

## 功能特性

- ✅ 获取表格 Schema（工作表、字段、视图结构）
- ✅ 列举工作表记录（支持分页、筛选）
- ✅ 创建新记录（支持批量）
- ✅ 创建工作表
- ✅ 自动分页获取所有记录

## API 权限要求

需要申请以下权限：
- `kso.dbsheet.read` - 查询多维表格
- `kso.dbsheet.readwrite` - 管理多维表格

## 快速开始

```typescript
import { DBSheetTool } from "@/tools";

const dbSheet = new DBSheetTool({
  appId: "your-app-id",
  appKey: "your-app-key",
});

// 获取表格结构
const schema = await dbSheet.getSchema("file-id");
console.log(schema.sheets);

// 列举记录
const records = await dbSheet.listRecords({
  fileId: "file-id",
  sheetId: 1,
  pageSize: 100,
});

// 创建记录
await dbSheet.createRecords({
  fileId: "file-id",
  sheetId: 1,
  records: [
    { fieldsValue: { "文本字段": "内容1" } },
    { fieldsValue: { "文本字段": "内容2" } },
  ],
});
```

## API 详细说明

### 1. 获取 Schema

```typescript
const schema = await dbSheet.getSchema(fileId: string);
```

返回包含所有工作表、字段、视图的完整结构。

### 2. 列举记录

```typescript
const result = await dbSheet.listRecords({
  fileId: string,        // 文件ID
  sheetId: number,       // 工作表ID
  fields?: string[],     // 指定返回字段
  filter?: object,       // 筛选条件
  pageSize?: number,     // 每页大小 (1-1000)
  pageToken?: string,    // 分页令牌
  viewId?: string,       // 指定视图
  // ... 其他选项
});
```

### 3. 创建记录

```typescript
const result = await dbSheet.createRecords({
  fileId: string,
  sheetId: number,
  preferId?: boolean,    // 是否使用字段ID而非名称
  records: [
    { fieldsValue: { "字段名": "值" } },
  ],
});
```

### 4. 创建工作表

```typescript
const sheet = await dbSheet.createSheet({
  fileId: string,
  name?: string,         // 工作表名称
  fields: [              // 字段定义
    { name: "文本", type: "MultiLineText" },
    { name: "数字", type: "Number", data: { number_format: "0.00" } },
  ],
  views: [               // 视图定义
    { name: "表格视图", type: "Grid" },
  ],
});
```

### 5. 自动获取所有记录

```typescript
const result = await dbSheet.listAllRecords(
  fileId: string,
  sheetId: number,
  options?: object       // 同 listRecords 的选项
);
```

自动处理分页，返回所有记录。

## 支持的字段类型

参考: `knowledge-base/wps-open-platform/docs/多维表格/多维表格参数说明.md`

常用类型：
- `MultiLineText` - 多行文本
- `Number` - 数字
- `Date` - 日期
- `SingleSelect` - 单选项
- `MultipleSelect` - 多选项
- `Currency` - 货币
- `Percent` - 百分比
- `Rating` - 等级
- `Checkbox` - 复选框
- `Contact` - 联系人
- `Attachment` - 附件
- `Formula` - 公式
- `Link` - 关联
- `Lookup` - 引用

## 测试

```bash
# 运行多维表格测试
bun test tests/dbsheet.test.ts

# 使用真实文件ID测试（需要权限）
TEST_DBSHEET_FILE_ID="your-file-id" bun test tests/dbsheet.test.ts
```

注意：大部分测试默认被跳过，因为没有可用的测试文件ID和权限。

## 注意事项

1. **权限申请**：使用多维表格前需要在 WPS 开放平台申请相应权限
2. **file_id 获取**：文件ID可以通过 WPS 客户端分享链接获取
3. **字段类型**：创建记录时确保字段类型和值匹配
4. **字段名称**：默认使用字段名称，可通过 `preferId: true` 使用字段ID

## 错误处理

```typescript
try {
  const schema = await dbSheet.getSchema("invalid-id");
} catch (error) {
  console.error("API错误:", error.message);
}
```

常见错误：
- `fileId is required` - 文件ID为空
- `sheetId must be a number` - 工作表ID类型错误
- `API request failed: 403` - 权限不足
- `API request failed: 404` - 文件不存在
