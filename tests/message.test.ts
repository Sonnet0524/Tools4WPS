import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { MessageTool } from "../src/tools/message";
import { TokenManager } from "../src/auth";
import type { Chat, ChatListResult, MessageResult } from "../src/tools/types";

describe("MessageTool", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";
  let messageTool: MessageTool;

  beforeEach(() => {
    TokenManager.resetInstance();
    messageTool = new MessageTool({ appId, appKey, baseUrl });
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("getChats", () => {
    test("should get chat list with required page size", async () => {
      const result = await messageTool.getChats({ pageSize: 10 });
      
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.items.length).toBeLessThanOrEqual(10);
    });

    test("should validate page size range", async () => {
      await expect(
        messageTool.getChats({ pageSize: 0 })
      ).rejects.toThrow();
      
      await expect(
        messageTool.getChats({ pageSize: 51 })
      ).rejects.toThrow();
    });

    test("should handle pagination with page token", async () => {
      const result1 = await messageTool.getChats({ pageSize: 5 });
      
      expect(result1).toBeDefined();
      expect(result1.items).toBeDefined();
      
      if (result1.next_page_token) {
        const result2 = await messageTool.getChats({ 
          pageSize: 5, 
          pageToken: result1.next_page_token 
        });
        
        expect(result2).toBeDefined();
        expect(result2.items).toBeDefined();
      }
    });

    test("should return chats with correct structure", async () => {
      const result = await messageTool.getChats({ pageSize: 10 });
      
      if (result.items.length > 0) {
        const chat = result.items[0];
        expect(chat.id).toBeDefined();
        expect(typeof chat.id).toBe('string');
        expect(['p2p', 'group']).toContain(chat.type);
        expect(['active', 'inactive', 'dismissed']).toContain(chat.status);
        expect(chat.ctime).toBeDefined();
        expect(typeof chat.ctime).toBe('number');
      }
    });
  });

  describe("getChat", () => {
    let testChatId: string;

    beforeEach(async () => {
      const chats = await messageTool.getChats({ pageSize: 1 });
      if (chats.items.length > 0) {
        testChatId = chats.items[0].id;
      }
    });

    test("should get chat details by chat id", async () => {
      if (!testChatId) {
        console.log("No chats found, skipping test");
        return;
      }

      const chat = await messageTool.getChat(testChatId);
      
      expect(chat).toBeDefined();
      expect(chat.id).toBe(testChatId);
      expect(['p2p', 'group']).toContain(chat.type);
      expect(['active', 'inactive', 'dismissed']).toContain(chat.status);
    });

    test("should throw error for empty chat id", async () => {
      await expect(
        messageTool.getChat("")
      ).rejects.toThrow('chatId is required and cannot be empty');
    });

    test("should throw error for non-existent chat id", async () => {
      await expect(
        messageTool.getChat("non-existent-chat-id-12345")
      ).rejects.toThrow();
    });
  });

  describe("getP2PChat", () => {
    test("should throw error for empty user id", async () => {
      await expect(
        messageTool.getP2PChat("")
      ).rejects.toThrow('userId is required and cannot be empty');
    });
  });

  describe("sendToUser", () => {
    test("should throw error for empty user id", async () => {
      await expect(
        messageTool.sendToUser({ userId: "", content: "test" })
      ).rejects.toThrow('userId is required and cannot be empty');
    });

    test("should throw error for empty content", async () => {
      await expect(
        messageTool.sendToUser({ userId: "test-user", content: "" })
      ).rejects.toThrow('content is required and cannot be empty');
    });

    test("should throw error for content exceeding 5000 characters", async () => {
      const longContent = "a".repeat(5001);
      await expect(
        messageTool.sendToUser({ userId: "test-user", content: longContent })
      ).rejects.toThrow('content must not exceed 5000 characters');
    });

    test("should throw error for whitespace-only content", async () => {
      await expect(
        messageTool.sendToUser({ userId: "test-user", content: "   " })
      ).rejects.toThrow('content is required and cannot be empty');
    });
  });

  describe("sendToChat", () => {
    test("should throw error for empty chat id", async () => {
      await expect(
        messageTool.sendToChat({ chatId: "", content: "test" })
      ).rejects.toThrow('chatId is required and cannot be empty');
    });

    test("should throw error for empty content", async () => {
      await expect(
        messageTool.sendToChat({ chatId: "test-chat", content: "" })
      ).rejects.toThrow('content is required and cannot be empty');
    });

    test("should throw error for content exceeding 5000 characters", async () => {
      const longContent = "a".repeat(5001);
      await expect(
        messageTool.sendToChat({ chatId: "test-chat", content: longContent })
      ).rejects.toThrow('content must not exceed 5000 characters');
    });

    test("should throw error for whitespace-only content", async () => {
      await expect(
        messageTool.sendToChat({ chatId: "test-chat", content: "   " })
      ).rejects.toThrow('content is required and cannot be empty');
    });
  });

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      TokenManager.resetInstance();
      
      const invalidTool = new MessageTool({
        appId: "invalid-app-id",
        appKey: "invalid-app-key",
        baseUrl,
      });

      await expect(
        invalidTool.getChats({ pageSize: 10 })
      ).rejects.toThrow();
    });

    test("should handle network errors", async () => {
      const toolWithBadUrl = new MessageTool({
        appId,
        appKey,
        baseUrl: "https://invalid-url-that-does-not-exist.wps.cn",
      });

      await expect(
        toolWithBadUrl.getChats({ pageSize: 10 })
      ).rejects.toThrow();
    });
  });

  describe("Data Types", () => {
    test("should return properly typed Chat objects", async () => {
      const result = await messageTool.getChats({ pageSize: 1 });
      
      if (result.items.length > 0) {
        const chat = result.items[0];
        
        expect(typeof chat.id).toBe('string');
        expect(['p2p', 'group']).toContain(chat.type);
        expect(['active', 'inactive', 'dismissed']).toContain(chat.status);
        expect(typeof chat.ctime).toBe('number');
        
        if (chat.name) {
          expect(typeof chat.name).toBe('string');
        }
      }
    });
  });
});
