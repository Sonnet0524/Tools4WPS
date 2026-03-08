# getLocationInfo

## 描述
获取设备当前的地理位置信息。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.location，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.8.0 |
| Android | &gt;&#x3D;2.8.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ accuracy | `string` | 否 | 位置的精确度<br>可能值：<br>• high：期望精确度为100m<br>• best：期望精确度为20m<br>默认值：high<br>注意：Android暂不支持传入该字段 |
| ∟ coordinate | `number` | 否 | 坐标系类型<br>可能值：<br>• 0：wgs84 坐标系<br>• 1：gcj02 坐标系<br>默认值：1 |
| ∟ timeout | `number` | 否 | 定位超时时间<br>单位：s(秒)<br>可选值范围：3-180<br>• 最小值：3<br>• 最大值：180<br>默认值：5<br>如输入范围值之外的数值，则按accuracy字段自动选择，best模式下10秒，high模式下3秒。<br>注意：Android暂不支持传入该字段 |
| ∟ withReGeocode | `boolean` | 否 | 是否需要逆编码信息<br>默认值：true<br>注：启用后，每次调用将消耗地图服务的逆地理编码额度。建议根据实际需求进行开启，以避免不必要的资源消耗。 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| address | `object` | 逆编码位置信息<br>注意：<br>• 标准 gps 坐标获取无此字段返回<br>• 当 withReGeocode 参数为false时无此字段返回 |
| ∟ city | `string` | 城市<br>示例：珠海市; 直辖市为空 |
| ∟ description | `string` | 地理位置逆编码信息<br>示例：广东省珠海市香洲区唐家湾镇金山软件园 |
| ∟ district | `string` | 行政区<br>示例：香洲区 |
| ∟ province | `string` | 省<br>示例：广东省 |
| ∟ road | `string` | 街道<br>示例：情侣北路 |
| ∟ roadNum | `string` | 路牌号<br>示例：1858号 |
| horizontalAccuracy | `number` | 水平精度，单位：m |
| latitude | `number` | 维度（字符串,按需截取和转换） |
| longitude | `number` | 经度（字符串,按需截取和转换） |
| verticalAccuracy | `number` | 垂直精度,单位m<br>注意：Android 无法获取该精度，会返回 0 |
## 示例代码
```ts
const params = {
  coordinate: 1,
  withReGeocode: true
}
window.ksoxz_sdk.getLocationInfo({ params:{
  coordinate: 1,
  withReGeocode: true
}, onSuccess, onError })
```
     

## 错误码

| errno   | msg                                         | 含义                        |
| ------- | ------------------------------------------- | --------------------------- |
| 1002002 | User not granted webApp location permission | 用户未授予网页应用定位权限  |
| 1021002 | GPS permission not obtained                 | 用户未授予 App 系统定位权限 |
| 1022102 | GPS is disabled                             | GPS 未打开                  |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
