import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AllSportsBannerProps {
  onOpenDemoModal: () => void;
}

export const AllSportsBanner: React.FC<AllSportsBannerProps> = ({
  onOpenDemoModal,
}) => {
  const { language, t } = useLanguage();

  const sportsTr = [
    { name: 'Futbol', icon: '⚽' },
    { name: 'Basketbol', icon: '🏀' },
    { name: 'Voleybol', icon: '🏐' },
    { name: 'Yüzme', icon: '🏊‍♂️' },
    { name: 'Jimnastik', icon: '🤸' },
    { name: 'Tenis', icon: '🎾' },
    { name: 'Dövüş Sporları', icon: '🥋' },
    { name: 'Atletizm', icon: '🏃' },
  ];

  const sportsEn = [
    { name: 'Football (Soccer)', icon: '⚽' },
    { name: 'Basketball', icon: '🏀' },
    { name: 'Volleyball', icon: '🏐' },
    { name: 'Swimming', icon: '🏊‍♂️' },
    { name: 'Gymnastics', icon: '🤸' },
    { name: 'Tennis', icon: '🎾' },
    { name: 'Martial Arts', icon: '🥋' },
    { name: 'Athletics & Track', icon: '🏃' },
  ];

  const sports = language === 'tr' ? sportsTr : sportsEn;

  return (
    <section className="py-24 bg-gradient-to-b from-[#f2fdf5] via-[#f7fcf9] to-white relative overflow-hidden border-y border-emerald-100/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-8">
        
        {/* Eyebrow */}
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-500">
            {t.sportsBadge}
          </span>
        </div>

        {/* Main Headline matching Image 4 */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          {t.sportsHeadline}
        </h2>

        {/* Subtext matching Image 4 */}
        <p className="text-base sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
          {language === 'tr' ? (
            <>
              Futboldan atletizme, yüzmeden basketbola ve jimnastiğe kadar <strong className="font-extrabold text-slate-950">60'tan fazla spor dalında</strong> kulüpler tarafından kullanılan SportsFly, kulübünüzün çalışma şekline kusursuz uyum sağlar.
            </>
          ) : (
            <>
              Used by academies and clubs across <strong className="font-extrabold text-slate-950">more than 60 sports disciplines</strong>—from football to track & field, swimming to basketball and gymnastics—SportsFly adapts effortlessly to your workflow.
            </>
          )}
        </p>

        {/* Action Buttons matching Image 4 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#bbf246] hover:bg-[#a3e635] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-lime-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {t.sportsBookDemo}
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('features');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm border border-slate-200 shadow-xs hover:border-slate-300 transition"
          >
            {t.sportsViewFeatures}
          </button>
        </div>

        {/* Sport Branches Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-2.5">
          {sports.map((sport, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 border border-slate-200/90 text-xs font-bold text-slate-800 shadow-2xs hover:border-emerald-300 hover:shadow-xs transition"
            >
              <span>{sport.icon}</span>
              <span>{sport.name}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
