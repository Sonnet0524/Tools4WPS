import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { ContactsTool } from "../src/tools/contacts";
import { TokenManager } from "../src/auth";
import type { User, Group, UserListResult, GroupListResult } from "../src/tools/types";

describe("ContactsTool", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";
  let contactsTool: ContactsTool;

  beforeEach(() => {
    TokenManager.resetInstance();
    contactsTool = new ContactsTool({ appId, appKey, baseUrl });
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("getUsers", () => {
    test("should get user list without parameters (defaults to active status)", async () => {
      const result = await contactsTool.getUsers();
      
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
    });

    test("should get user list with status filter", async () => {
      const result = await contactsTool.getUsers({ status: 'active' });
      
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      
      result.items.forEach(user => {
        expect(user.status).toBe('active');
      });
    });

    test("should get user list with page size", async () => {
      const result = await contactsTool.getUsers({ pageSize: 10 });
      
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(result.items.length).toBeLessThanOrEqual(10);
    });

    test("should validate page size range", async () => {
      await expect(
        contactsTool.getUsers({ pageSize: 0 })
      ).rejects.toThrow();
      
      await expect(
        contactsTool.getUsers({ pageSize: 51 })
      ).rejects.toThrow();
    });

    test("should handle pagination with page token", async () => {
      const result1 = await contactsTool.getUsers({ pageSize: 5 });
      
      expect(result1).toBeDefined();
      expect(result1.items).toBeDefined();
      
      if (result1.next_page_token) {
        const result2 = await contactsTool.getUsers({ 
          pageSize: 5, 
          pageToken: result1.next_page_token 
        });
        
        expect(result2).toBeDefined();
        expect(result2.items).toBeDefined();
      }
    });
  });

  describe("getUser", () => {
    let testUserId: string;

    beforeEach(async () => {
      const users = await contactsTool.getUsers({ pageSize: 1 });
      if (users.items.length > 0) {
        testUserId = users.items[0].id;
      }
    });

    test("should get user details by user id", async () => {
      if (!testUserId) {
        console.log("No users found, skipping test");
        return;
      }

      const user = await contactsTool.getUser(testUserId);
      
      expect(user).toBeDefined();
      expect(user.id).toBe(testUserId);
      expect(user.user_name).toBeDefined();
      expect(['active', 'notactive', 'disabled']).toContain(user.status);
      expect(['super-admin', 'admin', 'normal']).toContain(user.role);
    });

    test("should throw error for empty user id", async () => {
      await expect(
        contactsTool.getUser("")
      ).rejects.toThrow('userId is required and cannot be empty');
    });

    test("should throw error for non-existent user id", async () => {
      await expect(
        contactsTool.getUser("non-existent-user-id-12345")
      ).rejects.toThrow();
    });
  });

  describe("batchGetUsers", () => {
    let testUserIds: string[];

    beforeEach(async () => {
      const users = await contactsTool.getUsers({ pageSize: 3 });
      testUserIds = users.items.map(u => u.id);
    });

    test("should batch get users by ids", async () => {
      if (testUserIds.length === 0) {
        console.log("No users found, skipping test");
        return;
      }

      const users = await contactsTool.batchGetUsers(testUserIds);
      
      expect(users).toBeDefined();
      expect(Array.isArray(users)).toBe(true);
      expect(users.length).toBe(testUserIds.length);
      
      users.forEach(user => {
        expect(testUserIds).toContain(user.id);
        expect(user.user_name).toBeDefined();
      });
    });

    test("should validate user ids array", async () => {
      await expect(
        contactsTool.batchGetUsers([])
      ).rejects.toThrow();
    });

    test("should validate max user ids", async () => {
      const tooManyIds = Array(101).fill("user-id");
      await expect(
        contactsTool.batchGetUsers(tooManyIds)
      ).rejects.toThrow();
    });

    test("should handle single user id", async () => {
      if (testUserIds.length === 0) {
        console.log("No users found, skipping test");
        return;
      }

      const users = await contactsTool.batchGetUsers([testUserIds[0]]);
      
      expect(users).toBeDefined();
      expect(users.length).toBe(1);
      expect(users[0].id).toBe(testUserIds[0]);
    });
  });

  describe("getGroups", () => {
    test("should get group list without parameters", async () => {
      const result = await contactsTool.getGroups();
      
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
    });

    test("should get group list with page size", async () => {
      const result = await contactsTool.getGroups({ pageSize: 10 });
      
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(result.items.length).toBeLessThanOrEqual(10);
    });

    test("should validate page size range", async () => {
      await expect(
        contactsTool.getGroups({ pageSize: 0 })
      ).rejects.toThrow();
      
      await expect(
        contactsTool.getGroups({ pageSize: 51 })
      ).rejects.toThrow();
    });

    test("should handle pagination with page token", async () => {
      const result1 = await contactsTool.getGroups({ pageSize: 5 });
      
      expect(result1).toBeDefined();
      expect(result1.items).toBeDefined();
      
      if (result1.next_page_token) {
        const result2 = await contactsTool.getGroups({ 
          pageSize: 5, 
          pageToken: result1.next_page_token 
        });
        
        expect(result2).toBeDefined();
        expect(result2.items).toBeDefined();
      }
    });

    test("should return groups with correct structure", async () => {
      const result = await contactsTool.getGroups();
      
      if (result.items.length > 0) {
        const group = result.items[0];
        expect(group.id).toBeDefined();
        expect(typeof group.id).toBe('string');
        expect(group.ctime).toBeDefined();
        expect(typeof group.ctime).toBe('number');
      }
    });
  });

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      TokenManager.resetInstance();
      
      const invalidTool = new ContactsTool({
        appId: "invalid-app-id",
        appKey: "invalid-app-key",
        baseUrl,
      });

      await expect(
        invalidTool.getUsers()
      ).rejects.toThrow();
    });

    test("should handle network errors", async () => {
      const toolWithBadUrl = new ContactsTool({
        appId,
        appKey,
        baseUrl: "https://invalid-url-that-does-not-exist.wps.cn",
      });

      await expect(
        toolWithBadUrl.getUsers()
      ).rejects.toThrow();
    });
  });

  describe("Data Types", () => {
    test("should return properly typed User objects", async () => {
      const result = await contactsTool.getUsers({ pageSize: 1 });
      
      if (result.items.length > 0) {
        const user = result.items[0];
        
        expect(typeof user.id).toBe('string');
        expect(typeof user.user_name).toBe('string');
        expect(['active', 'notactive', 'disabled']).toContain(user.status);
        expect(['super-admin', 'admin', 'normal']).toContain(user.role);
        
        if (user.phone) {
          expect(typeof user.phone).toBe('string');
        }
        if (user.email) {
          expect(typeof user.email).toBe('string');
        }
        if (user.depts) {
          expect(Array.isArray(user.depts)).toBe(true);
          user.depts.forEach(dept => {
            expect(typeof dept.id).toBe('string');
            expect(typeof dept.name).toBe('string');
            expect(typeof dept.abs_path).toBe('string');
          });
        }
      }
    });

    test("should return properly typed Group objects", async () => {
      const result = await contactsTool.getGroups({ pageSize: 1 });
      
      if (result.items.length > 0) {
        const group = result.items[0];
        
        expect(typeof group.id).toBe('string');
        expect(typeof group.ctime).toBe('number');
        
        if (group.name) {
          expect(typeof group.name).toBe('string');
        }
      }
    });
  });
});
