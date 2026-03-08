# enterProfile

## 描述
用于打开用户名片。  
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
  | ∟ exUserId | `string` | 否 | 通过通讯录接口同步的第三方企业用户id<br>注意：userId与exUserId字段至少传一个，优先取userId |
| ∟ left | `number` | 否 | 用户卡片原点（左上角）横坐标<br>单位：px<br>默认值为0<br>注意：该字段仅PC有效 |
| ∟ top | `number` | 否 | 用户卡片原点（左上角）纵坐标<br>单位：px<br>默认值为0<br>注意：该字段仅PC有效 |
| ∟ userId | `string` | 否 | WPS用户ID<br>注意：userId与exUserId字段至少传一个，优先取userId |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
- 无返回值
## 示例代码
```ts
const params = {
 userId:'1604506864'
 left:0
 top:0
};
window.ksoxz_sdk.enterProfile({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
