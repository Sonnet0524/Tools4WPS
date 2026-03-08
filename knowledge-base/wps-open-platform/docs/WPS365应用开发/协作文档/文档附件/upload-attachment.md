---
title: Upload Attachment
breadcrumb: WPS365应用开发 > 协作文档 > 文档附件 > 上传附件
source: raw_md/app-integration-dev/wps365/server/documents/attachments/upload-attachment.md
---


# 上传附件



**标签**：`文档附件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/documents/{file_id}/attachments/upload          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>文档管理能力(应用授权) `kso.documents.readwrite`</div><div style="margin-top: 5px;"></div><div>文档管理能力(用户授权) `kso.documents.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"file","name":"file","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>上传文件的key</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "file": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.size","name":"size","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"data.upload_id","name":"upload_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>上传id</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "size": 0,
    "upload_id": "string"
  },
  "code": 0,
  "msg": "string"
}
```


