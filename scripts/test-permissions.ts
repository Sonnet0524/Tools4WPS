import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testEndpoint(name: string, method: string, uri: string) {
  console.log(`\n📋 测试: ${name}`);
  console.log(`   端点: ${method} ${uri}`);
  
  try {
    TokenManager.resetInstance();
    const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
    const signature = new Signature(appId, appKey);
    
    const token = await tokenManager.getToken();
    const sig = signature.generateSignature({ 
      method, 
      uri, 
      contentType: 'application/json'
    });

    const response = await fetch(`${baseUrl}${uri}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Kso-Date': sig.date,
        'X-Kso-Authorization': sig.authorization,
      },
    });

    const text = await response.text();
    
    if (response.ok) {
      console.log(`   ✅ 成功 (HTTP ${response.status})`);
      return { ok: true, status: response.status };
    } else {
      console.log(`   ❌ 失败 (HTTP ${response.status})`);
      try {
        const json = JSON.parse(text);
        console.log(`      错误: ${json.msg || json.code || text}`);
      } catch {
        console.log(`      响应: ${text.substring(0, 150)}`);
      }
      return { ok: false, status: response.status, text };
    }
  } catch (error) {
    console.log(`   ❌ 异常: ${error instanceof Error ? error.message : error}`);
    return { ok: false, error };
  }
}

async function main() {
  console.log("=".repeat(60));
  console.log("🔍 WPS API 权限验证");
  console.log("=".repeat(60));
  console.log(`\n应用ID: ${appId}`);
  console.log(`时间: ${new Date().toLocaleString()}`);
  
  const results = {
    calendar: await testEndpoint("日历-获取主日历", "GET", "/v7/calendars/primary"),
    drive: await testEndpoint("云文档-获取盘列表", "GET", "/v7/drives?page_size=1"),
    dbsheet: await testEndpoint("多维表格-获取Schema", "GET", "/v7/coop/dbsheet/test-file-id/schema"),
  };
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 测试结果摘要");
  console.log("=".repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  for (const [name, result] of Object.entries(results)) {
    if (result.ok) {
      console.log(`✅ ${name}: 权限正常`);
      passed++;
    } else {
      console.log(`❌ ${name}: 权限不足或功能未开通`);
      failed++;
    }
  }
  
  console.log("\n" + "=".repeat(60));
  console.log(`总计: ${passed} 通过, ${failed} 失败`);
  console.log("=".repeat(60));
  
  if (failed > 0) {
    console.log("\n💡 说明:");
    console.log("   如果显示403错误，可能原因:");
    console.log("   1. 企业未开通该功能");
    console.log("   2. 应用权限未申请或未审批");
    console.log("   3. 用户未授权该应用访问此功能");
    console.log("\n   请在 WPS 开放平台检查:");
    console.log("   - 应用管理 → 权限管理");
    console.log("   - 企业管理员审批状态");
  }
}

if (import.meta.main) {
  main();
}
