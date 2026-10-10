import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, Layers, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
  onOpenComparison?: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onSelectPlan,
  onOpenComparison,
}) => {
  const { language, t } = useLanguage();
  const [annualBilling, setAnnualBilling] = useState<boolean>(false);

  const englishPlans = [
    {
      id: 'starter',
      name: 'Starter Club',
      desc: 'Ideal for single-branch, growing boutique sports academies and studios.',
      monthlyPrice: 2199,
      annualPrice: 1759,
      badge: null,
      popular: false,
      features: [
        'Up to 100 Active Athletes',
        'Mobile-Optimized Fast Roll Call',
        'Core Parent Notifications (SMS & Email)',
        'Standard Sporpuan Loyalty Integration',
        '2 Coach & 1 Administrator Account',
        'Email Technical Support',
      ],
      cta: 'Start 14-Day Free Trial',
    },
    {
      id: 'growth',
      name: 'Club & Academy',
      desc: 'For clubs looking to incentivize attendance, professionalize parent communication, and run multi-branch operations.',
      monthlyPrice: 3699,
      annualPrice: 2959,
      badge: 'Most Popular',
      popular: true,
      features: [
        'Up to 350 Active Athletes',
        'Automated Attendance & WhatsApp Alerts',
        'Digital Athlete Report Cards (Up to 100 Athletes)',
        'Customizable Sporpuan Gamification & Reward Store',
        'Automated Tuition Tracking & Dues Reminders',
        'Up to 10 Coach & Admin Accounts',
        'Priority Phone & WhatsApp Support',
      ],
      cta: 'Start Free Trial',
    },
    {
      id: 'elite',
      name: 'Elite & Multi-Branch',
      desc: 'High-volume federations, nationwide sports schools, and multi-franchise academies.',
      monthlyPrice: 0,
      annualPrice: 0,
      customPriceLabel: 'Enterprise Quote',
      badge: 'Enterprise',
      popular: false,
      features: [
        'Unlimited Athletes & Locations',
        'Custom Branded Website & Domain (White-Label)',
        'Direct Virtual POS & Credit Card Payment Gateway',
        'Custom Branded Mobile App for iOS & Android',
        'Dedicated Account Manager & Training',
        'Full Accounting & E-Invoice Integration',
        '99.9% Uptime SLA & 24/7 Dedicated Support',
      ],
      cta: 'Contact Sales',
    },
  ];

  const plans = language === 'tr' ? PRICING_PLANS : englishPlans;

  return (
    <section
      id="pricing"
      className="py-12 sm:py-16 md:py-24 bg-white border-t border-slate-200 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-12 md:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-3.5 sm:gap-5">
          <div>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/90 uppercase tracking-wider shadow-2xs">
              {t.pricingBadge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {t.pricingTitle} <br />
            <span className="text-blue-600">{t.pricingTitleHighlight}</span>
          </h2>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed max-w-2xl px-1">
            {t.pricingDesc}
          </p>

          {/* Responsive Billing Frequency Toggle */}
          <div className="w-full max-w-xs sm:max-w-none sm:w-auto grid grid-cols-2 sm:inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold mt-2 sm:mt-3 shadow-xs">
            <button
              type="button"
              onClick={() => setAnnualBilling(false)}
              className={`min-h-[42px] px-3 sm:px-4 py-2 rounded-xl transition cursor-pointer ${
                !annualBilling
                  ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.pricingMonthly}
            </button>
            <button
              type="button"
              onClick={() => setAnnualBilling(true)}
              className={`min-h-[42px] px-3 sm:px-4 py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
                annualBilling
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="truncate">{t.pricingAnnual}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-black flex-shrink-0 ${
                  annualBilling
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {t.pricingDiscountBadge}
              </span>
            </button>
          </div>

          {/* Trial availability indicator */}
          <div className="text-xs font-semibold mt-0.5">
            {annualBilling ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200/80">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {language === 'tr'
                  ? '✨ Yıllık planda Ücretsiz Başla ve %20 indirim avantajı aktiftir'
                  : '✨ Free trial and 20% discount are active on annual plans'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                {language === 'tr'
                  ? 'Ücretsiz Başla modülü yalnızca Yıllık Planda geçerlidir'
                  : 'Free trial is available with annual billing'}
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch pt-2 sm:pt-0">
          {plans.map((plan) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.popular;
            const isEnterprise =
              plan.id === 'enterprise' ||
              plan.id === 'elite' ||
              plan.name.includes('Pro Akademi') ||
              plan.name.includes('Elite');

            const getCtaText = () => {
              if (isEnterprise) {
                return language === 'tr' ? 'Kurumsal Görüşme' : 'Contact Sales';
              }
              if (annualBilling) {
                return language === 'tr' ? 'Ücretsiz Başla' : 'Start Free Trial';
              }
              return language === 'tr' ? 'Hemen Başla' : 'Get Started';
            };

            return (
              <div
                key={plan.id}
                className={`p-5 sm:p-7 lg:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-white border-2 border-blue-600 shadow-xl sm:shadow-2xl shadow-blue-500/10 lg:-translate-y-2 ring-4 ring-blue-500/5 mt-2 sm:mt-0'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg shadow-xs'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-blue-600 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider shadow-md whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed sm:min-h-[36px]">
                      {plan.desc}
                    </p>
                  </div>

                  {/* Price display */}
                  {isEnterprise ? (
                    <div className="flex flex-col justify-center min-h-[44px] sm:min-h-[52px]">
                      <div className="text-2xl sm:text-3xl lg:text-[32px] font-black text-slate-950 tracking-tight leading-none">
                        {language === 'tr' ? 'Kurumsal Teklif' : 'Enterprise Quote'}
                      </div>
                      <span className="text-slate-500 text-[11px] sm:text-xs font-semibold mt-1">
                        {language === 'tr'
                          ? 'Kulübünüze Özel Kapsam & Fiyatlandırma'
                          : 'Tailored Scope & Custom Pricing'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1.5 tabular-nums min-h-[44px] sm:min-h-[52px] items-center">
                      <span className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
                        {price?.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}
                      </span>
                      <span className="text-slate-500 text-xs sm:text-sm font-semibold">
                        {language === 'tr' ? '₺ / ay' : '₺ / mo'}
                      </span>
                    </div>
                  )}

                  {/* Features list */}
                  <div className="space-y-2.5 sm:space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.pricingIncludedFeatures}
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug"
                      >
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 sm:pt-8">
                  <button
                    type="button"
                    id={`btn-pricing-select-${plan.id}`}
                    onClick={() => {
                      const link = annualBilling 
                        ? (plan as any).annualPaymentLink 
                        : (plan as any).monthlyPaymentLink;
                      
                      if (link) {
                        window.open(link, '_blank');
                      } else {
                        onSelectPlan(plan.name);
                      }
                    }}
                    className={`w-full min-h-[46px] py-3.5 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-wider transition cursor-pointer active:scale-[0.99] ${
                      isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                    }`}
                  >
                    {getCtaText()}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Package & Module Comparison Matrix Callout */}
        {onOpenComparison && (
          <div className="pt-1 sm:pt-2">
            <div className="rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-200/90 p-5 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-5">
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 flex-shrink-0 shadow-2xs">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-lg font-extrabold text-slate-950 tracking-tight">
                    {language === 'tr'
                      ? 'Paket Yetki & Modül Karşılaştırma Matrisi'
                      : 'Package Capability & Module Comparison Matrix'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {language === 'tr'
                      ? '3 paketin sistem genelindeki modül erişimlerini, sporcu kotalarını, sanal POS, karne ve teknik yetkilerini tabloda satır satır karşılaştırın.'
                      : 'Compare module permissions, athlete quotas, virtual POS, digital report cards, and technical capabilities side by side across all 3 plans.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenComparison}
                className="w-full md:w-auto min-h-[46px] px-5 sm:px-6 py-3 rounded-xl sm:rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm transition cursor-pointer flex-shrink-0 active:scale-95"
              >
                <span>
                  {language === 'tr'
                    ? 'Detaylı Paket Karşılaştırmasını İncele'
                    : 'View Detailed Plan Comparison'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
