# closeApp

## 描述
用于关闭网页应用。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用该方法会关闭整个web应用相关的页面，包括通过openUrl打开的新容器。<br>注意：使用该方法关闭页面时会忽略onWebClose页面监听，并且取消页面常驻。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.closeApp({onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
