# launchNativeApp

## 描述
用于唤起原生应用。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| Android | &gt;&#x3D;5.20.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ action | `string` | 是 | 需要传给原生应用的Action参数，用于原生应用内部处理逻辑（必填） |
| ∟ downloadUrl | `string` | 否 | 若原生应用未安装，用户将被跳转到该下载地址 |
| ∟ params | `Map` | 否 | 唤起原生应用时传递的参数键值对 |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
   action: ''
 };
window.ksoxz_sdk.launchNativeApp({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
