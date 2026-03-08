---
title: Batch Remove License
breadcrumb: WPS365应用开发 > 云文档 > 文件权限 > 盘批量移除授权
source: raw_md/app-integration-dev/wps365/server/yundoc/file-permission/batch-delete-drive-permissions.md
---


# 盘批量移除授权



**标签**：`文件-权限` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/permissions/batch_delete          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 公有云适用，盘移除一批主体的授权 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件权限(应用授权) `kso.file_permission.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件权限(用户授权) `kso.file_permission.readwrite`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 



## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 | drive_id表示盘id，参考drive.v7_list_drives接口返回的data.items[?].id | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"overwrite","name":"overwrite","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否覆盖子文件</p>\n","children":[]},{"key":"subjects","name":"subjects","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>待删除的授权信息，限制200个。注：如果删除传参是subject时，subject_attr可不传。</p>\n","children":[{"key":"subjects.items.subject_attr","name":"subject_attr","deprecated":false,"type":"oneOf","required":"否","enum":[],"xEnum":[],"description":"<p>主体限制条件</p>\n","children":[{"key":"subjects.items.subject_attr.oneOf[0].member_tag","name":"member_tag","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>团队内自定义标签组</p>\n","children":[],"isOneOfItem":true,"oneOfIndex":0},{"key":"subjects.items.subject_attr.oneOf[1].company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>subject_type = dept时，传递dept所在的company_id</p>\n","children":[],"isOneOfItem":true,"oneOfIndex":1}]},{"key":"subjects.items.subject_id","name":"subject_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>权限主体标识</p>\n","children":[]},{"key":"subjects.items.subject_type","name":"subject_type","deprecated":false,"type":"string","required":"是","enum":["company","dept","group","user","device"],"xEnum":["company","dept","group","user","device"],"description":"<p>权限主体类型，支持授权给用户、部门、企业、用户组</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "overwrite": true,
  "subjects": [
    {
      "member_tag": "string",
      "subject_id": "string",
      "subject_type": "company"
    }
  ]
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


