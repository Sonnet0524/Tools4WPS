# compressImage

## 描述
压缩图片。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.24.0 |
| Android | &gt;&#x3D;5.24.0 |
| PC | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ filepath | `string` | 是 | 图片的本地存储路径。<br>注意：这里的路径指通过其他JSAPI返回的路径。<br>如："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04" |
| ∟ quality | `number` | 否 | 取值范围 (0,100) ，数值越小，质量越低，压缩率越高（仅对 jpg 有效）。<br>最小值：1<br>最大值：100<br>默认值：80 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| tempFilePath | `string` | 压缩后的图片路径。<br>iOS 端：统一返回压缩后的 jpeg 图片。<br>Android/PC 端：仅当输入图片为 jpg/jpeg 时压缩，其余格式不做压缩，并按原始图片返回。 |
## 示例代码
```ts
const params = {
  filepath: 'ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04',
  quality: 80
};
window.ksoxz_sdk.compressImage({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                       | 含义             |
| ------- | ------------------------- | ---------------- |
| 1042001 | no such file or directory | 找不到文件或目录 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
