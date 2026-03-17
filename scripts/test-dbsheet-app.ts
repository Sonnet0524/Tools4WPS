import { TokenManager, Signature } from "../src/auth";

const appId = "AK20260308LGOUTU";
const appKey = "743c057b97227a473d404c1eb7fcebda";
const baseUrl = "https://openapi.wps.cn";

async function testDBSheetWithAppAuth() {
  console.log("=".repeat(70));
  console.log("🧪 多维表格应用授权测试");
  console.log("=".repeat(70));
  console.log("\n应用ID:", appId);
  console.log("时间:", new Date().toLocaleString());
  
  // 重置TokenManager获取新Token
  TokenManager.resetInstance();
  const tokenManager = TokenManager.getInstance({ appId, appKey, baseUrl });
  const signature = new Signature(appId, appKey);
  
  console.log("\n🔄 获取应用Token...");
  const token = await tokenManager.getToken();
  console.log(`✅ Token获取成功: ${token.substring(0, 40)}...\n`);
  
  // 使用一个示例file_id测试（即使不存在，可以测试权限）
  const testFileId = "test_dbsheet_file_12345";
  
  // 测试1: 获取Schema
  console.log("📊 测试1: 获取多维表格Schema");
  console.log(`   GET /v7/coop/dbsheet/${testFileId}/schema`);
  
  const uri1 = `/v7/coop/dbsheet/${testFileId}/schema`;
  const sig1 = signature.generateSignature({ 
    method: "GET", 
    uri: uri1, 
    contentType: 'application/json'
  });

  try {
    const response1 = await fetch(`${baseUrl}${uri1}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Kso-Date': sig1.date,
        'X-Kso-Authorization': sig1.authorization,
      },
    });

    console.log(`   状态: ${response1.status}`);
    const text1 = await response1.text();
    
    if (response1.ok) {
      console.log(`   ✅ 成功!`);
      try {
        const data = JSON.parse(text1);
        console.log(`   📊 工作表数量: ${data.data?.sheets?.length || 0}`);
        if (data.data?.sheets?.length > 0) {
          console.log("   📋 工作表列表:");
          data.data.sheets.forEach((sheet: {name: string, id: number}, i: number) => {
            console.log(`      ${i + 1}. ${sheet.name} (ID: ${sheet.id})`);
          });
        }
      } catch {
        console.log(`   📄 响应: ${text1.substring(0, 200)}`);
      }
    } else {
      console.log(`   ❌ 失败: ${text1.substring(0, 200)}`);
      
      try {
        const error = JSON.parse(text1);
        if (error.code === 403000001 || response1.status === 403) {
          console.log("\n   ⚠️  权限错误:");
          console.log("      - 权限可能还在审批中");
          console.log("      - 或 Token 缓存了旧权限");
          console.log("      - 请检查 kso.dbsheet.read 权限状态");
        } else if (response1.status === 404) {
          console.log("\n   ✅ 权限正常! (文件不存在，但权限验证通过)");
        }
      } catch {}
    }
  } catch (error) {
    console.log(`   ❌ 异常: ${error instanceof Error ? error.message : error}`);
  }
  
  // 测试2: 列举记录
  console.log("\n📋 测试2: 列举记录");
  console.log(`   POST /v7/coop/dbsheet/${testFileId}/sheets/0/records`);
  
  const uri2 = `/v7/coop/dbsheet/${testFileId}/sheets/0/records`;
  const sig2 = signature.generateSignature({ 
    method: "POST", 
    uri: uri2, 
    contentType: 'application/json',
    body: '{}'
  });

  try {
    const response2 = await fetch(`${baseUrl}${uri2}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Kso-Date': sig2.date,
        'X-Kso-Authorization': sig2.authorization,
      },
      body: '{}'
    });

    console.log(`   状态: ${response2.status}`);
    const text2 = await response2.text();
    
    if (response2.ok) {
      console.log(`   ✅ 成功!`);
      try {
        const data = JSON.parse(text2);
        console.log(`   📊 记录数量: ${data.data?.records?.length || 0}`);
      } catch {
        console.log(`   📄 响应: ${text2.substring(0, 200)}`);
      }
    } else {
      console.log(`   ❌ 失败: ${text2.substring(0, 200)}`);
      
      try {
        const error = JSON.parse(text2);
        if (response2.status === 404) {
          console.log("\n   ✅ 权限正常! (工作表不存在，但权限验证通过)");
        }
      } catch {}
    }
  } catch (error) {
    console.log(`   ❌ 异常: ${error instanceof Error ? error.message : error}`);
  }
  
  // 测试3: 创建工作表
  console.log("\n➕ 测试3: 创建工作表");
  console.log(`   POST /v7/coop/dbsheet/${testFileId}/sheets/create`);
  
  const uri3 = `/v7/coop/dbsheet/${testFileId}/sheets/create`;
  const body3 = JSON.stringify({
    name: "测试工作表",
    fields: [
      { name: "文本字段", type: "MultiLineText" },
      { name: "数字字段", type: "Number" }
    ],
    views: [
      { name: "表格视图", type: "Grid" }
    ]
  });
  const sig3 = signature.generateSignature({ 
    method: "POST", 
    uri: uri3, 
    contentType: 'application/json',
    body: body3
  });

  try {
    const response3 = await fetch(`${baseUrl}${uri3}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Kso-Date': sig3.date,
        'X-Kso-Authorization': sig3.authorization,
      },
      body: body3
    });

    console.log(`   状态: ${response3.status}`);
    const text3 = await response3.text();
    
    if (response3.ok) {
      console.log(`   ✅ 成功!`);
      try {
        const data = JSON.parse(text3);
        console.log(`   📊 工作表ID: ${data.data?.sheet?.id}`);
        console.log(`   📊 工作表名: ${data.data?.sheet?.name}`);
      } catch {
        console.log(`   📄 响应: ${text3.substring(0, 200)}`);
      }
    } else {
      console.log(`   ❌ 失败: ${text3.substring(0, 200)}`);
      
      try {
        const error = JSON.parse(text3);
        if (response3.status === 404) {
          console.log("\n   ✅ 写入权限正常! (文件不存在，但权限验证通过)");
        }
      } catch {}
    }
  } catch (error) {
    console.log(`   ❌ 异常: ${error instanceof Error ? error.message : error}`);
  }
  
  console.log("\n" + "=".repeat(70));
  console.log("🎉 测试完成!");
  console.log("=".repeat(70));
  console.log("\n💡 结果说明:");
  console.log("   - 如果显示'权限正常'或'404'，说明权限已开通");
  console.log("   - 如果显示'403'，说明权限还在审批中");
  console.log("   - 需要真实的多维表格file_id才能进行完整测试");
}

if (import.meta.main) {
  testDBSheetWithAppAuth();
}

export { testDBSheetWithAppAuth };
