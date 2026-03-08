---
title: PivotTable parameter description
breadcrumb: WPS365应用开发 > 多维表格 > 多维表格参数说明
source: raw_md/app-integration-dev/wps365/server/dbsheet/parameters-description.md
---

# Field/字段 类型说明

## 通用属性
| 属性 | 说明 | 传入值 | 样例 |
| -------- | ---- | -------- | -------- |
| name | 该字段的显示名称 | string | "订单号" |
| type | 该字段的类型 | string | "Date" |
| id | 该字段的唯一标识 | string | "sA" |

id 为创建字段后自动分配的值, 不可手动设定.

## 1.Date 日期
### 定义:
| 字段类型 | 说明 | 字段的特有属性| 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Date | 日期 | number_format, default_value_type, default_value |  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|日期格式配置|标准数字格式字符串|"yyyy\\"年\\"m\\"月\\"d\\"日\\" aaaa hh:mm;@": 2000年1月1日 星期一 11:11|
|default_value_type|自动填入日期|RecordCreateTime 记录创建时间, Normal 指定的日期, 不传则不自动填入||
|default_value|自动填入的值|若 default_value_type 为 Normal 则需要传此参数|"2024/11/23"|


CreateField 请求样例
```
    "fields": [
        {
            "name": "日期",
            "type": "Date",
            "data": {
                "number_format": "yyyy\"年\"m\"月\"d\"日\";@",
                "default_value_type": "Normal",
                "default_value": "2024/11/23"
            }
        }
    ]
```
GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "日期",
                "type": "Date",
                "id": "S",
                "data": {
                    "default_value": "2024/11/23",
                    "default_value_type": "Normal",
                    "number_format": "yyyy\"年\"m\"月\"d\"日\";@"
                }
            }
        ]
    }
```

### 值:
string 符合定义中格式的日期字符串

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"日期\":\"2025/11/15\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"日期\":\"2025/11/15\"}",
                "id": "f"
            }
        ]
    }
```


## 2.Time 时间
### 定义:
| 字段类型 | 说明 | 字段的特有属性| 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Time | 时间 | number_format |  |   

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|时间格式配置|标准数字格式字符串|"hh:mm:ss;@":"11:11:11";"[$-409]h:mm:ss AM/PM;@": "04:00:00 PM"|

CreateField 请求样例
```
    "fields": [
        {
            "name": "时间",
            "type": "Time",
            "data": {
                "number_format": "hh:mm:ss;@"
            }
        }
    ]
``` 

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "时间",
                "type": "Time",
                "id": "V",
                "data": {
                    "number_format": "hh:mm:ss;@"
                }
            }
        ]
    }
```

### 值:
string 符合定义中格式的时间字符串

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"时间\":\"11:12:15\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"时间\":\"11:12:15\"}",
                "id": "g"
            }
        ]
    }
```

## 3.Number 数字
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Number | 数字 | number_format |  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|数字格式配置|标准数字格式字符串|"#,##0.000_ ": 1,234.001|

CreateField 请求样例
```
    "fields": [
        {
            "name": "数字",
            "type": "Number",
            "data": {
                "number_format": "0_ "
            }
        }
    ],
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "数字",
                "type": "Number",
                "id": "W",
                "data": {
                    "number_format": "0_ "
                }
            }
        ]
    }
```

### 值:
int/float 符合定义中格式的数字

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"数字\":125}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"数字\":125}",
                "id": "h"
            }
        ]
    }
```

## 4.Currency 货币
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Currency | 货币 | number_format |  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|货币格式配置|标准数字格式字符串|"$#,##0.000_ ": $1,234.001|

CreateField 请求样例
```
    "fields": [
        {
            "name": "货币",
            "type": "Currency",
            "data": {
                "number_format": "$#,##0.000_ "
            }
        }
    ],
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "货币",
                "type": "Currency",
                "id": "X",
                "data": {
                    "number_format": "$#,##0.000_ "
                }
            }
        ]
    }
```

### 值:
int/float 符合定义中格式的货币数值

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"货币\":125}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"货币\":125}",
                "id": "j"
            }
        ]
    }
```

## 5.MultiLineText 多行文本
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| MultiLineText | 多行文本 | unique_value ||      

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|unique_value|是否开启禁止录入重复|bool|true|

CreateField 请求样例
```
    "fields": [
        {
            "name": "多行文本",
            "type": "MultiLineText",
            "data": {
                "unique_value": false
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "多行文本",
                "type": "MultiLineText",
                "id": "Y",
                "data": {
                    "unique_value": false
                }
            }
        ]
    }
```

### 值:
string

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"多行文本\":\"some text\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"多行文本\":\"some text\"}",
                "id": "l"
            }
        ]
    }
```

## 6.Percent 百分比
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Percent | 百分比 | number_format ||      

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|百分比格式配置|标准数字格式字符串|"0.00%": 12.34%|

CreateField 请求样例
```
    "fields": [
        {
            "name": "百分比",
            "type": "Percent",
            "data": {
                "number_format": "0.00%"
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "百分比",
                "type": "Percent",
                "id": "Ze",
                "data": {
                    "number_format": "0.00%"
                }
            }
        ]
    }
```

### 值:
int/float 符合定义中格式的百分比数值

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"百分比\":98}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"百分比\":98}",
                "id": "f"
            }
        ]
    }
```

