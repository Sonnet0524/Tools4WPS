# WPS开放平台

来源：https://open.wps.cn/documents/app-integration-dev/guide/start/user
实际URL：https://open.wps.cn/documents/app-integration-dev/guide/start/user

---

用户身份体系

用户身份是开发 WPS 应用时需要了解的重要概念，我们定义用户身份的ID为 user_id。为了保证用户的数据安全，在应用获取用户信息时，我们对 user_id进行了隔离处理。本文将介绍 user_id 的含义和用法，开发者应仔细阅读避免用错。

1、user_id 是按服务商（租户）进行隔离的，即：

同一个服务商（租户）下的应用 1 和应用 2，获取指定企业下的指定用户 A，其获取到的 user_id 是一致的
不同服务商（租户）下的应用 1 和应用 2，获取指定企业的指定用户 A，其获取到的 user_id 是不一致的

2、user_id 是跟随用户所属租户企业的，即：同一个人加入不同的租户企业 1 和企业 2，其 user_id 是不一致的