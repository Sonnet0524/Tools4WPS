---
title: Enable File Disk Sharing
breadcrumb: WPS365应用开发 > 云文档 > 文件分享 > 开启文件盘分享
source: raw_md/app-integration-dev/wps365/server/yundoc/file-link/open-drive-link.md
---


# 盘开启分享



**标签**：`文件分享` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/open_link          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 公有云适用，开启文件盘分享 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理驱动盘(应用授权) `kso.drive.readwrite`</div><div style="margin-top: 5px;"></div><div>管理驱动盘(用户授权) `kso.drive.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"opts","name":"opts","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>链接选项</p>\n","children":[{"key":"opts.allow_perm_apply","name":"allow_perm_apply","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>允许申请权限</p>\n","children":[]},{"key":"opts.check_code","name":"check_code","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>访问密码</p>\n","children":[]},{"key":"opts.close_after_expire","name":"close_after_expire","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>过期后取消分享链接</p>\n","children":[]},{"key":"opts.expire_period","name":"expire_period","deprecated":false,"type":"integer","required":"否","enum":[0,7,30],"xEnum":["unlimited","seven_days","thirty_days"],"description":"<p>过期时长</p>\n","children":[]},{"key":"opts.expire_time","name":"expire_time","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>过期时间点</p>\n","children":[]}]},{"key":"role_id","name":"role_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>权限角色</p>\n","children":[]},{"key":"scope","name":"scope","deprecated":false,"type":"string","required":"是","enum":["anyone","login_users","company","users"],"xEnum":["anyone","login_users","company","users"],"description":"<p>链接权限范围, anyone:所有人，company:仅企业， users:指定用户。anyone仅公网支持，login_users仅私有化支持</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "opts": {
    "allow_perm_apply": true,
    "check_code": "string",
    "close_after_expire": true,
    "expire_period": 0,
    "expire_time": 0
  },
  "role_id": "string",
  "scope": "anyone"
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


