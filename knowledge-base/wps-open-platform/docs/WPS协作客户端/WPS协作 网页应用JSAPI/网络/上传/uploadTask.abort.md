# UploadTask.abort

`uplaodFile`调用结果在通过回调传递的同时会返回一个`uploadTask`对象，可以通过该对象的`abort`方法中断请求任务

## 支持说明

| 客户端平台 | WPS协作版本要求 |
| :--------- | :-------------- |
| iOS        | >=2.3.0         |
| Android    | >=2.3.0         |

## 示例代码

```
const sdkInstance = window.ksoxz_sdk.uploadFile({params, onSuccess, onError});

//取消上传
sdkInstance.abort()
```
