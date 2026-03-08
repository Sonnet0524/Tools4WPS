# 任务: 开发通讯录 Tool

> 任务ID: TASK-002
> 优先级: P0
> 状态: ✅ 已完成
> 创建时间: 2026-03-08
> 完成时间: 2026-03-08
> 依赖: TASK-001

---

## 任务目标

开发通讯录 Tool，实现用户查询功能。

---

## 技术要求

### 文件结构

```
src/tools/
├── contacts.ts     # 通讯录 Tool
└── types.ts        # 类型定义
```

### 功能需求

#### Tool 定义

```typescript
interface ContactsTool {
  // 获取用户列表
  getUsers(params: {
    status?: 'active' | 'notactive' | 'disabled';
    pageSize?: number;
    pageToken?: string;
  }): Promise<UserListResult>;
  
  // 获取用户详情
  getUser(userId: string): Promise<User>;
  
  // 批量获取用户
  batchGetUsers(userIds: string[]): Promise<User[]>;
  
  // 获取用户组列表
  getGroups(params: {
    pageSize?: number;
    pageToken?: string;
  }): Promise<GroupListResult>;
}
```

#### 数据类型

```typescript
interface User {
  id: string;
  userName: string;
  status: 'active' | 'notactive' | 'disabled';
  role: 'super-admin' | 'admin' | 'normal';
  phone?: string;
  email?: string;
  depts?: Department[];
}

interface Department {
  id: string;
  name: string;
  absPath: string;
}

interface UserListResult {
  items: User[];
  nextPageToken?: string;
  total?: number;
}

interface GroupListResult {
  items: Group[];
  nextPageToken?: string;
}
```

---

## API 参考

### 获取用户列表

```
GET /v7/users?status={status}&page_size={size}
Authorization: Bearer {token}
```

### 获取用户详情

```
GET /v7/users/{user_id}
Authorization: Bearer {token}
```

### 获取用户组列表

```
GET /v7/groups?page_size={size}
Authorization: Bearer {token}
```

---

## 验收标准

- [ ] 获取用户列表正常
- [ ] 获取用户详情正常
- [ ] 批量获取用户正常
- [ ] 获取用户组列表正常
- [ ] 分页功能正常
- [ ] 单元测试通过
- [ ] 集成测试通过

---

## 参考资料

- API 文档: `knowledge-base/wps-open-platform/api/contacts/`
- 测试报告: `reports/test/api-permission-test-20260308.md`

---

## 预计工时

3-4 小时

---

## 输出要求

完成后提交:
1. 代码文件
2. 测试文件
3. 开发报告
