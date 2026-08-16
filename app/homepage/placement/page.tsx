'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  n_en: string;
  n_hi: string;
  d_en: string;
  d_hi: string;
}

interface PlacementsData {
  heading_en: string;
  heading_hi: string;

  stats: StatItem[];

  recruitersHeading_en: string;
  recruitersHeading_hi: string;

  recruitersDescription_en: string;
  recruitersDescription_hi: string;

  topRecruiters_en: string[];
  topRecruiters_hi: string[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

type Lang = 'en' | 'hi';

function Placement() {
  const [lang, setLang] = useState<Lang>('en');

  const [placementsData, setPlacementsData] =
    useState<PlacementsData>({
      heading_en: 'Placement Statistics',
      heading_hi: 'प्लेसमेंट सांख्यिकी',

      stats: [
        {
          n_en: '3.4 Cr',
          n_hi: '3.4 करोड़',
          d_en: 'Highest International Package',
          d_hi: 'उच्चतम अंतर्राष्ट्रीय पैकेज',
        },
        {
          n_en: '52 LPA',
          n_hi: '52 लाख',
          d_en: 'Highest Domestic Package',
          d_hi: 'उच्चतम घरेलू पैकेज',
        },
        {
          n_en: '17.5 LPA',
          n_hi: '17.5 लाख',
          d_en: 'Average Package',
          d_hi: 'औसत पैकेज',
        },
        {
          n_en: '95%+',
          n_hi: '95%+',
          d_en: 'Placement Rate',
          d_hi: 'प्लेसमेंट दर',
        },
        {
          n_en: '850+',
          n_hi: '850+',
          d_en: 'Offers Made',
          d_hi: 'कुल प्रस्ताव',
        },
        {
          n_en: '140+',
          n_hi: '140+',
          d_en: 'Visiting Companies',
          d_hi: 'भर्ती कंपनियाँ',
        },
      ],

      recruitersHeading_en: 'Top Recruiters',
      recruitersHeading_hi: 'शीर्ष भर्तीकर्ता',

      recruitersDescription_en:
        'Leading global companies and Fortune 500 recruiters visit our campus annually.',
      recruitersDescription_hi:
        'अग्रणी वैश्विक कंपनियाँ और फॉर्च्यून 500 भर्तीकर्ता प्रतिवर्ष हमारे परिसर का दौरा करते हैं।',

      topRecruiters_en: [
        'Google',
        'Microsoft',
        'Amazon',
        'Adobe',
        'Goldman Sachs',
        'Oracle',
        'Samsung',
        'Qualcomm',
        'Texas Instruments',
      ],

      topRecruiters_hi: [
        'गूगल',
        'माइक्रोसॉफ्ट',
        'अमेज़न',
        'एडोब',
        'गोल्डमैन सैक्स',
        'ओरेकल',
        'सैमसंग',
        'क्वालकॉम',
        'टेक्सास इंस्ट्रूमेंट्स',
      ],
    });

  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH DATA
  // =========================
  useEffect(() => {
    let mounted = true;

    async function loadPlacements() {
      try {
        const res = await fetch(
          'http://localhost:4000/v1/homepage/placements'
        );

        const json = await res.json();

        if (mounted && json.success && json.data) {
          setPlacementsData((prev) => ({
            heading_en: json.data.heading_en || prev.heading_en,
            heading_hi: json.data.heading_hi || prev.heading_hi,

            stats: (json.data.stats && json.data.stats.length > 0)
              ? json.data.stats
              : prev.stats,

            recruitersHeading_en:
              json.data.recruitersheading_en || prev.recruitersHeading_en,
            recruitersHeading_hi:
              json.data.recruitersheading_hi || prev.recruitersHeading_hi,

            recruitersDescription_en:
              json.data.recruitersdescription_en || prev.recruitersDescription_en,
            recruitersDescription_hi:
              json.data.recruitersdescription_hi || prev.recruitersDescription_hi,

            topRecruiters_en:
              (json.data.toprecruiters_en && json.data.toprecruiters_en.length > 0)
                ? json.data.toprecruiters_en
                : prev.topRecruiters_en,
            topRecruiters_hi:
              (json.data.toprecruiters_hi && json.data.toprecruiters_hi.length > 0)
                ? json.data.toprecruiters_hi
                : prev.topRecruiters_hi,
          }));
        }
      } catch (err) {
        console.error('Failed to fetch placements', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadPlacements();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="py-16 flex items-center justify-center bg-black">
        <p className="text-white text-lg">
          Loading placements...
        </p>
      </section>
    );
  }

  const isEn = lang === 'en';

  return (
    <section className="py-16 px-4 sm:px-8 md:px-12 lg:px-16 w-full bg-black relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/nith.jpg')] bg-cover bg-center bg-fixed opacity-40"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT: Stats */}
          <div className="lg:col-span-7">

            <motion.h2
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase mb-8 tracking-tight"
              style={{
                color: 'transparent',
                WebkitTextStroke: '2px #FFFFFF',
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {isEn
                ? placementsData.heading_en
                : placementsData.heading_hi}
            </motion.h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {placementsData.stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-5 text-center shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col justify-center min-h-[120px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{
                    delay: i * 0.1,
                  }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-[#631012]">
                    {isEn ? item.n_en : item.n_hi}
                  </div>

                  <div className="text-gray-600 text-xs sm:text-sm font-medium mt-2">
                    {isEn ? item.d_en : item.d_hi}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Top Recruiters */}
          <div className="lg:col-span-5">

            <motion.h3
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {isEn
                ? placementsData.recruitersHeading_en
                : placementsData.recruitersHeading_hi}
            </motion.h3>

            <motion.p
              className="text-white/80 mb-6 text-sm sm:text-base leading-relaxed"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {isEn
                ? placementsData.recruitersDescription_en
                : placementsData.recruitersDescription_hi}
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {(isEn
                ? placementsData.topRecruiters_en
                : placementsData.topRecruiters_hi
              ).map((company, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center hover:bg-white/20 transition-colors"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-white text-xs sm:text-sm font-medium">
                    {company}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Placement;