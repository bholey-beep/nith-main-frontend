'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useEffect, useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeInLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } };
const fadeInRight = { hidden: { opacity: 0, x: 50 }, visible: { opacity: 1, x: 0 } };

export default function HistoryPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [historyData, setHistoryData] = useState<any>(null);
  const [timelineEvents, setTimelineEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [mainRes, timelineRes] = await Promise.all([
          fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/history' : 'http://localhost:4000/history'),
          fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/history/timeline' : 'http://localhost:4000/history/timeline')
        ]);
        if (mainRes.ok) setHistoryData(await mainRes.json());
        if (timelineRes.ok) setTimelineEvents(await timelineRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#800000] transition-colors duration-200">Home</Link>
            <span>›</span>
            <span className="text-gray-400">About</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">History</span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8 }} className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Our History</h1>
          {(language === "en" ? historyData?.description1_en : historyData?.description1_hi) ? (
            <div className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: language === "en" ? historyData?.description1_en : historyData?.description1_hi }} />
          ) : (
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">From our establishment in 1986 to becoming an Institute of National Importance — a journey of excellence and growth.</p>
          )}
        </motion.div>
      </section>

      <section className="relative py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto space-y-4">
              <p>{language === "en" ? historyData?.description2_en : historyData?.description2_hi}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Timeline</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">Key milestones in our journey from REC to NIT</p>
          </motion.div>

          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#631012] via-[#8B1E1E] to-[#631012]"></div>

            {timelineEvents?.map((event: any, index: number) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={isLeft ? fadeInLeft : fadeInRight} transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.2 }} className={`relative flex items-center mb-16 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                  <div className={`w-5/12 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
                      <div className={`text-[#800000] font-bold text-3xl mb-2 flex items-center gap-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
                        {isLeft && <span className="text-sm font-medium px-3 py-1 bg-red-50 text-[#800000] rounded-full">{event.event_date ? new Date(event.event_date).toLocaleDateString() : ''}</span>}
                        {event.year}
                        {!isLeft && <span className="text-sm font-medium px-3 py-1 bg-red-50 text-[#800000] rounded-full">{event.event_date ? new Date(event.event_date).toLocaleDateString() : ''}</span>}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#631012] transition-colors">{language === 'en' ? event.title_en : event.title_hi}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{language === 'en' ? event.description_en : event.description_hi}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-[#800000] rounded-full border-4 border-white shadow-lg z-10"></div>
                </motion.div>
              );
            })}
          </div>

          <div className="md:hidden relative">
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#631012] via-[#8B1E1E] to-[#631012]"></div>
            {timelineEvents?.map((event: any, index: number) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.15 }} className="relative pl-16 pb-12 last:pb-0">
                <div className="absolute left-4 top-0 w-5 h-5 bg-[#800000] rounded-full border-4 border-white shadow-lg z-10"></div>
                <motion.div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200" whileHover={{ scale: 1.02 }}>
                  <div className="mb-2">
                    <span className="text-[#800000] font-bold text-2xl mr-3">{event.year}</span>
                    <span className="text-xs font-medium px-2 py-1 bg-red-50 text-[#800000] rounded-full">{event.event_date ? new Date(event.event_date).toLocaleDateString() : ''}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{language === 'en' ? event.title_en : event.title_hi}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{language === 'en' ? event.description_en : event.description_hi}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Legacy</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#800000] to-red-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-white/90 leading-relaxed text-lg">{language === "en" ? historyData?.legacy_en : historyData?.legacy_hi}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
