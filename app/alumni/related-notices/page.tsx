'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';


interface NewsItem {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

interface ArchiveMonth {
  month: string;
  year: number;
  count: number;
  key: string;
}

// Sample news data by Ai - yha API call karna hai
const sampleNewsData: NewsItem[] = [
  {
    id: 1,
    title: 'NITH Alumni Association Announces Annual Meet 2025',
    description:
      'The NIT Hamirpur Alumni Association is pleased to announce the Annual Alumni Meet scheduled for March 2025. All registered alumni are cordially invited to participate in this grand event celebrating our shared legacy.',
    image: '/news/alumni-meet.jpg',
    date: '2025-01-15',
    category: 'Events',
    slug: 'annual-meet-2025',
  },
  {
    id: 2,
    title: 'Distinguished Alumni Award Nominations Open',
    description:
      'Nominations are now open for the Distinguished Alumni Award 2025. The award recognizes outstanding contributions by NITH alumni in their respective fields. Submit your nominations before the deadline.',
    image: '/news/award.jpg',
    date: '2025-01-12',
    category: 'Awards',
    slug: 'distinguished-alumni-award-2025',
  },
  {
    id: 3,
    title: 'New Alumni Mentorship Program Launched',
    description:
      'A new mentorship program connecting current students with experienced alumni professionals has been launched. The program aims to provide career guidance and industry insights to students.',
    image: '/news/mentorship.jpg',
    date: '2025-01-10',
    category: 'Programs',
    slug: 'mentorship-program-launch',
  },
  {
    id: 4,
    title: 'Alumni Funded Scholarship Scheme Extended',
    description:
      'The alumni-funded scholarship scheme has been extended to cover more deserving students. Thanks to generous contributions from our alumni, we can now support additional scholars.',
    image: '/news/scholarship.jpg',
    date: '2025-01-08',
    category: 'Scholarships',
    slug: 'scholarship-extension',
  },
  {
    id: 5,
    title: 'Tech Talk Series: AI and Machine Learning',
    description:
      'Join us for an insightful tech talk by our distinguished alumnus on the latest advancements in AI and Machine Learning. The session will cover practical applications and career opportunities.',
    image: '/news/tech-talk.jpg',
    date: '2025-01-05',
    category: 'Webinars',
    slug: 'tech-talk-ai-ml',
  },
  {
    id: 6,
    title: 'Alumni Reunion: Batch of 2010',
    description:
      'The batch of 2010 is organizing a reunion event on campus. Former classmates are invited to reconnect and relive memories at their alma mater.',
    image: '/news/reunion.jpg',
    date: '2024-12-28',
    category: 'Reunions',
    slug: 'batch-2010-reunion',
  },
  {
    id: 7,
    title: 'Campus Infrastructure Upgrade with Alumni Support',
    description:
      'Major infrastructure upgrades are underway at NIT Hamirpur, funded partially by generous alumni donations. The new facilities will benefit current and future generations of students.',
    image: '/news/infrastructure.jpg',
    date: '2024-12-25',
    category: 'Development',
    slug: 'infrastructure-upgrade',
  },
  {
    id: 8,
    title: 'Alumni Entrepreneurs Panel Discussion',
    description:
      'A panel discussion featuring successful alumni entrepreneurs will be held next month. Learn about their journeys, challenges, and advice for aspiring entrepreneurs.',
    image: '/news/entrepreneurs.jpg',
    date: '2024-12-20',
    category: 'Events',
    slug: 'entrepreneurs-panel',
  },
  {
    id: 9,
    title: 'International Alumni Chapter Established in USA',
    description:
      'A new international alumni chapter has been established in the United States. This will help connect NITH alumni residing in the USA and facilitate networking opportunities.',
    image: '/news/usa-chapter.jpg',
    date: '2024-12-18',
    category: 'Chapters',
    slug: 'usa-chapter-launch',
  },
  {
    id: 10,
    title: 'Alumni Contribution to Research Grants',
    description:
      'Thanks to alumni contributions, new research grants have been established for faculty and students. These grants will support innovative research projects across departments.',
    image: '/news/research.jpg',
    date: '2024-12-15',
    category: 'Research',
    slug: 'research-grants',
  },
  {
    id: 11,
    title: 'Career Fair Sponsored by Alumni Network',
    description:
      'The upcoming career fair will feature companies led by NITH alumni. This is a great opportunity for students to explore job and internship opportunities.',
    image: '/news/career-fair.jpg',
    date: '2024-12-10',
    category: 'Placements',
    slug: 'alumni-career-fair',
  },
  {
    id: 12,
    title: 'Alumni Sports Tournament Announced',
    description:
      'An inter-batch alumni sports tournament is being organized. Former athletes and sports enthusiasts are invited to participate in various sporting events.',
    image: '/news/sports.jpg',
    date: '2024-12-05',
    category: 'Sports',
    slug: 'sports-tournament',
  },
  {
    id: 13,
    title: 'Foundation Day Celebrations with Alumni',
    description:
      "NIT Hamirpur Foundation Day celebrations will feature special alumni participation. Join us in celebrating our institution's journey and achievements.",
    image: '/news/foundation-day.jpg',
    date: '2024-11-28',
    category: 'Events',
    slug: 'foundation-day-2024',
  },
  {
    id: 14,
    title: 'Alumni Directory Update Request',
    description:
      'We are updating our alumni directory. Please ensure your contact information and professional details are current to stay connected with the NITH community.',
    image: '/news/directory.jpg',
    date: '2024-11-25',
    category: 'Announcements',
    slug: 'directory-update',
  },
  {
    id: 15,
    title: 'Webinar: Career Transition Tips from Alumni',
    description:
      'Learn valuable tips on career transitions from alumni who have successfully navigated career changes. Register now for this informative webinar.',
    image: '/news/career-webinar.jpg',
    date: '2024-11-20',
    category: 'Webinars',
    slug: 'career-transition-webinar',
  },
];

const generateArchives = (news: NewsItem[]): ArchiveMonth[] => {
  const archiveMap = new Map<string, ArchiveMonth>();

  news.forEach((item) => {
    const date = new Date(item.date);
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const key = `${year}-${date.getMonth()}`;

    if (archiveMap.has(key)) {
      archiveMap.get(key)!.count++;
    } else {
      archiveMap.set(key, { month, year, count: 1, key });
    }
  });

  return Array.from(archiveMap.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return (
      new Date(`${b.month} 1, ${b.year}`).getMonth() -
      new Date(`${a.month} 1, ${a.year}`).getMonth()
    );
  });
};

