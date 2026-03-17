import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testDBSheet() {
  console.log("=== 测试多维表格 API ===\n");
  
  TokenManager.resetInstance();
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  const token = await tokenManager.getToken();
  const sig = signature.generateSignature({ 
    method: "GET", 
    uri: "/v7/coop/dbsheet/test-file-id/schema", 
    contentType: 'application/json'
  });

  console.log("测试多维表格: /v7/coop/dbsheet/{file_id}/schema");
  const response = await fetch(`${baseUrl}/v7/coop/dbsheet/test-file-id/schema`, {
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
}

testDBSheet().catch(console.error);
