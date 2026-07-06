'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { FileText, Download, Eye, Calendar, Search } from 'lucide-react';

interface MoUItem {
  id: number;
  title_en: string;
  title_hn: string;
  drafted_date: string;
  document_url: string;
  file_type: string;
}

const ITEMS_PER_PAGE = 10;

export default function AlumniRelatedMou() {
  const language = useSelector((state: RootState) => state.language.value);
  const [mous, setMous] = useState<MoUItem[]>([]);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hRes = await fetch('http://localhost:4000/api/alumni-mou');
        const hData = await hRes.json();
        setHeading(hData);

        const lRes = await fetch('http://localhost:4000/api/alumni-mou/list');
        const lData = await lRes.json();
        
        setMous(Array.isArray(lData) ? lData : []);
      } catch (err) {
        console.error('Error fetching MoUs:', err);
        setMous([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredMous = useMemo(() => {
    return mous.filter(m => {
        const title = (language === 'en' ? m.title_en : m.title_hn).toLowerCase();
        return title.includes(searchTerm.toLowerCase());
    });
  }, [mous, searchTerm, language]);

  const paginatedMous = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMous.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMous, currentPage]);

  const totalPages = Math.ceil(filteredMous.length / ITEMS_PER_PAGE);

  const formatDate = (dateStr: string) => {
    try {
        return new Date(dateStr).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    } catch { return dateStr; }
  };

  const handleRead = (url: string) => {
    if (!url) { alert(language === 'en' ? 'Document not available' : 'दस्तावेज़ उपलब्ध नहीं है'); return; }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
              {heading && heading.title_en ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'Alumni Related MoUs' : 'पूर्व छात्र संबंधित समझौता ज्ञापन')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
              {heading && heading.sub_title_en ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Official Memorandums of Understanding associated with NITH Alumni initiatives and collaborations.' : 'एनआईटीएच पूर्व छात्र पहलों और सहयोगों से जुड़े आधिकारिक समझौता ज्ञापन।')}
            </motion.p>
          </div>
        </section>

        {/* Search & Actions */}
        <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-20">
            <div className="bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text" 
                        placeholder={language === 'en' ? "Search MoUs..." : "खोजें..."} 
                        value={searchTerm}
                        onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#631012] outline-none transition-all text-sm"
                    />
                </div>
                <div className="text-sm font-bold text-[#631012] uppercase tracking-wider">
                    {language === 'en' ? 'Document Repository' : 'दस्तावेज़ भंडार'}
                </div>
            </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
            {loading ? (
                <div className="p-20 text-center text-gray-400 bg-white rounded-3xl shadow-xl border border-gray-100">
                    <div className="animate-spin w-10 h-10 border-4 border-[#631012] border-t-transparent rounded-full mx-auto mb-4"></div>
                    Loading Documents...
                </div>
            ) : (
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {paginatedMous.map((mou, idx) => (
                            <motion.div 
                                key={mou.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 group"
                            >
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="w-14 h-14 rounded-2xl bg-[#631012]/5 flex items-center justify-center text-[#631012] group-hover:bg-[#631012] group-hover:text-white transition-all shadow-inner">
                                        <FileText size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#631012] transition-colors">
                                            {language === 'en' ? mou.title_en : mou.title_hn}
                                        </h3>
                                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                                            <span className="flex items-center gap-1"><Calendar size={12} /> {language === 'en' ? 'Drafted on:' : 'तैयार किया गया:'} {formatDate(mou.drafted_date)}</span>
                                            <span className="uppercase px-2 py-0.5 bg-gray-100 rounded text-[10px] tracking-widest">{mou.file_type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleRead(mou.document_url)}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"
                                    >
                                        <Eye size={16} /> {language === 'en' ? 'View Document' : 'दस्तावेज़ देखें'}
                                    </button>
                                    <a 
                                        href={mou.document_url}
                                        download
                                        className="flex items-center gap-2 px-6 py-2.5 bg-[#631012] text-white rounded-xl text-sm font-bold hover:bg-[#7a1214] transition-all shadow-lg shadow-[#631012]/20"
                                    >
                                        <Download size={16} /> {language === 'en' ? 'Download' : 'डाउनलोड'}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredMous.length === 0 && (
                        <div className="p-20 text-center text-gray-400 bg-white rounded-3xl shadow-xl border-2 border-dashed border-gray-100">
                            {language === 'en' ? 'No matching MoUs found.' : 'कोई समझौता ज्ञापन नहीं मिला।'}
                        </div>
                    )}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                    {Array.from({length: totalPages}).map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => {setCurrentPage(i+1); window.scrollTo({top: 300, behavior: 'smooth'});}}
                            className={`w-10 h-10 rounded-xl font-bold transition-all ${currentPage === i+1 ? 'bg-[#631012] text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-200 hover:bg-gray-50'}`}
                        >
                            {i+1}
                        </button>
                    ))}
                </div>
            )}
        </section>
      </div>
      <Footer />
    </>
  );
}
