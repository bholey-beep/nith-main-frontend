'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { Calendar, Download, FileText, ChevronRight } from 'lucide-react';

interface ForwardingRule {
  id: number;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  date_en: string;
  date_hn: string;
  download_url: string;
  read_more_url: string;
}

const INITIAL_RULES: ForwardingRule[] = [
  {
    id: -1,
    title_en: 'Leave Application Forwarding Protocol',
    title_hn: 'अवकाश आवेदन अग्रेषण प्रोटोकॉल',
    description_en: 'Guidelines for forwarding leave applications through departmental hierarchy and obtaining necessary approvals.',
    description_hn: 'विभागीय पदानुक्रम के माध्यम से अवकाश आवेदनों को अग्रेषित करने और आवश्यक अनुमोदन प्राप्त करने के लिए दिशानिर्देश।',
    date_en: 'January 1, 2024',
    date_hn: '1 जनवरी, 2024',
    download_url: '/documents/leave-forwarding-protocol.pdf',
    read_more_url: '/news/leave-forwarding'
  }
];

const ITEMS_PER_PAGE = 10;

export default function ForwardingRules() {
  const language = useSelector((state: RootState) => state.language.value);
  const [rules, setRules] = useState<ForwardingRule[]>([]);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hRes = await fetch('http://localhost:4000/api/faculty-forwarding');
        const hData = await hRes.json();
        setHeading(hData);

        const lRes = await fetch('http://localhost:4000/api/faculty-forwarding/list');
        const lData = await lRes.json();
        
        let merged = Array.isArray(lData) ? [...lData] : [];
        INITIAL_RULES.forEach(def => {
          if (!merged.find(m => m.title_en === def.title_en || String(m.id) === String(def.id))) {
            merged.push(def);
          }
        });
        setRules(merged);
      } catch (err) {
        console.error('Error fetching Forwarding rules:', err);
        setRules(INITIAL_RULES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(rules.length / ITEMS_PER_PAGE);
  const paginatedRules = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return rules.slice(start, start + ITEMS_PER_PAGE);
  }, [rules, currentPage]);

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
            >
              {heading && heading.title_en ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'Application Forwarding Rules' : 'आवेदन अग्रेषण नियम')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
            >
              {heading && heading.sub_title_en ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Comprehensive guidelines and procedures for forwarding faculty applications.' : 'संकाय आवेदनों को अग्रेषित करने के लिए व्यापक दिशानिर्देश और प्रक्रियाएं।')}
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 px-4 md:px-6 -mt-12">
          <div className="max-w-5xl mx-auto">
            {loading ? (
                <div className="p-20 text-center text-gray-400 bg-white rounded-3xl shadow-xl">
                    <div className="animate-spin w-10 h-10 border-4 border-[#631012] border-t-transparent rounded-full mx-auto mb-4"></div>
                    Loading rules...
                </div>
            ) : (
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {paginatedRules.map((item, idx) => (
                            <motion.article
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#631012] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3 text-[#631012]">
                                            <Calendar size={16} />
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                {language === 'en' ? item.date_en : item.date_hn}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#631012] transition-colors">
                                            {language === 'en' ? item.title_en : item.title_hn}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-6">
                                            {language === 'en' ? item.description_en : item.description_hn}
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            {item.download_url && (
                                                <a 
                                                    href={item.download_url}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-[#631012] transition-colors shadow-lg shadow-gray-200"
                                                >
                                                    <Download size={16} /> Download PDF
                                                </a>
                                            )}
                                            {item.read_more_url && (
                                                <Link 
                                                    href={item.read_more_url}
                                                    className="flex items-center gap-2 px-5 py-2.5 text-[#631012] border-2 border-[#631012]/10 rounded-xl text-sm font-semibold hover:bg-[#631012]/5 transition-colors"
                                                >
                                                    Read More <ChevronRight size={16} />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden md:flex items-center justify-center w-24 h-24 bg-gray-50 rounded-2xl group-hover:bg-[#631012]/5 transition-colors">
                                        <FileText size={40} className="text-[#631012]/20 group-hover:text-[#631012]/40 transition-colors" />
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i + 1 ? 'bg-[#631012] text-white shadow-lg' : 'bg-white text-gray-400 hover:bg-gray-100'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
