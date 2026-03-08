# WPS 协作 网页开放能力

## 配置网页跳转浏览器打开

通过在网页 URL 中拼接参数 `xz_jump_to_browser=true`，当 WPS 协作桌面端点击该页面时，会自动跳转到浏览器打开。

示例：`https://open-xz.wps.cn/?xz_jump_to_browser=true`

### 使用说明

|  客户端  | Android | iOS |  PC  |
| :------: | :-----: | :-: | :--: |
| 支持说明 |    /    |  /  | 支持 |

<br>

## 设置屏幕方向

该能力用于设定网页在屏幕展示的方式，支持强制横屏、强制竖屏、跟随系统设置。

通过在网页 URL 中拼接参数 `ksoxzOrientation=landscape/portrait/sensor`，当用户点击该页面的时候，根据对应参数决定横屏/竖屏或者跟随系统设置展示应用页面。

示例：`https://www.baidu.com?ksoxzOrientation=landscape`

### 使用说明

|  客户端  | Android | iOS  | PC  |
| :------: | :-----: | :--: | :-: |
| 支持说明 |  支持   | 支持 |  /  |

<br>

---

## 配置网页导航栏样式

在网页 URL 中拼接特定参数，在跳转目标页面后，根据参数内容实现对目标页面导航栏的样式调整。

示例：

- `http://woa.wps.cn/path/page?ksoxzHideTitle=true&ksoxzShowMenuItem=true`
- `https://woa.wps.cn/path/page?ksoxzHideTitle=true`

Deeplink 协议示例:

- `ksoxz://xz.wps.cn/webapp?app_id=xxxxxx&url=xxxxxx&ksoxzHideNavBar=ture&mode=xxxx`

## 使用说明

|  客户端  | Android | iOS  |  PC  |
| :------: | :-----: | :--: | :--: |
| 支持说明 |  支持   | 支持 | 支持 |

## 参数说明

|          参数           |  类型   |                                                                      描述                                                                       |                                                            备注                                                             |
| :---------------------: | :-----: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: |
|         app_id          | string  |                                                                     应用 ID                                                                     |                                                              /                                                              |
|           url           | string  |                                                              应用链接（UrlEncode）                                                              |                                                              /                                                              |
|     ksoxzHideNavBar     | boolean |                            控制是否隐藏整个顶部导航栏。如果为 true，则隐藏导航栏如果为 false 或未设置，则显示导航栏                             |                                         注：在 deeplink 中需拼接在 url 中并 Encode                                          |
|     ksoxzHideTitle      | boolean |                              控制是否隐藏导航栏中的标题。如果为 true，则隐藏标题如果为 false 或未设置，则显示标题                               |                                         注：在 deeplink 中需拼接在 url 中并 Encode                                          |
|    ksoxzShowMenuItem    | boolean |      控制是否显示导航栏的功能按钮（包括但不限于 返回、更多功能&关闭等）。如果为 true 或未设置，则显示这些按钮如果为 false，则隐藏这些按钮       |      注：如果 ksoxzHideNavBar 为 true，此参数将无效，因为整个导航栏都被隐藏了。在 deeplink 中需拼接在 url 中并 Encode       |
| ksoxzHideNavLeftButton  | boolean | 控制是否隐藏导航栏的左侧功能按钮（包括但不限于【返回】&【关闭】）如果为 false 或未设置，则显示导航栏左侧按钮如果为 true，则隐藏导航栏左侧按钮） |             注：仅移动端适用如果 ksoxzHideNavBar 为 true，此参数将无效。在 deeplink 中需拼接在 url 中并 Encode              |
|  ksoxzHideNavRriButton  | boolean |  控制是否隐藏导航栏的右侧 【更多操作】操作功能按钮如果为 false 或未设置，则显示导航栏【更多操作】按钮如果为 true，则隐藏导航栏【更多操作】按钮  | 注：仅移动端适用如果 ksoxzHideNavBar 或 ksoxzHideNavRriButton 为 true，此参数将无效。在 deeplink 中需拼接在 url 中并 Encode |
| ksoxzHideNavCloseButton | boolean |          控制是否显示导航栏的右侧 【关闭】功能按钮如果为 false 或未设置，则显示导航栏【关闭】按钮如果为 true，则隐藏导航栏【关闭】按钮          | 注：仅移动端适用如果 ksoxzHideNavBar 或 ksoxzHideNavRriButton 为 true，此参数将无效。在 deeplink 中需拼接在 url 中并 Encode |
|          mode           | string  |              main_webview：主窗口模式（4.10.0 及以上版本支持）sidebar：聊天界面右侧 window：独立窗口模式（3.13.0 及以上版本支持）               |                                                        仅 PC 端适用                                                         |

注：开发者使用该能力时需注意以下事项，当同一 url 中业务参数存在重复或对展示/隐藏效果存在冲突时，响应参数优先级规则如下。

- 当以下参数在 url 中冲突时，优先响应的规则为：ksoxzHideNavBar ＞ ksoxzShowMenuItem&ksoxzHideTitle ＞ ksoxzHideNavRriButton
- 当同一参数在 url 中多次使用且实现效果是冲突时，优先响应的规则为 true ＞ false

<br>
