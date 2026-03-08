# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/im/chat/chat-manage/get-chat-info
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/im/chat/chat-manage/get-chat-info

---

获取会话信息

获取会话信息

标签：消息与群组

请求说明
字段 值

请求地址
 https://openapi.wps.cn/v7/chats/{chat_id}

HTTP 方法
 GET

接口描述
 获取会话信息

签名方式
 KSO-1

限频策略
 无

权限要求
 
查询和管理会话(应用授权) kso.chat.readwrite
查询会话(应用授权) kso.chat.read
路径参数 (Path)
属性名 类型 是否必填 描述 可选值

chat_id
 string 是 -
查询参数 (Query)
属性名 类型 是否必填 描述 可选值

with_group_ext_attrs
 boolean 否 是否返回 group_ext_attrs, 默认 false 不返回 -

with_ext_attrs
 boolean 否 是否返回 ext_attrs, 默认 false 不返回 -
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

聊天会话，包含单聊和群聊

响应体示例
{
 "code": 0,
 "msg": "string",
 "data": {
 "ctime": 0,
 "ext_attrs": [
 {
 "name": "string",
 "value": "string"
 }
 ],
 "group_ext_attrs": {
 "avatar": {
 "avatars": [
 "string"
 ],
 "type": "default"
 },
 "dept_id": "string",
 "owner_id": "string",
 "settings": {
 "is_disable_all_send": true,
 "is_disable_part_send": true,
 "is_enable_history_messages": true,
 "is_enable_nickname": true,
 "is_external_join_approve": true,
 "is_join_approve": true,
 "is_owner_admin_add_bookmark": true,
 "is_owner_admin_at_all": true,
 "is_owner_admin_modify": true,
 "operation_permissions": {
 "initiate_meeting_permission": "only_owner",
 "initiate_vote_permission": "only_owner",
 "invite_member_permission": "only_owner",
 "manage_announcement_permission": "only_owner",
 "pin_message_permission": "only_owner",
 "urgent_message_permission": "only_owner"
 }
 }
 },
 "id": "string",
 "name": "string",
 "status": "active",
 "type": "p2p"
 }
}