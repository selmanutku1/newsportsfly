import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  X,
  ArrowRight,
  Layers,
  Headphones,
  CheckCircle2,
} from 'lucide-react';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SportsFlyLogo } from './SportsFlyLogo';
import { TrFlag, EnFlag } from './Navbar';
import { Footer } from './Footer';
import { setPageSeo } from '../utils/seoHelper';
import { triggerLiveSupportModal } from './LiveSupportModal';

interface PricingComparisonPageProps {
  onBackToSite: () => void;
  onSelectPlan: (planName: string) => void;
  onNavigateView: (view: ActiveView) => void;
  onOpenDemoModal: () => void;
}

type CellValue =
  | { type: 'check'; highlight?: 'emerald' | 'slate' }
  | { type: 'cross' }
  | { type: 'text'; tr: string; en: string; style?: 'muted' | 'bold' | 'emerald' };

interface MatrixRow {
  feature: {
    tr: string;
    en: string;
  };
  starter: CellValue;
  growth: CellValue;
  pro: CellValue;
}

interface MatrixSection {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  rows: MatrixRow[];
}

const COMPARISON_SECTIONS: MatrixSection[] = [
  {
    id: 'capacity',
    title: {
      tr: 'KAPASİTE, KADRO & ŞUBE',
      en: 'CAPACITY, STAFF & BRANCHES',
    },
    rows: [
      {
        feature: {
          tr: 'Aktif Sporcu Kapasitesi',
          en: 'Active Athlete Capacity',
        },
        starter: {
          type: 'text',
          tr: '100 Sporcuya Kadar',
          en: 'Up to 100 Athletes',
          style: 'bold',
        },
        growth: {
          type: 'text',
          tr: '350 Sporcuya Kadar',
          en: 'Up to 350 Athletes',
          style: 'bold',
        },
        pro: {
          type: 'text',
          tr: 'Sınırsız Sporcu',
          en: 'Unlimited Athletes',
          style: 'emerald',
        },
      },
      {
        feature: {
          tr: 'Antrenör & Yönetici Hesabı',
          en: 'Coach & Admin Accounts',
        },
        starter: {
          type: 'text',
          tr: '2 Antrenör + 1 Yönetici',
          en: '2 Coaches + 1 Admin',
          style: 'muted',
        },
        growth: {
          type: 'text',
          tr: 'Sınırsız Antrenör & Branş',
          en: 'Unlimited Coaches & Sports',
          style: 'bold',
        },
        pro: {
          type: 'text',
          tr: 'Sınırsız Antrenör & Yönetici',
          en: 'Unlimited Coaches & Admins',
          style: 'emerald',
        },
      },
      {
        feature: {
          tr: 'Şube & Tesis Sayısı',
          en: 'Branches & Facilities',
        },
        starter: {
          type: 'text',
          tr: 'Tek Şube (Butik)',
          en: 'Single Branch (Boutique)',
          style: 'muted',
        },
        growth: {
          type: 'text',
          tr: 'Tek Tesis / Tek Şube',
          en: 'Single Facility / Single Branch',
          style: 'muted',
        },
        pro: {
          type: 'text',
          tr: 'Sınırsız Şube & Tesis',
          en: 'Unlimited Branches & Facilities',
          style: 'emerald',
        },
      },
    ],
  },
  {
    id: 'attendance',
    title: {
      tr: 'YOKLAMA, KARNE & VELİ İLETİŞİMİ',
      en: 'ATTENDANCE, REPORT CARDS & PARENT PORTAL',
    },
    rows: [
      {
        feature: {
          tr: 'Mobil Uyumlu Hızlı Yoklama',
          en: 'Mobile-Optimized Fast Roll Call',
        },
        starter: { type: 'check', highlight: 'emerald' },
        growth: { type: 'check', highlight: 'emerald' },
        pro: { type: 'check', highlight: 'emerald' },
      },
      {
        feature: {
          tr: 'Dijital Sporcu Karnesi',
          en: 'Digital Athlete Report Card',
        },
        starter: {
          type: 'text',
          tr: 'Yılda 2 Dönem',
          en: '2 Terms / Year',
          style: 'muted',
        },
        growth: {
          type: 'text',
          tr: 'Sınırsız Dönem',
          en: 'Unlimited Terms',
          style: 'bold',
        },
        pro: {
          type: 'text',
          tr: 'Sınırsız + Özel Format',
          en: 'Unlimited + Custom Format',
          style: 'emerald',
        },
      },
      {
        feature: {
          tr: 'Velilere Otomatik WhatsApp Karnesi Gönderimi',
          en: 'Automated Report Card Delivery to Parents',
        },
        starter: { type: 'cross' },
        growth: { type: 'check', highlight: 'slate' },
        pro: { type: 'check', highlight: 'emerald' },
      },
      {
        feature: {
          tr: 'Performans Radar Grafikleri ve Gelişim Analitiği',
          en: 'Performance Radar Charts & Growth Analytics',
        },
        starter: { type: 'cross' },
        growth: { type: 'check', highlight: 'slate' },
        pro: { type: 'check', highlight: 'emerald' },
      },
      {
        feature: {
          tr: 'Branş Bazlı Eğitim Planlama & Taktik Müfredat Şablonları (Futbol / Basketbol / Voleybol)',
          en: 'Sport-Specific Training & Tactical Curriculum Templates (Football / Basketball / Volleyball)',
        },
        starter: { type: 'cross' },
        growth: { type: 'cross' },
        pro: { type: 'check', highlight: 'emerald' },
      },
    ],
  },
  {
    id: 'finance',
    title: {
      tr: 'AİDAT, POS & MUHASEBE',
      en: 'TUITION, VIRTUAL POS & ACCOUNTING',
    },
    rows: [
      {
        feature: {
          tr: 'Otomatik Aidat Takibi & Sanal POS Entegrasyonu',
          en: 'Automated Tuition Tracking & Virtual POS Integration',
        },
        starter: { type: 'cross' },
        growth: { type: 'check', highlight: 'slate' },
        pro: { type: 'check', highlight: 'emerald' },
      },
      {
        feature: {
          tr: 'Gelişmiş Finans, Kasa ve Muhasebe Entegrasyonu',
          en: 'Advanced Finance, Cash Desk & Accounting Integration',
        },
        starter: { type: 'cross' },
        growth: { type: 'cross' },
        pro: { type: 'check', highlight: 'emerald' },
      },
      {
        feature: {
          tr: 'Şube Özet & Karşılaştırmalı Finans Analitiği',
          en: 'Multi-Branch Summary & Comparative Financial Analytics',
        },
        starter: { type: 'cross' },
        growth: { type: 'cross' },
        pro: { type: 'check', highlight: 'emerald' },
      },
    ],
  },
  {
    id: 'sporpuan',
    title: {
      tr: 'SPORPUAN & KURUMSAL KİMLİK',
      en: 'SPORPUAN & CORPORATE IDENTITY',
    },
    rows: [
      {
        feature: {
          tr: 'Sporpuan Seviyesi',
          en: 'Sporpuan Gamification Tier',
        },
        starter: {
          type: 'text',
          tr: 'Standart Entegrasyon',
          en: 'Standard Integration',
          style: 'muted',
        },
        growth: {
          type: 'text',
          tr: 'Gelişmiş & Ödül Kataloğu',
          en: 'Advanced & Reward Catalog',
          style: 'bold',
        },
        pro: {
          type: 'text',
          tr: 'Kulübe Özel Ödül Havuzu & Sponsor',
          en: 'Custom Club Reward Pool & Sponsors',
          style: 'emerald',
        },
      },
      {
        feature: {
          tr: 'Özel Alan Adı ve Kulüp Mobil Uygulaması (White-Label)',
          en: 'Custom Domain & Branded Club Mobile App (White-Label)',
        },
        starter: { type: 'cross' },
        growth: { type: 'cross' },
        pro: { type: 'check', highlight: 'emerald' },
      },
      {
        feature: {
          tr: 'Teknik Destek & Eğitim',
          en: 'Technical Support & Onboarding',
        },
        starter: {
          type: 'text',
          tr: 'E-posta ile Teknik Destek',
          en: 'Email Technical Support',
          style: 'muted',
        },
        growth: {
          type: 'text',
          tr: '7/24 Canlı Destek & Kulüp Eğitimi',
          en: '24/7 Live Support & Club Training',
          style: 'bold',
        },
        pro: {
          type: 'text',
          tr: 'Özel Müşteri Başarı Yöneticisi + Yerinde Kurulum',
          en: 'Dedicated Success Manager + On-Site Setup',
          style: 'emerald',
        },
      },
    ],
  },
];

