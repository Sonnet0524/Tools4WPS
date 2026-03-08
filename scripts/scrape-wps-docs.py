#!/usr/bin/env python3
"""
Scrape WPS Open Platform API docs via their internal JSON API.

Usage:
    python3 scripts/scrape-wps-docs.py [--output DIR] [--concurrency N] [--collection ID]

The script discovers all doc pages from the collection sidebar API,
then fetches each page's markdown content and saves it to disk.
"""

import argparse
import asyncio
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import quote

try:
    import aiohttp
except ImportError:
    print("需要 aiohttp: pip3 install aiohttp")
    sys.exit(1)

BASE = "https://open.wps.cn/docs/api"
DEFAULT_OUTPUT = "wps-docs-output"
DEFAULT_CONCURRENCY = 10


def sanitize_filename(name: str) -> str:
    return re.sub(r'[<>:"/\\|?*]', '_', name).strip()


def collect_docs(items, breadcrumb=None):
    """Recursively collect all file-type items from the sidebar tree."""
    if breadcrumb is None:
        breadcrumb = []
    results = []
    for item in items:
        if item["type"] == "file":
            doc_info = item.get("docInfo", {})
            results.append({
                "name": item["name"],
                "path": item.get("path", ""),
                "source": item.get("source", "local"),
                "doc_id": doc_info.get("id", ""),
                "file_source": doc_info.get("fileSource", ""),
                "breadcrumb": breadcrumb + [item["name"]],
            })
        elif item["type"] == "folder":
            children = item.get("children", [])
            results.extend(collect_docs(children, breadcrumb + [item["name"]]))
    return results


async def fetch_collection(session, collection_id):
    url = f"{BASE}/collections/{collection_id}?lang=zh"
    async with session.get(url) as resp:
        data = await resp.json()
        if data.get("code") != 0:
            print(f"Failed to fetch collection {collection_id}: {data}")
            return []
        return collect_docs(data["data"]["items"])


async def fetch_doc(session, doc, semaphore):
    """Fetch a single doc's content."""
    async with semaphore:
        doc_id = doc["doc_id"]
        source = doc["source"]
        encoded_id = quote(str(doc_id), safe="")
        url = f"{BASE}/doc/{encoded_id}?lang=zh&source={source}"

        for attempt in range(3):
            try:
                async with session.get(url, timeout=aiohttp.ClientTimeout(total=30)) as resp:
                    if resp.status == 429:
                        wait = 2 ** (attempt + 1)
                        print(f"  Rate limited, waiting {wait}s...")
                        await asyncio.sleep(wait)
                        continue
                    data = await resp.json()
                    if data.get("code") == 0:
                        return {**doc, "content": data["data"].get("content", ""), "ok": True}
                    else:
                        return {**doc, "content": "", "ok": False, "error": data.get("message", "unknown")}
            except Exception as e:
                if attempt < 2:
                    await asyncio.sleep(1)
                else:
                    return {**doc, "content": "", "ok": False, "error": str(e)}

        return {**doc, "content": "", "ok": False, "error": "max retries"}


async def main():
    parser = argparse.ArgumentParser(description="Scrape WPS Open Platform docs")
    parser.add_argument("--output", "-o", default=DEFAULT_OUTPUT, help="Output directory")
    parser.add_argument("--concurrency", "-c", type=int, default=DEFAULT_CONCURRENCY)
    parser.add_argument("--collection", default="wps365", help="Collection ID to scrape")
    args = parser.parse_args()

    out_dir = Path(args.output)
    out_dir.mkdir(parents=True, exist_ok=True)

    semaphore = asyncio.Semaphore(args.concurrency)

    async with aiohttp.ClientSession() as session:
        print(f"Fetching collection '{args.collection}' sidebar...")
        docs = await fetch_collection(session, args.collection)
        print(f"Found {len(docs)} documents.")

        # Save the doc index
        with open(out_dir / "index.json", "w", encoding="utf-8") as f:
            json.dump(docs, f, ensure_ascii=False, indent=2)

        print(f"Fetching all {len(docs)} docs (concurrency={args.concurrency})...")
        t0 = time.time()

        tasks = [fetch_doc(session, doc, semaphore) for doc in docs]
        results = await asyncio.gather(*tasks)

        elapsed = time.time() - t0
        ok_count = sum(1 for r in results if r["ok"])
        fail_count = len(results) - ok_count
        print(f"Done in {elapsed:.1f}s. Success: {ok_count}, Failed: {fail_count}")

        # Save each doc as markdown, organized by breadcrumb path
        for r in results:
            if not r["ok"]:
                print(f"  SKIP (error: {r.get('error')}): {r['name']}")
                continue

            crumbs = [sanitize_filename(c) for c in r["breadcrumb"]]
            if len(crumbs) > 1:
                folder = out_dir / Path(*crumbs[:-1])
            else:
                folder = out_dir

            folder.mkdir(parents=True, exist_ok=True)
            filename = sanitize_filename(crumbs[-1]) + ".md"
            filepath = folder / filename

            with open(filepath, "w", encoding="utf-8") as f:
                f.write(r["content"])

        # Also save one big combined file for easy search
        combined = out_dir / "_all-docs-combined.md"
        with open(combined, "w", encoding="utf-8") as f:
            for r in results:
                if not r["ok"]:
                    continue
                breadcrumb_str = " > ".join(r["breadcrumb"])
                f.write(f"\n\n{'='*80}\n")
                f.write(f"<!-- PATH: {r['path']} -->\n")
                f.write(f"<!-- BREADCRUMB: {breadcrumb_str} -->\n")
                f.write(f"{'='*80}\n\n")
                f.write(r["content"])

        print(f"\nOutput saved to: {out_dir}/")
        print(f"  - index.json (document index)")
        print(f"  - _all-docs-combined.md (single file, {combined.stat().st_size // 1024} KB)")
        print(f"  - {ok_count} individual .md files in folder structure")

        if fail_count > 0:
            print(f"\nFailed docs:")
            for r in results:
                if not r["ok"]:
                    print(f"  - {r['name']} ({r['doc_id']}): {r.get('error')}")


if __name__ == "__main__":
    asyncio.run(main())
