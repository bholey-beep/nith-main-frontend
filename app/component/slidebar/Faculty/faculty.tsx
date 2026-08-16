'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  ChevronRight,
  ArrowUpRight,
  Briefcase,
  FileText,
  Coins,
  ExternalLink,
} from 'lucide-react';

interface FacultyLink {
  title: string;
  title2: string;
  href: string;
  name?: string;
}

interface FacultyCategory {
  id: string;
  category: string;
  category2: string;
  icon: any;
  links: FacultyLink[];
}

const facultyData: FacultyCategory[] = [
  {
    id: '01',
    category: 'Administration',
    category2: 'प्रशासन',
    icon: Briefcase,
    links: [
      {
        title: 'Faculty Activities',
        title2: 'संकाय गतिविधियां',
        href: '/faculty-section/Activities',
      },
      {
        title: 'Functionaries',
        title2: 'पदाधिकारी',
        href: '/faculty-section/Functionaries',
      },
      {
        title: 'Faculty Notices',
        title2: 'संकाय सूचनाएं',
        href: '/faculty-section/Faculty_Related_Notices',
      },
    ],
  },
  {
    id: '02',
    category: 'Allowances',
    category2: 'भत्ते',
    icon: Coins,
    links: [
      {
        title: 'CPDA Rules',
        title2: 'सीपीडीए (CPDA) नियम',
        name: 'cpda-rules',
        href: '/faculty-section/CPDA_Rules',
      },
      {
        title: 'Deputation Rules',
        title2: 'प्रतिनियुक्ति नियम',
        name: 'deputation-rules',
        href: '/faculty-section/Deputation_Rules',
      },
    ],
  },
  {
    id: '03',
    category: 'Service Rules',
    category2: 'सेवा नियम',
    icon: FileText,
    links: [
      {
        title: 'Application Forwarding',
        title2: 'आवेदन अग्रेषण',
        name: 'application-forwarding-rules',
        href: '/faculty-section/Application_Forwarding_Rules',
      },
      {
        title: 'Workshop Conduct Rules',
        title2: 'कार्यशाला संचालन नियम',
        name: 'rules-conducting-workshops',
        href: '/faculty-section/Rules_for_Conducting_Workshops',
      },
    ],
  },
];

function Faculty() {
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
        console.error('Error fetching dynamic links in Faculty slidebar:', err);
      }
    }
    fetchLinks();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {facultyData.map((column) => (
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
                {column.links.map((link) => {
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
                  const isExternal = activeHref.startsWith('http');

                  return (
                    <li key={link.title}>
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

export default Faculty;
