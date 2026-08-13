'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';


interface AlumniData {
  id: number;
  name: string;
  rollNo: string;
  degree: string;
  department: string;
  batch: string;
  passingYear: string;
}

const sampleAlumniData: AlumniData[] = [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar Sharma',
    rollNo: 'CSE-19201',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    batch: '1988-1992',
    passingYear: '1992',
  },
  {
    id: 2,
    name: 'Ms. Priya Mehta',
    rollNo: 'ECE-19503',
    degree: 'B.Tech',
    department: 'Electronics & Communication',
    batch: '1991-1995',
    passingYear: '1995',
  },
  {
    id: 3,
    name: 'Mr. Amit Singh',
    rollNo: 'ME-19801',
    degree: 'B.Tech',
    department: 'Mechanical Engineering',
    batch: '1994-1998',
    passingYear: '1998',
  },
  {
    id: 4,
    name: 'Dr. Sunita Verma',
    rollNo: 'EE-200002',
    degree: 'M.Tech',
    department: 'Electrical Engineering',
    batch: '1998-2000',
    passingYear: '2000',
  },
  {
    id: 5,
    name: 'Mr. Vikram Joshi',
    rollNo: 'CE-200205',
    degree: 'B.Tech',
    department: 'Civil Engineering',
    batch: '1998-2002',
    passingYear: '2002',
  },
  {
    id: 6,
    name: 'Dr. Ananya Reddy',
    rollNo: 'CSE-200510',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    batch: '2001-2005',
    passingYear: '2005',
  },
  {
    id: 7,
    name: 'Mr. Karan Malhotra',
    rollNo: 'ECE-200815',
    degree: 'B.Tech',
    department: 'Electronics & Communication',
    batch: '2004-2008',
    passingYear: '2008',
  },
  {
    id: 8,
    name: 'Ms. Deepika Nair',
    rollNo: 'CSE-201020',
    degree: 'M.Tech',
    department: 'Computer Science & Engineering',
    batch: '2008-2010',
    passingYear: '2010',
  },
  {
    id: 9,
    name: 'Mr. Rohan Kapoor',
    rollNo: 'ME-201225',
    degree: 'B.Tech',
    department: 'Mechanical Engineering',
    batch: '2008-2012',
    passingYear: '2012',
  },
  {
    id: 10,
    name: 'Ms. Shreya Agarwal',
    rollNo: 'CSE-201530',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    batch: '2011-2015',
    passingYear: '2015',
  },
  {
    id: 11,
    name: 'Mr. Arjun Reddy',
    rollNo: 'ECE-201835',
    degree: 'B.Tech',
    department: 'Electronics & Communication',
    batch: '2014-2018',
    passingYear: '2018',
  },
  {
    id: 12,
    name: 'Ms. Nidhi Sharma',
    rollNo: 'CSE-202040',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    batch: '2016-2020',
    passingYear: '2020',
  },
  {
    id: 13,
    name: 'Mr. Aditya Verma',
    rollNo: 'EE-202145',
    degree: 'B.Tech',
    department: 'Electrical Engineering',
    batch: '2017-2021',
    passingYear: '2021',
  },
  {
    id: 14,
    name: 'Ms. Kavya Iyer',
    rollNo: 'CSE-202250',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    batch: '2018-2022',
    passingYear: '2022',
  },
  {
    id: 15,
    name: 'Mr. Rahul Gupta',
    rollNo: 'ME-202355',
    degree: 'B.Tech',
    department: 'Mechanical Engineering',
    batch: '2019-2023',
    passingYear: '2023',
  },
  {
    id: 16,
    name: 'Ms. Isha Patel',
    rollNo: 'CSE-202460',
    degree: 'B.Tech',
    department: 'Computer Science & Engineering',
    batch: '2020-2024',
    passingYear: '2024',
  },
  {
    id: 17,
    name: 'Dr. Manish Choudhary',
    rollNo: 'PHD-201805',
    degree: 'Ph.D',
    department: 'Computer Science & Engineering',
    batch: '2014-2018',
    passingYear: '2018',
  },
  {
    id: 18,
    name: 'Mr. Sanjay Kumar',
    rollNo: 'MCA-201510',
    degree: 'MCA',
    department: 'Master of Computer Applications',
    batch: '2012-2015',
    passingYear: '2015',
  },
];

const ITEMS_PER_PAGE = 15;

const degrees = ['All', 'B.Tech', 'M.Tech', 'Ph.D', 'MCA', 'MBA'];
const departments = [
  'All',
  'Computer Science & Engineering',
  'Electronics & Communication',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Master of Computer Applications',
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = ['All'];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year.toString());
  }
  return years;
};

const TableRowSkeleton = () => (
  <div className="animate-pulse">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="flex items-center gap-4 py-4 px-6 border-b border-gray-100"
      >
        <div className="h-4 bg-gray-200 rounded w-8"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </div>
    ))}
  </div>
);

const CardSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-center py-16"
  >
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
      <svg
        className="w-10 h-10 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      No Alumni Found
    </h3>
    <p className="text-gray-500 max-w-md mx-auto">
      No alumni match your current search criteria. Try adjusting your filters
      or search terms.
    </p>
  </motion.div>
);

