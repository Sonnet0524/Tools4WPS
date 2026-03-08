---
title: Set File Permission Options
breadcrumb: WPS365应用开发 > 云文档 > 文件权限 > 设置文件权限配置项
source: raw_md/app-integration-dev/wps365/server/yundoc/file-permission/post-permission-settings.md
---


# 设置文件权限配置项



**标签**：`文件权限` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/files/{file_id}/permission_settings          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 设置文件权限特殊的配置项 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件权限(应用授权) `kso.file_permission.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件权限(用户授权) `kso.file_permission.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | file_id表示文件id,参考drive.v7_list_files接口返回的data.items[?].id | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"settings","name":"settings","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"settings.items.key","name":"key","deprecated":false,"type":"string","required":"是","enum":["allow_guest_create_upload","share_entity","copy_content_entity","save_as_entity","upload_entity","rename_entity","move_entity"],"xEnum":["allow_guest_create_upload","share_entity","copy_content_entity","save_as_entity","upload_entity","rename_entity","move_entity"],"description":"<p>权限相关设置枚举（allow_guest_create_upload：允许团队外用户上传<br>\nshare_entity：（仅支持公网）谁可以添加、移除协作者，支持可查看viewable、可编辑editable、可评论commentable、可管理manageable<br>\ncopy_content_entity：（仅支持公网）谁可以复制内容，支持可查看viewable、可编辑editable、可评论commentable、可管理manageable<br>\nsave_as_entity：（仅支持公网）谁可以打印、下载、另存为，支持可查看viewable、可编辑editable、可评论commentable、可管理manageable<br>\nupload_entity：（仅支持公网）谁可以上传文件，支持可编辑editable、可管理manageable<br>\nrename_entity：（仅支持公网）谁可以重命名文件，支持可编辑editable、可管理manageable<br>\nmove_entity：（仅支持公网）谁可以移动、删除文件，支持可编辑editable、可管理manageable<br>\n）</p>\n","children":[]},{"key":"settings.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>key为allow_guest_create_upload时，value为true/false</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "settings": [
    {
      "key": "allow_guest_create_upload",
      "value": "string"
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


