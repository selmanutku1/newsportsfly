import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'tr' | 'en';

export interface FAQItem {
  q: string;
  a: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  club: string;
  stat: string;
}

export interface PricingPlanItem {
  id: string;
  name: string;
  desc: string;
  monthlyPrice: number;
  annualPrice: number;
  badge: string | null;
  popular?: boolean;
  features: string[];
  cta: string;
}

export interface FeaturePillarItem {
  title: string;
  subtitle: string;
  badge?: string;
  desc: string;
  points: string[];
}

export interface Translations {
  // Nav
  navPlatform: string;
  navWhySportsFly: string;
  navPricing: string;
  navResources: string;
  navDemoReserve: string;
  navLogin: string;
  navAutomation: string;
  navAutomationDesc: string;
  navSporpuan: string;
  navSporpuanDesc: string;
  navDigitalReport: string;
  navDigitalReportDesc: string;
  navAllModules: string;
  navAllModulesDesc: string;
  navFaq: string;
  navFaqDesc: string;
  navRoi: string;
  navRoiDesc: string;
  navLoginAdmin: string;
  navLoginAdminDesc: string;
  navLoginCoach: string;
  navLoginCoachDesc: string;
  navLoginParent: string;
  navLoginParentDesc: string;

  // Hero
  heroBadge: string;
  heroTitle1: string;
  heroTitleHighlight: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroCtaReserve: string;
  heroCtaExplore: string;
  heroTrialBadge: string;
  heroStatClubs: string;
  heroStatAthletes: string;
  heroStatCollection: string;
  heroLiveMockupTitle: string;
  heroLiveMockupSub: string;
  // Hero Notifications
  heroNotifReminderTitle: string;
  heroNotifReminderDesc: string;
  heroNotifRegisteredTitle: string;
  heroNotifRegisteredDesc: string;
  heroNotifRestTitle: string;
  heroNotifRestDesc: string;
  heroNotifFundTitle: string;
  heroNotifFundDesc: string;
  heroNotifCarpoolTitle: string;
  heroNotifCarpoolDesc: string;
  heroNotifAcceptedTitle: string;
  heroNotifAcceptedDesc: string;
  heroNotifTrainingTitle: string;
  heroNotifTrainingDesc: string;
  heroNotifDuesPaidTitle: string;
  heroNotifDuesPaidDesc: string;
  // Hero Phone UI
  heroPhoneChangeView: string;
  heroPhoneImportant: string;
  heroPhoneUnloggedActivities: string;
  heroPhoneFee: string;
  heroPhoneMissingSchedule: string;
  heroPhoneUpcoming: string;
  heroPhoneMon: string;
  heroPhoneWed: string;
  heroPhoneThu: string;
  heroPhoneAug: string;
  heroPhoneTraining: string;
  heroPhoneInProgress: string;
  heroPhoneAttending: string;
  heroPhoneMainHall: string;
  heroPhoneAwayPitch: string;
  heroPhoneAwayMatchTitle: string;
  heroPhoneAwayMatchRequest: string;
  heroPhoneHome: string;
  heroPhoneEvents: string;
  heroPhoneInbox: string;
  heroPhoneTeamFund: string;
  heroPhoneMore: string;
  heroTabLeader: string;
  heroTabParent: string;
  heroTabReport: string;

  // Payment Automation
  payBadge: string;
  payTitle: string;
  payTitleHighlight: string;
  payDesc: string;
  payMethodsLabel: string;
  payZeroLoss: string;
  payAutoReceipt: string;
  payStep1Title: string;
  payStep1NotifyDate: string;
  payStep1DueDate: string;
  payStep2Title: string;
  payStep2Desc: string;
  payStep2Sending: string;
  payStep3Title: string;
  payStep3Org: string;
  payStep3Now: string;
  payStep3NotifTitle: string;
  payStep3NotifDesc: string;
  payStep3ReminderNote: string;
  payStep4Title: string;
  payStep4PaidBadge: string;
  payStep4Desc: string;

  // Sporpuan
  sporpuanBadge: string;
  sporpuanTitle: string;
  sporpuanTitleHighlight: string;
  sporpuanDesc: string;
  sporpuanSimTitle: string;
  sporpuanSimSubtitle: string;
  sporpuanSimTrainingLabel: string;
  sporpuanSimTrainings: string;
  sporpuanSimBonusesLabel: string;
  sporpuanSimPunctual: string;
  sporpuanSimPunctualDesc: string;
  sporpuanSimStreak: string;
  sporpuanSimStreakDesc: string;
  sporpuanSimFairPlay: string;
  sporpuanSimFairPlayDesc: string;
  sporpuanSimTotalEarned: string;
  sporpuanSimCurrentRank: string;
  sporpuanSimTestConfetti: string;
  sporpuanCatalogTitle: string;
  sporpuanCatalogSubtitle: string;
  sporpuanCatalogBadge: string;
  sporpuanCatAll: string;
  sporpuanCatEquipment: string;
  sporpuanCatExperience: string;
  sporpuanCatSpecial: string;
  sporpuanPointsSuffix: string;
  sporpuanRemainingStock: string;
  sporpuanClaimedCount: string;
  sporpuanUnlockHint: string;

  // Digital Report
  reportBadge: string;
  reportTitle: string;
  reportTitleHighlight: string;
  reportDesc: string;
  reportStep1Title: string;
  reportStep1Desc: string;
  reportStep2Title: string;
  reportStep2Desc: string;
  reportStep3Title: string;
  reportStep3Desc: string;
  reportStatBadge: string;
  reportCta: string;
  reportCardPeriod: string;
  reportCardGeneralScore: string;
  reportCardAttendanceRate: string;
  reportCardPointsEarned: string;
  reportCardCoachLetter: string;
  reportCardCategoryTechnical: string;
  reportCardCategoryPhysical: string;
  reportCardCategoryMental: string;
  reportCardCategoryTactical: string;
  reportCardStrengths: string;
  reportCardImprovements: string;
  reportCardDownloadPdf: string;
  reportCardClose: string;

  // All Modules / Features
  featuresBadge: string;
  featuresTitle: string;
  featuresTitleHighlight: string;
  featuresDesc: string;
  featuresPillars: FeaturePillarItem[];

  // ROI Calculator
  roiBadge: string;
  roiTitle: string;
  roiTitleHighlight: string;
  roiDesc: string;
  roiInputStudents: string;
  roiStudentsSuffix: string;
  roiInputMonthlyFee: string;
  roiRecoveredMonthly: string;
  roiRecoveredAnnual: string;
  roiHoursSaved: string;
  roiHoursSavedNote: string;
  roiSummaryNote: string;

  // Testimonials
  testimonialsBadge: string;
  testimonialsTitle: string;
  testimonialsTitleHighlight: string;
  testimonialsDesc: string;
  testimonialsList: TestimonialItem[];

  // Pricing
  pricingBadge: string;
  pricingTitle: string;
  pricingTitleHighlight: string;
  pricingDesc: string;
  pricingMonthly: string;
  pricingYearly: string;
  pricingDiscountBadge: string;
  pricingPlans: PricingPlanItem[];

  // FAQs
  faqBadge: string;
  faqTitle: string;
  faqDesc: string;
  faqList: FAQItem[];

  // Human Support
  supportBadge: string;
  supportTitle: string;
  supportTitleHighlight: string;
  supportDesc: string;
  supportCheck1: string;
  supportCheck2: string;
  supportCheck3: string;
  supportPhoneLabel: string;
  supportEmailLabel: string;
  supportMockupActivities: string;
  supportMockupMgmt: string;
  supportMockupCallMatch: string;
  supportMockupToday: string;
  supportMockupTomorrow: string;
  supportMockupThu: string;
  supportMockupTraining: string;
  supportMockupMatchDerby: string;
  supportMockupTeamMeeting: string;
  supportMockupConfirmed: string;
  supportMockupPending: string;
  supportMockupAttendingConfirmed: string;
  supportMockupRegisteredNote: string;

  // All Sports Banner
  allSportsEyebrow: string;
  allSportsTitle: string;
  allSportsDesc: string;
  allSportsBtnDemo: string;
  allSportsBtnFeatures: string;
  allSportsList: { name: string; icon: string }[];

  // Footer
  footerBrandDesc: string;
  footerComplianceBadge: string;
  footerColModules: string;
  footerColResources: string;
  footerColLegal: string;
  footerColContact: string;
  footerLinkBlog: string;
  footerLinkGuides: string;
  footerLinkSecurity: string;
  footerLinkPrivacy: string;
  footerLinkTerms: string;
  footerLinkKvkk: string;
  footerMadeWith: string;
  allRightsReserved: string;

  // Demo Modal
  modalBadge: string;
  modalTitle: string;
  modalSelectedPlan: string;
  modalClubName: string;
  modalFullName: string;
  modalPhone: string;
  modalBranch: string;
  modalStudentCount: string;
  modalSubmit: string;
  modalSuccessTitle: string;
  modalSuccessDesc: string;
  modalBtnExploreCockpit: string;
  modalBtnClose: string;

  // Extra support fields
  supportPhoneHeader: string;
  supportPhoneNotifTitle: string;
  supportPhoneNotifDesc: string;
  supportToday: string;
  supportTraining: string;
  supportTrainingDesc: string;
  supportConfirmed: string;
  supportTomorrow: string;
  supportMatch: string;
  supportMatchDesc: string;
  supportPending: string;
  supportThursday: string;
  supportMeeting: string;
  supportMeetingDesc: string;
  supportAttendanceConfirmed: string;
  supportAttendanceConfirmedDesc: string;
  supportBullet1: string;
  supportBullet2: string;
  supportBullet3: string;

  // Extra pricing fields
  pricingAnnual: string;
  pricingIncludedFeatures: string;

  // Extra ROI fields
  roiAthletesLabel: string;
  roiDuesLabel: string;
  roiAnnualSaved: string;
  roiAnnualSavedNote: string;
  roiTimeSaved: string;
  roiTimeSavedNote: string;
  roiAttendanceIncrease: string;
  roiAttendanceIncreaseNote: string;

