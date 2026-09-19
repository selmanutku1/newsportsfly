import React from 'react';
import {
  Check,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  ShieldCheck,
  MessageSquare,
  Phone,
  Mail,
  Headphones,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const HumanSupportSection: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Phone Showcase matching Image 3 with Lime accent */}
          <div className="lg:col-span-6 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
              
              {/* Outer Phone Mockup Frame */}
              <div className="rounded-[40px] bg-slate-900 p-3.5 shadow-2xl shadow-slate-400/30 border-4 border-slate-800 relative">
                
                {/* Dynamic Island / Speaker Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-30" />

                {/* Inner Screen */}
                <div className="rounded-[30px] overflow-hidden bg-white text-slate-900 relative">
                  
                  {/* Status Bar */}
                  <div className="bg-[#bbf246] px-6 pt-3 pb-1 flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" />
                    </div>
                  </div>

                  {/* Header: Faaliyetlerim Banner */}
                  <div className="bg-[#bbf246] px-6 pt-1 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                      {t.supportPhoneHeader}
                    </h3>
                  </div>

                  {/* Floating Notification Bar on top */}
                  <div className="mx-4 -mt-2 mb-3 p-3 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                      <Trophy className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">{t.supportPhoneNotifTitle}</div>
                      <div className="text-slate-500 text-[11px]">{t.supportPhoneNotifDesc}</div>
                    </div>
                  </div>

                  {/* Schedule Activities List */}
                  <div className="px-4 pb-6 space-y-3">
                    
                    {/* Activity 1: BUGÜN */}
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.supportToday}
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm shadow-2xs">
                            ⚽
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{t.supportTraining}</div>
                            <div className="text-[11px] text-slate-500">{t.supportTrainingDesc}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {t.supportConfirmed}
                        </span>
                      </div>
                    </div>

                    {/* Activity 2: YARIN */}
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.supportTomorrow}
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm shadow-2xs">
                            🏆
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{t.supportMatch}</div>
                            <div className="text-[11px] text-slate-500">{t.supportMatchDesc}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
                          {t.supportPending}
                        </span>
                      </div>
                    </div>

                    {/* Activity 3: PERŞEMBE */}
                    <div>
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">
                        {t.supportThursday}
                      </div>
                      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm shadow-2xs">
                            📋
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{t.supportMeeting}</div>
                            <div className="text-[11px] text-slate-500">{t.supportMeetingDesc}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {t.supportConfirmed}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Notification Toast matching Image 3 */}
                  <div className="m-3 p-3 bg-white rounded-2xl border border-emerald-200 shadow-md flex items-center gap-2.5 text-xs">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <span className="font-bold text-slate-900 block">{t.supportAttendanceConfirmed}</span>
                      <span className="text-[11px] text-slate-500">{t.supportAttendanceConfirmedDesc}</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Copywriting & Value Propositions matching Image 3 */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200/80">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>{t.supportBadge}</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
              {t.supportTitle} <br />
              <span className="text-slate-900">{t.supportTitleHighlight}</span>
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {t.supportDesc}
            </p>

            {/* 3 Checkmark bullets */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#bbf246] flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-950">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  {t.supportBullet1}
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#bbf246] flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-950">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  {t.supportBullet2}
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-[#bbf246] flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-950">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="text-sm sm:text-base font-semibold text-slate-900">
                  {t.supportBullet3}
                </div>
              </div>
            </div>

            {/* Support contact snippet */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                0216 850 1907
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                destek@sportsfly.com.tr
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
