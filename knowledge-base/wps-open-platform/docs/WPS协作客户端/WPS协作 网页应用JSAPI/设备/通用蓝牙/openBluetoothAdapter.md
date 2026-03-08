# openBluetoothAdapter

## 描述
初始化蓝牙模块。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app/client/wps-xz-client/jsapiUserAuth.html)scope.bluetooth，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.19.0 |
| Android | &gt;&#x3D;5.19.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.openBluetoothAdapter({onSuccess,onError})
```
     

## 错误码

| errno   | msg                               | 含义                                                                 |
| ------- | --------------------------------- | -------------------------------------------------------------------- |
| 1502001 | Bluetooth adapter not initialized | 蓝牙适配器未初始化，需要先调用 openBluetoothAdapter 接口进行初始化。 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
