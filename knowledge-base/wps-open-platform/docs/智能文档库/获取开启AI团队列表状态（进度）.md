# 获取开启AI团队列表状态（进度）

查看AI团队状态

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/aidocs/doclib/switch/status** |
| :----------- | :-------------------------------------------------------------------------------------------------------- |
| **请求方法** | GET                                                                                                      |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)|
| **权限要求** | 读写智能文档库数据（用户授权） `kso.aidocs.readwrite`                                               |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 请求参数（Query）

<!-- 为了保持文档格式统一：参数中文说明请使用中文全角标点符号；中英文间请添加空格 -->

| **名称**      | **参数类型** | **是否必填** | **说明**                                                      |
| :------------ | :----------- | :----------- | :------------------------------------------------------------ |
| drive_id | string | 是     |团队id|


## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/aidocs/doclib/switch/status?drive_id=123
```


## 响应体

<!-- 为了保持文档格式统一：参数中文说明请使用中文全角标点符号；中英文间请添加空格 -->

| **名称**     | **参数类型** | **说明**                                                                                                      |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------ |
| code         | integer      | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg          | string       | 响应信息                                                                                                      |
| data         | object       | 响应数据                                                                                                      |
| ∟ process_percentage| int       |                                   进度                              |
| ∟ total_files | int    | 该团队下的文件数|
∟ status|string|团队状态

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "code": 0,
  "data": {
    "process_percentage": 100,
    "total_files": 0,
    "status": "open"
  },
  "msg": "success"
}
```