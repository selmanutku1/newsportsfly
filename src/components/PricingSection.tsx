import React, { useState } from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { Check, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const { language, t } = useLanguage();
  const [annualBilling, setAnnualBilling] = useState<boolean>(true);

  const englishPlans = [
    {
      id: 'starter',
      name: 'Starter Club',
      desc: 'Ideal for single-branch, growing boutique sports academies and studios.',
      monthlyPrice: 1490,
      annualPrice: 1190,
      badge: null,
      popular: false,
      features: [
        'Up to 100 Active Athletes',
        'Mobile-Optimized Fast Roll Call',
        'Core Parent Notifications (SMS & Email)',
        'Digital Athlete Report Card (2 Terms/Year)',
        'Standard Sporpuan Loyalty Integration',
        '2 Coach & 1 Administrator Account',
        'Email Technical Support'
      ],
      cta: 'Start 14-Day Free Trial'
    },
    {
      id: 'growth',
      name: 'Club & Academy',
      desc: 'For clubs looking to incentivize attendance, professionalize parent communication, and run multi-branch operations.',
      monthlyPrice: 2890,
      annualPrice: 2290,
      badge: 'Most Popular',
      popular: true,
      features: [
        'Up to 350 Active Athletes',
        'Automated Attendance & WhatsApp Alerts',
        'Unlimited Digital Report Cards & QR Verification',
        'Customizable Sporpuan Gamification & Reward Store',
        'Direct POS & Virtual Credit Card Collection',
        'Up to 10 Coach & Admin Accounts',
        'Priority Phone & WhatsApp Support'
      ],
      cta: 'Start 14-Day Free Trial'
    },
    {
      id: 'elite',
      name: 'Elite & Multi-Branch',
      desc: 'High-volume federations, nationwide sports schools, and multi-franchise academies.',
      monthlyPrice: 4990,
      annualPrice: 3990,
      badge: 'Enterprise',
      popular: false,
      features: [
        'Unlimited Athletes & Locations',
        'Dedicated Account Manager & Training',
        'Full Accounting & E-Invoice Integration',
        'Custom Branded Mobile Portal for Parents',
        'Custom Development & Data Migration',
        '99.9% Uptime Service Level Agreement (SLA)',
        '24/7 Dedicated Support Hotline'
      ],
      cta: 'Contact Sales'
    }
  ];

  const plans = language === 'tr' ? PRICING_PLANS : englishPlans;

  return (
    <section id="pricing" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            {t.pricingBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.pricingTitle} <br />
            <span className="text-blue-600">
              {t.pricingTitleHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.pricingDesc}
          </p>

          {/* Billing Frequency Toggle */}
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold mt-4 shadow-xs">
            <button
              onClick={() => setAnnualBilling(false)}
              className={`px-4 py-2 rounded-xl transition ${
                !annualBilling
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.pricingMonthly}
            </button>
            <button
              onClick={() => setAnnualBilling(true)}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                annualBilling
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>{t.pricingAnnual}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${annualBilling ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'}`}>
                {t.pricingDiscountBadge}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = annualBilling ? plan.annualPrice : plan.monthlyPrice;
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-white border-2 border-blue-600 shadow-2xl shadow-blue-500/10 lg:-translate-y-2 ring-4 ring-blue-500/5'
                    : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg shadow-sm'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[36px]">{plan.desc}</p>
                  </div>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black text-slate-950">
                      {price.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')}
                    </span>
                    <span className="text-slate-500 text-sm font-semibold">
                      {language === 'tr' ? '₺ / ay' : '₺ / mo'}
                    </span>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.pricingIncludedFeatures}
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    id={`btn-pricing-select-${plan.id}`}
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
                      isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
