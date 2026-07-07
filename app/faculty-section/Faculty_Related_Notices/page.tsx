'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { FileText, Download, Eye, Calendar, AlertCircle } from 'lucide-react';

interface NoticeItem {
  id: number;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  category_en: string;
  category_hn: string;
  date_en: string;
  date_hn: string;
  priority_en: string;
  priority_hn: string;
  view_url: string;
  download_url: string;
}

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: -1,
    title_en: 'Faculty Performance Appraisal Submission Deadline',
    title_hn: 'संकाय प्रदर्शन मूल्यांकन जमा करने की समय सीमा',
    description_en: 'All faculty members are requested to submit their annual performance appraisal reports by the stipulated deadline.',
    description_hn: 'सभी संकाय सदस्यों से अनुरोध है कि वे निर्धारित समय सीमा तक अपनी वार्षिक प्रदर्शन मूल्यांकन रिपोर्ट जमा करें।',
    category_en: 'Academic',
    category_hn: 'अकादमिक',
    date_en: 'January 10, 2025',
    date_hn: '10 जनवरी, 2025',
    priority_en: 'High',
    priority_hn: 'उच्च',
    view_url: '/documents/notice',
    download_url: '/documents/notice.pdf',
  },
  {
    id: -2,
    title_en: 'Revised Leave Rules for Faculty Members',
    title_hn: 'संकाय सदस्यों के लिए संशोधित अवकाश नियम',
    description_en: 'Notification regarding revised leave rules and entitlements for regular and contractual faculty members.',
    description_hn: 'नियमित और संविदात्मक संकाय सदस्यों के लिए संशोधित अवकाश नियमों और पात्रता के संबंध में अधिसूचना।',
    category_en: 'Leave & Benefits',
    category_hn: 'अवकाश और लाभ',
    date_en: 'January 8, 2025',
    date_hn: '08 जनवरी, 2025',
    priority_en: 'Medium',
    priority_hn: 'मध्यम',
    view_url: '/documents/leave-rules',
    download_url: '/documents/leave-rules.pdf',
  }
];

export default function FacultyNewsroom() {
  const language = useSelector((state: RootState) => state.language.value);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hRes = await fetch('http://localhost:4000/api/faculty-notices');
        const hData = await hRes.json();
        setHeading(hData);

        const lRes = await fetch('http://localhost:4000/api/faculty-notices/list');
        const lData = await lRes.json();
        
        let merged = Array.isArray(lData) ? [...lData] : [];
        INITIAL_NOTICES.forEach(def => {
            // Check if either the title or the ID already exists in the merged list
            const exists = merged.some(m => m.title_en === def.title_en || String(m.id) === String(def.id));
            if (!exists) {
                merged.push(def);
            }
        });
        setNotices(merged);
      } catch (err) {
        console.error('Error fetching notices:', err);
        setNotices(INITIAL_NOTICES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    notices.forEach(n => cats.add(n.category_en));
    return Array.from(cats);
  }, [notices]);

  const filteredNotices = useMemo(() => {
    if (selectedCategory === 'All') return notices;
    return notices.filter(n => n.category_en === selectedCategory);
  }, [notices, selectedCategory]);

  const getPriorityColor = (priority: string) => {
    if (priority === 'High' || priority === 'उच्च') return 'bg-red-100 text-red-800';
    if (priority === 'Medium' || priority === 'मध्यम') return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24 shadow-inner">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              {heading ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'Faculty Notices' : 'संकाय संबंधित सूचनाएं')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
            >
              {heading ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Important notices, circulars, and announcements for faculty members.' : 'संकाय सदस्यों के लिए महत्वपूर्ण सूचनाएं, परिपत्र और घोषणाएं।')}
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 -mt-10">
          {/* Filters */}
          <div className="bg-white p-4 rounded-xl shadow-xl mb-10 flex flex-wrap gap-3 items-center justify-center border border-gray-100">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === cat 
                  ? 'bg-[#631012] text-white shadow-lg scale-105' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {language === 'en' ? cat : (
                    cat === 'All' ? 'सभी' :
                    cat === 'Academic' ? 'अकादमिक' :
                    cat === 'Administrative' ? 'प्रशासनिक' :
                    cat === 'Recruitment' ? 'भर्ती' :
                    cat === 'Promotions' ? 'पदोन्नति' :
                    cat === 'Leave & Benefits' ? 'अवकाश और लाभ' : cat
                )}
              </button>
            ))}
          </div>

          {/* Notices Grid */}
          <div className="space-y-6">
            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading notices...</div>
            ) : filteredNotices.length > 0 ? (
                filteredNotices.map((notice, idx) => (
                    <motion.div
                        key={notice.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                            {/* Date Box */}
                            <div className="flex-shrink-0 w-24 h-24 bg-gray-50 rounded-2xl flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#631012]/5 transition-colors">
                                <Calendar className="w-6 h-6 text-[#631012] mb-1" />
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter text-center px-1">
                                    {language === 'en' ? notice.date_en : notice.date_hn}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <span className="px-3 py-1 bg-[#631012]/10 text-[#631012] text-xs font-bold rounded-full uppercase tracking-wider">
                                        {language === 'en' ? notice.category_en : notice.category_hn}
                                    </span>
                                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(notice.priority_en)}`}>
                                        <AlertCircle size={12} />
                                        {language === 'en' ? notice.priority_en : notice.priority_hn}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#631012] transition-colors">
                                    {language === 'en' ? notice.title_en : notice.title_hn}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                                    {language === 'en' ? notice.description_en : notice.description_hn}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 md:flex-col lg:flex-row">
                                <a 
                                    href={notice.view_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                                >
                                    <Eye size={16} /> {language === 'en' ? 'View' : 'देखें'}
                                </a>
                                <a 
                                    href={notice.download_url.startsWith('http') 
                                        ? `${notice.download_url}${notice.download_url.includes('?') ? '&' : '?'}response-content-disposition=attachment` 
                                        : notice.download_url
                                    }
                                    download
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#631012] text-white rounded-xl text-sm font-bold hover:bg-[#7a1214] transition-colors shadow-lg shadow-[#631012]/20"
                                >
                                    <Download size={16} /> {language === 'en' ? 'Download' : 'डाउनलोड'}
                                </a>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="text-center py-20 text-gray-400 bg-white rounded-2xl border-2 border-dashed">
                    No notices found in this category.
                </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
