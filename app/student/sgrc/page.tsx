'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { 
  Calendar, 
  Users, 
  Target, 
  BookOpen, 
  ShieldAlert, 
  ChevronRight, 
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface CommitteeMember {
  id: number;
  name_en: string;
  name_hn: string;
  designation_en: string;
  designation_hn: string;
  department_en: string;
  department_hn: string;
  role_en: string;
  role_hn: string;
}

interface Objective {
  id: number;
  objective_en: string;
  objective_hn: string;
}

interface Meeting {
  id: number;
  date: string;
  agenda_en: string;
  agenda_hn: string;
  minutes_en: string;
  minutes_hn: string;
  status_en: string;
  status_hn: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_desc_en: string;
  about_desc_hn: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Student Grievance Redressal Committee (SGRC)',
  title_hn: 'छात्र शिकायत निवारण समिति (एसजीआरसी)',
  sub_title_en: 'A dedicated committee to address student grievances and ensure a conducive learning environment at NIT Hamirpur.',
  sub_title_hn: 'एनआईटी हमीरपुर में छात्रों की शिकायतों का निवारण करने और अनुकूल शैक्षणिक वातावरण सुनिश्चित करने के लिए एक समर्पित समिति।',
  about_title_en: 'About SGRC',
  about_title_hn: 'एसजीआरसी के बारे में',
  about_desc_en: 'The Student Grievance Redressal Committee (SGRC) at NIT Hamirpur is constituted to address and resolve grievances of students related to academic and non-academic matters. The committee ensures fair and transparent handling of all complaints.',
  about_desc_hn: 'एनआईटी हमीरपुर में छात्र शिकायत निवारण समिति (एसजीआरसी) का गठन शैक्षणिक और गैर-शैक्षणिक मामलों से संबंधित छात्रों की शिकायतों को संबोधित करने और हल करने के लिए किया गया है। समिति सभी शिकायतों के निष्पक्ष और पारदर्शी संचालन को सुनिश्चित करती है।'
};

const FALLBACK_OBJECTIVES: Objective[] = [
  { id: 1, objective_en: 'To provide a platform for students to voice their grievances', objective_hn: 'छात्रों को अपनी शिकायतें व्यक्त करने के लिए एक मंच प्रदान करना' },
  { id: 2, objective_en: 'To ensure timely resolution of student complaints', objective_hn: 'छात्रों की शिकायतों का समय पर समाधान सुनिश्चित करना' },
  { id: 3, objective_en: 'To maintain transparency in the grievance redressal process', objective_hn: 'शिकायत निवारण प्रक्रिया में पारदर्शिता बनाए रखना' },
  { id: 4, objective_en: 'To promote a harmonious academic environment', objective_hn: 'सामंजस्यपूर्ण शैक्षणिक वातावरण को बढ़ावा देना' },
  { id: 5, objective_en: 'To protect student rights and interests', objective_hn: 'छात्रों के अधिकारों और हितों की रक्षा करना' }
];

const FALLBACK_MEMBERS: CommitteeMember[] = [
  {
    id: 1,
    name_en: 'Dean (Faculty Welfare)',
    name_hn: 'डीन (संकाय कल्याण)',
    designation_en: 'Chairman',
    designation_hn: 'अध्यक्ष',
    department_en: 'Faculty Welfare',
    department_hn: 'संकाय कल्याण',
    role_en: 'Chairperson',
    role_hn: 'अध्यक्ष'
  },
  {
    id: 2,
    name_en: 'Dean (Student Welfare)',
    name_hn: 'डीन (छात्र कल्याण)',
    designation_en: 'Member',
    designation_hn: 'सदस्य',
    department_en: 'Student Welfare',
    department_hn: 'छात्र कल्याण',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 3,
    name_en: 'Dr Pawan Sharma',
    name_hn: 'डॉ पवन शर्मा',
    designation_en: 'Member',
    designation_hn: 'सदस्य',
    department_en: 'Department of Mathematics & Scientific Computing',
    department_hn: 'गणित और वैज्ञानिक संगणना विभाग',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 4,
    name_en: 'FI (Security)',
    name_hn: 'संकाय प्रभारी (सुरक्षा)',
    designation_en: 'Member',
    designation_hn: 'सदस्य',
    department_en: 'Security Section',
    department_hn: 'सुरक्षा अनुभाग',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 5,
    name_en: 'Associate Dean (Student Disc. & Counc.)',
    name_hn: 'एसोसिएट डीन (छात्र अनुशासन और परामर्श)',
    designation_en: 'Member',
    designation_hn: 'सदस्य',
    department_en: 'Student Welfare',
    department_hn: 'छात्र कल्याण',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 6,
    name_en: 'Chief Warden (Hostels)',
    name_hn: 'मुख्य वार्डन (छात्रावास)',
    designation_en: 'Member',
    designation_hn: 'सदस्य',
    department_en: 'Hostel Administration Block',
    department_hn: 'छात्रावास प्रशासन ब्लॉक',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 7,
    name_en: 'Prof (Mrs.) Rajeevan Chandel',
    name_hn: 'प्रो. (श्रीमती) राजीवन चंदेल',
    designation_en: 'Member',
    designation_hn: 'सदस्य',
    department_en: 'Department of Electronics & Communication Engineering',
    department_hn: 'इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग विभाग',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 8,
    name_en: 'Dr. Naveen Chauhan',
    name_hn: 'डॉ. नवीन चौहान',
    designation_en: 'Member (Liaison Officer SC/ST Cell)',
    designation_hn: 'सदस्य (संपर्क अधिकारी अनुसूचित जाति/अनुसूचित जनजाति प्रकोष्ठ)',
    department_en: 'Department of Computer Science & Engineering',
    department_hn: 'कंप्यूटर विज्ञान और इंजीनियरिंग विभाग',
    role_en: 'Member',
    role_hn: 'सदस्य'
  },
  {
    id: 9,
    name_en: 'Mr. Shivansh (Roll No. 21BCH016)',
    name_hn: 'श्री शिवांश (रोल नंबर 21BCH016)',
    designation_en: 'Special Invitee',
    designation_hn: 'विशेष आमंत्रित सदस्य',
    department_en: 'Chemical Engineering',
    department_hn: 'रासायनिक इंजीनियरिंग',
    role_en: 'Special Invitee',
    role_hn: 'विशेष आमंत्रित सदस्य'
  }
];

