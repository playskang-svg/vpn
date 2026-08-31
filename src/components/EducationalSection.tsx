import React, { useState } from 'react';
import { ShieldAlert, Lock, EyeOff, Wifi, ArrowRight, Check } from 'lucide-react';
import { Language } from '../types';

interface EducationalSectionProps {
  lang: Language;
}

export const EducationalSection: React.FC<EducationalSectionProps> = ({ lang }) => {
  const [guideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <section className="w-full px-4 lg:px-10 max-w-[1200px] mx-auto py-12">
      <div className="bg-[#e6deff] rounded-2xl p-8 md:p-10 relative overflow-hidden border border-[#cabeff]">
        {/* Glow ambient decoration */}
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-[#614abf]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-xs font-bold text-[#4930a6] mb-4 shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#614abf]" />
            <span>{lang === 'ko' ? '디지털 개인정보 보호 가이드' : 'Digital Privacy Insight'}</span>
          </div>

          <h2 className="font-['Hanken_Grotesk'] text-[24px] md:text-[30px] font-bold text-[#1c0062] mb-3 leading-snug">
            {lang === 'ko' ? '2026년에 왜 VPN이 꼭 필요한가요?' : 'Why You Need a VPN in 2026'}
          </h2>

          <p className="font-['Inter'] text-[15px] md:text-[16px] text-[#4930a6] mb-6 leading-relaxed">
            {lang === 'ko'
              ? '통신사(ISP)는 사용자의 모든 방문 기록을 추적하며, 공공 무료 Wi-Fi는 데이터 탈취에 취약합니다. 신뢰할 수 있는 VPN은 모든 네트워크 패킷을 군사 등급으로 암호화하고 실제 IP를 은폐하여 귀하의 디지털 발자국 통제권을 되찾아 드립니다.'
              : 'Your ISP tracks your browsing history, public Wi-Fi remains vulnerable to packet interception, and content is increasingly geo-restricted. A reliable VPN encrypts your traffic and masks your IP address.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-white/60">
              <EyeOff className="w-5 h-5 text-[#614abf] mb-2" />
              <h4 className="font-bold text-sm text-[#111111] mb-1">
                {lang === 'ko' ? 'ISP 추적 완벽 차단' : 'ISP Privacy'}
              </h4>
              <p className="text-xs text-[#444748]">
                {lang === 'ko' ? '검색 기록 및 다운로드 내역 비공개' : 'Shield traffic from provider inspection'}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-white/60">
              <Wifi className="w-5 h-5 text-[#614abf] mb-2" />
              <h4 className="font-bold text-sm text-[#111111] mb-1">
                {lang === 'ko' ? '공공 Wi-Fi 해킹 방지' : 'Public Wi-Fi Guard'}
              </h4>
              <p className="text-xs text-[#444748]">
                {lang === 'ko' ? '카페, 공항에서 패킷 스니핑 방어' : 'Prevent man-in-the-middle attacks'}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-xl border border-white/60">
              <ShieldAlert className="w-5 h-5 text-[#614abf] mb-2" />
              <h4 className="font-bold text-sm text-[#111111] mb-1">
                {lang === 'ko' ? '글로벌 콘텐츠 잠금 해제' : 'Global Streaming'}
              </h4>
              <p className="text-xs text-[#444748]">
                {lang === 'ko' ? '해외 넷플릭스, 스포츠 중계 시청' : 'Unlock geo-restricted streaming libraries'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setGuideModalOpen(true)}
            className="bg-white text-[#111111] hover:bg-[#f3f3f3] px-5 py-2.5 rounded-lg font-['Inter'] text-[14px] font-bold transition-all inline-flex items-center gap-2 shadow-xs cursor-pointer active:scale-98"
          >
            <span>{lang === 'ko' ? '개인정보 보호 가이드 읽기' : 'Read Our Privacy Guide'}</span>
            <ArrowRight className="w-4 h-4 text-[#614abf]" />
          </button>
        </div>
      </div>

      {/* Guide Detail Modal */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-[#E0E0E0]">
            <div className="flex justify-between items-center pb-4 border-b border-[#E0E0E0] mb-6">
              <h3 className="font-['Hanken_Grotesk'] text-2xl font-bold text-[#111111]">
                {lang === 'ko' ? 'VPN 개인정보 보호 핵심 체크리스트' : 'VPN Privacy & Security Master Guide'}
              </h3>
              <button 
                onClick={() => setGuideModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eeeeee] flex items-center justify-center text-sm font-bold text-[#444748] hover:bg-[#e2e2e2]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-[#444748] leading-relaxed">
              <p>
                {lang === 'ko' 
                  ? 'VPN(가상 사설망)은 인터넷 기기와 원격 서버 간에 안전하게 암호화된 터널을 생성합니다.' 
                  : 'A Virtual Private Network creates a secure, encrypted tunnel between your client device and a remote server.'}
              </p>

              <div className="bg-[#f9f9f9] p-4 rounded-xl space-y-3 border border-[#E0E0E0]">
                <h4 className="font-bold text-[#111111]">{lang === 'ko' ? '안전한 VPN 선택 기준 4가지:' : '4 Essential Criteria:'}</h4>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ko' ? '독립 노로그 감사:' : 'Audited No-Logs:'}</strong> PwC, Deloitte 등 공인 기관의 서버 검증</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ko' ? 'RAM 전용 아키텍처:' : 'RAM-only Servers:'}</strong> 재부팅 시 모든 데이터가 하드웨어 레벨에서 영구 소멸</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ko' ? '킬스위치 (Kill Switch):' : 'Kill Switch:'}</strong> 연결 끊김 시 인터넷을 즉각 차단하여 IP 누출 방지</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00C853] shrink-0 mt-0.5" />
                  <span><strong>{lang === 'ko' ? '안전한 사법 관할권:' : 'Safe Jurisdiction:'}</strong> 파나마, BVI 등 데이터 보존 의무 법률이 없는 국가</span>
                </div>
              </div>

              <p className="text-xs text-[#747878] italic">
                {lang === 'ko' 
                  ? 'VPN Good Choice 연구팀은 분기별로 실제 패킷 캡처 및 DNS Leak 테스트를 통해 위 기준을 지속적으로 재검증합니다.' 
                  : 'VPN Good Choice lab re-evaluates all listed VPNs quarterly with deep packet inspection and DNS leak tests.'}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E0E0E0] flex justify-end">
              <button
                onClick={() => setGuideModalOpen(false)}
                className="px-5 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-bold hover:bg-[#333]"
              >
                {lang === 'ko' ? '확인 및 닫기' : 'Close Guide'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
