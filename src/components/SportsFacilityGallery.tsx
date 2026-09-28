import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Calendar,
  Award,
  CreditCard,
  Zap,
  Activity,
  UserCheck,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const SportsFacilityGallery: React.FC = () => {
  const { language } = useLanguage();
  const isTr = language === 'tr';
  const [activeFacility, setActiveFacility] = useState<number>(0);

  const facilities = [
    {
      id: 'swimming',
      title: isTr ? 'Olimpik Yüzme Kompleksi' : 'Olympic Swimming Complex',
      branch: isTr ? 'Yüzme & Su Sporları' : 'Swimming & Aquatics',
      icon: '🏊‍♂️',
      bgPhoto: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1600&q=80',
      badgeColor: 'bg-cyan-500/90 border-cyan-300/40 text-white',
      badgeText: isTr ? 'Süreç & Derece Takibi' : 'Timing & Lap Tracking',
      tagline: isTr
        ? 'Serbest, kelebek ve sırtüstü stillerinde derece takibi ve baraj baraj milli takım seçme yönetimi.'
        : 'Track lap times, stroke benchmarks, and national trial qualification standards effortlessly.',
      panelData: {
        groupName: isTr ? 'Performans & İleri Seviye Yüzme' : 'High Performance Swimming',
        category: isTr ? 'Yarışmacı Takım • Olimpik Kulvar' : 'Competitive Swim Squad',
        coach: 'Berke Kaan Durdu',
        coachRole: isTr ? 'TYF 3. Kademe Kıdemli Yüzme Antrenörü' : 'Senior National Swim Coach',
        schedule: isTr ? 'Pazartesi, Çarşamba, Cumartesi (08:00 - 09:30)' : 'Mon, Wed, Sat (08:00 - 09:30)',
        occupancy: '4/8 (%50 Doluluk)',
        fee: '₺4.200 / ay',
        sessions: [
          { name: isTr ? 'Gençler Yüzme Milli Takım Seçmeleri' : 'Junior National Swim Trials', time: 'Per - 15:00', icon: Activity },
          { name: isTr ? 'Yetişkin Yüzme Kondisyon Seansı' : 'Adult Swim Conditioning', time: 'Cum - 09:30', icon: Clock },
        ],
        metrics: [
          { label: isTr ? 'Derece İlerlemesi' : 'Lap Time Gain', val: '-1.42 sn' },
          { label: isTr ? 'Devam Oranı' : 'Attendance', val: '%96' },
        ]
      }
    },
    {
      id: 'football',
      title: isTr ? 'Nizami Futbol Sahası & Akademi' : 'Professional Football Pitch & Academy',
      branch: isTr ? 'Futbol & Altyapı' : 'Football (Soccer) Academy',
      icon: '⚽',
      bgPhoto: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80',
      badgeColor: 'bg-emerald-600/90 border-emerald-400/40 text-white',
      badgeText: isTr ? 'Otomatik Yoklama & Kadro' : 'Auto Attendance & Roster',
      tagline: isTr
        ? 'Saha kenarından tek tıkla QR/mobil yoklama alma, veliye anında WhatsApp ve Sporpuan bildirimi.'
        : 'One-tap sideline attendance with automatic WhatsApp alerts and Sporpuan gamification.',
      panelData: {
        groupName: isTr ? 'Ayazağa Futbol Akademi' : 'Ayazaga Football Academy',
        category: isTr ? 'Spor Okulu • Çim Saha' : 'Grass Pitch Academy',
        coach: 'Ali Özcan',
        coachRole: isTr ? 'UEFA B Lisanslı Başantrenör' : 'UEFA B Head Coach',
        schedule: isTr ? 'Salı, Perşembe, Cumartesi (16:00 - 17:30)' : 'Tue, Thu, Sat (16:00 - 17:30)',
        occupancy: '5/16 (%31 Doluluk)',
        fee: '₺2.800 / ay',
        sessions: [
          { name: isTr ? 'Futbol Altyapı Fiziksel Hazırlık' : 'Youth Soccer Physical Prep', time: 'Salı - 16:30', icon: Flame },
          { name: isTr ? 'Özel Kaleci Dersi Paketi' : 'Goalkeeper Specialist Drill', time: 'Cmt - 11:00', icon: ShieldCheck },
        ],
        metrics: [
          { label: isTr ? 'Sporpuan Dağıtımı' : 'Sporpuan Awarded', val: '+150 SP' },
          { label: isTr ? 'Kadro Bütünlüğü' : 'Active Roster', val: '25 Sporcu' },
        ]
      }
    },
    {
      id: 'basketball',
      title: isTr ? 'Kapalı Basketbol Arena' : 'Indoor Hardwood Basketball Arena',
      branch: isTr ? 'Basketbol & Altyapı' : 'Basketball & Youth League',
      icon: '🏀',
      bgPhoto: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=80',
      badgeColor: 'bg-amber-500/90 border-amber-300/40 text-white',
      badgeText: isTr ? 'Gelişim & Karne Ekosistemi' : 'Development & Report Cards',
      tagline: isTr
        ? 'TBF ligi altyapı hazırlık gruplarında 5 temel gelişim eksenli radar grafikler ve dijital karneler.'
        : 'Radar evaluation charts mapping shooting, passing, defense, conditioning, and discipline.',
      panelData: {
        groupName: isTr ? 'Anadolu Efes Altyapı Hazırlık' : 'Anadolu Efes Youth Prep',
        category: isTr ? 'Altyapı Takımı • TBF Ligi' : 'Youth League Division',
        coach: 'Berkan Saraç',
        coachRole: isTr ? 'TBF 2. Kademe Başantrenör' : 'TBF Certified Head Coach',
        schedule: isTr ? 'Pazartesi, Çarşamba, Cuma (17:30 - 19:00)' : 'Mon, Wed, Fri (17:30 - 19:00)',
        occupancy: '7/15 (%47 Doluluk)',
        fee: '₺3.500 / ay',
        sessions: [
          { name: isTr ? 'U14 Basketbol Taktik & Şut' : 'U14 Basketball Tactics & Shooting', time: 'Cum - 14:00', icon: Zap },
          { name: isTr ? 'Minikler Basketbol Okulu' : 'Juniors Basketball School', time: 'Cmt - 10:00', icon: Users },
        ],
        metrics: [
          { label: isTr ? 'Şut Yüzdesi' : 'Field Goal %', val: '%58.4' },
          { label: isTr ? 'Karne Puanı' : 'Report Grade', val: '88/100' },
        ]
      }
    },
    {
      id: 'multisport',
      title: isTr ? 'Voleybol & Tenis & Pilates Salonu' : 'Volleyball, Tennis & Multi-Sport Arena',
      branch: isTr ? 'Voleybol, Tenis & Pilates' : 'Volleyball, Tennis & Pilates',
      icon: '🏐',
      bgPhoto: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&w=1600&q=80',
      badgeColor: 'bg-indigo-600/90 border-indigo-400/40 text-white',
      badgeText: isTr ? 'Ön Muhasebe & Kasa Analitiği' : 'Accounting & Revenue Analytics',
      tagline: isTr
        ? 'Şube bazlı finansal büyüme trendleri, aylık aidat tahsilatı ve eğitmen hakediş ödeme takibi.'
        : 'Track multi-branch revenues, membership dues, rental incomes, and trainer payroll.',
      panelData: {
        groupName: isTr ? 'Yetişkin Tenis & Reformer Pilates' : 'Adult Tennis & Reformer Pilates',
        category: isTr ? 'Tesis & Salon Kirası • Özel Dersler' : 'Multi-Facility & Private Classes',
        coach: 'Deniz Aktaş & Zeynep Koç',
        coachRole: isTr ? 'TTF Tenis & Master Pilates Eğitmeni' : 'TTF Certified Tennis & Pilates Trainer',
        schedule: isTr ? 'Haftalık 34 Seans Antrenman Programı' : '34 Weekly Training Sessions',
        occupancy: '%91 Devam Oranı',
        fee: '₺185.000 / ay Tahsilat',
        sessions: [
          { name: isTr ? 'İleri Seviye Pilates Cadilac' : 'Advanced Cadillac Pilates', time: 'Per - 11:00', icon: Award },
          { name: isTr ? 'Yetişkin Tenis Turnuva Hazırlık' : 'Adult Tennis Tournament Prep', time: 'Cmt - 16:00', icon: TrendingUp },
        ],
        metrics: [
          { label: isTr ? 'Toplam Gelir' : 'Total Revenue', val: '₺21.250' },
          { label: isTr ? 'Finansal Büyüme' : 'Monthly Growth', val: '+%14.8' },
        ]
      }
    }
  ];

  const current = facilities[activeFacility];

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-emerald-600/10 to-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>{isTr ? 'GERÇEK TESİS VE YÖNETİM PANELLERİ' : 'REAL FACILITY & MANAGER PANELS'}</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {isTr ? 'Spor Tesisleri ve Akademiler İçin' : 'Engineered for Sports Facilities & Academies'} <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {isTr ? 'Özel Yönetim Yazılımı' : 'Tailored Management Technology'}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {isTr
              ? 'Yüzme havuzlarından nizami futbol sahalarına, indoor basketbol arena ve tenis kortlarına kadar bütün branşların dinamikleri tek merkezde.'
              : 'From Olympic swimming pools and regulation soccer pitches to hardwood basketball courts and tennis complexes.'}
          </p>
        </div>

        {/* Facility Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {facilities.map((fac, idx) => {
            const isActive = activeFacility === idx;
            return (
              <button
                key={fac.id}
                onClick={() => setActiveFacility(idx)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30 scale-[1.03]'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-base">{fac.icon}</span>
                <span>{fac.title}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Facility & Panel Showcase Display */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 transition-all duration-500">
          
          {/* Background Facility Photography */}
          <div className="absolute inset-0 z-0">
            <img
              src={current.bgPhoto}
              alt={current.title}
              className="w-full h-full object-cover object-center scale-[1.01] transition-all duration-700"
            />
            {/* Dark Overlays for High Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/60 to-transparent" />
          </div>

          {/* Main Grid Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px]">
            
            {/* Left Column: Facility Information & Headlines */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md border ${current.badgeColor}`}>
                  <span>{current.icon}</span>
                  <span>{current.badgeText}</span>
                </span>
                <span className="text-xs font-semibold text-slate-300 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/60">
                  {current.branch}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {current.title}
              </h3>

              <p className="text-xs sm:text-base text-slate-200 leading-relaxed max-w-lg">
                {current.tagline}
              </p>

              {/* Real Panel Metric Pills */}
              <div className="grid grid-cols-2 gap-3 pt-2 max-w-md">
                {current.panelData.metrics.map((m, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-left">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</div>
                    <div className="text-lg font-black text-emerald-400 mt-0.5">{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Realistic SportsFly UI Panel Card (Mirroring User Screenshots) */}
            <div className="lg:col-span-6">
              <div className="p-5 sm:p-7 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 shadow-2xl text-slate-100 space-y-4">
                
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold border border-blue-500/30 text-xs">
                      {current.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{current.panelData.groupName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{current.panelData.category}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {current.panelData.fee}
                  </span>
                </div>

                {/* Trainer & Schedule Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{isTr ? 'Eğitmen & Unvan' : 'Trainer'}</div>
                    <div className="font-bold text-white mt-0.5">{current.panelData.coach}</div>
                    <div className="text-[10px] text-slate-400 truncate">{current.panelData.coachRole}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{isTr ? 'Program & Doluluk' : 'Program & Capacity'}</div>
                    <div className="font-bold text-slate-200 mt-0.5">{current.panelData.occupancy}</div>
                    <div className="text-[10px] text-emerald-400 font-semibold">{current.panelData.schedule}</div>
                  </div>
                </div>

                {/* Live Training Sessions List */}
                <div className="space-y-2 pt-1">
                  <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    {isTr ? 'Haftalık Seanslar & Program:' : 'Weekly Sessions:'}
                  </div>
                  {current.panelData.sessions.map((s, idx) => {
                    const IconComp = s.icon;
                    return (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <IconComp className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                          <span className="font-semibold text-slate-200">{s.name}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                          {s.time}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Footer */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isTr ? 'SportsFly Tesis Senkronizasyonu Aktif' : 'SportsFly Facility Sync Active'}
                  </span>
                  <span className="font-bold text-slate-300">SportsFly Manager v2.6</span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
