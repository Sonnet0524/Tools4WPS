#!/usr/bin/env node

/**
 * Browser Agent - 页面内容获取工具
 * 
 * 功能：
 * - 访问动态网页
 * - 提取页面内容
 * - 转换为Markdown格式
 * 
 * 使用方法：
 * node fetch-page.js <URL> [输出文件]
 */

import puppeteer from 'puppeteer';
import fs from 'fs';
import config from './config.js';

// 获取命令行参数
const url = process.argv[2];
const outputFile = process.argv[3];

if (!url) {
  console.error('❌ 错误：请提供URL');
  console.log('使用方法：node fetch-page.js <URL> [输出文件]');
  process.exit(1);
}

console.log(`🌐 正在访问: ${url}`);

let browser = null;

try {
  // 启动浏览器
  console.log('📱 启动浏览器...');
  browser = await puppeteer.launch(config.browser);
  
  const page = await browser.newPage();
  
  // 设置视口
  await page.setViewport(config.viewport);
  
  // 设置超时
  page.setDefaultTimeout(config.page.timeout);
  
  // 访问页面
  console.log('⏳ 加载页面...');
  await page.goto(url, {
    waitUntil: config.page.waitUntil,
    timeout: config.page.timeout
  });
  
  // 等待额外时间确保动态内容加载
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 尝试找到主要内容区域
  console.log('🔍 提取内容...');
  let content = null;
  
  for (const selector of config.extraction.selectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        content = await element.evaluate(el => {
          // 移除不需要的元素
          const removeSelectors = ['nav', 'header', 'footer', '.sidebar', '.navigation', '.menu', 'script', 'style', 'noscript'];
          removeSelectors.forEach(sel => {
            el.querySelectorAll(sel).forEach(child => child.remove());
          });
          
          return el.innerText;
        });
        
        if (content && content.trim().length > 100) {
          console.log(`✅ 找到内容区域: ${selector}`);
          break;
        }
      }
    } catch (e) {
      // 继续尝试下一个选择器
    }
  }
  
  if (!content) {
    // 如果没有找到特定区域，获取整个body
    content = await page.evaluate(() => {
      document.querySelectorAll('script, style, noscript').forEach(el => el.remove());
      return document.body.innerText;
    });
  }
  
  // 清理内容
  content = content
    .replace(/\n{3,}/g, '\n\n')  // 移除多余空行
    .replace(/[ \t]+/g, ' ')     // 移除多余空格
    .trim();
  
  // 添加元信息
  const title = await page.title();
  const markdown = `# ${title}\n\n来源：${url}\n\n---\n\n${content}`;
  
  // 输出结果
  if (outputFile) {
    fs.writeFileSync(outputFile, markdown, 'utf8');
    console.log(`✅ 内容已保存到: ${outputFile}`);
    console.log(`📊 内容长度: ${content.length} 字符`);
  } else {
    console.log('\n' + '='.repeat(60));
    console.log(markdown);
    console.log('='.repeat(60));
  }
  
} catch (error) {
  console.error('❌ 错误:', error.message);
  process.exit(1);
} finally {
  // 关闭浏览器
  if (browser) {
    await browser.close();
  }
}
