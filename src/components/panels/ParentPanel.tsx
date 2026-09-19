import React, { useState } from 'react';
import { Athlete, ReportCard, RewardItem } from '../../types';
import {
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  Flame,
  Gift,
  Heart,
  HelpCircle,
  MessageCircle,
  Phone,
  QrCode,
  Share2,
  Sparkles,
  Trophy,
  User,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReportCardModal } from './ReportCardModal';

interface ParentPanelProps {
  athletes: Athlete[];
  rewards: RewardItem[];
  reportCards: Record<string, ReportCard>;
  onBackToSite: () => void;
  onSwitchToCoach: () => void;
}

export const ParentPanel: React.FC<ParentPanelProps> = ({
  athletes,
  rewards,
  reportCards,
  onBackToSite,
  onSwitchToCoach,
}) => {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(athletes[0]?.id || 'ath-1');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'sporpuan' | 'report' | 'schedule' | 'payments'>('dashboard');
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [redeemingItem, setRedeemingItem] = useState<RewardItem | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);

  const currentAthlete = athletes.find((a) => a.id === selectedAthleteId) || athletes[0];
  const currentReportCard = reportCards[currentAthlete.id];

  // Dynamic Sporpuan state per athlete
  const [pointsOffset, setPointsOffset] = useState<Record<string, number>>({});
  const athletePoints = (currentAthlete?.sporpuan || 0) - (pointsOffset[currentAthlete.id] || 0);

  const handleRedeem = (item: RewardItem) => {
    if (athletePoints < item.pointsRequired) {
      alert(`Yetersiz Sporpuan! Bu ödülü alabilmek için ${item.pointsRequired - athletePoints} puana daha ihtiyacınız var. Antrenman devamlılığınızı sürdürerek puan kazanabilirsiniz.`);
      return;
    }

    setRedeemingItem(item);
  };

  const confirmRedeem = () => {
    if (!redeemingItem) return;
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#06B6D4', '#F59E0B', '#10B981', '#6366F1']
    });

    setPointsOffset((prev) => ({
      ...prev,
      [currentAthlete.id]: (prev[currentAthlete.id] || 0) + redeemingItem.pointsRequired,
    }));
    setClaimedRewards((prev) => [...prev, redeemingItem.id]);
    setRedeemSuccess(redeemingItem.title);
    setRedeemingItem(null);

    setTimeout(() => {
      setRedeemSuccess(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar for Navigation and Athlete Switcher */}
      <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Veli Portalı</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          {/* Child Selector */}
          <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 rounded-xl p-1">
            <User className="w-4 h-4 text-slate-400 ml-2" />
            <select
              id="select-parent-athlete"
              value={selectedAthleteId}
              onChange={(e) => setSelectedAthleteId(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none pr-3 py-1 cursor-pointer"
            >
              {athletes.map((ath) => (
                <option key={ath.id} value={ath.id} className="bg-slate-900 text-white">
                  {ath.name} ({ath.branch})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            id="btn-switch-to-coach"
            onClick={onSwitchToCoach}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            Antrenör Paneline Geç
          </button>
          <button
            id="btn-back-to-marketing"
            onClick={onBackToSite}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            ← Ana Sayfaya Dön
          </button>
        </div>
      </header>

      {/* Athlete Header Hero Card */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 pt-6 pb-4">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Athlete Profile Info */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative">
                <img
                  src={currentAthlete.avatar}
                  alt={currentAthlete.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-md"
                />
                <span className="absolute -bottom-2 -right-2 p-1.5 bg-amber-500 text-slate-950 rounded-xl shadow font-black text-[10px] flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {currentAthlete.streakDays}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-black text-white">{currentAthlete.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {currentAthlete.branch} • {currentAthlete.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-3">
                  <span>Veli: {currentAthlete.parentName}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Son Katılım: {currentAthlete.lastAttendance}</span>
                </p>
              </div>
            </div>

            {/* Sporpuan & Performance Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Sporpuan Wallet Card */}
              <div className="bg-slate-950/80 border border-amber-500/40 rounded-2xl p-3.5 px-5 flex items-center gap-3.5 shadow-lg shadow-amber-500/5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Zap className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Mevcut Sporpuan</div>
                  <div className="text-2xl font-black text-amber-400 tracking-tight flex items-center gap-1">
                    {athletePoints} <span className="text-xs text-amber-300/80 font-semibold">SP</span>
                  </div>
                </div>
              </div>

              {/* Attendance Card */}
              <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-3.5 px-5 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Devamlılık Oranı</div>
                  <div className="text-2xl font-black text-cyan-400 tracking-tight">
                    %{currentAthlete.attendanceRate}
                  </div>
                </div>
              </div>

              {/* Report Card Button */}
              {currentReportCard && (
                <button
                  id="btn-open-report-from-header"
                  onClick={() => setIsReportOpen(true)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-2xl p-3 px-5 flex items-center gap-2.5 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition group"
                >
                  <Award className="w-5 h-5 group-hover:scale-110 transition" />
                  <div className="text-left">
                    <div className="text-[10px] text-emerald-100 font-medium">Yeni Dönem Karnesi</div>
                    <div className="text-sm font-black">Karneyi İncele →</div>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 border-b border-slate-800">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-1 text-sm font-semibold">
          <button
            id="tab-parent-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Genel Bakış & Akış
          </button>
          <button
            id="tab-parent-sporpuan"
            onClick={() => setActiveTab('sporpuan')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'sporpuan'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Sporpuan & Ödül Mağazası</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full font-bold">
              {rewards.length} Ödül
            </span>
          </button>
          <button
            id="tab-parent-report"
            onClick={() => setActiveTab('report')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'report'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Dijital Sporcu Karnesi</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
          </button>
          <button
            id="tab-parent-schedule"
            onClick={() => setActiveTab('schedule')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Antrenman Programı & Yoklamalar</span>
          </button>
          <button
            id="tab-parent-payments"
            onClick={() => setActiveTab('payments')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'payments'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Aidat & Ödemeler</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex-1 space-y-6">
        {/* Success Alert for Redeeming Reward */}
        {redeemSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Tebrikler! Ödül Başarıyla Talep Edildi!</h4>
                <p className="text-xs text-emerald-400/90">
                  "{redeemSuccess}" ödül talebiniz kulüp yönetimine iletildi. Bir sonraki antrenmanda teslim alabilirsiniz.
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 rounded-lg">
              Onaylandı
            </span>
          </div>
        )}

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Next Training & Fast Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Next Training Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <h3 className="font-bold text-base text-white">Sıradaki Antrenman</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Katılım Onaylandı (+25 SP)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">Tarih & Saat</div>
                    <div className="text-base font-bold text-white mt-0.5">Yarın, 17:30 - 19:00</div>
                    <div className="text-xs text-cyan-400 mt-0.5">Basketbol U12 Gelişim Antrenmanı</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Tesis & Saha</div>
                    <div className="text-sm font-semibold text-white mt-0.5">Atatürk Spor Salonu (Saha A)</div>
                    <div className="text-xs text-slate-400 mt-0.5">Eğitmen: Kadir Canpolat</div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Bu antrenmana katıldığında devam serisi <strong className="text-white">{currentAthlete.streakDays + 1} antrenmana</strong> yükselecek!</span>
                  </div>
                  <button
                    onClick={() => alert('Antrenöre mazeret bildirildi. Sporcunuzun devamsızlık durumu güncellenecektir.')}
                    className="text-slate-400 hover:text-rose-400 underline"
                  >
                    Mazeret Bildir
                  </button>
                </div>
              </div>

              {/* Digital Report Card Highlight Card */}
              {currentReportCard && (
                <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-emerald-950/30 border border-emerald-500/30 relative">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-400" />
                        <h3 className="font-bold text-lg text-white">Dönem Sonu Dijital Sporcu Karnesi</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{currentReportCard.period} • Başantrenör Onaylı</p>
                    </div>
                    <button
                      id="btn-view-card-detail"
                      onClick={() => setIsReportOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Tam Karnesini Aç</span>
                    </button>
                  </div>

                  <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800">
                    <p className="text-xs text-slate-300 italic mb-3">
                      "{currentReportCard.coachNotes.slice(0, 140)}..."
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Genel Puan</span>
                        <span className="font-bold text-emerald-400 text-base">{currentReportCard.generalScore} / 100</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Antrenman Katılımı</span>
                        <span className="font-bold text-cyan-400 text-base">{currentReportCard.attendanceCount}/{currentReportCard.totalTrainings}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">Kazanılan Sporpuan</span>
                        <span className="font-bold text-amber-400 text-base">+{currentReportCard.sporpuanEarnedTotal} SP</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Attendance Activity History */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>Son Antrenman Devamlılık Dökümü</span>
                </h3>

                <div className="space-y-2.5">
                  {[
                    { date: '18 Ocak 2026', time: '17:30', status: 'Katıldı', pts: '+25 SP', bonus: 'Zamanında Varış (+10 SP)' },
                    { date: '16 Ocak 2026', time: '17:30', status: 'Katıldı', pts: '+25 SP', bonus: 'Seri Devam (+20 SP)' },
                    { date: '13 Ocak 2026', time: '17:30', status: 'Katıldı', pts: '+25 SP', bonus: 'Günün En Disiplinlisi (+30 SP)' },
                    { date: '11 Ocak 2026', time: '10:00', status: 'Katıldı', pts: '+25 SP', bonus: 'Hafta Sonu Maçı (+40 SP)' },
                  ].map((row, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div>
                          <span className="font-semibold text-white">{row.date}</span>
                          <span className="text-slate-500 ml-2">({row.time})</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 hidden sm:inline">{row.bonus}</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                          {row.pts}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Sporpuan Mini Store & Coach Contact */}
            <div className="space-y-6">
              {/* Sporpuan Quick Redeem Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-amber-400" />
                    <h3 className="font-bold text-base text-white">Ödül Vitrini</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('sporpuan')}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    Tümünü Gör
                  </button>
                </div>

                <div className="space-y-3">
                  {rewards.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-white truncate">{item.title}</div>
                        <div className="text-[11px] text-amber-400 font-semibold">{item.pointsRequired} SP</div>
                      </div>
                      <button
                        id={`btn-quick-redeem-${item.id}`}
                        onClick={() => handleRedeem(item)}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition"
                      >
                        Al
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-[11px] text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>Her antrenmana zamanında gelerek haftalık +100 ekstra Sporpuan toplayabilirsiniz!</span>
                </div>
              </div>

              {/* Coach & Club Direct Contact */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                <h3 className="font-bold text-base text-white mb-3">Antrenör & Kulüp İletişimi</h3>
                <div className="flex items-center gap-3 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    KC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Kadir Canpolat</div>
                    <div className="text-[11px] text-slate-400">Basketbol U12 Başantrenörü</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert('Antrenör telefon numarası: +90 532 555 12 34')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Ara</span>
                  </button>
                  <button
                    onClick={() => alert('SportsFly doğrudan veli-antrenör sohbet odası açılıyor...')}
                    className="p-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPORPUAN & REWARDS STORE */}
        {activeTab === 'sporpuan' && (
          <div className="space-y-6">
            {/* Gamification Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-blue-950/40 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  SportsFly Sporpuan Sadakat & Ödül Ekosistemi
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Devamlılık Başarıyı, Başarı Ödülü Getirir!
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  {currentAthlete.name} antrenmanlara eksiksiz katılarak puanlarını biriktirdi. Kazandığı Sporpuanları aşağıdan kulüp ödüllerine dönüştürebilirsiniz.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-center min-w-[200px]">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Kullanılabilir Bakiye</div>
                <div className="text-4xl font-black text-amber-400 mt-1">{athletePoints}</div>
                <div className="text-xs text-amber-300/80 font-medium">Sporpuan (SP)</div>
              </div>
            </div>

            {/* How to Earn Sporpuan Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-2">
                  +25
                </div>
                <h4 className="text-sm font-bold text-white">Antrenman Katılımı</h4>
                <p className="text-xs text-slate-400 mt-1">Eğitmen yoklama aldığı anda sporcunun hesabına otomatik yüklenir.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-2">
                  +50
                </div>
                <h4 className="text-sm font-bold text-white">4'lü Devam Serisi</h4>
                <p className="text-xs text-slate-400 mt-1">Hiç aksatmadan peş peşe 4 antrenmana katılan sporcuya sadakat bonusu verilir.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
                  +100
                </div>
                <h4 className="text-sm font-bold text-white">Dönem Sonu Karnesi & Fair-Play</h4>
                <p className="text-xs text-slate-400 mt-1">Koç tarafından verilen üstün disiplin ve karne başarı ödülü.</p>
              </div>
            </div>

            {/* Catalog Grid */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>Kulüp Ödül Kataloğu</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => {
                  const isClaimed = claimedRewards.includes(reward.id);
                  const canAfford = athletePoints >= reward.pointsRequired;

                  return (
                    <div
                      key={reward.id}
                      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-slate-700 transition group shadow-lg"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={reward.image}
                          alt={reward.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-black flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>{reward.pointsRequired} SP</span>
                        </div>
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-semibold text-slate-300">
                          Kalan Stok: {reward.stock} adet
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition">
                            {reward.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {reward.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                          <span className="text-[11px] text-slate-500">
                            {reward.claimedCount} kez talep edildi
                          </span>

                          <button
                            id={`btn-claim-${reward.id}`}
                            onClick={() => handleRedeem(reward)}
                            disabled={!canAfford}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                              canAfford
                                ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Gift className="w-3.5 h-3.5" />
                            <span>{canAfford ? 'Ödülü Al' : `${reward.pointsRequired - athletePoints} SP Eksik`}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL REPORT CARD */}
        {activeTab === 'report' && (
          <div className="space-y-6">
            {currentReportCard ? (
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Doğrulanmış Dijital Belge
                    </span>
                    <h2 className="text-2xl font-black text-white mt-1">
                      {currentAthlete.name} - {currentReportCard.period}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Başantrenör: {currentReportCard.coachName} • Yayınlanma: {currentReportCard.publishedAt}
                    </p>
                  </div>

                  <button
                    id="btn-open-full-report-modal"
                    onClick={() => setIsReportOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25"
                  >
                    <Award className="w-4 h-4" />
                    <span>Detaylı Karne & Radar Görünümü</span>
                  </button>
                </div>

                {/* Score Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">Genel Ortalama</span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">
                      {currentReportCard.generalScore}<span className="text-sm font-normal text-slate-500">/100</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">Antrenman Devamı</span>
                    <div className="text-3xl font-black text-cyan-400 mt-1">
                      %{currentAthlete.attendanceRate}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">Dönem Sporpuan</span>
                    <div className="text-3xl font-black text-amber-400 mt-1">
                      +{currentReportCard.sporpuanEarnedTotal}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">Gelişim Seviyesi</span>
                    <div className="text-sm font-black text-white mt-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{currentAthlete.rankBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Metric Bars */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">Beceri Değerlendirmeleri</h4>
                  {currentReportCard.metrics.map((metric, i) => (
                    <div key={i} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-white">{metric.name}</span>
                        <span className="text-cyan-400">{metric.score} / 100</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400"
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 italic">💡 {metric.notes}</p>
                    </div>
                  ))}
                </div>

                {/* Coach Notes */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                  <div className="font-bold text-white mb-1">Antrenörün Dönem Sonu Değerlendirmesi:</div>
                  <p className="italic">"{currentReportCard.coachNotes}"</p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl">
                <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">Bu Sporcu İçin Henüz Karne Yayınlanmadı</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Antrenör dönem sonu gelişim puanlarını girdiğinde ve onayladığında dijital karne burada otomatik olarak belirecektir.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>Haftalık Antrenman Takvimi</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { day: 'Salı', time: '17:30 - 19:00', title: 'Temel Beceri & Drills', place: 'Atatürk Spor Salonu', status: 'Gelecek' },
                { day: 'Perşembe', time: '17:30 - 19:00', title: 'Taktik & Şut Kliniği', place: 'Atatürk Spor Salonu', status: 'Gelecek' },
                { day: 'Cumartesi', time: '10:00 - 12:00', title: 'Hazırlık Maçı & Fiziksel Test', place: 'Akademi Merkez Salonu', status: 'Gelecek' },
              ].map((sch, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 uppercase">{sch.day}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold">
                      {sch.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{sch.title}</h4>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{sch.time}</span>
                  </div>
                  <div className="text-xs text-slate-400">{sch.place}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>Aidat & Ödeme Geçmişi</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Kulüp abonelik ve kurs aidatı takibi</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Borç Yok • Düzenli Ödeyen Veli
              </span>
            </div>

            <div className="space-y-3">
              {[
                { month: 'Ocak 2026', amount: '2.400 ₺', status: 'Ödendi', date: '02.01.2026', invoice: 'SF-INV-0982' },
                { month: 'Aralık 2025', amount: '2.400 ₺', status: 'Ödendi', date: '01.12.2025', invoice: 'SF-INV-0841' },
                { month: 'Kasım 2025', amount: '2.400 ₺', status: 'Ödendi', date: '02.11.2025', invoice: 'SF-INV-0710' },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white text-sm">{p.month} Aidatı</div>
                    <div className="text-slate-400 text-[11px]">Tahsilat Tarihi: {p.date} • Fatura: {p.invoice}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-white text-sm">{p.amount}</span>
                    <button
                      onClick={() => alert(`Fatura ${p.invoice} PDF indiriliyor...`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Makbuz İndir"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal for Redeeming Reward */}
      {redeemingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
              <Gift className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Ödül Talebini Onaylıyor musunuz?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">{redeemingItem.title}</strong> ödülü için hesabınızdan{' '}
              <strong className="text-amber-400">{redeemingItem.pointsRequired} Sporpuan</strong> düşülecektir.
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
              Kalan Bakiye: <strong className="text-white">{athletePoints - redeemingItem.pointsRequired} SP</strong>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                id="btn-cancel-redeem"
                onClick={() => setRedeemingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Vazgeç
              </button>
              <button
                id="btn-confirm-redeem"
                onClick={confirmRedeem}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                Evet, Puanımla Al
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Digital Report Card Modal */}
      {currentReportCard && (
        <ReportCardModal
          card={currentReportCard}
          athlete={currentAthlete}
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          isCoachView={false}
        />
      )}
    </div>
  );
};
