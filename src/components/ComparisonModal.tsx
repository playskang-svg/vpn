import React, { useState } from 'react';
import { X, Check, ArrowRight, Shield, Zap, Sparkles, Tv, Lock } from 'lucide-react';
import { VpnItem, Language } from '../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  vpnList: VpnItem[];
  lang: Language;
  onOpenDeal: (vpn: VpnItem) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  vpnList,
  lang,
  onOpenDeal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E0E0E0] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E0E0E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e6deff] text-[#614abf] text-xs font-bold mb-1">
              <Sparkles className="w-3 h-3" />
              {lang === 'ko' ? '2026 종합 성능 매트릭스' : '2026 Performance Matrix'}
            </div>
            <h2 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#111111]">
              {lang === 'ko' ? '주요 VPN 상세 스펙 및 성능 비교' : 'Comprehensive VPN Comparison'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eeeeee] flex items-center justify-center text-sm font-bold text-[#444748] hover:bg-[#e2e2e2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-[#E0E0E0]">
                <th className="p-4 font-['Hanken_Grotesk'] text-base font-bold text-[#111111] w-48 bg-[#f9f9f9]">
                  {lang === 'ko' ? '비교 항목' : 'Comparison Criteria'}
                </th>
                {vpnList.map((vpn) => (
                  <th key={vpn.id} className="p-4 text-center min-w-[170px] bg-white">
                    <a 
                      href={vpn.dealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`${vpn.name} 공식 사이트 방문`}
                      className="flex flex-col items-center gap-1.5 group/th cursor-pointer"
                    >
                      <img 
                        src={vpn.compactLogoUrl || vpn.logoUrl} 
                        alt={vpn.name} 
                        className="h-9 w-auto object-contain transition-transform group-hover/th:scale-105"
                      />
                      <span className="font-bold text-sm text-[#111111] group-hover/th:text-[#614abf]">{vpn.name}</span>
                      <span className="px-2 py-0.5 bg-[#f4e38d] text-[#211c00] text-[10px] font-bold rounded">
                        {vpn.score} / 10
                      </span>
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0E0E0]/80">
              {/* Monthly Price */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  {lang === 'ko' ? '월 최저가' : 'Monthly Starting Price'}
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center">
                    <span className="text-base font-extrabold text-[#614abf]">{vpn.priceMonthly}</span>
                    <span className="text-xs text-[#747878] block">({vpn.discountPercent} {lang === 'ko' ? '할인' : 'off'})</span>
                  </td>
                ))}
              </tr>

              {/* Speed Benchmark */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-[#614abf]" />
                    <span>{lang === 'ko' ? '속도 지수 (Speed Score)' : 'Speed Benchmark'}</span>
                  </div>
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center">
                    <div className="w-full bg-[#eeeeee] h-2 rounded-full overflow-hidden max-w-[100px] mx-auto mb-1">
                      <div 
                        className="bg-[#00C853] h-full rounded-full" 
                        style={{ width: `${vpn.speedScore}%` }} 
                      />
                    </div>
                    <span className="text-xs font-bold text-[#111111]">{vpn.speedScore} / 100</span>
                  </td>
                ))}
              </tr>

              {/* Refund Guarantee */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  {lang === 'ko' ? '환불 보증 기간' : 'Money-Back Period'}
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center font-bold text-[#111111]">
                    {vpn.moneyBackDays}{lang === 'ko' ? '일 무조건 환불' : ' Days Full Refund'}
                  </td>
                ))}
              </tr>

              {/* Max Devices */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  {lang === 'ko' ? '동시 연결 기기 수' : 'Max Devices'}
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center font-bold text-[#111111]">
                    {vpn.maxDevices}
                  </td>
                ))}
              </tr>

              {/* Server Network */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  {lang === 'ko' ? '서버 및 국가 수' : 'Servers / Countries'}
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center text-xs">
                    <span className="font-bold text-[#111111] block">{vpn.serverCount}</span>
                    <span className="text-[#747878]">{vpn.countriesCount}</span>
                  </td>
                ))}
              </tr>

              {/* Streaming Compatibility */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  <div className="flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-[#614abf]" />
                    <span>{lang === 'ko' ? 'OTT 스트리밍 우회' : 'Streaming Support'}</span>
                  </div>
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00C853] bg-[#00C853]/10 px-2 py-0.5 rounded">
                      <Check className="w-3.5 h-3.5" />
                      {lang === 'ko' ? '4K 완벽 지원' : '4K Ultra HD'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Verified No-Logs */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-[#614abf]" />
                    <span>{lang === 'ko' ? '독립 노로그 감사' : 'Audited No-Logs'}</span>
                  </div>
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00C853]">
                      <Check className="w-4 h-4" />
                      {lang === 'ko' ? '공인 검증 완료' : 'Verified'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Protocols */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  {lang === 'ko' ? '주요 프로토콜' : 'Protocols'}
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center text-xs text-[#444748]">
                    {vpn.protocols[0]}
                  </td>
                ))}
              </tr>

              {/* Jurisdiction */}
              <tr className="hover:bg-[#f9f9f9]">
                <td className="p-4 font-semibold text-[#111111] bg-[#f9f9f9]">
                  {lang === 'ko' ? '본사 사법 관할권' : 'Jurisdiction'}
                </td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center text-xs font-medium text-[#111111]">
                    {vpn.jurisdiction}
                  </td>
                ))}
              </tr>

              {/* Action Row */}
              <tr>
                <td className="p-4 bg-[#f9f9f9]"></td>
                {vpnList.map((vpn) => (
                  <td key={vpn.id} className="p-4 text-center">
                    <a
                      href={vpn.dealUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 bg-[#614abf] hover:bg-[#4930a6] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
                    >
                      <span>{lang === 'ko' ? '특가 받기' : 'Get Deal'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E0E0E0] bg-[#f9f9f9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#747878]">
          <p>
            {lang === 'ko' 
              ? '모든 테스트는 1Gbps 대칭형 광랜 환경에서 독립적으로 측정되었습니다.' 
              : 'All benchmarks were independently measured on 1 Gbps fiber lines.'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-[#E0E0E0] rounded-lg font-bold text-[#111111] hover:bg-[#eeeeee]"
          >
            {lang === 'ko' ? '창 닫기' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
