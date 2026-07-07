'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { FileText, Download, FileType } from 'lucide-react';

interface Rule {
  id: number;
  particulars_en: string;
  particulars_hn: string;
  pdf_url: string;
  word_url: string;
}

const INITIAL_RULES: Rule[] = [
  {
    id: -1,
    particulars_en: 'CUMULATIVE PROFESSIONAL DEVELOPMENT ALLOWANCE (CPDA) RULES W.E.F. 1st APRIL, 2021 to 31st MARCH, 2024',
    particulars_hn: '1 अप्रैल, 2021 से 31 मार्च, 2024 तक संचयी व्यावसायिक विकास भत्ता (सीपीडीए) नियम',
    pdf_url: '/documents/cpda-rules.pdf',
    word_url: '/documents/cpda-rules.docx',
  }
];

export default function CPDARules() {
  const language = useSelector((state: RootState) => state.language.value);
  const [rules, setRules] = useState<Rule[]>([]);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hRes = await fetch('http://localhost:4000/api/faculty-cpda');
        const hData = await hRes.json();
        setHeading(hData);

        const lRes = await fetch('http://localhost:4000/api/faculty-cpda/list');
        const lData = await lRes.json();
        
        if (Array.isArray(lData) && lData.length > 0) {
          setRules(lData);
        } else {
          setRules(INITIAL_RULES);
        }
      } catch (err) {
        console.error('Error fetching CPDA rules:', err);
        setRules(INITIAL_RULES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24 text-center shadow-inner">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              {heading && heading.title_en ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'CPDA Rules' : 'सीपीडीए नियम')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
            >
              {heading && heading.sub_title_en ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'CUMULATIVE PROFESSIONAL DEVELOPMENT ALLOWANCE RULES' : 'संचयी व्यावसायिक विकास भत्ता नियम')}
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 px-4 md:px-6 -mt-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header Grid */}
              <div className="grid grid-cols-[80px_1fr_200px] gap-4 bg-gray-900 p-6 text-xs md:text-sm font-bold text-white uppercase tracking-widest">
                <div className="text-center">S.No</div>
                <div>Particulars</div>
                <div className="text-center">Downloads</div>
              </div>

              {/* Data Rows */}
              <div className="divide-y divide-gray-100">
                {loading ? (
                    <div className="p-20 text-center text-gray-400">Loading rules...</div>
                ) : rules.length > 0 ? (
                    rules.map((rule, idx) => (
                        <motion.div 
                            key={rule.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="grid grid-cols-[80px_1fr_200px] gap-4 p-6 hover:bg-gray-50 items-center transition-colors group"
                        >
                            <div className="text-center font-mono text-gray-400 group-hover:text-[#631012] font-bold">
                                {String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
                                {language === 'en' ? rule.particulars_en : rule.particulars_hn}
                            </div>
                            <div className="flex justify-center gap-4">
                                {rule.pdf_url && (
                                    <a 
                                        href={rule.pdf_url}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg text-xs font-bold hover:bg-red-700 hover:text-white transition-all shadow-sm"
                                    >
                                        <FileType size={14} /> PDF
                                    </a>
                                )}
                                {rule.word_url && (
                                    <a 
                                        href={rule.word_url}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-700 hover:text-white transition-all shadow-sm"
                                    >
                                        <FileType size={14} /> WORD
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-20 text-center text-gray-400">No CPDA rules found.</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
