// 제휴링크 중앙 저장소(playskang-svg/affiliatelink) 조회 헬퍼.
// data/affiliate-links.json은 `npm run sync:affiliate`가 생성한다 — 직접 고치지 않는다.
import data from "../../data/affiliate-links.json";

export type AffiliateLink = {
  key: string;
  category: string;
  label: string;
  cta: string;
  url: string;
  network: string;
  status: "active" | "collected" | "review" | "retired";
  issue?: string;
  updated: string;
};

const links = data.links as AffiliateLink[];
const byKey = new Map(links.map((l) => [l.key, l]));

/** link_key로 링크를 가져온다. 없거나 폐기된 키는 빌드에서 즉시 드러나도록 throw. */
export function getLink(key: string): AffiliateLink {
  const link = byKey.get(key);
  if (!link) throw new Error(`[affiliate] unknown link_key: ${key}`);
  if (link.status === "retired") {
    throw new Error(`[affiliate] retired link_key: ${key} (${link.issue ?? "사용 중단"})`);
  }
  return link;
}

/** url만 필요할 때 (버튼 href 등) */
export function linkUrl(key: string): string {
  return getLink(key).url;
}
