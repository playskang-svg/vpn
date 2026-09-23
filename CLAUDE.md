# VPN Good Choice (vpn.adbles.com) 프로젝트 운영 규칙

이 문서는 Claude Code, Codex, Antigravity 등 모든 AI 에이전트가 공유하는 공통 운영 지침이다.

---

## 1. Codespaces와 로컬 교차 작업 2단계 필수 규칙 (충돌 방지 원칙)

Codespaces와 로컬(맥북)을 번갈아가며 작업할 때는 반드시 다음 2단계를 엄수한다:

1. **작업을 시작할 때 👉 `git pull origin main` 먼저 실행!**
   - 맥북이든 Codespace든 자리에 앉아 작업을 시작하기 직전에 터미널에서 `git pull origin main`을 실행하여 최신 상태로 맞춘다.
   - 원격 저장소에 다른 환경에서 올린 커밋이 있는지 먼저 확인하고 동기화한 뒤 변경 작업을 시작한다.
2. **작업을 마쳤을 때 👉 `commit & push` 완료하기!**
   - 자리를 떠나거나 다른 환경으로 넘어가기 전에 항상 작업한 내용을 `git commit` & `git push` 해둔다.
   - 변경사항을 남겨둔 채 환경을 이동하면 다음 세션에서 반드시 충돌(Conflict)이 발생하므로 작업을 마치면 즉시 푸시까지 완료한다.

> ⚠️ **자동 배포 파이프라인 필수 수칙**:
> - 이 저장소는 `main` 브랜치 푸시 시 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 GitHub Pages(`https://vpn.adbles.com`)에 배포한다.
> - 배포 전 반드시 `npm run lint`와 `npm run build`로 빌드 정상 여부를 검증한다.
> - 작업 완료 후 `git push origin main`을 실행하면 자동 배포가 완료된다.

---

## 2. 제휴링크

애드블스 함대 중앙 저장소 [`playskang-svg/affiliatelink`](https://github.com/playskang-svg/affiliatelink)를 원본으로 쓴다. `npm run sync:affiliate`(`predev`/`build`에서 자동 실행)가 형제 폴더 `~/dev/affiliatelink/data/affiliate-links.json`을 읽어 이 저장소의 `data/affiliate-links.json`으로 복사하고, `src/lib/affiliate.ts`의 `getLink(key)`/`linkUrl(key)`로 조회한다.

**미해결 — 다음에 손볼 때 확인**: `src/data/*.ts`의 VPN 카드 4개 중 NordVPN·Surfshark·ExpressVPN의 `dealUrl`이 지금 `http://app.ac/...` 형식인데, 중앙 저장소에는 같은 상품의 최신 링크(`vpn-nordvpn`/`vpn-surfshark`/`vpn-expressvpn`, `lpweb.kr`/`linkmoa.kr`, partner_id A100702444)가 이미 있다. isatipsadbles 쪽은 이미 이 최신 링크로 넘어갔고 app.ac 계열은 http라서 전량 폐기(retired) 처리했다 — 이 사이트만 옛 링크에 남아있을 가능성이 있다. CyberGhost는 `dealUrl`이 아예 제휴 추적 없는 직링크(`https://cyberghostvpn.com`)라 수수료가 안 잡힌다. 실제로 이 셋을 중앙 저장소 값으로 바꿀지, CyberGhost 제휴링크를 새로 발급할지는 확인 후 진행 — 트래킹이 걸려 있는 링크라 임의로 바꾸지 않는다.

## 3. 빌드 및 검증

```bash
npm run lint      # TypeScript 타입 검사 (tsc --noEmit)
npm run build     # dist/ 생성 및 정적 빌드 검증
npm run preview   # 빌드 결과 미리보기
```
