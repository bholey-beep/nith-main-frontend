'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ShieldCheck, Trophy, Users, ClipboardCheck, Globe, Heart } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeInScale = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

const ICONS = [ShieldCheck, Trophy, Users, ClipboardCheck, Globe, Heart];

export default function CoreValuesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/core-values' : 'http://localhost:4000/core-values');
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
            <span className="text-[#800000] font-medium">Core Values</span>
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
            {language === 'en' ? data?.heroHeadingEn || 'Core Values' : data?.heroHeadingHi || 'Core Values'}
          </h1>
          {(language === "en" ? data?.heroDescriptionEn : data?.heroDescriptionHi) ? (
            <div className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: language === "en" ? data?.heroDescriptionEn : data?.heroDescriptionHi }} />
          ) : (
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              The enduring principles that guide our commitment to excellence: <span className="font-semibold">Integrity</span>, <span className="font-semibold">Excellence</span>, <span className="font-semibold">Unity</span>, <span className="font-semibold">Accountability</span>, <span className="font-semibold">Inclusivity</span>, and <span className="font-semibold">Empathy</span>
            </p>
          )}
        </motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              {language === 'en' ? data?.pillarsLabelEn || 'Six Pillars' : data?.pillarsLabelHi || 'Six Pillars'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.pillarsHeadingEn || 'Our Guiding Principles' : data?.pillarsHeadingHi || 'Our Guiding Principles'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'en' ? data?.pillarsSubtitleEn || 'The foundation of our institutional excellence and ethical leadership' : data?.pillarsSubtitleHi || 'The foundation of our institutional excellence and ethical leadership'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.coreValues?.map((value: any, index: number) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeInScale} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }} className="group relative bg-white border border-gray-200 rounded-3xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#800000] to-[#631012] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#800000] transition-colors">
                      {language === 'en' ? value.titleEn : value.titleHi}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {language === 'en' ? value.descriptionEn : value.descriptionHi}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              {language === 'en' ? data?.practiceLabelEn || 'In Practice' : data?.practiceLabelHi || 'In Practice'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.practiceHeadingEn || 'Our Vision in Action' : data?.practiceHeadingHi || 'Our Vision in Action'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'en' ? data?.practiceSubtitleEn || 'How we bring these values to life every day' : data?.practiceSubtitleHi || 'How we bring these values to life every day'}
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInScale} transition={{ duration: 0.7, delay: 0.2 }} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 md:p-14">
            <div className="space-y-6">
              {data?.practiceParagraphs?.map((paragraph: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-[#800000] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {language === 'en' ? paragraph.paragraphEn : paragraph.paragraphHi}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