const FALLBACK_MEETINGS: Meeting[] = [
  {
    id: 1,
    date: '2026-03-15',
    agenda_en: 'Review of pending grievances and resolution status',
    agenda_hn: 'लंबित शिकायतों और समाधान की स्थिति की समीक्षा',
    minutes_en: 'Discussed 12 pending cases, resolved 8, referred 4 to higher authorities.',
    minutes_hn: '12 लंबित मामलों पर चर्चा की गई, 8 का समाधान किया गया, 4 को उच्च अधिकारियों के पास भेजा गया।',
    status_en: 'Completed',
    status_hn: 'पूर्ण'
  },
  {
    id: 2,
    date: '2026-02-20',
    agenda_en: 'Annual review of grievance redressal mechanism',
    agenda_hn: 'शिकायत निवारण प्रणाली की वार्षिक समीक्षा',
    minutes_en: 'Proposed improvements to online grievance portal. Approved new timeline for resolution.',
    minutes_hn: 'ऑनलाइन शिकायत पोर्टल में सुधार के प्रस्ताव दिए गए। समाधान के लिए नई समयसीमा को मंजूरी दी गई।',
    status_en: 'Completed',
    status_hn: 'पूर्ण'
  },
  {
    id: 3,
    date: '2026-06-10',
    agenda_en: 'Quarterly review meeting',
    agenda_hn: 'त्रैमासिक समीक्षा बैठक',
    minutes_en: '',
    minutes_hn: '',
    status_en: 'Scheduled',
    status_hn: 'निर्धारित'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [members, setMembers] = useState<CommitteeMember[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        
        // Fetch headings
        const headRes = await fetch(`${apiUrl}/api/student-sgrc`, { cache: 'no-store' });
        if (headRes.ok) {
          const headData = await headRes.json();
          if (headData.title_en) {
            setHeading(headData);
          }
        }

        // Fetch objectives
        const objRes = await fetch(`${apiUrl}/api/student-sgrc/objectives`, { cache: 'no-store' });
        if (objRes.ok) {
          const objData = await objRes.json();
          if (Array.isArray(objData) && objData.length > 0) {
            setObjectives(objData);
          } else {
            setObjectives(FALLBACK_OBJECTIVES);
          }
        } else {
          setObjectives(FALLBACK_OBJECTIVES);
        }

        // Fetch members
        const memRes = await fetch(`${apiUrl}/api/student-sgrc/members`, { cache: 'no-store' });
        if (memRes.ok) {
          const memData = await memRes.json();
          if (Array.isArray(memData) && memData.length > 0) {
            setMembers(memData);
          } else {
            setMembers(FALLBACK_MEMBERS);
          }
        } else {
          setMembers(FALLBACK_MEMBERS);
        }

        // Fetch meetings
        const meetRes = await fetch(`${apiUrl}/api/student-sgrc/meetings`, { cache: 'no-store' });
        if (meetRes.ok) {
          const meetData = await meetRes.json();
          if (Array.isArray(meetData) && meetData.length > 0) {
            setMeetings(meetData);
          } else {
            setMeetings(FALLBACK_MEETINGS);
          }
        } else {
          setMeetings(FALLBACK_MEETINGS);
        }
      } catch (err) {
        console.error('Error fetching SGRC data:', err);
        setObjectives(FALLBACK_OBJECTIVES);
        setMembers(FALLBACK_MEMBERS);
        setMeetings(FALLBACK_MEETINGS);
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
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800">
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
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-400">{isHindi ? 'छात्र' : 'Student'}</span>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-[#800000] font-medium">SGRC</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        {/* Subtle Decorative Ambient Circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-12 left-12 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-12 right-12 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
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

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {/* SECTION 1: ABOUT & OBJECTIVES */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* About Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
                {isHindi ? heading.about_title_hn : heading.about_title_en}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line font-normal">
                {isHindi ? heading.about_desc_hn : heading.about_desc_en}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-[#800000] font-semibold bg-[#800000]/5 px-3 py-1.5 rounded-lg border border-[#800000]/10 w-fit">
              <ShieldAlert size={14} />
              <span>{isHindi ? 'त्वरित निवारण सुनिश्चित' : 'Committed to Timely Resolution'}</span>
            </div>
          </motion.div>

          {/* Objectives Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-150 shadow-sm p-6 md:p-8 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
                {isHindi ? 'मुख्य उद्देश्य' : 'Key Objectives'}
              </h2>
              <ul className="space-y-4">
                {objectives.map((obj) => (
                  <li key={obj.id} className="flex items-start gap-3">
                    <span className="bg-emerald-100 text-emerald-800 p-1 rounded-full flex-shrink-0 mt-0.5">
                      <CheckCircle size={14} />
                    </span>
                    <p className="text-slate-700 text-sm font-medium leading-relaxed">
                      {isHindi ? obj.objective_hn : obj.objective_en}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: COMMITTEE DIRECTORY */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
            {isHindi ? 'समिति के सदस्य' : 'Committee Directory'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-fixed border-collapse">
              <colgroup>
                <col style={{ width: '8%' }} />
                <col style={{ width: '28%' }} />
                <col style={{ width: '28%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '16%' }} />
              </colgroup>
              <thead>
                <tr className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                  <th className="py-3 px-4">{isHindi ? 'क्रमांक' : 'Sl. No.'}</th>
                  <th className="py-3 px-4">{isHindi ? 'नाम' : 'Name'}</th>
                  <th className="py-3 px-4">{isHindi ? 'पद / विवरण' : 'Designation'}</th>
                  <th className="py-3 px-4">{isHindi ? 'विभाग / अनुभाग' : 'Department'}</th>
                  <th className="py-3 px-4">{isHindi ? 'भूमिका' : 'SGRC Role'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m, i) => (
                  <tr key={m.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-4 text-slate-500 font-semibold">{i + 1}</td>
                    <td className="py-4 px-4 text-slate-900 font-bold">
                      {isHindi ? m.name_hn : m.name_en}
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-medium leading-relaxed">
                      {isHindi ? m.designation_hn : m.designation_en}
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {m.department_en ? (isHindi ? m.department_hn : m.department_en) : '—'}
                    </td>
                    <td className="py-4 px-4 text-slate-700 font-semibold">
                      <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase rounded bg-gray-100 text-gray-700 border border-gray-150">
                        {isHindi ? m.role_hn : m.role_en}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* SECTION 3: RECENT MEETINGS */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-[#800000] rounded-full"></span>
            {isHindi ? 'हालिया बैठकें और परिणाम' : 'Recent Meetings & Outcomes'}
          </h2>

          <div className="grid grid-cols-1 gap-6">
            {meetings.map((meet) => (
              <div 
                key={meet.id} 
                className="bg-slate-50/40 rounded-xl border border-slate-150 p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:shadow-xs transition-shadow"
              >
                <div className="space-y-4 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-semibold text-slate-600">
                      <Calendar size={14} className="text-[#800000]" />
                      <span>{meet.date}</span>
                    </div>
                    
                    {meet.status_en === 'Completed' ? (
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                        <CheckCircle size={10} />
                        <span>{isHindi ? 'पूर्ण' : 'Completed'}</span>
                      </span>
                    ) : meet.status_en === 'Cancelled' ? (
                      <span className="bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                        <AlertTriangle size={10} />
                        <span>{isHindi ? 'रद्द' : 'Cancelled'}</span>
                      </span>
                    ) : (
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                        <Clock size={10} />
                        <span>{isHindi ? 'निर्धारित' : 'Scheduled'}</span>
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
                    <div className="space-y-1">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                        <BookOpen size={12} className="text-slate-400" />
                        <span>{isHindi ? 'बैठक का एजेंडा' : 'Agenda'}</span>
                      </h4>
                      <p className="text-sm font-semibold text-slate-800 leading-snug">
                        {isHindi ? meet.agenda_hn : meet.agenda_en}
                      </p>
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                        <CheckCircle size={12} className="text-slate-400" />
                        <span>{isHindi ? 'बैठक का परिणाम / विवरण' : 'Minutes & Outcomes'}</span>
                      </h4>
                      {meet.minutes_en ? (
                        <p className="text-sm text-slate-600 font-medium leading-relaxed">
                          {isHindi ? meet.minutes_hn : meet.minutes_en}
                        </p>
                      ) : (
                        <p className="text-xs text-slate-400 italic">
                          {isHindi ? 'बैठक अभी आयोजित की जानी है' : 'Yet to be convened.'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
