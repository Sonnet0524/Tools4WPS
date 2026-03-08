---
title: Third-Party Enterprise Application Authorization Process
breadcrumb: WPS365应用开发 > 认证与授权 > 应用授权 > 第三方企业应用授权流程
source: raw_md/app-integration-dev/wps365/server/certification-authorization/app-authorization/isv-authorization-flow.md
---

# 第三方企业应用授权流程

第三方企业应用通过如下流程获取应用授权凭证 access_token：

1、在`开发者后台-权限申请`申请所需权限。

2、在`开发者后台-事件与回调`订阅授权所需事件。

- 订阅[获取 app_ticket](/app-integration-dev/wps365/server/app/event/get-ticket)，用于获取开放平台颁发的动态凭证。
- 订阅[应用授权状态变更](/app-integration-dev/wps365/server/app/event/authorize-update)，用于获取授权企业的信息。

3、在`开发者后台-版本管理`创建版本并申请发布。

4、调用[推送 app_ticket](/app-integration-dev/wps365/server/certification-authorization/get-token/push-app-ticket)接口，激活上述获取 app_ticket 事件。开放平台将周期性推送 app_ticket，应用需正常响应并使用最新的 app_ticket。详见[通用参数说明](/app-integration-dev/wps365/server/api-description/noun-description)。

5、WPS 租户企业安装或更新应用版本时，触发上述应用授权状态变更事件。应用需正常响应并持久化保存 company_id。

6、使用上述第 4、5 步获取到的 app_ticket 和 company_id，调用 [三方应用获取租户的access_token](/app-integration-dev/wps365/server/certification-authorization/get-token/isvapp-tenant-access-token) 获取应用授权凭证 access_token。

access_token 的有效期为 2 小时，过期需重新获取：
- 若原 access_token 未过期，原 access_token 仍可使用，直到原有效期截止失效
- 重新获取的 access_token 的值与原 access_token**不一致**，请注意区分使用