const ITEMS_PER_PAGE = 10;

const NewsSkeleton = () => (
  <div className="animate-pulse space-y-6">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex gap-5 p-5 bg-white rounded-xl">
        <div className="w-32 h-24 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    ))}
  </div>
);

const ArchiveSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="h-8 bg-gray-200 rounded"></div>
    ))}
  </div>
);

export default function AlumniNewsroom() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [archives, setArchives] = useState<ArchiveMonth[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArchive, setSelectedArchive] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Replace with actual API call
        // const response = await fetch('/api/alumni/news');
        // const result = await response.json();

        setNews(sampleNewsData);
        setArchives(generateArchives(sampleNewsData));
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = useMemo(() => {
    if (!selectedArchive) return news;

    return news.filter((item) => {
      const date = new Date(item.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      return key === selectedArchive;
    });
  }, [news, selectedArchive]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const handleArchiveClick = (key: string | null) => {
    setSelectedArchive(key);
    setCurrentPage(1);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
              <span className="text-[#800000] font-medium">Newsroom</span>
            </nav>
          </div>
        </div>

        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Alumni Newsroom
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
                Latest news, announcements, and updates from the NITH Alumni
                community.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-[70%]">
                {selectedArchive && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-center gap-3"
                  >
                    <span className="text-gray-600">Showing news from:</span>
                    <span className="px-3 py-1.5 bg-[#631012] text-white rounded-lg text-sm font-medium">
                      {archives.find((a) => a.key === selectedArchive)?.month}{' '}
                      {archives.find((a) => a.key === selectedArchive)?.year}
                    </span>
                    <button
                      onClick={() => handleArchiveClick(null)}
                      className="text-sm text-gray-500 hover:text-[#631012] underline"
                    >
                      Clear filter
                    </button>
                  </motion.div>
                )}

                <div className="mb-6">
                  <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold text-[#631012]">
                      {paginatedNews.length}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold">{filteredNews.length}</span>{' '}
                    news items
                  </p>
                </div>

                {loading ? (
                  <NewsSkeleton />
                ) : paginatedNews.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-sm p-12 text-center"
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
                          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No news available
                    </h3>
                    <p className="text-gray-500 mb-6">
                      There are no news items for the selected period.
                    </p>
                    {selectedArchive && (
                      <button
                        onClick={() => handleArchiveClick(null)}
                        className="px-6 py-2.5 rounded-lg bg-[#631012] text-white font-medium hover:bg-[#7a1a1d] transition-colors"
                      >
                        View All News
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence mode="wait">
                      {paginatedNews.map((item, index) => (
                        <motion.article
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 group"
                        >
                          <div className="flex flex-col sm:flex-row">
                            {/* Thumbnail */}
                            <div className="sm:w-48 md:w-56 flex-shrink-0">
                              <div className="relative h-48 sm:h-full w-full bg-gray-100">
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#631012]/10 to-[#631012]/5">
                                  <svg
                                    className="w-12 h-12 text-[#631012]/30"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={1}
                                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                                    />
                                  </svg>
                                </div>
                                {/* Uncomment when using actual images */}
                                {/* <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  className="object-cover"
                                /> */}
                              </div>
                            </div>

                            <div className="flex-1 p-5 sm:p-6 flex flex-col">
                              <div className="flex-1">
                                <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded mb-3">
                                  {item.category}
                                </span>

                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#631012] transition-colors line-clamp-2">
                                  <Link href={`/alumni/news/${item.slug}`}>
                                    {item.title}
                                  </Link>
                                </h3>

                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                  {item.description}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
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
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  {formatDate(item.date)}
                                </div>

                                <Link
                                  href={`/alumni/news/${item.slug}`}
                                  className="group/btn inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#631012] bg-[#631012]/5 rounded-lg hover:bg-[#631012] hover:text-white transition-all duration-300 ease-out"
                                >
                                  Read More
                                  <svg
                                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
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
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.article>
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {totalPages > 1 && !loading && (
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
                              <span className="px-3 py-2 text-gray-400">
                                ...
                              </span>
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
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
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

              <div className="lg:w-[30%]">
                <div className="lg:sticky lg:top-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
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
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                          />
                        </svg>
                        Archives
                      </h3>
                    </div>

                    <div className="p-4">
                      {loading ? (
                        <ArchiveSkeleton />
                      ) : archives.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4">
                          No archives available
                        </p>
                      ) : (
                        <div className="space-y-1">
                          <button
                            onClick={() => handleArchiveClick(null)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                              selectedArchive === null
                                ? 'bg-[#631012]/10 text-[#631012]'
                                : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span className="font-medium">All News</span>
                            <span
                              className={`text-sm px-2 py-0.5 rounded ${
                                selectedArchive === null
                                  ? 'bg-[#631012] text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {news.length}
                            </span>
                          </button>

                          {archives.map((archive) => (
                            <button
                              key={archive.key}
                              onClick={() => handleArchiveClick(archive.key)}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                                selectedArchive === archive.key
                                  ? 'bg-[#631012]/10 text-[#631012]'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              <span className="font-medium">
                                {archive.month} {archive.year}
                              </span>
                              <span
                                className={`text-sm px-2 py-0.5 rounded ${
                                  selectedArchive === archive.key
                                    ? 'bg-[#631012] text-white'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {archive.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
    </>
  );
}
