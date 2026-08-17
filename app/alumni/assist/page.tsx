'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ChevronRight, FileText, AlertCircle, CheckCircle2, DollarSign, Loader2 } from 'lucide-react';

interface ProcedureStep {
  id: number;
  section_title_en: string;
  section_title_hn: string;
  step_order: number;
  step_text_en: string;
  step_text_hn: string;
}

interface FeeItem {
  id: number;
  sl_no: string;
  name_en: string;
  name_hn: string;
  fee: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  note_title_en: string;
  note_title_hn: string;
  note_desc_en: string;
  note_desc_hn: string;
  fees_title_en: string;
  fees_title_hn: string;
}

const DEFAULT_HEADING: HeadingData = {
  title_en: 'Alumni Assist',
  title_hn: 'पूर्व छात्र सहायता',
  sub_title_en: 'Comprehensive procedures, guidelines, and prescribed fees for obtaining certificates, duplicate degrees, migration, and official verifications.',
  sub_title_hn: 'प्रमाण पत्र, डुप्लिकेट डिग्री, माइग्रेशन और आधिकारिक सत्यापन प्राप्त करने के लिए विस्तृत प्रक्रियाएं, दिशानिर्देश और निर्धारित शुल्क।',
  note_title_en: 'Important Note',
  note_title_hn: 'महत्वपूर्ण सूचना',
  note_desc_en: 'However, these formalities are not required in case one is applying for of aforesaid documents on account of mutilation of document. Then he/she is required to attach mutilated certificate/document with his application and requisite fee.',
  note_desc_hn: 'हालाँकि, दस्तावेज़ के क्षतिग्रस्त होने के कारण उपर्युक्त दस्तावेज़ों के लिए आवेदन करने की स्थिति में ये औपचारिकताएँ आवश्यक नहीं हैं। उस स्थिति में आवेदक को अपने आवेदन और आवश्यक शुल्क के साथ क्षतिग्रस्त प्रमाण पत्र/दस्तावेज़ संलग्न करना होगा।',
  fees_title_en: 'Charges for issue of detailed marks card, semester grade card, semester grade report, migration/registration card and duplicate degree',
  fees_title_hn: 'विस्तृत अंक पत्र, सेमेस्टर ग्रेड कार्ड, सेमेस्टर ग्रेड रिपोर्ट, माइग्रेशन/पंजीकरण कार्ड और डुप्लिकेट डिग्री जारी करने के शुल्क'
};

const DEFAULT_PROCEDURES: ProcedureStep[] = [
  {
    id: 1,
    section_title_en: 'Procedure for issue of duplicate degree certificate',
    section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया',
    step_order: 1,
    step_text_en: 'A student has to register a F.I.R. on loss of detailed Marks Card/Semester Grade Report and Degree.',
    step_text_hn: 'विस्तृत अंक पत्र/सेमेस्टर ग्रेड रिपोर्ट और डिग्री खो जाने पर छात्र को एफ.आई.आर. दर्ज करानी होगी।'
  },
  {
    id: 2,
    section_title_en: 'Procedure for issue of duplicate degree certificate',
    section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया',
    step_order: 2,
    step_text_en: 'To advertise the loss in a National daily after waiting for 15 days should apply with a copy of the Newspaper cutting to: ar-acad@nith.ac.in with CC: certificate-acad@nith.ac.in.',
    step_text_hn: '15 दिन प्रतीक्षा करने के बाद एक राष्ट्रीय दैनिक समाचार पत्र में हानि का विज्ञापन दें और समाचार पत्र की कटिंग की प्रति के साथ ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in) पर आवेदन करें।'
  },
  {
    id: 3,
    section_title_en: 'Procedure for issue of duplicate degree certificate',
    section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया',
    step_order: 3,
    step_text_en: 'To submit an affidavit on Non-Judicial stamp paper of Rs.10/-.',
    step_text_hn: '10/- रुपये के गैर-न्यायिक स्टाम्प पेपर पर एक हलफनामा जमा करें।'
  },
  {
    id: 4,
    section_title_en: 'Procedure for issue of duplicate degree certificate',
    section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया',
    step_order: 4,
    step_text_en: 'To deposit/remit requisite fee in cash to the Cashier or through Bank-Draft in favour of Registrar,NIT,Hamirpur (HP).',
    step_text_hn: 'कैशियर को नकद या रजिस्ट्रार, एनआईटी, हमीरपुर (हि.प्र.) के पक्ष में बैंक ड्राफ्ट के माध्यम से आवश्यक शुल्क जमा/प्रेषित करें।'
  },
  {
    id: 5,
    section_title_en: 'Procedure for issue of duplicate degree certificate',
    section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया',
    step_order: 5,
    step_text_en: 'Duplicate Degree certificate will be issued by the Registrar and in his/her absence by Director-cum-Chairman, Senate, NIT, Hamirpur (HP). The duplicate Degrees will be prepared as such as original and in place of signature Sd/- will be written on the Degree.',
    step_text_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र रजिस्ट्रार द्वारा और उनकी अनुपस्थिति में निदेशक-सह-अध्यक्ष, सीनेट, एनआईटी, हमीरपुर (हि.प्र.) द्वारा जारी किया जाएगा। डुप्लिकेट डिग्री मूल की तरह ही तैयार की जाएगी और हस्ताक्षर के स्थान पर डिग्री पर Sd/- लिखा जाएगा।'
  },
  {
    id: 6,
    section_title_en: 'Procedure for issue of duplicate detailed marks cards/semester grade reports',
    section_title_hn: 'डुप्लिकेट विस्तृत अंक पत्र / सेमेस्टर ग्रेड रिपोर्ट जारी करने की प्रक्रिया',
    step_order: 1,
    step_text_en: 'These will be issued by the Academic Section on submission of copy of F.I.R. in case of loss of certificate and remittance of payment for the purpose by the concerned student. The requester may apply To: ar-acad@nith.ac.in with CC: certificate-acad@nith.ac.in',
    step_text_hn: 'प्रमाण पत्र खो जाने की स्थिति में एफ.आई.आर. की प्रति जमा करने और संबंधित छात्र द्वारा इस उद्देश्य के लिए भुगतान प्रेषित करने पर ये शैक्षणिक अनुभाग द्वारा जारी किए जाएंगे। अनुरोधकर्ता To: ar-acad@nith.ac.in with CC: certificate-acad@nith.ac.in पर आवेदन कर सकते हैं।'
  },
  {
    id: 7,
    section_title_en: 'Procedure for issue of migration certificate',
    section_title_hn: 'माइग्रेशन प्रमाण पत्र जारी करने की प्रक्रिया',
    step_order: 1,
    step_text_en: 'Migration certificate will be issued by the Academic Section after giving an application and requisite fee for the purpose by the concerned student. The requester may apply To: ar-acad@nith.ac.in with CC: certificate-acad@nith.ac.in',
    step_text_hn: 'संबंधित छात्र द्वारा आवेदन और इस उद्देश्य के लिए आवश्यक शुल्क देने के बाद शैक्षणिक अनुभाग द्वारा माइग्रेशन प्रमाण पत्र जारी किया जाएगा। अनुरोधकर्ता To: ar-acad@nith.ac.in with CC: certificate-acad@nith.ac.in पर आवेदन कर सकते हैं।'
  }
];