export const PricingComparisonPage: React.FC<PricingComparisonPageProps> = ({
  onBackToSite,
  onSelectPlan,
  onNavigateView,
  onOpenDemoModal,
}) => {
  const { language, setLanguage } = useLanguage();
  const isTr = language === 'tr';
  const [annualBilling, setAnnualBilling] = useState<boolean>(false);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all');
  const [mobileSelectedPlan, setMobileSelectedPlan] = useState<'all' | 'starter' | 'growth' | 'pro'>('all');

  useEffect(() => {
    setPageSeo({
      title: isTr
        ? 'Paket Yetki & Modül Karşılaştırma Matrisi | SportsFly'
        : 'Package Capability & Module Comparison Matrix | SportsFly',
      description: isTr
        ? 'SportsFly Başlangıç Kulübü, Kulüp & Akademi ve Pro Akademi & Çoklu Şube paketlerinin sistem genelindeki modül erişimleri, kotaları ve teknik yetkileri.'
        : 'Detailed module access, quotas, and technical capabilities across SportsFly Starter Club, Club & Academy, and Pro Multi-Branch plans.',
      canonicalUrl: 'https://www.sportsfly.com.tr/#paket-karsilastirma',
      keywords: [
        'spor okulu yazılım fiyatları',
        'spor akademisi paket karşılaştırma',
        'sportsfly paketler',
        'spor kulübü yönetim sistemi fiyat',
      ],
    });
  }, [isTr]);

  const starterPrice = annualBilling ? '1.759 ₺' : '2.199 ₺';
  const growthPrice = annualBilling ? '2.959 ₺' : '3.699 ₺';
  const proPrice = isTr ? 'Kurumsal Teklif' : 'Enterprise Quote';

  const visibleSections =
    selectedSectionId === 'all'
      ? COMPARISON_SECTIONS
      : COMPARISON_SECTIONS.filter((sec) => sec.id === selectedSectionId);

  const renderCellContent = (cell: CellValue) => {
    if (cell.type === 'check') {
      return (
        <span className="inline-flex items-center justify-center">
          <Check
            className={`w-4 h-4 stroke-[2.5] ${
              cell.highlight === 'slate' ? 'text-slate-700' : 'text-emerald-600'
            }`}
          />
        </span>
      );
    }
    if (cell.type === 'cross') {
      return (
        <span className="inline-flex items-center justify-center text-slate-300">
          <X className="w-4 h-4 stroke-[2]" />
        </span>
      );
    }

    const text = isTr ? cell.tr : cell.en;
    if (cell.style === 'emerald') {
      return <span className="font-bold text-emerald-600">{text}</span>;
    }
    if (cell.style === 'bold') {
      return <span className="font-bold text-slate-800">{text}</span>;
    }
    return <span className="font-normal text-slate-500">{text}</span>;
  };

  const planMeta = {
    starter: {
      name: isTr ? 'Başlangıç Kulübü' : 'Starter Club',
      shortName: isTr ? 'Başlangıç' : 'Starter',
      price: starterPrice,
      cta: isTr ? '14 Gün Ücretsiz Başla' : 'Start Free Trial',
      btnClass:
        'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200',
    },
    growth: {
      name: isTr ? 'Kulüp & Akademi' : 'Club & Academy',
      shortName: isTr ? 'Kulüp & Akademi' : 'Club & Academy',
      price: growthPrice,
      cta: isTr ? 'Hemen Deneyin' : 'Try Club & Academy',
      btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    },
    pro: {
      name: isTr ? 'Pro Akademi & Çoklu Şube' : 'Pro Academy & Multi-Branch',
      shortName: isTr ? 'Pro Akademi' : 'Pro Academy',
      price: proPrice,
      cta: isTr ? 'Kurumsal Görüşme' : 'Contact Enterprise',
      btnClass: 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs',
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Corporate Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onBackToSite}
              className="cursor-pointer hover:opacity-90 transition text-left flex-shrink-0"
              title="SportsFly Ana Sayfa"
            >
              <SportsFlyLogo size="md" lightMode={true} />
            </button>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-400 border-l border-slate-200 pl-4 truncate">
              {isTr
                ? 'Paket Yetki & Modül Karşılaştırması'
                : 'Plan & Module Comparison'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            {/* Language Switcher (Visible on both Mobile & Desktop) */}
            <div className="flex items-center bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200/80 text-[11px] sm:text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage('tr')}
                className={`px-2 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                  isTr ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <TrFlag className="w-3 h-2" />
                <span>TR</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer ${
                  !isTr ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <EnFlag className="w-3 h-2" />
                <span>EN</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="hidden xs:inline sm:inline">
                {isTr ? 'Ana Sayfa' : 'Home'}
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenDemoModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              <span>{isTr ? 'Ücretsiz Demo Planla' : 'Schedule Demo'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-8 py-6 sm:py-12 space-y-6 sm:space-y-8">
        {/* Top Hero & Billing Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
              <Layers className="w-3.5 h-3.5" />
              <span>
                {isTr
                  ? 'Kurumsal Paket & Modül Mimarisi'
                  : 'Enterprise Plan & Module Architecture'}
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-snug">
              {isTr
                ? 'Paket Yetki & Modül Karşılaştırma Matrisi'
                : 'Package Capability & Module Comparison Matrix'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {isTr
                ? '3 paketin sistem genelindeki modül erişimleri, kotaları ve teknik yetkileri detaylı olarak listelenmiştir.'
                : 'Detailed module access, athlete quotas, and technical permissions across all 3 SportsFly plans.'}
            </p>
          </div>

          {/* Responsive Billing Period Switcher */}
          <div className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`min-h-[40px] px-3.5 py-2 rounded-lg transition cursor-pointer ${
                !annualBilling
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isTr ? 'Aylık Plan' : 'Monthly'}
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`min-h-[40px] px-3.5 py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer ${
                annualBilling
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{isTr ? 'Yıllık Plan' : 'Annual'}</span>
              <span className="text-[10px] opacity-90">
                {isTr ? '(%20)' : '(-20%)'}
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {[
            { id: 'all', tr: 'Tüm Modüller (14)', en: 'All Modules (14)' },
            { id: 'capacity', tr: 'Kapasite & Şube', en: 'Capacity & Branches' },
            { id: 'attendance', tr: 'Yoklama, Karne & Veli', en: 'Attendance & Reports' },
            { id: 'finance', tr: 'Aidat, POS & Muhasebe', en: 'Tuition & Accounting' },
            { id: 'sporpuan', tr: 'Sporpuan & Kurumsal', en: 'Sporpuan & Branding' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedSectionId(tab.id)}
              className={`min-h-[38px] px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedSectionId === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {isTr ? tab.tr : tab.en}
            </button>
          ))}
        </div>

        {/* =================================================================== */}
        {/* 1. MOBILE RESPONSIVE MATRIX VIEW (< 768px / md:hidden)              */}
        {/* =================================================================== */}
        <div className="md:hidden space-y-5">
          {/* Mobile Plan Filter / Selector Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs space-y-2">
            <div className="text-[11px] font-bold text-slate-500 px-1">
              {isTr ? 'Mobil Görünüm Seçimi:' : 'Mobile View Mode:'}
            </div>
            <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={() => setMobileSelectedPlan('all')}
                className={`py-2 px-1.5 rounded-xl transition cursor-pointer truncate ${
                  mobileSelectedPlan === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600'
                }`}
              >
                {isTr ? '3 Paket' : 'All 3'}
              </button>
              <button
                type="button"
                onClick={() => setMobileSelectedPlan('starter')}
                className={`py-2 px-1.5 rounded-xl transition cursor-pointer truncate ${
                  mobileSelectedPlan === 'starter'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-600'
                }`}
              >
                {isTr ? 'Başlangıç' : 'Starter'}
              </button>
              <button
                type="button"
                onClick={() => setMobileSelectedPlan('growth')}
                className={`py-2 px-1.5 rounded-xl transition cursor-pointer truncate ${
                  mobileSelectedPlan === 'growth'
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-50/70 text-blue-700'
                }`}
              >
                {isTr ? 'Akademi' : 'Academy'}
              </button>
              <button
                type="button"
                onClick={() => setMobileSelectedPlan('pro')}
                className={`py-2 px-1.5 rounded-xl transition cursor-pointer truncate ${
                  mobileSelectedPlan === 'pro'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-50/70 text-emerald-700'
                }`}
              >
                {isTr ? 'Pro Şube' : 'Pro'}
              </button>
            </div>

            {/* Price Summary Strip on Mobile */}
            <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-slate-100 text-center tabular-nums">
              <div className="p-2 rounded-xl bg-slate-50">
                <div className="text-[10px] font-semibold text-slate-500 truncate">
                  {planMeta.starter.shortName}
                </div>
                <div className="text-xs font-extrabold text-slate-900 mt-0.5">
                  {starterPrice}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-200/70">
                <div className="text-[10px] font-bold text-blue-700 truncate">
                  {planMeta.growth.shortName}
                </div>
                <div className="text-xs font-extrabold text-blue-900 mt-0.5">
                  {growthPrice}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                <div className="text-[10px] font-bold text-emerald-700 truncate">
                  {planMeta.pro.shortName}
                </div>
                <div className="text-xs font-extrabold text-emerald-800 mt-0.5">
                  {proPrice}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Section & Feature Cards */}
          {visibleSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
            >
              <div className="bg-slate-100/80 border-b border-slate-200/80 px-4 py-3 text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                {isTr ? section.title.tr : section.title.en}
              </div>

              <div className="divide-y divide-slate-100">
                {section.rows.map((row, rIdx) => (
                  <div key={rIdx} className="p-4 space-y-3">
                    {/* Full-width Feature Title */}
                    <div className="text-xs font-bold text-slate-900 leading-snug">
                      {isTr ? row.feature.tr : row.feature.en}
                    </div>

                    {/* 3-Plan Side-by-Side Comparison or Single Selected Plan */}
                    {mobileSelectedPlan === 'all' ? (
                      <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-1.5">
                          <span className="text-[10px] font-semibold text-slate-400">
                            {planMeta.starter.shortName}
                          </span>
                          <div className="leading-tight">
                            {renderCellContent(row.starter)}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-blue-50/40 border border-blue-200/60 flex flex-col justify-between gap-1.5">
                          <span className="text-[10px] font-bold text-blue-700">
                            {planMeta.growth.shortName}
                          </span>
                          <div className="leading-tight">
                            {renderCellContent(row.growth)}
                          </div>
                        </div>

                        <div className="p-2.5 rounded-xl bg-emerald-50/30 border border-emerald-200/60 flex flex-col justify-between gap-1.5">
                          <span className="text-[10px] font-bold text-emerald-700">
                            {planMeta.pro.shortName}
                          </span>
                          <div className="leading-tight">
                            {renderCellContent(row.pro)}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-600">
                          {planMeta[mobileSelectedPlan].name} ({planMeta[mobileSelectedPlan].price}
                          {mobileSelectedPlan !== 'pro' ? ` / ${isTr ? 'ay' : 'mo'}` : ''})
                        </span>
                        <div>{renderCellContent(row[mobileSelectedPlan])}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Mobile Plan Action Cards */}
          <div className="grid grid-cols-1 gap-3 pt-1">
            {(['starter', 'growth', 'pro'] as const).map((planKey) => {
              const info = planMeta[planKey];
              return (
                <div
                  key={planKey}
                  className={`p-4 rounded-2xl bg-white border flex items-center justify-between gap-3 ${
                    planKey === 'growth'
                      ? 'border-blue-600 ring-2 ring-blue-500/10'
                      : 'border-slate-200'
                  }`}
                >
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">
                      {info.name}
                    </div>
                    <div className="text-sm font-black text-blue-600 mt-0.5">
                      {info.price}
                      {planKey !== 'pro' && (
                        <span className="text-[11px] font-normal text-slate-500 ml-1">
                          / {isTr ? 'ay' : 'mo'}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectPlan(info.name)}
                    className={`min-h-[42px] px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex-shrink-0 ${info.btnClass}`}
                  >
                    {info.cta}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. DESKTOP & TABLET 4-COLUMN MATRIX TABLE (>= 768px / hidden md:block) */}
        {/* =================================================================== */}
        <div className="hidden md:block bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-[#f8fafc] border-b border-slate-200/90 text-xs lg:text-[13px] font-bold text-slate-800">
                  <th className="py-4 px-6 w-[34%]">
                    {isTr ? 'Modül / Yetenek' : 'Module / Capability'}
                  </th>
                  <th className="py-4 px-4 w-[22%] text-center font-bold text-slate-800">
                    <div className="font-bold text-slate-900 tabular-nums">
                      {isTr ? `Başlangıç Kulübü (${starterPrice})` : `Starter Club (${starterPrice})`}
                    </div>
                  </th>
                  <th className="py-4 px-4 w-[22%] text-center bg-slate-100/70 font-bold text-slate-900">
                    <div className="font-extrabold text-slate-950 tabular-nums">
                      {isTr ? `Kulüp & Akademi (${growthPrice})` : `Club & Academy (${growthPrice})`}
                    </div>
                  </th>
                  <th className="py-4 px-4 w-[22%] text-center font-bold text-slate-800">
                    <div className="font-bold text-slate-900 tabular-nums">
                      {isTr
                        ? `Pro Akademi & Çoklu Şube (${proPrice})`
                        : `Pro Academy & Multi-Branch (${proPrice})`}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="text-xs lg:text-[13px] divide-y divide-slate-100">
                {visibleSections.map((section) => (
                  <React.Fragment key={section.id}>
                    {/* Category Group Header Row */}
                    <tr className="bg-[#f8fafc]/90 border-y border-slate-200/70">
                      <td
                        colSpan={4}
                        className="py-3 px-6 text-[11px] font-extrabold tracking-wider text-slate-500 uppercase"
                      >
                        {isTr ? section.title.tr : section.title.en}
                      </td>
                    </tr>

                    {/* Feature Rows */}
                    {section.rows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="hover:bg-slate-50/60 transition-colors"
                      >
                        <td className="py-4 px-6 font-bold text-slate-800 leading-snug">
                          {isTr ? row.feature.tr : row.feature.en}
                        </td>
                        <td className="py-4 px-4 text-center align-middle">
                          {renderCellContent(row.starter)}
                        </td>
                        <td className="py-4 px-4 text-center align-middle bg-slate-50/60">
                          {renderCellContent(row.growth)}
                        </td>
                        <td className="py-4 px-4 text-center align-middle">
                          {renderCellContent(row.pro)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {/* Bottom Plan Selection Row */}
                <tr className="bg-slate-50/70 border-t border-slate-200">
                  <td className="py-5 px-6">
                    <div className="font-bold text-slate-900 text-sm">
                      {isTr ? 'Paketinizi Seçin' : 'Choose Your Plan'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {isTr
                        ? '14 gün ücretsiz deneme, kredi kartı gerekmez'
                        : '14-day free trial, no credit card required'}
                    </div>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectPlan(isTr ? 'Başlangıç Kulübü' : 'Starter Club')
                      }
                      className="w-full max-w-[180px] py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs border border-slate-200 shadow-2xs transition cursor-pointer"
                    >
                      {isTr ? '14 Gün Ücretsiz Başla' : 'Start Free Trial'}
                    </button>
                  </td>
                  <td className="py-5 px-4 text-center bg-blue-50/40">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectPlan(isTr ? 'Kulüp & Akademi' : 'Club & Academy')
                      }
                      className="w-full max-w-[180px] py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
                    >
                      {isTr ? 'Hemen Deneyin' : 'Try Club & Academy'}
                    </button>
                  </td>
                  <td className="py-5 px-4 text-center">
                    <button
                      type="button"
                      onClick={() =>
                        onSelectPlan(
                          isTr ? 'Pro Akademi & Çoklu Şube' : 'Pro Academy & Multi-Branch'
                        )
                      }
                      className="w-full max-w-[180px] py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition cursor-pointer"
                    >
                      {isTr ? 'Kurumsal Görüşme' : 'Contact Enterprise'}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Advisory & Custom Enterprise Banner */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {isTr
                  ? 'Ücretsiz Veri Aktarımı & Kurulum Desteği'
                  : 'Free Data Migration & Onboarding'}
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-950 leading-snug">
              {isTr
                ? 'Hangi paketin akademinize uygun olduğundan emin değil misiniz?'
                : 'Not sure which plan fits your sports academy best?'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isTr
                ? 'Sporcu sayınıza, branş çeşitliliğinize ve şube yapınıza göre en doğru kurguyu uzman ekibimizle birlikte 10 dakikada belirleyelim.'
                : 'Let our specialists help you choose the ideal configuration based on your athlete count, branches, and facility structure.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto flex-shrink-0">
            <button
              type="button"
              onClick={triggerLiveSupportModal}
              className="min-h-[44px] px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Headphones className="w-4 h-4 text-blue-600" />
              <span>{isTr ? '7/24 Destek Ekibine Danışın' : 'Ask 24/7 Support Team'}</span>
            </button>

            <button
              type="button"
              onClick={onOpenDemoModal}
              className="min-h-[44px] px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
            >
              <span>{isTr ? 'Ücretsiz Canlı Demo Planla' : 'Schedule Free Live Demo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      <Footer
        onNavigateView={onNavigateView}
        onOpenDemoModal={onOpenDemoModal}
      />
    </div>
  );
};
