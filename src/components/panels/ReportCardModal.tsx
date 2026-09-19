import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ReportCard, Athlete } from '../../types';
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
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
                      {athlete.branch} • {athlete.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {athlete.rankBadge}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                    {athlete.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{card.period}</span>
                    <span>•</span>
                    <span>Tarih: {card.publishedAt}</span>
                  </p>
                </div>
              </div>

              {/* General Score Badge */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-0 border-slate-200">
                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-500 font-medium">Genel Gelişim Notu</div>
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    {card.generalScore}<span className="text-lg text-slate-400 font-normal">/100</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Dönemsel Artış: +14%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200 text-sm">
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">Devam Oranı</span>
              <div className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>%{athlete.attendanceRate}</span>
                <span className="text-xs text-slate-400 font-normal">({card.attendanceCount}/{card.totalTrainings})</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">Kazanılan Sporpuan</span>
              <div className="text-lg font-bold text-amber-600 mt-0.5 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>+{card.sporpuanEarnedTotal} SP</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">Devam Serisi</span>
              <div className="text-lg font-bold text-blue-600 mt-0.5 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>{athlete.streakDays} Antrenman</span>
              </div>
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
              <span className="text-slate-500 text-xs block">Veli Paylaşımı</span>
              <div className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{card.sharedWithParent ? 'Velide Görüntülendi' : 'Beklemede'}</span>
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
                  <span>Kategori Bazlı Yetenek & Gelişim Analizi</span>
                </h3>
                <span className="text-xs text-slate-500 hidden sm:inline">Standart: TBF / TVF Yaş Grubu Normları</span>
              </div>

              <div className="space-y-3.5">
                {card.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{m.name}</span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                          {m.category}
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
                  <span>Öne Çıkan Güçlü Yönler</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {card.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800 font-bold text-sm mb-2.5">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Gelecek Dönem Odak Alanları</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {card.improvementAreas.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{s}</span>
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
                    <p className="text-xs text-slate-500">{card.coachTitle}</p>
                  </div>
                </div>

                {isCoachView && (
                  <button
                    id="btn-edit-coach-note"
                    onClick={() => setIsEditingNote(!isEditingNote)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    {isEditingNote ? 'Vazgeç' : 'Notu Düzenle'}
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
                    placeholder="Antrenör değerlendirme notunuzu girin..."
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={saveNote}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs"
                    >
                      Kaydet & Güncelle
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
                  <div className="font-semibold text-slate-900">SportsFly Doğrulanmış Dijital Belge</div>
                  <div className="text-slate-500 text-[11px]">Seri No: SF-2026-AR9924 • Güvenli Zaman Damgası</div>
                </div>
              </div>
              <div className="text-slate-500 text-right text-[11px]">
                Velisi: <span className="text-slate-900 font-medium">{athlete.parentName}</span> ({athlete.parentPhone})
              </div>
            </div>
          </div>

          {/* Action Bar Footer */}
          <div className="p-4 sm:p-6 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Veliler karneyi SportsFly mobil portalından diledikleri an açabilir.</span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                id="btn-download-report-card"
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-2 border border-slate-200 transition"
              >
                <Download className="w-4 h-4" />
                <span>{downloadSuccess ? 'PDF İndirildi!' : 'PDF İndir'}</span>
              </button>

              <button
                id="btn-share-report-card"
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-500/25 transition"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedLink ? 'WhatsApp Bağlantısı Kopyalandı!' : 'Veliyle Paylaş (WhatsApp & SMS)'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
