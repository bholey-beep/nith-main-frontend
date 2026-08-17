'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Loader2, BookOpen, Eye, FlaskConical, Users, Building2, Phone, Mail, ExternalLink, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

interface DeptFull {
  department: any;
  vision: any;
  faculty: any[];
  staff: any[];
  programmes: any[];
  labs: any[];
  contact: any;
  research: {
    publications: any[];
    projects: any[];
    written: any[];
    supervision: any[];
  };
}

type SectionKey = 'about' | 'vision' | 'faculty' | 'staff' | 'programmes' | 'labs' | 'research' | 'contact';
type ResearchKey = 'publications' | 'projects' | 'written' | 'supervision';

const FACULTY_ORDER = ['Professor', 'Associate Professor', 'Assistant Professor Grade-I', 'Assistant Professor Grade-II', 'Assistant Professor'];

// Navigation sidebar matching screenshot
const NAV_ITEMS: { key: SectionKey; label: string }[] = [
  { key: 'about', label: 'About Us' },
  { key: 'vision', label: 'Vision & Mission' },
  { key: 'faculty', label: 'Faculty' },
  { key: 'staff', label: 'Staff' },
  { key: 'programmes', label: 'Programme Offered' },
  { key: 'labs', label: 'Labs' },
  { key: 'research', label: 'Research Publications' },
  { key: 'contact', label: 'Contact' },
];

