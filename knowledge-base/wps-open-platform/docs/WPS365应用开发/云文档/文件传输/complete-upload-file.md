---
title: File upload completed
breadcrumb: WPS365应用开发 > 云文档 > 文件传输 > 提交文件上传完成
source: raw_md/app-integration-dev/wps365/server/yundoc/file-transfer/complete-upload-file.md
---


# 提交文件上传完成

上传文件分为三个步骤：
1、使用[请求文件上传信息](/app-integration-dev/wps365/server/yundoc/file-transfer/get-upload-file)接口，获取上传文件所需信息
2、通过接口响应体的上传信息，构建 HTTP 请求，上传实体文件到云存储
📌 **3、使用[提交文件上传完成](/app-integration-dev/wps365/server/yundoc/file-transfer/complete-upload-file)接口，提交上传完成信息**



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{parent_id}/commit_upload          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 这是三步上传的第3步，上传完实体文件后需要提交上传信息来完成上传 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件(应用授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件(用户授权) `kso.file.readwrite`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 



## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">parent_id</div> | `string` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"id","name":"id","deprecated":true,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>上传标识，过时参数，应为upload_id</p>\n","children":[]},{"key":"upload_id","name":"upload_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>上传标识，<font color=red>公网必传</font></p>\n","children":[]}]' />

## 请求体示例
```json
{
  "upload_id": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件创建者信息; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.drive","name":"drive","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文件驱动盘具体信息，默认不返回，入参中有with_drive参数时可控制</p>\n","children":[{"key":"data.drive.allotee_id","name":"allotee_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘归属身份id</p>\n","children":[]},{"key":"data.drive.allotee_type","name":"allotee_type","deprecated":false,"type":"string","required":"是","enum":["user","group","app"],"xEnum":["user","group","app"],"description":"<p>盘归属身份类型</p>\n","children":[]},{"key":"data.drive.company_id","name":"company_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>企业id</p>\n","children":[]},{"key":"data.drive.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>创建者; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.drive.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.drive.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.drive.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.drive.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.drive.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.drive.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.drive.description","name":"description","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘描述</p>\n","children":[]},{"key":"data.drive.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>盘扩展属性</p>\n","children":[{"key":"data.drive.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.drive.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.drive.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id</p>\n","children":[]},{"key":"data.drive.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.drive.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘名称</p>\n","children":[]},{"key":"data.drive.quota","name":"quota","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>盘容量</p>\n","children":[{"key":"data.drive.quota.deleted","name":"deleted","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>回收站中的文件占用的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.drive.quota.remaining","name":"remaining","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>剩余的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.drive.quota.total","name":"total","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>允许的总存储空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.drive.quota.used","name":"used","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>已使用的总空间，以字节为单位。只读。</p>\n","children":[]}]},{"key":"data.drive.source","name":"source","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘来源</p>\n","children":[]},{"key":"data.drive.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["inuse","deleted"],"xEnum":["normal","deleted"],"description":"<p>盘状态</p>\n","children":[]}]},{"key":"data.drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id</p>\n","children":[]},{"key":"data.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文件扩展属性</p>\n","children":[{"key":"data.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件id</p>\n","children":[]},{"key":"data.link_id","name":"link_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享id</p>\n","children":[]},{"key":"data.link_url","name":"link_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享链接url</p>\n","children":[]},{"key":"data.modified_by","name":"modified_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件修改者信息; <font color=red>在降级场景下, modified_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.modified_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.modified_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.modified_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.modified_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.modified_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名</p>\n","children":[]},{"key":"data.parent_id","name":"parent_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>父目录id</p>\n","children":[]},{"key":"data.permission","name":"permission","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>文件权限，默认不返回，入参中有with_permission参数时可控制</p>\n","children":[{"key":"data.permission.comment","name":"comment","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>评论</p>\n","children":[]},{"key":"data.permission.copy","name":"copy","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>复制</p>\n","children":[]},{"key":"data.permission.copy_content","name":"copy_content","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>内容复制</p>\n","children":[]},{"key":"data.permission.delete","name":"delete","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件删除</p>\n","children":[]},{"key":"data.permission.download","name":"download","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>下载</p>\n","children":[]},{"key":"data.permission.history","name":"history","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>历史版本，仅公网支持</p>\n","children":[]},{"key":"data.permission.list","name":"list","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>列表</p>\n","children":[]},{"key":"data.permission.move","name":"move","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件移动</p>\n","children":[]},{"key":"data.permission.new_empty","name":"new_empty","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>新建</p>\n","children":[]},{"key":"data.permission.perm_ctl","name":"perm_ctl","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>权限管理</p>\n","children":[]},{"key":"data.permission.preview","name":"preview","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>预览</p>\n","children":[]},{"key":"data.permission.print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>打印</p>\n","children":[]},{"key":"data.permission.rename","name":"rename","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>文件重命名</p>\n","children":[]},{"key":"data.permission.saveas","name":"saveas","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>另存为，仅公网支持</p>\n","children":[]},{"key":"data.permission.secret","name":"secret","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>安全文档，仅公网支持</p>\n","children":[]},{"key":"data.permission.share","name":"share","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>分享</p>\n","children":[]},{"key":"data.permission.update","name":"update","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>编辑/更新</p>\n","children":[]},{"key":"data.permission.upload","name":"upload","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>上传：手动上传新版本</p>\n","children":[]}]},{"key":"data.shared","name":"shared","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否开启分享，当link.status = 'open’时，shared为true，其他结果为false。若调用方想提前知道文档是否分享但又不想额外调用分享信息，可使用此字段</p>\n","children":[]},{"key":"data.size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"data.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["folder","file","shortcut"],"xEnum":["folder","file","shortcut"],"description":"<p>文件类型</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件版本</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
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
  },
  "code": 0,
  "msg": "string"
}
```


