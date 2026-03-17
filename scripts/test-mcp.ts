#!/usr/bin/env bun
/**
 * WPS MCP (Model Context Protocol) 测试工具
 * 
 * 使用方法:
 * 1. 在 WPS 开放平台获取用户 Access Token
 *    登录 https://open.wps.cn → 应用详情 → API测试工具 → 获取用户Token
 * 
 * 2. bun run scripts/test-mcp.ts test <access_token>
 *    测试日历/云文档/多维表格API
 * 
 * MCP Server 端点:
 * - 日历: https://openapi.wps.cn/mcp/v2/kso-calendar/message
 * - 云文档: https://openapi.wps.cn/mcp/v2/kso-file/message
 * - 多维表格: https://openapi.wps.cn/mcp/v2/kso-dbsheet/message
 */

const appId = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const baseUrl = process.env.WPS_BASE_URL || "https://openapi.wps.cn";

// MCP Server 端点
const MCP_ENDPOINTS = {
  calendar: "https://openapi.wps.cn/mcp/v2/kso-calendar/message",
  file: "https://openapi.wps.cn/mcp/v2/kso-file/message", 
  dbsheet: "https://openapi.wps.cn/mcp/v2/kso-dbsheet/message",
};

/**
 * 显示如何获取用户Token
 */
function showTokenGuide() {
  console.log("=".repeat(70));
  console.log("🔑 如何获取用户 Access Token");
  console.log("=".repeat(70));
  
  console.log("\n方法1: 通过开放平台测试工具（最简单）");
  console.log("   1. 登录 https://open.wps.cn");
  console.log("   2. 进入你的应用详情页");
  console.log("   3. 找到 'API测试工具' 或 '接口调试'");
  console.log("   4. 选择 '用户授权' 模式");
  console.log("   5. 扫码登录获取 Access Token");
  console.log("   6. 复制Token使用\n");
  
  console.log("方法2: 通过MCP Server列表获取");
  console.log("   1. 登录 https://open.wps.cn");
  console.log("   2. 进入 MCP → 工具列表");
  console.log("   3. 选择需要的工具（日历/云文档/多维表格）");
  console.log("   4. 点击 '获取 Token'");
  console.log("   5. 扫码授权后复制Token\n");
  
  console.log("方法3: 如果你本地有浏览器，可以用之前的用户授权流程");
  console.log("   bun run scripts/test-user-auth.ts generate");
  console.log("   复制URL在本地浏览器打开，授权后看浏览器地址栏的code参数");
  console.log("   然后: bun run scripts/test-user-auth.ts exchange <code>\n");
  
  console.log("=".repeat(70));
  console.log("💡 提示: Token有效期2小时，获取后可以多次使用");
  console.log("=".repeat(70));
}

/**
 * 直接使用用户Token测试原始API（不是MCP方式）
 */
