import { TokenManager, Signature } from "../auth";
import type {
  Calendar,
  CalendarEvent,
  CalendarListResult,
  CalendarEventListResult,
  GetCalendarsParams,
  GetEventsParams,
  CreateEventParams,
  UpdateEventParams,
  APIError,
} from "./types";

export interface CalendarToolConfig {
  appId: string;
  appKey: string;
  baseUrl?: string;
}

export class CalendarTool {
  private tokenManager: TokenManager;
  private signature: Signature;
  private baseUrl: string;

  constructor(config: CalendarToolConfig) {
    this.tokenManager = TokenManager.getInstance({
      appId: config.appId,
      appKey: config.appKey,
      baseUrl: config.baseUrl,
    });
    this.signature = new Signature(config.appId, config.appKey);
    this.baseUrl = config.baseUrl || "https://openapi.wps.cn";
  }

  /**
   * 获取日历列表
   */
  async getCalendars(params: GetCalendarsParams = {}): Promise<CalendarListResult> {
    const queryParams = new URLSearchParams();
    
    if (params.pageSize !== undefined) {
      queryParams.append('page_size', params.pageSize.toString());
    }
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }

    const queryString = queryParams.toString();
    const uri = `/v7/calendars${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: CalendarListResult };
    
    return data.data;
  }

  /**
   * 获取主日历信息
   */
  async getPrimaryCalendar(): Promise<Calendar> {
    const uri = '/v7/calendars/primary';
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: Calendar };
    
    return data.data;
  }

  /**
   * 获取指定日历的日程列表
   */
  async getEvents(params: GetEventsParams): Promise<CalendarEventListResult> {
    const { calendarId } = params;
    
    if (!calendarId || calendarId.trim() === '') {
      throw new Error('calendarId is required and cannot be empty');
    }

    const queryParams = new URLSearchParams();
    
    if (params.startTime) {
      queryParams.append('start_time', encodeURIComponent(params.startTime));
    }
    
    if (params.endTime) {
      queryParams.append('end_time', encodeURIComponent(params.endTime));
    }
    
    if (params.pageSize !== undefined) {
      queryParams.append('page_size', params.pageSize.toString());
    }
    
    if (params.pageToken) {
      queryParams.append('page_token', params.pageToken);
    }
    
    if (params.syncToken) {
      queryParams.append('sync_token', params.syncToken);
    }
    
    if (params.anchorTime) {
      queryParams.append('anchor_time', encodeURIComponent(params.anchorTime));
    }
    
    if (params.withCancelled !== undefined) {
      queryParams.append('with_cancelled', params.withCancelled.toString());
    }

    const queryString = queryParams.toString();
    const uri = `/v7/calendars/${calendarId}/events${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: CalendarEventListResult };
    
