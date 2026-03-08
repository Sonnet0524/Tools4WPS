# getStepCount

## 描述
获取运动步数。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.runData，你需要兼容用户拒绝授权的场景。<br>该接口在Android和iOS双端在获取数据来源时，可能存在一定差异。<br>a. Android V5.31.0 及以前的版本 获取传感器设备中的当前总步数。如果设备重启，设备传感器中的步数会被清零。如果未能获取到步数信息。请检查设备是否支持 TYPE_STEP_COUNTER 传感器以及传感器是否正常工作。<br>b. Android V5.32.0 及以后的版本 在小米系列手机上，从小米运动中获取设备当天 0 点至当前时间的步数信息。相关信息参见[小米运动文档](https://dev.mi.com/console/doc/detail?pId=2487)。 在非小米系列手机上，获取传感器设备内的当前总步数。如果设备重启，设备传感器中的步数不会被清零，运动步数会一直累加。如果未能获取到步数信息, 请检查设备是否支持 TYPE_STEP_COUNTER 传感器以及传感器是否正常工作。<br>c. iOS 获取传感器设备内的当前总步数。如果设备重启，设备传感器中的步数不会被清零，运动步数会一直累加。如果未能获取到步数信息, 请检查设备是否支持 TYPE_STEP_COUNTER 传感器以及传感器是否正常工作  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.12.0 |
| Android | &gt;&#x3D;5.12.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| stepCount | `number` | 设备当前步数 |
## 示例代码
```ts
window.ksoxz_sdk.getStepCount({ onSuccess, onError })
```
     

## 错误码

| errno   | msg                                        | 含义                                         |
| ------- | ------------------------------------------ | -------------------------------------------- |
| 1002006 | User not granted webApp runData permission | 用户未授予网页应用运动与健康权限             |
| 1021008 | step count permission not obtained         | 未授权运动与健康系统权限                     |
| 1023002 | step count not available                   | 设备不支持计步功能                           |
| 1801001 | already start                              | 之前获取步数还未结束，请确保上次调用已经完成 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
