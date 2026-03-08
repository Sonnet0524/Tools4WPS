# chooseGroupMember

## 描述
群成员选择器。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| PC | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ chatid | `number` | 是 | 群聊的 chatid |
| ∟ checkYourself | `boolean` | 否 | 是否默认选中自己<br>默认值: false<br>false: 成员列表中不会默认选中自己<br>true: 成员列表中默认选中自己 |
| ∟ maxUsers | `number` | 否 | 选择用户的上限 |
| ∟ pickedUsers | `array<number>` | 否 | 已选成员 ID |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| users | `array<object>` | 选中的用户集合 |
| ∟ avatar | `string` | 用户头像 |
| ∟ userId | `number` | 用户 id |
| ∟ userName | `string` | 用户姓名 |
## 示例代码
```ts
const params = {
 chatid: 1234567890,
};
window.ksoxz_sdk.chooseGroupMember({params});
```
     

## 错误码

| errno   | msg           | 含义         |
| ------- | ------------- | ------------ |
| 1041001 | User canceled | 用户取消操作 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
