# configureMenu

## 描述
自定义底部工具菜单条目。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>点击事件通过onSuccess回调通知。  

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
  | ∟ items | `array<object>` | 是 | 自定义菜单条目，为空则为清除 |
| ∟ ∟ callbackId | `string` | 是 | 点击事件回调ID |
| ∟ ∟ text | `string` | 是 | 菜单条目标题 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| callbackId | `string` | 事件回调ID，该接口调用成功会返回一个callbackId为null的事件；其它则代表相应的自定义item被点击 |
## 示例代码
```ts
const params = {
   items: [{
       text:"自定义1",
       callbackId:"custom1"
   }]
}
const onSuccess = (res) => {
   if(res.callbackId == null) {
       //configureMenu方法调用成功
       return;
   }
   switch(res.callbackId) {
       case "custom1":
       //点击了“自定义1”
       break;
   }
}
window.ksoxz_sdk.configureMenu({ params，onSuccess, onError });
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
