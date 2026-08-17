'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, Mail, Phone, Loader2 } from 'lucide-react';

interface FacultyFunctionary {
  id: number;
  faculty_id?: number | null;
  category_en: string;
  category_hn: string;
  category_description_en?: string;
  category_description_hn?: string;
  sl_no: string;
  role_en: string;
  role_hn: string;
  name_en: string;
  name_hn: string;
  department_en?: string;
  department_hn?: string;
  phone: string;
  email: string;
  since_date_en?: string;
  since_date_hn?: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Functionaries (Faculty Welfare)',
  title_hn: 'पदाधिकारी (संकाय कल्याण)',
  sub_title_en: 'Key functionaries, officers, and administrative staff supporting faculty welfare, activities, and development at NIT Hamirpur.',
  sub_title_hn: 'एनआईटी हमीरपुर में संकाय कल्याण, गतिविधियों और विकास का समर्थन करने वाले प्रमुख पदाधिकारी, अधिकारी और प्रशासनिक कर्मचारी।',
};

const FALLBACK_FUNCTIONARIES: FacultyFunctionary[] = [
  {
    id: 1,
    sl_no: '1',
    category_en: 'Dean and Associate Deans',
    category_hn: 'डीन और एसोसिएट डीन',
    name_en: 'Prof. Sushil Chauhan',
    name_hn: 'प्रो. सुशील चौहान',
    role_en: 'Dean (Faculty Welfare)',
    role_hn: 'डीन (संकाय कल्याण)',
    phone: '254009',
    email: 'dfw@nith.ac.in',
  },
  {
    id: 2,
    sl_no: '2',
    category_en: 'Dean and Associate Deans',
    category_hn: 'डीन और एसोसिएट डीन',
    name_en: 'Dr. Subhash Chand',
    name_hn: 'डॉ. सुभाष चंद',
    role_en: 'Associate Dean (Faculty Recruitment & Discipline)',
    role_hn: 'एसोसिएट डीन (संकाय भर्ती एवं अनुशासन)',
    phone: '254136',
    email: 'schand@nith.ac.in',
  },
  {
    id: 3,
    sl_no: '3',
    category_en: 'Dean and Associate Deans',
    category_hn: 'डीन और एसोसिएट डीन',
    name_en: 'Dr. Naveen Chauhan',
    name_hn: 'डॉ. नवीन चौहान',
    role_en: 'Associate Dean (Faculty Activity & Support)',
    role_hn: 'एसोसिएट डीन (संकाय गतिविधि एवं सहायता)',
    phone: '254432',
    email: 'naveen@nith.ac.in',
  },
  {
    id: 4,
    sl_no: '1',
    category_en: 'Section Staff',
    category_hn: 'अनुभाग कर्मचारी',
    name_en: 'Sh. Gaurav Kumar Sharma',
    name_hn: 'श्री गौरव कुमार शर्मा',
    role_en: 'Assistant Registrar (Faculty Welfare)',
    role_hn: 'सहायक कुलसचिव (संकाय कल्याण)',
    phone: '--',
    email: '--',
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function FacultyFunctionariesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [functionaries, setFunctionaries] = useState<FacultyFunctionary[]>(FALLBACK_FUNCTIONARIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/faculty-functionaries`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch list
        const lRes = await fetch(`${API_BASE}/api/faculty-functionaries/list`, { cache: 'no-store' });
        if (lRes.ok) {
          const lData = await lRes.json();
          if (!cancelled && Array.isArray(lData) && lData.length > 0) {
            setFunctionaries(lData);
          }
        }
      } catch (err) {
        console.error('Error fetching faculty functionaries:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Distinct categories preserving order
  const categories = Array.from(
    new Set(functionaries.map((item) => item.category_en || 'Dean and Associate Deans'))
  );

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
            {isHindi ? 'पदाधिकारी' : 'Functionaries'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Page Title (Centered as in Screenshot) */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
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
            <p className="text-xs font-mono text-gray-500">Loading functionaries...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((catName) => {
              const members = functionaries.filter(
                (item) => (item.category_en || 'Dean and Associate Deans') === catName
              );
              const catHindi = members[0]?.category_hn || catName;

              return (
                <div
                  key={catName}
                  className="bg-white border border-gray-300 shadow-sm overflow-hidden"
                >
                  {/* Section Title Banner */}
                  <div className="bg-[#fcf5f5] border-b border-gray-300 border-l-4 border-l-[#631012] px-6 py-3 text-center">
                    <h2 className="text-sm sm:text-base font-bold text-[#631012] tracking-wide">
                      {isHindi ? catHindi : catName}
                    </h2>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      {/* Deep Maroon Table Header */}
                      <thead>
                        <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                          <th className="py-3 px-4 border-r border-[#7a1a1d] w-16 text-center">
                            Sl. No.
                          </th>
                          <th className="py-3 px-6 border-r border-[#7a1a1d] min-w-[200px]">
                            {isHindi ? 'नाम' : 'Name'}
                          </th>
                          <th className="py-3 px-6 border-r border-[#7a1a1d] min-w-[260px]">
                            {isHindi ? 'दायित्व / पद' : 'Responsibility'}
                          </th>
                          <th className="py-3 px-6 border-r border-[#7a1a1d] w-36">
                            {isHindi ? 'फोन नंबर' : 'Phone No.'}
                          </th>
                          <th className="py-3 px-6 min-w-[220px]">
                            {isHindi ? 'ईमेल' : 'Email'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 text-gray-800">
                        {members.map((item, index) => (
                          <tr
                            key={item.id || index}
                            className="hover:bg-red-50/40 transition-colors"
                          >
                            {/* Sl. No. */}
                            <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200 align-middle">
                              {item.sl_no || index + 1}
                            </td>

                            {/* Name */}
                            <td className="py-3.5 px-6 font-semibold text-gray-900 border-r border-gray-200 align-middle">
                              <div>
                                {isHindi
                                  ? item.name_hn || item.name_en
                                  : item.name_en}
                              </div>
                              {item.department_en && (
                                <div className="text-xs text-gray-500 font-normal mt-0.5">
                                  {isHindi ? item.department_hn || item.department_en : item.department_en}
                                </div>
                              )}
                            </td>

                            {/* Responsibility */}
                            <td className="py-3.5 px-6 text-gray-800 border-r border-gray-200 align-middle leading-snug font-medium">
                              {isHindi
                                ? item.role_hn || item.role_en || '--'
                                : item.role_en || '--'}
                            </td>

                            {/* Phone No. */}
                            <td className="py-3.5 px-6 font-mono text-gray-800 border-r border-gray-200 align-middle whitespace-nowrap">
                              {item.phone && item.phone !== '--' ? (
                                <a
                                  href={`tel:${item.phone}`}
                                  className="inline-flex items-center gap-1.5 hover:text-[#631012] hover:underline"
                                >
                                  <Phone size={13} className="text-[#631012]" />
                                  <span>{item.phone}</span>
                                </a>
                              ) : (
                                <span className="text-gray-400">--</span>
                              )}
                            </td>

                            {/* Email */}
                            <td className="py-3.5 px-6 font-mono text-xs text-gray-800 align-middle">
                              {item.email && item.email !== '--' ? (
                                <a
                                  href={`mailto:${item.email}`}
                                  className="inline-flex items-center gap-1.5 text-[#631012] hover:underline font-semibold"
                                >
                                  <Mail size={13} className="text-[#631012]" />
                                  <span>{item.email}</span>
                                </a>
                              ) : (
                                <span className="text-gray-400">--</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
