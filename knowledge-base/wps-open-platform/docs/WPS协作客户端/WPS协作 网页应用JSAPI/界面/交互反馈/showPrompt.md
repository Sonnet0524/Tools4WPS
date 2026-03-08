# showPrompt

## 描述
展示可输入内容的弹窗。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

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
  | ∟ cancelText | `string` | 否 | 取消按钮文本，最多 8 个字符。<br>默认值：`取消` |
| ∟ confirmText | `string` | 否 | 确定按钮文本，最多 8 个字符。<br>默认值：`确定` |
| ∟ placeholder | `string` | 是 | prompt 默认描述文本 |
| ∟ title | `string` | 是 | prompt 标题 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| event | `string` | 事件名,确定为'confirm'，取消为'cancel' |
| inputValue | `string` | 用户输入的值 |
## 示例代码
```ts
const params = {
  title: '提示窗标题',
  placeholder: '提示窗内容',
  confirmText: '确定',
  cancelText: '取消'
};
window.ksoxz_sdk.showPrompt({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
