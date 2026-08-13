'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';


import { Eye, Download, Search } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

type CurriculumItem = {
  id: string;
  title: string;
  year: string;
  type: string; // PDF, DOC etc
  href: string;
};

const curriculumData: {
  btech: { new: CurriculumItem[]; old: CurriculumItem[] };
  mtech: { new: CurriculumItem[]; old: CurriculumItem[] };
} = {
  btech: {
    new: [
      {
        id: 'b-new-1',
        title:
          'B.Tech. Course Structure and Syllabus as per NEP-2020 for Second Year onwards',
        year: '2024',
        type: 'PDF',
        href: '/docs/academics/btech/new/btech-nep-2020-2nd-year-2024.pdf',
      },
      {
        id: 'b-new-2',
        title:
          'B.Arch. Teaching Scheme, Course structure & Syllabus w.e.f. Academic year 2023-24',
        year: '2023',
        type: 'PDF',
        href: '/docs/academics/btech/new/barch-2023-syllabus.pdf',
      },
      {
        id: 'b-new-3',
        title:
          'B. Tech. First year Curriculum as per NEP-2020 (July 2023 onwards)',
        year: '2023',
        type: 'PDF',
        href: '/docs/academics/btech/new/btech-first-year-nep-2023.pdf',
      },
      {
        id: 'b-new-4',
        title:
          'Course Curriculum for First Year Bachelor Programmes (2019 onwards)',
        year: '2019',
        type: 'PDF',
        href: '/docs/academics/btech/new/first-year-2019.pdf',
      },
      {
        id: 'b-new-5',
        title:
          'Course Curriculum for Second Year and onwards Bachelor Programmes (2019 onwards)',
        year: '2019',
        type: 'PDF',
        href: '/docs/academics/btech/new/second-year-2019.pdf',
      },
      {
        id: 'b-new-6',
        title: 'Open Elective Courses for Third Year Bachelor Programmes',
        year: '2024',
        type: 'PDF',
        href: '/docs/academics/btech/new/open-electives-3rd-year.pdf',
      },
    ],
    old: [
      {
        id: 'b-old-1',
        title: 'B.Tech. Course Structure (Previous Scheme)',
        year: '2015-2018',
        type: 'PDF',
        href: '/docs/academics/btech/old/btech-previous-scheme.pdf',
      },
      {
        id: 'b-old-2',
        title: 'Archived Syllabi for Legacy Programmes',
        year: '2010-2014',
        type: 'PDF',
        href: '/docs/academics/btech/old/archived-syllabi.pdf',
      },
    ],
  },
  mtech: {
    new: [
      {
        id: 'm-new-1',
        title: 'M.Tech Course Structure & Syllabus (2024 onwards)',
        year: '2024',
        type: 'PDF',
        href: '/docs/academics/mtech/new/mtech-2024.pdf',
      },
      {
        id: 'm-new-2',
        title: 'M.Tech Teaching Scheme (2023 onwards)',
        year: '2023',
        type: 'PDF',
        href: '/docs/academics/mtech/new/mtech-teaching-scheme-2023.pdf',
      },
      {
        id: 'm-new-3',
        title: 'M.Tech Programme-wise Syllabus (NEP aligned)',
        year: '2024',
        type: 'PDF',
        href: '/docs/academics/mtech/new/mtech-programme-syllabus.pdf',
      },
    ],
    old: [
      {
        id: 'm-old-1',
        title: 'M.Tech Legacy Curriculum (2016-2020)',
        year: '2016',
        type: 'PDF',
        href: '/docs/academics/mtech/old/mtech-legacy.pdf',
      },
    ],
  },
};

const departments = [
  'Department of Civil Engineering',
  'Department of Mechanical Engineering',
  'Department of Material Science & Engineering',
  'Department of Chemical Engineering',
  'Department of Electrical Engineering',
  'Department of Electronics & Communication Engineering',
  'Department of Computer Science and Engineering',
  'Department of Chemistry',
  'Department of Physics and Photonics Science',
  'Department of Mathematics and Scientific Computing',
  'Department of Architecture',
];

