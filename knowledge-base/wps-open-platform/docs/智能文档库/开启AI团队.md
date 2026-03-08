# 开启AI团队

AI团队状态开关



**标签**：`开启AI团队` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/docqa/insight/switch          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | AI团队状态开关 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文档问答(用户授权) `kso.docqa.readwrite`</div></div> |




## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"drive_id","name":"drive_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>驱动器id</p>\n","children":[]},{"key":"open","name":"open","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否开启入库</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "drive_id": "string",
  "open": true
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>开启AI团队返回参数</p>\n","children":[{"key":"data.code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>返回码</p>\n","children":[]},{"key":"data.msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>返回信息,成功或者失败的信息</p>\n","children":[]}]}]' ></OpenapiRenderTable>

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "code": 0,
    "msg": "string"
  }
}
```