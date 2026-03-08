---
title: Create Team Document Library
breadcrumb: WPS365应用开发 > 云文档 > 团队文档库 > 创建团队文档库
source: raw_md/app-integration-dev/wps365/server/yundoc/teams-doclib/create-doclib.md
---


# 创建团队文档库



**标签**：`文档库` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/doclib/create          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 创建文档库(团队文档) |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文档库(应用授权) `kso.doclib.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文档库(用户授权) `kso.doclib.readwrite`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 







## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"apply_reason","name":"apply_reason","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>申请文档库原因</p>\n","children":[]},{"key":"dept_id","name":"dept_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>指定类型为部门团队和部门Id</p>\n","children":[]},{"key":"members","name":"members","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文档库成员列表</p>\n","children":[{"key":"members.items.about","name":"about","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>组成员个性签名</p>\n","children":[]},{"key":"members.items.item_id","name":"item_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>组成员ID</p>\n","children":[]},{"key":"members.items.item_type","name":"item_type","deprecated":false,"type":"string","required":"否","enum":["normal","dept"],"xEnum":["normal","dept"],"description":"<p>组成员类型</p>\n","children":[]},{"key":"members.items.nickname","name":"nickname","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>组成员昵称</p>\n","children":[]},{"key":"members.items.role","name":"role","deprecated":false,"type":"string","required":"否","enum":["readonly","normal","admin","owner"],"xEnum":["readonly","normal","admin","owner"],"description":"<p>组成员角色</p>\n","children":[]}]},{"key":"name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文档库名称</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "apply_reason": "string",
  "dept_id": "string",
  "members": [
    {
      "about": "string",
      "item_id": "string",
      "item_type": "normal",
      "nickname": "string",
      "role": "readonly"
    }
  ],
  "name": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>创建文档库响应体</p>\n","children":[{"key":"data.approval_id","name":"approval_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>审批ID</p>\n","children":[]},{"key":"data.drive","name":"drive","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文档库驱动盘信息</p>\n","children":[{"key":"data.drive.allotee_id","name":"allotee_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘归属身份id</p>\n","children":[]},{"key":"data.drive.allotee_type","name":"allotee_type","deprecated":false,"type":"string","required":"是","enum":["user","group","app"],"xEnum":["user","group","app"],"description":"<p>盘归属身份类型</p>\n","children":[]},{"key":"data.drive.company_id","name":"company_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>企业id</p>\n","children":[]},{"key":"data.drive.created_by","name":"created_by","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>创建者; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.drive.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.drive.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.drive.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.drive.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.drive.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.drive.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.drive.description","name":"description","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘描述</p>\n","children":[]},{"key":"data.drive.ext_attrs","name":"ext_attrs","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>盘扩展属性</p>\n","children":[{"key":"data.drive.ext_attrs.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性名</p>\n","children":[]},{"key":"data.drive.ext_attrs.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>属性值</p>\n","children":[]}]},{"key":"data.drive.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id</p>\n","children":[]},{"key":"data.drive.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>修改时间，时间戳，单位为秒</p>\n","children":[]},{"key":"data.drive.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘名称</p>\n","children":[]},{"key":"data.drive.quota","name":"quota","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>盘容量</p>\n","children":[{"key":"data.drive.quota.deleted","name":"deleted","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>回收站中的文件占用的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.drive.quota.remaining","name":"remaining","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>剩余的总空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.drive.quota.total","name":"total","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>允许的总存储空间，以字节为单位。只读。</p>\n","children":[]},{"key":"data.drive.quota.used","name":"used","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>已使用的总空间，以字节为单位。只读。</p>\n","children":[]}]},{"key":"data.drive.source","name":"source","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘来源</p>\n","children":[]},{"key":"data.drive.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["inuse","deleted"],"xEnum":["normal","deleted"],"description":"<p>盘状态</p>\n","children":[]}]},{"key":"data.group","name":"group","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文档库用户组信息</p>\n","children":[{"key":"data.group.avatar","name":"avatar","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>头像</p>\n","children":[]},{"key":"data.group.company_id","name":"company_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>组织ID</p>\n","children":[]},{"key":"data.group.creator_id","name":"creator_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>创建者ID 创建时即确定，不被修改。</p>\n","children":[]},{"key":"data.group.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间</p>\n","children":[]},{"key":"data.group.dept_id","name":"dept_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>关联部门ID, 默认 0</p>\n","children":[]},{"key":"data.group.description","name":"description","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>描述介绍</p>\n","children":[]},{"key":"data.group.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>组ID</p>\n","children":[]},{"key":"data.group.mail","name":"mail","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>邮箱信息</p>\n","children":[]},{"key":"data.group.member_total","name":"member_total","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>成员数量</p>\n","children":[]},{"key":"data.group.mtime","name":"mtime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>更新时间</p>\n","children":[]},{"key":"data.group.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>名称</p>\n","children":[]},{"key":"data.group.owner_id","name":"owner_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>拥有者ID</p>\n","children":[]},{"key":"data.group.source","name":"source","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>用户组的引用业务方</p>\n","children":[]},{"key":"data.group.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["enable","recycled"],"xEnum":["enable","recycled"],"description":"<p>状态</p>\n","children":[]},{"key":"data.group.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["normal","dept","org_dynamic","org_normal"],"xEnum":["normal","dept","org_dynamic","org_normal"],"description":"<p>类型</p>\n","children":[]}]},{"key":"data.pinned","name":"pinned","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否置顶</p>\n","children":[]},{"key":"data.user_role","name":"user_role","deprecated":false,"type":"string","required":"是","enum":["readonly","normal","admin","owner"],"xEnum":["readonly","normal","admin","owner"],"description":"<p>当前成员信息</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "approval_id": "string",
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
    "group": {
      "avatar": "string",
      "company_id": "string",
      "creator_id": "string",
      "ctime": 0,
      "dept_id": "string",
      "description": "string",
      "id": "string",
      "mail": "string",
      "member_total": 0,
      "mtime": 0,
      "name": "string",
      "owner_id": "string",
      "source": "string",
      "status": "enable",
      "type": "normal"
    },
    "pinned": true,
    "user_role": "readonly"
  },
  "code": 0,
  "msg": "string"
}
```


