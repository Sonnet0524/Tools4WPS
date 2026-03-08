---
title: Product Introduction
breadcrumb: WPS365应用开发 > 产品简介
source: raw_md/app-integration-dev/wps365/server/introduce.md
---

# 产品简介

## 概述

WPS365产品作为办公新质生产力平台，全面面向一站式AI办公场景，目的为帮助企业或组织提高生产力。WPS365由WPS Office、WPS AI企业版、WPS协作套件等组成，包含云文档、智能文档、消息与会话、邮箱、待办、日历、会议、OFFICE客户端等业务域。[点此详细了解WPS365](https://365.wps.cn/)

在企业或组织内部，除WPS 365以外，通常也会存在其他IT系统，如OA、CRM、ERP或组织内的各类行业专业化系统等。这些系统与WPS365共同担负起组织数字化运行的职责，因此通常需要相互**融合、集成**，才能为员工带来更好的日常使用体验，并更大程度推进企业或组织完成数字化转型。

WPS365应用即面向这一类场景，各个业务域均提供了丰富的服务端WPS 365 OpenAPI、客户端JSAPI、回调事件等，对其他IT系统提供WPS 365内业务的查询、操作、对接能力。

## 常用业务域

WPS365具有近20个业务域，以下为您介绍几个典型业务域与其开放的能力。

**通讯录**

即WPS365的账号体系，企业通讯录包括部门、用户、用户组等不同层级。在通讯录方面，WPS365提供了部门/用户的查询、创建、删除、更新、移动等丰富的管理能力，可实现WPS365 账号体系与企业现有账号系统同步、单点登录等场景。同时也提供部门/用户的变更事件，第三方系统可以订阅监听WPS365账号的状态变化。

~常用API列表

| API名称 | 说明 | 权限要求 | 请求路径 |
|---------|------|----------|----------|
| [创建部门](/app-integration-dev/wps365/server/address-book/dept/create-dept) | 在企业下创建新的部门 | 查询和管理通讯录信息（应用授权） | [https://openapi.wps.cn/v7/depts/create](/app-integration-dev/wps365/server/address-book/dept/create-dept) |
| [创建用户](/app-integration-dev/wps365/server/address-book/user/create-user) | 在某个部门下创建新用户 | 查询和管理通讯录信息（应用授权） | [https://openapi.wps.cn/v7/users/create](/app-integration-dev/wps365/server/address-book/user/create-user) |
| [将用户加入到部门](/app-integration-dev/wps365/server/address-book/user/join-dept) | 将用户移动到某个部门下 | 查询和管理通讯录信息（应用授权） | [https://openapi.wps.cn/v7/depts/{dept_id}/members/{user_id}/create](/app-integration-dev/wps365/server/address-book/user/join-dept) |
| [查询部门下用户列表](/app-integration-dev/wps365/server/address-book/user/get-dept-user) | 查询某个部门下所有用户的信息 | 查询和管理通讯录信息（应用授权）<br>查询通讯录信息（应用授权） | [https://openapi.wps.cn/v7/depts/{dept_id}/members](/app-integration-dev/wps365/server/address-book/user/get-dept-user) |

[点此查看更多API](/app-integration-dev/wps365/server/address-book/company/get-company-info)

**云文档**

即WPS365的在线文档管理能力，云端文档可存储在个人空间、团队空间下的不同文件夹。云文档开放了文件（夹）创建管理、文件上传下载、文件分享、文件权限管理等文件全生命周期管理的能力，企业可实现三方系统与云文档的对接。如将邮件系统中的附件自动转存到云文档中、OA系统中直接上传云文档中的文件等。

~常用API列表

| API名称 | 说明 | 权限要求 | 请求路径 |
|---------|------|----------|----------|
| [新建驱动盘](/app-integration-dev/wps365/server/yundoc/drive/create-drive) | 即新建企业团队，团队文件存储在驱动盘中 | 管理驱动盘（应用授权）<br>管理驱动盘（用户授权） | [https://openapi.wps.cn/v7/drives/create](/app-integration-dev/wps365/server/yundoc/drive/create-drive) |
| [新建文件（夹）](/app-integration-dev/wps365/server/yundoc/file/create-file) | 在某个驱动盘下新建文件或文件夹 | 查询和管理文件（应用授权）<br>查询和管理文件（用户授权） | [https://openapi.wps.cn/v7/drives/{drive_id}/files/{parent_id}/create](/app-integration-dev/wps365/server/yundoc/file/create-file) |
| [获取文件下载信息](/app-integration-dev/wps365/server/yundoc/file/get-file-download) | 获取文件的下载链接 | 查询和管理文件（应用授权）<br>查询文件（应用授权）<br>查询和管理文件（用户授权）<br>查询文件（用户授权） | [https://openapi.wps.cn/v7/drives/{drive_id}/files/{file_id}/download](/app-integration-dev/wps365/server/yundoc/file/get-file-download) |
| [请求文件上传信息](/app-integration-dev/wps365/server/yundoc/file-transfer/get-upload-file) | 文件上传三部曲的首步 | 查询和管理文件（应用授权）<br>查询和管理文件（用户授权） | [https://openapi.wps.cn/v7/drives/{drive_id}/files/{parent_id}/request_upload](/app-integration-dev/wps365/server/yundoc/file-transfer/get-upload-file) |

[点此查看更多API](/app-integration-dev/wps365/server/yundoc/introduce)

**消息与会话**

即基于WPS协作提供的即时消息，WPS365开放了群聊管理、发送消息、查询消息等能力，企业可通过这一系列能力帮助各类业务建立更及时、高效的沟通渠道，如在工单系统中，就可以对接群聊管理接口，基于工单自动化建立相关人群聊。同时,WPS协作也提供了机器人的能力，可用于系统自动向用户推送消息，如邮件提醒、部门公告等。

~常用API列表

|  |  |  |  |
|:---|:---|:---|:---|
| **API名称** | **说明** | **权限要求** | **请求路径** |
| [发送消息](/app-integration-dev/wps365/server/im/message/single-create-msg) | 应用通过WPS协作给用户或会话发送消息 | 查询和管理会话消息（应用授权） | [https://openapi.wps.cn/v7/messages/create](/app-integration-dev/wps365/server/im/message/single-create-msg) |
| [创建会话](/app-integration-dev/wps365/server/im/chat/create-chat) | 创建单聊或群聊会话 | 查询和管理会话（应用授权） | [https://openapi.wps.cn/v7/chats/create](/app-integration-dev/wps365/server/im/chat/create-chat) |
| [批量添加群成员](/app-integration-dev/wps365/server/im/chat/batch-get-chat-member) | 在某个群聊中添加新成员 | 查询和管理会话（应用授权） | [https://openapi.wps.cn/v7/chats/%7Bchat_id%7D/members/batch_create](/app-integration-dev/wps365/server/im/chat/batch-get-chat-member) |
| [创建部门群](/app-integration-dev/wps365/server/im/dept-chat/create-dept-chat) | 基于某个部门创建群，群成员根据部门自动更新 | 读写部门群（应用授权） | [https://openapi.wps.cn/v7/chats/create_dept_chat](/app-integration-dev/wps365/server/im/dept-chat/create-dept-chat) |

[点此查看更多API](/app-integration-dev/wps365/server/im/message/message-content-description)

**工作台**

即基于WPS协作提供的工作台管理能力，企业可将内部系统上架到WPS协作工作台，将工作台作为办公门户。员工在日常办公时，只需要在工作台内即可打开所有三方系统，更为高效。

**客户端**

基于WPS Office客户端、WPS 协作客户端提供的JSAPI与前端能力，如为WPS Office嵌入加载项，或为文字、演示、表格等组件增加宏事件。

[点此查看更多API](https://open.wps.cn/documents/dynamic.html?link=/app-integration-dev/wps365/client/wpsoffice/wps-integration-mode/wps-client-dev-introduction.html)

## 使用方式

通过[开发者后台](https://open.wps.cn/developer/home)即可创建应用，以应用身份调用WPS365开放的各类接口

详细使用方式可见[自建应用概述](https://open.wps.cn/documents/app-integration-dev/guide/self-app/summary.html)
