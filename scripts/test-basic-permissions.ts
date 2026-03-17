import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testBasicPermissions() {
  console.log("=".repeat(70));
  console.log("🔍 基础权限验证测试");
  console.log("=".repeat(70));
  
  TokenManager.resetInstance();
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  const token = await tokenManager.getToken();
  console.log(`\n✅ Token: ${token.substring(0, 40)}...\n`);
  
  const tests = [
    { name: "通讯录", uri: "/v7/users?page_size=1", method: "GET", permission: "kso.contact.read" },
    { name: "用户组", uri: "/v7/groups?page_size=1", method: "GET", permission: "kso.group.read" },
    { name: "消息", uri: "/v7/chats?page_size=1", method: "GET", permission: "kso.chat.read" },
    { name: "云盘-应用", uri: "/v7/drives?allotee_type=app&page_size=1", method: "GET", permission: "kso.drive.readwrite" },
    { name: "多维表格", uri: "/v7/coop/dbsheet/test/schema", method: "GET", permission: "kso.dbsheet.read" },
    { name: "日历", uri: "/v7/calendars/primary", method: "GET", permission: "kso.calendar.read" },
  ];
  
  for (const test of tests) {
    console.log(`${test.name} (${test.permission}):`);
    console.log(`   ${test.method} ${test.uri}`);
    
    try {
      const sig = signature.generateSignature({ 
        method: test.method, 
        uri: test.uri, 
        contentType: 'application/json'
      });

      const response = await fetch(`${baseUrl}${test.uri}`, {
        method: test.method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Kso-Date': sig.date,
          'X-Kso-Authorization': sig.authorization,
        },
      });

      const text = await response.text();
      
      if (response.ok) {
        console.log(`   ✅ 可用 (HTTP ${response.status})`);
      } else if (response.status === 404) {
        console.log(`   ✅ 权限正常 (404 - 资源不存在但权限通过)`);
      } else if (response.status === 403) {
        console.log(`   ❌ 权限不足 (HTTP 403)`);
        try {
          const err = JSON.parse(text);
          console.log(`      错误: ${err.msg || err.message || text.substring(0, 50)}`);
        } catch {}
      } else {
        console.log(`   ⚠️  其他错误 (HTTP ${response.status})`);
        console.log(`      ${text.substring(0, 100)}`);
      }
    } catch (error) {
      console.log(`   ❌ 异常: ${error instanceof Error ? error.message : error}`);
    }
    
    console.log();
  }
  
  console.log("=".repeat(70));
  console.log("💡 说明:");
  console.log("   ✅ - 权限已开通且可用");
  console.log("   ❌ - 权限未开通或还在审批中");
  console.log("   ⚠️  - 其他问题");
  console.log("=".repeat(70));
}

if (import.meta.main) {
  testBasicPermissions();
}
