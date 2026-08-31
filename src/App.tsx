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
      <main className="flex-1 pt-20">
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
              {filteredVpns.map((vpn) => (
                <VpnCard
                  key={vpn.id}
                  vpn={vpn}
                  lang={lang}
                  onOpenReview={(item) => setSelectedReviewVpn(item)}
                  onOpenDeal={(item) => setSelectedDealVpn(item)}
                  isSaved={savedVpnIds.includes(vpn.id)}
                  onToggleSave={handleToggleSave}
                />
              ))}
            </div>
          )}
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
