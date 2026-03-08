# 获取ap导出任务结果





**标签**：`智能文档` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airpage/{file_id}/export_task/query          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理智能文档(应用授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能文档(应用授权) `kso.airpage.read`</div><div style="margin-top: 5px;"></div><div>管理智能文档(用户授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能文档(用户授权) `kso.airpage.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件id | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"format","name":"format","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>导出格式 (docx, pdf)</p>\n","children":[]},{"key":"internal_link","name":"internal_link","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否内部链接</p>\n","children":[]},{"key":"print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否打印模式</p>\n","children":[]},{"key":"task_id","name":"task_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>导出在线pdf的task_id</p>\n","children":[]},{"key":"version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>导出任务的版本号 示例：84_0_11221044567782</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "format": "string",
  "internal_link": true,
  "print": true,
  "task_id": "string",
  "version": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.cost","name":"cost","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>导出耗时统计信息</p>\n","children":[{"key":"data.cost.full_data_cost","name":"full_data_cost","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>完整数据处理耗时</p>\n","children":[]},{"key":"data.cost.handle_attachment_cost","name":"handle_attachment_cost","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>附件处理耗时</p>\n","children":[]},{"key":"data.cost.handle_comment_cost","name":"handle_comment_cost","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>评论处理耗时</p>\n","children":[]},{"key":"data.cost.handle_export_cost","name":"handle_export_cost","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>导出处理耗时</p>\n","children":[]},{"key":"data.cost.handle_map_cost","name":"handle_map_cost","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>地图处理耗时</p>\n","children":[]},{"key":"data.cost.key","name":"key","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储键</p>\n","children":[]},{"key":"data.cost.status","name":"status","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>状态</p>\n","children":[]},{"key":"data.cost.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下载URL</p>\n","children":[]},{"key":"data.cost.version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>版本信息</p>\n","children":[]}]},{"key":"data.key","name":"key","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储键</p>\n","children":[]},{"key":"data.loading_info","name":"loading_info","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>加载信息</p>\n","children":[]},{"key":"data.status","name":"status","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>状态 (Building/Completed/Failed)</p>\n","children":[]},{"key":"data.task_id","name":"task_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>任务ID</p>\n","children":[]},{"key":"data.task_result","name":"task_result","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>任务结果</p>\n","children":[{"key":"data.task_result.file_id","name":"file_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件ID</p>\n","children":[]},{"key":"data.task_result.file_name","name":"file_name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名</p>\n","children":[]},{"key":"data.task_result.folder_names","name":"folder_names","deprecated":false,"type":"array[string]","required":"是","enum":[],"xEnum":[],"description":"<p>文件夹路径名称列表</p>\n","children":[]}]},{"key":"data.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下载URL</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>版本</p>\n","children":[]}]}]' ></OpenapiRenderTable>

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "cost": {
      "full_data_cost": "string",
      "handle_attachment_cost": "string",
      "handle_comment_cost": "string",
      "handle_export_cost": "string",
      "handle_map_cost": "string",
      "key": "string",
      "status": "string",
      "url": "string",
      "version": "string"
    },
    "key": "string",
    "loading_info": "string",
    "status": "string",
    "task_id": "string",
    "task_result": {
      "file_id": "string",
      "file_name": "string",
      "folder_names": [
        "string"
      ]
    },
    "url": "string",
    "version": 0
  }
}
```