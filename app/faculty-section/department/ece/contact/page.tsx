'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentContactView from '../../_components/DepartmentContactView';

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

const eceContact = {
  hodName: 'Dr. Gargi Khanna',
  hodEmail: 'gargi@nith.ac.in',
  hodPhone: '+91-1972-254300',
  officeEmail: 'eced@nith.ac.in',
  officePhone: '+91-1972-254301',
  location: 'Department of Electronics & Communication Engineering, Academic Block-C, NIT Hamirpur (HP) - 177005',
  officeHours: 'Monday to Friday: 09:00 AM - 05:30 PM (IST)',
};

export default function ECEContactPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentContactView departmentName="Electronics & Communication Engineering" departmentCode="ECE" contact={eceContact} />
    </DepartmentLayout>
  );
}
