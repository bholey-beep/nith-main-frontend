'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

interface MagazineHeading {
  institute_title_en: string;
  institute_title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  institute_content_en: string;
  institute_content_hn: string;
  srijan_title_en: string;
  srijan_title_hn: string;
  srijan_content_en: string;
  srijan_content_hn: string;
  archive_title_en: string;
  archive_title_hn: string;
  archive_desc_en: string;
  archive_desc_hn: string;
  latest_issue_url: string;
  contact_url: string;
}

interface ArchiveItem {
  id?: number;
  title_en: string;
  title_hn: string;
  download_url: string;
  view_url: string;
}

const DEFAULT_HEADING: MagazineHeading = {
  institute_title_en: 'Institute Magazine',
  institute_title_hn: 'संस्थान पत्रिका',
  sub_title_en: 'SRIJAN — the official annual cultural magazine of the institute.',
  sub_title_hn: 'सृजन — संस्थान की आधिकारिक वार्षिक सांस्कृतिक पत्रिका।',
  institute_content_en: 'The institute publishes an annual cultural magazine that showcases creative works from students across departments, including articles, poems, photographs and artwork.',
  institute_content_hn: 'संस्थान एक वार्षिक सांस्कृतिक पत्रिका प्रकाशित करता है जो विभागों में छात्रों के रचनात्मक कार्यों को प्रदर्शित करती है, जिसमें लेख, कविताएं, तस्वीरें और कलाकृतियां शामिल हैं।',
  srijan_title_en: 'Srijan',
  srijan_title_hn: 'सृजन',
  srijan_content_en: `There are certain corners in this universe, where big black holes disorient light, absorbing from it every speck of direction that it was born with; yet there are others where tiny strokes of running ink are capable of evoking emotion. We, at SRIJAN, prosper in the latter. Digging deep into hearts and helming higher into brains, we assemble facts and fiction, amuse and ruse, from haphazard thoughts into a compilation of shiny sheets. SRIJAN is the official annual cultural magazine of the institute.

Looking at it from a distance, the readers get glimpses of the year-around happenings in the college, set amid pieces of art by writers, painters, hotographers and whatnots in the college; up close, the magazine spells to the reader another universe of creativity. All the events and proceedings, activities by various teams and clubs, works carried on in the different departments are accounted. Artworks by creators make the most part of the magazine; they include handfuls of articles, beautiful poems, soulful photographs, paintings, sketches and digital arts.

Behind this compilation of about a couple of 100 pages, lays the hard-work of nights and days that is put together by Team SRIJAN. The team consists of editors, designers and the lately added members of the team the photographers. The team of editors is further split on the basis of language: Hindi and English. Moreover, all the factions consist of members from each year of study in the university. The editors handle the write-ups submitted: filter, edit, filter again, amend to make more reader-friendly, and proofread again. The designers hold the binding element to the magazine; they design each curve and each corner of what we finally have in the handbook.

We, at SRIJAN, welcome the talent to come and reach the surface, celebrate literature with fellow artists and rejoice in art that a stroke of ink can draw.`,
  srijan_content_hn: `इस ब्रह्मांड में कुछ ऐसे कोने हैं, जहां बड़े ब्लैक होल प्रकाश को दिशाहीन कर देते हैं, जिससे उसकी दिशा का हर अंश सोख लिया जाता है; फिर भी कुछ ऐसे भी हैं जहां स्याही के छोटे-छोटे स्ट्रोक भावनाओं को जगाने में सक्षम होते हैं। हम, सृजन में, बाद वाले में समृद्ध होते हैं। दिलों की गहराइयों में उतरकर और दिमागों को ऊंचाइयों पर ले जाकर, हम तथ्यों और कल्पनाओं को इकट्ठा करते हैं, मनोरंजन और युक्ति करते हैं, बेतरतीब विचारों से चमकदार पन्नों के संकलन में तब्दील करते हैं। सृजन संस्थान की आधिकारिक वार्षिक सांस्कृतिक पत्रिका है।

इसे दूर से देखने पर पाठकों को कॉलेज में साल भर होने वाली गतिविधियों की झलक मिलती है, जो कॉलेज में लेखकों, चित्रकारों, फोटोग्राफरों और अन्य कलाकारों की कलाकृतियों के बीच स्थापित होती है; करीब से देखने पर, यह पत्रिका पाठक को रचनात्मकता का एक और ब्रह्मांड दिखाती है। सभी कार्यक्रम और कार्यवाही, विभिन्न टीमों और क्लबों की गतिविधियाँ, विभिन्न विभागों में किए गए कार्यों का लेखा-जोखा इसमें होता है। रचनाकारों की कलाकृतियाँ पत्रिका का अधिकांश भाग बनाती हैं; इनमें लेख, सुंदर कविताएँ, भावपूर्ण तस्वीरें, पेंटिंग, रेखाचित्र और डिजिटल कला शामिल हैं।

लगभग 100 से अधिक पृष्ठों के इस संकलन के पीछे टीम सृजन द्वारा दिन-रात की गई कड़ी मेहनत है। टीम में संपादक, डिजाइनर और हाल ही में टीम में शामिल हुए फोटोग्राफर शामिल हैं। संपादकों की टीम को भाषा के आधार पर विभाजित किया गया है: हिंदी और अंग्रेजी। इसके अलावा, सभी गुटों में विश्वविद्यालय में अध्ययन के प्रत्येक वर्ष के सदस्य शामिल हैं। संपादक जमा की गई रचनाओं को संभालते हैं: फ़िल्टर करते हैं, संपादित करते हैं, फिर से फ़िल्टर करते हैं, अधिक पाठक-अनुकूल बनाने के लिए संशोधन करते हैं, और फिर से प्रूफरीड करते हैं। डिजाइनर पत्रिका के बाइंडिंग तत्व को संभालते हैं; वे हर वक्र और हर कोने को डिजाइन करते हैं जो अंततः हमारे पास हैंडबुक के रूप में होता है।

हम, सृजन में, प्रतिभा का सतह पर आने और पहुंचने का स्वागत करते हैं, साथी कलाकारों के साथ साहित्य का जश्न मनाते हैं और उस कला में आनंद लेते हैं जिसे स्याही का एक स्ट्रोक खींच सकता है।`,
  archive_title_en: 'Magazine Archive',
  archive_title_hn: 'पत्रिका संग्रह',
  archive_desc_en: 'List of past issues with download links.',
  archive_desc_hn: 'डाउनलोड लिंक के साथ पिछले अंकों की सूची।',
  latest_issue_url: '/student/publications/magazine',
  contact_url: '/student/publications/magazine'
};

