import { TokenManager, Signature } from "../auth";
import type {
  TodoTask,
  TodoResult,
  CreateTaskParams,
  UpdateTaskParams,
  APIError,
} from "./types";

function validateCreateTaskParams(params: CreateTaskParams): CreateTaskParams {
  if (!params.executor || params.executor.trim() === '') {
    throw new Error('executor is required and cannot be empty');
  }
  
  if (!params.title || !params.title.prefix || !params.title.subject) {
    throw new Error('title.prefix and title.subject are required');
  }
  
  if (params.dueTime !== undefined && params.dueTime <= 0) {
    throw new Error('dueTime must be a positive number');
  }
  
  return params;
}

function validateUpdateTaskParams(params: UpdateTaskParams): UpdateTaskParams {
  if (!params.taskId || params.taskId.trim() === '') {
    throw new Error('taskId is required and cannot be empty');
  }
  
  return params;
}

function validateBatchCreateTasks(tasks: CreateTaskParams[]): CreateTaskParams[] {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    throw new Error('tasks must be a non-empty array');
  }
  
  return tasks.map(task => validateCreateTaskParams(task));
}

function validateBatchDeleteTasks(taskIds: string[]): string[] {
  if (!Array.isArray(taskIds) || taskIds.length === 0) {
    throw new Error('taskIds must be a non-empty array');
  }
  
  return taskIds;
}

export interface TodoToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class TodoTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: TodoToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  async createTask(params: CreateTaskParams): Promise<TodoResult> {
    const validated = validateCreateTaskParams(params);
    
    const body: Record<string, unknown> = {
      executor: validated.executor,
      title: {
        prefix: validated.title.prefix,
        subject: validated.title.subject,
      },
      status: 'todo',
    };
    
    if (validated.description) {
      body.description = validated.description;
    }
    
    if (validated.dueTime) {
      body.due_time = validated.dueTime;
    }
    
    if (validated.priority !== undefined) {
      body.priority = validated.priority;
    }
    
    if (validated.link) {
      body.link = {
        pc_url: validated.link.pcUrl,
        mobile_url: validated.link.mobileUrl,
      };
    }
    
    if (validated.reminders && validated.reminders.length > 0) {
      body.notify_config = {
        switch: true,
        reminders: validated.reminders.map(minutes => ({
          before_due_time: minutes,
        })),
      };
    }
    
    const requestBody = JSON.stringify(body);
    const uri = '/v7/todo/tasks';
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: { task_id: string } };
    return { taskId: data.data.task_id };
  }

  async getTask(taskId: string): Promise<TodoTask> {
    if (!taskId || taskId.trim() === '') {
      throw new Error('taskId is required and cannot be empty');
    }

    const uri = `/v7/todo/tasks/${taskId}`;
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: Record<string, unknown> };
    
    return this.mapTaskResponse(data.data);
  }

  async updateTask(params: UpdateTaskParams): Promise<void> {
    const validated = validateUpdateTaskParams(params);
    
    const body: Record<string, unknown> = {};
    
    if (validated.status) {
      body.status = validated.status;
    }
    
    if (validated.description) {
      body.description = validated.description;
    }
    
    if (validated.dueTime !== undefined) {
      body.due_time = validated.dueTime;
    }
    
    if (validated.priority !== undefined) {
      body.priority = validated.priority;
    }
    
    if (validated.title) {
      body.title = {
        prefix: validated.title.prefix,
        subject: validated.title.subject,
      };
    }
    
    if (Object.keys(body).length === 0) {
      throw new Error('At least one update field is required');
    }
    
    const requestBody = JSON.stringify(body);
    const uri = `/v7/todo/tasks/${validated.taskId}/update`;
    
    await this.makeRequest('POST', uri, 'application/json', requestBody);
  }

  async batchCreateTasks(tasks: CreateTaskParams[]): Promise<TodoResult[]> {
    const validated = validateBatchCreateTasks(tasks);
    
    const tasksBody = validated.map(task => {
      const item: Record<string, unknown> = {
        executor: task.executor,
        title: {
          prefix: task.title.prefix,
          subject: task.title.subject,
        },
        status: 'todo',
      };
      
      if (task.description) {
        item.description = task.description;
      }
      
      if (task.dueTime) {
        item.due_time = task.dueTime;
      }
      
      if (task.priority !== undefined) {
        item.priority = task.priority;
      }
      
      if (task.link) {
        item.link = {
          pc_url: task.link.pcUrl,
          mobile_url: task.link.mobileUrl,
        };
      }
      
      if (task.reminders && task.reminders.length > 0) {
        item.notify_config = {
          switch: true,
          reminders: task.reminders.map(minutes => ({
            before_due_time: minutes,
          })),
        };
      }
      
      return item;
    });
    
    const requestBody = JSON.stringify({ tasks: tasksBody });
    const uri = '/v7/todo/tasks/batch_create';
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: { task_ids: string[] } };
    
    return data.data.task_ids.map(taskId => ({ taskId }));
  }

  async batchDeleteTasks(taskIds: string[]): Promise<void> {
    const validated = validateBatchDeleteTasks(taskIds);
    
    const requestBody = JSON.stringify({ ids: validated });
    const uri = '/v7/todo/tasks/batch_delete';
    
    await this.makeRequest('POST', uri, 'application/json', requestBody);
  }

  private mapTaskResponse(data: Record<string, unknown>): TodoTask {
    const task: TodoTask = {
      taskId: data.id as string,
      executor: data.executor as string,
      title: {
        prefix: (data.title as Record<string, string>).prefix,
        subject: (data.title as Record<string, string>).subject,
      },
      status: data.status as 'todo' | 'finish',
    };
    
    if (data.description) {
      task.description = data.description as string;
    }
    
    if (data.due_time) {
      task.dueTime = data.due_time as number;
    }
    
    if (data.priority !== undefined) {
      task.priority = data.priority as number;
    }
    
    if (data.create_time) {
      task.createTime = data.create_time as number;
    }
    
    if (data.finish_time) {
      task.finishTime = data.finish_time as number;
    }
    
    if (data.creator) {
      task.creator = data.creator as string;
    }
    
    if (data.link) {
      const linkData = data.link as Record<string, string>;
      task.link = {
        pcUrl: linkData.pc_url,
        mobileUrl: linkData.mobile_url,
      };
    }
    
    if (data.notify_config) {
      const notifyData = data.notify_config as Record<string, unknown>;
      task.notifyConfig = {
        switch: notifyData.switch as boolean,
        reminders: (notifyData.reminders as Array<Record<string, number>>)?.map(r => r.before_due_time) || [],
      };
    }
    
    return task;
  }

  private async makeRequest(
    method: string,
    uri: string,
    contentType: string,
    body?: string
  ): Promise<unknown> {
    const token = await this.tokenManager.getToken();
    const signatureResult = this.signature.generateSignature({
      method,
      uri,
      contentType,
      body,
    });

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': contentType,
      'X-Kso-Date': signatureResult.date,
      'X-Kso-Authorization': signatureResult.authorization,
    };

    const url = `${this.baseUrl}${uri}`;
    
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      const text = await response.text();
      let errorMessage = `API request failed: ${response.status}`;
      
      try {
        const errorData = JSON.parse(text) as APIError;
        if (errorData.msg) {
          errorMessage = errorData.msg;
        }
      } catch {
        if (text) {
          errorMessage = text;
        }
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  }
}
