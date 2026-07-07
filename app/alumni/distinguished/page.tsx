'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface DistinguishedAlumniData {
  id: number;
  name_en: string;
  name_hn: string;
  batch_en: string;
  batch_hn: string;
  photo: string;
  achievement_en: string;
  achievement_hn: string;
  department_en?: string;
  department_hn?: string;
  linkedin?: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Distinguished Alumni of NITH',
  title_hn: 'एनआईटी हमीरपुर के विशिष्ट पूर्व छात्र',
  sub_title_en: 'Celebrating the achievements and contributions of our distinguished alumni who have made remarkable impact in their respective fields.',
  sub_title_hn: 'हमारे विशिष्ट पूर्व छात्रों की उपलब्धियों और योगदान का जश्न मनाते हुए जिन्होंने अपने संबंधित क्षेत्रों में उल्लेखनीय प्रभाव डाला है।'
};

const FALLBACK_ALUMNI: DistinguishedAlumniData[] = [
  {
    id: 1,
    name_en: 'Dr. Rajesh Sharma',
    name_hn: 'डॉ. राजेश शर्मा',
    batch_en: 'B.Tech CSE 1992',
    batch_hn: 'बी.टेक सीएसई 1992',
    photo: '/alumni/placeholder.png',
    achievement_en: 'CEO & Founder, TechVentures India | Former Director at Google',
    achievement_hn: 'सीईओ और संस्थापक, टेकवेंचर्स इंडिया | गूगल में पूर्व निदेशक',
    department_en: 'Computer Science & Engineering',
    department_hn: 'कंप्यूटर विज्ञान और इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 2,
    name_en: 'Ms. Priya Mehta',
    name_hn: 'सुश्री प्रिया मेहता',
    batch_en: 'B.Tech ECE 1995',
    batch_hn: 'बी.टेक ईसीई 1995',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Vice President, Microsoft Research | AI Pioneer',
    achievement_hn: 'उपाध्यक्ष, माइक्रोसॉफ्ट रिसर्च | एआई पायनियर',
    department_en: 'Electronics & Communication Engineering',
    department_hn: 'इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 3,
    name_en: 'Mr. Amit Kumar Singh',
    name_hn: 'श्री अमित कुमार सिंह',
    batch_en: 'B.Tech ME 1998',
    batch_hn: 'बी.टेक एमई 1998',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Managing Director, Tata Motors | Automotive Industry Leader',
    achievement_hn: 'प्रबंध निदेशक, टाटा मोटर्स | ऑटोमोटिव उद्योग के नेता',
    department_en: 'Mechanical Engineering',
    department_hn: 'मैकेनिकल इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 4,
    name_en: 'Dr. Sunita Verma',
    name_hn: 'डॉ. सुनीता वर्मा',
    batch_en: 'M.Tech EE 2000',
    batch_hn: 'एम.टेक ईई 2000',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Chief Scientist, ISRO | Padma Shri Awardee',
    achievement_hn: 'मुख्य वैज्ञानिक, इसरो | पद्म श्री पुरस्कार विजेता',
    department_en: 'Electrical Engineering',
    department_hn: 'इलेक्ट्रिकल इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 5,
    name_en: 'Mr. Vikram Joshi',
    name_hn: 'श्री विक्रम जोशी',
    batch_en: 'B.Tech CE 2002',
    batch_hn: 'बी.टेक सीई 2002',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Founder & CEO, BuildTech Solutions | Forbes 30 Under 30',
    achievement_hn: 'संस्थापक और सीईओ, बिल्डटेक सॉल्यूशंस | फोर्ब्स 30 अंडर 30',
    department_en: 'Civil Engineering',
    department_hn: 'सिविल इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 6,
    name_en: 'Dr. Ananya Reddy',
    name_hn: 'डॉ. अनन्या रेड्डी',
    batch_en: 'B.Tech CSE 2005',
    batch_hn: 'बी.टेक सीएसई 2005',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Professor, Stanford University | ACM Fellow',
    achievement_hn: 'प्रोफेसर, स्टैनफोर्ड यूनिवर्सिटी | एसीएम फेलो',
    department_en: 'Computer Science & Engineering',
    department_hn: 'कंप्यूटर विज्ञान और इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 7,
    name_en: 'Mr. Karan Malhotra',
    name_hn: 'श्री करण मल्होत्रा',
    batch_en: 'B.Tech ECE 2008',
    batch_hn: 'बी.टेक ईसीई 2008',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Co-founder, FinTech Unicorn PayEasy | Angel Investor',
    achievement_hn: 'सह-संस्थापक, फिनटेक यूनिकॉर्न पेईज़ी | एंजेल निवेशक',
    department_en: 'Electronics & Communication Engineering',
    department_hn: 'इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 8,
    name_en: 'Ms. Deepika Nair',
    name_hn: 'सुश्री दीपिका नायर',
    batch_en: 'M.Tech CSE 2010',
    batch_hn: 'एम.टेक सीएसई 2010',
    photo: '/alumni/placeholder.png',
    achievement_en: 'Director of Engineering, Amazon Web Services',
    achievement_hn: 'इंजीनियरिंग निदेशक, अमेज़ॅन वेब सर्विसेज',
    department_en: 'Computer Science & Engineering',
    department_hn: 'कंप्यूटर विज्ञान और इंजीनियरिंग',
    linkedin: 'https://linkedin.com',
  },
];