const AlumniCard = ({
  alumni,
  index,
}: {
  alumni: AlumniData;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
  >
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {alumni.name}
          </h3>
          <p className="text-sm text-[#631012] font-medium">{alumni.rollNo}</p>
        </div>
        <span className="px-3 py-1 bg-[#631012] text-white text-xs font-medium rounded-full">
          {alumni.passingYear}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <span className="text-gray-500 min-w-[100px] font-medium">
            Degree:
          </span>
          <span className="text-gray-900">{alumni.degree}</span>
        </div>
        <div className="flex items-start">
          <span className="text-gray-500 min-w-[100px] font-medium">
            Department:
          </span>
          <span className="text-gray-900">{alumni.department}</span>
        </div>
        <div className="flex items-start">
          <span className="text-gray-500 min-w-[100px] font-medium">
            Batch:
          </span>
          <span className="text-gray-900">{alumni.batch}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function ListOfAlumni() {
  const [alumni, setAlumni] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const years = useMemo(() => generateYears(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        setAlumni(sampleAlumniData);
      } catch (error) {
        console.error('Error fetching alumni:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAlumni = useMemo(() => {
    return alumni.filter((alumnus) => {
      const matchesSearch =
        searchQuery === '' ||
        alumnus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alumnus.rollNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDegree =
        selectedDegree === 'All' || alumnus.degree === selectedDegree;

      const matchesDepartment =
        selectedDepartment === 'All' ||
        alumnus.department === selectedDepartment;

      const matchesYear =
        selectedYear === 'All' || alumnus.passingYear === selectedYear;

      return matchesSearch && matchesDegree && matchesDepartment && matchesYear;
    });
  }, [alumni, searchQuery, selectedDegree, selectedDepartment, selectedYear]);

  const totalPages = Math.ceil(filteredAlumni.length / ITEMS_PER_PAGE);

  const paginatedAlumni = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAlumni.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAlumni, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDegree, selectedDepartment, selectedYear]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedDegree('All');
    setSelectedDepartment('All');
    setSelectedYear('All');
    setCurrentPage(1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <>
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
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
              <span className="text-gray-400">Alumni</span>
              <span>›</span>
              <span className="text-[#800000] font-medium">List of Alumni</span>
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
                List of Alumni
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Directory of alumni of NIT Hamirpur across batches and programs.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Filters Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm p-6 mb-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <svg
                  className="w-5 h-5 text-[#631012]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="font-semibold text-gray-700">
                  Search & Filter Alumni
                </span>
              </div>

              {/* Search Bar */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name or roll number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all duration-200"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Filter Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree
                  </label>
                  <select
                    value={selectedDegree}
                    onChange={(e) => setSelectedDegree(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all duration-200 bg-white"
                  >
                    {degrees.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all duration-200 bg-white"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passing Year
                  </label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all duration-200 bg-white"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchQuery !== '' ||
                selectedDegree !== 'All' ||
                selectedDepartment !== 'All' ||
                selectedYear !== 'All') && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleClearFilters}
                    className="px-5 py-2 text-sm font-medium text-[#631012] hover:text-white hover:bg-[#631012] border-2 border-[#631012] rounded-xl transition-all duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </motion.div>

            {/* Results Count */}
            {!loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-6 flex items-center justify-between"
              >
                <p className="text-gray-600">
                  Showing{' '}
                  <span className="font-semibold text-[#631012]">
                    {paginatedAlumni.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-semibold">{filteredAlumni.length}</span>{' '}
                  alumni
                </p>
              </motion.div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden">
                <TableRowSkeleton />
              </div>
            )}
            {loading && (
              <div className="lg:hidden">
                <CardSkeleton />
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredAlumni.length === 0 && <EmptyState />}

            {/* Desktop Table View */}
            {!loading && filteredAlumni.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="hidden lg:block bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-16">
                          Sl. No.
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Name & Roll No.
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Degree
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Batch
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <AnimatePresence mode="wait">
                        {paginatedAlumni.map((alumnus, index) => (
                          <motion.tr
                            key={alumnus.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.03 }}
                            className="hover:bg-gray-50 transition-colors duration-200"
                          >
                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                              {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <div className="font-semibold text-gray-900">
                                  {alumnus.name}
                                </div>
                                <div className="text-sm text-[#631012]">
                                  {alumnus.rollNo}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {alumnus.degree}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {alumnus.department}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-[#631012] text-white text-xs font-medium rounded-full">
                                {alumnus.passingYear}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Mobile Card View */}
            {!loading && filteredAlumni.length > 0 && (
              <div className="lg:hidden space-y-4">
                {paginatedAlumni.map((alumnus, index) => (
                  <AlumniCard key={alumnus.id} alumni={alumnus} index={index} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && filteredAlumni.length > 0 && totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex justify-center"
              >
                <div className="inline-flex items-center gap-1 bg-white rounded-xl shadow-sm p-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#631012]'
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div className="flex items-center gap-1 px-2">
                    {getPageNumbers().map((page, index) => (
                      <React.Fragment key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <button
                            onClick={() => setCurrentPage(page as number)}
                            className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                              currentPage === page
                                ? 'bg-[#631012] text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === totalPages
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#631012]'
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </div>
      
    </>
  );
}
