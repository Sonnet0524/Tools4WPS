# reverseGeocode

## 描述
获取逆地理编码。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.19.0 |
| Android | &gt;&#x3D;5.19.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ latitude | `number` | 是 | 纬度，正数表示北，负数表示南<br>可选值范围：-90～90<br>• 最小值：-90<br>• 最大值：90<br>示例值：30.492121，使用gcj02 坐标系 |
| ∟ longitude | `number` | 是 | 精度，正数表示东，负数表示西<br>可选值范围：-180～180<br>• 最小值：-180<br>• 最大值：180<br>示例值：114.410324，使用gcj02 坐标系 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| city | `string` | 城市<br>示例：武汉市; 直辖市为空 |
| description | `string` | 地理位置逆编码信息<br>示例：湖北省武汉市洪山区雄庄路 100 号光谷 app 广场 2 号楼 |
| district | `string` | 行政区<br>示例：洪山区 |
| province | `string` | 省<br>示例：湖北省 |
| road | `string` | 街道<br>示例：雄庄路 100 号 |
| roadNum | `string` | 路牌号<br>示例：100号 |
## 示例代码
```ts
const params = {
  latitude: 30.492121,
  longitude: 114.410324
}
window.ksoxz_sdk.reverseGeocode({ params:{
  latitude: 30.492121,
  longitude: 114.410324
}, onSuccess, onError })
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
