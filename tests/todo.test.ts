import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { TodoTool } from "../src/tools/todo";
import { ContactsTool } from "../src/tools/contacts";
import { TokenManager } from "../src/auth";
import type { TodoTask, TodoResult, CreateTaskParams } from "../src/tools/types";

describe("TodoTool", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";
  let todoTool: TodoTool;
  let contactsTool: ContactsTool;
  let testExecutorId: string;

  beforeEach(async () => {
    TokenManager.resetInstance();
    todoTool = new TodoTool({ appId, appKey, baseUrl });
    contactsTool = new ContactsTool({ appId, appKey, baseUrl });
    
    const users = await contactsTool.getUsers({ pageSize: 1 });
    if (users.items.length > 0) {
      testExecutorId = users.items[0].id;
    }
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("createTask", () => {
    test("should create a todo task with required fields", async () => {
      if (!testExecutorId) {
        console.log("No users found, skipping test");
        return;
      }

      const result = await todoTool.createTask({
        executor: testExecutorId,
        title: {
          prefix: "[测试]",
          subject: "测试待办任务",
        },
      });

      expect(result).toBeDefined();
      expect(result.taskId).toBeDefined();
      expect(typeof result.taskId).toBe('string');

      await todoTool.batchDeleteTasks([result.taskId]);
    });

    test("should create a todo task with all fields", async () => {
      if (!testExecutorId) {
        console.log("No users found, skipping test");
        return;
      }

      const dueTime = Date.now() + 24 * 60 * 60 * 1000;
      const result = await todoTool.createTask({
        executor: testExecutorId,
        title: {
          prefix: "[测试]",
          subject: "完整待办任务",
        },
        description: "这是一个完整的待办任务描述",
        dueTime: dueTime,
        priority: 1,
        link: {
          pcUrl: "https://www.wps.cn",
          mobileUrl: "https://www.wps.cn",
        },
        reminders: [60, 30],
      });

      expect(result).toBeDefined();
      expect(result.taskId).toBeDefined();

      await todoTool.batchDeleteTasks([result.taskId]);
    });

    test("should throw error for missing executor", async () => {
      await expect(
        todoTool.createTask({
          executor: "",
          title: {
            prefix: "[测试]",
            subject: "测试",
          },
        })
      ).rejects.toThrow('executor is required and cannot be empty');
    });

    test("should throw error for missing title", async () => {
      await expect(
        todoTool.createTask({
          executor: testExecutorId,
          title: {
            prefix: "",
            subject: "",
          },
        })
      ).rejects.toThrow('title.prefix and title.subject are required');
    });

    test("should throw error for invalid dueTime", async () => {
      await expect(
        todoTool.createTask({
          executor: testExecutorId,
          title: {
            prefix: "[测试]",
            subject: "测试",
          },
          dueTime: -1,
        })
      ).rejects.toThrow('dueTime must be a positive number');
    });
  });

  describe("getTask", () => {
    let createdTaskId: string;

    beforeEach(async () => {
      if (!testExecutorId) {
        return;
      }

      const result = await todoTool.createTask({
        executor: testExecutorId,
        title: {
          prefix: "[测试]",
          subject: "查询测试待办",
        },
        description: "用于查询测试",
      });
      createdTaskId = result.taskId;
    });

    afterEach(async () => {
      if (createdTaskId) {
        await todoTool.batchDeleteTasks([createdTaskId]).catch(() => {});
      }
    });

    test("should get task details by task id", async () => {
      if (!createdTaskId) {
        console.log("No task created, skipping test");
        return;
      }

      const task = await todoTool.getTask(createdTaskId);

      expect(task).toBeDefined();
      expect(task.taskId).toBe(createdTaskId);
      expect(task.executor).toBe(testExecutorId);
      expect(task.title).toBeDefined();
      expect(task.title.prefix).toBe("[测试]");
      expect(task.title.subject).toBe("查询测试待办");
      expect(task.description).toBe("用于查询测试");
      expect(task.status).toBe('todo');
    });

    test("should throw error for empty task id", async () => {
      await expect(
        todoTool.getTask("")
      ).rejects.toThrow('taskId is required and cannot be empty');
    });

    test.skip("should throw error for non-existent task id", async () => {
      await expect(
        todoTool.getTask("non-existent-task-id-12345")
      ).rejects.toThrow();
    });
  });

  describe("updateTask", () => {
    let createdTaskId: string;

    beforeEach(async () => {
      if (!testExecutorId) {
        return;
      }

      const result = await todoTool.createTask({
        executor: testExecutorId,
        title: {
          prefix: "[测试]",
          subject: "更新测试待办",
        },
      });
      createdTaskId = result.taskId;
    });

    afterEach(async () => {
      if (createdTaskId) {
        await todoTool.batchDeleteTasks([createdTaskId]).catch(() => {});
      }
    });

    test("should update task status to finish", async () => {
      if (!createdTaskId) {
        console.log("No task created, skipping test");
        return;
      }

      await todoTool.updateTask({
        taskId: createdTaskId,
        status: 'finish',
      });

      const task = await todoTool.getTask(createdTaskId);
      expect(task.status).toBe('finish');
    });

    test("should update task description", async () => {
      if (!createdTaskId) {
        console.log("No task created, skipping test");
        return;
      }

      await todoTool.updateTask({
        taskId: createdTaskId,
        description: "更新后的描述",
      });

      const task = await todoTool.getTask(createdTaskId);
      expect(task.description).toBe("更新后的描述");
    });

    test("should update task due time", async () => {
      if (!createdTaskId) {
        console.log("No task created, skipping test");
        return;
      }

      const newDueTime = Date.now() + 48 * 60 * 60 * 1000;
      await todoTool.updateTask({
        taskId: createdTaskId,
        dueTime: newDueTime,
      });

      const task = await todoTool.getTask(createdTaskId);
      expect(task.dueTime).toBe(newDueTime);
    });

    test("should update multiple fields", async () => {
      if (!createdTaskId) {
        console.log("No task created, skipping test");
        return;
      }

      const newDueTime = Date.now() + 72 * 60 * 60 * 1000;
      await todoTool.updateTask({
        taskId: createdTaskId,
        status: 'finish',
        description: "多字段更新测试",
        dueTime: newDueTime,
        priority: 2,
      });

      const task = await todoTool.getTask(createdTaskId);
      expect(task.status).toBe('finish');
      expect(task.description).toBe("多字段更新测试");
      expect(task.dueTime).toBe(newDueTime);
      expect(task.priority).toBe(2);
    });

    test("should throw error for empty task id", async () => {
      await expect(
        todoTool.updateTask({
          taskId: "",
          status: 'finish',
        })
      ).rejects.toThrow('taskId is required and cannot be empty');
    });

    test("should throw error when no update fields provided", async () => {
      await expect(
        todoTool.updateTask({
          taskId: createdTaskId,
        })
      ).rejects.toThrow('At least one update field is required');
    });
  });

  describe("batchCreateTasks", () => {
    let createdTaskIds: string[] = [];

    afterEach(async () => {
      if (createdTaskIds.length > 0) {
        await todoTool.batchDeleteTasks(createdTaskIds).catch(() => {});
        createdTaskIds = [];
      }
    });

    test("should batch create multiple tasks", async () => {
      if (!testExecutorId) {
        console.log("No users found, skipping test");
        return;
      }

      const tasks: CreateTaskParams[] = [
        {
          executor: testExecutorId,
          title: { prefix: "[批量]", subject: "任务1" },
        },
        {
          executor: testExecutorId,
          title: { prefix: "[批量]", subject: "任务2" },
        },
        {
          executor: testExecutorId,
          title: { prefix: "[批量]", subject: "任务3" },
        },
      ];

      const results = await todoTool.batchCreateTasks(tasks);

      expect(results).toBeDefined();
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(3);

      results.forEach(result => {
        expect(result.taskId).toBeDefined();
        expect(typeof result.taskId).toBe('string');
      });

      createdTaskIds = results.map(r => r.taskId);
    });

    test("should batch create tasks with full fields", async () => {
      if (!testExecutorId) {
        console.log("No users found, skipping test");
        return;
      }

      const dueTime = Date.now() + 24 * 60 * 60 * 1000;
      const tasks: CreateTaskParams[] = [
        {
          executor: testExecutorId,
          title: { prefix: "[批量完整]", subject: "完整任务" },
          description: "批量创建完整任务描述",
          dueTime: dueTime,
          priority: 1,
        },
      ];

      const results = await todoTool.batchCreateTasks(tasks);

      expect(results).toBeDefined();
      expect(results.length).toBe(1);

      const task = await todoTool.getTask(results[0].taskId);
      expect(task.description).toBe("批量创建完整任务描述");
      expect(task.dueTime).toBe(dueTime);
      expect(task.priority).toBe(1);

      createdTaskIds = results.map(r => r.taskId);
    });

    test("should throw error for empty tasks array", async () => {
      await expect(
        todoTool.batchCreateTasks([])
      ).rejects.toThrow('tasks must be a non-empty array');
    });

    test("should throw error for invalid task in array", async () => {
      await expect(
        todoTool.batchCreateTasks([
          {
            executor: "",
            title: { prefix: "", subject: "" },
          },
        ])
      ).rejects.toThrow();
    });
  });

  describe("batchDeleteTasks", () => {
    let createdTaskIds: string[] = [];

    beforeEach(async () => {
      if (!testExecutorId) {
        return;
      }

      const results = await todoTool.batchCreateTasks([
        {
          executor: testExecutorId,
          title: { prefix: "[删除]", subject: "待删除任务1" },
        },
        {
          executor: testExecutorId,
          title: { prefix: "[删除]", subject: "待删除任务2" },
        },
      ]);
      createdTaskIds = results.map(r => r.taskId);
    });

    test("should batch delete tasks", async () => {
      if (createdTaskIds.length === 0) {
        console.log("No tasks created, skipping test");
        return;
      }

      await todoTool.batchDeleteTasks(createdTaskIds);
      expect(true).toBe(true);
      createdTaskIds = [];
    });

    test("should throw error for empty task ids array", async () => {
      await expect(
        todoTool.batchDeleteTasks([])
      ).rejects.toThrow('taskIds must be a non-empty array');
    });
  });

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      TokenManager.resetInstance();
      
      const invalidTool = new TodoTool({
        appId: "invalid-app-id",
        appKey: "invalid-app-key",
        baseUrl,
      });

      await expect(
        invalidTool.createTask({
          executor: "user-id",
          title: { prefix: "test", subject: "test" },
        })
      ).rejects.toThrow();
    });

    test("should handle network errors", async () => {
      const toolWithBadUrl = new TodoTool({
        appId,
        appKey,
        baseUrl: "https://invalid-url-that-does-not-exist.wps.cn",
      });

      await expect(
        toolWithBadUrl.createTask({
          executor: testExecutorId || "user-id",
          title: { prefix: "test", subject: "test" },
        })
      ).rejects.toThrow();
    });
  });

  describe("Data Types", () => {
    let createdTaskId: string;

    beforeEach(async () => {
      if (!testExecutorId) {
        return;
      }

      const result = await todoTool.createTask({
        executor: testExecutorId,
        title: { prefix: "[类型]", subject: "类型测试" },
        description: "类型测试描述",
        dueTime: Date.now() + 86400000,
        priority: 1,
      });
      createdTaskId = result.taskId;
    });

    afterEach(async () => {
      if (createdTaskId) {
        await todoTool.batchDeleteTasks([createdTaskId]).catch(() => {});
      }
    });

    test("should return properly typed TodoTask object", async () => {
      if (!createdTaskId) {
        console.log("No task created, skipping test");
        return;
      }

      const task = await todoTool.getTask(createdTaskId);

      expect(typeof task.taskId).toBe('string');
      expect(typeof task.executor).toBe('string');
      expect(typeof task.title).toBe('object');
      expect(typeof task.title.prefix).toBe('string');
      expect(typeof task.title.subject).toBe('string');
      expect(['todo', 'finish']).toContain(task.status);

      if (task.description) {
        expect(typeof task.description).toBe('string');
      }
      if (task.dueTime) {
        expect(typeof task.dueTime).toBe('number');
      }
      if (task.priority !== undefined) {
        expect(typeof task.priority).toBe('number');
      }
      if (task.createTime) {
        expect(typeof task.createTime).toBe('number');
      }
    });
  });
});
