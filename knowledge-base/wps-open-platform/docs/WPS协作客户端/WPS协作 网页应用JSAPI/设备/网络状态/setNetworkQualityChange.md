# setNetworkQualityChange

## 描述
监听网络质量变化。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用该接口开始监听后，你可以根据实际需要，使用 removeNetworkQualityChange 取消监听。<br>注意：网络质量监听器与当前web容器绑定，当调用了 removeNetworkQualityChange ，当前web容器所有监听的地方不会再收到回调。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |
| PC | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onChange |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| networkQualityType | `string` | 网络质量评级类型<br>可能值:<br>• unavailable：无网络<br>• weak：弱网络<br>• moderate：中等网络<br>• excellent：良好网络<br>• unknown：如果设备无法确定网络分级，则会返回该值 |
## 示例代码
```ts
window.ksoxz_sdk.setNetworkQualityChange({onChange(res)=>{
  console.log(res.networkQualityType);
}});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
