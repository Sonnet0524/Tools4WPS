import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { DBSheetTool } from "../src/tools/dbsheet";
import { TokenManager } from "../src/auth";
import type { DBSheetRecord, DBSheetField } from "../src/tools/types";

describe("DBSheetTool", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";
  let dbSheetTool: DBSheetTool;
  
  // 注意：多维表格测试需要一个真实的 file_id
  // 由于没有可用的多维表格，这些测试默认会被跳过
  const testFileId = process.env.TEST_DBSHEET_FILE_ID || "";

  beforeEach(() => {
    TokenManager.resetInstance();
    dbSheetTool = new DBSheetTool({ appId, appKey, baseUrl });
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("getSchema", () => {
    test("should throw error for empty fileId", async () => {
      await expect(
        dbSheetTool.getSchema("")
      ).rejects.toThrow('fileId is required and cannot be empty');
    });

    test.skip("should get schema for valid fileId", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);

      expect(schema).toBeDefined();
      expect(schema.sheets).toBeDefined();
      expect(Array.isArray(schema.sheets)).toBe(true);

      if (schema.sheets.length > 0) {
        const sheet = schema.sheets[0];
        expect(sheet.id).toBeDefined();
        expect(typeof sheet.id).toBe('number');
        expect(sheet.name).toBeDefined();
        expect(typeof sheet.name).toBe('string');
        expect(sheet.fields).toBeDefined();
        expect(Array.isArray(sheet.fields)).toBe(true);
        expect(sheet.views).toBeDefined();
        expect(Array.isArray(sheet.views)).toBe(true);
      }
    });
  });

  describe("listRecords", () => {
    test("should throw error for empty fileId", async () => {
      await expect(
        dbSheetTool.listRecords({
          fileId: "",
          sheetId: 1,
        })
      ).rejects.toThrow('fileId is required and cannot be empty');
    });

    test("should throw error for invalid sheetId", async () => {
      await expect(
        dbSheetTool.listRecords({
          fileId: "test-file-id",
          sheetId: "invalid" as unknown as number,
        })
      ).rejects.toThrow('sheetId is required and must be a number');
    });

    test.skip("should list records for valid fileId and sheetId", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      // 先获取schema找到第一个sheet
      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const result = await dbSheetTool.listRecords({
        fileId: testFileId,
        sheetId,
        pageSize: 10,
      });

      expect(result).toBeDefined();
      expect(result.records).toBeDefined();
      expect(Array.isArray(result.records)).toBe(true);

      // 验证记录结构
      result.records.forEach((record: DBSheetRecord) => {
        expect(record.id).toBeDefined();
        expect(typeof record.id).toBe('string');
        expect(record.fields).toBeDefined();
        expect(typeof record.fields).toBe('object');
      });
    });

    test.skip("should support pagination", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const result = await dbSheetTool.listRecords({
        fileId: testFileId,
        sheetId,
        pageSize: 5,
      });

      expect(result).toBeDefined();
      expect(result.records).toBeDefined();
      // page_token 可能为空，如果记录数不足一页
    });

    test.skip("should support field filtering", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0 || schema.sheets[0].fields.length === 0) {
        console.log("No sheets or fields found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const fieldName = schema.sheets[0].fields[0].name;
      
      const result = await dbSheetTool.listRecords({
        fileId: testFileId,
        sheetId,
        fields: [fieldName],
        showFieldsInfo: true,
      });

      expect(result).toBeDefined();
      expect(result.fields_schema).toBeDefined();
    });
  });

  describe("createRecords", () => {
    test("should throw error for empty fileId", async () => {
      await expect(
        dbSheetTool.createRecords({
          fileId: "",
          sheetId: 1,
          records: [{ fieldsValue: { 文本: "测试" } }],
        })
      ).rejects.toThrow('fileId is required and cannot be empty');
    });

    test("should throw error for invalid sheetId", async () => {
      await expect(
        dbSheetTool.createRecords({
          fileId: "test-file-id",
          sheetId: "invalid" as unknown as number,
          records: [{ fieldsValue: { 文本: "测试" } }],
        })
      ).rejects.toThrow('sheetId is required and must be a number');
    });

    test("should throw error for empty records array", async () => {
      await expect(
        dbSheetTool.createRecords({
          fileId: "test-file-id",
          sheetId: 1,
          records: [],
        })
      ).rejects.toThrow('records must be a non-empty array');
    });

    test.skip("should create single record", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const textField = schema.sheets[0].fields.find((f: DBSheetField) => f.type === 'MultiLineText');
      
      if (!textField) {
        console.log("No text field found, skipping test");
        return;
      }

      const result = await dbSheetTool.createRecords({
        fileId: testFileId,
        sheetId,
        records: [
          {
            fieldsValue: {
              [textField.name]: "测试文本内容",
            },
          },
        ],
      });

      expect(result).toBeDefined();
      expect(result.records).toBeDefined();
      expect(result.records.length).toBe(1);
      expect(result.records[0].id).toBeDefined();
    });

    test.skip("should create multiple records", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const textField = schema.sheets[0].fields.find((f: DBSheetField) => f.type === 'MultiLineText');
      
      if (!textField) {
        console.log("No text field found, skipping test");
        return;
      }

      const result = await dbSheetTool.createRecords({
        fileId: testFileId,
        sheetId,
        records: [
          { fieldsValue: { [textField.name]: "记录1" } },
          { fieldsValue: { [textField.name]: "记录2" } },
          { fieldsValue: { [textField.name]: "记录3" } },
        ],
      });

      expect(result).toBeDefined();
      expect(result.records).toBeDefined();
      expect(result.records.length).toBe(3);
    });
  });

  describe("createSheet", () => {
    test("should throw error for empty fileId", async () => {
      await expect(
        dbSheetTool.createSheet({
          fileId: "",
          fields: [{ name: "文本", type: "MultiLineText" }],
          views: [{ name: "表格视图", type: "Grid" }],
        })
      ).rejects.toThrow('fileId is required and cannot be empty');
    });

    test("should throw error for empty fields array", async () => {
      await expect(
        dbSheetTool.createSheet({
          fileId: "test-file-id",
          fields: [],
          views: [{ name: "表格视图", type: "Grid" }],
        })
      ).rejects.toThrow('fields must be a non-empty array');
    });

    test("should throw error for empty views array", async () => {
      await expect(
        dbSheetTool.createSheet({
          fileId: "test-file-id",
          fields: [{ name: "文本", type: "MultiLineText" }],
          views: [],
        })
      ).rejects.toThrow('views must be a non-empty array');
    });

    test.skip("should create new sheet with fields and views", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const result = await dbSheetTool.createSheet({
        fileId: testFileId,
        name: `测试工作表_${Date.now()}`,
        fields: [
          { name: "文本字段", type: "MultiLineText" },
          { name: "数字字段", type: "Number", data: { number_format: "0.00" } },
        ],
        views: [
          { name: "表格视图", type: "Grid" },
        ],
      });

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('number');
      expect(result.name).toBeDefined();
      expect(result.fields).toBeDefined();
      expect(result.fields.length).toBeGreaterThanOrEqual(2);
      expect(result.views).toBeDefined();
      expect(result.views.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("getSheet", () => {
    test.skip("should get specific sheet by id", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const sheet = await dbSheetTool.getSheet(testFileId, sheetId);

      expect(sheet).toBeDefined();
      expect(sheet?.id).toBe(sheetId);
    });

    test.skip("should return null for non-existent sheet", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const sheet = await dbSheetTool.getSheet(testFileId, 999999);
      expect(sheet).toBeNull();
    });
  });

  describe("listAllRecords", () => {
    test.skip("should get all records with auto pagination", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheetId = schema.sheets[0].id;
      const result = await dbSheetTool.listAllRecords(testFileId, sheetId, {
        pageSize: 10,
      });

      expect(result).toBeDefined();
      expect(result.records).toBeDefined();
      expect(Array.isArray(result.records)).toBe(true);
      // 应该获取所有记录，而不只是一页
    });
  });

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      TokenManager.resetInstance();
      
      const invalidTool = new DBSheetTool({
        appId: "invalid-app-id",
        appKey: "invalid-app-key",
        baseUrl,
      });

      await expect(
        invalidTool.getSchema("test-file-id")
      ).rejects.toThrow();
    });

    test("should handle network errors", async () => {
      const toolWithBadUrl = new DBSheetTool({
        appId,
        appKey,
        baseUrl: "https://invalid-url-that-does-not-exist.wps.cn",
      });

      await expect(
        toolWithBadUrl.getSchema("test-file-id")
      ).rejects.toThrow();
    });
  });

  describe("Data Types", () => {
    test.skip("should handle various field types", async () => {
      if (!testFileId) {
        console.log("No test fileId provided, skipping test");
        return;
      }

      const schema = await dbSheetTool.getSchema(testFileId);
      if (schema.sheets.length === 0) {
        console.log("No sheets found, skipping test");
        return;
      }

      const sheet = schema.sheets[0];
      
      // 验证字段类型
      sheet.fields.forEach((field: DBSheetField) => {
        expect(field.id).toBeDefined();
        expect(typeof field.id).toBe('string');
        expect(field.name).toBeDefined();
        expect(typeof field.name).toBe('string');
        expect(field.type).toBeDefined();
        expect(typeof field.type).toBe('string');
      });

      // 验证视图类型
      sheet.views.forEach((view) => {
        expect(view.id).toBeDefined();
        expect(typeof view.id).toBe('string');
        expect(view.name).toBeDefined();
        expect(typeof view.name).toBe('string');
        expect(view.type).toBeDefined();
        expect(typeof view.type).toBe('string');
      });
    });
  });
});
