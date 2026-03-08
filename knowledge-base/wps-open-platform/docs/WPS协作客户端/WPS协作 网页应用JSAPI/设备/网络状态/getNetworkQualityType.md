# getNetworkQualityType

## 描述
获取当前设备所处的网络质量评级。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |
| PC | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| networkQualityType | `string` | 网络质量评级类型<br>可能值:<br>• unavailable：无网络<br>• weak：弱网络<br>• moderate：中等网络<br>• excellent：良好网络<br>• unknown：如果设备无法确定网络分级，则会返回该值 |
## 示例代码
```ts
window.ksoxz_sdk.getNetworkQualityType({onSuccess,onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
