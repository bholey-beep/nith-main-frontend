'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function FunctionariesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    // Fetch Hero
    fetch('http://localhost:5000/api/v1/academics/overview?page_name=functionaries')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.length > 0) {
          setHeroData(json.data[0]);
        }
      });

    // Fetch Members
    fetch('http://localhost:5000/api/v1/academics/tables')
      .then(res => res.json())
      .then(json => {
        if (json.success) setMembers(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Group members by table_name
  const sections = members.reduce((acc: any[], curr: any) => {
    const section = acc.find(s => s.title === curr.table_name);
    if (section) {
      section.members.push(curr);
    } else {
      acc.push({ title: curr.table_name, members: [curr] });
    }
    return acc;
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black">Loading...</div>;

  const title = language === 'en' ? heroData?.title_en : heroData?.title_hi;
  const description = language === 'en' ? heroData?.description_en : heroData?.description_hi;

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 font-medium">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'en' ? 'Home' : 'होम'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">
              {language === 'en' ? 'Academics' : 'शिक्षा'}
            </span>
            <span className="text-gray-400">/</span>
            <span className="text-[#800000]">
              {language === 'en' ? 'Functionaries' : 'पदाधिकारी'}
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
            {title || (language === 'en' ? 'Functionaries' : 'पदाधिकारी')}
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {description || (language === 'en'
              ? 'Key academic administrative authorities and supporting staff of the Institute.'
              : 'संस्थान के प्रमुख शैक्षणिक प्रशासनिक अधिकारी और सहायक कर्मचारी।')}
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          {sections.map((section: any, idx: number) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-1.5 bg-[#800000] rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gray-200/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/50 border-b border-gray-100">
                        <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider w-20">
                          {language === 'en' ? 'Sl.' : 'क्र.'}
                        </th>
                        <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                          {language === 'en' ? 'Name' : 'नाम'}
                        </th>
                        <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                          {language === 'en' ? 'Responsibility' : 'उत्तरदायित्व'}
                        </th>
                        <th className="px-8 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                          {language === 'en' ? 'Contact' : 'संपर्क'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {section.members.map((member: any, mIdx: number) => (
                        <tr
                          key={mIdx}
                          className="hover:bg-gray-50/30 transition-colors duration-200 group/row"
                        >
                          <td className="px-8 py-6 text-gray-500 font-medium">
                            {mIdx + 1}
                          </td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-gray-900 group-hover/row:text-[#800000] transition-colors">
                              {member.name}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-gray-600 font-medium">
                            {member.responsibility}
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex flex-col space-y-1">
                              {member.phone && (
                                <span className="text-sm text-gray-500 flex items-center gap-2">
                                  <span className="h-1 w-1 rounded-full bg-[#800000]"></span>
                                  {member.phone}
                                </span>
                              )}
                              {member.email && (
                                <a
                                  href={`mailto:${member.email}`}
                                  className="text-sm text-[#800000] hover:underline font-medium inline-flex items-center gap-2"
                                >
                                  <span className="h-1 w-1 rounded-full bg-[#800000]"></span>
                                  {member.email}
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
