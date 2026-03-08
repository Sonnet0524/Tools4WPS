---
title: Delete User
breadcrumb: WPS365应用开发 > 通讯录 > 用户 > 删除用户
source: raw_md/app-integration-dev/wps365/server/address-book/user/delete-user.md
---

# 删除用户

基于 user_id 删除指定用户

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/users/{user_id}/delete**                                |
| :----------- | :---------------------------------------------------------------------------------- |
| **请求方法** | POST                                                                                |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 查询和管理通讯录信息（应用授权） `kso.contact.readwrite`                            |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 路径参数（Path）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明** |
| :------- | :----------- | :------- |
| user_id  | string       | 用户 id  |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/users/{user_id}/delete
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明**                                                                                                      |
| :------- | :----------- | :------------------------------------------------------------------------------------------------------------ |
| code     | integer      | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg      | string       | 响应信息                                                                                                      |


## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "msg": "string",
  "code": 0
}
```
