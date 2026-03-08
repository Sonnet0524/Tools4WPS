# disconnectBLEDevice

## 描述
断开蓝牙设备连接。  
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
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  deviceId: 'E5:66:9F:82:46:61'
}
window.ksoxz_sdk.disconnectBLEDevice({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                               | 含义                       |
| ------- | --------------------------------- | -------------------------- |
| 1502001 | Bluetooth adapter not initialized | 蓝牙适配器未初始化         |
| 1502014 | Bluetooth device is not connected | 该 ID 对应的蓝牙设备未连接 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
