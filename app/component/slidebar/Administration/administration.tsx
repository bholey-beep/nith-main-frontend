'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  ChevronRight,
  ArrowUpRight,
  User,
  Users,
  Building2,
  BadgeCheck,
} from 'lucide-react';

const administrationData = [
  {
    id: '01',
    category: 'Oversight',
    category2: 'पर्यवेक्षण', // Hindi Category
    icon: BadgeCheck,
    sections: [
      {
        title: 'Visitor',
        title2: 'कुलाध्यक्ष', // Hindi Section Title
        links: [
          {
            title: 'The Visitor',
            title2: 'कुलाध्यक्ष',
            href: '/administration/visitor',
          },
        ],
      },
      {
        title: 'Vigilance',
        title2: 'सतर्कता', // Hindi Section Title
        links: [
          {
            title: 'Chief Vigilance Officer',
            title2: 'मुख्य सतर्कता अधिकारी',
            href: '/administration/vigilance',
          },
        ],
      },
    ],
  },
  {
    id: '02',
    category: 'Leadership',
    category2: 'नेतृत्व', // Hindi Category
    icon: User,
    sections: [
      {
        title: 'Chairperson',
        title2: 'अध्यक्ष', // Hindi Section Title
        links: [
          {
            title: 'Message & Profile',
            title2: 'संदेश और प्रोफ़ाइल',
            href: '/administration/chairperson',
          },
          {
            title: 'Former Chairpersons',
            title2: 'पूर्व अध्यक्ष',
            href: '/administration/chairperson/former',
          },
        ],
      },
      {
        title: 'Institute Coordinators',
        title2: 'संस्थान समन्वयक', // Hindi Section Title
        links: [
          {
            title: 'List of Coordinators',
            title2: 'समन्वयकों की सूची',
            href: '/administration/institute-coordinator',
          },
        ],
      },
      {
        title: 'Deans',
        title2: 'अधिष्ठाता', // Hindi Section Title
        links: [
          {
            title: 'Deans & Associate Deans',
            title2: 'अधिष्ठाता और सह-अधिष्ठाता',
            href: '/administration/deans',
          },
        ],
      },
    ],
  },
  {
    id: '03',
    category: 'Executive',
    category2: 'कार्यकारी', // Hindi Category
    icon: Building2,
    sections: [
      {
        title: 'Director',
        title2: 'निदेशक', // Hindi Section Title
        links: [
          {
            title: 'Director Profile',
            title2: 'निदेशक प्रोफ़ाइल',
            href: '/administration/director',
          },
          {
            title: 'Director Office',
            title2: 'निदेशक कार्यालय',
            href: '/administration/director/office',
          },
          {
            title: 'Former Directors',
            title2: 'पूर्व निदेशक',
            href: '/administration/director/former',
          },
        ],
      },
      {
        title: 'Departments',
        title2: 'विभाग', // Hindi Section Title
        links: [
          {
            title: 'Head of Departments',
            title2: 'विभागाध्यक्ष',
            href: '/administration/head-of-departments',
          },
          {
            title: 'Faculty Incharges',
            title2: 'संकाय प्रभारी',
            href: '/administration/faculty-incharges',
          },
        ],
      },
    ],
  },
  {
    id: '04',
    category: 'Registry',
    category2: 'रजिस्ट्री', // Hindi Category (or 'कुलसचिव अनुभाग')
    icon: Users,
    sections: [
      {
        title: 'Registrar',
        title2: 'कुलसचिव', // Hindi Section Title
        links: [
          {
            title: 'Registrar Profile',
            title2: 'कुलसचिव प्रोफ़ाइल',
            href: '/administration/registrar',
          },
          {
            title: 'Registrar Office',
            title2: 'कुलसचिव कार्यालय',
            href: '/administration/registrar/office',
          },
        ],
      },
      {
        title: 'Officers',
        title2: 'अधिकारी', // Hindi Section Title
        links: [
          {
            title: 'Nodal Officers',
            title2: 'नोडल अधिकारी',
            href: '/administration/nodal-officers',
          },
        ],
      },
    ],
  },
];

function Administration() {
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
        console.error('Error fetching dynamic links in Administration slidebar:', err);
      }
    }
    fetchLinks();
  }, []);

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6 sm:gap-y-8 md:gap-y-12">
          {administrationData.map((column) => (
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

              {/* Sub-Sections Loop */}
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                {column.sections.map((section, idx) => (
                  <div key={idx} className="group/section">
                    {/* Sub-Section Title */}
                    <h4 className="text-[clamp(9px,1.8vw,12px)] font-semibold text-gray-400 uppercase tracking-widest mb-2 sm:mb-3 pl-1 sm:pl-2 border-l border-transparent group-hover/section:border-gray-200 transition-all">
                      {language == 'en' ? section.title : section.title2}
                    </h4>

                    {/* Links List */}
                    <ul className="space-y-0.5 sm:space-y-1">
                      {section.links.map((link) => {
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
                          <li key={link.title}>
                            <Link
                              href={activeHref}
                              target={isExternal ? '_blank' : '_self'}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                              className="flex items-center justify-between group/link py-1.5 sm:py-2 px-1 sm:px-2 rounded-r hover:bg-gray-50 transition-all duration-300"
                            >
                              <div className="flex items-center gap-2 sm:gap-3">
                                <ChevronRight
                                  size={12}
                                  className="text-gray-300 group-hover/link:text-[#800000] transition-colors sm:w-3.5 sm:h-3.5"
                                />
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Administration;
