'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function ChairpersonPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/administration/chairperson')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data.length > 0) {
          setData(json.data[0]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching chairperson:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data found.</div>;

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
              {language == 'en' ? 'Chairperson' : 'अध्यक्ष'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            {language == 'en' ? 'Chairperson' : 'अध्यक्ष'}
          </h1>

          <p className="text-white/80 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {language == 'en'
              ? 'Office bearers and leadership of the Institute'
              : 'संस्थान के कार्यालय धारक और नेतृत्व'}
          </p>
        </motion.div>
      </section>

      <section className="relative py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                  {data.name}
                </h2>

                <p className="text-gray-700 mb-4">
                  {data.title}
                </p>

                <ul className="text-gray-600 space-y-2">
                  <li>
                    {language == 'en'
                      ? 'Editor-in-Chief of Dainik Jagran – New Delhi'
                      : 'दैनिक जागरण के संपादक – नई दिल्ली'}
                  </li>
                  <li>
                    {language == 'en'
                      ? 'Chairman, IIM Amritsar – Punjab'
                      : 'अध्यक्ष, आईआईएम अमृतसर – पंजाब'}
                  </li>
                  <li>
                    {language == 'en'
                      ? 'Chairman, NIT Hamirpur – Himachal Pradesh'
                      : 'अध्यक्ष, एनआईटी हमीरपुर – हिमाचल प्रदेश'}
                  </li>
                </ul>

                <div className="mt-6 border-t pt-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {language == 'en'
                      ? "Chairman's Message"
                      : 'अध्यक्ष का संदेश'}
                  </h3>

                  <p className="text-gray-700 mb-3 whitespace-pre-wrap">
                    {data.description}
                  </p>
                </div>
              </div>

              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 bg-gray-100 rounded-2xl overflow-hidden mx-auto">
                  <Image
                    src={data.image || "/images/chairperson.jpg"}
                    alt={data.name}
                    width={224}
                    height={224}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
