import { Athlete, ReportCard, RewardItem, ClubBranch } from '../types';

export const INITIAL_ATHLETES: Athlete[] = [
  {
    id: 'ath-1',
    name: 'Arda Yılmaz',
    avatar: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&q=80',
    age: 12,
    branch: 'Basketbol',
    category: 'U12 Gelişim Takımı',
    sporpuan: 1420,
    attendanceRate: 96,
    streakDays: 14,
    parentName: 'Mehmet Yılmaz',
    parentPhone: '+90 532 555 12 34',
    rankBadge: 'Altın Kartal',
    lastAttendance: 'Bugün 17:30',
  },
  {
    id: 'ath-2',
    name: 'Elif Sare Kaya',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    age: 10,
    branch: 'Voleybol',
    category: 'Minik Sultanlar B',
    sporpuan: 980,
    attendanceRate: 92,
    streakDays: 8,
    parentName: 'Zeynep Kaya',
    parentPhone: '+90 533 444 88 99',
    rankBadge: 'Gümüş Yıldız',
    lastAttendance: 'Dün 18:00',
  },
  {
    id: 'ath-3',
    name: 'Kaan Demir',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    age: 13,
    branch: 'Yüzme',
    category: 'Genç Kurbağalama Grubu',
    sporpuan: 2150,
    attendanceRate: 98,
    streakDays: 21,
    parentName: 'Ali Demir',
    parentPhone: '+90 542 333 77 11',
    rankBadge: 'Elmas Şampiyon',
    lastAttendance: 'Bugün 09:00',
  },
  {
    id: 'ath-4',
    name: 'Deniz Aksoy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    age: 11,
    branch: 'Futbol',
    category: 'U11 Akademi',
    sporpuan: 640,
    attendanceRate: 85,
    streakDays: 4,
    parentName: 'Canan Aksoy',
    parentPhone: '+90 505 222 44 66',
    rankBadge: 'Bronz Yetenek',
    lastAttendance: '3 gün önce',
  },
  {
    id: 'ath-5',
    name: 'Defne Öztürk',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    age: 9,
    branch: 'Cimnastik',
    category: 'Ritmik Cimnastik A Grubu',
    sporpuan: 1120,
    attendanceRate: 94,
    streakDays: 11,
    parentName: 'Murat Öztürk',
    parentPhone: '+90 530 111 22 33',
    rankBadge: 'Altın Kartal',
    lastAttendance: 'Dün 16:30',
  }
];

export const INITIAL_REPORT_CARDS: Record<string, ReportCard> = {
  'ath-1': {
    id: 'rep-01',
    athleteId: 'ath-1',
    period: '2025-2026 Güz Gelişim Dönemi',
    publishedAt: '12 Ocak 2026',
    coachName: 'Kadir Canpolat',
    coachTitle: 'Başantrenör / TBF B Lisanslı',
    coachNotes: 'Arda bu dönem özellikle penetre sonrası pas dağıtımında ve dış şut stabilitesinde belirgin bir sıçrama yaptı. Antrenman devamlılığı ve disiplini arkadaşlarına örnek teşkil ediyor. Sporpuan serisini bozmadan sürdürmesi motivasyonunu zirvede tuttu.',
    generalScore: 92,
    attendanceCount: 24,
    totalTrainings: 25,
    sporpuanEarnedTotal: 720,
    sharedWithParent: true,
    sharedAt: '12 Ocak 2026, 19:45',
    strengths: ['Saha Görüşü ve Pas Zamanlaması', 'Yüksek Antrenman Disiplini', 'Hızlı Hücum Reaksiyonu'],
    improvementAreas: ['Zayıf El Turnike Bitişleri', 'Perdeleme Sonrası İletişim'],
    metrics: [
      { name: 'Temel Top Hâkimiyeti (Dribbling)', score: 94, category: 'teknik', notes: 'Baskı altında dahi topu mükemmel koruyor.' },
      { name: 'Şut Mekaniği & İsabet', score: 88, category: 'teknik', notes: 'Set şutları çok iyi, hareketli şutta ayak ritmi çalışılıyor.' },
      { name: 'Savunma Ayak Çabukluğu', score: 90, category: 'fiziksel', notes: 'Yan kayma hızı ve savunma duruşu oldukça kararlı.' },
      { name: 'Dayanıklılık & Çeviklik', score: 95, category: 'fiziksel', notes: 'Dönem başı yo-yo testinde takımın en iyi 2. derecesi.' },
      { name: 'Saha Görüşü & Taktik Anlayış', score: 93, category: 'taktik', notes: 'Set hücumlarında doğru boşluğu bulma yetisi gelişti.' },
      { name: 'Takım Ruhu & Fair-Play', score: 96, category: 'mental', notes: 'Mola ve benchte arkadaşlarına müthiş destek veriyor.' },
    ]
  },
  'ath-2': {
    id: 'rep-02',
    athleteId: 'ath-2',
    period: '2025-2026 Güz Gelişim Dönemi',
    publishedAt: '14 Ocak 2026',
    coachName: 'Selin Varol',
    coachTitle: 'Voleybol Altyapı Koordinatörü',
    coachNotes: 'Elif manşet ve servis karşılamada büyük özgüven kazandı. Sporpuan görevlerini hevesle tamamlayarak antrenmanlara 15 dakika erken geliyor.',
    generalScore: 89,
    attendanceCount: 22,
    totalTrainings: 24,
    sporpuanEarnedTotal: 610,
    sharedWithParent: true,
    sharedAt: '14 Ocak 2026, 20:10',
    strengths: ['Parmak Pas İsabeti', 'Saha İçi Enerji & İletişim', 'Servis İstikrarı'],
    improvementAreas: ['Blok Zamanlaması', 'Düşüş Teknikleri'],
    metrics: [
      { name: 'Manşet & Karşılama', score: 91, category: 'teknik', notes: 'Pozisyon alma tekniği harika oturdu.' },
      { name: 'Parmak Pas Hassasiyeti', score: 93, category: 'teknik', notes: 'Topa yumuşak dokunuş ve yön verme çok başarılı.' },
      { name: 'Sıçrama & Çabukluk', score: 85, category: 'fiziksel', notes: 'Dikey sıçrama testinde +4cm ilerleme kaydetti.' },
      { name: 'Servis Ritmi', score: 88, category: 'teknik', notes: 'Üstten tenis serviste file payı istikrarlı.' },
      { name: 'Oyun Takibi & Yardımlaşma', score: 92, category: 'taktik', notes: 'Defans arkası boşlukları dikkatle kapatıyor.' },
      { name: 'Konsantrasyon & Soğukkanlılık', score: 87, category: 'mental', notes: 'Zor sayılarda motivasyonunu yüksek tutuyor.' },
    ]
  }
};

