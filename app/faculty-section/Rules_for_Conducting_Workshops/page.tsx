'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, FileText, Download, ExternalLink, Loader2 } from 'lucide-react';

interface WorkshopFormat {
  id: number;
  sl_no: string;
  form_type_en: string;
  form_type_hn: string;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  pdf_url: string;
  word_url: string;
}

interface WorkshopNotice {
  id: number;
  sl_no: string;
  title_en: string;
  title_hn: string;
  description_en: string;
  description_hn: string;
  remarks_en: string;
  remarks_hn: string;
  date_en: string;
  date_hn: string;
  pdf_url: string;
  word_url: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Conference/Workshop/FDP/STC Rules Formats',
  title_hn: 'सम्मेलन/कार्यशाला/एफडीपी/एसटीसी नियम प्रारूप',
  sub_title_en: 'Download Rules For Organizing Conference (International/ National), Workshop/Faculty Development Programme/Short Term Course, Expert Lectures',
  sub_title_hn: 'सम्मेलन (अंतर्राष्ट्रीय/राष्ट्रीय), कार्यशाला/संकाय विकास कार्यक्रम/अल्पकालिक पाठ्यक्रम, विशेषज्ञ व्याख्यान आयोजित करने के लिए नियम प्रारूप डाउनलोड करें',
};

const FALLBACK_FORMATS: WorkshopFormat[] = [
  {
    id: 1,
    sl_no: '1',
    form_type_en: 'Form 1',
    form_type_hn: 'प्रारूप 1',
    title_en: 'Format for submitting proposal for organising Conferences. (International/National)',
    title_hn: 'सम्मेलन आयोजित करने के लिए प्रस्ताव प्रस्तुत करने का प्रारूप (अंतर्राष्ट्रीय/राष्ट्रीय)',
    description_en: 'Format for submitting proposal for organising Conferences. (International/National)',
    description_hn: 'सम्मेलन आयोजित करने के लिए प्रस्ताव प्रस्तुत करने का प्रारूप',
    pdf_url: 'https://nith.ac.in/uploads/topics/Form1.pdf',
    word_url: 'https://nith.ac.in/uploads/topics/Form1.docx',
  },
  {
    id: 2,
    sl_no: '2',
    form_type_en: 'Form 2',
    form_type_hn: 'प्रारूप 2',
    title_en: 'Format for Submitting proposal for organising FDP/STCs (Minimum 5Days)',
    title_hn: 'एफडीपी/एसटीसी आयोजित करने के लिए प्रस्ताव प्रस्तुत करने का प्रारूप (न्यूनतम 5 दिन)',
    description_en: 'Format for Submitting proposal for organising FDP/STCs (Minimum 5Days)',
    description_hn: 'एफडीपी/एसटीसी आयोजित करने के लिए प्रस्ताव प्रस्तुत करने का प्रारूप',
    pdf_url: 'https://nith.ac.in/uploads/topics/Form2.pdf',
    word_url: 'https://nith.ac.in/uploads/topics/Form2.docx',
  },
  {
    id: 3,
    sl_no: '3',
    form_type_en: 'Form 3',
    form_type_hn: 'प्रारूप 3',
    title_en: 'Format for submitting proposals for organizing Workshop (Short Duration < 5 days)',
    title_hn: 'कार्यशाला आयोजित करने के लिए प्रस्ताव प्रस्तुत करने का प्रारूप (अल्प अवधि < 5 दिन)',
    description_en: 'Format for submitting proposals for organizing Workshop (Short Duration < 5 days)',
    description_hn: 'कार्यशाला आयोजित करने के लिए प्रस्ताव प्रस्तुत करने का प्रारूप',
    pdf_url: 'https://nith.ac.in/uploads/topics/Form3.pdf',
    word_url: 'https://nith.ac.in/uploads/topics/Form3.docx',
  },
];

