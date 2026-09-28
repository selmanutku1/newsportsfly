import React, { useState, useEffect } from 'react';
import {
  X,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Clock,
  User,
  Building2,
  Phone,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SUPPORT_WA_NUMBER = '902168501907';

export function triggerLiveSupportModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-live-support'));
  }
}

interface LiveSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const LiveSupportModal: React.FC<LiveSupportModalProps> = ({
  isOpen,
  onClose,
  onOpen,
}) => {
  const { language } = useLanguage();
  const isTr = language === 'tr';

  const [fullName, setFullName] = useState('');
  const [clubName, setClubName] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(
    isTr ? 'Fiyat & Paket Bilgisi' : 'Pricing & Packages'
  );
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [generatedTargetUrl, setGeneratedTargetUrl] = useState('');

  // Listen for global 'open-live-support' event from any section
  useEffect(() => {
    const handleOpenEvent = () => {
      setSubmitted(false);
      onOpen();
    };
    window.addEventListener('open-live-support', handleOpenEvent);
    return () => window.removeEventListener('open-live-support', handleOpenEvent);
  }, [onOpen]);

  // Lock background scroll on mobile when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const buildSupportMessageUrl = () => {
    const msg = isTr
      ? `Merhaba SportsFly Destek Ekibi,\n\nBen *${fullName.trim()}* (*${clubName.trim()}*).\nKonu: *${topic}*\nİletişim Numaram: *${phone.trim()}*${
          note.trim() ? `\nNotum: ${note.trim()}` : ''
        }\n\nDetaylı bilgi ve destek rica ediyorum.`
      : `Hello SportsFly Support Team,\n\nI am *${fullName.trim()}* (*${clubName.trim()}*).\nTopic: *${topic}*\nPhone: *${phone.trim()}*${
          note.trim() ? `\nNote: ${note.trim()}` : ''
        }\n\nI would like assistance and detailed information.`;

    return `https://wa.me/${SUPPORT_WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetUrl = buildSupportMessageUrl();
    setGeneratedTargetUrl(targetUrl);

    const webhookUrl =
      import.meta.env.VITE_PANEL_WEBHOOK_URL ||
      'https://webapp.sportsfly.com.tr/api/demo-requests';

    const requestId = `SUPPORT-${Date.now()}`;
    const submittedAt = new Date().toISOString();

    const payload = {
      id: requestId,
      fullName: fullName.trim(),
      clubName: clubName.trim(),
      phone: phone.trim(),
      email: note.trim() ? `Not: ${note.trim()}` : '7/24 Destek Talebi',
      branch: topic,
      studentEstimate: 'Destek Talebi',
      selectedPlan: `7/24 Destek (${topic})`,
      source: 'sportsfly.com.tr (7/24 Destek)',
      submittedAt,
      recipient: 'selmanutkumarmara@gmail.com',
      customWebhookUrl: webhookUrl,
    };

    // Trigger direct message dispatch with user's contact info
    const tempAnchor = document.createElement('a');
    tempAnchor.href = targetUrl;
    tempAnchor.target = '_blank';
    tempAnchor.rel = 'noopener noreferrer';
    document.body.appendChild(tempAnchor);
    tempAnchor.click();
    document.body.removeChild(tempAnchor);

    try {
      // 1. Background save to server & forward to webapp.sportsfly.com.tr
      fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});

      // 2. Direct client webhook to webapp.sportsfly.com.tr
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(() => {});
      }

      // 3. Send email notification via FormSubmit
      fetch('https://formsubmit.co/ajax/selmanutkumarmara@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          'Talep Türü': '7/24 Destek Talebi',
          'Yetkili Adı Soyadı': fullName.trim(),
          'Kulüp / Akademi Adı': clubName.trim(),
          'Telefon Numarası': phone.trim(),
          'Destek Konusu': topic,
          'Mesaj / Not': note.trim() || 'Belirtilmedi',
          _subject: `💬 Yeni Destek Talebi: ${clubName.trim()} - ${fullName.trim()}`,
          _template: 'table',
        }),
      }).catch(() => {});
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const topics = isTr
    ? [
        'Fiyat & Paket Bilgisi',
        'Ücretsiz Kurulum & Excel Veri Aktarımı',
        'Otomatik Aidat Tahsilat Sistemi',
        'Sporpuan & Dijital Sporcu Karnesi',
        'Teknik Destek & Mevcut Üye İşlemleri',
      ]
    : [
        'Pricing & Packages',
        'Free Onboarding & Excel Migration',
        'Automated Tuition Collection',
        'Sporpuan & Digital Report Cards',
        'Technical Support & Existing Account',
      ];

  return (
    <>
      {/* Responsive Floating Bottom-Right 7/24 Support Trigger */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            onOpen();
          }}
          className="group flex items-center gap-2.5 bg-slate-950 hover:bg-slate-900 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-xl shadow-slate-950/25 border border-slate-800 transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          aria-label={isTr ? '7/24 Destek' : '24/7 Support'}
        >
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-blue-600 text-white flex-shrink-0">
            <Headphones className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-950"></span>
            </span>
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white pr-0.5">
            {isTr ? '7/24 Destek' : '24/7 Support'}
          </span>
        </button>
      </div>

      {/* Responsive Modal Dialog (Bottom Sheet on Mobile, Centered Card on Desktop) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/65 backdrop-blur-xs"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="relative w-full sm:max-w-lg bg-white border-t sm:border border-slate-200 rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl max-h-[92dvh] overflow-y-auto">
            {/* Mobile Drag Handle Indicator */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-3 sm:hidden" />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 transition cursor-pointer"
              aria-label={isTr ? 'Kapat' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="space-y-4 sm:space-y-5">
                {/* Header */}
                <div className="space-y-1.5 pr-8">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>
                      {isTr ? '7/24 Destek Merkezi' : '24/7 Support Center'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug">
                    {isTr
                      ? 'Uzman Destek Ekibimize Ulaşın'
                      : 'Contact Our Expert Support Team'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isTr
                      ? 'İletişim bilgilerinizi ve destek konunuzu paylaşın; uzman ekibimizle anında görüşmeye başlayın.'
                      : 'Share your contact details and support topic below to connect directly with our specialist team.'}
                  </p>
                </div>

                {/* Responsive Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTr ? 'Adınız Soyadınız *' : 'Full Name *'}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder={isTr ? 'Örn: Ahmet Yılmaz' : 'e.g. John Doe'}
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 sm:py-2.5 text-base sm:text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTr ? 'Kulüp / Akademi Adı *' : 'Club / Academy Name *'}
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          required
                          placeholder={isTr ? 'Örn: Kartal Spor Akademisi' : 'e.g. Apex Sports Academy'}
                          value={clubName}
                          onChange={(e) => setClubName(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 sm:py-2.5 text-base sm:text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTr ? 'Telefon Numaranız *' : 'Phone Number *'}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          placeholder="0532 000 00 00"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 sm:py-2.5 text-base sm:text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isTr ? 'Destek Konusu' : 'Support Topic'}
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3.5 py-2.5 sm:py-2.5 text-base sm:text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                      >
                        {topics.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isTr ? 'Mesajınız (İsteğe Bağlı)' : 'Message (Optional)'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        isTr
                          ? 'Örn: 180 sporcumuz var, kurulum süreci hakkında bilgi almak istiyoruz...'
                          : 'e.g. We have 180 athletes and want to learn about onboarding...'
                      }
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-3.5 py-2.5 sm:py-2.5 text-base sm:text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white transition"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full min-h-[46px] py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    >
                      <span>
                        {isTr ? 'Görüşmeyi Başlat' : 'Start Support Chat'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Subtle Trust Footer */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{isTr ? 'Ortalama yanıt süresi: < 2 dakika' : 'Avg. response time: < 2 mins'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isTr ? '7/24 Kesintisiz Destek' : '24/7 Dedicated Support'}</span>
                  </span>
                </div>
              </div>
            ) : (
              /* Confirmation State */
              <div className="text-center py-4 space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-lg sm:text-xl font-black text-slate-950">
                    {isTr
                      ? 'Destek Talebiniz İletildi!'
                      : 'Your Support Request Has Been Sent!'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {isTr
                      ? 'İletişim bilgileriniz uzman ekibimize ulaştı ve destek sohbet ekranınız hazır mesajınızla açıldı. Sohbet ekranı açılmadıysa aşağıdaki butondan devam edebilirsiniz:'
                      : 'Your contact details have been received and your support chat window has been launched. If it did not open automatically, continue below:'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <a
                    href={generatedTargetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md transition inline-flex items-center justify-center gap-2"
                  >
                    <span>
                      {isTr ? 'Destek Sohbetini Aç' : 'Open Support Chat'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto min-h-[44px] px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition"
                  >
                    {isTr ? 'Kapat' : 'Close'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