function slugifyDept(name: string) {
  return name
    .toLowerCase()
    .replace(/department of /g, '')
    .replace(/[^a-z0-9\s-&]+/g, '')
    .replace(/&/g, 'and')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<'btech' | 'mtech'>('btech');
  const [query, setQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<string>('All');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const activeData = useMemo(() => curriculumData[activeTab], [activeTab]);

  const years = useMemo(() => {
    const setYears = new Set<string>();
    Object.values(activeData)
      .flat()
      .forEach((i) => setYears.add(i.year));
    return ['All', ...Array.from(setYears).sort((a, b) => (a > b ? -1 : 1))];
  }, [activeData]);

  function filterItems(list: CurriculumItem[]) {
    return list.filter((item) => {
      const matchesQuery = item.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesYear = yearFilter === 'All' || item.year === yearFilter;
      return matchesQuery && matchesYear;
    });
  }

  // Keyboard navigation for tabs
  function onTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    const order = ['btech', 'mtech'] as const;
    const idx = order.indexOf(activeTab);
    if (e.key === 'ArrowRight') setActiveTab(order[(idx + 1) % order.length]);
    if (e.key === 'ArrowLeft')
      setActiveTab(order[(idx - 1 + order.length) % order.length]);
    if (e.key === 'Home') setActiveTab(order[0]);
    if (e.key === 'End') setActiveTab(order[order.length - 1]);
  }

  return (
    <main className="min-h-screen bg-white">
      

      <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/"
              className="hover:text-[#800000] transition-colors duration-200"
            >
              Home
            </Link>
            <span>›</span>
            <span className="text-gray-400">Academics</span>
            <span>›</span>
            <span className="text-[#800000] font-medium">
              Course Structure &amp; Syllabus
            </span>
          </nav>
        </div>
      </div>

      <section className="relative bg-gradient-to-br from-[#800000] via-[#631012] to-[#8B1E1E] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIgb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center py-24 md:py-32 px-6 md:px-12"
        >
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
            Course Structure &amp; Syllabus
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            Access updated course structures, teaching schemes and syllabi for
            all programmes.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Tabs */}
        <div className="mt-8">
          <div
            role="tablist"
            aria-label="Program tabs"
            className="inline-flex rounded-xl bg-white p-1 shadow-sm"
          >
            <button
              role="tab"
              aria-selected={activeTab === 'btech'}
              tabIndex={0}
              onKeyDown={onTabKeyDown}
              onClick={() => setActiveTab('btech')}
              className={`px-4 py-2 rounded-lg focus:outline-none transition font-medium text-sm ${
                activeTab === 'btech'
                  ? 'bg-gradient-to-br from-[#800000] to-[#631012] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              B.Tech
            </button>
            <button
              role="tab"
              aria-selected={activeTab === 'mtech'}
              tabIndex={0}
              onKeyDown={onTabKeyDown}
              onClick={() => setActiveTab('mtech')}
              className={`ml-2 px-4 py-2 rounded-lg focus:outline-none transition font-medium text-sm ${
                activeTab === 'mtech'
                  ? 'bg-gradient-to-br from-[#800000] to-[#631012] text-white shadow-md'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              M.Tech
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-2/3">
            <label className="relative flex items-center w-full">
              <Search className="absolute left-3 text-slate-400" />
              <input
                aria-label="Search syllabi"
                placeholder="Search by title"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-sky-200 focus:border-transparent"
              />
            </label>
            <select
              aria-label="Filter by academic year"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="ml-2 py-3 px-4 rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-sky-200"
            >
              {years.map((y) => (
                <option value={y} key={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setQuery('');
                setYearFilter('All');
              }}
              className="px-4 py-2 rounded-lg border border-slate-200 bg-white hover:shadow focus:outline-none"
            >
              Reset
            </button>
          </div>
        </div>

        {/* New Curriculum */}
        <section aria-labelledby="new-curriculum" className="mt-8">
          <div className="flex items-center justify-between">
            <h2
              id="new-curriculum"
              className="text-xl font-semibold text-slate-800"
            >
              New Curriculum
            </h2>
            <div className="text-sm text-slate-500">Updated: 10 Jan 2025</div>
          </div>

          <div className="mt-4 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Table for larger screens */}
            <div className="hidden md:block">
              <table className="w-full table-auto">
                <thead className="text-left text-slate-500 text-sm bg-slate-50">
                  <tr>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3 w-48">Academic Year</th>
                    <th className="px-6 py-3 w-36">Document Type</th>
                    <th className="px-6 py-3 w-56">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filterItems(activeData.new).map((item) => (
                    <tr
                      key={item.id}
                      className="border-t last:border-b hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 align-top">
                        <div className="font-medium text-slate-800">
                          {item.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top text-slate-600">
                        {item.year}
                      </td>
                      <td className="px-6 py-4 align-top text-slate-600">
                        {item.type}
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-center gap-3">
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-[#800000] to-[#631012] text-white hover:brightness-110 focus:outline-none"
                            aria-label={`View ${item.title}`}
                          >
                            <Eye size={16} /> View
                          </a>
                          <a
                            href={item.href}
                            download
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 focus:outline-none"
                            aria-label={`Download ${item.title}`}
                          >
                            <Download size={16} /> Download
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filterItems(activeData.new).length === 0 && (
                <div className="p-8 text-center text-slate-600">
                  No matching items found.
                </div>
              )}
            </div>

            {/* Mobile stacked cards */}
            <div className="md:hidden p-4 space-y-4">
              {filterItems(activeData.new).map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl border border-slate-100 shadow-sm bg-white"
                >
                  <div className="flex justify-between">
                    <div className="font-medium text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-500">{item.year}</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-600">{item.type}</div>
                    <div className="flex items-center gap-2">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg bg-[#800000] text-white inline-flex items-center gap-2"
                      >
                        <Eye size={14} />
                      </a>
                      <a
                        href={item.href}
                        download
                        className="px-3 py-2 rounded-lg border border-slate-200 inline-flex items-center gap-2"
                      >
                        <Download size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              {filterItems(activeData.new).length === 0 && (
                <div className="p-6 text-center text-slate-600">
                  No matching items found.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-slate-600 rounded-lg border-l-4 border-[#F6D6D6] bg-[#FFF5F5] p-4">
            <strong>Note:</strong> For any discrepancies, contact respective
            department office.
          </div>
        </section>

        {/* Old Curriculum */}
        <section aria-labelledby="old-curriculum" className="mt-10">
          <div className="flex items-center justify-between">
            <h3
              id="old-curriculum"
              className="text-xl font-semibold text-slate-800"
            >
              Old Curriculum
            </h3>
            <div className="text-sm text-slate-500">Archived</div>
          </div>

          <div className="mt-4 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 md:p-6">
              {filterItems(activeData.old).length === 0 ? (
                <div className="text-slate-600">
                  No archived curricula match your filter.
                </div>
              ) : (
                <ul className="space-y-3">
                  {filterItems(activeData.old).map((item) => (
                    <li
                      key={item.id}
                      className="flex items-start justify-between gap-4"
                    >
                      <div>
                        <div className="font-medium text-slate-800">
                          {item.title}
                        </div>
                        <div className="text-sm text-slate-500">
                          {item.year} • {item.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-br from-[#800000] to-[#631012] text-white"
                        >
                          <Eye size={14} /> View
                        </a>
                        <a
                          href={item.href}
                          download
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200"
                        >
                          <Download size={14} /> Download
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

        {/* Departments */}
        <section aria-labelledby="departments" className="mt-10">
          <h3 id="departments" className="text-xl font-semibold text-slate-800">
            Departments
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Select a department to view programme-wise syllabi and downloadable
            PDFs.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((d) => {
              const slug = slugifyDept(d);
              return (
                <motion.div
                  key={d}
                  whileHover={{ y: -6 }}
                  className="p-4 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-2xl transition-transform"
                >
                  <div className="font-semibold text-slate-800">{d}</div>
                  <div className="mt-2 text-sm text-slate-500">
                    Syllabus, scheme &amp; downloadable PDFs
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link
                      href={`/academics/course-structure-syllabus/${slug}`}
                      className="px-4 py-2 rounded-lg bg-gradient-to-br from-[#800000] to-[#631012] text-white inline-flex items-center gap-2"
                    >
                      View All
                    </Link>
                    <button
                      onClick={() =>
                        setToast('Coming soon: department bulk download')
                      }
                      className="px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50"
                    >
                      Download All
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 bottom-6 z-50 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-md">
          {toast}
        </div>
      )}
      
    </main>
  );
}
