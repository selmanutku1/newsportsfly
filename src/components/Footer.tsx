import React from 'react';
import { SportsFlyLogo } from './SportsFlyLogo';
import { ActiveView } from '../types';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigateView: (view: ActiveView) => void;
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDemoModal,
}) => {
  const { language, t } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <SportsFlyLogo size="lg" lightMode={true} />
              <div className="pl-0.5">
                <a
                  href="https://sporsepeti.com.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600 transition group"
                >
                  <span className="text-slate-400 font-normal">by</span>
                  <span className="font-bold text-slate-800 group-hover:text-blue-600 transition">sporsepeti</span>
                </a>
              </div>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
            <div className="flex items-center gap-2.5 text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xl w-fit border border-emerald-200/80">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.footerSecurity}</span>
            </div>
          </div>

          {/* Col 2: Ürün & Modüller */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider">{t.footerModulesTitle}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-blue-600 transition text-left"
                >
                  {t.footerModAttendance}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('sporpuan')}
                  className="hover:text-blue-600 transition text-left"
                >
                  {t.footerModSporpuan}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('digital-report')}
                  className="hover:text-blue-600 transition text-left"
                >
                  {t.footerModReport}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('features')}
                  className="hover:text-blue-600 transition text-left"
                >
                  {t.footerModClubs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('roi-calc')}
                  className="hover:text-blue-600 transition text-left"
                >
                  {t.footerModFinance}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Çözümler & Branşlar */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider">{t.footerBranchesTitle}</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-600">{t.footerBranchBasketball}</span>
              </li>
              <li>
                <span className="text-slate-600">{t.footerBranchVolleyball}</span>
              </li>
              <li>
                <span className="text-slate-600">{t.footerBranchSwimming}</span>
              </li>
              <li>
                <span className="text-slate-600">{t.footerBranchFootball}</span>
              </li>
              <li>
                <button
                  onClick={onOpenDemoModal}
                  className="text-blue-600 font-bold hover:underline transition pt-1 block"
                >
                  {t.footerRequestDemo}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: İletişim */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider">{t.footerContactTitle}</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <a href="tel:02168501907" className="hover:text-blue-600 transition">
                  0216 850 1907
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <a href="mailto:destek@sportsfly.com.tr" className="hover:text-blue-600 transition">
                  destek@sportsfly.com.tr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Suadiye, Bağdat Cad, Suadiye, Mücahit Sk. Ark399 Plz, 34740 Kadıköy/İstanbul
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Sporsepeti */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} SportsFly Inc. {t.footerRights}</span>
            <span className="text-slate-300">•</span>
            <a
              href="https://sporsepeti.com.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-slate-700 hover:text-blue-600 transition group"
            >
              <span className="text-slate-400 font-normal">by</span>
              <span className="font-extrabold text-slate-900 group-hover:text-blue-600 transition">sporsepeti</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-slate-800 cursor-pointer">{t.footerPrivacy}</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">{t.footerTerms}</span>
            <span>•</span>
            <span className="hover:text-slate-800 cursor-pointer">{t.footerKvkk}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
