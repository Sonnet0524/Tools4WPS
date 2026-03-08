# chooseChat

## 描述
打开用户会话列表的选择会话。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;5.24.0 |
| Android | &gt;&#x3D;5.24.0 |
| PC | &gt;&#x3D;5.24.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ allowCreateGroup | `boolean` | 否 | 是否允许在选择会话列表内，创建群组并转发，取值：<br>true：允许<br>false：不允许<br>默认值为true。 |
| ∟ confirmDesc | `string` | 否 | 选中会话后，确认弹框的描述。该字段为空时，界面将不展示描述框。 |
| ∟ confirmText | `string` | 否 | 选中会话后，确认弹框的确认按钮文案。默认值："发送" |
| ∟ confirmTitle | `string` | 否 | 选中会话后，确认弹框的标题名称。<br>默认值："发送给"。 |
| ∟ multiSelect | `boolean` | 否 | 是否允许多选，取值为 true 时，支持在会话列表选择多个会话（最多可选择 10 个）。取值：<br>true：允许<br>false：不允许<br>默认值为false。 |
| ∟ selectType | `number` | 否 | 选择模式，可选值：<br>0：选择单聊和群聊<br>1：只选择单聊<br>该模式下，allowCreateGroup 设置为 true 将不会生效<br>2：只选择群聊<br>默认值为0。 |
| ∟ showMessageInput | `boolean` | 否 | 选中会话后，确认弹框内是否显示留言输入框，取值：<br>true：显示<br>false：不显示<br>默认值为false。 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| data | `array<object>` | 选择会话列表信息 |
| ∟ avatarUrls | `array<string>` | 会话的头像 URL数组 |
| ∟ chatType | `number` | 会话类型<br>1：单聊<br>2：群聊 |
| ∟ id | `string` | 会话 ID（chat_id） |
| ∟ name | `string` | 会话名称 |
| message | `string` | 用户输入的留言，当输入字段 `showMessageInput` 为 `true` 时才会输出该字段 |
## 示例代码
```ts
const params = {
   allowCreateGroup: true,
   multiSelect: true,
   selectType: 0,
   confirmTitle: '发送给',
   confirmText: '发送',
   confirmDesc: '请选择会话',
   showMessageInput: true  
};
window.ksoxz_sdk.chooseChat({params, onSuccess, onError});
```
     

## 错误码

| errno   | msg           | 含义         |
| ------- | ------------- | ------------ |
| 1041001 | User canceled | 用户取消操作 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
