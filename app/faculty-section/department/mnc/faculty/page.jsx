import Link from 'next/link'
import './mnc_faculty.css'

const menuItems = [
  { label: 'About Us', href: '/faculty-section/department/mnc' },
  { label: 'Vision & Mission', href: '/faculty-section/department/mnc/vision-and-mission' },
  { label: 'Faculty', href: '/faculty-section/department/mnc/faculty', active: true },
  { label: 'Staff', href: '/faculty-section/department/mnc/staff' },
  { label: 'Programme Offered', href: '/faculty-section/department/mnc/programmes-offered' },
  { label: 'Labs', href: '/faculty-section/department/mnc/labs' },
  { label: 'Research Publications', href: '/faculty-section/department/mnc/research-publications' },
  { label: 'Contact', href: '/faculty-section/department/mnc/contact' },
]

const facultyGroups = [
  {
    title: 'Professor',
    featured: true,
    members: [
      {
        name: 'Prof. Yogeshver Dutt Sharma',
        designation: 'Professor',
        interests:
          'Applied Mathematics, Mechanics (Fluid & Solid), Thermal, Bio, Nano Convection, Wave Propagation',
        email: 'yds@nith.ac.in',
      },
      {
        name: 'Prof.Sunil',
        designation: 'Professor',
        interests:'Magnetohydrodynamics, Ferrohydrodynamics, Plasma and Fluid Instabilities, Plasma Dynamics, Astrophysics, Geophysics and Flow through Porous Media, Non-linear stability of fluids.',
        email:'sunil@nith.ac.in',
      }
    ],
  },
  {
    title: 'Associate Professor',
    members: [
      {
        name: 'Dr. Ramesh Kumar Vats',
        designation: 'Associate Professor',
        interests: 'Fixed Point Theory (Functional Analysis), Fractional Calculus',
        email: 'rkvats@nith.ac.in',
      },
      {
        name: 'Dr. Pawan Kumar Sharma',
        designation: 'Associate Professor',
        interests:
          'Elasticity, Thermoelasticity (free and forced vibration Numerical Methods analysis)',
        email: 'Sara712005@gmail.com',
      },
    ],
  },
  {
    title: 'Assistant Professor Grade-I',
    members: [
      {
        name: 'Dr. Suket Kumar',
        designation: 'Assistant Professor Grade-I',
        interests: 'Functional Analysis',
        email: 'suket@nith.ac.in',
      },
      {
        name: 'Dr. Subit Kumar Jain',
        designation: 'Assistant Professor Grade-I',
        interests: 'Mathematical Image Processing, Numerics of PDE',
        email: 'jain.subit@nith.ac.in',
      },
      {
        name: 'Dr. Talari Ganesh',
        designation: 'Assistant Professor Grade-I',
        interests: 'Statistics and Operations Research',
        email: 'drganesh@nith.ac.in',
      },
      {
        name: 'Dr Om Prakash Yadav',
        designation: 'Assistant Professor Grade-I',
        interests: 'Numerical Methods for Partial Differential Equations',
        email: 'opyadav@nith.ac.in',
      },
      {
        name: 'Dr. Rifaqat Ali',
        designation: 'Assistant Professor Grade-I',
        interests: 'Cryptography, Information Security, and Blockchain Technology',
        email: 'rifaqatali@nith.ac.in',
      },
    ],
  },
  {
    title: 'Assistant Professor Grade-II',
    members: [
      {
        name: 'Dr. Jeetendrasingh Maan',
        designation: 'Assistant Professor Grade-II',
        interests:
          'Integral Transforms, Harmonic Analysis, Pseudo-Differential Operators, Wavelet Transforms',
        email: 'jeetendra@nith.ac.in',
      },
      {
        name: 'Dr. Soniya Chaudhary',
        designation: 'Assistant Professor Grade-II',
        interests:
          'Elasticity, Wave Propagation, Scattering Problems, Integral Equation Method (BEM), Mathematical/Numerical Modelling in Composite Structures, Integral Transform Techniques, Finite Element Method, Machine Learning, Data Science.',
        email: 'soniya@nith.ac.in',
      },
      {
        name: 'Dr. Pankaj Kumar',
        designation: 'Assistant Professor Grade-II',
        interests:
          'Optimization Methods in Finance, Interval Optimization, Machine Learning, Operations Research, Crops Planning',
        email: 'pankajkumar@nith.ac.in',
      },
    ],
  },
]

function FacultyCard({ member, featured = false }) {
  return (
    <article className={featured ? 'faculty-card faculty-card-featured' : 'faculty-card'}>
      <div className="faculty-photo" aria-hidden="true">
        {featured && <div className="faculty-photo-crop" />}
      </div>

      <div className="faculty-hover-panel">
        <p>
          <strong>Email</strong>
          <a href={`mailto:${member.email}`}>{member.email}</a>
        </p>

        <p>
          <strong>Domains</strong>
          <span>{member.interests}</span>
        </p>

        <a href="#" className="faculty-read-more">
          Read more
        </a>
      </div>

      <div className="faculty-info">
        <h3>{member.name}</h3>
        <p>{member.designation}</p>
      </div>
    </article>
  )
}

export default function CseFacultyPage() {
  return (
    <main className="cse-faculty-page">
      <div className="cse-faculty-shell">
        <aside className="cse-faculty-sidebar" aria-label="Department navigation">
          <nav>
            {menuItems.map((item) => (
              <Link
                className={item.active ? 'active' : ''}
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="cse-faculty-content">
          {facultyGroups.map((group) => (
            <section className="faculty-group" key={group.title}>
              <h1>{group.title}</h1>

              <div className={group.featured ? 'faculty-featured-grid' : 'faculty-grid'}>
                {group.members.map((member) => (
                  <FacultyCard
                    featured={group.featured}
                    key={member.name}
                    member={member}
                  />
                ))}
              </div>
            </section>
          ))}
        </section>
      </div>
    </main>
  )
}