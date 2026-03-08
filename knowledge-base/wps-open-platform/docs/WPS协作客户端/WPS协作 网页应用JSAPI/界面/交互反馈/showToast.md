# showToast

## 描述
显示提示弹窗。  
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
  | ∟ duration | `number` | 否 | 显示时间，单位毫秒。<br> 默认按照系统规范 Android端只有两种（当值<=2000 时显示 2000 毫秒，当>2000 时显示 3500 毫秒）。 |
| ∟ icon | `string` | 否 | 图标。<br>success ：成功。<br>warning：警告。<br>info：详情。<br>error ：错误。<br>Android 使用的是统一的 Toast 函数，在未使用 UI 库之前，都是统一使用旧样式。<br>PC、iOS暂不支持该字段 |
| ∟ message | `string` | 是 | toast 内容 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  message: 'toast内容',
  icon: 'success',
  duration: 2000
};
window.ksoxz_sdk.showToast({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
