# getConnectedBluetoothDevices

## 描述
获取已处于连接状态的蓝牙设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.19.0 |
| Android | &gt;&#x3D;5.23.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ services | `array<string>` | 否 | 要搜索的蓝牙设备主service的uuid列表。如果设置此参数，则只搜索广播包有对应UUID的主服务的蓝牙设备。这有助于过滤掉不需要的蓝牙设备。 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| devices | `array<object>` | uuid 对应的已连接的蓝牙设备列表。 |
| ∟ deviceId | `string` | 已连接蓝牙设备的id |
| ∟ name | `string` | 已连接蓝牙设备的名称 |
## 示例代码
```ts
window.ksoxz_sdk.getConnectedBluetoothDevices({
    params: {
      services: [''],
    },
    onSuccess: (res) => {
    },
    onError: (res) => {
    },
  })
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
