'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, CheckCircle2, Award, ShieldCheck, Loader2 } from 'lucide-react';

interface ActivitySubtext {
  id: number;
  heading_en: string;
  heading_hn: string;
  subheading_en: string;
  subheading_hn: string;
  small_text: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'ACTIVITIES',
  title_hn: 'गतिविधियां',
  sub_title_en: 'As per the schedule ‘C’ of NIT statutes the role and responsibilities of the Dean (Faculty Welfare) is to advice the Director in matters related to:',
  sub_title_hn: 'एनआईटी संविधियों की अनुसूची \'सी\' के अनुसार डीन (संकाय कल्याण) की भूमिका और जिम्मेदारियां निदेशक को निम्नलिखित से संबंधित मामलों में सलाह देना है:',
};

const FALLBACK_RESPONSIBILITIES: ActivitySubtext[] = [
  {
    id: 1,
    heading_en: 'Faculty Deputation under QIP',
    heading_hn: 'क्यूआईपी के तहत संकाय प्रतिनियुक्ति',
    subheading_en: 'Quality Improvement Programme',
    subheading_hn: 'गुणवत्ता सुधार कार्यक्रम',
    small_text: 'Deputation of faculty to various institutions under Quality Improvement Programme.'
  },
  {
    id: 2,
    heading_en: 'Conferences & Training Assignments',
    heading_hn: 'सम्मेलन एवं प्रशिक्षण कार्य',
    subheading_en: 'Conferences, Seminars & Foreign Assignments',
    subheading_hn: 'सम्मेलन, संगोष्ठियां एवं विदेशी कार्य',
    small_text: 'Advice the Director for deputation of the faculty members to various conferences, seminars, short-term courses, training programmes, foreign teaching/training assignments etc.'
  },
  {
    id: 3,
    heading_en: 'Paper Evaluation Committee',
    heading_hn: 'शोध पत्र मूल्यांकन समिति',
    subheading_en: 'Conference / Seminar Paper Review',
    subheading_hn: 'सम्मेलन / संगोष्ठी पेपर समीक्षा',
    small_text: 'Chair the committee meetings of the evaluation of papers submitted or to be submitted to the conferences / seminar by the faculty members.'
  },
  {
    id: 4,
    heading_en: 'Faculty Training Programmes',
    heading_hn: 'संकाय प्रशिक्षण कार्यक्रम',
    subheading_en: 'Professional Development Workshops',
    subheading_hn: 'व्यावसायिक विकास कार्यशालाएं',
    small_text: 'Assist the Director in organizing training programmes for faculty.'
  },
  {
    id: 5,
    heading_en: 'Campus Infrastructure & Maintenance',
    heading_hn: 'परिसर बुनियादी ढांचा एवं रखरखाव',
    subheading_en: 'Supervision of Works & Utilities',
    subheading_hn: 'निर्माण कार्य एवं उपयोगिताओं का पर्यवेक्षण',
    small_text: 'Assist the Director in the supervision of the construction and the maintenance work of buildings, roads, water supply, sanitation, lawns and gardens, communication networks, water coolers, air conditioners, telephones, etc.'
  },
  {
    id: 6,
    heading_en: 'Discipline & Work Ethos',
    heading_hn: 'अनुशासन एवं कार्य नैतिकता',
    subheading_en: 'Inter-departmental Harmony',
    subheading_hn: 'अंतर-विभागीय सामंजस्य',
    small_text: 'Assist the Director in maintaining the discipline and work ethos among the various departments and between the faculty members.'
  },
  {
    id: 7,
    heading_en: 'Academic Standards & Excellence',
    heading_hn: 'शैक्षणिक मानक एवं उत्कृष्टता',
    subheading_en: 'Institutional Quality & Standards',
    subheading_hn: 'संस्थागत गुणवत्ता एवं मानक',
    small_text: 'Assist the Director in maintaining the high academic standards and achieving academic excellence in the institution.'
  },
  {
    id: 8,
    heading_en: 'Integrity & Commitment Supervision',
    heading_hn: 'सत्यनिष्ठा एवं प्रतिबद्धता पर्यवेक्षण',
    subheading_en: 'Faculty Governance & Commitment',
    subheading_hn: 'संकाय शासन एवं प्रतिबद्धता',
    small_text: 'Supervision over faculty discipline, integrity and commitment.'
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function FacultyActivitiesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [subtexts, setSubtexts] = useState<ActivitySubtext[]>(FALLBACK_RESPONSIBILITIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/faculty-activities`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch subtexts
        const sRes = await fetch(`${API_BASE}/api/faculty-activities/subtext`, { cache: 'no-store' });
        if (sRes.ok) {
          const sData = await sRes.json();
          if (!cancelled && Array.isArray(sData) && sData.length > 0) {
            setSubtexts(sData);
          }
        }
      } catch (err) {
        console.error('Error fetching faculty activities:', err);
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
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'संकाय अनुभाग' : 'Faculty Section'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'गतिविधियां' : 'Activities'}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight uppercase">
            {isHindi ? heading.title_hn || heading.title_en : heading.title_en}
          </h1>
          {heading.sub_title_en && (
            <p className="text-sm sm:text-base text-gray-700 max-w-4xl mx-auto font-medium leading-relaxed pt-2">
              {isHindi ? heading.sub_title_hn || heading.sub_title_en : heading.sub_title_en}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading activities & responsibilities...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subtexts.map((item, index) => (
              <div
                key={item.id || index}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex items-start gap-4 group"
              >
                {/* Number Badge */}
                <div className="w-9 h-9 rounded-lg bg-[#631012]/10 text-[#631012] font-bold text-sm flex items-center justify-center shrink-0 group-hover:bg-[#631012] group-hover:text-white transition-colors">
                  {index + 1}
                </div>

                {/* Text Content */}
                <div className="space-y-1.5 flex-1 pt-0.5">
                  <p className="text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                    {isHindi && item.heading_hn ? item.heading_hn : item.small_text || item.heading_en}
                  </p>
                  {isHindi && item.small_text && item.heading_hn && (
                    <p className="text-xs text-gray-500 font-mono">
                      {item.small_text}
                    </p>
                  )}
                  {item.subheading_en && (
                    <div className="text-[11px] font-mono text-[#631012] font-semibold">
                      {item.subheading_en}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
