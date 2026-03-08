# invokeCustomAPI

## 描述
执行自定义JSAPI，该接口适用在移动端集成协作中台SDK或插件定制场景，用于拓展自定义JSAPI。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.20.0 |
| Android | &gt;&#x3D;5.20.0 |
| PC | &gt;&#x3D;5.20.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ data | `object` | 否 | 自定义参数，由SDK的接入方自行协商定义。 |
| ∟ name | `string` | 是 | API名称 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| result | `object` | 由SDK的接入方自定义，客户端负责透传。 |
## 示例代码
```ts
const params = {
 name:'yourCustomJSAPI'
};
window.ksoxz_sdk.invokeCustomAPI({params, onSuccess, onError});
```
     

## 错误码

| errno | msg          | 含义                                         |
| ----- | ------------ | -------------------------------------------- |
| 10001 | Custom error | 自定义错误，自定义信息通过 extras 字段获取。 |

除以上错误外，还可能存在公共错误码，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
