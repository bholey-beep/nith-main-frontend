'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { Users, Phone, Mail, Home, ChevronRight } from 'lucide-react';

interface Row {
  id: number;
  sl_no: string;
  name_en: string;
  name_hn: string;
  responsibility_en: string;
  responsibility_hn: string;
  phone: string;
  email: string;
  section_title_en: string;
  section_title_hn: string;
}

interface Section {
  title_en: string;
  title_hn: string;
  members: Row[];
}

const INITIAL_DATA: Section[] = [
  {
    title_en: 'Dean and Associate Dean (Alumni & Resources)',
    title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)',
    members: [
        { id: -1, sl_no: '1', name_en: 'Prof. Ashwani Kumar Chandel', name_hn: 'प्रो. अश्विनी कुमार चंदेल', responsibility_en: 'Dean', responsibility_hn: 'डीन', phone: '254054', email: 'dar@nith.ac.in', section_title_en: 'Dean and Associate Dean (Alumni & Resources)', section_title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)' },
        { id: -2, sl_no: '2', name_en: 'Dr. Gargi Sharma', name_hn: 'डॉ. गार्गी शर्मा', responsibility_en: 'Associate Dean', responsibility_hn: 'एसोसिएट डीन', phone: '254536', email: 'gargi@nith.ac.in', section_title_en: 'Dean and Associate Dean (Alumni & Resources)', section_title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)' },
        { id: -3, sl_no: '3', name_en: 'Dr. Somesh Kumar Sharma', name_hn: 'डॉ. सोमेश कुमार शर्मा', responsibility_en: 'Associate Dean (Resource Generation & Industrialization)', responsibility_hn: 'एसोसिएट डीन (संसाधन सृजन और औद्योगिकीकरण)', phone: '254732', email: 'somesh@nith.ac.in', section_title_en: 'Dean and Associate Dean (Alumni & Resources)', section_title_hn: 'डीन और एसोसिएट डीन (पूर्व छात्र और संसाधन)' },
    ]
  },
  {
    title_en: 'Alumni Association',
    title_hn: 'पूर्व छात्र संघ',
    members: [
        { id: -4, sl_no: '1', name_en: 'Dr. Jyoti Srivastava', name_hn: 'डॉ. ज्योति श्रीवास्तव', responsibility_en: 'Faculty Incharge', responsibility_hn: 'संकाय प्रभारी', phone: '254401', email: 'jyoti.s@nith.ac.in', section_title_en: 'Alumni Association', section_title_hn: 'पूर्व छात्र संघ' },
        { id: -5, sl_no: '2', name_en: 'Dr. Vandana Sharma', name_hn: 'डॉ. वंदना शर्मा', responsibility_en: 'Faculty Incharge', responsibility_hn: 'संकाय प्रभारी', phone: '254920', email: 'vandna@nith.ac.in', section_title_en: 'Alumni Association', section_title_hn: 'पूर्व छात्र संघ' },
    ]
  },
  {
    title_en: 'Resource Generation',
    title_hn: 'संसाधन सृजन',
    members: [
        { id: -6, sl_no: '1', name_en: 'Dr. Amit Kaul', name_hn: 'डॉ. अमित कौल', responsibility_en: 'Faculty Incharge', responsibility_hn: 'संकाय प्रभारी', phone: '254544', email: 'amitkaul@nith.ac.in', section_title_en: 'Resource Generation', section_title_hn: 'संसाधन सृजन' },
    ]
  },
  {
    title_en: 'Staff',
    title_hn: 'कर्मचारी',
    members: [
        { id: -7, sl_no: '1', name_en: 'Sh. Sanjay Jamwal', name_hn: 'श्री संजय जमवाल', responsibility_en: 'Deputy Registrar', responsibility_hn: 'उप कुलसचिव', phone: '--', email: '--', section_title_en: 'Staff', section_title_hn: 'कर्मचारी' },
    ]
  }
];

