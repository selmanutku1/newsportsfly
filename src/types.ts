export type ActiveView = 'marketing' | 'parent_panel' | 'coach_panel' | 'admin_panel';

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
