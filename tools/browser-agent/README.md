# Browser Agent 工具

> 🌐 浏览器自动化工具，用于访问动态网页和SPA应用

---

## 功能特性

- ✅ 访问JavaScript动态渲染的网页
- ✅ 支持SPA（单页应用）内容提取
- ✅ 支持截图功能
- ✅ 支持等待特定元素加载
- ✅ 支持提取页面文本和HTML

---

## 安装

```bash
cd tools/browser-agent
npm install
```

---

## 使用方法

### 1. 获取页面内容

```bash
node fetch-page.js <URL> [输出文件]
```

示例：
```bash
node fetch-page.js https://open.wps.cn/documents/app-integration-dev/guide/start/learn-map output.md
```

### 2. 截图

```bash
node screenshot.js <URL> [输出文件]
```

示例：
```bash
node screenshot.js https://open.wps.cn/documents/app-integration-dev/guide/start/learn-map screenshot.png
```

---

## API说明

### fetch-page.js

获取网页内容并转换为Markdown格式。

**参数**：
- `url`: 目标网页URL（必需）
- `output`: 输出文件路径（可选，默认输出到控制台）

**功能**：
- 等待页面完全加载
- 提取主要内容区域
- 转换为Markdown格式
- 支持保存到文件

### screenshot.js

截取网页截图。

**参数**：
- `url`: 目标网页URL（必需）
- `output`: 输出图片路径（可选，默认screenshot.png）

---

## 配置选项

可以在 `config.js` 中修改：

```javascript
export default {
  // 浏览器选项
  headless: 'new',  // 无头模式
  timeout: 30000,   // 超时时间（毫秒）
  
  // 等待选项
  waitUntil: 'networkidle0',  // 等待网络空闲
  
  // 视口大小
  viewport: {
    width: 1920,
    height: 1080
  }
};
```

---

## 注意事项

1. **首次运行**：Puppeteer会下载Chromium，可能需要几分钟
2. **网络问题**：如果下载慢，可以设置镜像源
3. **内存占用**：浏览器会占用较多内存，使用后自动关闭

---

## 维护者

- PM Agent
- 创建日期：2026-03-08
