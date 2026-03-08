# accelerometerWatchShake

## 描述
调用该方法启动加速度计“摇一摇”监听。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用该接口后，会启动加速度计的监听，通过传入的震动幅度、采样间隔等条件来决定当前是否符合“摇一摇”如果符合则通过回调函数告知前端。需要停止监听时可以使用accelerometerClearShake。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.7.0 |
| Android | &gt;&#x3D;2.7.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ callbackInterval | `number` | 是 | 两次“摇一摇”的时间间隔(毫秒)。触发“摇一摇”后，在该时间间隔内，不再触发“摇一摇”的回调。 |
| ∟ frequency | `number` | 是 | 采样间隔(毫秒)，指每隔多长时间对加速度进行一次采样， 然后对比前后变化，判断是否触发 shake。<br>最大值取决于设备，建议该值不超过 80 |
| ∟ sensitivity | `number` | 是 | 振动幅度（m/s²），加速度变化超过这个值后触发 shake。<br>推荐值：3.5 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  sensitivity: 3.5,
  frequency: 80,
  callbackInterval: 1000
};
window.ksoxz_sdk.accelerometerWatchShake({params,onSuccess,onError});
```
     

## 错误码

| errno   | msg                         | 含义                                       |
| ------- | --------------------------- | ------------------------------------------ |
| 1023003 | Accelerometer not available | 设备不支持加速度传感器（缺少相关硬件支持） |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
