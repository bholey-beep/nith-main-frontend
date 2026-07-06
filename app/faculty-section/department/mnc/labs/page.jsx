import Link from 'next/link'
import './mnc_labs.css'

const menuItems = [
  { label: 'About Us', href: '/faculty-section/department/mnc' },
  { label: 'Vision & Mission', href: '/faculty-section/department/mnc/vision-and-mission' },
  { label: 'Faculty', href: '/faculty-section/department/mnc/faculty' },
  { label: 'Staff', href: '/faculty-section/department/mnc/staff' },
  { label: 'Programme Offered', href: '/faculty-section/department/mnc/programmes-offered' },
  { label: 'Labs', href: '/faculty-section/department/mnc/labs', active: true },
  { label: 'Research Publications', href: '/faculty-section/department/mnc/research-publications' },
  { label: 'Contact', href: '/faculty-section/department/mnc/contact' },
]

const btechLabs = [
  'Data Structures Lab',
  'Numerical Computations with MATLAB Lab',
  'Applied Statistical Methods Lab',
  'Object Oriented Programming Lab',
  'Database Management Systems Lab',
  'Machine Learning Lab',
  'Operating System Lab',
]

const mscLabs = [
  'Computer Programming Lab',
  'SPSS Software Lab',
  'Operations Research Lab',
  'Data Structure and Algorithms Lab',
  'Database Management Systems Lab',
  'R and Python Lab',
  'Numerical Methods Lab',
]

const facilities = [
  'Modern Digital Infrastructure',
  'Advanced Computing Resources',
  'Research-Oriented Design',
  'Support for Emerging Technologies',
  'Conducive Learning Atmosphere',
]

export default function CseLabsPage() {
  return (
    <main className="cse-labs-page">
      <div className="cse-labs-shell">
        <aside className="cse-labs-sidebar" aria-label="Department navigation">
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

        <section className="cse-labs-content">
          <h1>List of Laboratories</h1>

          <p>
            The Department of Mathematics and Scientific Computing features modern Undergraduate, Postgraduate, and Research Laboratories equipped with advanced tools and technologies. B.Tech. students gain practical experience through labs in Data Structures, MATLAB, Statistical Methods, and Machine Learning, while M.Sc. students work with SPSS, R, Python, Operations Research, and Database Systems. These labs provide hands-on learning, real-time problem solving, and strong support for research and innovation.
          </p>

          <h2>Programme: B.Tech. in Mathematics & Computing</h2>

          <table className="labs-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name of Laboratory</th>
              </tr>
            </thead>
            <tbody>
              {btechLabs.map((lab, index) => (
                <tr key={lab}>
                  <td>{index + 1}</td>
                  <td>{lab}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Programme: M.Sc. in Mathematics & Computing</h2>

          <table className="labs-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>Name of Laboratory</th>
              </tr>
            </thead>
            <tbody>
              {mscLabs.map((lab, index) => (
                <tr key={lab}>
                  <td>{index + 8}</td>
                  <td>{lab}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Major Facilities in Research & Development Labs</h2>

          <p>
            The Department of Mathematics and Scientific Computing provides state-of-the-art Research and Development Laboratories to enhance both learning and innovation. These labs are equipped with the following major facilities:
          </p>

          <ul className="labs-facilities">
            {facilities.map((facility) => (
              <li key={facility}>➤ {facility}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}