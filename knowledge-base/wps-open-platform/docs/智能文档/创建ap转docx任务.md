# 创建ap转docx任务

ap导出docx



**标签**：`智能文档` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airpage/{file_id}/export_to_docx          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | ap导出docx |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理智能文档(应用授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能文档(应用授权) `kso.airpage.read`</div><div style="margin-top: 5px;"></div><div>管理智能文档(用户授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能文档(用户授权) `kso.airpage.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件id | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"ai_check","name":"ai_check","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否进行AI检查</p>\n","children":[]},{"key":"attrs","name":"attrs","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>导出属性配置，示例：eyJob3N0IjoiaHR0cHM6Ly93d3cua2RvY3MuY24iLCJ3ZWJhcHAiOnsibmV0ZWFzZV9tdXNpYyI6IlvnvZHmmJPkupHpn7PkuZBdIiwiZmlnbWEiOiJbRmlnbWFdIiwieGlhb2h1YXpodW8iOiJb5bCP55S75qGMXSIsIm1vZGFvIjoiW%2BWiqOWIgF0iLCJtYXN0ZXJnbyI6IltNYXN0ZXJHb10iLCJtb2NrIjoiW%2BaRueWuol0iLCJwaXhzbyI6IltQaXhzb10iLCJpbnRlbnRpb25fY29sbGVjdGlvbiI6IlvmhI%2FlkJHmlLbpm4ZdIiwiYWxpeXVuX3ZpZGVvIjoiW%2BmYv%2BmHjOS6keebmOinhumikV0ifSwid2lkdGhNb2RlIjoiYXV0b2ZpdDEiLCJmaWxlTGlua0VuYWJsZSI6dHJ1ZX0%3D</p>\n","children":[]},{"key":"version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>示例：49_A4_1  文件变动，xx版本号也要改动 xx_A4_1 默认导出 xx_autofit1_1 自适应导出</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "ai_check": true,
  "attrs": "string",
  "version": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.file_name","name":"file_name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名</p>\n","children":[]},{"key":"data.key","name":"key","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储键</p>\n","children":[]},{"key":"data.status","name":"status","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>状态 (Building/Completed/Failed)</p>\n","children":[]},{"key":"data.task_id","name":"task_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>任务ID</p>\n","children":[]},{"key":"data.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下载URL</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>纸张格式版本</p>\n","children":[]}]}]' ></OpenapiRenderTable>

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "file_name": "string",
    "key": "string",
    "status": "string",
    "task_id": "string",
    "url": "string",
    "version": "string"
  }
}
```