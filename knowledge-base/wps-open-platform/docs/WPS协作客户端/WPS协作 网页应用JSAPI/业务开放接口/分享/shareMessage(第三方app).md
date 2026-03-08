# shareMessage（第三方 app）

分享内容到第三方应用。

> 网页应用需要完成[鉴权](/app-integration-dev/wps365/client/web-jsapi/jsapiAuth.html)后调用该接口。

## 支持说明

| 客户端平台 | WPS 协作版本要求 |
| ---------- | ---------------- |
| iOS        | >=4.25.0         |
| Android    | >=4.25.0         |

## 参数说明

| 参数                | 类型                   | 是否必须 | 描述                                                                                                                           |
| ------------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| type                | String                 | 是       | 分享的消息类型。可能值：<br>`text`：普通文本消息<br/>`webPage`：网页<br/>`miniProgram`：小程序注意：小程序不支持分享到朋友圈。 |
| channelType         | String[]               | 是       | 分享平台。可能值：<br/>`wx`：微信<br/>`wx_moments`：微信朋友圈注意：私网客户端暂不支持微信分享。                               |
| channelObject       | TextWebPageMiniProgram | 是       | 分享的 JSON 数据。详见下方示例代码（参考）                                                                                     |
| showAIAgentEntrance | boolean                | 否       | 是否需要展示数字员工 tab,默认为 false(5.33新增)                                                                                          |

Text:

```
{
    "text":"你好"
}
```

WebPage:

```
{
    "title": "小程序标题",
    "description": "小程序描述",
    "webpageUrl": "https://www.baidu.com",
    //注意: 如果使用前端转换工具将图片转成base64编码时，
    //可能会在base64编码开头携带图片格式信息(例如:data:image/png;base64,)。
    //对于这种情况，需要在为image参数赋值时去掉图片格式信息。
    "thumbImage": "iVBORw0KGgoAAAANSUhEUgAAAHkAAAB4CAYAAADWpl3sAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATESURBVHgB7d0/bBxFFMfxN3tncjixOf4lIAQ6C1GBRAJdqosEbvNHoqAAUpoKF0QRVe4qBInkK5DsDiMXQIOdCgSRbApMlZBIFEgk8gWaJDQhIv7D3e6wE7C0OpGb2Z1beLvv96ksZexiv57NvM06JgIAAAAAAAAAAAAoFEUemu/rxthY7yhFdDD+So00n/vUw4oem6gQ3J/W4ZWKqv6gIvr2g9dVlzLKFPmVs72mIn0m/rBJGT39qKJH9gYEbrSixWoYtLPETn2Vp8/25uLAq+QRGNJTmk6GQbTx7mfhLKXkvJObc7o+1u+ZuAdpBLCTPQRB69xrqu283HVhtf9nh0YUGDxFUSvNjnaK/OqHWycVqbcI+FA0d/pT3XBZ6raTVXCGgJ0w0B+7rLNGNrs4rtwgYEg3Zx12s30nqwpu04xVVe+YbY01ssZhi7mgaV0x7A/N2BTPWHUCtpRSL9rWDI1c295G4BLA0wgBEFkARBYAkQVAZAEQWQBEFgCRBUBkARBZgKptwebWDuVhc2uMHqh4vSwKZN7otF/DoZF/un6DtMonRL9fp8nNcYL84XYtACILgMgCILIAiCwAIguAyAIgsgCILAAiC4DIAiCyAIgsACILgMgCILIAiCyA9fWfIjj+ckD79hALd3eIvvs5opt3iI1SRD4RRz4wyed9sZkjFZpfjWj5Ykgc4Hadk7ePmG88YgGRc3T4OR6XF5FzxOWvEETO0bXfNHGAyDm58TvRNz9GxAEi52RhtU9cIHIOvo538PpVHrdqA5FzsLTO4za9C5FHzAS+eYfPLjZK8cTr6i1z0BnNhTWPR5/dn230MYetpXUeT7mSShG5vTK6Q878m9kvydL3/AIbuF0nTD8fZN7FV37VbEamQYic8Mbh7Jfj3Jc8d7GByP8wgQ88lG0Xm5GJ22ErCZGJ7v1r0YmXsl2Kvw9bPG/TuxCZzC6u0N5atl1sDlucd7EhPrLZxdMvZN/FXA9bSeIjt45lH5na5/k8nx5GdGSfkckctq7d4n2b3iU6ctaR6Y9t/oetJLGRfUam5Uu8R6ZBIiP7j0x8H3z8G5GRfUemohEX2WdkMoetIoxMg8RF9hmZinTYShIV2Wdk4vgygCtRkbOOTOaw9cXFYu5iQ0xkn5HJHLbu7hRzFxsiIvuOTEU8bCWJiOwzMp36vBjPp4cpfWTfkamoh62k0kfOOjIV4WUAV6WO7DMyLV/i/zKAq1JH9hmZlgs8Mg0qbWSfkYnTD6uNQikj+4xM3H5YbRRK8RMUg8z/vHP8o3LtRh94W1MARBYAkQVAZAEQWQBEFgCRBUDk4rttWzA0cndhquvyReD/o3R03bbGZSdfJmAr0rRmW2ONrEJ9noCtaqRXbGvsO3mcFgm3bK4Wv3rvwa5tkTVytzN1W5FuE7BT6YdOXZxO1935qY7W+hMCNnSk2y672HAeoYIazRIOYSyYwBdO72m5rk/96sQzMxsdpdQ75OmJx+s0OTFO4E7fOxtF7Qunap00n5f6YcgvC1OzSulD8YdrBP+lxWo/PJQ2sOH1SxIaMxsN0sFRCnQz/i6rp/ncJ/fXaWIfdvL9xGeg+MCr4gcd4eXeZm1lraUw4QAAAAAAAAAAAIAUfwFKSVTj5L5X1wAAAABJRU5ErkJggg=="
}
```

