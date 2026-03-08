# 创建 ap 文档





**标签**：`智能文档` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airpage/files          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理智能文档(应用授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>管理智能文档(用户授权) `kso.airpage.readwrite`</div></div> |




## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动盘id，创建空白AP时使用</p>\n","children":[]},{"key":"name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名称，不包含后缀</p>\n","children":[]},{"key":"on_name_conflict","name":"on_name_conflict","deprecated":false,"type":"string","required":"是","enum":["rename","fail","overwrite"],"xEnum":["rename","fail","overwrite"],"description":"<p>命名冲突处理策略，默认 RENAME</p>\n","children":[]},{"key":"parent_id","name":"parent_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>父目录id</p>\n","children":[]},{"key":"template_id","name":"template_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>模板id，通过模板创建AP时使用</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "drive_id": "string",
  "name": "string",
  "on_name_conflict": "rename",
  "parent_id": "string",
  "template_id": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间</p>\n","children":[]},{"key":"data.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件 id</p>\n","children":[]},{"key":"data.link_id","name":"link_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>LinkID</p>\n","children":[]},{"key":"data.link_url","name":"link_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>Link Url</p>\n","children":[]},{"key":"data.name","name":"name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件名称，带后缀 .otl</p>\n","children":[]}]}]' ></OpenapiRenderTable>

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "ctime": 0,
    "id": "string",
    "link_id": "string",
    "link_url": "string",
    "name": "string"
  }
}
```