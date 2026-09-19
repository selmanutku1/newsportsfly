import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  CreditCard,
  Zap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FeaturesSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillarVisuals = [
    {
      icon: Zap,
      color: 'from-amber-500 to-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      defaultBadge: 'Devamlılık Çözümü',
      defaultBadgeEn: 'Attendance Solution',
    },
    {
      icon: Award,
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      defaultBadge: 'Otomatik Paylaşım',
      defaultBadgeEn: 'Auto Dispatch',
    },
    {
      icon: CheckCircle2,
      color: 'from-blue-500 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      defaultBadge: 'Zaman Tasarrufu',
      defaultBadgeEn: 'Time Saver',
    },
    {
      icon: CreditCard,
      color: 'from-violet-500 to-purple-600',
      badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
      defaultBadge: 'Finansal Güç',
      defaultBadgeEn: 'Financial Control',
    }
  ];

  const pillars = (t.featuresPillars || []).map((pillar, idx) => ({
    ...pillar,
    ...pillarVisuals[idx]
  }));

  return (
    <section id="features" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
            {t.featuresBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.featuresTitle} <br />
            <span className="text-blue-600">
              {t.featuresTitleHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.featuresDesc}
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
                          {pillar.badge || (language === 'tr' ? pillar.defaultBadge : pillar.defaultBadgeEn)}
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
                      {pillars[activePillar].badge || (language === 'tr' ? 'Spor Dünyasında İlk' : 'First in Sports')}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {language === 'tr' ? 'SportsFly Özel Modülü' : 'SportsFly Exclusive Module'}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                    {pillars[activePillar].title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillars[activePillar].desc}
                  </p>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {language === 'tr' ? 'Temel Kazanımlar:' : 'Key Outcomes:'}
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
                      {language === 'tr'
                        ? 'Tüm branşlar için geçerli: Basketbol, Voleybol, Yüzme, Cimnastik, Futbol.'
                        : 'Applicable to all disciplines: Basketball, Volleyball, Swimming, Gymnastics, Football.'}
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
