# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/todo/task/update-task
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/todo/task/update-task

---

更新待办任务

更新待办任务

请求说明
请求地址 https://openapi.wps.cn/v7/todo/tasks/{task_id}/update
请求方法 POST
签名方式 KSO-1
权限要求 查询和管理待办任务（应用授权） kso.task.readwrite
请求头（Header）
Header 名称 参数类型 是否必填 说明
Content-Type string 是 使用：application/json
X-Kso-Date string 是 RFC1123 格式的日期，例: Wed, 23 Jan 2013 06:43:08 GMT
X-Kso-Authorization string 是 KSO-1 签名值，详见《签名方法》
Authorization string 是 授权凭证，格式为：Bearer {access_token}
路径参数（Path）
名称 参数类型 说明
task_id string 待办任务 id
请求体（Body）
名称 参数类型 是否必填 说明
actions array[object] 否 操作行为
∟ key string 否 回调 key
∟ link object 否 跳转 url
∟ ∟ mobile_url string 是 移动端跳转链接
∟ ∟ pc_url string 是 pc 跳转链接
∟ modal object 否 弹窗设置
∟ ∟ desc string 是 弹窗提示文本
∟ ∟ title string 是 弹窗标题
∟ ∟ required boolean 否 必须填写原因
∟ style string[enum] 否 按钮样式
normal：普通样式；secondary：辅助样式；disable：禁用样式
∟ text string 是 按钮文本
category_id string 否 待办分类 id
description string 否 待办描述
display_time integer 否 展示时间（预留，单位：毫秒)
due_time integer 否 截止时间（单位：毫秒)
ext_attrs array[object] 否 预留扩展字段
∟ name string 是 属性名
∟ value string 是 属性值
finish_time integer 否 完成时间（单位：毫秒)
is_read boolean 否 是否已读
link object 否 待办任务跳转链接
∟ mobile_url string 是 移动端跳转链接
∟ pc_url string 是 pc 跳转链接
notify_config object 否 提醒设置
∟ reminders array[object] 否 推送人设置
∟ ∟ before_due_time integer 否 提前推送时间（单位：分）
∟ switch boolean 否 推送开关（默认开）
priority integer 否 优先级 id
status string[enum] 否 待办状态
todo：未完成；finish：已完成
tags array[string] 否 标签
title object 否 待办标题
∟ prefix string 是 前缀
∟ subject string 是 主题
请求地址示例
[POST] https://openapi.wps.cn/v7/todo/tasks/{task_id}/update

请求体示例
{
 "actions": [
 {
 "key": "string",
 "link": {
 "mobile_url": "string",
 "pc_url": "string"
 },
 "modal": {
 "desc": "string",
 "title": "string",
 "required": false
 },
 "style": "string[enum]",
 "text": "string"
 }
 ],
 "category_id": "string",
 "description": "string",
 "display_time": 0,
 "due_time": 0,
 "ext_attrs": [
 {
 "name": "string",
 "value": "string"
 }
 ],
 "finish_time": 0,
 "is_read": false,
 "link": {
 "mobile_url": "string",
 "pc_url": "string"
 },
 "notify_config": {
 "reminders": [
 {
 "before_due_time": 0
 }
 ],
 "switch": false
 },
 "priority": 0,
 "status": "string[enum]",
 "tags": [
 "string"
 ],
 "title": {
 "prefix": "string",
 "subject": "string"
 }
}

响应体
名称 参数类型 说明
code integer 响应代码。非 0 表示失败，参照《状态码说明》
msg string 响应信息
more object 更多的错误信息
响应体示例
{
 "code": 0,
 "msg": "string"
}