---
title: Cancel File Disk Sharing
breadcrumb: WPS365应用开发 > 云文档 > 文件分享 > 取消文件盘分享
source: raw_md/app-integration-dev/wps365/server/yundoc/file-link/close-drive-link.md
---


# 盘取消分享



**标签**：`文件分享` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/close_link          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 公有云适用，取消文件盘分享 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理驱动盘(应用授权) `kso.drive.readwrite`</div><div style="margin-top: 5px;"></div><div>管理驱动盘(用户授权) `kso.drive.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"mode","name":"mode","deprecated":false,"type":"string","required":"否","enum":["pause","delete"],"xEnum":["pause","delete"],"description":"<p>取消分享模式, pause|delete（暂停分享|删除分享）,默认pause（暂停分享）</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "mode": "pause"
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