export default function DepartmentDetailPage({ params }: { params: { id: string } }) {
  const language = useSelector((state: RootState) => state.language?.value || 'en');
  const isHindi = language === 'hi';

  const [data, setData] = useState<DeptFull | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('about');
  const [activeResearch, setActiveResearch] = useState<ResearchKey>('publications');

  // Pagination for publications
  const [pubPage, setPubPage] = useState(1);
  const [pubSearch, setPubSearch] = useState('');
  const [pubYear, setPubYear] = useState('');
  const [pubsData, setPubsData] = useState<{ data: any[]; total: number }>({ data: [], total: 0 });
  const [pubLoading, setPubLoading] = useState(false);
  const PUB_LIMIT = 25;

  useEffect(() => {
    fetch(`${API_BASE}/api/departments/${params.id}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [params.id]);

  useEffect(() => {
    if (activeSection !== 'research' || activeResearch !== 'publications') return;
    setPubLoading(true);
    const qs = new URLSearchParams({ page: String(pubPage), limit: String(PUB_LIMIT) });
    if (pubSearch) qs.set('search', pubSearch);
    if (pubYear) qs.set('year', pubYear);
    fetch(`${API_BASE}/api/departments/${params.id}/research/publications?${qs}`)
      .then(r => r.json())
      .then(d => { setPubsData(d); setPubLoading(false); })
      .catch(() => setPubLoading(false));
  }, [activeSection, activeResearch, pubPage, pubSearch, pubYear, params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="w-8 h-8 animate-spin text-[#631012]" />
    </div>
  );

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-500">Department not found.</p>
    </div>
  );

  const { department, vision, faculty, staff, programmes, labs, contact, research } = data;
  const deptName = isHindi ? department?.name_hn || department?.name_en : department?.name_en;

  // Group faculty by type
  const facultyByType: Record<string, any[]> = {};
  FACULTY_ORDER.forEach(t => { facultyByType[t] = []; });
  faculty.forEach(f => {
    const t = f.type || 'Other';
    if (!facultyByType[t]) facultyByType[t] = [];
    facultyByType[t].push(f);
  });
  const facultyTypes = FACULTY_ORDER.filter(t => facultyByType[t]?.length > 0);

  // Group staff by type
  const officeStaff = staff.filter(s => s.type === 'Office Staff');
  const technicalStaff = staff.filter(s => s.type === 'Technical Staff');

  const totalPubPages = Math.ceil(pubsData.total / PUB_LIMIT);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012]">Home</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <Link href="/departments" className="hover:text-[#631012]">Departments</Link>
          <ChevronRight size={12} className="text-gray-400" />
          <span className="text-[#631012] font-bold">{deptName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-0">
        {/* LEFT SIDEBAR NAV — matching screenshot */}
        <aside className="md:w-52 shrink-0 border-r border-gray-300 md:min-h-[calc(100vh-120px)] bg-white">
          <nav className="sticky top-0">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-b border-gray-200 ${
                  activeSection === item.key
                    ? 'bg-[#0c2340] text-white font-bold'
                    : 'text-[#631012] hover:bg-gray-50 hover:text-[#800000]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-grow min-h-[calc(100vh-120px)] border-l border-gray-200">

          {/* ── ABOUT US ──────────────────────────────────────────────────── */}
          {activeSection === 'about' && (
            <div className="p-6 space-y-6">
              <h1 className="text-xl font-bold text-center text-gray-900">{deptName}</h1>

              {department.photo_url && (
                <div className="flex justify-center">
                  <img
                    src={department.photo_url}
                    alt={deptName}
                    className="w-full max-w-2xl h-64 object-cover border border-gray-300 rounded"
                  />
                </div>
              )}

              <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                {isHindi ? department.description_hn || department.description_en : department.description_en}
              </div>
            </div>
          )}

          {/* ── VISION & MISSION ─────────────────────────────────────────── */}
          {activeSection === 'vision' && (
            <div className="p-6 space-y-8">
              <div className="text-center space-y-1">
                <h2 className="text-lg font-bold text-[#631012]">Our Vision</h2>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed text-center max-w-2xl mx-auto">
                {isHindi ? vision?.vision_hn || vision?.vision_en : vision?.vision_en}
              </p>

              <div className="text-center space-y-1 pt-4">
                <h2 className="text-lg font-bold text-[#631012]">Our Mission</h2>
              </div>
              <div className="text-sm text-gray-800 leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
                {isHindi ? vision?.mission_hn || vision?.mission_en : vision?.mission_en}
              </div>
            </div>
          )}

          {/* ── FACULTY ──────────────────────────────────────────────────── */}
          {activeSection === 'faculty' && (
            <div className="p-4 space-y-6">
              {facultyTypes.map((type) => (
                <div key={type} className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-[#e0eaf4] border-b border-gray-300 px-4 py-2 text-center">
                    <h3 className="text-sm font-bold text-[#0c2340]">{type}</h3>
                  </div>
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0c2340] text-white font-bold text-xs">
                        <th className="py-2.5 px-3 w-14 border-r border-white/20">Sl.No</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Name</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Area(s) of Interests</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Email</th>
                        <th className="py-2.5 px-3 text-center">Profile</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {facultyByType[type].map((f, i) => (
                        <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-3 text-center text-gray-600 border-r border-gray-200 font-bold text-xs">
                            {f.sl_no || i + 1}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200 font-bold text-gray-900">
                            {f.name || f.name_en}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700 leading-relaxed">
                            {f.area_of_interest}
                          </td>
                          <td className="py-3 px-4 border-r border-gray-200">
                            {f.email ? (
                              <a href={`mailto:${f.email}`} className="text-[#2563eb] hover:underline text-xs font-mono">
                                {f.email}
                              </a>
                            ) : '-'}
                          </td>
                          <td className="py-3 px-3 text-center">
                            {f.profile_link ? (
                              <a href={f.profile_link} target="_blank" rel="noreferrer"
                                className="text-[#631012] font-bold text-xs hover:underline">
                                View
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
              {faculty.length === 0 && (
                <p className="text-center text-gray-500 py-12 text-sm">No faculty records found.</p>
              )}
            </div>
          )}

          {/* ── STAFF ────────────────────────────────────────────────────── */}
          {activeSection === 'staff' && (
            <div className="p-4 space-y-6">
              {/* Office Staff */}
              {officeStaff.length > 0 && (
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-[#e0eaf4] border-b border-gray-300 px-4 py-2 text-center">
                    <h3 className="text-sm font-bold text-[#0c2340]">Office Staff</h3>
                  </div>
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0c2340] text-white font-bold text-xs">
                        <th className="py-2.5 px-3 w-16 border-r border-white/20">Sl. No.</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Name</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Designation</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Phone No.</th>
                        <th className="py-2.5 px-4">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {officeStaff.map((s, i) => (
                        <tr key={s.id} className="hover:bg-gray-50">
                          <td className="py-3 px-3 text-center text-gray-600 border-r border-gray-200">{s.sl_no || i + 1}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-[#2563eb] font-medium">{s.name}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700">{s.designation}</td>
                          <td className="py-3 px-4 border-r border-gray-200 font-mono text-xs">{s.phone_no || '-'}</td>
                          <td className="py-3 px-4 text-xs">{s.email || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Technical Staff */}
              {technicalStaff.length > 0 && (
                <div className="border border-gray-300 rounded overflow-hidden">
                  <div className="bg-[#e0eaf4] border-b border-gray-300 px-4 py-2 text-center">
                    <h3 className="text-sm font-bold text-[#0c2340]">Technical Staff</h3>
                  </div>
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0c2340] text-white font-bold text-xs">
                        <th className="py-2.5 px-3 w-16 border-r border-white/20">Sl. No.</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Name</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Designation</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Phone No.</th>
                        <th className="py-2.5 px-4">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {technicalStaff.map((s, i) => (
                        <tr key={s.id} className="hover:bg-gray-50">
                          <td className="py-3 px-3 text-center text-gray-600 border-r border-gray-200">{s.sl_no || i + 1}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-[#2563eb] font-medium">{s.name}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-[#631012] font-medium">{s.designation}</td>
                          <td className="py-3 px-4 border-r border-gray-200 font-mono text-xs">{s.phone_no || '-'}</td>
                          <td className="py-3 px-4 text-xs">{s.email || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {staff.length === 0 && (
                <p className="text-center text-gray-500 py-12 text-sm">No staff records found.</p>
              )}
            </div>
          )}

          {/* ── PROGRAMMES ───────────────────────────────────────────────── */}
          {activeSection === 'programmes' && (
            <div className="p-4">
              <div className="border border-gray-300 rounded overflow-hidden max-w-lg">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0c2340] text-white font-bold text-xs">
                      <th className="py-2.5 px-4 w-20 border-r border-white/20">Sl. No.</th>
                      <th className="py-2.5 px-4">Programmes Offered</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {programmes.map((p, i) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-center text-gray-600 border-r border-gray-200">{p.sl_no || i + 1}</td>
                        <td className="py-3 px-4 text-[#631012] font-medium">
                          {isHindi ? p.program_name_hn || p.program_name_en : p.program_name_en}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── LABS ─────────────────────────────────────────────────────── */}
          {activeSection === 'labs' && (
            <div className="p-4">
              <div className="border border-gray-300 rounded overflow-hidden max-w-xl">
                <div className="bg-[#e0eaf4] border-b border-gray-300 px-4 py-2 text-center">
                  <h3 className="text-sm font-bold text-[#0c2340]">List of Laboratories</h3>
                </div>
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0c2340] text-white font-bold text-xs">
                      <th className="py-2.5 px-4 w-20 border-r border-white/20">Sl. No.</th>
                      <th className="py-2.5 px-4">Laboratory Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {labs.map((l, i) => (
                      <tr key={l.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-center text-gray-600 border-r border-gray-200 font-bold">{l.sl_no || i + 1}</td>
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {isHindi ? l.lab_name_hn || l.lab_name_en : l.lab_name_en}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── RESEARCH PUBLICATIONS ────────────────────────────────────── */}
          {activeSection === 'research' && (
            <div className="p-4 space-y-4">
              {/* Research sub-tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
                {([
                  { key: 'publications', label: 'Research Publications' },
                  { key: 'projects', label: 'Research Projects' },
                  { key: 'written', label: 'Book/Chapters Written' },
                  { key: 'supervision', label: 'Research Supervision' },
                ] as { key: ResearchKey; label: string }[]).map(t => (
                  <button
                    key={t.key}
                    onClick={() => setActiveResearch(t.key)}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition-colors border ${
                      activeResearch === t.key
                        ? 'bg-[#631012] text-white border-[#631012]'
                        : 'bg-white text-[#631012] border-[#631012] hover:bg-[#631012]/5'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* PUBLICATIONS */}
              {activeResearch === 'publications' && (
                <div className="space-y-3">
                  {/* Filters */}
                  <div className="flex flex-wrap gap-3">
                    <div className="relative">
                      <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={pubSearch}
                        onChange={e => { setPubSearch(e.target.value); setPubPage(1); }}
                        className="pl-7 pr-3 py-1.5 border border-gray-300 rounded text-xs w-48 focus:outline-none focus:border-[#631012]"
                      />
                    </div>
                    <input
                      type="number"
                      placeholder="Year"
                      value={pubYear}
                      onChange={e => { setPubYear(e.target.value); setPubPage(1); }}
                      className="px-3 py-1.5 border border-gray-300 rounded text-xs w-24 focus:outline-none focus:border-[#631012]"
                    />
                    <span className="text-xs text-gray-500 self-center">
                      Found {pubsData.total} publications
                    </span>
                  </div>

                  <div className="overflow-x-auto border border-gray-300 rounded">
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#0c2340] text-white font-bold text-xs">
                          <th className="py-2.5 px-3 w-16 border-r border-white/20">Year</th>
                          <th className="py-2.5 px-4 border-r border-white/20">Author(s)</th>
                          <th className="py-2.5 px-4 border-r border-white/20">Title & Vol. No.</th>
                          <th className="py-2.5 px-4 border-r border-white/20">Journal Name</th>
                          <th className="py-2.5 px-3 w-28">Indexing (SCI)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {pubLoading ? (
                          <tr><td colSpan={5} className="py-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-[#631012]" /></td></tr>
                        ) : pubsData.data.map((p, i) => (
                          <tr key={p.id || i} className="hover:bg-gray-50 align-top">
                            <td className="py-3 px-3 border-r border-gray-200 font-bold text-center text-gray-800">{p.year}</td>
                            <td className="py-3 px-4 border-r border-gray-200 text-gray-700 leading-relaxed">{p.author}</td>
                            <td className="py-3 px-4 border-r border-gray-200 text-gray-800 leading-relaxed">
                              {p.title}
                              {p.doi && (
                                <div className="mt-1">
                                  <a href={p.doi} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-[11px] flex items-center gap-1">
                                    <ExternalLink size={10} />DOI
                                  </a>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4 border-r border-gray-200 text-gray-700 leading-relaxed">{p.journal_name}</td>
                            <td className="py-3 px-3 text-center text-gray-600">{p.sci || '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {totalPubPages > 1 && (
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-gray-500">
                        Page {pubPage} of {totalPubPages}
                      </span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setPubPage(p => Math.max(1, p - 1))}
                          disabled={pubPage === 1}
                          className="px-3 py-1 border rounded text-xs disabled:opacity-40 hover:bg-gray-50"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setPubPage(p => Math.min(totalPubPages, p + 1))}
                          disabled={pubPage === totalPubPages}
                          className="px-3 py-1 border rounded text-xs disabled:opacity-40 hover:bg-gray-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PROJECTS */}
              {activeResearch === 'projects' && (
                <div className="overflow-x-auto border border-gray-300 rounded">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0c2340] text-white font-bold text-xs">
                        <th className="py-2.5 px-3 border-r border-white/20">Role</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Title</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Funding Agency</th>
                        <th className="py-2.5 px-3 border-r border-white/20">Period</th>
                        <th className="py-2.5 px-3 border-r border-white/20">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {research.projects.map((p, i) => (
                        <tr key={p.id || i} className="hover:bg-gray-50 align-top">
                          <td className="py-3 px-3 border-r border-gray-200 text-gray-700">{p.role}</td>
                          <td className="py-3 px-4 border-r border-gray-200 font-medium text-gray-900">{p.title}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700">{p.funding_agency}</td>
                          <td className="py-3 px-3 border-r border-gray-200 text-gray-600 whitespace-nowrap">{p.from_date} – {p.to_date}</td>
                          <td className="py-3 px-3 border-r border-gray-200 font-mono">{p.amount}</td>
                          <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded text-[11px] font-bold ${p.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{p.status}</span></td>
                        </tr>
                      ))}
                      {research.projects.length === 0 && (
                        <tr><td colSpan={6} className="py-10 text-center text-gray-500 text-sm">No research projects found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* BOOKS/CHAPTERS */}
              {activeResearch === 'written' && (
                <div className="overflow-x-auto border border-gray-300 rounded">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0c2340] text-white font-bold text-xs">
                        <th className="py-2.5 px-3 border-r border-white/20">Year</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Author(s)</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Title</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Publisher</th>
                        <th className="py-2.5 px-3">ISBN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {research.written.map((w, i) => (
                        <tr key={w.id || i} className="hover:bg-gray-50 align-top">
                          <td className="py-3 px-3 border-r border-gray-200 font-bold text-gray-800">{w.year}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700">{w.author}</td>
                          <td className="py-3 px-4 border-r border-gray-200 font-medium text-gray-900">{w.title}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700">{w.publisher}</td>
                          <td className="py-3 px-3 font-mono text-xs text-gray-600">{w.isbn}</td>
                        </tr>
                      ))}
                      {research.written.length === 0 && (
                        <tr><td colSpan={5} className="py-10 text-center text-gray-500 text-sm">No books/chapters found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUPERVISION */}
              {activeResearch === 'supervision' && (
                <div className="overflow-x-auto border border-gray-300 rounded">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#0c2340] text-white font-bold text-xs">
                        <th className="py-2.5 px-4 border-r border-white/20">Program</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Scholar Name</th>
                        <th className="py-2.5 px-4 border-r border-white/20">Research Topic</th>
                        <th className="py-2.5 px-3 border-r border-white/20">Year</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {research.supervision.map((s, i) => (
                        <tr key={s.id || i} className="hover:bg-gray-50 align-top">
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700">{s.program_name}</td>
                          <td className="py-3 px-4 border-r border-gray-200 font-bold text-gray-900">{s.scholar_name}</td>
                          <td className="py-3 px-4 border-r border-gray-200 text-gray-700 leading-relaxed">{s.research_topic}</td>
                          <td className="py-3 px-3 border-r border-gray-200 font-mono">{s.year}</td>
                          <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded text-[11px] font-bold ${s.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>{s.status}</span></td>
                        </tr>
                      ))}
                      {research.supervision.length === 0 && (
                        <tr><td colSpan={5} className="py-10 text-center text-gray-500 text-sm">No supervision records found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── CONTACT ──────────────────────────────────────────────────── */}
          {activeSection === 'contact' && (
            <div className="p-6 space-y-4">
              {contact ? (
                <div className="max-w-md space-y-3 text-sm text-gray-800">
                  <div className="font-bold text-[#631012] text-base">{contact.hod_en}</div>
                  <div className="font-bold">Head of Department</div>
                  <div className="text-gray-700">{contact.department}</div>
                  <div className="text-gray-700">{contact.college}</div>
                  <div className="text-gray-700">{contact.address}</div>

                  <div className="pt-2 space-y-2">
                    {contact.phone_no && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-[#631012] shrink-0" />
                        <span className="font-mono">{contact.phone_no}</span>
                      </div>
                    )}
                    {contact.hod_email && (
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#631012] shrink-0" />
                        <span>HoD Email : </span>
                        <a href={`mailto:${contact.hod_email}`} className="text-blue-700 hover:underline font-mono">
                          {contact.hod_email}
                        </a>
                      </div>
                    )}
                    {contact.office_email && (
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#631012] shrink-0" />
                        <span>Office Email : </span>
                        <a href={`mailto:${contact.office_email}`} className="text-blue-700 hover:underline font-mono">
                          {contact.office_email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm py-12 text-center">No contact information available.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
