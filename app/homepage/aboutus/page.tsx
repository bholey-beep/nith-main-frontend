'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
          'http://localhost:4000/v1/homepage/about'
        );

        const json = await res.json();

        console.log('ABOUT RESPONSE:', json);

        if (mounted && json.success) {
          setAbout(json.data);
        } else {
          setError('Failed to fetch about data');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    loadAbout();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative py-15 px-6 overflow-hidden">

      {/* Background */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-[#631012]/20 rounded-full blur-3xl opacity-30"></div>

      <div className="w-full mx-auto relative z-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <motion.h2
            className="text-4xl font-bold text-[#631012] relative"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {isEn ? 'About Us' : 'हमारे बारे में'}

            <motion.span
              className="absolute left-0 bottom-0 w-0 h-[3px] bg-[#631012]"
              whileInView={{
                width: '100%',
                transition: { duration: 0.8, delay: 0.3 },
              }}
            />
          </motion.h2>

          {/* LANGUAGE TOGGLE */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="px-4 py-2 bg-[#631012] text-white rounded-lg text-sm"
          >
            {isEn ? 'हिंदी' : 'English'}
          </button>

        </div>

        {/* CONTENT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >

          {/* LOADING */}
          {loading && (
            <p className="text-gray-500">
              {isEn ? 'Loading...' : 'लोड हो रहा है...'}
            </p>
          )}

          {/* ERROR */}
          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {/* DATA */}
          {!loading && !error && about && (
            <div className="mt-4 space-y-4">

              {/* TITLE */}
              <h3 className="text-2xl font-semibold text-[#631012]">
                {isEn ? about.title_en : about.title_hi}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-700 leading-relaxed text-md whitespace-pre-wrap">
                {isEn
                  ? about.description_en
                  : about.description_hi}
              </p>

            </div>
          )}

        </motion.div>

      </div>
    </section>
  );
}

export default Aboutus;