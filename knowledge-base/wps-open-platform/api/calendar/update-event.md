# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar-event/update-calendar-event
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar-event/update-calendar-event

---

更新日程

更新日程，当 calendar_id = primary 时， 操作的是主日历下的数据

标签：日程

请求说明
字段 值

请求地址
 https://openapi.wps.cn/v7/calendars/{calendar_id}/events/{event_id}/update

HTTP 方法
 POST

接口描述
 修改日程，当 calendar_id = primary 时， 操作的是主日历下的数据

签名方式
 KSO-1

限频策略
 无

权限要求
 
查询和管理日程信息(应用授权) kso.calendar_events.readwrite
查询和管理日程信息(用户授权) kso.calendar_events.readwrite
路径参数 (Path)
属性名 类型 是否必填 描述 可选值

calendar_id
 string 是 日历id，可从日历列表、主日历详情获取，或使用primary指代用户的主日历 -

event_id
 string 是 日程id，可从日程列表获取 -
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

calendar_id string 否 

切换日历，传入日历id，可从日历列表获取

description string 否 

备注

end_time object 否 

结束时间

free_busy_status string 否 

忙闲状态:

busy:忙碌状态，表示该时间段被占用

free:空闲状态，表示该时间段可用

枚举值：
busy
free

is_notification boolean 否 

是否向日程参与者发送日程更新通知，默认为true

is_reinvition boolean 否 

是否重置邀请;当设置为true并且日程时间属性(开始、结束时间、重复规则等)被修改时，所有参与者会重置为未接受，默认为true

locations array[object] 否 

地址，最多支持1个

mod_type string 否 

日程编辑类型，仅针对重复日程有效:

one:仅编辑该日程的单个实例

all:编辑该日程的所有实例

枚举值：
one
all

online_meeting object 否 

在线会议，null 为清理

recurrence object 否 

重复规则，用于设置日程的重复方式

reminders array[object] 否 

日程提醒，最多支持10个

start_time object 否 

开始时间

summary string 否 

标题

visibility string 否 

日程可见范围，控制日程是否公开:

default:默认

public:公开

private:仅自己可见

枚举值：
default
public
private

which_day_time integer 否 

重复日程下要更改的某次日程开始时间，毫秒时间戳，当mod_type为one时必填，用于指定要修改的是重复日程的哪一天
单位: ms

请求体示例
{
 "attendee_ability": "can_see_others",
 "calendar_id": "string",
 "description": "string",
 "end_time": {
 "date": "string",
 "datetime": "string"
 },
 "free_busy_status": "busy",
 "is_notification": true,
 "is_reinvition": true,
 "locations": [
 {
 "name": "string"
 }
 ],
 "mod_type": "one",
 "online_meeting": {
 "description": "string",
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
 "visibility": "default",
 "which_day_time": 0
}

响应体(Response)

HTTP状态码: 200
响应体格式: application/json
属性名
展开子列表
 类型 描述

data object 

日程

code integer 
-

msg string 

人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。

响应体示例
{
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
 },
 "code": 0,
 "msg": "string"
}