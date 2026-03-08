# getWifiList

## 描述
获取 Wi-Fi 列表。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>获取Wi-Fi列表的结果会在onGetWifiList中的回调返回，在调用该方法前请先调用onGetWifiList注册回调。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| Android | &gt;&#x3D;4.16.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.getWifiList({onSuccess, onError});
```
     

## 错误码

| errno   | msg                         | 含义                                  |
| ------- | --------------------------- | ------------------------------------- |
| 1504001 | WIFI is disabled            | WIFI 开关未开启                       |
| 1504002 | GPS permission not obtained | 操作失败, 因为用户未授予 App 定位权限 |
| 1504003 | not open GPS                | 操作失败, 因为系统 GPS 开关未打开     |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
