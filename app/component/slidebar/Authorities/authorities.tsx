'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const initialAuthoritiesData = [
  {
    title: 'Board of Governors (BOG)',
    title2: 'शासी मंडल (BOG)', // Hindi Title
    code: '01',
    links: [
      {
        title: 'Composition of BOG',
        title2: 'BOG की संरचना',
        name: 'composition_of_bog',
        href: '#',
      },
      {
        title: 'Minutes of BOG',
        title2: 'BOG का कार्यवृत्त',
        href: '/authorities/minutesofbg',
      },
    ],
  },
  {
    title: 'Finance Committee (FC)',
    title2: 'वित्त समिति (FC)', // Hindi Title
    code: '02',
    links: [
      {
        title: 'Composition of FC',
        title2: 'वित्त समिति की संरचना',
        name: 'composition_of_fc',
        href: '#',
      },
      {
        title: 'Minutes of FC',
        title2: 'वित्त समिति का कार्यवृत्त',
        href: '/authorities/minutesofc',
      },
    ],
  },
  {
    title: 'Building Works Committee (BWC)',
    title2: 'भवन एवं निर्माण समिति (BWC)', // Hindi Title
    code: '03',
    links: [
      {
        title: 'Composition of BWC',
        title2: 'BWC की संरचना',
        name: 'composition_of_bwc',
        href: '#',
      },
      {
        title: 'Minutes of BWC',
        title2: 'BWC का कार्यवृत्त',
        href: '/authorities/minutesbwc',
      },
    ],
  },
  {
    title: 'Senate',
    title2: 'सीनेट', // Hindi Title
    code: '04',
    links: [
      {
        title: 'Composition of Senate',
        title2: 'सीनेट की संरचना',
        href: '/authorities/senate/composition',
      },
      {
        title: 'Minutes of Senate',
        title2: 'सीनेट का कार्यवृत्त',
        href: '/authorities/minutesswc',
      },
    ],
  },
];

function Authorities() {
  const language = useSelector((state: RootState) => state.language.value);
  const [dynamicLinks, setDynamicLinks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLinks() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL || (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')}/anchor-links`;
        const res = await fetch(url, { cache: 'no-store' });
        
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const json = await res.json();
          if (json.success) setDynamicLinks(json.data);
        } else {
          const text = await res.text();
          console.error("API did not return JSON. URL:", url, "Status:", res.status, "Content:", text.substring(0, 100));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }
    fetchLinks();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {initialAuthoritiesData.map((section) => (
            <div key={section.title} className="group flex flex-col">
              {/* Column Header with Futuristic Accent */}
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="font-mono text-base sm:text-lg md:text-xl text-gray-200 group-hover:text-[#800000] transition-colors duration-300">
                  {section.code}
                </span>
                <h3 className="text-[clamp(10px,2vw,14px)] font-bold uppercase tracking-wider text-gray-800 border-l-2 border-[#800000] pl-2 sm:pl-3">
                  {language == 'en' ? section.title : section.title2}
                  {/* Shows "Board of Governors" without the (BOG) to keep it clean */}
                </h3>
              </div>

              {/* Links List */}
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link: any) => {
                  const dbLink = link.name ? dynamicLinks.find(d => d.id === link.name) : null;
                  const activeHref = dbLink ? dbLink.link_url : link.href;
                  
                  return (
                    <li key={link.title}>
                      <Link
                        href={activeHref}
                        className="flex items-center justify-between group/link py-1.5 sm:py-2 border-b border-gray-50 hover:border-gray-200 transition-all duration-300"
                        target={activeHref.startsWith('http') ? '_blank' : '_self'}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <ChevronRight
                            size={12}
                            className="text-gray-400 group-hover/link:text-[#800000] transition-colors sm:w-3.5 sm:h-3.5"
                          />

                          <span className="text-[clamp(9px,1.8vw,12px)] font-medium text-gray-600 group-hover/link:text-black group-hover/link:translate-x-1 transition-all duration-300">
                            {language == 'en' ? link.title : link.title2}
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

export default Authorities;
