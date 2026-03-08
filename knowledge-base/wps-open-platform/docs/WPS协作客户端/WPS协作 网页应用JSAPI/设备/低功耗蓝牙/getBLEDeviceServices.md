# getBLEDeviceServices

## 描述
低功耗蓝牙获取设备服务。  
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
  | ∟ deviceId | `string` | 是 | 蓝牙设备 ID<br>示例值：E5:66:9F:82:46:61 |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| services | `array<object>` | 已发现的设备服务列表 |
| ∟ isPrimary | `boolean` | 该服务是否为主服务。是主服务则为 true ，反之为 false |
| ∟ serviceId | `string` | 蓝牙设备特征值对应服务的 uuid |
## 示例代码
```ts
const params = {
  deviceId: 'E5:66:9F:82:46:61'
}
window.ksoxz_sdk.getBLEDeviceServices({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                               | 含义                       |
| ------- | --------------------------------- | -------------------------- |
| 1022103 | Bluetooth is disabled             | 蓝牙未打开                 |
| 1502001 | Bluetooth adapter not initialized | 蓝牙适配器未初始化         |
| 1502014 | Bluetooth device is not connected | 该 ID 对应的蓝牙设备未连接 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
