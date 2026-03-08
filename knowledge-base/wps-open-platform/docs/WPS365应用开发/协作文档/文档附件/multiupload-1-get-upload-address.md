---
title: Upload Multipart Attachment - Request Upload URL
breadcrumb: WPS365应用开发 > 协作文档 > 文档附件 > 附件多段式上传-申请上传地址
source: raw_md/app-integration-dev/wps365/server/documents/attachments/multiupload-1-get-upload-address.md
---


# 申请上传地址



**标签**：`文档附件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/documents/{file_id}/attachments/upload/address          |
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
<OpenapiRenderTable  dataSource='[{"key":"content_type","name":"content_type","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>文件类型，MIME格式。若是不支持或为空的则默认为application/octet-stream,现在支持的请查看<a href=\"https://ksogit.kingsoft.net/-/snippets/284\">https://ksogit.kingsoft.net/-/snippets/284</a></p>\n","children":[]},{"key":"internal","name":"internal","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否使用内网上传，若为true，将返回内网域名用于上传</p>\n","children":[]},{"key":"md5","name":"md5","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>文件哈希值,用于存储商校验上传文件的完整性</p>\n","children":[]},{"key":"name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件名称，长度不超过 240 字符</p>\n","children":[]},{"key":"size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>附件文件大小，单位：Byte</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "content_type": "string",
  "internal": true,
  "md5": "string",
  "name": "string",
  "size": 0
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.request","name":"request","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.request.headers","name":"headers","deprecated":false,"type":"map[string]string","required":"否","enum":[],"xEnum":[],"description":"<p>上传请求头，一些K-V值，可能不返回。若返回此参数，应用向存储商上传对象时应当将这个参数中的所有值完整带入上传请求的 header 中</p>\n","children":[]},{"key":"data.request.method","name":"method","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>HTTP请求方法，PUT/POST, 目前只会返回PUT,后续支持POST可能会在请求参数里指定或者新开接口</p>\n","children":[]},{"key":"data.request.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储商上传地址，地址中可能包含以GET方式传参的参数, 只支持5GB以内文件上传, 获取到上传地址请尽快上传文件(申请地址到开始上传有效期10分钟)</p>\n","children":[]}]},{"key":"data.send_back_params","name":"send_back_params","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.send_back_params.etag","name":"etag","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>etag参数在存储商返回中的位置。上传成功后存储商会返回此值，格式为“位置.字段”，例如：header.ETag。上传完成后，取 header 中对应的值，在 complete 请求中带入</p>\n","children":[]},{"key":"data.send_back_params.key","name":"key","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>对象在对象存储的key参数在存储商返回中的位置。上传成功后存储商会返回此值，格式为“位置.字段”，例如：header.x-obs-save-key。上传完成后，取 header 中对应的值，在 complete 请求中带入</p>\n","children":[]}]},{"key":"data.upload_id","name":"upload_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>上传ID</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "request": {
      "headers": {
        "example_key": "string"
      },
      "method": "string",
      "url": "string"
    },
    "send_back_params": {
      "etag": "string",
      "key": "string"
    },
    "upload_id": "string"
  },
  "code": 0,
  "msg": "string"
}
```


