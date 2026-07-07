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

// Robust static fallback variables in case the API is offline
const fallbackHeading = {
  title_en: 'INNOVATION HUB',
  title_hn: 'इनोवेशन हब',
  sub_title_en: 'Our Innovation Hub helps transform ideas into prototypes and impactful projects through mentorship, workshops, and access to maker-spaces. Students learn by building — from ideation to demonstration and, where possible, incubation.',
  sub_title_hn: 'हमारा इनोवेशन हब मेंटॉरशिप, कार्यशालाएँ और मेकर-स्पेस तक पहुँच प्रदान करके विचारों को प्रोटोटाइप और उपयोगी परियोजनाओं में बदलने में मदद करता है। छात्र विचार से लेकर प्रदर्शन और संभव होने पर इनक्यूबेशन तक निर्माण के माध्यम से सीखते हैं।',
  about_title_en: 'About Innovation Hub',
  about_title_hn: 'इनोवेशन हब के बारे में',
  about_desc1_en: 'The Innovation Hub is a student-centred ecosystem that encourages experimentation, rapid prototyping and interdisciplinary collaboration. It supports students from ideation and design through to working prototypes and demonstrations.',
  about_desc1_hn: 'इनोवेशन हब एक छात्र-केंद्रित पारिस्थितिकी तंत्र है जो प्रयोग, त्वरित प्रोटोटाइपिंग और बहु-विषयक सहयोग को प्रोत्साहित करता है। यह विचार, डिज़ाइन से लेकर कार्यशील प्रोटोटाइप और प्रदर्शन तक छात्रों का समर्थन करता है।',
  about_desc2_en: 'Through regular workshops, mentorship programs, and demo days, the hub connects students with faculty mentors and industry experts, enabling practical learning and project showcase opportunities.',
  about_desc2_hn: 'नियमित कार्यशालाओं, मेंटॉरशिप कार्यक्रमों और डेमो दिनों के माध्यम से, हब छात्रों को फैकल्टी मेंटर्स और उद्योग विशेषज्ञों से जोड़ता है, जिससे व्यावहारिक सीखने और परियोजना प्रदर्शन के अवसर मिलते हैं।',
  focus_title_en: 'Focus Areas',
  focus_title_hn: 'केंद्रित क्षेत्र',
  programs_title_en: 'Programs & Opportunities',
  programs_title_hn: 'कार्यक्रम और अवसर',
  join_title_en: 'How to Join',
  join_title_hn: 'कैसे जुड़ें',
  contact_email: 'innovation@nit.ac.in'
};

const fallbackFocus = [
  {
    focus_en: 'Rapid prototyping and product development',
    focus_hn: 'त्वरित प्रोटोटाइप और उत्पाद विकास',
  },
  {
    focus_en: 'Design thinking and user-centred design',
    focus_hn: 'डिज़ाइन थिंकिंग और उपयोगकर्ता-केंद्रित डिज़ाइन',
  },
  {
    focus_en: 'IoT, Embedded Systems and Robotics',
    focus_hn: 'IoT, एंबेडेड सिस्टम और रोबोटिक्स',
  },
  {
    focus_en: 'Software systems, AI and data-driven projects',
    focus_hn: 'सॉफ़्टवेयर सिस्टम, AI और डेटा-आधारित परियोजनाएँ',
  },
  {
    focus_en: 'Startup incubation and entrepreneurship support',
    focus_hn: 'स्टार्टअप इनक्यूबेशन और उद्यमिता समर्थन',
  },
];

const fallbackPrograms = [
  {
    program_en: 'Workshops, bootcamps and hands-on labs',
    program_hn: 'वर्कशॉप, बूटकैम्प और व्यावहारिक लैब',
  },
  {
    program_en: 'Mentorship from faculty and industry',
    program_hn: 'फैकल्टी और उद्योग से मेंटॉरशिप',
  },
  {
    program_en: 'Access to maker-spaces and prototyping equipment',
    program_hn: 'मेकर-स्पेस और प्रोटोटाइप उपकरणों तक पहुँच',
  },
  {
    program_en: 'Funding, grants and project showcases',
    program_hn: 'फंडिंग, अनुदान और परियोजना प्रदर्शन',
  },
  {
    program_en: 'Intellectual property and prototype support',
    program_hn: 'बौद्धिक संपदा और प्रोटोटाइप समर्थन',
  },
];

const fallbackSteps = [
  {
    step_order: 1,
    step_en: 'Attend the introductory session or workshops',
    step_hn: 'परिचयात्मक सत्र या कार्यशालाओं में भाग लें',
  },
  {
    step_order: 2,
    step_en: 'Form or join a project team with peers',
    step_hn: 'सहपाठियों के साथ एक परियोजना टीम बनाएं या उसमें शामिल हों',
  },
  {
    step_order: 3,
    step_en: 'Apply for mentorship or small grants when ready',
    step_hn: 'तैयार होने पर मेंटॉरशिप या छोटे अनुदान के लिए आवेदन करें',
  },
  {
    step_order: 4,
    step_en: 'Showcase your prototype at demo days and apply for incubation',
    step_hn: 'डेमो दिनों पर अपना प्रोटोटाइप दिखाएँ और इनक्यूबेशन के लिए आवेदन करें',
  },
];

