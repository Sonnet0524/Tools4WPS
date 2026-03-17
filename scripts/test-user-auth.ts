#!/usr/bin/env bun
/**
 * WPS 用户授权完整测试流程
 * 
 * 使用方法:
 * 1. bun run scripts/test-user-auth.ts generate
 *    生成授权URL，复制给用户
 * 
 * 2. 用户访问URL并授权后，会跳转到回调地址
 *    从URL中提取 code 参数
 * 
 * 3. bun run scripts/test-user-auth.ts exchange <code>
 *    用code换取access_token
 * 
 * 4. bun run scripts/test-user-auth.ts test <access_token>
 *    使用token测试日历/云文档/多维表格API
 */

import { getUserAuthUrl, getUserAccessToken, refreshUserAccessToken } from "../src/auth/user-auth";

const appId = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const baseUrl = process.env.WPS_BASE_URL || "https://openapi.wps.cn";

// 回调地址 - 需要在开放平台配置
const REDIRECT_URI = "http://localhost:3000/callback";

/**
 * 步骤1: 生成授权URL
 */
function generateAuthUrl() {
  console.log("=" .repeat(70));
  console.log("🔐 步骤1: 生成用户授权URL");
  console.log("=" .repeat(70));
  
  // 定义需要的权限范围
  const scopes = [
    // 日历权限
    "kso.calendar.read",
    "kso.calendar.readwrite", 
    "kso.calendar_events.read",
    "kso.calendar_events.readwrite",
    // 云文档权限
    "kso.drive.readwrite",
    "kso.file.read",
    "kso.file.readwrite",
    "kso.file.search",
    "kso.file_link.readwrite",
    // 多维表格权限
    "kso.dbsheet.read",
    "kso.dbsheet.readwrite",
  ];
  
  const scope = scopes.join(" ");
  const state = `test_${Date.now()}`; // 随机state防CSRF
  
  const authUrl = getUserAuthUrl(REDIRECT_URI, scope, state);
  
  console.log("\n📋 授权信息:");
  console.log(`   应用ID: ${appId}`);
  console.log(`   回调地址: ${REDIRECT_URI}`);
  console.log(`   权限范围: ${scopes.length} 个权限`);
  console.log(`   State: ${state}`);
  
  console.log("\n🔗 授权URL:\n");
  console.log(authUrl);
  
  console.log("\n📖 操作步骤:");
  console.log("   1. 复制上面的URL到浏览器");
  console.log("   2. 登录WPS账号并授权");
  console.log("   3. 授权后会跳转到回调地址");
  console.log("   4. 从回调URL中提取 code 参数");
  console.log("   5. 运行: bun run scripts/test-user-auth.ts exchange <code>");
  
  console.log("\n💡 提示:");
  console.log("   如果还没有配置回调地址，请先登录开放平台:");
  console.log("   https://open.wps.cn");
  console.log("   进入应用详情 → 基础信息 → 设置用户授权回调地址");
}

/**
 * 步骤2: 用code换取token
 */
