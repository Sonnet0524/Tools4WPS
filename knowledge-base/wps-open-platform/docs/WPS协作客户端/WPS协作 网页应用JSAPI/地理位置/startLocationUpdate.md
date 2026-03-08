# startLocationUpdate

## 描述
开启网页应用（在前台时）接收位置更新消息。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.location，你需要兼容用户拒绝授权的场景。<br>当网页应用在后台时，会暂停定位，切回前台后，恢复定位。<br>需要关闭时可调用stopLocationUpdate接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;4.18.0 |
| Android | &gt;&#x3D;4.18.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ type | `number` | 是 | 坐标系类型<br>可能值：<br>• 0：wgs84 坐标系<br>• 1：gcj02 坐标系<br>默认值：1 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.startLocationUpdate({ params:{
  type: 'gcj02'
}, onSuccess, onError });
```
     

## 错误码

| errno   | msg                                         | 含义                       |
| ------- | ------------------------------------------- | -------------------------- |
| 1002002 | User not granted webApp location permission | 用户未授予网页应用定位权限 |
| 1021002 | GPS permission not obtained                 | 用户未授予 App 定位权限    |
| 1022102 | GPS is disabled                             | GPS 未打开                 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
