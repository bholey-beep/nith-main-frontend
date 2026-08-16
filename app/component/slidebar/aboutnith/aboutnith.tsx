'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  ChevronRight,
  ArrowUpRight,
  Landmark,
  Target,
  MapPin,
} from 'lucide-react';

const aboutData = [
  {
    id: '01',
    category: 'Identity',
    category2: 'पहचान',
    icon: Landmark,
    links: [
      {
        title: 'History',
        title2: 'इतिहास',
        href: '/about/history',
        description: 'Our legacy & milestones',
        description2: 'हमारी विरासत और उपलब्धियां',
      },
      {
        title: 'Vision & Mission',
        title2: 'दृष्टि और लक्ष्य',
        href: '/about/vision-and-mission',
        description: 'Our purpose & future roadmap',
        description2: 'हमारा उद्देश्य और भविष्य का रोडमैप',
      },
    ],
  },
  {
    id: '02',
    category: 'Strategy',
    category2: 'रणनीति',
    icon: Target,
    links: [
      {
        title: 'Goals',
        title2: 'लक्ष्य',
        href: '/about/goals',
        description: 'Strategic objectives',
        description2: 'रणनीतिक उद्देश्य',
      },
      {
        title: 'Core Values',
        title2: 'मूल मूल्य',
        href: '/about/core-values',
        description: 'Guiding principles',
        description2: 'मार्गदर्शक सिद्धांत',
      },
    ],
  },
  {
    id: '03',
    category: 'Location',
    category2: 'स्थान',
    icon: MapPin,
    links: [
      {
        title: 'About the City',
        title2: 'शहर के बारे में',
        href: '/about/the-city',
        description: 'Culture & geography of Hamirpur',
        description2: 'हमीरपुर की संस्कृति और भूगोल',
      },
      {
        title: 'Connectivity',
        title2: 'संपर्क मार्ग',
        href: '/about/connectivity',
        description: 'How to reach the campus',
        description2: 'परिसर तक कैसे पहुंचें',
      },
    ],
  },
];

function AboutNith() {
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
        console.error('Error fetching dynamic links in AboutNith slidebar:', err);
      }
    }
    fetchLinks();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {aboutData.map((column) => (
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
                    <li key={index}>
                      <Link
                        href={activeHref}
                        target={isExternal ? '_blank' : '_self'}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="flex items-center justify-between group/link py-2 sm:py-3 px-1 sm:px-2 rounded-r hover:bg-gray-50 transition-all duration-300 border-b border-gray-50 last:border-0"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Static Chevron -> Active Arrow interaction */}
                          <div className="relative flex items-center justify-center w-3 h-3 sm:w-4 sm:h-4">
                            <ChevronRight
                              size={12}
                              className="absolute text-gray-300 transition-all duration-300 group-hover/link:opacity-0 group-hover/link:-translate-x-2 sm:w-3.5 sm:h-3.5"
                            />
                            <ArrowUpRight
                              size={12}
                              className="absolute text-[#800000] opacity-0 translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0 sm:w-3.5 sm:h-3.5"
                            />
                          </div>

                          <div>
                            <span className="block text-[clamp(11px,2vw,14px)] font-medium text-gray-600 group-hover/link:text-black transition-colors">
                              {language == 'en' ? (dbLink?.link_text || link.title) : link.title2}
                            </span>
                            <span className="block text-[clamp(8px,1.5vw,10px)] text-gray-400 uppercase tracking-wide mt-0.5 group-hover/link:text-[#800000]/70 transition-colors">
                              {language == 'en'
                                ? link.description
                                : link.description2}
                            </span>
                          </div>
                        </div>
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

export default AboutNith;
