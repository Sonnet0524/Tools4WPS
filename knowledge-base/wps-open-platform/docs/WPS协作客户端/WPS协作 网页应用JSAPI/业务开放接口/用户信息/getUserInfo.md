# getUserInfo

## 描述
用于获取当前登录用户的用户信息。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>调用前需要[用户授权](/app-integration-dev/wps365/client/web-jsapi/jsapiUserAuth)scope.userInfo，你需要兼容用户拒绝授权的场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.8.0 |
| Android | &gt;&#x3D;5.8.0 |
| PC | &gt;&#x3D;5.8.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| userInfo | `object` | 用户信息 |
| ∟ avatar | `string` | 用户头像 |
| ∟ corpId | `string` | 企业ID |
| ∟ corpUserId | `string` | 企业用户ID |
| ∟ name | `string` | 用户名 |
| ∟ phone | `string` | 电话 |
| ∟ thirdUnionId | `string` | 通过通讯录接口同步的第三方企业用户id |
| ∟ userId | `string` | WPS用户ID |
| ∟ xzUserId | `string` | 协作用户ID |
## 示例代码
```ts
window.ksoxz_sdk.getUserInfo({onSuccess, onError});
```
     

## 错误码

| errno   | msg                                         | 含义                           |
| ------- | ------------------------------------------- | ------------------------------ |
| 1002005 | User not granted webApp userInfo permission | 用户未授予网页应用用户信息权限 |

除以上错误外，还可能存在公共错误码，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
