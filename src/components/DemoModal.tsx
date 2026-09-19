import React, { useState } from 'react';
import { CheckCircle2, Sparkles, X, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ActiveView } from '../types';

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
  const [clubName, setClubName] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('Basketbol');
  const [studentEstimate, setStudentEstimate] = useState('150 - 300 Sporcu');
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
                14 Gün Ücretsiz Deneme • Kredi Kartsız
              </span>
              <h3 className="text-2xl font-black text-slate-950 mt-2">
                Kulübünüzü SportsFly ile Güçlendirin
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Seçilen Plan: <strong className="text-blue-600">{selectedPlan}</strong>
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Kulüp veya Spor Okulu Adı *
                </label>
                <input
                  required
                  type="text"
                  placeholder="Örn: Anadolu Yıldızları Basketbol Akademisi"
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Yetkili Adı Soyadı *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Telefon (WhatsApp) *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+90 5XX XXX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:bg-white focus:border-blue-600 shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ana Branş</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none shadow-xs"
                  >
                    <option value="Basketbol">Basketbol</option>
                    <option value="Voleybol">Voleybol</option>
                    <option value="Yüzme">Yüzme</option>
                    <option value="Futbol">Futbol</option>
                    <option value="Cimnastik">Cimnastik</option>
                    <option value="Çoklu Branş">Çoklu Branş / Karma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sporcu Sayısı</label>
                  <select
                    value={studentEstimate}
                    onChange={(e) => setStudentEstimate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none shadow-xs"
                  >
                    <option value="50 - 100 Sporcu">50 - 100 Sporcu</option>
                    <option value="100 - 300 Sporcu">100 - 300 Sporcu</option>
                    <option value="300 - 600 Sporcu">300 - 600 Sporcu</option>
                    <option value="600+ Sporcu">600+ Sporcu</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 transition"
              >
                Ücretsiz Denemeyi Hemen Başlat
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-950">Kaydınız Başarıyla Alındı!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Teşekkürler Sayın <strong>{fullName || 'Kulüp Yöneticimiz'}</strong>! {clubName ? `"${clubName}"` : 'Kulübünüz'} için SportsFly deneme hesabı hazırlanıyor.
              Müşteri temsilcimiz WhatsApp üzerinden 15 dakika içinde aktivasyon bağlantınızı iletecektir.
            </p>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase shadow-md transition"
              >
                Harika, Teşekkürler (Kapat)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
