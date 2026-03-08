# getBluetoothAdapterState

## 描述
获取蓝牙适配器状态。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

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
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| available | `boolean` | 蓝牙适配器是否可用或蓝牙适配器是否处于搜素状态 |
| discovering | `boolean` | 是否正在查找蓝牙设备 |
## 示例代码
```ts
window.ksoxz_sdk.getBluetoothAdapterState({onSuccess,onError})
```
     

## 错误码

| errno   | msg                                          | 含义                               |
| ------- | -------------------------------------------- | ---------------------------------- |
| 1002007 | User not granted webApp bluetooth permission | 用户未授予网页应用蓝牙权限         |
| 1021009 | Bluetooth permission not obtained            | 用户未授予 App 蓝牙权限            |
| 1023001 | Bluetooth not available                      | 设备不支持蓝牙（缺少相关硬件支持） |
| 1502006 | Bluetooth resetting                          | 蓝牙重置中                         |
| 1022103 | Bluetooth is disabled                        | 蓝牙未打开                         |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
