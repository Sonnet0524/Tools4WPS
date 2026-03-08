# canIUse

## 描述
用于判断接口是否可以在当前客户端版本运行。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.3.0 |
| Android | &gt;&#x3D;2.3.0 |
| PC | &gt;&#x3D;2.3.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ name | `string` | 是 | 方法名 |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| result | `boolean` | 客户端是否支持此 api。 |
## 示例代码
```ts
const result = await window.ksoxz_sdk.canIUse('shareMessage')
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
