import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Flame,
  Gift,
  Hand,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Play,
  Send,
  ShieldCheck,
  Trophy,
  UserCheck,
  Users,
  Wallet,
  Zap,
  AlertCircle,
  Bell,
  Clock,
  Car,
  UserPlus
} from 'lucide-react';

interface HeroSectionProps {
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemoModal,
}) => {
  const { language, t } = useLanguage();
  const [activeLeaderTeam, setActiveLeaderTeam] = useState<string>('U14 BASKETBOL');
  const [activeScreenTab, setActiveScreenTab] = useState<'leader' | 'parent' | 'report'>('leader');

  return (
    <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#fafcfb] to-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-100/40 via-blue-100/30 to-lime-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] sm:text-xs font-semibold shadow-md max-w-full">
            <span className="flex h-2 w-2 rounded-full bg-[#bbf246] animate-ping flex-shrink-0" />
            <span className="font-bold text-[#bbf246] flex-shrink-0">{language === 'tr' ? 'YENİ:' : 'NEW:'}</span>
            <span className="truncate">{language === 'tr' ? 'Devamlılığı Artıran Sporpuan & Otomatik Tahsilat' : 'Boost Retention with Sporpuan & Auto-Billing'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 hidden sm:inline-block" />
          </div>
        </div>

        {/* Hero Copywriting */}
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-950 tracking-tight leading-[1.12] sm:leading-[1.08]">
            {t.heroTitle1} <br />
            <span className="text-blue-600">
              {t.heroTitleHighlight}
            </span>{' '}
            {t.heroTitle2}
          </h1>

          <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed px-2">
            {t.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 w-full max-w-md sm:max-w-none mx-auto">
            <button
              id="btn-hero-start-trial"
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 rounded-2xl bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-lime-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>{t.heroCtaReserve}</span>
              <ChevronRight className="w-4 h-4 stroke-[3]" />
            </button>

            <button
              id="btn-hero-explore-features"
              onClick={() => {
                const el = document.getElementById('automation');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs sm:text-sm border border-slate-200 shadow-sm flex items-center justify-center gap-2.5 transition hover:border-slate-300"
            >
              <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>{language === 'tr' ? 'Nasıl Çalışır?' : 'How It Works'}</span>
            </button>
          </div>

          {/* Micro trust points */}
          <div className="pt-2 sm:pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'tr' ? 'Kredi kartı gerekmez' : 'No credit card required'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'tr' ? "3 dakikada Excel'den aktarım" : 'Import from Excel in 3 mins'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'tr' ? '%100 Mobil uyumlu web app' : '100% Mobile responsive'}
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SHOWCASE WITH CENTERED PHONE & 8 FLOATING NOTIFICATIONS (Image 1) */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-16 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
            
            {/* LEFT FLOATING NOTIFICATION PILLS (4 items) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
              
              {/* 1. Hatırlatma gönderildi */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center flex-shrink-0 text-purple-600">
                  <Send className="w-5 h-5 -rotate-12" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifReminderTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifReminderDesc}</div>
                </div>
              </div>

              {/* 2. 14 kişiden 12'si kayıt oldu */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-emerald-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifRegisteredTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifRegisteredDesc}</div>
                </div>
              </div>

              {/* 3. Antrenman güncellemesi */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 text-amber-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifRestTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifRestDesc}</div>
                </div>
              </div>

              {/* 4. Takım fonu */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-700">
                  <Wallet className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifFundTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifFundDesc}</div>
                </div>
              </div>

            </div>

            {/* CENTER PHONE SHOWCASE (matching Image 1) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[375px] sm:max-w-[400px]">
                
                {/* Phone Outer Chassis - Sleek Minimalist Mockup */}
                <div className="rounded-[40px] bg-slate-900 p-2 sm:p-2.5 shadow-2xl shadow-slate-900/25 border border-slate-800 ring-1 ring-white/10 relative">
                  
                  {/* Minimal Dynamic Island / Camera */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
                  </div>

                  {/* Phone Screen Container */}
                  <div className="rounded-[32px] overflow-hidden bg-slate-100 text-slate-900 relative">
                    
                    {/* Top Navy Header Banner */}
                    <div className="bg-[#102a43] text-white pt-7 pb-4 px-4 sm:px-5">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1.5">
                        <span>09:41</span>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                          <span className="text-[10px] font-mono">5G</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {activeLeaderTeam}
                        </div>
                      </div>
                    </div>

                    {/* Notification Alert Cards inside Phone */}
                    <div className="px-4 -mt-2 space-y-2">
                      
                      {/* Alert 1 */}
                      <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                            ✕
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">{t.heroPhoneImportant}</div>
                            <div className="font-extrabold text-slate-900">{t.heroPhoneUnloggedActivities}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>

                      {/* Alert 2 */}
                      <div className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                            <Bell className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400 font-bold uppercase">{t.heroPhoneFee}</div>
                            <div className="font-extrabold text-slate-900">{t.heroPhoneMissingSchedule}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>

                    </div>

                    {/* Upcoming Activities Calendar Timeline */}
                    <div className="px-4 py-4 space-y-3">
                      <div className="text-sm font-extrabold text-slate-900 tracking-tight">
                        {t.heroPhoneUpcoming}
                      </div>

                      {/* Event 1 */}
                      <div className="flex items-start gap-3">
                        <div className="text-center w-14 flex-shrink-0 pt-1">
                          <div className="text-[9px] font-bold text-blue-600 uppercase">{t.heroPhoneMon}</div>
                          <div className="text-xl font-black text-slate-900 leading-none">6</div>
                          <div className="text-[9px] text-slate-400 font-medium">{t.heroPhoneAug}</div>
                        </div>

                        <div className="flex-1 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="font-extrabold text-slate-900 text-xs">{t.heroPhoneTraining}</div>
                            <span className="text-[10px] font-bold text-blue-600 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              {t.heroPhoneInProgress}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <span>17:00 - 18:30</span>
                            <span>|</span>
                            <span>{t.heroPhoneMainHall}</span>
                          </div>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                              {t.heroPhoneAttending}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                              🛡️ {activeLeaderTeam}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event 2 */}
                      <div className="flex items-start gap-3">
                        <div className="text-center w-14 flex-shrink-0 pt-1">
                          <div className="text-[9px] font-bold text-blue-600 uppercase">{t.heroPhoneWed}</div>
                          <div className="text-xl font-black text-slate-900 leading-none">8</div>
                          <div className="text-[9px] text-slate-400 font-medium">{t.heroPhoneAug}</div>
                        </div>

                        <div className="flex-1 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                          <div className="font-extrabold text-slate-900 text-xs">{t.heroPhoneTraining}</div>
                          <div className="text-[11px] text-slate-500">
                            17:00 - 18:30 | {t.heroPhoneMainHall}
                          </div>
                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                              {t.heroPhoneAttending}
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                              🛡️ {activeLeaderTeam}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event 3 */}
                      <div className="flex items-start gap-3">
                        <div className="text-center w-14 flex-shrink-0 pt-1">
                          <div className="text-[9px] font-bold text-blue-600 uppercase">{t.heroPhoneThu}</div>
                          <div className="text-xl font-black text-slate-900 leading-none">9</div>
                          <div className="text-[9px] text-slate-400 font-medium">{t.heroPhoneAug}</div>
                        </div>

                        <div className="flex-1 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-2">
                          <div className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                            <span>{t.heroPhoneAwayMatchTitle}</span>
                          </div>
                          <div className="text-[11px] text-slate-500">
                            17:00 - 18:30 | {t.heroPhoneAwayPitch}
                          </div>
                          
                          <div className="p-2 bg-slate-50 rounded-xl text-[10px] text-slate-700 flex items-center gap-1.5 border border-slate-200/60">
                            <span>✋</span>
                            <span className="italic">{t.heroPhoneAwayMatchRequest}</span>
                          </div>

                          <div className="flex items-center gap-1.5 pt-1">
                            <span className="px-2 py-0.5 rounded-md bg-blue-900 text-white font-bold text-[10px]">
                              Emir
                            </span>
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold">
                              🛡️ {activeLeaderTeam}
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Navigation Tab Bar on Phone */}
                    <div className="bg-white border-t border-slate-200 py-2.5 px-4 flex items-center justify-around text-slate-500 text-[10px]">
                      <div className="flex flex-col items-center gap-0.5 text-blue-600 font-bold">
                        <span className="text-sm">🏠</span>
                        <span>{t.heroPhoneHome}</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 relative">
                        <span className="text-sm">🗓️</span>
                        <span>{t.heroPhoneEvents}</span>
                        <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] flex items-center justify-center font-bold">
                          8
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm">✉️</span>
                        <span>{t.heroPhoneInbox}</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm">🐖</span>
                        <span>{t.heroPhoneTeamFund}</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-sm">☰</span>
                        <span>{t.heroPhoneMore}</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT FLOATING NOTIFICATION PILLS (4 items) */}
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
              
              {/* 5. Araç paylaşımı */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-emerald-600">
                  <Car className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifCarpoolTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifCarpoolDesc}</div>
                </div>
              </div>

              {/* 6. Katılım onayı */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center flex-shrink-0 text-teal-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifAcceptedTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifAcceptedDesc}</div>
                </div>
              </div>

              {/* 7. Yeni eğitim */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center flex-shrink-0 text-pink-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifTrainingTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifTrainingDesc}</div>
                </div>
              </div>

              {/* 8. Üyelik ücreti ödendi */}
              <div className="p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-md shadow-slate-200/50 flex items-start gap-3 transform hover:-translate-y-1 transition duration-200">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0 text-blue-600">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{t.heroNotifDuesPaidTitle}</div>
                  <div className="text-slate-500 leading-snug mt-0.5">{t.heroNotifDuesPaidDesc}</div>
                </div>
              </div>

            </div>

          </div>

          {/* Mobile responsive floating cards list (visible only on small screens) */}
          <div className="lg:hidden mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
              <span className="text-lg">🟣</span>
              <div className="text-xs">
                <span className="font-bold block text-slate-900">{t.heroNotifReminderTitle}</span>
                <span className="text-slate-500">{t.heroNotifReminderDesc}</span>
              </div>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-slate-200 flex items-center gap-3">
              <span className="text-lg">💳</span>
              <div className="text-xs">
                <span className="font-bold block text-slate-900">{t.heroNotifDuesPaidTitle}</span>
                <span className="text-slate-500">{t.heroNotifDuesPaidDesc}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Live Metrics Proof Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-slate-950">140+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.heroStatClubs}
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-blue-600">%94.6</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'tr' ? 'Ortalama Antrenman Devamlılığı' : 'Average Workout Attendance'}
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-[#84cc16]">1.8 M+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {language === 'tr' ? 'Kazanılan Sporpuan' : 'Earned Sporpuan'}
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">%98.8</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t.heroStatCollection}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
