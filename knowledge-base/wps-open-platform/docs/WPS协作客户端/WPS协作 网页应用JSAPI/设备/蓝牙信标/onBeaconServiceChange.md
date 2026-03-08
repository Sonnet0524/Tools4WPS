# onBeaconServiceChange

## 描述
监听 Beacon 服务状态变化事件，仅能注册一个监听。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。<br>注意事项：需要先调用startBeaconDiscovery。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.24.0 |
| Android | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onChange |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| available | `boolean` | 服务目前是否可用。 |
| discovering | `boolean` | 目前是否处于搜索状态。 |

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
