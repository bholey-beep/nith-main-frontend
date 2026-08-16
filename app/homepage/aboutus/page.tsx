'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BriefcaseIcon, AcademicCapIcon, ArrowTrendingUpIcon, StarIcon } from '@heroicons/react/24/outline'; // Or any icon library

type Lang = 'en' | 'hi';

interface AboutData {
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const imageStackFadeIn = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const fallbackAboutData: AboutData = {
  title_en: 'National Institute of Technology Hamirpur',
  title_hi: 'राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर',
  description_en: 'National Institute of Technology Hamirpur is one of the thirty-one NITs of the country, which came into existence on 7th August 1986 as Regional Engineering College, a joint and cooperative enterprise of the Govt. of India and Govt. of Himachal Pradesh. At the time of inception, Institute had only two departments i.e., Civil and Electrical Engineering having an intake of 30 students in each.',
  description_hi: 'राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर देश के इकतीस एनआईटी में से एक है, जो 7 अगस्त 1986 को क्षेत्रीय इंजीनियरिंग कॉलेज के रूप में अस्तित्व में आया था, जो भारत सरकार और हिमाचल प्रदेश सरकार का एक संयुक्त और सहकारी उद्यम है। स्थापना के समय, संस्थान में केवल दो विभाग थे, अर्थात सिविल और इलेक्ट्रिकल इंजीनियरिंग, जिनमें से प्रत्येक में 30 छात्रों का प्रवेश होता था।'
};

// Hardcoded statistics for NITH
const statItems = [
  {
    icon: BriefcaseIcon,
    value: '#TBD', // E.g., #65
    label_en: 'NIRF 2025',
    label_hi: 'एनआईआरएफ 2025',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: ArrowTrendingUpIcon,
    value: '₹TBD LPA', // E.g., ₹87LPA
    label_en: 'HIGHEST PACKAGE',
    label_hi: 'उच्चतम पैकेज',
    color: 'text-green-600 bg-green-100',
  },
  {
    icon: AcademicCapIcon,
    value: 'INSTITUTE',
    label_en: 'NATIONAL IMPORTANCE',
    label_hi: 'राष्ट्रीय महत्व',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon: StarIcon,
    value: '₹TBD LPA', // E.g., ₹17.7LPA
    label_en: 'AVG PACKAGE',
    label_hi: 'औसत पैकेज',
    color: 'text-orange-600 bg-orange-100',
  },
];

function Aboutus() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [lang, setLang] = useState<Lang>('en');

  const isEn = lang === 'en';

  useEffect(() => {
    let mounted = true;

    async function loadAbout() {
      try {
        setLoading(true);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')}/v1/homepage/about`
        );

        const json = await res.json();

        console.log('ABOUT RESPONSE:', json);

        if (mounted) {
          if (json.success && json.data) {
            setAbout(json.data);
          } else {
            console.warn('API returned unsuccessful response, using fallback data.');
            setAbout(fallbackAboutData);
          }
        }
      } catch (err) {
        console.error('Fetch error for about us:', err);
        if (mounted) {
          console.warn('Network error, using fallback data.');
          setAbout(fallbackAboutData);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadAbout();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Content */}
          <motion.div
            className="space-y-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* HEADER SECTION */}
            <div>
              <h4 className="text-[#631012] font-semibold tracking-widest uppercase text-sm mb-3">
                {isEn ? 'Discover Our Story' : 'हमारी कहानी जानें'}
              </h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                {isEn ? 'About NITH' : 'एनआईटीएच के बारे में'}
              </h2>
              <div className="w-20 h-1 bg-[#631012] mt-6"></div>
            </div>

            {/* CONTENT: Description */}
            <div className="space-y-6">
              {loading && (
                <p className="text-gray-500 animate-pulse">
                  {isEn ? 'Loading...' : 'लोड हो रहा है...'}
                </p>
              )}

              {error && (
                <p className="text-red-500">
                  {error}
                </p>
              )}

              {!loading && !error && about && (
                <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                  {isEn ? about.description_en : about.description_hi}
                </p>
              )}
            </div>

            {/* STATISTICS SECTION */}
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-gray-200">
              {statItems.map((stat, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-3 bg-white border border-gray-100 rounded-none shadow-sm text-[#631012]">
                    <stat.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 leading-none">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                      {isEn ? stat.label_en : stat.label_hi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Elegant Offset Image Gallery */}
          <motion.div
            className="flex justify-center lg:justify-end items-center mt-10 lg:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={imageStackFadeIn}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              {/* Back Image (Top Right) */}
              <div className="absolute top-0 right-0 w-3/4 h-[70%] z-10 shadow-lg border-[6px] border-white bg-gray-100">
                <img
                  src="/admin.jpg"
                  alt="NITH Campus 2"
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Front Image (Bottom Left) */}
              <div className="absolute bottom-0 left-0 w-3/4 h-[70%] z-20 shadow-2xl border-[6px] border-white bg-gray-100">
                <img
                  src="award.jpg"
                  alt="NITH Main Campus"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Accent Block */}
              <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-[#631012]/10 z-0"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Aboutus;