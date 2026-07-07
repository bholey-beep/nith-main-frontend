'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';

interface Initiative {
  id: number;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming';
  year_en: string;
  year_hn: string;
  amount_en?: string;
  amount_hn?: string;
}

const FALLBACK_HEADING = {
  title_en: 'Endowment Fund Generation',
  title_hn: 'एंडोमेंट फंड जनरेशन',
  sub_title_en: 'Building a sustainable future for NIT Hamirpur through strategic endowment initiatives that support academic excellence, innovation, and student welfare.',
  sub_title_hn: 'शैक्षणिक उत्कृष्टता, नवाचार और छात्र कल्याण का समर्थन करने वाली रणनीतिक एंडोमेंट पहलों के माध्यम से एनआईटी हमीरपुर के लिए एक सतत भविष्य का निर्माण करना।',
  
  about_title_en: 'About the Endowment Fund',
  about_title_hn: 'एंडोमेंट फंड के बारे में',
  about_desc1_en: 'An Endowment Fund is a permanent fund established to provide long-term financial support to NIT Hamirpur. The principal amount is invested prudently, and the generated returns are utilized to support various institutional initiatives without depleting the core corpus.',
  about_desc1_hn: 'एक एंडोमेंट फंड एनआईटी हमीरपुर को दीर्घकालिक वित्तीय सहायता प्रदान करने के लिए स्थापित एक स्थायी फंड है। मूल राशि का विवेकपूर्ण निवेश किया जाता है, और उत्पन्न रिटर्न का उपयोग मूल कॉर्पस को समाप्त किए बिना विभिन्न संस्थागत पहलों का समर्थन करने के लिए किया जाता है।',
  about_desc2_en: 'The Endowment Fund plays a crucial role in supporting academic excellence, cutting-edge research, modern infrastructure development, student scholarships, faculty development, and overall student welfare at the institute.',
  about_desc2_hn: 'एंडोमेंट फंड संस्थान में शैक्षणिक उत्कृष्टता, अत्याधुनिक अनुसंधान, आधुनिक बुनियादी ढांचे के विकास, छात्र छात्रवृत्ति, संकाय विकास और समग्र छात्र कल्याण का समर्थन करने में महत्वपूर्ण भूमिका निभाता है।',
  about_desc3_en: 'Alumni participation is vital to the success of these initiatives. By contributing to the endowment fund, alumni give back to their alma mater, ensuring that future generations of students receive the same quality education and opportunities that shaped their own careers.',
  about_desc3_hn: 'इन पहलों की सफलता के लिए पूर्व छात्रों की भागीदारी महत्वपूर्ण है। एंडोमेंट फंड में योगदान देकर, पूर्व छात्र अपने अल्मा मेटर को वापस देते हैं, जिससे यह सुनिश्चित होता है कि छात्रों की भावी पीढ़ियों को वही गुणवत्तापूर्ण शिक्षा और अवसर मिलें जिन्होंने उनके अपने करियर को आकार दिया।',

  // Objectives
  obj1_title_en: 'Student Scholarships & Financial Aid',
  obj1_title_hn: 'छात्र छात्रवृत्ति और वित्तीय सहायता',
  obj1_desc_en: 'Provide merit-based and need-based scholarships to deserving students, ensuring access to quality education regardless of financial background.',
  obj1_desc_hn: 'योग्य छात्रों को योग्यता-आधारित और आवश्यकता-आधारित छात्रवृत्ति प्रदान करना, वित्तीय पृष्ठभूमि की परवाह किए बिना गुणवत्तापूर्ण शिक्षा तक पहुंच सुनिश्चित करना।',

  obj2_title_en: 'Faculty Development & Research Support',
  obj2_title_hn: 'संकाय विकास और अनुसंधान सहायता',
  obj2_desc_en: 'Enable faculty members to pursue advanced research, attend international conferences, and collaborate with global institutions.',
  obj2_desc_hn: 'संकाय सदस्यों को उन्नत अनुसंधान करने, अंतर्राष्ट्रीय सम्मेलनों में भाग लेने और वैश्विक संस्थानों के साथ सहयोग करने में सक्षम बनाना।',

  obj3_title_en: 'Infrastructure & Laboratory Enhancement',
  obj3_title_hn: 'बुनियादी ढांचा और प्रयोगशाला संवर्द्धन',
  obj3_desc_en: 'Develop world-class infrastructure, modern laboratories, and advanced equipment to foster innovation and practical learning.',
  obj3_desc_hn: 'नवाचार और व्यावहारिक सीखने को बढ़ावा देने के लिए विश्व स्तरीय बुनियादी ढांचे, आधुनिक प्रयोगशालाओं और उन्नत उपकरणों का विकास करना।',

  obj4_title_en: 'Innovation, Startups & Incubation Support',
  obj4_title_hn: 'नवाचार, स्टार्टअप और ऊष्मायन सहायता',
  obj4_desc_en: 'Promote entrepreneurial culture by providing seed funding, mentorship, and resources for student-led startups and innovative projects.',
  obj4_desc_hn: 'छात्रों के नेतृत्व वाले स्टार्टअप और नवीन परियोजनाओं के लिए बीज वित्तपोषण, परामर्श और संसाधन प्रदान करके उद्यमशीलता संस्कृति को बढ़ावा देना।',

  obj5_title_en: 'Long-term Financial Sustainability',
  obj5_title_hn: 'दीर्घकालिक वित्तीय स्थिरता',
  obj5_desc_en: 'Build a robust financial foundation that ensures the institute can maintain excellence and adapt to future educational challenges.',
  obj5_desc_hn: 'एक मजबूत वित्तीय आधार का निर्माण करना जो यह सुनिश्चित करे कि संस्थान उत्कृष्टता बनाए रख सके और भविष्य की शैक्षिक चुनौतियों के अनुकूल हो सके।',

  obj6_title_en: 'Student Welfare & Campus Development',
  obj6_title_hn: 'छात्र कल्याण और परिसर विकास',
  obj6_desc_en: 'Enhance student life through improved facilities, recreational areas, mental health support, and overall campus development.',
  obj6_desc_hn: 'बेहतर सुविधाओं, मनोरंजक क्षेत्रों, मानसिक स्वास्थ्य सहायता और समग्र परिसर विकास के माध्यम से छात्र जीवन को बढ़ाना।',

  // Participation
  contrib_title_en: 'How You Can Contribute',
  contrib_title_hn: 'आप कैसे योगदान दे सकते हैं',
  contrib_desc_en: 'Your contribution to the NIT Hamirpur Endowment Fund makes a lasting impact on the lives of students and the future of the institute. There are several ways you can participate:',
  contrib_desc_hn: 'एनआईटी हमीरपुर एंडोमेंट फंड में आपका योगदान छात्रों के जीवन और संस्थान के भविष्य पर स्थायी प्रभाव डालता है। आपके भाग लेने के कई तरीके हैं:',

  contrib1_title_en: 'Financial Contributions',
  contrib1_title_hn: 'वित्तीय योगदान',
  contrib1_desc_en: 'Make one-time or recurring donations to support the overall endowment corpus.',
  contrib1_desc_hn: 'कुल एंडोमेंट कॉर्पस का समर्थन करने के लिए एक बार या आवर्ती दान करें।',

  contrib2_title_en: 'Sponsored Scholarships',
  contrib2_title_hn: 'प्रायोजित छात्रवृत्ति',
  contrib2_desc_en: 'Establish named scholarships in your name or in memory of loved ones.',
  contrib2_desc_hn: 'अपने नाम पर या प्रियजनों की स्मृति में नामित छात्रवृत्ति स्थापित करें।',

  contrib3_title_en: 'Infrastructure Support',
  contrib3_title_hn: 'बुनियादी ढांचा सहायता',
  contrib3_desc_en: 'Sponsor laboratories, classrooms, or specific equipment for academic departments.',
  contrib3_desc_hn: 'शैक्षणिक विभागों के लिए प्रयोगशालाओं, कक्षाओं या विशिष्ट उपकरणों को प्रायोजित करें।',

  contrib4_title_en: 'Research Grants',
  contrib4_title_hn: 'अनुसंधान अनुदान',
  contrib4_desc_en: 'Fund specific research projects or provide research fellowships for faculty and students.',
  contrib4_desc_hn: 'विशिष्ट अनुसंधान परियोजनाओं को निधि देना या संकाय और छात्रों के लिए अनुसंधान फैलोशिप प्रदान करना।',

  contrib_btn1_en: 'Contribute to Endowment Fund',
  contrib_btn1_hn: 'एंडोमेंट फंड में योगदान करें',
  contrib_btn2_en: 'Contact Alumni Office',
  contrib_btn2_hn: 'पूर्व छात्र कार्यालय से संपर्क करें',

  // Transparency
  trans_title_en: 'Transparency & Governance',
  trans_title_hn: 'पारदर्शिता और शासन',
  trans_desc_en: 'At NIT Hamirpur, we are committed to maintaining the highest standards of transparency and accountability in managing the endowment fund. Every contribution is handled with utmost care and responsibility.',
  trans_desc_hn: 'एनआईटी हमीरपुर में, हम एंडोमेंट फंड के प्रबंधन में पारदर्शिता और जवाबदेही के उच्चतम मानकों को बनाए रखने के लिए प्रतिबद्ध हैं। प्रत्येक योगदान को अत्यंत सावधानी और जिम्मेदारी के साथ संभाला जाता है।',

  trans1_title_en: 'Oversight',
  trans1_title_hn: 'निगरानी',
  trans1_desc_en: 'Managed by a dedicated committee comprising senior faculty, administration, and alumni representatives.',
  trans1_desc_hn: 'वरिष्ठ संकाय, प्रशासन और पूर्व छात्र प्रतिनिधियों की एक समर्पित समिति द्वारा प्रबंधित।',

  trans2_title_en: 'Investment',
  trans2_title_hn: 'निवेश',
  trans2_desc_en: 'Prudent investment strategies ensure sustainable growth while preserving the principal corpus.',
  trans2_desc_hn: 'विवेकपूर्ण निवेश रणनीतियाँ मूल कॉर्पस को संरक्षित करते हुए सतत विकास सुनिश्चित करती हैं।',

  trans3_title_en: 'Reporting',
  trans3_title_hn: 'रिपोर्टिंग',
  trans3_desc_en: 'Regular audits and annual reports are published to keep all stakeholders informed.',
  trans3_desc_hn: 'सभी हितधारकों को सूचित रखने के लिए नियमित ऑडिट और वार्षिक रिपोर्ट प्रकाशित की जाती हैं।',

  // Contacts
  contact_title_en: 'Contact Information',
  contact_title_hn: 'संपर्क जानकारी',
  contact_office_title_en: 'Alumni Office',
  contact_office_title_hn: 'पूर्व छात्र कार्यालय',
  contact_office_desc_en: 'National Institute of Technology Hamirpur\nHamirpur, Himachal Pradesh - 177005',
  contact_office_desc_hn: 'राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर\nहमीरपुर, हिमाचल प्रदेश - 177005',
  
  contact_email_title_en: 'Email',
  contact_email_title_hn: 'ईमेल',
  contact_email_desc_en: 'alumni@nith.ac.in\nendowment@nith.ac.in',
  contact_email_desc_hn: 'alumni@nith.ac.in\nendowment@nith.ac.in',

  contact_phone_title_en: 'Phone',
  contact_phone_title_hn: 'फ़ोन',
  contact_phone_desc_en: '+91-1972-223467\n+91-1972-254200',
  contact_phone_desc_hn: '+91-1972-223467\n+91-1972-254200',

  contact_hours_title_en: 'Office Hours',
  contact_hours_title_hn: 'कार्यालय समय',
  contact_hours_desc_en: 'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM',
  contact_hours_desc_hn: 'सोमवार - शुक्रवार: सुबह 9:00 बजे - शाम 5:00 बजे\nशनिवार: सुबह 9:00 बजे - दोपहर 1:00 बजे',
};

