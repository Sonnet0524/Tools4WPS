# 根据用户ID获取用户邮箱信息



**标签**：`邮箱用户邮箱` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/user_mailboxes/{user_id}          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `GET`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 根据用户ID获取用户邮箱信息。支持ex_user_id和user_id，需要在请求头中标明X-Kso-Id-Type使用 internal或external，默认是internal |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理用户邮箱信息(应用授权) `kso.user_mailbox.readwrite`</div><div style="margin-top: 5px;"></div><div>查询用户邮箱信息(应用授权) `kso.user_mailbox.read`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 



## 路径参数 (Path)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">user_id</div> | `string` | 是 | 用户ID，支持user_id或ex_user_id | - 







## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>邮箱信息查询结果</p>\n","children":[{"key":"data.email_address","name":"email_address","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>邮箱地址</p>\n","children":[]},{"key":"data.email_type","name":"email_type","deprecated":false,"type":"string","required":"是","enum":["user","public","group","other"],"xEnum":["user","public","group","other"],"description":"<p>邮箱类型: user(用户邮箱)、public(公共邮箱)、group(邮件组)、other(其他邮箱)</p>\n","children":[]},{"key":"data.is_primary","name":"is_primary","deprecated":false,"type":"boolean","required":"是","enum":[],"xEnum":[],"description":"<p>是否主邮箱</p>\n","children":[]}]},{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]}]' />

## 响应体示例
```json
{
  "data": {
    "email_address": "string",
    "email_type": "user",
    "is_primary": true
  },
  "code": 0,
  "msg": "string"
}
```