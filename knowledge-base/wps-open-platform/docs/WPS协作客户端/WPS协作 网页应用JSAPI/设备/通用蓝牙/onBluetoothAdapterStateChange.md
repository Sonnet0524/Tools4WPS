# onBluetoothAdapterStateChange

## 描述
监听蓝牙适配器状态变化。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.19.0 |
| Android | &gt;&#x3D;5.19.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onChange |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| available | `boolean` | 蓝牙适配器是否可用 |
| discovering | `boolean` | 是否正在查找蓝牙设备 |
## 示例代码
```ts
window.ksoxz_sdk.onBluetoothAdapterStateChange({
    onChange: (res) => {
      console.log(res)
    },
    onError: (res) => {
      console.log(res)
    },
  })
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
