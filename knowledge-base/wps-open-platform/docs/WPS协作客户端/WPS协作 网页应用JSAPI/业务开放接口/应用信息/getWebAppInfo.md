# getWebAppInfo

## 描述
获取当前网页应用信息。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.35.0 |
| Android | &gt;&#x3D;2.35.0 |
| PC | &gt;&#x3D;2.35.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| appId | `string` | 应用 ID |
| desc | `string` | 应用描述，有描述则返回描述，没有则为空。 |
| icon | `string` | 应用的 icon |
| name | `string` | 应用名称 |
## 示例代码
```ts
window.ksoxz_sdk.getWebAppInfo({onSuccess,onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