export const REWARD_CATALOG: RewardItem[] = [
  {
    id: 'rew-1',
    title: 'SportsFly Profesyonel Termos Suluk',
    category: 'ekipman',
    pointsRequired: 450,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80',
    stock: 28,
    description: 'BPA içermeyen, çift cidarlı paslanmaz çelik 750ml kulüp logolu özel sporcu suluğu.',
    claimedCount: 142
  },
  {
    id: 'rew-2',
    title: 'SportsFly Dry-Fit Antrenman Tişörtü',
    category: 'ekipman',
    pointsRequired: 750,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80',
    stock: 19,
    description: 'Nefes alabilen mikrofiber kumaş, sporcunun ismi ve sırt numarası baskılı.',
    claimedCount: 89
  },
  {
    id: 'rew-3',
    title: 'Koç ile 1-e-1 Bireysel Şut / Beceri Kliniği (45 Dk)',
    category: 'deneyim',
    pointsRequired: 1200,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80',
    stock: 6,
    description: 'Başantrenör eşliğinde video analizli ve özel ölçümlü bireysel gelişim seansı.',
    claimedCount: 34
  },
  {
    id: 'rew-4',
    title: 'Süper Lig / EuroLeague Maç Bileti (2 Kişilik)',
    category: 'deneyim',
    pointsRequired: 2000,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
    stock: 4,
    description: 'Sporcu ve velisi için tribün atmosferini yaşatacak heyecan dolu canlı maç deneyimi.',
    claimedCount: 12
  },
  {
    id: 'rew-5',
    title: 'SportsFly Su Geçirmez Sırt & Krampon Çantası',
    category: 'ekipman',
    pointsRequired: 950,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
    stock: 15,
    description: 'Ayakkabı havalandırma bölmeli, geniş iç hacimli dayanıklı sporcu çantası.',
    claimedCount: 67
  },
  {
    id: 'rew-6',
    title: 'Ayın Fair-Play & Örnek Sporcu Kristal Plaketi',
    category: 'ozel',
    pointsRequired: 1500,
    image: 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=400&q=80',
    stock: 8,
    description: 'Kulüp içi törende velilerin önünde takdim edilen özel isim işlemeli kristal ödül.',
    claimedCount: 22
  }
];

export const BRANCHES_DATA: ClubBranch[] = [
  { id: 'b-1', name: 'Basketbol Akademisi', icon: 'Dribbble', studentCount: 184, coachCount: 6, monthlyRevenue: 248000 },
  { id: 'b-2', name: 'Voleybol Okulu', icon: 'Activity', studentCount: 142, coachCount: 5, monthlyRevenue: 198000 },
  { id: 'b-3', name: 'Yüzme İhtisas', icon: 'Waves', studentCount: 210, coachCount: 8, monthlyRevenue: 315000 },
  { id: 'b-4', name: 'Altyapı Futbol Okulu', icon: 'Target', studentCount: 165, coachCount: 6, monthlyRevenue: 230000 },
  { id: 'b-5', name: 'Ritmik & Artistik Cimnastik', icon: 'Sparkles', studentCount: 98, coachCount: 4, monthlyRevenue: 156000 }
];

