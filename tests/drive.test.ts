import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { DriveTool } from "../src/tools/drive";
import { TokenManager } from "../src/auth";

// 测试配置 - 使用环境变量或默认值
const TEST_CONFIG = {
  appId: process.env.WPS_APP_ID || "test_app_id",
  appKey: process.env.WPS_APP_KEY || "test_app_key",
  baseUrl: process.env.WPS_BASE_URL || "https://openapi.wps.cn",
};

describe("DriveTool", () => {
  let driveTool: DriveTool;

  beforeEach(() => {
    // 重置 TokenManager 实例以确保测试隔离
    TokenManager.resetInstance();
    driveTool = new DriveTool(TEST_CONFIG);
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("配置与初始化", () => {
    it("应该正确初始化 DriveTool 实例", () => {
      expect(driveTool).toBeDefined();
    });

    it("应该使用默认 baseUrl", () => {
      const tool = new DriveTool({
        appId: "test",
        appKey: "test",
      });
      expect(tool).toBeDefined();
    });

    it("应该使用自定义 baseUrl", () => {
      const tool = new DriveTool({
        appId: "test",
        appKey: "test",
        baseUrl: "https://custom.wps.cn",
      });
      expect(tool).toBeDefined();
    });
  });

  describe("参数验证", () => {
    describe("listFiles 参数验证", () => {
      it("当 driveId 为空时应抛出错误", async () => {
        await expect(
          driveTool.listFiles({
            driveId: "",
            parentId: "0",
            pageSize: 10,
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });

      it("当 parentId 为空时应抛出错误", async () => {
        await expect(
          driveTool.listFiles({
            driveId: "drive123",
            parentId: "",
            pageSize: 10,
          })
        ).rejects.toThrow("parentId is required and cannot be empty");
      });

      it("当 driveId 只有空格时应抛出错误", async () => {
        await expect(
          driveTool.listFiles({
            driveId: "   ",
            parentId: "0",
            pageSize: 10,
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });
    });

    describe("createFolder 参数验证", () => {
      it("当 driveId 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFolder({
            driveId: "",
            parentId: "0",
            name: "test",
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });

      it("当 parentId 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFolder({
            driveId: "drive123",
            parentId: "",
            name: "test",
          })
        ).rejects.toThrow("parentId is required and cannot be empty");
      });

      it("当 name 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFolder({
            driveId: "drive123",
            parentId: "0",
            name: "",
          })
        ).rejects.toThrow("name is required and cannot be empty");
      });

      it("当 name 只有空格时应抛出错误", async () => {
        await expect(
          driveTool.createFolder({
            driveId: "drive123",
            parentId: "0",
            name: "   ",
          })
        ).rejects.toThrow("name is required and cannot be empty");
      });
    });

    describe("createFile 参数验证", () => {
      it("当 driveId 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFile({
            driveId: "",
            parentId: "0",
            name: "test.docx",
            fileType: "file",
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });

      it("当 parentId 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFile({
            driveId: "drive123",
            parentId: "",
            name: "test.docx",
            fileType: "file",
          })
        ).rejects.toThrow("parentId is required and cannot be empty");
      });

      it("当 name 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFile({
            driveId: "drive123",
            parentId: "0",
            name: "",
            fileType: "file",
          })
        ).rejects.toThrow("name is required and cannot be empty");
      });

      it("当 fileType 为空时应抛出错误", async () => {
        await expect(
          driveTool.createFile({
            driveId: "drive123",
            parentId: "0",
            name: "test.docx",
            fileType: "" as any,
          })
        ).rejects.toThrow("fileType is required");
      });
    });

    describe("deleteFile 参数验证", () => {
      it("当 driveId 为空时应抛出错误", async () => {
        await expect(
          driveTool.deleteFile({
            driveId: "",
            fileId: "file123",
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });

      it("当 fileId 为空时应抛出错误", async () => {
        await expect(
          driveTool.deleteFile({
            driveId: "drive123",
            fileId: "",
          })
        ).rejects.toThrow("fileId is required and cannot be empty");
      });
    });

    describe("getDownloadInfo 参数验证", () => {
      it("当 driveId 为空时应抛出错误", async () => {
        await expect(
          driveTool.getDownloadInfo({
            driveId: "",
            fileId: "file123",
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });

      it("当 fileId 为空时应抛出错误", async () => {
        await expect(
          driveTool.getDownloadInfo({
            driveId: "drive123",
            fileId: "",
          })
        ).rejects.toThrow("fileId is required and cannot be empty");
      });
    });

    describe("shareFile 参数验证", () => {
      it("当 driveId 为空时应抛出错误", async () => {
        await expect(
          driveTool.shareFile({
            driveId: "",
            fileId: "file123",
            roleId: "read",
            scope: "anyone",
          })
        ).rejects.toThrow("driveId is required and cannot be empty");
      });

      it("当 fileId 为空时应抛出错误", async () => {
        await expect(
          driveTool.shareFile({
            driveId: "drive123",
            fileId: "",
            roleId: "read",
            scope: "anyone",
          })
        ).rejects.toThrow("fileId is required and cannot be empty");
      });

      it("当 roleId 为空时应抛出错误", async () => {
        await expect(
          driveTool.shareFile({
            driveId: "drive123",
            fileId: "file123",
            roleId: "",
            scope: "anyone",
          })
        ).rejects.toThrow("roleId is required and cannot be empty");
      });

      it("当 scope 为空时应抛出错误", async () => {
        await expect(
          driveTool.shareFile({
            driveId: "drive123",
            fileId: "file123",
            roleId: "read",
            scope: "" as any,
          })
        ).rejects.toThrow("scope is required");
      });
    });
  });

  // 以下测试需要实际的 API 访问权限
  // 如果企业未开通云文档功能，这些测试应该被跳过
  describe.skip("API 集成测试 (需要云文档权限)", () => {
    describe("getDrives", () => {
      it("应该返回用户云盘列表", async () => {
        const result = await driveTool.getDrives({
          alloteeType: "user",
          pageSize: 10,
        });
        expect(result).toBeDefined();
        expect(result.items).toBeDefined();
        expect(Array.isArray(result.items)).toBe(true);
      });

      it("应该支持分页", async () => {
        const result = await driveTool.getDrives({
          alloteeType: "user",
          pageSize: 5,
        });
        expect(result).toBeDefined();
        if (result.items.length > 0) {
          expect(result.items.length).toBeLessThanOrEqual(5);
        }
      });
    });

    describe("listFiles", () => {
      it("应该返回文件列表", async () => {
        // 首先获取一个 drive
        const drives = await driveTool.getDrives({
          alloteeType: "user",
          pageSize: 1,
        });

        if (drives.items.length === 0) {
          console.log("没有可用的云盘，跳过测试");
          return;
        }

        const driveId = drives.items[0].id;
        const result = await driveTool.listFiles({
          driveId,
          parentId: "0",
          pageSize: 10,
        });
        expect(result).toBeDefined();
        expect(result.items).toBeDefined();
        expect(Array.isArray(result.items)).toBe(true);
      });
    });

    describe("createFolder", () => {
      it("应该创建文件夹", async () => {
        const drives = await driveTool.getDrives({
          alloteeType: "user",
          pageSize: 1,
        });

        if (drives.items.length === 0) {
          console.log("没有可用的云盘，跳过测试");
          return;
        }

        const driveId = drives.items[0].id;
        const folderName = `test-folder-${Date.now()}`;
        
        const result = await driveTool.createFolder({
          driveId,
          parentId: "0",
          name: folderName,
        });
        
        expect(result).toBeDefined();
        expect(result.name).toBe(folderName);
        expect(result.type).toBe("folder");
        
        // 清理：删除创建的文件夹
        await driveTool.deleteFile({
          driveId,
          fileId: result.id,
        });
      });
    });

    describe("createFile", () => {
      it("应该创建文件", async () => {
        const drives = await driveTool.getDrives({
          alloteeType: "user",
          pageSize: 1,
        });

        if (drives.items.length === 0) {
          console.log("没有可用的云盘，跳过测试");
          return;
        }

        const driveId = drives.items[0].id;
        const fileName = `test-file-${Date.now()}.docx`;
        
        const result = await driveTool.createFile({
          driveId,
          parentId: "0",
          name: fileName,
          fileType: "file",
        });
        
        expect(result).toBeDefined();
        expect(result.name).toBe(fileName);
        expect(result.type).toBe("file");
        
        // 清理：删除创建的文件
        await driveTool.deleteFile({
          driveId,
          fileId: result.id,
        });
      });
    });

    describe("searchFiles", () => {
      it("应该搜索文件", async () => {
        const result = await driveTool.searchFiles({
          type: "file_name",
          keyword: "test",
          pageSize: 10,
        });
        expect(result).toBeDefined();
        expect(result.items).toBeDefined();
        expect(Array.isArray(result.items)).toBe(true);
      });
    });
  });
});
