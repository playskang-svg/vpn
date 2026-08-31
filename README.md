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

## SEO

- `index.html`: canonical URL, Open Graph / Twitter Card 메타태그, favicon/앱 아이콘, `Organization`/`WebSite` JSON-LD 구조화 데이터
- `public/robots.txt`, `public/sitemap.xml`
- 제휴(어필리에이트) 아웃바운드 링크에는 `rel="sponsored"` 적용
- 이미지 지연 로딩(`loading="lazy"`), 첫 번째 랭킹 카드만 우선 로드(`fetchPriority`)로 Core Web Vitals 최적화
