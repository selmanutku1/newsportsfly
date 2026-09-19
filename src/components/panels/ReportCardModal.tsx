import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReportCard, Athlete } from '../../types';
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  Share2,
  TrendingUp,
  X,
  Zap,
  QrCode,
  ShieldCheck,
  UserCheck,
  Send,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';

interface ReportCardModalProps {
  card: ReportCard;
  athlete: Athlete;
  isOpen: boolean;
  onClose: () => void;
  isCoachView?: boolean;
  onUpdateNotes?: (notes: string) => void;
  onShareToParent?: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  card,
  athlete,
  isOpen,
  onClose,
  isCoachView = false,
  onUpdateNotes,
  onShareToParent,
}) => {
  const { language } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [coachNoteText, setCoachNoteText] = useState(card.coachNotes);
  const [isEditingNote, setIsEditingNote] = useState(false);

  if (!isOpen) return null;

  const handleShare = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#3B82F6', '#10B981']
    });
    setCopiedLink(true);
    if (onShareToParent) onShareToParent();
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const saveNote = () => {
    if (onUpdateNotes) {
      onUpdateNotes(coachNoteText);
    }
    setIsEditingNote(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 80) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 70) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  const localizeBranch = (branchName: string) => {
    if (language === 'tr') return branchName;
    switch (branchName) {
      case 'Basketbol': return 'Basketball';
      case 'Voleybol': return 'Volleyball';
      case 'Yüzme': return 'Swimming';
      case 'Futbol': return 'Football';
      case 'Cimnastik': return 'Gymnastics';
      default: return branchName;
    }
  };

  const localizePeriod = (p: string) => {
    if (language === 'tr') return p;
    return p.replace('Güz Dönemi', 'Fall Term').replace('Bahar Dönemi', 'Spring Term');
  };

  const localizeMetricName = (name: string) => {
    if (language === 'tr') return name;
    const map: Record<string, string> = {
      'Top Sürme (Dribbling)': 'Dribbling & Ball Handling',
      'Şut Mekaniği': 'Shooting Mechanics',
      'Pas & Saha Görüşü': 'Passing & Court Vision',
      'Savunma Ayak Çabukluğu': 'Defensive Footwork',
      'Kondisyon & Dayanıklılık': 'Conditioning & Stamina',
      'Takım Oyunu & Liderlik': 'Team Play & Leadership',
      'Manşet & Parmak Pas': 'Forearm & Overhead Passing',
      'Servis Becerisi': 'Serving Technique',
      'Hücum & Smaç': 'Spiking & Attack',
      'Blok Zamanlaması': 'Block Timing',
      'Serbest Stil Tekniği': 'Freestyle Technique',
      'Sırtüstü & Kurbağalama': 'Backstroke & Breaststroke',
      'Nefes Kontrolü': 'Breathing Mechanics',
      'Dönüş & Çıkışlar': 'Turns & Starts'
    };
    return map[name] || name;
  };

  const localizeMetricCategory = (cat: string) => {
    if (language === 'tr') return cat;
    const map: Record<string, string> = {
      'Teknik': 'Technical',
      'Fiziksel': 'Physical',
      'Mental': 'Mental',
      'Taktik': 'Tactical'
    };
    return map[cat] || cat;
  };

  const localizePhrase = (phrase: string) => {
    if (language === 'tr') return phrase;
    const map: Record<string, string> = {
      'Çapraz dripling geçişlerinde yaş grubunun üzerinde hız': 'Crossover dribble transitions well above age bracket speed',
      'Serbest atış çizgisinde yüksek isabet oranı (%78)': 'High free throw shooting accuracy (78%)',
      'Takım arkadaşlarıyla antrenman içi üst düzey iletişim': 'Exceptional in-drill communication with teammates',
      'Sol el dripling hızını ve dengesini artırma': 'Developing left-hand weak side dribbling pace and balance',
      'Hızlı hücum dönüşlerinde geri koşma alışkanlığı': 'Transition defense sprint habits on fast-break returns',
      'Parmak pas açısı ve bilek esnekliği mükemmel': 'Excellent overhead pass angles and wrist flexibility',
      'Servis karşılama pozisyon alması çok başarılı': 'High proficiency in serve-receive positioning',
      'Hücum smaç vuruşlarında topa vurma zamanlaması geliştirilmeli': 'Spike contact timing and apex jump development needed'
    };
    return map[phrase] || phrase;
  };

  const localizeCoachTitle = (title: string) => {
    if (language === 'tr') return title;
    return title.replace('Başantrenörü', 'Head Coach').replace('Antrenörü', 'Coach');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-900"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50/50 to-white p-6 sm:p-8 border-b border-slate-200">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                id="btn-close-report-modal"
                onClick={onClose}
                className="p-2 text-slate-500 hover:text-slate-800 rounded-full bg-white/80 hover:bg-white border border-slate-200 shadow-xs transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={athlete.avatar}
                  alt={athlete.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-md"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                      {localizeBranch(athlete.branch)} • {athlete.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-500" />
                      {athlete.rankBadge}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                    {athlete.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{localizePeriod(card.period)}</span>
                    <span>•</span>
                    <span>{language === 'tr' ? `Tarih: ${card.publishedAt}` : `Date: ${card.publishedAt}`}</span>
                  </p>
                </div>
              </div>

              {/* General Score Badge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-500 font-medium">
                    {language === 'tr' ? 'Genel Gelişim Notu' : 'Overall Progress Score'}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-blue-600">
                    {card.generalScore}<span className="text-lg text-slate-400 font-normal">/100</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{language === 'tr' ? 'Dönemsel Artış: +14%' : 'Seasonal Increase: +14%'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200 text-sm">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">{language === 'tr' ? 'Devam Oranı' : 'Attendance Rate'}</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>%{athlete.attendanceRate}</span>
                <span className="text-xs text-slate-400 font-normal">({card.attendanceCount}/{card.totalTrainings})</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">{language === 'tr' ? 'Kazanılan Sporpuan' : 'Earned Sporpuan'}</span>
              <div className="text-lg font-bold text-amber-600 mt-0.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>+{card.sporpuanEarnedTotal} SP</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">{language === 'tr' ? 'Devam Serisi' : 'Streak'}</span>
              <div className="text-lg font-bold text-blue-600 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{athlete.streakDays} {language === 'tr' ? 'Antrenman' : 'Trainings'}</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">{language === 'tr' ? 'Veli Paylaşımı' : 'Parent Sharing'}</span>
              <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {card.sharedWithParent
                    ? (language === 'tr' ? 'Velide Görüntülendi' : 'Viewed by Parent')
                    : (language === 'tr' ? 'Beklemede' : 'Pending')}
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Skills Progress Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span>{language === 'tr' ? 'Kategori Bazlı Yetenek & Gelişim Analizi' : 'Skill & Developmental Breakdown'}</span>
                </h3>
                <span className="text-xs text-slate-500 hidden sm:inline">
                  {language === 'tr' ? 'Standart: TBF / TVF Yaş Grubu Normları' : 'Standard: Youth Federation Norms'}
                </span>
              </div>

              <div className="space-y-3.5">
                {card.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{localizeMetricName(m.name)}</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          {localizeMetricCategory(m.category)}
                        </span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${getScoreColor(m.score)}`}>
                        {m.score} / 100
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-1.5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-700"
                        style={{ width: `${m.score}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-600 italic">
                      💡 {m.notes}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Improvement Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'tr' ? 'Öne Çıkan Güçlü Yönler' : 'Key Strengths'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {card.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{localizePhrase(s)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-2.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>{language === 'tr' ? 'Gelecek Dönem Odak Alanları' : 'Next Focus Areas'}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {card.improvementAreas.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{localizePhrase(s)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Coach's Written Feedback */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{card.coachName}</h4>
                    <p className="text-xs text-slate-500">{localizeCoachTitle(card.coachTitle)}</p>
                  </div>
                </div>

                {isCoachView && (
                  <button
                    id="btn-edit-coach-note"
                    onClick={() => setIsEditingNote(!isEditingNote)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {isEditingNote 
                      ? (language === 'tr' ? 'Vazgeç' : 'Cancel') 
                      : (language === 'tr' ? 'Notu Düzenle' : 'Edit Note')}
                  </button>
                )}
              </div>

              {isEditingNote ? (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={coachNoteText}
                    onChange={(e) => setCoachNoteText(e.target.value)}
                    rows={3}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-blue-600 shadow-xs"
                    placeholder={language === 'tr' ? 'Antrenör değerlendirme notunuzu girin...' : 'Enter your coach feedback...'}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={saveNote}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                    >
                      {language === 'tr' ? 'Kaydet & Güncelle' : 'Save & Update'}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2 bg-white p-3.5 rounded-xl border border-slate-200">
                  "{card.coachNotes}"
                </p>
              )}
            </div>

            {/* Verification Footer with QR Code */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">
                    {language === 'tr' ? 'SportsFly Doğrulanmış Dijital Belge' : 'SportsFly Verified Digital Report'}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {language === 'tr' ? 'Seri No: SF-2026-AR9924 • Güvenli Zaman Damgası' : 'Serial No: SF-2026-AR9924 • Secure Timestamp'}
                  </div>
                </div>
              </div>
              <div className="text-slate-500 text-right text-[11px]">
                {language === 'tr' ? 'Velisi:' : 'Parent:'} <span className="text-slate-900 font-medium">{athlete.parentName}</span> ({athlete.parentPhone})
              </div>
            </div>
          </div>

          {/* Action Bar Footer */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>
                {language === 'tr' 
                  ? 'Veliler karneyi SportsFly mobil portalından diledikleri an açabilir.' 
                  : 'Parents can view the digital report card at any time via the SportsFly portal.'}
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                id="btn-download-report-card"
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-200 transition"
              >
                <Download className="w-4 h-4" />
                <span>
                  {downloadSuccess 
                    ? (language === 'tr' ? 'PDF İndirildi!' : 'PDF Downloaded!') 
                    : (language === 'tr' ? 'PDF İndir' : 'Download PDF')}
                </span>
              </button>

              <button
                id="btn-share-report-card"
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/25 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>
                  {copiedLink 
                    ? (language === 'tr' ? 'WhatsApp Bağlantısı Kopyalandı!' : 'WhatsApp Link Copied!') 
                    : (language === 'tr' ? 'Veliyle Paylaş (WhatsApp & SMS)' : 'Share with Parent (WhatsApp & SMS)')}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
