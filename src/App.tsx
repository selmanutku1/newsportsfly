/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveView, Athlete, ReportCard, RewardItem } from './types';
import { INITIAL_ATHLETES, INITIAL_REPORT_CARDS, REWARD_CATALOG } from './data/mockData';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PaymentAutomationSection } from './components/PaymentAutomationSection';
import { FeaturesSection } from './components/FeaturesSection';
import { SporpuanSection } from './components/SporpuanSection';
import { DigitalReportSection } from './components/DigitalReportSection';
import { AllSportsBanner } from './components/AllSportsBanner';
import { HumanSupportSection } from './components/HumanSupportSection';
import { RoiCalculator } from './components/RoiCalculator';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { ParentPanel } from './components/panels/ParentPanel';
import { CoachPanel } from './components/panels/CoachPanel';
import { AdminPanel } from './components/panels/AdminPanel';
import { ReportCardModal } from './components/panels/ReportCardModal';
import { BlogPage } from './components/BlogPage';
import { setPageSeo } from './utils/seoHelper';
import { useLanguage } from './context/LanguageContext';

function MainApp() {
  const { language } = useLanguage();
  const [currentView, setCurrentView] = useState<ActiveView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#blog')) return 'blog';
    }
    return 'marketing';
  });
  const [athletes, setAthletes] = useState<Athlete[]>(INITIAL_ATHLETES);
  const [reportCards, setReportCards] = useState<Record<string, ReportCard>>(INITIAL_REPORT_CARDS);
  const [rewards, setRewards] = useState<RewardItem[]>(REWARD_CATALOG);

  // Sync hash routing on popstate / hashchange
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#blog')) {
        setCurrentView('blog');
      } else {
        setCurrentView('marketing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update default homepage SEO when in marketing view
  React.useEffect(() => {
    if (currentView === 'marketing') {
      const isTr = language === 'tr';
      setPageSeo({
        title: isTr
          ? 'SportsFly - Spor Okulları ve Akademi Yönetim Sistemi'
          : 'SportsFly - Sports Academy & Club Management System',
        description: isTr
          ? 'Spor okulları ve kulüpler için yeni nesil yönetim yazılımı. Eğitmen ve veli panelleri, devamlılık odaklı Sporpuan ödül sistemi ve otomatik dijital sporcu karneleri.'
          : 'Next-generation sports academy management platform. Coach & parent portals, Sporpuan gamification retention system, and 360° digital athlete report cards.',
        canonicalUrl: 'https://sportsfly.app/',
        keywords: [
          'spor okulu yönetim sistemi',
          'spor okulu otomasyonu',
          'aidat tahsilat sistemi',
          'sporpuan',
          'dijital sporcu karnesi',
        ],
      });
    }
  }, [currentView, language]);

  // Demo Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [selectedPlanForDemo, setSelectedPlanForDemo] = useState('Kulüp & Akademi');

  // Sample Report Card Standalone Modal (from marketing section)
  const [sampleCardModalOpen, setSampleCardModalOpen] = useState(false);

  // Handle updating a report card from Coach panel
  const handleUpdateReportCard = (updatedCard: ReportCard) => {
    setReportCards((prev) => ({
      ...prev,
      [updatedCard.athleteId]: updatedCard,
    }));
  };

  // Handle awarding bonus Sporpuan from Coach panel
  const handleAwardBonusPoints = (athleteId: string, bonus: number, reason: string) => {
    setAthletes((prev) =>
      prev.map((ath) => {
        if (ath.id === athleteId) {
          return {
            ...ath,
            sporpuan: ath.sporpuan + bonus,
          };
        }
        return ath;
      })
    );
  };

  const handleOpenDemoWithPlan = (planName: string) => {
    setSelectedPlanForDemo(planName);
    setDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. MARKETING VIEW (Professional SaaS Website for SportsFly) */}
      {currentView === 'marketing' && (
        <div className="flex flex-col min-h-screen">
          <Navbar
            currentView={currentView}
            onNavigateView={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDemoModal={() => setDemoModalOpen(true)}
          />

          <main className="flex-1">
            <HeroSection
              onOpenDemoModal={() => setDemoModalOpen(true)}
            />

            <PaymentAutomationSection />

            <FeaturesSection />

            <SporpuanSection />

            <DigitalReportSection
              onOpenSampleCard={() => setSampleCardModalOpen(true)}
            />

            <AllSportsBanner
              onOpenDemoModal={() => setDemoModalOpen(true)}
            />

            <HumanSupportSection />

            <RoiCalculator />

            <PricingSection onSelectPlan={handleOpenDemoWithPlan} />

            <TestimonialsSection />

            <FaqSection />
          </main>

          <Footer
            onNavigateView={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenDemoModal={() => setDemoModalOpen(true)}
          />
        </div>
      )}

      {/* 2. PARENT PANEL (Veli Portalı) */}
      {currentView === 'parent_panel' && (
        <ParentPanel
          athletes={athletes}
          rewards={rewards}
          reportCards={reportCards}
          onBackToSite={() => setCurrentView('marketing')}
          onSwitchToCoach={() => setCurrentView('coach_panel')}
        />
      )}

      {/* 3. COACH PANEL (Antrenör & Eğitmen Paneli) */}
      {currentView === 'coach_panel' && (
        <CoachPanel
          athletes={athletes}
          reportCards={reportCards}
          onBackToSite={() => setCurrentView('marketing')}
          onSwitchToParent={() => setCurrentView('parent_panel')}
          onUpdateReportCard={handleUpdateReportCard}
          onAwardBonusPoints={handleAwardBonusPoints}
        />
      )}

      {/* 4. ADMIN PANEL (Kulüp & Akademi Yönetimi) */}
      {currentView === 'admin_panel' && (
        <AdminPanel
          onBackToSite={() => setCurrentView('marketing')}
          onSwitchToCoach={() => setCurrentView('coach_panel')}
          onSwitchToParent={() => setCurrentView('parent_panel')}
        />
      )}

      {/* 5. ACADEMY BLOG & GUIDES (SportsFly Blogu ve Makaleler) */}
      {currentView === 'blog' && (
        <BlogPage
          onNavigateView={(view) => {
            setCurrentView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenDemoModal={() => setDemoModalOpen(true)}
        />
      )}

      {/* Standalone Digital Report Card Modal (Opened from Marketing Section) */}
      {sampleCardModalOpen && (
        <ReportCardModal
          card={reportCards['ath-1']}
          athlete={athletes[0]}
          isOpen={sampleCardModalOpen}
          onClose={() => setSampleCardModalOpen(false)}
          isCoachView={false}
        />
      )}

      {/* Demo & 14-Day Free Trial Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        selectedPlan={selectedPlanForDemo}
        onNavigateView={(view) => {
          setCurrentView(view);
          setDemoModalOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
