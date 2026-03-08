---
title: Open Share View
breadcrumb: WPS365应用开发 > 多维表格 > 分享视图 > 打开分享视图
source: raw_md/app-integration-dev/wps365/server/dbsheet/share-views/enable-share.md
---


# 打开分享视图



**标签**：`【多维表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/dbsheet/{file_id}/sheets/{sheet_id}/views/{view_id}/sharedlinks/open          |
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





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"permission","name":"permission","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享权限，edit: 可编辑，read: 可查看</p>\n","children":[]},{"key":"share_to","name":"share_to","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享范围，anyone: 所有人，company: 企业内成员，assigned: 指定人</p>\n","children":[]},{"key":"view_type","name":"view_type","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>视图类型，表格: G0，表单: F0，仪表盘: D0</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "permission": "string",
  "share_to": "string",
  "view_type": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.share_id","name":"share_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享 ID</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "share_id": "string"
  },
  "code": 0,
  "msg": "string"
}
```


