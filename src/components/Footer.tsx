import React, { useState } from 'react';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  lang: Language;
  onNavClick: (nav: string) => void;
  onOpenDeals: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavClick, onOpenDeals }) => {
  const [legalModal, setLegalModal] = useState<string | null>(null);

  const legalContent: Record<string, { titleKo: string; titleEn: string; textKo: string; textEn: string }> = {
    privacy: {
      titleKo: '개인정보 처리방침',
      titleEn: 'Privacy Policy',
      textKo: 'VPN Good Choice는 이용자의 개인 식별 정보를 수집하거나 추적하지 않습니다. 본 사이트는 투명한 평가 기준에 따라 독립적인 VPN 테스트 결과를 제공합니다.',
      textEn: 'VPN Good Choice does not harvest or monetize your personal identity. We provide unbiased, independent testing results under transparent editorial criteria.'
    },
    terms: {
      titleKo: '이용약관',
      titleEn: 'Terms of Service',
      textKo: '본 웹사이트에 게재된 모든 리뷰 및 평가 점수는 VPN Good Choice 연구팀의 자체 벤치마크 결과에 기반합니다.',
      textEn: 'All reviews, ratings, and speed data published on this website are based on VPN Good Choice lab testing benchmarks.'
    },
    cookie: {
      titleKo: '쿠키 정책',
      titleEn: 'Cookie Policy',
      textKo: '사용자 환경 개선 및 언어 설정 저장을 위한 필수적인 최소 쿠키만을 사용합니다.',
      textEn: 'We only use strictly necessary cookies to maintain your preferences and regional language settings.'
    },
    disclaimer: {
      titleKo: '면책 조항',
      titleEn: 'Editorial Disclaimer',
      textKo: '일부 제휴 링크를 통해 구매가 이루어질 경우 수수료를 지급받을 수 있으나, 이는 평가 점수나 순위 선정에 어떠한 영향도 미치지 않습니다.',
      textEn: 'We may receive affiliate compensation for purchases made through links, but this never influences our editorial ratings or lab scores.'
    }
  };

  return (
    <footer className="w-full bg-[#eeeeee] py-16 mt-16 border-t border-[#E0E0E0]">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info (Span 2) */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Logo size="md" />
            </div>
            <p className="text-[#444748] text-sm md:text-[15px] max-w-sm leading-relaxed">
              {lang === 'ko'
                ? '진화하는 디지털 환경에서 귀하를 안전하게 보호하기 위해 독립적이고 전문가가 주도하는 VPN 리뷰 및 디지털 개인정보 보호 리소스를 제공합니다.'
                : 'Providing independent, expert-driven VPN reviews and digital privacy resources to keep you safe in an evolving digital landscape.'}
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-['Inter'] text-sm font-bold text-[#111111] mb-4">
              {lang === 'ko' ? '네비게이션' : 'Navigation'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => onNavClick('best-vpns')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '최고의 VPN' : 'Best VPNs'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('reviews')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '리뷰' : 'Reviews'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavClick('resources')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '리소스' : 'Resources'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDeals}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '특가 정보' : 'Deals'}
                </button>
              </li>
              <li>
                <a href="/info/" className="text-[#444748] hover:text-[#614abf] transition-colors">
                  {lang === 'ko' ? '정보 & 가이드' : 'Guides'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-['Inter'] text-sm font-bold text-[#111111] mb-4">
              {lang === 'ko' ? '법적 고지' : 'Legal'}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button 
                  onClick={() => setLegalModal('privacy')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '개인정보 처리방침' : 'Privacy Policy'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal('terms')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '이용약관' : 'Terms of Service'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal('cookie')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '쿠키 정책' : 'Cookie Policy'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setLegalModal('disclaimer')}
                  className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
                >
                  {lang === 'ko' ? '면책 조항' : 'Disclaimer'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-[#c4c7c7]/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#747878]">
          <p>
            {lang === 'ko'
              ? '© 2026 VPN Good Choice. 모든 권리 보유. 디지털 안전을 위한 전문가 검증.'
              : '© 2026 VPN Good Choice. All rights reserved. Expert verification for digital safety.'}
          </p>
          <div className="flex items-center gap-6">
            <button
              title="Verified Shield"
              onClick={() => alert(lang === 'ko' ? 'VPN Good Choice SSL 256비트 암호화 연결 보호 중' : 'VPN Good Choice SSL 256-bit secure connection.')}
              className="text-[#444748] hover:text-[#614abf] transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Simple Legal Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E0E0E0]">
            <h3 className="font-['Hanken_Grotesk'] text-xl font-bold text-[#111111] mb-3">
              {lang === 'ko' ? legalContent[legalModal].titleKo : legalContent[legalModal].titleEn}
            </h3>
            <p className="text-sm text-[#444748] leading-relaxed mb-6">
              {lang === 'ko' ? legalContent[legalModal].textKo : legalContent[legalModal].textEn}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 bg-[#111111] text-white rounded-lg text-xs font-bold hover:bg-[#333]"
              >
                {lang === 'ko' ? '닫기' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
