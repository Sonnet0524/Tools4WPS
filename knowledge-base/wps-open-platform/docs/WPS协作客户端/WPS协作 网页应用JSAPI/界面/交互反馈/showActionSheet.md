# showActionSheet

## 描述
用于显示操作菜单。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.15.0 |
| Android | &gt;&#x3D;2.15.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ items | `array<string>` | 是 | sheet 数据集，最多 6 个。 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| selectIndex | `number` | 选中的按钮索引，从 0 开始，-1 为点击了取消。 |
## 示例代码
```ts
const params = {
  items: ['选项1', '选项2', '选项3']
};
window.ksoxz_sdk.showActionSheet({params, onSuccess, onError});
```
     

## 错误码

参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
