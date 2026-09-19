import React, { useState } from 'react';
import {
  Activity,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Flame,
  Gift,
  MessageSquare,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'Devamlılık Odaklı Sporpuan™',
      subtitle: 'Antrenmanı kaçırmayan sporcular puan ve ödül kazanır',
      icon: Zap,
      color: 'from-amber-500 to-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      desc: 'Spor okullarının en büyük sorunu olan devamsızlığı oyunlaştırma (gamification) ile çözüyoruz. Her antrenmana katılım, zamanında geliş ve antrenörün verdiği fair-play ödülleriyle sporcular puan biriktirir, kulüp mağazasından ödüller seçer.',
      points: [
        'Yoklama alındığı an sporcunun hesabına otomatik puan yükleme',
        '3, 5 ve 10 antrenmanlık peş peşe devam serisi çarpanları',
        'Kulübün kendi ekipman ve deneyim ödüllerini ekleyebileceği esnek katalog',
        'Devamsızlık oranında kanıtlanmış %70 net azalma'
      ]
    },
    {
      title: 'Dijital Sporcu Gelişim Karnesi',
      subtitle: 'Teknik, fiziksel ve mental gelişimi velilerle otomatik paylaşın',
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Otomatik Paylaşım',
      desc: 'Dönem sonlarında kağıt karnelerle uğraşmayın. Antrenörler mobil cihazlarından sporcunun yeteneklerini (şut, pas, kondisyon, disiplin) puanlar; sistem görsel gelişim grafiklerini ve koç mektubunu saniyeler içinde velinin cebine gönderir.',
      points: [
        'Branşa özel yetenek normları ve radar gelişim grafikleri',
        'Antrenör sesli veya yazılı değerlendirme mektubu',
        'WhatsApp, SMS ve Veli Portalı üzerinden anlık paylaşım',
        'QR kodlu ve doğrulanabilir dijital PDF formatı'
      ]
    },
    {
      title: 'Mobil Eğitmen & Hızlı Yoklama',
      subtitle: '15 saniyede antrenman yoklamasını tamamlayın',
      icon: CheckCircle2,
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      badge: 'Zaman Tasarrufu',
      desc: 'Antrenörlerinizin kıymetli vaktini evrak işlerine değil, sahada çocuklara ayırmasını sağlayın. Hızlı liste yoklaması veya QR kod tarayıcı ile grup yoklaması anında alınır, gelmeyen sporcuların velilerine otomatik bildirim düşer.',
      points: [
        'Tek tıkla "Tümünü Geldi İşaretle" ve anında Sporpuan dağıtımı',
        'Gelmedi / Mazeretli durumlarında veliye otomatik bilgilendirme',
        'Antrenör performans ve seans doluluk raporlaması',
        'İnternet çekmeyen spor salonlarında dahi çevrimdışı çalışma desteği'
      ]
    },
    {
      title: 'Şeffaf Veli Portalı & Aidat Takibi',
      subtitle: 'Geciken ödemeleri önleyin, veli memnuniyetini zirveye çıkarın',
      icon: CreditCard,
      color: 'from-violet-500 to-purple-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      badge: 'Finansal Güç',
      desc: 'Veliler kendi portalları üzerinden çocuklarının devamlılığını, biriken Sporpuanlarını, karnesini ve aidat durumunu takip eder. Otomatik hatırlatıcılar ve sanal POS entegrasyonu ile aidat kaçakları sıfıra iner.',
      points: [
        'Veliler için kullanıcı adı/şifre derdi olmadan güvenli giriş',
        'Vade tarihi gelen aidatlar için nazik otomatik WhatsApp hatırlatmaları',
        'Kredi kartıyla tek tıkla veya taksitli online ödeme imkanı',
        'Resmi e-makbuz ve faturaların otomatik veliye iletilmesi'
      ]
    }
  ];

  return (
    <section id="features" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            Kapsamlı Modüller
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            Spor Okulunuzun İhtiyaç Duyduğu <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 bg-clip-text text-transparent">
              Tüm Araçlar Tek Bir Platformda
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Geleneksel ve hantal yazılımların eksik kaldığı noktaları, sporcu psikolojisini motive eden Sporpuan ve şeffaf dijital karne ekosistemiyle tamamladık.
          </p>
        </div>

        {/* Interactive Feature Pillar Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Pillar Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActivePillar(idx)}
                  className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-500 shadow-md shadow-blue-500/10 scale-[1.02]'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-tr ${pillar.color} text-white font-bold shadow-sm`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`font-bold text-base truncate ${isSelected ? 'text-blue-950' : 'text-slate-900'}`}>
                          {pillar.title}
                        </h3>
                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${pillar.badgeBg || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                          {pillar.badge || 'Öne Çıkan'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {pillar.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Pillar Spotlight */}
          <div className="lg:col-span-7">
            {pillars[activePillar] && (
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${pillars[activePillar].badgeBg || 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                      {pillars[activePillar].badge || 'Spor Dünyasında İlk'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">SportsFly Özel Modülü</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {pillars[activePillar].title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillars[activePillar].desc}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Temel Kazanımlar:
                    </div>
                    {pillars[activePillar].points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                    <div className="text-xs text-slate-500">
                      Tüm branşlar için geçerli: Basketbol, Voleybol, Yüzme, Cimnastik, Futbol.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
