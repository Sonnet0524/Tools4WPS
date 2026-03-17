import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testWithForceRefresh() {
  console.log("=".repeat(70));
  console.log("🔄 强制刷新Token测试");
  console.log("=".repeat(70));
  console.log("\n💡 原理: TokenManager单例模式可能缓存了旧Token");
  console.log("   通过修改内部状态强制获取新Token\n");
  
  // 方法1: 重置TokenManager
  TokenManager.resetInstance();
  
  // 方法2: 等待一会儿再获取Token（确保Token过期）
  console.log("⏳ 等待2秒...");
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  console.log("🔄 获取Token...");
  const token = await tokenManager.getToken();
  console.log(`✅ Token: ${token.substring(0, 50)}...\n`);
  
  // 测试多维表格
  console.log("📊 测试多维表格权限:");
  const uri = "/v7/coop/dbsheet/test_file_123/schema";
  const sig = signature.generateSignature({ 
    method: "GET", 
    uri, 
    contentType: 'application/json'
  });

  const response = await fetch(`${baseUrl}${uri}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig.date,
      'X-Kso-Authorization': sig.authorization,
    },
  });

  console.log(`   状态: ${response.status}`);
  const text = await response.text();
  console.log(`   响应: ${text.substring(0, 200)}`);
  
  if (response.status === 403) {
    console.log("\n❌ 仍然403，说明:");
    console.log("   1. 权限还在审批中，或");
    console.log("   2. 企业未购买此功能，或");
    console.log("   3. 权限申请有误\n");
    console.log("🔍 请检查开放平台:");
    console.log("   - 权限状态是否为'已通过'");
    console.log("   - 企业是否购买了多维表格功能");
  } else if (response.status === 404) {
    console.log("\n✅ 权限已开通! (404说明权限正常，只是文件不存在)");
  } else if (response.ok) {
    console.log("\n✅ 权限已开通且API正常!");
  }
  
  console.log("\n" + "=".repeat(70));
  
  // 显示当前时间
  console.log("\n🕐 测试时间:", new Date().toLocaleString());
  console.log("💡 如果权限刚刚审批通过，可能需要:");
  console.log("   - 等待5-10分钟让权限生效");
  console.log("   - 或者重新生成应用密钥对");
}

if (import.meta.main) {
  testWithForceRefresh();
}

export { testWithForceRefresh };
