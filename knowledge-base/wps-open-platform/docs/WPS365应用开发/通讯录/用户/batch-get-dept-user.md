---
title: Batch Query Member Information in Department
breadcrumb: WPS365应用开发 > 通讯录 > 用户 > 批量查询部门下的成员信息
source: raw_md/app-integration-dev/wps365/server/address-book/user/batch-get-dept-user.md
---

# 批量查询部门下的成员信息

查询部门成员信息

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/depts/{dept_id}/members/batch_read**                                           |
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

## 路径参数（Path）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称** | **参数类型** | **说明** |
| :------- | :----------- | :------- |
| dept_id  | string       | 部门 id  |

## 请求体（Body）

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**         | **参数类型**  | **是否必填** | **说明**                                                                                        |
| :--------------- | :------------ | :----------- | :---------------------------------------------------------------------------------------------- |
| status           | array[string] | 是           | 用户状态，必填。可选值：active(正常)，notactive(未激活)，disabled(禁用)，最多支持3个状态             |
| user_ids         | array[string] | 是           | 用户id列表 |
| with_user_detail | boolean       | 否           | 是否返回用户详细信息，true：返回，false：不返回，默认为false|

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/depts/{dept_id}/members/batch_read
```

## 请求体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "status": ["string"],
  "user_ids": ["string"],
  "with_user_detail": false
}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**                   | **参数类型**      | **说明**                                                                                                                                |
|:-------------------------|:--------------|:--------------------------------------------------------------------------------------------------------------------------------------|
| code                     | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode)                                               |
| msg                      | string        | 响应信息                                                                                                                                  |
| data                     | object        | 响应数据                                                                                                                                  |
| ∟ items                  | array[object] | 成员信息列表                                                                                                                                |
| ∟ ∟ ctime                | integer       | 创建时间，秒为单位的时间戳                                                                                                                         |
| ∟ ∟ dept_id              | string        | 部门id                                                                                                                                  |
| ∟ ∟ is_leader            | boolean       | 在所在的部门内是否为部门负责人                                                                                                                       |
| ∟ ∟ mtime                | integer       | 修改时间，秒为单位的时间戳                                                                                                                         |
| ∟ ∟ order                | integer       | 部门内的排序值                                                                                                                               |
| ∟ ∟ user_id              | string        | 用户 id                                                                                                                                 |
| ∟ ∟ user_info            | object        | 用户详细信息                                                                                                                                |
| ∟ ∟ ∟ avatar             | string        | 账户头像                                                                                                                                  |
| ∟ ∟ ∟ city               | string        | 城市                                                                                                                                    |
| ∟ ∟ ∟ country            | string        | 国家                                                                                                                                    |
| ∟ ∟ ∟ email              | string        | 邮箱<br/>需额外获取字段权限：查询用户的邮箱（应用授权）`kso.user_email.read`                                                                                   |
| ∟ ∟ ∟ employee_id        | string        | 工号                                                                                                                                    |
| ∟ ∟ ∟ employer           | string        | 就职单位                                                                                                                                  |
| ∟ ∟ ∟ employment_status  | string        | 员工状态。<br/> `probationary`:试用。                                                                                                         |
| ∟ ∟ ∟ employment_type    | string        | 员工类型。<br/>普通企业：`permanent`: 正式； `intern`:  实习。<br/> 教育企业：`teacher`:教师；`student`:学生；`staff`:教职工；`employee`:聘用人员；`alumni`:校友；`other`:其他 |
| ∟ ∟ ∟ gender             | string[enum]  | 性别 <br/>`undefined`：未设置；`male`：男性；`female`：女性；`secrecy`：保密<br/>需额外获取字段权限：查询用户的性别（应用授权）`kso.user_gender.read`                          |
| ∟ ∟ ∟ id                 | string        | 用户 id                                                                                                                                 |
| ∟ ∟ ∟ phone              | string        | 手机号码<br/>需额外获取字段权限：查询用户的手机号（应用授权）`kso.user_phone.read`                                                                                |
| ∟ ∟ ∟ role               | string[enum]  | 用户角色 <br/>`super-admin`：超级管理员；`admin`：普通管理员；`normal`：普通用户                                                                             |
| ∟ ∟ ∟ status             | string[enum]  | 用户状态 <br/>`active`：正常；`notactive`：未激活；`disabled`：禁用；`dimission`：离职                                                                    |
| ∟ ∟ ∟ telephone          | string        | 座机                                                                                                                                    |
| ∟ ∟ ∟ title              | string        | 职务信息                                                                                                                                  |
| ∟ ∟ ∟ user_name          | string        | 用户名称                                                                                                                                      |
| ∟ ∟ ∟ work_place         | string        | 办公地点                                                                                                                                  |
| ∟ ∟ ∟ def_dept_id        | string        | 主部门id                                                                                                                                 |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "items": [
      {
        "ctime": 0,
        "dept_id": "string",
        "is_leader": false,
        "mtime": 0,
        "order": 0,
        "user_id": "string",
        "user_info": {
          "avatar": "string",
          "city": "string",
          "country": "string",
          "email": "string",
          "employee_id": "string",
          "employer": "string",
          "employment_status": "string",
          "employment_type": "string",
          "gender": "string[enum]",
          "id": "string",
          "phone": "string",
          "role": "string[enum]",
          "status": "string[enum]",
          "telephone": "string",
          "title": "string",
          "user_name": "string",
          "work_place": "string",
          "def_dept_id": "string"
        }
      }
    ]
  },
  "msg": "string",
  "code": 0
}
```
