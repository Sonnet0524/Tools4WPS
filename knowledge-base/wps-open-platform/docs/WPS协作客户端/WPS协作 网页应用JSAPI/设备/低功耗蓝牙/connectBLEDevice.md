# connectBLEDevice

## 描述
低功耗蓝牙连接外围设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>若在之前已有搜索过某个蓝牙设备，可直接传入之前搜索获取的 deviceId 直接尝试连接该设备，无需进行搜索操作。<br>若指定的蓝牙设备已经连接，重复连接直接返回成功。  

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
- 无返回值
## 示例代码
```ts
const params = {
  deviceId: 'E5:66:9F:82:46:61'
}
window.ksoxz_sdk.connectBLEDevice({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                               | 含义                                                                                         |
| ------- | --------------------------------- | -------------------------------------------------------------------------------------------- |
| 1022103 | Bluetooth is disabled             | 蓝牙未打开                                                                                   |
| 1502001 | Bluetooth adapter not initialized | 蓝牙适配器未初始化                                                                           |
| 1502008 | Bluetooth device not found        | 没有找到该 ID 对应的蓝牙设备                                                                 |
| 1502009 | Bluetooth connected fail          | 蓝牙连接失败可能原因：蓝牙设备信号弱，请尝试靠近蓝牙设备蓝牙设备状态异常，请尝试重启蓝牙设备 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
