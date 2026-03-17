# WPS 用户授权使用指南

**重要发现**: 日历、云文档、多维表格需要使用**用户授权**，而非应用授权！

---

## 🎯 问题背景

之前API返回403错误，是因为我们使用了**应用授权** (`client_credentials`)，但这些功能需要**用户授权** (`user access_token`)。

**区别**:
- **应用授权**: 应用本身调用API，适合通讯录、待办等
- **用户授权**: 代表用户调用API，适合日历、云文档等个人数据

---

## 🚀 使用步骤

### 步骤1: 配置回调地址

在 WPS 开放平台 → 应用详情 → 基础信息，设置:
- **用户授权回调地址**: `https://your-app.com/callback`

### 步骤2: 引导用户授权

```typescript
import { getUserAuthUrl } from "./src/auth/user-auth";

// 生成授权URL
const scope = "kso.calendar.read kso.calendar_events.readwrite";
const redirectUri = "https://your-app.com/callback";
const state = "random_state"; // 用于防CSRF攻击

const authUrl = getUserAuthUrl(redirectUri, scope, state);

// 引导用户访问此URL
console.log("请点击以下链接授权:", authUrl);
```

**授权URL示例**:
```
https://openapi.wps.cn/oauth2/authorize?
  client_id=AK20260308LGOUTU
  &redirect_uri=https://your-app.com/callback
  &response_type=code
  &scope=kso.calendar.read%20kso.calendar_events.readwrite
  &state=random_state
```

### 步骤3: 获取授权码

用户授权后，会跳转到:
```
https://your-app.com/callback?code=xxx&state=random_state
```

从URL中获取 `code` 参数。

### 步骤4: 换取Access Token

```typescript
import { getUserAccessToken } from "./src/auth/user-auth";

const code = "从URL中获取的code";
const token = await getUserAccessToken(code, redirectUri);

console.log("用户Access Token:", token.access_token);
console.log("刷新Token:", token.refresh_token);
console.log("过期时间:", token.expires_in, "秒");
```

### 步骤5: 使用Token调用API

**关键**：用户授权的API**不需要签名**！

```typescript
const userAccessToken = token.access_token;

// 调用日历API（不需要签名！）
const response = await fetch("https://openapi.wps.cn/v7/calendars/primary", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${userAccessToken}`,
    "Content-Type": "application/json",
    // 不需要 X-Kso-Date 和 X-Kso-Authorization！
  },
});

const data = await response.json();
console.log("主日历:", data.data);
```

---

## 📋 各功能所需Scope

| 功能 | Scope |
|------|-------|
| **日历** | `kso.calendar.read kso.calendar_events.readwrite` |
| **云文档** | `kso.drive.readwrite kso.file.readwrite kso.file.search` |
| **多维表格** | `kso.dbsheet.read kso.dbsheet.readwrite` |

多个scope用空格分隔。

---

## 🔄 Token刷新

用户token有效期2小时，需要刷新:

```typescript
import { refreshUserAccessToken } from "./src/auth/user-auth";

const newToken = await refreshUserAccessToken(token.refresh_token);
// 保存新的access_token和refresh_token
```

---

## 💡 完整示例

```typescript
import { 
  getUserAuthUrl, 
  getUserAccessToken,
  testCalendarWithUserToken 
} from "./src/auth/user-auth";

async function main() {
  // 1. 生成授权URL
  const scope = "kso.calendar.read kso.calendar_events.readwrite";
  const redirectUri = "https://your-app.com/callback";
  const authUrl = getUserAuthUrl(redirectUri, scope);
  
  console.log("请用户访问:", authUrl);
  
  // 2. 等待用户授权并获取code（这里模拟）
  const code = "用户授权后得到的code";
  
  // 3. 换取token
  const token = await getUserAccessToken(code, redirectUri);
  console.log("获取到用户token:", token.access_token);
  
  // 4. 使用token测试API
  await testCalendarWithUserToken(token.access_token);
}

main();
```

---

## ⚠️ 重要提示

1. **保存Token**: 获取到的 `access_token` 和 `refresh_token` 需要安全保存
2. **及时刷新**: Token2小时过期，需要及时刷新
3. **用户隐私**: 用户授权的数据属于用户隐私，需要妥善保护
4. **不需要签名**: 用户授权API不需要KSO签名，只需要Bearer Token

---

## 🔧 或者使用MCP方式

如果不想实现OAuth流程，可以直接使用**MCP (Model Context Protocol)**:

```json
{
  "mcpServers": {
    "wps_calendar": {
      "url": "https://openapi.wps.cn/mcp/v2/kso-calendar/message",
      "headers": {
        "Authorization": "Bearer {user_access_token}"
      }
    }
  }
}
```

然后在Cursor或其他MCP客户端中直接使用日历工具。

---

## 📚 参考文档

- WPS MCP文档: https://open.wps.cn/documents/mcp
- 用户授权流程: https://open.wps.cn/documents/app-integration-dev/wps365/server/certification-authorization/user-authorization/flow
- 获取用户Token: https://open.wps.cn/documents/app-integration-dev/wps365/server/certification-authorization/get-token/get-user-access-token
