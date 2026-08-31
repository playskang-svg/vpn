# VPN Good Choice

최고의 유료 VPN을 비교·추천하는 정적 웹사이트입니다. React + Vite로 빌드되는 순수 프론트엔드 앱이며, 별도 백엔드 서버가 필요하지 않습니다.

## 개발

```bash
npm install
npm run dev      # http://localhost:3000
```

## 빌드

```bash
npm run build     # dist/ 에 정적 파일 생성
npm run preview   # 빌드 결과 로컬 미리보기
```

## 배포 (GitHub Pages)

`main` 브랜치에 push하면 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)이 자동으로 빌드 후 GitHub Pages에 배포합니다.

**최초 1회 설정이 필요합니다:** 저장소 **Settings → Pages → Build and deployment → Source**를 **"GitHub Actions"**로 지정해 주세요. 이후에는 `main`에 push할 때마다 자동으로 재배포됩니다.

배포 URL: `https://<github-owner>.github.io/vpn/`
