---
title: Create Worksheet
breadcrumb: WPS365应用开发 > 传统表格 > 工作表 > 创建工作表
source: raw_md/app-integration-dev/wps365/server/sheets/worksheets/create-worksheet.md
---


# 创建工作表




**标签**：`【电子表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/worksheets          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理传统表格(应用授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>管理传统表格(用户授权) `kso.sheets.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"col_width","name":"col_width","deprecated":false,"type":"number","required":"否","enum":[],"xEnum":[],"description":"<p>列宽</p>\n","children":[]},{"key":"name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>工作表名</p>\n","children":[]},{"key":"position","name":"position","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>插入位置</p>\n","children":[{"key":"position.after_sheet_id","name":"after_sheet_id","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>插入位置，在哪个sheet之后</p>\n","children":[]},{"key":"position.before_sheet_id","name":"before_sheet_id","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>插入位置，在哪个sheet之前</p>\n","children":[]},{"key":"position.end","name":"end","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>插入位置，是否最后</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "col_width": 0,
  "name": "string",
  "position": {
    "after_sheet_id": 0,
    "before_sheet_id": 0,
    "end": true
  }
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.sheet_id","name":"sheet_id","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>sheet id</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

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


