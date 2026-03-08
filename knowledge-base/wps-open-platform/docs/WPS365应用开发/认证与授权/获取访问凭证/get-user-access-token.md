---
title: Get User Access Token
breadcrumb: WPS365应用开发 > 认证与授权 > 获取访问凭证 > 获取用户access_token
source: raw_md/app-integration-dev/wps365/server/certification-authorization/get-token/get-user-access-token.md
---

# 获取用户 access_token

## 请求说明

| **请求地址** | **https://openapi.wps.cn/oauth2/token** |
| :----------- | :-------------------------------------- |
| **请求方法** | POST                                    |
| **权限要求** | 无                                      |

## 请求头

| **Header 名称** | **参数类型** | **是否必填** | **说明**                                  |
| :-------------- | :----------- | :----------- | :---------------------------------------- |
| Content-Type    | string       | 是           | 使用：`application/x-www-form-urlencoded` |

## 请求体（Body）

| **名称**      | **参数类型** | **是否必填** | **说明**                       |
| :------------ | :----------- | :----------- |:-----------------------------|
| grant_type    | string       | 是           | 授权类型，使用：`authorization_code` |
| client_id     | string       | 是           | 应用 APPID                     |
| client_secret | string       | 是           | 应用 APPKEY                    |
| code          | string       | 是           | 授权链接重定向时携带的临时码 [查看获取code的方法](/app-integration-dev/wps365/server/certification-authorization/user-authorization/flow.md)               |
| redirect_uri  | string       | 是           | 用于校验 code 对应的重定向地址           |

## 请求地址示例

```
[POST] https://openapi.wps.cn/oauth2/token
```

## 请求体示例

```
// Content-Type: application/x-www-form-urlencoded
// 数据示例

grant_type=authorization_code&client_id=AK2024*********&client_secret=6*********&code=ga**********&redirect_uri=https://test.wps.cn
```

## 接口成功响应体

> 📌<span class="_text-danger"> **请注意：**</span>
> 每个 `access_token` 的有效时长为 `2 小时`，若 `access_token` 未过期仍可使用，直到有效期 `expires_in` 截止失效。
> <span class="_text-danger">在实际开发对接中，应用应当维护 `access_token` 的有效状态，在调接口时优先使用已获取的 `access_token`，无需且不推荐每次都重新请求获取 `access_token`。</span>

| **名称**             | **参数类型** | **说明**               |
|:-------------------|:---------|:---------------------|
| access_token       | string   | 授权 token             |
| expires_in         | integer  | 授权 token 有效时长，单位：秒   |
| refresh_token      | string   | 用户刷新 token           |
| refresh_expires_in | string   | 用户刷新 token 有效时长，单位：秒 |
| token_type         | string   | token 类型，一般为 bearer  |

## 接口失败响应体

| **名称** | **参数类型** | **说明**                                                         |
| :------- | :----------- | :--------------------------------------------------------------- |
| code     | integer      | 错误码。非 0 表示失败，参照[《状态码说明》](https://open.wps.cn) |
| msg      | string       | 错误信息                                                         |

## 响应体示例

```json
// Content-Type: application/json

{
  "access_token": "eyJhbGciOiJFUzI1N**********HQ_JoHbcrL4mZK9Xxg",
  "expires_in": 7200,
  "refresh_token": "eyJhbGciOiJFUzI1N**********HQ_JoHbcrL4mZK9Xxg",
  "refresh_expires_in": 2592000,
  "token_type": "bearer"
}
```
