'use client';
// Trigger hot reload for routing tree
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Added to style active tabs
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer'; // Assuming you want the footer here too

export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = useSelector((state: RootState) => state.language.value);
  const pathname = usePathname();
  const [heading, setHeading] = useState<any>({
    title_en: 'Rules_for_Conducting_Workshops',
    title_hn: 'छात्रों के लिए डाउनलोड',
    sub_title_en: 'Latest downloads, announcements, and updates from the NITH Rules_for_Conducting_Workshops.',
    sub_title_hn: 'एनआईटीएच छात्रों के लिए डाउनलोड, घोषणाएं और नवीनतम अपडेट।',
    tab1_name_en: 'Conference/Workshop/FDP/STC Rules Formats',
    tab1_name_hn: 'सम्मेलन/कार्यशाला/एफडीपी/एसटीसी नियम प्रारूप',
    tab2_name_en: 'Notices/Office Orders/Notifications',
    tab2_name_hn: 'सूचनाएं/कार्यालय आदेश/अधिसूचनाएं'
  });

  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/faculty-workshop`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.title_en) {
            setHeading({
              title_en: data.title_en,
              title_hn: data.title_hn,
              sub_title_en: data.sub_title_en,
              sub_title_hn: data.sub_title_hn,
              tab1_name_en: data.tab1_name_en || 'Conference/Workshop/FDP/STC Rules Formats',
              tab1_name_hn: data.tab1_name_hn || 'सम्मेलन/कार्यशाला/एफडीपी/एसटीसी नियम प्रारूप',
              tab2_name_en: data.tab2_name_en || 'Notices/Office Orders/Notifications',
              tab2_name_hn: data.tab2_name_hn || 'सूचनाएं/कार्यालय आदेश/अधिसूचनाएं'
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch heading:', err);
      }
    };
    fetchHeading();
  }, []);

  const isHindi = language === 'hi';

  // Define your tabs here for cleaner code
  const tabs = [
    {
      name: isHindi ? heading.tab1_name_hn : heading.tab1_name_en,
      href: '/faculty-section/Rules_for_Conducting_Workshops',
    },
    {
      name: isHindi ? heading.tab2_name_hn : heading.tab2_name_en,
      href: '/faculty-section/Rules_for_Conducting_Workshops/notices',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header31 />

      {/* Breadcrumb Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'en' ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="font-medium text-gray-900">
              {isHindi ? heading.title_hn : heading.title_en}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {isHindi ? heading.title_hn : heading.title_en}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              {isHindi ? heading.sub_title_hn : heading.sub_title_en}
            </p>
          </motion.div>
        </div>
      </section>
      {/* Tab Navigation Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              // Check if the current path starts with the tab href to set active state
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'border-[#631012] text-[#631012]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
