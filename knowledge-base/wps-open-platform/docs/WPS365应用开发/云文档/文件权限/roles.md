---
title: Get Document Permission Role List
breadcrumb: WPS365应用开发 > 云文档 > 文件权限 > 获取文档权限角色列表
source: raw_md/app-integration-dev/wps365/server/yundoc/file-permission/roles.md
---


# 获取文档权限角色列表



**标签**：`文件权限角色` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/roles          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 获取文档权限角色列表 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件权限(应用授权) `kso.file_permission.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件权限(用户授权) `kso.file_permission.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件权限(用户授权) `kso.file_permission.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 | drive_id表示盘id，参考 drive.list_drives接口返回的data.items[?].id | - 







## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>角色列表</p>\n","children":[{"key":"data.items","name":"items","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>权限角色唯一标识;支持可查看viewable(公网)、仅查看view_only、可编辑editable、可评论commentable、可管理manageable、可分享shareable(私有云)、禁止访问prohibited(私有云)和自定义权限角色；</p>\n","children":[]},{"key":"data.items.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>角色名称,展示用</p>\n","children":[]},{"key":"data.items.items.permission_bits","name":"permission_bits","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件操作权限</p>\n","children":[{"key":"data.items.items.permission_bits.comment","name":"comment","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>评论</p>\n","children":[]},{"key":"data.items.items.permission_bits.copy","name":"copy","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>复制</p>\n","children":[]},{"key":"data.items.items.permission_bits.copy_content","name":"copy_content","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>内容复制</p>\n","children":[]},{"key":"data.items.items.permission_bits.delete","name":"delete","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件删除</p>\n","children":[]},{"key":"data.items.items.permission_bits.download","name":"download","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>下载</p>\n","children":[]},{"key":"data.items.items.permission_bits.history","name":"history","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，历史版本，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission_bits.list","name":"list","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>列表</p>\n","children":[]},{"key":"data.items.items.permission_bits.move","name":"move","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件移动</p>\n","children":[]},{"key":"data.items.items.permission_bits.new_empty","name":"new_empty","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>新建</p>\n","children":[]},{"key":"data.items.items.permission_bits.perm_ctl","name":"perm_ctl","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>权限管理</p>\n","children":[]},{"key":"data.items.items.permission_bits.preview","name":"preview","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>预览</p>\n","children":[]},{"key":"data.items.items.permission_bits.print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>打印</p>\n","children":[]},{"key":"data.items.items.permission_bits.rename","name":"rename","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件重命名</p>\n","children":[]},{"key":"data.items.items.permission_bits.saveas","name":"saveas","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，另存为，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission_bits.secret","name":"secret","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，安全文档，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission_bits.share","name":"share","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>分享</p>\n","children":[]},{"key":"data.items.items.permission_bits.update","name":"update","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>编辑/更新</p>\n","children":[]},{"key":"data.items.items.permission_bits.upload","name":"upload","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>上传：手动上传新版本</p>\n","children":[]}]},{"key":"data.items.items.permissions","name":"permissions","deprecated":true,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>权限</p>\n","children":[{"key":"data.items.items.permissions.comment","name":"comment","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>评论</p>\n","children":[]},{"key":"data.items.items.permissions.copy","name":"copy","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>复制</p>\n","children":[]},{"key":"data.items.items.permissions.copy_content","name":"copy_content","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>内容复制</p>\n","children":[]},{"key":"data.items.items.permissions.delete","name":"delete","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件删除</p>\n","children":[]},{"key":"data.items.items.permissions.download","name":"download","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>下载</p>\n","children":[]},{"key":"data.items.items.permissions.history","name":"history","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，历史版本，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permissions.list","name":"list","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>列表</p>\n","children":[]},{"key":"data.items.items.permissions.move","name":"move","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件移动</p>\n","children":[]},{"key":"data.items.items.permissions.new_empty","name":"new_empty","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>新建</p>\n","children":[]},{"key":"data.items.items.permissions.perm_ctl","name":"perm_ctl","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>权限管理</p>\n","children":[]},{"key":"data.items.items.permissions.preview","name":"preview","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>预览</p>\n","children":[]},{"key":"data.items.items.permissions.print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>打印</p>\n","children":[]},{"key":"data.items.items.permissions.rename","name":"rename","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件重命名</p>\n","children":[]},{"key":"data.items.items.permissions.saveas","name":"saveas","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，另存为，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permissions.secret","name":"secret","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>公有云适用，安全文档，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permissions.share","name":"share","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>分享</p>\n","children":[]},{"key":"data.items.items.permissions.update","name":"update","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>编辑/更新</p>\n","children":[]},{"key":"data.items.items.permissions.upload","name":"upload","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>上传：手动上传新版本</p>\n","children":[]}]},{"key":"data.items.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["preset","custom","file_custom"],"xEnum":["role_type_preset","role_type_custom","file_custom"],"description":"<p>角色类型</p>\n","children":[]}]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "items": [
      {
        "id": "string",
        "name": "string",
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
        "type": "preset"
      }
    ]
  },
  "code": 0,
  "msg": "string"
}
```


