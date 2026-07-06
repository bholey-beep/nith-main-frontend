'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function DirectorPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/director')
      .then(res => res.json())
      .then(json => {
        if (json.success) setInfo(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;
  return (
    <div className="min-h-screen bg-white">

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
              {language == 'en' ? 'Director' : 'निदेशक'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            {info?.hero_heading || (language == 'en' ? 'Director' : 'निदेशक')}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {info?.hero_subheading || (language == 'en'
              ? "Leadership and Director's message from National Institute of Technology, Hamirpur."
              : 'राष्ट्रीय प्रौद्योगिकी संस्थान, हमीरपुर के नेतृत्व और निदेशक का संदेश।')}
          </p>
        </motion.div>
      </section>

      {/* Combined Director Section */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200">
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* Image and Quick Info */}
              <div className="md:col-span-1 flex flex-col items-center">
                <div className="w-72 h-96 bg-gradient-to-br from-[#800000] to-[#631012] rounded-lg overflow-hidden shadow-2xl mb-6">
                  <Image
                    src="/nith-director.jpg"
                    alt={info?.current_name || "Director"}
                    width={280}
                    height={360}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
                  {info?.current_name || (language == 'en'
                    ? 'Prof. Hiralal Murlidhar Suryawanshi'
                    : 'प्रो. हीरालाल मुरलीधर सुर्यवंशी')}
                </h2>
                <p className="text-[#800000] font-semibold text-lg mb-4">
                  {info?.current_designation || (language == 'en' ? 'Director' : 'निदेशक')}
                </p>

                <Link
                  href="https://vnit.ac.in/engineering/electrical/dr-h-m-suryawanshi/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#800000] text-white font-semibold rounded-2xl hover:bg-[#631012] shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {language == 'en' ? 'Full Profile' : 'पूरी प्रोफाइल'}
                </Link>
              </div>

              <div className="md:col-span-2">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {info?.message_heading || (language == 'en'
                      ? 'Message from the Director'
                      : 'निदेशक का संदेश')}
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-sm md:text-base">
                    {info?.message_paragraphs?.map((p: string, i: number) => (
                      <p key={i}>{p}</p>
                    )) || (
                      <p>Welcome to NIT Hamirpur.</p>
                    )}

                    <p className="pt-4 border-t border-gray-200">
                      <span className="block font-semibold mt-4 italic">
                        {info?.message_closing || "With warm wishes,"}
                      </span>
                      <span className="block font-bold mt-4 text-[#800000]">
                        {info?.current_name}
                      </span>
                      <span className="block mt-1">
                        {info?.message_signature_title || (language == 'en' ? 'Director' : 'निदेशक')}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {info?.message_signature_org || 'National Institute of Technology'}
                      </span>
                      <span className="block text-sm text-gray-500">
                        {info?.message_signature_location || 'Hamirpur (HP)'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
