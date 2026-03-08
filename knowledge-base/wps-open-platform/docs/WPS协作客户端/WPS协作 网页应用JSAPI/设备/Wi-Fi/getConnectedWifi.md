# getConnectedWifi

## 描述
获取设备当前所连接的 Wi-Fi。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>iOS14以后需要打开精确定位。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;4.16.0 |
| Android | &gt;&#x3D;4.16.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| BSSID | `string` | Wi-Fi 的 BSSID |
| SSID | `string` | Wi-Fi 的 SSID |
| secure | `boolean` | Wi-Fi 是否安全<br>注意：iOS 端暂不支持输出该字段。Android10及以上版本不支持输出该字段。 |
| signalStrength | `number` | Wi-Fi 信号强度<br>注意：iOS 端暂不支持输出该字段。 |
## 示例代码
```ts
window.ksoxz_sdk.getConnectedWifi({onSuccess,onError});
```
     

## 错误码

| errno   | msg                         | 含义                                  |
| ------- | --------------------------- | ------------------------------------- |
| 1504001 | WIFI is disabled            | WIFI 开关未开启                       |
| 1504002 | GPS permission not obtained | 操作失败, 因为用户未授予 App 定位权限 |
| 1504003 | not open GPS                | 操作失败, 因为系统 GPS 开关未打开     |
| 1504004 | current WIFI is null        | 获取不到当前已连接 WiFi               |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
