# onBLECharacteristicValueChange

## 描述
监听特征值变化。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.23.0 |
| Android | &gt;&#x3D;5.23.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onChange |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| characteristicId | `string` | 蓝牙特征值的 UUID |
| deviceId | `string` | 蓝牙设备 ID |
| serviceId | `string` | 蓝牙特征值对应 service 的 UUID |
| value | `string` | 特征值最新的 16 进制值 |
## 示例代码
```ts
window.ksoxz_sdk.onBLECharacteristicValueChange({
  onChange(res) {
    console.log(res)
  }
})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