export default function InnovationPage() {
  const language = useSelector((state: RootState) => state.language.value);

  const [headingData, setHeadingData] = useState<any>(null);
  const [focusAreas, setFocusAreas] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [joinSteps, setJoinSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  useEffect(() => {
    async function fetchData() {
      try {
        const headRes = await fetch(`${API_URL}/api/student-innovation`);
        if (headRes.ok) {
          const hData = await headRes.json();
          if (hData && Object.keys(hData).length > 0) {
            setHeadingData(hData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Innovation headings:', err);
      }

      try {
        const focusRes = await fetch(`${API_URL}/api/student-innovation/focus`);
        if (focusRes.ok) {
          const fData = await focusRes.json();
          if (Array.isArray(fData) && fData.length > 0) {
            setFocusAreas(fData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Innovation focus list:', err);
      }

      try {
        const progRes = await fetch(`${API_URL}/api/student-innovation/programs`);
        if (progRes.ok) {
          const pData = await progRes.json();
          if (Array.isArray(pData) && pData.length > 0) {
            setPrograms(pData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Innovation programs:', err);
      }

      try {
        const stepRes = await fetch(`${API_URL}/api/student-innovation/steps`);
        if (stepRes.ok) {
          const sData = await stepRes.json();
          if (Array.isArray(sData) && sData.length > 0) {
            setJoinSteps(sData);
          }
        }
      } catch (err) {
        console.error('Failed to fetch Innovation steps:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [API_URL]);

  // Merge dynamic state with static fallbacks
  const activeHeading = headingData || fallbackHeading;
  const activeFocus = focusAreas.length > 0 ? focusAreas : fallbackFocus;
  const activePrograms = programs.length > 0 ? programs : fallbackPrograms;
  const activeSteps = joinSteps.length > 0 ? joinSteps : fallbackSteps;

  return (
    <div className="min-h-screen bg-white">
      <Header31 />

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language == 'en' ? 'Home' : 'होम'}
            </Link>
            <span>›</span>
            <span className="text-gray-400">
              {language == 'en' ? 'Student' : 'छात्र'}
            </span>
            <span>›</span>
            <Link
              href="/student/technical"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              {language == 'en' ? 'Technical' : 'तकनीकी'}
            </Link>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              {language == 'en' ? 'Innovation' : 'इनोवेशन'}
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
        >
          <div className="relative z-10 text-center py-20 px-6 md:px-12">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4 uppercase">
              {language == 'en' ? activeHeading.title_en : activeHeading.title_hn}
            </h1>

            <p className="text-white/85 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
              {language == 'en' ? activeHeading.sub_title_en : activeHeading.sub_title_hn}
            </p>
          </div>
        </motion.div>
      </section>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {language == 'en' ? activeHeading.about_title_en : activeHeading.about_title_hn}
          </h2>

          <div className="prose prose-slate text-gray-700 space-y-4">
            <p>
              {language == 'en' ? activeHeading.about_desc1_en : activeHeading.about_desc1_hn}
            </p>
            {activeHeading.about_desc2_en && (
              <p>
                {language == 'en' ? activeHeading.about_desc2_en : activeHeading.about_desc2_hn}
              </p>
            )}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {language == 'en' ? activeHeading.focus_title_en : activeHeading.focus_title_hn}
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {activeFocus.map((f, idx) => (
              <li key={f.id || idx}>
                {language == 'en' ? f.focus_en : f.focus_hn || f.focus_en}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {language == 'en' ? activeHeading.programs_title_en : activeHeading.programs_title_hn}
          </h3>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            {activePrograms.map((p, idx) => (
              <li key={p.id || idx}>
                {language == 'en' ? p.program_en : p.program_hn || p.program_en}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            {language == 'en' ? activeHeading.join_title_en : activeHeading.join_title_hn}
          </h3>

          <ol className="list-decimal pl-6 text-gray-700 space-y-2">
            {activeSteps.map((step, idx) => (
              <li key={step.id || idx}>
                {language == 'en' ? step.step_en : step.step_hn || step.step_en}
              </li>
            ))}
          </ol>

          <div className="mt-4 text-sm text-gray-700">
            <p>
              {language == 'en' ? (
                <>
                  For queries or to propose a project, contact{' '}
                  <span className="text-[#800000] underline font-semibold cursor-pointer" onClick={() => window.location.href = `mailto:${activeHeading.contact_email}`}>
                    {activeHeading.contact_email}
                  </span>
                  .
                </>
              ) : (
                <>
                  प्रश्न या परियोजना प्रस्ताव करने के लिए संपर्क करें{' '}
                  <span className="text-[#800000] underline font-semibold cursor-pointer" onClick={() => window.location.href = `mailto:${activeHeading.contact_email}`}>
                    {activeHeading.contact_email}
                  </span>
                  ।
                </>
              )}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

