# WPS协作 Deeplink协议

## 协议结构

WPS 协作协议是一个 URL 协议，可以用于打开 WPS 协作或者其中一个页面，例如：ksoxz://xz.wps.cn/nativeapp?app_id=xxxxxx 就是一个协议。

| 字段   | 值                       |                                               说明                                               |
| :----- | :----------------------- | :----------------------------------------------------------------------------------------------: |
| scheme | ksoxz:                   |                                              固定值                                              |
| host   | xz.wps.cn                |                                              固定值                                              |
| path   | 对应不同的协议           | /chat（聊天页面）<br/> /webview（浏览器）<br/> /webapp（网页应用）<br/> /home（客户端 tab 跳转） |
| params | 不同的协议会有不同的定义 |                                 例如：app_id：表示应用的唯一标识                                 |

当 WPS 协作协议在其不支持的 WPS 协作版本上打开时，将会显示为：当前版本不支持该协议，请升级客户端版本

<br/>

## 协议应用

### WPS 协作外部打开

在一些条件下，点击 WPS 协作协议可以直接打开 WPS 协作，这些条件与系统、应用、网络等因素有关系。

在 WPS 协作外部点击 WPS 协作协议，可能会伴随弹窗提示，不同的浏览器上表现会略有差异。

![deeplink](https://cloudcdn.qwps.cn/open/_img/5d1977be91.jpg)

<div style="text-align: center">（图1：外部浏览器通过DEEPLINK拉起会话）</div>
<br/>

### WPS 协作内部打开

客户端内支持以下渠道打开 WPS 协作协议

- 移动端扫码。
- 聊天消息中的 WPS 协作协议链接跳转。
- 消息卡片中的 WPS 协作协议链接跳转。
- 应用内网页中的 WPS 协作协议链接跳转。

<br/>

## 已支持的协议


### 打开 WPS 协作

#### 使用场景
唤起 WPS 协作客户端
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/open
#### 参数说明
无

<br/>

### 聊天页面
#### 使用场景
支持拉起聊天对话页面
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/chat
#### 参数说明
| params  | 是否必传 | 数据描述              |
| :------ | :------- | :-------------------- |
| chat_id  | 否 | 会话ID              |
| user_id  | 否 | WPS用户ID              |

注：支持以下方式指定会话
- chat_id
- user_id

以上两种方式互斥，选择任一方式填写参数即可。

#### 使用示例
跳转到WPS协作指定聊天页面<br>
ksoxz://xz.wps.cn/chat?chat_id=xxxx

<br/>

### 发送消息
#### 使用场景
- 跳转对应的会话并发送消息。
- 支持指定会话发送或由用户手动选择会话发送。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/sendMsg
#### 参数说明
| params  | 是否必传 | 数据描述              |
| :------ | :------- | :-------------------- |
| chat_id  | 否 | 会话ID              |
| user_id  | 否 | WPS用户ID              |
| msg_type   | 是 | 消息类型。可选值： <br> 0：文本消息 <br>23：卡片消息                           |
| content | 是 | 根据内容JSON字符串数据，根据msg_type变化，具体内容结构见下表<br>注意:该参数必须进行UrlEncode编码 |

注：<br> 1、支持以下方式指定会话，以下两种方式互斥，选择任一方式填写参数即可。
- chat_id
- user_id 

<br>2、支持不指定会话发送消息，当不指定会话时，会唤醒通讯录选择器由用户手动选择用户或会话发送

#### 纯文本消息（msg_type=0)
| 参数  | 数据类型 | 是否必传              | 数据描述              |
| :------ | :------- | :-------------------- |:-------------------- |
| text  | string | 是              | 消息内容|

<br>

#### 卡片消息（msg_type=23)
| 参数  | 数据类型 | 是否必传              | 数据描述              |
| :------ | :------- | :-------------------- |:-------------------- |
| title  | string | 是              | 卡片标题|
| text  | string | 是              | 卡片内容|
| image  | string | 是              | 卡片配图url|
| url  | string | 是              | 卡片链接|
| appid  | string | 是              | 应用id|
| auto_send  | number | 是              | 是否自动发送，可选值<br>0:不自动发送<br>1：自动发送<br>默认值：0|


#### 使用示例
打开指定群聊并自动发送一条内容为hello的文本消息，content内容注意进行URL编码
<br>ksoxz://xz.wps.cn/sendMsg?chat_id=12345678&msg_type=0&content=%7B%22text%22%3A%22hello%22%7D

content字段url解码后的内容
```
{
    "text":"hello"
}
```
<br>

### 浏览器
#### 使用场景
打开网页容器访问指定链接。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/webview
#### 参数说明
| params  | 数据类型|是否必传 | 数据描述              |
| :------ | :------- | :------- | :-------------------- |
| url  | string|是 | 目标页面链接 <br>注意:该参数必须进行UrlEncode编码              |


#### 使用示例
打开网页容器访问指定链接。<br>
ksoxz://xz.wps.cn/webview?url=https%3A%2F%2Fwww.kimxz.com%2F

<br/>

### 网页应用
#### 使用场景
打开网页应用容器。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/webapp
#### 参数说明


| params        | 数据类型 |是否必填| 数据描述                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :------------ | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| app_id        | string   |是 |  应用 ID        |
| url           | string   | 否 | 应用链接（UrlEncode）   |
| target_path   | string   | 否 | 指定要打开网页应用的某个页面路径。配置 target_path 参数后，此参数将会被添加到或者替换网页应用原始 url 中的 path 部分（原始 url 是在开发者后台的网页应用配置页进行配置的），生成要打开页面的最终 url。**注意：**<br/> 1. target_path 需要 Encode <br/> 2. target_path 不能出现'#'和'?'这样的字符（即不能携带 query 参数和 fragment），否则会造成要打开的页面 url 结构异常，导致页面打开的表现不符合预期 <br/> 3. target_path 和 url 参数互斥，当 path 和 url 两个参数同时传递时，优先处理 url 参数 <br/>**使用举例：**<br/> 假设当前应用的主页为：https://open.wps.cn/aaa/bbb ，现拼接协议地址为：ksoxz://xz.wps.cn/webapp?app_id=xxxxxx&path=path1，其中 path1 的值为 `/ccc/ddd` Encode 后的值。<br/> 则最终访问地址为：https://open.wps.cn/ccc/ddd, 即 `/ccc/ddd` 替换了原地址的路径 `/aaa/bbb` |
| target_params | string   | 否 | 指定打开应用链接携带的自定义参数。配置 target_params 参数后，此参数将会被添加到网页应用原始 url 后面的 query 部分（原始 url 是在开发者后台的网页应用配置页进行配置的），生成要打开页面的最终 url。**注意：**<br/> 1. target_params 需要 Encode <br/> 2. target_params 不能出现除'&'外的字符，否则会造成要打开的页面 url 结构异常，导致页面打开的表现不符合预期 <br/> 3. target_params 和 url 参数互斥，当 target_params 和 url 两个参数同时传递时，优先处理 url 参数 <br/> **使用举例：**<br/> 假设当前应用的主页为：https://open.wps.cn/aaa/bbb?div3=444 ，现拼接协议地址为：ksoxz://xz.wps.cn/webapp?app_id=xxxxxx&target_params=param1，<br/> 其中 param1 的值为 `div1=111&div2=222` Encode 后的值。则最终访问地址为：https://open.wps.cn/aaa/bbb?div3=444&div1=111&div2=222                        |
| mode          | string   | 否 | main_webview：主窗口模式（4.10.0 及以上版本支持） <br/> sidebar：聊天界面右侧 <br/> window：独立窗口模式（3.13.0 及以上版本支持）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| toolbar       | string   | 否 | 当 mode=window，可以自定义工具栏按钮。多个配置项用英文逗号连接,不传此参数，窗口将使用应用的默认工具栏 <br/> none: 不显示工具栏 <br/> doc_create: 创建文档 <br/> history: 浏览记录 <br/> robot: 机器人会话 <br/> browser: 浏览器打开 <br/> share: 分享 <br/> more: 更多                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

![deeplink](https://cloudcdn.qwps.cn/open/_img/5edeb8b8bb.png)
<div style="text-align: center">（图2：独立窗口的工具栏示意）</div>

#### 使用示例
打开网页应用<br>
ksoxz://xz.wps.cn/webapp?app_id=xxx
<br>

打开网页应用并跳转到指定页面<br>
ksoxz://xz.wps.cn/webapp?app_id=xxx&target_path=y&target_params=p%3D2%26q%3D3
<br>
其中：
| 应用主页       | a.com/x?o=1&p=2   |
| :------------ | :------- |
| target_path （decode后）       | y   |
| target_parmas （decode后）       | p=2&q=3   |
| 最终打开链接       | a.com/y?o=1&p=2&p=2&q=3   |


<br/>

### 客户端 tab 跳转
#### 使用场景
跳转到协作客户端指定tab。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/home
#### 参数说明
| params  | 数据类型|是否必传 | 数据描述              |
| :----- | :------- | :------- |:----------------------------------------------------------------------------------------------------------------------------------------- |
| tab    | string|是   | message：消息<br/>document：文档<br/>worktable：工作台<br/>personal：我的<br/>meeting：会议<br/>calendar：日历<br/>email：邮箱 |


#### 使用示例
跳转到协作客户端消息tab<br>
ksoxz://xz.wps.cn/home?tab=message


<br/>

### 打开我的待办
#### 使用场景
跳转到我的待办页面。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/my-todo
#### 参数说明
无

#### 使用示例
跳转到我的待办页面。<br>
ksoxz://xz.wps.cn/my-todo

<br/>

### 打开我的待办详情
#### 使用场景
跳转到我的待办详情。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/todo-detail
#### 参数说明
| params  | 数据类型|是否必传 | 数据描述              |
| :------ | :------- | :------- | :-------------------- |
| taskId  | string | 是 | 待办ID              |
| teamId  | string|是 | 团队ID              |
| identity  | string| 否 | assumerid  虚拟席位 ID              |
#### 使用示例
打开指定待办详情<br>
ksoxz://xz.wps.cn/todo-detail?taskId=123&teamId=123

<br/>



### 发送邮件
#### 使用场景
发送邮件并携带云文档或本地文件。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/sendEmail
#### 参数说明
| params  | 数据类型|是否必传 | 数据描述              |
| :----- | :------- | :------- |:----------------------------------------------------------------------------------------------------------------------------------------- |
| wpsUid    | string   |是| WPS用户ID |
| type    | string   |是| localfile：本地文件 <br>yundoc：云文档 |
| fileName    | string   |否（type为localfile时必传）| 本地文件名称（type为localfile时填入） |
| fileSize    | string   |否（type为localfile时必传）| 本地文件大小（type为localfile时填入） |
| linkId    | string   |否（type为localfile时必传）| 云文档链接 ID（type为yundoc时填入） |

#### 使用示例
从邮箱中发送值班云文档：<br>
ksoxz://xz.wps.cn/sendEmail?wpsUid=123456&type=yundoc&linkId=123456<br>
从邮箱中发送本地文件：<br>
ksoxz://xz.wps.cn/sendEmail?type=localfile&wpsUid=123456&fileName=IMG123456.jpg&fileSize=7

<br/>


### 用户名片
#### 使用场景
打开用户名片。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/userDetail
#### 参数说明
| params | 数据类型 | 是否必传 | 数据描述              |
| :------  | :------- | :------- | :-------------------- |
| user_id  |string | 是 | WPS用户ID            |


#### 使用示例
打开指定用户名片（使用WPS用户ID）<br>
ksoxz://xz.wps.cn/userDetail?user_id=123456

<br/>

### 打开通讯录
#### 使用场景
跳转到通讯录页面。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/addressbook
#### 参数说明
| params          | 数据类型| 是否必传  | 数据描述      |
| :-------------- | :------- | :-------  | :------------ |
| app_id          | string |否  | 应用 ID       |
| deco_company_id | string  |否 | 混淆后企业 ID |
| deco_dept_id    | string  |否 | 混淆后部门 ID |
| company_id    | string  |否 | 解密后企业 ID |
| dept_id    | string  |否 | 解密后部门 ID | 

注：支持以下方式跳转到通讯录页面
- 当参数值使用混淆值时，需使用 app_id&deco_company_id&deco_dept_id
- 当参数值使用解密值时，需使用 company_id &dept_id
<br>以上两种方式互斥，选择任一方式填写参数即可。

#### 使用示例
跳转到通讯录指定部门（使用混淆ID）<br>
ksoxz://xz.wps.cn/addressbook?app_id=ak123&deco_company_id=xxxx&deco_dept_id=xxxx<br>

跳转到通讯录指定部门（使用解密ID）<br>
ksoxz://xz.wps.cn/addressbook?company_id=xxxx&dept_id=xxxx

<br/>

### 打开外部联系人列表
#### 使用场景
跳转到外部联系人通讯录列表页面。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/outerContact
#### 参数说明
无

#### 使用示例
跳转到外部联系人通讯录列表页面。<br>
ksoxz://xz.wps.cn/outerContact

<br/>


### toast 提示
#### 使用场景
弹出toast提示弹窗。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/toast
#### 参数说明
| params  | 数据类型| 是否必传 | 数据描述              |
| :------ | :------- | :------- | :-------------------- |
| body   | string   |是| 弹框提示内容(需要进行 UrlEncode)       |


#### 使用示例
弹出toast提示<br>
ksoxz://xz.wps.cn/toast?body=xxxxxx

<br/>

### 跳转到下载列表页
#### 使用场景
跳转到文件下载列表页。
#### 版本支持
| Android  | iOS | 
| :------ | :------- |
| 3.10.0  | 3.10.0 | 
#### 协议
ksoxz://xz.wps.cn/downloadList
#### 参数说明
无       


#### 使用示例
打开下载文件下载列表页<br>
ksoxz://xz.wps.cn/downloadList

<br/>

### 跳转到下载详情页
#### 使用场景
跳转到下载详情页。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/downloadDetail
#### 参数说明
| params | 数据类型|是否必传  | 数据描述 |
| :----- | :------- | :------- | :------- |
| fildId | string  | 是 | 文件 ID  |


#### 使用示例
打开下载文件下载详情页<br>
ksoxz://xz.wps.cn/downloadDetail?fileId=156856

<br/>

### deeplink 进入指定会议
#### 使用场景
支持唤起 WPS 协作客户端并进入指定的会议。
#### 版本支持
| Android  | iOS | PC              |
| :------ | :------- | :-------------------- |
| 3.10.0  | 3.10.0 | 3.10.0              |
#### 协议
ksoxz://xz.wps.cn/meeting
#### 参数说明
| params | 数据类型 |是否必传 | 数据描述 |
| :----- | :------- | :-------| :------- |
| code | string  |是 | 会议码  |


#### 使用示例
进入指定会议<br>
ksoxz://xz.wps.cn/meeting?code=123456789

<br/>

