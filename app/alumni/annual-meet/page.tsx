'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';

interface PastMeet {
  id: number;
  year: string;
  theme_en: string;
  theme_hn: string;
  date_en: string;
  date_hn: string;
  highlights_en: string;
  highlights_hn: string;
  attendees?: number;
  images?: string;
}

interface ScheduleItem {
  id: number;
  time_en: string;
  time_hn: string;
  activity_en: string;
  activity_hn: string;
  venue_en: string;
  venue_hn: string;
  speaker_en?: string;
  speaker_hn?: string;
}

interface GalleryImage {
  id: number;
  url: string;
  year: string;
  caption_en: string;
  caption_hn: string;
}

const FALLBACK_HEADING = {
  title_en: 'Annual Alumni Meet of NITH',
  title_hn: 'एनआईटी हमीरपुर की वार्षिक पूर्व छात्र बैठक',
  sub_title_en: 'Reconnecting alumni with their alma mater and celebrating shared journeys of excellence, innovation, and lifelong bonds.',
  sub_title_hn: 'पूर्व छात्रों को उनके अल्मा मेटर से फिर से जोड़ना और उत्कृष्टता, नवाचार और आजीवन संबंधों की साझा यात्रा का जश्न मनाना।',
  about_title_en: 'About the Annual Alumni Meet',
  about_title_hn: 'वार्षिक पूर्व छात्र बैठक के बारे में',
  about_desc1_en: 'The Annual Alumni Meet is a flagship event of NIT Hamirpur, bringing together graduates from across batches, disciplines, and geographies to celebrate our shared heritage and continued excellence. It serves as a platform for reconnection, knowledge sharing, and strengthening the bonds that tie us to our alma mater.',
  about_desc1_hn: 'वार्षिक पूर्व छात्र बैठक एनआईटी हमीरपुर का एक प्रमुख कार्यक्रम है, जो हमारी साझा विरासत और निरंतर उत्कृष्टता का जश्न मनाने के लिए विभिन्न बैचों, विषयों और भौगोलिक क्षेत्रों के स्नातकों को एक साथ लाता है। यह पुनर्मिलन, ज्ञान साझा करने और हमारे अल्मा मेटर से बांधने वाले संबंधों को मजबूत करने के लिए एक मंच के रूप में कार्य करता है।',
  about_desc2_en: 'This cherished tradition provides an opportunity for alumni to revisit the campus, witness its growth, interact with faculty and current students, and contribute to the institute\'s vision for the future. Through engaging sessions, cultural events, and informal gatherings, the meet fosters a sense of community that transcends time and distance.',
  about_desc2_hn: 'यह पोषित परंपरा पूर्व छात्रों को परिसर में फिर से जाने, इसके विकास को देखने, संकाय और वर्तमान छात्रों के साथ बातचीत करने और भविष्य के लिए संस्थान के दृष्टिकोण में योगदान करने का अवसर प्रदान करती है। आकर्षक सत्रों, सांस्कृतिक कार्यक्रमों और अनौपचारिक सभाओं के माध्यम से, बैठक समुदाय की भावना को बढ़ावा देती है जो समय और दूरी से परे है।',
  about_desc3_en: 'The event also recognizes outstanding achievements of alumni who have brought laurels to the institute through their professional accomplishments, social contributions, and exemplary leadership in their respective fields.',
  about_desc3_hn: 'यह कार्यक्रम उन पूर्व छात्रों की उत्कृष्ट उपलब्धियों को भी मान्यता देता है जिन्होंने अपने पेशेवर कार्यों, सामाजिक योगदान और अपने संबंधित क्षेत्रों में अनुकरणीय नेतृत्व के माध्यम से संस्थान का मान बढ़ाया है।',
  upcoming_title_en: 'Annual Alumni Meet 2025',
  upcoming_title_hn: 'वार्षिक पूर्व छात्र बैठक 2025',
  upcoming_theme_en: 'Innovation & Excellence: Building Tomorrow Together',
  upcoming_theme_hn: 'नवाचार और उत्कृष्टता: साथ मिलकर कल का निर्माण',
  upcoming_date_en: 'March 15-17, 2025',
  upcoming_date_hn: '15-17 मार्च, 2025',
  upcoming_venue_en: 'NIT Hamirpur Campus',
  upcoming_venue_hn: 'एनआईटी हमीरपुर परिसर',
  upcoming_desc_en: 'Join us for three days of reconnection, celebration, and inspiration as we bring together alumni from across generations to celebrate our shared legacy and strengthen our bonds.',
  upcoming_desc_hn: 'हमारी साझा विरासत का जश्न मनाने और हमारे बंधनों को मजबूत करने के लिए विभिन्न पीढ़ियों के पूर्व छात्रों को एक साथ लाने के साथ पुनर्मिलन, उत्सव और प्रेरणा के तीन दिनों के लिए हमारे साथ जुड़ें।',
  upcoming_reg_open: true,
  involve_title_en: 'Get Involved',
  involve_title_hn: 'शामिल हों',
  involve_desc_en: 'Have questions or want to participate? Reach out to us',
  involve_desc_hn: 'प्रश्न हैं या भाग लेना चाहते हैं? हमसे संपर्क करें',
  contact_email: 'alumni@nith.ac.in',
  contact_phone: '+91-1972-254545',
  contact_address_en: 'Alumni Relations Office, NIT Hamirpur, Himachal Pradesh - 177005',
  contact_address_hn: 'पूर्व छात्र संबंध कार्यालय, एनआईटी हमीरपुर, हिमाचल प्रदेश - 177005',
  connected_title_en: 'Stay Connected with NITH Alumni',
  connected_title_hn: 'एनआईटीएच पूर्व छात्रों के साथ जुड़े रहें',
  connected_desc_en: 'Join our vibrant alumni community and be part of a network that spans the globe. Together, we continue to build on our shared legacy of excellence.',
  connected_desc_hn: 'हमारे जीवंत पूर्व छात्र समुदाय में शामिल हों और दुनिया भर में फैले नेटवर्क का हिस्सा बनें। साथ मिलकर, हम उत्कृष्टता की अपनी साझा विरासत का निर्माण जारी रखेंगे।',
  link_register_label_en: 'Register for Annual Meet',
  link_register_label_hn: 'वार्षिक बैठक के लिए पंजीकरण करें',
  link_register_url: '/alumni/registration',
  link_network_label_en: 'Alumni Network',
  link_network_label_hn: 'पूर्व छात्र नेटवर्क',
  link_network_url: '/alumni/network',
  link_endowment_label_en: 'Support Endowment Fund',
  link_endowment_label_hn: 'अक्षय निधि का समर्थन करें',
  link_endowment_url: '/alumni/endowment-fund',
  btn_join_label_en: 'Join Alumni Portal',
  btn_join_label_hn: 'पूर्व छात्र पोर्टल में शामिल हों',
  btn_join_url: '/alumni/registration',
  btn_sub_label_en: 'Subscribe to Newsletter',
  btn_sub_label_hn: 'समाचार पत्र की सदस्यता लें',
  btn_sub_url: '#'
};

