# startBluetoothDevicesDiscovery

## 描述
查找附近蓝牙设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br><br>由于系统特性原因，Android需要Android.permission.ACCESS_FINE_LOCATION权限。<br>此操作比较耗费系统资源，请在搜索到需要的设备后及时调用stopBluetoothDevicesDiscovery停止搜索。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.19.0 |
| Android | &gt;&#x3D;5.23.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ allowDuplicatesKey | `boolean` | 否 | 是否允许重复上报同一设备，默认值为"false"。 |
| ∟ interval | `number` | 否 | 上报设备的时间间隔，单位毫秒(ms)。0表示找到新设备立即上报，其他数值表示根据传入的间隔上报。 |
| ∟ services | `array<string>` | 否 | 要搜索的蓝牙设备主service的uuid列表。如果设置此参数，则只搜索广播包有对应UUID的主服务的蓝牙设备。这有助于过滤掉不需要的蓝牙设备。 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.startBluetoothDevicesDiscovery({
    params: {
      services: ['1234567890'],
      allowDuplicatesKey: false,
      interval: 0
    },
    onSuccess: (res) => {
      console.log(res)
    },
    onError: (res) => {
      console.log(res)
    },
  })
```
     

## 错误码

| errno   | msg                                 | 含义                               |
| ------- | ----------------------------------- | ---------------------------------- |
| 1022103 | Bluetooth is disabled               | 蓝牙未打开                         |
| 1502001 | Bluetooth adapter not initialized   | 蓝牙适配器未初始化                 |
| 1502007 | Bluetooth already start discovering | 蓝牙已经在扫描中，需要先停止扫描。 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
