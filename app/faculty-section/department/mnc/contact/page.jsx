import Link from 'next/link'
import './mnc_contact.css'

const menuItems = [
  { label: 'About Us', href: '/faculty-section/department/mnc' },
  { label: 'Vision & Mission', href: '/faculty-section/department/mnc/vision-and-mission' },
  { label: 'Faculty', href: '/faculty-section/department/mnc/faculty' },
  { label: 'Staff', href: '/faculty-section/department/mnc/staff' },
  { label: 'Programme Offered', href: '/faculty-section/department/mnc/programmes-offered' },
  { label: 'Labs', href: '/faculty-section/department/mnc/labs' },
  { label: 'Research Publications', href: '/faculty-section/department/mnc/research-publications' },
  { label: 'Contact', href: '/faculty-section/department/mnc/contact', active: true },
]

export default function CseContactPage() {
  return (
    <main className="cse-contact-page">
      <div className="cse-contact-shell">
        <aside className="cse-contact-sidebar" aria-label="Department navigation">
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

        <section className="cse-contact-content">
          <div className="contact-card">
            <h1>Contact Information</h1>

            <address>
              <strong>Dr.Sunil</strong>
              <span>Head of Department</span>
              <span>Mathematics and computing sciences</span>
              <span>National Institute of Technology Hamirpur</span>
              <span>Himachal Pradesh, Pin No. 177005, India.</span>
            </address>

            <div className="contact-details">
              <p>
                <strong>Phone No.:</strong>  01972- 254134
              </p>
              <p>
                <strong>HoD Email:</strong> head.msc@nith.ac.in
              </p>
              <p>
                <strong>Office Email:</strong> office.msc@nith.ac.in
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
