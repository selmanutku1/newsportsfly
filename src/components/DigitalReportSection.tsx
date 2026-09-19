import React from 'react';
import { Award, CheckCircle2, Download, QrCode, Send, Share2, TrendingUp, Users } from 'lucide-react';
import { INITIAL_REPORT_CARDS, INITIAL_ATHLETES } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';

interface DigitalReportSectionProps {
  onOpenSampleCard: () => void;
}

export const DigitalReportSection: React.FC<DigitalReportSectionProps> = ({
  onOpenSampleCard,
}) => {
  const { language, t } = useLanguage();
  const sampleCard = INITIAL_REPORT_CARDS['ath-1'];
  const sampleAthlete = INITIAL_ATHLETES[0];

  const getMetricName = (name: string) => {
    if (language === 'tr') return name;
    if (name.includes('Şut')) return 'Shooting Technique';
    if (name.includes('Pas')) return 'Passing & Vision';
    if (name.includes('Top Sürme') || name.includes('Dribbling')) return 'Ball Control & Dribbling';
    if (name.includes('Savunma')) return 'Defensive Positioning';
    if (name.includes('Kondisyon')) return 'Physical Conditioning';
    if (name.includes('Disiplin')) return 'Team Play & Discipline';
    return name;
  };

  const athleteBranch = language === 'tr' ? sampleAthlete.branch : 'Basketball';
  const periodText = language === 'tr' ? sampleCard.period : '2025-2026 Spring Term';
  const coachNoteText = language === 'tr'
    ? sampleCard.coachNotes
    : 'Arda has shown tremendous progress this season, especially in team defense and transition play. His high training attendance is reflected in his game discipline.';

  return (
    <section id="digital-report" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            {t.reportBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.reportTitle} <br />
            <span className="text-emerald-600">
              {t.reportTitleHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.reportDesc}
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Explanatory Benefits & Comparison */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{t.reportStep1Title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t.reportStep1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{t.reportStep2Title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t.reportStep2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">{t.reportStep3Title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {t.reportStep3Desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-700 flex items-center justify-between">
              <span>{t.reportSurveyFact}</span>
              <button
                id="btn-trigger-sample-card"
                onClick={onOpenSampleCard}
                className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 flex-shrink-0"
              >
                <span>{t.reportInspectSample}</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* Right: Realistic Card Visual Display */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative space-y-6">
              {/* Header Info */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={sampleAthlete.avatar}
                    alt={sampleAthlete.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                      {athleteBranch} • {sampleAthlete.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900">{sampleAthlete.name}</h3>
                    <p className="text-xs text-slate-500">{t.reportPeriod}: {periodText}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-slate-400 font-bold">{t.reportOverallScore}</span>
                  <div className="text-3xl font-black text-emerald-600">
                    {sampleCard.generalScore}<span className="text-sm text-slate-400 font-normal">/100</span>
                  </div>
                </div>
              </div>

              {/* Skills Progress sample */}
              <div className="space-y-3">
                {sampleCard.metrics.slice(0, 3).map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-800">{getMetricName(m.name)}</span>
                      <span className="text-emerald-600 font-bold">{m.score}/100</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${m.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Coach note snippet */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 italic">
                "{coachNoteText}"
              </div>

              {/* Interactive Modal Opener Button */}
              <button
                id="btn-open-interactive-report"
                onClick={onOpenSampleCard}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>{t.reportViewSampleBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
