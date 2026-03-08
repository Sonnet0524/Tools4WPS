# onBeaconUpdate

## 描述
监听 Beacon 设备更新事件，仅能注册一个监听。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>注意事项：需要先调用startBeaconDiscovery。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.25.0 |
| Android | &gt;&#x3D;5.25.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onChange |` any `| 是 |  |
| onError |` any `| 是 |  |
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

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
