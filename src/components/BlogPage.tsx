import React, { useState, useMemo, useEffect } from 'react';
import { ActiveView, BlogPost } from '../types';
import { BLOG_POSTS, BLOG_SEO_CONFIG, AUTHOR_SELMAN } from '../data/blogData';
import { useLanguage } from '../context/LanguageContext';
import { SportsFlyLogo } from './SportsFlyLogo';
import { setPageSeo, buildArticleJsonLd, buildBlogHubJsonLd } from '../utils/seoHelper';
import {
  Search,
  Clock,
  Calendar,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ArrowRight,
  Tag,
  ChevronRight,
  ShieldCheck,
  Check,
  Layers,
  PhoneCall,
  Link2,
  Linkedin,
  UserCheck,
} from 'lucide-react';

interface BlogPageProps {
  onNavigateView: (view: ActiveView) => void;
  onOpenDemoModal: () => void;
}

// Resilient Author Avatar with automatic fallback
const AuthorAvatar: React.FC<{
  src?: string;
  alt?: string;
  className?: string;
}> = ({ src, alt = 'Selman UTKU', className = 'w-10 h-10' }) => {
  const [imgSrc, setImgSrc] = useState<string>(src || '/selman-utku.png');
  const fallback =
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

  useEffect(() => {
    if (src) setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
      className={`rounded-full object-cover object-center ${className}`}
    />
  );
};

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigateView,
  onOpenDemoModal,
}) => {
  const { language, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCanonical, setCopiedCanonical] = useState(false);

  // Parse initial hash or slug on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const parseHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#blog-')) {
        const slug = hash.replace('#blog-', '');
        const match = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
        if (match) {
          setActiveArticle(match);
        }
      } else if (hash === '#blog' || hash.startsWith('#blog?')) {
        setActiveArticle(null);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Update dynamic SEO & Hash on active article or language changes
  useEffect(() => {
    if (activeArticle) {
      const articleTitle = activeArticle.seo?.metaTitle[language] || activeArticle.title[language];
      const articleDesc = activeArticle.seo?.metaDescription[language] || activeArticle.excerpt[language];
      const canonicalUrl = `https://sportsfly.app/blog/${activeArticle.slug}`;

      if (window.location.hash !== `#blog-${activeArticle.slug}`) {
        window.history.replaceState(null, '', `#blog-${activeArticle.slug}`);
      }

      setPageSeo({
        title: articleTitle,
        description: articleDesc,
        keywords: activeArticle.seo?.focusKeywords || activeArticle.tags,
        canonicalUrl: canonicalUrl,
        ogType: 'article',
        publishedTime: activeArticle.publishedAt,
        authorName: activeArticle.author.name,
        jsonLd: buildArticleJsonLd(activeArticle, language),
      });
    } else {
      const hubConfig = BLOG_SEO_CONFIG.hub;
      const hubTitle =
        selectedCategory !== 'all' && BLOG_SEO_CONFIG.categories[selectedCategory]
          ? BLOG_SEO_CONFIG.categories[selectedCategory].title[language]
          : hubConfig.title[language];
      const hubDesc =
        selectedCategory !== 'all' && BLOG_SEO_CONFIG.categories[selectedCategory]
          ? BLOG_SEO_CONFIG.categories[selectedCategory].description[language]
          : hubConfig.description[language];
      const hubKeywords =
        selectedCategory !== 'all' && BLOG_SEO_CONFIG.categories[selectedCategory]
          ? BLOG_SEO_CONFIG.categories[selectedCategory].keywords
          : hubConfig.keywords;

      if (window.location.hash !== '#blog') {
        window.history.replaceState(null, '', '#blog');
      }

      setPageSeo({
        title: hubTitle,
        description: hubDesc,
        keywords: hubKeywords,
        canonicalUrl: hubConfig.canonicalUrl,
        ogType: 'website',
        authorName: 'Selman UTKU',
        jsonLd: buildBlogHubJsonLd(BLOG_POSTS, language),
      });
    }
  }, [activeArticle, language, selectedCategory]);

  // Categories list
  const categories = useMemo(() => {
    return [
      { id: 'all', label: language === 'tr' ? 'Tümü' : 'All' },
      { id: 'otomasyon', label: language === 'tr' ? 'Aidat & Finans' : 'Billing & Finance' },
      { id: 'sporpuan', label: language === 'tr' ? 'Sporpuan & Motivasyon' : 'Sporpuan & Retention' },
      { id: 'karne', label: language === 'tr' ? 'Dijital Karne' : 'Digital Reports' },
      { id: 'yonetim', label: language === 'tr' ? 'Kulüp Yönetimi' : 'Club Operations' },
      { id: 'iletisim', label: language === 'tr' ? 'Veli İletişimi' : 'Parent Experience' },
    ];
  }, [language]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const title = post.title[language].toLowerCase();
      const excerpt = post.excerpt[language].toLowerCase();
      const tags = post.tags.map((t) => t.toLowerCase()).join(' ');
      const query = searchQuery.toLowerCase().trim();

      const matchSearch = !query || title.includes(query) || excerpt.includes(query) || tags.includes(query);
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/#blog-${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCanonical = (slug: string) => {
    const canonical = `https://sportsfly.app/blog/${slug}`;
    navigator.clipboard.writeText(canonical);
    setCopiedCanonical(true);
    setTimeout(() => setCopiedCanonical(false), 2500);
  };

  const handleShareWhatsApp = (title: string, slug: string) => {
    const url = `${window.location.origin}/#blog-${slug}`;
    const text = encodeURIComponent(`${title} - SportsFly Blog: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareTwitter = (title: string, slug: string) => {
    const url = `${window.location.origin}/#blog-${slug}`;
    const text = encodeURIComponent(`${title} @sportsflyapp`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareLinkedIn = (slug: string) => {
    const url = encodeURIComponent(`https://sportsfly.app/#blog-${slug}`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  // If viewing a single article in detail
  if (activeArticle) {
    const articleData = activeArticle.content[language];
    const relatedArticles = BLOG_POSTS.filter((p) => p.id !== activeArticle.id).slice(0, 3);
    const canonicalUrl = `https://sportsfly.app/blog/${activeArticle.slug}`;

    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveArticle(null);
                window.location.hash = 'blog';
              }}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 transition group p-1 -ml-1"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-slate-500 group-hover:text-blue-600" />
              <span>{language === 'tr' ? 'Makaleler' : 'Articles'}</span>
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                {language === 'tr' ? 'EN' : 'TR'}
              </button>
              <button
                onClick={onOpenDemoModal}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition"
              >
                {language === 'tr' ? 'Demo İsteyin' : 'Request Demo'}
              </button>
            </div>
          </div>
        </header>

        {/* Minimal Breadcrumb */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-3.5 sm:px-6 py-2.5">
            <nav className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                onClick={() => {
                  setActiveArticle(null);
                  window.location.hash = 'blog';
                }}
                className="hover:text-blue-600 transition font-medium"
              >
                {language === 'tr' ? 'Blog' : 'Blog'}
              </button>
              <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
              <span className="text-slate-700 font-semibold">{activeArticle.categoryLabel[language]}</span>
              <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
              <span className="text-slate-400 truncate max-w-[180px] sm:max-w-xs">{activeArticle.title[language]}</span>
            </nav>
          </div>
        </div>

        {/* Article Reader Body */}
        <main className="flex-1 max-w-4xl mx-auto px-3.5 sm:px-6 py-6 sm:py-8 w-full space-y-6 sm:space-y-8">
          {/* Article Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs">
              <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-md border border-blue-100">
                {activeArticle.categoryLabel[language]}
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                {activeArticle.publishedAt}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <Clock className="w-3 h-3 text-slate-400" />
                {activeArticle.readTime[language]}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
              {activeArticle.title[language]}
            </h1>

            {/* Author Profile & Share Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-slate-200/90 py-3 sm:py-3.5 gap-3">
              <div className="flex items-center gap-2.5">
                <AuthorAvatar
                  src={activeArticle.author.avatar}
                  alt={activeArticle.author.name}
                  className="w-10 h-10 sm:w-11 sm:h-11 border border-slate-200 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{activeArticle.author.name}</span>
                    <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-100">
                      {language === 'tr' ? 'Yazar' : 'Author'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">{activeArticle.author.role[language]}</p>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
                <button
                  onClick={() => handleCopyLink(activeArticle.slug)}
                  title={language === 'tr' ? 'Bağlantıyı Kopyala' : 'Copy Link'}
                  className="px-2.5 py-1.5 text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition text-[11px] font-semibold flex items-center gap-1 shadow-xs whitespace-nowrap"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? (language === 'tr' ? 'Kopyalandı' : 'Copied') : (language === 'tr' ? 'Paylaş' : 'Share')}</span>
                </button>
                <button
                  onClick={() => handleShareWhatsApp(activeArticle.title[language], activeArticle.slug)}
                  className="px-2.5 py-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition text-[11px] font-semibold shadow-xs whitespace-nowrap"
                  title="WhatsApp"
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShareTwitter(activeArticle.title[language], activeArticle.slug)}
                  className="px-2.5 py-1.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/80 rounded-lg transition text-[11px] font-semibold shadow-xs whitespace-nowrap"
                  title="X (Twitter)"
                >
                  X
                </button>
                <button
                  onClick={() => handleShareLinkedIn(activeArticle.slug)}
                  className="p-1.5 text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 rounded-lg transition text-[11px] font-semibold shadow-xs"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Canonical & Permalink Box */}
          <div className="bg-slate-100/70 border border-slate-200/90 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-600 truncate min-w-0">
              <Link2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-slate-700 hidden sm:inline">{language === 'tr' ? 'Kalıcı URL:' : 'Permalink:'}</span>
              <span className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 truncate font-mono text-[10px]">
                {canonicalUrl}
              </span>
            </div>
            <button
              onClick={() => handleCopyCanonical(activeArticle.slug)}
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700 bg-white hover:bg-blue-50 px-2.5 py-1 rounded-md border border-slate-200 transition text-[10px] sm:text-[11px] flex-shrink-0"
            >
              {copiedCanonical ? <Check className="w-3 h-3 text-emerald-600" /> : <Link2 className="w-3 h-3" />}
              <span>{copiedCanonical ? (language === 'tr' ? 'Kopyalandı' : 'Copied') : (language === 'tr' ? 'Kopyala' : 'Copy')}</span>
            </button>
          </div>

          {/* Lead Paragraph */}
          <div className="bg-blue-50/60 border-l-4 border-blue-600 p-3.5 sm:p-4 rounded-r-xl">
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              {articleData.lead}
            </p>
          </div>

          {/* Key Takeaways Box */}
          {articleData.keyTakeaways && articleData.keyTakeaways.length > 0 && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs sm:text-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'tr' ? 'Önemli Çıkarımlar & Veriler' : 'Key Takeaways & Insights'}</span>
              </div>
              <ul className="space-y-1.5">
                {articleData.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Structured Sections */}
          <div className="space-y-4 sm:space-y-6 text-slate-800">
            {articleData.sections.map((section, idx) => (
              <section key={idx} className="space-y-2.5 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                  {section.heading}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {section.body}
                </p>

                {section.quote && (
                  <blockquote className="my-3 border-l-3 border-indigo-500 bg-indigo-50/50 p-3 rounded-r-lg italic text-slate-700 text-xs sm:text-sm font-medium">
                    "{section.quote}"
                  </blockquote>
                )}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="mt-2 space-y-1.5 pl-1">
                    {section.bulletPoints.map((bp, bidx) => (
                      <li key={bidx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Full Author Profile Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <AuthorAvatar
              src={AUTHOR_SELMAN.avatar}
              alt={AUTHOR_SELMAN.name}
              className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-slate-200 shadow-sm flex-shrink-0"
            />
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">{AUTHOR_SELMAN.name}</h3>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-blue-600" />
                  <span>{AUTHOR_SELMAN.role[language]}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {AUTHOR_SELMAN.bio[language]}
              </p>
            </div>
          </div>

          {/* In-article CTA Box */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-lg space-y-3.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-semibold border border-blue-400/30">
              <ShieldCheck className="w-3 h-3" />
              <span>SportsFly Çözüm Ekosistemi</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
              {language === 'tr'
                ? 'Kulübünüzde bu dönüşümü bugün başlatın.'
                : 'Begin this transformation in your sports academy today.'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              {articleData.callToActionText}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-sm flex items-center justify-center gap-2"
              >
                <span>{language === 'tr' ? '15 Dakikalık Canlı Demo İnceleyin' : 'Schedule a 15-Minute Live Demo'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* SEO Focus Keywords & Tags */}
          <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 sm:p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>{language === 'tr' ? 'Konular & Etiketler:' : 'Topics & Tags:'}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {(activeArticle.seo?.focusKeywords || activeArticle.tags).map((keyword, kidx) => (
                <span
                  key={kidx}
                  className="text-[11px] font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles Section */}
          <div className="pt-6 border-t border-slate-200 space-y-3.5">
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              {language === 'tr' ? 'İlginizi Çekebilecek Diğer Rehberler' : 'Related Articles You May Like'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    setActiveArticle(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition cursor-pointer flex flex-col justify-between space-y-2.5 group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {rel.categoryLabel[language]}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug">
                      {rel.title[language]}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>{rel.readTime[language]}</span>
                    <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      {language === 'tr' ? 'Oku' : 'Read'} <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Blog Hub / Landing List View
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-100">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              onClick={() => onNavigateView('marketing')}
              className="cursor-pointer hover:opacity-90 transition active:scale-95"
              title="SportsFly Ana Sayfa"
            >
              <SportsFlyLogo size="md" lightMode={true} />
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 border-l border-slate-200 pl-3">
              {language === 'tr' ? 'Akademi Blogu & Rehberler' : 'Academy Blog & Insights'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="px-2.5 py-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              {language === 'tr' ? 'EN' : 'TR'}
            </button>
            <button
              onClick={onOpenDemoModal}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition"
            >
              {language === 'tr' ? 'Ücretsiz Demo' : 'Free Demo'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Blog Content */}
      <main className="flex-1 max-w-7xl mx-auto px-3.5 sm:px-8 py-6 sm:py-10 w-full space-y-6 sm:space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] sm:text-xs font-bold border border-blue-200">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'tr' ? 'Spor Okulları Yönetim & Büyüme Rehberi' : 'Sports Academy Growth & Operations'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {language === 'tr'
              ? 'Akademinizi Büyütecek Stratejiler & İçgörüler'
              : 'Strategies & Insights to Scale Your Academy'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            {language === 'tr'
              ? 'Aidat tahsilat otomasyonundan Sporpuan devamlılık sistemine, antrenör verimliliğinden dijital sporcu karnelerine dair kanıtlanmış yöntemler.'
              : 'Proven tactics from automated tuition collection to Sporpuan gamification, coach productivity, and 360° digital athlete report cards.'}
          </p>

          {/* Search Bar */}
          <div className="pt-1 max-w-md mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'tr'
                    ? 'Makale veya konu ara (örn: aidat, karne)...'
                    : 'Search articles or topics (e.g. tuition, report)...'
                }
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Featured Post Spotlight (When on 'all' and no search query) */}
        {selectedCategory === 'all' && !searchQuery && featuredPost && (
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-lg relative overflow-hidden">
            <div className="max-w-2xl space-y-3 sm:space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  {language === 'tr' ? 'Öne Çıkan Rehber' : 'Featured Guide'}
                </span>
                <span className="text-[11px] text-blue-200 font-semibold">{featuredPost.coverBadge}</span>
              </div>

              <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {featuredPost.title[language]}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {featuredPost.excerpt[language]}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <AuthorAvatar
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-6 h-6 border border-slate-600"
                  />
                  <span className="font-semibold text-white text-xs">{featuredPost.author.name}</span>
                  <span className="text-slate-400 text-[11px]">({featuredPost.author.role[language]})</span>
                </div>
                <span>•</span>
                <span className="flex items-center gap-1 text-[11px]">
                  <Clock className="w-3 h-3" />
                  {featuredPost.readTime[language]}
                </span>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => {
                    setActiveArticle(featuredPost);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-2"
                >
                  <span>{language === 'tr' ? 'Makalenin Tamamını Oku' : 'Read Full Article'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>
                {language === 'tr' ? 'Tüm Makaleler & İpuçları' : 'All Articles & Insights'} (
                {filteredPosts.length})
              </span>
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 sm:p-12 text-center border border-slate-200 space-y-2.5">
              <Search className="w-7 h-7 text-slate-400 mx-auto" />
              <p className="text-slate-700 font-bold text-xs sm:text-sm">
                {language === 'tr' ? 'Aramanıza uygun makale bulunamadı.' : 'No articles match your search criteria.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                {language === 'tr' ? 'Filtreleri Temizle' : 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  onClick={() => {
                    setActiveArticle(post);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between overflow-hidden group p-4 sm:p-5 space-y-3.5 shadow-xs"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                        {post.categoryLabel[language]}
                      </span>
                      <span className="text-slate-400 flex items-center gap-1 font-medium text-[11px]">
                        <Clock className="w-3 h-3" />
                        {post.readTime[language]}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
                      {post.title[language]}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {post.excerpt[language]}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AuthorAvatar
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-6 h-6 border border-slate-200"
                        />
                        <span className="text-xs font-semibold text-slate-700">{post.author.name}</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                        {language === 'tr' ? 'Oku' : 'Read'}{' '}
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="bg-blue-600 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-md text-center space-y-3">
          <h3 className="text-lg sm:text-2xl font-bold">
            {language === 'tr'
              ? 'Spor Okulunuzu SportsFly ile Geleceğe Taşıyın'
              : 'Elevate Your Sports Academy with SportsFly'}
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            {language === 'tr'
              ? 'Aidat tahsilatlarını otomatikleştirin, Sporpuan ile sporcularınızı motive edin ve dijital sporcu karneleriyle veli memnuniyetini zirveye çıkarın.'
              : 'Automate tuition collection, motivate athletes with Sporpuan rewards, and achieve maximum parent satisfaction with digital report cards.'}
          </p>
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto px-5 py-2.5 bg-white text-blue-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition shadow-xs"
            >
              {language === 'tr' ? 'Ücretsiz Canlı Demo Planlayın' : 'Schedule a Free Live Demo'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} SportsFly Inc.</span>
            <span>•</span>
            <span className="text-slate-400">Akademi Blogu</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-slate-600">
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              0216 850 1907
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};
