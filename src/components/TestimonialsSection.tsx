import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Quote, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TestimonialsSection: React.FC = () => {
  const { language, t } = useLanguage();

  const englishTestimonials = [
    {
      quote: "Before SportsFly, we took roll call on paper and rushed report cards at the end of each semester. Within the first month of enabling the Sporpuan reward system, missed workouts dropped by 70%! When parents saw the digital cards on their phones, trust doubled.",
      name: 'Serkan Erdem',
      role: 'Club President & Head Coach',
      club: 'Anadolu Stars Sports Club (550+ Athletes)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      stat: '96% Attendance Rate'
    },
    {
      quote: "It was the first time I witnessed my son waking up early for practice on his own. He is eager to collect Sporpuan and unlock the team jersey. Seeing his skill progression charts on the digital report card as a parent is simply invaluable.",
      name: 'Banu Çetinkaya',
      role: 'Parent (U12 Basketball)',
      club: 'Istanbul Eagles Academy',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      stat: 'Parent Satisfaction: 5/5'
    },
    {
      quote: "Our coaches take attendance in 15 seconds, and parents get instant notifications if their kid hasn't arrived. Sporpuan gamification and digital report cards have elevated parent loyalty to a completely new level.",
      name: 'Metin Barışkan',
      role: 'General Coordinator',
      club: 'Aegean Olympic Aquatics Club',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      stat: '18 Hours Saved Weekly'
    }
  ];

  const items = language === 'tr' ? TESTIMONIALS : englishTestimonials;

  return (
    <section className="py-24 bg-slate-50/70 border-t border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {t.testimonialsBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.testimonialsTitle} <br />
            <span className="text-blue-600">
              {t.testimonialsTitleHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.testimonialsDesc}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md hover:border-slate-300 transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {item.stat}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-2xl object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-semibold">{item.role}</p>
                  <p className="text-[11px] text-slate-500">{item.club}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
