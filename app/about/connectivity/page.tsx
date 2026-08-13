'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const TrainIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0h-.01M15 17a2 2 0 104 0m-4 0h-.01M9 17h6" />
  </svg>
);

const PlaneIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const BusIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeInScale = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

const getIconByName = (name: string) => {
  switch (name?.toLowerCase()) {
    case 'train': return TrainIcon;
    case 'plane': return PlaneIcon;
    case 'bus': return BusIcon;
    default: return BusIcon;
  }
};

export default function ConnectivityPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL + '/connectivity' : 'http://localhost:4000/connectivity');
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
            <span className="text-[#800000] font-medium">Connectivity</span>
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
            {language === 'en' ? data?.heroHeadingEn || 'Getting Here' : data?.heroHeadingHi || 'यहाँ कैसे पहुँचें'}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {language === 'en' ? data?.heroDescriptionEn || 'Find out how to reach us' : data?.heroDescriptionHi || 'हमारे पास पहुँचने के तरीके खोजें'}
          </p>
        </motion.div>
      </section>

      <section className="relative py-24 px-6 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-semibold rounded-full mb-4">
              {language === 'en' ? data?.travelOptionsLabelEn || 'Modes' : data?.travelOptionsLabelHi || 'तरीके'}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'en' ? data?.travelOptionsHeadingEn || 'Travel Options' : data?.travelOptionsHeadingHi || 'यात्रा के विकल्प'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              {language === 'en' ? data?.travelOptionsSubtitleEn || 'Select your preferred route' : data?.travelOptionsSubtitleHi || 'अपना पसंदीदा मार्ग चुनें'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data?.travelOptions?.map((mode: any, index: number) => {
              const Icon = getIconByName(mode.icon);
              return (
                <motion.div key={index} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInScale} transition={{ duration: 0.5, delay: index * 0.1 }} className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#800000] to-[#631012] rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-[#800000] transition-colors">
                      {language === 'en' ? mode.titleEn : mode.titleHi}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">{language === 'en' ? mode.nearestPointLabelEn : mode.nearestPointLabelHi}</span>
                        <span className="font-semibold text-gray-900 text-right">{language === 'en' ? mode.nearestPointValueEn : mode.nearestPointValueHi}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-100">
                        <span className="text-gray-500">{language === 'en' ? mode.distanceLabelEn : mode.distanceLabelHi}</span>
                        <span className="font-semibold text-[#800000]">{language === 'en' ? mode.distanceValueEn : mode.distanceValueHi}</span>
                      </div>
                      {mode.travelTimeEn && (
                        <div className="flex justify-between items-center py-3 border-b border-gray-100">
                          <span className="text-gray-500">Travel Time</span>
                          <span className="font-semibold text-gray-900">{language === 'en' ? mode.travelTimeEn : mode.travelTimeHi}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">
                        {language === 'en' ? mode.servicesLabelEn : mode.servicesLabelHi}
                      </p>
                      <ul className="space-y-2">
                        {mode.servicesParagraphs?.map((service: any, idx: number) => (
                          <li key={idx} className="flex items-start text-gray-600">
                            <span className="text-[#800000] mr-2">•</span>
                            <span>{language === 'en' ? service.paragraphEn : service.paragraphHi}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-gradient-to-r from-[#800000] to-[#631012] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
