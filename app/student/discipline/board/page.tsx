'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/students?page_name=discipline-board')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading discipline board:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black font-bold">
        {language === 'hi' ? 'लोड हो रहा है...' : 'Loading...'}
      </div>
    );
  }

  // Fallbacks in case seed/db fails
  const title = data
    ? (language === 'hi' ? data.title_hi || data.title_en : data.title_en)
    : (language === 'hi' ? 'छात्र अनुशासन बोर्ड' : 'Student Discipline Board');

  const description = data
    ? (language === 'hi' ? data.description_hi || data.description_en : data.description_en)
    : (language === 'hi'
      ? 'आचरण की स्पष्ट अपेक्षाओं और निष्पक्ष अनुशासनात्मक प्रक्रिया के माध्यम से एक अनुकूल परिसर वातावरण सुनिश्चित करना।'
      : 'Ensuring a congenial campus environment through clear expectations of conduct and a fair disciplinary process.');

  const overview = data?.content
    ? (language === 'hi' ? data.content.overview_hi || data.content.overview_en : data.content.overview_en)
    : (language === 'hi'
      ? 'ताकि प्रत्येक छात्र परिसर में एक अनुकूल वातावरण बनाने और बनाए रखने में आनंद ले सके और योगदान दे सके, छात्रों से अपेक्षा की जाती है कि वे अपनी जिम्मेदारियों के बारे में जागरूक रहें, सभी अवसरों पर व्यवस्थित तरीके से व्यवहार करें, अनुशासन बनाए रखें और समय-समय पर अधिसूचित निर्देशों का पालन करें।'
      : 'In order that every student enjoys and contributes in creating and maintaining a congenial environment on the campus, students are expected to be aware of their responsibilities, behave in an orderly manner on all occasions, maintain discipline and obey such instructions as are notified from time to time.');

  const composition = data?.content
    ? (language === 'hi' ? data.content.composition_hi || data.content.composition_en : data.content.composition_en)
    : [
        { designation: 'Dean (Student Welfare)', responsibility: 'Chairperson' },
        { designation: 'Associate Dean (Student Discipline & Counselling)', responsibility: 'Member' }
      ];

  const contactDean = data?.content?.contact_dean_email || 'dean.student@nith.ac.in';
  const contactDiscipline = data?.content?.contact_discipline_email || 'discipline@nith.ac.in';
  const rulesUrl = data?.content?.rules_url || '/student/discipline/rules';

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'hi' ? 'होम' : 'Home'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">{language === 'hi' ? 'छात्र' : 'Student'}</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">{title}</span>
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
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <article className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 prose prose-sm max-w-none text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 border-b pb-2">
              {language === 'hi' ? 'विवरण' : 'Overview'}
            </h2>
            <div className="whitespace-pre-line leading-relaxed mb-8">
              {overview}
            </div>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              {language === 'hi' ? 'समिति की संरचना' : 'Committee Composition'}
            </h3>
            <div className="overflow-x-auto border border-gray-100 rounded-lg">
              <table className="w-full text-sm border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-50 text-left border-b border-gray-150">
                    <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'पद / पदनाम' : 'Designation'}</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'दायित्व' : 'Responsibility'}</th>
                  </tr>
                </thead>
                <tbody>
                  {composition.map((member: any, idx: number) => (
                    <tr key={idx} className="border-b hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 align-top font-medium text-gray-900">
                        {member.designation}
                      </td>
                      <td className="px-4 py-3 align-top text-gray-600">
                        {member.responsibility}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-sm text-gray-500 italic">
              {language === 'hi'
                ? '* समिति को लागू संस्थान के नियमों के अनुसार जांच करने, सुनवाई करने और दंड लगाने का अधिकार सुरक्षित है।'
                : '* The committee reserves the right to investigate, hold hearings and impose penalties following applicable Institute regulations.'}
            </p>
          </article>

          <aside className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 h-fit space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help?'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'hi'
                  ? 'अनुशासनात्मक चिंताओं की रिपोर्ट करने या मार्गदर्शन प्राप्त करने के लिए संपर्क करें:'
                  : 'For reporting disciplinary concerns or seeking guidance contact:'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-semibold text-gray-900">{language === 'hi' ? 'डीन (छात्र कल्याण)' : 'Dean (Student Welfare)'}</div>
                <div className="text-gray-600 mt-1">
                  Email:{' '}
                  <a
                    href={`mailto:${contactDean}`}
                    className="text-[#800000] hover:underline"
                  >
                    {contactDean}
                  </a>
                </div>
              </div>

              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-semibold text-gray-900">{language === 'hi' ? 'संकाय प्रभारी (अनुशासन)' : 'Faculty Incharge (Discipline)'}</div>
                <div className="text-gray-600 mt-1">
                  Email:{' '}
                  <a
                    href={`mailto:${contactDiscipline}`}
                    className="text-[#800000] hover:underline"
                  >
                    {contactDiscipline}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={rulesUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg text-sm hover:bg-[#6a0000] transition-colors shadow-md shadow-[#800000]/10 w-full justify-center"
                >
                  {language === 'hi' ? 'अनुशासन नियम देखें' : 'View Discipline Rules'}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
