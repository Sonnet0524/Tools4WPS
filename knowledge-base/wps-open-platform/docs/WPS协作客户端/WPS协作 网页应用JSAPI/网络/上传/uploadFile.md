# uploadFile

## 描述
将本地文件上传到网络。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.3.0 |
| Android | &gt;&#x3D;2.3.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ filePath | `string` | 是 | 要上传文件资源的路径，可通过chooseFile等接口获取 |
| ∟ formData | `object` | 否 | Http 请求中额外的 Form Data<br>注意：仅uploadType为1时有效 |
| ∟ header | `object` | 否 | HTTP 请求 Header<br>注意：header 不支持设置 referer，content-type不可变更 |
| ∟ method | `string` | 否 | 请求方法<br>可选值：<br>• POST<br>• PUT<br>默认为: POST |
| ∟ name | `string` | 否 | 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容<br>默认为：file<br>注意：仅uploadType为1时有效 |
| ∟ uploadType | `number` | 否 | 上传方式<br>可能值：<br>• 1：表单上传，content-type为multipart/form-data<br>• 2：二进制流上传<br>默认值：1 |
| ∟ url | `string` | 是 | 开发者服务器地址 |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| header | `object` | 开发者服务器返回的header，base64字符串 |
| response | `string` | 响应体，base64字符串 |
| statusCode | `number` | Http状态码<br>注意：5.24.0以上版本支持 |
## 示例代码
```ts
const header = {
 //开发者请求url自定义header
 token:"xxxxxxx"
}
const formData = {}
const params = {
 url:'https://www.ksyun.com/',
 filePath:'storage/emulated/0/Download/xxx.txt',
 header:header,
 formData:formData
};
// 调用sdk后会返回一个包含几个方法的uploadTask对象
const uploadTask = window.ksoxz_sdk.uploadFile({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                       | 含义                                                                                                                                                                                                     |
| ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1042001 | No such file or directory | 找不到文件或目录                                                                                                                                                                                         |
| 1043103 | Connect timed out         | 网络连接超时                                                                                                                                                                                             |
| 1043100 | Request error             | 请求开发者接口错误。请根据 extras 字段返回信息获取上传接口的业务报错，extras 包含字段为`statusCode`： Http 状态码`response`：响应体，base64 字符串。`header`：开发者服务器返回的 header，base64 字符串。 |

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
