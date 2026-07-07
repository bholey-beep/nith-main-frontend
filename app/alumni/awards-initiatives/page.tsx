'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';

type AwardFrequency = string;

interface AwardInitiative {
  id: number;
  name_en: string;
  name_hn: string;
  initiated_by_en: string;
  initiated_by_hn: string;
  year_introduced: number;
  frequency_en: string;
  frequency_hn: string;
  description_en: string;
  description_hn: string;
}

interface AwardCategory {
  id: number;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  icon: string;
}

interface EligibilityCriteria {
  id: number;
  step: string;
  title_en: string;
  title_hn: string;
  points_en: string;
  points_hn: string;
}

interface Benefit {
  id: number;
  icon: string;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
}

const FALLBACK_HEADING = {
  title_en: 'Awards Initiatives',
  title_hn: 'पुरस्कार पहल',
  sub_title_en: 'Recognizing excellence, celebrating achievements, and honoring the outstanding contributions of our distinguished alumni community.',
  sub_title_hn: 'उत्कृष्टता को मान्यता देना, उपलब्धियों का जश्न मनाना और हमारे प्रतिष्ठित पूर्व छात्र समुदाय के उत्कृष्ट योगदान का सम्मान करना।',
  about_title_en: 'About Alumni Awards',
  about_title_hn: 'पूर्व छात्र पुरस्कारों के बारे में',
  about_desc_en: 'The Alumni Awards Initiatives at NIT Hamirpur represent our commitment to recognizing and celebrating the exceptional achievements of our alumni who have made significant contributions to society, their professions, and our alma mater.\n\nThese awards serve multiple purposes: they honor individual excellence, inspire current students and fellow alumni, strengthen our alumni community bonds, and showcase the caliber of talent that NITH produces. Through these initiatives, we acknowledge not just professional success, but also dedication to social service, innovation, research excellence, and lifelong commitment to the institute\'s values.\n\nOur alumni community plays a vital role in instituting and supporting these awards, ensuring that the recognition remains meaningful and continues to evolve with changing times while maintaining the highest standards of excellence.',
  about_desc_hn: 'एनआईटी हमीरपुर में पूर्व छात्र पुरस्कार पहल हमारे उन पूर्व छात्रों की असाधारण उपलब्धियों को पहचानने और मनाने की हमारी प्रतिबद्धता का प्रतिनिधित्व करती है जिन्होंने समाज, अपने व्यवसायों और हमारे मातृ संस्थान में महत्वपूर्ण योगदान दिया है।\n\nये पुरस्कार कई उद्देश्यों की पूर्ति करते हैं: वे व्यक्तिगत उत्कृष्टता का सम्मान करते हैं, वर्तमान छात्रों और साथी पूर्व छात्रों को प्रेरित करते हैं, हमारे पूर्व छात्र समुदाय के बंधनों को मजबूत करते हैं, और एनआईटीएच द्वारा उत्पादित प्रतिभा की क्षमता को प्रदर्शित करते हैं। इन पहलों के माध्यम से, हम न केवल व्यावसायिक सफलता को स्वीकार करते हैं, बल्कि सामाजिक सेवा, नवाचार, अनुसंधान उत्कृष्टता और संस्थान के मूल्यों के प्रति आजीवन प्रतिबद्धता को भी स्वीकार करते हैं।\n\nहमारा पूर्व छात्र समुदाय इन पुरस्कारों को स्थापित करने और समर्थन देने में महत्वपूर्ण भूमिका निभाता है, यह सुनिश्चित करता है कि मान्यता सार्थक बनी रहे और उत्कृष्टता के उच्चतम मानकों को बनाए रखते हुए बदलते समय के साथ विकसित होती रहे।',
  join_title_en: 'Join Us in Celebrating Excellence',
  join_title_hn: 'उत्कृष्टता का जश्न मनाने में हमारे साथ जुड़ें',
  join_desc_en: 'Help us recognize and honor outstanding alumni. Nominate deserving candidates or propose new award initiatives to strengthen our community.',
  join_desc_hn: 'उत्कृष्ट पूर्व छात्रों को पहचानने और उनका सम्मान करने में हमारी मदद करें। हमारे समुदाय को मजबूत करने के लिए योग्य उम्मीदवारों को नामांकित करें या नई पुरस्कार पहलों का प्रस्ताव दें।',
  join_btn1_en: 'Nominate an Alumni',
  join_btn1_hn: 'एक पूर्व छात्र को नामांकित करें',
  join_btn2_en: 'Propose an Award Initiative',
  join_btn2_hn: 'पुरस्कार पहल का प्रस्ताव दें',
  inquiries_text_en: 'For inquiries about award nominations or initiatives, contact alumni@nith.ac.in',
  inquiries_text_hn: 'पुरस्कार नामांकन या पहलों के बारे में पूछताछ के लिए, alumni@nith.ac.in पर संपर्क करें'
};

