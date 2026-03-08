# 取消 Hook 订阅

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/hooks/{hook_id}/delete**                      |
| :----------- | :----------------------------------------------------------------------------------------------- |
| **请求方法** | POST                                                                                             |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)              |
| **权限要求** | 管理多维表格（用户授权） `kso.dbsheet.readwrite`<br/>管理多维表格（应用授权） `kso.dbsheet.readwrite` |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 路径参数（Path）

| **名称** | **参数类型** | **说明** |
| :------- | :----------- | :------- |
| file_id  | string       | 文件 id  |
| hook_id  | string       | 需要取消的 hook id |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/hooks/{hook_id}/delete
```

## 请求体（Body）

```
{
  "file_id": "abcdefg",
  "hook_id": "hook_id123"
}
```

## 响应体

| **名称**  | **参数类型** | **说明**                      |
| :-------- | :----------- | :---------------------------- |
| deleted   | bool         | 是否成功取消了 hook，true 表示成功 |

## 响应体示例

```
{
  "deleted": true
}
```