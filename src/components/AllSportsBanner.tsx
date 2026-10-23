import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AllSportsBannerProps {
  onOpenDemoModal: () => void;
}

interface MarqueeCardItem {
  id: string;
  titleTr: string;
  titleEn: string;
  badgeTr?: string;
  badgeEn?: string;
  image: string;
}

const ROW_1_CARDS: MarqueeCardItem[] = [
  {
    id: 'swimming',
    titleTr: 'Yüzme Okulu & Kulübü',
    titleEn: 'Swimming Academy',
    badgeTr: 'Su Sporları',
    badgeEn: 'Aquatics',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'archery',
    titleTr: 'Okçuluk Kulübü',
    titleEn: 'Archery Club',
    image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'boxing',
    titleTr: 'Boks & Kickboks Kulübü',
    titleEn: 'Boxing & Kickboxing',
    badgeTr: 'Dövüş Sporları',
    badgeEn: 'Combat Sports',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dance',
    titleTr: 'Sportif Dans & Hareket',
    titleEn: 'Dance Sport & Motion',
    badgeTr: 'Koreografi & Ritim',
    badgeEn: 'Dance & Rhythm',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'rowing',
    titleTr: 'Kürek & Su Sporları',
    titleEn: 'Rowing & Watersports',
    badgeTr: 'Kondisyon & Takım',
    badgeEn: 'Rowing & Crew',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'karate',
    titleTr: 'Karate & Judo Akademisi',
    titleEn: 'Karate & Judo Academy',
    badgeTr: 'Dövüş Sanatları',
    badgeEn: 'Martial Arts',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'basketball',
    titleTr: 'Basketbol Akademisi',
    titleEn: 'Basketball Academy',
    badgeTr: 'Takım Sporları',
    badgeEn: 'Team Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'tennis',
    titleTr: 'Tenis Kulübü',
    titleEn: 'Tennis Club',
    badgeTr: 'Raket Sporları',
    badgeEn: 'Racquet Sports',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=800&q=80',
  },
];

const ROW_2_CARDS: MarqueeCardItem[] = [
  {
    id: 'cycling',
    titleTr: 'Bisiklet & Triatlon',
    titleEn: 'Cycling & Triathlon',
    badgeTr: 'Pist & Dayanıklılık',
    badgeEn: 'Endurance Sports',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'taekwondo',
    titleTr: 'Taekwondo Akademisi',
    titleEn: 'Taekwondo Academy',
    badgeTr: 'Savunma Sporları',
    badgeEn: 'Martial Arts',
    image: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'soccer',
    titleTr: 'Futbol Akademisi',
    titleEn: 'Football Academy',
    badgeTr: 'Altyapı & Takım',
    badgeEn: 'Soccer Academy',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'padel',
    titleTr: 'Padel & Masa Tenisi',
    titleEn: 'Padel & Table Tennis',
    badgeTr: 'Kort & Raket',
    badgeEn: 'Racket Sports',
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pilates',
    titleTr: 'Pilates & Reformer',
    titleEn: 'Pilates & Reformer',
    badgeTr: 'Core & Güç',
    badgeEn: 'Core & Strength',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gymnastics',
    titleTr: 'Artistik Cimnastik',
    titleEn: 'Artistic Gymnastics',
    badgeTr: 'Temel Cimnastik',
    badgeEn: 'Athletic Motion',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'volleyball',
    titleTr: 'Voleybol Kulübü',
    titleEn: 'Volleyball Club',
    badgeTr: 'Salon Sporları',
    badgeEn: 'Team Volleyball',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'athletics',
    titleTr: 'Atletizm & Koşu Kulübü',
    titleEn: 'Athletics & Track',
    badgeTr: 'Kondisyon & Sürat',
    badgeEn: 'Track & Field',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
  },
];

