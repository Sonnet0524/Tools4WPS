# 消息内容（content）结构说明

本文介绍发送消息、批量发送消息、更新消息、获取消息内容等接口中各消息类型（msg\_type）对应的消息内容（content）应如何构造。需注意的是，部分消息类型仅支持在获取消息内容时获取，并不能通过应用机器人发送，详情可见各类型的支持情况说明。
**本文不适用于webhook机器人，webhook机器人使用方式需参考**[**webhook机器人使用指南**](/app-integration-dev/guide/robot/webhook)

## 文本（text）

消息类型为文本 `type=text` 时，传递的内容 `content` 对象。该类型可在发送/更新消息或获取消息时使用。

| **名称**    | **参数类型** | **是否必填** | **说明**                                                            |
| --------- | -------- | -------- | ----------------------------------------------------------------- |
| text      | object   | 否        | 文本消息 <br> 支持通过在消息体插入标签的方式 at 人<br> 例子：`你好 <at id="0"> 张三 </at>` |
| ∟ content | string   | 是        | 文本内容                                                              |
| ∟ type    | string   | 否        | 文本类型  <br>`plain`：纯文本；`markdown`                                 |

```json
{
  // 文本
  "type": "text",
  "content": {
    "text": {
      "content": "string",
      "type": "string"
    }
  }
}
```

## 富文本（rich\_text）

消息类型为富文本 `type=rich_text` 时，传递的内容 `content` 对象。该类型可在发送/更新消息或获取消息时使用。

