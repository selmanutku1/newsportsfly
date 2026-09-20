import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SportsFlyLogo } from './SportsFlyLogo';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Zap,
  Award,
  FileSpreadsheet,
  Layers,
  CreditCard,
  Calculator,
  HelpCircle,
  Shield,
  UserCheck,
  Heart,
  PhoneCall,
  Sparkles,
  BookOpen,
  Lock,
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
  const [closedLoginNotice, setClosedLoginNotice] = useState<{ isOpen: boolean; roleName?: string } | null>(null);

  const platformRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  // Close mobile menu if window width scales up to >= 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close desktop dropdowns on click outside
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

  const navLinks = [
    {
      id: 'automation',
      title: t.navAutomation,
      subtitle: t.navAutomationDesc,
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-200/60',
    },
    {
      id: 'features',
      title: t.navWhySportsFly,
      subtitle: language === 'tr' ? '4 Temel Özgürleştirici Modül' : '4 Core Liberating Modules',
      icon: Layers,
      color: 'bg-blue-50 text-blue-600 border-blue-200/60',
    },
    {
      id: 'sporpuan',
      title: t.navSporpuan,
      subtitle: t.navSporpuanDesc,
      icon: Award,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200/60',
    },
    {
      id: 'digital-report',
      title: t.navDigitalReport,
      subtitle: t.navDigitalReportDesc,
      icon: FileSpreadsheet,
      color: 'bg-purple-50 text-purple-600 border-purple-200/60',
    },
    {
      id: 'pricing',
      title: t.navPricing,
      subtitle: language === 'tr' ? 'Şeffaf Paketler & Yıllık Avantaj' : 'Transparent Pricing & Yearly Perks',
      icon: CreditCard,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200/60',
    },
    {
      id: 'roi-calc',
      title: t.navRoi,
      subtitle: t.navRoiDesc,
      icon: Calculator,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200/60',
    },
    {
      id: 'faqs',
      title: t.navFaq,
      subtitle: t.navFaqDesc,
      icon: HelpCircle,
      color: 'bg-slate-100 text-slate-700 border-slate-200/60',
    },
    {
      id: 'blog',
      title: language === 'tr' ? 'Akademi Blogu & Rehberler' : 'Academy Blog & Guides',
      subtitle: language === 'tr' ? 'Finans, sporpuan ve kulüp yönetimi makaleleri' : 'Insights on finance, gamification and club growth',
      icon: BookOpen,
      color: 'bg-amber-50 text-amber-700 border-amber-200/60',
      isView: true,
    },
  ];

  return (
    <>
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
        {/* Floating Capsule Bar */}
        <div className="pointer-events-auto w-full max-w-6xl bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-lg shadow-slate-200/40 px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between transition-all">
          
          {/* Brand Logo - Responsive scaling */}
          <div 
            onClick={() => onNavigateView('marketing')} 
            className="cursor-pointer flex-shrink-0 pr-1 sm:pr-2 flex items-center"
          >
            <SportsFlyLogo
              size="sm"
              iconClassName="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10"
              textClassName="text-lg sm:text-xl md:text-2xl font-black"
              lightMode={true}
            />
          </div>

          {/* Desktop Navigation Links (Visible on >= 768px / md) */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-5 xl:gap-7 text-xs lg:text-[13px] font-medium text-slate-700">
            
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
                <div className="absolute top-full left-0 mt-2.5 w-60 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 z-50 text-xs animate-in fade-in duration-150">
                  <button
                    onClick={() => scrollToSection('automation')}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col transition"
                  >
                    <span>{t.navAutomation}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{t.navAutomationDesc}</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('sporpuan')}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col transition"
                  >
                    <span>{t.navSporpuan}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{t.navSporpuanDesc}</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('digital-report')}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col transition"
                  >
                    <span>{t.navDigitalReport}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{t.navDigitalReportDesc}</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col transition"
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
                <div className="absolute top-full left-0 mt-2.5 w-56 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 z-50 text-xs animate-in fade-in duration-150">
                  <button
                    onClick={() => scrollToSection('faqs')}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col transition"
                  >
                    <span>{t.navFaq}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{t.navFaqDesc}</span>
                  </button>
                  <button
                    onClick={() => scrollToSection('roi-calc')}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-slate-800 font-semibold flex flex-col transition"
                  >
                    <span>{t.navRoi}</span>
                    <span className="text-[11px] text-slate-400 font-normal">{t.navRoiDesc}</span>
                  </button>
                  <button
                    onClick={() => {
                      setResourcesDropdownOpen(false);
                      onNavigateView('blog');
                    }}
                    className="w-full text-left px-3.5 py-2 rounded-xl hover:bg-slate-50 text-blue-700 font-bold flex flex-col transition border-t border-slate-100 mt-1 pt-2"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      {language === 'tr' ? 'Akademi Blogu & Rehberler' : 'Academy Blog & Guides'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-normal pl-5">
                      {language === 'tr' ? 'Özellikler, makaleler ve ipuçları' : 'Features, articles and insights'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-slate-950 transition py-1 text-slate-800 font-medium text-xs bg-slate-50 hover:bg-slate-100 px-2.5 rounded-full border border-slate-200/70"
              >
                <span>{language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {langDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-xl border border-slate-200/90 shadow-lg p-1 z-50 text-xs animate-in fade-in duration-150">
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

          {/* Desktop Action Buttons (Visible on >= 768px / md) */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5">
            {/* Demo reservation Button */}
            <button
              id="btn-nav-demo-reserve"
              onClick={onOpenDemoModal}
              className="px-3.5 lg:px-5 py-2 rounded-full bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-bold text-xs tracking-tight shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t.navDemoReserve}
            </button>

            {/* Login Dropdown Button */}
            <div className="relative" ref={loginRef}>
              <button
                id="btn-nav-login"
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                className="px-3 lg:px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-2xs hover:border-slate-300 transition flex items-center gap-1.5"
              >
                <span>{t.navLogin}</span>
                <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${loginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {loginDropdownOpen && (
                <div className="absolute top-full right-0 mt-2.5 w-60 bg-white rounded-2xl border border-slate-200/90 shadow-xl p-2 z-50 text-xs animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {language === 'tr' ? 'Portallar' : 'Portals'}
                    </span>
                    <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{language === 'tr' ? 'Girişler Kapalı' : 'Logins Closed'}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      setClosedLoginNotice({
                        isOpen: true,
                        roleName: t.navLoginAdmin,
                      });
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-semibold flex items-center justify-between transition group"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-800">{t.navLoginAdmin}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{t.navLoginAdminDesc}</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{language === 'tr' ? 'Kapalı' : 'Closed'}</span>
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      setClosedLoginNotice({
                        isOpen: true,
                        roleName: t.navLoginCoach,
                      });
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-semibold flex items-center justify-between transition group"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-800">{t.navLoginCoach}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{t.navLoginCoachDesc}</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{language === 'tr' ? 'Kapalı' : 'Closed'}</span>
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setLoginDropdownOpen(false);
                      setClosedLoginNotice({
                        isOpen: true,
                        roleName: t.navLoginParent,
                      });
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-slate-950 font-semibold flex items-center justify-between transition group"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-slate-800">{t.navLoginParent}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-normal">{t.navLoginParentDesc}</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{language === 'tr' ? 'Kapalı' : 'Closed'}</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions: Language + Demo + Menu Trigger (Triggered when window width < 768px) */}
          <div className="md:hidden flex items-center gap-1.5 sm:gap-2">
            {/* Quick Language Toggle on Mobile Bar */}
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="px-2 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] border border-slate-200 active:scale-95 transition"
              title={language === 'tr' ? 'Switch to English' : "Türkçe'ye Geç"}
            >
              {language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
            </button>

            {/* Quick Demo CTA */}
            <button
              onClick={onOpenDemoModal}
              className="px-3 py-1.5 rounded-full bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-black text-xs shadow-xs active:scale-95 transition"
            >
              Demo
            </button>
            
            {/* Slide-in Mobile Menu Trigger Button */}
            <button
              id="btn-open-mobile-menu"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center active:scale-95 transition shadow-xs"
              aria-label={language === 'tr' ? 'Menüyü Aç' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-slate-800" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-In Mobile Navigation Menu (triggers on width < 768px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Dark Backdrop Overlay with Blur */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-auto"
              aria-hidden="true"
            />

            {/* Slide-In Drawer Panel from Right */}
            <motion.aside
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[400px] max-w-full bg-white shadow-2xl z-50 pointer-events-auto flex flex-col justify-between overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={language === 'tr' ? 'Mobil Gezinme Menüsü' : 'Mobile Navigation Menu'}
            >
              {/* Drawer Header: Scaled Logo & Accessible Close Button */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
                <div
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateView('marketing');
                  }}
                  className="cursor-pointer flex items-center"
                >
                  <SportsFlyLogo
                    size="sm"
                    iconClassName="w-8 h-8 sm:w-9 sm:h-9"
                    textClassName="text-xl sm:text-2xl font-black"
                    lightMode={true}
                  />
                </div>

                <button
                  id="btn-close-mobile-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 flex items-center justify-center active:scale-95 transition shadow-xs"
                  aria-label={language === 'tr' ? 'Menüyü Kapat' : 'Close Menu'}
                >
                  <X className="w-5 h-5 text-slate-800" />
                </button>
              </div>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                
                {/* Highlight Demo CTA Button */}
                <button
                  id="btn-mobile-demo-cta"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDemoModal();
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-black text-sm tracking-tight shadow-md flex items-center justify-between active:scale-[0.98] transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
                    <span>{t.navDemoReserve}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Primary Navigation Links with responsive touch-friendly sizing */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-2 mb-2">
                    {language === 'tr' ? 'Keşfet & Özellikler' : 'Explore & Modules'}
                  </span>

                  <div className="space-y-1">
                    {navLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <button
                          key={link.id}
                          onClick={() => {
                            if ((link as any).isView) {
                              setMobileMenuOpen(false);
                              onNavigateView('blog');
                            } else {
                              scrollToSection(link.id);
                            }
                          }}
                          className="w-full text-left min-h-[48px] py-2.5 px-3 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition flex items-center justify-between group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${link.color}`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                {link.title}
                              </span>
                              <span className="text-[11px] text-slate-500 line-clamp-1">
                                {link.subtitle}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Direct Role Login Portals */}
                <div className="pt-2">
                  <div className="flex items-center justify-between px-2 mb-2.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {language === 'tr' ? 'Kullanıcı Giriş Portalları' : 'User Portals'}
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/80 flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>{language === 'tr' ? 'Girişe Kapalı' : 'Logins Closed'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {/* Admin Portal */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setClosedLoginNotice({
                          isOpen: true,
                          roleName: t.navLoginAdmin,
                        });
                      }}
                      className="w-full min-h-[48px] p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 active:scale-[0.99] transition flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-200/80 text-slate-600 flex items-center justify-center flex-shrink-0">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{t.navLoginAdmin}</span>
                            <Lock className="w-3 h-3 text-slate-400" />
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {t.navLoginAdminDesc}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        {language === 'tr' ? 'Kapalı' : 'Closed'}
                      </span>
                    </button>

                    {/* Coach Portal */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setClosedLoginNotice({
                          isOpen: true,
                          roleName: t.navLoginCoach,
                        });
                      }}
                      className="w-full min-h-[48px] p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 active:scale-[0.99] transition flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-200/80 text-slate-600 flex items-center justify-center flex-shrink-0">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{t.navLoginCoach}</span>
                            <Lock className="w-3 h-3 text-slate-400" />
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {t.navLoginCoachDesc}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        {language === 'tr' ? 'Kapalı' : 'Closed'}
                      </span>
                    </button>

                    {/* Parent Portal */}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setClosedLoginNotice({
                          isOpen: true,
                          roleName: t.navLoginParent,
                        });
                      }}
                      className="w-full min-h-[48px] p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 active:scale-[0.99] transition flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-200/80 text-slate-600 flex items-center justify-center flex-shrink-0">
                          <Heart className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{t.navLoginParent}</span>
                            <Lock className="w-3 h-3 text-slate-400" />
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {t.navLoginParentDesc}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                        {language === 'tr' ? 'Kapalı' : 'Closed'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* 24/7 Human Live Support Badge */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-slate-50 border border-blue-100/70 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {language === 'tr' ? '7/24 Canlı İnsan Desteği' : '24/7 Live Human Support'}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {language === 'tr' ? 'Robotik yanıt yok, doğrudan uzman ekip' : 'Zero chatbots, direct human experts'}
                      </p>
                    </div>
                  </div>
                  <PhoneCall className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              {/* Drawer Bottom Bar: Language Switcher */}
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/80 flex-shrink-0 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">
                  {language === 'tr' ? 'Dil / Language' : 'Language / Dil'}
                </span>
                <div className="flex items-center bg-slate-200/80 p-1 rounded-xl">
                  <button
                    onClick={() => setLanguage('tr')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      language === 'tr'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🇹🇷 TR
                  </button>
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      language === 'en'
                        ? 'bg-white text-blue-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🇬🇧 EN
                  </button>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Closed Login Notice Modal */}
      {closedLoginNotice && closedLoginNotice.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setClosedLoginNotice(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center border border-amber-200/80">
                <Lock className="w-6 h-6 text-amber-700" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-2">
                  <span>{language === 'tr' ? 'Sistem Bildirimi' : 'System Notice'}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-950">
                  {language === 'tr'
                    ? 'Portallara Giriş Geçici Olarak Kapalıdır'
                    : 'Portal Logins Are Currently Closed'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {language === 'tr'
                    ? `${closedLoginNotice.roleName ? `"${closedLoginNotice.roleName}"` : 'Kullanıcı girişleri'} ve ilgili panellere erişim şu anda genel kullanıma kapalıdır. Kurumunuza özel erişim sağlamak veya canlı sistemi incelemek için lütfen ücretsiz demo talebinde bulunun.`
                    : `Access to ${closedLoginNotice.roleName ? `"${closedLoginNotice.roleName}"` : 'user portals'} is currently closed. To explore the platform or obtain access for your sports club, please request a free live demo.`}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => {
                    setClosedLoginNotice(null);
                    onOpenDemoModal();
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition shadow-sm flex items-center justify-center gap-2"
                >
                  <span>{language === 'tr' ? 'Ücretsiz Demo Talep Et' : 'Request Free Demo'}</span>
                  <Sparkles className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setClosedLoginNotice(null)}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition"
                >
                  {language === 'tr' ? 'Kapat' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


