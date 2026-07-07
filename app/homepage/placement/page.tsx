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
          d_en: 'Highest Package',
          d_hi: 'उच्चतम पैकेज',
        },
      ],

      recruitersHeading_en: 'Top Recruiters',
      recruitersHeading_hi: 'शीर्ष भर्तीकर्ता',

      recruitersDescription_en:
        'Leading companies visit our campus.',
      recruitersDescription_hi:
        'प्रमुख कंपनियाँ हमारे परिसर में आती हैं।',

      topRecruiters_en: [
        'Google',
        'Microsoft',
        'Amazon',
      ],

      topRecruiters_hi: [
        'गूगल',
        'माइक्रोसॉफ्ट',
        'अमेज़न',
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

        if (mounted && json.success) {
          setPlacementsData({
            heading_en: json.data.heading_en || '',
            heading_hi: json.data.heading_hi || '',

            stats: json.data.stats || [],

            recruitersHeading_en:
              json.data.recruitersheading_en || '',
            recruitersHeading_hi:
              json.data.recruitersheading_hi || '',

            recruitersDescription_en:
              json.data.recruitersdescription_en || '',
            recruitersDescription_hi:
              json.data.recruitersdescription_hi || '',

            topRecruiters_en:
              json.data.toprecruiters_en || [],
            topRecruiters_hi:
              json.data.toprecruiters_hi || [],
          });
        }
      } catch (err) {
        console.error('Failed to fetch placements', err);
      } finally {
        setLoading(false);
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
    <section className="py-16 px-6 bg-black relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[url('/nith.jpg')] bg-cover bg-center bg-fixed opacity-40"></div>
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() =>
            setLang(lang === 'en' ? 'hi' : 'en')
          }
          className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium"
        >
          {lang === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>

            <motion.h2
              className="text-4xl sm:text-5xl font-black uppercase mb-8"
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

            <div className="grid grid-cols-2 gap-4">
              {placementsData.stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl p-5 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{
                    delay: i * 0.1,
                  }}
                >
                  <div className="text-3xl font-bold text-[#631012]">
                    {isEn ? item.n_en : item.n_hi}
                  </div>

                  <div className="text-gray-600 text-sm mt-2">
                    {isEn ? item.d_en : item.d_hi}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>

            <motion.h3
              className="text-3xl sm:text-4xl font-bold text-white mb-5"
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
              className="text-white/80 mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              {isEn
                ? placementsData.recruitersDescription_en
                : placementsData.recruitersDescription_hi}
            </motion.p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(isEn
                ? placementsData.topRecruiters_en
                : placementsData.topRecruiters_hi
              ).map((company, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-white text-sm">
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