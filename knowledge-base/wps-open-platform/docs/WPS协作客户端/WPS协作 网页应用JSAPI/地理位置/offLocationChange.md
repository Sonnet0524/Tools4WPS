# offLocationChange

## 描述
取消监听实时地理位置变化事件。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>该接口需要与 onLocationChange 接口配套使用。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;4.18.0 |
| Android | &gt;&#x3D;4.18.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.offLocationChange({ onSuccess, onError })
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