const DEFAULT_FEES: FeeItem[] = [
  { id: 1, sl_no: '1', name_en: 'Bonafide Certificate', name_hn: 'बोनाफाइड प्रमाण पत्र', fee: 'Rs. 500' },
  { id: 2, sl_no: '2', name_en: 'Character Certificate', name_hn: 'चरित्र प्रमाण पत्र', fee: 'Rs. 500' },
  { id: 3, sl_no: '3', name_en: 'Migration Certificate', name_hn: 'माइग्रेशन प्रमाण पत्र', fee: 'Rs. 2000' },
  { id: 4, sl_no: '4', name_en: 'Transcript', name_hn: 'ट्रांसक्रिप्ट', fee: 'Rs. 2000 per copy within India\nRs. 5000 per copy outside India' },
  { id: 5, sl_no: '5', name_en: 'Misc. (Backlog certificate, Rank certificate and verification/attestation of DMC/Degree certificate etc.)', name_hn: 'अन्य (बैकलॉग प्रमाण पत्र, रैंक प्रमाण पत्र और डीएमसी/डिग्री प्रमाण पत्र का सत्यापन/प्रमाणन आदि)', fee: 'Rs. 500 each certificate/card' },
  { id: 6, sl_no: '6', name_en: 'Duplicate Grade Card/Duplicate Provisional Degree Certificate/Degree Certificate', name_hn: 'डुप्लिकेट ग्रेड कार्ड/डुप्लिकेट प्रोविजनल डिग्री प्रमाण पत्र/डिग्री प्रमाण पत्र', fee: 'Rs. 1000 each' },
  { id: 7, sl_no: '7', name_en: 'Medium of Instruction Certificate', name_hn: 'शिक्षण माध्यम प्रमाण पत्र', fee: 'Rs. 500' },
  { id: 8, sl_no: '8', name_en: 'Verification of Degree', name_hn: 'डिग्री का सत्यापन', fee: 'Rs. 1000/- within India &\n$100 outside India' },
  { id: 9, sl_no: '9', name_en: 'Verification through Govt./Govt. Aided Institution/Agency', name_hn: 'सरकारी/सरकारी सहायता प्राप्त संस्थान/एजेंसी के माध्यम से सत्यापन', fee: 'No Charges' }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AlumniAssistPage() {
  const language = useSelector((state: RootState) => state.language.value);

  const [heading, setHeading] = useState<HeadingData>(DEFAULT_HEADING);
  const [procedures, setProcedures] = useState<ProcedureStep[]>(DEFAULT_PROCEDURES);
  const [fees, setFees] = useState<FeeItem[]>(DEFAULT_FEES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch heading
        const hRes = await fetch(`${API_BASE}/api/alumni-assist`, { cache: 'no-store' });
        if (hRes.ok) {
          const hData = await hRes.json();
          if (!cancelled && hData && hData.title_en) setHeading(hData);
        }

        // Fetch procedures
        const pRes = await fetch(`${API_BASE}/api/alumni-assist/procedures`, { cache: 'no-store' });
        if (pRes.ok) {
          const pData = await pRes.json();
          if (!cancelled && Array.isArray(pData) && pData.length > 0) setProcedures(pData);
        }

        // Fetch fees
        const fRes = await fetch(`${API_BASE}/api/alumni-assist/fees`, { cache: 'no-store' });
        if (fRes.ok) {
          const fData = await fRes.json();
          if (!cancelled && Array.isArray(fData) && fData.length > 0) setFees(fData);
        }
      } catch (err) {
        console.error('Error loading alumni assist:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  // Group procedures by section_title_en
  const groupedProcedures = procedures.reduce((acc: { [key: string]: ProcedureStep[] }, step) => {
    const key = step.section_title_en || 'General Procedure';
    if (!acc[key]) acc[key] = [];
    acc[key].push(step);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {language === 'en' ? 'Home' : 'होम'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{language === 'en' ? 'Alumni' : 'पूर्व छात्र'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {language === 'en' ? 'Alumni Assist' : 'अलुम्नाई सहायता'}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        {/* Page Title */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
            {language === 'en' ? heading.title_en : heading.title_hn || heading.title_en}
          </h1>
          {heading.sub_title_en && (
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
              {language === 'en' ? heading.sub_title_en : heading.sub_title_hn || heading.sub_title_en}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-300 rounded">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading assistance details...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Section: Procedures */}
            <div className="space-y-6">
              {Object.entries(groupedProcedures).map(([sectionTitle, steps], sIdx) => {
                const titleHn = steps[0]?.section_title_hn || sectionTitle;
                return (
                  <div
                    key={sIdx}
                    className="bg-white border border-gray-300 shadow-sm overflow-hidden"
                  >
                    {/* Section Header */}
                    <div className="bg-[#fcf5f5] border-b border-gray-300 border-l-4 border-l-[#631012] px-6 py-3.5 flex items-center justify-between">
                      <h2 className="text-sm sm:text-base font-bold text-[#631012] tracking-wide flex items-center gap-2">
                        <FileText size={18} className="text-[#631012] shrink-0" />
                        <span>{language === 'en' ? sectionTitle : titleHn}</span>
                      </h2>
                      <span className="text-[11px] font-mono font-bold bg-[#631012]/10 text-[#631012] px-2.5 py-0.5 rounded">
                        {steps.length} {steps.length === 1 ? 'Step' : 'Steps'}
                      </span>
                    </div>

                    {/* Procedure Steps List */}
                    <div className="p-6 divide-y divide-gray-100">
                      {steps.map((step, stepIdx) => (
                        <div
                          key={step.id || stepIdx}
                          className="py-3 first:pt-0 last:pb-0 flex items-start gap-4"
                        >
                          <div className="w-7 h-7 rounded bg-[#631012] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-sm">
                            {step.step_order || stepIdx + 1}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-800 leading-relaxed font-normal">
                            {language === 'en' ? step.step_text_en : step.step_text_hn || step.step_text_en}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Section: Charges / Fee Structure Table */}
            <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
              <div className="bg-[#fcf5f5] border-b border-gray-300 border-l-4 border-l-[#631012] px-6 py-3.5 text-center">
                <h2 className="text-sm sm:text-base font-bold text-[#631012] tracking-wide">
                  {language === 'en'
                    ? heading.fees_title_en || 'Charges for issue of detailed marks card, semester grade card, semester grade report, migration/registration card and duplicate degree'
                    : heading.fees_title_hn || heading.fees_title_en}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#631012] text-white font-bold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4 border-r border-[#7a1a1d] w-16 text-center">
                        Sl. No.
                      </th>
                      <th className="py-3 px-6 border-r border-[#7a1a1d]">
                        {language === 'en' ? 'Name of Certificate / Document' : 'प्रमाण पत्र / दस्तावेज़ का नाम'}
                      </th>
                      <th className="py-3 px-6 w-72">
                        {language === 'en' ? 'Prescribed Fee' : 'निर्धारित शुल्क'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-800">
                    {fees.map((f, idx) => (
                      <tr
                        key={f.id || idx}
                        className="hover:bg-red-50/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-700 border-r border-gray-200">
                          {f.sl_no || idx + 1}
                        </td>
                        <td className="py-3.5 px-6 font-semibold text-gray-900 border-r border-gray-200">
                          {language === 'en' ? f.name_en : f.name_hn || f.name_en}
                        </td>
                        <td className="py-3.5 px-6 font-mono font-bold text-[#631012] whitespace-pre-line leading-relaxed">
                          {f.fee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section: Important Note */}
            <div className="bg-[#fff9f9] border border-red-200 rounded-lg p-5 flex items-start gap-4">
              <div className="p-2 bg-[#631012] text-white rounded shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-[#631012] uppercase tracking-wide">
                  {language === 'en' ? heading.note_title_en || 'Important Note' : heading.note_title_hn || heading.note_title_en}
                </h3>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed">
                  {language === 'en' ? heading.note_desc_en : heading.note_desc_hn || heading.note_desc_en}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
