#!/usr/bin/env tsx
/**
 * 빌드 후 홈페이지를 정적 마크업으로 미리 렌더링해 dist/index.html에 주입한다.
 *
 * 이 앱은 순수 클라이언트 렌더링(SPA)이라 vite build 직후의 dist/index.html에는
 * <div id="root"></div>만 있다. JS를 실행하지 않는 요청자(검색엔진 크롤러, SNS
 * 미리보기 봇, verify-live 같은 배포 검증 스크립트)에게는 사실상 빈 페이지로 보인다.
 *
 * react-dom/server의 renderToStaticMarkup으로 App을 정적 HTML로 렌더링해 그
 * 자리에 채워 넣는다. main.tsx는 그대로 createRoot().render()를 쓰므로, 브라우저에서
 * JS가 로드되면 기존과 동일하게 클라이언트 렌더링으로 다시 그린다 — 실사용자가 보는
 * 화면·동작은 전혀 바뀌지 않는다. 이 스크립트가 추가하는 건 "JS 실행 전 첫 응답에
 * 실제 텍스트가 있는가" 하나뿐이다.
 *
 * 이 앱은 useEffect도, 렌더링 중 window/document/localStorage 접근도 없어
 * (전부 이벤트 핸들러 안에서만 씀) 서버 렌더링에 안전하다. 혹시라도 실패하면
 * 빌드 전체를 막지 않고 경고만 남긴다 — 프리렌더는 있으면 좋은 것이지, 없다고
 * 사이트가 깨지는 건 아니다.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '../src/App.tsx';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = join(ROOT, 'dist', 'index.html');

if (!existsSync(distIndex)) {
  console.error('✖ dist/index.html이 없습니다 — vite build를 먼저 실행해야 합니다.');
  process.exit(1);
}

let markup = '';
try {
  markup = renderToStaticMarkup(React.createElement(App));
} catch (e) {
  console.error(`::warning::프리렌더 실패 — 빈 껍데기로 남깁니다 (빌드는 계속 진행): ${e?.message || e}`);
  process.exit(0);
}

const html = readFileSync(distIndex, 'utf8');
const marker = '<div id="root"></div>';
if (!html.includes(marker)) {
  console.error('::warning::dist/index.html에서 <div id="root"></div>를 찾지 못해 프리렌더를 주입하지 못했습니다.');
  process.exit(0);
}

const injected = html.replace(marker, `<div id="root">${markup}</div>`);
writeFileSync(distIndex, injected);

const textOnly = markup.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
console.log(`✓ 프리렌더 주입 완료 — 마크업 ${markup.length.toLocaleString()}자 (텍스트 약 ${textOnly.length.toLocaleString()}자)`);