## 7.ID 身份证
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| ID | 身份证 | unique_value ||      

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|unique_value|是否禁止录入重复|bool|true|

CreateField 请求样例
```
    "fields": [
        {
            "name": "身份证",
            "type": "ID",
            "data": {
                "unique_value": true
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "身份证",
                "type": "ID",
                "id": "T",
                "data": {
                    "unique_value": true
                }
            }
        ]
    }
```

### 值:
string

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"身份证\":\"110101***********9\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"身份证\":\"110101***********9\"}",
                "id": "g"
            }
        ]
    }
```

## 8.Phone 电话
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Phone | 电话 | unique_value ||      

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|unique_value|是否禁止录入重复|bool|true|

CreateField 请求样例
```
    "fields": [
        {
            "name": "电话",
            "type": "Phone",
            "data": {
                "unique_value": true
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "电话",
                "type": "Phone",
                "id": "Ze",
                "data": {
                    "unique_value": true
                }
            }
        ]
    }
```

### 值:
string

CreateRecord 请求样例
```
    "records": [
        {
            "fields_value": "{\"电话\":\"138*******0\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"电话\":\"138*******0\"}",
                "id": "h"
            }
        ]
    }
```

## 9.LastModifiedBy 最后修改者
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| LastModifiedBy | 最后修改者 | watch_all, watched_field ||      

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|watch_all|是否监控所有字段, 默认为 true|bool|true|
|watched_field|监控指定字段 id 数组, 当 watch_all=false 时必填|[]string|["FV","GB"]|

CreateField 请求样例
```
    "fields": [
        {
            "name": "最后修改者",
            "type": "LastModifiedBy",
            "data": {
                "watch_all": true
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "最后修改者",
                "type": "LastModifiedBy",
                "id": "U",
                "data": {
                    "watch_all": true
                }
            }
        ]
    }
```

### 值:
string

CreateRecord 请求样例

这是一个自动字段, 不支持手动录入

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"最后修改者\":\"张三\"}",
                "id": "h"
            }
        ]
    }
```

## 10.LastModifiedTime 最后修改时间
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| LastModifiedTime | 最后修改时间 | watch_all, watched_field, number_format ||      

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|watch_all|是否监控所有字段, 默认为 true|bool|true|
|watched_field|监控指定字段 id 数组, 当 watch_all=false 时必填|[]string|["FV","GB"]|
|number_format|时间格式配置|标准数字格式字符串|"[$-409]h:mm:ss AM/PM;@": 2:30:00 PM|

CreateField 请求样例
```
    "fields": [
        {
            "name": "最后修改时间",
            "type": "LastModifiedTime",
            "data": {
                "watch_all": true
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "最后修改时间",
                "type": "LastModifiedTime",
                "id": "U",
                "data": {
                    "watch_all": true,
                    "number_format": "yyyy/m/d hh:mm:ss;@"
                }
            }
        ]
    }
```

### 值:
string 符合定义中格式的时间字符串

CreateRecord 请求样例

```
    "records": [
        {
            "fields_value": "{\"最后修改时间\":\"2024/12/10 10:10:10\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"最后修改时间\":\"2024/12/10 10:10:10\"}",
                "id": "h"
            }
        ]
    }
```

## 11.Formula 公式
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Formula | 公式 | formula, number_format |value_type|

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|formula|公式|公式字符串|"=[单件盈利]*[件数]"|
|number_format|数字格式配置|标准数字格式字符串|"0.00%": 12.34%|
|value_type|公式结果类型|Fvt_number/Fvt_Text...|formula=[多行文本]: value_type=Fvt_Text|

CreateField 请求样例
```
    "fields": [
        {
            "name": "公式",
            "type": "Formula",
            "data": {
                "formula": "=[单件盈利]*[件数]",
                "number_format": "0.00%",
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "公式",
                "type": "Formula",
                "id": "Hj",
                "data": {
                    "formula": "=[单件盈利]*[件数]",
                    "number_format": "0.00%",
                    "value_type": "Fvt_number"
                }
            }
        ]
    }
```

### 值:
string/int/float... 等符合定义中格式的公式结果. 具体类别可以使用返回值中的 value_type 来判断

CreateRecord 请求样例

这是一个自动字段, 不支持手动录入

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"公式\":125}",
                "id": "h"
            }
        ]
    }
```

## 12.AutoNumber 编号
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| AutoNumber | 编号 | number_format ||

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|数字格式配置|标准数字格式字符串|"000000": 000001|

CreateField 请求样例
```
    "fields": [
        {
            "name": "编号",
            "type": "AutoNumber",
            "data": {
                "number_format": "000000"
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "编号",
                "type": "AutoNumber",
                "id": "Hj",
                "data": {
                    "number_format": "000000"
                }
            }
        ]
    }
```

### 值:
string 

CreateRecord 请求样例

这是一个自动字段, 不支持手动录入

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"编号\":\"000001\"}",
                "id": "h"
            }
        ]
    }
```

## 13.CreatedTime 创建时间
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| CreatedTime | 创建时间 | number_format ||

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|number_format|数字格式配置|标准数字格式字符串|"yyyy-mm-dd hh:mm;@": 2024-12-10 10:10|

