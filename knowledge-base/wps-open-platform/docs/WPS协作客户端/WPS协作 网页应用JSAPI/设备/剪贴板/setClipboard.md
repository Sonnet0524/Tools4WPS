# setClipboard

## 描述
设置系统粘贴板数据。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.clipboard，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.7.0 |
| Android | &gt;&#x3D;2.7.0 |
| PC | &gt;&#x3D;2.7.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ text | `string` | 是 | 设置系统粘贴板数据。 |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
  text:'text'
};
window.ksoxz_sdk.setClipboard({params});
```
     

## 错误码

| errno   | msg                                          | 含义                         |
| ------- | -------------------------------------------- | ---------------------------- |
| 1002008 | User not granted webApp clipboard permission | 用户未授予网页应用剪切板权限 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
