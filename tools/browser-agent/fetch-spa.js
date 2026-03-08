#!/usr/bin/env node

/**
 * Browser Agent - SPA页面内容深度提取工具
 * 
 * 功能：
 * - 专门处理动态加载的SPA页面
 * - 等待内容完全加载
 * - 提取更完整的页面内容
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

// 获取命令行参数
const url = process.argv[2];
const outputFile = process.argv[3];

if (!url) {
  console.error('❌ 错误：请提供URL');
  process.exit(1);
}

console.log(`🌐 深度访问: ${url}`);

let browser = null;

try {
  browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  page.setDefaultTimeout(60000);
  
  console.log('⏳ 加载页面...');
  await page.goto(url, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  // 等待更长时间，确保动态内容加载
  console.log('⏳ 等待动态内容加载...');
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // 尝试等待特定元素
  try {
    await page.waitForSelector('article, .markdown, .content, .documentation', {
      timeout: 10000
    });
    console.log('✅ 内容元素已加载');
  } catch (e) {
    console.log('⚠️ 未找到特定内容元素，继续提取...');
  }
  
  // 滚动页面触发懒加载
  console.log('📜 滚动页面触发加载...');
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  
  // 再等待一下
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 尝试多种选择器提取内容
  console.log('🔍 深度提取内容...');
  let content = null;
  
  const selectors = [
    'article',
    '.markdown-body',
    '.documentation-content',
    '.docs-content',
    '.content-body',
    'main .content',
    'main',
    '.content',
    '#content',
    'body'
  ];
  
  for (const selector of selectors) {
    try {
      const element = await page.$(selector);
      if (element) {
        content = await element.evaluate(el => {
          // 移除不需要的元素
          const removeSelectors = [
            'nav', 'header', 'footer', 
            '.sidebar', '.navigation', '.menu',
            'script', 'style', 'noscript',
            '.ads', '.advertisement'
          ];
          removeSelectors.forEach(sel => {
            el.querySelectorAll(sel).forEach(child => child.remove());
          });
          
          return el.innerText;
        });
        
        if (content && content.trim().length > 100) {
          console.log(`✅ 使用选择器: ${selector}`);
          break;
        }
      }
    } catch (e) {
      // 继续尝试下一个选择器
    }
  }
  
  if (!content || content.trim().length < 50) {
    console.log('⚠️ 内容过少，尝试提取整个页面...');
    content = await page.evaluate(() => {
      document.querySelectorAll('script, style, noscript').forEach(el => el.remove());
      return document.body.innerText;
    });
  }
  
  // 检查是否有错误信息
  if (content.includes('文档不存在') || content.includes('请联系管理员')) {
    console.log('⚠️ 页面显示"文档不存在"，可能需要登录或URL错误');
    
    // 尝试获取页面的实际URL和状态
    const finalUrl = page.url();
    console.log(`📍 最终URL: ${finalUrl}`);
    
    // 检查是否有登录提示
    const hasLoginPrompt = await page.evaluate(() => {
      return document.body.innerText.includes('登录') || 
             document.body.innerText.includes('Sign in');
    });
    
    if (hasLoginPrompt) {
      console.log('🔐 页面可能需要登录');
    }
  }
  
  // 清理内容
  content = content
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
  
  // 添加元信息
  const title = await page.title();
  const finalUrl = page.url();
  const markdown = `# ${title}\n\n来源：${url}\n实际URL：${finalUrl}\n\n---\n\n${content}`;
  
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
  if (browser) {
    await browser.close();
  }
}