export const AllSportsBanner: React.FC<AllSportsBannerProps> = ({
  onOpenDemoModal,
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  // Duplicate arrays for seamless infinite looping
  const row1Items = [...ROW_1_CARDS, ...ROW_1_CARDS];
  const row2Items = [...ROW_2_CARDS, ...ROW_2_CARDS];

  return (
    <section className="py-10 sm:py-24 bg-gradient-to-b from-[#f2fdf5] via-[#f8fcf9] to-white relative overflow-hidden border-y border-emerald-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-6 sm:mb-14">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-emerald-100/70 border border-emerald-200/60 text-emerald-900 text-[10px] sm:text-xs font-bold tracking-wide uppercase mb-3 sm:mb-4">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-emerald-600" />
          <span>{isTr ? '60+ Spor Branşı & Kulüp Türü' : '60+ Sports Disciplines & Academies'}</span>
        </div>

        {/* Big Impactful Headline */}
        <h2 className="text-2xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto font-sans">
          {isTr ? 'Her spor branşı ve kulüp için tasarlandı' : 'Built for every sports discipline and academy'}
        </h2>

        {/* Subtitle */}
        <p className="mt-2.5 sm:mt-5 text-xs sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {isTr
            ? 'Yüzmeden futbola, basketboldan dövüş sporlarına, tenisten cimnastiğe kadar tüm branşların üye, aidat ve antrenman akışına kusursuz uyum sağlar.'
            : 'From swimming to soccer, basketball to martial arts, tennis to gymnastics—adapts effortlessly to your athletes, dues, and schedules.'}
        </p>
      </div>

      {/* Infinite Scrolling Marquee Container with edge fade masks */}
      <div className="relative w-full overflow-hidden marquee-group select-none">
        {/* Left edge gradient fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-r from-[#f2fdf5] to-transparent z-10" />
        
        {/* Right edge gradient fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Marquee Row 1 (Right to Left) */}
        <div className="flex gap-3 sm:gap-6 animate-marquee-track-1 mb-3 sm:mb-6">
          {row1Items.map((item, idx) => {
            const title = isTr ? item.titleTr : item.titleEn;
            return (
              <div
                key={`r1-${item.id}-${idx}`}
                className="group relative flex-shrink-0 w-[180px] sm:w-[300px] md:w-[330px] h-[115px] sm:h-[185px] rounded-xl sm:rounded-3xl overflow-hidden shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-slate-900"
                onClick={onOpenDemoModal}
              >
                {/* Background Photo */}
                <img
                  src={item.image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark gradient overlay focused on the title area at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90 transition-colors" />

                {/* Bottom Title */}
                <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h3 className="text-white font-extrabold text-sm sm:text-xl tracking-tight leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
                    {title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Marquee Row 2 (Right to Left with slightly different speed) */}
        <div className="flex gap-3 sm:gap-6 animate-marquee-track-2">
          {row2Items.map((item, idx) => {
            const title = isTr ? item.titleTr : item.titleEn;
            return (
              <div
                key={`r2-${item.id}-${idx}`}
                className="group relative flex-shrink-0 w-[180px] sm:w-[300px] md:w-[330px] h-[115px] sm:h-[185px] rounded-xl sm:rounded-3xl overflow-hidden shadow-sm sm:shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer bg-slate-900"
                onClick={onOpenDemoModal}
              >
                {/* Background Photo */}
                <img
                  src={item.image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent group-hover:from-black/90 transition-colors" />

                {/* Bottom Title */}
                <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <h3 className="text-white font-extrabold text-sm sm:text-xl tracking-tight leading-snug drop-shadow-sm group-hover:text-emerald-300 transition-colors">
                    {title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="max-w-4xl mx-auto px-4 mt-6 sm:mt-12 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-2 sm:p-2.5 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-2xs">
          <span className="text-xs sm:text-sm text-slate-700 font-medium px-2">
            {isTr
              ? 'Kulübünüzün branşı listede yok mu? Özel şablonlarımızı inceleyin.'
              : 'Don’t see your exact sport? Explore our custom academy templates.'}
          </span>
          <button
            onClick={onOpenDemoModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-2xs"
          >
            <span>{isTr ? 'Kulübünüz İçin Başlayın' : 'Get Started For Your Club'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
