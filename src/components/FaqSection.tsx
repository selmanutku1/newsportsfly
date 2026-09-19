import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const englishFaqs = [
    {
      q: 'How does the Sporpuan gamification system work?',
      a: 'Athletes automatically earn Sporpuan points every time attendance is marked (e.g., On-Time Arrival +25 SP, 4-session streak +100 SP, Fair-Play +50 SP). Accumulated points reflect in real-time on the parent portal. Athletes can redeem their points from the club reward catalog (jerseys, water bottles, match tickets, 1-on-1 coach sessions, etc.).'
    },
    {
      q: 'How do digital report cards reach parents?',
      a: 'Coaches evaluate technical, physical, tactical, and mental skills via tablet or smartphone, write feedback, and click "Publish". The platform automatically delivers a push notification and secure link directly to the parent portal and WhatsApp. Parents can view visual radar charts or download a validated PDF.'
    },
    {
      q: 'Can we import our existing athlete data from Excel?',
      a: 'Yes, absolutely! You can import athletes, parents, and groups from Excel or CSV in less than 3 minutes using the Smart Import Wizard with zero data loss. Our support team is also available to help you transfer records.'
    },
    {
      q: 'How do parents and coaches access the app?',
      a: 'SportsFly is 100% cloud-based and built as a modern progressive web app (PWA). It works seamlessly on any iPhone, Android, tablet, or desktop with no mandatory app store downloads—just add to home screen with one tap.'
    },
    {
      q: 'Can we automate membership dues and payment tracking?',
      a: 'Yes. Monthly dues packages, upcoming due dates, automated overdue WhatsApp alerts, and digital receipts are fully managed. You can also connect credit card gateways (Stripe, Iyzico, PayTR) for one-click online payment.'
    },
    {
      q: 'Do I need a credit card for the 14-day free trial?',
      a: 'No, no credit card is required to begin your 14-day trial. You can set up your sports club and immediately start testing roll calls and Sporpuan rewards.'
    }
  ];

  const faqs = language === 'tr' ? FAQS : englishFaqs;

  return (
    <section id="faqs" className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            {t.faqBadge}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {t.faqDesc}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden transition hover:border-slate-300 shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
