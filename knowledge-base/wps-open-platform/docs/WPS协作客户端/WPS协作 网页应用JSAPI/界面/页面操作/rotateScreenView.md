# rotateScreenView

## 描述
旋转屏幕。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;4.15.0 |
| Android | &gt;&#x3D;4.15.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ orientation | `string` | 是 | 屏幕方向。<br>* 可选值：<br>* • landscape：横屏<br>* • portrait：竖屏<br>* • sensor：随设备旋转 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  orientation: 'landscape'
};
window.ksoxz_sdk.rotateScreenView({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
