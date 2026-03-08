# showMenuItems

## 描述
设置底部工具菜单的Items展示。  
> 可使用该接口决定底部菜单可以显示哪些items，如果需要隐藏items则可以使用 hideMenuItems 接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ items | `array<string>` | 是 | 要显示的菜单项列表。可选值：<br>• refresh: 刷新<br>• robot: 机器人<br>• floating: 浮窗<br>• share: 分享<br>• file: 下载<br>• restart: 重启<br>• moveToNewWindow: 新窗口打开<br>• copyLink: 复制链接<br>• openInBrowser: 浏览器打开<br><br>注意：moveToNewWindow 仅iOS iPad设备生效。 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.showMenuItems({
params:{
  items: ['refresh', 'robot', 'floating', 'share', 'file', 'restart']
},
onSuccess,
onError
})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