CreateField 请求样例
```
    "fields": [
        {
            "name": "创建时间",
            "type": "CreatedTime",
            "data": {
                "number_format": "yyyy-mm-dd hh:mm;@"
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "创建时间",
                "type": "CreatedTime",
                "id": "Hj",
                "data": {
                    "number_format": "yyyy-mm-dd hh:mm;@"
                }
            }
        ]
    }
```

### 值:
string 符合定义中格式的时间字符串

CreateRecord 请求样例

这是一个自动字段, 不支持手动录入

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"创建时间\":\"2024-12-10 10:10\"}",
                "id": "h"
            }
        ]
    }
```

## 14.Link  关联
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Link | 关联 | link_sheet, link_view, is_auto, multiple_links, filter | link_field, support_multi |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|link_sheet|关联表id|int|12|
|link_view|关联表视图id|string|"Y"|
|is_auto|是否自动关联|bool|true|
|multiple_links|是否允许关联多条记录|bool|true|
|filter|选填, 自动关联条件, 仅自动关联需要|FieldLinkFilter|AND 单据状态=已审核|
|link_field|关联字段id|string|"FV"|
|support_multi|是否支持多选|bool|true|


FieldLinkFilter

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|mode|筛选条件模式|string|"And"|
|conditions|筛选条件|[]FieldLinkCondition|[{"current_sheet_field_id":"B","link_sheet_field_id":"B"}]|

CreateField 请求样例
```
    "fields": [
        {
            "name": "关联",
            "type": "Link",
            "data": {
                "link_sheet": 12,
                "link_view": "Y",
                "is_auto": true,
                "multiple_links": true,
                "filter": {
                    "mode": "And",
                    "conditions": [
                        {
                            "current_sheet_field_id": "B",
                            "link_sheet_field_id": "B"
                        }
                    ]
                }
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "关联",
                "type": "Link",
                "id": "Hj",
                "data": {
                    "link_sheet": 12,
                    "link_view": "Y",
                    "is_auto": true,
                    "multiple_links": true,
                    "filter": {
                        "mode": "And",
                        "conditions": [
                            {
                                "current_sheet_field_id": "B",
                                "link_sheet_field_id": "B",
                            }
                        ]
                    }
                }
            }
        ]
    }
```

### 值:
[]string 关联的记录id

CreateRecord 请求样例

```
    "records": [
        {
            "fields_value": "{\"关联：数据表(2)\":[\"H\"]}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"关联：数据表(2)\":[\"H\"]}",
                "id": "h"
            }
        ]
    }
```

## 15.Lookup 引用
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Lookup | 引用 | link_field, lookup_field, aggregation, base_type, filter, lookup_sheet_id | |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|link_field|对应的关联字段 id|string|"FV"|
|lookup_field|引用关联的表中要引用的字段id|string|"FV"|
|aggregation|聚合函数类别. 可选: ToString（连接字符串）, Origin（原始字段）, Sum（求和）, Counta（计数）, Average（平均值）, Max（最大值）, Min（最小值）, Unique（去重）, CountaUnique（去重计数）|string|"ToString"|
|base_type|引用字段的类型 1. 引用字段，2.统计字段，3.查找字段。类型为1时，就不用传lookupSheetId和filter了|string|"1"|
|filter|自动引用条件, 和自动关联一样，这里是筛选条件。在这里仅统计字段和查找字段能使用filter|FieldLinkFilter|AND 单据状态=已审核|
|lookup_sheet_id|引用的表，这个字段一般和linkField互斥，因为有引用的表，所以就不需要linkField去指定了|int|12|

FieldLinkFilter
参照 14.Link

CreateField 请求样例
```
    "fields": [
        {
            "name": "引用",
            "type": "Lookup",
            "data": {
                "aggregation": "ToString",
                "link_field": "Gr",
                "lookup_field": "Dm",
                "base_type": "MultiLineText"
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "引用",
                "type": "Lookup",
                "id": "Hj",
                "data": {
                    "aggregation": "ToString",
                    "link_field": "Gr",
                    "lookup_field": "Dm",
                    "base_type": "MultiLineText"
                }
            }
        ]
    }
```

### 值:
[]struct 引用的记录的实际类型值

CreateRecord 请求样例

这是一个自动字段, 不支持手动录入

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"引用文本 (数据表(2))\":[\"AA\"]}",
                "id": "h"
            }
        ]
    }
```

## 16.Url 超链接
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Url | 超链接 | display_text|  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|display_text|以按钮显示，并指定按钮名称. 不填则显示|string|"点我前往"|

CreateField 请求样例
```
    "fields": [
        {
            "name": "超链接",
            "type": "Url",
            "data": {
                "display_text": "点我前往"
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "超链接",
                "type": "Url",
                "id": "Hj",
                "data": {
                    "display_text": "点我前往"
                }
            }
        ]
    }
```

### 值:
struct 超链接结构体

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|address|超链接地址|string|"https://www.baidu.com"|
|displayText|超链接显示文本, 显示文本仅在非按钮模式下有效|string|"百度"|

CreateRecord 请求样例

```
    "records": [
        {
            "fields_value": "{\"超链接\":{\"address\":\"https://www.baidu.com\",\"displayText\":\"百度\"}}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"超链接\":[{\"address\":\"https://www.baidu.com\",\"displayText\":\"https://www.baidu.com\"}]}",
                "id": "h"
            }
        ]
    }
```