    return data.data;
  }

  /**
   * 获取单个日程详情
   */
  async getEvent(calendarId: string, eventId: string): Promise<CalendarEvent> {
    if (!calendarId || calendarId.trim() === '') {
      throw new Error('calendarId is required and cannot be empty');
    }
    
    if (!eventId || eventId.trim() === '') {
      throw new Error('eventId is required and cannot be empty');
    }

    const uri = `/v7/calendars/${calendarId}/events/${eventId}`;
    
    const response = await this.makeRequest('GET', uri, 'application/json');
    const data = response as { code: number; msg: string; data: CalendarEvent };
    
    return data.data;
  }

  /**
   * 创建日程
   */
  async createEvent(params: CreateEventParams): Promise<CalendarEvent> {
    const { calendarId, summary, startTime, endTime } = params;
    
    if (!calendarId || calendarId.trim() === '') {
      throw new Error('calendarId is required and cannot be empty');
    }
    
    if (!summary || summary.trim() === '') {
      throw new Error('summary is required and cannot be empty');
    }
    
    if (!startTime) {
      throw new Error('startTime is required');
    }
    
    if (!endTime) {
      throw new Error('endTime is required');
    }

    const body: Record<string, unknown> = {
      summary,
      start_time: startTime,
      end_time: endTime,
    };

    if (params.description) {
      body.description = params.description;
    }
    
    if (params.freeBusyStatus) {
      body.free_busy_status = params.freeBusyStatus;
    }
    
    if (params.visibility) {
      body.visibility = params.visibility;
    }
    
    if (params.locations) {
      body.locations = params.locations;
    }
    
    if (params.reminders) {
      body.reminders = params.reminders;
    }
    
    if (params.recurrence) {
      body.recurrence = params.recurrence;
    }
    
    if (params.attendeeAbility) {
      body.attendee_ability = params.attendeeAbility;
    }
    
    if (params.onlineMeeting) {
      body.online_meeting = params.onlineMeeting;
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/calendars/${calendarId}/events/create`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: CalendarEvent };
    
    return data.data;
  }

  /**
   * 更新日程
   */
  async updateEvent(params: UpdateEventParams): Promise<CalendarEvent> {
    const { calendarId, eventId } = params;
    
    if (!calendarId || calendarId.trim() === '') {
      throw new Error('calendarId is required and cannot be empty');
    }
    
    if (!eventId || eventId.trim() === '') {
      throw new Error('eventId is required and cannot be empty');
    }

    const body: Record<string, unknown> = {};

    if (params.summary) {
      body.summary = params.summary;
    }
    
    if (params.startTime) {
      body.start_time = params.startTime;
    }
    
    if (params.endTime) {
      body.end_time = params.endTime;
    }
    
    if (params.description) {
      body.description = params.description;
    }
    
    if (params.freeBusyStatus) {
      body.free_busy_status = params.freeBusyStatus;
    }
    
    if (params.visibility) {
      body.visibility = params.visibility;
    }
    
    if (params.locations) {
      body.locations = params.locations;
    }
    
    if (params.reminders) {
      body.reminders = params.reminders;
    }
    
    if (params.recurrence) {
      body.recurrence = params.recurrence;
    }
    
    if (params.attendeeAbility) {
      body.attendee_ability = params.attendeeAbility;
    }
    
    if (params.isNotification !== undefined) {
      body.is_notification = params.isNotification;
    }
    
    if (params.isReinvition !== undefined) {
      body.is_reinvition = params.isReinvition;
    }
    
    if (params.modType) {
      body.mod_type = params.modType;
    }

    if (Object.keys(body).length === 0) {
      throw new Error('At least one field to update is required');
    }

    const requestBody = JSON.stringify(body);
    const uri = `/v7/calendars/${calendarId}/events/${eventId}/update`;
    
    const response = await this.makeRequest('POST', uri, 'application/json', requestBody);
    const data = response as { code: number; msg: string; data: CalendarEvent };
    
    return data.data;
  }

  /**
   * 删除日程
   */
  async deleteEvent(calendarId: string, eventId: string): Promise<void> {
    if (!calendarId || calendarId.trim() === '') {
      throw new Error('calendarId is required and cannot be empty');
    }
    
    if (!eventId || eventId.trim() === '') {
      throw new Error('eventId is required and cannot be empty');
    }

    const uri = `/v7/calendars/${calendarId}/events/${eventId}/delete`;
    
    await this.makeRequest('POST', uri, 'application/json');
  }

  /**
   * 获取所有日历（自动分页）
   */
  async getAllCalendars(pageSize: number = 20): Promise<Calendar[]> {
    const allCalendars: Calendar[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.getCalendars({
        pageToken,
        pageSize,
      });

      allCalendars.push(...result.items);
      pageToken = result.next_page_token;

      if (!pageToken || result.items.length === 0) {
        break;
      }
    } while (pageToken);

    return allCalendars;
  }

  /**
   * 获取指定时间范围内的所有日程
   */
  async getAllEvents(
    calendarId: string,
    startTime: string,
    endTime: string,
    pageSize: number = 30
  ): Promise<CalendarEvent[]> {
    const allEvents: CalendarEvent[] = [];
    let pageToken: string | undefined;

    do {
      const result = await this.getEvents({
        calendarId,
        startTime,
        endTime,
        pageToken,
        pageSize,
      });

      allEvents.push(...result.items);
      pageToken = result.next_page_token;

      if (!pageToken || result.items.length === 0) {
        break;
      }
    } while (pageToken);

    return allEvents;
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
