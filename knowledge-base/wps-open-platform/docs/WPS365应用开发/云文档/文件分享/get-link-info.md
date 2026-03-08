---
title: Get Share Link Info
breadcrumb: WPS365应用开发 > 云文档 > 文件分享 > 获取分享链接信息
source: raw_md/app-integration-dev/wps365/server/yundoc/file-link/get-link-info.md
---


# 获取分享链接信息

获取分享链接信息



**标签**：`文件分享` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/links/{link_id}/meta          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 根据linkId获取分享链接信息 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件分享(应用授权) `kso.file_link.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件分享(用户授权) `kso.file_link.readwrite`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 



## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">link_id</div> | `string` | 是 |  | - 







## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>链接元数据</p>\n","children":[{"key":"data.created_by","name":"created_by","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>创建者身份; <font color=red>在降级场景下, created_by的type字段会返回unknown. 业务方如果使用到type字段, 需要在type为unknown时作降级处理.</font></p>\n","children":[{"key":"data.created_by.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.created_by.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.created_by.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.created_by.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.created_by.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.creator","name":"creator","deprecated":true,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>创建者身份</p>\n","children":[{"key":"data.creator.avatar","name":"avatar","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的头像</p>\n","children":[]},{"key":"data.creator.company_id","name":"company_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>身份所归属的公司</p>\n","children":[]},{"key":"data.creator.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>身份ID</p>\n","children":[]},{"key":"data.creator.name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>用户或应用的名称</p>\n","children":[]},{"key":"data.creator.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["user","sp","unknown"],"xEnum":["user","sp","unknown"],"description":"<p>身份类型</p>\n","children":[]}]},{"key":"data.ctime","name":"ctime","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>创建时间</p>\n","children":[]},{"key":"data.drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>盘id</p>\n","children":[]},{"key":"data.file_id","name":"file_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件id</p>\n","children":[]},{"key":"data.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享id</p>\n","children":[]},{"key":"data.mtime","name":"mtime","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>修改时间</p>\n","children":[]},{"key":"data.opts","name":"opts","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>链接设置</p>\n","children":[{"key":"data.opts.allow_perm_apply","name":"allow_perm_apply","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>允许申请权限</p>\n","children":[]},{"key":"data.opts.check_code","name":"check_code","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>访问密码</p>\n","children":[]},{"key":"data.opts.close_after_expire","name":"close_after_expire","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>过期后取消分享链接</p>\n","children":[]},{"key":"data.opts.expire_period","name":"expire_period","deprecated":false,"type":"integer","required":"否","enum":[0,7,30],"xEnum":["unlimited","seven_days","thirty_days"],"description":"<p>过期时长</p>\n","children":[]},{"key":"data.opts.expire_time","name":"expire_time","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>过期时间点</p>\n","children":[]}]},{"key":"data.role_id","name":"role_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>链接权限角色id</p>\n","children":[]},{"key":"data.scope","name":"scope","deprecated":false,"type":"string","required":"否","enum":["anyone","company","users"],"xEnum":["anyone","company","users"],"description":"<p>链接权限范围</p>\n","children":[]},{"key":"data.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["open","closed","expired"],"xEnum":["link_status_open","link_status_closed","link_status_expired"],"description":"<p>链接状态</p>\n","children":[]},{"key":"data.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>分享访问url</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

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
    "drive_id": "string",
    "file_id": "string",
    "id": "string",
    "mtime": 0,
    "opts": {
      "allow_perm_apply": true,
      "check_code": "string",
      "close_after_expire": true,
      "expire_period": 0,
      "expire_time": 0
    },
    "role_id": "string",
    "scope": "anyone",
    "status": "open",
    "url": "string"
  },
  "code": 0,
  "msg": "string"
}
```


