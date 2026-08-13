'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Eye, Lightbulb, Beaker, Users, Heart, Globe } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeInScale = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
const fadeInLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
const fadeInRight = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const ICONS = [Lightbulb, Beaker, Users, Heart, Globe, Eye];

export default function VisionMissionPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/vision-mission' : 'http://localhost:4000/vision-mission');
        if (res.ok) {
          setData(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#800000] transition-colors duration-200">Home</Link>
            <span>›</span>
            <span className="text-gray-400">About</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">Vision & Mission</span>
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            {language === 'en' ? data?.hero_heading_en || 'Vision & Mission' : data?.hero_heading_hi || 'दृष्टिकोण एवं मिशन'}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {language === 'en' ? data?.hero_description_en || 'Guiding principles that shape our future' : data?.hero_description_hi || 'मार्गदर्शक सिद्धांत जो हमारे भविष्य को आकार देते हैं'}
          </p>
        </motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInLeft} transition={{ duration: 0.8 }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#800000]/5 to-transparent rounded-3xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-[#800000] to-[#631012] rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {language === 'en' ? data?.vision_heading_en || 'Our Vision' : data?.vision_heading_hi || 'हमारा दृष्टिकोण'}
                </h2>
                <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                  {language === 'en' ? data?.vision_description_en || 'To build a vibrant multicultural learning environment founded on value based academic principles' : data?.vision_description_hi || 'मूल्य आधारित शैक्षणिक सिद्धांतों पर स्थापित एक जीवंत बहुसांस्कृतिक सीखने का माहौल बनाने के लिए'}
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInRight} transition={{ duration: 0.8 }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-l from-[#800000]/5 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500"></div>
              <div className="relative bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500">
                <div className="w-20 h-20 bg-gradient-to-br from-[#800000] to-[#631012] rounded-2xl flex items-center justify-center mb-8 shadow-lg transform group-hover:-translate-y-2 transition-transform duration-500">
                  <TargetIcon className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  {language === 'en' ? data?.mission_heading_en || 'Our Mission' : data?.mission_heading_hi || 'हमारा मिशन'}
                </h2>
                <div className="text-gray-600 text-lg leading-relaxed space-y-4">
                  {language === 'en' ? data?.mission_description_en || 'To build a vibrant multicultural learning environment founded on value based academic principles' : data?.mission_description_hi || 'मूल्य आधारित शैक्षणिक सिद्धांतों पर स्थापित एक जीवंत बहुसांस्कृतिक सीखने का माहौल बनाने के लिए'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              {language === 'en' ? data?.guiding_principles_label_en || 'Guiding Principles' : data?.guiding_principles_label_hi || 'मार्गदर्शक सिद्धांत'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.guiding_principles_heading_en || 'Mission Pillars' : data?.guiding_principles_heading_hi || 'मिशन के स्तंभ'}
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.missionPillars?.map((pillar: any, index: number) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div key={index} variants={fadeInScale} whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }} className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#800000] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#800000] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#800000] transition-colors">
                      {language === 'en' ? pillar.title_en : pillar.title_hi}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'en' ? pillar.description_en : pillar.description_hi}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.legacy_heading_en || 'Our Legacy in Numbers' : data?.legacy_heading_hi || 'संख्याओं में हमारी विरासत'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {language === 'en' ? data?.legacy_description_en || 'Impact we have created over the years' : data?.legacy_description_hi || 'वर्षों में हमने जो प्रभाव पैदा किया है'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.legacyStats?.map((stat: any, index: number) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-black text-[#800000] mb-4">
                  {language === 'en' ? stat.value_en : stat.value_hi}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {language === 'en' ? stat.label_en : stat.label_hi}
                </h3>
                <p className="text-gray-500 text-sm">
                  {language === 'en' ? stat.description_en : stat.description_hi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TargetIcon(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <circle cx="12" cy="12" r="6" strokeWidth="2" />
      <circle cx="12" cy="12" r="2" strokeWidth="2" />
    </svg>
  );
}
