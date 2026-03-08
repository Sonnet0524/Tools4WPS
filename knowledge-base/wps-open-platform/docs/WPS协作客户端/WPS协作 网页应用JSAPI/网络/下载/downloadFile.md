# downloadFile

## 描述
下载网络文件到本地目录。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.3.0 |
| Android | &gt;&#x3D;2.3.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ body | `Object` | 否 | POST请求的body内容。<br>注意：仅method=POST时该参数生效 |
| ∟ cachePolicy | `number` | 否 | 文件缓存策略，可选值为：<br>• 0：保存到本地文件中。<br>• 1: 临时文件，临时文件不会出现在下载列表中，且会不定时清理，文件无法通过手机文件管理器查看。<br>默认值：0 |
| ∟ filePath | `string` | 否 | 指定文件下载后存储的路径 (本地路径)。<br>注意：iOS不支持该参数 |
| ∟ header | `Object` | 否 | HTTP 请求 Header<br>注意：header 不支持设置 referer，content-type不可变更 |
| ∟ isXzHandle | `boolean` | 否 | 是否显示下载完成的弹窗。在iOS表现为调起分享面板，在Android表现为弹出下载完成<br>默认值：true |
| ∟ isXzLoading | `boolean` | 否 | 是否显示进度弹窗。<br>默认值：true |
| ∟ method | `string` | 否 | 请求方式。可能值：<br>• GET<br>• POST<br>默认值：GET |
| ∟ url | `string` | 是 | 下载资源的url |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| fileInfo | `object` | 文件信息 |
| ∟ fileId | `string` | 文件ID，用来作为参数提供给跳转到文件下载页Deelink：ksoxz://xz.wps.cn/downloadDetail?fileId=xxx |
| ∟ fileName | `string` | 文件名称 |
| ∟ filePath | `string` | 文件路径 |
| ∟ fileSize | `number` | 文件大小 |
## 示例代码
```ts
const params = {
 url:'https://www.ksyun.com/',
 filePath:'storage/emulated/0/Download/xxx.txt'
 method:'GET',    // 请求方法，默认为GET，如果需要POST请求，可以设置为POST
 body: { "key": "value" }, // POST请求的body内容,传入JSON对象
 header: {
     "Content-Type": "application/json",
     "Authorization": "token" // 例如，使用Bearer Token进行认证
 },
 isXZLoading: true, // 是否弹出进度弹窗
 isXZHandle: true // 是否显示下载完成的弹出页面
};
// 调用sdk后会返回一个包含几个方法的DownloadTask对象
const downloadTask = window.ksoxz_sdk.downloadFile({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                                            | 含义                                                                                                                                                                                                     |
| ------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1002009 | User not granted webApp file access permission | 用户未授予网页应用文件访问权限                                                                                                                                                                           |
| 1043100 | Request error                                  | 请求开发者接口错误。请根据 extras 字段返回信息获取上传接口的业务报错，extras 包含字段为`statusCode`： Http 状态码`response`：响应体，base64 字符串。`header`：开发者服务器返回的 header，base64 字符串。 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
