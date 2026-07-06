'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

interface Functionary {
  id: number;
  category_en: string;
  category_hn: string;
  name_en: string;
  name_hn: string;
  responsibility_en: string;
  responsibility_hn: string;
  phone: string;
  mobile: string;
  email: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Student Welfare Functionaries',
  title_hn: 'छात्र कल्याण पदाधिकारी',
  sub_title_en: 'Contact details and responsibilities of student welfare functionaries',
  sub_title_hn: 'छात्र कल्याण पदाधिकारियों के संपर्क विवरण और जिम्मेदारियाँ',
};

// Fallbacks matching static data bilingually
const FALLBACK_LIST: Functionary[] = [
  // Dean & Senior Functionaries
  {
    id: 1,
    category_en: "Dean & Senior Functionaries",
    category_hn: "डीन और वरिष्ठ पदाधिकारी",
    name_en: "Prof. Y. D. Sharma, DoMSC",
    name_hn: "प्रो. वाई. डी. शर्मा, गणित और वैज्ञानिक संगणना विभाग",
    responsibility_en: "Dean (SW)",
    responsibility_hn: "डीन (छात्र कल्याण)",
    phone: "254326",
    mobile: "9418153838",
    email: "dsw@nith.ac.in, yds@nith.ac.in"
  },
  {
    id: 2,
    category_en: "Dean & Senior Functionaries",
    category_hn: "डीन और वरिष्ठ पदाधिकारी",
    name_en: "Dr. Pardeep Singh, DoCSE",
    name_hn: "डॉ. प्रदीप सिंह, कंप्यूटर विज्ञान और इंजीनियरिंग विभाग",
    responsibility_en: "Associate Dean (SA&S)",
    responsibility_hn: "एसोसिएट डीन (छात्र गतिविधियां और खेल)",
    phone: "254436",
    mobile: "9459458759",
    email: "ad_sas@nith.ac.in, pardeep@nith.ac.in"
  },
  {
    id: 3,
    category_en: "Dean & Senior Functionaries",
    category_hn: "डीन और वरिष्ठ पदाधिकारी",
    name_en: "Dr. Sunil Sharma, DoCE",
    name_hn: "डॉ. सुनील शर्मा, सिविल इंजीनियरिंग विभाग",
    responsibility_en: "Associate Dean (SD&C)",
    responsibility_hn: "एसोसिएट डीन (छात्र अनुशासन और परामर्श)",
    phone: "254316",
    mobile: "9459117100",
    email: "sunils@nith.ac.in"
  },
  {
    id: 4,
    category_en: "Dean & Senior Functionaries",
    category_hn: "डीन और वरिष्ठ पदाधिकारी",
    name_en: "Dr. Subit Kumar Jain",
    name_hn: "डॉ. सुबित कुमार जैन",
    responsibility_en: "FI (Student Welfare Scheme)",
    responsibility_hn: "संकाय प्रभारी (छात्र कल्याण योजना)",
    phone: "254101",
    mobile: "9218226102",
    email: "jain.subit@nith.ac.in"
  },
  {
    id: 5,
    category_en: "Dean & Senior Functionaries",
    category_hn: "डीन और वरिष्ठ पदाधिकारी",
    name_en: "Dr. Kuldeep Kr. Sharma, DoPPS",
    name_hn: "डॉ. कुलदीप कुमार शर्मा, भौतिक और फोटोनिक्स विज्ञान विभाग",
    responsibility_en: "Chief Warden (Hostels)",
    responsibility_hn: "मुख्य वार्डन (छात्रावास)",
    phone: "254850",
    mobile: "9418780275",
    email: "cw@nith.ac.in"
  },

  // Nodal Officers
  {
    id: 6,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Sandeep Sharma, DoCHE",
    name_hn: "डॉ. संदीप शर्मा, रासायनिक इंजीनियरिंग विभाग",
    responsibility_en: "Swachh Bharat Abhiyan",
    responsibility_hn: "स्वच्छ भारत अभियान",
    phone: "254924",
    mobile: "9418000416",
    email: "sandeep@nith.ac.in"
  },
  {
    id: 7,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Gargi Khanna, DoECE",
    name_hn: "डॉ. गार्गी खन्ना, इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग विभाग",
    responsibility_en: "MeitY-Scholarship",
    responsibility_hn: "इलेक्ट्रॉनिक्स और सूचना प्रौद्योगिकी मंत्रालय छात्रवृत्ति",
    phone: "254634",
    mobile: "98058 70101",
    email: "krishan_rathod@nith.ac.in"
  },
  {
    id: 8,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Neetu Kapoor, DoARCH",
    name_hn: "डॉ. नीतू कपूर, वास्तुकला विभाग",
    responsibility_en: "Institute Magazine & News Bulletin",
    responsibility_hn: "संस्थान पत्रिका और समाचार बुलेटिन",
    phone: "254930",
    mobile: "7018302021",
    email: "neetu@nith.ac.in"
  },
  {
    id: 9,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Arun Kumar Yadav, DoCSE",
    name_hn: "डॉ. अरुण कुमार यादव, कंप्यूटर विज्ञान और इंजीनियरिंग विभाग",
    responsibility_en: "Equal Opportunity Cell",
    responsibility_hn: "समान अवसर प्रकोष्ठ",
    phone: "254402",
    mobile: "8076374837",
    email: "ayadav@nith.ac.in"
  },
  {
    id: 10,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Mani Verma, SMO",
    name_hn: "डॉ. मणि वर्मा, वरिष्ठ चिकित्सा अधिकारी",
    responsibility_en: "Red Ribbon Club",
    responsibility_hn: "रेड रिबन क्लब",
    phone: "254690",
    mobile: "7018806030",
    email: "doctor@nith.ac.in"
  },
  {
    id: 11,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Arun Kumar Yadav, DoCSE",
    name_hn: "डॉ. अरुण कुमार यादव, कंप्यूटर विज्ञान और इंजीनियरिंग विभाग",
    responsibility_en: "Liaison O/NO Visually Challenged PwD",
    responsibility_hn: "संपर्क अधिकारी/नोडल अधिकारी (दृष्टिबाधित और दिव्यांग)",
    phone: "254402",
    mobile: "8076374837",
    email: "ayadav@nith.ac.in"
  },
  {
    id: 12,
    category_en: "Nodal Officers",
    category_hn: "नोडल अधिकारी",
    name_en: "Dr. Ajoy Debberma, DoME",
    name_hn: "डॉ. अजय देबबर्मा, मैकेनिकल इंजीनियरिंग विभाग",
    responsibility_en: "Jan Jatiya Gaurav Diwas (JJGD)",
    responsibility_hn: "जन जातीय गौरव दिवस",
    phone: "254702",
    mobile: "9402153595",
    email: "--"
  },

  // Staff
  {
    id: 50,
    category_en: "Staff",
    category_hn: "कर्मचारी",
    name_en: "Sh. Raj Kumar",
    name_hn: "श्री राज कुमार",
    responsibility_en: "Sr. Assistant",
    responsibility_hn: "वरिष्ठ सहायक",
    phone: "254084",
    mobile: "--",
    email: "rkverma@nith.ac.in"
  },
  {
    id: 51,
    category_en: "Staff",
    category_hn: "कर्मचारी",
    name_en: "Sh. Ravi Das",
    name_hn: "श्री रवि दास",
    responsibility_en: "Junior Assistant",
    responsibility_hn: "कनिष्ठ सहायक",
    phone: "254084",
    mobile: "--",
    email: "ravidasa@nith.ac.in"
  },
  {
    id: 52,
    category_en: "Staff",
    category_hn: "कर्मचारी",
    name_en: "Sh. Jiwan Kumar",
    name_hn: "श्री जीवन कुमार",
    responsibility_en: "Office Attendant SG-II",
    responsibility_hn: "कार्यालय परिचारक एसजी-II",
    phone: "--",
    mobile: "--",
    email: "--"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const CATEGORIES_MAPPING = [
  { en: "Dean & Senior Functionaries", hn: "डीन और वरिष्ठ पदाधिकारी" },
  { en: "Nodal Officers", hn: "नोडल अधिकारी" },
  { en: "Faculty In-Charge / Assistant Faculty In-Charge", hn: "संकाय प्रभारी / सहायक संकाय प्रभारी" },
  { en: "Staff", hn: "कर्मचारी" }
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [functionaries, setFunctionaries] = useState<Functionary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        
        // Fetch heading
        const headRes = await fetch(`${apiUrl}/api/student-functionaries`, { cache: 'no-store' });
        if (headRes.ok) {
          const headData = await headRes.json();
          if (headData.title_en) {
            setHeading(headData);
          }
        }

        // Fetch list
        const listRes = await fetch(`${apiUrl}/api/student-functionaries/list`, { cache: 'no-store' });
        if (listRes.ok) {
          const listData = await listRes.json();
          if (Array.isArray(listData) && listData.length > 0) {
            setFunctionaries(listData);
          } else {
            setFunctionaries(FALLBACK_LIST);
          }
        } else {
          setFunctionaries(FALLBACK_LIST);
        }
      } catch (err) {
        console.error('Error fetching student functionaries:', err);
        setFunctionaries(FALLBACK_LIST);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <Header31 />
        <div className="min-h-screen bg-white flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#800000]"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumbs Navigation */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">{isHindi ? 'छात्र' : 'Student'}</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {isHindi ? 'छात्र कल्याण पदाधिकारी' : 'Student Welfare Functionaries'}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase">
            {isHindi ? heading.title_hn : heading.title_en}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isHindi ? heading.sub_title_hn : heading.sub_title_en}
          </p>
        </motion.div>
      </section>

      {/* Main Tables Grid */}
      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {CATEGORIES_MAPPING.map((catGroup, catIdx) => {
          const groupEntries = functionaries.filter(f => f.category_en === catGroup.en);
          if (groupEntries.length === 0) return null;

          return (
            <motion.section 
              key={catGroup.en}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-150 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
                {isHindi ? catGroup.hn : catGroup.en}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left table-fixed border-collapse">
                  <colgroup>
                    <col style={{ width: '8%' }} />
                    <col style={{ width: '28%' }} />
                    <col style={{ width: '32%' }} />
                    <col style={{ width: '12%' }} />
                    <col style={{ width: '20%' }} />
                  </colgroup>
                  <thead>
                    <tr className="text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100">
                      <th className="py-3 pr-4">{isHindi ? 'क्रमांक' : 'Sl. No.'}</th>
                      <th className="py-3 pr-4">{isHindi ? 'नाम' : 'Name'}</th>
                      <th className="py-3 pr-4">{isHindi ? 'दायित्व' : 'Responsibility'}</th>
                      <th className="py-3 pr-4">{isHindi ? 'दूरभाष (विस्तार)' : 'Phone No.'}</th>
                      <th className="py-3 pr-4">{isHindi ? 'मोबाइल / ईमेल' : 'Mobile No. / Email'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {groupEntries.map((r, i) => (
                      <tr key={r.id} className="hover:bg-gray-55/40 transition-colors">
                        <td className="py-4 text-gray-500 font-semibold">{i + 1}</td>
                        <td className="py-4 text-gray-900 font-bold">{isHindi ? r.name_hn : r.name_en}</td>
                        <td className="py-4 text-gray-700 font-medium">{isHindi ? r.responsibility_hn : r.responsibility_en}</td>
                        <td className="py-4 text-gray-600 font-semibold">{r.phone && r.phone !== '--' ? r.phone : '—'}</td>
                        <td className="py-4 text-sm text-gray-600 font-medium">
                          {r.mobile && r.mobile !== '--' && (
                            <span className="block text-gray-900 font-semibold mb-1">{r.mobile}</span>
                          )}
                          {r.email && r.email !== '--' ? (
                            <div className="flex flex-col gap-0.5">
                              {r.email.split(',').map((emailStr, idx) => {
                                const cleanEmail = emailStr.trim();
                                return (
                                  <a 
                                    key={idx} 
                                    href={`mailto:${cleanEmail}`} 
                                    className="text-[#800000] hover:underline hover:text-[#a00000] transition-colors break-all"
                                  >
                                    {cleanEmail}
                                  </a>
                                );
                              })}
                            </div>
                          ) : (
                            <span>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          );
        })}
      </main>

      <Footer />
    </div>
  );
}
