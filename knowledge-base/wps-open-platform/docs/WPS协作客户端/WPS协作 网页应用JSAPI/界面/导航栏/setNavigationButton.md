# setNavigationButton

## 描述
自定义导航栏左侧按钮。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>按钮点击事件通过 onSuccess 通知。<br>注意：当左侧存在返回按钮时，该按钮会放到返回按钮的右边，多次调用时会覆盖之前的自定义。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |
| PC | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ autoResetNavigationBar | `boolean` | 否 | 协作5.39.0版本新增<br>当前应用容器内页面发生跳转后是否重置导航栏设置，默认值为 false(仅移动端支持)<br>• false：跳转后不重置导航栏设置<br>• true：跳转后重置导航栏为标准样式 |
| ∟ defaultBehavior | `boolean` | 否 | 协作5.39.0版本新增<br>点击按钮时是否走默认行为，默认值为 false。<br>当传入值为true时，则不再执行回调后的前端业务逻辑，而是执行下面默认行为：<br>• home：则跳转到应用首页，homepage<br>• share：则调起客户端通讯录组件，执行分享逻辑 |
| ∟ direction | `string` | 否 | PC端，不传默认是左侧（left），右侧：right（pc支持版本2.10.0） |
| ∟ iconId | `string` | 是 | 目前支持的 iconId 只有：<br>• home：返回首页样式。<br>• share：分享按钮样式。<br>传1个时，则在原有导航栏样式按钮后新增展示（现有交互）。<br>当传其他字符串时，隐藏上次传入的自定义按钮。<br>注意：当按钮点击后，通过onSuccess回调告知前端页面进行处理。<br>当defaultBehavior为true时，则不再执行回调后的前端业务逻辑，而是执行客户端默认行为： |
| ∟ tip | `string` | 否 | PC端，hover上去的提示 |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.setNavigationButton({
params:{
  iconId: 'home',
  tip: 'tip',
  direction: 'direction'
  defaultBehavior: true,
  autoResetNavigationBar: true
},
onSuccess,
onError
})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
