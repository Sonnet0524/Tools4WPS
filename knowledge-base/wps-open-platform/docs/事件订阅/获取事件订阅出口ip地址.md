# 获取事件订阅出口 ip 地址

WPS365 开放平台向应用配置的回调地址推送事件时，是通过特定的 IP 发送出去的，应用可以通过本接口获取所有相关的出口 IP 地址。

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/event/egress_ip**                                                           |
| :----------- | :------------------------------------------------------------------------------------------------------ |
| **请求方法** | GET                                                                                                     |
| **签名方式** | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 查询事件出网 IP 地址（应用授权） `kso.event_egress_ip.read`                                             |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                                         |
| :------------------ | :----------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                                         |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                                          |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                                        |

## 查询参数（Query）

<!-- 为了保持文档格式统一：参数中文说明请使用中文全角标点符号；中英文间请添加空格 -->

| **名称**   | **参数类型** | **是否必填** | **说明**                                                                                                                                |
| :--------- | :----------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| page_size  | integer      | 否           | 分页大小，默认值：10，最大值：50                                                                                                        |
| page_token | string       | 否           | 分页标记，第一次请求不填，表示从头开始遍历；分页查询结果还有更多项时会同时返回新的 page_token，下次遍历可采用该 page_token 获取查询结果 |
| with_total | boolean      | 否           | 是否返回 total 字段，默认不返回                                                                                                         |

## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/event/egress_ip?page_size={integer}&page_token={string}&with_total={boolean}
```

## 响应体

<!-- 为了保持文档格式统一：参数中文说明请使用中文全角标点符号；中英文间请添加空格 -->

| **名称**           | **参数类型**  | **说明**                                                                                                                          |
| :----------------- | :------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| code               | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/errorcode) |
| msg                | string        | 响应信息                                                                                                                          |
| data               | object        | 响应数据                                                                                                                          |
| ∟ items           | array[string] | 事件推送的出口 IP 列表, CidR 格式                                                                                                 |
| ∟ next_page_token | string        | 下一页 token                                                                                                                      |
| ∟ total           | integer       | 总数                                                                                                                              |
| more               | object        | 更多的错误信息                                                                                                                    |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "code": 0,
  "data": {
    "items": [
      "string"
    ],
    "next_page_token": "string",
    "total": 0
  },
  "msg": "string"
}
```