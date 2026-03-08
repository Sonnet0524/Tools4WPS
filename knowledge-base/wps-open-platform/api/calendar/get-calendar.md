# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar/get-calendar-id
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/calendar/calendar/get-calendar-id

---

查询日历

标签：日历

请求说明
字段 值

请求地址
 https://openapi.wps.cn/v7/calendars/{calendar_id}

HTTP 方法
 GET

接口描述
 查看日历

签名方式
 KSO-1

限频策略
 无

权限要求
 
查询日历信息(应用授权) kso.calendar.read
查询和管理日历信息(应用授权) kso.calendar.readwrite
查询日历信息(用户授权) kso.calendar.read
查询和管理日历信息(用户授权) kso.calendar.readwrite
路径参数 (Path)
属性名 类型 是否必填 描述 可选值

calendar_id
 string 是 日历id，可从日历列表、主日历详情获取 -
响应体(Response)

HTTP状态码: 200
响应体格式: application/json
属性名
展开子列表
 类型 描述

data object 

日历

code integer 
-

msg string 

人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。

响应体示例
{
 "data": {
 "description": "string",
 "id": "string",
 "is_deleted": true,
 "open_status": "private",
 "role": "free_busy_reader",
 "summary": "string",
 "type": "primary"
 },
 "code": 0,
 "msg": "string"
}