const TableRowSkeleton = () => (
  <div className="animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="flex items-center gap-4 py-5 px-6 border-b border-gray-100"
      >
        <div className="h-4 bg-gray-200 rounded w-8"></div>
        <div className="h-20 w-20 bg-gray-200 rounded-xl"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    ))}
  </div>
);

const CardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col items-center text-center mb-4">
          <div className="h-24 w-24 bg-gray-200 rounded-xl mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-full"></div>
      </div>
    ))}
  </div>
);

const EmptyState = ({ isHindi }: { isHindi: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
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
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      {isHindi ? 'कोई रिकॉर्ड उपलब्ध नहीं है' : 'No Records Available'}
    </h3>
    <p className="text-gray-500 max-w-md mx-auto">
      {isHindi
        ? 'डेटाबेस में विशिष्ट पूर्व छात्रों के रिकॉर्ड जोड़े जाने के बाद वे यहां दिखाई देंगे।'
        : 'Distinguished alumni records will be displayed here once they are added to the database.'}
    </p>
  </motion.div>
);

const AlumniPhoto = ({ src, name }: { src: string; name: string }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="relative w-20 h-20 rounded-xl overflow-hidden ring-2 ring-gray-100 bg-gray-100">
        <Image
          src="/alumni/placeholder.png"
          alt={`Photo of ${name}`}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 rounded-xl overflow-hidden ring-2 ring-gray-100">
      <Image
        src={src}
        alt={`Photo of ${name}`}
        fill
        className="object-cover"
        onError={() => setImgError(true)}
        loading="lazy"
      />
    </div>
  );
};