| **名称**                         | **参数类型** | **是否必填** | **说明**                                                                                                                         |
| ------------------------------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| rich\_text                     | object   | 否        | 富文本消息                                                                                                                          |
| ∟ elements                     | array    | 是        | 富文本消息内容                                                                                                                        |
| ∟ ∟ type                       | string   | 是        | 富文本元素类型  <br>`ol`：有序列表；`ul`：无序列表；`nl`：换行；`text`：普通文本；<br>`emoji`：表情；`custom_emoji`：自定义表情；`mention`：at 人；`image`：图片`doc`：内嵌文档 |
| ∟ ∟ alt\_text                  | string   | 是        | 代替文本摘要，当客户端无法解析则取该字段                                                                                                           |
| ∟ ∟ indent                     | integer  | 是        | 缩进                                                                                                                             |
| ∟ ∟ index                      | integer  | 是        | 第几行                                                                                                                            |
| ∟ ∟ elements                   | array    | 否        | 子元素列表，与父元素 `element` 结构相同（递归）                                                                                                  |
| ∟ ∟∟ text\_content             | object   | 否        | 【1】纯文本内容， 当富文本元素类型为 `text`或`emoji` 时使用                                                                                         |
| ∟ ∟ ∟ ∟content                 | string   | 是        | 文本内容                                                                                                                           |
| ∟ ∟ ∟ type                     | string   | 否        | 文本类型  <br>`plain`：纯文本；`markdown`                                                                                              |
| ∟ ∟ ∟style\_text\_content      | object   | 否        | 【2】有样式的文本内容，当富文本元素类型为普通文本 `text`或`ol`或`nl`或`ul` 时使用                                                                            |
| ∟ ∟ ∟∟ style                   | object   | 是        | 元素样式                                                                                                                           |
| ∟ ∟ ∟ ∟∟ bold                  | boolean  | 是        | 加粗                                                                                                                             |
| ∟ ∟ ∟ ∟∟ color                 | string   | 是        | RGBA 16 进制描述，例如：`#FF0000FF`，最后两位为透明度                                                                                           |
| ∟ ∟ ∟ ∟∟ italic                | boolean  | 是        | 斜体                                                                                                                             |
| ∟ ∟∟ mention\_content          | object   | 否        | 【3】at 人的内容，当富文本元素类型为 at 人 `mention` 时使用                                                                                        |
| ∟ ∟ ∟∟ identity                | object   | 否        | 被 at 用户的 id，当 at 所有人时该值为空                                                                                                      |
| ∟ ∟ ∟ ∟∟ avatar                | string   | 是        | 用户头像                                                                                                                           |
| ∟ ∟ ∟ ∟∟ company\_id           | string   | 是        | 企业 id                                                                                                                          |
| ∟ ∟ ∟ ∟∟ id                    | string   | 是        | 用户信息                                                                                                                           |
| ∟ ∟ ∟ ∟∟ name                  | string   | 是        | 用户名称                                                                                                                           |
| ∟ ∟ ∟ ∟∟ type                  | string   | 是        | 身份类型  <br>`user`：用户；`sp`：服务主体                                                                                                 |
| ∟ ∟ ∟ text                     | string   | 是        | 被 at 的文本内容                                                                                                                     |
| ∟ ∟∟ image\_content            | object   | 否        | 【4】图片内容，当富文本元素类型为自定义表情 `custom_emoji` 或 图片 `image` 时使用                                                                         |
| ∟ ∟ ∟∟ size                    | integer  | 否        | 图片大小（B）                                                                                                                        |
| ∟ ∟ ∟∟ height                  | integer  | 否        | 高度（px）                                                                                                                         |
| ∟ ∟ ∟∟ width                   | integer  | 否        | 宽度（px）                                                                                                                         |
| ∟ ∟ ∟∟ name                    | string   | 否        | 图片名称                                                                                                                           |
| ∟ ∟ ∟∟ type                    | string   | 否        | 图片格式，可传值：<br>`image/png`；`image/jpg`；`image/gif`；`image/webp`                                                                 |
| ∟ ∟ ∟ ∟storage\_key            | string   | 是        | 图片存储 key                                                                                                                       |
| ∟ ∟ ∟∟ thumbnail\_type         | string   | 否        | 缩略图片格式，可传值：<br>`image/png`；`image/jpg`；`image/gif`；`image/webp`                                                               |
| ∟ ∟ ∟ ∟thumbnail\_storage\_key | string   | 否        | 缩略图片存储 key                                                                                                                     |
| ∟ ∟∟ link\_content             | object   | 否        | 【5】链接的内容，当富文本元素类型为 `link` 时使用                                                                                                  |
| ∟ ∟ ∟∟ text                    | string   | 是        | 文本内容                                                                                                                           |
| ∟ ∟ ∟∟ url                     | string   | 是        | url 链接                                                                                                                         |
| ∟ ∟∟doc\_content               | object   | 否        | 【6】消息内嵌文档的内容，当富文本元素类型为`doc`时使用                                                                                                 |
| ∟ ∟∟∟text                      | string   | 是        | 文本内容                                                                                                                           |
| ∟ ∟∟∟file                      | object   | 是        | 云文档信息                                                                                                                          |
| ∟ ∟∟∟∟id                       | string   | 是        | 云文档file id                                                                                                                     |
| ∟∟∟∟∟link\_url                 | string   | 是        | 链接url                                                                                                                          |
| ∟∟∟∟∟link\_id                  | string   | 是        | 链接id                                                                                                                           |

```json
{
  // 富文本
  "type": "rich_text",
  "content": {
    "rich_text": {
      "elements": [
        {
          "type": "string",
          "alt_text": "string",
          "indent": 0,
          "index": 0,
          "elements": [
            {
              // 与父元素 elements 结构相同（递归）
            }
          ],
          "text_content": {
            "content": "string",
            "type": "string"
          },
          "style_text_content": {
            "style": {
              "bold": false,
              "color": "string",
              "italic": false
            },
            "text": "string"
          },
          "mention_content": {
            "identity": {
              "avatar": "string",
              "company_id": "string",
              "id": "string",
              "name": "string",
              "type": "string"
            },
            "text": "string",
            "type": "string"
          },
          "image_content": {
            "height": 0,
            "name": "string",
            "size": 0,
            "storage_key": "string",
            "thumbnail_storage_key": "string",
            "thumbnail_type": "string",
            "type": "string",
            "width": 0
          },
          "link_content": {
            "text": "string",
            "url": "string"
          }
        }
      ]
    }
  }
}
```

