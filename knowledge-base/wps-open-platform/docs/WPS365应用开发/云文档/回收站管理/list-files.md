---
title: Get Recycle Bin File List
breadcrumb: WPS365应用开发 > 云文档 > 回收站管理 > 获取回收站文件列表
source: raw_md/app-integration-dev/wps365/server/yundoc/recycle-bin-management/list-files.md
---


# 获取回收站文件列表

获取回收站文件列表



**标签**：`文件` `回收站` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/deleted_files          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 获取回收站文件列表 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询回收站(应用授权) `kso.deleted_file.read`</div><div style="margin-top: 5px;"></div><div>查询回收站(用户授权) `kso.deleted_file.read`</div></div> |






## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 否 |  | - 
| <div style="white-space: nowrap;">with_ext_attrs</div> | `boolean` | 否 | 是否获取扩展属性 | - 
| <div style="white-space: nowrap;">page_size</div> | `integer` | 是 | 分页大小 | - 
| <div style="white-space: nowrap;">page_token</div> | `string` | 否 | 分页token | - 
| <div style="white-space: nowrap;">with_drive</div> | `boolean` | 否 | 是否获取drive信息 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>回收站文件列表响应体</p>\n","children":[{"key":"data.items","name":"items","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items.items.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>回收站文件的创建者信息; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.deleted_by","name":"deleted_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>回收站文件的删除者信息; <font color=red>在降级场景下, deleted_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.deleted_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.deleted_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.deleted_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.deleted_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.deleted_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.drive","name":"drive","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>drive信息</p>\n","children":[{"key":"data.items.items.drive.allotee_id","name":"allotee_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘归属身份id</p>\n","children":[]},{"key":"data.items.items.drive.allotee_type","name":"allotee_type","deprecated":false,"type":"string","required":"是","enum":["user","group","app"],"xEnum":["user","group","app"],"description":"<p>盘归属身份类型</p>\n","children":[]},{"key":"data.items.items.drive.company_id","name":"company_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>企业id</p>\n","children":[]},{"key":"data.items.items.drive.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>创建者; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.drive.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.drive.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.drive.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.drive.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.drive.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.drive.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.drive.description","name":"description","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘描述</p>\n","children":[]},{"key":"data.items.items.drive.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>盘扩展属性</p>\n","children":[{"key":"data.items.items.drive.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.items.items.drive.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.items.items.drive.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id</p>\n","children":[]},{"key":"data.items.items.drive.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.items.items.drive.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘名称</p>\n","children":[]},{"key":"data.items.items.drive.quota","name":"quota","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>盘容量</p>\n","children":[{"key":"data.items.items.drive.quota.deleted","name":"deleted","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>回收站中的文件占用的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.items.items.drive.quota.remaining","name":"remaining","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>剩余的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.items.items.drive.quota.total","name":"total","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>允许的总存储空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.items.items.drive.quota.used","name":"used","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>已使用的总空间，以字节为单位。只读。</p>\n","children":[]}]},{"key":"data.items.items.drive.source","name":"source","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘来源</p>\n","children":[]},{"key":"data.items.items.drive.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["inuse","deleted"],"xEnum":["normal","deleted"],"description":"<p>盘状态</p>\n","children":[]}]},{"key":"data.items.items.drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.dtime","name":"dtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文件扩展属性</p>\n","children":[{"key":"data.items.items.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.items.items.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.items.items.hash","name":"hash","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.items.items.hash.sum","name":"sum","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>哈希结果</p>\n","children":[]},{"key":"data.items.items.hash.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["sha256","md5","sha1","s2s"],"xEnum":["sha256","md5","sha1","s2s"],"description":"<p>哈希类型</p>\n","children":[]}]},{"key":"data.items.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.modified_by","name":"modified_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>回收站文件的修改者信息; <font color=red>在降级场景下, modified_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.items.items.modified_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.items.items.modified_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.items.items.modified_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.items.items.modified_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.items.items.modified_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.items.items.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.parent_id","name":"parent_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"data.items.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["folder","file","shortcut"],"xEnum":["folder","file","shortcut"],"description":"<ul>\n<li>folder   - 文件夹</li>\n<li>file     - 文件</li>\n<li>shortcut - 快捷方式</li>\n</ul>\n","children":[]},{"key":"data.items.items.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]}]},{"key":"data.next_page_token","name":"next_page_token","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下一页token</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
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
        "deleted_by": {
          "avatar": "string",
          "company_id": "string",
          "id": "string",
          "name": "string",
          "type": "user"
        },
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
        "dtime": 0,
        "ext_attrs": [
          {
            "name": "string",
            "value": "string"
          }
        ],
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
        "name": "string",
        "parent_id": "string",
        "size": 0,
        "type": "folder",
        "version": 0
      }
    ],
    "next_page_token": "string"
  },
  "code": 0,
  "msg": "string"
}
```