const AlumniCard = ({
  alumni,
  index,
  viewProfileText,
  isHindi
}: {
  alumni: DistinguishedAlumniData;
  index: number;
  viewProfileText: string;
  isHindi: boolean;
}) => {
  const [imgError, setImgError] = useState(false);
  const name = isHindi ? alumni.name_hn : alumni.name_en;
  const batch = isHindi ? alumni.batch_hn : alumni.batch_en;
  const achievement = isHindi ? alumni.achievement_hn : alumni.achievement_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-3">
          <span className="absolute -top-2 -left-2 w-7 h-7 bg-[#631012] text-white text-xs font-medium rounded-lg flex items-center justify-center z-10">
            {index + 1}
          </span>
          <div className="relative w-24 h-24 rounded-xl overflow-hidden ring-2 ring-gray-100 bg-gray-100">
            <Image
              src={
                imgError || !alumni.photo
                  ? '/alumni/placeholder.png'
                  : alumni.photo
              }
              alt={`Photo of ${name}`}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          </div>
        </div>
        <h4 className="font-semibold text-gray-900 text-lg">{name}</h4>
        <span className="text-sm text-[#631012] font-medium">
          {batch}
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium block mb-1">
            {isHindi ? 'उपलब्धि / वर्तमान पद' : 'Achievement / Designation'}
          </span>
          <p className="text-sm text-gray-700">{achievement}</p>
        </div>

        {alumni.linkedin && (
          <a
            href={alumni.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-[#631012] hover:text-[#4a0c0e] transition-colors py-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            {viewProfileText}
          </a>
        )}
      </div>
    </motion.div>
  );
};

const StatsSection = ({ count, yearsText, alumniText }: { count: number; yearsText: string; alumniText: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.3 }}
    className="mt-12 bg-white rounded-2xl shadow-sm p-6 md:p-8"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-[#631012] mb-2">{count}</div>
        <div className="text-sm text-gray-600">{alumniText}</div>
      </div>
      <div className="text-center">
        <div className="text-4xl font-bold text-[#631012] mb-2">30+</div>
        <div className="text-sm text-gray-600">{yearsText}</div>
      </div>
    </div>
  </motion.div>
);

export default function DistinguishedAlumni() {
  const language = useSelector((state: RootState) => state.language.value) || 'en';
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [alumni, setAlumni] = useState<DistinguishedAlumniData[]>(FALLBACK_ALUMNI);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'serial' | 'name' | 'batch'>('serial');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 1. Fetch Header Details
        try {
          const hRes = await fetch('http://localhost:4000/api/alumni-distinguished');
          const hData = await hRes.json();
          if (hData && hData.title_en) {
            setHeading(hData);
          }
        } catch (hErr) {
          console.error('Fetch heading failed, using fallback:', hErr);
        }

        // 2. Fetch Alumni List Records
        try {
          const lRes = await fetch('http://localhost:4000/api/alumni-distinguished/list');
          const lData = await lRes.json();
          if (Array.isArray(lData) && lData.length > 0) {
            setAlumni(lData);
          }
        } catch (lErr) {
          console.error('Fetch alumni list failed, using fallback:', lErr);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching distinguished alumni:', err);
        setError(isHindi ? 'विशिष्ट पूर्व छात्रों का डेटा लोड करने में विफल' : 'Failed to load distinguished alumni data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isHindi]);

  const filteredAlumni = alumni
    .filter((a) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      const name = isHindi ? a.name_hn : a.name_en;
      const batch = isHindi ? a.batch_hn : a.batch_en;
      const achievement = isHindi ? a.achievement_hn : a.achievement_en;
      return (
        (name && name.toLowerCase().includes(query)) ||
        (batch && batch.toLowerCase().includes(query)) ||
        (achievement && achievement.toLowerCase().includes(query))
      );
    })
    .sort((a, b) => {
      const nameA = isHindi ? a.name_hn : a.name_en;
      const nameB = isHindi ? b.name_hn : b.name_en;
      const batchA = isHindi ? a.batch_hn : a.batch_en;
      const batchB = isHindi ? b.batch_hn : b.batch_en;
      switch (sortBy) {
        case 'name':
          return (nameA || '').localeCompare(nameB || '');
        case 'batch':
          return (batchA || '').localeCompare(batchB || '');
        default:
          return a.id - b.id;
      }
    });

  // Translation Dictionaries
  const textDict = {
    home: isHindi ? 'होम' : 'Home',
    alumni: isHindi ? 'पूर्व छात्र' : 'Alumni',
    pageTitle: isHindi ? 'विशिष्ट पूर्व छात्र' : 'Distinguished Alumni',
    searchPlaceholder: isHindi ? 'नाम, बैच, या उपलब्धि द्वारा खोजें...' : 'Search by name, batch, or achievement...',
    sortByText: isHindi ? 'द्वारा क्रमबद्ध करें:' : 'Sort by:',
    serialNo: isHindi ? 'क्र. सं.' : 'Serial Number',
    photo: isHindi ? 'चित्र' : 'Photo',
    name: isHindi ? 'नाम' : 'Name',
    batch: isHindi ? 'बैच' : 'Batch',
    achievement: isHindi ? 'उपलब्धि / वर्तमान पद' : 'Achievement / Current Designation',
    viewProfile: isHindi ? 'प्रोफ़ाइल देखें' : 'View Profile',
    yearsOfExcellence: isHindi ? 'उत्कृष्टता के वर्ष' : 'Years of Excellence',
    totalAlumni: isHindi ? 'विशिष्ट पूर्व छात्र' : 'Distinguished Alumni',
    knowDistinguished: isHindi ? 'क्या आप किसी विशिष्ट पूर्व छात्र को जानते हैं?' : 'Know a Distinguished Alumni?',
    knowDesc: isHindi 
      ? 'उत्कृष्ट पूर्व छात्रों को पहचानने में हमारी सहायता करें जिन्होंने अपने क्षेत्रों में महत्वपूर्ण योगदान दिया है। विशिष्ट पूर्व छात्र मान्यता के लिए नामांकन जमा करें।'
      : 'Help us recognize outstanding alumni who have made significant contributions in their respective fields. Submit nominations for distinguished alumni recognition.',
    nominateBtn: isHindi ? 'पूर्व छात्र का नामांकन करें' : 'Nominate an Alumni',
    clearSearch: isHindi ? 'खोज स्पष्ट करें' : 'Clear search',
    showingText: isHindi ? 'दिखा रहा है' : 'Showing',
    ofText: isHindi ? 'का' : 'of',
    tryAgain: isHindi ? 'पुनः प्रयास करें' : 'Try Again'
  };

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link
                href="/"
                className="hover:text-[#800000] transition-colors duration-200"
              >
                {textDict.home}
              </Link>
              <span>›</span>
              <span className="text-gray-400">{textDict.alumni}</span>
              <span>›</span>
              <span className="text-[#800000] font-medium">
                {textDict.pageTitle}
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

        {/* Content Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {!loading && !error && alumni.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-4 md:p-6 mb-8"
              >
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="relative w-full md:w-96">
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder={textDict.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#631012] focus:ring-2 focus:ring-[#631012]/20 outline-none transition-all text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">{textDict.sortByText}</span>
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value as 'serial' | 'name' | 'batch')
                      }
                      className="px-4 py-2 rounded-xl border border-gray-200 focus:border-[#631012] focus:ring-2 focus:ring-[#631012]/20 outline-none text-sm bg-white cursor-pointer"
                    >
                      <option value="serial">{isHindi ? 'क्रम संख्या' : 'Serial Number'}</option>
                      <option value="name">{isHindi ? 'नाम' : 'Name'}</option>
                      <option value="batch">{isHindi ? 'बैच' : 'Batch'}</option>
                    </select>
                  </div>
                </div>

                {searchQuery && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      {textDict.showingText} {filteredAlumni.length} {textDict.ofText} {alumni.length} {textDict.alumni}
                    </span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-[#631012] hover:underline"
                    >
                      {textDict.clearSearch}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-8"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-red-800 font-medium">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  {textDict.tryAgain}
                </button>
              </motion.div>
            )}

            {loading && (
              <>
                <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="px-6 md:px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <div className="h-6 bg-gray-200 rounded w-64 animate-pulse"></div>
                  </div>
                  <TableRowSkeleton />
                </div>
                {/* Mobile skeleton */}
                <div className="lg:hidden">
                  <CardSkeleton />
                </div>
              </>
            )}

            {!loading && !error && filteredAlumni.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <EmptyState isHindi={isHindi} />
              </div>
            )}

            {!loading && !error && filteredAlumni.length > 0 && (
              <>
                {/* Desktop Data Table view */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  <div className="px-6 md:px-8 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-3">
                      <span className="w-1.5 h-6 bg-[#631012] rounded-full"></span>
                      {isHindi ? 'हमारे विशिष्ट पूर्व छात्र' : 'Our Distinguished Alumni'}
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50/50">
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[6%]">
                            {textDict.serialNo}
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[8%]">
                            {textDict.photo}
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%]">
                            {textDict.name}
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[18%]">
                            {textDict.batch}
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-[48%]">
                            {textDict.achievement}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredAlumni.map((alumnus, index) => {
                          const name = isHindi ? alumnus.name_hn : alumnus.name_en;
                          const batch = isHindi ? alumnus.batch_hn : alumnus.batch_en;
                          const achievement = isHindi ? alumnus.achievement_hn : alumnus.achievement_en;

                          return (
                            <motion.tr
                              key={alumnus.id}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.03 }}
                              className="hover:bg-gray-50/80 transition-colors duration-200 group"
                            >
                              <td className="px-6 py-5 whitespace-nowrap">
                                <span className="text-sm font-medium text-gray-500">
                                  {index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                <AlumniPhoto
                                  src={alumnus.photo}
                                  name={name}
                                />
                              </td>
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900 group-hover:text-[#631012] transition-colors">
                                    {name}
                                  </span>
                                  {alumnus.linkedin && (
                                    <a
                                      href={alumnus.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-400 hover:text-[#0077b5] transition-colors"
                                      title="LinkedIn Profile"
                                    >
                                      <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                      </svg>
                                    </a>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#631012]/10 text-[#631012]">
                                  {batch}
                                </span>
                              </td>
                              <td className="px-6 py-5">
                                <p className="text-gray-600 leading-relaxed">
                                  {achievement}
                                </p>
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>

                {/* Mobile stacked Card view */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredAlumni.map((alumnus, index) => (
                    <AlumniCard
                      key={alumnus.id}
                      alumni={alumnus}
                      index={index}
                      viewProfileText={textDict.viewProfile}
                      isHindi={isHindi}
                    />
                  ))}
                </div>

                <StatsSection 
                  count={alumni.length} 
                  yearsText={textDict.yearsOfExcellence} 
                  alumniText={textDict.totalAlumni} 
                />
              </>
            )}

            {!loading && !error && alumni.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8 bg-gradient-to-r from-[#631012]/5 to-[#631012]/10 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#631012] flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
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
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {textDict.knowDistinguished}
                    </h4>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">
                      {textDict.knowDesc}
                    </p>
                    <Link
                      href="/alumni/registration"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#631012] text-white rounded-xl hover:bg-[#4a0c0e] transition-colors font-medium text-sm"
                    >
                      <span>{textDict.nominateBtn}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
