---
title: Update Data Validation
breadcrumb: WPS365应用开发 > 智能表格 > 数据校验 > 更新数据校验
source: raw_md/app-integration-dev/wps365/server/airsheet/datavalidation/update-datavalidation.md
---


# 修改数据校验
目前仅支持下拉列表



**标签**：`【智能表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airsheet/{file_id}/worksheets/{worksheet_id}/data_validations/batch_update          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理智能表格(应用授权) `kso.airsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理智能表格(用户授权) `kso.airsheet.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 
| <div style="white-space: nowrap;">worksheet_id</div> | `integer` | 是 | 工作表ID | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"args","name":"args","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>数据校验参数</p>\n","children":[{"key":"args.list_items","name":"list_items","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>列表项数组</p>\n","children":[{"key":"args.list_items.items.value","name":"value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>选项值，用户自定义列表选项名字</p>\n","children":[]}]},{"key":"args.validation_error_text","name":"validation_error_text","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>校验错误提示文本，由用户自定义</p>\n","children":[]},{"key":"args.validation_error_title","name":"validation_error_title","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>校验错误提示标题，由用户自定义</p>\n","children":[]}]},{"key":"field_type","name":"field_type","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>字段类型，et目前只支持List(下拉列表)，其他的类型不支持</p>\n","children":[]},{"key":"range","name":"range","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>区域范围 (注意如果要设置整列，row_to传最大值1048575)</p>\n","children":[{"key":"range.col_from","name":"col_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列起始索引位置</p>\n","children":[]},{"key":"range.col_to","name":"col_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列最后索引位置</p>\n","children":[]},{"key":"range.row_from","name":"row_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行起始索引位置</p>\n","children":[]},{"key":"range.row_to","name":"row_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行最后索引位置</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "args": {
    "list_items": [
      {
        "value": "string"
      }
    ],
    "validation_error_text": "string",
    "validation_error_title": "string"
  },
  "field_type": "string",
  "range": {
    "col_from": 0,
    "col_to": 0,
    "row_from": 0,
    "row_to": 0
  }
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


