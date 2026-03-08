# 获取AI团队列表

获取开启AI问答能力的团队

## 请求说明

| **请求地址** | **https://openapi.wps.cn/v7/aidocs/doclib_list** |
| :----------- | :-------------------------------------------------------------------------------------------------------- |
| **请求方法** | GET                                                                                                      |
| **签名方式** | [KSO-1](/app-integration-dev/wps365/server/api-description/signature-description)|
| **权限要求** | 读写智能文档库数据（用户授权） `kso.aidocs.readwrite`                                               |

## 请求头（Header）

| **Header 名称**     | **参数类型** | **是否必填** | **说明**                                                                                                     |
| :------------------ | :----------- | :----------- | :----------------------------------------------------------------------------------------------------------- |
| Content-Type        | string       | 是           | 使用：`application/json`                                                                                     |
| X-Kso-Date          | string       | 是           | RFC1123 格式的日期，例: `Wed, 23 Jan 2013 06:43:08 GMT`                                                      |
| X-Kso-Authorization | string       | 是           | KSO-1 签名值，详见[《签名方法》](/app-integration-dev/wps365/server/api-description/signature-description) |
| Authorization       | string       | 是           | 授权凭证，格式为：`Bearer {access_token}`                                                                    |

## 请求参数（Query）

<!-- 为了保持文档格式统一：参数中文说明请使用中文全角标点符号；中英文间请添加空格 -->

| **名称**      | **参数类型** | **是否必填** | **说明**                                                      |
| :------------ | :----------- | :----------- | :------------------------------------------------------------ |
| page_size | int       | 是           | 最大300                                                  |
| page_token   | string       | 否           | 分页标识|
| roles   | list[string]       | 否           | 默认全部角色，可选角色 owner,admin,normal,visitor （ visitor 表示企业公开团队访客的角色）|
| filter_status | string       | 否           | 默认：deafult （返回开启ai的团队） 可选：success （返回开启AI并入库成功的团队）， all （团队列表的团队此时vistor无效） |


## 请求地址示例

```
[GET] https://openapi.wps.cn/v7/aidocs/doclib_list?filter_status=all&page_size=50
```

## 响应体

<!-- 为了保持文档格式统一：参数中文说明请使用中文全角标点符号；中英文间请添加空格 -->

| **名称**     | **参数类型** | **说明**                                                                                                      |
| :----------- | :----------- | :------------------------------------------------------------------------------------------------------------ |
| code         | integer      | 响应代码。非 0 表示失败，参照[《状态码说明》](/app-integration-dev/wps365/server/api-description/errorcode) |
| msg          | string       | 响应信息                                                                                                      |
| data         | object       | 响应数据                                                                                                      |
| ∟ items| list[object]       | 团队列表                                                                                                   |
| ∟ next_page_token | string    | 下次请求的page_token                                                                                               |

## 响应体示例

<!-- 为了保持文档格式统一，请使用 2 个空格作为 json 的缩进符 -->

```json
{
  "code": 0,
  "data": {
    "items": [
      {
        "drive_id": "2125182427",
        "doclib_name": "智能简历库",
        "create_time": 1734074602,
        "ai_status": "open"
      },
      {
        "drive_id": "2125182424",
        "doclib_name": "leon测试",
        "create_time": 1733197194,
        "ai_status": "close"
      }
    ],
    "next_page_token": ""
  },
  "msg": "success"
}
```