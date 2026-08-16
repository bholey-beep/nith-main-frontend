'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  ChevronRight,
  ArrowUpRight,
  Users,
  Globe,
  Gem,
  ExternalLink,
} from 'lucide-react';

interface AlumniLink {
  title: string;
  title2: string;
  href: string;
  name?: string;
  isExternal?: boolean;
}

interface AlumniCategory {
  id: string;
  category: string;
  category2: string;
  icon: any;
  links: AlumniLink[];
}

const alumniData: AlumniCategory[] = [
  {
    id: '01',
    category: 'Engagement',
    category2: 'सहभागिता',
    icon: Users,
    links: [
      {
        title: 'Alumni Activities',
        title2: 'पूर्व छात्र गतिविधियां',
        name: 'alumini-activites',
        href: '/alumni/activities',
      },
      {
        title: 'Functionaries',
        title2: 'पदाधिकारी',
        href: '/alumni/functionaries',
      },
      {
        title: 'Alumni Notices',
        title2: 'पूर्व छात्र सूचनाएं',
        name: 'alumini-realted-notices',
        href: 'https://alumni.nith.ac.in/newsroom.dz',
        isExternal: true,
      },
      {
        title: 'Alumni Related MoU',
        title2: 'पूर्व छात्र संबंधित समझौता ज्ञापन (MoU)',
        name: 'alumni-related-mou',
        href: '/alumni/related-mou',
      },
      {
        title: 'Alumni Assist',
        title2: 'पूर्व छात्र सहायता',
        href: '/alumni/assist',
      },
    ],
  },
  {
    id: '02',
    category: 'Network',
    category2: 'नेटवर्क',
    icon: Globe,
    links: [
      {
        title: 'List of Alumni',
        title2: 'पूर्व छात्रों की सूची',
        name: 'list-of-alumini',
        href: 'https://alumni.nith.ac.in/members.dz',
        isExternal: true,
      },
      {
        title: 'Alumni Registration',
        title2: 'पूर्व छात्र पंजीकरण',
        name: 'registration',
        href: 'https://alumni.nith.ac.in/user/signup.dz',
        isExternal: true,
      },
      {
        title: 'Local Chapters',
        title2: 'स्थानीय अध्याय',
        name: 'local-chapters',
        href: 'https://alumni.nith.ac.in/chapters.dz',
      },
      {
        title: 'Annual Alumni Meet',
        title2: 'वार्षिक पूर्व छात्र मिलन',
        name: 'annual-meet',
        href: '/alumni/annual-meet',
      },
      {
        title: 'Distinguished Alumni',
        title2: 'प्रतिष्ठित पूर्व छात्र',
        href: '/alumni/distinguished',
      },
    ],
  },
  {
    id: '03',
    category: 'Impact & Access',
    category2: 'प्रभाव और पहुंच',
    icon: Gem,
    links: [
      {
        title: 'Endowment Fund',
        title2: 'बंदोबस्ती निधि (Endowment Fund)',
        name: 'endowment-fund',
        href: '/alumni/endowment-fund',
      },
      {
        title: 'Awards Initiatives',
        title2: 'पुरस्कार पहल',
        name: 'award-initiatives',
        href: '/alumni/awards-initiatives',
      },
      {
        title: 'Alumni Portal',
        title2: 'पूर्व छात्र पोर्टल',
        name: 'netwrok',
        href: 'https://alumni.nith.ac.in/',
        isExternal: true,
      },
    ],
  },
];

function Alumni() {
  const language = useSelector((state: RootState) => state.language.value);
  const [dynamicLinks, setDynamicLinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/anchor-links`;
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setDynamicLinks(json.data);
          }
        }
      } catch (err) {
        console.error('Error fetching dynamic links in Alumni slidebar:', err);
      }
    }
    fetchLinks();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {alumniData.map((column) => (
            <div key={column.id} className="flex flex-col">
              {/* Column Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 group/header">
                <span className="font-mono text-base sm:text-lg md:text-xl text-gray-200 group-hover/header:text-[#800000] transition-colors duration-300">
                  {column.id}
                </span>
                <div className="flex items-center gap-1 sm:gap-2 border-l-2 border-[#800000] pl-2 sm:pl-3">
                  <column.icon
                    size={14}
                    className="text-gray-400 group-hover/header:text-gray-900 transition-colors sm:w-4 sm:h-4"
                  />
                  <h3 className="text-[clamp(10px,2vw,14px)] font-bold uppercase tracking-wider text-gray-800">
                    {language == 'en' ? column.category : column.category2}
                  </h3>
                </div>
              </div>

              {/* Links List */}
              <ul className="space-y-0.5 sm:space-y-1">
                {column.links.map((link, index) => {
                  const linkSlug = link.href.replace(/^\//, '').replace(/\//g, '-');
                  const dbLink = dynamicLinks.find((d) => {
                    if (link.name && (d.id === link.name || d.id === link.name.replace(/_/g, '-') || d.id === link.name.replace(/-/g, '_'))) {
                      return true;
                    }
                    if (d.id === linkSlug || d.id === linkSlug.split('-').pop()) {
                      return true;
                    }
                    if (d.link_text && link.title && d.link_text.trim().toLowerCase() === link.title.trim().toLowerCase()) {
                      return true;
                    }
                    return false;
                  });

                  const activeHref = dbLink && dbLink.link_url && dbLink.link_url !== '#' ? dbLink.link_url : link.href;
                  const isExternal = activeHref.startsWith('http') || link.isExternal;

                  return (
                    <li key={index}>
                      <Link
                        href={activeHref}
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between group/link py-1.5 sm:py-2 px-1 sm:px-2 rounded-r hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          {isExternal ? (
                            <ExternalLink
                              size={12}
                              className="text-gray-300 group-hover/link:text-[#800000] transition-colors sm:w-3.5 sm:h-3.5"
                            />
                          ) : (
                            <ChevronRight
                              size={12}
                              className="text-gray-300 group-hover/link:text-[#800000] transition-colors sm:w-3.5 sm:h-3.5"
                            />
                          )}

                          <span className="text-[clamp(10px,2vw,14px)] font-medium text-gray-600 group-hover/link:text-black transition-colors">
                            {language == 'en' ? (dbLink?.link_text || link.title) : link.title2}
                          </span>
                        </div>

                        {/* Hover Indicator */}
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 -translate-x-2 text-[#800000] group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 sm:w-3 sm:h-3"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Alumni;
