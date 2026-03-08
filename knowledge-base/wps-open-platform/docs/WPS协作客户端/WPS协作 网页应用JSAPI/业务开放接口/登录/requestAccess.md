# requestAccess

## 描述
应用请求访问权限，用于请求登录授权码实现单点登录等场景。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.18.0 |
| Android | &gt;&#x3D;5.18.0 |
| PC | &gt;&#x3D;5.18.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ app_id | `string` | 是 | 应用ID |
| ∟ scope_list | `array<string>` | 否 | 需要授权的scope列表，当数组传空时，默认授予用户基础信息查询权限。<br>默认值：["kso.user_base.read"] |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| code | `string` | 临时登录凭证，该参数用于调用获取用户授权access_token接口。 |
## 示例代码
```ts
window.ksoxz_sdk.requestAccess({params:{scope_list: ['kso.user_base.read']}, app_id: '1234567890'})
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
