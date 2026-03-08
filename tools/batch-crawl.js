#!/usr/bin/env node

/**
 * 批量爬取WPS开放平台文档
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlListFile = path.join(__dirname, '../knowledge-base/wps-open-platform/COMPLETE-URL-LIST.md');
const logFile = path.join(__dirname, '../knowledge-base/wps-open-platform/CRAWL-LOG.md');
const outputBase = path.join(__dirname, '../knowledge-base/wps-open-platform');

// 读取URL清单
const urlListContent = fs.readFileSync(urlListFile, 'utf8');
const urlRegex = /https:\/\/open\.wps\.cn\/documents\/[^\s`]+/g;
const urls = urlListContent.match(urlRegex) || [];

// 去重
const uniqueUrls = [...new Set(urls)];

console.log(`📋 找到 ${uniqueUrls.length} 个唯一URL`);

// URL到文件路径的映射
function urlToFilePath(url) {
  const urlObj = new URL(url);
  let pathParts = urlObj.pathname.split('/').filter(p => p);
  
  // 移除 'documents' 部分
  if (pathParts[0] === 'documents') {
    pathParts = pathParts.slice(1);
  }
  
  // 移除 'app-integration-dev' 部分
  if (pathParts[0] === 'app-integration-dev') {
    pathParts = pathParts.slice(1);
  }
  
  // 处理文件名
  const fileName = pathParts.pop() + '.md';
  
  // 构建路径
  const filePath = path.join(outputBase, ...pathParts, fileName);
  
  return filePath;
}

// 初始化日志
let logContent = `# WPS开放平台文档爬取日志

生成时间: ${new Date().toISOString()}

## 爬取统计

- 总URL数: ${uniqueUrls.length}
- 成功: 0
- 失败: 0
- 跳过: 0

---

## 详细日志

`;

let successCount = 0;
let failCount = 0;
let skipCount = 0;

// 开始爬取
uniqueUrls.forEach((url, index) => {
  console.log(`\n[${index + 1}/${uniqueUrls.length}] 爬取: ${url}`);
  
  const filePath = urlToFilePath(url);
  const relativePath = path.relative(outputBase, filePath);
  
  // 确保目录存在
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  try {
    // 调用 fetch-spa.js
    const startTime = Date.now();
    execSync(`node "${path.join(__dirname, '../tools/browser-agent/fetch-spa.js')}" "${url}" "${filePath}"`, {
      stdio: 'inherit',
      timeout: 90000
    });
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // 检查文件内容
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n').length;
      
      if (lines > 50 && !content.includes('文档不存在')) {
        successCount++;
        logContent += `✅ **成功** | ${relativePath}\n   - URL: ${url}\n   - 行数: ${lines}\n   - 耗时: ${duration}s\n\n`;
        console.log(`✅ 成功 (${lines}行, ${duration}s)`);
      } else {
        skipCount++;
        logContent += `⚠️ **内容不完整** | ${relativePath}\n   - URL: ${url}\n   - 行数: ${lines}\n   - 原因: ${lines <= 50 ? '行数不足' : '文档不存在'}\n\n`;
        console.log(`⚠️ 内容不完整 (${lines}行)`);
      }
    } else {
      failCount++;
      logContent += `❌ **失败** | ${relativePath}\n   - URL: ${url}\n   - 错误: 文件未创建\n\n`;
      console.log(`❌ 失败: 文件未创建`);
    }
  } catch (error) {
    failCount++;
    logContent += `❌ **失败** | ${relativePath}\n   - URL: ${url}\n   - 错误: ${error.message}\n\n`;
    console.log(`❌ 失败: ${error.message}`);
  }
});

// 更新统计
logContent = logContent.replace(
  /## 爬取统计[\s\S]*?---/,
  `## 爬取统计

- 总URL数: ${uniqueUrls.length}
- 成功: ${successCount}
- 失败: ${failCount}
- 跳过: ${skipCount}

---`
);

// 保存日志
fs.writeFileSync(logFile, logContent, 'utf8');

console.log(`\n✅ 爬取完成！`);
console.log(`📊 成功: ${successCount}, 失败: ${failCount}, 跳过: ${skipCount}`);
console.log(`📝 日志: ${logFile}`);
