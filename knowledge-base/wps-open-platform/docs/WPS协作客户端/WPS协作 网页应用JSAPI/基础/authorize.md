# authorize

## 描述
用于向用户发出授权请求，详情可参考[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)。  
> 如果用户未同意过授权，则会咨询用户是否授予权限。<br>如果用户已同意过授权，则接口会直接返回结果，不会与用户进行交互。<br>网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;1.27.0 |
| Android | &gt;&#x3D;1.27.0 |
| PC | &gt;&#x3D;1.27.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ scope | `string` | 是 | 请求用户授权的权限名称。<br>支持的权限名称清单参考[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)中的Scope清单。 |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| auth | `boolean` | 是否授权。 |
## 示例代码
```ts
window.ksoxz_sdk.authorize({scope: 'camera'}, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
