---
title: Delete Range Data
breadcrumb: WPS365应用开发 > 传统表格 > 数据 > 删除区域数据
source: raw_md/app-integration-dev/wps365/server/sheets/rangedata/delete-range-data.md
---


# 删除区域数据




**标签**：`【电子表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/worksheets/{worksheet_id}/range_data/batch_delete          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理传统表格(应用授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>管理传统表格(用户授权) `kso.sheets.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 
| <div style="white-space: nowrap;">worksheet_id</div> | `integer` | 是 | 工作表id | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"range_data","name":"range_data","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>范围数组  调用者保证参数在行列的最大最小值之内，超过执行会失败,文档的最大值限制可有getSheetInfo接口获取</p>\n","children":[{"key":"range_data.items.col_from","name":"col_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列起始索引位置</p>\n","children":[]},{"key":"range_data.items.col_to","name":"col_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列最后索引位置</p>\n","children":[]},{"key":"range_data.items.row_from","name":"row_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行起始索引位置</p>\n","children":[]},{"key":"range_data.items.row_to","name":"row_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行最后索引位置</p>\n","children":[]}]},{"key":"shift_type","name":"shift_type","deprecated":false,"type":"string","required":"否","enum":["shift_up","shift_left"],"xEnum":["shift_up","shift_left"],"description":"<p>移动方式 默认是向上移动</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "range_data": [
    {
      "col_from": 0,
      "col_to": 0,
      "row_from": 0,
      "row_to": 0
    }
  ],
  "shift_type": "shift_up"
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


