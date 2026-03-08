# startBeaconDiscovery

## 描述
用于开始搜索附近的 Beacon 设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>由于 Beacon 可以被用来进行定位，该接口会触发[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.location，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.25.0 |
| Android | &gt;&#x3D;5.25.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ ignoreBluetoothAvailable | `boolean` | 否 | 是否忽略蓝牙是否可用。取值：<br>true：忽略，无需校验<br>false：不忽略，需要校验蓝牙有效性<br>默认值：true<br>注意：该字段仅在 iOS 下有效。 |
| ∟ uuids | `array<string>` | 是 | Beacon 设备广播的 uuid 列表。<br>示例值：["fda50693-a4e2-4fb1-afcf-c6eb07641234"] |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
uuids: [],
}
window.ksoxz_sdk.startBeaconDiscovery({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                                          | 含义                       |
| ------- | -------------------------------------------- | -------------------------- |
| 1002002 | User not granted webApp location permission  | 用户未授予网页应用定位权限 |
| 1021002 | GPS permission not obtained                  | 用户未授予 App 定位权限    |
| 1022102 | GPS is disabled                              | GPS 未打开                 |
| 1002007 | User not granted webApp bluetooth permission | 用户未授予网页应用蓝牙权限 |
| 1021009 | Bluetooth permission not obtained            | 用户未授予 App 蓝牙权限    |
| 1022103 | Bluetooth is disabled                        | 蓝牙未打开                 |
| 1503001 | unsupport                                    | 系统或设备不支持           |
| 1503002 | already start                                | 已经开始搜索               |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
