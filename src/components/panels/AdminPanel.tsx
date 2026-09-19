import React, { useState } from 'react';
import { BRANCHES_DATA, REWARD_CATALOG } from '../../data/mockData';
import {
  Activity,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  DollarSign,
  Gift,
  MessageSquare,
  Plus,
  Send,
  TrendingUp,
  Users,
  Zap,
  Building,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface AdminPanelProps {
  onBackToSite: () => void;
  onSwitchToCoach: () => void;
  onSwitchToParent: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToSite,
  onSwitchToCoach,
  onSwitchToParent,
}) => {
  const { language } = useLanguage();
  const [broadcastSent, setBroadcastSent] = useState(false);
  const defaultTrSms = 'Değerli Spor Okulu Velimiz; 2026 Güz Dönemi Dijital Sporcu Karneleri ve Sporpuan ödülleri yayınlanmıştır. SportsFly veli portalınızdan inceleyebilirsiniz.';
  const defaultEnSms = 'Dear Sports Academy Parents; 2026 Fall Term Digital Athlete Report Cards and Sporpuan rewards are now live. View them in your SportsFly parent portal.';
  const [smsText, setSmsText] = useState(language === 'tr' ? defaultTrSms : defaultEnSms);

  React.useEffect(() => {
    setSmsText(language === 'tr' ? defaultTrSms : defaultEnSms);
  }, [language]);

  const localizeBranchName = (name: string) => {
    if (language === 'tr') return name;
    switch (name) {
      case 'Basketbol Akademi': return 'Basketball Academy';
      case 'Voleybol Okulu': return 'Volleyball School';
      case 'Yüzme Branşı': return 'Swimming Branch';
      case 'Futbol Gelişim': return 'Football Development';
      case 'Cimnastik': return 'Gymnastics';
      default: return name;
    }
  };

  const handleSendBroadcast = () => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              {language === 'tr' ? 'Kulüp & Akademi Yönetim Paneli' : 'Club & Academy Admin Panel'}
            </span>
          </div>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-xs text-slate-600 font-semibold hidden md:inline">
            {language === 'tr' ? 'SportsFly Akademi Çoklu Şube Yönetimi' : 'SportsFly Multi-Branch Academy Management'}
          </span>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onSwitchToCoach}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition"
          >
            {language === 'tr' ? 'Antrenör Paneli' : 'Coach Panel'}
          </button>
          <button
            onClick={onSwitchToParent}
            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 border border-slate-200 transition"
          >
            {language === 'tr' ? 'Veli Paneli' : 'Parent Panel'}
          </button>
          <button
            onClick={onBackToSite}
            className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition"
          >
            {language === 'tr' ? '← Ana Sayfaya Dön' : '← Back to Home'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8 flex-1">
        {/* KPI Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'tr' ? 'Toplam Aktif Sporcu' : 'Total Active Athletes'}</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-950">799</div>
            <div className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? 'Geçen aya göre +18.4% yeni kayıt' : '+18.4% new registrations vs last month'}</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'tr' ? 'Genel Devamlılık Oranı' : 'Overall Attendance Rate'}</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">%94.6</div>
            <div className="text-xs text-slate-500">
              {language === 'tr' ? 'Sporpuan öncesi: ' : 'Before Sporpuan: '}<span className="line-through text-slate-400">%76.2</span>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'tr' ? 'Dolaşımdaki Sporpuan' : 'Circulating Sporpuan'}</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-amber-500">62.450 SP</div>
            <div className="text-xs text-slate-500">
              {language === 'tr' ? 'Talep Edilen Ödül: ' : 'Claimed Rewards: '}<strong className="text-slate-800">{language === 'tr' ? '368 Adet' : '368 Items'}</strong>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs">
              <span>{language === 'tr' ? 'Aylık Aidat Tahsilatı' : 'Monthly Dues Collected'}</span>
              <CreditCard className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-slate-950">1.147.000 ₺</div>
            <div className="text-xs text-emerald-600 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'tr' ? '%98.2 Zamanında Ödeme Oranı' : '98.2% On-Time Payment Rate'}</span>
            </div>
          </div>
        </div>

        {/* Branches Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-600" />
            <span>{language === 'tr' ? 'Aktif Branşlar ve Şube Dağılımı' : 'Active Disciplines & Branches'}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BRANCHES_DATA.map((branch) => (
              <div
                key={branch.id}
                className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{localizeBranchName(branch.name)}</h3>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {branch.coachCount} {language === 'tr' ? 'Antrenör' : 'Coaches'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 block text-[10px]">{language === 'tr' ? 'Kayıtlı Sporcu' : 'Enrolled Athletes'}</span>
                    <span className="font-black text-slate-900 text-base">{branch.studentCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">{language === 'tr' ? 'Aylık Ciro' : 'Monthly Revenue'}</span>
                    <span className="font-black text-emerald-600 text-base">
                      {branch.monthlyRevenue.toLocaleString(language === 'tr' ? 'tr-TR' : 'en-US')} ₺
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>
                    {language === 'tr' ? 'Devam Ortalaması: ' : 'Avg Attendance: '}
                    <strong className="text-slate-800">%95</strong>
                  </span>
                  <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                    {language === 'tr' ? 'Yönet →' : 'Manage →'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Parent Communication Center */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>{language === 'tr' ? 'Otomatik Veli Bildirim & WhatsApp Karnesi Merkezi' : 'Automated Parent Notification & WhatsApp Center'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'tr' 
                  ? 'Yoklama, karne ve Sporpuan bildirimlerini tüm velilere tek tıkla toplu iletin.'
                  : 'Broadcast attendance, report cards, and Sporpuan notifications to all parents with one click.'}
              </p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full font-bold">
              {language === 'tr' ? 'WhatsApp Cloud API Aktif' : 'WhatsApp Cloud API Active'}
            </span>
          </div>

          <div className="space-y-3">
            <textarea
              rows={3}
              value={smsText}
              onChange={(e) => setSmsText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-600"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {language === 'tr' ? 'Hedef Kitle: ' : 'Target Audience: '}
                <strong className="text-slate-900">
                  {language === 'tr' ? '799 Aktif Sporcu Velisi (WhatsApp + Push)' : '799 Active Parents (WhatsApp + Push)'}
                </strong>
              </span>

              <button
                id="btn-send-admin-broadcast"
                onClick={handleSendBroadcast}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>
                  {broadcastSent 
                    ? (language === 'tr' ? 'Mesajlar İletildi!' : 'Broadcast Dispatched!') 
                    : (language === 'tr' ? 'Toplu Bildirim & Karne Gönder' : 'Send Bulk Notification & Reports')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
