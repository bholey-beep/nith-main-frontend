'use client';

import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

const CATEGORIES = [
  'All Categories',
  'Academics',
  'Student Welfare',
  'Faculty Welfare',
  'Cultural Activities',
  'Technical Activities',
] as const;

type Category = (typeof CATEGORIES)[number];

type RoleType =
  | 'Dean'
  | 'Sub-Dean'
  | 'Associate Dean'
  | 'Coordinator'
  | 'Other';

type Role = {
  id: string;
  category: Exclude<Category, 'All Categories'>;
  roleType: RoleType;
  name: string;
  designation: string;
  email: string;
  facultyId: string;
  since: string;
};

const INITIAL_ROLES: Role[] = [
  {
    id: '1',
    category: 'Academics',
    roleType: 'Dean',
    name: 'Dr. Rohan Mehta',
    designation: 'Mechanical Engineering',
    email: 'dean.academics@nitth.ac.in',
    facultyId: 'FI03',
    since: 'Since August 15, 2023',
  },
  {
    id: '2',
    category: 'Academics',
    roleType: 'Associate Dean',
    name: 'Dr. Anjali Sharma',
    designation: 'Computer Science Engineering',
    email: 'ad.academics@nitth.ac.in',
    facultyId: 'FI04',
    since: 'Since August 15, 2023',
  },
  {
    id: '3',
    category: 'Student Welfare',
    roleType: 'Dean',
    name: 'Dr. Neeraj Gupta',
    designation: 'Electrical Engineering',
    email: 'dean.sw@nitth.ac.in',
    facultyId: 'SW01',
    since: 'Since July 10, 2022',
  },
  {
    id: '4',
    category: 'Student Welfare',
    roleType: 'Associate Dean',
    name: 'Dr. Priya Verma',
    designation: 'Civil Engineering',
    email: 'ad.sw@nitth.ac.in',
    facultyId: 'SW02',
    since: 'Since July 10, 2022',
  },
  {
    id: '5',
    category: 'Faculty Welfare',
    roleType: 'Dean',
    name: 'Dr. Sushil Chauhan',
    designation: 'Faculty Welfare Office',
    email: 'dean.fw@nitth.ac.in',
    facultyId: 'FW01',
    since: 'Since January 01, 2024',
  },
  {
    id: '6',
    category: 'Faculty Welfare',
    roleType: 'Associate Dean',
    name: 'Dr. Naveen Chauhan',
    designation: 'Faculty Activity & Support',
    email: 'ad.fw@nitth.ac.in',
    facultyId: 'FW02',
    since: 'Since January 01, 2024',
  },
  {
    id: '7',
    category: 'Cultural Activities',
    roleType: 'Coordinator',
    name: 'Dr. Neetu Kapoor',
    designation: 'Faculty Incharge (Cultural Activities)',
    email: 'culture@nitth.ac.in',
    facultyId: 'CA01',
    since: 'Since March 01, 2023',
  },
  {
    id: '8',
    category: 'Cultural Activities',
    roleType: 'Coordinator',
    name: 'Dr. Arjun Rao',
    designation: 'Humanities & Social Sciences',
    email: 'culture2@nitth.ac.in',
    facultyId: 'CA02',
    since: 'Since March 01, 2023',
  },
  {
    id: '9',
    category: 'Technical Activities',
    roleType: 'Coordinator',
    name: 'Dr. Mehak Bansal',
    designation: 'Computer Science & Engineering',
    email: 'technical@nitth.ac.in',
    facultyId: 'TA01',
    since: 'Since November 01, 2022',
  },
  {
    id: '10',
    category: 'Technical Activities',
    roleType: 'Coordinator',
    name: 'Dr. Vivek Sharma',
    designation: 'Electronics & Communication',
    email: 'technical2@nitth.ac.in',
    facultyId: 'TA02',
    since: 'Since November 01, 2022',
  },
];

type CategorySectionProps = {
  label: Exclude<Category, 'All Categories'>;
  roles: Role[];
};

