# createGroupChat

## 描述
调用该接口进入创建群聊流程。  
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
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| status | `string` | 返回创建的状态<br>success、error |
## 示例代码
```ts
const params = {
   maxUsers: 20,
};
window.ksoxz_sdk.createGroupChat({params});
```
     

## 错误码

| errno   | msg           | 含义         |
| ------- | ------------- | ------------ |
| 1041001 | User canceled | 用户取消操作 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
