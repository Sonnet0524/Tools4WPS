import { TokenManager, Signature } from "../auth";
import type {
  Drive,
  DriveFile,
  DriveListResult,
  DriveFileListResult,
  DriveSearchResult,
  DriveDownloadInfo,
  DriveShareLink,
  GetDrivesParams,
  ListFilesParams,
  SearchFilesParams,
  CreateFolderParams,
  CreateFileParams,
  DeleteFileParams,
  GetDownloadInfoParams,
  ShareFileParams,
  APIError,
} from "./types";

export interface DriveToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class DriveTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: DriveToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  /**
   * 获取云盘列表
   */
  async getDrives(params: GetDrivesParams): Promise<DriveListResult> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('allotee_type', params.alloteeType);
    queryParams.append('page_size', params.pageSize.toString());
    
    if (params.alloteeId) {
      queryParams.append('allotee_id', params.alloteeId);
    }
    
    if (params.sources) {
      params.sources.forEach(s => queryParams.append('sources', s));
    }
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }
    
    if (params.withExtAttrs !== undefined) {
      queryParams.append('with_ext_attrs', params.withExtAttrs.toString());
    }

    const queryString = queryParams.toString();
    const uri = `/v7/drives${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: DriveListResult };
    
    return data.data;
  }

  /**
   * 获取文件列表
   */
  async listFiles(params: ListFilesParams): Promise<DriveFileListResult> {
    const { driveId, parentId } = params;
    
    if (!driveId || driveId.trim() === '') {
      throw new Error('driveId is required and cannot be empty');
    }
    
    if (!parentId || parentId.trim() === '') {
      throw new Error('parentId is required and cannot be empty');
    }

    const queryParams = new URLSearchParams();
    queryParams.append('page_size', params.pageSize.toString());
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }
    
    if (params.withPermission !== undefined) {
      queryParams.append('with_permission', params.withPermission.toString());
    }
    
    if (params.withExtAttrs !== undefined) {
      queryParams.append('with_ext_attrs', params.withExtAttrs.toString());
    }
    
    if (params.filterExts) {
      queryParams.append('filter_exts', params.filterExts);
    }
    
    if (params.filterType) {
      queryParams.append('filter_type', params.filterType);
    }
    
    if (params.order) {
      queryParams.append('order', params.order);
    }
    
    if (params.orderBy) {
      queryParams.append('order_by', params.orderBy);
    }

    const queryString = queryParams.toString();
    const uri = `/v7/drives/${driveId}/files/${parentId}/children${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: DriveFileListResult };
    
    return data.data;
  }

  /**
   * 搜索文件
   */
  async searchFiles(params: SearchFilesParams): Promise<DriveSearchResult> {
    const queryParams = new URLSearchParams();
    
    queryParams.append('type', params.type);
    queryParams.append('page_size', params.pageSize.toString());
    
    if (params.keyword) {
      queryParams.append('keyword', params.keyword);
    }
    
    if (params.fileType) {
      queryParams.append('file_type', params.fileType);
    }
    
    if (params.fileExts) {
      params.fileExts.forEach(ext => queryParams.append('file_exts', ext));
    }
    
    if (params.driveIds) {
      params.driveIds.forEach(id => queryParams.append('drive_ids', id));
    }
    
    if (params.parentIds) {
      params.parentIds.forEach(id => queryParams.append('parent_ids', id));
    }
    
    if (params.creatorIds) {
      params.creatorIds.forEach(id => queryParams.append('creator_ids', id));
    }
    
    if (params.modifierIds) {
      params.modifierIds.forEach(id => queryParams.append('modifier_ids', id));
    }
    
    if (params.sharerIds) {
      params.sharerIds.forEach(id => queryParams.append('sharer_ids', id));
    }
    
    if (params.receiverIds) {
      params.receiverIds.forEach(id => queryParams.append('receiver_ids', id));
    }
    
    if (params.timeType) {
      queryParams.append('time_type', params.timeType);
    }
    
    if (params.startTime !== undefined) {
      queryParams.append('start_time', params.startTime.toString());
    }
    
    if (params.endTime !== undefined) {
      queryParams.append('end_time', params.endTime.toString());
    }
    
    if (params.withPermission !== undefined) {
      queryParams.append('with_permission', params.withPermission.toString());
    }
    
    if (params.withLink !== undefined) {
      queryParams.append('with_link', params.withLink.toString());
    }
    
    if (params.withTotal !== undefined) {
      queryParams.append('with_total', params.withTotal.toString());
    }
    
    if (params.withDrive !== undefined) {
      queryParams.append('with_drive', params.withDrive.toString());
    }
    
    if (params.order) {
      queryParams.append('order', params.order);
    }
    
    if (params.orderBy) {
      queryParams.append('order_by', params.orderBy);
    }
    
    if (params.scope) {
      params.scope.forEach(s => queryParams.append('scope', s));
    }
    
    if (params.searchOperatorName !== undefined) {
      queryParams.append('search_operator_name', params.searchOperatorName.toString());
    }
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }

    const queryString = queryParams.toString();
    const uri = `/v7/files/search${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: DriveSearchResult };
    
    return data.data;
  }

  /**
   * 创建文件夹
   */
  async createFolder(params: CreateFolderParams): Promise<DriveFile> {
    const { driveId, parentId, name } = params;
    
    if (!driveId || driveId.trim() === '') {
      throw new Error('driveId is required and cannot be empty');
    }
    
    if (!parentId || parentId.trim() === '') {
      throw new Error('parentId is required and cannot be empty');
    }
    
    if (!name || name.trim() === '') {
      throw new Error('name is required and cannot be empty');
    }

    const body: Record<string, unknown> = {
      file_type: 'folder',
      name,
    };

    if (params.onNameConflict) {
      body.on_name_conflict = params.onNameConflict;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/drives/${driveId}/files/${parentId}/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: DriveFile };
    
    return data.data;
  }

  /**
   * 创建文件
   */
  async createFile(params: CreateFileParams): Promise<DriveFile> {
    const { driveId, parentId, name, fileType } = params;
    
    if (!driveId || driveId.trim() === '') {
      throw new Error('driveId is required and cannot be empty');
    }
    
    if (!parentId || parentId.trim() === '') {
      throw new Error('parentId is required and cannot be empty');
    }
    
    if (!name || name.trim() === '') {
      throw new Error('name is required and cannot be empty');
    }
    
    if (!fileType) {
      throw new Error('fileType is required');
    }

    const body: Record<string, unknown> = {
      file_type: fileType,
      name,
    };

    if (params.fileId) {
      body.file_id = params.fileId;
    }
    
    if (params.onNameConflict) {
      body.on_name_conflict = params.onNameConflict;
    }
    
    if (params.parentPath) {
      body.parent_path = params.parentPath;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/drives/${driveId}/files/${parentId}/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: DriveFile };
    
    return data.data;
  }

  /**
   * 删除文件
   */
  async deleteFile(params: DeleteFileParams): Promise<void> {
    const { driveId, fileId } = params;
    
    if (!driveId || driveId.trim() === '') {
      throw new Error('driveId is required and cannot be empty');
    }
    
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }

    const uri = `/v7/drives/${driveId}/files/${fileId}/delete`;
    
    await this.makeRequest('POST', uri, 'application/json');
  }

  /**
   * 获取下载信息
   */
  async getDownloadInfo(params: GetDownloadInfoParams): Promise<DriveDownloadInfo> {
    const { driveId, fileId } = params;
    
    if (!driveId || driveId.trim() === '') {
      throw new Error('driveId is required and cannot be empty');
    }
    
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }

    const queryParams = new URLSearchParams();
    
    if (params.withHash !== undefined) {
      queryParams.append('with_hash', params.withHash.toString());
    }
    
    if (params.internal !== undefined) {
      queryParams.append('internal', params.internal.toString());
    }
    
    if (params.storageBaseDomain) {
      queryParams.append('storage_base_domain', params.storageBaseDomain);
    }

    const queryString = queryParams.toString();
    const uri = `/v7/drives/${driveId}/files/${fileId}/download${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: DriveDownloadInfo };
    
    return data.data;
  }

  /**
   * 分享文件
   */
  async shareFile(params: ShareFileParams): Promise<DriveShareLink> {
    const { driveId, fileId, roleId, scope } = params;
    
    if (!driveId || driveId.trim() === '') {
      throw new Error('driveId is required and cannot be empty');
    }
    
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }
    
    if (!roleId || roleId.trim() === '') {
      throw new Error('roleId is required and cannot be empty');
    }
    
    if (!scope) {
      throw new Error('scope is required');
    }

    const body: Record<string, unknown> = {
      role_id: roleId,
      scope,
    };

    if (params.opts) {
      body.opts = params.opts;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/drives/${driveId}/files/${fileId}/open_link`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: DriveShareLink };
    
    return data.data;
  }

  /**
   * 获取所有云盘（自动分页）
   */
  async getAllDrives(
    alloteeType: 'user' | 'group' | 'app',
    options: Omit<GetDrivesParams, 'alloteeType' | 'pageToken' | 'pageSize'> & { pageSize?: number } = {}
  ): Promise<Drive[]> {
    const allDrives: Drive[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.getDrives({
        alloteeType,
        ...options,
        pageToken,
        pageSize: options.pageSize || 100,
      });

      allDrives.push(...result.items);
      pageToken = result.next_page_token;

      if (!pageToken || result.items.length === 0) {
        break;
      }
    } while (pageToken);

    return allDrives;
  }

  /**
   * 获取所有文件（自动分页）
   */
  async getAllFiles(
    driveId: string,
    parentId: string,
    options: Omit<ListFilesParams, 'driveId' | 'parentId' | 'pageToken' | 'pageSize'> & { pageSize?: number } = {}
  ): Promise<DriveFile[]> {
    const allFiles: DriveFile[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.listFiles({
        driveId,
        parentId,
        ...options,
        pageToken,
        pageSize: options.pageSize || 100,
      });

      allFiles.push(...result.items);
      pageToken = result.next_page_token;

      if (!pageToken || result.items.length === 0) {
        break;
      }
    } while (pageToken);

    return allFiles;
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
