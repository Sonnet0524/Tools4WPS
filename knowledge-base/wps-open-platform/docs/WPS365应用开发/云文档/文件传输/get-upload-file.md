---
title: Request File Upload Details
breadcrumb: WPS365应用开发 > 云文档 > 文件传输 > 请求文件上传信息
source: raw_md/app-integration-dev/wps365/server/yundoc/file-transfer/get-upload-file.md
---


# 请求文件上传信息

上传文件分为三个步骤：
📌 **1、使用[请求文件上传信息](/app-integration-dev/wps365/server/yundoc/file-transfer/get-upload-file)接口，获取上传文件所需信息**
2、通过接口响应体的上传信息，构建 HTTP 请求，上传实体文件到云存储
3、使用[提交文件上传完成](/app-integration-dev/wps365/server/yundoc/file-transfer/complete-upload-file)接口，提交上传完成信息



**标签**：`文件` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/drives/{drive_id}/files/{parent_id}/request_upload          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 这是三步上传的第1步，三步上传大致流程(必须成功才算上传完成):<br><br>           1.请求文件上传信息获取上传地址等信息 <br><br>           2.根据第1步返回的上传信息去上传实体文件到云存储 <br><br>           3.调用[提交文件上传完成]接口 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理文件(应用授权) `kso.file.readwrite`</div><div style="margin-top: 5px;"></div><div>查询和管理文件(用户授权) `kso.file.readwrite`</div></div> |




## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">drive_id</div> | `string` | 是 |  | - 
| <div style="white-space: nowrap;">parent_id</div> | `string` | 是 |  | - 





## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"file_id","name":"file_id","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>更新上传时指定文件id</p>\n","children":[]},{"key":"hashes","name":"hashes","deprecated":false,"type":"array[object]","required":"否","enum":[],"xEnum":[],"description":"<p>文件哈希信息，用于完整性校验，<font color=red>公网必传,至少md5和sha256中的一种，公网不支持s2s</font></p>\n","children":[{"key":"hashes.items.sum","name":"sum","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>哈希结果</p>\n","children":[]},{"key":"hashes.items.type","name":"type","deprecated":false,"type":"string","required":"是","enum":["sha256","md5","sha1","s2s"],"xEnum":["sha256","md5","sha1","s2s"],"description":"<p>哈希类型</p>\n","children":[]}]},{"key":"internal","name":"internal","deprecated":false,"type":"boolean","required":"否","enum":[],"xEnum":[],"description":"<p>是否返回内网上传地址，默认为false。(<font color=red>内部服务支持内网传输请优先走内网</font>)</p>\n","children":[]},{"key":"name","name":"name","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p>文件名(<font color=red>更新文件时忽略</font>),需要携带文件名后缀，例如 文件1.doc</p>\n","children":[]},{"key":"on_name_conflict","name":"on_name_conflict","deprecated":false,"type":"string","required":"否","enum":["fail","rename","overwrite","replace"],"xEnum":["fail","rename","overwrite","replace"],"description":"<p>新建时文件名冲突行为处理方式(公网目前只支持rename和overwrite), 默认不传为rename</p>\n","children":[]},{"key":"parent_path","name":"parent_path","deprecated":false,"type":"array[string]","required":"否","enum":[],"xEnum":[],"description":"<p>该参数用于指定相对于当前文件目录的相对路径。数组中的每个元素代表一个路径名，而非路径ID。若指定的路径不存在，系统将自动创建该路径</p>\n","children":[]},{"key":"size","name":"size","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"<p>文件大小</p>\n","children":[]},{"key":"storage_base_domain","name":"storage_base_domain","deprecated":false,"type":"string","required":"否","enum":[],"xEnum":[],"description":"<p><a href=\"http://wps.cn/kdocs.cn/wps365.com(%E5%9B%BD%E9%99%85%E5%8C%96)/wps.com(%E5%9B%BD%E9%99%85%E5%8C%96),%E7%AD%BE%E5%8F%91%E7%9A%84%E5%AD%98%E5%82%A8%E7%BD%91%E5%85%B3%E5%9C%B0%E5%9D%80%E4%BC%9A%E6%A0%B9%E6%8D%AEbase_domain%E4%BC%98%E5%85%88%E5%8C%B9%E9%85%8D\">wps.cn/kdocs.cn/wps365.com(国际化)/wps.com(国际化),签发的存储网关地址会根据base_domain优先匹配</a> *.wps.cn/*.kdocs.cn/*.wps365.com/*.wps.com。<br>\n为空会根据请求的host优先选择关联的base_domain.(注意目前有些旧文件未被存储网关托管,针对这些文件的下载此参数可能失效)</p>\n","children":[]},{"key":"upload_scene","name":"upload_scene","deprecated":false,"type":"string","required":"否","enum":["normal_upload","roaming_upload"],"xEnum":["normal_upload","roaming_upload"],"description":"<p>文件上传场景,默认是’normal_upload’</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "file_id": "string",
  "hashes": [
    {
      "sum": "string",
      "type": "sha256"
    }
  ],
  "internal": true,
  "name": "string",
  "on_name_conflict": "fail",
  "parent_path": [
    "string"
  ],
  "size": 0,
  "storage_base_domain": "string",
  "upload_scene": "normal_upload"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>文件请求上传响应体</p>\n","children":[{"key":"data.store_request","name":"store_request","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>第二步上传请求信息</p>\n","children":[{"key":"data.store_request.method","name":"method","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储上传方法，公网仅会返回PUT</p>\n","children":[]},{"key":"data.store_request.url","name":"url","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>存储上传使用的地址。公网环境下，当返回地址一级域名为金山办公管理域名（<a href=\"http://wps.xn--cnkdocs-if7n.cn\">wps.cn或kdocs.cn</a>）时，调用上传地址时需要带与调用此申请地址接口相同的登录凭据（wpssid或ksosid）和设备信息凭据（wpsua或kso设备信息采集方案，若调用申请地址接口时未提供则无需提供），存储网关会进行校验。存储网关接口可参考文档：<a href=\"https://365.kdocs.cn/l/crbR9EANphse\">https://365.kdocs.cn/l/crbR9EANphse</a></p>\n","children":[]}]},{"key":"data.upload_id","name":"upload_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>上传标识</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "store_request": {
      "method": "string",
      "url": "string"
    },
    "upload_id": "string"
  },
  "code": 0,
  "msg": "string"
}
```


