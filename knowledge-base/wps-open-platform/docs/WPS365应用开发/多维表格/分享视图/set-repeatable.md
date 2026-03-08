---
title: Set whether the form view can be resubmitted
breadcrumb: WPS365应用开发 > 多维表格 > 分享视图 > 设置表单视图是否可以重复提交
source: raw_md/app-integration-dev/wps365/server/dbsheet/share-views/set-repeatable.md
---


# 设置表单视图是否可以重复提交



**标签**：`【多维表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/dbsheet/{file_id}/sheets/{sheet_id}/views/{view_id}/sharedlinks/{share_id}/settings          |
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
| <div style="white-space: nowrap;">view_id</div> | `string` | 是 | 视图 ID | - 
| <div style="white-space: nowrap;">share_id</div> | `string` | 是 | 分享视图 ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"repeatable","name":"repeatable","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否可重复提交</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "repeatable": true
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "code": 0,
  "msg": "string"
}
```


