import React, { useState } from 'react';
import { Star, CheckCircle2, ArrowRight, ExternalLink, Bookmark, Info, Sparkles } from 'lucide-react';
import { VpnItem, Language } from '../types';

interface VpnCardProps {
  vpn: VpnItem;
  lang: Language;
  onOpenReview: (vpn: VpnItem) => void;
  onOpenDeal: (vpn: VpnItem) => void;
  isSaved: boolean;
  onToggleSave: (vpnId: string) => void;
}

export const VpnCard: React.FC<VpnCardProps> = ({
  vpn,
  lang,
  onOpenReview,
  onOpenDeal,
  isSaved,
  onToggleSave
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div 
      id={`vpn-card-${vpn.id}`}
      className="group relative flex flex-col lg:flex-row bg-white border border-[#E0E0E0] rounded-xl shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden hover:border-[#614abf]"
    >
      {/* Depth Indicator Bar */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${
          vpn.rank === 1 ? 'bg-[#614abf] group-hover:w-1.5' : 'bg-[#e2e2e2] group-hover:bg-[#614abf] group-hover:w-1.5'
        }`}
      />

      {/* Left Logo Area */}
      <div className="w-full lg:w-[240px] p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[#E0E0E0] bg-[#fdfdfd] relative select-none">
        {/* Rank Badge */}
        <span className="absolute top-4 left-4 w-6 h-6 rounded-full bg-[#eeeeee] text-[#1a1c1c] text-[12px] font-bold flex items-center justify-center border border-[#E0E0E0]">
          {vpn.rank}
        </span>

        {/* Save/Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(vpn.id);
          }}
          title={isSaved ? '저장 취소' : '비교 목록에 저장'}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#747878] hover:text-[#614abf] hover:bg-[#f3f3f3] transition-colors"
          aria-label="Save for comparison"
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#614abf] text-[#614abf]' : ''}`} />
        </button>

        {/* Brand Image Logo Link */}
        <a 
          href={vpn.dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={`${vpn.name} 공식 사이트 방문`}
          className="h-20 w-36 flex items-center justify-center my-2 cursor-pointer group/logo"
        >
          {imageLoaded ? (
            <img 
              src={vpn.logoUrl} 
              alt={`${vpn.name} logo`}
              className="max-h-16 max-w-32 object-contain transition-transform duration-300 group-hover/logo:scale-105"
              onError={() => setImageLoaded(false)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <span className="font-['Hanken_Grotesk'] text-xl font-bold text-[#111111] group-hover/logo:text-[#614abf]">{vpn.name}</span>
              <span className="text-[10px] text-[#747878] font-medium tracking-wide">VERIFIED SECURE</span>
            </div>
          )}
        </a>

        {/* Starting Price Hint */}
        <div className="text-center mt-1">
          <span className="text-[11px] text-[#747878]">{lang === 'ko' ? '월 구독료 기준' : 'Starting from'} </span>
          <span className="text-[14px] font-bold text-[#111111]">{vpn.priceMonthly}</span>
          <span className="text-[11px] text-[#747878]">/mo</span>
        </div>
      </div>

      {/* Middle Content Area */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
        <div>
          {/* Promo and Highlight Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {vpn.highlightTagKo && (
              <span className="px-2.5 py-1 bg-[#e2e2e2] text-[#1a1c1c] text-[11px] font-bold rounded tracking-wide uppercase">
                {lang === 'ko' ? vpn.highlightTagKo : vpn.highlightTagEn}
              </span>
            )}
            <span className="px-2.5 py-1 bg-[#f4e38d] text-[#211c00] text-[11px] font-bold rounded tracking-wide flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {lang === 'ko' ? vpn.discountTagKo : vpn.discountTagEn}
            </span>
          </div>

          {/* Description */}
          <p className="font-['Inter'] text-[15px] md:text-[16px] text-[#1a1c1c] mb-6 leading-relaxed">
            <strong className="font-bold text-[#111111]">{vpn.name}</strong>
            {lang === 'ko' ? vpn.descriptionKo.replace(vpn.name, '') : vpn.descriptionEn.replace(vpn.name, '')}
          </p>
        </div>

        {/* Feature Checkmark Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 pt-4 border-t border-[#E0E0E0]/60">
          {vpn.features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-[18px] h-[18px] text-[#00C853] shrink-0 mt-0.5" />
              <span className="font-['Inter'] text-[13px] md:text-[14px] text-[#444748] font-medium leading-tight">
                {lang === 'ko' ? feat.textKo : feat.textEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Score and Action Area */}
      <div className="w-full lg:w-[220px] p-6 lg:p-8 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-[#E0E0E0] bg-[#fbfbfb]">
        {/* Numeric Score */}
        <div className="font-['Hanken_Grotesk'] text-[32px] font-bold text-[#111111] mb-1 leading-none">
          {vpn.score.toFixed(1)}
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center gap-0.5 mb-1.5 text-[#f4e38d]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#f4e38d] text-[#d7c774]" />
          ))}
        </div>

        {/* Score Classification Label */}
        <div className="font-['Inter'] text-[12px] font-semibold text-[#747878] mb-5 uppercase tracking-wider">
          {lang === 'ko' ? vpn.ratingLabelKo : vpn.ratingLabelEn}
        </div>

        {/* Primary CTA Button - Direct Link to Affiliate URL */}
        <a 
          id={`btn-visit-${vpn.id}`}
          href={vpn.dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-[#614abf] hover:bg-[#4930a6] text-white rounded-lg font-['Inter'] text-[14px] font-bold transition-all flex items-center justify-center gap-2 group/btn shadow-xs shadow-[#614abf]/20 active:scale-98 cursor-pointer"
        >
          <span>{lang === 'ko' ? `${vpn.name} 방문하기` : 'Visit Site'}</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>

        {/* Secondary Detailed Review Button */}
        <button
          id={`btn-review-${vpn.id}`}
          onClick={() => onOpenReview(vpn)}
          className="mt-2.5 text-xs text-[#747878] hover:text-[#614abf] font-semibold flex items-center gap-1 transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          <span>{lang === 'ko' ? '상세 분석 리뷰 보기' : 'Read In-Depth Review'}</span>
        </button>
      </div>
    </div>
  );
};
