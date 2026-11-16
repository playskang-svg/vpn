import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VpnCard } from './components/VpnCard';
import { EditorsChoiceSection } from './components/EditorsChoiceSection';
import { EducationalSection } from './components/EducationalSection';
import { FaqSection } from './components/FaqSection';
import { ComparisonModal } from './components/ComparisonModal';
import { ReviewModal } from './components/ReviewModal';
import { DealModal } from './components/DealModal';
import { Footer } from './components/Footer';
import { VPN_LIST, FAQ_LIST } from './data/vpnData';
import { Language, VpnItem } from './types';

export function App() {
  const [lang, setLang] = useState<Language>('ko');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeNav, setActiveNav] = useState<string>('best-vpns');
  
  // Modals state
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedReviewVpn, setSelectedReviewVpn] = useState<VpnItem | null>(null);
  const [selectedDealVpn, setSelectedDealVpn] = useState<VpnItem | null>(null);
  
  // Saved VPNs state
  const [savedVpnIds, setSavedVpnIds] = useState<string[]>(['nordvpn', 'surfshark']);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
  };

  const handleToggleSave = (vpnId: string) => {
    setSavedVpnIds((prev) =>
      prev.includes(vpnId) ? prev.filter((id) => id !== vpnId) : [...prev, vpnId]
    );
  };

  const handleNavClick = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'best-vpns') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (nav === 'reviews') {
      const el = document.getElementById('vpn-list-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (nav === 'resources') {
      const el = document.getElementById('resources-faq-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered VPNs based on category & search query
  const filteredVpns = useMemo(() => {
    return VPN_LIST.filter((vpn) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || vpn.category.includes(selectedCategory as any);

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        vpn.name.toLowerCase().includes(q) ||
        vpn.descriptionKo.toLowerCase().includes(q) ||
        vpn.descriptionEn.toLowerCase().includes(q) ||
        vpn.features.some(
          (f) =>
            f.textKo.toLowerCase().includes(q) || f.textEn.toLowerCase().includes(q)
        );

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-['Inter']">
      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        activeNav={activeNav}
        onNavClick={handleNavClick}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenDeals={() => setSelectedDealVpn(VPN_LIST[0])}
        savedCount={savedVpnIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero Section */}
        <HeroSection
          lang={lang}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vpnCount={filteredVpns.length}
        />

        {/* VPN Ranked List Section */}
        <section id="vpn-list-section" className="px-4 lg:px-10 max-w-[1200px] mx-auto pb-16">
          <h2 className="font-['Hanken_Grotesk'] text-[22px] md:text-[26px] font-bold text-[#111111] mb-5">
            {lang === 'ko' ? '2026년 최고의 VPN 순위' : 'Top-Ranked VPNs for 2026'}
          </h2>
          <p className="text-[12px] text-[#747878] mb-5">
            {lang === 'ko'
              ? '제휴 링크가 포함되어 있으며, 링크를 통해 가입하면 운영자가 수수료를 받을 수 있어요(구매 가격은 같아요). 가격과 조건은 수시로 바뀌니 결제 전 서비스 사이트에서 확인하세요.'
              : 'This page contains affiliate links. We may earn a commission if you subscribe through them, at no extra cost to you. Prices and terms change, so check the service site before you pay.'}
          </p>
          {filteredVpns.length === 0 ? (
            <div className="bg-white rounded-xl border border-[#E0E0E0] p-12 text-center my-8">
              <p className="text-base font-semibold text-[#111111] mb-2">
                {lang === 'ko' ? '검색 결과가 없습니다' : 'No VPNs found'}
              </p>
              <p className="text-xs text-[#747878] mb-4">
                {lang === 'ko' ? '다른 검색어나 필터를 선택해 보세요.' : 'Try changing your search keywords or filters.'}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-[#614abf] text-white rounded-lg text-xs font-bold"
              >
                {lang === 'ko' ? '필터 초기화' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredVpns.map((vpn, index) => (
                <VpnCard
                  key={vpn.id}
                  vpn={vpn}
                  lang={lang}
                  priority={index === 0}
                  onOpenReview={(item) => setSelectedReviewVpn(item)}
                  onOpenDeal={(item) => setSelectedDealVpn(item)}
                  isSaved={savedVpnIds.includes(vpn.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
        </section>

        {/* 가격·비교 기준 가이드 (구매 전 확인용 내부 링크) */}
        <section id="price-guide-section" className="px-4 lg:px-10 max-w-[1200px] mx-auto pb-16">
          <h2 className="font-['Hanken_Grotesk'] text-[22px] md:text-[26px] font-bold text-[#111111] mb-2">
            {lang === 'ko' ? '결제 전에 확인할 VPN 가격·비교 가이드' : 'Before you pay: VPN price and comparison guides'}
          </h2>
          <p className="text-[13px] text-[#747878] mb-5">
            {lang === 'ko'
              ? '월 요금만 보지 말고 첫 결제 총액·갱신가·기기 수·환불 기간을 함께 확인하세요. 가격은 2026년 11월 16일 공식 페이지 기준입니다.'
              : 'Compare first-payment totals, renewal prices, device limits and refund windows, not just the monthly price. Prices checked on 16 Nov 2026.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/info/vpn-price-comparison-2026/" className="block bg-white rounded-xl border border-[#E0E0E0] hover:border-[#614abf] p-5">
              <p className="text-[15px] font-bold text-[#111111] mb-1">{lang === 'ko' ? 'VPN 가격 비교(2026.11)' : 'VPN price comparison (Nov 2026)'}</p>
              <p className="text-[12px] text-[#747878]">{lang === 'ko' ? '월 요금 vs 2년 총액·갱신가 표' : 'Monthly price vs two-year total and renewal'}</p>
            </a>
            <a href="/info/paid-vpn-picking-criteria-2026/" className="block bg-white rounded-xl border border-[#E0E0E0] hover:border-[#614abf] p-5">
              <p className="text-[15px] font-bold text-[#111111] mb-1">{lang === 'ko' ? '유료 VPN 추천 기준 5가지' : '5 criteria for choosing a paid VPN'}</p>
              <p className="text-[12px] text-[#747878]">{lang === 'ko' ? '갱신가·기기 수·환불·부가 기능·약관' : 'Renewal, devices, refund, extras, terms'}</p>
            </a>
            <a href="/info/free-vs-paid-vpn/" className="block bg-white rounded-xl border border-[#E0E0E0] hover:border-[#614abf] p-5">
              <p className="text-[15px] font-bold text-[#111111] mb-1">{lang === 'ko' ? '무료 VPN vs 유료 VPN 차이' : 'Free vs paid VPN'}</p>
              <p className="text-[12px] text-[#747878]">{lang === 'ko' ? '돈 내야 할까? 항목별 비교표' : 'Is it worth paying? Item-by-item table'}</p>
            </a>
          </div>
        </section>

        {/* Editors Choice Section */}
        <EditorsChoiceSection
          vpnList={VPN_LIST}
          lang={lang}
          onOpenDeal={(item) => setSelectedDealVpn(item)}
          onOpenReview={(item) => setSelectedReviewVpn(item)}
        />

        {/* Educational Privacy & Security Section */}
        <EducationalSection lang={lang} />

        {/* FAQ Section */}
        <FaqSection faqList={FAQ_LIST} lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavClick={handleNavClick}
        onOpenDeals={() => setSelectedDealVpn(VPN_LIST[0])}
      />

      {/* Interactive Modals */}
      <ComparisonModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        vpnList={VPN_LIST}
        lang={lang}
        onOpenDeal={(item) => {
          setIsCompareOpen(false);
          setSelectedDealVpn(item);
        }}
      />

      <ReviewModal
        vpn={selectedReviewVpn}
        isOpen={!!selectedReviewVpn}
        onClose={() => setSelectedReviewVpn(null)}
        lang={lang}
        onOpenDeal={(item) => {
          setSelectedReviewVpn(null);
          setSelectedDealVpn(item);
        }}
      />

      <DealModal
        vpn={selectedDealVpn}
        isOpen={!!selectedDealVpn}
        onClose={() => setSelectedDealVpn(null)}
        lang={lang}
      />
    </div>
  );
}

export default App;
