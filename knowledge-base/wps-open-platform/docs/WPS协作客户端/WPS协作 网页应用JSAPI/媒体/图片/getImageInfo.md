# getImageInfo

## 描述
获取图片信息。  
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
  | ∟ src | `string` | 是 | 图片的路径。支持网络路径和本地路径。<br>> 注意：这里的本地路径指通过其他JSAPI返回的路径。如："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04" |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| height | `number` | 图片原始高度，单位：px。不考虑旋转。 |
| imageSize | `number` | 图片大小，单位byte |
| path | `string` | 图片的本地路径。 |
| width | `number` | 图片原始宽度，单位：px。不考虑旋转。 |
## 示例代码
```ts
const params = {
  src: 'https://qn.cache.wpscdn.cn/koa/static/avatar_v2/schedule_avatar.png'
};
window.ksoxz_sdk.getImageInfo({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                       | 含义                                                                                                                                                                                                     |
| ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1042001 | no such file or directory | 找不到文件或目录                                                                                                                                                                                         |
| 1043100 | Request error             | 请求开发者接口错误。请根据 extras 字段返回信息获取上传接口的业务报错，extras 包含字段为`statusCode`： Http 状态码`response`：响应体，base64 字符串。`header`：开发者服务器返回的 header，base64 字符串。 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
