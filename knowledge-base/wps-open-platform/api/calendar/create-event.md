# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar-event/create-calendar-event
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar-event/create-calendar-event

---

创建日程
创建日程，当 calendar_id = primary 时， 操作的是主日历下的数据。用户身份每天最多创建500个日程，应用身份不限制

标签：日程

请求说明
字段 值

请求地址
 https://openapi.wps.cn/v7/calendars/{calendar_id}/events/create

HTTP 方法
 POST

接口描述
 创建日程，当 calendar_id = primary 时， 操作的是主日历下的数据。用户身份每天最多创建500个日程，应用身份不限制

签名方式
 KSO-1

限频策略
 无

权限要求
 
查询和管理日程信息(应用授权) kso.calendar_events.readwrite
查询和管理日程信息(用户授权) kso.calendar_events.readwrite
MCP日程管理(用户授权) kso.mcp_calendar.readwrite
MCP场景化服务管理(用户授权) kso.mcp_scenario.readwrite
请求头 (Headers)
属性名 类型 是否必填 描述 可选值

X-Kso-Id-Type
 string 否 类型
* internal - 内部
* external - 外部
 internal, external
路径参数 (Path)
属性名 类型 是否必填 描述 可选值

calendar_id
 string 是 日历id，可从日历列表、主日历详情获取，或使用primary指代用户的主日历 -
请求体(Body)

请求体格式: application/json
属性名
展开子列表
 类型 必填 描述

attendee_ability string 否 

参与者权限，默认是can_see_others:

can_see_others:无法编辑日程、无法邀请其他参与人、可以查看参与人列表

can_invite_others:无法编辑日程、可以邀请其他参与人、可以查看参与人列表

枚举值：
can_see_others
can_invite_others

description string 否 

日程描述

end_time object 是 

结束时间

free_busy_status string 否 

忙闲状态:

busy:忙碌状态，表示该时间段被占用

free:空闲状态，表示该时间段可用

枚举值：
busy
free

locations array[object] 否 

地址，最多支持1个

online_meeting object 否 

在线会议，不传则代表是普通日程，仅在需要使用该日程信息同步创建在线会议时传递

recurrence object 否 

重复规则，用于设置日程的重复方式

reminders array[object] 否 

日程提醒，最多支持10个

start_time object 是 

开始时间

summary string 否 

日程标题

user_id string 否 

用户id;可通过查询通讯录接口获取，已废弃

visibility string 否 

日程可见范围，控制日程是否公开:

default:默认

public:公开

private:仅自己可见

枚举值：
default
public
private

请求体示例
{
 "attendee_ability": "can_see_others",
 "description": "string",
 "end_time": {
 "date": "string",
 "datetime": "string"
 },
 "free_busy_status": "busy",
 "locations": [
 {
 "name": "string"
 }
 ],
 "online_meeting": {
 "description": "string",
 "meeting_setting": {
 "auto_recording": "off",
 "host_id": "string",
 "is_allow_attendees_start": true,
 "is_open_lobby": true,
 "join_permission": "anyone",
 "meeting_type": "general",
 "mute_on_join": "off",
 "recording_view_permission": "organizer_only",
 "require_camera_on_join": true
 },
 "provider": "kso",
 "url": "string"
 },
 "recurrence": {
 "by_day": [
 "string"
 ],
 "by_month": [
 0
 ],
 "by_month_day": [
 0
 ],
 "count": 0,
 "exdate": [
 {
 "date": "string",
 "datetime": "string"
 }
 ],
 "freq": "YEARLY",
 "interval": 0,
 "until_date": {
 "date": "string",
 "datetime": "string"
 }
 },
 "reminders": [
 {
 "minutes": 0
 }
 ],
 "start_time": {
 "date": "string",
 "datetime": "string"
 },
 "summary": "string",
 "visibility": "default"
}

响应体(Response)

HTTP状态码: 200
响应体格式: application/json
属性名
展开子列表
 类型 描述

code integer 
-

msg string 

人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。

data object 

日程

响应体示例
{
 "code": 0,
 "msg": "string",
 "data": {
 "calendar_id": "string",
 "description": "string",
 "end_time": {
 "date": "string",
 "datetime": "string"
 },
 "free_busy_status": "busy",
 "id": "string",
 "locations": [
 {
 "name": "string"
 }
 ],
 "online_meeting": {
 "description": "string",
 "join_code": "string",
 "meeting_setting": {
 "auto_recording": "off",
 "host_id": "string",
 "is_allow_attendees_start": true,
 "is_open_lobby": true,
 "join_permission": "anyone",
 "meeting_type": "general",
 "mute_on_join": "off",
 "recording_view_permission": "organizer_only",
 "require_camera_on_join": true
 },
 "provider": "kso",
 "url": "string"
 },
 "organizer": {
 "type": "user",
 "user_id": "string"
 },
 "original_start_time": {
 "date": "string",
 "datetime": "string"
 },
 "recurrence": {
 "by_day": [
 "string"
 ],
 "by_month": [
 0
 ],
 "by_month_day": [
 0
 ],
 "count": 0,
 "exdate": [
 {
 "date": "string",
 "datetime": "string"
 }
 ],
 "freq": "YEARLY",
 "interval": 0,
 "until_date": {
 "date": "string",
 "datetime": "string"
 }
 },
 "recurring_event_id": "string",
 "reminders": [
 {
 "minutes": 0
 }
 ],
 "start_time": {
 "date": "string",
 "datetime": "string"
 },
 "status": "normal",
 "summary": "string",
 "visibility": "default"
 }
}