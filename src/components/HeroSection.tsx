import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ActiveView } from '../types';
import {
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Flame,
  Gift,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onNavigateView?: (view: ActiveView) => void;
  onOpenDemoModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenDemoModal,
}) => {
  const [activeTabPreview, setActiveTabPreview] = useState<'parent' | 'coach' | 'report'>('parent');

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Dynamic Subtle Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-blue-100/60 via-indigo-100/40 to-rose-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-700 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping" />
            <span className="font-bold text-slate-900">Yeni:</span>
            <span>Sporcuların Devamlılığını Ödüllendiren Sporpuan™ Yayında</span>
            <ChevronRight className="w-3.5 h-3.5 text-blue-600" />
          </div>
        </div>

        {/* Hero Copywriting */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.1]">
            Spor Okulları İçin <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-500 bg-clip-text text-transparent">
              Yeni Nesil Yönetim
            </span>{' '}
            & Sadakat Ekosistemi
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Kağıt yoklamaları ve dağınık WhatsApp gruplarını tarihe gömün. Devamlılığı ödüllendiren{' '}
            <strong className="text-amber-600 font-bold">Sporpuan</strong>, yapay zeka destekli{' '}
            <strong className="text-emerald-600 font-bold">Dijital Sporcu Karneleri</strong>, veli ve eğitmen panelleriyle spor kulübünüzü geleceğe taşıyın.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="btn-hero-start-trial"
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>14 Gün Ücretsiz Başla</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>

            <button
              id="btn-hero-explore-features"
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm flex items-center justify-center gap-2.5 transition hover:border-slate-400"
            >
              <Play className="w-4 h-4 text-blue-600 fill-blue-600" />
              <span>Özellikleri Keşfet</span>
            </button>
          </div>

          {/* Micro trust indicators */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Kredi kartı gerekmez
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              3 dakikada Excel'den aktarım
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              %100 Mobil uyumlu (PWA)
            </span>
          </div>
        </div>

        {/* Interactive Device Preview Mockup */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Elegant White Mockup Frame */}
          <div className="p-2 sm:p-4 rounded-3xl bg-white border border-slate-200 shadow-2xl shadow-slate-300/50 relative">
            {/* Top Device Bar & Panel Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50/90 rounded-2xl border border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-500 font-mono ml-2 hidden sm:inline">
                  sportsfly.app/demo-preview
                </span>
              </div>

              {/* View Switchers inside the mockup */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold shadow-xs">
                <button
                  onClick={() => setActiveTabPreview('parent')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    activeTabPreview === 'parent'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Veli Arayüzü</span>
                </button>
                <button
                  onClick={() => setActiveTabPreview('coach')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    activeTabPreview === 'coach'
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Eğitmen Yoklaması</span>
                </button>
                <button
                  onClick={() => setActiveTabPreview('report')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    activeTabPreview === 'report'
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Dijital Karne</span>
                </button>
              </div>

              <span className="text-[11px] font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hidden sm:inline shadow-2xs">
                Arayüz Önizlemesi
              </span>
            </div>

            {/* Mockup Screen Content */}
            <div className="p-4 sm:p-6 bg-slate-50/70 rounded-2xl border border-slate-200 min-h-[360px] flex flex-col justify-between">
              {activeTabPreview === 'parent' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 border border-blue-200 flex items-center justify-center font-bold">
                        AY
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Arda Yılmaz • U12 Basketbol</h4>
                        <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Devamlılık Oranı: %96 (14 Günlük Seri)
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] uppercase text-slate-500 font-bold">Mevcut Sporpuan</div>
                      <div className="text-2xl font-black text-amber-500 flex items-center gap-1 justify-end">
                        <Zap className="w-5 h-5 fill-current" />
                        1.420 SP
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[11px] text-slate-500 block">Sıradaki Antrenman</span>
                      <span className="font-bold text-slate-900 text-sm mt-0.5 block">Yarın 17:30 - Atatürk Spor Salonu</span>
                      <span className="text-[10px] text-blue-600 font-semibold">+25 Sporpuan Kazanacak</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                      <span className="text-[11px] text-slate-500 block">Ödül Talebi</span>
                      <span className="font-bold text-amber-600 text-sm mt-0.5 block">SportsFly Kulüp Suluğu</span>
                      <span className="text-[10px] text-slate-500">450 SP ile Alındı • Hazırlanıyor</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-emerald-300 shadow-xs">
                      <span className="text-[11px] text-slate-500 block">Dönem Sonu Karnesi</span>
                      <span className="font-bold text-emerald-600 text-sm mt-0.5 block">92 / 100 Genel Puan</span>
                      <span className="text-[10px] text-slate-500">Koç Notu: "Harika gelişim!"</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between shadow-xs">
                    <span>Veliler tek tıkla aidat ödeyebilir, antrenman yoklamasını anlık takip eder.</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                      Anlık Bildirim
                    </span>
                  </div>
                </div>
              )}

              {activeTabPreview === 'coach' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Hızlı Seans Yoklaması (Basketbol U12)</h4>
                      <p className="text-xs text-slate-500">Tek tıkla tüm sporculara Sporpuan yükleyin ve velilere bildirim iletin.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200">
                      15 Saniyede Tamamla
                    </span>
                  </div>

                  <div className="space-y-2">
                    {[
                      { name: 'Arda Yılmaz', status: 'Geldi (+25 SP)', streak: '14 Seri', color: 'text-emerald-700 bg-emerald-100' },
                      { name: 'Elif Sare Kaya', status: 'Geldi (+25 SP)', streak: '8 Seri', color: 'text-emerald-700 bg-emerald-100' },
                      { name: 'Kaan Demir', status: 'Geldi (+25 SP)', streak: '21 Seri', color: 'text-emerald-700 bg-emerald-100' },
                    ].map((row, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs shadow-xs">
                        <span className="font-bold text-slate-900">{row.name}</span>
                        <span className="text-slate-500 text-[11px]">{row.streak}</span>
                        <span className={`px-2.5 py-0.5 rounded-md font-bold ${row.color}`}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between shadow-xs">
                    <span>Eğitmenler telefon veya tabletten antrenman başında saniyeler içinde yoklama alır.</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                      Mobil Uyumlu
                    </span>
                  </div>
                </div>
              )}

              {activeTabPreview === 'report' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Dijital Sporcu Gelişim Karnesi</h4>
                      <p className="text-xs text-slate-500">Teknik, fiziksel, taktik ve mental gelişim radar analizi</p>
                    </div>
                    <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-xl">
                      92 / 100
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                      <span className="text-slate-500 block text-[10px]">Top Hâkimiyeti</span>
                      <span className="font-black text-blue-600 text-sm">94/100</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                      <span className="text-slate-500 block text-[10px]">Şut İsabeti</span>
                      <span className="font-black text-blue-600 text-sm">88/100</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                      <span className="text-slate-500 block text-[10px]">Ayak Çabukluğu</span>
                      <span className="font-black text-blue-600 text-sm">90/100</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-center shadow-xs">
                      <span className="text-slate-500 block text-[10px]">Fair-Play</span>
                      <span className="font-black text-emerald-600 text-sm">96/100</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 italic bg-white p-3 rounded-xl border border-slate-200 shadow-xs">
                    "Arda bu dönem pas dağıtımında ve dış şut stabilitesinde müthiş sıçrama yaptı. Sporpuan serisini sürdürmesi motivasyonunu zirvede tuttu."
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>WhatsApp ve SMS ile veliye tek tıkla otomatik gönderilir.</span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      Otomatik Paylaşım
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Social Proof Numbers Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-200">
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-slate-950">140+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Aktif Spor Kulübü & Akademi
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-blue-600">%94.6</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Ortalama Antrenman Devamlılığı
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-500">1.8 Milyon+</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Kazanılan Sporpuan™
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">%98.8</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Veli Memnuniyet Oranı
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
