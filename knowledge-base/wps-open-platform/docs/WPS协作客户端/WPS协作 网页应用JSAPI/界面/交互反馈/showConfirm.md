# showConfirm

## 描述
显示确认框。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>点击事件通过onSuccess回调通知。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.15.0 |
| Android | &gt;&#x3D;2.15.0 |
| PC | &gt;&#x3D;2.15.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ cancelText | `string` | 否 | 取消按钮文本，最多 8 个字符。<br>默认值：取消 |
| ∟ confirmText | `string` | 否 | 确定按钮文本，最多 8 个字符。<br>默认值：确定 |
| ∟ content | `string` | 是 | confirm 内容 |
| ∟ title | `string` | 是 | confirm 标题 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| event | `string` | 事件名，可能值为：<br>confirm：确定<br>cancel：取消 |
## 示例代码
```ts
const params = {
  title: '确认框标题',
  content: '确认框内容',
  confirmText: '确定',
  cancelText: '取消'
};
window.ksoxz_sdk.showConfirm({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
