'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Target, Lightbulb, Users, BookOpen, Globe, TrendingUp, Leaf, GraduationCap, ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeInScale = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const ICONS = [Target, Lightbulb, Globe, Leaf, Users, BookOpen, TrendingUp, GraduationCap];

export default function GoalsPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/goals' : 'http://localhost:4000/goals');
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
            <span className="text-[#800000] font-medium">Goals</span>
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
            {language === 'en' ? data?.heroHeadingEn || 'Our Goals' : data?.heroHeadingHi || 'Our Goals'}
          </h1>
          {(language === "en" ? data?.heroDescriptionEn : data?.heroDescriptionHi) ? (
            <div className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: language === "en" ? data?.heroDescriptionEn : data?.heroDescriptionHi }} />
          ) : (
            <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              Defining our long-term vision of excellence in education, research, and societal growth through innovation, sustainability, and inclusive development.
            </p>
          )}
        </motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.institutionalHeadingEn || 'Institutional Goals' : data?.institutionalHeadingHi || 'Institutional Goals'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'en' ? data?.institutionalSubtitleEn || 'Eight pillars driving our commitment to excellence, innovation, and sustainable growth' : data?.institutionalSubtitleHi || 'Eight pillars driving our commitment to excellence, innovation, and sustainable growth'}
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.goalItems?.map((goal: any, index: number) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <motion.div key={index} variants={fadeInScale} whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300 } }} className="group relative bg-white rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#800000] to-[#631012] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#800000] transition-colors">{language === 'en' ? goal.titleEn : goal.titleHi}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{language === 'en' ? goal.descriptionEn : goal.descriptionHi}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.roadmapHeadingEn || 'Roadmap to 2030' : data?.roadmapHeadingHi || 'Roadmap to 2030'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'en' ? data?.roadmapSubtitleEn || 'Strategic initiatives to achieve our institutional goals' : data?.roadmapSubtitleHi || 'Strategic initiatives to achieve our institutional goals'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {data?.actionSteps?.map((item: any, index: number) => (
              <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={fadeUp} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-[#800000] transition-colors duration-300">
                  <span className="text-[#800000] font-bold text-lg group-hover:text-white transition-colors duration-300">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{language === 'en' ? item.titleEn : item.titleHi}</h3>
                  <p className="text-gray-600 leading-relaxed">{language === 'en' ? item.descriptionEn : item.descriptionHi}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {data?.ctaButtons?.length > 0 && (
        <section className="bg-gradient-to-br from-[#800000] to-[#631012] py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {language === 'en' ? data?.ctaHeadingEn || 'Join Us in Our Journey' : data?.ctaHeadingHi || 'Join Us in Our Journey'}
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {data?.ctaButtons?.map((btn: any, index: number) => (
                  <Link key={index} href={btn.linkUrl || "#"} className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${index === 0 ? 'bg-white text-[#800000] hover:bg-gray-100' : 'bg-[#631012] text-white border border-white/20 hover:bg-white/10'}`}>
                    {language === 'en' ? btn.labelEn : btn.labelHi}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
