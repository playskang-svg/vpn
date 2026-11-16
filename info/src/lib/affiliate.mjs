// 링크프라이스 VPN 제휴 링크 (사이트 코드 A100702444). 단축링크(app.ac) 거치지 않고 직접 사용.
// u_id 는 영문·숫자만(링크프라이스 권장), 글/위치별 클릭 귀속용.
const A = 'A100702444';
const HOST = 'https://lpweb.kr/click.php';

export const VPN_MERCHANTS = [
  {
    key: 'nordvpn',
    name: 'NordVPN',
    tag: '속도·균형 추천',
    color: '#4687ff',
    // 노드VPN 은 딥링크 미지원 -> 대표 링크
    build: (uid) => `${HOST}?m=nordvpn2&a=${A}&l=0000&u_id=${uid}`,
  },
  {
    key: 'surfshark',
    name: 'Surfshark',
    tag: '기기 무제한·가성비',
    color: '#1ebeb4',
    build: (uid) =>
      `${HOST}?m=surfshark&a=${A}&l=9999&l_cd1=3&l_cd2=0&u_id=${uid}&tu=${encodeURIComponent('https://surfshark.com/ko/pricing')}`,
  },
  {
    key: 'expressvpn',
    name: 'ExpressVPN',
    tag: '초보자용 쉬운 앱',
    color: '#da3940',
    build: (uid) =>
      `${HOST}?m=exvpn&a=${A}&l=9999&l_cd1=3&l_cd2=0&u_id=${uid}&tu=${encodeURIComponent('https://www.expressvpn.com/kr/pricing?product_type=vpn')}`,
  },
];

// 글 슬러그 + 위치 -> u_id (영문·숫자만, 60자 이내)
export function infoUid(slug, place) {
  const clean = String(slug).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 40);
  return `vpninfo${place}${clean}`.slice(0, 60);
}

export function infoLinks(slug, place) {
  const uid = infoUid(slug, place);
  return VPN_MERCHANTS.map((m) => ({ ...m, href: m.build(uid) }));
}
