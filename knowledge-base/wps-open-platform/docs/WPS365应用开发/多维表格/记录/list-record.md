---
title: List Records
breadcrumb: WPS365应用开发 > 多维表格 > 记录 > 列举记录
source: raw_md/app-integration-dev/wps365/server/dbsheet/records/list-record.md
---

# 列举记录

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/sheets/{sheet_id}/records**                   |
| :----------- | :----------------------------------------------------------------------------------------------- |
| **请求方法** | POST                                                                                             |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)              |
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

| **名称** | **参数类型** | **说明**  |
| :------- | :----------- | :-------- |
| file_id  | string       | 文件 id   |
| sheet_id | integer      | 数据表 id |

## 请求体（Body）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**               | **参数类型**  | **是否必填** | **说明**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------------- | :------------ | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fields                 | array[string] | 是           | 指定所返回记录中的字段信息，若不填写，则默认返回全部字段内的信息。依据 preferid 的值，需要输入字段名或字段 id                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| filter                 | object        | 否           | 筛选条件                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ∟ criteria            | array[object] | 是           | 可以使用 criteria 数组定义 filter 的条件， 见[多维表格参数说明](/app-integration-dev/wps365/server/dbsheet/parameters-description) |
| max_records            | integer       | 否           | 指定要获取的 “前 maxRecords 条记录”，若不填写，则默认返回全部记录                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| page_size              | integer       | 否           | 分页获取记录时的每页大小。 缺省值为 100，取值范围 1-1000                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| page_token             | string        | 否           | 分页起始位置。 当存在分页， 且未查询到最后一页或 maxRecords 记录时， 返回值会包含 page_token                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| prefer_id              | boolean       | 否           | 使用 id 来标识字段和选项。为 true 时，参数内全部的 field、fields 参数均按照 id 做解析                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| show_fields_info       | boolean       | 否           | 是否额外地返回一个 fields 结构体，展示字段信息（类似 Base Schema 中的 fields）。|
| show_record_extra_info | boolean       | 否           | 是否额外显示创建者、创建时间、最后修改者、最后修改时间信息（与是否有创建者、创建时间、最后修改者、最后修改时间字段无关）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| text_value             | string        | 否           | 返回值类型。 不填默认为 original. 可选： original 返回原始值， text 返回文本值， compound 返回原始值和文本值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| view_id                | string        | 否           | 指定视图 id. 填写后将从被指定的视图获取该用户所见到的记录；若不填写，则从工作表获取记录                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/sheets/{sheet_id}/records
```

## 请求体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "prefer_id": false,
  "show_fields_info": false,
  "text_value": "text",
  "show_record_extra_info": true
}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                       | **参数类型**  | **说明**                                                                                                                                                                                                                                                                                                                         |
| :----------------------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                           | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode)                                                                                                                                                                                                                    |
| msg                            | string        | 响应信息                                                                                                                                                                                                                                                                                                                         |
| data                           | object        | 响应数据                                                                                                                                                                                                                                                                                                                         |
| ∟ fields_schema               | array[object] | 字段定义, 启用 show_fields_info 时返回，详见[多维表格参数说明](/app-integration-dev/wps365/server/dbsheet/parameters-description)                                                                                                                                                                                                                                                                                                                         |
| ∟ page_token                  | string        | 查询的起始记录                                                                                                                                                                                                                                                                                                                   |
| ∟ records                     | array[object] | 记录字段值                                                                                                                                                                                                                                                                                                                       |
| ∟ ∟ created_time             | string        | 记录创建时间                                                                                                                                                                                                                                                                                                                     |
| ∟ ∟ creator                  | string        | 记录创建者                                                                                                                                                                                                                                                                                                                       |
| ∟ ∟ fields                   | object        | 记录值                                                                                                                                                                                                                                                                                                                           |
| ∟ ∟ id                       | string        | 记录 id                                                                                                                                                                                                                                                                                                                          |
| ∟ ∟ last_modified_by         | string        | 记录最后修改人                                                                                                                                                                                                                                                                                                                   |
| ∟ ∟ last_modified_time       | string        | 记录最后修改时间                                                                                                                                                                                                                                                                                                                 |
| more                           | object        | 更多的错误信息                                                                                                                                                                                                                                                                                                                   |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "code": 0,
  "msg": "",
  "data": {
    "fields_schema": [
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
    ],
    "records": [
      {
        "fields": "{\"单选项\":\"选项1\",\"图片和附件\":\"12KB.docx,aigc\",\"数字\":\"123.00 \",\"文本\":\"第一行文本\",\"日期\":\"2024/12/20\",\"等级\":\"1\"}",
        "id": "B",
        "created_time": "2024/12/20 11:30:32",
        "creator": "280026893",
        "last_modified_by": "280026893",
        "last_modified_time": "2024/12/20 15:47:01"
      },
      {
        "fields": "{\"单选项\":\"选项2\",\"图片和附件\":\"14.4KB.png\",\"数字\":\"321.00 \",\"文本\":\"第二行文本\",\"日期\":\"2024/12/21\",\"等级\":\"2\"}",
        "id": "C",
        "created_time": "2024/12/20 11:30:32",
        "creator": "280026893",
        "last_modified_by": "280026893",
        "last_modified_time": "2024/12/20 15:46:52"
      },
      {
        "fields": "{\"单选项\":\"选项3\",\"数字\":\"213.00 \",\"文本\":\"maybe line 3 here\",\"日期\":\"2024/12/22\",\"等级\":\"3\"}",
        "id": "E",
        "created_time": "2024/12/20 11:30:32",
        "creator": "280026893",
        "last_modified_by": "280026893",
        "last_modified_time": "2024/12/20 15:46:52"
      },
      {
        "fields": "{\"单选项\":\"选项3\",\"数字\":\"231.00 \",\"文本\":\"これはライン４です\",\"日期\":\"2024/12/23\",\"等级\":\"4\"}",
        "id": "F",
        "created_time": "2024/12/20 11:30:32",
        "creator": "280026893",
        "last_modified_by": "280026893",
        "last_modified_time": "2024/12/20 15:46:53"
      }
    ],
    "page_token": ""
  }
}
```