export default function AnnualAlumniMeet() {
  const language = useSelector((state: any) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<any>(FALLBACK_HEADING);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [pastMeets, setPastMeets] = useState<PastMeet[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [customLightboxUrl, setCustomLightboxUrl] = useState<string | null>(null);
  const [showAllPastMeets, setShowAllPastMeets] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch dynamic page contents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/api/alumni-annual-meet`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data.heading) setHeading({ ...FALLBACK_HEADING, ...data.heading });
          if (Array.isArray(data.schedule)) setSchedule(data.schedule);
          if (Array.isArray(data.past)) setPastMeets(data.past);
          if (Array.isArray(data.gallery)) setGalleryImages(data.gallery);
        }
      } catch (err) {
        console.error('Error fetching annual meet data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const displayedMeets = showAllPastMeets ? pastMeets : pastMeets.slice(0, 3);

  // Helpers to fetch localized strings cleanly
  const getAboutParagraphs = () => {
    const p1 = isHindi ? heading.about_desc1_hn : heading.about_desc1_en;
    const p2 = isHindi ? heading.about_desc2_hn : heading.about_desc2_en;
    const p3 = isHindi ? heading.about_desc3_hn : heading.about_desc3_en;
    return [p1, p2, p3].filter(Boolean);
  };

  const getPastMeetImages = (imgStr?: string) => {
    if (!imgStr) return [];
    return imgStr.split(',').map(s => s.trim()).filter(Boolean);
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

  // Get active modal image object
  const activeImageObj = galleryImages.find(img => img.id === selectedImage);

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb path */}
        <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#800000] transition-colors duration-200">
                {isHindi ? 'मुख्य पृष्ठ' : 'Home'}
              </Link>
              <span>›</span>
              <span className="text-gray-400">{isHindi ? 'पूर्व छात्र' : 'Alumni'}</span>
              <span>›</span>
              <span className="text-[#800000] font-medium">
                {isHindi ? 'वार्षिक पूर्व छात्र बैठक' : 'Annual Alumni Meet'}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero banner section */}
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

        {/* About section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-[#631012] rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {isHindi ? heading.about_title_hn : heading.about_title_en}
                </h2>
              </div>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {getAboutParagraphs().map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Meet section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {isHindi ? 'आगामी पूर्व छात्र बैठक' : 'Upcoming Alumni Meet'}
                </h2>
                <p className="text-gray-600">
                  {isHindi ? 'अगले भव्य पुनर्मिलन के लिए अपने कैलेंडर को चिह्नित करें' : 'Mark your calendars for the next grand reunion'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#631012] to-[#4a0c0e] rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="text-white space-y-6">
                      <div>
                        <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                          {isHindi ? 'अगला कार्यक्रम' : 'Next Event'}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-bold mb-3">
                          {isHindi ? heading.upcoming_title_hn : heading.upcoming_title_en}
                        </h3>
                        <p className="text-xl text-gray-200 mb-2">
                          {isHindi ? heading.upcoming_theme_hn : heading.upcoming_theme_en}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-lg">{isHindi ? heading.upcoming_date_hn : heading.upcoming_date_en}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-lg">{isHindi ? heading.upcoming_venue_hn : heading.upcoming_venue_en}</span>
                        </div>
                      </div>

                      <p className="text-gray-200 leading-relaxed">
                        {isHindi ? heading.upcoming_desc_hn : heading.upcoming_desc_en}
                      </p>

                      <div className="flex flex-wrap gap-4 pt-4">
                        {heading.upcoming_reg_open && (
                          <Link href="/alumni/registration" className="px-8 py-3 bg-white text-[#631012] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            {isHindi ? 'अभी पंजीकरण करें' : 'Register Now'}
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            const el = document.getElementById('schedule-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-200"
                        >
                          {isHindi ? 'कार्यक्रम अनुसूची' : 'View Schedule'}
                        </button>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 w-80">
                        <div className="aspect-video bg-white/20 rounded-lg overflow-hidden flex items-center justify-center relative shadow-inner">
                          {heading.upcoming_image ? (
                            <img
                              src={heading.upcoming_image}
                              alt="Upcoming Reunion promotional banner"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          )}
                        </div>
                        <div className="mt-4 text-center text-white/80 text-sm font-medium">
                          {isHindi ? 'कार्यक्रम प्रचार छवि' : 'Event promotional image'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Schedule section */}
        <section id="schedule-section" className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {isHindi ? 'कार्यक्रम अनुसूची' : 'Event Schedule'}
                </h2>
                <p className="text-gray-600">
                  {isHindi ? 'पुनर्मिलन दिवस के लिए कार्यक्रम अवलोकन' : 'Tentative program overview for Day 1'}
                </p>
              </div>

              {schedule.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm border border-gray-150">
                  {isHindi ? 'कोई शेड्यूल उपलब्ध नहीं है।' : 'No program timeline slots uploaded yet.'}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-[#631012] to-[#7a1a1d] text-white">
                        <tr>
                          <th className="px-6 py-4 text-left font-semibold">{isHindi ? 'समय' : 'Time'}</th>
                          <th className="px-6 py-4 text-left font-semibold">{isHindi ? 'गतिविधि' : 'Activity'}</th>
                          <th className="px-6 py-4 text-left font-semibold">{isHindi ? 'स्थान' : 'Venue'}</th>
                          <th className="px-6 py-4 text-left font-semibold">{isHindi ? 'वक्ता/मेजबान' : 'Speaker/Host'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {schedule.map((item, index) => (
                          <motion.tr
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="hover:bg-gray-50 transition-colors duration-150"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#631012]">
                              {isHindi ? item.time_hn : item.time_en}
                            </td>
                            <td className="px-6 py-4 text-gray-800 font-medium">
                              {isHindi ? item.activity_hn : item.activity_en}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {isHindi ? item.venue_hn : item.venue_en}
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                              {(isHindi ? item.speaker_hn : item.speaker_en) || '—'}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="md:hidden divide-y divide-gray-200">
                    {schedule.map((item) => (
                      <div key={item.id} className="p-4 hover:bg-gray-50">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-semibold text-[#631012]">
                            {isHindi ? item.time_hn : item.time_en}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2">
                          {isHindi ? item.activity_hn : item.activity_en}
                        </h4>
                        <div className="flex flex-col gap-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span>{isHindi ? item.venue_hn : item.venue_en}</span>
                          </div>
                          {(isHindi ? item.speaker_hn : item.speaker_en) && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>{isHindi ? item.speaker_hn : item.speaker_en}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-600">
                      {isHindi 
                        ? '* कार्यक्रम कार्यक्रम अस्थायी है और परिवर्तन के अधीन है। संपूर्ण कार्यक्रम पंजीकृत प्रतिभागियों के साथ साझा किया जाएगा।' 
                        : '* Schedule is tentative and subject to change. Full 3-day program will be shared with registered participants.'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Past Meets section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {isHindi ? 'विगत पूर्व छात्र बैठकें' : 'Past Alumni Meets'}
                </h2>
                <p className="text-gray-600">
                  {isHindi ? 'दशकों के यादगार पुनर्मिलन और संबंधों का जश्न मनाना' : 'Celebrating decades of memorable reunions and connections'}
                </p>
              </div>

              {pastMeets.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm border border-gray-150">
                  {isHindi ? 'कोई विगत बैठक उपलब्ध नहीं है।' : 'No past meet history records saved.'}
                </div>
              ) : (
                <div className="space-y-6">
                  {displayedMeets.map((meet, index) => (
                    <motion.div
                      key={meet.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="grid md:grid-cols-12 gap-0">
                        <div className="md:col-span-2 bg-gradient-to-br from-[#631012] to-[#4a0c0e] p-6 flex flex-col items-center justify-center text-white">
                          <div className="text-5xl font-bold mb-2">
                            {meet.year}
                          </div>
                          {meet.attendees && (
                            <div className="text-center">
                              <div className="text-2xl font-semibold">
                                {meet.attendees}+
                              </div>
                              <div className="text-xs text-gray-200">
                                {isHindi ? 'प्रतिभागी' : 'Attendees'}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-10 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                                {isHindi ? meet.theme_hn : meet.theme_en}
                              </h3>
                              <div className="flex items-center gap-2 text-gray-600 mb-3">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">{isHindi ? meet.date_hn : meet.date_en}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedYear(meet.year)}
                              className="px-6 py-2 bg-[#631012] text-white rounded-lg hover:bg-[#7a1a1d] transition-colors duration-200 whitespace-nowrap self-start"
                            >
                              {isHindi ? 'गैलरी देखें' : 'View Gallery'}
                            </button>
                          </div>

                          <div className="prose max-w-none mb-4">
                            <p className="text-gray-700 leading-relaxed">
                              <span className="font-semibold text-gray-800">
                                {isHindi ? 'मुख्य विशेषताएं:' : 'Highlights:'}{' '}
                              </span>
                              {isHindi ? meet.highlights_hn : meet.highlights_en}
                            </p>
                          </div>

                          {/* Interactive Past Reunion Thumbnail Strip */}
                          {meet.images && getPastMeetImages(meet.images).length > 0 && (
                            <div className="mt-4">
                              <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
                                {isHindi ? 'पुनर्मिलन क्षण:' : 'Reunion Moments:'}
                              </div>
                              <div className="flex flex-wrap gap-3">
                                {getPastMeetImages(meet.images).map((imgUrl, i) => (
                                  <div
                                    key={i}
                                    className="w-20 h-16 rounded-lg overflow-hidden border border-gray-200 relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
                                    onClick={() => setCustomLightboxUrl(imgUrl)}
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`Past reunion ${meet.year} photo ${i + 1}`}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {!showAllPastMeets && pastMeets.length > 3 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setShowAllPastMeets(true)}
                    className="px-8 py-3 bg-white text-[#631012] font-semibold rounded-lg border-2 border-[#631012] hover:bg-[#631012] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {isHindi ? 'सभी विगत बैठकें देखें' : 'View All Past Meets'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Gallery section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {isHindi ? 'कार्यक्रम गैलरी' : 'Event Gallery'}
                </h2>
                <p className="text-gray-600">
                  {isHindi ? 'हमारे पूर्व छात्र पुनर्मिलन से यादगार क्षण' : 'Memorable moments from our alumni reunions'}
                </p>
              </div>

              {galleryImages.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-gray-500 shadow-sm border border-gray-150">
                  {isHindi ? 'कोई फ़ोटो उपलब्ध नहीं है।' : 'No gallery photos uploaded yet.'}
                </div>
              ) : (
                <>
                  <div className="flex justify-center gap-3 mb-8 flex-wrap">
                    <button
                      onClick={() => setSelectedYear(null)}
                      className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                        selectedYear === null
                          ? 'bg-[#631012] text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {isHindi ? 'सभी वर्ष' : 'All Years'}
                    </button>
                    {Array.from(new Set(galleryImages.map(img => img.year))).sort().reverse().map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                          selectedYear === year
                            ? 'bg-[#631012] text-white shadow-md'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryImages
                      .filter(img => selectedYear === null || img.year === selectedYear)
                      .map((image, index) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                          onClick={() => setSelectedImage(image.id)}
                        >
                          <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 relative overflow-hidden">
                            {image.url ? (
                              <img
                                src={image.url}
                                alt={isHindi ? image.caption_hn : image.caption_en}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            ) : null}
                            {/* Visual fallback icon representation if image does not load or path is template */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 -z-10">
                              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            
                            {/* Realistic styled overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                              <div>
                                <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-semibold mb-1">
                                  {image.year}
                                </span>
                                <p className="font-semibold text-sm line-clamp-2">
                                  {isHindi ? image.caption_hn : image.caption_en}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {/* Contact/Info section */}
        <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {isHindi ? heading.involve_title_hn : heading.involve_title_en}
                </h2>
                <p className="text-gray-600">
                  {isHindi ? heading.involve_desc_hn : heading.involve_desc_en}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#631012] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {isHindi ? 'संपर्क जानकारी' : 'Contact Information'}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#631012] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-800">{isHindi ? 'ईमेल' : 'Email'}</p>
                        <a href={`mailto:${heading.contact_email}`} className="text-[#631012] hover:underline font-medium">
                          {heading.contact_email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#631012] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-800">{isHindi ? 'फ़ोन' : 'Phone'}</p>
                        <p className="text-gray-600 font-medium">{heading.contact_phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#631012] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <div>
                        <p className="font-semibold text-gray-800">{isHindi ? 'कार्यालय पता' : 'Alumni Relations Office'}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {isHindi ? heading.contact_address_hn : heading.contact_address_en}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-[#631012] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {isHindi ? 'त्वरित लिंक' : 'Quick Actions'}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <Link href={heading.link_register_url || '/alumni/registration'} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#631012] hover:text-white transition-all duration-200 group border border-gray-100">
                      <span className="font-medium">
                        {isHindi ? (heading.link_register_label_hn || 'वार्षिक बैठक के लिए पंजीकरण करें') : (heading.link_register_label_en || 'Register for Annual Meet')}
                      </span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link href={heading.link_network_url || '/alumni/network'} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#631012] hover:text-white transition-all duration-200 group border border-gray-100">
                      <span className="font-medium">
                        {isHindi ? (heading.link_network_label_hn || 'पूर्व छात्र नेटवर्क') : (heading.link_network_label_en || 'Alumni Network')}
                      </span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <Link href={heading.link_endowment_url || '/alumni/endowment-fund'} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#631012] hover:text-white transition-all duration-200 group border border-gray-100">
                      <span className="font-medium">
                        {isHindi ? (heading.link_endowment_label_hn || 'अक्षय निधि का समर्थन करें') : (heading.link_endowment_label_en || 'Support Endowment Fund')}
                      </span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Callout Stay Connected banner */}
              <div className="mt-8 bg-gradient-to-r from-[#631012] to-[#4a0c0e] rounded-xl p-8 text-center text-white shadow-lg">
                <h3 className="text-2xl font-bold mb-3">
                  {isHindi ? heading.connected_title_hn : heading.connected_title_en}
                </h3>
                <p className="text-gray-200 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
                  {isHindi ? heading.connected_desc_hn : heading.connected_desc_en}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href={heading.btn_join_url || '/alumni/registration'} className="px-8 py-3 bg-white text-[#631012] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-md">
                    {isHindi ? (heading.btn_join_label_hn || 'पूर्व छात्र पोर्टल में शामिल हों') : (heading.btn_join_label_en || 'Join Alumni Portal')}
                  </Link>
                  <Link href={heading.btn_sub_url || '#'} className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-200">
                    {isHindi ? (heading.btn_sub_label_hn || 'समाचार पत्र की सदस्यता लें') : (heading.btn_sub_label_en || 'Subscribe to Newsletter')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />

      {/* Modern Lightbox Image Modal Dialogue */}
      <AnimatePresence>
        {selectedImage !== null && activeImageObj && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded bg-white/10 hover:bg-white/25">
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-h-[60vh] rounded-xl relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                {activeImageObj.url ? (
                  <img
                    src={activeImageObj.url}
                    alt={isHindi ? activeImageObj.caption_hn : activeImageObj.caption_en}
                    className="max-w-full max-h-[60vh] object-contain rounded-xl"
                  />
                ) : (
                  <svg className="w-24 h-24 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="text-center text-white">
                <span className="inline-block px-3 py-1 bg-white/20 rounded text-xs font-semibold mb-2">
                  {activeImageObj.year}
                </span>
                <h4 className="text-lg font-bold">
                  {isHindi ? activeImageObj.caption_hn : activeImageObj.caption_en}
                </h4>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Custom Lightbox Modal */}
      <AnimatePresence>
        {customLightboxUrl !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setCustomLightboxUrl(null)}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 rounded bg-white/10 hover:bg-white/25">
              ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-h-[60vh] rounded-xl relative overflow-hidden flex items-center justify-center">
                <img
                  src={customLightboxUrl}
                  alt="Reunion moment highlights"
                  className="max-w-full max-h-[60vh] object-contain rounded-xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
