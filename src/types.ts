export type ActiveView = 'marketing' | 'parent_panel' | 'coach_panel' | 'admin_panel' | 'blog';

export interface BlogPost {
  id: string;
  slug: string;
  title: {
    tr: string;
    en: string;
  };
  excerpt: {
    tr: string;
    en: string;
  };
  category: 'otomasyon' | 'sporpuan' | 'karne' | 'yonetim' | 'iletisim';
  categoryLabel: {
    tr: string;
    en: string;
  };
  readTime: {
    tr: string;
    en: string;
  };
  publishedAt: string;
  author: {
    name: string;
    role: {
      tr: string;
      en: string;
    };
    avatar: string;
  };
  coverBadge: string;
  tags: string[];
  featured?: boolean;
  seo?: {
    metaTitle: {
      tr: string;
      en: string;
    };
    metaDescription: {
      tr: string;
      en: string;
    };
    focusKeywords: string[];
    canonicalSlug: string;
  };
  content: {
    tr: {
      lead: string;
      sections: {
        heading: string;
        body: string;
        quote?: string;
        bulletPoints?: string[];
      }[];
      keyTakeaways: string[];
      callToActionText: string;
    };
    en: {
      lead: string;
      sections: {
        heading: string;
        body: string;
        quote?: string;
        bulletPoints?: string[];
      }[];
      keyTakeaways: string[];
      callToActionText: string;
    };
  };
}

export interface Athlete {
  id: string;
  name: string;
  avatar: string;
  age: number;
  branch: string; // e.g., 'Basketbol', 'Voleybol', 'Yüzme'
  category: string; // e.g., 'U12 Gelişim', 'Yıldız Takım'
  sporpuan: number;
  attendanceRate: number; // 0-100
  streakDays: number;
  parentName: string;
  parentPhone: string;
  rankBadge: string;
  lastAttendance: string;
}

export interface AttendanceRecord {
  date: string;
  status: 'present' | 'absent' | 'excused';
  sporpuanEarned: number;
  trainingTitle: string;
}

export interface SkillMetric {
  name: string;
  score: number; // 0 - 100
  category: 'teknik' | 'fiziksel' | 'taktik' | 'mental';
  notes: string;
}

export interface ReportCard {
  id: string;
  athleteId: string;
  period: string; // '2025-2026 Güz Dönemi'
  publishedAt: string;
  coachName: string;
  coachTitle: string;
  coachNotes: string;
  generalScore: number; // out of 100
  metrics: SkillMetric[];
  attendanceCount: number;
  totalTrainings: number;
  sporpuanEarnedTotal: number;
  sharedWithParent: boolean;
  sharedAt?: string;
  strengths: string[];
  improvementAreas: string[];
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'ekipman' | 'deneyim' | 'rozet' | 'ozel';
  pointsRequired: number;
  image: string;
  stock: number;
  description: string;
  claimedCount: number;
}

export interface ClubBranch {
  id: string;
  name: string;
  icon: string;
  studentCount: number;
  coachCount: number;
  monthlyRevenue: number;
}
