# config

## 描述
用于对使用到的网页应用JSAPI进行鉴权，具体鉴权操作方法参见：[鉴权流程](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;3.10.0 |
| Android | &gt;&#x3D;3.10.0 |
| PC | &gt;&#x3D;3.10.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ appId | `string` | 是 | 鉴权的应用ID |
| ∟ nonceStr | `String` | 是 | 生成签名时用到的随机字符串 |
| ∟ signature | `String` | 是 | 生成的签名 |
| ∟ timeStamp | `number` | 是 | 生成签名时用到的时间戳 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.config(
params:{
 appId: '1234567890', 
 timeStamp: 1234567890, 
 nonceStr: '1234567890', 
 signature: '1234567890'
 },
 onSuccess, 
 onError
 })
```
     

## 错误码

| errno   | msg                 | 含义                                                                                 |
| ------- | ------------------- | ------------------------------------------------------------------------------------ |
| 1001101 | App ID not exist    | App ID 不存在                                                                        |
| 1001102 | App not enabled     | 应用未启用                                                                           |
| 1401003 | Signature error     | 签名错误，构建的 signature 字段传递至服务端验证时，与服务端构建的 signature 不一致。 |
| 1401004 | Auth ticket expired | 鉴权 ticket 过期。                                                                   |

除以上错误外，还可能存在公共错误码，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
