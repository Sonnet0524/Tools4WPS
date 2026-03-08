---
title: Second Level Recycle Bin Single File Deletion
breadcrumb: WPS365应用开发 > 云文档 > 回收站管理 > 二级回收站单文件删除
source: raw_md/app-integration-dev/wps365/server/yundoc/recycle-bin-management/delete-second-deleted-file.md
---


# 二级回收站单文件删除

删除最终回收站的文件，删除目的地由 delete_type 参数设置，仅支持指定为下一级 permanent



**标签**：`文件` `回收站` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/second_deleted_files/{file_id}/delete          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 删除最终回收站的文件，删除目的地由delete_type参数设置,仅支持指定为下一级permanent |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理回收站(应用授权) `kso.deleted_file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理回收站(用户授权) `kso.deleted_file.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"delete_type","name":"delete_type","deprecated":false,"type":"string","required":"否","enum":["first","second","permanent"],"xEnum":["first","second","permanent"],"description":"<p>指定删除文件的目标位置</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "delete_type": "first"
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


