# saveImageToAlbum

## 描述
保存图片到本地相册。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.album，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ url | `string` | 是 | 图片下载地址 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  url: 'https://qn.cache.wpscdn.cn/koa/static/avatar_v2/schedule_avatar.png'
};
window.ksoxz_sdk.saveImageToAlbum({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                                      | 含义                                                                                                                                                                                                     |
| ------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1021004 | Album permission not obtained            | 用户未授予 App 系统相册权限（iOS 特有）                                                                                                                                                                  |
| 1021006 | Storage-Access permission not obtained   | 用户未授予 App 文件写入权限（Android 特有）                                                                                                                                                              |
| 1002004 | User not granted webApp album permission | 用户未授予网页应用相册权限                                                                                                                                                                               |
| 1043100 | Request error                            | 请求开发者接口错误。请根据 extras 字段返回信息获取上传接口的业务报错，extras 包含字段为`statusCode`： Http 状态码`response`：响应体，base64 字符串。`header`：开发者服务器返回的 header，base64 字符串。 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
