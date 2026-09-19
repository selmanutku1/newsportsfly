import React, { useState } from 'react';
import { Calculator, CheckCircle2, DollarSign, Sparkles, TrendingUp, Users } from 'lucide-react';

export const RoiCalculator: React.FC = () => {
  const [studentCount, setStudentCount] = useState<number>(250);
  const [monthlyFee, setMonthlyFee] = useState<number>(2200);

  // Math:
  // Uncollected fee rate without automated software: ~8%
  // Saved fees per month with SportsFly: 8% of total volume
  const totalMonthlyVolume = studentCount * monthlyFee;
  const recoveredMonthlyLeakage = Math.round(totalMonthlyVolume * 0.08);
  const annualRecovered = recoveredMonthlyLeakage * 12;

  // Coach & Admin hours saved per week:
  const hoursSavedWeekly = Math.round(studentCount * 0.06);

  return (
    <section id="roi-calc" className="py-24 bg-slate-50/70 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            Kulüp Tasarruf & Kazanç Hesaplayıcısı
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            SportsFly Kulübünüze Ne Kadar <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Zaman ve Para Kazandırır?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Sporcu sayınızı ve aidatınızı belirleyin; otomasyon ve Sporpuan sadakat sisteminin kulübünüze katacağı net değeri anında hesaplayın.
          </p>
        </div>

        {/* Interactive Calculator Card */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input 1: Student Count */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-700">Aktif Sporcu Sayısı:</span>
                <span className="text-blue-600 font-black text-lg">{studentCount} Öğrenci</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={studentCount}
                onChange={(e) => setStudentCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>50</span>
                <span>500</span>
                <span>1.000+ Sporcu</span>
              </div>
            </div>

            {/* Input 2: Monthly Fee */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-slate-700">Ortalama Aylık Aidat Tutarı:</span>
                <span className="text-emerald-600 font-black text-lg">
                  {monthlyFee.toLocaleString('tr-TR')} ₺
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="100"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>1.000 ₺</span>
                <span>3.000 ₺</span>
                <span>5.000 ₺</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Kurtarılan Yıllık Aidat Kaçağı</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-600">
                {annualRecovered.toLocaleString('tr-TR')} ₺
              </div>
              <p className="text-[11px] text-slate-500">Otomatik WhatsApp & POS tahsilatıyla</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Haftalık Kazanılan Zaman</span>
              <div className="text-2xl sm:text-3xl font-black text-blue-600">
                ~{hoursSavedWeekly} Saat
              </div>
              <p className="text-[11px] text-slate-500">Yoklama ve raporlama iş yükünden</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-xs text-slate-500 font-medium">Tahmini Devam Artışı</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-500">
                +%24
              </div>
              <p className="text-[11px] text-slate-500">Sporpuan sadakat çarpanıyla</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
