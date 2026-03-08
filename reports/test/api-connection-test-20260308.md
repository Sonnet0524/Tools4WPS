# WPS API 最小化连接测试报告

> 测试时间：2026-03-08
> 应用 ID：AK20260308LGOUTU

---

## 测试结果

### ✅ 成功：获取 Token

```
端点: POST https://openapi.wps.cn/oauth2/token
格式: application/x-www-form-urlencoded

请求体:
grant_type=client_credentials
client_id=AK20260308LGOUTU
client_secret=***

响应:
{
  "access_token": "eyJhbGciOiJFUzI1NiIs...",
  "expires_in": 7199,
  "token_type": "bearer"
}
```

### ❌ 失败：API 调用

| API | Status | 错误 | 原因 |
|-----|--------|------|------|
| `/v7/depts` | 404 | Not Found | 端点路径错误 |
| `/v7/users` | 400 | ParamFormatError | 缺少必填参数 |
| `/v7/drives` | 403 | PermissionDenied | 未申请权限 `kso.drive.readwrite` |
| `/v7/apps/me` | 404 | Not Found | 端点路径错误 |

---

## 问题分析

### 1. API 端点路径

部分端点返回 404，可能原因：
- API 版本不对（v7 vs 其他）
- 端点路径需要更多参数

### 2. API 权限

错误信息显示需要申请以下权限：
- `kso.drive.readwrite` - 驱动盘读写
- `kso.mcp_yundoc.readwrite` - 云文档读写
- `kso.mcp_airpage.readwrite` - 智能文档读写

### 3. 请求参数

`/v7/users` 返回参数格式错误，可能需要：
- `page_size` - 分页大小
- 其他必填参数

---

## 下一步建议

### 您需要在开发者后台操作

1. **申请 API 权限**
   - 通讯录权限
   - 云文档权限
   - 其他需要的权限

2. **配置数据权限**
   - 设置可访问的数据范围
   - 提交审核

3. **确认 API 文档**
   - 查看具体的 API 端点路径
   - 确认请求参数格式

---

## 测试脚本

已创建测试脚本：`scripts/test-api.ts`

运行方式：
```bash
bun scripts/test-api.ts
```

---

## 认证授权文档

已保存到知识库：
- `knowledge-base/wps-open-platform/auth/summary.md` - 认证授权概述
- `knowledge-base/wps-open-platform/auth/selfapp-tenant-token.md` - 获取 tenant_access_token

---

**状态**: ⏳ 等待用户在开发者后台申请权限
