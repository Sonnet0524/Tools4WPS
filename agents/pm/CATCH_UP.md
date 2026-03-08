# PM Agent - 启动文档

> 🔄 **启动时读取此文档** - 快速了解当前状态和工作

---

## Quick Status

**Last Updated**: 2026-03-08  
**Current Phase**: 知识库建设完成  
**Status**: 🟢 Ready for Architecture Design

---

## Current Focus

**Primary Task**: 知识库建设完成，准备进入架构设计阶段

**Completed Actions**:
- ✅ 创建Browser Agent工具（支持SPA页面爬取）
- ✅ 创建Knowledge Researcher Team
- ✅ 完成WPS开放平台知识库建设（59份文档）
- ✅ 修复URL结构错误问题
- ✅ 完成完整文档目录整理

**Knowledge Base Status**:
- **总文档数**: 59份
- **详细文档**: 25份（>50行）
- **超详细文档**: 7份（>100行）
- **核心文档**: 签名机制(360行)、错误码(422行)、MCP对接(319行)

**Next Actions**:
1. 设计Skills和Tools的架构
2. 确定技术栈和开发优先级
3. 设计开发Team结构
4. 规划第一阶段开发任务

---

## Project Context

### Project Info
- **Name**: WPS云文档工具集
- **Goal**: 制作一套Agent可使用的WPS云文档Tools和Skills，实现办公智能化
- **Constraints**: 
  - 技术栈待确定（需先研究WPS开发文档）
  - 协作方式：主动开展工作，里程碑汇报，需决策时告知

### Team Structure
| Team | Status | Current Task | Owner |
|------|--------|--------------|-------|
| PM | 🟢 Active | 项目管理，准备架构设计 | PM Agent |
| Knowledge Researcher | ✅ Complete | 知识库建设完成 | Knowledge Researcher |

---

## Working Directory

**启动位置**: [当前目录路径]

**Key Paths**:
- PM Config: `agents/pm/`
- Team Templates: `agents/_templates/`
- Tasks: `tasks/`
- Reports: `reports/`
- Status: `status/`
- Archive: `archive/`

---

## Quick Reference

| 文档 | 路径 | 用途 |
|------|------|------|
| 初始化指南 | `agents/pm/INIT.md` | 首次启动必读 |
| 本文件 | `agents/pm/CATCH_UP.md` | 当前状态 |
| 核心指南 | `agents/pm/ESSENTIALS.md` | 工作规范 |
| 工作流程 | `agents/pm/WORKFLOW.md` | Agent 管理 |
| Agent 模板 | `agents/_templates/` | 创建 Team |
| 实践经验 | `archive/` | 参考经验 |

---

## Status Update Rules

**何时更新本文件**：
- ✅ 任务完成后
- ✅ 每日至少检查一次
- ✅ 遇到阻塞或重大变更
- ✅ 新增或修改 Team 结构

**更新内容**：
- Last Updated 时间
- Current Phase 和 Status
- Completed Actions
- Next Actions
- Team Structure 变化

---

## 🎯 核心原则提醒

- ✅ **主动启动 Agent** - 分配任务后立即启动
- ❌ **不轮询状态** - 不主动检查 Agent 进度
- ✅ **被动接收报告** - 等待 Agent 报告完成
- 📄 **文档化交互** - 通过 tasks/ 和 reports/ 交换信息

---

**Remember**: 
- 在根目录启动
- 你是项目的中心协调者
- 关键决策需要 Human 确认
- 经验需要及时沉淀到 `experiences/`

---

**Last Updated**: [待填充]  
**Next Work**: [待填充]
