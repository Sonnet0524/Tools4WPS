# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar/get-calendar-list
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar/get-calendar-list

---

查询日历列表

标签：日历

请求说明
字段 值

请求地址
 https://openapi.wps.cn/v7/calendars

HTTP 方法
 GET

接口描述
 日历列表

签名方式
 KSO-1

限频策略
 无

权限要求
 
查询日历信息(应用授权) kso.calendar.read
查询和管理日历信息(应用授权) kso.calendar.readwrite
查询日历信息(用户授权) kso.calendar.read
查询和管理日历信息(用户授权) kso.calendar.readwrite
查询参数 (Query)
属性名 类型 是否必填 描述 可选值

page_token
 string 否 分页标记，第一次请求不需要传递此参数，后续请求需要传递上一次响应中的next_page_token -

page_size
 integer 否 每页返回的日历数量，默认为20，最大值为20 -
响应体(Response)

HTTP状态码: 200
响应体格式: application/json
属性名
展开子列表
 类型 描述

data object 
-

code integer 
-

msg string 

人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。

响应体示例
{
 "data": {
 "items": [
 {
 "id": "string",
 "role": "free_busy_reader",
 "summary": "string",
 "type": "primary"
 }
 ],
 "next_page_token": "string"
 },
 "code": 0,
 "msg": "string"
}