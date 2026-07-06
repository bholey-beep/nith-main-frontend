import Link from 'next/link'
import './mnc_research.css'

const menuItems = [
  { label: 'About Us', href: '/faculty-section/department/mnc' },
  { label: 'Vision & Mission', href: '/faculty-section/department/mnc/vision-and-mission' },
  { label: 'Faculty', href: '/faculty-section/department/mnc/faculty' },
  { label: 'Staff', href: '/faculty-section/department/mnc/staff' },
  { label: 'Programme Offered', href: '/faculty-section/department/mnc/programmes-offered' },
  { label: 'Labs', href: '/faculty-section/department/mnc/labs' },
  { label: 'Research Publications', href: '/faculty-section/department/mnc/research-publications', active: true },
  { label: 'Contact', href: '/faculty-section/department/mnc/contact' },
]

const publications = [
  {
    year: '1992',
    authors: 'R. C. Sharma and Sunil',
    title: '"Thermosolutal instability of a partially-ionized Hall plasma in porous medium". "Astrophysics and Space Science" (Belgium), 194, 303-311 (1992).',
    journal: 'Astrophysics and Space Science',
    indexing: 'SCIE',
  },
  {
    year: '1992',
    authors: 'R. C. Sharma and Sunil',
    title: '"Rayleigh-Taylor instability of a partially ionized plasma in a porous medium in presence of a variable magnetic field". "Zeitschrift für Naturforschung" (Germany), 47a, 1227-1231 (1992).',
    journal: 'Zeitschrift für Naturforschung',
    indexing: 'SCIE',
  },
  {
    year: '1993',
    authors: 'R. C. Sharma and Sunil',
    title: '"Thermal instability of compressible Hall plasma in the presence of suspended particles". "Ganita" (India), 44(1), 1-11 (1993).',
    journal: 'Ganita',
    indexing: 'UGC Approved (Journal No. 17922)',
  },
  {
    year: '1994',
    authors: 'R. C. Sharma and Sunil',
    title: '"Thermal instability of Oldroydian viscoelastic fluid with suspended particles in hydromagnetics in porous medium". "Polymer-Plastics Technology and Engineering" (U.S.A.), 33(3), 323-339 (1994).',
    journal: 'Polymer-Plastics Technology and Engineering',
    indexing: 'SCIE (Q2)',
  },
  {
    year: '1994',
    authors: 'R. C. Sharma and Sunil',
    title: '"Compressibility and collisional effects on thermal instability of a partially - ionized Hall plasma in porous medium". "Indian Journal of Physics" (India), 68B(3), 255-266 (1994).',
    journal: 'Indian Journal of Physics',
    indexing: 'SCIE',
  },
]

export default function MncResearchPage() {
  return (
    <main className="mnc-research-page">
      <div className="mnc-research-shell">
        <aside className="mnc-research-sidebar" aria-label="Department navigation">
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

        <section className="mnc-research-content">
          <h1>Research Publications</h1>

          <div className="research-table-wrapper">
            <table className="research-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Author(s)</th>
                  <th>Title & Vol. No.</th>
                  <th>Journal Name</th>
                  <th>
                    Indexing (SCI) Web of<br />Science/Scopus
                  </th>
                </tr>
              </thead>
              <tbody>
                {publications.map((pub, index) => (
                  <tr key={index}>
                    <td>{pub.year}</td>
                    <td>{pub.authors}</td>
                    <td>
                      {pub.title.includes('DOI:') ? (
                        <>
                          {pub.title.split('DOI:')[0]}
                          DOI:{' '}
                          <a
                            href={pub.title.split('DOI:')[1].trim()}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {pub.title.split('DOI:')[1].trim()}
                          </a>
                        </>
                      ) : (
                        pub.title
                      )}
                    </td>
                    <td>{pub.journal}</td>
                    <td>{pub.indexing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}