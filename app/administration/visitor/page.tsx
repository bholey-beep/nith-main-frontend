'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ArrowRight, ExternalLink } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function VisitorPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, listRes] = await Promise.all([
          fetch('http://localhost:5000/api/v1/administration/visitors-info'),
          fetch('http://localhost:5000/api/v1/administration/visitors')
        ]);
        const infoData = await infoRes.json();
        const listData = await listRes.json();
        
        if (infoData.success) setInfo(infoData.data);
        if (listData.success) setVisitors(listData.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header31 />

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto text-left">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 font-medium">
            <Link href="/" className="hover:text-[#800000] transition-colors duration-200">
              {language === 'en' ? 'Home' : 'होम'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">{language === 'en' ? 'Administration' : 'प्रशासन'}</span>
            <span className="text-gray-400">/</span>
            <span className="text-[#800000] font-semibold">{language === 'en' ? 'Visitor' : 'आगंतुक'}</span>
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 uppercase">
            {info?.hero_heading || (language === 'en' ? 'Visitor' : 'आगंतुक')}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {info?.hero_subheading || (language === 'en' ? 'Official Visitor of the Institute' : 'संस्थान के आधिकारिक आगंतुक')}
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12 text-left">
          {visitors.map((v, idx) => (
            <motion.div
              key={v.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-gray-100 border border-gray-100 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="w-full md:w-1/3">
                <div className="aspect-[3/4] bg-gray-50 rounded-3xl overflow-hidden relative shadow-inner group">
                  <Image
                    src={v.image || "/presidentimage.jpg"}
                    alt={v.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/20 to-transparent"></div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3 space-y-8">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-[#800000]/5 text-[#800000] text-sm font-bold rounded-full mb-4 uppercase tracking-widest">
                    {v.title || 'Official Visitor'}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
                    {v.name}
                  </h2>
                  <div className="h-1.5 w-24 bg-[#800000] rounded-full mb-8"></div>
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
                    "{v.description}"
                  </p>
                </div>

                {v.website_url && (
                  <Link
                    href={v.website_url}
                    target="_blank"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-[#800000] transition-all duration-300 shadow-xl hover:shadow-[#800000]/20 group"
                  >
                    {v.website_label || 'Official Portal'}
                    <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
