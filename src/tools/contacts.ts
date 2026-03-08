import { TokenManager, Signature } from "../auth";
import type {
  User,
  Group,
  UserListResult,
  GroupListResult,
  GetUsersParams,
  GetGroupsParams,
  APIError,
} from "./types";

function validateGetUsersParams(params?: GetUsersParams): GetUsersParams {
  if (!params) return { status: 'active' };
  
  if (params.status) {
    const statusArray = Array.isArray(params.status) ? params.status : [params.status];
    const validStatuses = ['active', 'notactive', 'disabled'];
    for (const status of statusArray) {
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid status value');
      }
    }
  }
  
  if (params.pageSize !== undefined) {
    if (params.pageSize < 1 || params.pageSize > 50) {
      throw new Error('pageSize must be between 1 and 50');
    }
  }
  
  return params;
}

function validateGetGroupsParams(params?: GetGroupsParams): GetGroupsParams {
  if (!params) return {};
  
  if (params.pageSize !== undefined) {
    if (params.pageSize < 1 || params.pageSize > 50) {
      throw new Error('pageSize must be between 1 and 50');
    }
  }
  
  return params;
}

function validateBatchGetUsers(userIds: string[]): string[] {
  if (!Array.isArray(userIds) || userIds.length === 0) {
    throw new Error('userIds must be a non-empty array');
  }
  
  if (userIds.length > 100) {
    throw new Error('userIds must not exceed 100 items');
  }
  
  return userIds;
}

export interface ContactsToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class ContactsTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: ContactsToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  async getUsers(params?: GetUsersParams): Promise<UserListResult> {
    const validated = validateGetUsersParams(params);
    
    const queryParams = new URLSearchParams();
    
    if (validated.status) {
      const statusArray = Array.isArray(validated.status) ? validated.status : [validated.status];
      statusArray.forEach(status => {
        queryParams.append('status', status);
      });
    } else {
      queryParams.append('status', 'active');
    }
    
    if (validated.pageSize) {
      queryParams.append('page_size', validated.pageSize.toString());
    }
    if (validated.pageToken) {
      queryParams.append('page_token', validated.pageToken);
    }
    if (validated.withDept !== undefined) {
      queryParams.append('with_dept', validated.withDept.toString());
    }
    if (validated.withTotal !== undefined) {
      queryParams.append('with_total', validated.withTotal.toString());
    }

    const queryString = queryParams.toString();
    const uri = `/v7/users?${queryString}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: UserListResult };
    return data.data;
  }

  async getUser(userId: string): Promise<User> {
    if (!userId || userId.trim() === '') {
      throw new Error('userId is required and cannot be empty');
    }

    const uri = `/v7/users/${userId}`;
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: User };
    return data.data;
  }

  async batchGetUsers(userIds: string[]): Promise<User[]> {
    const validated = validateBatchGetUsers(userIds);
    
    const results: User[] = [];
    for (const userId of validated) {
      try {
        const user = await this.getUser(userId);
        results.push(user);
      } catch (error) {
        console.error(`Failed to get user ${userId}:`, error);
      }
    }
    
    return results;
  }

  async getGroups(params?: GetGroupsParams): Promise<GroupListResult> {
    const validated = validateGetGroupsParams(params);
    
    const queryParams = new URLSearchParams();
    if (validated.pageSize) {
      queryParams.append('page_size', validated.pageSize.toString());
    }
    if (validated.pageToken) {
      queryParams.append('page_token', validated.pageToken);
    }

    const queryString = queryParams.toString();
    const uri = queryString ? `/v7/groups?${queryString}` : '/v7/groups';
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: GroupListResult };
    return data.data;
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
