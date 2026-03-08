# 创建订阅

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/hooks/create**                           |
| :----------- | :------------------------------------------------------------------------------------------- |
| **请求方法** | POST                                                                                         |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description) |
| **权限要求** | 管理多维表格（用户授权） `kso.dbsheet.readwrite`<br/>管理多维表格（应用授权） `kso.dbsheet.readwrite` |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 路径参数（Path）

| **名称** | **参数类型** | **说明** |
| :------- | :----------- | :------- |
| file_id  | string       | 文件 id  |

## 请求地址示例

```
[POST] https://openapi.wps.cn/v7/coop/dbsheet/{file_id}/hooks/create
```


## 请求体

| **名称**        | **参数类型** | **说明**                                                                                           |
| :-------------- | :----------- | :------------------------------------------------------------------------------------------------- |
| file_id         | string       | 文件 id                                                                                             |
| command         | string       | hook 订阅命令，可选值：`create_record`:订阅数据表内添加记录、`update_sheet`:订阅数据表内修改记录、`remove_record`:订阅数据表内删除记录、`update_records_parent`:订阅数据表内父子记录变动、`create_field`:订阅数据表内新增字段、`update_field`:订阅数据表内更新字段、`remove_field`:订阅数据表内删除字段                             |
| data            | object       | hook 订阅规则，根据 `command` 选择具体规则。详见 [Hook 订阅规则详情](#hook-订阅规则详情)                      |
| callback_url    | string       | 回调 URL，用于接收 hook 触发的通知。该接口应接受 JSON 格式的 POST 请求                           |

## Hook 订阅规则详情

### 数据表内添加记录（HookRuleCreateRecord）

| **名称**    | **参数类型** | **说明**          |
| :---------- | :----------- | :---------------- |
| sheet_id    | int64        | 数据表 id        |

### 数据表内修改记录（HookRuleUpdateSheet）

| **名称**                      | **参数类型** | **说明**                                                         |
| :---------------------------- | :----------- | :--------------------------------------------------------------- |
| sheet_id                      | int64        | 数据表 id                                                       |
| include_formula_result_change | bool         | 是否监听公式结果变化，默认为 `false`（不监听公式结果变化）        |
| skip_after_match_create_and_fill | bool       | 是否在监听新建或修改记录时避免重复触发，默认为 `false`（依然触发）|

### 数据表内删除记录（HookRuleRemoveRecord）

| **名称**     | **参数类型** | **说明**                                                      |
| :----------- | :----------- | :------------------------------------------------------------ |
| sheet_id     | int64        | 数据表 id                                                    |
| record_ids   | array[string] | 被监听删除的记录 id，若要监听所有记录删除，传空数组。       |

### 数据表内父子关系变动（HookRuleRecordParent）

| **名称**     | **参数类型** | **说明**                                                      |
| :----------- | :----------- | :------------------------------------------------------------ |
| sheet_id     | int64        | 数据表 id                                                    |
| record_ids   | array[string] | 被监听父子关系变动的记录 id，若要监听所有记录，传空数组。       |

### 数据表内添加字段（HookRuleCreateField）

| **名称**    | **参数类型** | **说明**          |
| :---------- | :----------- | :---------------- |
| sheet_id    | int64        | 数据表 id        |

### 数据表内修改字段（HookRuleUpdateField）

| **名称**                      | **参数类型** | **说明**                                                         |
| :---------------------------- | :----------- | :--------------------------------------------------------------- |
| sheet_id                      | int64        | 数据表 id                                                       |
| field_id | string         | 被监听修改的字段 id        |

### 数据表内删除字段（HookRuleRemoveField）

| **名称**     | **参数类型** | **说明**                                                      |
| :----------- | :----------- | :------------------------------------------------------------ |
| sheet_id     | int64        | 数据表 id                                                    |
| field_id | string         | 被监听删除的字段 id        |

## 响应体

| **名称**     | **参数类型** | **说明**                                          |
| :----------- | :----------- | :------------------------------------------------ |
| hook_id      | string       | 创建的 hook 对应的 hook id                         |

## 响应体示例

```json
{
  "hook_id": "abc123"
}
```