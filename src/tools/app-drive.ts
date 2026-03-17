import { TokenManager, Signature } from "../auth";
import type { APIError, FileInfo, FolderInfo } from "./types";

export interface AppDriveToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export interface CreateDriveParams {
  name: string;
  description?: string;
  totalQuota?: number;
}

export interface CreateFileParams {
  driveId: string;
  parentId: string;
  name: string;
  fileType: 'file' | 'folder';
  fileId?: string; // 用于快捷方式
  onNameConflict?: 'fail' | 'rename';
}

export interface ListFilesParams {
  driveId: string;
  parentId: string;
  pageSize?: number;
  pageToken?: string;
}

export class AppDriveTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: AppDriveToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  /**
   * 创建应用盘
   * 应用身份创建自己的存储盘
   */
  async createDrive(params: CreateDriveParams): Promise<{
    id: string;
    name: string;
    alloteeType: 'app';
    quota: {
      total: number;
      used: number;
      remaining: number;
    };
  }> {
    const body: Record<string, unknown> = {
      allotee_type: 'app',  // 关键：指定为应用盘
      name: params.name,
    };

    if (params.description) {
      body.description = params.description;
    }

    if (params.totalQuota) {
      body.total_quota = params.totalQuota;
    }

    const requestBody = JSON.stringify(body);
    const uri = '/v7/drives/create';
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { 
      code: number; 
      msg: string; 
      data: {
        id: string;
        name: string;
        allotee_type: 'app';
        quota: {
          total: number;
          used: number;
          remaining: number;
        };
      }
    };

    return {
      id: data.data.id,
      name: data.data.name,
      alloteeType: data.data.allotee_type,
      quota: data.data.quota,
    };
  }

  /**
   * 获取应用盘列表
   * 获取当前应用拥有的所有应用盘
   */
  async getAppDrives(pageSize: number = 20): Promise<{
    items: Array<{
      id: string;
      name: string;
      alloteeType: 'app';
      quota: {
        total: number;
        used: number;
        remaining: number;
      };
      ctime: number;
    }>;
    nextPageToken?: string;
  }> {
    const queryParams = new URLSearchParams({
      allotee_type: 'app',
      page_size: pageSize.toString(),
    });

    const uri = `/v7/drives?${queryParams.toString()}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { 
      code: number; 
      msg: string; 
      data: {
        items: Array<{
          id: string;
          name: string;
          allotee_type: 'app';
          quota: {
            total: number;
            used: number;
            remaining: number;
          };
          ctime: number;
        }>;
        next_page_token?: string;
      }
    };

    return {
      items: data.data.items.map(item => ({
        id: item.id,
        name: item.name,
        alloteeType: item.allotee_type,
        quota: item.quota,
        ctime: item.ctime,
      })),
      nextPageToken: data.data.next_page_token,
    };
  }

  /**
   * 在应用盘中创建文件或文件夹
   */
  async createFile(params: CreateFileParams): Promise<FileInfo | FolderInfo> {
    const { driveId, parentId, name, fileType } = params;

    const body: Record<string, unknown> = {
      file_type: fileType,
      name: name,
    };

    if (params.fileId) {
      body.file_id = params.fileId;
    }

    if (params.onNameConflict) {
      body.on_name_conflict = params.onNameConflict;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/drives/${driveId}/files/${parentId}/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { 
      code: number; 
      msg: string; 
      data: FileInfo | FolderInfo;
    };

    return data.data;
  }

  /**
   * 获取应用盘中的文件列表
   */
  async listFiles(params: ListFilesParams): Promise<{
    files: FileInfo[];
    folders: FolderInfo[];
    nextPageToken?: string;
  }> {
    const { driveId, parentId } = params;

    const queryParams = new URLSearchParams();
    if (params.pageSize) {
      queryParams.append('page_size', params.pageSize.toString());
    }
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }

    const queryString = queryParams.toString();
    const uri = `/v7/drives/${driveId}/files/${parentId}/children${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { 
      code: number; 
      msg: string; 
      data: {
        items: Array<FileInfo | FolderInfo>;
        next_page_token?: string;
      }
    };

    const files: FileInfo[] = [];
    const folders: FolderInfo[] = [];

    for (const item of data.data.items) {
      if (item.type === 'folder') {
        folders.push(item as FolderInfo);
      } else {
        files.push(item as FileInfo);
      }
    }

    return {
      files,
      folders,
      nextPageToken: data.data.next_page_token,
    };
  }

  /**
   * 获取文件下载信息
   */
  async getDownloadInfo(driveId: string, fileId: string): Promise<{
    url: string;
    expiresAt?: number;
  }> {
    const uri = `/v7/drives/${driveId}/files/${fileId}/download`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { 
      code: number; 
      msg: string; 
      data: {
        url: string;
        expire_time?: number;
      }
    };

    return {
      url: data.data.url,
      expiresAt: data.data.expire_time,
    };
  }

  /**
   * 删除文件
   */
  async deleteFile(driveId: string, fileId: string): Promise<void> {
    const uri = `/v7/drives/${driveId}/files/${fileId}/delete`;
    await this.makeRequest('POST', uri, 'application/json');
  }

  /**
   * 开启文件分享
   */
  async shareFile(driveId: string, fileId: string, expireDays?: number): Promise<{
    shareId: string;
    shareUrl: string;
  }> {
    const body: Record<string, unknown> = {};
    if (expireDays) {
      body.expire_days = expireDays;
    }

    const requestBody = Object.keys(body).length > 0 ? JSON.stringify(body) : undefined;
    const uri = `/v7/drives/${driveId}/files/${fileId}/open_link`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { 
      code: number; 
      msg: string; 
      data: {
        link_id: string;
        link_url: string;
      }
    };

    return {
      shareId: data.data.link_id,
      shareUrl: data.data.link_url,
    };
  }

  /**
   * 获取应用盘的统计信息
   */
  async getDriveStats(driveId: string): Promise<{
    totalFiles: number;
    totalSize: number;
    quota: {
      total: number;
      used: number;
      remaining: number;
    };
  }> {
    const uri = `/v7/drives/${driveId}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { 
      code: number; 
      msg: string; 
      data: {
        quota: {
          total: number;
          used: number;
          remaining: number;
        };
      }
    };

    // 注意：这里需要遍历获取文件数量，API不直接提供
    let totalFiles = 0;
    let totalSize = 0;
    let pageToken: string | undefined;

    do {
      const result = await this.listFiles({
        driveId,
        parentId: '0',
        pageSize: 100,
        pageToken,
      });

      totalFiles += result.files.length + result.folders.length;
      result.files.forEach(file => {
        totalSize += file.size || 0;
      });

      pageToken = result.nextPageToken;
    } while (pageToken);

    return {
      totalFiles,
      totalSize,
      quota: data.data.quota,
    };
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
      'X-Kso-Id-Type': 'internal',  // 应用身份使用internal
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
