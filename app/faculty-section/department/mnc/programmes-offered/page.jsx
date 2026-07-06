import Link from 'next/link'
import './mnc_programmes.css'

const menuItems = [
  { label: 'About Us', href: '/faculty-section/department/mnc' },
  { label: 'Vision & Mission', href: '/faculty-section/department/mnc/vision-and-mission' },
  { label: 'Faculty', href: '/faculty-section/department/mnc/faculty' },
  { label: 'Staff', href: '/faculty-section/department/mnc/staff' },
  { label: 'Programme Offered', href: '/faculty-section/department/mnc/programmes-offered', active: true },
  { label: 'Labs', href: '/faculty-section/department/mnc/labs' },
  { label: 'Research Publications', href: '/faculty-section/department/mnc/research-publications' },
  { label: 'Contact', href: '/faculty-section/department/mnc/contact' },
]

const programmes = [
  {
    name: 'B.Tech. in Mathematics and Computing',
    duration: '4 Years',
    seats: '48',
    description:
      'The B.Tech. programme in Mathematics and Computing is a comprehensive undergraduate course that integrates mathematical sciences with computational techniques. The curriculum covers areas such as numerical analysis, data structures, machine learning, statistical methods, and optimization, preparing students for careers in IT, research, data science, and academia.',
  },
  {
    name: 'M.Sc. in Mathematics and Scientific Computing',
    duration: '2 Years',
    seats: '30',
    description:
      'The M.Sc. programme provides advanced training in mathematics and scientific computing. Students gain expertise in areas like operations research, applied statistics, numerical methods, and programming with tools such as MATLAB, R, and Python. The programme is ideal for those seeking careers in analytics, research, and academia.',
  },
  {
    name: 'Ph.D. in Mathematics and Statistics',
    duration: 'Min. 3 Years',
    seats: 'As per vacancy',
    description:
      'The Ph.D. programme offers research opportunities in various domains of pure and applied mathematics, including fluid dynamics, functional analysis, cryptography, elasticity, optimization, and more. Candidates work under expert supervision and contribute to original research.',
  },
]

export default function MncProgrammesPage() {
  return (
    <main className="mnc-programmes-page">
      <div className="mnc-programmes-shell">
        <aside className="mnc-programmes-sidebar" aria-label="Department navigation">
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

        <section className="mnc-programmes-content">
          <h1>Programmes Offered</h1>

          <div className="programmes-list">
            {programmes.map((prog) => (
              <div className="programme-card" key={prog.name}>
                <h2>{prog.name}</h2>
                <div className="programme-meta">
                  <span><strong>Duration:</strong> {prog.duration}</span>
                  <span><strong>Seats:</strong> {prog.seats}</span>
                </div>
                <p>{prog.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}