async function testWithUserToken(accessToken: string) {
  console.log("=".repeat(70));
  console.log("🧪 使用用户Token直接测试API");
  console.log("=".repeat(70));
  console.log(`\n🔑 Token: ${accessToken.substring(0, 40)}...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  // 测试1: 日历 - 获取主日历
  console.log("📅 测试1: 日历 - 获取主日历");
  console.log(`   GET ${baseUrl}/v7/calendars/primary`);
  console.log(`   Headers: Authorization: Bearer <token>`);
  
  try {
    const response = await fetch(`${baseUrl}/v7/calendars/primary`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log(`   状态: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`   ✅ 成功!`);
      console.log(`   📊 日历名称: ${data.data?.summary || 'N/A'}`);
      console.log(`   📝 描述: ${data.data?.description || '无'}`);
      console.log(`   🔒 权限: ${data.data?.role || 'N/A'}`);
      console.log(`   📅 类型: ${data.data?.type || 'N/A'}`);
      successCount++;
    } else {
      const text = await response.text();
      console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
      failCount++;
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
    failCount++;
  }
  
  // 测试2: 日历 - 获取日程列表
  console.log("\n📅 测试2: 日历 - 获取日程列表");
  const now = new Date();
  const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const endTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
  const eventsUrl = `${baseUrl}/v7/calendars/primary/events?start_time=${encodeURIComponent(startTime)}&end_time=${encodeURIComponent(endTime)}&page_size=10`;
  
  console.log(`   GET ${eventsUrl}`);
  
  try {
    const response = await fetch(eventsUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log(`   状态: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      const items = data.data?.items || [];
      console.log(`   ✅ 成功!`);
      console.log(`   📊 日程数量: ${items.length}`);
      if (items.length > 0) {
        items.slice(0, 3).forEach((item: {summary: string, start_time: {date?: string, datetime?: string}}, i: number) => {
          const time = item.start_time?.date || item.start_time?.datetime || 'N/A';
          console.log(`      ${i + 1}. ${item.summary} (${time})`);
        });
      }
      successCount++;
    } else {
      const text = await response.text();
      console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
      failCount++;
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
    failCount++;
  }
  
  // 测试3: 云文档 - 获取盘列表
  console.log("\n📁 测试3: 云文档 - 获取盘列表");
  console.log(`   GET ${baseUrl}/v7/drives?page_size=5`);
  
  try {
    const response = await fetch(`${baseUrl}/v7/drives?page_size=5`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Kso-Id-Type": "internal",
      },
    });
    
    console.log(`   状态: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      const items = data.data?.items || [];
      console.log(`   ✅ 成功!`);
      console.log(`   📊 盘数量: ${items.length}`);
      if (items.length > 0) {
        items.forEach((item: {name: string, id: string, drive_type?: string}, i: number) => {
          console.log(`      ${i + 1}. ${item.name} (类型: ${item.drive_type || 'unknown'})`);
        });
      }
      successCount++;
    } else {
      const text = await response.text();
      console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
      failCount++;
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
    failCount++;
  }
  
  // 测试4: 云文档 - 搜索文件
  console.log("\n🔍 测试4: 云文档 - 搜索文件");
  const searchUrl = `${baseUrl}/v7/files/search?keyword=test&page_size=5`;
  console.log(`   GET ${searchUrl}`);
  
  try {
    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "X-Kso-Id-Type": "internal",
      },
    });
    
    console.log(`   状态: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      const files = data.data?.files || [];
      console.log(`   ✅ 成功!`);
      console.log(`   📊 搜索结果: ${files.length} 个文件`);
      if (files.length > 0) {
        files.slice(0, 3).forEach((file: {name: string, id: string}, i: number) => {
          console.log(`      ${i + 1}. ${file.name}`);
        });
      }
      successCount++;
    } else {
      const text = await response.text();
      console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
      failCount++;
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
    failCount++;
  }
  
  // 测试5: 多维表格 - 获取Schema（需要一个真实的file_id）
  console.log("\n📊 测试5: 多维表格 - 测试权限");
  console.log(`   GET ${baseUrl}/v7/coop/dbsheet/test-file-id/schema`);
  
  try {
    const response = await fetch(`${baseUrl}/v7/coop/dbsheet/test-file-id/schema`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    
    console.log(`   状态: ${response.status}`);
    
    if (response.ok) {
      console.log(`   ✅ 权限正常!`);
      successCount++;
    } else if (response.status === 404) {
      console.log(`   ✅ 权限正常! (文件不存在，但权限验证通过)`);
      successCount++;
    } else {
      const text = await response.text();
      console.log(`   ❌ 失败: ${text.substring(0, 200)}`);
      failCount++;
    }
  } catch (error) {
    console.log(`   ❌ 错误: ${error instanceof Error ? error.message : error}`);
    failCount++;
  }
  
  // 总结
  console.log("\n" + "=".repeat(70));
  console.log("📊 测试结果汇总");
  console.log("=".repeat(70));
  console.log(`✅ 成功: ${successCount} 个API`);
  console.log(`❌ 失败: ${failCount} 个API`);
  console.log(`📈 通过率: ${Math.round((successCount / (successCount + failCount)) * 100)}%`);
  console.log("=".repeat(70));
  
  if (failCount === 0) {
    console.log("\n🎉 恭喜! 所有API权限都已开通，可以正常使用!");
    console.log("\n💾 保存你的Token，可以在工具类中使用:");
    console.log(`export WPS_USER_ACCESS_TOKEN="${accessToken}"`);
  } else {
    console.log("\n⚠️  部分API测试失败，请检查:");
    console.log("   1. Token是否过期（2小时）");
    console.log("   2. 企业是否开通了相应功能");
    console.log("   3. 应用是否有相应权限");
  }
}

/**
 * 显示MCP Server信息
 */
function showMCPEndpoints() {
  console.log("=".repeat(70));
  console.log("🔗 MCP Server 端点");
  console.log("=".repeat(70));
  
  console.log("\nMCP (Model Context Protocol) 是WPS提供的新型API调用方式:");
  console.log("- 基于HTTP协议");
  console.log("- 统一接口格式");
  console.log("- 支持工具发现和调用\n");
  
  console.log("可用的MCP Server:");
  Object.entries(MCP_ENDPOINTS).forEach(([name, url]) => {
    console.log(`\n${name.toUpperCase()}:`);
    console.log(`   URL: ${url}`);
    console.log(`   使用: POST ${url}`);
    console.log(`   Headers: Authorization: Bearer <access_token>`);
  });
  
  console.log("\n💡 使用Cursor配置示例:");
  console.log(JSON.stringify({
    mcpServers: {
      wps_calendar: {
        url: MCP_ENDPOINTS.calendar,
        headers: {
          Authorization: "Bearer {access_token}"
        }
      }
    }
  }, null, 2));
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case "guide":
      showTokenGuide();
      break;
      
    case "test":
      const token = args[1];
      if (!token) {
        console.error("❌ 请提供access_token参数");
        console.log("\n用法: bun run scripts/test-mcp.ts test <access_token>\n");
        console.log("不知道如何获取token? 运行:");
        console.log("   bun run scripts/test-mcp.ts guide\n");
        process.exit(1);
      }
      await testWithUserToken(token);
      break;
      
    case "endpoints":
      showMCPEndpoints();
      break;
      
    default:
      console.log("WPS MCP 测试工具\n");
      console.log("用法:");
      console.log("  bun run scripts/test-mcp.ts guide");
      console.log("    显示如何获取用户Access Token\n");
      console.log("  bun run scripts/test-mcp.ts test <access_token>");
      console.log("    使用token测试日历/云文档/多维表格API\n");
      console.log("  bun run scripts/test-mcp.ts endpoints");
      console.log("    显示MCP Server端点信息\n");
      
      console.log("快速开始:");
      console.log("  1. 获取Token: bun run scripts/test-mcp.ts guide");
      console.log("  2. 测试API: bun run scripts/test-mcp.ts test <your_token>\n");
      break;
  }
}

if (import.meta.main) {
  main();
}
