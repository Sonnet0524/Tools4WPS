# chooseLocation

## 描述
打开地图选择位置。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.location，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.24.0 |
| Android | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ type | `number` | 否 | 期望返回的坐标系类型，默认值为1<br>可选值：<br>0：wgs84 坐标系<br>1：gcj02 坐标系<br>注意：iOS不支持该参数 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| address | `string` | 详细地址（可能为空） |
| latitude | `number` | 纬度，浮点数，范围为-90~90，负数表示南纬 |
| longitude | `number` | 经度，浮点数，范围为-180~180，负数表示西经 |
| name | `string` | 位置名称 |
## 示例代码
```ts
window.ksoxz_sdk.chooseLocation({ params:{
  type: 1
}, onSuccess, onError })
```
     

## 错误码

| errno   | msg                         | 含义                    |
| ------- | --------------------------- | ----------------------- |
| 1021002 | GPS permission not obtained | 用户未授予 App 定位权限 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
