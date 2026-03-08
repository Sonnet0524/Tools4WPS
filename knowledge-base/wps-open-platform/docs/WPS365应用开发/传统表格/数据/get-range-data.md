---
title: Get Area Data
breadcrumb: WPS365应用开发 > 传统表格 > 数据 > 获取区域数据
source: raw_md/app-integration-dev/wps365/server/sheets/rangedata/get-range-data.md
---


# 获取区域数据




**标签**：`【电子表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/worksheets/{worksheet_id}/range_data          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理传统表格(应用授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>查询传统表格(应用授权) `kso.sheets.read`</div><div style="margin-top: 5px;"></div><div>管理传统表格(用户授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>查询传统表格(用户授权) `kso.sheets.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 
| <div style="white-space: nowrap;">worksheet_id</div> | `integer` | 是 | 工作表ID | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">row_from</div> | `integer` | 是 | 行起始索引位置 | - 
| <div style="white-space: nowrap;">row_to</div> | `integer` | 是 | 行最后索引位置 | - 
| <div style="white-space: nowrap;">col_from</div> | `integer` | 是 | 列起始索引位置 | - 
| <div style="white-space: nowrap;">col_to</div> | `integer` | 是 | 列最后索引位置 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.range_data","name":"range_data","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>单元格数据数组</p>\n","children":[{"key":"data.range_data.items.cell_text","name":"cell_text","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>单元格显示的内容</p>\n","children":[]},{"key":"data.range_data.items.col_from","name":"col_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>单元格起始列索引</p>\n","children":[]},{"key":"data.range_data.items.col_to","name":"col_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>单元格最终列索引</p>\n","children":[]},{"key":"data.range_data.items.is_cell_pic","name":"is_cell_pic","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>单元格是否为单元格图片</p>\n","children":[]},{"key":"data.range_data.items.num_format","name":"num_format","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>单元格的数字格式</p>\n","children":[]},{"key":"data.range_data.items.original_cell_value","name":"original_cell_value","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>单元格公式栏上的值, 只有图片传回来的值类似于公式, 其它都是返回计算结果的值</p>\n","children":[]},{"key":"data.range_data.items.pic_content","name":"pic_content","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>图片内容 使用一个字段返回</p>\n","children":[]},{"key":"data.range_data.items.pic_data","name":"pic_data","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>图片id，当图片是在线文件时返回</p>\n","children":[]},{"key":"data.range_data.items.row_from","name":"row_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>单元格起始行索引</p>\n","children":[]},{"key":"data.range_data.items.row_to","name":"row_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>单元格最终行索引</p>\n","children":[]},{"key":"data.range_data.items.sha1","name":"sha1","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>图片标识，当图片是本地图片时返回</p>\n","children":[]},{"key":"data.range_data.items.tag","name":"tag","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>单元格数据标志</p>\n","children":[]}]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "range_data": [
      {
        "cell_text": "string",
        "col_from": 0,
        "col_to": 0,
        "is_cell_pic": true,
        "num_format": "string",
        "original_cell_value": "string",
        "pic_content": "string",
        "pic_data": "string",
        "row_from": 0,
        "row_to": 0,
        "sha1": "string",
        "tag": "string"
      }
    ]
  },
  "code": 0,
  "msg": "string"
}
```


