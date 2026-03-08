# onLocationChange

## 描述
监听实时地理位置变化事件，需结合startLocationUpdate使用。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;4.18.0 |
| Android | &gt;&#x3D;4.18.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| callback |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| accuracy | `number` | 位置的精确度,单位m<br>注意:Android返回水平精确度值,iOS返回水平精确度与垂直精确度中较大的值 |
| horizontalAccuracy | `number` | 水平精度,单位m |
| isGpsEnabled | `boolean` | gps设置是否开启<br>注意:仅Android支持,5.19.0以上版本支持 |
| isMobileEnabled | `boolean` | 移动网络是设置是否开启<br>注意:仅Android支持,5.19.0以上版本支持 |
| isMock | `boolean` | 定位返回的经纬度是否是模拟的结果<br>注意:5.19.0以上版本支持 |
| isWifiEnabled | `boolean` | wifi设置是否开启<br>注意:仅Android支持,5.19.0以上版本支持 |
| latitude | `number` | 维度<br>范围为-90~90,正数表示北,负数表示南 |
| locationType | `number` | 位置类型<br>可能值:<br>1:GPS定位结果<br>2:返回上次定位结果<br>3:缓存定位结果<br>4:Wifi定位结果<br>5:基站定位结果<br>注意:5.19.0以上版本支持,仅Android支持 |
| longitude | `number` | 经度<br>范围为-180~180,正数表示东,负数表示西 |
| netType | `string` | 当前设备网络类型<br>可能值:<br>wifi<br>2g<br>3g<br>4g<br>5g<br>unknown(如果设备无法确定上述网络类型，则会返回该值)<br>none(无网络/离线)<br>注意:5.19.0以上版本支持 |
| operatorType | `string` | 当前设备使用运营商<br>注意:5.19.0以上版本支持。iOS16.0版本之后由于苹果接口限制,该值无效 |
| timestamp | `number` | 定位时间戳,单位ms |
| verticalAccuracy | `number` | 垂直精度,单位：m<br>注意:Android无法获取此值,返回0 |
## 示例代码
```ts
window.ksoxz_sdk.startLocationUpdate({ params, onSuccess, onError })
 window.ksoxz_sdk.onLocationChange(callback)
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
