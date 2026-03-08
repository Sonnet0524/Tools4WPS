---
title: Batch Retrieve File Information
breadcrumb: WPS365应用开发 > 云文档 > 文件（夹） > 批量获取文件信息
source: raw_md/app-integration-dev/wps365/server/yundoc/file/batch-get-file-info.md
---


# 批量获取文件信息



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/files/batch_get          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 根据file_id(s)批量获取文件信息 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件(应用授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件(应用授权) `kso.file.read`</div><div style="margin-top: 5px;"></div><div>查询和管理文件(用户授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件(用户授权) `kso.file.read`</div></div> |






## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_ids</div> | `array` | 是 | 文件ID列表 | - 
| <div style="white-space: nowrap;">with_permission</div> | `boolean` | 否 | 是否返回文件操作权限 | - 
| <div style="white-space: nowrap;">with_ext_attrs</div> | `boolean` | 否 | 是否返回文件扩展属性 | - 
| <div style="white-space: nowrap;">with_drive</div> | `boolean` | 否 | 是否返回文件所属drive信息 | - 
| <div style="white-space: nowrap;">mode</div> | `string` | 否 | 批量获取结果的返回模式。（默认）fastfail-快速失败，遇到错误时立即终止并返回；detailed-返回详情，遇到错误时继续执行，最终返回成功的文件集合和失败列表。 | `fastfail`, `detailed` 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>批量获取文件信息全部列表</p>\n","children":[{"key":"data.failures","name":"failures","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>失败列表，当mode为detailed时返回</p>\n","children":[{"key":"data.failures.items.err_code","name":"err_code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.failures.items.err_msg","name":"err_msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.failures.items.object_id","name":"object_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]}]},{"key":"data.items","name":"items","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>文件集合</p>\n","children":[{"key":"data.items.items.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件创建者信息; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.drive","name":"drive","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文件驱动盘具体信息，默认不返回，入参中有with_drive参数时可控制</p>\n","children":[{"key":"data.items.items.drive.allotee_id","name":"allotee_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘归属身份id</p>\n","children":[]},{"key":"data.items.items.drive.allotee_type","name":"allotee_type","deprecated":false,"type":"string","required":"是","enum":["user","group","app"],"xEnum":["user","group","app"],"description":"<p>盘归属身份类型</p>\n","children":[]},{"key":"data.items.items.drive.company_id","name":"company_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>企业id</p>\n","children":[]},{"key":"data.items.items.drive.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>创建者; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.drive.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.drive.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.drive.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.drive.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.drive.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.drive.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.drive.description","name":"description","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘描述</p>\n","children":[]},{"key":"data.items.items.drive.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>盘扩展属性</p>\n","children":[{"key":"data.items.items.drive.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.items.items.drive.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.items.items.drive.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id</p>\n","children":[]},{"key":"data.items.items.drive.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.drive.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘名称</p>\n","children":[]},{"key":"data.items.items.drive.quota","name":"quota","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>盘容量</p>\n","children":[{"key":"data.items.items.drive.quota.deleted","name":"deleted","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>回收站中的文件占用的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.items.items.drive.quota.remaining","name":"remaining","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>剩余的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.items.items.drive.quota.total","name":"total","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>允许的总存储空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.items.items.drive.quota.used","name":"used","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>已使用的总空间，以字节为单位。只读。</p>\n","children":[]}]},{"key":"data.items.items.drive.source","name":"source","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘来源</p>\n","children":[]},{"key":"data.items.items.drive.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["inuse","deleted"],"xEnum":["normal","deleted"],"description":"<p>盘状态</p>\n","children":[]}]},{"key":"data.items.items.drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id</p>\n","children":[]},{"key":"data.items.items.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文件扩展属性</p>\n","children":[{"key":"data.items.items.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.items.items.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.items.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件id</p>\n","children":[]},{"key":"data.items.items.link_id","name":"link_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享id</p>\n","children":[]},{"key":"data.items.items.link_url","name":"link_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享链接url</p>\n","children":[]},{"key":"data.items.items.modified_by","name":"modified_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件修改者信息; <font color=red>在降级场景下, modified_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.modified_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.modified_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.modified_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.modified_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.modified_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名</p>\n","children":[]},{"key":"data.items.items.parent_id","name":"parent_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>父目录id</p>\n","children":[]},{"key":"data.items.items.permission","name":"permission","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文件权限，默认不返回，入参中有with_permission参数时可控制</p>\n","children":[{"key":"data.items.items.permission.comment","name":"comment","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>评论</p>\n","children":[]},{"key":"data.items.items.permission.copy","name":"copy","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>复制</p>\n","children":[]},{"key":"data.items.items.permission.copy_content","name":"copy_content","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>内容复制</p>\n","children":[]},{"key":"data.items.items.permission.delete","name":"delete","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件删除</p>\n","children":[]},{"key":"data.items.items.permission.download","name":"download","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>下载</p>\n","children":[]},{"key":"data.items.items.permission.history","name":"history","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>历史版本，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission.list","name":"list","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>列表</p>\n","children":[]},{"key":"data.items.items.permission.move","name":"move","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件移动</p>\n","children":[]},{"key":"data.items.items.permission.new_empty","name":"new_empty","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>新建</p>\n","children":[]},{"key":"data.items.items.permission.perm_ctl","name":"perm_ctl","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>权限管理</p>\n","children":[]},{"key":"data.items.items.permission.preview","name":"preview","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>预览</p>\n","children":[]},{"key":"data.items.items.permission.print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>打印</p>\n","children":[]},{"key":"data.items.items.permission.rename","name":"rename","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件重命名</p>\n","children":[]},{"key":"data.items.items.permission.saveas","name":"saveas","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>另存为，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission.secret","name":"secret","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>安全文档，仅公网支持</p>\n","children":[]},{"key":"data.items.items.permission.share","name":"share","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>分享</p>\n","children":[]},{"key":"data.items.items.permission.update","name":"update","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>编辑/更新</p>\n","children":[]},{"key":"data.items.items.permission.upload","name":"upload","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>上传：手动上传新版本</p>\n","children":[]}]},{"key":"data.items.items.shared","name":"shared","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否开启分享，当link.status = 'open’时，shared为true，其他结果为false。若调用方想提前知道文档是否分享但又不想额外调用分享信息，可使用此字段</p>\n","children":[]},{"key":"data.items.items.size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"data.items.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["folder","file","shortcut"],"xEnum":["folder","file","shortcut"],"description":"<p>文件类型</p>\n","children":[]},{"key":"data.items.items.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件版本</p>\n","children":[]}]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "failures": [
      {
        "err_code": 0,
        "err_msg": "string",
        "object_id": "string"
      }
    ],
    "items": [
      {
        "created_by": {
          "avatar": "string",
          "company_id": "string",
          "id": "string",
          "name": "string",
          "type": "user"
        },
        "ctime": 0,
        "drive": {
          "allotee_id": "string",
          "allotee_type": "user",
          "company_id": "string",
          "created_by": {
            "avatar": "string",
            "company_id": "string",
            "id": "string",
            "name": "string",
            "type": "user"
          },
          "ctime": 0,
          "description": "string",
          "ext_attrs": [
            {
              "name": "string",
              "value": "string"
            }
          ],
          "id": "string",
          "mtime": 0,
          "name": "string",
          "quota": {
            "deleted": 0,
            "remaining": 0,
            "total": 0,
            "used": 0
          },
          "source": "string",
          "status": "inuse"
        },
        "drive_id": "string",
        "ext_attrs": [
          {
            "name": "string",
            "value": "string"
          }
        ],
        "id": "string",
        "link_id": "string",
        "link_url": "string",
        "modified_by": {
          "avatar": "string",
          "company_id": "string",
          "id": "string",
          "name": "string",
          "type": "user"
        },
        "mtime": 0,
        "name": "string",
        "parent_id": "string",
        "permission": {
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
        "shared": true,
        "size": 0,
        "type": "folder",
        "version": 0
      }
    ]
  },
  "code": 0,
  "msg": "string"
}
```


