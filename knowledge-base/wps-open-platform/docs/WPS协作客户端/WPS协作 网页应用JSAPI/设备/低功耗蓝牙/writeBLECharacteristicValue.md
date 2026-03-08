# writeBLECharacteristicValue

## 描述
写入蓝牙数据。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>设备的特征值必须支持write才可以成功调用，具体参照getBLEDeviceCharacteristics输出的<br> properties 属性。<br>写入的二进制数据需要进行hex编码。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.23.0 |
| Android | &gt;&#x3D;5.23.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ characteristicId | `string` | 是 | 蓝牙特征值的 uuid |
| ∟ deviceId | `string` | 是 | 蓝牙设备 ID<br>示例值：E5:66:9F:82:46:61 |
| ∟ serviceId | `string` | 是 | 蓝牙特征值对应service的uuid<br>示例值：FF:24:79:5D:6D:0C |
| ∟ value | `string` | 是 | 蓝牙设备特征值对应的值，16 进制字符串，限制在 20 字节内<br>示例值：'0xFF' |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  deviceId: 'E5:66:9F:82:46:61',
  serviceId: 'FF:24:79:5D:6D:0C',
  characteristicId: 'FF:24:79:5D:6D:0C',
  value: '0xFF'
}
window.ksoxz_sdk.writeBLECharacteristicValue({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                               | 含义                       |
| ------- | --------------------------------- | -------------------------- |
| 1022103 | Bluetooth is disabled             | 蓝牙未打开                 |
| 1502001 | Bluetooth adapter not initialized | 蓝牙适配器未初始化         |
| 1502014 | Bluetooth device is not connected | 该 ID 对应的蓝牙设备未连接 |
| 1502010 | Service not found                 | 没有找到指定服务           |
| 1502011 | Characteristic not found          | 没有找到指定特征           |
| 1502012 | property not support              | 当前特征不支持此操作       |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
