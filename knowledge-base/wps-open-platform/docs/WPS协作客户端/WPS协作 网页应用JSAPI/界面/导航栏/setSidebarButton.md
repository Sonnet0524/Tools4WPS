# setSidebarButton

## 描述
侧边栏导航自定义按钮。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| PC | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ icon | `string` | 否 | 值为一个图片 url，type 是 custom 时必传 |
| ∟ type | `string` | 是 | 必传，只有三种值： indepentWindow、share、custom；<br>indepentWindow（独立窗口）：功能菜单为分享、刷新、关于。<br>share（分享）：功能菜单为独立窗口、刷新、关于。<br>custom（自定义）：功能菜单为分享、独立窗口、刷新、关于。 |
| ∟ url | `string` | 否 | 值为 url 或 deeplink，type 是 custom 时必传 |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.setSidebarButton({
params:{
  type: 'indepentWindow',
  icon: 'icon',
  url: 'url'
},
onSuccess,
onError
})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