## 图片（image）

消息类型为图片 `type=image` 时，传递的内容 `content` 对象。该类型可在发送/更新消息或获取消息时使用。

| **名称**                    | **参数类型** | **是否必填** | **说明**                                                           |
| ------------------------- | -------- | -------- | ---------------------------------------------------------------- |
| image                     | object   | 否        | 图片消息                                                             |
| ∟ type                    | string   | 否        | 图片格式，可传值：<br>`image/png`；`image/jpg`；`image/gif`；`image/webp`   |
| ∟ thumbnail\_type         | string   | 否        | 缩略图片格式，可传值：<br>`image/png`；`image/jpg`；`image/gif`；`image/webp` |
| ∟ name                    | string   | 否        | 图片名称                                                             |
| ∟ size                    | integer  | 否        | 图片大小（B），不传默认按原图比例和大小展示                                           |
| ∟ width                   | integer  | 否        | 宽度（px），不传默认按原图比例和大小展示                                            |
| ∟ height                  | integer  | 否        | 高度（px），不传默认按原图比例和大小展示                                            |
| ∟ storage\_key            | string   | 是        | 图片存储 key                                                         |
| ∟ thumbnail\_storage\_key | string   | 否        | 缩略图片存储 key                                                       |

```json
{
  // 图片
  "type": "image",
  "content": {
    "image": {
      "type": "string",
      "thumbnail_type": "string",
      "name": "string",
      "size": 0,
      "width": 0,
      "height": 0,
      "storage_key": "string",
      "thumbnail_storage_key": "string"
    }
  }
}
```

## 文件（file）

消息类型为文件 `type=file` 时，传递的内容 `content` 对象。**文件分为本地文件和云文档2种类型，2种类型的结构和使用有差异**：

* 本地文件，即文件类型为 `local`。该类型可在发送/更新消息或获取消息时使用。

| **名称**           | **参数类型** | **是否必填** | **说明**               |
| ---------------- | -------- | -------- | -------------------- |
| file             | object   | 否        | 文件消息                 |
| ∟ type           | string   | 是        | 文件类型：固定为`local`：本地文件 |
| ∟ local          | object   | 否        | 本地文件                 |
| ∟ ∟ name         | string   | 否        | 文件名称                 |
| ∟ ∟ size         | integer  | 否        | 文件大小（B）              |
| ∟ ∟ storage\_key | string   | 是        | 文件存储 key             |

```json
{
  // 文件
  "type": "file",
  "content": {
    "file": {
      // 本地文件
      "type": "local",
      "local": {
        "name": "string",
        "size": 0,
        "storage_key": "string"
      }
    }
  }
}
```

* 云文档，类型为 `cloud`。该类型只能在获取消息时使用。

| **名称**        | **参数类型** | **是否必填** | **说明**              |
| ------------- | -------- | -------- | ------------------- |
| file          | object   | 否        | 云文件消息               |
| ∟ type        | string   | 是        | 文件类型：固定为`cloud`：云文档 |
| ∟ cloud       | object   | 否        | 云文档                 |
| ∟ ∟ id        | string   | 是        | 云文档file id          |
| ∟ ∟ link\_url | string   | 是        | 链接url               |
| ∟ ∟ link\_id  | string   | 是        | 链接id                |

## 音频（audio）

消息类型为音频 `type=audio` 时，传递的内容 `content` 对象。该类型可在发送/更新消息或获取消息时使用。

