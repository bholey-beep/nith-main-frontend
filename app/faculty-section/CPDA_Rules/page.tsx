'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, FileText, ExternalLink, Loader2 } from 'lucide-react';

interface CpdaRule {
  id: number;
  sl_no: string;
  particulars_en: string;
  particulars_hn: string;
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
  title_en: 'CUMULATIVE PROFESSIONAL DEVELOPMENT ALLOWANCE (CPDA) RULES W.E.F. 1st APRIL, 2021 to 31st MARCH, 2024',
  title_hn: 'संचयी व्यावसायिक विकास भत्ता (सीपीडीए) नियम - 1 अप्रैल 2021 से 31 मार्च 2024 तक लागू',
  sub_title_en: 'Guidelines, notifications, and office orders for the grant and utilization of CPDA for faculty members.',
  sub_title_hn: 'संकाय सदस्यों के लिए सीपीडीए के अनुदान और उपयोग के लिए दिशानिर्देश, अधिसूचनाएं और कार्यालय आदेश।',
};

const FALLBACK_RULES: CpdaRule[] = [
  {
    id: 1,
    sl_no: '1',
    particulars_en: 'Office order regarding CPDA dated 13-03-2023',
    particulars_hn: 'सीपीडीए के संबंध में कार्यालय आदेश दिनांक 13-03-2023',
    pdf_url: 'https://nith.ac.in/uploads/topics/16788582293888.pdf',
    word_url: '#',
  },
  {
    id: 2,
    sl_no: '2',
    particulars_en: 'Office order regarding CPDA',
    particulars_hn: 'सीपीडीए के संबंध में कार्यालय आदेश',
    pdf_url: 'https://nith.ac.in/uploads/topics/16578687799757.pdf',
    word_url: '#',
  },
  {
    id: 3,
    sl_no: '3',
    particulars_en: 'Notification regarding CPDA',
    particulars_hn: 'सीपीडीए के संबंध में अधिसूचना',
    pdf_url: 'https://nith.ac.in/uploads/topics/16321287955523.pdf',
    word_url: '#',
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function CpdaRulesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [rules, setRules] = useState<CpdaRule[]>(FALLBACK_RULES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/faculty-cpda`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch list
        const lRes = await fetch(`${API_BASE}/api/faculty-cpda/list`, { cache: 'no-store' });
        if (lRes.ok) {
          const lData = await lRes.json();
          if (!cancelled && Array.isArray(lData) && lData.length > 0) {
            setRules(lData);
          }
        }
      } catch (err) {
        console.error('Error fetching CPDA rules:', err);
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
            {isHindi ? 'सीपीडीए नियम' : 'CPDA Rules'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title (Centered as in Screenshot) */}
        <div className="text-center space-y-2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#631012] tracking-tight max-w-4xl mx-auto uppercase">
            {isHindi ? heading.title_hn || heading.title_en : heading.title_en}
          </h1>
          {heading.sub_title_en && (
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
              {isHindi ? heading.sub_title_hn || heading.sub_title_en : heading.sub_title_en}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading CPDA rules...</p>
          </div>
        ) : (
          <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                {/* Deep Maroon Table Header */}
                <thead>
                  <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3 px-6">
                      {isHindi ? 'विवरण' : 'Particulars'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-gray-800">
                  {rules.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-red-50/30 transition-colors"
                    >
                      <td className="py-3.5 px-6">
                        {item.pdf_url && item.pdf_url !== '#' ? (
                          <a
                            href={item.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#631012] hover:text-[#500c0e] hover:underline font-medium inline-flex items-center gap-2 group"
                          >
                            <span>
                              {isHindi ? item.particulars_hn || item.particulars_en : item.particulars_en}
                            </span>
                            <ExternalLink size={13} className="text-[#631012]/60 group-hover:text-[#631012]" />
                          </a>
                        ) : (
                          <span className="text-gray-800 font-medium">
                            {isHindi ? item.particulars_hn || item.particulars_en : item.particulars_en}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
