#!/usr/bin/env node

/**
 * Browser Agent - 测试脚本
 * 
 * 测试浏览器工具是否正常工作
 */

import puppeteer from 'puppeteer';

console.log('🧪 测试Browser Agent...\n');

try {
  console.log('1️⃣ 启动浏览器...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  console.log('✅ 浏览器启动成功\n');
  
  console.log('2️⃣ 访问测试页面...');
  const page = await browser.newPage();
  await page.goto('https://example.com');
  
  const title = await page.title();
  console.log(`✅ 页面标题: ${title}\n`);
  
  console.log('3️⃣ 提取内容...');
  const content = await page.evaluate(() => document.body.innerText);
  console.log(`✅ 内容长度: ${content.length} 字符\n`);
  
  await browser.close();
  
  console.log('🎉 所有测试通过！Browser Agent可以正常使用。\n');
  
} catch (error) {
  console.error('❌ 测试失败:', error.message);
  console.log('\n可能的原因：');
  console.log('1. Chromium未正确下载');
  console.log('2. 网络连接问题');
  console.log('3. 权限不足\n');
  process.exit(1);
}
