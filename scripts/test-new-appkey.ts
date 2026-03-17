import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
// 使用新的 AppKey
const appKey = "a91eb745db2c2e7ab5f82c7d9a00cb9c";
const baseUrl = "https://openapi.wps.cn";

async function testWithNewAppKey() {
  console.log("=".repeat(70));
  console.log("🆕 使用新 AppKey 测试权限");
  console.log("=".repeat(70));
  console.log("\n📋 配置信息:");
  console.log(`   AppID: ${appId}`);
  console.log(`   AppKey: ${appKey.substring(0, 10)}...${appKey.substring(-10)}`);
  console.log(`   时间: ${new Date().toLocaleString()}\n`);
  
  // 强制重置 TokenManager
  TokenManager.resetInstance();
  
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  console.log("🔄 使用新密钥获取 Token...");
  const token = await tokenManager.getToken();
  console.log(`✅ 新 Token 获取成功!`);
  console.log(`   ${token.substring(0, 50)}...\n`);
  
  const tests = [
    { name: "通讯录", uri: "/v7/users?page_size=1", method: "GET", permission: "kso.contact.read" },
    { name: "用户组", uri: "/v7/groups?page_size=1", method: "GET", permission: "kso.group.read" },
    { name: "消息", uri: "/v7/chats?page_size=1", method: "GET", permission: "kso.chat.read" },
    { name: "云盘-应用", uri: "/v7/drives?allotee_type=app&page_size=1", method: "GET", permission: "kso.drive.readwrite" },
    { name: "多维表格-读", uri: "/v7/coop/dbsheet/test/schema", method: "GET", permission: "kso.dbsheet.read" },
    { name: "多维表格-写", uri: "/v7/coop/dbsheet/test/sheets/create", method: "POST", permission: "kso.dbsheet.readwrite", body: "{}" },
    { name: "日历", uri: "/v7/calendars/primary", method: "GET", permission: "kso.calendar.read" },
  ];
  
  let passedCount = 0;
  let failedCount = 0;
  
  for (const test of tests) {
    console.log(`${test.name} (${test.permission}):`);
    console.log(`   ${test.method} ${test.uri}`);
    
    try {
      const sig = signature.generateSignature({ 
        method: test.method, 
        uri: test.uri, 
        contentType: 'application/json',
        body: test.body
      });

      const headers: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Kso-Date': sig.date,
        'X-Kso-Authorization': sig.authorization,
      };

      const response = await fetch(`${baseUrl}${test.uri}`, {
        method: test.method,
        headers,
        body: test.body,
      });

      const text = await response.text();
      
      if (response.ok) {
        console.log(`   ✅ 可用 (HTTP ${response.status})`);
        passedCount++;
      } else if (response.status === 404) {
        console.log(`   ✅ 权限正常 (404 - 资源不存在但权限通过)`);
        passedCount++;
      } else if (response.status === 403) {
        console.log(`   ❌ 权限不足 (HTTP 403)`);
        try {
          const err = JSON.parse(text);
          console.log(`      ${err.msg || err.message || text.substring(0, 80)}`);
        } catch {
          console.log(`      ${text.substring(0, 80)}`);
        }
        failedCount++;
      } else {
        console.log(`   ⚠️  其他错误 (HTTP ${response.status})`);
        console.log(`      ${text.substring(0, 80)}`);
        failedCount++;
      }
    } catch (error) {
      console.log(`   ❌ 异常: ${error instanceof Error ? error.message : error}`);
      failedCount++;
    }
    
    console.log();
    
    // 稍微延迟，避免限流
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log("=".repeat(70));
  console.log("📊 测试结果汇总");
  console.log("=".repeat(70));
  console.log(`✅ 通过: ${passedCount}/${tests.length}`);
  console.log(`❌ 失败: ${failedCount}/${tests.length}`);
  console.log(`📈 成功率: ${Math.round((passedCount / tests.length) * 100)}%`);
  console.log("=".repeat(70));
  
  if (failedCount === 0) {
    console.log("\n🎉 恭喜! 所有权限已开通!");
  } else if (passedCount > 3) {
    console.log("\n✅ 基础权限已开通，部分高级功能待开通");
  } else {
    console.log("\n⚠️  部分权限仍在审批中，请检查开放平台");
  }
}

if (import.meta.main) {
  testWithNewAppKey();
}

export { testWithNewAppKey };
