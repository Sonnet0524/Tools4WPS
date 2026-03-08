---
title: Get File Download Information
breadcrumb: WPS365应用开发 > 云文档 > 文件（夹） > 获取文件下载信息
source: raw_md/app-integration-dev/wps365/server/yundoc/file/get-file-download.md
---


# 获取文件下载信息



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/download          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 获取文件下载信息，下载的是源格式，不做转换与内容合并 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件(应用授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件(应用授权) `kso.file.read`</div><div style="margin-top: 5px;"></div><div>应用身份管理文档(应用授权) `kso.appfile.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件(用户授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询文件(用户授权) `kso.file.read`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">file_id</div> | `string` | 是 |  | - 



## 查询参数 (Query)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">with_hash</div> | `boolean` | 否 | 是否返回校验值,对应响应里的hashes | - 
| <div style="white-space: nowrap;">internal</div> | `boolean` | 否 | 是否返回内网下载地址，默认为false。(<font color=red>内部服务支持内网传输请优先走内网</font>) | - 
| <div style="white-space: nowrap;">storage_base_domain</div> | `string` | 否 | wps.cn/kdocs.cn/wps365.com(国际化)/wps.com(国际化),签发的存储网关地址会根据base_domain优先匹配 \*.wps.cn/\*.kdocs.cn/\*.wps365.com/\*.wps.com。<br>            为空会根据请求的host优先选择关联的base_domain.(注意目前有些旧文件未被存储网关托管,针对这些文件的下载此参数可能失效) | - 





## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>获取文件下载信息响应体</p>\n","children":[{"key":"data.hashes","name":"hashes","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文件散列值，对应请求参数with_hash。<font color=red>(公网可能返回md5/sha1/sha256中的一个或多个)</font></p>\n","children":[{"key":"data.hashes.items.sum","name":"sum","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>哈希结果</p>\n","children":[]},{"key":"data.hashes.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["sha256","md5","sha1","s2s"],"xEnum":["sha256","md5","sha1","s2s"],"description":"<p>哈希类型</p>\n","children":[]}]},{"key":"data.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>下载地址。公网环境下，当返回地址一级域名为金山办公管理域名（<a href=\"http://wps.xn--cnkdocs-if7n.cn\">wps.cn或kdocs.cn</a>）时，调用下载地址时需要带与调用此申请地址接口相同的登录凭据（wpssid或ksosid）和设备信息凭据（wpsua或kso设备信息采集方案，若调用申请地址接口时未提供则无需提供），存储网关会进行校验。存储网关接口可参考文档：<a href=\"https://365.kdocs.cn/l/crbR9EANphse\">https://365.kdocs.cn/l/crbR9EANphse</a></p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "hashes": [
      {
        "sum": "string",
        "type": "sha256"
      }
    ],
    "url": "string"
  },
  "code": 0,
  "msg": "string"
}
```


