/**
 * Browser Agent 配置文件
 */

export default {
  // 浏览器启动选项
  browser: {
    headless: 'new',  // 无头模式：'new' | false
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu'
    ]
  },
  
  // 页面加载选项
  page: {
    timeout: 30000,  // 超时时间（毫秒）
    waitUntil: 'networkidle0',  // 等待条件：'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
  },
  
  // 视口配置
  viewport: {
    width: 1920,
    height: 1080
  },
  
  // 内容提取选项
  extraction: {
    // 要提取的选择器（优先级从高到低）
    selectors: [
      'main',
      'article',
      '.content',
      '.documentation',
      '.docs-content',
      '#content',
      'body'
    ],
    
    // 要移除的元素
    removeSelectors: [
      'nav',
      'header',
      'footer',
      '.sidebar',
      '.navigation',
      '.menu',
      'script',
      'style',
      'noscript'
    ]
  }
};
