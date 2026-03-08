---
title: Get User Information
breadcrumb: WPS365应用开发 > 认证与授权 > 用户授权 > 获取用户信息
source: raw_md/app-integration-dev/wps365/server/certification-authorization/user-authorization/user-info.md
---

# 获取用户信息

获取用户信息

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/users/current**                                         |
| :----------- | :---------------------------------------------------------------------------------- |
| **请求方法** | GET                                                                                 |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 查询用户基础信息（用户授权） `kso.user_base.read`                                   |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/users/current
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**     | **参数类型** | **说明**                                                                                                      |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------ |
| code         | integer      | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg          | string       | 响应信息                                                                                                      |
| data         | object       | 响应数据                                                                                                      |
| ∟ avatar     | string       | 头像地址                                                                                                      |
| ∟ company_id | string       | 企业 id                                                                                                       |
| ∟ id         | string       | 用户 id                                                                                                       |
| ∟ user_name  | string       | 昵称                                                                                                          |
| more         | object       | 更多的错误信息                                                                                                |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "avatar": "string",
    "company_id": "string",
    "id": "string",
    "user_name": "string"
  },
  "msg": "string",
  "code": 0
}
```
