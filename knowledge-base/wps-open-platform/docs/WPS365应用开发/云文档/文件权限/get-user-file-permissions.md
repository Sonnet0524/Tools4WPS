---
title: Get permission for user's file operations
breadcrumb: WPS365应用开发 > 云文档 > 文件权限 > 获取用户的文件操作权限
source: raw_md/app-integration-dev/wps365/server/yundoc/file-permission/get-user-file-permissions.md
---


# 获取用户的文件操作权限



**标签**：`文件权限` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/permissions/acl          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 一个或多个用户对文件可以进行哪些操作，比如我可以对文件进行复制/移动/删除等。通常在文件右键菜单展示文件允许的操作入口。 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件权限(用户授权) `kso.file_permission.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件权限(用户授权) `kso.file_permission.read`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 



## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 | drive_id表示盘id，参考drive.v7_list_drives接口返回的data.items[?].id | - 
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | file_id表示文件id,参考drive.v7_list_files接口返回的data.items[?].id，支持传0，表示盘的根目录 | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">user_ids</div> | `string` | 是 | 用户id列表,以','分割 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items","name":"items","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items.items.permission","name":"permission","deprecated":true,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>权限位</p>\n","children":[{"key":"data.items.items.permission.comment","name":"comment","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>评论</p>\n","children":[]},{"key":"data.items.items.permission.copy","name":"copy","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>复制</p>\n","children":[]},{"key":"data.items.items.permission.copy_content","name":"copy_content","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>内容复制</p>\n","children":[]},{"key":"data.items.items.permission.delete","name":"delete","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件删除</p>\n","children":[]},{"key":"data.items.items.permission.download","name":"download","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>下载</p>\n","children":[]},{"key":"data.items.items.permission.history","name":"history","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，历史版本，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission.list","name":"list","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>列表</p>\n","children":[]},{"key":"data.items.items.permission.move","name":"move","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件移动</p>\n","children":[]},{"key":"data.items.items.permission.new_empty","name":"new_empty","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>新建</p>\n","children":[]},{"key":"data.items.items.permission.perm_ctl","name":"perm_ctl","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>权限管理</p>\n","children":[]},{"key":"data.items.items.permission.preview","name":"preview","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>预览</p>\n","children":[]},{"key":"data.items.items.permission.print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>打印</p>\n","children":[]},{"key":"data.items.items.permission.rename","name":"rename","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件重命名</p>\n","children":[]},{"key":"data.items.items.permission.saveas","name":"saveas","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，另存为，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission.secret","name":"secret","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，安全文档，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission.share","name":"share","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>分享</p>\n","children":[]},{"key":"data.items.items.permission.update","name":"update","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>编辑/更新</p>\n","children":[]},{"key":"data.items.items.permission.upload","name":"upload","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>上传：手动上传新版本</p>\n","children":[]}]},{"key":"data.items.items.permission_bits","name":"permission_bits","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件操作权限</p>\n","children":[{"key":"data.items.items.permission_bits.comment","name":"comment","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>评论</p>\n","children":[]},{"key":"data.items.items.permission_bits.copy","name":"copy","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>复制</p>\n","children":[]},{"key":"data.items.items.permission_bits.copy_content","name":"copy_content","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>内容复制</p>\n","children":[]},{"key":"data.items.items.permission_bits.delete","name":"delete","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件删除</p>\n","children":[]},{"key":"data.items.items.permission_bits.download","name":"download","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>下载</p>\n","children":[]},{"key":"data.items.items.permission_bits.history","name":"history","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，历史版本，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission_bits.list","name":"list","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>列表</p>\n","children":[]},{"key":"data.items.items.permission_bits.move","name":"move","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件移动</p>\n","children":[]},{"key":"data.items.items.permission_bits.new_empty","name":"new_empty","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>新建</p>\n","children":[]},{"key":"data.items.items.permission_bits.perm_ctl","name":"perm_ctl","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>权限管理</p>\n","children":[]},{"key":"data.items.items.permission_bits.preview","name":"preview","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>预览</p>\n","children":[]},{"key":"data.items.items.permission_bits.print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>打印</p>\n","children":[]},{"key":"data.items.items.permission_bits.rename","name":"rename","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件重命名</p>\n","children":[]},{"key":"data.items.items.permission_bits.saveas","name":"saveas","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，另存为，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission_bits.secret","name":"secret","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，安全文档，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission_bits.share","name":"share","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>分享</p>\n","children":[]},{"key":"data.items.items.permission_bits.update","name":"update","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>编辑/更新</p>\n","children":[]},{"key":"data.items.items.permission_bits.upload","name":"upload","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>上传：手动上传新版本</p>\n","children":[]}]},{"key":"data.items.items.user_id","name":"user_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]}]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "items": [
      {
        "permission_bits": {
          "comment": true,
          "copy": true,
          "copy_content": true,
          "delete": true,
          "download": true,
          "history": true,
          "list": true,
          "move": true,
          "new_empty": true,
          "perm_ctl": true,
          "preview": true,
          "print": true,
          "rename": true,
          "saveas": true,
          "secret": true,
          "share": true,
          "update": true,
          "upload": true
        },
        "user_id": "string"
      }
    ]
  },
  "code": 0,
  "msg": "string"
}
```


