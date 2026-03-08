---
title: Open Filter
breadcrumb: WPS365应用开发 > 智能表格 > 筛选 > 打开筛选
source: raw_md/app-integration-dev/wps365/server/airsheet/filters/open-filters.md
---


# 开启筛选
先开启筛选再修改筛选



**标签**：`【智能表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airsheet/{file_id}/worksheets/{worksheet_id}/filters          |
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
<OpenapiRenderTable  dataSource='[{"key":"expand_filter_range","name":"expand_filter_range","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否开启将空行后面的数据纳入筛选（注意如果选区是单个单元格才会生效）</p>\n","children":[]},{"key":"range","name":"range","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>区域范围  （注意如果选区是单个单元格会开启所有列的筛选），如果要修改筛选范围，请关闭筛选后再开启一次</p>\n","children":[{"key":"range.col_from","name":"col_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列起始索引位置</p>\n","children":[]},{"key":"range.col_to","name":"col_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列最后索引位置</p>\n","children":[]},{"key":"range.row_from","name":"row_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行起始索引位置</p>\n","children":[]},{"key":"range.row_to","name":"row_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行最后索引位置</p>\n","children":[]}]}]' />

## 请求体示例
```json
{
  "expand_filter_range": true,
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


