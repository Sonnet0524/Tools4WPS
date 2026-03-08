# removeNetworkQualityChange

## 描述
取消监听网络质量评级变化。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>与setNetworkQualityChange配套使用。<br>注意：网络质量监听器与当前web容器绑定，当调用了 removeNetworkQualityChange ，当前web容器所有监听的地方不会再收到回调。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |
| PC | &gt;&#x3D;3.10.0 |


## 输入
- 无参数
     
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.removeNetworkQualityChange();
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
