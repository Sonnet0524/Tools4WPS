---
title: Update History
breadcrumb: WPS365应用开发 > 多维表格 > 记录 > 更新记录
source: raw_md/app-integration-dev/wps365/server/dbsheet/records/update-record.md
---

# 更新记录

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/sheets/{sheet_id}/records/update** |
| :----------- | :------------------------------------------------------------------------------------ |
| **请求方法** | POST                                                                                  |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)   |
| **权限要求** | 管理多维表格（用户授权） `kso.dbsheet.readwrite`<br/>管理多维表格（应用授权） `kso.dbsheet.readwrite`                                      |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 路径参数（Path）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明**  |
| :------- | :----------- | :-------- |
| file_id  | string       | 文件 id   |
| sheet_id | integer      | 工作表 id |

## 请求体（Body）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**               | **参数类型**  | **是否必填** | **说明**                                                                                                                                                                                                                                                                                                                         |
| :--------------------- | :------------ | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| prefer_id              | boolean       | 否           | 是否使用字段 id 而不是字段名来标识字段， 默认值为 false                                                                                                                                                                                                                                                                          |
| records                | array[object] | 是           | 每个元素代表需要更新的一条记录                                                                                                                                                                                                                                                                                                   |
| ∟ fields              | array[object] | 是           | 在该数组中填入需要创建的记录的各个 field 的值                                                                                                                           |
| ∟ ∟ id               | string        | 是           | 字段 id / 字段名                                                                                                                                                                                                                                                                                                                 |
| ∟ ∟ fields_value         | object        | 是           | 符合各个字段规范的值，详见 [多维表格参数说明](/app-integration-dev/wps365/server/dbsheet/parameters-description)                                                                                                                                                                                                                                                                                                                         |
| ∟ id                  | string        | 是           | 记录 id                                                                                                                                                                                                                                                                                                                          |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/sheets/{sheet_id}/records/update
```

## 请求体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
    "records": [
        {
            "id": "G",
            "fields_value": "{\"文本\":\"新的文本\",\"日期\":\"2024/12/21\"}"
        }
    ]
}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                 | **参数类型**  | **说明**                                                                                                      |
| :----------------------- | :------------ | :------------------------------------------------------------------------------------------------------------ |
| code                     | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg                      | string        | 响应信息                                                                                                      |
| data                     | object        | 响应数据                                                                                                      |
| ∟ records               | array[object] | 符合各个字段规范的值，详见 [多维表格参数说明](/app-integration-dev/wps365/server/dbsheet/parameters-description) |
| ∟ ∟ fields             | object        | 记录值                                                                                                        |
| ∟ ∟ id                 | string        | 记录 id                                                                                                       |
| more                     | object        | 更多的错误信息                                                                                                |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "records": [
      {
        "fields": "{\"文本\":\"新的文本\",\"日期\":\"2024/12/21\",\"等级\":0}",
        "id": "G"
      }
    ]
  }
}
```
