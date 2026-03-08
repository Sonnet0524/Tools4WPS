#!/usr/bin/env node

/**
 * 提取页面中的所有链接
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const url = process.argv[2];
const outputFile = process.argv[3];

if (!url) {
  console.error('❌ 请提供URL');
  process.exit(1);
}

console.log(`🔍 提取链接: ${url}`);

let browser = null;

try {
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // 提取所有链接
  const links = await page.evaluate(() => {
    const linkElements = document.querySelectorAll('a[href]');
    const links = [];
    
    linkElements.forEach(link => {
      const href = link.href;
      const text = link.innerText.trim();
      
      // 只保留文档相关的链接
      if (href && (href.includes('/documents/') || href.includes('/guide/') || href.includes('/api-description/'))) {
        links.push({
          href: href,
          text: text
        });
      }
    });
    
    return links;
  });
  
  console.log(`✅ 找到 ${links.length} 个文档链接`);
  
  // 去重
  const uniqueLinks = [];
  const seen = new Set();
  
  links.forEach(link => {
    if (!seen.has(link.href)) {
      seen.add(link.href);
      uniqueLinks.push(link);
    }
  });
  
  console.log(`📊 去重后 ${uniqueLinks.length} 个唯一链接`);
  
  // 输出
  let output = `# 从 ${url} 提取的链接\n\n`;
  output += `总数：${uniqueLinks.length}\n\n`;
  
  uniqueLinks.forEach((link, index) => {
    output += `${index + 1}. ${link.text}\n   ${link.href}\n\n`;
  });
  
  if (outputFile) {
    fs.writeFileSync(outputFile, output, 'utf8');
    console.log(`✅ 链接已保存到: ${outputFile}`);
  } else {
    console.log('\n' + output);
  }
  
} catch (error) {
  console.error('❌ 错误:', error.message);
} finally {
  if (browser) {
    await browser.close();
  }
}
