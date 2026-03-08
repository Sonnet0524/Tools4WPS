---
title: Create File
breadcrumb: WPS365应用开发 > 智能表格 > 文件操作 > 创建文件
source: raw_md/app-integration-dev/wps365/server/airsheet/file/create-file.md
---


# 创建智能表格



**标签**：`【智能表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airsheet/files          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理智能表格(应用授权) `kso.airsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理智能表格(用户授权) `kso.airsheet.readwrite`</div></div> |




## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id，请参考：<a href=\"/app-integration-dev/wps365/server/yundoc/drive/create-drive\">新建驱动盘</a></p>\n","children":[]},{"key":"name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名，可以不带后缀名，若有后缀名则必须是ksheet</p>\n","children":[]},{"key":"on_name_conflict","name":"on_name_conflict","deprecated":false,"type":"string","required":"否","enum":["rename","fail"],"xEnum":["rename","fail"],"description":"<p>文件名冲突行为处理方式，默认为rename</p>\n","children":[]},{"key":"parent_id","name":"parent_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>目录id，为空时表示根目录</p>\n","children":[]},{"key":"parent_path","name":"parent_path","deprecated":false,"type":"array[string]","required":"否","enum":[],"xEnum":[],"description":"<p>该参数用于指定相对于当前文件目录的相对路径。数组中的每个元素代表一个路径名，而非路径ID。若指定的路径不存在，系统将自动创建该路径</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "drive_id": "string",
  "name": "string",
  "on_name_conflict": "rename",
  "parent_id": "string",
  "parent_path": [
    "string"
  ]
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件id</p>\n","children":[]},{"key":"data.link_id","name":"link_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>链接id</p>\n","children":[]},{"key":"data.link_url","name":"link_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>链接url</p>\n","children":[]},{"key":"data.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名</p>\n","children":[]},{"key":"data.parent_id","name":"parent_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>父目录id</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "id": "string",
    "link_id": "string",
    "link_url": "string",
    "name": "string",
    "parent_id": "string"
  },
  "code": 0,
  "msg": "string"
}
```


