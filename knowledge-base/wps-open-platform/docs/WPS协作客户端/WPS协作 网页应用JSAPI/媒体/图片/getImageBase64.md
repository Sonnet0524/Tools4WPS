# getImageBase64

## 描述
获取图片base64，仅iOS端支持。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.15.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ filePath | `string` | 是 | 图片文件路径<br>注意：一般为通过其他JSAPI接口，如chooseImage获取的路径："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04" |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| imageBase64 | `string` | 图片base64 |
## 示例代码
```ts
const params = {
  filePath: ''
};
window.ksoxz_sdk.getImageBase64({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                       | 含义       |
| ------- | ------------------------- | ---------- |
| 1042001 | no such file or directory | 找不到文件 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
