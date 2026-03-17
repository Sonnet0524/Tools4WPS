import { TokenManager, Signature } from "../auth";
import type {
  Group,
  GroupMember,
  GroupListResult,
  GroupMemberListResult,
  GetGroupsParams,
  GetGroupMembersParams,
  CreateGroupParams,
  AddGroupMemberParams,
  APIError,
} from "./types";

export interface GroupToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class GroupTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: GroupToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  /**
   * 获取用户组列表
   */
  async getGroups(params: GetGroupsParams = {}): Promise<GroupListResult> {
    const queryParams = new URLSearchParams();
    
    if (params.pageSize !== undefined) {
      queryParams.append('page_size', params.pageSize.toString());
    }
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }
    
    if (params.deptIds) {
      params.deptIds.forEach(id => queryParams.append('dept_ids', id));
    }
    
    if (params.excludeDeptIds) {
      params.excludeDeptIds.forEach(id => queryParams.append('exclude_dept_ids', id));
    }
    
    if (params.joined !== undefined) {
      queryParams.append('joined', params.joined.toString());
    }
    
    if (params.source) {
      params.source.forEach(s => queryParams.append('source', s));
    }
    
    if (params.status) {
      params.status.forEach(s => queryParams.append('status', s));
    }
    
    if (params.type) {
      params.type.forEach(t => queryParams.append('type', t));
    }
    
    if (params.userId) {
      queryParams.append('user_id', params.userId);
    }
    
    if (params.userRole) {
      params.userRole.forEach(r => queryParams.append('user_role', r));
    }
    
    if (params.withTotal !== undefined) {
      queryParams.append('with_total', params.withTotal.toString());
    }

    const queryString = queryParams.toString();
    const uri = `/v7/groups${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: GroupListResult };
    
    return data.data;
  }

  /**
   * 获取指定用户组详情
   */
  async getGroup(groupId: string, withMemberTotal?: boolean): Promise<Group> {
    if (!groupId || groupId.trim() === '') {
      throw new Error('groupId is required and cannot be empty');
    }

    const queryParams = new URLSearchParams();
    if (withMemberTotal !== undefined) {
      queryParams.append('with_member_total', withMemberTotal.toString());
    }

    const queryString = queryParams.toString();
    const uri = `/v7/groups/${groupId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: Group };
    
    return data.data;
  }

  /**
   * 创建用户组
   */
  async createGroup(params: CreateGroupParams): Promise<Group> {
    if (!params.creatorId || params.creatorId.trim() === '') {
      throw new Error('creatorId is required and cannot be empty');
    }
    
    if (!params.name || params.name.trim() === '') {
      throw new Error('name is required and cannot be empty');
    }

    const body: Record<string, unknown> = {
      creator_id: params.creatorId,
      name: params.name,
    };

    if (params.deptId) {
      body.dept_id = params.deptId;
    }
    
    if (params.description) {
      body.description = params.description;
    }
    
    if (params.ownerId) {
      body.owner_id = params.ownerId;
    }
    
    if (params.source) {
      body.source = params.source;
    }
    
    if (params.type) {
      body.type = params.type;
    }
    
    if (params.visibilityType) {
      body.visibility_type = params.visibilityType;
    }
    
    if (params.visibilityMembers) {
      body.visibility_members = params.visibilityMembers;
    }

    const requestBody = JSON.stringify(body);
    const uri = '/v7/groups/create';
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: Group };
    
    return data.data;
  }

  /**
   * 获取用户组成员列表
   */
  async getGroupMembers(params: GetGroupMembersParams): Promise<GroupMemberListResult> {
    const { groupId } = params;
    
    if (!groupId || groupId.trim() === '') {
      throw new Error('groupId is required and cannot be empty');
    }

    const queryParams = new URLSearchParams();
    
    if (params.pageSize !== undefined) {
      queryParams.append('page_size', params.pageSize.toString());
    }
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }
    
    if (params.roles) {
      params.roles.forEach(r => queryParams.append('roles', r));
    }
    
    if (params.withDeptInfo !== undefined) {
      queryParams.append('with_dept_info', params.withDeptInfo.toString());
    }
    
    if (params.withTotal !== undefined) {
      queryParams.append('with_total', params.withTotal.toString());
    }
    
    if (params.withUserInfo !== undefined) {
      queryParams.append('with_user_info', params.withUserInfo.toString());
    }

    const queryString = queryParams.toString();
    const uri = `/v7/groups/${groupId}/members${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: GroupMemberListResult };
    
    return data.data;
  }

  /**
   * 添加用户组成员
   */
  async addGroupMember(params: AddGroupMemberParams): Promise<GroupMember> {
    const { groupId, itemId } = params;
    
    if (!groupId || groupId.trim() === '') {
      throw new Error('groupId is required and cannot be empty');
    }
    
    if (!itemId || itemId.trim() === '') {
      throw new Error('itemId is required and cannot be empty');
    }

    const body: Record<string, unknown> = {
      item_id: itemId,
    };

    if (params.itemType) {
      body.item_type = params.itemType;
    }
    
    if (params.role) {
      body.role = params.role;
    }
    
    if (params.nickname) {
      body.nickname = params.nickname;
    }
    
    if (params.about) {
      body.about = params.about;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/groups/${groupId}/members/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: GroupMember };
    
    return data.data;
  }

  /**
   * 获取所有用户组（自动分页）
   */
  async getAllGroups(params: Omit<GetGroupsParams, 'pageToken'> = {}): Promise<Group[]> {
    const allGroups: Group[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.getGroups({
        ...params,
        pageToken,
        pageSize: params.pageSize || 100,
      });

      allGroups.push(...result.items);
      pageToken = result.next_page_token;

      if (!pageToken || result.items.length === 0) {
        break;
      }
    } while (pageToken);

    return allGroups;
  }

  /**
   * 获取用户组所有成员（自动分页）
   */
  async getAllGroupMembers(
    groupId: string,
    options: Omit<GetGroupMembersParams, 'groupId' | 'pageToken'> = {}
  ): Promise<GroupMember[]> {
    const allMembers: GroupMember[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.getGroupMembers({
        groupId,
        ...options,
        pageToken,
        pageSize: options.pageSize || 100,
      });

      allMembers.push(...result.items);
      pageToken = result.next_page_token;

      if (!pageToken || result.items.length === 0) {
        break;
      }
    } while (pageToken);

    return allMembers;
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
