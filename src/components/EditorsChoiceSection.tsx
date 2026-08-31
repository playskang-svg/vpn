import React from 'react';
import { Star, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { VpnItem, Language } from '../types';

interface EditorsChoiceSectionProps {
  vpnList: VpnItem[];
  lang: Language;
  onOpenDeal: (vpn: VpnItem) => void;
  onOpenReview: (vpn: VpnItem) => void;
}

export const EditorsChoiceSection: React.FC<EditorsChoiceSectionProps> = ({
  vpnList,
  lang,
  onOpenDeal,
  onOpenReview
}) => {
  const topVpns = vpnList.slice(0, 2);

  return (
    <section className="w-full bg-[#eeeeee] py-16">
      <div className="px-4 lg:px-10 max-w-[1200px] mx-auto">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-['Hanken_Grotesk'] text-[28px] md:text-[32px] font-bold text-[#111111] flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#614abf] text-white flex items-center justify-center text-lg shadow-sm">
              ★
            </span>
            <span>{lang === 'ko' ? '편집자 추천' : "Editor's Choice"}</span>
          </h2>

          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#444748] bg-white px-3 py-1.5 rounded-full border border-[#E0E0E0]">
            <ShieldCheck className="w-4 h-4 text-[#00C853]" />
            {lang === 'ko' ? '보안 연구원 실시간 검증' : 'Verified by Security Lab'}
          </span>
        </div>

        {/* Grid of Recommended Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topVpns.map((vpn, index) => {
            const isFirst = index === 0;
            return (
              <div
                key={vpn.id}
                id={`editors-card-${vpn.id}`}
                className="bg-white rounded-xl shadow-xs border border-[#E0E0E0] p-6 flex flex-col hover:-translate-y-1 transition-all duration-300 group hover:shadow-md hover:border-[#614abf]/40"
              >
                {/* Top Badge Row */}
                <div className="flex justify-between items-start mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#eeeeee] text-[#1a1c1c] text-[12px] font-bold flex items-center justify-center border border-[#E0E0E0]">
                    {vpn.rank}
                  </span>
                  <span className="px-2 py-1 bg-[#f4e38d] text-[#211c00] text-[11px] font-bold rounded uppercase tracking-wide">
                    {lang === 'ko' ? vpn.discountTagKo : vpn.discountTagEn}
                  </span>
                </div>

                {/* Logo & Score */}
                <div className="flex flex-col items-center mb-6 text-center">
                  <a
                    href={vpn.dealUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    title={`${vpn.name} 공식 사이트 방문`}
                    className="h-14 w-full flex items-center justify-center mb-3 group/logo cursor-pointer"
                  >
                    <img
                      src={vpn.compactLogoUrl || vpn.logoUrl}
                      alt={vpn.name}
                      loading="lazy"
                      className="h-12 w-auto object-contain transition-transform group-hover/logo:scale-105"
                    />
                  </a>

                  <div className="font-['Hanken_Grotesk'] text-[26px] font-bold text-[#111111] leading-none mb-1">
                    {vpn.score.toFixed(1)}
                  </div>

                  <div className="flex items-center gap-0.5 text-[#f4e38d]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f4e38d] text-[#d7c774]" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="font-['Inter'] text-[13px] text-[#444748] mb-6 border-b border-[#E0E0E0] pb-4 leading-relaxed flex-1 line-clamp-4">
                  <strong className="text-[#111111]">{vpn.name}</strong>
                  {lang === 'ko' ? vpn.editorsSummaryKo.replace(vpn.name, '') : vpn.editorsSummaryEn.replace(vpn.name, '')}
                </p>

                {/* Specs Key-Value Table */}
                <div className="space-y-2.5 mb-6">
                  <div className="flex justify-between border-b border-[#f3f3f3] pb-1.5">
                    <span className="font-['Inter'] text-[13px] text-[#747878]">
                      {lang === 'ko' ? '환불 보장' : 'Money-Back Guarantee'}
                    </span>
                    <span className="font-['Inter'] text-[13px] text-[#111111] font-bold">
                      {vpn.moneyBackDays}{lang === 'ko' ? '일' : ' Days'}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f3f3f3] pb-1.5">
                    <span className="font-['Inter'] text-[13px] text-[#747878]">
                      {lang === 'ko' ? '동시 연결' : 'Simultaneous Connections'}
                    </span>
                    <span className="font-['Inter'] text-[13px] text-[#111111] font-bold">
                      {vpn.maxDevices}
                    </span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-['Inter'] text-[13px] text-[#747878]">
                      {lang === 'ko' ? '서버 규모' : 'Server Network'}
                    </span>
                    <span className="font-['Inter'] text-[13px] text-[#111111] font-bold">
                      {vpn.serverCount} ({vpn.countriesCount})
                    </span>
                  </div>
                </div>

                {/* Action CTA Button */}
                <div className="flex gap-2">
                  <a
                    id={`btn-choice-visit-${vpn.id}`}
                    href={vpn.dealUrl}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className={`flex-1 py-2.5 px-3 rounded-lg font-['Inter'] text-[13px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isFirst
                        ? 'bg-[#111111] hover:bg-[#2f3131] text-white shadow-xs'
                        : 'bg-white hover:bg-[#eeeeee] border border-[#111111] text-[#111111]'
                    }`}
                  >
                    <span>{lang === 'ko' ? '사이트 방문하기 →' : 'Visit Site →'}</span>
                  </a>
                  <button
                    onClick={() => onOpenDeal(vpn)}
                    title={lang === 'ko' ? '특가 쿠폰 확인' : 'View Promo Deal'}
                    className="px-3 py-2.5 bg-[#f4e38d] hover:bg-[#ebd676] text-[#211c00] rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Third Banner Card: Security Education & Guide */}
          <div className="bg-gradient-to-br from-[#1c1b1b] to-[#2f3131] text-white rounded-xl shadow-xs p-6 flex flex-col justify-between border border-[#474646]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-0.5 bg-[#614abf] text-white text-[11px] font-bold rounded">
                  {lang === 'ko' ? '보안 가이드' : 'Security Guide'}
                </span>
                <span className="text-xs text-[#c8c6c5]">2026 Edition</span>
              </div>
              <h3 className="font-['Hanken_Grotesk'] text-xl font-bold mb-3 leading-snug">
                {lang === 'ko' ? 'VPN 선택 시 필수 체크포인트' : 'Crucial VPN Decision Factors'}
              </h3>
              <ul className="space-y-2 text-xs text-[#e5e2e1] leading-relaxed mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-[#00C853] font-bold">✓</span>
                  <span>{lang === 'ko' ? '100% RAM 전용 디스크리스 서버' : '100% RAM-only diskless servers'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00C853] font-bold">✓</span>
                  <span>{lang === 'ko' ? '독립 회계법인 노로그 정기 감사' : 'Independent third-party audits'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00C853] font-bold">✓</span>
                  <span>{lang === 'ko' ? '5/9/14 Eyes 동맹 외 관할권' : 'Non-14 Eyes alliance jurisdiction'}</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenReview(vpnList[0])}
              className="w-full py-2.5 px-4 bg-[#614abf] hover:bg-[#4930a6] text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>{lang === 'ko' ? '검증 가이드라인 읽기' : 'Read Audit Details'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
