import { TokenManager, Signature } from "../src/auth";
import { ContactsTool } from "../src/tools/contacts";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testWithUserId() {
  console.log("=== 测试添加用户ID请求头 ===\n");
  
  // 首先获取一个用户ID
  const contactsTool = new ContactsTool({ appId, appKey, baseUrl });
  const users = await contactsTool.getUsers({ pageSize: 1 });
  
  if (users.items.length === 0) {
    console.log("❌ 没有获取到用户");
    return;
  }
  
  const userId = users.items[0].id;
  console.log(`✅ 获取到用户ID: ${userId}\n`);
  
  // 测试日历API，添加用户ID请求头
  TokenManager.resetInstance();
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  const token = await tokenManager.getToken();
  const sig = signature.generateSignature({ 
    method: "GET", 
    uri: "/v7/calendars/primary", 
    contentType: 'application/json'
  });

  console.log("测试1: 不带用户ID请求头");
  const response1 = await fetch(`${baseUrl}/v7/calendars/primary`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig.date,
      'X-Kso-Authorization': sig.authorization,
    },
  });
  console.log(`   状态: ${response1.status}`);
  if (!response1.ok) {
    const text = await response1.text();
    console.log(`   错误: ${text.substring(0, 100)}`);
  }

  console.log("\n测试2: 带用户ID请求头 (X-Kso-User-Id)");
  TokenManager.resetInstance();
  const token2 = await TokenManager.getInstance({ appId, appKey, baseUrl }).getToken();
  const sig2 = signature.generateSignature({ 
    method: "GET", 
    uri: "/v7/calendars/primary", 
    contentType: 'application/json'
  });
  
  const response2 = await fetch(`${baseUrl}/v7/calendars/primary`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token2}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig2.date,
      'X-Kso-Authorization': sig2.authorization,
      'X-Kso-User-Id': userId,  // 添加用户ID
    },
  });
  console.log(`   状态: ${response2.status}`);
  if (!response2.ok) {
    const text = await response2.text();
    console.log(`   错误: ${text.substring(0, 100)}`);
  } else {
    const data = await response2.json();
    console.log(`   成功! 日历: ${data.data?.summary || 'N/A'}`);
  }

  console.log("\n测试3: 带用户ID请求头 (X-User-Id)");
  TokenManager.resetInstance();
  const token3 = await TokenManager.getInstance({ appId, appKey, baseUrl }).getToken();
  const sig3 = signature.generateSignature({ 
    method: "GET", 
    uri: "/v7/calendars/primary", 
    contentType: 'application/json'
  });
  
  const response3 = await fetch(`${baseUrl}/v7/calendars/primary`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token3}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig3.date,
      'X-Kso-Authorization': sig3.authorization,
      'X-User-Id': userId,  // 另一种可能的名字
    },
  });
  console.log(`   状态: ${response3.status}`);
  if (!response3.ok) {
    const text = await response3.text();
    console.log(`   错误: ${text.substring(0, 100)}`);
  }
}

testWithUserId().catch(console.error);
