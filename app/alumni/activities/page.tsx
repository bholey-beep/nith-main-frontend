'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { Calendar } from 'lucide-react';

interface Activity {
  id: number;
  date_en: string;
  date_hn: string;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  category_en: string;
  category_hn: string;
  mode_en: string;
  mode_hn: string;
  location_en: string;
  location_hn: string;
}

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: -1,
    date_en: '2025-01-15',
    date_hn: '15 जनवरी, 2025',
    title_en: 'Annual Alumni Reunion 2025',
    title_hn: 'वार्षिक पूर्व छात्र पुनर्मिलन 2025',
    description_en: 'Join us for the grand annual reunion celebrating decades of excellence.',
    description_hn: 'दशकों की उत्कृष्टता का जश्न मनाने वाले भव्य वार्षिक पुनर्मिलन में हमारे साथ जुड़ें।',
    category_en: 'Reunions',
    category_hn: 'पुनर्मिलन',
    mode_en: 'Offline',
    mode_hn: 'ऑफलाइन',
    location_en: 'Main Auditorium, NIT Hamirpur',
    location_hn: 'मुख्य सभागार, एनआईटी हमीरपुर'
  },
  {
    id: -2,
    date_en: '2025-01-20',
    date_hn: '20 जनवरी, 2025',
    title_en: 'Tech Talk: AI in Industry',
    title_hn: 'टेक टॉक: उद्योग में एआई',
    description_en: 'Learn about AI applications in modern industry from our distinguished alumni.',
    description_hn: 'हमारे विशिष्ट पूर्व छात्रों से आधुनिक उद्योग में एआई अनुप्रयोगों के बारे में जानें।',
    category_en: 'Webinars',
    category_hn: 'वेबिनार',
    mode_en: 'Online',
    mode_hn: 'ऑनलाइन',
    location_en: 'Zoom',
    location_hn: 'ज़ूम'
  }
];

const ITEMS_PER_PAGE = 10;

export default function Activities() {
  const language = useSelector((state: RootState) => state.language.value);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hRes = await fetch('http://localhost:4000/api/alumni-activities');
        const hData = await hRes.json();
        setHeading(hData);

        const lRes = await fetch('http://localhost:4000/api/alumni-activities/list');
        const lData = await lRes.json();
        
        let merged = Array.isArray(lData) ? [...lData] : [];
        INITIAL_ACTIVITIES.forEach(def => {
          if (!merged.find(m => m.title_en === def.title_en || String(m.id) === String(def.id))) {
            merged.push(def);
          }
        });
        setActivities(merged);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setActivities(INITIAL_ACTIVITIES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    activities.forEach(a => cats.add(language === 'en' ? a.category_en : a.category_hn));
    return ['All', ...Array.from(cats)];
  }, [activities, language]);

  const filteredActivities = useMemo(() => {
    if (activeCategory === 'All') return activities;
    return activities.filter(a => (language === 'en' ? a.category_en : a.category_hn) === activeCategory);
  }, [activities, activeCategory, language]);

  const paginatedActivities = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredActivities.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredActivities, currentPage]);

  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  const formatDate = (dateStr: string) => {
    try {
        return new Date(dateStr).toLocaleDateString(language === 'en' ? 'en-US' : 'hi-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    } catch { return dateStr; }
  };

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-bold text-white mb-6">
              {heading && heading.title_en ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'Alumni Activities' : 'पूर्व छात्र गतिविधियाँ')}
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
              {heading && heading.sub_title_en ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Stay connected with your alma mater through reunions, webinars, and campus events.' : 'पुनर्मिलन, वेबिनार और कैंपस कार्यक्रमों के माध्यम से अपने अल्मा मेटर से जुड़े रहें।')}
            </p>
          </div>
        </section>

        <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 -mt-12 relative z-10 border border-gray-100 flex flex-wrap items-center gap-4">
            <span className="font-bold text-gray-700 uppercase text-xs tracking-wider">{language === 'en' ? 'Filter By Category:' : 'श्रेणी के आधार पर फ़िल्टर करें:'}</span>
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => {setActiveCategory(cat); setCurrentPage(1);}}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${activeCategory === cat ? 'bg-[#631012] text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          </div>

          {loading ? (
              <div className="p-20 text-center text-gray-400 bg-white rounded-3xl shadow-xl border border-gray-100">
                  <div className="animate-spin w-10 h-10 border-4 border-[#631012] border-t-transparent rounded-full mx-auto mb-4"></div>
                  Loading activities...
              </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {paginatedActivities.map((act, idx) => (
                        <motion.div 
                            key={act.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden group"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 rounded-lg bg-[#631012]/10 text-[#631012] text-xs font-bold uppercase tracking-widest">
                                        {language === 'en' ? act.category_en : act.category_hn}
                                    </span>
                                    <span className="text-xs text-gray-400 font-mono italic">
                                        {language === 'en' ? act.mode_en : act.mode_hn}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#631012] transition-colors leading-tight">
                                    {language === 'en' ? act.title_en : act.title_hn}
                                </h3>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-2 font-light italic">
                                    {language === 'en' ? act.description_en : act.description_hn}
                                </p>
                                <div className="space-y-3 pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#631012]">
                                            <Calendar size={16} />
                                        </div>
                                        {language === 'en' ? act.date_en : act.date_hn}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-[#631012]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                        </div>
                                        {language === 'en' ? act.location_en : act.location_hn}
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-gray-50 group-hover:bg-[#631012] text-gray-400 group-hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
                                {language === 'en' ? 'View Full Details' : 'पूर्ण विवरण देखें'}
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
          )}

          {totalPages > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                  {Array.from({length: totalPages}).map((_, i) => (
                      <button 
                        key={i} 
                        onClick={() => {setCurrentPage(i+1); window.scrollTo({top: 400, behavior: 'smooth'});}}
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
