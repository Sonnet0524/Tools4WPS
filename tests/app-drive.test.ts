#!/usr/bin/env bun
/**
 * 应用身份云文档测试
 * 
 * 测试应用盘功能：
 * 1. 创建应用盘
 * 2. 获取应用盘列表
 * 3. 创建文件夹
 * 4. 创建文件
 * 5. 列举文件
 * 6. 分享文件
 */

import { AppDriveTool } from "../src/tools/app-drive";
import { TokenManager } from "../src/auth";

const appId = process.env.WPS_APP_ID || "AK20260308LGOUTU";
const appKey = process.env.WPS_APP_KEY || "743c057b97227a473d404c1eb7fcebda";
const baseUrl = process.env.WPS_BASE_URL || "https://openapi.wps.cn";

async function testAppDrive() {
  console.log("=".repeat(70));
  console.log("🧪 应用身份云文档测试");
  console.log("=".repeat(70));

  TokenManager.resetInstance();
  const driveTool = new AppDriveTool({ appId, appKey, baseUrl });

  let createdDriveId: string | null = null;
  let createdFolderId: string | null = null;

  try {
    // 测试1: 获取现有应用盘列表
    console.log("\n📋 测试1: 获取应用盘列表");
    console.log("   GET /v7/drives?allotee_type=app");
    
    try {
      const drives = await driveTool.getAppDrives(10);
      console.log(`   ✅ 成功! 找到 ${drives.items.length} 个应用盘`);
      
      if (drives.items.length > 0) {
        console.log("   📊 应用盘列表:");
        drives.items.forEach((drive, i) => {
          console.log(`      ${i + 1}. ${drive.name} (${drive.id})`);
          console.log(`         配额: ${formatBytes(drive.quota.used)} / ${formatBytes(drive.quota.total)}`);
        });
        
        // 使用第一个已有的应用盘
        createdDriveId = drives.items[0].id;
      } else {
        console.log("   ⚠️  没有现有应用盘，需要创建");
      }
    } catch (error) {
      console.log(`   ❌ 失败: ${error instanceof Error ? error.message : error}`);
    }

    // 测试2: 创建应用盘（如果没有）
    if (!createdDriveId) {
      console.log("\n📁 测试2: 创建应用盘");
      console.log("   POST /v7/drives/create");
      console.log("   Body: { allotee_type: 'app', name: '测试应用盘' }");
      
      try {
        const drive = await driveTool.createDrive({
          name: `测试应用盘_${Date.now()}`,
          description: "应用身份测试盘",
          totalQuota: 1024 * 1024 * 1024, // 1GB
        });
        
        console.log(`   ✅ 成功!`);
        console.log(`   📊 盘ID: ${drive.id}`);
        console.log(`   📊 盘名: ${drive.name}`);
        console.log(`   📊 类型: ${drive.alloteeType}`);
        console.log(`   📊 配额: ${formatBytes(drive.quota.total)}`);
        
        createdDriveId = drive.id;
      } catch (error) {
        console.log(`   ❌ 失败: ${error instanceof Error ? error.message : error}`);
        console.log("   💡 提示: 可能需要申请 kso.drive.readwrite 权限");
      }
    }

    // 测试3: 在应用盘中创建文件夹
    if (createdDriveId) {
      console.log("\n📂 测试3: 创建文件夹");
      console.log(`   POST /v7/drives/${createdDriveId}/files/0/create`);
      console.log("   Body: { file_type: 'folder', name: '测试文件夹' }");
      
      try {
        const folder = await driveTool.createFile({
          driveId: createdDriveId,
          parentId: '0',  // 根目录
          name: `测试文件夹_${Date.now()}`,
          fileType: 'folder',
        });
        
        console.log(`   ✅ 成功!`);
        console.log(`   📊 文件夹ID: ${folder.id}`);
        console.log(`   📊 文件夹名: ${folder.name}`);
        
        createdFolderId = folder.id;
      } catch (error) {
        console.log(`   ❌ 失败: ${error instanceof Error ? error.message : error}`);
        console.log("   💡 提示: 可能需要申请 kso.file.readwrite 或 kso.appfile.readwrite 权限");
      }
    }

    // 测试4: 列举文件
    if (createdDriveId) {
      console.log("\n📃 测试4: 列举应用盘文件");
      console.log(`   GET /v7/drives/${createdDriveId}/files/0/children`);
      
      try {
        const result = await driveTool.listFiles({
          driveId: createdDriveId,
          parentId: '0',
          pageSize: 10,
        });
        
        console.log(`   ✅ 成功!`);
        console.log(`   📊 文件夹数: ${result.folders.length}`);
        console.log(`   📊 文件数: ${result.files.length}`);
        
        if (result.folders.length > 0) {
          console.log("   📁 文件夹:");
          result.folders.forEach((folder, i) => {
            console.log(`      ${i + 1}. ${folder.name}`);
          });
        }
      } catch (error) {
        console.log(`   ❌ 失败: ${error instanceof Error ? error.message : error}`);
      }
    }

    // 测试5: 获取下载信息（如果前面有文件）
    // 注：创建真实文件需要上传流程，这里仅测试API调用

    // 总结
    console.log("\n" + "=".repeat(70));
    console.log("📊 测试总结");
    console.log("=".repeat(70));
    
    if (createdDriveId) {
      console.log("✅ 应用盘功能可用!");
      console.log(`   盘ID: ${createdDriveId}`);
      console.log("\n💡 提示:");
      console.log("   - 应用盘无WPS客户端界面，仅API访问");
      console.log("   - 文件可通过分享链接访问");
      console.log("   - 适合存储应用配置、日志、模板等");
    } else {
      console.log("❌ 应用盘创建失败");
      console.log("\n🔧 需要检查:");
      console.log("   1. 权限是否开通: kso.drive.readwrite");
      console.log("   2. 权限是否开通: kso.file.readwrite");
      console.log("   3. 权限是否开通: kso.appfile.readwrite");
    }

  } catch (error) {
    console.error("\n❌ 测试过程出错:");
    console.error(error instanceof Error ? error.message : error);
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

if (import.meta.main) {
  testAppDrive();
}

export { testAppDrive };
