// 링크프라이스 VPN 제휴 링크 (사이트 코드 A100702444). app.ac 단축링크를 거치지 않고 직접 연결한다.
// u_id 는 영문·숫자만 (위치별 클릭 귀속용: vpnmain + 위치).
const A = 'A100702444';
const HOST = 'https://lpweb.kr/click.php';

const BUILDERS: Record<string, (uid: string) => string> = {
  // 노드VPN 은 딥링크 미지원 -> 대표 링크
  nordvpn: (uid) => `${HOST}?m=nordvpn2&a=${A}&l=0000&u_id=${uid}`,
  surfshark: (uid) =>
    `${HOST}?m=surfshark&a=${A}&l=9999&l_cd1=3&l_cd2=0&u_id=${uid}&tu=${encodeURIComponent('https://surfshark.com/ko/pricing')}`,
  expressvpn: (uid) =>
    `${HOST}?m=exvpn&a=${A}&l=9999&l_cd1=3&l_cd2=0&u_id=${uid}&tu=${encodeURIComponent('https://www.expressvpn.com/kr/pricing?product_type=vpn')}`,
};

export function lpLink(vpnId: string, place: string = 'card'): string | null {
  const b = BUILDERS[vpnId];
  return b ? b(`vpnmain${place}`) : null;
}

// 제휴 머천트가 있으면 링크프라이스 링크, 없으면 기존 dealUrl (예: CyberGhost 공식 사이트)
export function dealHref(vpn: { id: string; dealUrl: string }, place: string = 'card'): string {
  return lpLink(vpn.id, place) ?? vpn.dealUrl;
}