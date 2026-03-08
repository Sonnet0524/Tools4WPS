---
title: Get List of Associated Organizations
breadcrumb: WPS365应用开发 > 通讯录 > 关联组织 > 获取关联组织列表
source: raw_md/app-integration-dev/wps365/server/address-book/partners/get-partners.md
---

# 获取关联组织列表

获取用户在当前企业的关联组织列表

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/partners**                                                                  |
| :----------- |:--------------------------------------------------------------------------------------------------------|
| **请求方法** | GET                                                                                                     |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 查询和管理通讯录信息（应用授权） `kso.contact.readwrite`<br/>查询通讯录信息（应用授权） `kso.contact.read`                           |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 查询参数（Query）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**     | **参数类型**      | **是否必填** | **说明**                                                                          |
|:-----------|:--------------| :----------- |:--------------------------------------------------------------------------------|
| source     | array[string] | 是           | 同步源标记。关联组织来源，多个来源用,分隔，可选值： <br/> `tenant`:来源于多租户；`default`:来源于默认                    |
| page_size  | integer       | 否           | 分页大小，默认为：10，最大值：50                                                              |
| page_token | string        | 否           | 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 |

## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/partners
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                       | **参数类型**          | **说明**                                                                                                        |
|:-----------------------------|:------------------|:--------------------------------------------------------------------------------------------------------------|
| code                         | integer           | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg                          | string            | 响应信息                                                                                                          |
| data                         | object            | 响应数据                                                                                                          |
| ∟ next_page_token            | string            | 下一页token                                                                                                      |
| ∟ partners                   | array[object]     | 关联组织列表                                                                                                        |
| ∟ ∟ company_id               | string            | 公司id                                                                                                          |
| ∟ ∟ company_logo             | string            | 公司头像                                                                                                          |
| ∟ ∟ company_name             | string            | 公司名称                                                                                                          |
| ∟ ∟ id                       | string            | 关联组织id                                                                                                        |
| ∟ ∟ company_status           | string[enum]      | 企业状态                                                                                                          |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "partners": [
      {
        "company_id": "string",
        "company_logo": "string",
        "company_name": "string",
        "id": "string",
        "company_status": "string"
      }
    ],
    "next_page_token": "string"
  },
  "msg": "string",
  "code": 0
}
```