  // Extra Sporpuan fields
  sporpuanCalcTitle: string;
  sporpuanCalcDesc: string;
  sporpuanAttendanceCount: string;
  sporpuanTrainingUnit: string;
  sporpuanBonusHeading: string;
  sporpuanPunctualTitle: string;
  sporpuanPunctualDesc: string;
  sporpuanStreakTitle: string;
  sporpuanStreakDesc: string;
  sporpuanFairPlayTitle: string;
  sporpuanFairPlayDesc: string;
  sporpuanEstimated: string;
  sporpuanCelebrate: string;
  sporpuanRewardsTitle: string;
  sporpuanCustomRewards: string;
  sporpuanRewardUnlocked: string;
  sporpuanRewardNeeded: string;

  // Extra footer fields
  footerBranchesTitle: string;
  footerBranchBasketball: string;
  footerBranchVolleyball: string;
  footerBranchSwimming: string;
  footerBranchFootball: string;
  footerRequestDemo: string;
  footerContactTitle: string;
  footerRights: string;
  footerPrivacy: string;
  footerTerms: string;
  footerKvkk: string;
  footerDesc: string;
  footerSecurity: string;
  footerModulesTitle: string;
  footerModAttendance: string;
  footerModSporpuan: string;
  footerModReport: string;
  footerModClubs: string;
  footerModFinance: string;

  // All sports banner
  sportsBadge: string;
  sportsHeadline: string;
  sportsBookDemo: string;
  sportsViewFeatures: string;

  // Demo modal extra
  demoModalBadge: string;
  demoModalTitle: string;
  demoModalPlanPrefix: string;
  demoModalClubLabel: string;
  demoModalClubPlaceholder: string;
  demoModalNameLabel: string;
  demoModalNamePlaceholder: string;
  demoModalPhoneLabel: string;
  demoModalPhonePlaceholder: string;
  demoModalBranchLabel: string;
  demoModalAthletesLabel: string;
  demoModalSubmit: string;
  demoModalSuccessTitle: string;
  demoModalClose: string;

  // Digital report extra
  reportSurveyFact: string;
  reportInspectSample: string;
  reportPeriod: string;
  reportOverallScore: string;
  reportViewSampleBtn: string;
}