## 17. SingleSelect 单选项
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| SingleSelect | 单选项 | items, allow_add_item_while_inputting|  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|items|选项|[]FieldSelectItem|"{\"color\":4283466178,\"value\":\"女\"}"|
|allow_add_item_while_inputting|是否允许在输入时添加选项|bool|true|

### FieldSelectItem
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|color|选项颜色|int|4283466178|
|value|选项值|string|"女"|
|id|选项id, 仅返回值含有|string|"G"|


CreateField 请求样例
```
    "fields": [
        {
        "name": "   单选项",
            "type": "SingleSelect",
            "data": {
                "items": [
                    {
                        "value": "选项1"
                    }, 
                    {
                        "value": "选项2"
                    }
                ]
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "单选项",
                "type": "SingleSelect",
                "id": "Hj",
                "data": {
                    "items": [
                        {
                            "color": 4292930553,
                            "value": "选项1",
                            "id": "G"
                        },
                        {
                            "color": 4283466179,
                            "value": "选项2",
                            "id": "H"
                        }
                    ]
                }
            }
        ]
    }
```

### 值:
string 选中的选项值

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"单选项\":\"选项1\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"单选项\":\"选项1\"}",
                "id": "h"
            }
        ]
    }
```


## 18. MultipleSelect 多选项
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| MultipleSelect | 多选项 | items, allow_add_item_while_inputting|  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|items|选项|[]FieldSelectItem|"{\"color\":4283466178,\"value\":\"女\"}"|
|allow_add_item_while_inputting|是否允许在输入时添加选项|bool|true|

### FieldSelectItem
参考 17. SingleSelect


CreateField 请求样例
```
    "fields": [
        {
        "name": "   多选项",
        "type": "MultipleSelect",
            "data": {
                "items": [
                    {
                        "value": "选项1"
                    }, 
                    {
                        "value": "选项2"
                    }
                ]
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "单选项",
                "type": "SingleSelect",
                "id": "Hj",
                "data": {
                    "items": [
                        {
                            "color": 4292930553,
                            "value": "选项1",
                            "id": "G"
                        },
                        {
                            "color": 4283466179,
                            "value": "选项2",
                            "id": "H"
                        }
                    ]
                }
            }
        ]
    }
```

### 值:
[]string 选中的选项值

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"多选项\":[\"选项1\",\"选项2\"]}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"多选项\":[\"选项1\",\"选项2\"]}",
                "id": "h"
            }
        ]
    }
```

## 19. Rating 等级
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Rating | 等级 | max|  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|max_value|等级最大值|int|5|


CreateField 请求样例
```
    "fields": [
        {
        "name": "   等级",
        "type": "Rating",
            "data": {
                "max_value": 5
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "等级",
                "type": "Rating",
                "id": "Hj",
                "data": {
                    "max_value": 5
                }
            }
        ]
    }
```

### 值:
int

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"等级\":3}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
                "fields": "{\"等级\":3}",
                "id": "h"
            }
        ]
    }
```

## 20. Contact 联系人
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Contact | 联系人 | default_value_type, default_value, multiple_contacts, notice_new_contact|support_multi  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|default_value_type|填入人员类型. 可选: RecordCreator, 记录创建者; Normal, 搭配 defaultValue=用户uid 填入指定人|string|"RecordCreator"|
|multiple_contacts|是否支持多联系人|bool|true|
|notice_new_contact|是否通知该联系人|bool|true|
|support_multi|是否支持多联系人, 仅返回值含有, 创建/更新时不填|bool|true|


CreateField 请求样例
```
    "fields": [
        {
        "name": "   联系人",
        "type": "Contact",
            "data": {
                "default_value_type": "RecordCreator",
                "multiple_contacts": true,
                "notice_new_contact": true
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "联系人",
                "type": "Contact",
                "id": "Hj",
                "data": {
                    "default_value_type": "RecordCreator",
                    "default_value_array": [
                        {
                            "avatar": "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
                            "company_id": "1234567890",
                            "id": "1234567890",
                            "nick_name": "张三"
                        }
                    ],
                    "multiple_contacts": true,
                    "notice_new_contact": true
                }
            }
        ]
    }
```

### 值:
[]struct 联系人结构体数组
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|id|联系人id|string|"1234567890"|
|nickname|联系人昵称|string|"张三"|
|avatar_url|联系人头像|string|"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"|


CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"联系人\":[{\"id\":\"1234567890\",\"nickname\":\"张三\",\"avatar_url\":\"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png\"}]}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"联系人\":[{\"id\":\"1234567890\",\"nickname\":\"张三\",\"avatar_url\":\"https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png\"}]}",
                "id": "h"
            }
        ]
    }
```

## 21. Attachment 附件
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Attachment | 附件 | only_upload_by_camera  |

|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|only_upload_by_camera|是否仅支持用户拍照上传|bool|true|


CreateField 请求样例
```
    "fields": [
        {
        "name": "   附件",
        "type": "Attachment",
            "data": {
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "附件",
                "type": "Attachment",
                "id": "Hj",
                "data": {
                    "only_upload_by_camera": true
                }
            }
        ]
    }
```

### 值:
[]struct 附件结构体数组
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|uploadId|附件id|string|"1234567890"|
|fileName|附件名|string|"张三头像"|
|size|附件大小|int|12345|
|source|附件源, 目前支持Cloud或Upload_Ks3|string|"Cloud"|
|type|附件类型|string|"image/png"|
|linkUrl|选填, 附件链接地址|string|"https://www.baidu.com"|
|imgSize|选填, 附件尺寸 (图片类型)|string|"1234*5678"|


CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"附件\":[{\"uploadId\":\"1234567890\",\"fileName\":\"张三头像\",\"size\":12345,\"source\":\"Cloud\",\"type\":\"image/png\",\"linkUrl\":\"https://www.baidu.com\",\"imgSize\":\"1234*5678\"}]}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"附件\":[{\"uploadId\":\"1234567890\",\"fileName\":\"张三头像\",\"size\":12345,\"source\":\"Cloud\",\"type\":\"image/png\",\"linkUrl\":\"https://www.baidu.com\",\"imgSize\":\"1234*5678\"}]}",
                "id": "h"
            }
        ]
    }
```


## 22. Address 地址
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Address | 地址 | address_level, detailed_address, preset_address  |


|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|address_level|地址层级, 省/市/区/街道/社区; 1: 省, 2: 省/市, ... 5: 省/市/区/街道/社区|int|1|
|detailed_address|是否启用详细地址, 若启用则会要求用户除省市区街社外额外输入详细地址|bool|true|
|preset_address|预设指定地区值|FieldAddressPreset|"{\"address\":\"北京市海淀区\"}"|

FieldAddressPreset
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|detail|详细地址|string|"北京市海淀区"|
|districts|按设定的地址层级填写|[]string|如 address_level=3, ["广东省","珠海市","香洲区"]|

CreateField 请求样例
```
    "fields": [
        {
        "name": "地址",
        "type": "Address",
            "data": {
                "address_level": 3,
                "detailed_address": true,
                "preset_address": {
                    "detail": "前岛环路329号金山软件园",
                    "districts": [
                        "广东省",
                        "珠海市",
                        "香洲区"
                    ]
                }
            }
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "地址",
                "type": "Address",
                "id": "Hj",
                "data": {
                    "address_level": 3,
                    "detailed_address": true,
                    "preset_address": {
                        "detail": "前岛环路329号金山软件园",
                        "districts": [
                            "广东省",
                            "珠海市",
                            "香洲区"
                        ]
                    }
                }
            }
        ]
    }
```

### 值:
<!-- Address             "字段名/id": {
                        districts: [
                            "districts_1",
                            "districts_2", ...
                        ],
                        detail: "{string_content}",
                        type:"Address"
                    } -->
struct 地址结构体
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|districts|分级地址|[]string|["广东省","珠海市","香洲区"]|
|detail|详细地址|string|"前岛环路329号金山软件园"|

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"地址\":{\"districts\":[\"广东省\",\"珠海市\",\"香洲区\"],\"detail\":\"前岛环路金山软件园\"}}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"地址\":{\"districts\":[\"广东省\",\"珠海市\",\"香洲区\"],\"detail\":\"前岛环路金山软件园\"}}",
                "id": "h"
            }
        ]
    }
```

## 23. Note 富文本
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Note | 富文本 |  |  |

该字段的定义没有特有属性

CreateField 请求样例
```
    "fields": [
        {
        "name": "富文本",
        "type": "Note",
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "富文本",
                "type": "Note",
                "id": "Hj",
            }
        ]
    }
```

### 值:
struct 富文本结构体 
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|fileId|文件id|string|"1234567890"|
|summary|文件摘要|string|"张三自我绍介"|
|modifyDate|文件修改时间|string|"2024/12/09 12:00:00"|


CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"富文本\":{\"fileId\":\"1234567890\",\"summary\":\"张三自我绍介\",\"modifyDate\":\"2024/12/09 12:00:00\"}}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"富文本\":{\"fileId\":\"1234567890\",\"summary\":\"张三自我绍介\",\"modifyDate\":\"2024/12/09 12:00:00\"}}",
                "id": "h"
            }
        ]
    }
```

## 24. Checkbox 复选框
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Checkbox | 复选框 |  |  |

该字段的定义没有特有属性

CreateField 请求样例
```
    "fields": [
        {
        "name": "复选框",
        "type": "Checkbox"
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "复选框",
                "type": "Checkbox",
                "id": "Hj"
            }
        ]
    }
```

### 值:
bool

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"复选框\":true}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"复选框\":true}",
            "id": "h"
            }
        ]
    }
```

## 25. Complete 进度
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Complete | 进度 |  |  |

该字段的定义没有特有属性

CreateField 请求样例
```
    "fields": [
        {
        "name": "进度",
        "type": "Complete"
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "进度",
                "type": "Complete",
                "id": "Hj"
            }
        ]
    }
```

### 值:
int

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"进度\":100}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"进度\":100}",
                "id": "h"
            }
        ]
    }
```

## 26. Email 邮箱
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| Email | 邮箱 |  |  |

该字段的定义没有特有属性

CreateField 请求样例
```
    "fields": [
        {
        "name": "邮箱",
        "type": "Email"
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "邮箱",
                "type": "Email",
                "id": "Hj",
            }
        ]
    }
```

### 值:
string

CreateRecord 请求样例

```
    "records": [
        {
        "fields_value": "{\"邮箱\":\"1234567890@qq.com\"}"
        }
    ]
```

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"邮箱\":\"1234567890@qq.com\"}",
                "id": "h"
            }
        ]
    }
```


