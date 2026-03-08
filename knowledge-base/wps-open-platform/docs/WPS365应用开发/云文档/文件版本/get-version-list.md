---
title: Get File Version List
breadcrumb: WPS365应用开发 > 云文档 > 文件版本 > 获取文件版本列表
source: raw_md/app-integration-dev/wps365/server/yundoc/file-version/get-version-list.md
---


# 获取文件版本列表

获取文件版本列表



**标签**：`文档版本` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/versions          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 获取文件版本列表 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文档版本(应用授权) `kso.file_version.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文档版本(应用授权) `kso.file_version.read`</div><div style="margin-top: 5px;"></div><div>查询和管理文档版本(用户授权) `kso.file_version.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文档版本(用户授权) `kso.file_version.read`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 



## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 | 驱动盘id | - 
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件id | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">page_size</div> | `integer` | 是 | 分页大小 | - 
| <div style="white-space: nowrap;">page_token</div> | `string` | 否 | 分页token | - 
| <div style="white-space: nowrap;">with_comment</div> | `boolean` | 否 | 是否查询版本备注 | - 
| <div style="white-space: nowrap;">with_ext_attrs</div> | `boolean` | 否 | 是否查询版本扩展属性 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>历史版本列表</p>\n","children":[{"key":"data.items","name":"items","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items.items.comment","name":"comment","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>版本备注</p>\n","children":[]},{"key":"data.items.items.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>历史版本的创建者信息; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>版本扩展属性</p>\n","children":[{"key":"data.items.items.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.items.items.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.items.items.file_id","name":"file_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件id</p>\n","children":[]},{"key":"data.items.items.hash","name":"hash","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items.items.hash.sum","name":"sum","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>哈希结果</p>\n","children":[]},{"key":"data.items.items.hash.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["sha256","md5","sha1","s2s"],"xEnum":["sha256","md5","sha1","s2s"],"description":"<p>哈希类型</p>\n","children":[]}]},{"key":"data.items.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.modified_by","name":"modified_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>历史版本的修改者信息; <font color=red>在降级场景下, modified_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.modified_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.modified_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.modified_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.modified_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.modified_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"data.items.items.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件版本</p>\n","children":[]}]},{"key":"data.next_page_token","name":"next_page_token","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下一页token</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "items": [
      {
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
      }
    ],
    "next_page_token": "string"
  },
  "code": 0,
  "msg": "string"
}
```


