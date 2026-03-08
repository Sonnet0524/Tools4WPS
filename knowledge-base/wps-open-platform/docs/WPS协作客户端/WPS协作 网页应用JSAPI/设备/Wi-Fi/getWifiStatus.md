# getWifiStatus

## 描述
获取 WI-FI 开关状态。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;4.16.0 |
| Android | &gt;&#x3D;4.16.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| status | `string` | Wi-Fi 状态类型。可能值：<br>• on：开<br>• off：关 |
## 示例代码
```ts
window.ksoxz_sdk.getWifiStatus({onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
