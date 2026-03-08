#!/usr/bin/env node

/**
 * Browser Agent - 截图工具
 * 
 * 功能：
 * - 访问网页并截取完整页面截图
 * 
 * 使用方法：
 * node screenshot.js <URL> [输出文件]
 */

import puppeteer from 'puppeteer';
import config from './config.js';

// 获取命令行参数
const url = process.argv[2];
const outputFile = process.argv[3] || 'screenshot.png';

if (!url) {
  console.error('❌ 错误：请提供URL');
  console.log('使用方法：node screenshot.js <URL> [输出文件]');
  process.exit(1);
}

console.log(`📸 正在截图: ${url}`);

let browser = null;

try {
  // 启动浏览器
  browser = await puppeteer.launch(config.browser);
  
  const page = await browser.newPage();
  await page.setViewport(config.viewport);
  page.setDefaultTimeout(config.page.timeout);
  
  // 访问页面
  await page.goto(url, {
    waitUntil: config.page.waitUntil,
    timeout: config.page.timeout
  });
  
  // 等待页面稳定
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // 截取完整页面
  await page.screenshot({
    path: outputFile,
    fullPage: true
  });
  
  console.log(`✅ 截图已保存: ${outputFile}`);
  
} catch (error) {
  console.error('❌ 错误:', error.message);
  process.exit(1);
} finally {
  if (browser) {
    await browser.close();
  }
}
