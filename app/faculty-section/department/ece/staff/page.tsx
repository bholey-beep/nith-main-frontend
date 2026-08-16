'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentStaffView from '../../_components/DepartmentStaffView';

const eceMeta = {
  code: 'ECE',
  name: 'Department of Electronics & Communication Engineering',
  nameHindi: 'इलेक्ट्रॉनिक्स एवं संचार इंजीनियरिंग विभाग',
  established: '1988',
  stats: {
    facultyCount: '22+',
    labsCount: '10+',
    programmesCount: '4',
    publicationsCount: '480+',
  },
};

const eceStaff = [
  {
    name: 'Sh. Sanjeev Kumar',
    designation: 'Technical Officer (VLSI EDA Tools)',
    email: 'sanjeev_ece@nith.ac.in',
    phone: '+91-1972-254330',
    room: 'VLSI CAD Lab Room 201',
  },
  {
    name: 'Sh. Rakesh Sharma',
    designation: 'Senior Technical Assistant (Wireless Lab)',
    email: 'rakesh_ece@nith.ac.in',
    phone: '+91-1972-254332',
    room: 'Communication Lab Room 105',
  },
  {
    name: 'Smt. Seema Kumari',
    designation: 'Superintendent (Office)',
    email: 'seema_ece@nith.ac.in',
    phone: '+91-1972-254310',
    room: 'ECE Main Office Room 001',
  },
  {
    name: 'Sh. Dinesh Chand',
    designation: 'Lab Assistant (DSP Lab)',
    email: 'dinesh_ece@nith.ac.in',
    phone: '+91-1972-254335',
    room: 'DSP Lab Room 102',
  },
];

export default function ECEStaffPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentStaffView departmentName="Electronics & Communication Engineering" staff={eceStaff} />
    </DepartmentLayout>
  );
}