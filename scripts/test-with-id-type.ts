import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testWithIdType() {
  console.log("=== 测试 X-Kso-Id-Type 请求头 ===\n");
  
  TokenManager.resetInstance();
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  const token = await tokenManager.getToken();
  const sig = signature.generateSignature({ 
    method: "GET", 
    uri: "/v7/calendars/primary", 
    contentType: 'application/json'
  });

  console.log("测试1: 不带 X-Kso-Id-Type");
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

  console.log("\n测试2: X-Kso-Id-Type: internal");
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
      'X-Kso-Id-Type': 'internal',
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

  console.log("\n测试3: X-Kso-Id-Type: external");
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
      'X-Kso-Id-Type': 'external',
    },
  });
  console.log(`   状态: ${response3.status}`);
  if (!response3.ok) {
    const text = await response3.text();
    console.log(`   错误: ${text.substring(0, 100)}`);
  }
  
  // 测试云文档
  console.log("\n\n测试云文档: /v7/drives");
  TokenManager.resetInstance();
  const token4 = await TokenManager.getInstance({ appId, appKey, baseUrl }).getToken();
  const sig4 = signature.generateSignature({ 
    method: "GET", 
    uri: "/v7/drives?page_size=1", 
    contentType: 'application/json'
  });
  
  const response4 = await fetch(`${baseUrl}/v7/drives?page_size=1`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token4}`,
      'Content-Type': 'application/json',
      'X-Kso-Date': sig4.date,
      'X-Kso-Authorization': sig4.authorization,
      'X-Kso-Id-Type': 'internal',
    },
  });
  console.log(`   状态: ${response4.status}`);
  if (!response4.ok) {
    const text = await response4.text();
    console.log(`   错误: ${text.substring(0, 150)}`);
  } else {
    const data = await response4.json();
    console.log(`   成功! 盘数: ${data.data?.items?.length || 0}`);
  }
}

testWithIdType().catch(console.error);
