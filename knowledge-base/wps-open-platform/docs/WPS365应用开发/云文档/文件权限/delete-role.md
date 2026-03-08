---
title: Remove Document Permission Role
breadcrumb: WPS365应用开发 > 云文档 > 文件权限 > 删除文档权限角色
source: raw_md/app-integration-dev/wps365/server/yundoc/file-permission/delete-role.md
---


# 删除文档权限角色



**标签**：`文件权限角色` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/roles/{role_id}/delete          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 即将被删除的文档权限角色可能被授权引用，需要指明删除后已存在的授权如何处理，目前支持替换、删除两种方式 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件权限(应用授权) `kso.file_permission.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件权限(用户授权) `kso.file_permission.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 | drive_id表示盘id，参考drive.list_drives接口返回的data.items[?].id | - 
| <div style="white-space: nowrap;">role_id</div> | `string` | 是 | role_id表示权限角色id,参考list_roles接口返回的data.imems[?].id | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"policy","name":"policy","deprecated":false,"type":"string","required":"否","enum":["remove","replace"],"xEnum":["remove","replace"],"description":"<p>删除策略</p>\n","children":[]},{"key":"replace_role_id","name":"replace_role_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>权限角色。支持仅查看/可查看/可评论/可编辑/可管理 (对应接口传参：可查看viewable(公网)、仅查看view_only、可编辑editable、可评论commentable、可管理manageable、可分享shareable(私有云)、禁止访问prohibited(私有云)) 和自定义权限角色 (自定义权限角色请通过获取权限角色列表v7_list_drive_roles获取role_id；)</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "policy": "remove",
  "replace_role_id": "string"
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


