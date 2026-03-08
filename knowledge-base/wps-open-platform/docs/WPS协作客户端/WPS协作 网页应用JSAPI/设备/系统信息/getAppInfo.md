# getAppInfo

## 描述
获取当前客户端信息。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.35.0 |
| Android | &gt;&#x3D;2.35.0 |
| PC | &gt;&#x3D;2.35.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| appIcon | `string` | 客户端icon，返回icon的url （base64） |
| appName | `string` | 客户端名称<br>示例值：WPS协作 |
| appSettingInfo | `object` | 应用设置信息 |
| ∟ fontSizeLevel | `number` | 字体大小<br>PC端：0标准，1-3逐步增大<br>移动端：0为缩小，1为标准，0-4逐步增大 |
| ∟ isDarkMode | `boolean` | 是否开启深色模式。可能值：<br>true：开启<br>false：跟随系统/浅色模式 |
| channel | `string` | 客户端渠道号 |
| displayVersionName | `string` | 客户端展示版本号 |
| packageName | `string` | 客户端包名<br>示例值：com.woa.wps.cn |
| platform | `string` | 客户端平台。可能值：<br>• iOS：iOS平台<br>• Android：Android平台<br>• windows：Windows平台<br>• mac：Mac平台 |
| sdkVersion | `string` | 客户端woasdk包版本号 |
| showOpenUrlModal | `boolean` | 客户端打开外部链接是否弹窗提示<br>注意：仅PC端支持 |
| version | `string` | 客户端版本号<br>示例值：2.35.0 |
## 示例代码
```ts
window.ksoxz_sdk.getAppInfo({onSuccess,onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
