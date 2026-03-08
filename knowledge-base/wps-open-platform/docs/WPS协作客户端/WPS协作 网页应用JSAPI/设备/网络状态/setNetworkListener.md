# setNetworkListener

## 描述
监听网络状态变化。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用该接口开始监听后，你可以根据实际需要，使用 removeNetworkListener 取消监听。<br>注意：网络监听器与当前web容器绑定，当调用了 removeNetworkListener ，当前web容器所有监听的地方不会再收到回调。  

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
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| status | `string` | 网络类型。返回值可能有：<br>• none：无网络<br>• wifi：Wi-Fi网络<br>• 2g：2G 网络<br>• 3g：3G网络<br>• 4g：4G网络<br>• 5g：5G网络<br>• unknown：如果设备无法确定上述网络类型，则会返回该值<br>• connected：已连接网络，仅 PC 端返回该值<br><br>注意：PC 端仅支持 connected 和 none 两种类型。 |
## 示例代码
```ts
window.ksoxz_sdk.setNetworkListener({onChange(res)=>{
  console.log(res.status);
}});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
