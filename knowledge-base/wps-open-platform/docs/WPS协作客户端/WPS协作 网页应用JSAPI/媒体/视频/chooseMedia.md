# chooseMedia

## 描述
用于拍摄，或从系统相册中选择图片或视频。  
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
| params |` object `| 否 |  |
  | ∟ cameraDevice | `string` | 否 | 使用相机拍摄时，默认使用的摄像头。可选值：<br>front：前置摄像头。<br>back：后置摄像头。<br>默认值：back |
| ∟ count | `number` | 否 | 最多可以选择的文件数量。<br>支持选择多个图片或多个视频，最多支持 9 个文件。<br>使用相机拍照或拍视频时，该字段失效。<br>PC 端文件选择器无法限制选择数量，若设置了该值，会默认截取前 N 个。<br>默认值：9 |
| ∟ isSaveToAlbum | `string` | 否 | 使用相机拍摄后图片是否保存到相册。仅 iOS 和 Android 支持，且在 sourceType为 camera时生效。可选值：<br>"0"：不保存。<br>"1"：保存。<br>默认值："0" |
| ∟ maxDuration | `number` | 否 | 拍摄视频时支持的最长拍摄时间。单位为秒，时间范围为 3s 至 60s 之间。不限制相册。示例值：30<br>默认值：60 |
| ∟ mediaType | `array<string>` | 否 | 文件类型。可选值：<br>["image"]：图片。<br>["video"]：视频。<br>["video", "image"]：视频或图片，不分顺序。<br>默认值：["image", "video"] |
| ∟ sizeType | `array<string>` | 否 | 选择原图或进行压缩。可选值：<br>["original"]：选择原图。<br>["compressed"]：强制对图片质量进行压缩。<br>["original","compressed"]：默认开启压缩，通过相册选取时可手动选择原图。<br>默认值：["original","compressed"]<br>注意：目前压缩仅图片生效，视频暂不支持压缩。 |
| ∟ sourceType | `array<string>` | 否 | 指定视频来源。可选值：<br>["album"]：相册。<br>["camera"]：相机。<br>["album", "camera"]：相册或相机，不分顺序。<br>默认值：["album", "camera"]<br>注意：PC 端暂不支持设置该字段，默认为本地文件系统。 |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| tempFiles | `array<object>` | 临时文件数组 |
| ∟ duration | `number` | 视频时长，单位：秒（s）。选取文件类型为 video 时返回该字段。<br> PC 端暂不支持返回该字段。 |
| ∟ height | `number` | 图片/视频高度，单位 px。<br>PC 端暂不支持返回该字段。 |
| ∟ size | `number` | 图片/视频文件大小。单位：字节（Bytes） |
| ∟ tempFilePath | `string` | 文件地址 |
| ∟ type | `union` | 文件类型。可能值有:<br>image:图片<br>video:视频 |
| ∟ width | `number` | 图片/视频宽度，单位 px。<br>PC 端暂不支持返回该字段。 |
## 示例代码
```ts
window.ksoxz_sdk.chooseMedia({ params, onSuccess, onError });
```
     

## 错误码

| errno   | msg                            | 含义                        |
| ------- | ------------------------------ | --------------------------- |
| 1041001 | user canceled                  | 用户取消操作                |
| 1021003 | Camera permission not obtained | 用户未授予 App 系统相机权限 |
| 1021004 | Album permission not obtained  | 用户未授予 App 系统相册权限 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
