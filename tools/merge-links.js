#!/usr/bin/env node

/**
 * 合并所有提取的链接并去重
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linksDir = path.join(__dirname, '../knowledge-base/wps-open-platform/links');
const outputFile = path.join(__dirname, '../knowledge-base/wps-open-platform/COMPLETE-URL-LIST.md');

// 读取所有链接文件
const files = fs.readdirSync(linksDir).filter(f => f.endsWith('-links.md'));

const allUrls = new Map();

files.forEach(file => {
  const content = fs.readFileSync(path.join(linksDir, file), 'utf8');
  const lines = content.split('\n');
  
  lines.forEach(line => {
    const match = line.match(/^\s*(https:\/\/open\.wps\.cn\/documents\/[^\s]+)$/);
    if (match) {
      const url = match[1];
      // 过滤掉锚点链接
      if (!url.includes('#')) {
        if (!allUrls.has(url)) {
          allUrls.set(url, {
            url: url,
            sources: []
          });
        }
      }
    }
  });
});

// 分类URL
const categories = {
  'guide': [],
  'wps365': [],
  'collaboration-middleware': [],
  'mcp-server': [],
  'workshop': [],
  'other': []
};

allUrls.forEach((value, url) => {
  if (url.includes('/guide/')) {
    categories['guide'].push(url);
  } else if (url.includes('/wps365/')) {
    categories['wps365'].push(url);
  } else if (url.includes('/collaboration-middleware/')) {
    categories['collaboration-middleware'].push(url);
  } else if (url.includes('/mcp-server/')) {
    categories['mcp-server'].push(url);
  } else if (url.includes('/workshop')) {
    categories['workshop'].push(url);
  } else {
    categories['other'].push(url);
  }
});

// 生成输出
let output = `# WPS开放平台完整URL清单

生成时间: ${new Date().toISOString()}

## 统计信息

- 总URL数: ${allUrls.size}
- 开发指南: ${categories['guide'].length}
- WPS365能力: ${categories['wps365'].length}
- 协作中台: ${categories['collaboration-middleware'].length}
- MCP: ${categories['mcp-server'].length}
- 资源工坊: ${categories['workshop'].length}
- 其他: ${categories['other'].length}

---

## 1. 开发指南 (Guide)

`;

let index = 1;
categories['guide'].forEach(url => {
  const title = url.split('/').pop().replace(/-/g, ' ');
  output += `${index}. [${title}](${url})\n   \`${url}\`\n\n`;
  index++;
});

output += `\n## 2. WPS365能力\n\n`;
categories['wps365'].forEach(url => {
  const parts = url.split('/');
  const title = parts.slice(-2).join(' - ');
  output += `${index}. [${title}](${url})\n   \`${url}\`\n\n`;
  index++;
});

output += `\n## 3. 协作中台\n\n`;
categories['collaboration-middleware'].forEach(url => {
  const parts = url.split('/');
  const title = parts.slice(-2).join(' - ');
  output += `${index}. [${title}](${url})\n   \`${url}\`\n\n`;
  index++;
});

output += `\n## 4. MCP\n\n`;
categories['mcp-server'].forEach(url => {
  const title = url.split('/').pop().replace(/-/g, ' ');
  output += `${index}. [${title}](${url})\n   \`${url}\`\n\n`;
  index++;
});

output += `\n## 5. 资源工坊\n\n`;
categories['workshop'].forEach(url => {
  output += `${index}. [资源工坊](${url})\n   \`${url}\`\n\n`;
  index++;
});

output += `\n## 6. 其他\n\n`;
categories['other'].forEach(url => {
  output += `${index}. [${url.split('/').pop()}](${url})\n   \`${url}\`\n\n`;
  index++;
});

// 添加优先级标记
output += `\n---\n\n## 优先级说明\n\n`;
output += `- **P0**: 核心开发指南、认证授权、应用创建\n`;
output += `- **P1**: API详细文档、协作中台、MCP\n`;
output += `- **P2**: 客户端开发、高级功能\n`;

fs.writeFileSync(outputFile, output, 'utf8');

console.log(`✅ 已生成完整URL清单: ${outputFile}`);
console.log(`📊 统计:`);
console.log(`   - 总URL数: ${allUrls.size}`);
console.log(`   - 开发指南: ${categories['guide'].length}`);
console.log(`   - WPS365: ${categories['wps365'].length}`);
console.log(`   - 协作中台: ${categories['collaboration-middleware'].length}`);
console.log(`   - MCP: ${categories['mcp-server'].length}`);
console.log(`   - 资源工坊: ${categories['workshop'].length}`);
console.log(`   - 其他: ${categories['other'].length}`);
