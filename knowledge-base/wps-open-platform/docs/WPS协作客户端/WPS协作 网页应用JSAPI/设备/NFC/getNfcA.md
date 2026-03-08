# getNfcA

## 描述
用于获取NfcA实例，实例支持NFC-A (ISO 14443-3A)标准的读写  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.31.0 |
| Android | &gt;&#x3D;5.31.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| closeNfcA | `Function` | 断开与 NfcA 标签之间的连接 |
| connectNfcA | `Function` | 连接 NfcA 类型的标签 |
| getNfcAAtqa | `Function` | 获取 ATQA 信息 |
| getNfcAMaxTransceiveLength | `Function` | 获取最大传输长度 |
| getNfcASak | `Function` | 获取 SAK 信息 |
| setNfcATimeout | `Function` | 设置超时时间 |
| transceiveNfcA | `Function` | 发送数据给 NfcA 类型的标签 |
## 示例代码
```ts
const adapt = window.ksoxz_sdk.getNFCAdapter({onSuccess, onError});
const nfcA = adapt.getNfcA({onSuccess, onError});
```
     

## 错误码

| 1001999 |               Internal error                |          内部错误           |
| :-----: | :-----------------------------------------: | :-------------------------: |
| 1505001 |            NFC is not avaliable             |       手机不支持 NFC        |
| 1505002 |       NFC tag has not been discovered       | 系统未发现 NFC 标签 (仅Android) |
| 1505003 |              unavailable tech               |  当前 NFC 标签不支持该tech  |
| 1505004 |              NFC type is empty              |    NFC type为空 (仅Android)     |
| 1505005 |           Tech has not connected            |         NFC 未连接          |
| 1505006 |              nfc service dead               |     会话已失效 (仅 iOS)     |
| 1505007 | Failed to write NdefMessage to the NFC card |      写入失败 (仅 iOS)      |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
