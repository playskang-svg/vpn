import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { VpnItem, Language } from '../types';

interface DealModalProps {
  vpn: VpnItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const DealModal: React.FC<DealModalProps> = ({
  vpn,
  isOpen,
  onClose,
  lang
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !vpn) return null;

  const couponCode = `GOODCHOICE_${vpn.name.toUpperCase().replace(/\s+/g, '')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E0E0E0] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-sm font-bold text-[#444748] hover:bg-[#e2e2e2]"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Promo Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f4e38d] text-[#211c00] text-xs font-bold rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ko' ? 'VPN Good Choice 단독 특별 할인 혜택' : 'VPN Good Choice Exclusive Verified Deal'}</span>
          </div>

          <div className="h-16 flex items-center justify-center mb-2">
            <img 
              src={vpn.logoUrl} 
              alt={vpn.name} 
              className="max-h-12 w-auto object-contain"
            />
          </div>

          <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#111111] mb-1">
            {lang === 'ko' ? vpn.discountTagKo : vpn.discountTagEn}
          </h3>
          <p className="text-xs text-[#747878]">
            {lang === 'ko' ? '공식 홈페이지 최저가 보장 + 30일 환불 보증' : 'Lowest Price Guaranteed + 30-Day Refund'}
          </p>
        </div>

        {/* Price Card */}
        <div className="bg-[#f9f9f9] border border-[#E0E0E0] rounded-xl p-4 mb-5 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="text-sm line-through text-[#747878]">{vpn.originalPrice}/mo</span>
            <span className="font-['Hanken_Grotesk'] text-3xl font-extrabold text-[#614abf]">{vpn.priceMonthly}</span>
            <span className="text-xs text-[#747878]">/월</span>
          </div>
          <span className="text-xs font-bold text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded">
            {vpn.discountPercent} {lang === 'ko' ? '즉시 할인 적용됨' : 'Instant Savings Applied'}
          </span>
        </div>

        {/* Coupon Code Block */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-[#444748] mb-1.5">
            {lang === 'ko' ? '인증된 프로모션 코드' : 'Verified Coupon Code'}
          </label>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              readOnly 
              value={couponCode} 
              className="flex-1 bg-[#eeeeee] border border-[#E0E0E0] rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#111111] select-all"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-2 bg-white border border-[#E0E0E0] hover:border-[#614abf] rounded-lg text-xs font-bold text-[#111111] flex items-center gap-1 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00C853]" />
                  <span className="text-[#00C853]">{lang === 'ko' ? '복사됨' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#614abf]" />
                  <span>{lang === 'ko' ? '복사' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Features Checklist */}
        <div className="space-y-2 mb-6 text-xs text-[#444748]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00C853] shrink-0" />
            <span>{lang === 'ko' ? '30일 무조건 전액 환불 보장 지원' : '30-Day 100% Risk-Free Guarantee'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#614abf] shrink-0" />
            <span>{lang === 'ko' ? '결제 즉시 계정 활성화 및 다운로드 가능' : 'Instant 24/7 Account Activation'}</span>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={vpn.dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onClose()}
          className="w-full py-3.5 bg-[#614abf] hover:bg-[#4930a6] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#614abf]/20 transition-all cursor-pointer"
        >
          <span>{lang === 'ko' ? `${vpn.name} 공식 할인 페이지로 이동` : `Go to Official ${vpn.name} Deal`}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
