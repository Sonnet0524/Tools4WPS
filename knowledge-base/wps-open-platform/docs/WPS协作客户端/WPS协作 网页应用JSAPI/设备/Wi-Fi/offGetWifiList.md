# offGetWifiList

## 描述
取消监听获取到 Wi-Fi 列表数据事件。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>与onGetWifiList配套使用。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| Android | &gt;&#x3D;4.16.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| callback |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.offGetWifiList({callback});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
