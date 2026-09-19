import React, { useState, useEffect, useRef } from 'react';
import { SportsFlyLogo } from './SportsFlyLogo';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentView: ActiveView;
  onNavigateView: (view: ActiveView) => void;
  onOpenDemoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateView,
  onOpenDemoModal,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
  const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const platformRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (platformRef.current && !platformRef.current.contains(event.target as Node)) {
        setPlatformDropdownOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesDropdownOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setPlatformDropdownOpen(false);
    setResourcesDropdownOpen(false);
    if (currentView !== 'marketing') {
      onNavigateView('marketing');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      {/* Floating Capsule Bar */}
      <div className="pointer-events-auto w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-lg shadow-slate-200/40 px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-all">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigateView('marketing')} 
          className="cursor-pointer flex-shrink-0 pr-1 sm:pr-2 flex items-center"
        >
          <SportsFlyLogo size="sm" iconClassName="w-9 h-9 sm:w-10 sm:h-10" lightMode={true} />
        </div>

        {/* Desktop Navigation Links (No icons) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-medium text-slate-700">
          
          {/* Platform Dropdown */}
          <div className="relative" ref={platformRef}>
            <button
              onClick={() => {
                setPlatformDropdownOpen(!platformDropdownOpen);
                setResourcesDropdownOpen(false);
              }}
              className="flex items-center gap-1 hover:text-slate-950 transition py-1 text-slate-800 font-medium"
            >
              <span>{t.navPlatform}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${platformDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {platformDropdownOpen && (
              <div className="absolute top-full left-0 mt-2.5 w-60 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 z-50 text-xs">
                <button
                  onClick={() => scrollToSection('automation')}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navAutomation}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{t.navAutomationDesc}</span>
                </button>
                <button
                  onClick={() => scrollToSection('sporpuan')}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navSporpuan}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{t.navSporpuanDesc}</span>
                </button>
                <button
                  onClick={() => scrollToSection('digital-report')}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navDigitalReport}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{t.navDigitalReportDesc}</span>
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navAllModules}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{t.navAllModulesDesc}</span>
                </button>
              </div>
            )}
          </div>

          {/* Neden Sportsfly */}
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-slate-950 transition text-slate-800 font-medium"
          >
            {t.navWhySportsFly}
          </button>

          {/* Fiyatlar */}
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-slate-950 transition text-slate-800 font-medium"
          >
            {t.navPricing}
          </button>

          {/* Kaynaklar Dropdown */}
          <div className="relative" ref={resourcesRef}>
            <button
              onClick={() => {
                setResourcesDropdownOpen(!resourcesDropdownOpen);
                setPlatformDropdownOpen(false);
              }}
              className="flex items-center gap-1 hover:text-slate-950 transition py-1 text-slate-800 font-medium"
            >
              <span>{t.navResources}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${resourcesDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {resourcesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2.5 w-56 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 z-50 text-xs">
                <button
                  onClick={() => scrollToSection('faqs')}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navFaq}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{t.navFaqDesc}</span>
                </button>
                <button
                  onClick={() => scrollToSection('roi-calc')}
                  className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navRoi}</span>
                  <span className="text-[11px] text-slate-400 font-normal">{t.navRoiDesc}</span>
                </button>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 hover:text-slate-950 transition py-1 text-slate-800 font-medium text-xs bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/70"
            >
              <span>{language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {langDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl border border-slate-200/90 shadow-lg p-1 z-50 text-xs animate-in fade-in">
                <button
                  onClick={() => {
                    setLanguage('tr');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg font-medium flex items-center justify-between transition ${language === 'tr' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <span>🇹🇷 Türkçe</span>
                  {language === 'tr' && <span className="text-blue-600 font-bold">✓</span>}
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg font-medium flex items-center justify-between transition ${language === 'en' ? 'bg-blue-50 text-blue-700 font-bold' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <span>🇬🇧 English</span>
                  {language === 'en' && <span className="text-blue-600 font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Demo rezervasyonu yapın Button */}
          <button
            id="btn-nav-demo-reserve"
            onClick={onOpenDemoModal}
            className="px-5 py-2 rounded-full bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-bold text-xs tracking-tight shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {t.navDemoReserve}
          </button>

          {/* Giriş yapmak Dropdown Button */}
          <div className="relative" ref={loginRef}>
            <button
              id="btn-nav-login"
              onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
              className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition flex items-center gap-1.5"
            >
              <span>{t.navLogin}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {loginDropdownOpen && (
              <div className="absolute top-full right-0 mt-2.5 w-52 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 z-50 text-xs">
                <button
                  onClick={() => {
                    setLoginDropdownOpen(false);
                    onNavigateView('admin_panel');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navLoginAdmin}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{t.navLoginAdminDesc}</span>
                </button>
                <button
                  onClick={() => {
                    setLoginDropdownOpen(false);
                    onNavigateView('coach_panel');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navLoginCoach}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{t.navLoginCoachDesc}</span>
                </button>
                <button
                  onClick={() => {
                    setLoginDropdownOpen(false);
                    onNavigateView('parent_panel');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col"
                >
                  <span>{t.navLoginParent}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{t.navLoginParentDesc}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions: Language + Demo + Menu */}
        <div className="lg:hidden flex items-center gap-1.5 sm:gap-2">
          {/* Quick Language Toggle on Mobile */}
          <button
            onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
            className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] border border-slate-200"
            title="Dili Değiştir / Change Language"
          >
            {language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
          </button>

          <button
            onClick={onOpenDemoModal}
            className="px-3 sm:px-3.5 py-1.5 rounded-full bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-bold text-[11px] sm:text-xs"
          >
            Demo
          </button>
          
          <button
            id="btn-open-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-slate-100 text-slate-700 hover:text-slate-900 min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Menüyü Aç"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-2 bg-white rounded-3xl border border-slate-200 p-5 space-y-4 shadow-2xl animate-in fade-in duration-200 z-50 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 text-sm font-semibold text-slate-800">
            <button
              onClick={() => scrollToSection('automation')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{t.navAutomation}</span>
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{t.navWhySportsFly}</span>
            </button>
            <button
              onClick={() => scrollToSection('sporpuan')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{t.navSporpuan}</span>
            </button>
            <button
              onClick={() => scrollToSection('digital-report')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{t.navDigitalReport}</span>
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{t.navPricing}</span>
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-slate-50 flex items-center justify-between"
            >
              <span>{t.navFaq}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-3 rounded-full bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-bold text-xs shadow-sm text-center active:scale-95 transition"
            >
              {t.navDemoReserve}
            </button>

            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5 px-1">
                {t.navLogin}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('admin_panel');
                  }}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] text-center active:scale-95 transition"
                >
                  {language === 'tr' ? 'Yönetici' : 'Admin'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('coach_panel');
                  }}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] text-center active:scale-95 transition"
                >
                  {language === 'tr' ? 'Antrenör' : 'Coach'}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('parent_panel');
                  }}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] text-center active:scale-95 transition"
                >
                  {language === 'tr' ? 'Veli' : 'Parent'}
                </button>
              </div>
            </div>

            {/* Language switch on mobile drawer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">Dil / Language:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setLanguage('tr')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${language === 'tr' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  🇹🇷 TR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
                >
                  🇬🇧 EN
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

