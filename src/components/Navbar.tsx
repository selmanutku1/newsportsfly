import React, { useState, useEffect } from 'react';
import { SportsFlyLogo } from './SportsFlyLogo';
import { ActiveView } from '../types';
import {
  Menu,
  X,
  Zap,
  Award
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => onNavigateView('marketing')} className="cursor-pointer">
          <SportsFlyLogo size="md" lightMode={true} />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
          <button
            onClick={() => scrollToSection('features')}
            className="hover:text-blue-600 transition"
          >
            Özellikler
          </button>
          <button
            onClick={() => scrollToSection('sporpuan')}
            className="hover:text-amber-600 transition flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Sporpuan</span>
          </button>
          <button
            onClick={() => scrollToSection('digital-report')}
            className="hover:text-emerald-600 transition flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5 text-emerald-500" />
            <span>Dijital Karne</span>
          </button>
          <button
            onClick={() => scrollToSection('roi-calc')}
            className="hover:text-blue-600 transition"
          >
            Kulüp Tasarrufu
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="hover:text-blue-600 transition"
          >
            Fiyatlandırma
          </button>
          <button
            onClick={() => scrollToSection('faqs')}
            className="hover:text-blue-600 transition"
          >
            SSS
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="btn-nav-demo-modal"
            onClick={onOpenDemoModal}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wide shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            14 Gün Ücretsiz Başla
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            id="btn-open-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-slate-700">
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              Özellikler
            </button>
            <button
              onClick={() => scrollToSection('sporpuan')}
              className="text-left py-1.5 hover:text-amber-600 flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-current" />
              <span>Sporpuan Ödül Sistemi</span>
            </button>
            <button
              onClick={() => scrollToSection('digital-report')}
              className="text-left py-1.5 hover:text-emerald-600 flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-500" />
              <span>Dijital Sporcu Karnesi</span>
            </button>
            <button
              onClick={() => scrollToSection('roi-calc')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              Kulüp Tasarruf Hesaplayıcı
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              Fiyatlandırma
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="text-left py-1.5 hover:text-blue-600"
            >
              SSS
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md text-center"
            >
              14 Gün Ücretsiz Başla
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
