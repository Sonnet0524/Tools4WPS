# chooseFile

## 描述
选择本地文件。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.15.0 |
| Android | &gt;&#x3D;2.15.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ allowMultiple | `boolean` | 否 | 是否多选，主要取决于系统的支持，推荐先使用 false<br>默认值：false |
| ∟ mimeType | `array<string>` | 否 | 仅显示指定类型文件<br>类型参考 Multipurpose Internet Mail Extensions<br>默认为空，显示所有类型文件 |
| ∟ sourceType | `array<string>` | 否 | 指定文件来源<br>可选值：<br>["album"]：相册<br>["camera"]：相机<br>["file"]：系统文件选择器<br>["camera","album","file"]：相册或相机，不分顺序<br>默认值：["camera","album","file"]<br>注意：iOS 5.26.0 版本之后支持 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| fileInfos | `array<object>` | 文件信息列表 |
| ∟ fileName | `string` | 文件名称 |
| ∟ filePath | `string` | 文件路径，如："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04"<br>注意：该路径为映射值非设备真实路径，得到该路径时，一般配合其他接口的路径参数使用，如上传文件接口，可以传该路径返回作为路径参数。 |
| ∟ fileSize | `number` | 图片大小，单位byte |
| ∟ sha1 | `string` | 文件的 SHA1 哈希值<br>5.25.0 及以上版本支持 |
| ∟ sha256 | `string` | 文件的 SHA256 哈希值<br>5.25.0 及以上版本支持 |
## 示例代码
```ts
const params = {
  allowMultiple: false,
}
window.ksoxz_sdk.chooseFile({params,onSuccess,onError})
```
     

## 错误码

| errno   | msg                                    | 含义                                        |
| ------- | -------------------------------------- | ------------------------------------------- |
| 1021006 | Storage-Access permission not obtained | 用户未授予 App 文件写入权限（Android 特有） |
| 1041001 | user canceled                          | 用户取消操作                                |
| 1021003 | Camera permission not obtained         | 用户未授予 App 相机权限（ iOS 特有）        |
| 1021004 | Album permission not obtained          | 用户未授予 App 相册权限（iOS 特有）         |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
