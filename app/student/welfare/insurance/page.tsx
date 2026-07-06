'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { ShieldCheck, Download } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function InsurancePage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/students?page_name=insurance')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading insurance data:', err);
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
    : (language === 'hi' ? 'बीमा और मेडिक्लेम' : 'Insurance & Mediclaims');

  const description = data
    ? (language === 'hi' ? data.description_hi || data.description_en : data.description_en)
    : (language === 'hi'
      ? 'संस्थान हर साल अपने सभी छात्रों को छात्र सुरक्षा योजना के तहत व्यक्तिगत दुर्घटना बीमा [समूह (अनाम)] नीति के माध्यम से बीमा कवर प्रदान करता है।'
      : 'The Institute provides insurance cover through Personal Accident Insurance [Group (Unnamed)] Policy under student safety scheme to all of its students every year.');

  const particulars = data?.content
    ? (language === 'hi' ? data.content.particulars_hi || data.content.particulars_en : data.content.particulars_en)
    : [];

  const steps = data?.content
    ? (language === 'hi' ? data.content.steps_hi || data.content.steps_en : data.content.steps_en)
    : [];

  const policyDocUrl = data?.content?.policy_doc_url || '/pdfs/insurance-policy.pdf';
  const contactName = data?.content?.contact_name || 'Student Welfare Office';
  const contactEmail = data?.content?.contact_email || 'studentwelfare@nith.ac.in';
  const contactPhone = data?.content?.contact_phone || '254000';

  return (
    <div className="min-h-screen bg-white text-left">
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
            <span className="text-gray-400">{language === 'hi' ? 'कल्याण' : 'Welfare'}</span>
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
          className="relative z-10 text-center py-20 md:py-28 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-md md:text-lg leading-relaxed font-light">
            {description}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === 'hi' ? 'विवरण' : 'Overview'}
              </h2>
              <p className="text-gray-600 mb-6">
                {language === 'hi'
                  ? 'प्रति छात्र इस नीति कवरेज की मुख्य विशेषताएं इस प्रकार हैं:'
                  : 'The salient features of this Policy coverage per Student are as Under:'}
              </p>

              <div className="overflow-x-auto border border-gray-100 rounded-lg">
                <table className="w-full text-sm border-collapse table-auto">
                  <thead>
                    <tr className="bg-gray-50 text-left border-b border-gray-150">
                      <th className="px-4 py-3 font-semibold text-gray-700 w-16">{language === 'hi' ? 'क्र.सं.' : 'Sl. No.'}</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">{language === 'hi' ? 'विवरण' : 'Particulars'}</th>
                      <th className="px-4 py-3 font-semibold text-gray-700 w-48">{language === 'hi' ? 'कवरेज राशि' : 'Coverage Amount'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {particulars.map((item: any, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-3 align-top font-medium text-gray-500">{item.sl_no || idx + 1}</td>
                        <td className="px-4 py-3 align-top font-medium text-gray-900 leading-relaxed">
                          {item.particulars}
                        </td>
                        <td className="px-4 py-3 align-top font-bold text-[#800000]">{item.coverage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-gray-600 leading-relaxed space-y-3">
                <p>
                  {language === 'hi'
                    ? 'उपरोक्त नीति के तहत दावे का निपटारा केवल संस्थान के माध्यम से किया जाएगा। इसलिए, सभी आवश्यक औपचारिकताएं केवल संस्थान के माध्यम से की जानी हैं। संस्थान छात्र की ओर से बीमा कंपनी के साथ दावा दर्ज करेगा। दावे का भुगतान भी केवल संस्थान के माध्यम से किया जाएगा।'
                    : 'Claim under above Policy shall be entertained through Institute only. Hence, all necessary formalities are to be done through Institute only. Institute shall lodge claim on behalf of the student with the Insurance Company. Payment of claim shall also be made through Institute only.'}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <a
                  href={policyDocUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg text-sm hover:bg-[#6a0000] transition-colors shadow-md shadow-[#800000]/10"
                >
                  <Download className="w-4 h-4" /> {language === 'hi' ? 'नीति दस्तावेज़' : 'Policy Document'}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {language === 'hi' ? 'दावा कैसे दर्ज करें' : 'How to File a Claim'}
              </h3>
              <ol className="list-decimal list-inside text-gray-600 text-sm space-y-3 leading-relaxed">
                {steps.map((step: string, index: number) => (
                  <li key={index} className="pl-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <aside className="bg-white rounded-2xl shadow-md p-6 h-fit border border-gray-100 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{language === 'hi' ? 'सहायता की आवश्यकता है?' : 'Need Assistance?'}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {language === 'hi'
                  ? 'दावा समर्थन और स्पष्टीकरण के लिए छात्र कल्याण कार्यालय से संपर्क करें।'
                  : 'For claim support and clarifications contact the Student Welfare Office.'}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="border-l-2 border-[#800000] pl-3 py-1">
                <div className="font-bold text-gray-900">{contactName}</div>
                <div className="text-gray-600 mt-2">
                  Email:{' '}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-[#800000] hover:underline font-semibold"
                  >
                    {contactEmail}
                  </a>
                </div>
                <div className="text-gray-600 mt-1">{language === 'hi' ? 'फ़ोन' : 'Phone'}: {contactPhone}</div>
              </div>

              <div className="pt-2">
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#800000] text-white font-bold rounded-lg text-sm hover:bg-[#6a0000] transition-colors shadow-md shadow-[#800000]/10 w-full justify-center"
                >
                  {language === 'hi' ? 'कार्यालय को ईमेल करें' : 'Email Office'}
                </a>
              </div>
            </div>

            <div className="mt-6 border-t pt-4 text-xs text-gray-400">
              <div>{language === 'hi' ? 'अंतिम अपडेट: जनवरी 2026' : 'Last updated: Jan 2026'}</div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
