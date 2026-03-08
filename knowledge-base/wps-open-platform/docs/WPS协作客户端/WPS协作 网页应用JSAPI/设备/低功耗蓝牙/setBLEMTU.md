# setBLEMTU

## 描述
设置蓝牙最大传输单元。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>需在 connectBLEDevice调用成功后调用。<br>仅安卓操作系统5.1以上有效。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| Android | &gt;&#x3D;5.23.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ deviceId | `string` | 是 | 用于区分设备的 id<br>示例值：E5:66:9F:82:46:61 |
| ∟ mtu | `number` | 是 | 最大传输单元，单位 bytes<br>可选值范围：22-512<br>最小值：22<br>最大值：512 |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  deviceId: 'E5:66:9F:82:46:61',
  mtu: 200
}
window.ksoxz_sdk.setBLEMTU({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                                          | 含义                               |
| ------- | -------------------------------------------- | ---------------------------------- |
| 1021009 | Bluetooth permission not obtained            | 用户未授予 App 蓝牙权限            |
| 1022103 | Bluetooth is disabled                        | 蓝牙未打开                         |
| 1023001 | Bluetooth not available                      | 设备不支持蓝牙（缺少相关硬件支持） |
| 1502014 | Bluetooth device is not connected            | 该 ID 对应的蓝牙设备未连接         |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
