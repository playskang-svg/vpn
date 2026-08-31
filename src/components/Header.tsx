import React, { useState } from 'react';
import { Shield, User, Globe, Menu, X, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  onOpenCompare: () => void;
  onOpenDeals: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  activeNav,
  onNavClick,
  onOpenCompare,
  onOpenDeals,
  savedCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'best-vpns', labelKo: '최고의 VPN', labelEn: 'Best VPNs' },
    { id: 'reviews', labelKo: '리뷰', labelEn: 'Reviews' },
    { id: 'resources', labelKo: '리소스', labelEn: 'Resources' },
    { id: 'deals', labelKo: '특가 정보', labelEn: 'Deals' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-[#E0E0E0]/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 md:h-20 max-w-[1200px] mx-auto px-4 lg:px-10 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div 
          onClick={() => { onNavClick('best-vpns'); }}
          className="cursor-pointer select-none"
          id="brand-logo"
        >
          <Logo size="md" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  if (item.id === 'deals') {
                    onOpenDeals();
                  } else {
                    onNavClick(item.id);
                  }
                }}
                className={`font-['Inter'] text-[15px] transition-colors relative py-1 ${
                  isActive
                    ? 'text-[#614abf] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#614abf]'
                    : 'text-[#444748] font-semibold hover:text-[#111111]'
                }`}
              >
                {lang === 'ko' ? item.labelKo : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Actions Area */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            id="lang-toggle-btn"
            title="Language Switcher"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E0E0E0] text-xs font-semibold text-[#444748] hover:border-[#614abf] hover:text-[#614abf] transition-all bg-[#f9f9f9]"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ko' ? 'KO' : 'EN'}</span>
          </button>

          {/* Compare Now CTA Button */}
          <button 
            id="header-compare-btn"
            onClick={onOpenCompare}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-[#614abf] text-white rounded-lg font-['Inter'] text-[14px] font-bold hover:bg-[#4930a6] active:scale-95 transition-all shadow-sm shadow-[#614abf]/20"
          >
            <span>{lang === 'ko' ? '지금 비교하기' : 'Compare Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Profile / Saved Tooltip Menu */}
          <div className="relative">
            <button 
              id="header-user-btn"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-[#333333] transition-colors relative"
              aria-label="User profile & saved VPNs"
            >
              <User className="w-[18px] h-[18px]" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00C853] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {userDropdownOpen && (
              <div 
                id="user-dropdown-menu"
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#E0E0E0] p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex items-center gap-2 p-2 border-b border-[#E0E0E0] mb-2">
                  <Shield className="w-5 h-5 text-[#614abf]" />
                  <div>
                    <p className="text-xs font-bold text-[#111111]">{lang === 'ko' ? '보안 연구원 계정' : 'Security Tester'}</p>
                    <p className="text-[11px] text-[#747878]">{lang === 'ko' ? '검증된 리뷰어 모드' : 'Verified Tester Mode'}</p>
                  </div>
                </div>
                <div className="space-y-1 text-xs">
                  <button 
                    onClick={() => { onOpenCompare(); setUserDropdownOpen(false); }}
                    className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-[#f3f3f3] text-[#444748]"
                  >
                    <span className="flex items-center gap-2">
                      <Bookmark className="w-3.5 h-3.5 text-[#614abf]" />
                      {lang === 'ko' ? '저장한 VPN 비교 목록' : 'Saved VPN Comparisons'}
                    </span>
                    <span className="font-bold text-[#614abf]">{savedCount}</span>
                  </button>
                  <button 
                    onClick={() => { onOpenDeals(); setUserDropdownOpen(false); }}
                    className="w-full text-left flex items-center gap-2 p-2 rounded-lg hover:bg-[#f3f3f3] text-[#444748]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00C853]" />
                    {lang === 'ko' ? '인증된 쿠폰 & 특가' : 'Verified Coupons & Deals'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#111111] hover:bg-[#f3f3f3] rounded-lg"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E0E0E0] bg-white px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'deals') {
                  onOpenDeals();
                } else {
                  onNavClick(item.id);
                }
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-base font-semibold text-[#444748] hover:text-[#614abf]"
            >
              {lang === 'ko' ? item.labelKo : item.labelEn}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenCompare();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 bg-[#614abf] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2"
          >
            <span>{lang === 'ko' ? '지금 비교하기' : 'Compare Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
