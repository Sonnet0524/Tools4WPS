# WPS API 最小化连接测试

> 任务目标：验证 WPS 应用配置正确，能够成功调用 API

---

## 一、前置条件

您需要准备以下信息：

| 信息 | 来源 | 说明 |
|------|------|------|
| **APPID** (accessKey) | 开发者后台 → 应用详情 | 应用唯一标识 |
| **APPKEY** (secretKey) | 开发者后台 → 应用详情 | 应用密钥 |
| **企业 ID** (tenant_id) | 开发者后台 | 租户标识 |

---

## 二、测试步骤

### Step 1: 获取应用授权凭证

WPS 应用授权凭证（tenant_access_token）获取方式：

**请求**：
```http
POST https://openapi.wps.cn/v7/tenant_access_token
Content-Type: application/json

{
  "app_id": "你的APPID",
  "app_key": "你的APPKEY"
}
```

**预期响应**：
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "tenant_access_token": "xxx",
    "expire_time": 7200
  }
}
```

> ⚠️ 注意：具体 API 端点可能不同，需要您登录 WPS 开放平台查看具体文档。

---

### Step 2: 调用测试 API

使用获取到的 token 调用一个简单的 API：

**获取用户信息**：
```http
GET https://openapi.wps.cn/v7/users?page_size=1
Authorization: Bearer {tenant_access_token}
```

**或获取部门列表**：
```http
GET https://openapi.wps.cn/v7/depts
Authorization: Bearer {tenant_access_token}
```

---

## 三、需要您提供的信息

请告诉我：

1. **您的应用是否已申请 API 权限？**
   - 通讯录权限？
   - 云文档权限？

2. **您的应用是否已配置数据权限？**
   - 需要在开发者后台配置可访问的数据范围

3. **应用状态**
   - 是否已上架/启用？

---

## 四、下一步行动

1. 您登录 WPS 开放平台，查看：
   - 认证授权 → 获取访问凭证 的具体 API
   - 确认 API 端点和参数格式

2. 或者，直接把您在开发者后台看到的关键信息告诉我：
   - API 权限申请状态
   - 是否需要签名
   - 推荐的测试 API

---

**状态**: ⏳ 等待用户提供应用信息
