# getDeviceInfo

## 描述
获取当前设备信息。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.3.0 |
| Android | &gt;&#x3D;2.3.0 |
| PC | &gt;&#x3D;2.3.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| deviceId | `string` | 设备识别标识 |
| displayMode | `string` | WPS协作在当前屏幕尺寸下的显示模式。可能值：<br>• PhoneMode：手机模式<br>• TabletMode：平板模式<br>注意：<br>• 显示模式只代表当前设备屏幕的展示模式，不能简单作为手机或平板的判断依据，如iPad在分屏下也有可能是PhoneMode。<br>• PC不支持该参数。 |
| model | `string` | 设备型号 |
| netInfo | `string` | 网络类型。可能值：<br>• none：无网络<br>• wifi：Wi-Fi网络<br>• 2g：2G 网络<br>• 3g：3G网络<br>• 4g：4G网络<br>• 5g：5G网络<br>• unknown：如果设备无法确定上述网络类型，则会返回该值。<br>注意：PC不支持该参数。 |
| operatorType | `string` | 运营商。可能值：<br>• CMCC：中国移动<br>• CUCC：中国联通<br>• CTCC：中国电信<br>• unknown：未知<br>注意：PC不支持该参数。<br>iOS16之后由于苹果官方接口限制，该参数无效 |
| pixelRatio | `number` | 设备像素比。<br>示例值：3.5 |
| platform | `string` | 设备平台。可能值：<br>• iOS：iOS平台<br>• Android：Android平台<br>• PC：PC平台 |
| screenHeight | `number` | 屏幕高度，单位px |
| screenWidth | `number` | 屏幕宽度，单位px |
| version | `string` | 设备系统版本 |
## 示例代码
```ts
window.ksoxz_sdk.getDeviceInfo({onSuccess,onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
