# makePhoneCall

## 描述
拨打电话。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.7.0 |
| Android | &gt;&#x3D;2.7.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ phoneNumber | `string` | 是 | 拨打电话的号码 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
window.ksoxz_sdk.makePhoneCall({params:{phoneNumber: '1234567890'}},onSuccess,onError)
```
     

## 错误码

| errno   | msg                 | 含义                                   |
| ------- | ------------------- | -------------------------------------- |
| 1023004 | Phone not available | 设备不支持拨打电话（缺少相关硬件支持） |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
