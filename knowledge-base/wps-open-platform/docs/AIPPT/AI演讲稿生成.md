# AI演讲稿生成

    根据幻灯片内容生成AI演讲稿

    

**标签**：`AIPPT` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/sse/aippt/ainotes          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 根据幻灯片内容生成AI演讲稿 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>AIPPT资源使用及生成(应用授权) `kso.aippt.readwrite`</div></div> |




## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"all_slides","name":"all_slides","deprecated":false,"type":"array[string]","required":"是","enum":[],"xEnum":[],"description":"<p>全文幻灯片内容</p>\n","children":[]},{"key":"slide_types","name":"slide_types","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>需要处理的单页幻灯片index及其对应的页面类型（从0开始），获取不到页面类型填detect</p>\n","children":[]},{"key":"space","name":"space","deprecated":false,"type":"string","required":"是","enum":["短篇幅","中篇幅","长篇幅"],"xEnum":["short","medium","long"],"description":"<p>篇幅长度</p>\n","children":[]},{"key":"stream","name":"stream","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>大模型结果是否流式返回。表示大模型结果是否以吐字形式返回，为false表示单次模型结果完整返回。该字段与响应形式无关，响应都为流式返回。</p>\n","children":[]},{"key":"style","name":"style","deprecated":false,"type":"string","required":"是","enum":["通用","正式","幽默","亲切","自信"],"xEnum":["general","formal","humorous","friendly","confident"],"description":"<p>风格</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "all_slides": [
    "string"
  ],
  "slide_types": {},
  "space": "短篇幅",
  "stream": true,
  "style": "通用"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `text/event-stream`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>AI演讲稿生成返回结果</p>\n","children":[{"key":"data.message","name":"message","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>sse事件数据</p>\n","children":[{"key":"data.message.code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>状态码（0 表示成功）</p>\n","children":[]},{"key":"data.message.data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>核心数据对象</p>\n","children":[{"key":"data.message.data.delta","name":"delta","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>本次流式输出的增量内容（processing 状态时出现）</p>\n","children":[]},{"key":"data.message.data.progress","name":"progress","deprecated":false,"type":"object","required":"否","enum":[],"xEnum":[],"description":"<p>处理进度信息</p>\n","children":[{"key":"data.message.data.progress.completed_slides","name":"completed_slides","deprecated":false,"type":"array[integer]","required":"是","enum":[],"xEnum":[],"description":"<p>已完成的幻灯片索引列表</p>\n","children":[]},{"key":"data.message.data.progress.failed_slides","name":"failed_slides","deprecated":false,"type":"array[integer]","required":"是","enum":[],"xEnum":[],"description":"<p>失败的幻灯片索引列表</p>\n","children":[]},{"key":"data.message.data.progress.processed_slides","name":"processed_slides","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>已处理的幻灯片数量</p>\n","children":[]},{"key":"data.message.data.progress.total_slides","name":"total_slides","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>总幻灯片数量</p>\n","children":[]}]},{"key":"data.message.data.reply","name":"reply","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>完整的回复内容（processing/finish 状态时出现）</p>\n","children":[]},{"key":"data.message.data.slide_index","name":"slide_index","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>当前处理的幻灯片索引（-1表示无幻灯片，无实际意义）</p>\n","children":[]},{"key":"data.message.data.slide_type","name":"slide_type","deprecated":false,"type":"string","required":"否","enum":["startpage","contentpage","transitionpage","catalogpage","endpage","detect"],"xEnum":["startpage","contentpage","transitionpage","catalogpage","endpage","detect"],"description":"<p>幻灯片类型</p>\n","children":[]},{"key":"data.message.data.stream_status","name":"stream_status","deprecated":false,"type":"string","required":"否","enum":["start","slide_start_processing","processing","finish","ping","all_done"],"xEnum":["start","slide_start_processing","processing","finish","ping","all_done"],"description":"<p>流处理状态（start/slide_start_processing/processing/finish/ping/all_done）</p>\n","children":[]}]},{"key":"data.message.msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>状态消息（如 &quot;success&quot;）</p>\n","children":[]}]}]}]' />

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "message": {
      "code": 0,
      "data": {
        "delta": "string",
        "progress": {
          "completed_slides": [
            0
          ],
          "failed_slides": [
            0
          ],
          "processed_slides": 0,
          "total_slides": 0
        },
        "reply": "string",
        "slide_index": 0,
        "slide_type": "startpage",
        "stream_status": "start"
      },
      "msg": "string"
    }
  }
}
```