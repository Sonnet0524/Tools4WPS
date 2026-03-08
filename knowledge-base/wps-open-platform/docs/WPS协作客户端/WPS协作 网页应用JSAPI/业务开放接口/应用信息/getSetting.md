# getSetting

## 描述
用于获取用户设置（包括授予和拒绝）过的权限列表数据。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.24.0 |
| Android | &gt;&#x3D;5.24.0 |
| PC | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| scopeList | `array<object>` | 用户已设置（包括 同意授权和拒绝授权） 的权限列表。 |
| ∟ authorized | `boolean` | 是否授权 |
| ∟ scope | `string` | 权限名称，详细见：[用户授权列表](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)。 |
## 示例代码
```ts
window.ksoxz_sdk.getSetting({onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
