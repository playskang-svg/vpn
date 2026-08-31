# VPN Good Choice

최고의 유료 VPN을 비교·추천하는 정적 웹사이트입니다. React + Vite로 빌드되는 순수 프론트엔드 앱이며, 별도 백엔드 서버가 필요하지 않습니다.

운영 도메인: **https://vpn.adbles.com**

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
```

## 빌드

```bash
npm run build     # dist/ 에 정적 파일 생성 (base "/", 커스텀 도메인 루트 기준)
npm run preview   # 빌드 결과 로컬 미리보기
```

## 배포 (GitHub Pages + 커스텀 도메인)

`main` 브랜치에 push하면 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)이 자동으로 빌드 후 GitHub Pages에 배포합니다. 커스텀 도메인은 `public/CNAME` 파일로 지정되어 있어 GitHub가 자동으로 인식합니다.

### 최초 1회 설정

1. **저장소 Settings → Pages → Build and deployment → Source**를 **"GitHub Actions"**로 지정합니다.
2. **DNS 설정** (adbles.com을 관리하는 DNS 제공업체에서): `vpn` 서브도메인에 **CNAME 레코드**를 추가합니다.

   | Type  | Name (Host) | Value                      |
   | ----- | ----------- | --------------------------- |
   | CNAME | `vpn`       | `<github-owner>.github.io` |

   (apex 도메인이 아닌 서브도메인이므로 A 레코드가 아닌 CNAME을 사용합니다.)
3. DNS가 전파되고 GitHub가 도메인 소유권을 확인하면, **Settings → Pages**에 커스텀 도메인이 `vpn.adbles.com`으로 표시되고 HTTPS 인증서가 자동 발급됩니다 (보통 수 분~1시간 이내). 발급 후 **"Enforce HTTPS"** 체크박스가 자동으로 켜지지 않으면 수동으로 켜주세요.

설정 완료 후에는 `main`에 push할 때마다 `https://vpn.adbles.com`에 자동으로 재배포됩니다. (도메인 연결 전/전파 중에는 `https://<github-owner>.github.io/vpn/`으로도 접근 가능하며, 도메인이 활성화되면 이 주소는 자동으로 커스텀 도메인으로 리다이렉트됩니다.)

## 정보 & 가이드 (블로그) — `/info/`

`https://vpn.adbles.com/info/` 는 메인 React 앱과 완전히 분리된 **별도의 Astro 프로젝트**(`info/` 디렉토리)입니다. 검색엔진이 JS 실행 없이도 내용을 읽을 수 있도록 완전한 정적 HTML로 빌드됩니다. 메인 앱은 이 구조로 인해 전혀 영향받지 않습니다.

### 새 글 추가하기

`info/src/content/posts/`에 마크다운 파일 하나만 추가하면 됩니다:

```markdown
---
title: "글 제목"
description: "검색결과에 노출될 요약 (150자 이내 권장)"
date: 2026-09-01
---

## 소제목

본문 내용...
```

파일을 추가한 뒤 `info/public/sitemap-info.xml`에도 새 글의 URL을 한 줄 추가해 주세요 (글 개수가 많아지면 자동 생성 방식으로 바꾸는 게 좋습니다).

### 로컬 개발

```bash
cd info
npm install
npm run dev       # http://localhost:4321
```

### 빌드 순서 (중요)

`.github/workflows/deploy.yml`에서 **반드시 메인 앱을 먼저 빌드한 뒤** `info/`를 빌드합니다. Vite는 빌드할 때마다 `dist/` 전체를 비우기 때문에, 순서가 바뀌면 `info/`가 만든 `dist/info/`가 지워집니다. Astro의 `outDir`(`dist/info`)은 그 하위 폴더만 정리하므로 반대 순서는 안전합니다.

## SEO

- `index.html`: canonical URL, Open Graph / Twitter Card 메타태그, favicon/앱 아이콘, `Organization`/`WebSite` JSON-LD 구조화 데이터
- `public/robots.txt`, `public/sitemap.xml`
- 제휴(어필리에이트) 아웃바운드 링크에는 `rel="sponsored"` 적용
- 이미지 지연 로딩(`loading="lazy"`), 첫 번째 랭킹 카드만 우선 로드(`fetchPriority`)로 Core Web Vitals 최적화
- `/info/*`: 완전한 정적 HTML(JS 실행 불필요), 글마다 `Article` JSON-LD, `info/public/sitemap-info.xml` — `robots.txt`에 두 sitemap 모두 등록됨
- `naver-site-verification` 메타태그 (네이버 서치어드바이저 소유권 확인)

### 검색엔진 색인 요청

- **네이버 / Bing / Yandex / Seznam / Yep — 자동화됨**: 배포 워크플로(`.github/workflows/deploy.yml`)의 `deploy` job이 사이트가 실제로 라이브된 직후 [IndexNow](https://www.indexnow.org/) 프로토콜로 두 sitemap의 모든 URL을 `https://api.indexnow.org/indexnow`에 POST합니다. IndexNow는 하나의 엔드포인트로 참여 검색엔진 전체에 전파되는 공개 프로토콜이며, 네이버는 2023년부터 공식 참여 중입니다. 소유권 확인 키 파일은 `public/513f7c8cc7ea6d4ce1e2836095e03a6e.txt`(도메인 루트에 그대로 배포됨). 이 단계는 실패해도 배포 자체를 막지 않으며(`continue-on-error: true`), 실제 결과는 Actions 로그의 "Notify IndexNow" 스텝에서 확인 가능합니다.
- **Google — 수동**: Google은 IndexNow 미참여, 그리고 일반 콘텐츠(블로그 글 등)에 쓸 수 있는 색인 요청 API가 공식적으로 없습니다(Indexing API는 채용공고/라이브방송 전용이며 일반 콘텐츠에 쓰면 스팸으로 간주됨). 새 글을 더 빨리 색인시키고 싶다면 [Google Search Console](https://search.google.com/search-console) → URL 검사 → 해당 URL 입력 → "색인 생성 요청"을 글마다 수동으로 눌러주는 것이 유일한 공식 경로입니다.
