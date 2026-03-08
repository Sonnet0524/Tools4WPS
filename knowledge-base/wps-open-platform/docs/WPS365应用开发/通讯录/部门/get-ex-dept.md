---
title: Get department information based on ex_dept_id
breadcrumb: WPS365应用开发 > 通讯录 > 部门 > 根据ex_dept_id获取部门信息
source: raw_md/app-integration-dev/wps365/server/address-book/dept/get-ex-dept.md
---

# 根据 ex_dept_id 获取部门信息

根据 ex_dept_id 获取部门信息

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/depts/by_ex_dept_ids**                                                         |
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

| **名称**    | **参数类型**  | **是否必填** | **说明**      |
| :---------- | :------------ | :----------- |:------------|
| ex_dept_ids | array[string] | 是           | 外部身份源部门ID列表 |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/depts/by_ex_dept_ids
```

## 请求体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "ex_dept_ids": ["string"]
}
```

## 响应体

<!-- 为了保持文档格式统一：（1）参数说明中请使用中文全角标点符号；（2）中英文间请添加空格 -->

| **名称**       | **参数类型**  | **说明**                                                                                  |
| :------------- | :------------ |:----------------------------------------------------------------------------------------|
| code           | integer       | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg            | string        | 响应信息                                                                                    |
| data           | object        | 响应数据                                                                                    |
| ∟ items        | array[object] | 部门信息列表                                                                                  |
| ∟ ∟ abs_path   | string        | 绝对路径                                                                                    |
| ∟ ∟ ctime      | integer       | 创建时间                                                                                    |
| ∟ ∟ ex_dept_id | string        | 外部身份源部门ID                                                                               |
| ∟ ∟ id         | string        | 部门 id                                                                                   |
| ∟ ∟ leaders    | array[object] | 部门领导                                                                                    |
| ∟ ∟ ∟ order    | integer       | 排序值                                                                                     |
| ∟ ∟ ∟ user_id  | string        | 部门领导用户ID                                                                                |
| ∟ ∟ name       | string        | 部门名称                                                                                    |
| ∟ ∟ order      | integer       | 排序值                                                                                     |
| ∟ ∟ parent_id  | string        | 父部门 id                                                                                  |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "data": {
    "items": [
      {
        "abs_path": "string",
        "ctime": 0,
        "ex_dept_id": "string",
        "id": "string",
        "leaders": [
          {
            "order": 0,
            "user_id": "string"
          }
        ],
        "name": "string",
        "order": 0,
        "parent_id": "string"
      }
    ]
  },
  "msg": "string",
  "code": 0
}
```
