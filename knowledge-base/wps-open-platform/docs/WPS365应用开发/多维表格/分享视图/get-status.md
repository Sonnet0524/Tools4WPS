---
title: Check if the view is set to share
breadcrumb: WPS365应用开发 > 多维表格 > 分享视图 > 查询视图是否开启分享
source: raw_md/app-integration-dev/wps365/server/dbsheet/share-views/get-status.md
---


# 查询视图是否开启分享



**标签**：`【多维表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/dbsheet/{file_id}/sheets/{sheet_id}/views/{view_id}/sharedlinks/status          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理多维表格(应用授权) `kso.dbsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>查询多维表格(应用授权) `kso.dbsheet.read`</div><div style="margin-top: 5px;"></div><div>管理多维表格(用户授权) `kso.dbsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>查询多维表格(用户授权) `kso.dbsheet.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件 ID | - 
| <div style="white-space: nowrap;">sheet_id</div> | `integer` | 是 | 数据表 ID | - 
| <div style="white-space: nowrap;">view_id</div> | `string` | 是 | 视图 ID | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">view_type</div> | `string` | 是 | 视图类型，表格: G0，表单: F0，仪表盘: D0 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.is_enable","name":"is_enable","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否开启分享</p>\n","children":[]},{"key":"data.share_id","name":"share_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享 ID</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "is_enable": true,
    "share_id": "string"
  },
  "code": 0,
  "msg": "string"
}
```


