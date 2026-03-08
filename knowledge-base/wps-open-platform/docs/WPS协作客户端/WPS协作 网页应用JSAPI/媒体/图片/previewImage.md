# previewImage

## 描述
用于预览图片。  
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
  | ∟ currentIndex | `number` | 否 | 当前预览图片的索引值<br>默认值：0 |
| ∟ shouldShowCopyOption | `boolean` | 否 | 是否显示复制按钮<br>注意：仅 PC 客户端支持 |
| ∟ shouldShowForwardOption | `boolean` | 否 | 是否显示转发按钮<br>注意：仅 PC 客户端支持 |
| ∟ shouldShowSaveOption | `boolean` | 否 | 是否显示下载按钮<br>true：显示<br>false：不显示<br>默认值：true |
| ∟ url | `string` | 否 | 需要预览的图片路径<br>注意：仅 PC 客户端支持，pc端为必填 |
| ∟ urls | `array<string>` | 否 | 需要预览的图片 url 或者本地路径<br>注意：仅移动端支持<br>移动端为必填<br>当url为本地路径时，该url来源于其他jsapi返回的路径，如chooseImage的返回："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04" |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  urls: [
    'https://qn.cache.wpscdn.cn/koa/static/avatar_v2/schedule_avatar.png',
    'https://qn.cache.wpscdn.cn/koa/static/avatar/workbench_avatar.png',
    'https://qn.cache.wpscdn.cn/koa/static/avatar_v2/meeting_avatar.png',
    'https://qn.cache.wpscdn.cn/koa/static/avatar_v2/docs_avatar.png',
    'https://qn.cache.wpscdn.cn/koa/static/avatar/oms_avatar.png',
  ],
  currentIndex: '2'
};
window.ksoxz_sdk.previewImage({params,onSuccess,onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
