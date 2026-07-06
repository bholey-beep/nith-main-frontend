import Link from 'next/link'
import './mnc_staff.css'

const menuItems = [
  { label: 'About Us', href: '/faculty-section/department/mnc' },
  { label: 'Vision & Mission', href: '/faculty-section/department/mnc/vision-and-mission' },
  { label: 'Faculty', href: '/faculty-section/department/mnc/faculty' },
  { label: 'Staff', href: '/faculty-section/department/mnc/staff', active: true },
  { label: 'Programme Offered', href: '/faculty-section/department/mnc/programmes-offered' },
  { label: 'Labs', href: '/faculty-section/department/mnc/labs' },
  { label: 'Research Publications', href: '/faculty-section/department/mnc/research-publications' },
  { label: 'Contact', href: '/faculty-section/department/mnc/contact' },
]

const officeStaff = [
  {
    serial: '1',
    name: 'Sh. Om Parkash',
    designation: 'Office Attendant SG-II',
    phone: '254101',
    email: 'opnith@nith.ac.in',
  },
]

const technicalStaff = [
  {
    serial: '1',
    name: 'Ms. Smriti',
    designation: 'Senior Technician',
    phone: '254101',
    email: 'smritik@nith.ac.in',
  },
  {
    serial: '2',
    name: 'Mr. Hem Raj',
    designation: 'Technician',
    phone: '254101',
    email: 'hem@nith.ac.in',
  },
  {
    serial: '3',
    name: 'Ms. Sushma',
    designation: 'Technician',
    phone: '',
    email: '',
  },
]

function StaffRows({ rows }) {
  return rows.map((member) => (
    <tr key={`${member.serial}-${member.name}`}>
      <td>{member.serial}</td>
      <td>{member.name}</td>
      <td>{member.designation}</td>
      <td>{member.phone}</td>
      <td>{member.email}</td>
    </tr>
  ))
}

export default function CseStaffPage() {
  return (
    <main className="cse-staff-page">
      <div className="cse-staff-shell">
        <aside className="cse-staff-sidebar" aria-label="Department navigation">
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

        <section className="cse-staff-content">
          <div className="staff-table-wrap">
            <table className="staff-table">
              <caption>Office Staff</caption>
              <thead>
                <tr>
                  <th>Sl. No.</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Phone No.</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <StaffRows rows={officeStaff} />

                <tr className="staff-section-row">
                  <td colSpan="5">Technical Staff</td>
                </tr>

                <StaffRows rows={technicalStaff} />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}
