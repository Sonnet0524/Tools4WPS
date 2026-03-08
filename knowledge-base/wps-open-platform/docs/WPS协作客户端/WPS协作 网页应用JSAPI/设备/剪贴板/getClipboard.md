# getClipboard

## 描述
获取系统粘贴板数据。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.clipboard，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.7.0 |
| Android | &gt;&#x3D;2.7.0 |
| PC | &gt;&#x3D;2.7.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| text | `string` | 粘贴板数据。 |
## 示例代码
```ts
window.ksoxz_sdk.getClipboard({onSuccess,onError});
```
     

## 错误码

| errno   | msg                                          | 含义                         |
| ------- | -------------------------------------------- | ---------------------------- |
| 1002008 | User not granted webApp clipboard permission | 用户未授予网页应用剪切板权限 |
| 1520001 | Unable to get clipboard in the background    | 不能在后台获取粘贴板         |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
