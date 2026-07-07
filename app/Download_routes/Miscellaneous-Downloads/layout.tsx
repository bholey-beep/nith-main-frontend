'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer'; 

interface PageMeta {
  id?: number;
  page_type: "faculty" | "students" | "miscellaneous";
  heading_en: string;
  heading_hi: string;
  subheading_en: string;
  subheading_hi: string;
}


export default function DownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = useSelector((state: RootState) => state.language.value);
  const pathname = usePathname();

  const [metaData, setMetaData] = useState<PageMeta | null>(null);

  // Define your tabs here for cleaner code
  const tabs = [
    {
      name: language === 'en' ? 'General' : 'सामान्य',
      href: '/Download_routes/Miscellaneous-Downloads/general',
    }
]


useEffect(() => {
  const fetchMeta = async () => {
    try {
      const API_BASE = "http://localhost:4000/v1/downloads";

      const res = await fetch(`${API_BASE}/meta`);

      const data = await res.json();

      // find students page meta
      const studentsMeta = Array.isArray(data)
        ? data.find((item) => item.page_type === "miscellaneous")
        : data?.data?.find(
            (item: PageMeta) => item.page_type === "miscellaneous"
          );

      if (studentsMeta) {
        setMetaData(studentsMeta);
      }
    } catch (err) {
      console.error("Meta fetch error:", err);
    }
  };

  fetchMeta();
}, []);

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
              {language === "en" ? " Miscellaneous Downloads" : "विविध डाउनलोड्स"}
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
              {language === "en" 
              ? metaData?.heading_en || " Miscellaneous Downloads"
             : metaData?.heading_hi || "विविध डाउनलोड्स"}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
               {language === "en"
                ?metaData?.subheading_en ||
              "Access miscellaneous documents and resources"
               :metaData?.subheading_hi ||
              " विविध दस्तावेज़ और संसाधन प्राप्त करें"}
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
