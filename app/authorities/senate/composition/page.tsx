'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { ChevronRight, Mail, Phone, Loader2, Users } from 'lucide-react';

interface SenateMember {
  id: string;
  name: string;
  designation: string;
  affiliation: string;
  position: string;
  email?: string;
  contactPhone?: string;
  contact_phone?: string;
  photo?: string;
  imageUrl?: string;
}

const FALLBACK_MEMBERS: SenateMember[] = [
  {
    id: '1',
    name: 'Prof. Hiralal Murlidhar Suryawanshi',
    position: 'Ex-officio, Chairman of the Senate',
    designation: 'Director',
    affiliation: 'National Institute of Technology Hamirpur (HP) - 177 005',
    email: 'director@nith.ac.in',
    contactPhone: '+91-1972-254001',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Prof. S.P. Singh',
    position: 'Representing the field of Humanities',
    designation: 'Professor',
    affiliation: 'Humanities & Social Sciences Department\nIIT Roorkee, Roorkee',
    email: 'sp.singh@hs.iitr.ac.in',
    contactPhone: '+91-1332-285000',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Prof. Minati Baral',
    position: 'Representing the field of Science',
    designation: 'Professor',
    affiliation: 'Department of Chemistry\nNational Institute of Technology Kurukshetra',
    email: 'minatibaral@nitkkr.ac.in',
    contactPhone: '+91-1744-233000',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Prof. Manoj Kumar Arora',
    position: 'Representing the field of Engineering',
    designation: 'Professor & Former Director',
    affiliation: 'Department of Civil Engineering\nIIT Roorkee, Roorkee',
    email: 'manoj.arora@ce.iitr.ac.in',
    contactPhone: '+91-1332-285222',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '5',
    name: 'Prof. Ravi Kumar Sharma',
    position: 'Member, Senate',
    designation: 'Dean (Academic) & Professor',
    affiliation: 'Department of Civil Engineering\nNational Institute of Technology Hamirpur (HP)',
    email: 'deanacad@nith.ac.in',
    contactPhone: '+91-1972-254011',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '6',
    name: 'Dr. Archana Santosh Nanoty',
    position: 'Secretary, Senate',
    designation: 'Registrar',
    affiliation: 'National Institute of Technology Hamirpur (HP)',
    email: 'registrar@nith.ac.in',
    contactPhone: '+91-1972-254010',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function SenateCompositionPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [members, setMembers] = useState<SenateMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchMembers() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/senate/members`, { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (!cancelled) {
            const list = Array.isArray(json) && json.length > 0 ? json : FALLBACK_MEMBERS;
            setMembers(list);
          }
        } else {
          if (!cancelled) setMembers(FALLBACK_MEMBERS);
        }
      } catch (err) {
        console.error('Failed to load senate members:', err);
        if (!cancelled) setMembers(FALLBACK_MEMBERS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMembers();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans pb-24">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'प्राधिकरण' : 'Authorities'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'सीनेट की संरचना' : 'Composition of Senate'}
          </span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Title Matching Screenshot */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {isHindi ? 'सीनेट की संरचना' : 'Composition of Senate'}
          </h1>
          <div className="w-16 h-0.5 bg-[#631012] mx-auto opacity-70" />
        </div>

        {/* Members List with Photos and Maroon Headers */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-200 rounded-lg">
            <Loader2 className="w-7 h-7 animate-spin text-[#631012] mb-2" />
            <p className="text-xs font-mono text-gray-500">Loading Senate members...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {members.map((m, idx) => {
              const photoUrl =
                m.photo ||
                m.imageUrl ||
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
              const phone = m.contactPhone || m.contact_phone;

              return (
                <div
                  key={m.id || idx}
                  className="py-6 flex flex-col sm:flex-row gap-6 items-start hover:bg-gray-50/50 transition-colors px-2 sm:px-4"
                >
                  {/* Photo with clean border matching Image 3 */}
                  <div className="shrink-0">
                    <img
                      src={photoUrl}
                      alt={m.name}
                      className="w-32 h-36 sm:w-36 sm:h-40 rounded-lg object-cover border border-gray-300 shadow-sm bg-gray-100"
                    />
                  </div>

                  {/* Member Details */}
                  <div className="space-y-1.5 flex-grow pt-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#800000] tracking-tight">
                      {m.position}
                    </h3>
                    <div className="text-sm sm:text-base font-bold text-gray-900">
                      {m.name}
                    </div>
                    {m.designation && (
                      <div className="text-xs sm:text-sm text-gray-700 font-medium">
                        {m.designation}
                      </div>
                    )}
                    {m.affiliation && (
                      <div className="text-xs sm:text-sm text-gray-600 whitespace-pre-line leading-relaxed">
                        {m.affiliation}
                      </div>
                    )}

                    {(m.email || phone) && (
                      <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-600">
                        {m.email && (
                          <div className="flex items-center gap-1">
                            <Mail size={12} className="text-[#800000]" />
                            <a href={`mailto:${m.email}`} className="hover:underline text-gray-700">
                              {m.email}
                            </a>
                          </div>
                        )}
                        {phone && (
                          <div className="flex items-center gap-1">
                            <Phone size={12} className="text-[#800000]" />
                            <span className="text-gray-700">{phone}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
