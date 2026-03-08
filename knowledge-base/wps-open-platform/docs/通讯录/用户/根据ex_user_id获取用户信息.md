# 根据 ex_user_id 获取用户信息

根据 ex_user_id 获取用户信息

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/users/by_ex_user_ids**                                                         |
| :----------- | :--------------------------------------------------------------------------------------------------------- |
| **请求方法** | POST                                                                                                       |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)                        |
| **权限要求** | 查询和管理通讯录信息（应用授权） `kso.contact.readwrite`<br/>查询通讯录信息（应用授权） `kso.contact.read` |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 请求体（Body）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**    | **参数类型**  | **是否必填** | **说明**                                                 |
| :---------- | :------------ | :----------- |:-------------------------------------------------------|
| ex_user_ids | array[string] | 是           | 外部身份源ID列表                                              |
| status      | array[string] | 是           | 用户状态，必填。<br/>`active`：正常；`notactive`：未激活；`disabled`：禁用 |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/users/by_ex_user_ids
```

## 请求体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "ex_user_ids": ["string"],
  "status": ["string"]
}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**              | **参数类型**      | **说明**                                                                                    |
|:--------------------|:--------------|:------------------------------------------------------------------------------------------|
| code                | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg                 | string        | 响应信息                                                                                      |
| data                | object        | 响应数据                                                                                      |
| ∟ items             | array[object] | 用户信息列表                                                                                          |
| ∟ ∟ avatar          | string        | 头像                                                                                        |
| ∟ ∟ ctime           | integer       | 创建时间                                                                                      |
| ∟ ∟ email           | string        | 邮箱<br/>需额外获取字段权限：查询用户的邮箱（应用授权）`kso.user_email.read`                                                                                        |
| ∟ ∟ ex_user_id      | string        | 外部身份源ID|
| ∟ ∟ id              | string        | 用户 id，自动生成                                                                                |
| ∟ ∟ phone           | string        | 手机号码<br/>需额外获取字段权限：查询用户的手机号（应用授权）`kso.user_phone.read`                                                                                      |
| ∟ ∟ role            | string[enum]  | 用户角色 <br/>`super-admin`：超级管理员；`admin`：普通管理员；`normal`：普通用户                                 |
| ∟ ∟ status          | string[enum]  | 用户状态 <br/>`active`：正常；`notactive`：未激活；`disabled`：禁用；`dimission`：离职                        |
| ∟ ∟ title           | string        | 职务信息                                                                                      |
| ∟ ∟ user_name       | string        | 用户名称                                                                                      |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "items": [
      {
        "avatar": "string",
        "ctime": 0,
        "email": "string",
        "ex_user_id": "string",
        "id": "string",
        "phone": "string",
        "role": "string[enum]",
        "status": "string[enum]",
        "title": "string",
        "user_name": "string"
      }
    ]
  },
  "msg": "string",
  "code": 0
}
```