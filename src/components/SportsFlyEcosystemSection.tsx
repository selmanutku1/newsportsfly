import React, { useState } from 'react';
import {
  Users,
  BarChart3,
  Award,
  CreditCard,
  Database,
  Megaphone,
  BookOpen,
  Globe,
  ShoppingCart,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SportsFlyEcosystemSectionProps {
  onOpenDemoModal?: () => void;
}

export const SportsFlyEcosystemSection: React.FC<SportsFlyEcosystemSectionProps> = ({
  onOpenDemoModal
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const [activeModule, setActiveModule] = useState<string>('antrenor');

  // Inner Core Operational Modules
  const innerModules = [
    {
      id: 'antrenor',
      title: isTr ? 'Antrenör Yönetimi' : 'Coach & Staff Management',
      icon: Users,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      desc: isTr
        ? 'Saha kenarından antrenör atamaları, seans takvimleri, eğitmen hakedişleri ve anlık yoklama takibi.'
        : 'Sideline coach assignment, session scheduling, trainer payroll, and instant attendance.',
      features: [
        isTr ? 'Antrenör yoklama ve devamlılık puanlaması' : 'Coach attendance & session logging',
        isTr ? 'Eğitmen ders saati ve maaş/hakediş takibi' : 'Trainer hourly rate & payroll tracking',
        isTr ? 'UEFA/TBF lisanslı başantrenör yetkilendirmesi' : 'Certified head coach role permissions'
      ]
    },
    {
      id: 'raporlama',
      title: isTr ? 'Raporlama ve Analiz' : 'Reporting & Analytics',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      desc: isTr
        ? 'Sporcu gelişim karneleri, 5 eksenli radar grafikler, devam oranları ve finansal büyüme analitiği.'
        : '5-axis radar performance charts, report cards, attendance rates, and financial growth metrics.',
      features: [
        isTr ? 'Teknik, fiziksel ve zihinsel gelişim grafikleri' : 'Technical, physical & mental growth charts',
        isTr ? 'Dönem sonu onaylı dijital sporcu karneleri' : 'Term-end certified digital report cards',
        isTr ? 'Şube bazlı finansal gelir/gider grafikliği' : 'Branch-level revenue and expense trends'
      ]
    },
    {
      id: 'sadakat',
      title: isTr ? 'Sadakat Yönetimi' : 'Loyalty & Retention',
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
      desc: isTr
        ? 'Sporpuan oyunlaştırma altyapısı, kazanılan rozetler, seri çarpanları ve kulüp mağaza kataloğu.'
        : 'Sporpuan gamification engine, streak multipliers, digital badges, and reward store catalog.',
      features: [
        isTr ? 'Düzenli katılım sağlayan sporculara otomatik Sporpuan' : 'Auto Sporpuan awards for attendance streaks',
        isTr ? 'Kazanılan puanlarla forma ve ekipman değişimi' : 'Point redemption for official club gear',
        isTr ? 'Aidat ödemelerini %40 hızlandıran sadakat motivasyonu' : 'Proven driver of on-time membership payments'
      ]
    },
    {
      id: 'odeme',
      title: isTr ? 'Ödeme Yönetimi' : 'Payment & Dues Management',
      icon: CreditCard,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50 border-emerald-200',
      desc: isTr
        ? 'Aidat takipleri, sanal POS kredi kartı tahsilatları, otomatik gecikme hatırlatmaları ve e-makbuz.'
        : 'Dues collection, virtual POS credit card payments, automated overdue alerts, and receipts.',
      features: [
        isTr ? 'Tek tıkla veliye WhatsApp borç hatırlatması' : 'One-tap WhatsApp dues reminders to parents',
        isTr ? 'Kredi kartı taksitli veya düzenli aylık tahsilat' : 'Credit card installment & recurring billing',
        isTr ? 'Kasa ve banka bakiyesi anlık finans raporu' : 'Real-time vault & bank balance monitoring'
      ]
    },
    {
      id: 'veri',
      title: isTr ? 'Veri Yönetimi' : 'Data & Record Management',
      icon: Database,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50 border-cyan-200',
      desc: isTr
        ? 'Excel/CSV rehberinden 3 dakikada sporcu aktarımı, KVKK uyumlu veli ve sağlık bilgi bankası.'
        : '3-minute smart Excel/CSV wizard, GDPR/KVKK compliant parent & medical records database.',
      features: [
        isTr ? 'Sıfır veri kaybı ile eski yazılımlardan hızlı taşıma' : 'Zero data loss migration from legacy software',
        isTr ? 'Sağlık raporu, lisans ve KVKK evrak depolama' : 'Medical certificates & GDPR consent storage',
        isTr ? 'Çoklu şube ve antrenman tesisi senkronizasyonu' : 'Multi-branch & facility location sync'
      ]
    }
  ];

  // Outer Growth & Marketing Arcs
  const outerArcs = [
    {
      id: 'pazarlama',
      title: isTr ? 'Spor Pazarlaması' : 'Sports Marketing',
      icon: Megaphone,
      color: 'bg-[#0052cc] text-white',
      desc: isTr ? 'Kulübünüzün marka değerini artıran sosyal medya, dijital reklam ve franchise tanıtım çözümleri.' : 'Digital advertising, social media brand positioning, and franchise growth.'
    },
    {
      id: 'kutuphane',
      title: isTr ? 'Dijital Kütüphane' : 'Digital Library',
      icon: BookOpen,
      color: 'bg-[#ff2a85] text-white',
      desc: isTr ? 'Antrenman matrisleri, teknik driller, veli bilgilendirme rehberleri ve dijital medya arşivi.' : 'Training drill matrices, parent guidebooks, and digital video archives.'
    },
    {
      id: 'web',
      title: isTr ? 'Web Çözümleri' : 'Web Solutions',
      icon: Globe,
      color: 'bg-[#ff5c75] text-white',
      desc: isTr ? 'Kulübünüze özel mobil uyumlu veli ve başvuru portalları, SEO uyumlu web sitesi altyapısı.' : 'Custom branded parent portals, online registration wizard, and SEO web platform.'
    },
    {
      id: 'satis',
      title: isTr ? 'Sporda Satış' : 'Sports Sales',
      icon: ShoppingCart,
      color: 'bg-[#00a2ff] text-white',
      desc: isTr ? 'Kulüp mağazası, ürün ve forma satışları, yaz kampı ve turnuva kayıt gelir yönetimi.' : 'Club merchandise store, jersey sales, summer camp & tournament registrations.'
    },
    {
      id: 'iletisim',
      title: isTr ? 'Spor İletişimi' : 'Sports Communication',
      icon: MessageSquare,
      color: 'bg-[#0066ff] text-white',
      desc: isTr ? 'Otomatik WhatsApp bildirimleri, toplu SMS duyuruları ve veli-antrenör direkt mesajlaşma.' : 'Automated WhatsApp alerts, bulk SMS broadcasts, and parent-coach messaging.'
    }
  ];

  const currentModule = innerModules.find((m) => m.id === activeModule) || innerModules[0];

  return (
    <section className="py-12 sm:py-20 md:py-28 bg-gradient-to-b from-white via-slate-50/80 to-white relative overflow-hidden border-t border-slate-200">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-100/50 via-purple-100/40 to-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-10 sm:space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isTr ? 'BÜTÜNLEŞİK ÇÖZÜM DÖNGÜSÜ' : 'INTEGRATED SOLUTION ECOSYSTEM'}</span>
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {isTr ? 'Spor Okulları İçin' : 'Engineered for Sports Clubs'} <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {isTr ? '360° Yönetim & Pazarlama Ekosistemi' : '360° Management & Growth Engine'}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            {isTr
              ? 'Kulübünüzün tüm operasyonel, finansal ve pazarlama süreçlerini birbirini besleyen dairesel bir ekosistemde birleştirin.'
              : 'Unify your sports academy’s operational, financial, and marketing workflows into one interconnected ecosystem.'}
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Center: Interactive Circular Visual Diagram (Matching sportsfly-circle.png) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center p-2">
              
              {/* Outer Circular Ring Badge Container */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-300/80 animate-spin-slow pointer-events-none" />

              {/* Outer Ring Arc Pills */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* Arc 1: Spor Pazarlaması (Top) */}
                <div className="absolute top-0 text-[10px] sm:text-xs font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0052cc] text-white shadow-md flex items-center gap-1">
                  <Megaphone className="w-3 h-3" />
                  <span>{isTr ? 'Spor Pazarlaması' : 'Sports Marketing'}</span>
                </div>

                {/* Arc 2: Dijital Kütüphane (Top Right) */}
                <div className="absolute top-16 right-0 text-[10px] sm:text-xs font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#ff2a85] text-white shadow-md flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  <span>{isTr ? 'Dijital Kütüphane' : 'Digital Library'}</span>
                </div>

                {/* Arc 3: Web Çözümleri (Bottom Right) */}
                <div className="absolute bottom-16 right-0 text-[10px] sm:text-xs font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#ff5c75] text-white shadow-md flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>{isTr ? 'Web Çözümleri' : 'Web Solutions'}</span>
                </div>

                {/* Arc 4: Sporda Satış (Bottom) */}
                <div className="absolute bottom-0 text-[10px] sm:text-xs font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#00a2ff] text-white shadow-md flex items-center gap-1">
                  <ShoppingCart className="w-3 h-3" />
                  <span>{isTr ? 'Sporda Satış' : 'Sports Sales'}</span>
                </div>

                {/* Arc 5: Spor İletişimi (Top Left) */}
                <div className="absolute top-28 left-0 text-[10px] sm:text-xs font-extrabold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#0066ff] text-white shadow-md flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <span>{isTr ? 'Spor İletişimi' : 'Sports Comm'}</span>
                </div>
              </div>

              {/* Inner Core Circle Diagram */}
              <div className="w-[82%] h-[82%] rounded-full bg-white shadow-2xl border-4 border-slate-100 relative overflow-hidden p-6 flex items-center justify-center">
                
                {/* Center SportsFly Dual Ribbon Emblem */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-50 border border-slate-200 shadow-md flex items-center justify-center z-20 pointer-events-none">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                    {/* SVG Dual-ribbon SportsFly Emblem */}
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                      <path d="M20,50 Q40,10 70,30 Q40,60 20,50 Z" fill="#2563eb" />
                      <path d="M80,50 Q60,90 30,70 Q60,40 80,50 Z" fill="#ff2a85" />
                    </svg>
                  </div>
                </div>

                {/* Interactive Inner Wedges Selectors */}
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
                  {innerModules.map((mod) => {
                    const IconC = mod.icon;
                    const isSelected = activeModule === mod.id;

                    return (
                      <button
                        key={mod.id}
                        onClick={() => setActiveModule(mod.id)}
                        className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-lg scale-[1.03] z-10 font-bold'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 font-medium'
                        }`}
                      >
                        <IconC className={`w-5 h-5 mb-1 ${isSelected ? 'text-white' : 'text-blue-600'}`} />
                        <span className="text-[10px] sm:text-xs leading-tight font-extrabold max-w-[90px] truncate">
                          {mod.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Quick Helper Subtext */}
            <div className="text-xs text-slate-500 font-semibold mt-4 text-center flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{isTr ? 'Modüllere tıklayarak detaylı işleyişi inceleyebilirsiniz.' : 'Click modules to explore detailed capabilities.'}</span>
            </div>
          </div>

          {/* Right Column: Detailed Module Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-6 relative">
              
              {/* Active Module Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${currentModule.color} text-white flex items-center justify-center shadow-md font-bold`}>
                    <currentModule.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                      {isTr ? 'SİSTEM MODÜLÜ' : 'CORE MODULE'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-950">
                      {currentModule.title}
                    </h3>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border ${currentModule.bgColor} ${currentModule.textColor}`}>
                  {isTr ? 'Aktif Modül' : 'Active'}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentModule.desc}
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5 pt-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {isTr ? 'ÖNE ÇIKAN YETENEKLER:' : 'KEY CAPABILITIES:'}
                </div>
                {currentModule.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={onOpenDemoModal}
                  className="w-full py-3.5 px-5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs transition shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>{isTr ? 'Bu Modülü Demoda İnceleyin' : 'Explore in Live Demo'}</span>
                  <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
