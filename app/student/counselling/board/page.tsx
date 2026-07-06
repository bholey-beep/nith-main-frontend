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
    fetch('http://localhost:5000/api/v1/students?page_name=student-counselling-board')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading counselling board:', err);
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
    : (language === 'hi' ? 'छात्र परामर्श बोर्ड' : 'Student Counselling Board');

  const description = data
    ? (language === 'hi' ? data.description_hi || data.description_en : data.description_en)
    : (language === 'hi'
      ? 'छात्र परामर्श सुविधा छात्रों को एक संरचित तीन-स्तरीय परामर्श बोर्ड के माध्यम से शैक्षणिक, व्यक्तिगत और मनोवैज्ञानिक चिंताओं में मदद करती है।'
      : 'Student Counseling Facility helps students with academic, personal and psychological concerns through a structured three-tier counseling board.');

  const overview = data?.content
    ? (language === 'hi' ? data.content.overview_hi || data.content.overview_en : data.content.overview_en)
    : (language === 'hi'
      ? 'परिसर में रहने के दौरान छात्रों को शैक्षणिक उत्कृष्टता प्राप्त करने और एक एकीकृत व्यक्तित्व विकसित करने में मदद करने के लिए उनके शैक्षणिक, व्यक्तिगत, मनोवैज्ञानिक आदि से संबंधित विशिष्ट समस्याओं को हल करने में मदद करने के लिए छात्र परामर्श सुविधा स्थापित की गई है।'
      : 'Student Counseling Facility has been established to help the students in solving their specific problems related to academics, personal, psychological etc., so that they are able to achieve academic excellence and develop an integrated personality during their stay on the campus.');

  const composition = data?.content
    ? (language === 'hi' ? data.content.composition_hi || data.content.composition_en : data.content.composition_en)
    : [];

  const counsellors = data?.content
    ? (language === 'hi' ? data.content.counsellors_hi || data.content.counsellors_en : data.content.counsellors_en)
    : [];

  const contactDiscipline = data?.content?.contact_discipline_email || 'associate.dean@nith.ac.in';
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
                ? 'समिति संरचना (आंतरिक परामर्श समिति)'
                : 'Committee Composition (Internal Counseling Committee)'}
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

            <p className="mt-6 text-sm text-gray-500 italic">
              {language === 'hi'
                ? '* विभागीय परामर्शदाता निर्धारित परामर्श के साथ-साथ उपलब्धता के आधार पर वॉक-इन परामर्श के लिए भी उपलब्ध हैं।'
                : '* Departmental counsellors are available for scheduled counseling as well as on a walk-in basis depending on availability.'}
            </p>
          </article>

          <aside className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 h-fit space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {language === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Help?'}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'hi'
                  ? 'परामर्श अनुरोधों या तत्काल सहायता के लिए संपर्क करें:'
                  : 'For counseling requests or urgent support contact:'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-semibold text-gray-900">
                  {language === 'hi' ? 'एसोसिएट डीन (छात्र अनुशासन और परामर्श)' : 'Associate Dean (Student Discipline & Counselling)'}
                </div>
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

              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-semibold text-gray-900">
                  {language === 'hi' ? 'संकाय प्रभारी (परामर्श)' : 'Faculty Incharge (Counselling)'}
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
