# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/im/message/reply-msg
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/im/message/reply-msg

---

应用回复消息

用于应用通过WPS协作给回复消息，支持多种消息类型，使用时需注意以下几点：

机器人会话情况下接收者需要在应用可用范围内。
应用机器人回复的消息最多不超过 5000 个字符
在群组回复消息时，机器人需要在该群组中
目前只支持回复文本、富文本、图片类型消息
请求说明
请求地址 https://openapi.wps.cn/v7/chats/{chat_id}/messages/{message_id}/reply
请求方法 POST
签名方式 KSO-1
权限要求 查询和管理会话消息（应用授权） kso.chat_message.readwrite
请求头（Header）
Header 名称 参数类型 是否必填 说明
Content-Type string 是 使用：application/json
X-Kso-Date string 是 RFC1123 格式的日期，例: Wed, 23 Jan 2013 06:43:08 GMT
X-Kso-Authorization string 是 KSO-1 签名值，详见《签名方法》
Authorization string 是 授权凭证，格式为：Bearer {access_token}
路径参数（Path）
名称 参数类型 说明
chat_id string 会话 id
message_id string 消息 id
请求体（Body）
名称 参数类型 是否必填 说明
type string 是 消息类型
text：文本；rich_text：富文本；image：图片；
mentions array 否 被 at 的人员列表，最多不能超过100个，具体用法详见：消息内容（content）结构说明 “如何在消息内@人” 部分说明
∟ id string 是 指定聊天消息中 at 操作的实体索引 id。与消息正文中相应 <at id={index}> 标记中的 {index} 值匹配
∟ identity object 否 被 at 的用户信息，当 at 所有人时该值为空
∟ ∟ company_id string 是 用户所属企业id
∟ ∟ id string 是 用户id
∟ ∟ type string 是 身份类型
user：用户；
∟ type string 是 at 操作对象类型
all：所有人；user：用户
content object 是 消息内容，需要根据发送的消息类型 type，传递不同的对象。详见：消息内容（content）结构说明
请求地址示例
[POST] https://openapi.wps.cn/v7/chats/{chat_id}/messages/{message_id}/reply

请求体示例
{
 "type": "string",
 "mentions": [
 {
 "id": "string",
 "identity": {
 "company_id": "string",
 "id": "string",
 "type": "user"
 },
 "type": "user"
 }
 ],
 "content": {
 // 注意：根据不同 type，传递不同消息内容结构
 }
}

响应体
名称 参数类型 说明
code integer 响应代码。非 0 表示失败，参照《状态码说明》
msg string 响应信息
data object 响应数据
∟ message_id string 消息 id
∟ type string 消息类型
text：文本；rich_text：富文本；image：图片；
file：文件；audio：音频；video：视频；card：卡片消息
∟ content object 消息内容
∟ mentions array[object] 被 at 的人员列表
∟∟ id string 指定聊天消息中 at 操作的实体索引 id。与消息正文中相应 <at id={index}> 标记中的 {index} 值匹配
∟∟ identity object 被 at 的用户信息，当 at 所有人时该值为空
∟∟∟ company_id string 用户所属企业id
∟∟∟ id string 用户id
∟∟∟ type string 身份类型
user：用户；
∟∟ type string at 操作对象类型
all：所有人；user：用户
响应体示例
{
 "data": {
 "message_id": "string",
 "type": "string",
 "content": {
 },
 "mentions": [
 {
 "id": "string",
 "identity": {
 "company_id": "string",
 "id": "string",
 "type": "user"
 },
 "type": "user"
 }
 ]
 },
 "code": 0,
 "msg": "string"
}