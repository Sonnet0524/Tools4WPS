# 获取Sheet列表信息

    

    

**标签**：`【智能表格】` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airsheet/{file_id}/worksheets          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理智能表格(应用授权) `kso.airsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能表格(应用授权) `kso.airsheet.read`</div><div style="margin-top: 5px;"></div><div>查询和管理智能表格(用户授权) `kso.airsheet.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能表格(用户授权) `kso.airsheet.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件ID | - 







## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.sheets","name":"sheets","deprecated":false,"type":"array[object]","required":"是","enum":[],"xEnum":[],"description":"<p>sheet列表</p>\n","children":[{"key":"data.sheets.items.active_area","name":"active_area","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>编辑区域</p>\n","children":[{"key":"data.sheets.items.active_area.col_from","name":"col_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列起始索引位置</p>\n","children":[]},{"key":"data.sheets.items.active_area.col_to","name":"col_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>列最后索引位置</p>\n","children":[]},{"key":"data.sheets.items.active_area.row_from","name":"row_from","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行起始索引位置</p>\n","children":[]},{"key":"data.sheets.items.active_area.row_to","name":"row_to","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>行最后索引位置</p>\n","children":[]}]},{"key":"data.sheets.items.empty","name":"empty","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>sheet 是否为空</p>\n","children":[]},{"key":"data.sheets.items.hidden","name":"hidden","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>sheet 是否隐藏</p>\n","children":[]},{"key":"data.sheets.items.index","name":"index","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>sheet 索引</p>\n","children":[]},{"key":"data.sheets.items.max_col","name":"max_col","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>当前sheet的最大col</p>\n","children":[]},{"key":"data.sheets.items.max_row","name":"max_row","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>当前sheet的最大row</p>\n","children":[]},{"key":"data.sheets.items.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>sheet 名称</p>\n","children":[]},{"key":"data.sheets.items.resource_type","name":"resource_type","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>sheet 类型，et为普通电子表格</p>\n","children":[]},{"key":"data.sheets.items.sheet_id","name":"sheet_id","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>sheet id</p>\n","children":[]}]}]}]' />

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "sheets": [
      {
        "active_area": {
          "col_from": 0,
          "col_to": 0,
          "row_from": 0,
          "row_to": 0
        },
        "empty": true,
        "hidden": true,
        "index": 0,
        "max_col": 0,
        "max_row": 0,
        "name": "string",
        "resource_type": "string",
        "sheet_id": 0
      }
    ]
  }
}
```