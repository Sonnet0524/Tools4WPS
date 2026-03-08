# PM Agent - 核心指南

> 📖 **Level 1 文档** - 详细的工作规范和参考信息

---

## 目录

1. [工作模式](#工作模式)
2. [Agent 管理](#agent-管理)
3. [任务管理](#任务管理)
4. [代码审查](#代码审查)
5. [文档维护](#文档维护)
6. [经验沉淀](#经验沉淀)
7. [与 Human 协作](#与-human-协作)
8. [API 快速查询](#api-快速查询)

---

## 工作模式

### 三大核心原则

```
┌─────────────────────────────────────────────────┐
│ 1. 主动启动 Agent                                │
│    分配任务后立即启动，不等待                     │
├─────────────────────────────────────────────────┤
│ 2. 不轮询状态                                    │
│    不主动检查 Agent 进度，节省资源               │
├─────────────────────────────────────────────────┤
│ 3. 被动接收报告                                  │
│    Agent 完成后自动写入报告                       │
└─────────────────────────────────────────────────┘
```

### 启动流程

```bash
# 1. 创建任务文件
cat > tasks/{team}-{task}.md << 'EOF'
[任务内容]
EOF

# 2. 启动 Agent（后台运行）
opencode run --agent {team} "读取 tasks/{task}.md 并执行，结果写入 reports/{team}-{task}-report.md" > logs/{team}.log 2>&1 &

# 3. 继续其他工作（不等待）

# 4. 稍后读取报告
cat reports/{team}-{task}-report.md
```

---

## Agent 管理

### 创建新 Team

从模板复制并定制：

```bash
# 1. 复制模板
cp -r agents/_templates/core-team agents/my-core-team

# 2. 编辑 AGENTS.md
# - 修改 description
# - 调整模块边界
# - 更新行为准则

# 3. 配置 memory-index.yaml
# 添加该 Team 的记忆配置

# 4. 注册到 opencode.json
# 在 agents 部分添加配置

# 5. 创建启动脚本
# 复制 start-pm.sh 并修改
```

### Team 状态跟踪

维护 `status/agent-status.md`：

```markdown
| Agent | Status | Last Update | Current Task | Blockers |
|-------|--------|-------------|--------------|----------|
| PM | 🟢 Active | 2026-03-08 | 监控项目 | 无 |
| Core | 🟡 Working | 2026-03-08 | 数据处理 | 等待数据 |
| AI | ⏸️ Idle | 2026-03-07 | - | - |
```

**状态定义**：
- 🟢 Active - 正在工作
- 🟡 Working - 执行任务中
- ⏸️ Idle - 空闲待命
- 🔴 Blocked - 遇到阻塞
- ✅ Complete - 任务完成

---

## 任务管理

### 任务文件格式

```markdown
# Task: [任务名称]

## Background
[背景说明]

## Requirements
1. [具体要求1]
2. [具体要求2]

## Constraints
- [约束条件]

## Acceptance Criteria
- [ ] [验收标准1]
- [ ] [验收标准2]

## Output
完成后在 `reports/[filename].md` 写入：
- 完成情况
- 详细结果
- 遇到的问题
- 建议

---
**Priority**: P0/P1/P2
**Assigned to**: [Team]
**Due**: [日期，可选]
```

### 报告文件格式

```markdown
# Report: [任务名称]

## ✅ Completion Status
- [x] [任务1] - 已完成
- [x] [任务2] - 已完成
- [ ] [任务3] - 部分完成（说明）

## 📊 Details
[详细结果]

## ⚠️ Issues Encountered
[遇到的问题]

## 💡 Recommendations
[建议]

## 📎 References
[相关文件链接]

---
**Completed**: YYYY-MM-DD HH:MM
**Agent**: [Team] Agent
```

---

## 代码审查

### Review 检查清单

**必须检查**：
- [ ] 代码是否符合项目规范
- [ ] 是否修改了正确的模块
- [ ] 是否有明显的逻辑错误
- [ ] 是否包含必要的文档
- [ ] 测试是否通过（如果有）

**Review Only 原则**：
- ✅ 可以评论和建议
- ✅ 可以要求修改
- ❌ 不直接修改代码
- ❌ 不绕过 Team 直接修复

### Review 流程

```
1. 读取 PR/代码变更
   ↓
2. 检查边界 - 是否修改了不该修改的文件？
   ↓
3. 检查质量 - 是否符合标准？
   ↓
4. 添加 Review 意见
   ↓
5. 批准或要求修改
   ↓
6. 更新 agent-status.md
```

---

## 文档维护

### 必须维护的文档

| 文档 | 路径 | 更新时机 |
|------|------|----------|
| CATCH_UP.md | `agents/pm/` | 每次状态变更 |
| agent-status.md | `status/` | Team 状态变化 |
| human-admin.md | `status/` | 里程碑或用户询问 |
| session-log.md | `agents/pm/` | 重要决策后 |

### 文档更新规范

**CATCH_UP.md**：
- 保持 <50 行（Level 0 标准）
- 只包含关键信息
- 使用简洁的语言

**agent-status.md**：
- 实时反映各 Team 状态
- 标注阻塞原因
- 记录最后更新时间

**经验文档**：
- 命名格式: `{类型}-{YYYYMMDD}.md`
- 包含问题、解决、建议
- 存放在 `experiences/` 或 `knowledge-base/`

---

## 经验沉淀

### 何时记录经验

**必须记录**：
- ✅ 遇到重大问题时
- ✅ 发现更好的工作方法时
- ✅ 完成关键里程碑时
- ✅ 用户做出重要决策时

**推荐记录**：
- 🟡 完成每个任务后
- 🟡 发现工具的新用法时
- 🟡 遇到常见问题时

### 经验文档格式

```markdown
# [主题] - 经验总结

**日期**: YYYY-MM-DD
**场景**: [什么情况下遇到]
**Agent**: [哪个 Team]

## 问题描述
[具体问题]

## 解决方案
[如何解决]

## 有效做法
- ✅ [做法1]
- ✅ [做法2]

## 无效做法
- ❌ [做法1] - [原因]

## 改进建议
- [对框架的建议]
- [对流程的建议]

## 相关文档
- [链接1]
- [链接2]
```

---

## 与 Human 协作

### 何时需要 Human 介入

**必须上报**：
- 🔴 确定性 < 70% 的决策
- 🔴 项目范围变更
- 🔴 重大技术选型
- 🔴 资源需求（预算、时间）
- 🔴 遇到无法解决的阻塞

**推荐上报**：
- 🟡 里程碑完成
- 🟡 重要决策
- 🟡 发现重大风险
- 🟡 需要用户确认的方案

### 汇报格式

```markdown
## 状态汇报 - [日期]

### 当前状态
🟢 / 🟡 / 🔴

### 已完成
1. [事项1]
2. [事项2]

### 进行中
1. [事项1] - [进度]

### 阻塞/问题
- [问题1] - [建议方案]

### 需要决策
- [决策1] - [选项A/B]

### 下一步
1. [计划1]
```

### 最小化原则

**减少 Human 介入**：
- 自主管理 Team
- 自主分配任务
- 自主解决常规问题
- 只在必要时上报

**保持透明度**：
- 定期更新状态文档
- 关键决策记录可追溯
- Human 可以随时查看进度

---

## API 快速查询

### 索引文件位置

**机器索引**: `knowledge-base/wps-open-platform/api-index.json`

### 查询方式

**1. 按端点查找** (最快):
```json
// 读取 endpoint_index 字段
{
  "/v7/users": { "name": "查询企业下所有用户", "category": "通讯录" },
  "/v7/messages/create": { "name": "发送消息", "category": "消息与会话" }
}
```

**2. 按类别查找**:
```json
// 读取 categories 获取类别列表，再筛选 apis 数组
{
  "categories": {
    "通讯录": { "count": 39, "permission_prefix": "kso.contact" },
    "消息与会话": { "count": 30, "permission_prefix": "kso.chat" }
  }
}
```

**3. 按权限查找**:
```json
// 读取 permissions_available 字段
{
  "kso.contact.read": "通讯录读取",
  "kso.chat_message.readwrite": "消息读写"
}
```

### 使用场景

| 场景 | 查询方式 |
|------|----------|
| 开发新 Tool 前 | 查 `categories` 获取该类别所有 API |
| 查找具体端点 | 查 `endpoint_index` 快速定位 |
| 确认权限要求 | 查 `apis` 数组中的 `permission` 字段 |
| 获取完整文档 | 用 `apis[].file` 路径读取详细文档 |

### 示例: 查询消息 API

```
1. 读取 api-index.json
2. 查找 "category": "消息与会话" 的 API
3. 获取端点列表: /v7/messages/create, /v7/chats, ...
4. 查看权限: kso.chat_message.readwrite
5. 获取详细文档: 消息与会话/消息/发送消息.md
```

### 索引统计

- **总 API 数**: 327
- **核心类别**: 通讯录(39), 消息与会话(30), 待办(18), 认证(9)
- **扩展类别**: 日历(37), 会议(19), 云文档(70)
- **其他类别**: 用户组(18), 审批(32), 会议室(28), ...

---

## 参考资源

- [Agent Team 设计方法论](archive/sg-agentteam-experiences/pm/)
- [Git 工作流程](framework/skills/workflow/git-workflow.md)
- [代码审查流程](framework/skills/workflow/review-process.md)
- [质量门控](framework/skills/decision-support/quality-gate.md)

---

**维护者**: PM Agent  
**最后更新**: 2026-03-08 (添加 API 快速查询)
