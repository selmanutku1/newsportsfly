import React, { useState } from 'react';
import { CheckCircle2, X, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveView } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
  onNavigateView: (view: ActiveView) => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  selectedPlan = 'Kulüp & Akademi',
  onNavigateView,
}) => {
  const { language, t } = useLanguage();
  const [clubName, setClubName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState(language === 'tr' ? 'Basketbol' : 'Basketball');
  const [studentEstimate, setStudentEstimate] = useState(language === 'tr' ? '150 - 300 Sporcu' : '150 - 300 Athletes');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {t.demoModalBadge}
              </span>
              <h3 className="text-2xl font-black text-slate-950 mt-2">
                {t.demoModalTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {t.demoModalPlanPrefix}: <strong className="text-blue-600">{selectedPlan}</strong>
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  {t.demoModalClubLabel} *
                </label>
                <input
                  required
                  type="text"
                  placeholder={t.demoModalClubPlaceholder}
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {t.demoModalNameLabel} *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={t.demoModalNamePlaceholder}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    {t.demoModalPhoneLabel} *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder={t.demoModalPhonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.demoModalBranchLabel}</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none shadow-xs"
                  >
                    {language === 'tr' ? (
                      <>
                        <option value="Basketbol">Basketbol</option>
                        <option value="Voleybol">Voleybol</option>
                        <option value="Yüzme">Yüzme</option>
                        <option value="Futbol">Futbol</option>
                        <option value="Cimnastik">Cimnastik</option>
                        <option value="Çoklu Branş">Çoklu Branş / Karma</option>
                      </>
                    ) : (
                      <>
                        <option value="Basketball">Basketball</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Football">Football / Soccer</option>
                        <option value="Gymnastics">Gymnastics</option>
                        <option value="Multi-Sport">Multi-Sport / Mixed</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">{t.demoModalAthletesLabel}</label>
                  <select
                    value={studentEstimate}
                    onChange={(e) => setStudentEstimate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none shadow-xs"
                  >
                    {language === 'tr' ? (
                      <>
                        <option value="50 - 100 Sporcu">50 - 100 Sporcu</option>
                        <option value="100 - 300 Sporcu">100 - 300 Sporcu</option>
                        <option value="300 - 600 Sporcu">300 - 600 Sporcu</option>
                        <option value="600+ Sporcu">600+ Sporcu</option>
                      </>
                    ) : (
                      <>
                        <option value="50 - 100 Athletes">50 - 100 Athletes</option>
                        <option value="100 - 300 Athletes">100 - 300 Athletes</option>
                        <option value="300 - 600 Athletes">300 - 600 Athletes</option>
                        <option value="600+ Athletes">600+ Athletes</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition"
              >
                {t.demoModalSubmit}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-950">{t.demoModalSuccessTitle}</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              {language === 'tr' ? (
                <>
                  Teşekkürler Sayın <strong>{fullName || 'Kulüp Yöneticimiz'}</strong>! {clubName ? `"${clubName}"` : 'Kulübünüz'} için SportsFly deneme hesabı hazırlanıyor.
                  Müşteri temsilcimiz WhatsApp üzerinden 15 dakika içinde aktivasyon bağlantınızı iletecektir.
                </>
              ) : (
                <>
                  Thank you, <strong>{fullName || 'Club Director'}</strong>! Your SportsFly trial environment for {clubName ? `"${clubName}"` : 'your club'} is being provisioned.
                  Our club specialist will message your activation link via WhatsApp within 15 minutes.
                </>
              )}
            </p>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md transition"
              >
                {t.demoModalClose}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
