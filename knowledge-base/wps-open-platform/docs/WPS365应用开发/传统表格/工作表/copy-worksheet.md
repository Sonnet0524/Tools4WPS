---
title: Duplicate Sheet
breadcrumb: WPS365应用开发 > 传统表格 > 工作表 > 复制工作表
source: raw_md/app-integration-dev/wps365/server/sheets/worksheets/copy-worksheet.md
---


# 复制工作表




**标签**：`【电子表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/worksheets/{worksheet_id}/copy          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理传统表格(应用授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>管理传统表格(用户授权) `kso.sheets.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 
| <div style="white-space: nowrap;">worksheet_id</div> | `integer` | 是 | 工作表ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"copy_first_sheet","name":"copy_first_sheet","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否复制第一个sheet</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "copy_first_sheet": true
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.sheet_id","name":"sheet_id","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>复制成功的sheet_id</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "sheet_id": 0
  },
  "code": 0,
  "msg": "string"
}
```


