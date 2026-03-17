import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { GroupTool } from "../src/tools/group";
import { ContactsTool } from "../src/tools/contacts";
import { TokenManager } from "../src/auth";
import type { Group, GroupMember } from "../src/tools/types";

describe("GroupTool", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";
  let groupTool: GroupTool;
  let contactsTool: ContactsTool;

  beforeEach(() => {
    TokenManager.resetInstance();
    groupTool = new GroupTool({ appId, appKey, baseUrl });
    contactsTool = new ContactsTool({ appId, appKey, baseUrl });
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("getGroups", () => {
    test("should get groups list", async () => {
      const result = await groupTool.getGroups({ pageSize: 10 });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);

      // 如果有用户组，验证结构
      if (result.items.length > 0) {
        const group = result.items[0];
        expect(group.id).toBeDefined();
        expect(typeof group.id).toBe('string');
        expect(group.name).toBeDefined();
        expect(typeof group.name).toBe('string');
        expect(group.ctime).toBeDefined();
        expect(typeof group.ctime).toBe('number');
      }
    });

    test("should support pagination", async () => {
      const result = await groupTool.getGroups({ 
        pageSize: 5,
        withTotal: true 
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      
      // total 可能为 undefined，取决于是否有权限
      if (result.total !== undefined) {
        expect(typeof result.total).toBe('number');
      }
    });

    test("should support filtering by status", async () => {
      const result = await groupTool.getGroups({ 
        status: ['enable'],
        pageSize: 5 
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
    });

    test("should support filtering by type", async () => {
      const result = await groupTool.getGroups({ 
        type: ['normal'],
        pageSize: 5 
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
    });
  });

  describe("getGroup", () => {
    test("should throw error for empty groupId", async () => {
      await expect(
        groupTool.getGroup("")
      ).rejects.toThrow('groupId is required and cannot be empty');
    });

    test("should get specific group by id", async () => {
      // 先获取一个用户组列表
      const groupsResult = await groupTool.getGroups({ pageSize: 1 });
      
      if (groupsResult.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      const groupId = groupsResult.items[0].id;
      const group = await groupTool.getGroup(groupId, true);

      expect(group).toBeDefined();
      expect(group.id).toBe(groupId);
      expect(group.name).toBeDefined();
      
      // member_total 只有在 withMemberTotal=true 时才返回
      if (group.member_total !== undefined) {
        expect(typeof group.member_total).toBe('number');
      }
    });
  });

  describe("getGroupMembers", () => {
    test("should throw error for empty groupId", async () => {
      await expect(
        groupTool.getGroupMembers({ groupId: "" })
      ).rejects.toThrow('groupId is required and cannot be empty');
    });

    test("should get group members", async () => {
      // 先获取一个用户组
      const groupsResult = await groupTool.getGroups({ pageSize: 1 });
      
      if (groupsResult.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      const groupId = groupsResult.items[0].id;
      const result = await groupTool.getGroupMembers({ 
        groupId,
        pageSize: 10,
        withUserInfo: true 
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);

      // 如果有成员，验证结构
      if (result.items.length > 0) {
        const member = result.items[0];
        expect(member.item_id).toBeDefined();
        expect(typeof member.item_id).toBe('string');
        expect(member.item_type).toBeDefined();
        expect(['normal', 'dept']).toContain(member.item_type);
        expect(member.role).toBeDefined();
        expect(['normal', 'admin', 'owner']).toContain(member.role);

        // user_info 只有在 withUserInfo=true 时才返回
        if (member.user_info) {
          expect(member.user_info.id).toBeDefined();
          expect(member.user_info.user_name).toBeDefined();
        }
      }
    });

    test("should support filtering by role", async () => {
      const groupsResult = await groupTool.getGroups({ pageSize: 1 });
      
      if (groupsResult.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      const groupId = groupsResult.items[0].id;
      const result = await groupTool.getGroupMembers({ 
        groupId,
        roles: ['admin', 'owner'],
        pageSize: 10 
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
    });
  });

  describe("createGroup", () => {
    test("should throw error for empty creatorId", async () => {
      await expect(
        groupTool.createGroup({
          creatorId: "",
          name: "测试组",
        })
      ).rejects.toThrow('creatorId is required and cannot be empty');
    });

    test("should throw error for empty name", async () => {
      await expect(
        groupTool.createGroup({
          creatorId: "user-id",
          name: "",
        })
      ).rejects.toThrow('name is required and cannot be empty');
    });

    test.skip("should create a new group", async () => {
      // 获取一个用户作为创建者
      const usersResult = await contactsTool.getUsers({ pageSize: 1 });
      
      if (usersResult.items.length === 0) {
        console.log("No users found, skipping test");
        return;
      }

      const creatorId = usersResult.items[0].id;
      const groupName = `测试组_${Date.now()}`;
      
      const group = await groupTool.createGroup({
        creatorId,
        name: groupName,
        description: "这是一个测试用户组",
        type: 'normal',
      });

      expect(group).toBeDefined();
      expect(group.id).toBeDefined();
      expect(group.name).toBe(groupName);
      expect(group.creator_id).toBe(creatorId);
      expect(group.status).toBe('enable');

      // 清理：删除测试创建的用户组（如果有删除API）
      // 注意：目前文档中没有删除用户组的API
    });
  });

  describe("addGroupMember", () => {
    test("should throw error for empty groupId", async () => {
      await expect(
        groupTool.addGroupMember({
          groupId: "",
          itemId: "user-id",
        })
      ).rejects.toThrow('groupId is required and cannot be empty');
    });

    test("should throw error for empty itemId", async () => {
      await expect(
        groupTool.addGroupMember({
          groupId: "group-id",
          itemId: "",
        })
      ).rejects.toThrow('itemId is required and cannot be empty');
    });

    test.skip("should add member to group", async () => {
      // 获取用户组
      const groupsResult = await groupTool.getGroups({ pageSize: 1 });
      if (groupsResult.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      // 获取用户
      const usersResult = await contactsTool.getUsers({ pageSize: 1 });
      if (usersResult.items.length === 0) {
        console.log("No users found, skipping test");
        return;
      }

      const groupId = groupsResult.items[0].id;
      const userId = usersResult.items[0].id;

      const member = await groupTool.addGroupMember({
        groupId,
        itemId: userId,
        itemType: 'normal',
        role: 'normal',
      });

      expect(member).toBeDefined();
      expect(member.group_id).toBe(groupId);
      expect(member.item_id).toBe(userId);
      expect(member.role).toBe('normal');
    });
  });

  describe("getAllGroups", () => {
    test("should get all groups with auto pagination", async () => {
      const groups = await groupTool.getAllGroups({ pageSize: 5 });

      expect(groups).toBeDefined();
      expect(Array.isArray(groups)).toBe(true);

      // 验证返回的组结构
      groups.forEach((group: Group) => {
        expect(group.id).toBeDefined();
        expect(group.name).toBeDefined();
      });
    });
  });

  describe("getAllGroupMembers", () => {
    test("should get all members with auto pagination", async () => {
      // 获取一个用户组
      const groupsResult = await groupTool.getGroups({ pageSize: 1 });
      
      if (groupsResult.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      const groupId = groupsResult.items[0].id;
      const members = await groupTool.getAllGroupMembers(groupId, { pageSize: 10 });

      expect(members).toBeDefined();
      expect(Array.isArray(members)).toBe(true);

      // 验证返回的成员结构
      members.forEach((member: GroupMember) => {
        expect(member.item_id).toBeDefined();
        expect(member.role).toBeDefined();
      });
    });
  });

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      TokenManager.resetInstance();
      
      const invalidTool = new GroupTool({
        appId: "invalid-app-id",
        appKey: "invalid-app-key",
        baseUrl,
      });

      await expect(
        invalidTool.getGroups()
      ).rejects.toThrow();
    });

    test("should handle network errors", async () => {
      const toolWithBadUrl = new GroupTool({
        appId,
        appKey,
        baseUrl: "https://invalid-url-that-does-not-exist.wps.cn",
      });

      await expect(
        toolWithBadUrl.getGroups()
      ).rejects.toThrow();
    });

    test("should handle non-existent group", async () => {
      await expect(
        groupTool.getGroup("non-existent-group-id-12345")
      ).rejects.toThrow();
    });
  });

  describe("Data Types", () => {
    test("should return properly typed Group objects", async () => {
      const result = await groupTool.getGroups({ pageSize: 1 });

      if (result.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      const group = result.items[0];

      expect(typeof group.id).toBe('string');
      expect(typeof group.name).toBe('string');
      expect(typeof group.ctime).toBe('number');

      if (group.member_total !== undefined) {
        expect(typeof group.member_total).toBe('number');
      }

      if (group.status) {
        expect(['enable', 'recycled']).toContain(group.status);
      }

      if (group.type) {
        expect(['normal', 'dept', 'org_dynamic', 'org_normal']).toContain(group.type);
      }
    });

    test("should return properly typed GroupMember objects", async () => {
      const groupsResult = await groupTool.getGroups({ pageSize: 1 });
      
      if (groupsResult.items.length === 0) {
        console.log("No groups found, skipping test");
        return;
      }

      const groupId = groupsResult.items[0].id;
      const result = await groupTool.getGroupMembers({ groupId, pageSize: 1 });

      if (result.items.length === 0) {
        console.log("No members found, skipping test");
        return;
      }

      const member = result.items[0];

      expect(typeof member.item_id).toBe('string');
      expect(['normal', 'dept']).toContain(member.item_type);
      expect(['normal', 'admin', 'owner']).toContain(member.role);

      if (member.ctime) {
        expect(typeof member.ctime).toBe('number');
      }
    });
  });
});