export default function AwardsInitiatives() {
  const language = useSelector((state: any) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<any>(FALLBACK_HEADING);
  const [categories, setCategories] = useState<AwardCategory[]>([]);
  const [initiatives, setInitiatives] = useState<AwardInitiative[]>([]);
  const [eligibility, setEligibility] = useState<EligibilityCriteria[]>([]);
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/api/alumni-awards`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.heading) setHeading(data.heading);
          if (Array.isArray(data.categories)) setCategories(data.categories);
          if (Array.isArray(data.initiatives)) setInitiatives(data.initiatives);
          if (Array.isArray(data.eligibility)) setEligibility(data.eligibility);
          if (Array.isArray(data.benefits)) setBenefits(data.benefits);
        }
      } catch (err) {
        console.error('Error fetching dynamic awards initiatives data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFrequencyBadge = (freq: string) => {
    const lowerFreq = freq.toLowerCase();
    if (lowerFreq.includes('ann') || lowerFreq.includes('वार्षि')) {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-purple-50 text-purple-700 border-purple-200';
  };

  const getAboutParagraphs = (): string[] => {
    const text: string = isHindi ? heading.about_desc_hn : heading.about_desc_en;
    if (!text) return [];
    return text.split('\n\n').filter(Boolean);
  };

  if (loading) {
    return (
      <>
        <Header31 />
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#631012]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link
                href="/"
                className="hover:text-[#800000] transition-colors duration-200"
              >
                {isHindi ? 'मुख्य पृष्ठ' : 'Home'}
              </Link>
              <span>›</span>
              <span className="text-gray-400">{isHindi ? 'पूर्व छात्र' : 'Alumni'}</span>
              <span>›</span>
              <span className="text-[#800000] font-medium">
                {isHindi ? 'पुरस्कार पहल' : 'Awards Initiatives'}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {isHindi ? heading.title_hn : heading.title_en}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                {isHindi ? heading.sub_title_hn : heading.sub_title_en}
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-12"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#631012] to-[#7a1a1d] flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {isHindi ? heading.about_title_hn : heading.about_title_en}
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    {getAboutParagraphs().map((para, index) => (
                      <p key={index}>{para}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Categories of Awards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {isHindi ? 'पुरस्कारों की श्रेणियां' : 'Categories of Awards'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {isHindi
                    ? 'हम विविध उपलब्धियों और योगदानों का सम्मान करने के लिए कई आयामों में उत्कृष्टता को पहचानते हैं'
                    : 'We recognize excellence across multiple dimensions to honor diverse achievements and contributions'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#631012] text-white flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={category.icon}
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {isHindi ? category.title_hn : category.title_en}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isHindi ? category.description_hn : category.description_en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Awards Initiatives & Schemes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {isHindi ? 'पुरस्कार पहल और योजनाएं' : 'Awards Initiatives & Schemes'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {isHindi
                    ? 'चल रहे और स्थापित पुरस्कार कार्यक्रमों का व्यापक अवलोकन'
                    : 'Comprehensive overview of ongoing and established award programs'}
                </p>
              </div>

              {/* Desktop View Table */}
              <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {isHindi ? 'पुरस्कार का नाम' : 'Award Name'}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {isHindi ? 'द्वारा पहल' : 'Initiated By'}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {isHindi ? 'वर्ष' : 'Year'}
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          {isHindi ? 'आवृत्ति' : 'Frequency'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <AnimatePresence mode="popLayout">
                        {initiatives.map((award, index) => (
                          <motion.tr
                            key={award.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="hover:bg-gray-50/80 transition-colors duration-200"
                          >
                            <td className="px-6 py-5">
                              <div>
                                <p className="font-semibold text-gray-900">
                                  {isHindi ? award.name_hn : award.name_en}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                  {isHindi ? award.description_hn : award.description_en}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className="text-sm text-gray-700">
                                {isHindi ? award.initiated_by_hn : award.initiated_by_en}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <span className="text-sm font-medium text-gray-900">
                                {award.year_introduced}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${getFrequencyBadge(
                                  isHindi ? award.frequency_hn : award.frequency_en
                                )}`}
                              >
                                {isHindi ? award.frequency_hn : award.frequency_en}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile View Cards */}
              <div className="lg:hidden space-y-4">
                <AnimatePresence mode="popLayout">
                  {initiatives.map((award, index) => (
                    <motion.div
                      key={award.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
                    >
                      <div className="mb-3">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {isHindi ? award.name_hn : award.name_en}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {isHindi ? award.description_hn : award.description_en}
                      </p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">{isHindi ? 'द्वारा पहल' : 'Initiated By'}</p>
                          <p className="font-medium text-gray-900">
                            {isHindi ? award.initiated_by_hn : award.initiated_by_en}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">{isHindi ? 'वर्ष' : 'Year Introduced'}</p>
                          <p className="font-medium text-gray-900">
                            {award.year_introduced}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-gray-500 mb-1">{isHindi ? 'आवृत्ति' : 'Frequency'}</p>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border ${getFrequencyBadge(
                              isHindi ? award.frequency_hn : award.frequency_en
                            )}`}
                          >
                            {isHindi ? award.frequency_hn : award.frequency_en}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {initiatives.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white rounded-2xl"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {isHindi ? 'कोई पुरस्कार नहीं मिला' : 'No Awards Found'}
                  </h3>
                  <p className="text-gray-500">
                    {isHindi ? 'कोई पुरस्कार पहल उपलब्ध नहीं है।' : 'No award initiatives match your current filter.'}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Eligibility & Selection Process */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  {isHindi ? 'पात्रता और चयन प्रक्रिया' : 'Eligibility & Selection Process'}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {isHindi
                    ? 'पुरस्कार नामांकन और चयन के मानदंडों और प्रक्रिया को समझना'
                    : 'Understanding the criteria and process for award nominations and selection'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {eligibility.map((section, index) => (
                  <motion.div
                    key={section.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#631012] to-[#7a1a1d] flex items-center justify-center">
                        <span className="text-white text-xl font-bold">
                          {section.step}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {isHindi ? section.title_hn : section.title_en}
                        </h3>
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {(isHindi ? section.points_hn : section.points_en)
                        .split('\n')
                        .filter(Boolean)
                        .map((point, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <svg
                              className="w-5 h-5 text-[#631012] flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 text-sm leading-relaxed">
                              {point}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recognition & Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {isHindi ? 'मान्यता और लाभ' : 'Recognition & Benefits'}
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  {isHindi
                    ? 'पुरस्कार विजेताओं को प्रतिष्ठित मान्यता मिलती है और वे एक विशिष्ट समुदाय का हिस्सा बनते हैं'
                    : 'Awardees receive prestigious recognition and become part of an elite community'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d={benefit.icon}
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">
                      {isHindi ? benefit.title_hn : benefit.title_en}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {isHindi ? benefit.description_hn : benefit.description_en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Celebrate & Nominate bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] rounded-2xl shadow-xl p-8 md:p-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {isHindi ? heading.join_title_hn : heading.join_title_en}
              </h2>
              <p className="text-gray-200 text-lg mb-8 max-w-3xl mx-auto">
                {isHindi ? heading.join_desc_hn : heading.join_desc_en}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#631012] rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  {isHindi ? heading.join_btn1_hn : heading.join_btn1_en}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border-2 border-white/30 backdrop-blur-sm"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  {isHindi ? heading.join_btn2_hn : heading.join_btn2_en}
                </motion.button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-gray-300 text-sm">
                  {isHindi ? heading.inquiries_text_hn : heading.inquiries_text_en}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
