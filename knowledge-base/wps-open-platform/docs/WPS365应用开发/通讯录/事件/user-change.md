---
title: Change User
breadcrumb: WPS365应用开发 > 通讯录 > 事件 > 用户变更
source: raw_md/app-integration-dev/wps365/server/address-book/event/user-change.md
---

# 用户变更

## 事件描述

用户创建、用户更新、用户删除时触发。

## 订阅说明

| **事件主体** | kso.user                                                                                       |
| :----------- | :--------------------------------------------------------------------------------------------- |
| **权限要求** | 查询通讯录信息 `kso.contact.read`                                                              |
| **解密方式** | 详见 [解密算法](/app-integration-dev/wps365/server/event-subscription/security-verification) |

### 事件体（解密前）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**       | **参数类型** | **说明**                                                       |
| :------------- | :----------- | :------------------------------------------------------------- |
| topic          | string       | 消息主题 `kso.user`                                            |
| operation      | string       | 消息变更动作<br/>`create`：创建；`update`：更新；`delete`：删除 |
| time           | integer      | 时间（秒为单位的时间戳）                                       |
| nonce          | string       | iv 向量（解密时使用）                                          |
| signature      | string       | 消息签名                                                       |
| encrypted_data | string       | 消息变更的加密字段                                             |

### 事件体示例（解密前）

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "topic": "kso.user",
  "operation": "update",
  "time": 1704074400,
  "nonce": "71***********7",
  "signature": "w6**********6Q",
  "encrypted_data": "B7**********iA=="
}
```

### 事件体数据（解密后）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**         | **参数类型**      | **是否必带** | **说明**                                                       |
|:---------------|:--------------|:---------|:-------------------------------------------------------------|
| company_id     | string        | 是        | 企业 id                                                        |
| users          | array[object] | 是        | 用户变更信息数组                                                     |
| ∟ company_id   | string        | 是        | 企业 id                                                        |
| ∟ user_id      | string        | 是        | 用户 id                                                        |
| ∟ src          | object        | 否        | 用户事件变更前用户数据信息（变更动作之前的数据）                                     |
| ∟ ∟ dept_ids   | array[string] | 否        | 部门 id 列表（变更前）                                                |
| ∟ ∟ user_name  | string        | 否        | 名称（变更前）                                                      |
| ∟ ∟ role       | string        | 否        | 角色（变更前） <br/>`super-admin`：超级管理员；`admin`：普通管理员；`normal`：普通用户 |
| ∟ ∟ email      | string        | 否        | 邮箱（变更前）                                                      |
| ∟ ∟ phone      | string        | 否        | 手机号码（变更前）                                                    |
| ∟ ∟ avatar     | string        | 否        | 头像（变更前）                                                      |
| ∟ ∟ alias_name | string        | 否        | 昵称（变更前）                                                      |

### 事件体数据示例（解密后）

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "company_id": "A*****6",
  "users": [
    {
      "company_id": "A*****6",
      "user_id": "V*****9",
      "src": {
        "dept_ids": [
          "Y*****3"
        ],
        "user_name": "WPS用户",
        "role": "admin",
        "email": "test@wps.cn",
        "phone": "166****2233",
        "avatar": "https://img.cdn.cn/wps/img/avatar.svg",
        "alias_name": "WPS用户"
      }
    }
  ]
}
```
