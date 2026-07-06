'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { CreditCard, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const fadeInScale = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

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
  title_hn: 'अलुम्नाई सहायता',
  sub_title_en: 'This section provides important procedures, rules, and assistance details for alumni of NIT Hamirpur.',
  sub_title_hn: 'यह अनुभाग एनआईटी हमीरपुर के पूर्व छात्रों के लिए महत्वपूर्ण प्रक्रियाएं, नियम और सहायता विवरण प्रदान करता है।',
  note_title_en: 'Important Note',
  note_title_hn: 'महत्वपूर्ण सूचना',
  note_desc_en: 'These formalities are not required in case of application due to mutilation of documents. In such cases, the applicant must attach the mutilated certificate/document along with the application and requisite fee.',
  note_desc_hn: 'दस्तावेज़ के क्षतिग्रस्त होने के कारण आवेदन की स्थिति में ये औपचारिकताएँ आवश्यक नहीं हैं। ऐसे मामलों में, आवेदक को क्षतिग्रस्त प्रमाण पत्र/दस्तावेज़ को आवेदन और आवश्यक शुल्क के साथ संलग्न करना चाहिए।',
  fees_title_en: 'Charges for Issue of Certificates / Documents',
  fees_title_hn: 'प्रमाण पत्र/दस्तावेज जारी करने के लिए शुल्क'
};

