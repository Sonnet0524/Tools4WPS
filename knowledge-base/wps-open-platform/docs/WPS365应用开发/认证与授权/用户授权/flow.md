---
title: User Authorization Process
breadcrumb: WPS365应用开发 > 认证与授权 > 用户授权 > 用户授权流程
source: raw_md/app-integration-dev/wps365/server/certification-authorization/user-authorization/flow.md
---

# 用户授权流程

## 流程说明

1、开发者在`开发者后台-安全设置`配置回调地址。
2、用户访问应用时，应用按要求构造授权跳转链接。用户授权成功后，页面将重定向到授权回调地址 `redirect_uri`，并附带 `code` 和 `state` 参数。如：`redirect_uri?code={string}&state={string}`。
3、通过 `code` [获取用户 access_token](/app-integration-dev/wps365/server/certification-authorization/get-token/get-user-access-token)。
4、通过用户 access_token [获取用户信息](/app-integration-dev/wps365/server/certification-authorization/user-authorization/user-info)。

![调用时序](https://cloudcdn.qwps.cn/open/_img/f1bc475482.png '调用时序')

## 构造授权跳转链接

根据定义，构造授权跳转链接，用户同意授权后，会重定向跳转到指定的 `redirect_uri`，并附带 `code`、`state` 两个参数。

**请注意：第三方企业应用接入WPS应用市场时，需使用应用市场专用授权接口：**[ISV应用授权接口](https://kdocs.cn/l/ciQyBkr15Rq3)

### 请求说明

| **请求地址**     | https://openapi.wps.cn/oauth2/auth           |
| :--------------- | :------------------------------------------- |
| **请求方法**     | GET                                          |
| **签名方式**     | 无                                           |
| **支持应用类型** | 企业自建应用、第三方企业应用、第三方个人应用 |
| **权限要求**     | 无                                           |

### 查询参数（query）

| **参数**       | **参数类型** | **是否必填** | **说明**                                                          |
| :------------- | :----------- | :----------- | :---------------------------------------------------------------- |
| client_id      | string       | 是           | 应用 APPID                                                        |
| response_type  | string       | 是           | 参数值必须为 `code`                                               |
| redirect_uri   | string       | 是           | 使用开者后台应用配置的【用户授权回调地址】经过encode后的值                                         |
| scope          | string       | 是           | 用户授权的权限，使用英文逗号分隔，如：`scope1,scope2,scope3`        |
| state          | string       | 否           | 应用自定义数据，授权成功后重定向时会带出                          |

### 请求地址示例

```http
[GET] https://openapi.wps.cn/oauth2/auth?response_type=code&client_id={string}&redirect_uri={string}&scope={scope1,scope2,scope3}&state={string}
```

### 请求响应

- 若用户未登录，则会先跳转到登录页进行登录：

![用户登录](https://cloudcdn.qwps.cn/open/_img/fe3c347bd4.png '用户登录')

- 若用户已登录未授权，则会先跳转到授权页：

![用户授权](https://cloudcdn.qwps.cn/open/_img/8e1198f143.png '用户授权')

- 若用户已授权，则重定向到 `redirect_uri`，并携带**临时授权码 `code` 和用户自定义参数 `state`**。示例：`redirect_uri?code={string}&state={string}`。

📌 **注意：`code` 作为换取 access_token 的票据，仅可使用一次且 10 分钟未被使用自动过期。**

## 根据 code 获取用户 access_token

应用获取到 `code` 之后，服务端调用该接口获取用于访问用户授权凭证 access_token。详见[获取用户 access_token](/app-integration-dev/wps365/server/certification-authorization/get-token/get-user-access-token)。

需要注意的是：由于应用 APPKEY 和获取到的 access_token 安全级别比较高，后续刷新 access_token、通过 access_token 获取用户信息等步骤，必须从服务器调用接口。

## 刷新用户 access_token

access_token 的有效期为 2 小时，开发者可以使用 refresh_token 调用[刷新用户 access_token](/app-integration-dev/wps365/server/certification-authorization/get-token/refresh-user-access-token)重新获取一个有效的 access_token。需注意 2 点：

- 若原 access_token 未过期，原 access_token 仍可使用，直到原有效期截止失效
- 重新获取的 access_token 的值与原 access_token **不一致**，请注意区分使用

refresh_token 有效期为 365 天，当 refresh_token 失效之后，需要用户重新授权。
使用 refresh_token 刷新 access_token 时，会返回一个新的 refresh_token，原 refresh_token 自动失效。
