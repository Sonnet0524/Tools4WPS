# 查询全部 Hook 订阅

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/hooks**                                      |
| :----------- | :----------------------------------------------------------------------------------------------- |
| **请求方法** | GET                                                                                              |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)              |
| **权限要求** | 管理多维表格（用户授权） `kso.dbsheet.readwrite`<br/>管理多维表格（应用授权） `kso.dbsheet.readwrite`|

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

## 查询参数（Query）

| **名称**      | **参数类型** | **是否必填** | **说明**                                 |
| :----------- | :----------- | :----------- | :--------------------------------------- |
| with_detail  | bool         | 否           | 是否返回 hook 规则详情，默认 false      |

## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/hooks?with_detail=true
```

## 响应体

| **名称**   | **参数类型** | **说明**                                                 |
| :--------- | :----------- | :------------------------------------------------------- |
| hooks      | object       | 已订阅 hook 列表                                        |
| ∟ key      | string       | hook id                                                 |
| ∟ value    | object       | Hook 详情                                               |
| ∟ ∟ callback_url | string | 回调地址                                               |
| ∟ ∟ file_id      | string | 文件 id                                               |
| ∟ ∟ hook_id      | string | hook id                                               |
| ∟ ∟ user_id      | string | 发起 hook 的用户                                      |
| ∟ ∟ detail       | object | [订阅规则详情](/app-integration-dev/wps365/server/dbsheet/webhook/create-webhook.html#hook-订阅规则详情)（仅当 `with_detail=true` 时返回）      |
| ∟ ∟ ∟ command   | string  | 订阅命令                                               |
| ∟ ∟ ∟ data      | object  | 订阅规则，参考不同规则说明                             |

## 响应体示例

```
{
  "hooks": {
    "hook_id123": {
      "callback_url": "https://example.com/hook",
      "file_id": "abcdefg",
      "hook_id": "hook_id123",
      "user_id": "user_001",
      "detail": {
        "command": "create_record",
        "data": {
          "sheet_id": 1001
        }
      }
    }
  }
}
```