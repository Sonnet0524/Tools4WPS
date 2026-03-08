# 任务: 开发认证模块

> 任务ID: TASK-001
> 优先级: P0
> 状态: ✅ 已完成
> 创建时间: 2026-03-08
> 完成时间: 2026-03-08

---

## 任务目标

开发 WPS API 认证模块，包括 Token 获取和签名计算。

---

## 技术要求

### 文件结构

```
src/auth/
├── token.ts        # Token 管理
├── signature.ts    # 签名计算
└── index.ts        # 导出
```

### 功能需求

#### 1. Token 管理 (`token.ts`)

```typescript
interface TokenManager {
  // 获取 tenant_access_token
  getToken(): Promise<string>;
  
  // 刷新 token
  refreshToken(): Promise<string>;
  
  // 获取当前 token 信息
  getTokenInfo(): { token: string; expiresAt: number };
}
```

**要求**:
- 自动缓存 token
- 过期前自动刷新
- 线程安全

#### 2. 签名计算 (`signature.ts`)

```typescript
interface Signature {
  // 生成 KSO-1 签名
  generateSignature(
    method: string,
    uri: string,
    contentType: string,
    body?: string
  ): {
    date: string;
    authorization: string;
  };
}
```

**签名算法**:
```
signature = HMAC-SHA256(
  secretKey,
  "KSO-1" + method + uri + contentType + date + sha256(body)
)
```

#### 3. 配置读取

从 `.env.local` 读取:
- `WPS_APP_ID` - 应用 ID
- `WPS_APP_KEY` - 应用密钥

---

## API 参考

### 获取 Token

```
POST https://openapi.wps.cn/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&client_id={APP_ID}&client_secret={APP_KEY}
```

**响应**:
```json
{
  "access_token": "xxx",
  "expires_in": 7200,
  "token_type": "bearer"
}
```

---

## 验收标准

- [ ] Token 获取功能正常
- [ ] Token 缓存和自动刷新
- [ ] 签名计算正确
- [ ] 单元测试通过
- [ ] 代码有完整类型注解

---

## 参考资料

- 签名文档: `knowledge-base/wps-open-platform/auth/selfapp-tenant-token.md`
- 测试脚本: `scripts/test-api.ts`

---

## 预计工时

2-3 小时

---

## 输出要求

完成后提交:
1. 代码文件
2. 测试文件
3. 开发报告 (`reports/dev/TASK-001-report.md`)
