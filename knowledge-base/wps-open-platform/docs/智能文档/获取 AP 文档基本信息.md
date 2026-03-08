# 获取 AP 文档基本信息





**标签**：`智能文档` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/airpage/{file_id}          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 无 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>管理智能文档(应用授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能文档(应用授权) `kso.airpage.read`</div><div style="margin-top: 5px;"></div><div>管理智能文档(用户授权) `kso.airpage.readwrite`</div><div style="margin-top: 5px;"></div><div>查询智能文档(用户授权) `kso.airpage.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 | 文件 id | - 







## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"-","children":[{"key":"data.block_info","name":"block_info","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>块信息</p>\n","children":[{"key":"data.block_info.count","name":"count","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>块总数</p>\n","children":[]}]},{"key":"data.cover","name":"cover","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>封面信息</p>\n","children":[{"key":"data.cover.download_url","name":"download_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>封面图片下载URL</p>\n","children":[]},{"key":"data.cover.extra_info","name":"extra_info","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>封面额外信息</p>\n","children":[{"key":"data.cover.extra_info.format","name":"format","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>封面图片格式</p>\n","children":[]},{"key":"data.cover.extra_info.height","name":"height","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>封面图片高度</p>\n","children":[]},{"key":"data.cover.extra_info.width","name":"width","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>封面图片宽度</p>\n","children":[]}]},{"key":"data.cover.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>封面图片ID</p>\n","children":[]}]},{"key":"data.creator","name":"creator","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>创建者信息</p>\n","children":[{"key":"data.creator.avatar_url","name":"avatar_url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>创建者用户头像URL</p>\n","children":[]},{"key":"data.creator.user_id","name":"user_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>创建者用户ID</p>\n","children":[]},{"key":"data.creator.user_name","name":"user_name","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>创建者用户名</p>\n","children":[]}]},{"key":"data.ctime","name":"ctime","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>创建时间</p>\n","children":[]},{"key":"data.id","name":"id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件 id</p>\n","children":[]},{"key":"data.size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"data.title","name":"title","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>文件标题</p>\n","children":[]},{"key":"data.version","name":"version","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件版本</p>\n","children":[]}]}]' ></OpenapiRenderTable>

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "block_info": {
      "count": 0
    },
    "cover": {
      "download_url": "string",
      "extra_info": {
        "format": "string",
        "height": 0,
        "width": 0
      },
      "id": "string"
    },
    "creator": {
      "avatar_url": "string",
      "user_id": "string",
      "user_name": "string"
    },
    "ctime": 0,
    "id": "string",
    "size": 0,
    "title": "string",
    "version": 0
  }
}
```