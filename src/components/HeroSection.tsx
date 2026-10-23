import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Home,
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
  const [announcementIndex, setAnnouncementIndex] = useState<number>(0);

  const announcements = language === 'tr'
    ? [
        {
          text: 'Devamlılığı %42 Artıran Sporpuan & Ödül Kataloğu',
          targetId: 'sporpuan',
        },
        {
          text: 'Akıllı Ödeme Linkleri ile %98 Otomatik Aidat Tahsilatı',
          targetId: 'automation',
        },
        {
          text: '360° Gelişim Analizli Otomatik Dijital Sporcu Karnesi',
          targetId: 'digital-report',
        },
      ]
    : [
        {
          text: 'Sporpuan & Reward Catalog Boosting Attendance by 42%',
          targetId: 'sporpuan',
        },
        {
          text: '98% Automated Tuition Collection with Smart Payment Links',
          targetId: 'automation',
        },
        {
          text: 'Automated 360° Skill Radar Digital Athlete Report Cards',
          targetId: 'digital-report',
        },
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentAnnouncement = announcements[announcementIndex] || announcements[0];

  return (
    <section className="relative pt-24 pb-10 sm:pt-32 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-[#fafcfb] to-white">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-emerald-100/40 via-blue-100/30 to-lime-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Rotating Announcement Banner (3 Innovations) */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(currentAnnouncement.targetId);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-semibold shadow-md max-w-full overflow-hidden transition cursor-pointer"
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#bbf246] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#bbf246]" />
            </span>
            <span className="font-bold text-[#bbf246] flex-shrink-0">
              {language === 'tr' ? 'YENİ:' : 'NEW:'}
            </span>
            <div className="relative overflow-hidden h-4 sm:h-[18px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={announcementIndex}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="truncate block"
                >
                  {currentAnnouncement.text}
                </motion.span>
              </AnimatePresence>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition flex-shrink-0 hidden sm:inline-block" />
          </button>
        </div>

        {/* Hero Copywriting */}
        <div className="text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] sm:leading-[1.15] max-w-4xl mx-auto">
            <span className="inline-block">{t.heroTitle1}</span>{' '}
            <br className="hidden sm:inline" />
            <span className="text-blue-600 inline-block">
              {t.heroTitleHighlight} {t.heroTitle2}
            </span>
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

            {/* CENTER PHONE SHOWCASE */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-[340px] sm:max-w-[380px] mx-auto">
                
                {/* Phone Outer Chassis - Modern Minimalist Smartphone */}
                <div className="rounded-[44px] bg-slate-950 p-2 sm:p-2.5 shadow-2xl shadow-slate-950/30 border-2 border-slate-800/90 ring-1 ring-white/10 relative">
                  
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                    <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                      <span className="w-1 h-1 rounded-full bg-blue-500/80" />
                    </span>
                  </div>

                  {/* Phone Screen Container */}
                  <div className="rounded-[36px] overflow-hidden bg-slate-50 text-slate-900 relative border border-slate-200/50">
                    
                    {/* Top Header Banner */}
                    <div className="bg-slate-900 text-white pt-6 pb-3.5 px-4 sm:px-5 border-b border-slate-800">
                      <div className="flex items-center justify-between text-[11px] text-slate-300 mb-2">
                        <span className="font-semibold tracking-tight">09:41</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold text-emerald-400">● 5G</span>
                          <div className="w-4 h-2 rounded-xs border border-slate-400 p-0.5 flex items-center">
                            <div className="h-full w-full bg-emerald-400 rounded-2xs" />
                          </div>
                        </div>
                      </div>

                      {/* Club & Team Banner */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                            SF
                          </div>
                          <div>
                            <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                              {language === 'tr' ? 'SportsFly Akademi' : 'SportsFly Academy'}
                            </div>
                            <div className="text-sm sm:text-base font-black text-white tracking-tight flex items-center gap-1.5">
                              <span>{activeLeaderTeam}</span>
                            </div>
                          </div>
                        </div>

                        {/* Notification Bell Badge */}
                        <div className="relative w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                          <Bell className="w-4 h-4 text-slate-200" />
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                            2
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Notification Alert Cards inside Phone */}
                    <div className="px-3.5 pt-3 space-y-2">
                      
                      {/* Alert 1: Attendance */}
                      <div className="p-2.5 sm:p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs hover:border-blue-300 transition">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center flex-shrink-0 font-bold">
                            <UserCheck className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              {t.heroPhoneImportant}
                            </div>
                            <div className="font-extrabold text-slate-900 text-xs truncate">{t.heroPhoneUnloggedActivities}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      </div>

                      {/* Alert 2: Tuition */}
                      <div className="p-2.5 sm:p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between text-xs hover:border-blue-300 transition">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center flex-shrink-0 font-bold">
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[9px] text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                              {t.heroPhoneFee}
                            </div>
                            <div className="font-extrabold text-slate-900 text-xs truncate">{t.heroPhoneMissingSchedule}</div>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      </div>

                    </div>

                    {/* Upcoming Activities Calendar Timeline */}
                    <div className="px-3.5 py-3 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          <span>{t.heroPhoneUpcoming}</span>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                          {language === 'tr' ? 'Haftalık Program' : 'Weekly Plan'}
                        </span>
                      </div>

                      {/* Event 1 */}
                      <div className="flex items-start gap-2.5">
                        <div className="text-center w-11 flex-shrink-0 pt-0.5 bg-white rounded-xl border border-slate-200/80 py-1.5 shadow-2xs">
                          <div className="text-[8px] font-extrabold text-blue-600 uppercase">{t.heroPhoneMon.slice(0, 3)}</div>
                          <div className="text-base font-black text-slate-900 leading-tight">6</div>
                          <div className="text-[8px] text-slate-400 font-bold uppercase">{t.heroPhoneAug.slice(0, 3)}</div>
                        </div>

                        <div className="flex-1 p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <div className="font-bold text-slate-900 text-xs">{t.heroPhoneTraining}</div>
                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                              {t.heroPhoneInProgress}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>17:00 - 18:30</span>
                            <span>•</span>
                            <span>{t.heroPhoneMainHall}</span>
                          </div>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[9px] flex items-center gap-1">
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                              {t.heroPhoneAttending}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[9px]">
                              ⚡ +20 SP
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event 2 */}
                      <div className="flex items-start gap-2.5">
                        <div className="text-center w-11 flex-shrink-0 pt-0.5 bg-white rounded-xl border border-slate-200/80 py-1.5 shadow-2xs">
                          <div className="text-[8px] font-extrabold text-blue-600 uppercase">{t.heroPhoneWed.slice(0, 3)}</div>
                          <div className="text-base font-black text-slate-900 leading-tight">8</div>
                          <div className="text-[8px] text-slate-400 font-bold uppercase">{t.heroPhoneAug.slice(0, 3)}</div>
                        </div>

                        <div className="flex-1 p-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-1.5">
                          <div className="font-bold text-slate-900 text-xs">{t.heroPhoneTraining}</div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>17:00 - 18:30 • {t.heroPhoneMainHall}</span>
                          </div>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[9px]">
                              {t.heroPhoneAttending}
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[9px]">
                              🛡️ {activeLeaderTeam}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Event 3 */}
                      <div className="flex items-start gap-2.5">
                        <div className="text-center w-11 flex-shrink-0 pt-0.5 bg-white rounded-xl border border-slate-200/80 py-1.5 shadow-2xs">
                          <div className="text-[8px] font-extrabold text-indigo-600 uppercase">{t.heroPhoneThu.slice(0, 3)}</div>
                          <div className="text-base font-black text-slate-900 leading-tight">11</div>
                          <div className="text-[8px] text-slate-400 font-bold uppercase">{t.heroPhoneAug.slice(0, 3)}</div>
                        </div>

                        <div className="flex-1 p-2.5 bg-gradient-to-br from-white to-blue-50/50 rounded-xl border border-blue-200/80 shadow-2xs space-y-1.5">
                          <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                            <span>{t.heroPhoneAwayMatchTitle}</span>
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>14:00 • {t.heroPhoneAwayPitch}</span>
                          </div>
                          
                          <div className="p-1.5 bg-blue-100/60 rounded-lg text-[9px] text-blue-900 flex items-center gap-1 font-medium">
                            <Car className="w-3 h-3 text-blue-700 flex-shrink-0" />
                            <span className="truncate">{t.heroPhoneAwayMatchRequest}</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Navigation Tab Bar on Phone */}
                    <div className="bg-white border-t border-slate-200/90 py-2 px-3 flex items-center justify-around text-slate-500 text-[9px]">
                      <div className="flex flex-col items-center gap-0.5 text-blue-600 font-bold cursor-pointer">
                        <Home className="w-4 h-4" />
                        <span>{t.heroPhoneHome}</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 relative text-slate-500 cursor-pointer">
                        <Calendar className="w-4 h-4" />
                        <span>{t.heroPhoneEvents}</span>
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] flex items-center justify-center font-bold">
                          2
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 text-slate-500 cursor-pointer">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span>{t.heroPhoneInbox}</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 text-slate-500 cursor-pointer">
                        <CreditCard className="w-4 h-4" />
                        <span>{t.heroPhoneTeamFund}</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 text-slate-500 cursor-pointer">
                        <Users className="w-4 h-4" />
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
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <div className="text-xs min-w-0">
                <span className="font-bold block text-slate-900 truncate">{t.heroNotifReminderTitle}</span>
                <span className="text-slate-500 line-clamp-1">{t.heroNotifReminderDesc}</span>
              </div>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="text-xs min-w-0">
                <span className="font-bold block text-slate-900 truncate">{t.heroNotifDuesPaidTitle}</span>
                <span className="text-slate-500 line-clamp-1">{t.heroNotifDuesPaidDesc}</span>
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
