# 获取 app_ticket

## 事件描述

第三方个人应用、第三方企业应用在进行应用授权时，需要用到 app_ticket，是 WPS 开放平台通过事件通知地址定时推送给应用后端的一个短期有效票据。

开发者可以不关注 ticket 的有效期，使用最新收到的 ticket 即可。如果调用接口发现 ticket 失效，说明新 ticket 推送没收到，可以调用[推送 app_ticket 接口](/app-integration-dev/wps365/server/certification-authorization/get-token/push-app-ticket)触发再次推送。

## 订阅说明

| **事件主体** | **kso.app.ticket**                                                                             |
| :----------- | :--------------------------------------------------------------------------------------------- |
| **权限要求** | 无                                                                                             |
| **解密方式** | 详见 [解密算法](/app-integration-dev/wps365/server/event-subscription/security-verification) |

### 事件体（解密前）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**       | **参数类型** | **说明**                           |
| :------------- | :----------- |:---------------------------------|
| topic          | string       | 消息主题 `kso.app.ticket`            |
| operation      | string       | 消息变更动作<br/>`create`：创建；`update`：更新 |
| time           | integer      | 时间（秒为单位的时间戳）                     |
| nonce          | string       | iv 向量（解密时使用）                     |
| signature      | string       | 消息签名                             |
| encrypted_data | string       | 消息变更的加密字段                        |

### 事件体示例（解密前）

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "topic": "kso.app.ticket",
  "operation": "create",
  "time": 1704074400,
  "nonce": "71***********7",
  "signature": "w6**********6Q",
  "encrypted_data": "B7**********iA=="
}
```

### 事件体数据（解密后）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**   | **参数类型** | **是否必带** | **说明**    |
| :--------- | :----------- | :----------- | :---------- |
| app_id     | string       | 是           | 应用 id     |
| app_ticket | string       | 是           | 应用 ticket |

### 事件体数据示例（解密后）

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "app_id": "AK*****1",
  "app_ticket": "B7*****879"
}
```