## 27. CreatedBy 创建人
### 定义:
| 字段类型 | 说明 | 字段的特有属性 | 仅响应有的特有属性 |
| -------- | ---- | -------- | -------- |
| CreatedBy | 创建人 |  |  |

该字段的定义没有特有属性

CreateField 请求样例
```
    "fields": [
        {
        "name": "创建人",
        "type": "CreatedBy"
        }
    ]
```

GetField 返回样例
```
    "data": {
        "fields": [
            {
                "name": "创建人",
                "type": "CreatedBy",
                "id": "Hj",
            }
        ]
    }
```

### 值:
struct 创建人结构体
|属性|说明|传入内容与效果|样例|
|--------|----|--------|--------|
|id|创建人id|string|"1234567890"|
|nickName|创建人昵称|string|"张三"|

CreateRecord 请求样例

这是一个自动字段, 不需要传入

CreateRecord 返回样例
```
    "data": {
        "records": [
            {
            "fields": "{\"创建人\":{\"id\":\"1234567890\",\"nickName\":\"张三\"}}",
                "id": "h"
            }
        ]
    }
```

## 示例
### CreateField:
请求
```
{
    "fields": [
        {
            "name": "日期",
            "type": "Date",
            "data": {
                "number_format": "yyyy\"年\"m\"月\"d\"日\";@",
                "default_value_type": "Normal",
                "default_value": "2024/11/23"
            }
        },
        {
            "name": "日期",
            "type": "Date",
            "data": {
                "number_format": "yyyy/mm/dd",
                "default_value_type": "RecordCreateTime"
            }
        },
        {
            "name": "时间",
            "type": "Time",
            "data": {
                "number_format": "hh:mm:ss;@"
            }
        },
        {
            "name": "数字",
            "type": "Number",
            "data": {
                "number_format": "0_ "
            }
        },
        {
            "name": "货币",
            "type": "Currency",
            "data": {
                "number_format": "$#,##0.000_ "
            }
        },
        {
            "name": "多行文本",
            "type": "MultiLineText",
            "data": {
                "unique_value": false
            }
        },
        {
            "name": "百分比",
            "type": "Percentage",
            "data": {
                "number_format": "0.00%"
            }
        },
        {
            "name": "身份证",
            "type": "Id",
            "data": {
                "unique_value": true
            }
        },
        {
            "name": "电话",
            "type": "Phone",
            "data": {
                "unique_value": false
            }
        },
        {
            "name": "最后修改者",
            "type": "LastModifiedBy",
            "data": {
                "watch_all": true
            }
        },
        {
            "name": "最后修改时间",
            "type": "LastModifiedTime",
            "data": {
                "number_format": "hh:mm:ss;@",
                "watch_all": true
            }
        },
        {
            "name": "公式",
            "type": "Formula",
            "data": {
                "formula": "=[数字]+[货币]",
                "number_format": "0_ "
            }
        },
        {
            "name": "编号",
            "type": "AutoNumber",
            "data": {
                "number_format": "000000"
            }
        },
        {
            "name": "创建时间",
            "type": "CreatedTime",
            "data": {
                "number_format": "yyyy-mm-dd hh:mm;@"
            }
        },
        {
            "name": "超链接",
            "type": "Url",
            "data": {
                "display_text": "点击访问"
            }
        },
        {
            "name": "单选项",
            "type": "SingleSelect",
            "data": {
                "allow_add_item_while_inputting": true,
                "items": [
                    {
                        "value": "选项1",
                        "id": "1"
                    },
                    {
                        "value": "选项2",
                        "id": "2"
                    }
                ]
            }
        },
        {
            "name": "多选项",
            "type": "MultipleSelect",
            "data": {
                "allow_add_item_while_inputting": false,
                "items": [
                    {
                        "value": "多选选项1",
                        "id": "1"
                    },
                    {
                        "value": "多选选项2",
                        "id": "2"
                    }
                ]
            }
        },
        {
            "name": "等级",
            "type": "Rating",
            "data": {
                "max": 5
            }
        },
        {
            "name": "联系人",
            "type": "Contact",
            "data": {
                "default_value_type": "RecordCreator",
                "notice_new_contact": true
            }
        },
        {
            "name": "联系人-指定人",
            "type": "Contact",
            "data": {
                "default_value_type": "Normal",
                "default_value": "28******14",
                "multiple_contacts": true
            }
        },
        {
            "name": "附件",
            "type": "Attachment",
            "data": {
                "only_upload_by_camera": false
            }
        },
        {
            "name": "地址",
            "type": "Address",
            "data": {
                "address_level": 3,
                "detailed_address": true,
                "preset_address": {
                    "detail": "预设地址详情",
                    "districts": [
                        "广东省",
                        "珠海市",
                        "香洲区"
                    ]
                }
            }
        },
        {
            "name": "富文本",
            "type": "Note"
        },
        {
            "name": "复选框",
            "type": "Checkbox"
        },
        {
            "name": "进度",
            "type": "Complete"
        },
        {
            "name": "邮箱",
            "type": "Email"
        },
        {
            "name": "创建人",
            "type": "CreatedBy"
        }
    ],
    "prefer_id": false
}
```

