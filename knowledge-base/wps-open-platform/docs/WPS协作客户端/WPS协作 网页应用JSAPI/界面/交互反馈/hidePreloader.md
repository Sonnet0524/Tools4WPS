# hidePreloader

## 描述
隐藏加载弹窗。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>需配合showPreloader方法使用，在 showPreloader 方法后调用。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.15.0 |
| Android | &gt;&#x3D;2.15.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.hidePreloader({onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
