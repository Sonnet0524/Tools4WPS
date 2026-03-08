# openUrl

## 描述
打开网页。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.0.0 |
| Android | &gt;&#x3D;2.0.0 |
| PC | &gt;&#x3D;2.0.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ mode | `string` | 否 | 打开模式，仅PC端支持<br>window：新窗口打开<br>independentWindow：独立窗口打开<br>browser：浏览器打开 |
| ∟ newTab | `boolean` | 否 | 是否在新的 tab 上打开网页。当传入true时，会通过新的应用容器打开页面。<br>默认 false |
| ∟ toolbar | `array<string>` | 否 | 自定义工具栏。传[]表示隐藏工具栏，需要自定义工具栏可按需传下列参数：<br>• doc_create：创建文档<br>• history：历史记录<br>• robot：机器人会话<br>• browser：浏览器打开<br>• share：分享<br>• more：更多<br>注意：自定义工具栏仅 PC 端支持，默认显示应用工具栏 |
| ∟ url | `string` | 是 | 需要打开的网页 url。<br>注意：在5.24.0之后，增加了url scheme白名单功能，不在白名单内会禁止跳转。<br>默认支持 scheme：["http","https","rtsp","woa","ksoxz","kim"] |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  url: 'https://www.baidu.com',
  newTab: false,
  mode: 'window',
  toolbar: ['doc_create', 'history', 'robot', 'browser', 'share', 'more']
};
window.ksoxz_sdk.openUrl({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