MiniProgram:

```
{
    "title": "小程序标题",
    "description": "小程序描述",
    "webpageUrl": "https://www.baidu.com",
    "userName": "小程序原始ID",
    "withShareTicket": true,
    //注意: 如果使用前端转换工具将图片转成base64编码时，
    //可能会在base64编码开头携带图片格式信息(例如:data:image/png;base64,)。
    //对于这种情况，需要在为image参数赋值时去掉图片格式信息。
    "thumbImage": "iVBORw0KGgoAAAANSUhEUgAAAHkAAAB4CAYAAADWpl3sAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAATESURBVHgB7d0/bBxFFMfxN3tncjixOf4lIAQ6C1GBRAJdqosEbvNHoqAAUpoKF0QRVe4qBInkK5DsDiMXQIOdCgSRbApMlZBIFEgk8gWaJDQhIv7D3e6wE7C0OpGb2Z1beLvv96ksZexiv57NvM06JgIAAAAAAAAAAAAoFEUemu/rxthY7yhFdDD+So00n/vUw4oem6gQ3J/W4ZWKqv6gIvr2g9dVlzLKFPmVs72mIn0m/rBJGT39qKJH9gYEbrSixWoYtLPETn2Vp8/25uLAq+QRGNJTmk6GQbTx7mfhLKXkvJObc7o+1u+ZuAdpBLCTPQRB69xrqu283HVhtf9nh0YUGDxFUSvNjnaK/OqHWycVqbcI+FA0d/pT3XBZ6raTVXCGgJ0w0B+7rLNGNrs4rtwgYEg3Zx12s30nqwpu04xVVe+YbY01ssZhi7mgaV0x7A/N2BTPWHUCtpRSL9rWDI1c295G4BLA0wgBEFkARBYAkQVAZAEQWQBEFgCRBUBkARBZgKptwebWDuVhc2uMHqh4vSwKZN7otF/DoZF/un6DtMonRL9fp8nNcYL84XYtACILgMgCILIAiCwAIguAyAIgsgCILAAiC4DIAiCyAIgsACILgMgCILIAiCyA9fWfIjj+ckD79hALd3eIvvs5opt3iI1SRD4RRz4wyed9sZkjFZpfjWj5Ykgc4Hadk7ePmG88YgGRc3T4OR6XF5FzxOWvEETO0bXfNHGAyDm58TvRNz9GxAEi52RhtU9cIHIOvo538PpVHrdqA5FzsLTO4za9C5FHzAS+eYfPLjZK8cTr6i1z0BnNhTWPR5/dn230MYetpXUeT7mSShG5vTK6Q878m9kvydL3/AIbuF0nTD8fZN7FV37VbEamQYic8Mbh7Jfj3Jc8d7GByP8wgQ88lG0Xm5GJ22ErCZGJ7v1r0YmXsl2Kvw9bPG/TuxCZzC6u0N5atl1sDlucd7EhPrLZxdMvZN/FXA9bSeIjt45lH5na5/k8nx5GdGSfkckctq7d4n2b3iU6ctaR6Y9t/oetJLGRfUam5Uu8R6ZBIiP7j0x8H3z8G5GRfUemohEX2WdkMoetIoxMg8RF9hmZinTYShIV2Wdk4vgygCtRkbOOTOaw9cXFYu5iQ0xkn5HJHLbu7hRzFxsiIvuOTEU8bCWJiOwzMp36vBjPp4cpfWTfkamoh62k0kfOOjIV4WUAV6WO7DMyLV/i/zKAq1JH9hmZlgs8Mg0qbWSfkYnTD6uNQikj+4xM3H5YbRRK8RMUg8z/vHP8o3LtRh94W1MARBYAkQVAZAEQWQBEFgCRBUDk4rttWzA0cndhquvyReD/o3R03bbGZSdfJmAr0rRmW2ONrEJ9noCtaqRXbGvsO3mcFgm3bK4Wv3rvwa5tkTVytzN1W5FuE7BT6YdOXZxO1935qY7W+hMCNnSk2y672HAeoYIazRIOYSyYwBdO72m5rk/96sQzMxsdpdQ75OmJx+s0OTFO4E7fOxtF7Qunap00n5f6YcgvC1OzSulD8YdrBP+lxWo/PJQ2sOH1SxIaMxsN0sFRCnQz/i6rp/ncJ/fXaWIfdvL9xGeg+MCr4gcd4eXeZm1lraUw4QAAAAAAAAAAAIAUfwFKSVTj5L5X1wAAAABJRU5ErkJggg==",
    "path": "小程序页面的路径，不填默认拉起小程序首页"
}
```

## 示例代码

```
const params = {
    type: 'webPage',
    content: {
        title: '金山软件欢迎你加入',
        url: 'https://www.kingsoft.com/',
        text: '描述内容xxx',
        image: 'https://bkimg.cdn.bcebos.com/pic/810a19d8bc3eb1352ac7091eac1ea8d3fd1f4416?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2UxMTY=,g_7,xp_5,yp_5/format,f_auto'
    }
};
window.ksoxz_sdk.shareMessage({params, onSuccess, onError})
```

## 错误码

| errno   | msg                   | 含义           |
| ------- | --------------------- | -------------- |
| 1041001 | User canceled         | 用户取消操作   |
| 1900000 | WeChat not installed  | 设备未安装微信 |
| 1900100 | WeChat sharing failed | 分享到微信失败 |

除以上错误外，还可能存在公共错误码，参考：[公共错误码](/app-integration-dev/wps365/client/web-jsapi/publicError)。
