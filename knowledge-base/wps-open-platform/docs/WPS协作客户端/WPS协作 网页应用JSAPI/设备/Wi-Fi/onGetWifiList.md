# onGetWifiList

## 描述
监听获取到 Wi-Fi 列表数据事件。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>该接口需要与 getWifiList 接口配套使用。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| Android | &gt;&#x3D;4.16.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| callback |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| wifiList | `array<object>` | Wi-Fi列表数据 |
| ∟ BSSID | `string` | Wi-Fi 的 BSSID |
| ∟ SSID | `string` | Wi-Fi 的 SSID |
| ∟ secure | `boolean` | Wi-Fi 是否安全<br>注意：iOS 端暂不支持输出该字段。Android10 及以上无法获取 |
| ∟ signalStrength | `number` | Wi-Fi 信号强度<br>注意：iOS 端暂不支持输出该字段 |
## 示例代码
```ts
window.ksoxz_sdk.onGetWifiList({callback});
```
     

## 错误码

| 名称           | 类型    | 描述                                                                  |
| -------------- | ------- | --------------------------------------------------------------------- |
| SSID           | String  | Wi-Fi 的 SSID                                                         |
| BSSID          | String  | Wi-Fi 的 BSSID                                                        |
| secure         | Boolean | Wi-Fi 是否安全注意：iOS 端暂不支持输出该字段 Android10 及以上无法获取 |
| signalStrength | Number  | Wi-Fi 信号强度注意：iOS 端暂不支持输出该字段                          |

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
