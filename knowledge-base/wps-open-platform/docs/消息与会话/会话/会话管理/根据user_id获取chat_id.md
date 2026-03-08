# 根据userid获取会话信息

通过该接口，可获取应用与用户单聊的会话信息

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/chats/get_p2p_chat**                          |
| :----------- | :---------------------------------------------------------------------------------- |
| **请求方法** | GET                                                                                |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 查询和管理会话消息（应用授权） `kso.chat_message.readwrite`                         |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |
## 查询参数（Query）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                    | **参数类型**        | **是否必填** | **说明**                                    |
| :--------- | :----------- | :------- | :------- |
| user_id | string       | 是    |  用户id，仅能获取到当前应用与用户的对话 |



## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/chats/get_p2p_chat?user_id=12344
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明**                                                                                                      |
| :------- | :----------- | :------------------------------------------------- |
| code     | integer      | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg      | string       | 响应信息                                                    |
| data      | object       | 数据信息                                                    |
| ∟ ctime     | int       | 会话创建时间                                                |
| ∟ id     | string       | 会话id                                                |
| ∟ name     | string       | 会话名称                                                |
| ∟ status     | string       | 会话状态：active-活跃，dismissed-解散，默认是活跃的                                                |
| ∟ type     | string       | 会话类型：p2p-单聊                                                |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "ctime": 0,
    "id": "string",
    "name": "string",
    "status": "active",
    "type": "p2p"
  },
  "code": 0,
  "msg": "string"
}
```