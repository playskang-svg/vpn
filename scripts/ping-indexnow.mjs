#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const HOST = 'vpn.adbles.com';
const KEY = '513f7c8cc7ea6d4ce1e2836095e03a6e';

async function main() {
  console.log(`=== IndexNow Submission for ${HOST} ===`);

  const sitemapUrls = [
    `https://${HOST}/sitemap.xml`,
    `https://${HOST}/info/sitemap-info.xml`
  ];

  const urlSet = new Set();

  for (const sitemapUrl of sitemapUrls) {
    try {
      const res = await fetch(sitemapUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const text = await res.text();
        const matches = text.matchAll(/<loc>([^<]+)<\/loc>/g);
        for (const match of matches) {
          const u = match[1].trim();
          if (!u.endsWith('.xml')) {
            urlSet.add(u);
          }
        }
      }
    } catch (e) {
      console.warn(`Failed to fetch sitemap ${sitemapUrl}:`, e.message);
    }
  }

  const urls = [...urlSet];
  console.log(`Total URLs found from sitemaps: ${urls.length}`);

  if (urls.length === 0) {
    console.log('No URLs to submit.');
    return;
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls
  };

  const endpoints = [
    { name: 'IndexNow.org', url: 'https://api.indexnow.org/indexnow' },
    { name: 'Bing', url: 'https://www.bing.com/indexnow' },
    { name: 'Naver Search Advisor', url: 'https://searchadvisor.naver.com/indexnow' }
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      });
      const ok = res.status === 200 || res.status === 202;
      console.log(`  ${ok ? '성공' : '실패'} [${ep.name}]: HTTP ${res.status}`);
    } catch (e) {
      console.error(`  실패 [${ep.name}]:`, e.message);
    }
  }
}

main();
