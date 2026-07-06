'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function RegistrarPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [registrar, setRegistrar] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/registrar')
      .then(res => res.json())
      .then(json => {
        if (json.success) setRegistrar(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 text-black">

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language == 'en' ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {language == 'en' ? 'Administration' : 'प्रशासन'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {language == 'en' ? 'Registrar' : 'रजिस्ट्रार'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            {language == 'en' ? 'Registrar' : 'रजिस्ट्रार'}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {language == 'en'
              ? 'Profile summary and contact details'
              : 'प्रोफाइल सारांश और संपर्क विवरण'}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row gap-8 p-8 md:p-12">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src={registrar?.image || "/nith-registrar.jpg"}
                  alt={registrar?.name || "Registrar"}
                  width={280}
                  height={360}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                  {registrar?.name || 'Dr. Archana Santosh Nanoty'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {language == 'en' ? 'Registrar' : 'रजिस्ट्रार'}
                </p>
                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <p>
                    {language == 'en' ? 'Email:' : 'ईमेल:'}{' '}
                    <a
                      className="text-[#631012] hover:underline"
                      href={`mailto:${registrar?.email || 'registrar@nith.ac.in'}`}
                    >
                      {registrar?.email || 'registrar@nith.ac.in'}
                    </a>
                  </p>
                  <p>{language == 'en' ? 'Phone:' : 'फोन:'} {registrar?.phone || '01972-254010'}</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold text-[#800000] mb-4 border-b-2 border-[#800000] pb-2 text-left">
                {language == 'en' ? 'Profile Summary' : 'प्रोफाइल सारांश'}
              </h3>
              <div className="space-y-4 text-gray-700 leading-relaxed text-left">
                {(language === 'en' ? registrar?.profile_summary_en : registrar?.profile_summary_hi)?.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                )) || (
                  <p>Profile summary not available.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

    </div>
  );
}
