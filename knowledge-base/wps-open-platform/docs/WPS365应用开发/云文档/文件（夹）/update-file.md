---
title: Modify File Metadata Information
breadcrumb: WPS365应用开发 > 云文档 > 文件（夹） > 修改文件元数据信息
source: raw_md/app-integration-dev/wps365/server/yundoc/file/update-file.md
---


# 修改文件元数据信息



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/update          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 修改文件元数据信息 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件(应用授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件(用户授权) `kso.file.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"ext_attr","name":"ext_attr","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文件扩展属性。公网目前支持的扩展属性：</p>\n<ul>\n<li>protected - 是否开启保护，属性值仅支持 &quot;true&quot; 和 &quot;false&quot;</li>\n<li>guid - 安全文档guid，属性值仅支持字母和数字</li>\n</ul>\n","children":[{"key":"ext_attr.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"ext_attr.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "ext_attr": {
    "name": "string",
    "value": "string"
  }
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


