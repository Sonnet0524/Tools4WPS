---
title: Update File Version Information
breadcrumb: WPS365应用开发 > 云文档 > 文件版本 > 更新文件版本信息
source: raw_md/app-integration-dev/wps365/server/yundoc/file-version/update-version.md
---


# 更新文件版本信息

更新文件版本信息



**标签**：`文档版本` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/versions/{version_num}/update          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 更新文件版本信息 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文档版本(应用授权) `kso.file_version.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文档版本(用户授权) `kso.file_version.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">version_num</div> | `integer` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"comment","name":"comment","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>版本备注</p>\n","children":[]},{"key":"ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>版本扩展属性</p>\n","children":[{"key":"ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "comment": "string",
  "ext_attrs": [
    {
      "name": "string",
      "value": "string"
    }
  ]
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>历史版本信息</p>\n","children":[{"key":"data.comment","name":"comment","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>版本备注</p>\n","children":[]},{"key":"data.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>历史版本的创建者信息; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>版本扩展属性</p>\n","children":[{"key":"data.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.file_id","name":"file_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件id</p>\n","children":[]},{"key":"data.hash","name":"hash","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.hash.sum","name":"sum","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>哈希结果</p>\n","children":[]},{"key":"data.hash.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["sha256","md5","sha1","s2s"],"xEnum":["sha256","md5","sha1","s2s"],"description":"<p>哈希类型</p>\n","children":[]}]},{"key":"data.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.modified_by","name":"modified_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>历史版本的修改者信息; <font color=red>在降级场景下, modified_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.modified_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.modified_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.modified_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.modified_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.modified_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件版本</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "comment": "string",
    "created_by": {
      "avatar": "string",
      "company_id": "string",
      "id": "string",
      "name": "string",
      "type": "user"
    },
    "ctime": 0,
    "ext_attrs": [
      {
        "name": "string",
        "value": "string"
      }
    ],
    "file_id": "string",
    "hash": {
      "sum": "string",
      "type": "sha256"
    },
    "id": "string",
    "modified_by": {
      "avatar": "string",
      "company_id": "string",
      "id": "string",
      "name": "string",
      "type": "user"
    },
    "mtime": 0,
    "size": 0,
    "version": 0
  },
  "code": 0,
  "msg": "string"
}
```