export const TESTIMONIALS = [
  {
    quote: 'SportsFly öncesinde yoklamaları kağıtta alıyor, karneleri dönem sonu telaşla hazırlıyorduk. Sporpuan sistemini devreye aldığımız ilk ayda antrenman devamsızlığı %70 azaldı! Veliler karneleri telefonlarında görünce kulübümüze duydukları güven ikiye katlandı.',
    name: 'Serkan Erdem',
    role: 'Kulüp Başkanı & Başantrenör',
    club: 'Anadolu Yıldızları Spor Kulübü (550+ Sporcu)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    stat: '%96 Devamlılık Oranı'
  },
  {
    quote: 'Oğlumun antrenmana gitmek için sabah erken kalktığına ilk kez şahit oldum. Sporpuan biriktirip kulüp formasını alabilmek için can atıyor. Antrenörün girdiği dijital karnede geliştiği alanları grafiklerle görmek bir veli olarak paha biçilemez.',
    name: 'Banu Çetinkaya',
    role: 'Sporcu Velisi (U12 Basketbol)',
    club: 'İstanbul Kartalları Akademi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    stat: 'Veli Memnuniyeti: 5/5'
  },
  {
    quote: 'Antrenörlerimiz yoklamayı 15 saniyede alıyor, otomatik olarak gelmeyen sporcunun velisine WhatsApp bildirimi düşüyor. Sporpuan ve otomatik karne özellikleri spor okulumuzun veli memnuniyetini ve motivasyonunu bambaşka bir seviyeye taşıdı.',
    name: 'Metin Barışkan',
    role: 'Genel Koordinatör',
    club: 'Ege Olimpik Yüzme ve Su Sporları',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    stat: 'Haftalık 18 Saat Zaman Tasarrufu'
  }
];

export const PRICING_PLANS = [
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
];

export const FAQS = [
  {
    q: 'Sporpuan sistemi tam olarak nasıl çalışır?',
    a: 'Sporcular her antrenmana geldiklerinde otomatik olarak sisteme tanımlı Sporpuan kazanırlar (Örn: Zamanında katılım +25 SP, 4 antrenman üst üste seri +100 SP, Fair-Play +50 SP). Biriken puanlar veli ve sporcu panelinde anlık görünür. Kulübün belirlediği ödül kataloğundan (forma, suluk, özel koçluk, maç bileti vb.) sporcu veya veli puanını harcayarak ödül talep eder.'
  },
  {
    q: 'Dijital Sporcu Karnesi velilere nasıl ulaşıyor?',
    a: 'Eğitmenler mobil veya tablet üzerinden sporcunun teknik, fiziksel, taktik ve mental beceri puanlarını girip notunu ekledikten sonra "Yayınla" butonuna tıklar. Sistem otomatik olarak velinin SportsFly Veli Portalı\'na push bildirim ve istenirse WhatsApp/SMS ile güvenli karne bağlantısı gönderir. Veli, görsel grafiklerle desteklenmiş profesyonel PDF formatındaki karneyi inceleyebilir ve saklayabilir.'
  },
  {
    q: 'Mevcut sistemlerimizden veya Excel\'den verilerimizi aktarabilir miyiz?',
    a: 'Kesinlikle! Excel, CSV veya diğer spor yazılımlarında bulunan mevcut öğrenci, veli ve grup listelerinizi SportsFly Akıllı İçe Aktarma Sihirbazı ile sadece 3 dakikada sıfır veri kaybıyla aktarabilirsiniz. Destek ekibimiz bu süreçte birebir yardımcı olmaktadır.'
  },
  {
    q: 'Veli ve antrenörler uygulamayı nasıl kullanır?',
    a: 'SportsFly bulut tabanlıdır ve %100 mobil uyumlu modern bir web uygulaması (PWA) olarak çalışır. App Store veya Google Play indirme zorunluluğu olmadan herhangi bir telefon, tablet veya bilgisayardan tek tıkla ana ekrana eklenerek uygulama gibi kullanılabilir.'
  },
  {
    q: 'Aidat ve ödeme takibi yapabilir miyiz?',
    a: 'Evet. Sporcuların aylık aidat paketleri, ödeme vadeleri, gecikme uyarıları ve tahsilat makbuzları sistem tarafından otomatik yönetilir. Dilerseniz Iyzico, PayTR veya banka sanal POS entegrasyonu ile velilerinize kredi kartıyla tek tıkla güvenli ödeme imkanı sunabilirsiniz.'
  },
  {
    q: 'Deneme sürecinde kredi kartı gerekiyor mu?',
    a: 'Hayır, 14 günlük tam özellikli deneme sürümünü başlatmak için kredi kartı bilgisi gerekmez. Kulübünüzü oluşturup hemen antrenman yoklamaları ve Sporpuan sistemini test edebilirsiniz.'
  }
];
