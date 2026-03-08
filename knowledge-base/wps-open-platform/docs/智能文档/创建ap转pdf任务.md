# 创建ap转pdf任务





**标签**：`智能文档` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airpage/{file_id}/export_to_pdf          |
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
<OpenapiRenderTable  dataSource='[{"key":"attrs","name":"attrs","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>导出属性配置，示例：eyJ3aWR0aE1vZGUiOiJhdXRvZml0MSJ9</p>\n","children":[]},{"key":"download_name","name":"download_name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>输出文件参数</p>\n","children":[]},{"key":"drive_id","name":"drive_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>驱动盘id，导出在线pdf时使用</p>\n","children":[]},{"key":"dst_parent_id","name":"dst_parent_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>目标文件夹id，导出在线pdf时使用</p>\n","children":[]},{"key":"group_id","name":"group_id","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>群组id,后续废弃,使用drive_id字段替代</p>\n","children":[]},{"key":"margin_bottom","name":"margin_bottom","deprecated":false,"type":"number","required":"是","enum":[],"xEnum":[],"description":"<p>示例：0.4</p>\n","children":[]},{"key":"margin_left","name":"margin_left","deprecated":false,"type":"number","required":"是","enum":[],"xEnum":[],"description":"<p>示例：0.4</p>\n","children":[]},{"key":"margin_right","name":"margin_right","deprecated":false,"type":"number","required":"是","enum":[],"xEnum":[],"description":"<p>示例：0.4</p>\n","children":[]},{"key":"margin_top","name":"margin_top","deprecated":false,"type":"number","required":"是","enum":[],"xEnum":[],"description":"<p>示例：0.7</p>\n","children":[]},{"key":"paper_height","name":"paper_height","deprecated":false,"type":"number","required":"是","enum":[],"xEnum":[],"description":"<p>示例：11.69</p>\n","children":[]},{"key":"paper_width","name":"paper_width","deprecated":false,"type":"number","required":"是","enum":[],"xEnum":[],"description":"<p>示例：8.27</p>\n","children":[]},{"key":"parent_id","name":"parent_id","deprecated":false,"type":"integer","required":"否","enum":[],"xEnum":[],"description":"<p>父级ID,后续废弃,使用dst_parent_id字段替代</p>\n","children":[]},{"key":"print","name":"print","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否打印模式</p>\n","children":[]},{"key":"store_type","name":"store_type","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>可选 ks3, cloud，不填默认ks3</p>\n","children":[]},{"key":"url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>URL相关参数，示例：<a href=\"https://365.kdocs.cn/l/cioxxxxxx\">https://365.kdocs.cn/l/cioxxxxxx</a></p>\n","children":[]},{"key":"url_param","name":"url_param","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>示例：pdfExport&amp;simple&amp;export=true&amp;hideguide&amp;disableNps&amp;lang=zh-CN</p>\n","children":[]},{"key":"version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件变动，xx版本号也要改动 xx_0_11221044567782</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "attrs": "string",
  "download_name": "string",
  "drive_id": "string",
  "dst_parent_id": "string",
  "group_id": 0,
  "margin_bottom": 0,
  "margin_left": 0,
  "margin_right": 0,
  "margin_top": 0,
  "paper_height": 0,
  "paper_width": 0,
  "parent_id": 0,
  "print": true,
  "store_type": "string",
  "url": "string",
  "url_param": "string",
  "version": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.file_name","name":"file_name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名</p>\n","children":[]},{"key":"data.key","name":"key","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储键</p>\n","children":[]},{"key":"data.status","name":"status","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>状态 (Building/Completed/Failed)</p>\n","children":[]},{"key":"data.task_id","name":"task_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>任务ID</p>\n","children":[]},{"key":"data.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下载URL</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>版本</p>\n","children":[]}]}]' ></OpenapiRenderTable>

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