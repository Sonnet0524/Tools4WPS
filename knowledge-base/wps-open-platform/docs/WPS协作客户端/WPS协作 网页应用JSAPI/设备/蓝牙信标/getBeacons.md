# getBeacons

## 描述
用于获取所有已搜索到的 Beacon 设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用该接口前，需要先调用startBeaconDiscovery。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.24.0 |
| Android | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| beacons | `array<object>` | Beacon 设备列表。 |
| ∟ accuracy | `number` | 精度。 |
| ∟ major | `number` | Beacon 设备的主 id。 |
| ∟ minor | `number` | Beacon 设备的次 id。 |
| ∟ proximity | `number` | 表示设备距离的枚举值。可能值：0：无效 1：非常近 2：近 3：远 |
| ∟ rssi | `number` | 信号强度。 |
| ∟ uuid | `string` | Beacon 设备广播的 uuid。 |
## 示例代码
```ts
window.ksoxz_sdk.getBeacons({onSuccess,onError})
```
     

## 错误码

| errno   | msg                      | 含义         |
| ------- | ------------------------ | ------------ |
| 1503003 | not startBeaconDiscovery | 还未开始搜索 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
