'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Notice {
  id: number;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  date_en: string;
  date_hn: string;
  category_en: string;
  category_hn: string;
  priority_en: string;
  priority_hn: string;
  attachment_url: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  notices_heading_en: string;
  notices_heading_hn: string;
  notices_sub_en: string;
  notices_sub_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Student Related Notices',
  title_hn: 'छात्रों से संबंधित सूचनाएं',
  sub_title_en: 'Stay updated with the latest announcements, circulars, and important notices for students at NIT Hamirpur.',
  sub_title_hn: 'एनआईटी हमीरपुर में छात्रों के लिए नवीनतम घोषणाओं, परिपत्रों और महत्वपूर्ण सूचनाओं से अपडेट रहें।',
  notices_heading_en: 'Latest Notices',
  notices_heading_hn: 'नवीनतम सूचनाएं',
  notices_sub_en: 'Important announcements and circulars for students',
  notices_sub_hn: 'छात्रों के लिए महत्वपूर्ण घोषणाएं और परिपत्र',
};

const FALLBACK_NOTICES: Notice[] = [
  {
    id: 1,
    title_en: "End Semester Examination Schedule - Spring 2025",
    title_hn: "एंड सेमेस्टर परीक्षा समय सारणी - स्प्रिंग 2025",
    description_en: "The end semester examination for Spring 2025 will commence from May 15, 2025. All students are advised to check the detailed schedule.",
    description_hn: "स्प्रिंग 2025 के लिए एंड सेमेस्टर परीक्षा 15 मई, 2025 से शुरू होगी। सभी छात्रों को विस्तृत समय सारणी की जांच करने की सलाह दी जाती है।",
    date_en: "2025-04-01",
    date_hn: "2025-04-01",
    category_en: "Examination",
    category_hn: "परीक्षा",
    priority_en: "High",
    priority_hn: "उच्च",
    attachment_url: "/notices/exam-schedule-spring-2025.pdf"
  },
  {
    id: 2,
    title_en: "Hostel Room Allotment for Session 2025-26",
    title_hn: "सत्र 2025-26 के लिए छात्रावास कक्ष आवंटन",
    description_en: "Applications for hostel room allotment for the upcoming academic session are now open. Last date to apply is April 30, 2025.",
    description_hn: "आगामी शैक्षणिक सत्र के लिए छात्रावास कक्ष आवंटन के लिए आवेदन अब खुले हैं। आवेदन करने की अंतिम तिथि 30 अप्रैल, 2025 है।",
    date_en: "2025-03-25",
    date_hn: "2025-03-25",
    category_en: "Hostel",
    category_hn: "छात्रावास",
    priority_en: "Medium",
    priority_hn: "मध्यम",
    attachment_url: "/notices/hostel-allotment-2025.pdf"
  },
  {
    id: 3,
    title_en: "Scholarship Application Deadline Extended",
    title_hn: "छात्रवृत्ति आवेदन की अंतिम तिथि बढ़ाई गई",
    description_en: "The deadline for submitting scholarship applications has been extended to April 15, 2025. Eligible students are encouraged to apply.",
    description_hn: "छात्रवृत्ति आवेदन जमा करने की अंतिम तिथि 15 अप्रैल, 2025 तक बढ़ा दी गई है। पात्र छात्रों को आवेदन करने के लिए प्रोत्साहित किया जाता है।",
    date_en: "2025-03-20",
    date_hn: "2025-03-20",
    category_en: "Scholarship",
    category_hn: "छात्रवृत्ति",
    priority_en: "High",
    priority_hn: "उच्च",
    attachment_url: "/notices/scholarship-extension.pdf"
  },
  {
    id: 4,
    title_en: "Campus Placement Drive - TechCorp India",
    title_hn: "कैंपस प्लेसमेंट ड्राइव - टेककॉर्प इंडिया",
    description_en: "TechCorp India will be conducting campus placements on April 10, 2025. Eligible students should register by April 5, 2025.",
    description_hn: "टेककॉर्प इंडिया 10 अप्रैल, 2025 को कैंपस प्लेसमेंट आयोजित करेगी। पात्र छात्रों को 5 अप्रैल, 2025 तक पंजीकरण करना चाहिए।",
    date_en: "2025-03-18",
    date_hn: "2025-03-18",
    category_en: "Placement",
    category_hn: "प्लेसमेंट",
    priority_en: "Medium",
    priority_hn: "मध्यम",
    attachment_url: "/notices/techcorp-placement.pdf"
  },
  {
    id: 5,
    title_en: "Library Book Return Reminder",
    title_hn: "पुस्तकालय पुस्तक वापसी अनुस्मारक",
    description_en: "All students are reminded to return borrowed library books before the end of the semester to avoid late fees.",
    description_hn: "सभी छात्रों को याद दिलाया जाता है कि वे विलंब शुल्क से बचने के लिए सेमेस्टर के अंत से पहले उधार ली गई पुस्तकालय पुस्तकों को वापस कर दें।",
    date_en: "2025-03-15",
    date_hn: "2025-03-15",
    category_en: "General",
    category_hn: "सामान्य",
    priority_en: "Low",
    priority_hn: "निम्न",
    attachment_url: ""
  }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const getAttachmentUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch heading
        const headRes = await fetch(`${API_URL}/api/student-notices`, { cache: 'no-store' });
        if (headRes.ok) {
          const headData = await headRes.json();
          if (headData.title_en) {
            setHeading(headData);
          }
        }

        // Fetch list
        const listRes = await fetch(`${API_URL}/api/student-notices/list`, { cache: 'no-store' });
        if (listRes.ok) {
          const listData = await listRes.json();
          if (Array.isArray(listData) && listData.length > 0) {
            setNotices(listData);
          } else {
            setNotices(FALLBACK_NOTICES);
          }
        } else {
          setNotices(FALLBACK_NOTICES);
        }
      } catch (err) {
        console.error('Error fetching dynamic student notices:', err);
        setNotices(FALLBACK_NOTICES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [API_URL]);

  const categoriesList = useMemo(() => {
    const unique = Array.from(new Set(notices.map((n) => isHindi ? n.category_hn : n.category_en)));
    return ['All', ...unique];
  }, [notices, isHindi]);

  const filtered = useMemo(() => {
    return notices.filter((n) => {
      const title = isHindi ? n.title_hn : n.title_en;
      const matchesQuery = title.toLowerCase().includes(query.toLowerCase());
      
      const currentCat = isHindi ? n.category_hn : n.category_en;
      const matchesCategory = selectedCategory === 'All' || currentCat === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [query, selectedCategory, notices, isHindi]);

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      High: 'bg-red-100 text-red-800 border border-red-200',
      Medium: 'bg-amber-100 text-amber-800 border border-amber-200',
      Low: 'bg-green-100 text-green-800 border border-green-200',
    };
    return colors[priority] || 'bg-gray-100 text-gray-805';
  };

  if (loading) {
    return (
      <>
        <Header31 />
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800000]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {isHindi ? 'छात्र' : 'Student'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isHindi ? 'सूचनाएँ' : 'Notices'}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center py-20 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
            {isHindi ? heading.title_hn : heading.title_en}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isHindi ? heading.sub_title_hn : heading.sub_title_en}
          </p>
        </motion.div>
      </section>

      {/* Main Directory Table */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
                {isHindi ? heading.notices_heading_hn : heading.notices_heading_en}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {filtered.length} {isHindi ? 'परिणाम' : 'results found'}
              </p>
            </div>

            {/* Filter and search bars */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isHindi ? 'सूचनाएँ खोजें...' : 'Search notices...'}
                className="w-full md:w-64 rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-[#800000]/30 focus:border-[#800000] text-sm font-medium"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm text-black focus:ring-2 focus:ring-[#800000]/30 focus:outline-none text-sm font-semibold cursor-pointer"
              >
                {categoriesList.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? (isHindi ? 'सभी श्रेणियां' : 'All Categories') : c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            {/* Desktop Table View */}
            <table className="w-full text-left table-auto hidden md:table">
              <thead>
                <tr className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                  <th className="py-3 pr-6 w-36">{isHindi ? 'दिनांक' : 'Date'}</th>
                  <th className="py-3 pr-6">{isHindi ? 'शीर्षक और विवरण' : 'Title & Details'}</th>
                  <th className="py-3 pr-6 w-44">{isHindi ? 'श्रेणी' : 'Category'}</th>
                  <th className="py-3 pr-6 w-52 text-right">{isHindi ? 'कार्रवाई' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((n) => (
                  <tr key={n.id} className="hover:bg-gray-55/30 transition-colors">
                    <td className="py-4 align-top text-gray-600 font-semibold">{isHindi ? n.date_hn : n.date_en}</td>
                    <td className="py-4 align-top pr-6">
                      <div className="font-extrabold text-gray-900 text-md mb-1 leading-snug">
                        {isHindi ? n.title_hn : n.title_en}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed font-medium">
                        {isHindi ? n.description_hn : n.description_en}
                      </p>
                    </td>
                    <td className="py-4 align-top">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#800000]/10 text-[#800000]">
                          {isHindi ? n.category_hn : n.category_en}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${getPriorityColor(n.priority_en)}`}>
                          {isHindi ? n.priority_hn : n.priority_en}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        {n.attachment_url ? (
                          <>
                            <a
                              href={getAttachmentUrl(n.attachment_url)}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-br from-[#800000] to-[#631012] hover:from-[#900000] hover:to-[#7a1214] text-white shadow-sm hover:shadow active:scale-95 transition-all"
                            >
                              {isHindi ? 'देखें' : 'View'}
                            </a>
                            <a
                              href={getAttachmentUrl(n.attachment_url)}
                              download
                              className="px-4 py-2 text-xs font-bold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-55 transition-colors"
                            >
                              {isHindi ? 'डाउनलोड' : 'Download'}
                            </a>
                          </>
                        ) : (
                          <span className="text-sm font-semibold text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile stacked list */}
            <div className="md:hidden space-y-4">
              {filtered.map((n) => (
                <div
                  key={n.id}
                  className="p-4 rounded-xl border border-gray-150 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#800000]/10 text-[#800000] text-[10px] font-bold">
                        {isHindi ? n.category_hn : n.category_en}
                      </span>
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${getPriorityColor(n.priority_en)}`}>
                        {isHindi ? n.priority_hn : n.priority_en}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400">
                        {isHindi ? n.date_hn : n.date_en}
                      </span>
                    </div>
                    <h4 className="font-extrabold text-gray-900 leading-snug">
                      {isHindi ? n.title_hn : n.title_en}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-medium mt-1">
                      {isHindi ? n.description_hn : n.description_en}
                    </p>
                  </div>
                  
                  {n.attachment_url && (
                    <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                      <a
                        href={getAttachmentUrl(n.attachment_url)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#800000] text-white flex-1 text-center"
                      >
                        {isHindi ? 'देखें' : 'View'}
                      </a>
                      <a
                        href={getAttachmentUrl(n.attachment_url)}
                        download
                        className="px-4 py-1.5 text-xs font-bold rounded-lg border border-gray-300 text-gray-700 text-center flex-1"
                      >
                        {isHindi ? 'डाउनलोड' : 'Download'}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="p-8 text-center text-gray-500 font-medium">
                {isHindi ? 'आपकी खोज से मेल खाती कोई सूचना नहीं मिली।' : 'No notices match your search criteria.'}
              </div>
            )}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
