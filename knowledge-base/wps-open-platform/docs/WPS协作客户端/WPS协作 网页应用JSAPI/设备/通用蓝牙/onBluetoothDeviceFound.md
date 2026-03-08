# onBluetoothDeviceFound

## 描述
监听寻找新蓝牙设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.19.0 |
| Android | &gt;&#x3D;5.23.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onChange |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| devices | `array<object>` | uuid 对应的已连接的蓝牙设备列表。 |
| ∟ RSSI | `number` | 信号强度 |
| ∟ advertisData | `string` | 当前蓝牙设备的广播数据段中的 ManufacturerData 数据段 |
| ∟ advertisServiceUUID | `array<string>` | 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段 |
| ∟ deviceId | `string` | 蓝牙设备id |
| ∟ localName | `string` | 当前蓝牙设备的广播数据段中的 LocalName 数据段 |
| ∟ name | `string` | 蓝牙设备名称 |
| ∟ serviceData | `object` | 当前蓝牙设备的广播数据段中的 ServiceData 数据段 |
## 示例代码
```ts
window.ksoxz_sdk.onBluetoothDeviceFound({onChange,onError})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
