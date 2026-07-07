'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/academics/overview?page_name=activities')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.length > 0) {
          setData(json.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-black font-bold">Loading...</div>;

  const content = data?.content || {};
  const title = language === 'en' ? data?.title_en : data?.title_hi;
  const description = language === 'en' ? data?.description_en : data?.description_hi;
  const responsibilities = language === 'en' ? content.responsibilities_en : content.responsibilities_hi;
  const governanceSteps = language === 'en' ? content.governanceSteps_en : content.governanceSteps_hi;

  return (
    <div className="min-h-screen bg-white text-black">
      <Header31 />

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
              {language == 'en' ? 'Academics' : 'शिक्षा'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {language == 'en' ? 'Activities' : 'गतिविधियां'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 text-center py-20 px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
              {title || (language == 'en' ? 'ACTIVITIES' : 'गतिविधियां')}
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              {description || (language == 'en'
                ? 'Duties and responsibilities of the Dean (Academic)'
                : 'डीन (शैक्षणिक) के कर्तव्य और जिम्मेदारियां')}
            </p>
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-12 pb-24">
        {/* Responsibilities Section */}
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {language == 'en' ? 'Responsibilities & Activities' : 'कर्तव्य और जिम्मेदारियां'}
              </h2>
              <div className="h-1.5 w-32 bg-gradient-to-r from-[#800000] to-[#631012] rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(responsibilities || []).map((item: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex gap-4 p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#800000]/10 flex items-center justify-center text-[#800000] font-bold group-hover:bg-[#800000] group-hover:text-white transition-colors">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#800000] transition-colors">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Governance Flow */}
        {governanceSteps && governanceSteps.length > 0 && (
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-8 text-center">
                {language == 'en' ? 'Academic Governance Flow' : 'अकादमिक शासन प्रवाह'}
              </h2>
              
              <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative">
                {governanceSteps.map((step: any, idx: number) => (
                  <React.Fragment key={idx}>
                    <div className="flex-1 text-center group">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:bg-[#800000] group-hover:border-[#800000] transition-all duration-300 shadow-lg">
                        <span className="text-2xl font-black">{step.number}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">{step.title}</h4>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                    {idx < governanceSteps.length - 1 && (
                      <div className="hidden md:flex items-center justify-center pt-8">
                        <motion.div 
                          animate={{ x: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-white/30 text-2xl"
                        >
                          →
                        </motion.div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
