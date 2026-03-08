# 根据三方业务id获取消息id

应用可通过第三方业务id查询到WPS侧的message_id，方便做业务侧的映射管理。第三方业务id来源于：
- 旧版发送消息接口时入参（即ctx_id）

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/messages/get_message_ids**                          |
| :----------- | :---------------------------------------------------------------------------------- |
| **请求方法** | POST                                                                                |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 查询和管理会话消息（应用授权） `kso.chat_message.readwrite`                         |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 请求体（Body）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                    | **参数类型**        | **是否必填** | **说明**                                                                                          |
| :-------------------------- | :------------------ | :----------- |:------------------------------------------------------------------------------------------------|
| ex_biz_id_list                        | []string         | 是           | 第三方消息id，可用旧发送消息接口的ctx_id值来入参此参数 |


## 请求体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "ex_biz_id_list": [
    "string"
  ]
}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明**                                                                                                      |
| :------- | :----------- | :------------------------------------------------------------------------------------------------------------ |
| code     | integer      | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg      | string       | 响应信息                                                    |
| data      | object       | 数据信息                                                    |
| ∟ items     | array       | 消息id关系对                                                |
| ∟ ∟ ex_biz_id     | string       | 第三方业务id                                         |
| ∟ ∟ message_id     | string       | 消息id                                             |


## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "items": [
      {
        "ex_biz_id": "string",
        "message_id": "string"
      }
    ]
  },
  "code": 0,
  "msg": "string"
}
```