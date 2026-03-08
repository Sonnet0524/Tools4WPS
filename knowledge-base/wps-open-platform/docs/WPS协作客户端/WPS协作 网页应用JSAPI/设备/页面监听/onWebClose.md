# onWebClose 
## 描述
页面返回事件的回调监听。
调用该接口，客户端产生回调，开发者可监控此关闭事件，处理自己的业务逻辑。

## 支持说明

| 客户端平台 | WPS协作版本要求 |
| ---------- | --------------- |
| iOS        | >=2.17.0         |
| Android    | >=2.17.0         |
| PC         | >=2.17.0        |

## 示例代码

```js
//需要拦截页面关闭事件时，需声明全局方法onWebClose，客户端在页面关闭时将触发此全局方法
window.onWebClose = function () {
    console.log('onWebClose invoke')
  //处理页面逻辑
  //...
 //返回的boolean参数代表是否立即拦截页面，true为拦截 返回false将立即关闭页面
  return true
}

```
