---
title: Get Filter
breadcrumb: WPS365应用开发 > 传统表格 > 筛选 > 获取筛选
source: raw_md/app-integration-dev/wps365/server/sheets/filters/get-filters.md
---


# 获取筛选



**标签**：`【电子表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sheets/{file_id}/worksheets/{worksheet_id}/filters          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理传统表格(应用授权) `kso.sheets.readwrite`</div><div style="margin-top: 5px;"></div><div>管理传统表格(用户授权) `kso.sheets.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 
| <div style="white-space: nowrap;">worksheet_id</div> | `integer` | 是 | 工作表ID | - 







## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.autofilter_infos","name":"autofilter_infos","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>自动筛选信息列表</p>\n","children":[{"key":"data.autofilter_infos.items.col","name":"col","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列索引</p>\n","children":[]},{"key":"data.autofilter_infos.items.condition","name":"condition","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>筛选条件</p>\n","children":[{"key":"data.autofilter_infos.items.condition.operator","name":"operator","deprecated":false,"type":"string","required":"否","enum":["filter_operator_and","filter_operator_or"],"xEnum":["filter_operator_and","filter_operator_or"],"description":"<p>操作符 不传默认为并且</p>\n","children":[]},{"key":"data.autofilter_infos.items.condition.param1","name":"param1","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>第一个筛选条件参数  如果都没传那么就清空筛选</p>\n","children":[{"key":"data.autofilter_infos.items.condition.param1.custom_type","name":"custom_type","deprecated":false,"type":"string","required":"是","enum":["filter_custom_type_greater","filter_custom_type_greater_equ","filter_custom_type_less","filter_custom_type_less_equ","filter_custom_type_equals","filter_custom_type_not_equ","filter_custom_type_begin_with","filter_custom_type_end_with","filter_custom_type_contains","filter_custom_type_not_contains"],"xEnum":["filter_custom_type_greater","filter_custom_type_greater_equ","filter_custom_type_less","filter_custom_type_less_equ","filter_custom_type_equals","filter_custom_type_not_equ","filter_custom_type_begin_with","filter_custom_type_end_with","filter_custom_type_contains","filter_custom_type_not_contains"],"description":"<p>筛选类型</p>\n","children":[]},{"key":"data.autofilter_infos.items.condition.param1.val","name":"val","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>筛选值</p>\n","children":[]}]},{"key":"data.autofilter_infos.items.condition.param2","name":"param2","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>第二个筛选条件参数（可选）</p>\n","children":[{"key":"data.autofilter_infos.items.condition.param2.custom_type","name":"custom_type","deprecated":false,"type":"string","required":"是","enum":["filter_custom_type_greater","filter_custom_type_greater_equ","filter_custom_type_less","filter_custom_type_less_equ","filter_custom_type_equals","filter_custom_type_not_equ","filter_custom_type_begin_with","filter_custom_type_end_with","filter_custom_type_contains","filter_custom_type_not_contains"],"xEnum":["filter_custom_type_greater","filter_custom_type_greater_equ","filter_custom_type_less","filter_custom_type_less_equ","filter_custom_type_equals","filter_custom_type_not_equ","filter_custom_type_begin_with","filter_custom_type_end_with","filter_custom_type_contains","filter_custom_type_not_contains"],"description":"<p>筛选类型</p>\n","children":[]},{"key":"data.autofilter_infos.items.condition.param2.val","name":"val","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>筛选值</p>\n","children":[]}]}]}]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "autofilter_infos": [
      {
        "col": 0,
        "condition": {
          "operator": "filter_operator_and",
          "param1": {
            "custom_type": "filter_custom_type_greater",
            "val": "string"
          },
          "param2": {
            "custom_type": "filter_custom_type_greater",
            "val": "string"
          }
        }
      }
    ]
  },
  "code": 0,
  "msg": "string"
}
```


