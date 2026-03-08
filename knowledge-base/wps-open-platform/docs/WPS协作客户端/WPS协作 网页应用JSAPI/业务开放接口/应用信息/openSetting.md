# openSetting

## 描述
打开设置页面，展示用户设置（包括授予和拒绝）过的权限，关闭页面后返回用户设置过的授权结果。  
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
| scopeList | `array<object>` | 用户设置（包括授予和拒绝）过的权限列表。 |
| ∟ authorized | `boolean` | 是否已授权 |
| ∟ scope | `string` | 权限名称，详细见：[用户授权列表](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)。 |
## 示例代码
```ts
window.ksoxz_sdk.openSetting({onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
