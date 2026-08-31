import React from 'react';
import { X, Star, CheckCircle2, XCircle, ArrowRight, Shield, Zap, Server, Globe } from 'lucide-react';
import { VpnItem, Language } from '../types';

interface ReviewModalProps {
  vpn: VpnItem | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onOpenDeal: (vpn: VpnItem) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  vpn,
  isOpen,
  onClose,
  lang,
  onOpenDeal
}) => {
  if (!isOpen || !vpn) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E0E0E0] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#E0E0E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-20">
          <div className="flex items-center gap-4">
            <a
              href={vpn.dealUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`${vpn.name} 공식 사이트 방문`}
              className="group/logo cursor-pointer"
            >
              <img 
                src={vpn.compactLogoUrl || vpn.logoUrl} 
                alt={vpn.name} 
                className="h-10 w-auto object-contain transition-transform group-hover/logo:scale-105"
              />
            </a>
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#111111] flex items-center gap-2">
                <span>{vpn.name}</span>
                <span className="text-xs px-2 py-0.5 bg-[#f4e38d] text-[#211c00] rounded-full font-bold">
                  ★ {vpn.score} / 10
                </span>
              </h2>
              <p className="text-xs text-[#747878]">
                {lang === 'ko' ? 'VPN Good Choice 보안 연구소 종합 심층 평가' : 'In-depth Security Lab Evaluation'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eeeeee] flex items-center justify-center text-sm font-bold text-[#444748] hover:bg-[#e2e2e2]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6">
          {/* Executive Summary */}
          <div className="bg-[#f9f9f9] p-5 rounded-xl border border-[#E0E0E0]">
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#111111] mb-2">
              {lang === 'ko' ? '총평 및 에디터 분석' : 'Executive Analysis'}
            </h3>
            <p className="text-sm text-[#444748] leading-relaxed">
              {lang === 'ko' ? vpn.descriptionKo : vpn.descriptionEn}
            </p>
          </div>

          {/* Speed & Performance Metrics */}
          <div>
            <h3 className="font-['Hanken_Grotesk'] text-base font-bold text-[#111111] mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#614abf]" />
              <span>{lang === 'ko' ? '실측 속도 및 성능 벤치마크' : 'Speed Benchmarks'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white border border-[#E0E0E0] p-3.5 rounded-xl text-center">
                <span className="text-xs text-[#747878] block mb-1">
                  {lang === 'ko' ? '다운로드 속도' : 'Download Speed'}
                </span>
                <span className="font-['Hanken_Grotesk'] text-xl font-bold text-[#00C853]">942 Mbps</span>
                <span className="text-[11px] text-[#747878] block mt-0.5">(-3.2% drop)</span>
              </div>
              <div className="bg-white border border-[#E0E0E0] p-3.5 rounded-xl text-center">
                <span className="text-xs text-[#747878] block mb-1">
                  {lang === 'ko' ? '업로드 속도' : 'Upload Speed'}
                </span>
                <span className="font-['Hanken_Grotesk'] text-xl font-bold text-[#111111]">890 Mbps</span>
                <span className="text-[11px] text-[#747878] block mt-0.5">(-5.1% drop)</span>
              </div>
              <div className="bg-white border border-[#E0E0E0] p-3.5 rounded-xl text-center">
                <span className="text-xs text-[#747878] block mb-1">
                  {lang === 'ko' ? '지연 시간 (Ping)' : 'Latency (Ping)'}
                </span>
                <span className="font-['Hanken_Grotesk'] text-xl font-bold text-[#614abf]">12 ms</span>
                <span className="text-[11px] text-[#747878] block mt-0.5">(국내 서버 기준)</span>
              </div>
            </div>
          </div>

          {/* Pros and Cons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#e8f5e9] p-4 rounded-xl border border-[#c8e6c9]">
              <h4 className="font-bold text-sm text-[#2e7d32] mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2e7d32]" />
                <span>{lang === 'ko' ? '주요 장점 (Pros)' : 'Key Advantages'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#1b5e20] leading-relaxed">
                {(lang === 'ko' ? vpn.prosKo : vpn.prosEn).map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#ffebee] p-4 rounded-xl border border-[#ffcdd2]">
              <h4 className="font-bold text-sm text-[#c62828] mb-3 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-[#c62828]" />
                <span>{lang === 'ko' ? '아쉬운 점 (Cons)' : 'Drawbacks'}</span>
              </h4>
              <ul className="space-y-2 text-xs text-[#b71c1c] leading-relaxed">
                {(lang === 'ko' ? vpn.consKo : vpn.consEn).map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold">✕</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Streaming & App Platforms */}
          <div className="border-t border-[#E0E0E0] pt-4">
            <h4 className="font-bold text-sm text-[#111111] mb-2">
              {lang === 'ko' ? '지원 스트리밍 서비스' : 'Supported Streaming Services'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {vpn.streamingSupport.map((srv, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-[#eeeeee] text-[#111111] text-xs font-semibold rounded-md">
                  {srv}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 border-t border-[#E0E0E0] bg-[#f9f9f9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-[#747878] block">{lang === 'ko' ? '특별 할인 프로모션' : 'Exclusive Deal'}</span>
            <span className="font-bold text-[#614abf] text-base">{vpn.priceMonthly} / mo ({vpn.discountPercent} {lang === 'ko' ? '할인' : 'Off'})</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenDeal(vpn);
              }}
              className="py-2.5 px-4 bg-white border border-[#614abf] hover:bg-[#f6f4ff] text-[#614abf] rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer flex-1 sm:flex-initial"
            >
              <span>{lang === 'ko' ? '쿠폰 코드 확인' : 'View Coupon'}</span>
            </button>
            <a
              href={vpn.dealUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 bg-[#614abf] hover:bg-[#4930a6] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer flex-1 sm:flex-initial"
            >
              <span>{lang === 'ko' ? `${vpn.name} 공식 사이트 방문` : 'Visit Official Site'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
