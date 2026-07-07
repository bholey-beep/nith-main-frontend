import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  ChevronRight,
  ArrowUpRight,
  Users,
  Globe,
  Gem,
  Lock,
  ExternalLink,
} from 'lucide-react';

const alumniData = [
  {
    id: '01',
    category: 'Engagement',
    category2: 'सहभागिता', // Hindi Category
    icon: Users,
    links: [
      {
        title: 'Alumni Activities',
        title2: 'पूर्व छात्र गतिविधियां',
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
        href: 'https://alumni.nith.ac.in/newsroom.dz',
        isExternal: true,
      },
      {
        title: 'Alumni Related MoU',
        title2: 'पूर्व छात्र संबंधित समझौता ज्ञापन (MoU)',
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
    category2: 'नेटवर्क', // Hindi Category
    icon: Globe,
    links: [
      {
        title: 'List of Alumni',
        title2: 'पूर्व छात्रों की सूची',
        href: 'https://alumni.nith.ac.in/members.dz',
        isExternal: true,
      },
      {
        title: 'Alumni Registration',
        title2: 'पूर्व छात्र पंजीकरण',
        href: 'https://alumni.nith.ac.in/user/signup.dz',
        isExternal: true,
      },
      {
        title: 'Local Chapters',
        title2: 'स्थानीय अध्याय',
        href: 'https://alumni.nith.ac.in/chapters.dz',
      },
      {
        title: 'Annual Alumni Meet',
        title2: 'वार्षिक पूर्व छात्र मिलन',
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
    category2: 'प्रभाव और पहुंच', // Hindi Category
    icon: Gem,
    links: [
      {
        title: 'Endowment Fund',
        title2: 'बंदोबस्ती निधि (Endowment Fund)',
        href: '/alumni/endowment-fund',
      },
      {
        title: 'Awards Initiatives',
        title2: 'पुरस्कार पहल',
        href: '/alumni/awards-initiatives',
      },
      {
        title: 'Alumni Portal',
        title2: 'पूर्व छात्र पोर्टल',
        href: 'https://alumni.nith.ac.in/',
        isExternal: true,
      },
    ],
  },
];

function Alumni() {
  const language = useSelector((state: RootState) => state.language.value);
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
                  // Handle Active State
                  return (
                    <li key={index}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? '_blank' : '_self'}
                        rel={link.isExternal ? 'noopener noreferrer' : ''}
                        className="flex items-center justify-between group/link py-1.5 sm:py-2 px-1 sm:px-2 rounded-r hover:bg-gray-50 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          {/* Use ExternalLink icon if external, else Chevron */}
                          {link.isExternal ? (
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

export default Alumni;
