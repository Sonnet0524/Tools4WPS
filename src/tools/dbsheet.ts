import { TokenManager, Signature } from "../auth";
import type {
  DBSheetSchema,
  DBSheetRecordResult,
  ListRecordsParams,
  CreateRecordParams,
  CreateSheetParams,
  DBSheet,
  APIError,
} from "./types";

export interface DBSheetToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class DBSheetTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: DBSheetToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  /**
   * 获取多维表格的Schema（包含所有工作表、字段、视图信息）
   */
  async getSchema(fileId: string): Promise<DBSheetSchema> {
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }

    const uri = `/v7/coop/dbsheet/${fileId}/schema`;
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: DBSheetSchema };
    
    return data.data;
  }

  /**
   * 列举指定工作表中的记录
   */
  async listRecords(params: ListRecordsParams): Promise<DBSheetRecordResult> {
    const { fileId, sheetId } = params;
    
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }
    
    if (typeof sheetId !== 'number') {
      throw new Error('sheetId is required and must be a number');
    }

    const body: Record<string, unknown> = {};
    
    if (params.fields) {
      body.fields = params.fields;
    }
    
    if (params.filter) {
      body.filter = params.filter;
    }
    
    if (params.maxRecords !== undefined) {
      body.max_records = params.maxRecords;
    }
    
    if (params.pageSize !== undefined) {
      body.page_size = params.pageSize;
    }
    
    if (params.pageToken) {
      body.page_token = params.pageToken;
    }
    
    if (params.preferId !== undefined) {
      body.prefer_id = params.preferId;
    }
    
    if (params.showFieldsInfo !== undefined) {
      body.show_fields_info = params.showFieldsInfo;
    }
    
    if (params.showRecordExtraInfo !== undefined) {
      body.show_record_extra_info = params.showRecordExtraInfo;
    }
    
    if (params.textValue) {
      body.text_value = params.textValue;
    }
    
    if (params.viewId) {
      body.view_id = params.viewId;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/coop/dbsheet/${fileId}/sheets/${sheetId}/records`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: DBSheetRecordResult };
    
    return data.data;
  }

  /**
   * 在指定工作表中创建记录
   */
  async createRecords(params: CreateRecordParams): Promise<DBSheetRecordResult> {
    const { fileId, sheetId, records } = params;
    
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }
    
    if (typeof sheetId !== 'number') {
      throw new Error('sheetId is required and must be a number');
    }
    
    if (!Array.isArray(records) || records.length === 0) {
      throw new Error('records must be a non-empty array');
    }

    const body: Record<string, unknown> = {
      records: records.map(record => ({
        fields_value: JSON.stringify(record.fieldsValue),
      })),
    };
    
    if (params.preferId !== undefined) {
      body.prefer_id = params.preferId;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/coop/dbsheet/${fileId}/sheets/${sheetId}/records/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: DBSheetRecordResult };
    
    return data.data;
  }

  /**
   * 创建新的工作表
   */
  async createSheet(params: CreateSheetParams): Promise<DBSheet> {
    const { fileId, fields, views } = params;
    
    if (!fileId || fileId.trim() === '') {
      throw new Error('fileId is required and cannot be empty');
    }
    
    if (!Array.isArray(fields) || fields.length === 0) {
      throw new Error('fields must be a non-empty array');
    }
    
    if (!Array.isArray(views) || views.length === 0) {
      throw new Error('views must be a non-empty array');
    }

    const body: Record<string, unknown> = {
      fields,
      views,
    };
    
    if (params.name) {
      body.name = params.name;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/coop/dbsheet/${fileId}/sheets/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: { sheet: DBSheet } };
    
    return data.data.sheet;
  }

  /**
   * 获取单个工作表的信息（通过Schema）
   */
  async getSheet(fileId: string, sheetId: number): Promise<DBSheet | null> {
    const schema = await this.getSchema(fileId);
    return schema.sheets.find(sheet => sheet.id === sheetId) || null;
  }

  /**
   * 列举工作表中的所有记录（自动分页获取全部）
   */
  async listAllRecords(
    fileId: string, 
    sheetId: number, 
    options: Omit<ListRecordsParams, 'fileId' | 'sheetId' | 'pageToken'> = {}
  ): Promise<DBSheetRecordResult> {
    const allRecords: DBSheetRecordResult['records'] = [];
    let pageToken: string | undefined;
    
    do {
      const result = await this.listRecords({
        fileId,
        sheetId,
        ...options,
        pageToken,
        pageSize: options.pageSize || 1000,
      });
      
      allRecords.push(...result.records);
      pageToken = result.page_token;
      
      // 如果已经获取了所有记录，退出循环
      if (!pageToken || result.records.length === 0) {
        break;
      }
    } while (pageToken);

    return {
      records: allRecords,
      page_token: '',
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
