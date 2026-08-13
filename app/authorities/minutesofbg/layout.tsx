'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Added to style active tabs



export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = useSelector((state: RootState) => state.language.value);
  const pathname = usePathname();

  // Define your tabs here for cleaner code
  const tabs = [
    {
      name: language === 'en' ? 'Board of Governors' : 'स्नातक',
      href: '/authorities/minutesofbg',
    },
    {
      name: language === 'en' ? 'Special BoG' : 'परास्नातक',
      href: '/authorities/minutesofbg/special_Bog',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      

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
              {language === 'en' ? 'Minutes of BOG' : 'छात्रों के लिए डाउनलोड'}
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
              {language === 'en'
                ? 'Minutes of the Meetings'
                : 'छात्रों के लिए डाउनलोड'}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
              {language === 'en'
                ? 'Latest downloads, announcements, and updates from the NITH Minutes of the Meetings.'
                : 'एनआईटीएच छात्रों के लिए डाउनलोड, घोषणाएं और नवीनतम अपडेट।'}
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

      
    </div>
  );
}

