# WPS API 连接测试报告 - 成功

> 测试时间：2026-03-08 18:35
> 应用 ID：AK20260308LGOUTU

---

## ✅ 测试结果：成功

### Token 获取
```
端点: POST https://openapi.wps.cn/oauth2/token
状态: ✅ 成功
有效期: 7199 秒 (约 2 小时)
```

### API 调用结果

| API | 端点 | 状态 | 说明 |
|-----|------|------|------|
| 获取根部门 | `GET /v7/depts/root` | ✅ 成功 | 返回部门信息 |
| 查询所有用户(正常) | `GET /v7/users?status=active` | ✅ 成功 | 返回用户列表 |
| 查询所有用户(未激活) | `GET /v7/users?status=notactive` | ✅ 成功 | 返回空列表 |
| 批量查询部门 | `POST /v7/depts/batch_read` | ❌ 权限不足 | 需要额外权限 |

---

## 📋 获取到的数据

### 根部门
```json
{
  "id": "GX12LRmm8PL2",
  "name": "SGDD",
  "abs_path": "SGDD",
  "parent_id": "0",
  "order": 0,
  "ctime": 1726399478
}
```

### 用户列表
- 有活跃用户数据
- 包含用户基本信息

---

## 🔑 关键发现

### 1. API 调用方式

**必须同时提供**：
- `Authorization: Bearer {access_token}` - 授权凭证
- `X-Kso-Authorization: KSO-1 {ak}:{signature}` - KSO-1 签名
- `X-Kso-Date: RFC1123日期` - 请求日期

### 2. 签名计算

```typescript
// 签名公式
signature = HMAC-SHA256(
  secretKey,
  "KSO-1" + method + uri + contentType + date + sha256(body)
)
```

### 3. 权限范围

| 权限 | 说明 | 状态 |
|------|------|------|
| `kso.contact.read` | 查询通讯录 | ✅ 已申请 |
| `kso.contact.readwrite` | 管理通讯录 | ⚠️ 待确认 |

---

## 📚 已收集的 API 文档

### 通讯录 API

| 文档 | 端点 | 方法 |
|------|------|------|
| 获取根部门 | `/v7/depts/root` | GET |
| 查询子部门列表 | `/v7/depts/{dept_id}/children` | GET |
| 查询企业所有用户 | `/v7/users` | GET |
| 获取用户ID信息 | `/v7/users/current_id` | GET |
| 批量查询部门 | `/v7/depts/batch_read` | POST |

### 认证授权

| 文档 | 说明 |
|------|------|
| 认证授权概述 | token 类型说明 |
| 自建应用获取 token | client_credentials 流程 |

---

## 🚀 下一步

### 立即可做
1. ✅ API 连接测试完成
2. 可以开始开发 Tools 封装

### 需要补充
1. 云文档 API 文档
2. 表格 API 文档
3. 其他业务域 API 文档

### 开发计划
1. 创建认证模块 (auth.ts)
2. 封装通讯录 Tool
3. 封装云文档 Tool
4. 封装表格 Tool

---

## 📂 文件位置

| 文件 | 路径 |
|------|------|
| 测试脚本 | `scripts/test-api.ts` |
| 应用配置 | `.env.local` |
| API 文档 | `knowledge-base/wps-open-platform/api/contacts/` |
| 认证文档 | `knowledge-base/wps-open-platform/auth/` |

---

**状态**: ✅ 连接测试成功，可以开始开发