function CategorySection({ label, roles }: CategorySectionProps) {
  if (roles.length === 0) return null;

  return (
    <section className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-md">
      <div className="bg-[#7c1717] px-6 py-4 text-white">
        <h2 className="text-[16px] font-semibold">{label}</h2>
        <p className="mt-1 text-[12px] text-[#f0dede]">
          Faculty members entrusted with {label.toLowerCase()} responsibilities.
        </p>
      </div>

      <div className="bg-[#f9f7f6] px-6 py-5">
        <div className="grid gap-5 md:grid-cols-2">
          {roles.map((role) => (
            <article
              key={role.id}
              className="flex h-full flex-col justify-between rounded-md border border-gray-200 bg-white px-4 py-4 shadow-sm"
            >
              <div>
                <span className="inline-flex rounded-full bg-[#f2d9d9] px-3 py-[2px] text-[11px] font-semibold text-[#7c1717]">
                  {role.roleType}
                </span>

                <h3 className="mt-3 text-[15px] font-semibold text-gray-900">
                  {role.name}
                </h3>
                <p className="text-[12px] text-gray-600">{role.designation}</p>
              </div>

              <div className="mt-4 space-y-1 text-[12px] text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  <a
                    href={`mailto:${role.email}`}
                    className="text-[#7c1717] hover:underline"
                  >
                    {role.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Faculty ID:</span>
                  <span>{role.facultyId}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="rounded-md bg-[#f3f3f3] px-3 py-2 text-[11px] text-gray-600">
                  {role.since}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function FacultyRolesPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const [activeCategory, setActiveCategory] = useState<Category>('All Categories');
  
  const [heading, setHeading] = useState<any>(null);
  const [dbRoles, setDbRoles] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const data = await fetch('http://localhost:4000/api/faculty-functionaries');
        const res = await data.json();
        setHeading(res);
      } catch (err) {
        console.error('Fetch heading failed:', err);
      }
    };

    const fetchRoles = async () => {
      try {
        const data = await fetch('http://localhost:4000/api/faculty-functionaries/list');
        const res = await data.json();
        if (Array.isArray(res)) {
          setDbRoles(res);
        }
      } catch (err) {
        console.error('Fetch roles failed:', err);
      }
    };

    fetchHeading();
    fetchRoles();
  }, []);

  // Map DB roles to the format expected by the UI
  const dbRolesMapped: Role[] = dbRoles.map((r: any) => ({
    id: String(r.id),
    category: (language === 'en' ? r.category_en : r.category_hn) as any,
    roleType: (language === 'en' ? r.role_en : r.role_hn) as any,
    name: language === 'en' ? r.name_en : r.name_hn,
    designation: language === 'en' ? r.department_en : r.department_hn,
    email: r.email,
    facultyId: r.faculty_id,
    since: language === 'en' ? `Since ${r.since_date_en}` : `${r.since_date_hn} से`,
  }));

  const displayRoles: Role[] = [...dbRolesMapped];
  INITIAL_ROLES.forEach(def => {
    if (!displayRoles.find(r => r.email === def.email)) {
        displayRoles.push(def);
    }
  });

  const filteredRoles =
    activeCategory === 'All Categories'
      ? displayRoles
      : displayRoles.filter((r) => {
          const dbItem = dbRoles.find(dr => String(dr.id) === r.id);
          if (dbItem) {
            return dbItem.category_en === activeCategory;
          }
          return r.category === activeCategory;
        });

  return (
    <>
      <Header31 />

      <main className="min-h-screen bg-[#f4f2f1] px-8 py-10 text-[13px] text-gray-800">
        <header className="mx-auto mb-6 max-w-6xl text-center">
          <h1 className="text-[26px] font-semibold tracking-[0.18em] text-[#6b1a1a] uppercase">
            {heading ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'FACULTY ROLE ASSIGNMENTS' : 'संकाय भूमिका असाइनमेंट')}
          </h1>
          <p className="mt-2 text-[12px] text-gray-600">
            {heading ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Dedicated faculty members serving in various administrative and functional roles across the institute.' : 'संस्थान भर में विभिन्न प्रशासनिक और कार्यात्मक भूमिकाओं में सेवारत समर्पित संकाय सदस्य।')}
          </p>
        </header>

        <section className="mx-auto mb-8 max-w-6xl rounded-md bg-white px-6 py-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[13px] font-semibold text-gray-800">
              {language === 'en' ? 'Filter by Category' : 'श्रेणी के अनुसार फिल्टर करें'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={[
                    'rounded-md border px-4 py-1 text-[12px] font-medium transition',
                    active
                      ? 'border-[#7c1717] bg-[#7c1717] text-white'
                      : 'border-gray-200 bg-[#f9f7f6] text-gray-700 hover:bg-gray-100',
                  ].join(' ')}
                >
                  {language === 'en' ? cat : (
                    cat === 'All Categories' ? 'सभी श्रेणियां' :
                    cat === 'Academics' ? 'अकादमिक' :
                    cat === 'Student Welfare' ? 'छात्र कल्याण' :
                    cat === 'Faculty Welfare' ? 'संकाय कल्याण' :
                    cat === 'Cultural Activities' ? 'सांस्कृतिक गतिविधियां' :
                    cat === 'Technical Activities' ? 'तकनीकी गतिविधियां' : cat
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {(
          [
            'Academics',
            'Student Welfare',
            'Faculty Welfare',
            'Cultural Activities',
            'Technical Activities',
          ] as Exclude<Category, 'All Categories'>[]
        ).map((cat) => {
            const rolesForCat = filteredRoles.filter((r) => {
                const dbItem = dbRoles.find(dr => String(dr.id) === r.id);
                if (dbItem) return dbItem.category_en === cat;
                return r.category === cat;
            });
            return (
                <CategorySection
                    key={cat}
                    label={language === 'en' ? cat : (
                        cat === 'Academics' ? 'अकादमिक' :
                        cat === 'Student Welfare' ? 'छात्र कल्याण' :
                        cat === 'Faculty Welfare' ? 'संकाय कल्याण' :
                        cat === 'Cultural Activities' ? 'सांस्कृतिक गतिविधियां' :
                        cat === 'Technical Activities' ? 'तकनीकी गतिविधियां' : cat
                    ) as any}
                    roles={rolesForCat}
                />
            );
        })}
      </main>

      <Footer />
    </>
  );
}
