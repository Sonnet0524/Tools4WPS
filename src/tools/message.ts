import { TokenManager, Signature } from "../auth";
import type {
  Chat,
  ChatListResult,
  GetChatsParams,
  MessageResult,
  SendToUserParams,
  SendToChatParams,
  APIError,
} from "./types";

function validateGetChatsParams(params: GetChatsParams): GetChatsParams {
  if (!params.pageSize || params.pageSize < 1 || params.pageSize > 50) {
    throw new Error('pageSize must be between 1 and 50');
  }
  return params;
}

function validateContent(content: string): string {
  if (!content || content.trim() === '') {
    throw new Error('content is required and cannot be empty');
  }
  if (content.length > 5000) {
    throw new Error('content must not exceed 5000 characters');
  }
  return content;
}

function validateUserId(userId: string): string {
  if (!userId || userId.trim() === '') {
    throw new Error('userId is required and cannot be empty');
  }
  return userId;
}

function validateChatId(chatId: string): string {
  if (!chatId || chatId.trim() === '') {
    throw new Error('chatId is required and cannot be empty');
  }
  return chatId;
}

export interface MessageToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class MessageTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: MessageToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  async getChats(params: GetChatsParams): Promise<ChatListResult> {
    const validated = validateGetChatsParams(params);
    
    const queryParams = new URLSearchParams();
    queryParams.append('page_size', validated.pageSize.toString());
    if (validated.pageToken) {
      queryParams.append('page_token', validated.pageToken);
    }

    const queryString = queryParams.toString();
    const uri = `/v7/chats?${queryString}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: ChatListResult };
    return data.data;
  }

  async getChat(chatId: string): Promise<Chat> {
    validateChatId(chatId);
    
    const uri = `/v7/chats/${chatId}`;
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: Chat };
    return data.data;
  }

  async getP2PChat(userId: string): Promise<Chat> {
    validateUserId(userId);
    
    const uri = `/v7/chats/get_p2p_chat?user_id=${userId}`;
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: Chat };
    return data.data;
  }

  async sendToUser(params: SendToUserParams): Promise<MessageResult> {
    const validatedUserId = validateUserId(params.userId);
    const validatedContent = validateContent(params.content);
    
    const body = {
      type: 'text',
      receiver: {
        receiver_id: validatedUserId,
        type: 'user',
      },
      content: {
        text: {
          content: validatedContent,
          type: 'plain',
        },
      },
    };

    const bodyString = JSON.stringify(body);
    const uri = '/v7/messages/create';
    
    const response = await this.makeRequest('POST', uri, 'application/json', bodyString);
    const data = response as { code: number; msg: string; data: MessageResult };
    return data.data;
  }

  async sendToChat(params: SendToChatParams): Promise<MessageResult> {
    const validatedChatId = validateChatId(params.chatId);
    const validatedContent = validateContent(params.content);
    
    const body = {
      type: 'text',
      receiver: {
        receiver_id: validatedChatId,
        type: 'chat',
      },
      content: {
        text: {
          content: validatedContent,
          type: 'plain',
        },
      },
    };

    const bodyString = JSON.stringify(body);
    const uri = '/v7/messages/create';
    
    const response = await this.makeRequest('POST', uri, 'application/json', bodyString);
    const data = response as { code: number; msg: string; data: MessageResult };
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