const FALLBACK_NOTICES: WorkshopNotice[] = [
  {
    id: 1,
    sl_no: '1',
    title_en: 'Rules for self-sponsored Programme at NIT Hamirpur (HP)',
    title_hn: 'एनआईटी हमीरपुर में स्व-प्रायोजित कार्यक्रम के नियम',
    description_en: 'Rules for self-sponsored Programme at NIT Hamirpur (HP)',
    description_hn: 'एनआईटी हमीरपुर में स्व-प्रायोजित कार्यक्रम के नियम',
    remarks_en: 'Dean (Faculty Welfare) , NIT Hamirpur (HP)',
    remarks_hn: 'डीन (संकाय कल्याण), एनआईटी हमीरपुर (हि.प्र.)',
    date_en: '02-11-2021',
    date_hn: '02-11-2021',
    pdf_url: 'https://nith.ac.in/uploads/topics/16358362635956.pdf',
    word_url: '#',
  },
  {
    id: 2,
    sl_no: '2',
    title_en: 'Notice regarding FDP/e-FDP, STC/e-STC, Workshop/e-Workshop, Seminar/e-Seminar etc.',
    title_hn: 'एफडीपी/ई-एफडीपी, एसटीसी/ई-एसटीसी, कार्यशाला/ई-कार्यशाला, संगोष्ठी/ई-संगोष्ठी आदि के संबंध में सूचना।',
    description_en: 'Notice regarding FDP/e-FDP, STC/e-STC, Workshop/e-Workshop, Seminar/e-Seminar etc.',
    description_hn: 'एफडीपी/ई-एफडीपी, एसटीसी/ई-एसटीसी, कार्यशाला आदि के संबंध में सूचना',
    remarks_en: 'Dean (Faculty Welfare) , NIT Hamirpur (HP)',
    remarks_hn: 'डीन (संकाय कल्याण), एनआईटी हमीरपुर (हि.प्र.)',
    date_en: '17-09-2021',
    date_hn: '17-09-2021',
    pdf_url: 'https://nith.ac.in/uploads/topics/16318683515822.pdf',
    word_url: '#',
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function RulesConductingWorkshopsPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [formats, setFormats] = useState<WorkshopFormat[]>(FALLBACK_FORMATS);
  const [notices, setNotices] = useState<WorkshopNotice[]>(FALLBACK_NOTICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Heading
        const hRes = await fetch(`${API_BASE}/api/faculty-workshop`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Formats
        const fRes = await fetch(`${API_BASE}/api/faculty-workshop/list`, { cache: 'no-store' });
        if (fRes.ok) {
          const fData = await fRes.json();
          if (!cancelled && Array.isArray(fData) && fData.length > 0) setFormats(fData);
        }

        // Notices
        const nRes = await fetch(`${API_BASE}/api/faculty-workshop/notices`, { cache: 'no-store' });
        if (nRes.ok) {
          const nData = await nRes.json();
          if (!cancelled && Array.isArray(nData) && nData.length > 0) setNotices(nData);
        }
      } catch (err) {
        console.error('Error fetching workshop rules:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'संकाय अनुभाग' : 'Faculty Section'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'कार्यशाला नियम' : 'Rules for Conducting Workshops'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Page Title (Centered as in Screenshot) */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#631012] tracking-tight">
            {isHindi ? heading.title_hn || heading.title_en : heading.title_en}
          </h1>
          {heading.sub_title_en && (
            <p className="text-xs sm:text-sm text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed">
              {isHindi ? heading.sub_title_hn || heading.sub_title_en : heading.sub_title_en}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading workshop rules and notices...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Table 1: Rules Formats */}
            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                      <th className="py-3.5 px-4 border-r border-[#7a1a1d] w-16 text-center">
                        Sl. No.
                      </th>
                      <th className="py-3.5 px-6 border-r border-[#7a1a1d] w-32 text-center">
                        {isHindi ? 'प्रारूप प्रकार' : 'Form Type'}
                      </th>
                      <th className="py-3.5 px-6 border-r border-[#7a1a1d]">
                        {isHindi ? 'विवरण' : 'Description'}
                      </th>
                      <th className="py-3.5 px-6 w-36 text-center">
                        {isHindi ? 'डाउनलोड' : 'Download'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-800">
                    {formats.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-red-50/30 transition-colors">
                        <td className="py-4 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200 align-middle">
                          {item.sl_no || index + 1}
                        </td>
                        <td className="py-4 px-6 text-center font-mono font-bold text-gray-800 border-r border-gray-200 align-middle whitespace-nowrap">
                          {isHindi ? item.form_type_hn || item.form_type_en : item.form_type_en}
                        </td>
                        <td className="py-4 px-6 border-r border-gray-200 align-middle font-medium text-gray-900 leading-snug">
                          {isHindi ? item.title_hn || item.description_hn || item.title_en || item.description_en : item.title_en || item.description_en}
                        </td>
                        <td className="py-4 px-6 text-center align-middle whitespace-nowrap">
                          <div className="inline-flex items-center gap-2 font-mono font-bold text-xs">
                            {item.pdf_url && item.pdf_url !== '#' ? (
                              <a
                                href={item.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#631012] hover:text-[#500c0e] hover:underline"
                              >
                                PDF
                              </a>
                            ) : (
                              <span className="text-gray-400">PDF</span>
                            )}
                            <span className="text-gray-300">|</span>
                            {item.word_url && item.word_url !== '#' ? (
                              <a
                                href={item.word_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:text-blue-900 hover:underline"
                              >
                                Word
                              </a>
                            ) : (
                              <span className="text-gray-400">Word</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 2: Notices/Office Orders/Notifications */}
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg sm:text-xl font-bold text-[#631012] tracking-tight">
                  {isHindi ? 'सूचनाएं / कार्यालय आदेश / अधिसूचनाएं' : 'Notices/Office Orders/Notifications'}
                </h2>
              </div>

              <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                        <th className="py-3.5 px-4 border-r border-[#7a1a1d] w-16 text-center">
                          Sl. No.
                        </th>
                        <th className="py-3.5 px-6 border-r border-[#7a1a1d]">
                          {isHindi ? 'विवरण' : 'Particulars'}
                        </th>
                        <th className="py-3.5 px-6 border-r border-[#7a1a1d] w-72">
                          {isHindi ? 'टिप्पणी' : 'Remarks (if any)'}
                        </th>
                        <th className="py-3.5 px-6 w-36 text-center">
                          {isHindi ? 'अपलोड तिथि' : 'Date of Upload'}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-800">
                      {notices.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-red-50/30 transition-colors">
                          <td className="py-4 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200 align-middle">
                            {item.sl_no || index + 1}
                          </td>
                          <td className="py-4 px-6 border-r border-gray-200 align-middle font-medium">
                            {item.pdf_url && item.pdf_url !== '#' ? (
                              <a
                                href={item.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#631012] hover:text-[#500c0e] hover:underline inline-flex items-center gap-1.5"
                              >
                                <span>{isHindi ? item.title_hn || item.title_en : item.title_en}</span>
                                <ExternalLink size={12} className="text-[#631012]/60" />
                              </a>
                            ) : (
                              <span className="text-gray-900">{isHindi ? item.title_hn || item.title_en : item.title_en}</span>
                            )}
                          </td>
                          <td className="py-4 px-6 border-r border-gray-200 align-middle text-gray-700 text-xs sm:text-sm">
                            {isHindi ? item.remarks_hn || item.remarks_en || '--' : item.remarks_en || '--'}
                          </td>
                          <td className="py-4 px-6 text-center font-mono font-semibold text-gray-800 border-gray-200 align-middle whitespace-nowrap text-xs sm:text-sm">
                            {isHindi ? item.date_hn || item.date_en || '--' : item.date_en || '--'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
