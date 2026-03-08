# closeBluetoothAdapter

## 描述
关闭蓝牙模块。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br><br>调用该接口将断开已建立的蓝牙连接，并释放系统资源。  

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
window.ksoxz_sdk.closeBluetoothAdapter({onSuccess,onError})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