const DEFAULT_PROCEDURES: ProcedureStep[] = [
  { id: 1, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 1, step_text_en: 'Register an F.I.R. for loss of Detailed Marks Card / Semester Grade Report / Degree.', step_text_hn: 'विस्तृत अंक पत्र/सेमेस्टर ग्रेड रिपोर्ट/डिग्री की हानि के लिए एफ.आई.आर. दर्ज करें।' },
  { id: 2, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 2, step_text_en: 'After waiting 15 days, advertise the loss in a National daily newspaper.', step_text_hn: '15 दिन प्रतीक्षा के बाद, राष्ट्रीय दैनिक समाचार पत्र में हानि का विज्ञापन दें।' },
  { id: 3, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 3, step_text_en: 'Apply with a copy of the newspaper cutting to ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in).', step_text_hn: 'समाचार पत्र की कटिंग की प्रति के साथ ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in) पर आवेदन करें।' },
  { id: 4, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 4, step_text_en: 'Submit an affidavit on Non-Judicial stamp paper of Rs. 10/-.', step_text_hn: '₹10/- के गैर-न्यायिक स्टाम्प पेपर पर शपथ पत्र जमा करें।' },
  { id: 5, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 5, step_text_en: 'Deposit/remit the requisite fee in cash to the Cashier or via Bank Draft in favour of Registrar, NIT Hamirpur (HP).', step_text_hn: 'आवश्यक शुल्क कैशियर को नकद या बैंक ड्राफ्ट के माध्यम से रजिस्ट्रार, एनआईटी हमीरपुर (एचपी) के पक्ष में जमा करें।' },
  { id: 6, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 6, step_text_en: 'Duplicate Degree Certificate will be issued by the Registrar (or Director-cum-Chairman, Senate in absence).', step_text_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र रजिस्ट्रार (या अनुपस्थिति में निदेशक-सह-अध्यक्ष, सीनेट) द्वारा जारी किया जाएगा।' },
  { id: 7, section_title_en: 'Procedure for Issue of Duplicate Degree Certificate', section_title_hn: 'डुप्लिकेट डिग्री प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 7, step_text_en: 'Duplicate degree will be prepared like the original, with "Sd/-" in place of signature.', step_text_hn: 'डुप्लिकेट डिग्री मूल की तरह तैयार की जाएगी, जिसमें हस्ताक्षर के स्थान पर "Sd/-" होगा।' },
  { id: 8, section_title_en: 'Procedure for Issue of Duplicate Detailed Marks Cards / Semester Grade Reports', section_title_hn: 'डुप्लिकेट विस्तृत अंक पत्र/सेमेस्टर ग्रेड रिपोर्ट जारी करने की प्रक्रिया', step_order: 1, step_text_en: 'Issued by the Academic Section.', step_text_hn: 'शैक्षणिक अनुभाग द्वारा जारी किया गया।' },
  { id: 9, section_title_en: 'Procedure for Issue of Duplicate Detailed Marks Cards / Semester Grade Reports', section_title_hn: 'डुप्लिकेट विस्तृत अंक पत्र/सेमेस्टर ग्रेड रिपोर्ट जारी करने की प्रक्रिया', step_order: 2, step_text_en: 'Submission of F.I.R. copy in case of loss.', step_text_hn: 'हानि की स्थिति में एफ.आई.आर. की प्रति जमा करें।' },
  { id: 10, section_title_en: 'Procedure for Issue of Duplicate Detailed Marks Cards / Semester Grade Reports', section_title_hn: 'डुप्लिकेट विस्तृत अंक पत्र/सेमेस्टर ग्रेड रिपोर्ट जारी करने की प्रक्रिया', step_order: 3, step_text_en: 'Payment of requisite fee.', step_text_hn: 'आवश्यक शुल्क का भुगतान।' },
  { id: 11, section_title_en: 'Procedure for Issue of Duplicate Detailed Marks Cards / Semester Grade Reports', section_title_hn: 'डुप्लिकेट विस्तृत अंक पत्र/सेमेस्टर ग्रेड रिपोर्ट जारी करने की प्रक्रिया', step_order: 4, step_text_en: 'Apply to ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in).', step_text_hn: 'ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in) पर आवेदन करें।' },
  { id: 12, section_title_en: 'Procedure for Issue of Migration Certificate', section_title_hn: 'माइग्रेशन प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 1, step_text_en: 'Issued by the Academic Section.', step_text_hn: 'शैक्षणिक अनुभाग द्वारा जारी किया गया।' },
  { id: 13, section_title_en: 'Procedure for Issue of Migration Certificate', section_title_hn: 'माइग्रेशन प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 2, step_text_en: 'Submission of application along with requisite fee.', step_text_hn: 'आवश्यक शुल्क के साथ आवेदन जमा करें।' },
  { id: 14, section_title_en: 'Procedure for Issue of Migration Certificate', section_title_hn: 'माइग्रेशन प्रमाण पत्र जारी करने की प्रक्रिया', step_order: 3, step_text_en: 'Apply to ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in).', step_text_hn: 'ar-acad@nith.ac.in (CC: certificate-acad@nith.ac.in) पर आवेदन करें।' }
];

const DEFAULT_FEES: FeeItem[] = [
  { id: 1, sl_no: '1', name_en: 'Bonafide Certificate', name_hn: 'बोनाफाइड प्रमाण पत्र', fee: '₹500' },
  { id: 2, sl_no: '2', name_en: 'Character Certificate', name_hn: 'चरित्र प्रमाण पत्र', fee: '₹500' },
  { id: 3, sl_no: '3', name_en: 'Migration Certificate', name_hn: 'माइग्रेशन प्रमाण पत्र', fee: '₹2,000' },
  { id: 4, sl_no: '4', name_en: 'Transcript (within India)', name_hn: 'ट्रांसक्रिप्ट (भारत में)', fee: '₹2,000 ' },
  { id: 5, sl_no: '5', name_en: 'Transcript (outside India)', name_hn: 'ट्रांसक्रिप्ट (भारत के बाहर)', fee: '₹5,000 ' },
  { id: 6, sl_no: '6', name_en: 'Misc. (Backlog, Rank, Verification/Attestation of DMC/Degree etc.)', name_hn: 'अन्य (बैकलॉग, रैंक, सत्यापन/प्रमाणन आदि)', fee: '₹500 ' },
  { id: 7, sl_no: '7', name_en: 'Duplicate Grade Card / Duplicate Provisional Degree / Degree Certificate', name_hn: 'डुप्लिकेट ग्रेड कार्ड / डुप्लिकेट प्रोविजनल डिग्री / डिग्री प्रमाण पत्र', fee: '₹1,000 ' },
  { id: 8, sl_no: '8', name_en: 'Medium of Instruction Certificate', name_hn: 'शिक्षण माध्यम प्रमाण पत्र', fee: '₹500' },
  { id: 9, sl_no: '9', name_en: 'Verification of Degree (within India)', name_hn: 'डिग्री सत्यापन (भारत में)', fee: '₹1,000' },
  { id: 10, sl_no: '10', name_en: 'Verification of Degree (outside India)', name_hn: 'डिग्री सत्यापन (भारत के बाहर)', fee: '$100' },
  { id: 11, sl_no: '11', name_en: 'Verification through Govt./Govt.-Aided Institutions', name_hn: 'सरकारी/सरकारी सहायता प्राप्त संस्थानों के माध्यम से सत्यापन', fee: '0' }
];

export default function AlumniAssist() {
  const language = useSelector((state: RootState) => state.language.value);

  const [heading, setHeading] = useState<HeadingData>(DEFAULT_HEADING);
  const [procedures, setProcedures] = useState<ProcedureStep[]>(DEFAULT_PROCEDURES);
  const [fees, setFees] = useState<FeeItem[]>(DEFAULT_FEES);

  // Fetch dynamic content
  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/alumni-assist');
        const data = await res.json();
        if (data && data.title_en) {
          setHeading(data);
        }
      } catch (err) {
        console.error('Fetch heading failed, using fallback:', err);
      }
    };

    const fetchProcedures = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/alumni-assist/procedures');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProcedures(data);
        }
      } catch (err) {
        console.error('Fetch procedures failed, using fallback:', err);
      }
    };

    const fetchFees = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/alumni-assist/fees');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setFees(data);
        }
      } catch (err) {
        console.error('Fetch fees failed, using fallback:', err);
      }
    };

    fetchHeading();
    fetchProcedures();
    fetchFees();
  }, []);

  // Process and group procedures dynamically by section name
  const getGroupedProcedures = () => {
    const sectionsMap: {
      [key: string]: {
        title_en: string;
        title_hn: string;
        steps: ProcedureStep[];
      };
    } = {};

    procedures.forEach(p => {
      const key = p.section_title_en;
      if (!sectionsMap[key]) {
        sectionsMap[key] = {
          title_en: p.section_title_en,
          title_hn: p.section_title_hn,
          steps: []
        };
      }
      sectionsMap[key].steps.push(p);
    });

    // Sort steps inside each section by step_order
    Object.keys(sectionsMap).forEach(key => {
      sectionsMap[key].steps.sort((a, b) => a.step_order - b.step_order);
    });

    return Object.values(sectionsMap);
  };

  const groupedProcedures = getGroupedProcedures();

  // Helper to format step text and render clickable emails dynamically
  const formatStepText = (text: string) => {
    if (!text) return '';
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const parts = text.split(emailRegex);
    return parts.map((part, index) => {
      if (part.match(emailRegex)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-[#800000] hover:underline font-medium"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language === 'en' ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {language === 'en' ? 'Alumni' : 'पूर्व छात्र'}
            </span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {language === 'en' ? heading.title_en : heading.title_hn}
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
              {language === 'en' ? heading.title_en : heading.title_hn}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              {language === 'en' ? heading.sub_title_en : heading.sub_title_hn}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-6 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Dynamic Procedure Sections */}
          {groupedProcedures.map((section, secIdx) => (
            <motion.div
              key={secIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInScale}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
            >
              <div className="bg-[#800000] px-6 py-4">
                <h2 className="text-lg md:text-xl font-semibold text-white">
                  {language === 'en' ? section.title_en : section.title_hn}
                </h2>
              </div>
              <div className="p-6">
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  {section.steps.map((step) => (
                    <li key={step.id}>
                      {formatStepText(language === 'en' ? step.step_text_en : step.step_text_hn)}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          ))}

          {/* Charges Table */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInScale}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="bg-gradient-to-r from-[#800000] to-[#631012] px-6 py-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {language === 'en' ? heading.fees_title_en : heading.fees_title_hn}
              </h2>
            </div>
            <div className="p-6 md:p-8">
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200 rounded-tl-lg w-20">
                        Sl. No.
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                        Name of Certificate / Document
                      </th>
                      <th className="px-4 py-4 text-right text-sm font-bold text-gray-700 border-b-2 border-gray-200 rounded-tr-lg w-40">
                        Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        } hover:bg-[#800000]/5 transition-colors duration-200`}
                      >
                        <td className="px-4 py-4 text-sm text-gray-600 border-b border-gray-100">
                          {item.sl_no}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-700 border-b border-gray-100">
                          {language === 'en' ? item.name_en : item.name_hn}
                        </td>
                        <td className="px-4 py-4 text-sm text-right font-semibold text-[#800000] border-b border-gray-100">
                          {item.fee}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Stacked View */}
              <div className="md:hidden space-y-4">
                {fees.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-500">
                        #{item.sl_no}
                      </span>
                      <span className="text-sm font-bold text-[#800000]">
                        {item.fee}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {language === 'en' ? item.name_en : item.name_hn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Important Note Alert */}
          {heading.note_desc_en && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeInScale}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg border border-amber-200 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-800 mb-2">
                      {language === 'en' ? heading.note_title_en : heading.note_title_hn}
                    </h3>
                    <p className="text-amber-900/80 leading-relaxed">
                      {language === 'en' ? heading.note_desc_en : heading.note_desc_hn}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
}
