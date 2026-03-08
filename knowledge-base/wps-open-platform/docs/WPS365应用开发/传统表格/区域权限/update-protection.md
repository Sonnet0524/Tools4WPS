---
title: Modify Range Permissions
breadcrumb: WPS365应用开发 > 传统表格 > 区域权限 > 修改区域权限
source: raw_md/app-integration-dev/wps365/server/sheets/protection/update-protection.md
---


# 修改区域权限




**标签**：`表格` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/protection_ranges/batch_update          |
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
<OpenapiRenderTable  dataSource='[{"key":"sheets_protection_infos","name":"sheets_protection_infos","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>（工作表）区域权限详细信息列表</p>\n","children":[{"key":"sheets_protection_infos.items.other_user_permission","name":"other_user_permission","deprecated":false,"type":"string","required":"否","enum":["user_access_permission_visible","user_access_permission_editable"],"xEnum":["user_access_permission_visible","user_access_permission_editable"],"description":"<p>（剩余区域对其他人）工作表区域权限类型,可选参数</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos","name":"protection_infos","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>修改工作表的区域权限列表,可选参数</p>\n","children":[{"key":"sheets_protection_infos.items.protection_infos.items.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>区域权限uuid(修改时需要带上)</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos.items.others_access_permission","name":"others_access_permission","deprecated":false,"type":"string","required":"是","enum":["others_access_permission_invisible","others_access_permission_visible","others_access_permission_editable"],"xEnum":["others_access_permission_invisible","others_access_permission_visible","others_access_permission_editable"],"description":"<p>（工作表保护区域中）其他人具有的权限类型</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos.items.protection_ranges","name":"protection_ranges","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>工作表保护区域范围信息列表</p>\n","children":[{"key":"sheets_protection_infos.items.protection_infos.items.protection_ranges.items.column_from","name":"column_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>（保护区域）列起始索引位置</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos.items.protection_ranges.items.column_to","name":"column_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>（保护区域）列最后索引位置</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos.items.protection_ranges.items.row_from","name":"row_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>（保护区域）行起始索引位置</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos.items.protection_ranges.items.row_to","name":"row_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>（保护区域）行最后索引位置</p>\n","children":[]}]},{"key":"sheets_protection_infos.items.protection_infos.items.protection_user_data","name":"protection_user_data","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>（工作表保护区域中）指定用户的权限列表信息列表</p>\n","children":[{"key":"sheets_protection_infos.items.protection_infos.items.protection_user_data.items.access_permission","name":"access_permission","deprecated":false,"type":"string","required":"是","enum":["user_access_permission_visible","user_access_permission_editable"],"xEnum":["user_access_permission_visible","user_access_permission_editable"],"description":"<p>（工作表区域权限中）指定用户的权限类型</p>\n","children":[]},{"key":"sheets_protection_infos.items.protection_infos.items.protection_user_data.items.user_id","name":"user_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>用户ID</p>\n","children":[]}]}]},{"key":"sheets_protection_infos.items.worksheet_id","name":"worksheet_id","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>工作表ID</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "sheets_protection_infos": [
    {
      "other_user_permission": "user_access_permission_visible",
      "protection_infos": [
        {
          "id": "string",
          "others_access_permission": "others_access_permission_invisible",
          "protection_ranges": [
            {
              "column_from": 0,
              "column_to": 0,
              "row_from": 0,
              "row_to": 0
            }
          ],
          "protection_user_data": [
            {
              "access_permission": "user_access_permission_visible",
              "user_id": "string"
            }
          ]
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


