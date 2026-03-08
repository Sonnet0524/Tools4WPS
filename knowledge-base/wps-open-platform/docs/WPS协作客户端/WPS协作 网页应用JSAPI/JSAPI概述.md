# JSAPI 概述

JSAPI 是面向网页应用提供的，基于 WPS 协作的网页开发工具包。<a href="https://qn.cache.wpscdn.cn/koa/sdk-demo/static/sdk/xz-sdk-v0.19.0.js" download="xz-sdk-v0.17.0.js" target='_blank'>点击下载最新包</a>。

[npm 仓库地址](https://npm.wps.cn/package/@ksxz/jssdk)。

开发者可调用 JSAPI 使用获取用户信息、选择媒体、地理位置等手机系统的能力，同时可以直接使用分享等 WPS 协作特有的能力，为用户提供更优质的网页体验。

使用注意事项：

1. 所有接口都为异步；
2. 所有接口必须在 window.ksoxz_sdk.ready(function () { ... }) 回调函数里调用；
3. 成功的回调在 onSuccess、错误的回调 onError；
4. onSuccess 是一个方法，里面会带出一些参数，比如{auth：boolean}；
5. onError 是一个方法，具体会有一些错误信息。

```js
const onSuccess = (msg) => {};
const onError = (msg) => {};
window.ksoxz_sdk.ready(function () {
  window.ksoxz_sdk.authorize({ params: { scope: "xxx" }, onSuccess, onError });
});
```

| <div style="min-width: 200px;">分类</div> | 名称 | <div style="min-width: 200px;">描述</div> | iOS | Android | PC |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 基础 | [config](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/base/config.html) | 用于对使用到的网页应用 JSAPI 进行鉴权。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 基础 | [authorize](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/base/authorize.html) | 用于向用户发出授权请求。 | >=1.27.0 | >=1.27.0 | >=1.27.0 |
| 基础 | [canIUse](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/base/canIUse.html) | 用于判断接口是否可以在当前客户端版本运行。 | >=2.3.0 | >=2.3.0 | >=2.3.0 |
| 业务开放接口-登录 | [requestAccess](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/login/requestAccess.html) | 应用请求访问权限，用于请求登录授权码实现单点登录等场景。 | >=5.18.0 | >=5.18.0 | >=5.18.0 |
| 业务开放接口-用户信息 | [getUserInfo](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/user-info/getUserInfo.html) | 用于获取当前登录用户的用户信息。 | >=5.8.0 | >=5.8.0 | >=5.8.0 |
| 业务开放接口-用户信息 | [enterProfile](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/user-info/enterProfile.html) | 用于打开用户名片。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 业务开放接口-聊天与通讯录 | [createGroupChat](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/contact/CreateGroupChat.html) | 调用该接口进入创建群聊流程。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 业务开放接口-聊天与通讯录 | [chooseGroupMember](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/contact/chooseGroupMember.html) | 群成员选择器。 | | | >=5.24.0 |
| 业务开放接口-聊天与通讯录 | [chooseChat](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/contact/chooseChat.html) | 打开用户会话列表的选择会话。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 业务开放接口-聊天与通讯录 | [chooseContact](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/contact/chooseContact.html) | 打开联系人选择器，可以选择用户或部门，并返回选择的用户和部门信息。 | >=2.7.0 | >=2.7.0 | >=2.7.0 |
| 业务开放接口-应用信息 | [openSetting](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/setting/openSetting.html) | 打开设置页面，展示用户设置（包括授予和拒绝）过的权限，关闭页面后返回用户设置过的授权结果。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 业务开放接口-应用信息 | [getSetting](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/setting/getSetting.html) | 用于获取用户设置（包括授予和拒绝）过的权限列表数据。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 业务开放接口-应用信息 | [getWebAppInfo](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/setting/getWebAppInfo.html) | 获取当前网页应用信息。 | >=2.35.0 | >=2.35.0 | >=2.35.0 |
| 业务开放接口-分享 | [shareMessage](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/share/shareMessage(externalApp).html) | 分享内容到第三方应用。 | >=4.25.0 | >=4.25.0 | >=4.25.0 |
| 业务开放接口-自定义业务 | [invokeCustomAPI](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/custom/invokeCustomAPI.html) | 执行自定义 JSAPI，该接口适用在移动端集成协作中台 SDK 或插件定制场景，用于拓展自定义 JSAPI。 | >=5.20.0 | >=5.20.0 | >=5.20.0 |
| 业务开放接口-自定义业务 | [launchNativeApp](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/business/custom/launchNativeApp.html) | 用于唤起原生应用。 | | >=5.20.0 | |
| 界面-导航栏 | [setSidebarButton](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/setSidebarButton.html) | 侧边栏导航自定义按钮。 | | | >=3.10.0 |
| 界面-导航栏 | [closeNavBar](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/closeNavBar.html) | 隐藏导航栏。 | | | >=5.24.0 |
| 界面-导航栏 | [configureMenu](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/configureMenu.html) | 自定义底部工具菜单条目。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 界面-导航栏 | [hideMenuItems](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/hideMenuItems.html) | 设置隐藏底部工具菜单的 Items。 | >=3.10.0 | >=3.10.0 | |
| 界面-导航栏 | [showMenuItems](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/showMenuItems.html) | 设置底部工具菜单的 Items 展示。 | >=3.10.0 | >=3.10.0 | |
| 界面-导航栏 | [setNavigationButton](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/setNavigationButton.html) | 自定义导航栏左侧按钮。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 界面-导航栏 | [setNavigationBarColor](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/setNavigationBarColor.html) | 设置导航栏颜色。 | >=3.10.0 | >=3.10.0 | |
| 界面-导航栏 | [setNavBarTitle](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/navigation/setNavBarTitle.html) | 用于设置导航栏标题。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 界面-交互反馈 | [showActionSheet](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/showActionSheet.html) | 用于显示操作菜单。 | >=2.15.0 | >=2.15.0 | |
| 界面-交互反馈 | [showPrompt](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/showPrompt.html) | 展示可输入内容的弹窗。 | >=2.15.0 | >=2.15.0 | >=2.15.0 |
| 界面-交互反馈 | [hidePreloader](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/hidePreloader.html) | 隐藏加载弹窗。 | >=2.15.0 | >=2.15.0 | |
| 界面-交互反馈 | [showPreloader](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/showPreloader.html) | 显示加载弹窗。 | >=2.15.0 | >=2.15.0 | |
| 界面-交互反馈 | [showToast](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/showToast.html) | 显示提示弹窗。 | >=2.15.0 | >=2.15.0 | >=2.15.0 |
| 界面-交互反馈 | [showConfirm](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/showConfirm.html) | 显示确认框。 | >=2.15.0 | >=2.15.0 | >=2.15.0 |
| 界面-交互反馈 | [showAlert](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/notification/showAlert.html) | 显示提醒弹窗。 | >=2.15.0 | >=2.15.0 | >=2.15.0 |
| 界面-页面操作 | [closeSidebar](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/page/closeSidebar.html) | 收起侧边面板。 | | | >=5.24.0 |
| 界面-页面操作 | [closeApp](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/page/closeApp.html) | 用于关闭网页应用。 | >=3.10.0 | >=3.10.0 | |
| 界面-页面操作 | [closeWeb](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/page/closeWeb.html) | 关闭当前 web 容器。 | >=3.10.0 | >=3.10.0 | |
| 界面-页面操作 | [openUrl](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/page/openUrl.html) | 打开网页。 | >=2.0.0 | >=2.0.0 | >=2.0.0 |
| 界面-页面操作 | [rotateScreenView](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/interface/page/rotateScreenView.html) | 旋转屏幕。 | >=4.15.0 | >=4.15.0 | |
| 设备-系统信息 | [getDeviceInfo](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/system/getDeviceInfo.html) | 获取当前设备信息。 | >=2.3.0 | >=2.3.0 | >=2.3.0 |
| 设备-系统信息 | [getAppInfo](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/system/getAppInfo.html) | 获取当前客户端信息。 | >=2.35.0 | >=2.35.0 | >=2.35.0 |
| 设备-系统信息 | [setAppInfoListener](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/system/setAppInfoListener.html) | 监听客户端信息变化用于监听应用信息设置变更，如大字体设置变更。 | >=4.20.0 | >=4.20.0 | |
| 设备-系统信息 | [removeAppInfoListener](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/system/removeAppInfoListener.html) | 取消监听客户端信息变化。 | >=4.20.0 | >=4.20.0 | |
| 设备-扫码 | [scan](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/scan/scan.html) | 调起相机扫描一维码、二维码并返回扫描结果。 | >=2.7.0 | >=2.7.0 | |
| 设备-wifi | [getConnectedWifi](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/wifi/getConnectedWifi.html) | 获取设备当前所连接的 Wi-Fi。 | >=4.16.0 | >=4.16.0 | |
| 设备-wifi | [getWifiStatus](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/wifi/getWifiStatus.html) | 获取 WI-FI 开关状态。 | >=4.16.0 | >=4.16.0 | |
| 设备-wifi | [getWifiList](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/wifi/getWifiList.html) | 获取 Wi-Fi 列表。 | | >=4.16.0 | |
| 设备-wifi | [onGetWifiList](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/wifi/onGetWifiList.html) | 监听获取到 Wi-Fi 列表数据事件。 | | >=4.16.0 | |
| 设备-wifi | [offGetWifiList](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/wifi/offGetWifiList.html) | 取消监听获取到 Wi-Fi 列表数据事件。 | | >=4.16.0 | |
| 设备-网络状态 | [getNetworkType](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/network/getNetworkType.html) | 获取设备当前所处的网络类型。 | >=4.16.0 | >=4.16.0 | |
| 设备-网络状态 | [setNetworkListener](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/network/setNetworkListener.html) | 监听网络状态变化。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 设备-网络状态 | [removeNetworkListener](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/network/removeNetworkListener.html) | 取消监听网络状态变化。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 设备-网络状态 | [getNetworkQualityType](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/network/getNetworkQualityType.html) | 获取当前设备所处的网络质量评级。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 设备-网络状态 | [setNetworkQualityChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/network/setNetworkQualityChange.html) | 监听网络质量变化。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 设备-网络状态 | [removeNetworkQualityChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/network/removeNetworkQualityChange.html) | 取消监听网络质量评级变化。 | >=3.10.0 | >=3.10.0 | >=3.10.0 |
| 设备-通用蓝牙 | [getBluetoothAdapterState](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/getBluetoothAdapterState.html) | 获取蓝牙适配器状态。 | >=5.19.0 | >=5.19.0 | |
| 设备-通用蓝牙 | [openBluetoothAdapter](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/openBluetoothAdapter.html) | 初始化蓝牙模块。 | >=5.19.0 | >=5.19.0 | |
| 设备-通用蓝牙 | [closeBluetoothAdapter](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/closeBluetoothAdapter.html) | 关闭蓝牙模块。 | >=5.19.0 | >=5.19.0 | |
| 设备-通用蓝牙 | [getBluetoothDevices](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/getBluetoothDevices.html) | 获取全部已发现蓝牙设备。 | >=5.19.0 | >=5.23.0 | |
| 设备-通用蓝牙 | [startBluetoothDevicesDiscovery](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/startBluetoothDevicesDiscovery.html) | 查找附近蓝牙设备。 | >=5.19.0 | >=5.23.0 | |
| 设备-通用蓝牙 | [stopBluetoothDevicesDiscovery](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/stopBluetoothDevicesDiscovery.html) | 停止查找附近蓝牙设备。 | >=5.19.0 | >=5.23.0 | |
| 设备-通用蓝牙 | [onBluetoothDeviceFound](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/onBluetoothDeviceFound.html) | 监听寻找新蓝牙设备。 | >=5.19.0 | >=5.23.0 | |
| 设备-通用蓝牙 | [offBluetoothDeviceFound](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/offBluetoothDeviceFound.html) | 取消监听寻找新蓝牙设备。 | >=5.19.0 | >=5.23.0 | |
| 设备-通用蓝牙 | [getConnectedBluetoothDevices](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/getConnectedBluetoothDevices.html) | 获取已处于连接状态的蓝牙设备。 | >=5.19.0 | >=5.23.0 | |
| 设备-通用蓝牙 | [onBluetoothAdapterStateChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/onBluetoothAdapterStateChange.html) | 监听蓝牙适配器状态变化。 | >=5.19.0 | >=5.19.0 | |
| 设备-通用蓝牙 | [offBluetoothAdapterStateChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/classic/offBluetoothAdapterStateChange.html) | 取消监听蓝牙适配器状态变化。 | >=5.19.0 | >=5.19.0 | |
| 设备-低功耗蓝牙 | [setBLEMTU](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/setBLEMTU.html) | 设置蓝牙最大传输单元。 | | >=5.23.0 | |
| 设备-低功耗蓝牙 | [connectBLEDevice](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/connectBLEDevice.html) | 低功耗蓝牙连接外围设备。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [disconnectBLEDevice](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/disconnectBLEDevice.html) | 断开蓝牙设备连接。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [onBLEConnectionStateChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/onBLEConnectionStateChange.html) | 监听蓝牙连接状态变化。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [offBLEConnectionStateChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/offBLEConnectionStateChange.html) | 取消监听蓝牙连接状态变化。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [getBLEDeviceServices](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/getBLEDeviceServices.html) | 低功耗蓝牙获取设备服务。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [getBLEDeviceCharacteristics](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/getBLEDeviceCharacteristics.html) | 获取读写特征。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [notifyBLECharacteristicValueChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/notifyBLECharacteristicValueChange.html) | 设置启用特征订阅。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [onBLECharacteristicValueChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/onBLECharacteristicValueChange.html) | 监听特征值变化。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [offBLECharacteristicValueChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/offBLECharacteristicValueChange.html) | 取消监听特征值变化。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [readBLECharacteristicValue](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/readBLECharacteristicValue.html) | 读取蓝牙接口数据。 | >=5.23.0 | >=5.23.0 | |
| 设备-低功耗蓝牙 | [writeBLECharacteristicValue](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/low-energy/writeBLECharacteristicValue.html) | 写入蓝牙数据。 | >=5.23.0 | >=5.23.0 | |
| 设备-蓝牙信标 | [startBeaconDiscovery](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/startBeaconDiscovery.html) | 用于开始搜索附近的 Beacon 设备。 | >=5.25.0 | >=5.25.0 | |
| 设备-蓝牙信标 | [stopBeaconDiscovery](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/stopBeaconDiscovery.html) | 停止搜索附近的 Beacon 设备.。 | >=5.25.0 | >=5.25.0 | |
| 设备-蓝牙信标 | [getBeacons](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/getBeacons.html) | 用于获取所有已搜索到的 Beacon 设备。 | >=5.24.0 | >=5.24.0 | |
| 设备-蓝牙信标 | [onBeaconUpdate](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/onBeaconUpdate.html) | 监听 Beacon 设备更新事件，仅能注册一个监听。 | >=5.25.0 | >=5.25.0 | |
| 设备-蓝牙信标 | [offBeaconUpdate](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/offBeaconUpdate.html) | 取消监听 Beacon 设备更新事件。 | >=5.25.0 | >=5.25.0 | |
| 设备-蓝牙信标 | [onBeaconServiceChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/onBeaconServiceChange.html) | 监听 Beacon 服务状态变化事件，仅能注册一个监听。 | >=5.24.0 | >=5.24.0 | |
| 设备-蓝牙信标 | [offBeaconServiceChange](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/beacon/offBeaconServiceChange.html) | 取消监听 Beacon 服务状态变化事件。 | >=5.25.0 | >=5.25.0 | |
| 设备-剪贴板 | [setClipboard](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/clipboard/setClipboard.html) | 设置系统粘贴板数据。 | >=2.7.0 | >=2.7.0 | >=2.7.0 |
| 设备-剪贴板 | [getClipboard](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/clipboard/getClipboard.html) | 获取系统粘贴板数据。 | >=2.7.0 | >=2.7.0 | >=2.7.0 |
| 设备-键盘 | [keyboard](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/keyboard/keyboard.html) | 隐藏 iOS 键盘默认工具栏。 | >=5.1.0 | | |
| 设备-截屏监听 | [setScreenShotListener](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/screenshot/setScreenShotListener.html) | 设置截图监听。 | >=3.14.0 | >=3.14.0 | |
| 设备-截屏监听 | [removeScreenShotListener](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/screenshot/removeScreenShotListener.html) | 移除截图监听。 | >=3.14.0 | >=3.14.0 | |
| 设备-拨打电话 | [makePhoneCall](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/phone/makePhoneCall.html) | 拨打电话。 | >=2.7.0 | >=2.7.0 | |
| 设备-摇一摇 | [accelerometerWatchShake](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/shake/accelerometerWatchShake.html) | 调用该方法启动加速度计"摇一摇"监听。 | >=2.7.0 | >=2.7.0 | |
| 设备-摇一摇 | [accelerometerClearShake](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/shake/accelerometerClearShake.html) | 调用该方法停止加速度计"摇一摇"监听。 | >=2.7.0 | >=2.7.0 | |
| 设备-运动与健康 | [getStepCount](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/device/health/getStepCount.html) | 获取运动步数。 | >=5.12.0 | >=5.12.0 | |
| 文件 | [chooseFile](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/file/chooseFile.html) | 选择本地文件。 | >=2.15.0 | >=2.15.0 | |
| 文件 | [previewFile](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/file/previewFile.html) | 预览文件。 | >=2.0.0 | >=2.0.0 | |
| 媒体-图片 | [chooseImage](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/media/image/chooseImage.html) | 从系统相册中选择图片,或使用来自相机拍摄的图片。 | >=3.0.0 | >=3.0.0 | |
| 媒体-图片 | [previewImage](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/media/image/previewImage.html) | 用于预览图片。 | >=2.0.0 | >=2.0.0 | >=2.0.0 |
| 媒体-图片 | [getImageBase64](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/media/image/getImageBase64.html) | 获取图片 base64，仅 iOS 端支持。 | | >=2.15.0 | |
| 媒体-图片 | [getImageInfo](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/media/image/getImageInfo.html) | 获取图片信息。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 媒体-图片 | [compressImage](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/media/image/compressImage.html) | 压缩图片。 | >=5.24.0 | >=5.24.0 | >=5.24.0 |
| 媒体-图片 | [saveImageToAlbum](https://365.kdocs.cn/3rd/open/documents/app-integration-dev/wps365/client/web-jsapi/media/image/saveImageToAlbum.html) | 保存图片到本地相册。 | >=3.10.0 | >=3.10.0 | |
