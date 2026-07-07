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
    fetch('http://localhost:5000/api/v1/students?page_name=student-council-board')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading council board:', err);
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

  // Fallbacks
  const title = data
    ? (language === 'hi' ? data.title_hi || data.title_en : data.title_en)
    : (language === 'hi' ? 'छात्र परिषद बोर्ड' : 'Student Council Board');

  const description = data
    ? (language === 'hi' ? data.description_hi || data.description_en : data.description_en)
    : (language === 'hi'
      ? 'छात्र परिषद बोर्ड छात्र गतिविधियों, प्रतिनिधि शासन और कल्याणकारी पहलों का प्रबंधन करता है।'
      : 'Student Council Board manages student activities, representative governance, and welfare initiatives.');

  const overview = data?.content
    ? (language === 'hi' ? data.content.overview_hi || data.content.overview_en : data.content.overview_en)
    : (language === 'hi'
      ? 'छात्र परिषद बोर्ड की स्थापना छात्रों के हितों का प्रतिनिधित्व करने, संस्थान के मामलों में सक्रिय छात्र भागीदारी को बढ़ावा देने और परिसर में पाठ्येतर समितियों, क्लबों और छात्र कल्याण पहलों का प्रबंधन करने के लिए की गई है। परिषद रचनात्मक और सहयोगी परिसर वातावरण को बढ़ावा देने के लिए छात्र समुदाय और प्रशासन के बीच एक सेतु के रूप में कार्य करती है।'
      : 'Student Council Board has been established to represent student interests, foster active student participation in institute affairs, and manage extracurricular societies, clubs, and student welfare initiatives on the campus. The Council serves as a bridge between the student community and the administration to promote a constructive and collaborative campus environment.');

  const composition = data?.content
    ? (language === 'hi' ? data.content.composition_hi || data.content.composition_en : data.content.composition_en)
    : [];

  const counsellors = data?.content
    ? (language === 'hi' ? data.content.counsellors_hi || data.content.counsellors_en : data.content.counsellors_en)
    : [];

  const contactDean = data?.content?.contact_dean_email || 'dean.student@nith.ac.in';
  const contactCounselling = data?.content?.contact_counselling_email || 'counselling@nith.ac.in';
  const disciplineBoardUrl = data?.content?.discipline_board_url || '/student/discipline/board';

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
              {language === 'hi' ? 'अवलोकन' : 'Overview'}
            </h2>
            <p className="leading-relaxed mb-8">{overview}</p>

            <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
              {language === 'hi'
                ? 'समिति संरचना (छात्र परिषद)'
                : 'Committee Composition (Student Council)'}
            </h3>
            <div className="overflow-x-auto border border-gray-100 rounded-lg mb-8">
              <table className="w-full text-sm border-collapse table-auto">
                <thead>
                  <tr className="bg-gray-50 text-left border-b border-gray-150">
                    <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'क्र.सं.' : 'Sl. No.'}</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'पद / पदनाम' : 'Designation'}</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'दायित्व' : 'Responsibility'}</th>
                  </tr>
                </thead>
                <tbody>
                  {composition.map((member: any, idx: number) => (
                    <tr key={idx} className="border-b hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3 align-top font-medium text-gray-500">{member.sl_no || idx + 1}</td>
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

            {counsellors && counsellors.length > 0 && (
              <>
                <h3 className="mt-8 text-xl font-semibold text-gray-900 mb-4 border-b pb-2">
                  {language === 'hi' ? 'विभागीय परामर्शदाता' : 'Departmental Counsellors'}
                </h3>
                <div className="overflow-x-auto border border-gray-100 rounded-lg">
                  <table className="w-full text-sm border-collapse table-auto">
                    <thead>
                      <tr className="bg-gray-50 text-left border-b border-gray-150">
                        <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'क्र.सं.' : 'Sl. No.'}</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'विभाग का नाम' : 'Name of Department'}</th>
                        <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'विभागीय परामर्शदाता' : 'Departmental Counsellor'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {counsellors.map((item: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 align-top font-medium text-gray-500">{item.sl_no || idx + 1}</td>
                          <td className="px-4 py-3 align-top font-medium text-gray-900">
                            {item.department}
                          </td>
                          <td className="px-4 py-3 align-top text-gray-600 whitespace-pre-line leading-relaxed">
                            {item.counsellors}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </article>

          <aside className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 h-fit space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help?'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'hi'
                  ? 'छात्र गतिविधियों या परिषद अनुरोधों के लिए संपर्क करें:'
                  : 'For student activities or council requests contact:'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-semibold text-gray-900">
                  {language === 'hi' ? 'डीन (छात्र कल्याण)' : 'Dean (Student Welfare)'}
                </div>
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
                <div className="font-semibold text-gray-900">
                  {language === 'hi' ? 'छात्र गतिविधियों और छात्रवृत्ति कार्यालय' : 'Student Activities & Scholarships Office'}
                </div>
                <div className="text-gray-600 mt-1">
                  Email:{' '}
                  <a
                    href={`mailto:${contactCounselling}`}
                    className="text-[#800000] hover:underline"
                  >
                    {contactCounselling}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={disciplineBoardUrl}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg text-sm hover:bg-[#6a0000] transition-colors shadow-md shadow-[#800000]/10 w-full justify-center"
                >
                  {language === 'hi' ? 'अनुशासन बोर्ड देखें' : 'View Discipline Board'}
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
