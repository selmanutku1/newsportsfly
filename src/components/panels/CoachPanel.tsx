import React, { useState } from 'react';
import { Athlete, ReportCard } from '../../types';
import {
  Award,
  Calendar,
  CheckCircle,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Save,
  Send,
  Share2,
  Sliders,
  Users,
  XCircle,
  Zap,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReportCardModal } from './ReportCardModal';
import { useLanguage } from '../../context/LanguageContext';

interface CoachPanelProps {
  athletes: Athlete[];
  reportCards: Record<string, ReportCard>;
  onBackToSite: () => void;
  onSwitchToParent: () => void;
  onUpdateReportCard: (reportCard: ReportCard) => void;
  onAwardBonusPoints: (athleteId: string, bonus: number, reason: string) => void;
}

export const CoachPanel: React.FC<CoachPanelProps> = ({
  athletes,
  reportCards,
  onBackToSite,
  onSwitchToParent,
  onUpdateReportCard,
  onAwardBonusPoints,
}) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'attendance' | 'report_editor' | 'athletes'>('attendance');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [attendanceState, setAttendanceState] = useState<Record<string, 'present' | 'absent' | 'excused'>>({
    'ath-1': 'present',
    'ath-2': 'present',
    'ath-3': 'present',
    'ath-4': 'absent',
    'ath-5': 'present',
  });
  const [attendanceSubmitted, setAttendanceSubmitted] = useState(false);

  // Report Card editing state
  const [editingAthleteId, setEditingAthleteId] = useState<string>(athletes[0]?.id || 'ath-1');
  const currentAthlete = athletes.find((a) => a.id === editingAthleteId) || athletes[0];
  const existingCard = reportCards[currentAthlete.id];

  const [cardForm, setCardForm] = useState<ReportCard>(
    existingCard || {
      id: `rep-${currentAthlete.id}`,
      athleteId: currentAthlete.id,
      period: '2025-2026 Güz Dönemi',
      publishedAt: '18 Ocak 2026',
      coachName: 'Kadir Canpolat',
      coachTitle: 'Başantrenör',
      coachNotes: 'Gelişim disiplini çok yüksek, arkadaşlarına örnek oluyor.',
      generalScore: 90,
      attendanceCount: 24,
      totalTrainings: 25,
      sporpuanEarnedTotal: 700,
      sharedWithParent: false,
      strengths: ['Hızlı Karar Verme', 'Yüksek Antrenman Disiplini'],
      improvementAreas: ['Savunma İletişimi'],
      metrics: [
        { name: 'Temel Teknik Beceriler', score: 90, category: 'teknik', notes: 'Gelişimi istikrarlı.' },
        { name: 'Kondisyon & Çeviklik', score: 88, category: 'fiziksel', notes: 'Dönem başı testlerine göre +15% artış.' },
        { name: 'Saha İçi Taktik Zekâ', score: 92, category: 'taktik', notes: 'Pozisyon alma yeteneği güçlü.' },
        { name: 'Mental Dayanıklılık & Fair-Play', score: 95, category: 'mental', notes: 'Takım arkadaşlarına destek veriyor.' },
      ],
    }
  );

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Bonus Points awarding modal state
  const [bonusModalAthlete, setBonusModalAthlete] = useState<Athlete | null>(null);
  const [bonusAmount, setBonusAmount] = useState(50);
  const [bonusReason, setBonusReason] = useState('Fair-Play & Yardımlaşma');

  const filteredAthletes = athletes.filter(
    (a) => selectedBranch === 'all' || a.branch === selectedBranch
  );

  const handleAttendanceChange = (athId: string, status: 'present' | 'absent' | 'excused') => {
    setAttendanceState((prev) => ({ ...prev, [athId]: status }));
  };

  const submitAttendance = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#10B981', '#F59E0B'],
    });
    setAttendanceSubmitted(true);
    setTimeout(() => setAttendanceSubmitted(false), 4000);
  };

  const handleMetricScoreChange = (index: number, score: number) => {
    const updated = [...cardForm.metrics];
    updated[index].score = score;
    const avg = Math.round(updated.reduce((sum, m) => sum + m.score, 0) / updated.length);
    setCardForm((prev) => ({
      ...prev,
      metrics: updated,
      generalScore: avg,
    }));
  };

  const handlePublishReport = () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });

    const updatedCard: ReportCard = {
      ...cardForm,
      sharedWithParent: true,
      sharedAt: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    onUpdateReportCard(updatedCard);
    setCardForm(updatedCard);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 4000);
  };

  const handleAwardBonus = () => {
    if (!bonusModalAthlete) return;
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#FACC15'],
    });

    onAwardBonusPoints(bonusModalAthlete.id, bonusAmount, bonusReason);
    setBonusModalAthlete(null);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Coach Top Navigation */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {language === 'tr' ? 'Antrenör & Eğitmen Paneli' : 'Coach & Instructor Panel'}
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <div className="text-xs text-slate-300 font-semibold hidden md:flex items-center gap-2">
            <span>
              {language === 'tr' ? 'Giriş Yapan: ' : 'Logged in: '}
              <strong>Kadir Canpolat</strong> ({language === 'tr' ? 'Başantrenör' : 'Head Coach'})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="btn-switch-to-parent"
            onClick={onSwitchToParent}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            {language === 'tr' ? 'Veli Paneline Geç' : 'Switch to Parent Panel'}
          </button>
          <button
            id="btn-coach-back-to-site"
            onClick={onBackToSite}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition"
          >
            {language === 'tr' ? '← Ana Sayfaya Dön' : '← Back to Home'}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 pt-6 border-b border-slate-800">
        <div className="flex items-center gap-3 sm:gap-6 overflow-x-auto text-sm font-semibold">
          <button
            id="tab-coach-attendance"
            onClick={() => setActiveTab('attendance')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'attendance'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            <span>{language === 'tr' ? 'Hızlı Yoklama & Sporpuan Dağıtımı' : 'Quick Attendance & Sporpuan'}</span>
          </button>

          <button
            id="tab-coach-report-editor"
            onClick={() => setActiveTab('report_editor')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'report_editor'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{language === 'tr' ? 'Dijital Karne Hazırlama & Veliye Gönderim' : 'Digital Report Card & Parent Dispatch'}</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full">
              {language === 'tr' ? 'Canlı' : 'Live'}
            </span>
          </button>

          <button
            id="tab-coach-athletes"
            onClick={() => setActiveTab('athletes')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'athletes'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>{language === 'tr' ? 'Sporcu Listesi & Sporpuan Ödülleri' : 'Athletes & Sporpuan Status'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex-1 space-y-6">
        {/* Attendance Notification Banner */}
        {attendanceSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">
                  {language === 'tr' ? 'Yoklama Başarıyla Sisteme İşlendi!' : 'Roll Call Successfully Recorded!'}
                </h4>
                <p className="text-xs text-emerald-400/90">
                  {language === 'tr' ? (
                    <>Katılan tüm sporcuların hesaplarına <strong>+25 Sporpuan</strong> yüklendi ve velilerine "Antrenmana Katıldı" bildirimi otomatik iletildi.</>
                  ) : (
                    <><strong>+25 Sporpuan</strong> credited to all attending athletes and automated "Attended Practice" notifications sent to parents.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {publishSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-300 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <Send className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">
                  {language === 'tr' ? 'Dijital Karne Başarıyla Yayınlandı & Paylaşıldı!' : 'Digital Report Card Successfully Published & Shared!'}
                </h4>
                <p className="text-xs text-emerald-400/90">
                  {language === 'tr' ? (
                    <>{currentAthlete.name} için hazırlanan karne velinin portalında anlık olarak aktif edildi ve WhatsApp/SMS onay bağlantısı gönderildi.</>
                  ) : (
                    <>Report card prepared for {currentAthlete.name} is now live in the parent portal with instant WhatsApp/SMS notification link dispatched.</>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: ATTENDANCE & SPORPUAN ROLL CALL */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-3xl">
              <div>
                <div className="text-xs text-cyan-400 font-bold uppercase">
                  {language === 'tr' ? 'Bugünkü Seans' : "Today's Session"}
                </div>
                <h2 className="text-xl font-black text-white">
                  {language === 'tr' ? 'Basketbol U12 Gelişim Yoklaması' : 'Basketball U12 Development Roll Call'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'tr'
                    ? '18 Ocak 2026 • 17:30 - 19:00 • Atatürk Spor Salonu (14 Sporcu Kayıtlı)'
                    : 'Jan 18, 2026 • 17:30 - 19:00 • Atatürk Sports Arena (14 Athletes Enrolled)'}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  id="btn-mark-all-present"
                  onClick={() => {
                    const allPresent: Record<string, 'present'> = {};
                    athletes.forEach((a) => (allPresent[a.id] = 'present'));
                    setAttendanceState(allPresent);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                >
                  {language === 'tr' ? 'Tümünü Geldi İşaretle' : 'Mark All Present'}
                </button>
                <button
                  id="btn-submit-attendance-save"
                  onClick={submitAttendance}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition"
                >
                  <Zap className="w-4 h-4 fill-current text-amber-300" />
                  <span>{language === 'tr' ? 'Yoklamayı Onayla (+Sporpuan Yükle)' : 'Confirm Roll Call (+Award Sporpuan)'}</span>
                </button>
              </div>
            </div>

            {/* Attendance Roster Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{language === 'tr' ? 'Sporcu Bilgisi & Kategori' : 'Athlete Info & Category'}</span>
                <span className="hidden sm:inline">{language === 'tr' ? 'Mevcut Sporpuan & Seri' : 'Current Sporpuan & Streak'}</span>
                <span>{language === 'tr' ? 'Katılım Durumu' : 'Attendance Status'}</span>
              </div>

              <div className="divide-y divide-slate-800">
                {athletes.map((ath) => {
                  const status = attendanceState[ath.id] || 'present';
                  return (
                    <div
                      key={ath.id}
                      className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-850/50 transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={ath.avatar}
                          alt={ath.name}
                          className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-white">{ath.name}</h4>
                          <p className="text-xs text-slate-400">
                            {localizeBranch(ath.branch)} • {ath.category} • {language === 'tr' ? 'Veli:' : 'Parent:'} {ath.parentName}
                          </p>
                        </div>
                      </div>

                      <div className="hidden sm:flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>{ath.sporpuan} SP</span>
                        </div>
                        <div className="text-slate-400">
                          {language === 'tr' ? 'Devam:' : 'Attendance:'} <strong className="text-cyan-400">%{ath.attendanceRate}</strong>
                        </div>
                      </div>

                      {/* Status Toggle Buttons */}
                      <div className="flex items-center gap-1.5 w-full sm:w-auto">
                        <button
                          onClick={() => handleAttendanceChange(ath.id, 'present')}
                          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            status === 'present'
                              ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{language === 'tr' ? 'Geldi (+25 SP)' : 'Present (+25 SP)'}</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(ath.id, 'absent')}
                          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            status === 'absent'
                              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>{language === 'tr' ? 'Gelmedi' : 'Absent'}</span>
                        </button>

                        <button
                          onClick={() => handleAttendanceChange(ath.id, 'excused')}
                          className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            status === 'excused'
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>{language === 'tr' ? 'Mazeretli' : 'Excused'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DIGITAL REPORT CARD BUILDER */}
        {activeTab === 'report_editor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Athlete selector sidebar */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <h3 className="text-sm font-bold text-white mb-3">
                  {language === 'tr' ? 'Karne Hazırlanacak Sporcu' : 'Select Athlete for Report Card'}
                </h3>
                <div className="space-y-2">
                  {athletes.map((ath) => (
                    <button
                      key={ath.id}
                      onClick={() => {
                        setEditingAthleteId(ath.id);
                        if (reportCards[ath.id]) {
                          setCardForm(reportCards[ath.id]);
                        }
                      }}
                      className={`w-full p-3 rounded-xl flex items-center gap-3 text-left transition ${
                        editingAthleteId === ath.id
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-white'
                          : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-white'
                      }`}
                    >
                      <img
                        src={ath.avatar}
                        alt={ath.name}
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white truncate">{ath.name}</div>
                        <div className="text-[10px] text-slate-400">{localizeBranch(ath.branch)} • {ath.category}</div>
                      </div>
                      {reportCards[ath.id]?.sharedWithParent && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title={language === 'tr' ? 'Karne Yayınlandı' : 'Report Published'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Editor Canvas */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase">
                      {language === 'tr' ? 'Dönemsel Performans Modülü' : 'Term Performance Module'}
                    </span>
                    <h2 className="text-xl font-bold text-white">
                      {currentAthlete.name} - {language === 'tr' ? 'Gelişim Karnesi Düzenle' : 'Edit Progress Report'}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="btn-preview-card-modal"
                      onClick={() => setPreviewModalOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
                    >
                      {language === 'tr' ? 'Önizle' : 'Preview'}
                    </button>
                    <button
                      id="btn-publish-report-card"
                      onClick={handlePublishReport}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'tr' ? 'Yayınla & Veliye Gönder' : 'Publish & Dispatch to Parent'}</span>
                    </button>
                  </div>
                </div>

                {/* General Score & Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Hesaplanan Ortalama Not' : 'Calculated Average Grade'}
                    </span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">
                      {cardForm.generalScore} <span className="text-sm text-slate-500 font-normal">/100</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Antrenman Devam Sayısı' : 'Workout Attendance Count'}
                    </span>
                    <div className="text-2xl font-bold text-white mt-1">
                      {cardForm.attendanceCount} / {cardForm.totalTrainings}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Kazanılan Sporpuan' : 'Earned Sporpuan'}
                    </span>
                    <div className="text-2xl font-bold text-amber-400 mt-1">
                      +{cardForm.sporpuanEarnedTotal} SP
                    </div>
                  </div>
                </div>

                {/* Skill Ratings Sliders */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span>{language === 'tr' ? 'Temel Kriter Değerlendirmeleri (0 - 100)' : 'Core Skill Evaluations (0 - 100)'}</span>
                  </h3>

                  <div className="space-y-4">
                    {cardForm.metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white">{metric.name}</span>
                          <span className="font-black text-cyan-400 text-sm">{metric.score} / 100</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="100"
                          value={metric.score}
                          onChange={(e) => handleMetricScoreChange(idx, parseInt(e.target.value))}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <input
                          type="text"
                          value={metric.notes}
                          onChange={(e) => {
                            const updated = [...cardForm.metrics];
                            updated[idx].notes = e.target.value;
                            setCardForm({ ...cardForm, metrics: updated });
                          }}
                          placeholder={language === 'tr' ? 'Kısa koç notu ekleyin...' : 'Add brief coach observation...'}
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coach Detailed Text Evaluation */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white block">
                    {language === 'tr' ? 'Antrenör Değerlendirme & Tavsiye Mektubu:' : 'Head Coach Evaluation & Advisory Letter:'}
                  </label>
                  <textarea
                    rows={4}
                    value={cardForm.coachNotes}
                    onChange={(e) => setCardForm({ ...cardForm, coachNotes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed"
                    placeholder={
                      language === 'tr'
                        ? 'Sporcunun sahadaki gelişimi, karakteri ve sonraki dönem hedefleri...'
                        : "Athlete's on-court growth, dedication, sportsmanship and next term targets..."
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ATHLETES ROSTER & SPORPUAN BONUS AWARD */}
        {activeTab === 'athletes' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {language === 'tr' ? 'Tüm Sporcular & Sporpuan Durumları' : 'All Athletes & Sporpuan Standing'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'tr'
                    ? 'Özel başarılar için anlık puan tanımlayın veya sporcu karnelerini görüntüleyin.'
                    : 'Award instant points for sportsmanship or manage term digital report cards.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
                >
                  <option value="all">{language === 'tr' ? 'Tüm Branşlar' : 'All Disciplines'}</option>
                  <option value="Basketbol">{language === 'tr' ? 'Basketbol' : 'Basketball'}</option>
                  <option value="Voleybol">{language === 'tr' ? 'Voleybol' : 'Volleyball'}</option>
                  <option value="Yüzme">{language === 'tr' ? 'Yüzme' : 'Swimming'}</option>
                  <option value="Futbol">{language === 'tr' ? 'Futbol' : 'Football'}</option>
                  <option value="Cimnastik">{language === 'tr' ? 'Cimnastik' : 'Gymnastics'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAthletes.map((ath) => (
                <div
                  key={ath.id}
                  className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={ath.avatar}
                      alt={ath.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-1 ring-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-white text-base">{ath.name}</h4>
                      <p className="text-xs text-slate-400">{localizeBranch(ath.branch)} • {ath.category}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-bold mt-1">
                        <Award className="w-3 h-3" />
                        {ath.rankBadge}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Sporpuan</span>
                      <span className="text-amber-400 font-black text-sm">{ath.sporpuan} SP</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">
                        {language === 'tr' ? 'Devamlılık' : 'Attendance'}
                      </span>
                      <span className="text-cyan-400 font-bold text-sm">%{ath.attendanceRate}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      id={`btn-bonus-award-${ath.id}`}
                      onClick={() => setBonusModalAthlete(ath)}
                      className="flex-1 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>{language === 'tr' ? '+Puan Ver' : '+Award Points'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingAthleteId(ath.id);
                        setActiveTab('report_editor');
                      }}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                    >
                      {language === 'tr' ? 'Karne' : 'Report'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bonus Points Award Modal */}
      {bonusModalAthlete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {language === 'tr' ? 'Sporpuan Bonusu Tanımla' : 'Award Sporpuan Bonus'}
                </h3>
                <p className="text-xs text-slate-400">{bonusModalAthlete.name} ({localizeBranch(bonusModalAthlete.branch)})</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === 'tr' ? 'Ödül Miktarı (SP):' : 'Reward Amount (SP):'}
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 100, 200].map((pts) => (
                    <button
                      key={pts}
                      onClick={() => setBonusAmount(pts)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${
                        bonusAmount === pts
                          ? 'bg-amber-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      +{pts} SP
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  {language === 'tr' ? 'Ödüllendirme Sebebi:' : 'Reason for Award:'}
                </label>
                <select
                  value={bonusReason}
                  onChange={(e) => setBonusReason(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="Fair-Play & Yardımlaşma">
                    {language === 'tr' ? 'Fair-Play & Saha İçi Centilmenlik' : 'Fair Play & Court Sportsmanship'}
                  </option>
                  <option value="Maçın Yıldızı / En İyi Performans">
                    {language === 'tr' ? 'Maçın Yıldızı / En İyi Performans' : 'Star of the Match / MVP'}
                  </option>
                  <option value="Üstün Antrenman Gayreti">
                    {language === 'tr' ? 'Üstün Antrenman Gayreti' : 'Outstanding Workout Dedication'}
                  </option>
                  <option value="Ev Ödevi / Drills Tamamlama">
                    {language === 'tr' ? 'Ev Ödevi & Bireysel Drills' : 'Home Drills & Individual Practice'}
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setBonusModalAthlete(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                {language === 'tr' ? 'Vazgeç' : 'Cancel'}
              </button>
              <button
                onClick={handleAwardBonus}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold shadow"
              >
                {language === 'tr' ? 'Puanı Sporcuya Gönder' : 'Send Points to Athlete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewModalOpen && (
        <ReportCardModal
          card={cardForm}
          athlete={currentAthlete}
          isOpen={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          isCoachView={true}
          onUpdateNotes={(newNote) => setCardForm({ ...cardForm, coachNotes: newNote })}
          onShareToParent={handlePublishReport}
        />
      )}
    </div>
  );
};
