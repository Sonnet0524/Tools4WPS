---
title: Query Specified User
breadcrumb: WPS365应用开发 > 通讯录 > 用户 > 查询指定用户
source: raw_md/app-integration-dev/wps365/server/address-book/user/get-user.md
---

# 查询指定用户

基于 user_id 查询指定用户

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/users/{user_id}**                                                              |
| :----------- | :--------------------------------------------------------------------------------------------------------- |
| **请求方法** | GET                                                                                                        |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)                        |
| **权限要求** | 查询和管理通讯录信息（应用授权） `kso.contact.readwrite`<br/>查询通讯录信息（应用授权） `kso.contact.read` |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 路径参数（Path）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明** |
| :------- | :----------- | :------- |
| user_id  | string       | 用户 id  |

## 查询参数（Query）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**  | **参数类型** | **是否必填** | **说明**         |
| :-------- | :----------- | :----------- | :--------------- |
| with_dept | boolean      | 否           | 是否需要返回部门信息，可选值：true(返回部门信息)，false(不返回部门信息)，默认为false|

## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/users/{user_id}?with_dept={boolean}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**              | **参数类型**      | **说明**                                                                                                       |
|:--------------------|:--------------|:-------------------------------------------------------------------------------------------------------------|
| code                | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode)                      |
| msg                 | string        | 响应信息                                                                                                         |
| data                | object        | 响应数据                                                                                                         |
| ∟ city              | string        | 城市                                                                                                           |
| ∟ country           | string        | 国家                                                                                                           |
| ∟ ctime             | integer       | 创建时间                                                                                                         |
| ∟ depts             | array[object] | 部门信息                                                                                                         |
| ∟ ∟ abs_path        | string        | 绝对路径                                                                                                         |
| ∟ ∟ id              | string        | 部门 id                                                                                                        |
| ∟ ∟ name            | string        | 部门名称                                                                                                         |
| ∟ email             | string        | 邮箱<br/>需额外获取字段权限：查询用户的邮箱（应用授权）`kso.user_email.read`                                                          |
| ∟ employee_id       | string        | 工号                                                                                                           |
| ∟ employer          | string        | 就职单位                                                                                                         |
| ∟ employment_status | string        | 员工状态。<br/> `probationary`:试用。                                                                                                         |
| ∟ employment_type   | string        | 员工类型。<br/>普通企业：`permanent`: 正式； `intern`:  实习。<br/> 教育企业：`teacher`:教师；`student`:学生；`staff`:教职工；`employee`:聘用人员；`alumni`:校友；`other`:其他                                                                                                         |
| ∟ ex_user_id        | string        | 外部身份源ID                                                                                                      |
| ∟ gender            | string[enum]  | 性别 <br/>`undefined`：未设置；`male`：男性；`female`：女性；`secrecy`：保密<br/>需额外获取字段权限：查询用户的性别（应用授权）`kso.user_gender.read` |
| ∟ id                | string        | 用户 id，自动生成                                                                                                   |
| ∟ leader_id         | string        | 直属主管的用户id                                                                                                       |
| ∟ phone             | string        | 手机号码<br/>需额外获取字段权限：查询用户的手机号（应用授权）`kso.user_phone.read`                                                       |
| ∟ role              | string[enum]  | 用户角色 <br/>`super-admin`：超级管理员；`admin`：普通管理员；`normal`：普通用户                                                    |
| ∟ status            | string[enum]  | 用户状态 <br/>`active`：正常；`notactive`：未激活；`disabled`：禁用；`dimission`：离职                                           |
| ∟ telephone         | string        | 座机                                                                                                           |
| ∟ title             | string        | 职务信息                                                                                                         |
| ∟ user_name         | string        | 用户名称                                                                                                         |
| ∟ work_place        | string        | 办公地点                                                                                                         |
| ∟ def_dept_id       | string        | 主部门id                                                                                                        |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "city": "string",
    "country": "string",
    "ctime": 0,
    "depts": [
      {
        "abs_path": "string",
        "id": "string",
        "name": "string"
      }
    ],
    "email": "string",
    "employee_id": "string",
    "employer": "string",
    "employment_status": "string",
    "employment_type": "string",
    "ex_user_id": "string",
    "gender": "string[enum]",
    "id": "string",
    "leader_id": "string",
    "phone": "string",
    "role": "string[enum]",
    "status": "string[enum]",
    "telephone": "string",
    "title": "string",
    "user_name": "string",
    "work_place": "string",
    "def_dept_id": "string"
  },
  "msg": "string",
  "code": 0
}
```
