# 绑定 Exchange 账户

    绑定 Exchange 账户。目前仅支持 Exchange 单向同步，并且需在管理后台先添加 Exchange 服务器信息和管理员账号信息。使用接口用户授权须有超管权限

    

**标签**：`日历exchange` 


## 请求说明
| 字段          | 值                  |
|--------------|---------------------|
| **<div style="white-space: nowrap;">请求地址</div>**  | https://openapi.wps.cn/v7/calendar_exchange_binds/create          |
| **<div style="white-space: nowrap;">HTTP 方法</div>** | `POST`    |
| **<div style="white-space: nowrap;">接口描述</div>**  | 绑定 Exchange 账户。目前仅支持 Exchange 单向同步，并且需在管理后台先添加 Exchange 服务器信息和管理员账号信息。使用接口用户授权须有超管权限 |
| **<div style="white-space: nowrap;">签名方式</div>**  | [KSO-1](https://open.wps.cn/documents/app-integration-dev/wps365/server/api-description/signature-description) |
| **<div style="white-space: nowrap;">限频策略</div>** | 无 |
| **<div style="white-space: nowrap;">权限要求</div>** | <div><div>查询和管理日历(用户授权) `kso.calendar.readwrite`</div></div> |


## 请求头 (Headers)
| 属性名 | 类型 | 是否必填 | 描述 | 可选值 |
|-------|------|------|-------|-------|
| <div style="white-space: nowrap;">X-Kso-Id-Type</div> | `string` | 否 | 类型<br>  * **internal** - 内部<br>  * **external** - 外部<br> | `internal`, `external` 







## 请求体(Body)
**请求体格式:** `application/json`
<OpenapiRenderTable  dataSource='[{"key":"admin_account","name":"admin_account","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>Exchange 的 admin 账户。需已完成在管理后台添加单向同步设置。</p>\n","children":[]},{"key":"exchange_account","name":"exchange_account","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>需绑定的 Exchange 账户</p>\n","children":[]},{"key":"user_id","name":"user_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>绑定账户的用户 ID，可以从通讯录接口获取</p>\n","children":[]}]' />

## 请求体示例
```json
{
  "admin_account": "string",
  "exchange_account": "string",
  "user_id": "string"
}
```

## 响应体(Response)
**HTTP状态码:** `200`<br/>
**响应体格式:** `application/json`
<OpenapiRenderTable hideHeaderKeys='required' dataSource='[{"key":"code","name":"code","deprecated":false,"type":"integer","required":"是","enum":[],"xEnum":[],"description":"-","children":[]},{"key":"msg","name":"msg","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>人可阅读的文本信息，可能会按不同的语言或地区返回不同的文本信息。</p>\n","children":[]},{"key":"data","name":"data","deprecated":false,"type":"object","required":"是","enum":[],"xEnum":[],"description":"<p>Exchange 账户绑定信息</p>\n","children":[{"key":"data.admin_account","name":"admin_account","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>Exchange 的 admin 账户</p>\n","children":[]},{"key":"data.exchange_account","name":"exchange_account","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>需绑定的 Exchange 账户</p>\n","children":[]},{"key":"data.exchange_binding_id","name":"exchange_binding_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>Exchange 绑定的唯一标识 ID</p>\n","children":[]},{"key":"data.status","name":"status","deprecated":false,"type":"string","required":"是","enum":["syncing","sync_done","password_error","sync_failed"],"xEnum":["syncing","sync_done","password_error","sync_failed"],"description":"<p>Exchange 账户同步状态</p>\n<ul>\n<li>syncing: 同步进行中</li>\n<li>sync_done: 同步完成</li>\n<li>password_error: 密码错误</li>\n<li>sync_failed: 同步失败</li>\n</ul>\n","children":[]},{"key":"data.user_id","name":"user_id","deprecated":false,"type":"string","required":"是","enum":[],"xEnum":[],"description":"<p>绑定账户的用户 ID</p>\n","children":[]}]}]' />

## 响应体示例
```json
{
  "code": 0,
  "msg": "string",
  "data": {
    "admin_account": "string",
    "exchange_account": "string",
    "exchange_binding_id": "string",
    "status": "syncing",
    "user_id": "string"
  }
}
```