#!/usr/bin/env python3
import json
import os
import re
import time
import urllib.request
import urllib.error
from pathlib import Path

BASE_URL = "https://open.wps.cn/docs/api/doc"
OUTPUT_DIR = "/Users/sonnet/opencode/WPS/knowledge-base/wps-open-platform/docs"
DOCS_LIST = "/tmp/wps_docs_list.json"

def sanitize_filename(name):
    """清理文件名，移除不允许的字符"""
    return re.sub(r'[<>:"/\\|?*]', '_', name)

def fetch_doc(doc_id, retry=3):
    """获取单个文档内容"""
    url = f"{BASE_URL}/{doc_id}"
    
    for attempt in range(retry):
        try:
            req = urllib.request.Request(url)
            req.add_header('User-Agent', 'Mozilla/5.0')
            
            with urllib.request.urlopen(req, timeout=30) as response:
                data = json.loads(response.read().decode('utf-8'))
                
                if data.get('code') == 0:
                    return data.get('data')
                else:
                    print(f"  Error: {data.get('message')}")
                    return None
        except urllib.error.URLError as e:
            if attempt < retry - 1:
                print(f"  Retry {attempt + 1}/{retry} for {doc_id}")
                time.sleep(1)
            else:
                print(f"  Failed to fetch {doc_id}: {e}")
                return None
        except Exception as e:
            print(f"  Error fetching {doc_id}: {e}")
            return None
    
    return None

def save_doc(doc_data, doc_info):
    """保存文档为 Markdown 文件"""
    if not doc_data or 'content' not in doc_data:
        return False
    
    content = doc_data.get('content', '')
    breadcrumb = doc_data.get('breadcrumb', [])
    name = doc_data.get('fileName', doc_info['name'])
    
    # 根据路径创建目录结构
    # 从 breadcrumb 或 path 提取目录
    if len(breadcrumb) > 1:
        # 使用 breadcrumb 的中间部分作为目录
        dir_parts = [sanitize_filename(p) for p in breadcrumb[:-1]]
    else:
        # 使用 path
        path_parts = doc_info['path'].strip('/').split('/')
        dir_parts = [sanitize_filename(p) for p in path_parts[:-1]]
    
    # 创建完整目录路径
    doc_dir = Path(OUTPUT_DIR) / Path(*dir_parts)
    doc_dir.mkdir(parents=True, exist_ok=True)
    
    # 确定文件名
    if not name.endswith('.md'):
        name = sanitize_filename(name) + '.md'
    
    file_path = doc_dir / name
    
    # 添加 front matter
    front_matter = "---\n"
    front_matter += f"title: {doc_info['name']}\n"
    front_matter += f"breadcrumb: {' > '.join(breadcrumb)}\n"
    front_matter += f"source: {doc_info['file_source']}\n"
    front_matter += "---\n\n"
    
    # 写入文件
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(front_matter)
            f.write(content)
        return True
    except Exception as e:
        print(f"  Error saving {file_path}: {e}")
        return False

def main():
    # 读取文档列表
    with open(DOCS_LIST, 'r') as f:
        docs = json.load(f)
    
    total = len(docs)
    success = 0
    failed = []
    
    print(f"开始收集 {total} 篇文档...")
    print(f"保存位置: {OUTPUT_DIR}\n")
    
    for i, doc in enumerate(docs, 1):
        doc_id = doc['id']
        name = doc['name']
        
        print(f"[{i}/{total}] {name} ({doc_id})")
        
        # 获取文档
        doc_data = fetch_doc(doc_id)
        
        if doc_data:
            # 保存文档
            if save_doc(doc_data, doc):
                success += 1
                print(f"  ✓ 已保存")
            else:
                failed.append(doc_id)
                print(f"  ✗ 保存失败")
        else:
            failed.append(doc_id)
        
        # 避免请求过快
        time.sleep(0.1)
    
    print(f"\n收集完成!")
    print(f"成功: {success}/{total}")
    
    if failed:
        print(f"\n失败的文档 ID:")
        for doc_id in failed[:10]:
            print(f"  - {doc_id}")
        if len(failed) > 10:
            print(f"  ... 还有 {len(failed) - 10} 个")

if __name__ == '__main__':
    main()
