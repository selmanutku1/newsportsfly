import React, { useState } from 'react';
import {
  Award,
  Zap,
  Target,
  Activity,
  Brain,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Ruler,
  Coins,
  ChevronRight,
  Flame,
  Star,
  Layers,
  HeartHandshake,
  TrendingUp,
  FileCheck,
  Calendar,
  Users,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ActiveView } from '../types';
import { SportsFlyLogo } from './SportsFlyLogo';
import { TrFlag, EnFlag } from './Navbar';
import heroShowcaseImg from '../assets/images/sporpuan_hero_showcase_1790200431577.jpg';

interface SporpuanSystemPageProps {
  onBackToSite: () => void;
  onOpenDemoModal: () => void;
  onNavigateView: (view: ActiveView) => void;
}

export const SporpuanSystemPage: React.FC<SporpuanSystemPageProps> = ({
  onBackToSite,
  onOpenDemoModal,
  onNavigateView,
}) => {
  const { language, setLanguage } = useLanguage();
  const isTr = language === 'tr';

  // Interactive Simulator State
  const [selectedSport, setSelectedSport] = useState<'basket' | 'football' | 'voley' | 'swim'>('basket');
  const [attendanceCount, setAttendanceCount] = useState<number>(14);
  const [streakMultiplier] = useState<number>(1.5);
  const [techScore, setTechScore] = useState<number>(88);
  const [physScore, setPhysScore] = useState<number>(84);
  const [tactScore, setTactScore] = useState<number>(82);
  const [mentalScore, setMentalScore] = useState<number>(90);
  const [behaviorScore, setBehaviorScore] = useState<number>(95);

  // Computed Sporpuan & General Report Score
  const basePointsPerSession = 25;
  const streakBonus = Math.round(attendanceCount * basePointsPerSession * (streakMultiplier - 1));
  const behaviorBonus = Math.round((behaviorScore / 100) * 150);
  const totalSporpuan = attendanceCount * basePointsPerSession + streakBonus + behaviorBonus;

  const generalReportScore = Math.round(
    techScore * 0.25 + physScore * 0.2 + tactScore * 0.2 + mentalScore * 0.15 + behaviorScore * 0.2
  );

  // Badge list with unlock logic based on simulator scores
  const badges = [
    {
      id: 'iron_streak',
      title: isTr ? 'Demir Devamlılık' : 'Iron Streak',
      desc: isTr ? '10+ kesintisiz antrenmana katılım serisi' : '10+ consecutive practice sessions attended',
      icon: Flame,
      color: 'from-amber-500 to-orange-500',
      unlocked: attendanceCount >= 10,
      req: isTr ? '10+ Seans' : '10+ Sessions',
    },
    {
      id: 'fair_play',
      title: isTr ? 'Fair-Play & Karakter' : 'Fair-Play & Character',
      desc: isTr ? 'Koç ve takım arkadaşlarına kusursuz saygı' : 'Exemplary sportsmanship and team respect',
      icon: HeartHandshake,
      color: 'from-emerald-500 to-teal-500',
      unlocked: behaviorScore >= 90,
      req: isTr ? 'Davranış ≥ 90' : 'Behavior ≥ 90',
    },
    {
      id: 'tactical_mind',
      title: isTr ? 'Saha Komutanı' : 'Court Commander',
      desc: isTr ? 'Taktiksel olgunluk ve topsuz oyun zekası' : 'Tactical acumen and off-ball court vision',
      icon: Brain,
      color: 'from-blue-500 to-indigo-500',
      unlocked: tactScore >= 80,
      req: isTr ? 'Taktik ≥ 80' : 'Tactics ≥ 80',
    },
    {
      id: 'mvp_beast',
      title: isTr ? 'Dönem Yıldızı (MVP)' : 'Term MVP',
      desc: isTr ? 'Genel karne notu 85 üzeri elit performans' : 'Overall report grade exceeding 85',
      icon: Trophy,
      color: 'from-yellow-400 to-amber-600',
      unlocked: generalReportScore >= 85,
      req: isTr ? 'Karne ≥ 85' : 'Report ≥ 85',
    },
  ];

  // Radar points calculation for 5 axes
  const radarAxes = [
    { label: isTr ? 'Teknik' : 'Technical', value: techScore, angle: -90 },
    { label: isTr ? 'Fiziksel' : 'Physical', value: physScore, angle: -18 },
    { label: isTr ? 'Taktik' : 'Tactics', value: tactScore, angle: 54 },
    { label: isTr ? 'Zihinsel' : 'Mental', value: mentalScore, angle: 126 },
    { label: isTr ? 'Davranış' : 'Behavior', value: behaviorScore, angle: 198 },
  ];

  const center = 120;
  const radius = 80;

  const getCoordinates = (value: number, angleDegrees: number) => {
    const angleRad = (angleDegrees * Math.PI) / 180;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angleRad);
    const y = center + r * Math.sin(angleRad);
    return { x, y };
  };

  const polygonPoints = radarAxes
    .map((axis) => {
      const { x, y } = getCoordinates(axis.value, axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const gridCircles = [0.25, 0.5, 0.75, 1.0];

  // 8 Core Pillars
  const pillars = [
    {
      id: 'tech',
      num: '01',
      title: isTr ? 'Teknik Gelişim' : 'Technical Skill Growth',
      category: isTr ? 'Temel Beceriler' : 'Fundamentals',
      icon: Target,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      summary: isTr
        ? 'Basketbolda şut/pas, futbolda top kontrolü/çalım, yüzmede kulaç mekaniği gibi branşa özel mikro tekniklerin düzenli ölçümü.'
        : 'Discipline-specific fundamental mastery: shooting, ball control, passing accuracy, and stroke mechanics.',
      details: [
        isTr ? '14+ olimpik ve altyapı branşına özel dinamik rubrik havuzu' : 'Rubrics tailored to 14+ sporting disciplines',
        isTr ? 'Önceki dönemle anlık karşılaştırmalı gelişim eğrisi' : 'Comparative term-over-term growth trajectories',
        isTr ? 'Teknik zayıflıkları avantaja dönüştüren antrenör tavsiyeleri' : 'Actionable coach tips targeting skill gaps',
      ],
    },
    {
      id: 'phys',
      num: '02',
      title: isTr ? 'Fiziksel Yetkinlik' : 'Physical Conditioning',
      category: isTr ? 'Atletizm & Kondisyon' : 'Athleticism & Fitness',
      icon: Activity,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      summary: isTr
        ? 'Sporcunun aerobik dayanıklılığı, çabukluğu, patlayıcı sıçrama gücü, esnekliği ve sahada sergilediği dinamik atletizm.'
        : 'Aerobic stamina, agility, explosive power, vertical leap, and foundational physical resilience.',
      details: [
        isTr ? 'Branşın tempo ve efor ihtiyaçlarına uyumlu kondisyon skalası' : 'Sport-tailored stamina and sprint indices',
        isTr ? 'Sakatlık riskini minimize eden dayanıklılık takibi' : 'Fatigue and load metrics to reduce injury risks',
        isTr ? 'Evde yapılabilecek ek gelişim egzersizi önerileri' : 'Home workout supplement recommendations',
      ],
    },
    {
      id: 'tact',
      num: '03',
      title: isTr ? 'Taktiksel Zeka' : 'Tactical Acumen',
      category: isTr ? 'Oyun Okuma' : 'Game Intelligence',
      icon: Brain,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      summary: isTr
        ? 'Oyun kurma becerisi, saha içi pozisyon alma, topsuz alan koşuları ve hücumdan savunmaya geçiş reaksiyon hızı.'
        : 'Spatial positioning, anticipation, court awareness, transition defense, and off-ball movement.',
      details: [
        isTr ? 'Takım disiplini ve sistem içi rol farkındalığı' : 'Role execution within team set pieces',
        isTr ? 'Baskı anında doğru pas/şut karar verme süresi' : 'Decision-making latency under active pressure',
        isTr ? 'Maç videosu veya saha içi simülasyon uyumu' : 'Translation of practice drills into live games',
      ],
    },
    {
      id: 'mental',
      num: '04',
      title: isTr ? 'Zihinsel & Karakter' : 'Mental Toughness & Character',
      category: isTr ? 'Psikolojik Güç' : 'Mental Resilience',
      icon: ShieldCheck,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      summary: isTr
        ? 'Maç içi motivasyonun korunması, skor gerideyken pes etmeme azmi, hata sonrası toparlanma ve konsantrasyon.'
        : 'Focus duration, bouncing back after missed plays, composure when trailing, and inner self-belief.',
      details: [
        isTr ? 'Baskı ve seyirci karşısında sakin kalabilme skoru' : 'Poise under crowd pressure and high stakes',
        isTr ? 'Gelişime açık zihniyet (growth mindset) göstergeleri' : 'Indicators of coachability and growth mindset',
        isTr ? 'Spor psikolojisi temelli yapıcı koç geri bildirimleri' : 'Psychologically grounded feedback phrasing',
      ],
    },
    {
      id: 'behavior',
      num: '05',
      title: isTr ? 'Davranış & Periyot' : 'Behavior & Term Consistency',
      category: isTr ? 'Disiplin & Saygı' : 'Discipline & Regularity',
      icon: Calendar,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      summary: isTr
        ? 'Antrenmana vaktinde gelme, spor çantası hazırlığı, antrenör ve arkadaşlarına saygı, dönem boyu katılım istikrarı.'
        : 'Punctuality, gear preparedness, peer respect, fair-play, and unyielding term attendance.',
      details: [
        isTr ? 'Her zamanında katılım için anında +25 Sporpuan' : 'Instant +25 SP for every on-time arrival',
        isTr ? 'Gelmeyen veya mazeretli sporcular için net kayıt' : 'Automated excused vs unexcused tracking',
        isTr ? 'Kulüp tüzüğüne ve spor ahlakına tam uyumluluk' : 'Alignment with club values and ethical play',
      ],
    },
    {
      id: 'badges',
      num: '06',
      title: isTr ? 'Başarı Rozetleri' : 'Digital Achievement Badges',
      category: isTr ? 'Oyunlaştırma (Gamification)' : 'Gamification',
      icon: Trophy,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      summary: isTr
        ? 'Çocukların somut başarılara ulaşmasını sağlayan koleksiyonluk rozetler: Fair-Play, Demir Adam, Dönem Lideri, vb.'
        : 'Collectible prestige badges that turn dedication into proud milestone badges displayed in the parent portal.',
      details: [
        isTr ? 'Sporcunun veli portalında gururla sergilenen rozet vitrini' : 'Interactive badge showcase in parent app',
        isTr ? 'Antrenör tarafından tek tıkla özel tebrik rozeti takdimi' : 'One-tap custom coach commendations',
        isTr ? 'Sosyal medyada paylaşılabilir yüksek çözünürlüklü dijital sertifikalar' : 'Shareable high-res digital certificates',
      ],
    },
    {
      id: 'measurements',
      num: '07',
      title: isTr ? 'Fiziki Ölçüm & Not' : 'Anthropometry & Coach Letter',
      category: isTr ? 'Veri Tabanlı Takip' : 'Anthropometric Audit',
      icon: Ruler,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      summary: isTr
        ? 'Dönem başı ve sonu boy, kilo, kanat açıklığı, sıçrama testleri ve başantrenörün kaleme aldığı şahsi değerlendirme mektubu.'
        : 'Term benchmark anthropometrics (height, wingspan, vertical leap) coupled with the head coach personal letter.',
      details: [
        isTr ? 'Yaş kategorisine göre gelişim yüzdelik (persentil) verileri' : 'Percentile growth curves mapped by age cohort',
        isTr ? 'Başantrenörün imzalı samimi ve motive edici mektubu' : 'Signed personalized head coach narrative letter',
        isTr ? 'Resmi PDF çıktısı ve QR kodlu doğrulama mührü' : 'Formal PDF download with QR credential seal',
      ],
    },
    {
      id: 'sporpuan',
      num: '08',
      title: isTr ? 'Sporpuan (SP) Ekosistemi' : 'Sporpuan (SP) Economy',
      category: isTr ? 'Kulüp Sadakati & Ödül' : 'Loyalty Rewards Engine',
      icon: Coins,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      summary: isTr
        ? 'SportsFly’ın tescilli sadakat motoru: Kazanılan puanlar kulüp mağazasında forma, antrenman topu veya kampa dönüşür.'
        : 'The proprietary reward currency: SP converted directly into official club jerseys, balls, and clinic tickets.',
      details: [
        isTr ? 'Devam serileriyle 1.5x ve 2x çarpan desteği' : 'Streak multipliers: 1.5x to 2x point boosts',
        isTr ? 'Kulübün kendi sponsor ve ekipmanlarını yükleyebileceği katalog' : 'Flexible club merchandise catalog management',
        isTr ? 'Aidat tahsilatını hızlandıran sadakat teşvikleri' : 'Proven driver of on-time membership fee payments',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 flex flex-col">
      {/* Sleek, Brand-Consistent Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <div
            onClick={onBackToSite}
            className="cursor-pointer flex items-center select-none"
            title={isTr ? 'SportsFly Ana Sayfa' : 'SportsFly Home'}
          >
            <SportsFlyLogo
              size="sm"
              iconClassName="w-7 h-7 sm:w-8 sm:h-8"
              textClassName="text-base sm:text-xl font-black"
              lightMode={true}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200/80">
              <button
                onClick={() => setLanguage('tr')}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'tr' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Türkçe"
              >
                <TrFlag className="w-3.5 h-2.5" />
                <span className="text-[10px] sm:text-xs">TR</span>
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  language === 'en' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="English"
              >
                <EnFlag className="w-3.5 h-2.5" />
                <span className="text-[10px] sm:text-xs">EN</span>
              </button>
            </div>

            {/* Demo CTA */}
            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-1 text-xs sm:text-xs font-black text-slate-950 bg-[#bbf246] hover:bg-[#a3e635] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition shadow-xs active:scale-98 shrink-0"
            >
              <span>{isTr ? 'Demo Planla' : 'Book Demo'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-10 sm:space-y-20 pb-16">
        {/* HERO SECTION */}
        <section className="relative pt-6 sm:pt-14 md:pt-18 overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6 sm:space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>{isTr ? 'Sporpuan & Sporcu Karnesi Mimarisi' : 'Sporpuan & Athlete Report Ecosystem'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                {isTr ? (
                  <>
                    Sporcuları Motive Eden Puanlar, <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Resmi Sporcu Karnesini Oluşturur
                    </span>
                  </>
                ) : (
                  <>
                    Points That Motivate Athletes, <br />
                    <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Powering 360° Athlete Reports
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {isTr
                  ? 'Sporpuan, SportsFly’a özel hibrit bir sadakat ve gelişim motorudur. Antrenörlerin profesyonel gözlemleri ve devamlılık puanları doğrudan sporcunun resmi gelişim karnesini meydana getirir; veli memnuniyeti ve aidiyet zirveye çıkar.'
                  : 'Sporpuan is SportsFly’s proprietary loyalty and performance intelligence suite. Coach rubric observations and attendance streaks synthesize into certified digital athlete report cards that parents cherish.'}
              </p>

              {/* Key Trust Signals */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {isTr ? '%70 Devamsızlık Azalması' : '70% Attendance Drop Reduction'}
                </span>
                <span aria-hidden="true" className="hidden sm:inline text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {isTr ? '%98 Veli Memnuniyeti' : '98% Parent Satisfaction'}
                </span>
                <span aria-hidden="true" className="hidden sm:inline text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {isTr ? 'Antrenör Başına Haftalık 4 Saat Tasarruf' : '4h Saved Weekly per Coach'}
                </span>
              </div>
            </div>

            {/* Showcase Visual Banner */}
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl bg-slate-900 group">
              <img
                src={heroShowcaseImg}
                alt={isTr ? 'Sporpuan ve Sporcu Karnesi Ekosistemi' : 'Sporpuan and Athlete Report Card Showcase'}
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[420px] md:h-[480px] object-cover object-center group-hover:scale-102 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
                <div className="max-w-xl space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md inline-block">
                    {isTr ? 'SportsFly Özel İnovasyonu' : 'SportsFly Exclusive Innovation'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {isTr
                      ? 'Soyut Sözler Değil, Somut Gelişim ve Ödül'
                      : 'Not Vague Promises, Tangible Growth & Real Rewards'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {isTr
                      ? 'Antrenmana her katılım Sporpuan kazandırır; antrenörün girdiği teknik, fiziksel, taktik ve zihinsel değerlendirmeler karneye yansır.'
                      : 'Every practice attended yields Sporpuan points; coach assessments across technical, physical, tactical, and mental dimensions power the final report.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HOW SPORPUAN POWERS THE ATHLETE REPORT CARD */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                {isTr ? 'Sistem Nasıl İşliyor?' : 'How the Engine Works'}
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                {isTr ? (
                  <>
                    Yoklamadan Karnaye: <br />
                    <span className="text-emerald-600">Tek Bir Akıcı Döngü</span>
                  </>
                ) : (
                  <>
                    From Attendance to Report: <br />
                    <span className="text-emerald-600">One Seamless Cycle</span>
                  </>
                )}
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                {isTr
                  ? 'Geleneksel kulüplerde karne hazırlamak haftalar süren bir kağıt çilesidir. SportsFly’da ise antrenör yoklamayı aldığı an Sporpuan motoru devreye girer. Dönem boyunca yapılan periyodik gözlemler otomatik olarak 360° radar karnesine dönüşür.'
                  : 'Traditional academies scramble through manual paperwork at term ends. In SportsFly, taking roll call instantly activates the Sporpuan engine. Periodic assessments seamlessly build the verified 360° radar report.'}
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  {
                    step: '1',
                    title: isTr ? '15 Saniyede Mobil Yoklama & Puan Yükleme' : '15-Second Mobile Attendance & Point Accrual',
                    desc: isTr
                      ? 'Antrenör cep telefonundan tek tıkla yoklamayı alır, katılan sporculara +25 SP ve seri bonusları anında yansır.'
                      : 'Coaches submit roll call in 15 seconds; athletes instantly receive +25 SP and streak multipliers.',
                  },
                  {
                    step: '2',
                    title: isTr ? 'Antrenörün Profesyonel Rubrik Notları' : 'Professional Coach Rubric Grading',
                    desc: isTr
                      ? 'Teknik, fiziksel, taktik, zihinsel ve davranış ölçütleri antrenör tarafından 1-100 normlarına göre puanlanır.'
                      : 'Technical, physical, tactical, mental, and behavioral rubrics scored against age-appropriate benchmarks.',
                  },
                  {
                    step: '3',
                    title: isTr ? 'Otomatik Sporcu Karnesi & Veli WhatsApp Bildirimi' : 'Automated Report Dispatch via WhatsApp',
                    desc: isTr
                      ? 'Karne hazırlandığında veliye push bildirim ve SMS/WhatsApp üzerinden doğrulanabilir bağlantı gider.'
                      : 'Once finalized, parents receive push notices and direct encrypted WhatsApp links to inspect the report.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Interactive Simulator */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      {isTr ? 'İnteraktif Simülatör' : 'Interactive Sandbox'}
                    </span>
                    <h3 className="text-lg font-bold text-slate-950 mt-1">
                      {isTr ? 'Canlı Karne & Sporpuan Motoru' : 'Live Report & Sporpuan Simulator'}
                    </h3>
                  </div>

                  {/* Sport Selector */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                    {[
                      { id: 'basket', label: isTr ? 'Basketbol' : 'Basketball' },
                      { id: 'football', label: isTr ? 'Futbol' : 'Football' },
                      { id: 'voley', label: isTr ? 'Voleybol' : 'Volleyball' },
                      { id: 'swim', label: isTr ? 'Yüzme' : 'Swimming' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedSport(s.id as any)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                          selectedSport === s.id
                            ? 'bg-white text-slate-950 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulator Controls & Radar View Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Sliders: Coach Observation Inputs */}
                  <div className="md:col-span-6 space-y-3.5">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{isTr ? 'Antrenman Katılımı' : 'Session Attendance'}:</span>
                        <span className="text-emerald-700 font-bold tabular-nums">{attendanceCount} / 16 Seans</span>
                      </div>
                      <input
                        type="range"
                        min="4"
                        max="16"
                        value={attendanceCount}
                        onChange={(e) => setAttendanceCount(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{isTr ? 'Teknik Gelişim' : 'Technical Skill'}:</span>
                        <span className="text-blue-700 font-bold tabular-nums">{techScore}/100</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={techScore}
                        onChange={(e) => setTechScore(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{isTr ? 'Fiziksel Yetkinlik' : 'Physical Fitness'}:</span>
                        <span className="text-emerald-700 font-bold tabular-nums">{physScore}/100</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={physScore}
                        onChange={(e) => setPhysScore(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{isTr ? 'Taktiksel Zeka' : 'Tactical Acumen'}:</span>
                        <span className="text-indigo-700 font-bold tabular-nums">{tactScore}/100</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={tactScore}
                        onChange={(e) => setTactScore(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{isTr ? 'Zihinsel & Karakter' : 'Mental Toughness'}:</span>
                        <span className="text-purple-700 font-bold tabular-nums">{mentalScore}/100</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={mentalScore}
                        onChange={(e) => setMentalScore(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                        <span>{isTr ? 'Davranış & Fair-Play' : 'Behavior & Discipline'}:</span>
                        <span className="text-amber-700 font-bold tabular-nums">{behaviorScore}/100</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={behaviorScore}
                        onChange={(e) => setBehaviorScore(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                  </div>

                  {/* Radar Polygon Display & Output */}
                  <div className="md:col-span-6 flex flex-col items-center justify-center p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-[11px] font-bold text-slate-600 mb-1 uppercase tracking-wider">
                      {isTr ? '360° Yetenek Radarı' : '360° Skill Radar'}
                    </span>

                    <svg className="w-52 h-52 overflow-visible" viewBox="0 0 240 240">
                      {/* Grid concentric polygons */}
                      {gridCircles.map((level, idx) => {
                        const levelPoints = radarAxes
                          .map((axis) => {
                            const { x, y } = getCoordinates(100 * level, axis.angle);
                            return `${x},${y}`;
                          })
                          .join(' ');
                        return (
                          <polygon
                            key={idx}
                            points={levelPoints}
                            fill="none"
                            stroke="#cbd5e1"
                            strokeDasharray={idx === 3 ? '0' : '2,2'}
                            strokeWidth={idx === 3 ? '1.5' : '1'}
                          />
                        );
                      })}

                      {/* Axis Lines */}
                      {radarAxes.map((axis, idx) => {
                        const { x, y } = getCoordinates(100, axis.angle);
                        return (
                          <line
                            key={idx}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="#cbd5e1"
                            strokeWidth="1"
                          />
                        );
                      })}

                      {/* Active Skill Area */}
                      <polygon
                        points={polygonPoints}
                        fill="rgba(16, 185, 129, 0.28)"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        className="transition-all duration-300"
                      />

                      {/* Axis Labels */}
                      {radarAxes.map((axis, idx) => {
                        const { x, y } = getCoordinates(120, axis.angle);
                        return (
                          <text
                            key={idx}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-[10px] font-bold fill-slate-700"
                          >
                            {axis.label}
                          </text>
                        );
                      })}
                    </svg>

                    {/* Report Output Badges */}
                    <div className="w-full mt-2 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">{isTr ? 'Karne Notu' : 'Report Grade'}</span>
                        <div className="text-xl font-black text-slate-900 tabular-nums">
                          {generalReportScore}<span className="text-xs text-slate-400 font-normal">/100</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">{isTr ? 'Kazanılan Sporpuan' : 'Sporpuan (SP)'}</span>
                        <div className="text-xl font-black text-amber-600 flex items-center justify-end gap-1 tabular-nums">
                          <Coins className="w-4 h-4 text-amber-500" />
                          <span>{totalSporpuan} SP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Badges Result Bar */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-slate-50 to-amber-50 border border-emerald-200/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-1.5">
                      {badges.filter((b) => b.unlocked).map((badge) => {
                        const BadgeIcon = badge.icon;
                        return (
                          <div
                            key={badge.id}
                            title={`${badge.title} (${badge.req})`}
                            className={`w-8 h-8 rounded-full bg-gradient-to-br ${badge.color} text-white flex items-center justify-center shadow-xs ring-2 ring-white`}
                          >
                            <BadgeIcon className="w-4 h-4" />
                          </div>
                        );
                      })}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {isTr
                        ? `${badges.filter((b) => b.unlocked).length} Başarı Rozeti Otomatik Açıldı`
                        : `${badges.filter((b) => b.unlocked).length} Badges Auto-Unlocked`}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">
                    {isTr ? 'Canlı Karneye İşlendi' : 'Synced to Report'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE 8 CORE PILLARS OF SPORPUAN & REPORT CARDS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              {isTr ? 'Kapsamlı Değerlendirme Çatısı' : 'Comprehensive Evaluation Framework'}
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {isTr ? 'Sporpuan Ekosisteminin 8 Temel Boyutu' : 'The 8 Fundamental Pillars of Sporpuan'}
            </h2>

            <p className="text-xs sm:text-base text-slate-600 leading-relaxed">
              {isTr
                ? 'Sporcu gelişimini yalnızca antrenman skoruna indirgemeyen, karakterden fiziki ölçümlere kadar 360 derece haritalandıran tescilli model.'
                : 'A holistic framework mapping athletic, mental, behavioral, and anthropometric evolution rather than isolated game scores.'}
            </p>
          </div>

          {/* 8 Pillar Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar) => {
              const IconComponent = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold ${pillar.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-600 transition">
                        {pillar.num}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                        {pillar.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5 group-hover:text-emerald-700 transition">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {pillar.summary}
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      {pillar.details.map((point, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: REAL EXPERIENCES / WHY IT TRANSFORMS ACADEMIES */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {isTr ? 'Kulüplere Kanıtlanmış Faydaları' : 'Proven Impact on Sports Academies'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              {isTr ? 'Neden Veliler ve Antrenörler Bayılıyor?' : 'Why Coaches & Parents Love It'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: isTr ? 'Veli Bağlılığı ve Şeffaflık' : 'Parent Trust & Retention',
                desc: isTr
                  ? 'Veliler çocuklarının yalnızca antrenmana gidip geldiğini değil, adım adım teknik ve fiziki olarak nasıl olgunlaştığını görür. Aidat ödemelerini gönülden ve zamanında yapar.'
                  : 'Parents witness empirical evidence of technical and physical maturity. Tuition payments are completed willingly and promptly without reminders.',
              },
              {
                icon: Flame,
                title: isTr ? 'Çocuklarda İçsel Motivasyon' : 'Intrinsic Youth Motivation',
                desc: isTr
                  ? 'Sabah antrenmanına uyanmakta zorlanan sporcular, Sporpuan biriktirmek ve sezon sonu kulüp formasını kazanmak için erkenden sahada hazır olur.'
                  : 'Athletes take personal ownership of practice attendance to earn streak bonuses and unlock official club rewards.',
              },
              {
                icon: FileCheck,
                title: isTr ? 'Antrenörün Otoritesi & Prestiji' : 'Coach Credibility & Professionalism',
                desc: isTr
                  ? 'Gelişigüzel sözlü geri bildirimler yerine profesyonel radar analizleri sunan eğitmenler kulübün kurumsal marka değerini zirveye taşır.'
                  : 'Coaches replace informal verbal summaries with data-backed rubric scorecards, elevating club prestige in the community.',
              },
            ].map((card, i) => {
              const CardIcon = card.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                    <CardIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA: IMPLEMENT IN YOUR CLUB */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 backdrop-blur-md inline-block">
                {isTr ? '14 Gün Ücretsiz Deneme' : '14-Day Free Club Trial'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isTr
                  ? 'Sporpuan Sistemini Kulübünüzde 10 Dakikada Başlatın'
                  : 'Launch the Sporpuan Engine in Your Club in 10 Minutes'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                {isTr
                  ? 'Kredi kartı gerekmez. Mevcut sporcu listenizi Excel veya CSV ile 3 dakikada aktarın; ilk antrenmanda velilerinize farkı hissettirin.'
                  : 'No credit card required. Import your roster in 3 minutes and showcase next-gen player reports at your very next practice.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-7 py-4 bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition shadow-lg flex items-center justify-center gap-2"
              >
                <span>{isTr ? 'Ücretsiz Canlı Demo Rezervasyonu' : 'Book a Live Walkthrough'}</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
