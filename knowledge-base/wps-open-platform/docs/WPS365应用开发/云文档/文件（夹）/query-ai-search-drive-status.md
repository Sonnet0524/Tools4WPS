---
title: Query Drive AI Search Status
breadcrumb: WPS365应用开发 > 云文档 > 文件（夹） > 查询驱动盘AI搜索状态
source: raw_md/app-integration-dev/wps365/server/yundoc/file/query-ai-search-drive-status.md
---


# 查询驱动盘AI搜索状态



**标签**：`文件智能搜索` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/files/ai_search/query_drive_status          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 用于开启智能搜索后，获取团队整体入库状态 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>搜索文件(应用授权) `kso.file.search`</div><div style="margin-top: 5px;"></div><div>搜索文件(用户授权) `kso.file_search.readwrite`</div><div style="margin-top: 5px;"></div><div>搜索文件(用户授权) `kso.file.search`</div></div> |




## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"drive_ids","name":"drive_ids","deprecated":false,"type":"array[string]","required":"否","enum":[],"xEnum":[],"description":"<p>要查询的盘</p>\n","children":[]},{"key":"mode","name":"mode","deprecated":false,"type":"string","required":"否","enum":["drive","private","temp","share","roaming","file"],"xEnum":["drive","private","temp","share","roaming","file"],"description":"<p>操作业务：文档库drive(默认)、我的云文档private、我的设备temp、共享列表share、最近列表roaming</p>\n","children":[]},{"key":"scene","name":"scene","deprecated":false,"type":"string","required":"否","enum":["ai_search","ai_qa","ai_graphic","ai_public_knowledge","all"],"xEnum":["ai_search","ai_qa","ai_graphic","ai_public_knowledge","all"],"description":"<p>场景：ai_qa(ai问答)，ai_graphic(图谱)</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "drive_ids": [
    "string"
  ],
  "mode": "drive",
  "scene": "ai_search"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>获取团队整体入库状态返回数据</p>\n","children":[{"key":"data.failed_cnt","name":"failed_cnt","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>失败的数量</p>\n","children":[]},{"key":"data.not_support_cnt","name":"not_support_cnt","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>不支持文件的数量</p>\n","children":[]},{"key":"data.succ_cnt","name":"succ_cnt","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>成功的数量</p>\n","children":[]},{"key":"data.to_update_cnt","name":"to_update_cnt","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>待更新的数量</p>\n","children":[]},{"key":"data.updating_cnt","name":"updating_cnt","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>正在更新的数量</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "failed_cnt": 0,
    "not_support_cnt": 0,
    "succ_cnt": 0,
    "to_update_cnt": 0,
    "updating_cnt": 0
  },
  "code": 0,
  "msg": "string"
}
```