export default function EndowmentFundGeneration() {
  const [activeTab, setActiveTab] = useState<'All' | 'Ongoing' | 'Completed' | 'Upcoming'>('All');
  const [loading, setLoading] = useState(false);
  const language = useSelector((state: any) => state.language.value);
  const isHindi = language === 'hi';
  const [heading, setHeading] = useState<any>(FALLBACK_HEADING);
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);

  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/alumni-endowment`);
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            const merged = { ...FALLBACK_HEADING };
            Object.keys(FALLBACK_HEADING).forEach((key) => {
              const val = data[key];
              if (val !== null && val !== undefined && val !== '') {
                (merged as any)[key] = val;
              }
            });
            setHeading(merged);
          }
        }
      } catch (err) {
        console.error('Error fetching endowment headings:', err);
      }
    };

    const fetchInitiatives = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/api/alumni-endowment/initiatives`);
        if (res.ok) {
          const data = await res.json();
          setInitiatives(data);
        }
      } catch (err) {
        console.error('Error fetching initiatives:', err);
      }
    };

    fetchHeading();
    fetchInitiatives();
  }, []);

  const t = {
    title: isHindi ? 'एंडोमेंट फंड जनरेशन' : 'Endowment Fund Generation',
    aboutTitle: isHindi ? 'एंडोमेंट फंड के बारे में' : 'About the Endowment Fund',
    objectivesTitle: isHindi ? 'एंडोमेंट फंड जनरेशन के उद्देश्य' : 'Objectives of Endowment Fund Generation',
    noInitiatives: isHindi ? 'कोई पहल नहीं मिली' : 'No initiatives found',
    noInitiativesDesc: isHindi ? 'इस समय प्रदर्शित करने के लिए कोई पहल नहीं है।' : 'There are no initiatives to display at this time.',
    ongoing: isHindi ? 'जारी है' : 'Ongoing',
    completed: isHindi ? 'पूरा हुआ' : 'Completed',
    upcoming: isHindi ? 'आगामी' : 'Upcoming',
    amount: isHindi ? 'राशि' : 'Amount',
    contribButton: isHindi ? 'एंडोमेंट फंड में योगदान करें' : 'Contribute to Endowment Fund',
    contactButton: isHindi ? 'पूर्व छात्र कार्यालय से संपर्क करें' : 'Contact Alumni Office',
  };

  const dynamicObjectives = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: isHindi ? (heading.obj1_title_hn || FALLBACK_HEADING.obj1_title_hn) : (heading.obj1_title_en || FALLBACK_HEADING.obj1_title_en),
      desc: isHindi ? (heading.obj1_desc_hn || FALLBACK_HEADING.obj1_desc_hn) : (heading.obj1_desc_en || FALLBACK_HEADING.obj1_desc_en),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: isHindi ? (heading.obj2_title_hn || FALLBACK_HEADING.obj2_title_hn) : (heading.obj2_title_en || FALLBACK_HEADING.obj2_title_en),
      desc: isHindi ? (heading.obj2_desc_hn || FALLBACK_HEADING.obj2_desc_hn) : (heading.obj2_desc_en || FALLBACK_HEADING.obj2_desc_en),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: isHindi ? (heading.obj3_title_hn || FALLBACK_HEADING.obj3_title_hn) : (heading.obj3_title_en || FALLBACK_HEADING.obj3_title_en),
      desc: isHindi ? (heading.obj3_desc_hn || FALLBACK_HEADING.obj3_desc_hn) : (heading.obj3_desc_en || FALLBACK_HEADING.obj3_desc_en),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: isHindi ? (heading.obj4_title_hn || FALLBACK_HEADING.obj4_title_hn) : (heading.obj4_title_en || FALLBACK_HEADING.obj4_title_en),
      desc: isHindi ? (heading.obj4_desc_hn || FALLBACK_HEADING.obj4_desc_hn) : (heading.obj4_desc_en || FALLBACK_HEADING.obj4_desc_en),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: isHindi ? (heading.obj5_title_hn || FALLBACK_HEADING.obj5_title_hn) : (heading.obj5_title_en || FALLBACK_HEADING.obj5_title_en),
      desc: isHindi ? (heading.obj5_desc_hn || FALLBACK_HEADING.obj5_desc_hn) : (heading.obj5_desc_en || FALLBACK_HEADING.obj5_desc_en),
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: isHindi ? (heading.obj6_title_hn || FALLBACK_HEADING.obj6_title_hn) : (heading.obj6_title_en || FALLBACK_HEADING.obj6_title_en),
      desc: isHindi ? (heading.obj6_desc_hn || FALLBACK_HEADING.obj6_desc_hn) : (heading.obj6_desc_en || FALLBACK_HEADING.obj6_desc_en),
    },
  ];

  const filteredInitiatives =
    activeTab === 'All'
      ? initiatives
      : initiatives.filter((init) => init.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ongoing':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Upcoming':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link
                href="/"
                className="hover:text-[#800000] transition-colors duration-200"
              >
                Home
              </Link>
              <span>›</span>
              <span className="text-gray-400">Alumni</span>
              <span>›</span>
              <span className="text-[#800000] font-medium">
                {isHindi ? heading.title_hn : heading.title_en}
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
                {isHindi ? (heading.title_hn || FALLBACK_HEADING.title_hn) : (heading.title_en || FALLBACK_HEADING.title_en)}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto font-normal">
                {isHindi ? (heading.sub_title_hn || FALLBACK_HEADING.sub_title_hn) : (heading.sub_title_en || FALLBACK_HEADING.sub_title_en)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* About the Endowment Fund */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8 mb-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#631012] flex items-center justify-center flex-shrink-0">
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {isHindi ? (heading.about_title_hn || FALLBACK_HEADING.about_title_hn) : (heading.about_title_en || FALLBACK_HEADING.about_title_en)}
                  </h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed font-normal">
                    <p>
                      {isHindi ? (heading.about_desc1_hn || FALLBACK_HEADING.about_desc1_hn) : (heading.about_desc1_en || FALLBACK_HEADING.about_desc1_en)}
                    </p>
                    <p>
                      {isHindi ? (heading.about_desc2_hn || FALLBACK_HEADING.about_desc2_hn) : (heading.about_desc2_en || FALLBACK_HEADING.about_desc2_en)}
                    </p>
                    <p>
                      {isHindi ? (heading.about_desc3_hn || FALLBACK_HEADING.about_desc3_hn) : (heading.about_desc3_en || FALLBACK_HEADING.about_desc3_en)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Objectives Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {t.objectivesTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dynamicObjectives.map((objective, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#631012] text-white flex items-center justify-center mb-4">
                      {objective.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {objective.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {objective.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Initiatives Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                  {isHindi ? 'एंडोमेंट फंड पहल' : 'Endowment Fund Initiatives'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(['All', 'Ongoing', 'Completed', 'Upcoming'] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeTab === tab
                            ? 'bg-[#631012] text-white shadow-sm'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {tab === 'All' ? (isHindi ? 'सभी' : 'All') : tab === 'Ongoing' ? t.ongoing : tab === 'Completed' ? t.completed : t.upcoming}
                      </button>
                    )
                  )}
                </div>
              </div>

              {filteredInitiatives.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredInitiatives.map((initiative, index) => (
                    <motion.div
                      key={initiative.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {isHindi ? initiative.title_hn : initiative.title_en}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                                initiative.status
                              )}`}
                            >
                              {initiative.status === 'Ongoing' ? t.ongoing : initiative.status === 'Completed' ? t.completed : t.upcoming}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                              {isHindi ? initiative.year_hn : initiative.year_en}
                            </span>
                          </div>
                        </div>
                        {(initiative.amount_en || initiative.amount_hn) && (
                          <div className="text-right ml-4">
                            <div className="text-xs text-gray-400 mb-1">
                              {t.amount}
                            </div>
                            <div className="text-lg font-bold text-[#631012]">
                              {isHindi ? initiative.amount_hn : initiative.amount_en}
                            </div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed font-normal">
                        {isHindi ? initiative.description_hn : initiative.description_en}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-12 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t.noInitiatives}
                  </h3>
                  <p className="text-gray-600 font-normal">
                    {t.noInitiativesDesc}
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Contribution & Participation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] rounded-2xl p-6 md:p-8 mb-8 text-white"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {isHindi ? (heading.contrib_title_hn || FALLBACK_HEADING.contrib_title_hn) : (heading.contrib_title_en || FALLBACK_HEADING.contrib_title_en)}
                  </h2>
                  <div className="space-y-4 text-gray-100 leading-relaxed font-normal">
                    <p>
                      {isHindi ? (heading.contrib_desc_hn || FALLBACK_HEADING.contrib_desc_hn) : (heading.contrib_desc_en || FALLBACK_HEADING.contrib_desc_en)}
                    </p>
                    <ul className="space-y-3 ml-6 font-normal">
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>{isHindi ? (heading.contrib1_title_hn || FALLBACK_HEADING.contrib1_title_hn) : (heading.contrib1_title_en || FALLBACK_HEADING.contrib1_title_en)}:</strong> {isHindi ? (heading.contrib1_desc_hn || FALLBACK_HEADING.contrib1_desc_hn) : (heading.contrib1_desc_en || FALLBACK_HEADING.contrib1_desc_en)}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>{isHindi ? (heading.contrib2_title_hn || FALLBACK_HEADING.contrib2_title_hn) : (heading.contrib2_title_en || FALLBACK_HEADING.contrib2_title_en)}:</strong> {isHindi ? (heading.contrib2_desc_hn || FALLBACK_HEADING.contrib2_desc_hn) : (heading.contrib2_desc_en || FALLBACK_HEADING.contrib2_desc_en)}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>{isHindi ? (heading.contrib3_title_hn || FALLBACK_HEADING.contrib3_title_hn) : (heading.contrib3_title_en || FALLBACK_HEADING.contrib3_title_en)}:</strong> {isHindi ? (heading.contrib3_desc_hn || FALLBACK_HEADING.contrib3_desc_hn) : (heading.contrib3_desc_en || FALLBACK_HEADING.contrib3_desc_en)}
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>
                          <strong>{isHindi ? (heading.contrib4_title_hn || FALLBACK_HEADING.contrib4_title_hn) : (heading.contrib4_title_en || FALLBACK_HEADING.contrib4_title_en)}:</strong> {isHindi ? (heading.contrib4_desc_hn || FALLBACK_HEADING.contrib4_desc_hn) : (heading.contrib4_desc_en || FALLBACK_HEADING.contrib4_desc_en)}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-6">
                    <button className="px-6 py-3 bg-white text-[#631012] rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-md">
                      {isHindi ? (heading.contrib_btn1_hn || FALLBACK_HEADING.contrib_btn1_hn) : (heading.contrib_btn1_en || FALLBACK_HEADING.contrib_btn1_en)}
                    </button>
                    <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors duration-200">
                      {isHindi ? (heading.contrib_btn2_hn || FALLBACK_HEADING.contrib_btn2_hn) : (heading.contrib_btn2_en || FALLBACK_HEADING.contrib_btn2_en)}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Transparency & Governance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 mb-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {isHindi ? (heading.trans_title_hn || FALLBACK_HEADING.trans_title_hn) : (heading.trans_title_en || FALLBACK_HEADING.trans_title_en)}
                  </h2>
                  <div className="space-y-3 text-gray-700 leading-relaxed font-normal">
                    <p>
                      {isHindi ? (heading.trans_desc_hn || FALLBACK_HEADING.trans_desc_hn) : (heading.trans_desc_en || FALLBACK_HEADING.trans_desc_en)}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <div className="text-sm text-blue-600 font-semibold mb-1">
                          {isHindi ? (heading.trans1_title_hn || FALLBACK_HEADING.trans1_title_hn) : (heading.trans1_title_en || FALLBACK_HEADING.trans1_title_en)}
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed font-normal">
                          {isHindi ? (heading.trans1_desc_hn || FALLBACK_HEADING.trans1_desc_hn) : (heading.trans1_desc_en || FALLBACK_HEADING.trans1_desc_en)}
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <div className="text-sm text-blue-600 font-semibold mb-1">
                          {isHindi ? (heading.trans2_title_hn || FALLBACK_HEADING.trans2_title_hn) : (heading.trans2_title_en || FALLBACK_HEADING.trans2_title_en)}
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed font-normal">
                          {isHindi ? (heading.trans2_desc_hn || FALLBACK_HEADING.trans2_desc_hn) : (heading.trans2_desc_en || FALLBACK_HEADING.trans2_desc_en)}
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-4 border border-blue-200">
                        <div className="text-sm text-blue-600 font-semibold mb-1">
                          {isHindi ? (heading.trans3_title_hn || FALLBACK_HEADING.trans3_title_hn) : (heading.trans3_title_en || FALLBACK_HEADING.trans3_title_en)}
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed font-normal">
                          {isHindi ? (heading.trans3_desc_hn || FALLBACK_HEADING.trans3_desc_hn) : (heading.trans3_desc_en || FALLBACK_HEADING.trans3_desc_en)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {isHindi ? (heading.contact_title_hn || FALLBACK_HEADING.contact_title_hn) : (heading.contact_title_en || FALLBACK_HEADING.contact_title_en)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Office Address Card */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#631012] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {isHindi ? (heading.contact_office_title_hn || FALLBACK_HEADING.contact_office_title_hn) : (heading.contact_office_title_en || FALLBACK_HEADING.contact_office_title_en)}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                      {isHindi ? (heading.contact_office_desc_hn || FALLBACK_HEADING.contact_office_desc_hn) : (heading.contact_office_desc_en || FALLBACK_HEADING.contact_office_desc_en)}
                    </div>
                  </div>
                </div>

                {/* Emails Address Card */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#631012] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {isHindi ? (heading.contact_email_title_hn || FALLBACK_HEADING.contact_email_title_hn) : (heading.contact_email_title_en || FALLBACK_HEADING.contact_email_title_en)}
                    </div>
                    {((isHindi ? heading.contact_email_desc_hn : heading.contact_email_desc_en) || '').split('\n').filter((e: string) => e.trim()).map((email: string, idx: number) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <br />}
                        <a href={`mailto:${email.trim()}`} className="text-sm text-[#631012] hover:underline font-normal">
                          {email.trim()}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Phones Address Card */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#631012] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {isHindi ? (heading.contact_phone_title_hn || FALLBACK_HEADING.contact_phone_title_hn) : (heading.contact_phone_title_en || FALLBACK_HEADING.contact_phone_title_en)}
                    </div>
                    {((isHindi ? heading.contact_phone_desc_hn : heading.contact_phone_desc_en) || '').split('\n').filter((e: string) => e.trim()).map((phone: string, idx: number) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <br />}
                        <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-sm text-[#631012] hover:underline font-normal">
                          {phone.trim()}
                        </a>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Hours Card */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#631012] text-white flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      {isHindi ? (heading.contact_hours_title_hn || FALLBACK_HEADING.contact_hours_title_hn) : (heading.contact_hours_title_en || FALLBACK_HEADING.contact_hours_title_en)}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed font-normal whitespace-pre-line">
                      {isHindi ? (heading.contact_hours_desc_hn || FALLBACK_HEADING.contact_hours_desc_hn) : (heading.contact_hours_desc_en || FALLBACK_HEADING.contact_hours_desc_en)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
