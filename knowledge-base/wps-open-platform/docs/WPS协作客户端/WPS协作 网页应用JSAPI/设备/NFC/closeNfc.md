# closeNfc

## 描述
断开与 Nfc 标签之间的连接  
> 断开当前与 Nfc 标签的连接。  

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
- 无返回值
## 示例代码
```ts
const adapt = window.ksoxz_sdk.getNFCAdapter({onSuccess, onError});
const Nfc = adapt.getNfc({onSuccess, onError});
Nfc.closeNfc({onSuccess, onError});
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