| **名称**           | **参数类型** | **是否必填** | **说明**          |
| ---------------- | -------- | -------- | --------------- |
| audio            | object   | 否        | 音频消息            |
| ∟ media          | object   | 是        | 音频媒体信息          |
| ∟ ∟ channels     | integer  | 否        | 通道数             |
| ∟ ∟ codec        | string   | 否        | 编码格式 <br>`amr` |
| ∟ ∟ duration     | integer  | 否        | 播放时长（s）         |
| ∟ ∟ format       | string   | 否        | 文件格式 <br>`wav` |
| ∟ ∟ sample\_bits | integer  | 否        | 比特率             |
| ∟ ∟ sample\_rate | integer  | 否        | 采用率             |
| ∟ ∟ size         | integer  | 否        | 文件大小（B）         |
| ∟ storage\_key   | string   | 是        | 音频文件存储 key      |

```json
{
  // 音频
  "type": "audio",
  "content": {
    "audio": {
      "media": {
        "channels": 0,
        "codec": "string",
        "duration": 0,
        "format": "string",
        "sample_bits": 0,
        "sample_rate": 0,
        "size": 0
      },
      "storage_key": "string"
    }
  }
}
```

## 视频（video）

消息类型为音频 `type=video` 时，传递的内容 `content` 对象。该类型可在发送/更新消息或获取消息时使用。

| **名称**                  | **参数类型** | **是否必填** | **说明**             |
| ----------------------- | -------- | -------- | ------------------ |
| video                   | object   | 否        | 视频消息               |
| ∟ media                 | object   | 是        | 视频媒体信息             |
| ∟ ∟ codec               | string   | 否        | 编码格式  <br>`h.264` |
| ∟ ∟ cover\_storage\_key | string   | 否        | 视频文件封面图片存储 key     |
| ∟ ∟ duration            | integer  | 否        | 播放时长（s）            |
| ∟ ∟ format              | string   | 否        | 文件格式  <br>`mp4`   |
| ∟ ∟ height              | integer  | 否        | 高度（px）             |
| ∟ ∟ size                | integer  | 否        | 文件大小（B）            |
| ∟ ∟ width               | integer  | 否        | 宽度（px）             |
| ∟ storage\_key          | string   | 是        | 视频文件存储 key         |

```json
{
  // 视频
  "type": "audio",
  "content": {
    "video": {
      "media": {
        "codec": "string",
        "cover_storage_key": "string",
        "duration": 0,
        "format": "string",
        "height": 0,
        "size": 0,
        "width": 0
      },
      "storage_key": "string"
    }
  }
}
```

## 卡片（card）

消息卡片是应用接入WPS协作机器人发送消息时的一种消息类型。消息卡片提供了丰富的组件，支持开发者按需组合配置消息卡片。详细说明可看[WPS协作卡片介绍](/app-integration-dev/guide/card/card-summary) 和 [WPS协作卡片结构说明](/app-integration-dev/guide/card/card-structure)

为了提升卡片的搭建效率，WPS开放平台也为开发者提供了可视化的消息卡片搭建工具，开发者可进入`开发者后台-应用能力-WPS协作机器人-发送消息-API发送-消息卡片编辑器`处进行配置。

消息类型为卡片 `type=card` 时，传递的内容 `content` 对象。该类型可在发送/更新消息或获取消息时使用。

| **名称**        | **参数类型** | **是否必填** | **说明**      |
| ------------- | -------- | -------- | ----------- |
| card          | object   | 否        | 卡片消息        |
| ∟ config      | 是        | object   |            |
| ∟ link        | 否        | object   | 卡片整体的跳转链接   |
| ∟ i18n\_items | 是        | array    | 卡片的内容，支持多语言 |

```json
{
  "type": "card",
  "content": {
    "card": {
      "config": {
      },
      "i18n_items": [
        {
        }
      ],
      "link": {
      }
    }
  }
}
```

## 表情包(sticker)

消息类型为表情包 `type=sticker` 时，获取到的消息内容 `content` 对象。该类型仅可在获取消息时使用。