const DEFAULT_ARCHIVE: ArchiveItem[] = [
  { title_en: 'SRIJAN 2023-24', title_hn: 'सृजन 2023-24', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2022', title_hn: 'सृजन 2022', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2021', title_hn: 'सृजन 2021', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2016', title_hn: 'सृजन 2016', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2015', title_hn: 'सृजन 2015', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2014', title_hn: 'सृजन 2014', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2013', title_hn: 'सृजन 2013', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
  { title_en: 'SRIJAN 2012', title_hn: 'सृजन 2012', download_url: '/student/publications/magazine', view_url: '/student/publications/magazine' },
];

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isEn = language === 'en';

  const [active, setActive] = useState<string>('institute');
  const [heading, setHeading] = useState<MagazineHeading>(DEFAULT_HEADING);
  const [archive, setArchive] = useState<ArchiveItem[]>(DEFAULT_ARCHIVE);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const getAttachmentUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${API_URL}${url}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const headRes = await fetch(`${API_URL}/api/student-magazine`, { cache: 'no-store' });
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeading({
              institute_title_en: hData.institute_title_en || DEFAULT_HEADING.institute_title_en,
              institute_title_hn: hData.institute_title_hn || DEFAULT_HEADING.institute_title_hn,
              sub_title_en: hData.sub_title_en || DEFAULT_HEADING.sub_title_en,
              sub_title_hn: hData.sub_title_hn || DEFAULT_HEADING.sub_title_hn,
              institute_content_en: hData.institute_content_en || DEFAULT_HEADING.institute_content_en,
              institute_content_hn: hData.institute_content_hn || DEFAULT_HEADING.institute_content_hn,
              srijan_title_en: hData.srijan_title_en || DEFAULT_HEADING.srijan_title_en,
              srijan_title_hn: hData.srijan_title_hn || DEFAULT_HEADING.srijan_title_hn,
              srijan_content_en: hData.srijan_content_en || DEFAULT_HEADING.srijan_content_en,
              srijan_content_hn: hData.srijan_content_hn || DEFAULT_HEADING.srijan_content_hn,
              archive_title_en: hData.archive_title_en || DEFAULT_HEADING.archive_title_en,
              archive_title_hn: hData.archive_title_hn || DEFAULT_HEADING.archive_title_hn,
              archive_desc_en: hData.archive_desc_en || DEFAULT_HEADING.archive_desc_en,
              archive_desc_hn: hData.archive_desc_hn || DEFAULT_HEADING.archive_desc_hn,
              latest_issue_url: hData.latest_issue_url || DEFAULT_HEADING.latest_issue_url,
              contact_url: hData.contact_url || DEFAULT_HEADING.contact_url
            });
          }
        }

        const archRes = await fetch(`${API_URL}/api/student-magazine/archive`, { cache: 'no-store' });
        if (archRes.ok) {
          const archData = await archRes.json();
          if (archData && archData.length > 0) {
            setArchive(archData);
          }
        }
      } catch (error) {
        console.error('Failed to load magazine data dynamically:', error);
      }
    };

    loadData();
  }, [API_URL]);

  const SECTIONS = [
    {
      key: 'institute',
      title: isEn ? heading.institute_title_en : heading.institute_title_hn,
      content: isEn ? heading.institute_content_en : heading.institute_content_hn,
    },
    {
      key: 'srijan',
      title: isEn ? heading.srijan_title_en : heading.srijan_title_hn,
      content: isEn ? heading.srijan_content_en : heading.srijan_content_hn,
    },
    {
      key: 'archive',
      title: isEn ? heading.archive_title_en : heading.archive_title_hn,
      content: isEn ? heading.archive_desc_en : heading.archive_desc_hn,
    },
  ];

  const current = SECTIONS.find((s) => s.key === active) ?? SECTIONS[0];

  return (
    <div className=" bg-gray-50  ">
      <div>
        <Header31 />
      </div>

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {isEn ? 'Home' : 'मुख्य पृष्ठ'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">{isEn ? 'Student' : 'छात्र'}</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">{isEn ? 'Magazine' : 'पत्रिका'}</span>
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
            {isEn ? heading.institute_title_en : heading.institute_title_hn}
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            {isEn ? heading.sub_title_en : heading.sub_title_hn}
          </p>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-72 bg-white rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {isEn ? 'Magazine' : 'पत्रिका'}
            </h3>
            <ul className="space-y-2">
              {SECTIONS.map((s) => (
                <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${active === s.key ? 'bg-[#800000] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Content panel */}
          <section className="flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {current.title}
              </h2>
              <div className="text-sm text-gray-500">
                {SECTIONS.findIndex((s) => s.key === current.key) + 1} /{' '}
                {SECTIONS.length}
              </div>
            </div>

            <div className="mt-4 prose prose-sm max-w-none text-gray-700">
              {current.key === 'srijan' ? (
                <div>
                  {current.content.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              ) : current.key === 'archive' ? (
                <div>
                  <p className="mb-4">{current.content}</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse table-auto text-sm">
                      <thead>
                        <tr className="bg-gray-100 text-left">
                          <th className="px-4 py-2">{isEn ? 'Sl. No.' : 'क्र. सं.'}</th>
                          <th className="px-4 py-2">{isEn ? 'Title' : 'शीर्षक'}</th>
                          <th className="px-4 py-2">{isEn ? 'Actions' : 'कार्रवाई'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {archive.map((item, idx) => (
                          <tr key={item.id || idx} className="border-b">
                            <td className="px-4 py-3 align-top">{idx + 1}</td>
                            <td className="px-4 py-3 align-top">
                              {isEn ? item.title_en : item.title_hn}
                            </td>
                            <td className="px-4 py-3 align-top">
                              <div className="flex gap-2">
                                <a
                                  href={getAttachmentUrl(item.view_url)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#800000] text-white rounded-md text-sm hover:bg-[#6a0000]"
                                >
                                  {isEn ? 'View' : 'देखें'}
                                </a>
                                <a
                                  href={getAttachmentUrl(item.download_url)}
                                  download
                                  className="inline-flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {isEn ? 'Download' : 'डाउनलोड'}
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p>{current.content}</p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={getAttachmentUrl(heading.latest_issue_url)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#800000] text-white rounded-md text-sm hover:bg-[#6a0000]"
              >
                {isEn ? 'View Latest Issue' : 'नवीनतम अंक देखें'}
              </a>
              <a
                href={getAttachmentUrl(heading.contact_url)}
                className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                {isEn ? 'Contact Editorial Team' : 'संपादकीय टीम से संपर्क करें'}
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
