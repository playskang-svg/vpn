import React from 'react';
import { CheckCircle2, SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  lang: Language;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  vpnCount: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  vpnCount
}) => {
  const categories = [
    { id: 'all', labelKo: '전체 순위', labelEn: 'All Rankings' },
    { id: 'streaming', labelKo: '🎬 OTT 스트리밍', labelEn: '🎬 Streaming' },
    { id: 'speed', labelKo: '⚡ 최고 속도', labelEn: '⚡ Top Speed' },
    { id: 'budget', labelKo: '💰 가성비 특가', labelEn: '💰 Best Value' },
    { id: 'unlimited', labelKo: '♾️ 무제한 기기', labelEn: '♾️ Unlimited Devices' }
  ];

  return (
    <section className="w-full pt-12 pb-10 px-4 lg:px-10 max-w-[1200px] mx-auto text-center flex flex-col items-center justify-center relative z-10">
      {/* Verification Badge */}
      <div 
        id="hero-verified-badge"
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#e8e8e8] rounded-full mb-6 shadow-sm border border-[#E0E0E0] hover:border-[#614abf]/40 transition-colors"
      >
        <CheckCircle2 className="w-4 h-4 text-[#00C853] shrink-0" />
        <span className="font-['Inter'] text-[12px] font-medium text-[#1a1c1c]">
          {lang === 'ko' 
            ? '전문가 검토 완료  |  업데이트됨: 2026년 8월 22일' 
            : 'Expert Verified  |  Updated: August 22, 2026'}
        </span>
      </div>

      {/* Main Display Headline */}
      <h1 className="font-['Hanken_Grotesk'] text-[36px] md:text-[48px] font-extrabold text-[#111111] mb-5 tracking-tight leading-[1.2]">
        {lang === 'ko' ? '최고의 유료 VPN 추천' : 'The Best VPNs for Digital Privacy in 2026'}
      </h1>

      {/* Subtitle Description */}
      <p className="font-['Inter'] text-[16px] md:text-[18px] text-[#444748] max-w-2xl mx-auto leading-relaxed mb-8">
        {lang === 'ko'
          ? '당사 내부 전문가들이 주요 기능을 분석하여 최고의 VPN을 선택하는 데 도움을 드렸습니다. 다음은 저희가 선정한 최고의 VPN입니다.'
          : 'Our security engineers rigorously tested top VPN services for speed, zero-logs policies, streaming unlock rates, and military-grade encryption.'}
      </p>

      {/* Search & Category Filter Bar */}
      <div className="w-full max-w-3xl flex flex-col sm:flex-row items-center gap-3 justify-center mb-2">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#747878] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="vpn-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={lang === 'ko' ? 'VPN 검색 (예: Nord, 넷플릭스)...' : 'Search VPN (e.g., Nord, speed)...'}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#E0E0E0] rounded-lg text-sm text-[#111111] placeholder:text-[#747878] focus:outline-none focus:border-[#614abf] focus:ring-1 focus:ring-[#614abf] transition-all shadow-xs"
          />
          {searchQuery && (
            <button 
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#747878] hover:text-[#111111]"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'bg-white text-[#444748] border border-[#E0E0E0] hover:border-[#614abf] hover:text-[#614abf]'
                }`}
              >
                {lang === 'ko' ? cat.labelKo : cat.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Decorative Glow Ambient Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9c87ff]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
    </section>
  );
};
