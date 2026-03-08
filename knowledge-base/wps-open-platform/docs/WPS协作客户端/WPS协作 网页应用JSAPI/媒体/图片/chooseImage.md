# chooseImage

## 描述
从系统相册中选择图片，或使用来自相机拍摄的图片。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.0.0 |
| Android | &gt;&#x3D;3.0.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ applyBtnText | `string` | 否 | 图片选择来源为相册时，多选完成后底部完成按钮展示文本。<br>用于更好的适配特定业务场景需求，如发送场景可以设置为"发送"。<br>默认值："完成" |
| ∟ count | `number` | 否 | 最多可以选择的图片数量，可支持选择多个图片。默认为1，最大值为20。<br>注意：使用相机拍照时该字段失效。<br>默认值：1 |
| ∟ enableWatermark | `boolean` | 否 | 是否开启水印<br>默认值：false |
| ∟ sizeType | `array<string>` | 否 | 选择原图，或是对图片质量进行压缩。可选值：<br>["original"]：选择原图。<br>["compressed"]：强制对图片质量进行压缩。<br>["original","compressed"]: 默认开启压缩，sourceType为album时可手动选择原图。<br>默认值：["original","compressed"] |
| ∟ sourceType | `array<string>` | 否 | 指定图片来源。可选值：<br>• ["album"]：相册。<br>• ["camera"]：相机。<br>• ["album", "camera"]: 相册或相机。<br>默认值：["album", "camera"] |
| ∟ watermarkConfig | `object` | 否 | 水印配置信息，当enableWatermark为true时，需要传该值。 |
| ∟ ∟ backgroundStyleColor | `string` | 否 | 水印背景颜色，格式为CSS颜色值，如"#000000"（黑色）。<br>默认值："#000000"（白色） |
| ∟ ∟ backgroundStyleOpacity | `number` | 否 | 水印背景透明度，可选值为：0-1。<br>• 最小值：0<br>• 最大值：1<br>默认值：0.5 |
| ∟ ∟ color | `string` | 否 | 水印字体颜色，格式为CSS颜色值，如"#000000"（黑色）。<br>默认值："#FFFFFF"（白色） |
| ∟ ∟ fontSize | `number` | 否 | 水印字体大小，单位px。<br>默认值：14px |
| ∟ ∟ position | `string` | 否 | 水印位置。可选值：<br>• "top"：水印位于图片顶部位置<br>• "bottom"：水印位于图片底部位置<br>默认值："bottom" |
| ∟ ∟ watermarkText | `array<object>` | 否 | 水印内容。按照图标-文本的展示方式，最多可传5组数据。 |
| ∟ ∟ ∟ icon | `string` | 否 | 文本图标Base64编码，如果不需要展示图标，可为空。 |
| ∟ ∟ ∟ text | `string` | 是 | 水印文本内容 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| imageInfos | `array<object>` | 文件信息列表 |
| ∟ imageName | `string` | 图片名称 |
| ∟ imagePath | `string` | 图片路径，如："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04"<br>注意：该路径为映射值非设备真实路径，得到该路径时，一般配合其他接口的路径参数使用，如上传文件接口，可以传该路径返回作为路径参数。<br>Android 支持直接在 img 标签中显示。<br>iOS 需要通过 getImageBase64 接口得到图片的 base64 数据才支持在 img 标签中显示。 |
| ∟ imageSize | `number` | 图片大小，单位byte |
| ∟ localID | `string` | 本地资源 ID<br>注意：该字段仅安卓返回，在安卓端localID 可以作为 img 标签的 src 属性显示图片，使用范例： ksoxz://xz.wps.cn/resource?localID=580d4cb338afd28d326b3a20b5dd717c |
| ∟ sha256 | `string` | 图片的sha256值 |
## 示例代码
```ts
const params = {
  count: '9',
  sourceType: ['album', 'camera'],
  applyBtnText: '完成'
}
 window.ksoxz_sdk.chooseImage({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                            | 含义                        |
| ------- | ------------------------------ | --------------------------- |
| 1041001 | user canceled                  | 用户取消操作                |
| 1021003 | Camera permission not obtained | 用户未授予 App 系统相机权限 |
| 1021004 | Album permission not obtained  | 用户未授予 App 系统相册权限 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