| **名称**         | **参数类型** | **说明**         |
| -------------- | -------- | -------------- |
| sticker        | object   | 表情包消息          |
| ∟ image        | object   | 图片信息           |
| ∟∟height       | integer  | 图片高度           |
| ∟∟name         | string   | 图片名称           |
| ∟∟size         | integer  | 图片大小           |
| ∟∟storage\_key | string   | 图片storage\_key |
| ∟∟type         | string   | 图片类型           |
| ∟∟width        | integer  | 图片宽度           |

```json
{
  "content": {
    "sticker": {
      "image": {
        "height": 0,
        "name": "",
        "size": 0,
        "storage_key": "",
        "type": "",
        "width": 0
      }
    }
  },
  "type": "sticker"
}
```

## 位置(location)

消息类型为位置 `type=location` 时，获取到的消息内容 `content` 对象。该类型仅可在获取消息时使用。

| **名称**         | **参数类型** | **说明**             |
| -------------- | -------- | ------------------ |
| location       | object   | 位置消息               |
| ∟ address      | string   | 详细地址               |
| ∟∟latitude     | float    | 纬度                 |
| ∟∟longitude    | float    | 经度                 |
| ∟∟storage\_key | string   | 地图缩略图片storage\_key |
| ∟∟title        | string   | 地址位置标题             |

```json
{
  "content": {
    "location": {
      "address": "",
      "latitude": 30.451308,
      "longitude": 114.485434,
      "storage_key": "",
      "title": ""
    }
  },
  "type": "location"
}
```

## 合并转发(merge\_forward)

消息类型为合并转发`type=merge_forward` 时，获取到的消息内容 `content` 对象。该类型仅可在获取消息时使用。

| **名称**          | **参数类型**       | **说明**               |
| --------------- | -------------- | -------------------- |
| merge\_forward  | object         | 合并转发消息               |
| ∟ end\_time     | integer        | 合并消息最后一条的时间          |
| ∟∟start\_time   | integer        | 合并消息第一条的时间           |
| ∟∟title         | string         | 合并消息标题               |
| ∟∟msg\_id\_list | array\[string] | 消息id列表               |
| ∟∟msg\_previews | array\[object] | 合并消息预览信息             |
| ∟∟∟msg\_id      | string         | 消息id                 |
| ∟∟∟sender\_id   | object         | 发送者，包括用户、应用和机器人      |
| ∟∟∟∟app\_id     | string         | 应用id，只有在type为sp的时候有值 |
| ∟∟∟∟company\_id | string         | 身份所属公司id             |
| ∟∟∟∟name        | string         | 用户或应用的名称             |
| ∟∟∟∟type        | string         | user:用户<br>sp:应用    |
| ∟∟∟∟id          | string         | 身份id                 |
| ∟∟∟ctime        | integer        | 消息创建时间               |
| ∟∟∟summary      | string         | 消息内容摘要               |

```json
{
  "content": {
    "merge_forward": {
      "end_time": 1770018560555,
      "msg_id_list": [
        "",
        ""
      ],
      "msg_previews": [
        {
          "ctime": 1770018560555,
          "msg_id": "",
          "sender_id": {
            "app_id": "",
            "company_id": "",
            "id": "",
            "name": "",
            "type": ""
          },
          "summary": ""
        }
      ],
      "start_time": 1770017906948,
      "title": ""
    }
  },
  "type": "merge_forward"
}
```

## 投票(vote)

消息类型为投票`type=vote` 时，获取到的消息内容 `content` 对象。该类型仅可在获取消息时使用。

| **名称**    | **参数类型**       | **说明** |
| --------- | -------------- | ------ |
| vote      | object         | 投票消息   |
| ∟ options | array\[string] | 投票选项   |
| ∟topic    | string         | 投票标题   |

```json
{
  "content": {
    "vote": {
      "options": [
        "",
        ""
      ],
      "topic": ""
    }
  },
  "type": "vote"
}
```

## 日程(calendar)

