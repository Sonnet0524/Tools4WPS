# stopBeaconDiscovery

## 描述
停止搜索附近的 Beacon 设备。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>注意：需要先调用startBeaconDiscovery。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.25.0 |
| Android | &gt;&#x3D;5.25.0 |


## 输入
- 无参数
     
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.stopBeaconDiscovery()
```
     

## 错误码

| errno   | msg                      | 含义         |
| ------- | ------------------------ | ------------ |
| 1503003 | not startBeaconDiscovery | 还未开始搜索 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
