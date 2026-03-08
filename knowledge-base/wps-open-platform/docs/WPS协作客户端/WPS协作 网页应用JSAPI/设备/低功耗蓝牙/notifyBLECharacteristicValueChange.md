# notifyBLECharacteristicValueChange

## 描述
设置启用特征订阅。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

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
| ∟ descriptorId | `string` | 否 | notify 的 descriptor 的 uuid<br>注意：只有Android 会用到，非必填。<br>一般为00002902-0000-1000-8000-00805f9b34fb |
| ∟ deviceId | `string` | 是 | 蓝牙设备 ID<br>示例值：E5:66:9F:82:46:61 |
| ∟ serviceId | `string` | 是 | 蓝牙特征值对应service的uuid<br>示例值：FF:24:79:5D:6D:0C |
| ∟ state | `boolean` | 否 | 是否启用notify或indicate |
| ∟ type | `string` | 否 | 设置特征订阅类型，<br>有效值：<br>• notify<br>• indicate<br>默认值：notify |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  deviceId: 'E5:66:9F:82:46:61',
  serviceId: 'FF:24:79:5D:6D:0C',
  characteristicId: 'FF:24:79:5D:6D:0C'
}
window.ksoxz_sdk.notifyBLECharacteristicValueChange({params,onSuccess,onError})
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