const translations: Record<Language, Translations> = {
  tr: {
    // Nav
    navPlatform: 'Platform',
    navWhySportsFly: 'Neden Sportsfly',
    navPricing: 'Fiyatlar',
    navResources: 'Kaynaklar',
    navDemoReserve: 'Demo rezervasyonu yapın',
    navLogin: 'Giriş yapmak',
    navAutomation: 'Otomasyon & Aidat',
    navAutomationDesc: 'Otomatik ödeme ve hatırlatıcılar',
    navSporpuan: 'Sporpuan Sadakat',
    navSporpuanDesc: 'Ödüllendirme ve motivasyon',
    navDigitalReport: 'Dijital Sporcu Karnesi',
    navDigitalReportDesc: 'Gelişim takibi ve karne paylaşımı',
    navAllModules: 'Tüm Modüller',
    navAllModulesDesc: 'Yoklama, takvim, veli iletişimi',
    navFaq: 'Sıkça Sorulan Sorular',
    navFaqDesc: 'Merak edilen yanıtlar',
    navRoi: 'Tasarruf Hesaplayıcı',
    navRoiDesc: 'Kulübünüzün kazancını hesaplayın',
    navLoginAdmin: 'Kulüp Yöneticisi Girişi',
    navLoginAdminDesc: 'Yönetim ve tahsilat paneli',
    navLoginCoach: 'Antrenör Girişi',
    navLoginCoachDesc: 'Yoklama & Karne değerlendirme',
    navLoginParent: 'Veli & Sporcu Girişi',
    navLoginParentDesc: 'Sporpuan & Dijital Karne',

    // Hero
    heroBadge: 'SPOR KULÜPLERİ İÇİN YENİ NESİL PLATFORM',
    heroTitle1: 'Spor Kulüpleri ve Akademiler İçin',
    heroTitleHighlight: 'Yönetim ve Sadakat',
    heroTitle2: 'Sistemi',
    heroSubtitle: 'Aidat takibini %100 otomatikleştirin, Sporpuan ve Dijital Karne ile sporcularınızın devamlılığını ve kulüp bağlılığını zirveye taşıyın.',
    heroCtaReserve: 'Demo Rezervasyonu Yapın',
    heroCtaExplore: 'Canlı Panelleri İncele',
    heroTrialBadge: '14 Gün Ücretsiz Deneme • Kredi kartı gerekmez',
    heroStatClubs: 'Aktif Spor Kulübü',
    heroStatAthletes: 'Lisanslı Sporcu & Öğrenci',
    heroStatCollection: 'Zamanında Tahsilat Oranı',
    heroLiveMockupTitle: 'Yönetim & Sadakat Kokpiti',
    heroLiveMockupSub: 'Canlı kulüp metrikleri ve devamlılık durumu',
    // Hero Notifications
    heroNotifReminderTitle: 'Hatırlatma gönderildi',
    heroNotifReminderDesc: 'Yanıt vermeyen 3 oyuncuya bildirim gönderildi.',
    heroNotifRegisteredTitle: "14 kişiden 12'si kayıt oldu.",
    heroNotifRegisteredDesc: 'Hafta Sonu Karşılaşması, Cmt 14:00',
    heroNotifRestTitle: 'Dinlendirme kararı alındı.',
    heroNotifRestDesc: 'Hafta sonu maçı için antrenman programı güncellendi.',
    heroNotifFundTitle: 'Takım fonu: 4.280 ₺',
    heroNotifFundDesc: 'Bu hafta 2 yeni aidat ödemesi yapıldı.',
    heroNotifCarpoolTitle: 'Araç paylaşımı ayarlandı.',
    heroNotifCarpoolDesc: "7 sporcudan 5'i deplasman maçına arabayla gidiyor.",
    heroNotifAcceptedTitle: 'Kerem antrenmana katılıyor.',
    heroNotifAcceptedDesc: 'U14 Antrenmanı, 14 Mayıs Perşembe, saat 17:30',
    heroNotifTrainingTitle: 'Yeni antrenman saati',
    heroNotifTrainingDesc: '14 Mayıs Perşembe 17:30 — Kapalı Spor Salonu B Sahası',
    heroNotifDuesPaidTitle: 'Üyelik ücreti ödendi.',
    heroNotifDuesPaidDesc: '1.250 ₺ başarıyla tahsil edildi.',
    // Hero Phone UI
    heroPhoneChangeView: 'Görünümü değiştir',
    heroPhoneImportant: 'Önemli',
    heroPhoneUnloggedActivities: '7 bildirilmemiş faaliyet',
    heroPhoneFee: 'Ücret',
    heroPhoneMissingSchedule: '10 zaman çizelgesi eksik.',
    heroPhoneUpcoming: 'Yaklaşan etkinlikler',
    heroPhoneMon: 'PAZARTESİ',
    heroPhoneWed: 'ÇARŞAMBA',
    heroPhoneThu: 'PERŞEMBE',
    heroPhoneAug: 'AĞUSTOS',
    heroPhoneTraining: 'Antrenman',
    heroPhoneInProgress: 'Devam ediyor',
    heroPhoneAttending: 'Katılıyorum',
    heroPhoneMainHall: 'Ana Salon',
    heroPhoneAwayPitch: 'Deplasman Sahası',
    heroPhoneAwayMatchTitle: '🛡️ Yıldızlar SK Karşılaşması',
    heroPhoneAwayMatchRequest: 'Deplasman servisi için araç desteği rica ediyorum.',
    heroPhoneHome: 'Ev',
    heroPhoneEvents: 'Etkinlikler',
    heroPhoneInbox: 'Gelen Kutusu',
    heroPhoneTeamFund: 'Takım Fonu',
    heroPhoneMore: 'Daha',
    heroTabLeader: 'Kulüp & Antrenör Kokpiti',
    heroTabParent: 'Veli Portalı & Ödeme',
    heroTabReport: 'Dijital Sporcu Karnesi',

    // Payment Automation
    payBadge: 'Nasıl çalışır?',
    payTitle: 'Geciken aidatlara son:',
    payTitleHighlight: '%100 Otomatik Tahsilat & Akıllı Bildirimler',
    payDesc: 'SportsFly, velilerinize kişiselleştirilmiş SMS ve WhatsApp ödeme linkleri gönderir. Tek tıkla güvenli online ödeme alın, makbuz ve muhasebe fişlerini otomatik oluşturun.',
    payMethodsLabel: 'Desteklenen Güvenli Ödeme Yöntemleri',
    payZeroLoss: '%0 Aidat Kaybı',
    payAutoReceipt: 'Otomatik E-Makbuz',
    payStep1Title: 'Bildirim tarihini belirliyorsunuz.',
    payStep1NotifyDate: 'Bildirim tarihi',
    payStep1DueDate: 'Son ödeme tarihi',
    payStep2Title: 'Ödeme motoru ücretleri oluşturur ve gönderir.',
    payStep2Desc: 'Ücretler tamamen otomatik olarak oluşturulur ve tüm velilere anlık olarak gönderilir.',
    payStep2Sending: 'Ücretler gönderiliyor...',
    payStep3Title: 'Üye, ücret tutarını anlık bildirim ve e-posta yoluyla alır.',
    payStep3Org: 'SPORTSFLY YÖNETİMİ',
    payStep3Now: 'Şimdi',
    payStep3NotifTitle: 'Yeni bir aidat bildirimi',
    payStep3NotifDesc: 'Arda Yılmaz • Bahar Dönemi 2026 • 1.450 ₺',
    payStep3ReminderNote: 'Hatırlatmalar veli ödeyene kadar otomatik olarak gönderilir.',
    payStep4Title: 'Üye aidatı öder.',
    payStep4PaidBadge: 'Ödendi',
    payStep4Desc: '1.450 ₺ otomatik olarak sisteme kaydedilir, veliye e-makbuz iletilir ve muhasebe kayıtları anında güncellenir.',

    // Sporpuan
    sporpuanBadge: 'SPORPUAN OYUNLAŞTIRMA & ÖDÜL EKOSİSTEMİ',
    sporpuanTitle: 'Sporcuların Devamlılığı Puan Kazandırır,',
    sporpuanTitleHighlight: 'Puanlar Hayalleri Süsleyen Ödüllere Dönüşür',
    sporpuanDesc: 'Spor okullarında devamsızlık sorununu cezayla değil, çocukların bayıldığı oyunlaştırma mekanikleriyle çözüyoruz. Devam eden kazanır!',
    sporpuanSimTitle: 'Canlı Sporpuan Hesaplama Simülatörü',
    sporpuanSimSubtitle: 'Sporcunun antrenman katılımına göre kazanacağı puanı canlı test edin.',
    sporpuanSimTrainingLabel: 'Aylık Katılınan Antrenman Sayısı:',
    sporpuanSimTrainings: 'Antrenman',
    sporpuanSimBonusesLabel: 'Ek Devamlılık & Başarı Bonusları:',
    sporpuanSimPunctual: 'Zamanında Antrenmana Giriş (+10 SP/ant.)',
    sporpuanSimPunctualDesc: 'Antrenmana vaktinde gelen sporcular ekstra ödüllendirilir.',
    sporpuanSimStreak: '4 Antrenman Kesintisiz Seri Bonusu (+50 SP)',
    sporpuanSimStreakDesc: 'Aralıksız devam eden sporcular çarpan bonusu kazanır.',
    sporpuanSimFairPlay: 'Ayın Fair-Play & Antrenör Takdiri (+100 SP)',
    sporpuanSimFairPlayDesc: 'Örnek sporcu davranışı sergileyenler ödüllendirilir.',
    sporpuanSimTotalEarned: 'Aylık Kazanılan Sporpuan',
    sporpuanSimCurrentRank: 'Mevcut Rütbe Rozeti',
    sporpuanSimTestConfetti: 'Puanı Test Et & Kutla!',
    sporpuanCatalogTitle: 'Kulüp Ödül Vitrini',
    sporpuanCatalogSubtitle: 'Sporcular kazandıkları puanları istedikleri hediyelere dönüştürsün.',
    sporpuanCatalogBadge: 'CANLI MAĞAZA',
    sporpuanCatAll: 'Tümü',
    sporpuanCatEquipment: 'Ekipman',
    sporpuanCatExperience: 'Deneyim',
    sporpuanCatSpecial: 'Özel',
    sporpuanPointsSuffix: 'SPORPUAN',
    sporpuanRemainingStock: 'Kalan Stok',
    sporpuanClaimedCount: 'Kazanıldı',
    sporpuanUnlockHint: 'Kazanmak İçin:',

    // Digital Report
    reportBadge: 'YENİ NESİL ÖLÇME & DEĞERLENDİRME',
    reportTitle: 'Kağıt Karneler Tarih Oldu:',
    reportTitleHighlight: 'Velilerle Otomatik Paylaşılan Dijital Karneler',
    reportDesc: 'Sporcunun gelişimini, yetenek skorlarını ve antrenör notlarını modern grafiklerle belgeleyin. Tek tıkla velinin WhatsApp ve veli portalına otomatik gönderilsin.',
    reportStep1Title: 'Antrenör 2 Dakikada Puanlar',
    reportStep1Desc: 'Şut, pas, taktik anlayış, kondisyon ve mental dayanıklılık gibi branşa özel kriterleri telefon üzerinden kolayca değerlendirir.',
    reportStep2Title: 'Otomatik Veli Bildirimi & WhatsApp',
    reportStep2Desc: 'Karne onaylandığında veliye push bildirim ve istenirse doğrudan WhatsApp üzerinden güvenli bağlantı gider. Veli telefonundan anında inceler.',
    reportStep3Title: 'QR Doğrulamalı ve PDF İndirilebilir',
    reportStep3Desc: 'Veliler hatıra olarak saklayabilir, sosyal medyada paylaşabilir veya PDF olarak indirip yazdırabilir. Kulübünüzün kurumsal kimliği yücelir.',
    reportStatBadge: "Velilerin %98'i dijital karne sistemini kulüp tercihinde belirleyici buluyor.",
    reportCta: 'Örnek Karneyi İncele',
    reportCardPeriod: '2025-2026 Güz Gelişim Dönemi',
    reportCardGeneralScore: 'Genel Karne Notu',
    reportCardAttendanceRate: 'Dönem Devam Oranı',
    reportCardPointsEarned: 'Kazanılan Sporpuan',
    reportCardCoachLetter: 'Başantrenör Değerlendirme Mektubu',
    reportCardCategoryTechnical: 'Teknik Yetenekler',
    reportCardCategoryPhysical: 'Fiziksel & Atletizm',
    reportCardCategoryMental: 'Mental & Disiplin',
    reportCardCategoryTactical: 'Taktik Oyun Anlayışı',
    reportCardStrengths: 'Öne Çıkan Güçlü Yönler',
    reportCardImprovements: 'Gelişime Açık Alanlar',
    reportCardDownloadPdf: 'Resmi PDF Karneyi İndir',
    reportCardClose: 'Kapat',

    // All Modules / Features
    featuresBadge: 'KAPSAMLI MODÜLLER',
    featuresTitle: 'Spor Okulunuzun İhtiyaç Duyduğu',
    featuresTitleHighlight: 'Tüm Araçlar Tek Bir Platformda',
    featuresDesc: 'Geleneksel ve hantal yazılımların eksik kaldığı noktaları, sporcu psikolojisini motive eden Sporpuan ve şeffaf dijital karne ekosistemiyle tamamladık.',
    featuresPillars: [
      {
        title: 'Devamlılık Odaklı Sporpuan',
        subtitle: 'Antrenmanı kaçırmayan sporcular puan ve ödül kazanır',
        desc: 'Spor okullarının en büyük sorunu olan devamsızlığı oyunlaştırma (gamification) ile çözüyoruz. Her antrenmana katılım, zamanında geliş ve antrenörün verdiği fair-play ödülleriyle sporcular puan biriktirir, kulüp mağazasından ödüller seçer.',
        points: [
          'Yoklama alındığı an sporcunun hesabına otomatik puan yükleme',
          '3, 5 ve 10 antrenmanlık peş peşe devam serisi çarpanları',
          'Kulübün kendi ekipman ve deneyim ödüllerini ekleyebileceği esnek katalog',
          'Devamsızlık oranında kanıtlanmış %70 net azalma'
        ]
      },
      {
        title: 'Dijital Sporcu Gelişim Karnesi',
        subtitle: 'Teknik, fiziksel ve mental gelişimi velilerle otomatik paylaşın',
        badge: 'Otomatik Paylaşım',
        desc: 'Dönem sonlarında kağıt karnelerle uğraşmayın. Antrenörler mobil cihazlarından sporcunun yeteneklerini (şut, pas, kondisyon, disiplin) puanlar; sistem görsel gelişim grafiklerini ve koç mektubunu saniyeler içinde velinin cebine gönderir.',
        points: [
          'Branşa özel yetenek normları ve radar gelişim grafikleri',
          'Antrenör sesli veya yazılı değerlendirme mektubu',
          'WhatsApp, SMS ve Veli Portalı üzerinden anlık paylaşım',
          'QR kodlu ve doğrulanabilir dijital PDF formatı'
        ]
      },
      {
        title: 'Mobil Eğitmen & Hızlı Yoklama',
        subtitle: '15 saniyede antrenman yoklamasını tamamlayın',
        badge: 'Zaman Tasarrufu',
        desc: 'Antrenörlerinizin kıymetli vaktini evrak işlerine değil, sahada çocuklara ayırmasını sağlayın. Hızlı liste yoklaması veya QR kod tarayıcı ile grup yoklaması anında alınır, gelmeyen sporcuların velilerine otomatik bildirim düşer.',
        points: [
          'Tek tıkla "Tümünü Geldi İşaretle" ve anında Sporpuan dağıtımı',
          'Gelmedi / Mazeretli durumlarında veliye otomatik bilgilendirme',
          'Antrenör performans ve seans doluluk raporlaması',
          'İnternet çekmeyen spor salonlarında dahi çevrimdışı çalışma desteği'
        ]
      },
      {
        title: 'Şeffaf Veli Portalı & Aidat Takibi',
        subtitle: 'Geciken ödemeleri önleyin, veli memnuniyetini zirveye çıkarın',
        badge: 'Finansal Güç',
        desc: 'Veliler kendi portalları üzerinden çocuklarının devamlılığını, biriken Sporpuanlarını, karnesini ve aidat durumunu takip eder. Otomatik hatırlatıcılar ve sanal POS entegrasyonu ile aidat kaçakları sıfıra iner.',
        points: [
          'Veliler için kullanıcı adı/şifre derdi olmadan güvenli giriş',
          'Vade tarihi gelen aidatlar için nazik otomatik WhatsApp hatırlatmaları',
          'Kredi kartıyla tek tıkla veya taksitli online ödeme imkanı',
          'Resmi e-makbuz ve faturaların otomatik veliye iletilmesi'
        ]
      }
    ],

    // ROI Calculator
    roiBadge: 'KULÜP TASARRUF & KAZANÇ HESAPLAYICISI',
    roiTitle: 'SportsFly Kulübünüze Ne Kadar',
    roiTitleHighlight: 'Zaman ve Para Kazandırır?',
    roiDesc: 'Sporcu sayınızı ve aidatınızı belirleyin; otomasyon ve Sporpuan sadakat sisteminin kulübünüze katacağı net değeri anında hesaplayın.',
    roiInputStudents: 'Aktif Sporcu Sayısı:',
    roiStudentsSuffix: 'Öğrenci',
    roiInputMonthlyFee: 'Aylık Ortalama Aidat Tutarı:',
    roiRecoveredMonthly: 'Aylık Kurtarılan Aidat Kaçağı',
    roiRecoveredAnnual: 'Yıllık Ekstra Kulüp Kazancı',
    roiHoursSaved: 'Haftalık Tasarruf Edilen Yönetim Süresi',
    roiHoursSavedNote: 'Kağıt yoklamalar, geciken ödeme takipleri ve manuel veli aramaları yerine',
    roiSummaryNote: 'Kulüplerimizde ortalama %8 oranındaki tahsilat kaçakları ve gecikmeler sıfırlanmaktadır.',

    // Testimonials
    testimonialsBadge: 'KULÜP YÖNETİCİLERİ & VELİLER NE DİYOR?',
    testimonialsTitle: '140+ Spor Okulunun Güvendiği',
    testimonialsTitleHighlight: 'Başarı Hikayeleri',
    testimonialsDesc: 'SportsFly ile devamlılığı artıran, velileriyle güçlü bağ kuran ve aidat kayıplarını sıfırlayan spor kulüplerinin gerçek deneyimleri.',
    testimonialsList: [
      {
        quote: 'SportsFly öncesinde yoklamaları kağıtta alıyor, karneleri dönem sonu telaşla hazırlıyorduk. Sporpuan sistemini devreye aldığımız ilk ayda antrenman devamsızlığı %70 azaldı! Veliler karneleri telefonlarında görünce kulübümüze duydukları güven ikiye katlandı.',
        name: 'Serkan Erdem',
        role: 'Kulüp Başkanı & Başantrenör',
        club: 'Anadolu Yıldızları Spor Kulübü (550+ Sporcu)',
        stat: '%96 Devamlılık Oranı'
      },
      {
        quote: 'Oğlumun antrenmana gitmek için sabah erken kalktığına ilk kez şahit oldum. Sporpuan biriktirip kulüp formasını alabilmek için can atıyor. Antrenörün girdiği dijital karnede geliştiği alanları grafiklerle görmek bir veli olarak paha biçilemez.',
        name: 'Banu Çetinkaya',
        role: 'Sporcu Velisi (U12 Basketbol)',
        club: 'İstanbul Kartalları Akademi',
        stat: 'Veli Memnuniyeti: 5/5'
      },
      {
        quote: 'Antrenörlerimiz yoklamayı 15 saniyede alıyor, otomatik olarak gelmeyen sporcunun velisine WhatsApp bildirimi düşüyor. Sporpuan ve otomatik karne özellikleri spor okulumuzun veli memnuniyetini ve motivasyonunu bambaşka bir seviyeye taşıdı.',
        name: 'Metin Barışkan',
        role: 'Genel Koordinatör',
        club: 'Ege Olimpik Yüzme ve Su Sporları',
        stat: 'Haftalık 18 Saat Zaman Tasarrufu'
      }
    ],

    // Pricing
    pricingBadge: 'ŞEFFAF FİYATLANDIRMA',
    pricingTitle: 'Kulübünüzün Büyüklüğüne Uygun,',
    pricingTitleHighlight: 'Sürpriz Maliyetsiz Planlar',
    pricingDesc: '14 gün boyunca kredi kartsız, tüm özellikleriyle ücretsiz deneyin.',
    pricingMonthly: 'Aylık Ödeme',
    pricingYearly: 'Yıllık Ödeme',
    pricingDiscountBadge: '%20 İndirim',
    pricingPlans: [
      {
        id: 'starter',
        name: 'Başlangıç Kulübü',
        desc: 'Tek şubeli, büyümekte olan butik spor okulları ve atölyeler için ideal.',
        monthlyPrice: 1490,
        annualPrice: 1190,
        badge: null,
        features: [
          '100 Aktif Sporcuya Kadar',
          'Mobil Uyumlu Hızlı Yoklama',
          'Temel Veli Bildirimleri (SMS & Mail)',
          'Dijital Sporcu Karnesi (Yılda 2 Dönem)',
          'Standart Sporpuan Entegrasyonu',
          '2 Antrenör & 1 Yönetici Hesabı',
          'E-posta ile Teknik Destek'
        ],
        cta: '14 Gün Ücretsiz Başla'
      },
      {
        id: 'growth',
        name: 'Kulüp & Akademi',
        desc: 'Devamlılığı ödüllendirmek, kurumsal veli iletişimi ve çoklu branş yönetimi isteyenler için.',
        monthlyPrice: 2890,
        annualPrice: 2290,
        badge: 'En Çok Tercih Edilen',
        popular: true,
        features: [
          '350 Aktif Sporcuya Kadar',
          'Gelişmiş Sporpuan & Ödül Kataloğu Modülü',
          'Sınırsız Dijital Sporcu Karnesi Oluşturma',
          'Velilere Otomatik WhatsApp Karnesi Gönderimi',
          'Performans Radar Grafikleri ve Gelişim Analitiği',
          'Otomatik Aidat Takibi & Sanal POS Entegrasyonu',
          'Sınırsız Antrenör & Branş Hesabı',
          '7/24 Öncelikli Canlı Destek & Kulüp Eğitimi'
        ],
        cta: 'Hemen Deneyin'
      },
      {
        id: 'enterprise',
        name: 'Pro Akademi & Çoklu Şube',
        desc: 'Birden fazla tesisi, yüzlerce sporcusu ve özel marka kimliği olan büyük kulüpler için.',
        monthlyPrice: 4990,
        annualPrice: 3990,
        badge: 'Maksimum Güç',
        features: [
          'Sınırsız Sporcu & Sınırsız Şube / Tesis',
          'Kendi Alan Adınız ve Özel Kulüp Mobil Uygulaması (White-Label)',
          'Kulübe Özel Sporpuan Ödül Havuzu ve Sponsor Entegrasyonu',
          'Özel Formlar, Turnuva ve Kamp Yönetimi',
          'Gelişmiş Finans, Kasa ve Muhasebe Entegrasyonu',
          'Özel Müşteri Başarı Yöneticisi',
          'Yerinde Kurulum ve Veri Taşıma Desteği'
        ],
        cta: 'Kurumsal Görüşme Ayarla'
      }
    ],

    // FAQs
    faqBadge: 'MERAK EDİLENLER',
    faqTitle: 'Sıkça Sorulan Sorular',
    faqDesc: 'Aklınıza takılan tüm soruların yanıtları burada. Farklı bir sorunuz varsa bize dilediğiniz an ulaşabilirsiniz.',
    faqList: [
      {
        q: 'Sporpuan sistemi tam olarak nasıl çalışır?',
        a: 'Sporcular her antrenmana geldiklerinde otomatik olarak sisteme tanımlı Sporpuan kazanırlar (Örn: Zamanında katılım +25 SP, 4 antrenman üst üste seri +100 SP, Fair-Play +50 SP). Biriken puanlar veli ve sporcu panelinde anlık görünür. Kulübün belirlediği ödül kataloğundan sporcu veya veli puanını harcayarak ödül talep eder.'
      },
      {
        q: 'Dijital Sporcu Karnesi velilere nasıl ulaşıyor?',
        a: 'Eğitmenler mobil üzerinden sporcunun teknik, fiziksel, taktik ve mental beceri puanlarını girip notunu ekledikten sonra "Yayınla" butonuna tıklar. Sistem otomatik olarak velinin SportsFly Portalı\'na push bildirim ve istenirse WhatsApp/SMS ile güvenli karne bağlantısı gönderir.'
      },
      {
        q: "Mevcut sistemlerimizden veya Excel'den verilerimizi aktarabilir miyiz?",
        a: 'Kesinlikle! Excel, CSV veya diğer spor yazılımlarında bulunan mevcut öğrenci, veli ve grup listelerinizi SportsFly Akıllı İçe Aktarma Sihirbazı ile sadece 3 dakikada sıfır veri kaybıyla aktarabilirsiniz.'
      },
      {
        q: 'Veli ve antrenörler uygulamayı nasıl kullanır?',
        a: 'SportsFly bulut tabanlıdır ve %100 mobil uyumlu modern bir web uygulaması (PWA) olarak çalışır. App Store veya Google Play indirme zorunluluğu olmadan herhangi bir telefon, tablet veya bilgisayardan tek tıkla kullanılır.'
      },
      {
        q: 'Aidat ve ödeme takibi yapabilir miyiz?',
        a: 'Evet. Sporcuların aylık aidat paketleri, ödeme vadeleri, gecikme uyarıları ve tahsilat makbuzları sistem tarafından otomatik yönetilir. Dilerseniz sanal POS entegrasyonu ile velilerinize kredi kartıyla tek tıkla güvenli ödeme imkanı sunabilirsiniz.'
      },
      {
        q: 'Deneme sürecinde kredi kartı gerekiyor mu?',
        a: 'Hayır, 14 günlük tam özellikli deneme sürümünü başlatmak için kredi kartı bilgisi gerekmez. Kulübünüzü oluşturup hemen antrenman yoklamaları ve Sporpuan sistemini test edebilirsiniz.'
      }
    ],

    // Human Support
    supportBadge: 'Destek ve güvenlik',
    supportTitle: 'Değişim sürecinin tamamında',
    supportTitleHighlight: 'gerçek insanlar',
    supportDesc: 'Değişim sürecinin tamamı boyunca ve sonrasında size eşlik edecek kişisel bir danışmanınız olacak. Destek ekibimiz, spor kulübü ve akademi yönetiminden kendi deneyimlerine sahip uzman kişilerden oluşmaktadır; günlük sahadaki yaşamınızı anlarlar ve sizin dilinizi konuşurlar.',
    supportCheck1: 'İlk günden itibaren sizi takip eden kişisel kulüp danışmanı.',
    supportCheck2: 'Telefon, WhatsApp ve e-posta yoluyla anında birebir destek.',
    supportCheck3: 'İhtiyacınız olduğunda dakikalar içinde hızlıca yanıt veriyoruz.',
    supportPhoneLabel: '0216 850 1907',
    supportEmailLabel: 'destek@sportsfly.com.tr',
    supportMockupActivities: 'Faaliyetlerim',
    supportMockupMgmt: 'Spor Yönetimi',
    supportMockupCallMatch: 'Yeni çağrı: Maç Cumartesi 10:00',
    supportMockupToday: 'BUGÜN',
    supportMockupTomorrow: 'YARIN',
    supportMockupThu: 'PERŞEMBE',
    supportMockupTraining: 'Antrenman',
    supportMockupMatchDerby: 'Karşılaşma (Derbi)',
    supportMockupTeamMeeting: 'Ekip Toplantısı',
    supportMockupConfirmed: 'Onaylandı',
    supportMockupPending: 'Yanıt Bekleniyor',
    supportMockupAttendingConfirmed: 'Katılım onaylandı',
    supportMockupRegisteredNote: 'Bugünkü antrenman için kaydınız tamamlandı.',

    // All Sports Banner
    allSportsEyebrow: 'TÜM SPORLAR',
    allSportsTitle: 'SportsFly, spor dalı ne olursa olsun kulübünüze uygun bir çözümdür.',
    allSportsDesc: "Futboldan atletizme, yüzmeden basketbola ve jimnastiğe kadar 60'tan fazla spor dalında kulüpler tarafından kullanılan SportsFly, kulübünüzün çalışma şekline kusursuz uyum sağlar.",
    allSportsBtnDemo: 'Demo rezervasyonu yapın',
    allSportsBtnFeatures: 'Tüm özellikleri görüntüle',
    allSportsList: [
      { name: 'Futbol', icon: '⚽' },
      { name: 'Basketbol', icon: '🏀' },
      { name: 'Voleybol', icon: '🏐' },
      { name: 'Yüzme', icon: '🏊‍♂️' },
      { name: 'Jimnastik', icon: '🤸' },
      { name: 'Tenis', icon: '🎾' },
      { name: 'Dövüş Sporları', icon: '🥋' },
      { name: 'Atletizm', icon: '🏃' },
    ],

    // Footer
    footerBrandDesc: 'SportsFly, spor okulları ve akademiler için yeni nesil bulut tabanlı yönetim yazılımıdır. Devamlılığı ödüllendiren Sporpuan, yapay zeka destekli dijital sporcu karneleri, veli ve eğitmen portallarıyla spor kulüplerini geleceğe taşır.',
    footerComplianceBadge: 'KVKK & ISO 27001 Uyumlu Veri Güvenliği',
    footerColModules: 'Modüller',
    footerColResources: 'Kaynaklar',
    footerColLegal: 'Yasal',
    footerColContact: 'İletişim & Destek',
    footerLinkBlog: 'Akademi Blogu',
    footerLinkGuides: 'Kullanım Rehberleri',
    footerLinkSecurity: 'Veri Güvenliği',
    footerLinkPrivacy: 'Gizlilik Politikası',
    footerLinkTerms: 'Kullanıcı Sözleşmesi',
    footerLinkKvkk: 'KVKK Aydınlatma Metni',
    footerMadeWith: 'Spor kulüpleri için sevgiyle geliştirildi',
    allRightsReserved: 'Tüm hakları saklıdır.',

    // Demo Modal
    modalBadge: '14 Gün Ücretsiz Deneme • Kredi Kartsız',
    modalTitle: 'Kulübünüzü SportsFly ile Güçlendirin',
    modalSelectedPlan: 'Seçilen Plan:',
    modalClubName: 'Kulüp / Akademi Adı',
    modalFullName: 'Yetkili Adı & Soyadı',
    modalPhone: 'Telefon Numarası',
    modalBranch: 'Ana Branş',
    modalStudentCount: 'Tahmini Aktif Sporcu Sayısı',
    modalSubmit: 'Ücretsiz Demo Hesabımı Başlat',
    modalSuccessTitle: 'Demo Talebiniz Başarıyla Alındı!',
    modalSuccessDesc: 'Kulüp danışmanınız 15 dakika içinde sizinle iletişime geçerek kulübünüze özel panel erişim bağlantınızı ve giriş bilgilerinizi iletecektir.',
    modalBtnExploreCockpit: 'Kulüp & Antrenör Kokpitini İncele',
    modalBtnClose: 'Pencereyi Kapat',

    // Extra support fields
    supportPhoneHeader: 'Tek dokunuşla tüm spor programı',
    supportPhoneNotifTitle: 'Bugün Antrenman Var!',
    supportPhoneNotifDesc: '18:00 - Ana Spor Salonu',
    supportToday: 'BUGÜN',
    supportTraining: 'Antrenman',
    supportTrainingDesc: '18:00 - 19:30 • Ana Salon',
    supportConfirmed: 'Katılıyor',
    supportTomorrow: 'YARIN',
    supportMatch: 'Yıldızlar SK Karşılaşması',
    supportMatchDesc: '10:00 - 12:00 • Deplasman Sahası',
    supportPending: 'Yanıt Bekleniyor',
    supportThursday: 'PERŞEMBE',
    supportMeeting: 'Taktik Analiz & Toplantı',
    supportMeetingDesc: '17:00 - 18:00 • Toplantı Odası',
    supportAttendanceConfirmed: 'Katılımınız antrenör tarafından onaylandı',
    supportAttendanceConfirmedDesc: 'Kerem bu antrenmandan +25 Sporpuan kazandı.',
    supportBullet1: 'Mobil Uyumlu Hızlı Yoklama & Bildirim',
    supportBullet2: 'WhatsApp ve SMS ile Anlık Bilgilendirme',
    supportBullet3: 'Sporpuan ile Kesintisiz Devamlılık Motivasyonu',

    // Extra pricing fields
    pricingAnnual: 'Yıllık',
    pricingIncludedFeatures: 'Dahil Olan Özellikler',

    // Extra ROI fields
    roiAthletesLabel: 'Aktif Sporcu Sayısı',
    roiDuesLabel: 'Aylık Sporcu Aidatı',
    roiAnnualSaved: 'Yıllık Geri Kazanılan Aidat',
    roiAnnualSavedNote: 'Kaçak ve geciken ödemelerin tahsiliyle',
    roiTimeSaved: 'Yıllık Tasarruf Edilen Zaman',
    roiTimeSavedNote: 'Yoklama ve karne otomasyonu sayesinde',
    roiAttendanceIncrease: 'Ortalama Devam Artışı',
    roiAttendanceIncreaseNote: 'Sporpuan ödül mekanizması ile',

    // Extra Sporpuan fields
    sporpuanCalcTitle: 'Sporpuan Kazanç Hesaplayıcı',
    sporpuanCalcDesc: 'Sporcunuzun antrenman devamlılığına göre kazanacağı puanları simüle edin.',
    sporpuanAttendanceCount: 'Aylık Antrenman Katılımı',
    sporpuanTrainingUnit: 'Antrenman',
    sporpuanBonusHeading: 'Ekstra Başarı & Devamlılık Bonusları',
    sporpuanPunctualTitle: 'Zamanında Katılım',
    sporpuanPunctualDesc: 'Antrenmana vaktinde gelme',
    sporpuanStreakTitle: '4 Hafta Kesintisiz Seri',
    sporpuanStreakDesc: 'Hiçbir antrenmanı kaçırmama',
    sporpuanFairPlayTitle: 'Fair-Play & Örnek Davranış',
    sporpuanFairPlayDesc: 'Koç ve takım takdiri',
    sporpuanEstimated: 'Tahmini Aylık Kazanç',
    sporpuanCelebrate: 'Tebrikler! Üst kademe ödüllere yaklaştınız.',
    sporpuanRewardsTitle: 'Sporpuan ile Alınabilecek Örnek Ödüller',
    sporpuanCustomRewards: 'Kulübünüz kendi ödül kataloğunu kolayca belirleyebilir.',
    sporpuanRewardUnlocked: 'Ödülü Açtınız! Talep Edebilirsiniz',
    sporpuanRewardNeeded: 'puan daha gerekli',

    // Extra footer fields
    footerBranchesTitle: 'Çözümler & Branşlar',
    footerBranchBasketball: 'Basketbol Akademisi',
    footerBranchVolleyball: 'Voleybol Okulları',
    footerBranchSwimming: 'Yüzme Kulüpleri',
    footerBranchFootball: 'Futbol Altyapı',
    footerRequestDemo: 'Kulübünüz İçin Demo İsteyin →',
    footerContactTitle: 'İletişim',
    footerRights: 'Tüm hakları saklıdır.',
    footerPrivacy: 'Gizlilik Politikası',
    footerTerms: 'Kullanım Koşulları',
    footerKvkk: 'KVKK Metni',
    footerDesc: 'SportsFly, spor okulları ve akademiler için yeni nesil bulut tabanlı yönetim yazılımıdır. Devamlılığı ödüllendiren Sporpuan, yapay zeka destekli dijital sporcu karneleri, veli ve eğitmen portallarıyla spor kulüplerini geleceğe taşır.',
    footerSecurity: 'KVKK & ISO 27001 Uyumlu Veri Güvenliği',
    footerModulesTitle: 'Ürün & Modüller',
    footerModAttendance: 'Otomatik Yoklama & Devamsızlık',
    footerModSporpuan: 'Sporpuan Sadakat & Ödül Sistemi',
    footerModReport: 'Dijital Sporcu Karnesi & Analitik',
    footerModClubs: 'Çoklu Branş & Şube Yönetimi',
    footerModFinance: 'Akıllı Aidat & Online Ödeme',

    // All sports banner
    sportsBadge: 'TÜM SPORLAR',
    sportsHeadline: 'SportsFly, spor dalı ne olursa olsun kulübünüze uygun bir çözümdür.',
    sportsBookDemo: 'Demo rezervasyonu yapın',
    sportsViewFeatures: 'Tüm özellikleri görüntüle',

    // Demo modal extra
    demoModalBadge: '14 Gün Ücretsiz Deneme • Kredi Kartsız',
    demoModalTitle: 'Kulübünüzü SportsFly ile Güçlendirin',
    demoModalPlanPrefix: 'Seçilen Plan',
    demoModalClubLabel: 'Kulüp / Akademi Adı',
    demoModalClubPlaceholder: 'Örn: Kadıköy Basketbol Akademi',
    demoModalNameLabel: 'Yetkili Adı Soyadı',
    demoModalNamePlaceholder: 'Örn: Ahmet Yılmaz',
    demoModalPhoneLabel: 'Telefon Numarası',
    demoModalPhonePlaceholder: '05XX XXX XX XX',
    demoModalBranchLabel: 'Ana Branş',
    demoModalAthletesLabel: 'Aktif Sporcu Sayısı',
    demoModalSubmit: '14 Günlük Ücretsiz Denemeyi Başlat',
    demoModalSuccessTitle: 'Demo Talebiniz Alındı!',
    demoModalClose: 'Kapat',

    // Digital report extra
    reportSurveyFact: 'Velilerin %98’i dijital karne sayesinde kulübe aidiyetlerinin arttığını belirtiyor.',
    reportInspectSample: 'Örnek Karneyi Canlı İncele',
    reportPeriod: 'Dönem',
    reportOverallScore: 'Genel Gelişim Notu',
    reportViewSampleBtn: 'Örnek Dijital Karneyi Tam Ekran İncele',
  },

  en: {
    // Nav
    navPlatform: 'Platform',
    navWhySportsFly: 'Why SportsFly?',
    navPricing: 'Pricing',
    navResources: 'Resources',
    navDemoReserve: 'Book a Demo',
    navLogin: 'Sign In',
    navAutomation: 'Automation & Dues',
    navAutomationDesc: 'Automated billing & reminders',
    navSporpuan: 'Sporpuan Loyalty',
    navSporpuanDesc: 'Rewards & student motivation',
    navDigitalReport: 'Digital Athlete Report',
    navDigitalReportDesc: 'Skill tracking & report cards',
    navAllModules: 'All Modules',
    navAllModulesDesc: 'Attendance, calendar, parent comms',
    navFaq: 'Frequently Asked Questions',
    navFaqDesc: 'Helpful answers & knowledge base',
    navRoi: 'Savings Calculator',
    navRoiDesc: 'Calculate your club revenue growth',
    navLoginAdmin: 'Club Admin Login',
    navLoginAdminDesc: 'Management & financial dashboard',
    navLoginCoach: 'Coach Login',
    navLoginCoachDesc: 'Attendance & skill evaluation',
    navLoginParent: 'Parent & Athlete Login',
    navLoginParentDesc: 'Sporpuan & Digital Report Card',

    // Hero
    heroBadge: 'NEXT-GENERATION PLATFORM FOR SPORTS CLUBS',
    heroTitle1: 'For Sports Clubs & Academies',
    heroTitleHighlight: 'Management & Loyalty',
    heroTitle2: 'System',
    heroSubtitle: 'Automate dues collection 100%, maximize retention and boost athlete motivation with Sporpuan Loyalty & Digital Report Cards.',
    heroCtaReserve: 'Book a Live Demo',
    heroCtaExplore: 'Explore Live Dashboards',
    heroTrialBadge: '14-Day Free Trial • No credit card required',
    heroStatClubs: 'Active Sports Clubs',
    heroStatAthletes: 'Enrolled Athletes & Students',
    heroStatCollection: 'On-Time Dues Collection',
    heroLiveMockupTitle: 'Management & Loyalty Cockpit',
    heroLiveMockupSub: 'Live club metrics and retention tracking',
    // Hero Notifications
    heroNotifReminderTitle: 'Reminder sent',
    heroNotifReminderDesc: 'Push notification delivered to 3 pending athletes.',
    heroNotifRegisteredTitle: '12 out of 14 athletes checked in.',
    heroNotifRegisteredDesc: 'Weekend League Match, Sat 14:00',
    heroNotifRestTitle: 'Rest decision logged.',
    heroNotifRestDesc: 'Training program adjusted ahead of the weekend derby.',
    heroNotifFundTitle: 'Team fund balance: $4,280',
    heroNotifFundDesc: '2 membership payments reconciled this week.',
    heroNotifCarpoolTitle: 'Ride-share arranged.',
    heroNotifCarpoolDesc: '5 out of 7 athletes coordinated for away match transport.',
    heroNotifAcceptedTitle: 'Kerem confirmed attendance.',
    heroNotifAcceptedDesc: 'U14 Workout session, Thursday 17:30',
    heroNotifTrainingTitle: 'New training schedule',
    heroNotifTrainingDesc: 'Thursday 17:30 — Indoor Sports Hall Pitch B',
    heroNotifDuesPaidTitle: 'Membership dues received.',
    heroNotifDuesPaidDesc: 'Direct transfer of $1,250 verified instantly.',
    // Hero Phone UI
    heroPhoneChangeView: 'Switch View',
    heroPhoneImportant: 'Important',
    heroPhoneUnloggedActivities: '7 unlogged activities',
    heroPhoneFee: 'Dues',
    heroPhoneMissingSchedule: '10 timetable entries missing.',
    heroPhoneUpcoming: 'Upcoming Activities',
    heroPhoneMon: 'MONDAY',
    heroPhoneWed: 'WEDNESDAY',
    heroPhoneThu: 'THURSDAY',
    heroPhoneAug: 'AUGUST',
    heroPhoneTraining: 'Training',
    heroPhoneInProgress: 'In progress',
    heroPhoneAttending: 'Attending',
    heroPhoneMainHall: 'Main Arena',
    heroPhoneAwayPitch: 'Away Arena',
    heroPhoneAwayMatchTitle: '🛡️ Stars SC League Match',
    heroPhoneAwayMatchRequest: 'Requesting carpool ride support for the away game.',
    heroPhoneHome: 'Home',
    heroPhoneEvents: 'Events',
    heroPhoneInbox: 'Inbox',
    heroPhoneTeamFund: 'Team Fund',
    heroPhoneMore: 'More',
    heroTabLeader: 'Club & Coach Cockpit',
    heroTabParent: 'Parent Portal & Billing',
    heroTabReport: 'Digital Athlete Report',

    // Payment Automation
    payBadge: 'How it works?',
    payTitle: 'Zero Overdue Payments:',
    payTitleHighlight: '100% Automated Billing & Smart Reminders',
    payDesc: 'SportsFly automatically sends personalized SMS & WhatsApp payment links. Collect secure online payments with one click, and auto-generate receipts & accounting records.',
    payMethodsLabel: 'Supported Secure Payment Methods',
    payZeroLoss: '0% Dues Leakage',
    payAutoReceipt: 'Automated E-Receipts',
    payStep1Title: 'You set the billing & notification dates.',
    payStep1NotifyDate: 'Notification date',
    payStep1DueDate: 'Due date',
    payStep2Title: 'The billing engine generates and dispatches invoices.',
    payStep2Desc: 'Invoices and secure checkout links are automatically created and sent to all parents simultaneously.',
    payStep2Sending: 'Dispatching payment links...',
    payStep3Title: 'Parents receive real-time push alerts & payment links.',
    payStep3Org: 'SPORTSFLY ACADEMY',
    payStep3Now: 'Just now',
    payStep3NotifTitle: 'New dues invoice issued',
    payStep3NotifDesc: 'Arda Yilmaz • Spring Term 2026 • $145.00',
    payStep3ReminderNote: 'Friendly automated reminders continue until payment is settled.',
    payStep4Title: 'Parent pays with 1 click.',
    payStep4PaidBadge: 'Settled',
    payStep4Desc: '$145.00 automatically logged to club books, electronic receipt sent to parent, and register reconciled in real-time.',

    // Sporpuan
    sporpuanBadge: 'SPORPUAN GAMIFICATION & REWARDS ECOSYSTEM',
    sporpuanTitle: 'Consistent Attendance Earns Points,',
    sporpuanTitleHighlight: 'Points Unlock Dream Rewards',
    sporpuanDesc: 'We eliminate academy dropouts not with penalties, but through gamified mechanics kids love. Consistent athletes win big!',
    sporpuanSimTitle: 'Live Sporpuan Calculator Simulator',
    sporpuanSimSubtitle: 'Simulate the loyalty points an athlete accumulates based on monthly attendance.',
    sporpuanSimTrainingLabel: 'Monthly Workouts Attended:',
    sporpuanSimTrainings: 'Sessions',
    sporpuanSimBonusesLabel: 'Attendance & Excellence Multipliers:',
    sporpuanSimPunctual: 'Punctual Arrival Bonus (+10 SP/session)',
    sporpuanSimPunctualDesc: 'Athletes who arrive on time earn instant punctuality rewards.',
    sporpuanSimStreak: '4-Session Streak Multiplier (+50 SP)',
    sporpuanSimStreakDesc: 'Unbroken attendance unlocks consecutive milestone boosts.',
    sporpuanSimFairPlay: 'Monthly Fair-Play Coach Commendation (+100 SP)',
    sporpuanSimFairPlayDesc: 'Recognizing exemplary sportsmanship and leadership on court.',
    sporpuanSimTotalEarned: 'Total Monthly Sporpuan Earned',
    sporpuanSimCurrentRank: 'Current Prestige Badge',
    sporpuanSimTestConfetti: 'Simulate & Celebrate Points!',
    sporpuanCatalogTitle: 'Club Rewards Showcase',
    sporpuanCatalogSubtitle: 'Athletes redeem their hard-earned points for gear, tickets, and memorable experiences.',
    sporpuanCatalogBadge: 'LIVE STORE',
    sporpuanCatAll: 'All',
    sporpuanCatEquipment: 'Gear',
    sporpuanCatExperience: 'Experiences',
    sporpuanCatSpecial: 'Special',
    sporpuanPointsSuffix: 'SPORPUAN',
    sporpuanRemainingStock: 'In Stock',
    sporpuanClaimedCount: 'Redeemed',
    sporpuanUnlockHint: 'Required:',

    // Digital Report
    reportBadge: 'NEXT-GENERATION ATHLETE EVALUATION',
    reportTitle: 'Paper Report Cards Are History:',
    reportTitleHighlight: 'Digital Report Cards Automatically Shared With Parents',
    reportDesc: 'Track athletic growth, skill radar ratings, and coach insights with beautiful interactive charts. Deliver them instantly to parents via WhatsApp and the portal.',
    reportStep1Title: 'Coaches Grade in 2 Minutes',
    reportStep1Desc: 'Grade sport-specific criteria including shooting, passing, tactical vision, stamina, and mental grit effortlessly from any smartphone.',
    reportStep2Title: 'Automated Parent Alerts & WhatsApp',
    reportStep2Desc: 'When published, parents receive immediate push notifications and direct secure links. They view detailed progress on their mobile devices.',
    reportStep3Title: 'QR-Verified & Downloadable PDF',
    reportStep3Desc: 'Parents keep keepsake memories, share achievements with pride, and print official verified certificates with dynamic QR codes.',
    reportStatBadge: '98% of parents state digital report cards influence their academy enrollment choice.',
    reportCta: 'Preview Sample Report Card',
    reportCardPeriod: '2025-2026 Fall Development Term',
    reportCardGeneralScore: 'Overall Report Score',
    reportCardAttendanceRate: 'Term Attendance Rate',
    reportCardPointsEarned: 'Total Sporpuan Earned',
    reportCardCoachLetter: 'Head Coach Evaluation Letter',
    reportCardCategoryTechnical: 'Technical Fundamentals',
    reportCardCategoryPhysical: 'Physical & Athleticism',
    reportCardCategoryMental: 'Mental Grit & Discipline',
    reportCardCategoryTactical: 'Tactical Game Awareness',
    reportCardStrengths: 'Key Strengths',
    reportCardImprovements: 'Areas for Growth',
    reportCardDownloadPdf: 'Download Official PDF Card',
    reportCardClose: 'Close',

    // All Modules / Features
    featuresBadge: 'ALL-IN-ONE MODULES',
    featuresTitle: 'Everything Your Sports Academy Needs',
    featuresTitleHighlight: 'Unified in a Single Platform',
    featuresDesc: 'We replaced outdated legacy software with motivational Sporpuan gamification and transparent digital reporting designed for modern academies.',
    featuresPillars: [
      {
        title: 'Attendance-Driven Sporpuan',
        subtitle: 'Every workout attended turns into points and exciting rewards',
        desc: 'Solve academy attendance dropouts with genuine gamification. Punctual arrivals, training milestones, and sportsmanship awards give athletes points to spend in the club reward store.',
        points: [
          'Automatic point distribution the second roll-call is completed',
          'Consecutive 3, 5, and 10 workout streak multipliers',
          'Customizable reward catalog with club merchandise and gear',
          'Proven 70% reduction in athlete absenteeism'
        ]
      },
      {
        title: 'Digital Athlete Growth Report Card',
        subtitle: 'Share technical, physical, and mental progression automatically',
        badge: 'Auto Sharing',
        desc: 'Say goodbye to paper evaluations. Coaches rate skills in seconds on their phone; the platform produces visual radar charts and personalized letters delivered straight to parents.',
        points: [
          'Sport-tailored skill metrics with visual radar comparison',
          'Personalized written or voice-to-text coach evaluation letter',
          'Instant delivery via WhatsApp, SMS, and parent portal',
          'Official QR-verified, printable digital PDF format'
        ]
      },
      {
        title: 'Mobile Coach & Rapid Attendance',
        subtitle: 'Complete group roll-call in under 15 seconds',
        badge: 'Time Saver',
        desc: 'Give coaches their time back on the pitch instead of dealing with paperwork. Rapid list roll-call and QR scanner mark attendance instantly, notifying absent students automatically.',
        points: [
          'One-tap "Mark All Present" with instant Sporpuan crediting',
          'Automated WhatsApp/SMS alerts for absent or excused athletes',
          'Coach performance, attendance percentage, and session capacity reports',
          'Offline mode support for gyms without cellular connection'
        ]
      },
      {
        title: 'Transparent Parent Portal & Dues Tracking',
        subtitle: 'Prevent overdue fees and elevate parent retention',
        badge: 'Financial Control',
        desc: 'Parents log in without password hassle to inspect their child’s attendance records, loyalty points, report cards, and payment history with 1-click online settlement.',
        points: [
          'Password-free instant magic link authentication for parents',
          'Polite automated WhatsApp reminders when payments are due',
          'One-click credit card payment with installment support',
          'Automatic generation and delivery of digital fiscal e-receipts'
        ]
      }
    ],

    // ROI Calculator
    roiBadge: 'CLUB SAVINGS & REVENUE CALCULATOR',
    roiTitle: 'How Much Time and Revenue',
    roiTitleHighlight: 'Does SportsFly Save Your Club?',
    roiDesc: 'Select your active student count and monthly dues to calculate the exact revenue protected and administrative hours reclaimed.',
    roiInputStudents: 'Active Enrolled Athletes:',
    roiStudentsSuffix: 'Students',
    roiInputMonthlyFee: 'Average Monthly Dues per Student:',
    roiRecoveredMonthly: 'Monthly Revenue Leakage Recovered',
    roiRecoveredAnnual: 'Additional Annual Club Revenue',
    roiHoursSaved: 'Administrative Hours Reclaimed Weekly',
    roiHoursSavedNote: 'Replaces paper attendance, manual payment chasing, and phone follow-ups',
    roiSummaryNote: 'Our partner academies eliminate the standard 8% fee leakage and overdue payment delays entirely.',

    // Testimonials
    testimonialsBadge: 'TRUSTED BY CLUB DIRECTORS & PARENTS',
    testimonialsTitle: 'Success Stories From Over',
    testimonialsTitleHighlight: '140+ Sports Academies',
    testimonialsDesc: 'Real results from club managers, coaches, and sports parents who transformed academy operations with SportsFly.',
    testimonialsList: [
      {
        quote: 'Before SportsFly we logged attendance on paper and scrambled to write end-of-term evaluations. Within the first month of using Sporpuan, dropout rates dropped by 70%! When parents viewed the digital reports on their phones, trust in our academy soared.',
        name: 'Serkan Erdem',
        role: 'Club President & Head Coach',
        club: 'Stars Sports Academy (550+ Athletes)',
        stat: '96% Attendance Rate'
      },
      {
        quote: "My son used to drag his feet, but now he wakes up early on game days just to accumulate Sporpuan for the official club jersey. Watching his skill progression radar chart each term is invaluable for our family.",
        name: 'Banu Çetinkaya',
        role: 'Parent (U12 Basketball)',
        club: 'Metro Eagles Youth Club',
        stat: 'Parent Satisfaction: 5/5'
      },
      {
        quote: 'Our coaching staff takes roll-call in 15 seconds. If an athlete is absent, their parent is immediately notified via WhatsApp. The automated report cards and Sporpuan feature elevated our academy to a premier status.',
        name: 'Metin Barışkan',
        role: 'General Coordinator',
        club: 'Olympic Swimming & Aquatics',
        stat: '18 Hours Saved Weekly'
      }
    ],

    // Pricing
    pricingBadge: 'TRANSPARENT PRICING',
    pricingTitle: 'Scalable Plans Tailored to Your',
    pricingTitleHighlight: 'Academy Size — Zero Hidden Costs',
    pricingDesc: 'Start with a full 14-day free trial. No credit card required.',
    pricingMonthly: 'Monthly Billing',
    pricingYearly: 'Annual Billing',
    pricingDiscountBadge: 'Save 20%',
    pricingPlans: [
      {
        id: 'starter',
        name: 'Starter Club',
        desc: 'Perfect for single-facility, growing boutique sports academies and workshops.',
        monthlyPrice: 89,
        annualPrice: 69,
        badge: null,
        features: [
          'Up to 100 Active Athletes',
          'Mobile-Ready Fast Attendance',
          'Basic Parent Notifications (SMS & Email)',
          'Digital Athlete Report Cards (2 Terms/Year)',
          'Standard Sporpuan Loyalty Engine',
          '2 Coaches & 1 Admin Account',
          'Email Technical Support'
        ],
        cta: 'Start 14-Day Free Trial'
      },
      {
        id: 'growth',
        name: 'Club & Academy',
        desc: 'Ideal for clubs focused on maximizing retention, automated billing, and multi-sport tracking.',
        monthlyPrice: 169,
        annualPrice: 129,
        badge: 'Most Popular',
        popular: true,
        features: [
          'Up to 350 Active Athletes',
          'Advanced Sporpuan & Custom Reward Catalog',
          'Unlimited Digital Athlete Report Cards',
          'Direct WhatsApp Report Card Delivery',
          'Skill Radar Analytics & Longitudinal Growth',
          'Automated Dues Chasing & Online Checkout',
          'Unlimited Coach & Category Accounts',
          '24/7 Priority Support & Onboarding Training'
        ],
        cta: 'Try Free Today'
      },
      {
        id: 'enterprise',
        name: 'Pro Academy & Multi-Branch',
        desc: 'For multi-branch sports organizations requiring custom branding and dedicated infrastructure.',
        monthlyPrice: 289,
        annualPrice: 229,
        badge: 'Maximum Power',
        features: [
          'Unlimited Athletes & Multiple Facilities',
          'Custom Domain & White-Label Mobile App',
          'Custom Sporpuan Reward Pool & Sponsor Modules',
          'Tournament, Camp, & Registration Forms',
          'Advanced Financial Reconciliation & Accounting API',
          'Dedicated Customer Success Manager',
          'On-site Setup & Data Migration Assistance'
        ],
        cta: 'Schedule Enterprise Call'
      }
    ],

    // FAQs
    faqBadge: 'HELP CENTER',
    faqTitle: 'Frequently Asked Questions',
    faqDesc: 'Clear answers to common questions about SportsFly. Reach out to our friendly team anytime for more details.',
    faqList: [
      {
        q: 'How does the Sporpuan loyalty system work?',
        a: 'Athletes automatically earn Sporpuan points every time they attend training on time (+25 SP), maintain consecutive session streaks (+100 SP for 4 consecutive sessions), or earn sportsmanship commendations (+50 SP). Points accumulate in their parent/athlete portal and can be redeemed in the club catalog for jerseys, gear, or match tickets.'
      },
      {
        q: 'How are Digital Report Cards delivered to parents?',
        a: 'Coaches evaluate technical, physical, tactical, and mental criteria on their phone, write their evaluation note, and tap "Publish". The platform immediately sends push alerts and secure WhatsApp/SMS links directly to parents, who can inspect radar graphs and download verified PDFs.'
      },
      {
        q: 'Can we import our existing athlete rosters from Excel or CSV?',
        a: 'Yes! You can import all your existing athlete, parent, and coach lists via the SportsFly Smart Import Wizard in under 3 minutes with zero data loss. Our customer success team assists you throughout the process.'
      },
      {
        q: 'Do parents and coaches need to download an app?',
        a: 'SportsFly is a progressive cloud web application (PWA) that runs smoothly on any smartphone, tablet, or desktop browser. Users can pin it to their home screen with 1 tap, eliminating app store download friction.'
      },
      {
        q: 'Can we manage dues collection and online payments?',
        a: 'Yes. Monthly dues schedules, payment deadlines, automated reminder links, and e-receipts are fully automated. Parents can settle balances securely with credit card or bank transfer without downloading additional software.'
      },
      {
        q: 'Is a credit card required for the 14-day trial?',
        a: 'No, you do not need to provide credit card details to start your 14-day full-featured free trial. Set up your academy and test attendance and Sporpuan right away.'
      }
    ],

    // Human Support
    supportBadge: 'Support and Reliability',
    supportTitle: 'Real humans throughout',
    supportTitleHighlight: 'the entire journey',
    supportDesc: 'You will have a dedicated personal advisor guiding your academy before, during, and after migration. Our support specialists have hands-on experience running youth sports clubs; they understand pitch-side reality and speak your language.',
    supportCheck1: 'A dedicated club advisor assigned to you from day one.',
    supportCheck2: 'Instant 1-on-1 assistance via phone, WhatsApp, and email.',
    supportCheck3: 'Rapid responses within minutes whenever you need support.',
    supportPhoneLabel: '+90 216 850 1907',
    supportEmailLabel: 'support@sportsfly.com',
    supportMockupActivities: 'My Schedule',
    supportMockupMgmt: 'Club Ops',
    supportMockupCallMatch: 'Call-up: Match Sat 10:00',
    supportMockupToday: 'TODAY',
    supportMockupTomorrow: 'TOMORROW',
    supportMockupThu: 'THURSDAY',
    supportMockupTraining: 'Training Session',
    supportMockupMatchDerby: 'League Match (Derby)',
    supportMockupTeamMeeting: 'Staff Meeting',
    supportMockupConfirmed: 'Confirmed',
    supportMockupPending: 'Pending Response',
    supportMockupAttendingConfirmed: 'Check-in confirmed',
    supportMockupRegisteredNote: 'Your registration for today’s session is complete.',

    // All Sports Banner
    allSportsEyebrow: 'ALL SPORTS',
    allSportsTitle: 'SportsFly is the perfect fit for your academy, whatever your sport.',
    allSportsDesc: 'Trusted by academies across more than 60 sport disciplines—from football and basketball to swimming, gymnastics, and athletics—SportsFly adapts flawlessly to your club’s workflow.',
    allSportsBtnDemo: 'Book a Live Demo',
    allSportsBtnFeatures: 'View All Features',
    allSportsList: [
      { name: 'Football', icon: '⚽' },
      { name: 'Basketball', icon: '🏀' },
      { name: 'Volleyball', icon: '🏐' },
      { name: 'Swimming', icon: '🏊‍♂️' },
      { name: 'Gymnastics', icon: '🤸' },
      { name: 'Tennis', icon: '🎾' },
      { name: 'Martial Arts', icon: '🥋' },
      { name: 'Athletics', icon: '🏃' },
    ],

    // Footer
    footerBrandDesc: 'SportsFly is the next-generation cloud management platform for sports academies. Featuring attendance-driven Sporpuan loyalty, digital athlete report cards, and unified portals for parents and coaches.',
    footerComplianceBadge: 'GDPR & ISO 27001 Certified Data Security',
    footerColModules: 'Modules',
    footerColResources: 'Resources',
    footerColLegal: 'Legal',
    footerColContact: 'Contact & Support',
    footerLinkBlog: 'Academy Blog',
    footerLinkGuides: 'Best Practice Guides',
    footerLinkSecurity: 'Data Security',
    footerLinkPrivacy: 'Privacy Policy',
    footerLinkTerms: 'Terms of Service',
    footerLinkKvkk: 'Data Processing Notice',
    footerMadeWith: 'Crafted with passion for sports clubs',
    allRightsReserved: 'All rights reserved.',

    // Demo Modal
    modalBadge: '14-Day Free Trial • No Credit Card',
    modalTitle: 'Empower Your Academy With SportsFly',
    modalSelectedPlan: 'Selected Plan:',
    modalClubName: 'Club / Academy Name',
    modalFullName: 'Director / Coach Full Name',
    modalPhone: 'Phone Number',
    modalBranch: 'Primary Sport Discipline',
    modalStudentCount: 'Estimated Active Athletes',
    modalSubmit: 'Launch My Free Demo Academy',
    modalSuccessTitle: 'Demo Request Received!',
    modalSuccessDesc: 'Your club specialist will contact you within 15 minutes with your tailored login credentials and academy cockpit access link.',
    modalBtnExploreCockpit: 'Explore Club & Coach Cockpit',
    modalBtnClose: 'Close Window',

    // Extra support fields
    supportPhoneHeader: 'Entire training schedule at a single tap',
    supportPhoneNotifTitle: 'Practice Today!',
    supportPhoneNotifDesc: '18:00 - Main Sports Hall',
    supportToday: 'TODAY',
    supportTraining: 'Training Session',
    supportTrainingDesc: '18:00 - 19:30 • Main Hall',
    supportConfirmed: 'Attending',
    supportTomorrow: 'TOMORROW',
    supportMatch: 'Yıldızlar SK Match',
    supportMatchDesc: '10:00 - 12:00 • Away Pitch',
    supportPending: 'Pending Response',
    supportThursday: 'THURSDAY',
    supportMeeting: 'Tactical Analysis & Meeting',
    supportMeetingDesc: '17:00 - 18:00 • Meeting Room',
    supportAttendanceConfirmed: 'Your attendance was confirmed by coach',
    supportAttendanceConfirmedDesc: 'Kerem earned +25 Sporpuan from this training.',
    supportBullet1: 'Mobile-First Quick Roll Call & Alerts',
    supportBullet2: 'Instant Updates via WhatsApp and SMS',
    supportBullet3: 'Uninterrupted Attendance Drive with Sporpuan',

    // Extra pricing fields
    pricingAnnual: 'Annual',
    pricingIncludedFeatures: 'Included Features',

    // Extra ROI fields
    roiAthletesLabel: 'Active Athletes Count',
    roiDuesLabel: 'Monthly Athlete Tuition',
    roiAnnualSaved: 'Recovered Annual Dues',
    roiAnnualSavedNote: 'Via automated uncollected fees recovery',
    roiTimeSaved: 'Annual Saved Staff Hours',
    roiTimeSavedNote: 'Through automated roll calls and report cards',
    roiAttendanceIncrease: 'Average Attendance Boost',
    roiAttendanceIncreaseNote: 'Powered by Sporpuan gamified rewards',

    // Extra Sporpuan fields
    sporpuanCalcTitle: 'Sporpuan Loyalty Calculator',
    sporpuanCalcDesc: 'Simulate the points your athletes earn based on consistent attendance.',
    sporpuanAttendanceCount: 'Monthly Training Sessions Attended',
    sporpuanTrainingUnit: 'Sessions',
    sporpuanBonusHeading: 'Extra Achievement & Loyalty Bonuses',
    sporpuanPunctualTitle: 'Punctual Arrival',
    sporpuanPunctualDesc: 'Arriving before session whistle',
    sporpuanStreakTitle: '4-Week Perfect Streak',
    sporpuanStreakDesc: 'Never missing a single workout',
    sporpuanFairPlayTitle: 'Fair-Play & Sportsmanship',
    sporpuanFairPlayDesc: 'Coach & teammate recognition',
    sporpuanEstimated: 'Estimated Monthly Gain',
    sporpuanCelebrate: 'Congratulations! Approaching top reward tiers.',
    sporpuanRewardsTitle: 'Sample Rewards Redeemable with Sporpuan',
    sporpuanCustomRewards: 'Your academy can define and configure custom reward items.',
    sporpuanRewardUnlocked: 'Unlocked! Ready to Claim',
    sporpuanRewardNeeded: 'more pts needed',

    // Extra footer fields
    footerBranchesTitle: 'Solutions & Disciplines',
    footerBranchBasketball: 'Basketball Academy',
    footerBranchVolleyball: 'Volleyball Schools',
    footerBranchSwimming: 'Aquatics Clubs',
    footerBranchFootball: 'Football Youth Academy',
    footerRequestDemo: 'Request a Demo for Your Club →',
    footerContactTitle: 'Contact',
    footerRights: 'All rights reserved.',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
    footerKvkk: 'Data Notice',
    footerDesc: 'SportsFly is the next-generation cloud management platform for sports academies. Featuring attendance-driven Sporpuan loyalty, digital athlete report cards, and unified portals for parents and coaches.',
    footerSecurity: 'GDPR & ISO 27001 Certified Data Security',
    footerModulesTitle: 'Products & Modules',
    footerModAttendance: 'Automated Attendance & Alerts',
    footerModSporpuan: 'Sporpuan Loyalty & Reward Store',
    footerModReport: 'Digital Athlete Report Card & Analytics',
    footerModClubs: 'Multi-Branch & Discipline Ops',
    footerModFinance: 'Smart Tuition & Online Payment',

    // All sports banner
    sportsBadge: 'ALL SPORTS',
    sportsHeadline: 'SportsFly is the perfect fit for your academy, whatever your sport.',
    sportsBookDemo: 'Book a Live Demo',
    sportsViewFeatures: 'View All Features',

    // Demo modal extra
    demoModalBadge: '14-Day Free Trial • No Credit Card',
    demoModalTitle: 'Empower Your Academy With SportsFly',
    demoModalPlanPrefix: 'Selected Plan',
    demoModalClubLabel: 'Club / Academy Name',
    demoModalClubPlaceholder: 'e.g. Kadıköy Basketball Academy',
    demoModalNameLabel: 'Director / Coach Full Name',
    demoModalNamePlaceholder: 'e.g. Ahmet Yılmaz',
    demoModalPhoneLabel: 'Phone Number',
    demoModalPhonePlaceholder: '+90 5XX XXX XX XX',
    demoModalBranchLabel: 'Primary Sport Discipline',
    demoModalAthletesLabel: 'Estimated Active Athletes',
    demoModalSubmit: 'Start 14-Day Free Trial',
    demoModalSuccessTitle: 'Demo Request Received!',
    demoModalClose: 'Close',

    // Digital report extra
    reportSurveyFact: '98% of parents report higher engagement and club loyalty thanks to digital report cards.',
    reportInspectSample: 'Explore Live Sample Report',
    reportPeriod: 'Period',
    reportOverallScore: 'General Progression Grade',
    reportViewSampleBtn: 'Inspect Full-Screen Digital Report Card',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
