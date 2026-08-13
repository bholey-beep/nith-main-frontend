'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MapPin, ThermometerSun, Users, Globe, Navigation, Sunrise } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeInScale = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

const ICONS = [MapPin, ThermometerSun, Users, Globe, Navigation, Sunrise];

export default function TheCityPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [infoCards, setInfoCards] = useState<any[]>([]);
  const [descriptions, setDescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [mainRes, infoRes, descRes] = await Promise.all([
          fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/about-city' : 'http://localhost:4000/about-city'),
          fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/about-city/info-cards' : 'http://localhost:4000/about-city/info-cards'),
          fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/about-city/descriptions' : 'http://localhost:4000/about-city/descriptions')
        ]);
        if (mainRes.ok) setData(await mainRes.json());
        if (infoRes.ok) setInfoCards(await infoRes.json());
        if (descRes.ok) setDescriptions(await descRes.json());
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
            <span className="text-[#800000] font-medium">The City</span>
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
            {language === 'en' ? data?.heading_en || 'About Hamirpur' : data?.heading_hi || 'About Hamirpur'}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {language === 'en' ? data?.introduction_en || 'Discover the beauty of Hamirpur.' : data?.introduction_hi || 'Discover the beauty of Hamirpur.'}
          </p>
        </motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.overview_title_en || 'City Overview' : data?.overview_title_hi || 'City Overview'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'en' ? data?.overview_subtitle_en || 'Essential information about Hamirpur' : data?.overview_subtitle_hi || 'Essential information about Hamirpur'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {infoCards?.map((info: any, index: number) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInScale} transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }} whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }} className="group relative bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#800000] to-[#631012] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#800000] transition-colors">{language === 'en' ? info.label_en : info.label_hi}</h3>
                    <p className="text-gray-600">{language === 'en' ? info.value_en : info.value_hi}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.7, delay: 0.4 }} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {descriptions?.slice(0, Math.ceil(descriptions.length / 2)).map((desc: any, i: number) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-2 h-2 bg-[#800000] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'en' ? desc.description_en : desc.description_hi}
                    </p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {descriptions?.slice(Math.ceil(descriptions.length / 2)).map((desc: any, i: number) => (
                  <div key={i} className="flex items-center gap-5">
                    <div className="w-2 h-2 bg-[#800000] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">
                      {language === 'en' ? desc.description_en : desc.description_hi}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
