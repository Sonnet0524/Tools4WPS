# openLocation

## 描述
通过客户端内置地图查看位置。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.17.0 |
| Android | &gt;&#x3D;5.17.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ address | `string` | 否 | 地址的详细说明<br>示例值：珠海市香洲区情侣北路1858号 |
| ∟ latitude | `number` | 是 | 纬度，正数表示北，负数表示南<br>可选值范围：-90-90<br>• 最小值：-90<br>• 最大值：90<br>示例值：30.492121，使用gcj02 坐标系 |
| ∟ longitude | `number` | 是 | 精度，正数表示东，负数表示西<br>可选值范围：-180-180<br>• 最小值：-180<br>• 最大值：180<br>示例值：114.410324，使用gcj02 坐标系 |
| ∟ name | `string` | 否 | 位置名称 |
| ∟ scale | `number` | 否 | 缩放比例<br>可选值范围：5-18<br>• 最小值：5<br>• 最大值：18<br>默认值：18 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.openLocation({ params:{
  latitude: 30.492121,
  longitude: 114.410324
}, onSuccess, onError })
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
