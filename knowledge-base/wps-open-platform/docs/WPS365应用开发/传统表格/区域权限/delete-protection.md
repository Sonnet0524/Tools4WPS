---
title: Remove Range Permissions
breadcrumb: WPS365应用开发 > 传统表格 > 区域权限 > 删除区域权限
source: raw_md/app-integration-dev/wps365/server/sheets/protection/delete-protection.md
---


# 删除区域权限




**标签**：`表格` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/protection_ranges/batch_delete          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理传统表格(应用授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>管理传统表格(用户授权) `kso.sheets.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"sheets_protection_infos","name":"sheets_protection_infos","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>（工作表）区域权限详细信息列表</p>\n","children":[{"key":"sheets_protection_infos.items.delete_protection_ranges","name":"delete_protection_ranges","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>删除时需要传的区域数组</p>\n","children":[{"key":"sheets_protection_infos.items.delete_protection_ranges.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>区域权限uuid</p>\n","children":[]}]},{"key":"sheets_protection_infos.items.worksheet_id","name":"worksheet_id","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>工作表ID</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "sheets_protection_infos": [
    {
      "delete_protection_ranges": [
        {
          "id": "string"
        }
      ],
      "worksheet_id": 0
    }
  ]
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


