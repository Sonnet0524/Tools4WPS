# chooseContact

## 描述
打开联系人选择器，可以选择用户或部门，并返回选择的用户和部门信息。  
> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth)后调用该接口。  

## 支持说明
| 客户端平台 | WPS协作版本要求 | 
|------------|----------|
| iOS | &gt;&#x3D;2.7.0 |
| Android | &gt;&#x3D;2.7.0 |
| PC | &gt;&#x3D;2.7.0 |


## 输入
| 名称 | 数据类型 | 是否必填 | 描述 |
|------|----------|----------|------|
| params |` object `| 是 |  |
  | ∟ dataSourceUsers | `array<number>` | 否 | 自定义显示成员wpsUid。选用此参数时，通讯录列表仅展示此参数下的人员清单 |
| ∟ dataSourceXZUsers | `array<number>` | 否 | 自定义显示成员协作xzUserId |
| ∟ executive | `boolean` | 否 | 是否启用高管模式。<br>默认值false |
| ∟ isSupportSelectDepartment | `boolean` | 否 | 是否可选择部门。<br>默认值true |
| ∟ isSupportSelectGroupMember | `boolean` | 否 | 是否可以选择群聊成员。<br>默认值true |
| ∟ maxUsers | `number` | 否 | 多选时，最大选择人数。<br>默认值500<br><br>注意：需要multiple参数为true时生效 |
| ∟ multiple | `boolean` | 否 | 是否多选。<br>默认值true |
| ∟ pickedDepartments | `array<number>` | 否 | 已选部门 ID |
| ∟ pickedUsers | `array<number>` | 否 | 已选成员 wpsUid。 |
| ∟ recentChatType | `number` | 否 | 最近联系人显示的会话类型,可能值有:<br>0：包含单聊、群聊<br>1: 单聊。<br>2: 群聊。 |
| ∟ relatedOrganizations | `boolean` | 否 | 是否展示关联组织。<br>默认值true |
| ∟ returnUserOnly | `boolean` | 否 | 是否只返回用户列表。可能值：<br>• false：返回选中的成员和部门<br>• true：只返回用户列表，当选中部门时，会返回部门下的所有成员，而不返回选中的部门<br>默认值false |
| ∟ showAIAgentEntrance | `boolean` | 否 | 是否需要展示数字员工tab(5.33新增)<br>默认值：false |
| ∟ showExternalContactEntrance | `boolean` | 否 | 是否显示外部联系人。<br>默认值false |
| ∟ showGroupEntrance | `boolean` | 否 | 是否显示群聊入口。<br>默认值false |
| ∟ showOutsourceEntrance | `boolean` | 否 | 是否显示v7外部联系人。<br>默认值false |
| ∟ showRecentEntrance | `boolean` | 否 | 是否显示最近联系人。<br>默认值false |
| ∟ title | `string` | 否 | 选择页面展示的标题。<br><br>注意：PC该页面没有主标题，不支持该参数 |
| onSuccess |` Function `| 否 |  |
| onError |` Function `| 否 |  |
## 输出
| 名称          | 类型     | 描述         |
|---------------|----------|--------------|
| agents | `array<object>` | 选中的数字员工 |
| ∟ avatar | `string` | 数字员工头像 |
| ∟ id | `number` | 数字员工id |
| ∟ name | `string` | 数字员工名称 |
| departments | `array<object>` | 选中的部门集合 |
| ∟ companyId | `number` | 企业id |
| ∟ departmentId | `string` | 部门id |
| ∟ departmentName | `string` | 部门名称 |
| groups | `array<object>` | 选中的群聊集合 |
| ∟ chatId | `number` | 群聊id |
| ∟ chatName | `string` | 群聊名称 |
| users | `array<object>` | 选中的用户集合 |
| ∟ avatar | `string` | 用户头像 |
| ∟ companyId | `number` | 企业 id |
| ∟ userId | `number` | 用户id |
| ∟ userName | `string` | 用户姓名 |
## 示例代码
```ts
const params = {
   maxUsers: 20,
   pickedUsers:[21866056,65446616],
   pickedDepartments:[10093492,10009041]
};
window.ksoxz_sdk.chooseContact({
 params,
 onSuccess, 
 onError,
})
```
     

## 错误码

| errno   | msg           | 含义         |
| ------- | ------------- | ------------ |
| 1041001 | User canceled | 用户取消操作 |

除以上错误外，还可能存在公共错误，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)