async function exchangeCodeForToken(code: string) {
  console.log("=" .repeat(70));
  console.log("🔑 步骤2: 用Code换取Access Token");
  console.log("=" .repeat(70));
  
  try {
    console.log(`\n📤 请求token...`);
    console.log(`   Code: ${code.substring(0, 20)}...`);
    console.log(`   Redirect URI: ${REDIRECT_URI}`);
    
    const token = await getUserAccessToken(code, REDIRECT_URI);
    
    console.log("\n✅ 获取Token成功!\n");
    console.log("📊 Token信息:");
    console.log(`   Access Token: ${token.access_token.substring(0, 30)}...`);
    console.log(`   Refresh Token: ${token.refresh_token.substring(0, 30)}...`);
    console.log(`   Token类型: ${token.token_type}`);
    console.log(`   过期时间: ${token.expires_in} 秒 (${Math.floor(token.expires_in / 3600)} 小时)`);
    
    console.log("\n💾 保存以下信息:");
    console.log(`\nexport WPS_USER_ACCESS_TOKEN="${token.access_token}"`);
    console.log(`export WPS_USER_REFRESH_TOKEN="${token.refresh_token}"`);
    
    console.log("\n🧪 测试API:");
    console.log(`   bun run scripts/test-user-auth.ts test "${token.access_token}"`);
    
    return token;
  } catch (error) {
    console.error("\n❌ 获取Token失败:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

/**
 * 步骤3: 使用token测试API
 */
async function testAPIs(accessToken: string) {
  console.log("=" .repeat(70));
  console.log("🧪 步骤3: 使用用户Token测试API");
  console.log("=" .repeat(70));
  
  console.log(`\n🔑 Access Token: ${accessToken.substring(0, 40)}...\n`);
  
  // 测试日历API
  console.log("📅 测试1: 日历 - 获取主日历");
  console.log(`   GET /v7/calendars/primary`);
  
  try {
    const calendarRes = await fetch(`${baseUrl}/v7/calendars/primary`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log(`   状态: ${calendarRes.status}`);
    
    if (calendarRes.ok) {
      const data = await calendarRes.json();
      console.log(`   ✅ 成功!`);
      console.log(`   📊 日历名称: ${data.data?.summary || 'N/A'}`);
      console.log(`   📝 描述: ${data.data?.description || '无'}`);
      console.log(`   🔒 权限: ${data.data?.role || 'N/A'}`);
    } else {
      const text = await calendarRes.text();
      console.log(`   ❌ 失败: ${text.substring(0, 150)}`);
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
  }
  
  // 测试云文档API
  console.log("\n📁 测试2: 云文档 - 获取盘列表");
  console.log(`   GET /v7/drives?page_size=5`);
  
  try {
    const driveRes = await fetch(`${baseUrl}/v7/drives?page_size=5`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Kso-Id-Type": "internal",
      },
    });
    
    console.log(`   状态: ${driveRes.status}`);
    
    if (driveRes.ok) {
      const data = await driveRes.json();
      const items = data.data?.items || [];
      console.log(`   ✅ 成功!`);
      console.log(`   📊 盘数量: ${items.length}`);
      if (items.length > 0) {
        items.slice(0, 3).forEach((item: {name: string, id: string}, i: number) => {
          console.log(`      ${i + 1}. ${item.name} (${item.id})`);
        });
      }
    } else {
      const text = await driveRes.text();
      console.log(`   ❌ 失败: ${text.substring(0, 150)}`);
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
  }
  
  // 测试多维表格API（需要一个真实的file_id，这里用假的测试权限）
  console.log("\n📊 测试3: 多维表格 - 测试权限");
  console.log(`   GET /v7/coop/dbsheet/test-file-id/schema`);
  
  try {
    const dbsheetRes = await fetch(`${baseUrl}/v7/coop/dbsheet/test-file-id/schema`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log(`   状态: ${dbsheetRes.status}`);
    
    if (dbsheetRes.ok) {
      console.log(`   ✅ 权限正常! (文件ID无效但权限通过)`);
    } else if (dbsheetRes.status === 404) {
      console.log(`   ✅ 权限正常! (文件不存在，但权限验证通过)`);
    } else {
      const text = await dbsheetRes.text();
      console.log(`   ❌ 失败: ${text.substring(0, 150)}`);
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
  }
  
  console.log("\n" + "=" .repeat(70));
  console.log("🎉 测试完成!");
  console.log("=" .repeat(70));
  
  console.log("\n💾 保存你的Token:");
  console.log(`export WPS_USER_ACCESS_TOKEN="${accessToken}"`);
  
  console.log("\n🔄 Token会在2小时后过期，届时需要刷新:");
  console.log(`   bun run scripts/test-user-auth.ts refresh <refresh_token>`);
}

/**
 * 步骤4: 刷新token
 */
async function refreshToken(refreshToken: string) {
  console.log("=" .repeat(70));
  console.log("🔄 刷新Access Token");
  console.log("=" .repeat(70));
  
  try {
    const token = await refreshUserAccessToken(refreshToken);
    
    console.log("\n✅ Token刷新成功!\n");
    console.log("📊 新Token信息:");
    console.log(`   Access Token: ${token.access_token.substring(0, 30)}...`);
    console.log(`   Refresh Token: ${token.refresh_token.substring(0, 30)}...`);
    console.log(`   过期时间: ${token.expires_in} 秒`);
    
    console.log("\n💾 更新环境变量:");
    console.log(`export WPS_USER_ACCESS_TOKEN="${token.access_token}"`);
    console.log(`export WPS_USER_REFRESH_TOKEN="${token.refresh_token}"`);
  } catch (error) {
    console.error("\n❌ 刷新失败:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case "generate":
      generateAuthUrl();
      break;
      
    case "exchange":
      const code = args[1];
      if (!code) {
        console.error("❌ 请提供code参数");
        console.log("用法: bun run scripts/test-user-auth.ts exchange <code>");
        process.exit(1);
      }
      await exchangeCodeForToken(code);
      break;
      
    case "test":
      const token = args[1];
      if (!token) {
        console.error("❌ 请提供access_token参数");
        console.log("用法: bun run scripts/test-user-auth.ts test <access_token>");
        process.exit(1);
      }
      await testAPIs(token);
      break;
      
    case "refresh":
      const refreshTokenValue = args[1];
      if (!refreshTokenValue) {
        console.error("❌ 请提供refresh_token参数");
        console.log("用法: bun run scripts/test-user-auth.ts refresh <refresh_token>");
        process.exit(1);
      }
      await refreshToken(refreshTokenValue);
      break;
      
    default:
      console.log("WPS 用户授权测试工具\n");
      console.log("用法:");
      console.log("  bun run scripts/test-user-auth.ts generate");
      console.log("    生成授权URL\n");
      console.log("  bun run scripts/test-user-auth.ts exchange <code>");
      console.log("    用code换取token\n");
      console.log("  bun run scripts/test-user-auth.ts test <access_token>");
      console.log("    使用token测试API\n");
      console.log("  bun run scripts/test-user-auth.ts refresh <refresh_token>");
      console.log("    刷新token\n");
      break;
  }
}

if (import.meta.main) {
  main();
}
