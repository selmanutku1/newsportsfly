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
  Trophy,
  User,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReportCardModal } from './ReportCardModal';
import { useLanguage } from '../../context/LanguageContext';

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
  const { language } = useLanguage();
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

  const localizeReward = (reward: RewardItem) => {
    if (language === 'tr') return reward;
    const translations: Record<string, { title: string; desc: string }> = {
      'rew-1': {
        title: 'Original Club Training Jersey & Shorts',
        desc: 'Official club crest training uniform set, printed with the athlete\'s customized name and squad number.'
      },
      'rew-2': {
        title: 'Professional Match Ball (Special Edition)',
        desc: 'High-grip professional training ball signed by our head coach for exceptional dedication.'
      },
      'rew-3': {
        title: 'VIP 1-on-1 Individual Skills Clinic (60 Min)',
        desc: 'Private technical development analysis, video shooting mechanics, and drill clinic with the head coach.'
      },
      'rew-4': {
        title: 'SportsFly Thermal Sports Bottle & Grip Towel',
        desc: 'Double-walled stainless steel thermal bottle and quick-dry microfibre club towel.'
      },
      'rew-5': {
        title: 'Annual League Match VIP Family Pass',
        desc: '2-person VIP courtside tickets for the regional championship clash including club hospitality.'
      },
      'rew-6': {
        title: 'Crystal "Golden Athlete of the Term" Trophy',
        desc: 'Custom engraved crystal achievement award presented in front of all academy parents at the term ceremony.'
      }
    };
    const tr = translations[reward.id];
    return tr ? { ...reward, title: tr.title, description: tr.desc } : reward;
  };

  const handleRedeem = (item: RewardItem) => {
    const locItem = localizeReward(item);
    if (athletePoints < item.pointsRequired) {
      alert(
        language === 'tr'
          ? `Yetersiz Sporpuan! Bu ödülü alabilmek için ${item.pointsRequired - athletePoints} puana daha ihtiyacınız var. Antrenman devamlılığınızı sürdürerek puan kazanabilirsiniz.`
          : `Insufficient Sporpuan! You need ${item.pointsRequired - athletePoints} more points to redeem this reward. Keep up your training streak to earn points!`
      );
      return;
    }

    setRedeemingItem(locItem);
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
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              {language === 'tr' ? 'Veli Portalı' : 'Parent Portal'}
            </span>
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
                  {ath.name} ({localizeBranch(ath.branch)})
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
            {language === 'tr' ? 'Antrenör Paneline Geç' : 'Switch to Coach Panel'}
          </button>
          <button
            id="btn-back-to-marketing"
            onClick={onBackToSite}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition flex items-center gap-1.5"
          >
            {language === 'tr' ? '← Ana Sayfaya Dön' : '← Back to Home'}
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
                    {localizeBranch(currentAthlete.branch)} • {currentAthlete.category}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-3">
                  <span>{language === 'tr' ? 'Veli: ' : 'Parent: '}{currentAthlete.parentName}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    {language === 'tr' ? 'Son Katılım: ' : 'Last Attendance: '}{currentAthlete.lastAttendance}
                  </span>
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
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    {language === 'tr' ? 'Mevcut Sporpuan' : 'Current Sporpuan'}
                  </div>
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
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    {language === 'tr' ? 'Devamlılık Oranı' : 'Attendance Rate'}
                  </div>
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
                    <div className="text-[10px] text-emerald-100 font-medium">
                      {language === 'tr' ? 'Yeni Dönem Karnesi' : 'New Term Report Card'}
                    </div>
                    <div className="text-sm font-black">
                      {language === 'tr' ? 'Karneyi İncele →' : 'View Report Card →'}
                    </div>
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
            {language === 'tr' ? 'Genel Bakış & Akış' : 'Overview & Activity Feed'}
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
            <span>{language === 'tr' ? 'Sporpuan & Ödül Mağazası' : 'Sporpuan & Reward Shop'}</span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-full font-bold">
              {rewards.length} {language === 'tr' ? 'Ödül' : 'Rewards'}
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
            <span>{language === 'tr' ? 'Dijital Sporcu Karnesi' : 'Digital Athlete Report Card'}</span>
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
            <span>{language === 'tr' ? 'Antrenman Programı & Yoklamalar' : 'Training Schedule & Attendance'}</span>
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
            <span>{language === 'tr' ? 'Aidat & Ödemeler' : 'Dues & Payments'}</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 flex-1 space-y-6">
        {/* Success Alert for Redeeming Reward */}
        {redeemSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 flex items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm">
                  {language === 'tr' ? 'Tebrikler! Ödül Başarıyla Talep Edildi!' : 'Congratulations! Reward Successfully Claimed!'}
                </h4>
                <p className="text-xs text-emerald-400/90">
                  {language === 'tr'
                    ? `"${redeemSuccess}" ödül talebiniz kulüp yönetimine iletildi. Bir sonraki antrenmanda teslim alabilirsiniz.`
                    : `Your claim for "${redeemSuccess}" has been forwarded to academy staff. You may collect it at the next practice.`}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-500/20 rounded-lg">
              {language === 'tr' ? 'Onaylandı' : 'Approved'}
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
                    <h3 className="font-bold text-base text-white">
                      {language === 'tr' ? 'Sıradaki Antrenman' : 'Next Training Session'}
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {language === 'tr' ? 'Katılım Onaylandı (+25 SP)' : 'Attendance Confirmed (+25 SP)'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">{language === 'tr' ? 'Tarih & Saat' : 'Date & Time'}</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {language === 'tr' ? 'Yarın, 17:30 - 19:00' : 'Tomorrow, 17:30 - 19:00'}
                    </div>
                    <div className="text-xs text-cyan-400 mt-0.5">
                      {language === 'tr' ? 'Basketbol U12 Gelişim Antrenmanı' : 'Basketball U12 Development Practice'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">{language === 'tr' ? 'Tesis & Saha' : 'Facility & Court'}</div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {language === 'tr' ? 'Atatürk Spor Salonu (Saha A)' : 'Atatürk Sports Arena (Court A)'}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {language === 'tr' ? 'Eğitmen: Kadir Canpolat' : 'Coach: Kadir Canpolat'}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>
                      {language === 'tr' ? (
                        <>Bu antrenmana katıldığında devam serisi <strong className="text-white">{currentAthlete.streakDays + 1} antrenmana</strong> yükselecek!</>
                      ) : (
                        <>Attending this workout raises the streak to <strong className="text-white">{currentAthlete.streakDays + 1} sessions</strong>!</>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      alert(
                        language === 'tr'
                          ? 'Antrenöre mazeret bildirildi. Sporcunuzun devamsızlık durumu güncellenecektir.'
                          : 'Absence reported to head coach. Athlete attendance record will be updated.'
                      )
                    }
                    className="text-slate-400 hover:text-rose-400 underline"
                  >
                    {language === 'tr' ? 'Mazeret Bildir' : 'Report Absence'}
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
                        <h3 className="font-bold text-lg text-white">
                          {language === 'tr' ? 'Dönem Sonu Dijital Sporcu Karnesi' : 'End-of-Term Digital Report Card'}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {currentReportCard.period} • {language === 'tr' ? 'Başantrenör Onaylı' : 'Head Coach Verified'}
                      </p>
                    </div>
                    <button
                      id="btn-view-card-detail"
                      onClick={() => setIsReportOpen(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>{language === 'tr' ? 'Tam Karnesini Aç' : 'Open Full Report Card'}</span>
                    </button>
                  </div>

                  <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800">
                    <p className="text-xs text-slate-300 italic mb-3">
                      "{currentReportCard.coachNotes.slice(0, 140)}..."
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">
                          {language === 'tr' ? 'Genel Puan' : 'Overall Score'}
                        </span>
                        <span className="font-bold text-emerald-400 text-base">{currentReportCard.generalScore} / 100</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">
                          {language === 'tr' ? 'Antrenman Katılımı' : 'Workouts Attended'}
                        </span>
                        <span className="font-bold text-cyan-400 text-base">{currentReportCard.attendanceCount}/{currentReportCard.totalTrainings}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                        <span className="text-slate-500 block text-[10px]">
                          {language === 'tr' ? 'Kazanılan Sporpuan' : 'Earned Sporpuan'}
                        </span>
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
                  <span>{language === 'tr' ? 'Son Antrenman Devamlılık Dökümü' : 'Recent Training Attendance Log'}</span>
                </h3>

                <div className="space-y-2.5">
                  {[
                    {
                      date: language === 'tr' ? '18 Ocak 2026' : 'Jan 18, 2026',
                      time: '17:30',
                      status: language === 'tr' ? 'Katıldı' : 'Attended',
                      pts: '+25 SP',
                      bonus: language === 'tr' ? 'Zamanında Varış (+10 SP)' : 'On-Time Arrival (+10 SP)'
                    },
                    {
                      date: language === 'tr' ? '16 Ocak 2026' : 'Jan 16, 2026',
                      time: '17:30',
                      status: language === 'tr' ? 'Katıldı' : 'Attended',
                      pts: '+25 SP',
                      bonus: language === 'tr' ? 'Seri Devam (+20 SP)' : 'Streak Bonus (+20 SP)'
                    },
                    {
                      date: language === 'tr' ? '13 Ocak 2026' : 'Jan 13, 2026',
                      time: '17:30',
                      status: language === 'tr' ? 'Katıldı' : 'Attended',
                      pts: '+25 SP',
                      bonus: language === 'tr' ? 'Günün En Disiplinlisi (+30 SP)' : 'Most Disciplined of the Day (+30 SP)'
                    },
                    {
                      date: language === 'tr' ? '11 Ocak 2026' : 'Jan 11, 2026',
                      time: '10:00',
                      status: language === 'tr' ? 'Katıldı' : 'Attended',
                      pts: '+25 SP',
                      bonus: language === 'tr' ? 'Hafta Sonu Maçı (+40 SP)' : 'Weekend Match (+40 SP)'
                    },
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
                    <h3 className="font-bold text-base text-white">
                      {language === 'tr' ? 'Ödül Vitrini' : 'Reward Showcase'}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('sporpuan')}
                    className="text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    {language === 'tr' ? 'Tümünü Gör' : 'View All'}
                  </button>
                </div>

                <div className="space-y-3">
                  {rewards.slice(0, 3).map((item) => {
                    const loc = localizeReward(item);
                    return (
                      <div
                        key={loc.id}
                        className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 hover:border-slate-700 transition"
                      >
                        <img
                          src={loc.image}
                          alt={loc.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white truncate">{loc.title}</div>
                          <div className="text-[11px] text-amber-400 font-semibold">{loc.pointsRequired} SP</div>
                        </div>
                        <button
                          id={`btn-quick-redeem-${loc.id}`}
                          onClick={() => handleRedeem(item)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold transition"
                        >
                          {language === 'tr' ? 'Al' : 'Claim'}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-[11px] text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span>
                    {language === 'tr'
                      ? 'Her antrenmana zamanında gelerek haftalık +100 ekstra Sporpuan toplayabilirsiniz!'
                      : 'Arrive on-time for every session to collect +100 extra Sporpuan each week!'}
                  </span>
                </div>
              </div>

              {/* Coach & Club Direct Contact */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
                <h3 className="font-bold text-base text-white mb-3">
                  {language === 'tr' ? 'Antrenör & Kulüp İletişimi' : 'Coach & Club Contact'}
                </h3>
                <div className="flex items-center gap-3 p-3 bg-slate-950/80 rounded-2xl border border-slate-800 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    KC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Kadir Canpolat</div>
                    <div className="text-[11px] text-slate-400">
                      {language === 'tr' ? 'Basketbol U12 Başantrenörü' : 'Basketball U12 Head Coach'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => alert(language === 'tr' ? 'Antrenör telefon numarası: +90 532 555 12 34' : 'Coach direct telephone: +90 532 555 12 34')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'tr' ? 'Ara' : 'Call'}</span>
                  </button>
                  <button
                    onClick={() => alert(language === 'tr' ? 'SportsFly doğrudan veli-antrenör sohbet odası açılıyor...' : 'Connecting to parent-coach instant messaging...')}
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
                  <Zap className="w-3.5 h-3.5" />
                  {language === 'tr' ? 'SportsFly Sporpuan Sadakat & Ödül Ekosistemi' : 'SportsFly Sporpuan Loyalty & Reward Ecosystem'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {language === 'tr' ? 'Devamlılık Başarıyı, Başarı Ödülü Getirir!' : 'Dedication Brings Progress, Progress Brings Rewards!'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  {language === 'tr' ? (
                    <>{currentAthlete.name} antrenmanlara eksiksiz katılarak puanlarını biriktirdi. Kazandığı Sporpuanları aşağıdan kulüp ödüllerine dönüştürebilirsiniz.</>
                  ) : (
                    <>{currentAthlete.name} earned rewards through diligent workout attendance. Convert accumulated Sporpuan points into verified club rewards below.</>
                  )}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-center min-w-[200px]">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  {language === 'tr' ? 'Kullanılabilir Bakiye' : 'Available Balance'}
                </div>
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
                <h4 className="text-sm font-bold text-white">
                  {language === 'tr' ? 'Antrenman Katılımı' : 'Session Attendance'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'tr' ? 'Eğitmen yoklama aldığı anda sporcunun hesabına otomatik yüklenir.' : 'Credited instantly the moment the coach records the roster roll call.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm mb-2">
                  +50
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'tr' ? "4'lü Devam Serisi" : '4-Session Streak'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'tr' ? 'Hiç aksatmadan peş peşe 4 antrenmana katılan sporcuya sadakat bonusu verilir.' : 'Awarded when attending 4 consecutive workouts without any absences.'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-2">
                  +100
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'tr' ? 'Dönem Sonu Karnesi & Fair-Play' : 'Term Report Card & Fair Play'}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'tr' ? 'Koç tarafından verilen üstün disiplin ve karne başarı ödülü.' : 'Discretionary recognition granted by head coach for teamwork and leadership.'}
                </p>
              </div>
            </div>

            {/* Catalog Grid */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <span>{language === 'tr' ? 'Kulüp Ödül Kataloğu' : 'Club Reward Catalog'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => {
                  const loc = localizeReward(reward);
                  const isClaimed = claimedRewards.includes(reward.id);
                  const canAfford = athletePoints >= reward.pointsRequired;

                  return (
                    <div
                      key={reward.id}
                      className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col hover:border-slate-700 transition group shadow-lg"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={loc.image}
                          alt={loc.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-black flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          <span>{reward.pointsRequired} SP</span>
                        </div>
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-semibold text-slate-300">
                          {language === 'tr' ? `Kalan Stok: ${reward.stock} adet` : `Stock: ${reward.stock} remaining`}
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h4 className="font-bold text-base text-white group-hover:text-cyan-300 transition">
                            {loc.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {loc.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
                          <span className="text-[11px] text-slate-500">
                            {language === 'tr' ? `${reward.claimedCount} kez talep edildi` : `${reward.claimedCount} claims fulfilled`}
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
                            <span>
                              {canAfford
                                ? (language === 'tr' ? 'Ödülü Al' : 'Claim Reward')
                                : (language === 'tr' ? `${reward.pointsRequired - athletePoints} SP Eksik` : `Need ${reward.pointsRequired - athletePoints} SP`)}
                            </span>
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
                      {language === 'tr' ? 'Doğrulanmış Dijital Belge' : 'Verified Digital Document'}
                    </span>
                    <h2 className="text-2xl font-black text-white mt-1">
                      {currentAthlete.name} - {currentReportCard.period}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {language === 'tr'
                        ? `Başantrenör: ${currentReportCard.coachName} • Yayınlanma: ${currentReportCard.publishedAt}`
                        : `Head Coach: ${currentReportCard.coachName} • Published: ${currentReportCard.publishedAt}`}
                    </p>
                  </div>

                  <button
                    id="btn-open-full-report-modal"
                    onClick={() => setIsReportOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/25"
                  >
                    <Award className="w-4 h-4" />
                    <span>{language === 'tr' ? 'Detaylı Karne & Radar Görünümü' : 'Detailed Report & Radar View'}</span>
                  </button>
                </div>

                {/* Score Summary Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Genel Ortalama' : 'Overall Average'}
                    </span>
                    <div className="text-3xl font-black text-emerald-400 mt-1">
                      {currentReportCard.generalScore}<span className="text-sm font-normal text-slate-500">/100</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Antrenman Devamı' : 'Workout Attendance'}
                    </span>
                    <div className="text-3xl font-black text-cyan-400 mt-1">
                      %{currentAthlete.attendanceRate}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Dönem Sporpuan' : 'Term Sporpuan'}
                    </span>
                    <div className="text-3xl font-black text-amber-400 mt-1">
                      +{currentReportCard.sporpuanEarnedTotal}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400">
                      {language === 'tr' ? 'Gelişim Seviyesi' : 'Progress Tier'}
                    </span>
                    <div className="text-sm font-black text-white mt-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>{currentAthlete.rankBadge}</span>
                    </div>
                  </div>
                </div>

                {/* Metric Bars */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-200">
                    {language === 'tr' ? 'Beceri Değerlendirmeleri' : 'Core Skill Evaluations'}
                  </h4>
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
                  <div className="font-bold text-white mb-1">
                    {language === 'tr' ? 'Antrenörün Dönem Sonu Değerlendirmesi:' : "Head Coach's End-of-Term Evaluation:"}
                  </div>
                  <p className="italic">"{currentReportCard.coachNotes}"</p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl">
                <Award className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">
                  {language === 'tr' ? 'Bu Sporcu İçin Henüz Karne Yayınlanmadı' : 'No Report Card Published for This Athlete Yet'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  {language === 'tr'
                    ? 'Antrenör dönem sonu gelişim puanlarını girdiğinde ve onayladığında dijital karne burada otomatik olarak belirecektir.'
                    : 'The digital report card will automatically appear here once the head coach grades and confirms the term development assessment.'}
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
              <span>{language === 'tr' ? 'Haftalık Antrenman Takvimi' : 'Weekly Training Schedule'}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  day: language === 'tr' ? 'Salı' : 'Tuesday',
                  time: '17:30 - 19:00',
                  title: language === 'tr' ? 'Temel Beceri & Drills' : 'Fundamental Skills & Drills',
                  place: language === 'tr' ? 'Atatürk Spor Salonu' : 'Atatürk Sports Arena',
                  status: language === 'tr' ? 'Gelecek' : 'Upcoming'
                },
                {
                  day: language === 'tr' ? 'Perşembe' : 'Thursday',
                  time: '17:30 - 19:00',
                  title: language === 'tr' ? 'Taktik & Şut Kliniği' : 'Tactics & Shooting Clinic',
                  place: language === 'tr' ? 'Atatürk Spor Salonu' : 'Atatürk Sports Arena',
                  status: language === 'tr' ? 'Gelecek' : 'Upcoming'
                },
                {
                  day: language === 'tr' ? 'Cumartesi' : 'Saturday',
                  time: '10:00 - 12:00',
                  title: language === 'tr' ? 'Hazırlık Maçı & Fiziksel Test' : 'Exhibition Match & Physical Test',
                  place: language === 'tr' ? 'Akademi Merkez Salonu' : 'Academy Main Arena',
                  status: language === 'tr' ? 'Gelecek' : 'Upcoming'
                },
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
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>{language === 'tr' ? 'Aidat & Ödeme Geçmişi' : 'Tuition & Payment History'}</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {language === 'tr' ? 'Kulüp abonelik ve kurs aidatı takibi' : 'Club membership and course dues tracking'}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {language === 'tr' ? 'Borç Yok • Düzenli Ödeyen Veli' : 'No Outstanding Balance • Up to Date'}
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  month: language === 'tr' ? 'Ocak 2026' : 'January 2026',
                  amount: '2.400 ₺',
                  status: language === 'tr' ? 'Ödendi' : 'Paid',
                  date: '02.01.2026',
                  invoice: 'SF-INV-0982'
                },
                {
                  month: language === 'tr' ? 'Aralık 2025' : 'December 2025',
                  amount: '2.400 ₺',
                  status: language === 'tr' ? 'Ödendi' : 'Paid',
                  date: '01.12.2025',
                  invoice: 'SF-INV-0841'
                },
                {
                  month: language === 'tr' ? 'Kasım 2025' : 'November 2025',
                  amount: '2.400 ₺',
                  status: language === 'tr' ? 'Ödendi' : 'Paid',
                  date: '02.11.2025',
                  invoice: 'SF-INV-0710'
                },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white text-sm">
                      {p.month} {language === 'tr' ? 'Aidatı' : 'Tuition'}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      {language === 'tr' ? 'Tahsilat Tarihi: ' : 'Paid on: '}{p.date} • {language === 'tr' ? 'Fatura: ' : 'Invoice: '}{p.invoice}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-white text-sm">{p.amount}</span>
                    <button
                      onClick={() => alert(language === 'tr' ? `Fatura ${p.invoice} PDF indiriliyor...` : `Downloading receipt ${p.invoice} PDF...`)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title={language === 'tr' ? 'Makbuz İndir' : 'Download Receipt'}
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
            <h3 className="text-xl font-bold text-white">
              {language === 'tr' ? 'Ödül Talebini Onaylıyor musunuz?' : 'Confirm Reward Claim?'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">{redeemingItem.title}</strong>{' '}
              {language === 'tr' ? 'ödülü için hesabınızdan' : 'reward will deduct'}{' '}
              <strong className="text-amber-400">{redeemingItem.pointsRequired} Sporpuan</strong>{' '}
              {language === 'tr' ? 'düşülecektir.' : 'from your balance.'}
            </p>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
              {language === 'tr' ? 'Kalan Bakiye: ' : 'Remaining Balance: '}
              <strong className="text-white">{athletePoints - redeemingItem.pointsRequired} SP</strong>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                id="btn-cancel-redeem"
                onClick={() => setRedeemingItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                {language === 'tr' ? 'Vazgeç' : 'Cancel'}
              </button>
              <button
                id="btn-confirm-redeem"
                onClick={confirmRedeem}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                {language === 'tr' ? 'Evet, Puanımla Al' : 'Yes, Claim with Points'}
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
