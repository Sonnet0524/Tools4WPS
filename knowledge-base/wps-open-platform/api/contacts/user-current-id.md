# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/wps365/server/address-book/user/get-current-user-id
实际URL：https://open.wps.cn/documents/app-integration-dev/wps365/server/address-book/user/get-current-user-id

---

获取用户id信息

查询当前登录用户id信息

请求说明
请求地址 https://openapi.wps.cn/v7/users/current_id
请求方法 GET
签名方式 KSO-1
权限要求 查询用户ID信息（用户授权） kso.user_current_id.read
请求头（Header）
Header 名称 参数类型 是否必填 说明
Content-Type string 是 使用：application/json
X-Kso-Date string 是 RFC1123 格式的日期，例: Wed, 23 Jan 2013 06:43:08 GMT
X-Kso-Authorization string 是 KSO-1 签名值，详见《签名方法》
Authorization string 是 授权凭证，格式为：Bearer {access_token}
请求地址示例
[GET] https://openapi.wps.cn/v7/users/current_id

响应体
名称 参数类型 说明
code integer 响应代码。非 0 表示失败，参照《状态码说明》
msg string 响应信息
data object 响应数据
∟ company_id string 企业id
∟ user_id string 用户id
响应体示例
{
 "data": {
 "company_id": "string",
 "user_id": "string"
 },
 "msg": "string",
 "code": 0
}