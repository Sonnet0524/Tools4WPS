---
title: Update Form Issue
breadcrumb: WPS365应用开发 > 多维表格 > 表单 > 更新表单问题
source: raw_md/app-integration-dev/wps365/server/dbsheet/forms/update-fields.md
---


# 更新表单问题



**标签**：`多维表` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/dbsheet/{file_id}/sheets/{sheet_id}/forms/{view_id}/fields/{field_id}/update          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理多维表格(应用授权) `kso.dbsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>管理多维表格(用户授权) `kso.dbsheet.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件 ID | - 
| <div style="white-space: nowrap;">sheet_id</div> | `integer` | 是 | 数据表 ID | - 
| <div style="white-space: nowrap;">view_id</div> | `string` | 是 | 表单视图 ID | - 
| <div style="white-space: nowrap;">field_id</div> | `string` | 是 | 字段 ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"description","name":"description","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>字段说明</p>\n","children":[]},{"key":"pre_field_id","name":"pre_field_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>要更新的字段的前一个字段的 ID ，用于更新当前字段的位置。若该字段为空字符串，则表示将该字段的顺序排至首个位置</p>\n","children":[]},{"key":"required","name":"required","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否必填</p>\n","children":[]},{"key":"title","name":"title","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>字段名称</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "description": "string",
  "pre_field_id": "string",
  "required": true,
  "title": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.description","name":"description","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>字段说明</p>\n","children":[]},{"key":"data.pre_field_id","name":"pre_field_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>前一个字段的 ID ，若该字段为空字符串，则表示其为第一个字段</p>\n","children":[]},{"key":"data.required","name":"required","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否必填</p>\n","children":[]},{"key":"data.title","name":"title","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>字段名称</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "description": "string",
    "pre_field_id": "string",
    "required": true,
    "title": "string"
  },
  "code": 0,
  "msg": "string"
}
```


