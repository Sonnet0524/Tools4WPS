import { describe, test, expect, beforeEach, afterEach } from "bun:test";
import { CalendarTool } from "../src/tools/calendar";
import { TokenManager } from "../src/auth";
import type { Calendar, CalendarEvent } from "../src/tools/types";

describe("CalendarTool", () => {
  const appId = "AK20260308LGOUTU";
  const appKey = "743c057b97227a473d404c1eb7fcebda";
  const baseUrl = "https://openapi.wps.cn";
  let calendarTool: CalendarTool;

  beforeEach(() => {
    TokenManager.resetInstance();
    calendarTool = new CalendarTool({ appId, appKey, baseUrl });
  });

  afterEach(() => {
    TokenManager.resetInstance();
  });

  describe("getCalendars", () => {
    test.skip("should get calendars list", async () => {
      const result = await calendarTool.getCalendars({ pageSize: 10 });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);

      // 验证日历结构
      if (result.items.length > 0) {
        const calendar = result.items[0];
        expect(calendar.id).toBeDefined();
        expect(typeof calendar.id).toBe('string');
        expect(calendar.summary).toBeDefined();
        expect(typeof calendar.summary).toBe('string');
        expect(calendar.type).toBeDefined();
        expect(['primary', 'normal']).toContain(calendar.type);
        expect(calendar.role).toBeDefined();
        expect(['free_busy_reader', 'reader', 'writer', 'owner']).toContain(calendar.role);
      }
    });

    test.skip("should support pagination", async () => {
      const result = await calendarTool.getCalendars({ pageSize: 5 });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      // next_page_token 可能为空，如果日历数不足一页
    });
  });

  describe("getPrimaryCalendar", () => {
    test("should get primary calendar", async () => {
      const calendar = await calendarTool.getPrimaryCalendar();

      expect(calendar).toBeDefined();
      expect(calendar.id).toBeDefined();
      expect(calendar.type).toBe('primary');
      expect(calendar.summary).toBeDefined();
      expect(calendar.role).toBeDefined();
    });
  });

  describe("getEvents", () => {
    test("should throw error for empty calendarId", async () => {
      await expect(
        calendarTool.getEvents({ calendarId: "" })
      ).rejects.toThrow('calendarId is required and cannot be empty');
    });

    test.skip("should get events from primary calendar", async () => {
      const now = new Date();
      const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(); // 7天前
      const endTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30天后

      const result = await calendarTool.getEvents({
        calendarId: 'primary',
        startTime,
        endTime,
        pageSize: 10,
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);

      // 验证日程结构
      if (result.items.length > 0) {
        const event = result.items[0];
        expect(event.id).toBeDefined();
        expect(typeof event.id).toBe('string');
        expect(event.summary).toBeDefined();
        expect(typeof event.summary).toBe('string');
        expect(event.calendar_id).toBeDefined();
        expect(event.start_time).toBeDefined();
        expect(event.end_time).toBeDefined();
        expect(event.free_busy_status).toBeDefined();
        expect(['busy', 'free']).toContain(event.free_busy_status);
        expect(event.status).toBeDefined();
        expect(['normal', 'cancelled']).toContain(event.status);
      }
    });

    test.skip("should support time range filtering", async () => {
      const now = new Date();
      const startTime = now.toISOString();
      const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();

      const result = await calendarTool.getEvents({
        calendarId: 'primary',
        startTime,
        endTime,
        pageSize: 5,
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
    });
  });

  describe("getEvent", () => {
    test("should throw error for empty calendarId", async () => {
      await expect(
        calendarTool.getEvent("", "event-id")
      ).rejects.toThrow('calendarId is required and cannot be empty');
    });

    test("should throw error for empty eventId", async () => {
      await expect(
        calendarTool.getEvent("calendar-id", "")
      ).rejects.toThrow('eventId is required and cannot be empty');
    });

    test.skip("should get specific event details", async () => {
      // 先获取日程列表
      const now = new Date();
      const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const endTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

      const eventsResult = await calendarTool.getEvents({
        calendarId: 'primary',
        startTime,
        endTime,
        pageSize: 1,
      });

      if (eventsResult.items.length === 0) {
        console.log("No events found, skipping test");
        return;
      }

      const eventId = eventsResult.items[0].id;
      const event = await calendarTool.getEvent('primary', eventId);

      expect(event).toBeDefined();
      expect(event.id).toBe(eventId);
      expect(event.calendar_id).toBe('primary');
    });
  });

  describe("createEvent", () => {
    test("should throw error for empty calendarId", async () => {
      const now = new Date();
      const startTime = { datetime: now.toISOString() };
      const endTime = { datetime: new Date(now.getTime() + 60 * 60 * 1000).toISOString() };

      await expect(
        calendarTool.createEvent({
          calendarId: "",
          summary: "测试日程",
          startTime,
          endTime,
        })
      ).rejects.toThrow('calendarId is required and cannot be empty');
    });

    test("should throw error for empty summary", async () => {
      const now = new Date();
      const startTime = { datetime: now.toISOString() };
      const endTime = { datetime: new Date(now.getTime() + 60 * 60 * 1000).toISOString() };

      await expect(
        calendarTool.createEvent({
          calendarId: "primary",
          summary: "",
          startTime,
          endTime,
        })
      ).rejects.toThrow('summary is required and cannot be empty');
    });

    test("should throw error for missing startTime", async () => {
      const now = new Date();
      const endTime = { datetime: new Date(now.getTime() + 60 * 60 * 1000).toISOString() };

      await expect(
        calendarTool.createEvent({
          calendarId: "primary",
          summary: "测试日程",
          startTime: undefined as unknown as { datetime: string },
          endTime,
        })
      ).rejects.toThrow('startTime is required');
    });

    test.skip("should create a new event", async () => {
      const now = new Date();
      const startTime = { datetime: now.toISOString() };
      const endTime = { datetime: new Date(now.getTime() + 60 * 60 * 1000).toISOString() };

      const event = await calendarTool.createEvent({
        calendarId: 'primary',
        summary: `测试日程_${Date.now()}`,
        description: "这是一个测试日程",
        startTime,
        endTime,
        freeBusyStatus: 'busy',
        reminders: [{ minutes: 15 }],
      });

      expect(event).toBeDefined();
      expect(event.id).toBeDefined();
      expect(event.summary).toContain('测试日程');
      expect(event.calendar_id).toBe('primary');
      expect(event.status).toBe('normal');

      // 清理：删除测试创建的日程
      await calendarTool.deleteEvent('primary', event.id);
    });

    test.skip("should create all-day event", async () => {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // yyyy-mm-dd

      const event = await calendarTool.createEvent({
        calendarId: 'primary',
        summary: `全天测试_${Date.now()}`,
        description: "这是一个全天测试日程",
        startTime: { date: dateStr },
        endTime: { date: dateStr },
        freeBusyStatus: 'busy',
      });

      expect(event).toBeDefined();
      expect(event.id).toBeDefined();
      expect(event.start_time.date).toBe(dateStr);

      // 清理
      await calendarTool.deleteEvent('primary', event.id);
    });
  });

  describe("updateEvent", () => {
    test("should throw error for empty calendarId", async () => {
      await expect(
        calendarTool.updateEvent({
          calendarId: "",
          eventId: "event-id",
          summary: "更新后的标题",
        })
      ).rejects.toThrow('calendarId is required and cannot be empty');
    });

    test("should throw error for empty eventId", async () => {
      await expect(
        calendarTool.updateEvent({
          calendarId: "primary",
          eventId: "",
          summary: "更新后的标题",
        })
      ).rejects.toThrow('eventId is required and cannot be empty');
    });

    test("should throw error when no fields provided", async () => {
      await expect(
        calendarTool.updateEvent({
          calendarId: "primary",
          eventId: "event-id",
        })
      ).rejects.toThrow('At least one field to update is required');
    });

    test.skip("should update event summary", async () => {
      // 先创建一个日程
      const now = new Date();
      const event = await calendarTool.createEvent({
        calendarId: 'primary',
        summary: `原始标题_${Date.now()}`,
        startTime: { datetime: now.toISOString() },
        endTime: { datetime: new Date(now.getTime() + 60 * 60 * 1000).toISOString() },
      });

      // 更新日程
      const updatedEvent = await calendarTool.updateEvent({
        calendarId: 'primary',
        eventId: event.id,
        summary: `更新后的标题_${Date.now()}`,
        isNotification: false,
      });

      expect(updatedEvent).toBeDefined();
      expect(updatedEvent.id).toBe(event.id);
      expect(updatedEvent.summary).toContain('更新后的标题');

      // 清理
      await calendarTool.deleteEvent('primary', event.id);
    });
  });

  describe("deleteEvent", () => {
    test("should throw error for empty calendarId", async () => {
      await expect(
        calendarTool.deleteEvent("", "event-id")
      ).rejects.toThrow('calendarId is required and cannot be empty');
    });

    test("should throw error for empty eventId", async () => {
      await expect(
        calendarTool.deleteEvent("primary", "")
      ).rejects.toThrow('eventId is required and cannot be empty');
    });

    test.skip("should delete event", async () => {
      // 先创建一个日程
      const now = new Date();
      const event = await calendarTool.createEvent({
        calendarId: 'primary',
        summary: `待删除_${Date.now()}`,
        startTime: { datetime: now.toISOString() },
        endTime: { datetime: new Date(now.getTime() + 60 * 60 * 1000).toISOString() },
      });

      // 删除日程
      await calendarTool.deleteEvent('primary', event.id);

      // 验证删除成功
      await expect(
        calendarTool.getEvent('primary', event.id)
      ).rejects.toThrow();
    });
  });

  describe("getAllCalendars", () => {
    test.skip("should get all calendars with auto pagination", async () => {
      const calendars = await calendarTool.getAllCalendars(5);

      expect(calendars).toBeDefined();
      expect(Array.isArray(calendars)).toBe(true);

      // 验证返回的日历结构
      calendars.forEach((calendar: Calendar) => {
        expect(calendar.id).toBeDefined();
        expect(calendar.summary).toBeDefined();
        expect(calendar.type).toBeDefined();
      });
    });
  });

  describe("getAllEvents", () => {
    test.skip("should get all events with auto pagination", async () => {
      const now = new Date();
      const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const endTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

      const events = await calendarTool.getAllEvents('primary', startTime, endTime, 5);

      expect(events).toBeDefined();
      expect(Array.isArray(events)).toBe(true);

      // 验证返回的日程结构
      events.forEach((event: CalendarEvent) => {
        expect(event.id).toBeDefined();
        expect(event.summary).toBeDefined();
        expect(event.calendar_id).toBeDefined();
      });
    });
  });

  describe("Error Handling", () => {
    test("should handle API errors gracefully", async () => {
      TokenManager.resetInstance();
      
      const invalidTool = new CalendarTool({
        appId: "invalid-app-id",
        appKey: "invalid-app-key",
        baseUrl,
      });

      await expect(
        invalidTool.getCalendars()
      ).rejects.toThrow();
    });

    test("should handle network errors", async () => {
      const toolWithBadUrl = new CalendarTool({
        appId,
        appKey,
        baseUrl: "https://invalid-url-that-does-not-exist.wps.cn",
      });

      await expect(
        toolWithBadUrl.getCalendars()
      ).rejects.toThrow();
    });

    test("should handle non-existent event", async () => {
      await expect(
        calendarTool.getEvent("primary", "non-existent-event-id-12345")
      ).rejects.toThrow();
    });
  });

  describe("Data Types", () => {
    test.skip("should return properly typed Calendar objects", async () => {
      const result = await calendarTool.getCalendars({ pageSize: 1 });

      if (result.items.length === 0) {
        console.log("No calendars found, skipping test");
        return;
      }

      const calendar = result.items[0];

      expect(typeof calendar.id).toBe('string');
      expect(typeof calendar.summary).toBe('string');
      expect(['primary', 'normal']).toContain(calendar.type);
      expect(['free_busy_reader', 'reader', 'writer', 'owner']).toContain(calendar.role);
    });

    test.skip("should return properly typed CalendarEvent objects", async () => {
      const now = new Date();
      const startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const endTime = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

      const result = await calendarTool.getEvents({
        calendarId: 'primary',
        startTime,
        endTime,
        pageSize: 1,
      });

      if (result.items.length === 0) {
        console.log("No events found, skipping test");
        return;
      }

      const event = result.items[0];

      expect(typeof event.id).toBe('string');
      expect(typeof event.summary).toBe('string');
      expect(typeof event.calendar_id).toBe('string');
      expect(event.start_time).toBeDefined();
      expect(event.end_time).toBeDefined();
      expect(['busy', 'free']).toContain(event.free_busy_status);
      expect(['normal', 'cancelled']).toContain(event.status);
    });
  });
});