export default function AlumniFunctionaries() {
  const language = useSelector((state: RootState) => state.language.value);
  const [sections, setSections] = useState<Section[]>(INITIAL_DATA);
  const [heading, setHeading] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const hRes = await fetch('http://localhost:4000/api/alumni-functionaries');
        const hData = await hRes.json();
        setHeading(hData);

        const lRes = await fetch('http://localhost:4000/api/alumni-functionaries/list');
        const lData = await lRes.json();
        
        if (Array.isArray(lData) && lData.length > 0) {
            const sectionsMap: { [key: string]: Section } = {};
            lData.forEach((row: any) => {
              const key = row.section_title_en;
              if (!sectionsMap[key]) {
                sectionsMap[key] = {
                  title_en: row.section_title_en,
                  title_hn: row.section_title_hn,
                  members: []
                };
              }
              sectionsMap[key].members.push(row);
            });
            setSections(Object.values(sectionsMap));
        }
      } catch (err) {
        console.error('Error fetching functionaries:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Breadcrumb */}
        <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 py-4 px-6 md:px-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#631012] transition-colors">{language === 'en' ? 'Home' : 'होम'}</Link>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-400">{language === 'en' ? 'Alumni' : 'पूर्व छात्र'}</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#631012] font-bold tracking-wide uppercase text-xs">{language === 'en' ? 'Functionaries' : 'पदाधिकारी'}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg tracking-tight">
              {heading && heading.title_en ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'Alumni Functionaries' : 'पूर्व छात्र पदाधिकारी')}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
              {heading && heading.sub_title_en ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Dean, Associate Dean, Alumni Association, Resource Generation, Staff' : 'डीन, एसोसिएट डीन, पूर्व छात्र संघ, संसाधन सृजन, कर्मचारी')}
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
            {loading ? (
                <div className="p-20 text-center text-gray-400 bg-white rounded-3xl shadow-xl">
                    <div className="animate-spin w-10 h-10 border-4 border-[#631012] border-t-transparent rounded-full mx-auto mb-4"></div>
                    Loading Functionaries...
                </div>
            ) : (
                <div className="space-y-12">
                    {sections.map((section, sIdx) => (
                        <motion.div 
                            key={sIdx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
                        >
                            <div className="bg-gradient-to-r from-[#631012] to-[#7a1214] px-8 py-6">
                                <h2 className="text-2xl font-bold text-white tracking-wide">
                                    {language === 'en' ? section.title_en : section.title_hn}
                                </h2>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-8 py-5 text-left text-xs font-bold text-[#631012] uppercase tracking-widest w-20">Sl. No.</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-[#631012] uppercase tracking-widest">{language === 'en' ? 'Name' : 'नाम'}</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-[#631012] uppercase tracking-widest">{language === 'en' ? 'Responsibility' : 'जिम्मेदारी'}</th>
                                            <th className="px-8 py-5 text-left text-xs font-bold text-[#631012] uppercase tracking-widest">{language === 'en' ? 'Contact Details' : 'संपर्क विवरण'}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {section.members.map((member, mIdx) => (
                                            <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6 text-sm font-bold text-gray-400">{member.sl_no}</td>
                                                <td className="px-8 py-6">
                                                    <div className="text-lg font-bold text-gray-900 leading-tight">
                                                        {language === 'en' ? member.name_en : member.name_hn}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#631012]/5 text-[#631012] text-sm font-semibold">
                                                        {language === 'en' ? member.responsibility_en : member.responsibility_hn}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col gap-2">
                                                        {member.phone && member.phone !== '--' && (
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#631012] transition-colors">
                                                                <Phone size={14} className="text-gray-400" />
                                                                <span>{member.phone}</span>
                                                            </div>
                                                        )}
                                                        {member.email && member.email !== '--' && (
                                                            <div className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#631012] transition-colors">
                                                                <Mail size={14} className="text-gray-400" />
                                                                <a href={`mailto:${member.email}`} className="font-medium underline decoration-gray-200 underline-offset-4">{member.email}</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
      </div>
      <Footer />
    </>
  );
}
