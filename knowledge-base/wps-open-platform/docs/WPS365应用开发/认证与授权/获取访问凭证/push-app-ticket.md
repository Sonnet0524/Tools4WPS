---
title: Push App Ticket
breadcrumb: WPS365应用开发 > 认证与授权 > 获取访问凭证 > 推送app_ticket
source: raw_md/app-integration-dev/wps365/server/certification-authorization/get-token/push-app-ticket.md
---

# 推送 app_ticket

用于第三方企业应用激活 `app_ticket` 事件推送。
有关 `app_ticket` 的详细介绍，请参考：[通用参数](/app-integration-dev/wps365/server/api-description/noun-description)。

## 请求说明

| **请求地址** | **https://openapi.wps.cn/oauth2/ticket/active** |
|:---------|:------------------------------------------------|
| **请求方法** | POST                                            |
| **权限要求** | 无                                               |

## 请求头（Header）

| **Header 名称** | **参数类型** | **是否必填** | **说明**                                                                                                                                                  |
|:--------------|:---------|:---------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Authorization | string   | 是        | 格式为：`Bearer {access_token}`，使用：[三方应用的 access_token](/app-integration-dev/wps365/server/certification-authorization/get-token/isvapp-app-access-token) |

## 请求地址示例

```
[POST] https://openapi.wps.cn/oauth2/ticket/active
```

## 响应体

| **名称** | **参数类型** | **说明**                                                                                    |
|:-------|:---------|:------------------------------------------------------------------------------------------|
| code   | integer  | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg    | string   | 响应信息                                                                                      |

## 响应体示例

```json
{
  "code": 0
}
```