消息类型为日程 `type=calendar` 时，获取到的消息内容 `content` 对象。该类型仅可在获取消息时使用。

该类型指的是单聊或群聊会话中的日程邀请卡片，非日历机器人的消息卡片。

| **名称**        | **参数类型**       | **说明**            |
| ------------- | -------------- | ----------------- |
| vote          | object         | 日程消息              |
| ∟ attendees   | array\[object] | 日程参与人             |
| ∟∟company\_id | string         | 身份所归属的公司          |
| ∟∟name        | string         | 用户或应用的名称          |
| ∟∟type        | string         | user:用户<br>sp:应用 |
| ∟∟id          | string         | 身份id              |
| ∟end\_time    | integer        | 日程结束时间,单位：秒       |
| ∟start\_time  | integer        | 日程开始时间,单位：秒       |
| ∟event\_id    | string         | 日程Id              |
| ∟summary      | string         | 标题                |
| ∟organizer    | object         | 日程创建者             |
| ∟∟company\_id | string         | 身份所归属的公司          |
| ∟∟name        | string         | 用户或应用的名称          |
| ∟∟type        | string         | user:用户<br>sp:应用 |
| ∟∟id          | string         | 身份id              |

```json
{
  "content": {
    "calendar": {
      "attendees": [
        {
          "avatar": "",
          "company_id": "",
          "id": "",
          "name": "",
          "type": ""
        }
      ],
      "end_time": 1769655600000,
      "event_id": "",
      "organizer": {
        "company_id": "",
        "id": "",
        "name": "",
        "type": ""
      },
      "start_time": 0,
      "summary": ""
    },
    "type": "calendar"
  }
}
```

## 会议(meeting)

消息类型为会议`type=meeting` 时，获取到的消息内容 `content` 对象。该类型仅可在获取消息时使用。

该类型指的是单聊或群聊会话中的会议入会邀请卡片，非会议机器人的消息卡片。

| **名称**             | **参数类型**       | **说明**            |
| ------------------ | -------------- | ----------------- |
| meeting            | object         | 会议消息              |
| ∟ creator          | object         | 会议创建者             |
| ∟∟company\_id      | string         | 身份所归属的公司          |
| ∟∟name             | string         | 用户或应用的名称          |
| ∟∟type             | string         | user:用户<br>sp:应用 |
| ∟∟id               | string         | 身份id              |
| ∟invitees          | array\[object] | 被邀请用户列表           |
| ∟∟company\_id      | string         | 身份所归属的公司          |
| ∟∟name             | string         | 用户或应用的名称          |
| ∟∟type             | string         | user:用户<br>sp:应用 |
| ∟∟id               | string         | 身份id              |
| ∟join\_code        | string         | 会议邀请码             |
| ∟join\_url         | string         | 会议邀请链接            |
| ∟meeting\_id       | string         | 会议id              |
| ∟participants      | array\[object] | 参与者列表             |
| ∟start\_date\_time | integer        | 会议开始时间,单位：秒       |
| ∟end\_date\_time   | integer        | 会议结束时间,单位：秒       |

## 如何在消息内@人

消息接口支持在markdown格式的文本内，通过在消息体 content 中插入`<at>`标签的方式@人。目前支持markdown文本的消息类型有：文本（text）、富文本（rich\_text）、卡片（card）

使用步骤如下：

1.在对应消息类型的content内，使用`<at>`标签的方式写入@内容，有2种使用格式:

* @单个用户：`<at id=\"2\">展示名称</at>`
* @所有人：`<at id=\"1\">所有人</at>`，id固定为1

**请注意，上述的`id`仅用来代表索引，在下述第2步中会使用到，并不是用户`user_id`**

2.在该接口的请求体mentions部分，传参上述的索引和具体的用户`user_id`。具体写法和对应关系请看示例图：

![艾特人](https://cloudcdn.qwps.cn/open/_img/65b004f945.png "艾特人")


