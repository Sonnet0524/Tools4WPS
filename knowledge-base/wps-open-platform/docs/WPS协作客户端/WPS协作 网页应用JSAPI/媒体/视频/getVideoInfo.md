# getVideoInfo

## 描述
获取视频详细信息。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>仅支持 mp4、mov、m4v 视频格式。  

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
  | ∟ src | `string` | 是 | 视频的路径，支持本地文件路径。<br>注意：这里的径指通过其他JSAPI返回的路径。如："ksoxz://temp/e1f7c67d89ef4da69337ce35e66e2e04" |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| duration | `number` | 视频长度，单位：秒（s） |
| height | `number` | 视频的长，单位 px |
| path | `string` | 视频的本地路径 |
| size | `number` | 视频大小，单位kb |
| type | `string` | 视频格式，如："video/mp4" |
| width | `number` | 视频的宽，单位 px |
## 示例代码
```ts
const params = {
  src: ''
};
window.ksoxz_sdk.getVideoInfo({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg                            | 含义             |
| ------- | ------------------------------ | ---------------- |
| 1042001 | no such file or directory      | 找不到文件或目录 |
| 1704001 | unsupported video format       | 不支持的视频格式 |
| 1704002 | can't get info from video file | 获取视频信息失败 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