返回
```
{
    "code": 0,
    "msg": "",
    "data": {
        "fields": [
            {
                "name": "日期",
                "type": "Date",
                "id": "T",
                "data": {
                    "default_value": "2024/11/23",
                    "default_value_type": "Normal",
                    "number_format": "yyyy\"年\"m\"月\"d\"日\";@"
                }
            },
            {
                "name": "日期2",
                "type": "Date",
                "id": "U",
                "data": {
                    "default_value": "",
                    "default_value_type": "Normal",
                    "number_format": "yyyy/mm/dd"
                }
            },
            {
                "name": "时间",
                "type": "Time",
                "id": "V",
                "data": {
                    "number_format": "hh:mm:ss;@"
                }
            },
            {
                "name": "数字",
                "type": "Number",
                "id": "W",
                "data": {
                    "number_format": "0_ "
                }
            },
            {
                "name": "货币",
                "type": "Currency",
                "id": "X",
                "data": {
                    "number_format": "$#,##0.000_ "
                }
            },
            {
                "name": "多行文本",
                "type": "MultiLineText",
                "id": "Y",
                "data": {
                    "unique_value": false
                }
            },
            {
                "name": "百分比",
                "type": "Percentage",
                "id": "Z",
                "data": {
                    "number_format": "0.00%"
                }
            },
            {
                "name": "身份证",
                "type": "ID",
                "id": "a",
                "data": {
                    "unique_value": false
                }
            },
            {
                "name": "电话",
                "type": "Phone",
                "id": "b",
                "data": {
                    "unique_value": false
                }
            },
            {
                "name": "最后修改者",
                "type": "LastModifiedBy",
                "id": "c",
                "data": {
                    "watch_all": true
                }
            },
            {
                "name": "最后修改时间",
                "type": "LastModifiedTime",
                "id": "d",
                "data": {
                    "number_format": "hh:mm:ss;@",
                    "watch_all": true
                }
            },
            {
                "name": "公式",
                "type": "Formula",
                "id": "e",
                "data": {
                    "formula": "=[数字]+[货币]",
                    "number_format": "0_ ",
                    "value_type": ""
                }
            },
            {
                "name": "编号",
                "type": "AutoNumber",
                "id": "f",
                "data": {
                    "number_format": "000000"
                }
            },
            {
                "name": "创建时间",
                "type": "CreatedTime",
                "id": "g",
                "data": {
                    "number_format": "yyyy-mm-dd hh:mm;@"
                }
            },
            {
                "name": "超链接",
                "type": "Url",
                "id": "h",
                "data": {
                    "display_text": "点击访问"
                }
            },
            {
                "name": "单选项",
                "type": "SingleSelect",
                "id": "i",
                "data": {
                    "allow_add_item_while_inputting": true,
                    "items": [
                        {
                            "color": 4283466178,
                            "id": "I",
                            "value": "选项1"
                        },
                        {
                            "color": 4281378020,
                            "id": "J",
                            "value": "选项2"
                        }
                    ]
                }
            },
            {
                "name": "多选项",
                "type": "MultipleSelect",
                "id": "j",
                "data": {
                    "allow_add_item_while_inputting": true,
                    "items": [
                        {
                            "color": 4283466178,
                            "id": "K",
                            "value": "多选选项1"
                        },
                        {
                            "color": 4281378020,
                            "id": "L",
                            "value": "多选选项2"
                        }
                    ]
                }
            },
            {
                "name": "等级",
                "type": "Rating",
                "id": "k",
                "data": {
                    "max": 5
                }
            },
            {
                "name": "联系人",
                "type": "Contact",
                "id": "l",
                "data": {
                    "default_value": "",
                    "default_value_type": "Normal",
                    "multiple_contacts": false,
                    "notice_new_contact": false,
                    "support_multi": false
                }
            },
            {
                "name": "联系人-指定人",
                "type": "Contact",
                "id": "m",
                "data": {
                    "default_value": "",
                    "default_value_type": "Normal",
                    "multiple_contacts": true,
                    "notice_new_contact": false,
                    "support_multi": true
                }
            },
            {
                "name": "附件",
                "type": "Attachment",
                "id": "n",
                "data": {
                    "only_upload_by_camera": false
                }
            },
            {
                "name": "地址",
                "type": "Address",
                "id": "o",
                "data": {
                    "address_level": 3,
                    "detailed_address": true
                }
            },
            {
                "name": "富文本",
                "type": "Note",
                "id": "p",
                "data": null
            },
            {
                "name": "复选框",
                "type": "Checkbox",
                "id": "q",
                "data": null
            },
            {
                "name": "进度",
                "type": "Complete",
                "id": "r",
                "data": null
            },
            {
                "name": "邮箱",
                "type": "Email",
                "id": "s",
                "data": null
            },
            {
                "name": "创建人",
                "type": "CreatedBy",
                "id": "t",
                "data": null
            }
        ]
    }
}
```

### CreateRecord:
请求
```
{
    "prefer_id": false,
    "records": [
        {
            "fields_value": 经过 json.stringify 的下述 json 字符串
        }
    ]
}
```

