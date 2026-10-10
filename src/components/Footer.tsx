import React from 'react';
import { SportsFlyLogo } from './SportsFlyLogo';
import { ActiveView } from '../types';
import { Mail, MapPin, Phone, ArrowUpRight, BookOpen, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { triggerLiveSupportModal } from './LiveSupportModal';

interface FooterProps {
  onNavigateView: (view: ActiveView) => void;
  onOpenDemoModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateView,
  onOpenDemoModal,
}) => {
  const { language, t } = useLanguage();
  const isTr = language === 'tr';

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onNavigateView('marketing');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const navigateToHashView = (
    e: React.MouseEvent<HTMLAnchorElement>,
    view: ActiveView,
    hash: string
  ) => {
    e.preventDefault();
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    onNavigateView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resourceCategories = [
    {
      id: 'otomasyon',
      href: '#blog-kategori-otomasyon',
      label: isTr ? 'Aidat & Finans Otomasyonu' : 'Tuition & Billing Automation',
    },
    {
      id: 'sporpuan',
      href: '#blog-kategori-sporpuan',
      label: isTr ? 'Sporpuan & Sporcu Sadakati' : 'Sporpuan & Athlete Retention',
    },
    {
      id: 'karne',
      href: '#blog-kategori-karne',
      label: isTr ? 'Dijital Sporcu Karnesi' : 'Digital Athlete Report Cards',
    },
    {
      id: 'yonetim',
      href: '#blog-kategori-yonetim',
      label: isTr ? 'Kulüp & Antrenör Yönetimi' : 'Club & Coach Operations',
    },
    {
      id: 'iletisim',
      href: '#blog-kategori-iletisim',
      label: isTr ? 'Veli İletişimi & Deneyimi' : 'Parent Experience & Trust',
    },
  ];

  const featuredGuides = [
    {
      slug: 'spor-okullarinda-aidat-tahsilatinda-yuzde-98-basari',
      category: isTr ? 'Aidat Tahsilatı' : 'Billing Automation',
      title: isTr
        ? 'Spor Okullarında Aidat Tahsilatında %98 Başarı Rehberi'
        : '98% Tuition Collection Success in Sports Academies',
    },
    {
      slug: 'sporcu-devamliligini-artiran-oyunlastirma-sporpuan',
      category: isTr ? 'Sporcu Devamlılığı' : 'Athlete Retention',
      title: isTr
        ? 'Sporpuan Oyunlaştırma ile Devamlılığı %42 Artırma'
        : 'Boosting Attendance 42% with Sporpuan Gamification',
    },
    {
      slug: 'geleneksel-yoklamadan-360-dijital-sporcu-karnesine',
      category: isTr ? 'Gelişim Analizi' : 'Performance Analytics',
      title: isTr
        ? 'Geleneksel Yoklamadan 360° Dijital Sporcu Karnesine Geçiş'
        : 'From Paper Attendance to 360° Digital Report Cards',
    },
    {
      slug: 'antrenorlerin-haftalik-14-saatini-kurtarmak-modern-yonetim',
      category: isTr ? 'Antrenör Verimliliği' : 'Coach Productivity',
      title: isTr
        ? 'Spor Kulübü Otomasyonu ile Haftalık 14 Saat Tasarruf'
        : 'Saving 14 Hours Weekly with Modern Club Management',
    },
    {
      slug: 'basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi',
      category: isTr ? 'Çoklu Branş' : 'Multi-Sport Software',
      title: isTr
        ? 'Basketboldan Yüzmeye 14+ Branş İçin Spor Okulu Yazılımı'
        : 'Multi-Branch Sports Academy Software from Basketball to Swimming',
    },
    {
      slug: 'yeni-nesil-veli-iletisimi-sikayetleri-sifirlayan-5-strateji',
      category: isTr ? 'Veli Memnuniyeti' : 'Parent Portal',
      title: isTr
        ? 'Spor Akademilerinde Veli Şikayetlerini Sıfırlayan 5 Strateji'
        : '5 Strategies to Eliminate Parent Friction in Sports Clubs',
    },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Top Multi-Column Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Col 1: Brand (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <SportsFlyLogo size="lg" lightMode={true} />
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              {t.footerDesc}
            </p>
          </div>

          {/* Col 2: Ürün & Modüller (2 cols) */}
          <nav
            aria-label={isTr ? 'Ürün ve Modüller' : 'Product and Modules'}
            className="lg:col-span-2 space-y-3"
          >
            <h4 className="text-slate-900 font-bold text-sm tracking-tight">
              {t.footerModulesTitle}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#features"
                  onClick={(e) => scrollToSection(e, 'features')}
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerModAttendance}
                </a>
              </li>
              <li>
                <a
                  href="#sporpuan"
                  onClick={(e) => scrollToSection(e, 'sporpuan')}
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerModSporpuan}
                </a>
              </li>
              <li>
                <a
                  href="#digital-report"
                  onClick={(e) => scrollToSection(e, 'digital-report')}
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerModReport}
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => scrollToSection(e, 'features')}
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerModClubs}
                </a>
              </li>
              <li>
                <a
                  href="#roi-calc"
                  onClick={(e) => scrollToSection(e, 'roi-calc')}
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerModFinance}
                </a>
              </li>
              <li>
                <a
                  href="#sporpuan-sistemi"
                  onClick={(e) => navigateToHashView(e, 'sporpuan_system', '#sporpuan-sistemi')}
                  className="text-slate-800 font-semibold hover:text-blue-600 hover:underline transition block"
                >
                  {isTr ? 'Sporpuan & Sadakat Mimarisi' : 'Sporpuan Loyalty Architecture'}
                </a>
              </li>
              <li>
                <a
                  href="#paket-karsilastirma"
                  onClick={(e) => navigateToHashView(e, 'pricing_comparison', '#paket-karsilastirma')}
                  className="text-blue-600 font-semibold hover:underline transition block"
                >
                  {isTr ? 'Paket & Modül Karşılaştırması' : 'Plan & Module Comparison'}
                </a>
              </li>
            </ul>
          </nav>

          {/* Col 3: Kaynaklar & Rehberler / Resources (3 cols) */}
          <nav
            aria-label={isTr ? 'Kaynaklar ve Blog Kategorileri' : 'Resources and Blog Categories'}
            className="lg:col-span-3 space-y-3"
          >
            <h4 className="text-slate-900 font-bold text-sm tracking-tight">
              {isTr ? 'Kaynaklar & Rehberler' : 'Resources & Guides'}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#blog"
                  onClick={(e) => navigateToHashView(e, 'blog', '#blog')}
                  className="text-blue-600 font-semibold hover:underline transition inline-flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{isTr ? 'Akademi Blogu & Tüm Rehberler' : 'Academy Blog & All Guides'}</span>
                </a>
              </li>
              {resourceCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={cat.href}
                    onClick={(e) => navigateToHashView(e, 'blog', cat.href)}
                    className="hover:text-blue-600 hover:underline transition block"
                  >
                    {cat.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Çözümler & Branşlar (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-slate-900 font-bold text-sm tracking-tight">
              {t.footerBranchesTitle}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi"
                  onClick={(e) =>
                    navigateToHashView(
                      e,
                      'blog',
                      '#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi'
                    )
                  }
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerBranchBasketball}
                </a>
              </li>
              <li>
                <a
                  href="#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi"
                  onClick={(e) =>
                    navigateToHashView(
                      e,
                      'blog',
                      '#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi'
                    )
                  }
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerBranchVolleyball}
                </a>
              </li>
              <li>
                <a
                  href="#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi"
                  onClick={(e) =>
                    navigateToHashView(
                      e,
                      'blog',
                      '#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi'
                    )
                  }
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerBranchSwimming}
                </a>
              </li>
              <li>
                <a
                  href="#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi"
                  onClick={(e) =>
                    navigateToHashView(
                      e,
                      'blog',
                      '#blog-basketboldan-yuzmeye-farkli-branslar-icin-spor-yazilimi'
                    )
                  }
                  className="hover:text-blue-600 hover:underline transition block"
                >
                  {t.footerBranchFootball}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenDemoModal}
                  className="text-blue-600 font-bold hover:underline transition pt-1 block text-left"
                >
                  {t.footerRequestDemo}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: İletişim (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-slate-900 font-bold text-sm tracking-tight">
              {t.footerContactTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <a href="tel:02168501907" className="hover:text-blue-600 transition font-semibold">
                  0216 850 19 07
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={triggerLiveSupportModal}
                  className="inline-flex items-center gap-1.5 text-blue-600 font-bold hover:text-blue-700 hover:underline transition text-left cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>
                    {isTr ? '7/24 Destek Merkezi' : '24/7 Support Center'}
                  </span>
                </button>
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


        {/* Bottom Copyright & Legal */}
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
