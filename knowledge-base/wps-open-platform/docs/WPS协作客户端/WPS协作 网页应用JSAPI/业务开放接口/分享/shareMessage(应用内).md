# shareMessage（第三方 app）

分享内容到应用内的会话。

> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth.html)后调用该接口。

## 支持说明

| 客户端平台 | WPS 协作版本要求 |
| ---------- | ---------------- |
| iOS        | >=2.1.0          |
| Android    | >=2.1.0          |
| PC         | >=2.1.0          |

## 输入

| 参数                | 类型                | 是否必须 | 描述                                                                                                 |
| ------------------- | ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| type                | String              | 是       | 分享的消息类型。可能值：<br>text：普通文本消息<br/>markdown：Markdown 消息<br/>webPage：协作卡片消息 |
| content             | TextMarkdownWebPage | 是       | 具体数据类型由传入的 type 决定不同消息类型传入的数据结构见 Text/Markdown/WebPage 对象说明。          |
| showAIAgentEntrance | boolean             | 否       | 是否需要展示数字员工 tab,默认为 false(5.33新增)                                                                |

**Text 对象**

| 参数 | 类型   | 是否必须 | 描述           |
| ---- | ------ | -------- | -------------- |
| text | String | 是       | 分享的文本内容 |

**Markdown 对象**

| 参数 | 类型   | 是否必须 | 描述           |
| ---- | ------ | -------- | -------------- |
| text | String | 是       | 分享的文本内容 |

**WebPage 对象**

| 参数  | 类型   | 是否必须 | 描述                            |
| ----- | ------ | -------- | ------------------------------- |
| url   | String | 是       | 分享的 url                      |
| title | String | 是       | 分享标题                        |
| image | String | 否       | 分享配图 url，缺省使用 app 图标 |
| text  | String | 否       | 分享描述文本                    |

## 输出

| 名称            | 类型    | 描述             |
| --------------- | ------- | ---------------- |
| users           | User[]  | 用户集合         |
| groups          | Group[] | 群聊会话集合     |
| shareFailUsers  | User[]  | 发送失败用户集合 |
| shareFailGroups | Group[] | 发送失败会话集合 |
| agents          | Agent[] | 选中的数字员工   |

**User 对象**

| 名称      | 类型   | 描述                |
| --------- | ------ | ------------------- |
| avatar    | String | 用户头像地址        |
| name      | String | 用户名称            |
| userid    | Number | 用户 ID             |
| chatid    | Number | 会话 ID             |
| companyid | Number | 企业 ID             |
| xzUserid  | Number | 协作 uid （不对外） |

**Group 对象**

| 名称   | 类型   | 描述     |
| ------ | ------ | -------- |
| chatid | Number | 会话 ID  |
| name   | String | 会话名称 |

**Agent 对象**

| 名称   | 类型   | 描述         |
| ------ | ------ | ------------ |
| id     | number | 数字员工 id  |
| name   | String | 数字员工名称 |
| avatar | string | 数字员工头像 |

## 示例代码

```
const params = {
    type: 'webPage',
    content: {
        title: '金山软件欢迎你加入',
        url: 'https://www.kingsoft.com/',
        text: '描述内容xxx',
        image: 'https://bkimg.cdn.bcebos.com/pic/810a19d8bc3eb1352ac7091eac1ea8d3fd1f4416?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxMTY=,g_7,xp_5,yp_5/format,f_auto'
    }
};
window.ksoxz_sdk.shareMessage({params, onSuccess, onError})
```

## 错误码

| errno   | msg           | 含义         |
| ------- | ------------- | ------------ |
| 1041001 | User canceled | 用户取消操作 |

除以上错误外，还可能存在公共错误码，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)。
