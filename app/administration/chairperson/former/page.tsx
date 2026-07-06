'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function ChairpersonGrid({ title, list }: { title: string; list: any[] }) {
  if (list.length === 0) return null;
  return (
    <div className="mb-16 text-left">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-[#800000] w-fit pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {list.map((item, idx) => (
          <motion.article
            key={item.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="w-full h-56 bg-gray-100 overflow-hidden relative">
              <Image
                src={item.image || "/images/former/default.jpg"}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#800000] transition-colors">
                {item.name}
              </h4>
              <p className="text-[#800000] font-bold mt-2 text-sm uppercase tracking-wider">{item.years}</p>
              {item.note && (
                <p className="text-sm text-gray-500 mt-3 italic border-t pt-3">
                  {item.note}
                </p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function FormerChairpersonsPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/former-chairpersons')
      .then(res => res.json())
      .then(json => {
        if (json.success) setList(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

  const nitList = list.filter(c => c.category === 'NIT' || !c.category);
  const recList = list.filter(c => c.category === 'REC');

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Header31 />

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-400">Administration</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              Former Chairpersons
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
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 uppercase">
            Former Chairpersons
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Legacy of leadership at NIT Hamirpur and REC Hamirpur.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ChairpersonGrid title="NIT Hamirpur Chairpersons" list={nitList} />
          <ChairpersonGrid title="REC Hamirpur Chairpersons" list={recList} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
