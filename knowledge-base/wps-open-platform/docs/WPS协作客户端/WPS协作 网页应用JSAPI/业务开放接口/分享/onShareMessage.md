# onShareMessage

页面分享事件的回调监听。

用户点击“分享”按钮后，客户端会回调网页 window.ksoxz_page.onShareMessage 方法获取分享内容，网页需要在 2000ms 内返回结果，如果超过 2000ms 未返回结果，则客户端会使用默认参数。

![img](https://cloud-pic.wpsgo.com/Mjg0Q3J0T205V1VOSUVPM3ArZUo3VmtVV1ZTZjQ3UDd6bHpYM3ZKcW02d3hCRk5WT01Yd29TTHNLWkQyb01DejJTYlhFSmNiZFF6Y09zRXdBQ0VEc2pJWFpCa0wrUG51bjNhUWd4VFkybFM2U011cDEzcHlmQTlvUXE4Z1VoTk5OcDZoY21yMWQ2UDR5dEZPd2o2cEZRWW1kWHFKUVVGN2cxTnZHaU9jaHpUNjVWaXJScW5tLzgzbkFGTzZPTEV3dHhmVHR5aUFzYmJ6N1VxQnZvOGc0VTBTZ1IrN1lmbVNxeG1Uai9pOTJDNXQzNThBQkVGWmZkODNkczBycTltTjVLK1lrUFIyUlRURnhvTzdnK3BQZFE9PQ==/attach/object/XN2JTOQYADAD2?)

![img](https://cloud-pic.wpsgo.com/Mjg0Q3J0T205V1VOSUVPM3ArZUo3VmtVV1ZTZjQ3UDd6bHpYM3ZKcW02d3hCRk5WT01Yd29TTHNLWkQyb01DejJTYlhFSmNiZFF6Y09zRXdBQ0VEc2pJWFpCa0wrUG51bjNhUWd4VFkybFM2U011cDEzcHlmQTlvUXE4Z1VoTk5OcDZoY21yMWQ2UDR5dEZPd2o2cEZRWW1kWHFKUVVGN2cxTnZHaU9jaHpUNjVWaXJScW5tLzgzbkFGTzZPTEV3dHhmVHR5aUFzYmJ6N1VxQnZvOGc0VTBTZ1IrN1lmbVNxeG1Uai9pOTJDNXQzNThBQkVGWmZkODNkczBycTltTjVLK1lrUFIyUlRURnhvTzdnK3BQZFE9PQ==/attach/object/IB3JTOQYAAQHS?)

## 支持说明

| 客户端平台 | WPS协作版本要求 |
| ---------- | --------------- |
| iOS        | >=4.9.0         |
| Android    | >=4.9.0         |
| PC         | >=4.9.0         |

## 示例代码

```js
ksoxz_page = {
  onShareMessage(params) {
    return new Promise((resolve) => {
      resolve({
        type: "webPage",
        content: {
          title: "自定义转发标题，默认为当前网页标题",
          url: "https://open-xz.wps.cn",
          text: "自定义转发文本内容，默认为应用描述",
          image: "自定义转发预览图，默认为应用图标",
        },
      });
    });
  },
};
```