```
{
  "日期": "2025/11/15",
  "时间": "11:12:15",
  "数字": 125,
  "货币": 215,
  "多行文本": "yesit'sright",
  "百分比": 98,
  "身份证": "110101**************9",
  "电话": "18800000000",
  "超链接": {
    "address": "https://www.baidu.com",
    "displayText": "百度"
  },
  "单选项": "选项1",
  "多选项": [
    "多选选项1",
    "多选选项2"
  ],
  "等级": "2",
  "联系人": [
    {
      "id": "281653414",
      "nickname": "nickName1"
    }
  ],
  "地址": {
    "districts": [
      "广东省",
      "珠海市",
      "香洲区"
    ],
    "detail": "前岛环路金山软件园"
  },
  "富文本": {
    "fileId": "GEYDAMJTHE3DKMJYHE2DURKDINBUQS2ZGRAUGUKIKE",
    "summary": "富文本简略内容",
    "modifyDate": "2025/12/31"
  }
}
```

返回
```
{
    "code": 0,
    "msg": "",
    "data": {
        "records": [
            {
                "fields": 经过 json.stringify 的下述 json 字符串,
                "id": "V"
            }
        ]
    }
}
```

```
{
  "公式": 340,
  "创建人": {
    "avatar": "https://imagebucket.test.wpscdn.cn/281*********************************808808488955443",
    "id": "280026893",
    "nickName": "霧雨澪音"
  },
  "创建时间": "2024/12/09 17:47:18",
  "单选项": "选项1",
  "地址": {
    "detail": "前岛环路金山软件园",
    "districts": [
      "广东省",
      "珠海市",
      "香洲区"
    ],
    "type": "Address"
  },
  "复选框": false,
  "多行文本": "yesit'sright",
  "多选项": [
    "多选选项1",
    "多选选项2"
  ],
  "富文本": {
    "fileId": "GEYDAMJTHE3DKMJYHE2DURKDINBUQS2ZGRAUGUKIKE",
    "modifyDate": "1970/01/01 00:00:00",
    "summary": "富文本简略内容"
  },
  "数字": 125,
  "日期": "2025/11/15",
  "时间": "11:12:15",
  "最后修改时间": "2024/12/09 17:47:18",
  "最后修改者": {
    "avatar": "https://imagebucket.test.wpscdn.cn/281*********************************808808488955443",
    "id": "280026893",
    "nickName": "霧雨澪音"
  },
  "电话": "18800000000",
  "百分比": 98,
  "等级": 2,
  "编号": 2,
  "联系人": {
    "id": "281653414"
  },
  "货币": 215,
  "超链接": [
    {
      "address": "https://www.baidu.com",
      "displayText": "百度"
    }
  ],
  "身份证": "110101**************9",
  "进度": 0
}
```

# View/视图 类型说明

## 通用属性
| 属性 | 说明 | 传入值 | 样例 |
| -------- | ---- | -------- | -------- |
| name | 该字段的显示名称 | string | "表单视图" |
| type | 该字段的类型 | string | "Form" |
| id | 该视图的唯一标识 | string | "Bs" |

### 当前支持的视图类型
| 类型 | 说明 | 输入值 |
| -------- | ---- | -------- |
| Grid | 表格视图 | "Grid" |
| Kanban | 看板视图 | "Kanban" |
| Gallery | 画册视图 | "Gallery" |
| Form | 表单视图 | "Form" |
| Gantt | 甘特视图 | "Gantt" |
| Query | 查询视图 | "Query" |

## 样例

```
{
    "name": "表单视图",
    "type": "Form",
    "id": "Bs"
}
```


# Filter/筛选 类型说明

## 1. Criteria 内容筛选

| 属性 | 说明 | 传入值 | 样例 |
| -------- | ---- | -------- | -------- |
| field | 该字段的显示名称 | string | "名称" |
| operator | 筛选规则 | string | "intersected" |
| values | 该字段的值 | array[string] | ["轻维表", "12345"] |

### operator 可选类型

| 类型 | 说明 | 传入值 |
| -------- | ---- | -------- |
| Equals | 等于 | "Equals" |
| NotEqu | 不等于 | "NotEqu" |
| Greater | 大于 | "Greater" |
| GreaterEqu | 大等于 | "GreaterEqu" |
| Less | 小于 | "Less" |
| LessEqu | 小等于 | "LessEqu" |
| GreaterEquAndLessEqu | 介于（取等） | "GreaterEquAndLessEqu" |
| LessOrGreater | 介于（不取等） | "LessOrGreater" |
| BeginWith | 开头是 | "BeginWith" |
| EndWith | 结尾是 | "EndWith" |
| Contains | 包含 | "Contains" |
| NotContains | 不包含 | "NotContains" |
| Intersected | 指定值 | "Intersected" |
| Empty | 为空 | "Empty" |
| NotEmpty | 不为空 | "NotEmpty" |

各筛选规则独立地限制了values数组内最多允许填写的元素数，当values内元素数超过阈值时，该筛选规则将失效。“为空、不为空”不允许填写元素；“介于”允许最多填写2个元素；“指定值”允许填写65535个元素；其他规则允许最多填写1个元素

当前所有匹配均为文本匹配


## 使用 criteria 的筛选样例

```
"filter": {
    "mode": "AND", // 选填。表示各筛选条件之间的逻辑关系。只能是"AND"或"OR"。缺省值为"AND"
    // 可通过criteria数组定义filter的条件, criteria内不可在同一个字段上定义多个条件
    "criteria": [
        {
            "field": "名称", // 根据 preferId 与否，需要填入字段名或字段id
            "operator": "intersected"
            "values": [ 
                "轻维表"
                "12345"
            ]
        },
        {
            "field": "数量",
            "operator": "Greater",
            "values": [
                "1"
            ]
        },
    ]
}
```

