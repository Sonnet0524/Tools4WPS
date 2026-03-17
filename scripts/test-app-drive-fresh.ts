import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testWithFreshToken() {
  console.log("=== 使用新Token测试应用盘 ===\n");
  
  // 重置TokenManager获取新Token
  TokenManager.resetInstance();
  
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  console.log("🔄 获取新Token...");
  const token = await tokenManager.getToken();
  console.log(`✅ Token获取成功: ${token.substring(0, 30)}...\n`);
  
  // 测试1: 获取应用盘列表
  console.log("测试1: 获取应用盘列表");
  const uri1 = "/v7/drives?allotee_type=app&page_size=5";
  const sig1 = signature.generateSignature({ method: "GET", uri: uri1, contentType: 'application/json' });
  
  const response1 = await fetch(`${baseUrl}${uri1}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig1.date,
      'X-Kso-Authorization': sig1.authorization,
      'X-Kso-Id-Type': 'internal',
    },
  });
  
  console.log(`   状态: ${response1.status}`);
  if (response1.ok) {
    const data = await response1.json();
    console.log(`   ✅ 成功! 盘数: ${data.data?.items?.length || 0}`);
  } else {
    const text = await response1.text();
    console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
    
    // 解析错误
    try {
      const error = JSON.parse(text);
      console.log(`   📋 错误码: ${error.code}`);
      console.log(`   📋 错误信息: ${error.msg || error.message}`);
    } catch {}
  }
  
  // 测试2: 获取用户盘（对比测试）
  console.log("\n测试2: 获取用户盘列表（对比）");
  const uri2 = "/v7/drives?allotee_type=user&page_size=5";
  const sig2 = signature.generateSignature({ method: "GET", uri: uri2, contentType: 'application/json' });
  
  const response2 = await fetch(`${baseUrl}${uri2}`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig2.date,
      'X-Kso-Authorization': sig2.authorization,
      'X-Kso-Id-Type': 'internal',
    },
  });
  
  console.log(`   状态: ${response2.status}`);
  if (response2.ok) {
    const data = await response2.json();
    console.log(`   ✅ 成功! 盘数: ${data.data?.items?.length || 0}`);
  } else {
    const text = await response2.text();
    console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
  }
}

if (import.meta.main) {
  testWithFreshToken();
}

export { testWithFreshToken };
