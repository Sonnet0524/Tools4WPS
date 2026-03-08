# scan

## 描述
调起相机扫描一维码、二维码并返回扫描结果。  
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
  | ∟ barCodeInput | `boolean` | 否 | 是否支持手动输入条形码<br>默认值: false |
| ∟ needResult | `number` | 否 | 是否需要回传扫描接口<br>可能值:<br>• 0：不需要，由客户端处理扫码结果，不触发结果回调<br>• 1：需要，由网页应用处理扫码结果<br>默认值: 0 |
| ∟ onlyFromCamera | `boolean` | 否 | 是否只能从相机扫码，不允许从相册选择图片<br>默认值: false |
| ∟ scanType | `array<string>` | 否 | 扫码类型，支持传入多个类型<br>可能值:<br>• barCode：一维码<br>• qrCode：QrCode 码<br>• datamatrix: Data Matrix 码<br>• pdf417: PDF417 码<br>默认值: ["barCode","qrCode","datamatrix","pdf417"] |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| scanType | `string` | 识别到的图形码的类型<br>可能值:<br>• CODE_39: Code 39码<br>• CODE_93: Code 93码<br>• CODE_128: Code 128码<br>• EAN_8: EAN-8码<br>• EAN_13: EAN-13码<br>• ITF: ITF码<br>• UPC_E: UPC-E码<br>• QR_CODE: 二维码<br>• DATA_MATRIX: Data Matrix码<br>• PDF_417: PDF417码<br>• USER_INPUT: 用户输入 |
| text | `string` | 一维码、二维码包含的文本内容 |
## 示例代码
```ts
const params = {
  needResult:1
};
window.ksoxz_sdk.scan({params,onSuccess,onError});
```
     

## 错误码
| errno   | msg                 | 含义                                                                                 |
| ------- | --------------------| ----------------------- |
| 1021003 | Camera permission not obtained | 用户未授予 App 相机权限 |
| 1041001 | User canceled                  | 用户取消操作            |

除以上错误外，还可能存在公共错误码，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
