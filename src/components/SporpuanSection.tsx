import React, { useState } from 'react';
import { REWARD_CATALOG } from '../data/mockData';
import {
  Award,
  CheckCircle2,
  Flame,
  Gift,
  Lock,
  TrendingUp,
  Unlock,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

interface SporpuanSectionProps {
  onOpenParentStore?: () => void;
}

export const SporpuanSection: React.FC<SporpuanSectionProps> = () => {
  const { language, t } = useLanguage();

  // Interactive Simulator State
  const [trainingCount, setTrainingCount] = useState<number>(10);
  const [punctualBonus, setPunctualBonus] = useState<boolean>(true);
  const [streakBonus, setStreakBonus] = useState<boolean>(true);
  const [fairPlayBonus, setFairPlayBonus] = useState<boolean>(true);

  // Calculate points
  const basePoints = trainingCount * 25;
  const punctualPts = punctualBonus ? trainingCount * 10 : 0;
  const streakPts = streakBonus ? Math.floor(trainingCount / 4) * 50 : 0;
  const fairPlayPts = fairPlayBonus ? 100 : 0;
  const totalCalculatedPoints = basePoints + punctualPts + streakPts + fairPlayPts;

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#2563EB', '#10B981'],
    });
  };

  const getRewardTitle = (title: string) => {
    if (language === 'tr') return title;
    if (title.includes('Şapka')) return 'Club Cap & Wristband';
    if (title.includes('Çanta')) return 'Sports Duffel Bag & Water Bottle';
    if (title.includes('Topu')) return 'Professional Match Ball';
    if (title.includes('Forması')) return 'Custom Name Club Jersey';
    return title;
  };

  return (
    <section id="sporpuan" className="py-24 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-current text-amber-500" />
            {t.sporpuanBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.sporpuanTitle} <br />
            <span className="text-amber-600">
              {t.sporpuanTitleHighlight}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.sporpuanDesc}
          </p>
        </div>

        {/* Interactive Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span>{t.sporpuanCalcTitle}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.sporpuanCalcDesc}
                </p>
              </div>
            </div>

            {/* Slider: Training count */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700">{t.sporpuanAttendanceCount}</span>
                <span className="text-amber-600 font-black text-sm">{trainingCount} {t.sporpuanTrainingUnit}</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                value={trainingCount}
                onChange={(e) => setTrainingCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>1 {t.sporpuanTrainingUnit}</span>
                <span>8 {t.sporpuanTrainingUnit}</span>
                <span>16 {t.sporpuanTrainingUnit}</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t.sporpuanBonusHeading}
              </div>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-amber-300 transition">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={punctualBonus}
                    onChange={(e) => setPunctualBonus(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.sporpuanPunctualTitle}</div>
                    <div className="text-[11px] text-slate-500">{t.sporpuanPunctualDesc}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600">+{trainingCount * 10} SP</span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-amber-300 transition">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={streakBonus}
                    onChange={(e) => setStreakBonus(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      <span>{t.sporpuanStreakTitle}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">{t.sporpuanStreakDesc}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600">
                  +{Math.floor(trainingCount / 4) * 50} SP
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:border-amber-300 transition">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={fairPlayBonus}
                    onChange={(e) => setFairPlayBonus(e.target.checked)}
                    className="w-4 h-4 rounded accent-amber-500"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.sporpuanFairPlayTitle}</div>
                    <div className="text-[11px] text-slate-500">{t.sporpuanFairPlayDesc}</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600">+100 SP</span>
              </label>
            </div>

            {/* Total Result Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-900/80 uppercase">{t.sporpuanEstimated}</div>
                <div className="text-3xl sm:text-4xl font-black text-amber-600 mt-1 flex items-center gap-2">
                  <Zap className="w-7 h-7 fill-current" />
                  {totalCalculatedPoints} <span className="text-base text-amber-800 font-bold">SP</span>
                </div>
              </div>

              <button
                onClick={triggerConfetti}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md transition"
              >
                {t.sporpuanCelebrate}
              </button>
            </div>
          </div>

          {/* Right: Unlocked Rewards Live Preview */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <span>{t.sporpuanRewardsTitle}</span>
              </h3>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                {t.sporpuanCustomRewards}
              </span>
            </div>

            <div className="space-y-3">
              {REWARD_CATALOG.map((reward) => {
                const isUnlocked = totalCalculatedPoints >= reward.pointsRequired;
                const progressPct = Math.min(100, Math.round((totalCalculatedPoints / reward.pointsRequired) * 100));

                return (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                      isUnlocked
                        ? 'bg-white border-amber-300 shadow-md shadow-amber-500/5'
                        : 'bg-white/80 border-slate-200 opacity-75'
                    }`}
                  >
                    <img
                      src={reward.image}
                      alt={getRewardTitle(reward.title)}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{getRewardTitle(reward.title)}</h4>
                        <span
                          className={`text-xs font-black flex items-center gap-1 ${
                            isUnlocked ? 'text-amber-600' : 'text-slate-400'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 fill-current" />
                          {reward.pointsRequired} SP
                        </span>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden border border-slate-200/50">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUnlocked
                              ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                              : 'bg-slate-300'
                          }`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] mt-1.5">
                        <span className="text-slate-500">
                          {isUnlocked ? (
                            <span className="text-emerald-700 font-bold flex items-center gap-1">
                              <Unlock className="w-3 h-3 text-emerald-600" /> {t.sporpuanRewardUnlocked}
                            </span>
                          ) : (
                            <span className="text-slate-500 flex items-center gap-1">
                              <Lock className="w-3 h-3" /> {reward.pointsRequired - totalCalculatedPoints} {t.sporpuanRewardNeeded}
                            </span>
                          )}
                        </span>
                        <span className="text-slate-500 font-medium">%{progressPct}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
