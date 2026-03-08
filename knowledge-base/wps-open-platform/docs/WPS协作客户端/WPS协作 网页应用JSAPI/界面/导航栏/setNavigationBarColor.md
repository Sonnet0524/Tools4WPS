# setNavigationBarColor

## 描述
设置导航栏颜色。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ backgroundColor | `string` | 否 | 背景颜色值，有效值为十六进制颜色<br>示例值：#ffffff |
| ∟ frontColor | `string` | 否 | 前景颜色值，包括按钮、标题的颜色<br>示例值：#000000 |
| ∟ statusBarMode | `string` | 否 | 状态栏主题<br>可选值：<br>• Light：适配浅色主题，系统状态栏图标为黑色<br>• Dark：适配深色主题，系统状态栏图标为白色 |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.setNavigationBarColor({
params:{
  backgroundColor: '#000000',
  frontColor: '#ffffff'
},
onSuccess,
onError
})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
