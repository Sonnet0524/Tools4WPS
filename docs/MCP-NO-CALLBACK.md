# WPS MCP 使用指南（无回调地址方案）

针对无法设置回调地址的场景，提供直接在WPS开放平台获取Token的方案。

---

## 🎯 适用场景

- ✅ 本地开发环境
- ✅ 服务器在内网，无公网IP
- ✅ 不想配置回调地址
- ✅ 快速测试API权限

---

## 🔑 获取用户 Access Token

### 方法：通过开放平台测试工具（推荐）

#### 步骤1: 登录开放平台
访问 https://open.wps.cn 并登录

#### 步骤2: 进入应用详情
1. 点击「应用管理」
2. 选择你的应用（AK20260308LGOUTU）
3. 进入应用详情页

#### 步骤3: 找到API测试工具
在左侧菜单或页面中找到以下任一入口：
- 「API测试工具」
- 「接口调试」
- 「在线测试」
- 「工具列表」

#### 步骤4: 获取用户Token
1. 选择**用户授权**模式（不是应用授权）
2. 选择需要的权限范围：
   ```
   kso.calendar.read
   kso.calendar.readwrite
   kso.calendar_events.read
   kso.calendar_events.readwrite
   kso.drive.readwrite
   kso.file.read
   kso.file.readwrite
   kso.file.search
   kso.dbsheet.read
   kso.dbsheet.readwrite
   ```
3. 点击「获取Token」或「扫码授权」
4. 用手机WPS扫码登录
5. **复制获取到的 Access Token**

---

## 🧪 测试API

获取到Token后，在终端运行：

```bash
bun run scripts/test-mcp.ts test "你的access_token"
```

这会测试以下API：
1. ✅ 日历 - 获取主日历
2. ✅ 日历 - 获取日程列表
3. ✅ 云文档 - 获取盘列表
4. ✅ 云文档 - 搜索文件
5. ✅ 多维表格 - 测试权限

---

## 💻 在代码中使用

### 方式1: 直接使用用户Token

```typescript
const userAccessToken = "从开放平台获取的token";

// 调用日历API（不需要签名！）
const response = await fetch("https://openapi.wps.cn/v7/calendars/primary", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${userAccessToken}`,
    "Content-Type": "application/json",
    // 注意：不需要 X-Kso-Date 和 X-Kso-Authorization
  },
});

const data = await response.json();
console.log("主日历:", data.data.summary);
```

### 方式2: 通过MCP Server

```typescript
const MCP_CALENDAR_URL = "https://openapi.wps.cn/mcp/v2/kso-calendar/message";

const response = await fetch(MCP_CALENDAR_URL, {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${userAccessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    method: "get_calendar",
    params: {
      calendar_id: "primary"
    }
  }),
});
```

---

## 🔧 MCP Server 端点

| 功能 | MCP Server URL |
|------|----------------|
| **日历** | `https://openapi.wps.cn/mcp/v2/kso-calendar/message` |
| **云文档** | `https://openapi.wps.cn/mcp/v2/kso-file/message` |
| **多维表格** | `https://openapi.wps.cn/mcp/v2/kso-dbsheet/message` |

---

## ⚙️ Cursor 配置示例

如果你使用Cursor，可以这样配置MCP：

```json
{
  "mcpServers": {
    "wps_calendar": {
      "url": "https://openapi.wps.cn/mcp/v2/kso-calendar/message",
      "headers": {
        "Authorization": "Bearer 你的access_token"
      }
    },
    "wps_file": {
      "url": "https://openapi.wps.cn/mcp/v2/kso-file/message",
      "headers": {
        "Authorization": "Bearer 你的access_token"
      }
    }
  }
}
```

配置文件路径：`~/.cursor/mcp.json`

---

## ⚠️ 重要提示

1. **Token有效期**: 2小时，过期后需要重新获取
2. **安全保存**: Token代表用户权限，请妥善保管
3. **权限范围**: 获取Token时申请的权限，决定了可以调用的API
4. **不需要签名**: 用户授权API不需要KSO签名，只需要Bearer Token

---

## 🐛 常见问题

### Q: 获取Token时提示权限不足？
**A**: 检查开放平台 → 应用详情 → 权限管理，确认已申请相应权限并审批通过。

### Q: API返回403？
**A**: 
- Token可能已过期，重新获取
- 企业可能未开通该功能
- Token权限不足，获取更多权限后再试

### Q: 如何刷新Token？
**A**: 如果获取Token时返回了refresh_token，可以用它刷新。但开放平台测试工具获取的token通常需要重新扫码获取。

### Q: Token可以保存吗？
**A**: 可以保存，但2小时后会过期。建议开发时使用，生产环境实现自动刷新。

---

## 📚 参考文档

- WPS MCP文档: https://open.wps.cn/documents/mcp
- 工具列表: https://open.wps.cn/mcp/tools
- 权限管理: https://open.wps.cn/app/permissions

---

## 🎯 下一步

测试成功后，你可以：

1. **更新工具类** - 添加用户Token支持
2. **实现自动刷新** - 开发Token刷新机制
3. **集成到应用** - 在业务逻辑中使用这些API

**现在去开放平台获取一个Token，然后运行测试吧！**
