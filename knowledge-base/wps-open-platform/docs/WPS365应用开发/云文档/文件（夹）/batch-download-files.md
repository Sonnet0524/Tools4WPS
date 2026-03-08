---
title: Batch File Download
breadcrumb: WPS365应用开发 > 云文档 > 文件（夹） > 批量文件下载
source: raw_md/app-integration-dev/wps365/server/yundoc/file/batch-download-files.md
---


# 批量文件下载



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/batch_download          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 批量文件下载 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | 无 |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">file_ids</div> | `array` | 是 | 文件id列表，数量上限根据用户权益限制 | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>批量获取文件下载信息响应体</p>\n","children":[{"key":"data.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下载地址。公网环境下，当返回地址一级域名为金山办公管理域名（<a href=\"http://wps.xn--cnkdocs-if7n.cn\">wps.cn或kdocs.cn</a>）时，调用下载地址时需要带与调用此申请地址接口相同的登录凭据（wpssid或ksosid）和设备信息凭据（wpsua或kso设备信息采集方案，若调用申请地址接口时未提供则无需提供），存储网关会进行校验。存储网关接口可参考文档：<a href=\"https://365.kdocs.cn/l/crbR9EANphse\">https://365.kdocs.cn/l/crbR9EANphse</a></p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "url": "string"
  },
  "code": 0,
  "msg": "string"
}
```


