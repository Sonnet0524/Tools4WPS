---
title: Get Schema
breadcrumb: WPS365应用开发 > 多维表格 > 获取Schema
source: raw_md/app-integration-dev/wps365/server/dbsheet/get-schema.md
---

# 获取 Schema

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/schema**                                                                                            |
| :----------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **请求方法** | GET                                                                                                                                                    |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)                                                |
| **权限要求** | 管理多维表格（用户授权） `kso.dbsheet.readwrite`<br/>查询多维表格（用户授权） `kso.dbsheet.read` <br/>管理多维表格（应用授权） `kso.dbsheet.readwrite`<br/>查询多维表格（应用授权） `kso.dbsheet.read` |

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
| file_id  | string       | 文件 id  |

## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/schema
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                          | **参数类型**  | **说明**                                                                                                                                                                                                                                                                                                                         |
| :-------------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                              | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode)                                                                                                                                                                                                                    |
| msg                               | string        | 响应信息                                                                                                                                                                                                                                                                                                                         |
| data                              | object        | 响应数据                                                                                                                                                                                                                                                                                                                         |
| ∟ sheets                         | array[object] |                                                                                                                                                                                                                                                                                                                                  |
| ∟ ∟ fields                       | array[object] | 数据表字段，详见 [多维表格参数说明](/app-integration-dev/wps365/server/dbsheet/parameters-description)                                                                                                                                                                                                                                                                                                                                                                               |
| ∟ ∟ id                          | integer       | 数据表 id                                                                                                                                                                                                                                                                                                                        |
| ∟ ∟ name                        | string        | 数据表名称                                                                                                                                                                                                                                                                                                                       |
| ∟ ∟ primary_field_id            | string        | 主要字段                                                                                                                                                                                                                                                                                                                         |
| ∟ ∟ views                       | array[object] | 数据表视图，详见 [多维表格参数说明](/app-integration-dev/wps365/server/dbsheet/parameters-description)                                                                                                                                                                                                                                                                                                                                                                               |
| more                              | object        | 更多的错误信息                                                                                                                                                                                                                                                                                                                   |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "sheets": [
      {
        "id": 1,
        "name": "数据表",
        "views": [
          {
            "id": "B",
            "name": "表格视图",
            "type": "Grid"
          }
        ],
        "primary_field_id": "B",
        "fields": [
          {
            "name": "文本",
            "type": "MultiLineText",
            "id": "B",
            "data": {
              "unique_value": false
            }
          },
          {
            "name": "数字",
            "type": "Number",
            "id": "C",
            "data": {
              "number_format": "0.00_ "
            }
          },
          {
            "name": "日期",
            "type": "Date",
            "id": "D",
            "data": {
              "default_value": "",
              "default_value_type": "Normal",
              "number_format": "yyyy/mm/dd;@"
            }
          },
          {
            "name": "单选项",
            "type": "SingleSelect",
            "id": "E",
            "data": {
              "allow_add_item_while_inputting": true,
              "items": [
                {
                  "color": 4292930553,
                  "id": "B",
                  "value": "选项1"
                },
                {
                  "color": 4292671479,
                  "id": "C",
                  "value": "选项2"
                },
                {
                  "color": 4293064163,
                  "id": "D",
                  "value": "选项3"
                }
              ]
            }
          },
          {
            "name": "图片和附件",
            "type": "Attachment",
            "id": "F",
            "data": {
              "only_upload_by_camera": false
            }
          },
          {
            "name": "等级",
            "type": "Rating",
            "id": "G",
            "data": {
              "max": 5
            }
          }
        ]
      }
    ]
  }
}
```
