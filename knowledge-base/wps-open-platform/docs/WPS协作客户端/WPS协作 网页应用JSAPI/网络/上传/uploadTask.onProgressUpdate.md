# UploadTask.onProgressUpdate

`upoadFile`的调用结果在通过回调传递的同时会返回一个`uploadTask`对象，通过`onProgressUpdate`方法监听上传进度。

## 支持说明

| 客户端平台 | WPS协作版本要求 |
| :--------- | :-------------- |
| iOS        | >=2.3.0         |
| Android    | >=2.3.0         |

## 返回结果

| 名称       | 类型   | 描述                                 |
| ---------- | ------ | ------------------------------------ |
| totalBytes | Number | 预期需要上传的数据总长度，单位 Bytes |
| sentBytes  | Number | 已经上传的数据长度，单位 Bytes       |

## 示例代码

```
const uploadTask = window.ksoxz_sdk.uploadFile({params, onSuccess, onError});
// 如果需要对上传进度进行处理则可以调用
uploadTask.onProgressUpdate(({ totalBytes, sentBytes }) => {
   const persent = Math.floor(sentBytes * 100 / totalBytes)
})
```
