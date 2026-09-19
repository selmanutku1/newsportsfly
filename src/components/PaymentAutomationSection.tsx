import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Bell,
  CreditCard,
  Send,
  ArrowRight,
  ShieldCheck,
  Check,
  Smartphone,
  MessageCircle,
  FileCheck
} from 'lucide-react';
import { SportsFlyLogo, SportsFlyIcon } from './SportsFlyLogo';
import { useLanguage } from '../context/LanguageContext';

export const PaymentAutomationSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [notifyDate, setNotifyDate] = useState(language === 'tr' ? '1 Eylül' : 'Sep 1');
  const [dueDate, setDueDate] = useState(language === 'tr' ? '30 Eylül' : 'Sep 30');

  return (
    <section id="automation" className="py-24 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Explanation & Payment Badges */}
          <div className="lg:col-span-5 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 bg-pink-50/90 px-3.5 py-1.5 rounded-full border border-pink-200/80 shadow-2xs">
              <SportsFlyIcon className="w-4 h-4 flex-shrink-0" />
              <span>{t.payBadge}</span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
              {t.payTitle} <br />
              <span className="text-blue-600">{t.payTitleHighlight}</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.payDesc}
            </p>

            {/* Payment Provider & Method Badges */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                {t.payMethodsLabel}
              </div>
              <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                {/* Mastercard */}
                <div className="h-9 px-3 bg-white rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 shadow-2xs">
                  <div className="flex -space-x-1.5">
                    <span className="w-4 h-4 rounded-full bg-red-500 opacity-90 inline-block" />
                    <span className="w-4 h-4 rounded-full bg-amber-400 opacity-90 inline-block" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 tracking-tight">mastercard</span>
                </div>

                {/* VISA */}
                <div className="h-9 px-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-2xs">
                  <span className="text-xs font-black italic text-blue-700 tracking-wider">VISA</span>
                </div>

                {/* TROY */}
                <div className="h-9 px-3 bg-white rounded-xl border border-slate-200 flex items-center justify-center gap-1 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block" />
                  <span className="text-xs font-black text-slate-800 tracking-wide">TROY</span>
                </div>

                {/* Havale / EFT */}
                <div className="h-9 px-3 bg-white rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 shadow-2xs">
                  <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                  <span className="text-[11px] font-bold text-slate-700">{language === 'tr' ? 'Havale / EFT' : 'Direct Bank / Wire'}</span>
                </div>

                {/* 256-bit SSL */}
                <div className="h-9 px-3 bg-white rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] font-bold text-slate-700">256-bit SSL</span>
                </div>
              </div>
            </div>

            {/* Additional Value Highlights */}
            <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-medium text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t.payZeroLoss}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{t.payAutoReceipt}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Interactive Flow Card */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#f2fbf7] via-[#f7fafc] to-[#f0f9ff] border border-emerald-100/90 shadow-xl shadow-slate-200/60">
              
              <div className="space-y-6">
                {/* Step 1 */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xs font-extrabold text-slate-900">
                    1
                  </div>
                  
                  <div>
                    <h4 className="text-base font-bold text-slate-950">
                      {t.payStep1Title}
                    </h4>
                    
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Date 1 */}
                      <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block">{t.payStep1NotifyDate}</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{language === 'tr' ? '1 Eylül' : 'September 1'}</span>
                        </div>
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>

                      {/* Date 2 */}
                      <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block">{t.payStep1DueDate}</span>
                          <span className="text-xs sm:text-sm font-bold text-slate-800">{language === 'tr' ? '30 Eylül' : 'September 30'}</span>
                        </div>
                        <Calendar className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xs font-extrabold text-slate-900">
                    2
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-950">
                      {t.payStep2Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {t.payStep2Desc}
                    </p>

                    <div className="mt-2.5">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
                        <Send className="w-3.5 h-3.5 text-blue-600" />
                        <span>{t.payStep2Sending}</span>
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xs font-extrabold text-slate-900">
                    3
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-950">
                      {t.payStep3Title}
                    </h4>

                    {/* Push Notification Bubble */}
                    <div className="mt-3 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-2 max-w-lg">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <div className="flex items-center gap-1.5 font-bold text-slate-700 uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          <span>{t.payStep3Org}</span>
                        </div>
                        <span className="text-[10px]">{t.payStep3Now}</span>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-xs sm:text-sm font-bold text-slate-900">
                          {t.payStep3NotifTitle}
                        </div>
                        <div className="text-xs text-slate-600">
                          {t.payStep3NotifDesc}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Bell className="w-3 h-3 text-amber-500" />
                        <span>{t.payStep3ReminderNote}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-xs font-extrabold text-slate-900">
                    4
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h4 className="text-base font-bold text-slate-950">
                        {t.payStep4Title}
                      </h4>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>{t.payStep4PaidBadge}</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {t.payStep4Desc}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
