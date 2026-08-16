'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentContactView from '../../_components/DepartmentContactView';

const cseMeta = {
  code: 'CSE',
  name: 'Department of Computer Science & Engineering',
  nameHindi: 'कंप्यूटर विज्ञान एवं इंजीनियरिंग विभाग',
  established: '1989',
  stats: {
    facultyCount: '24+',
    labsCount: '12+',
    programmesCount: '4',
    publicationsCount: '520+',
  },
};

const cseContact = {
  hodName: 'Dr. Siddhartha Chauhan',
  hodEmail: 'sid@nith.ac.in',
  hodPhone: '+91-1972-254400',
  officeEmail: 'csed@nith.ac.in',
  officePhone: '+91-1972-254401',
  location: 'Department of Computer Science & Engineering, Ground Floor, Academic Block-B, NIT Hamirpur (HP) - 177005',
  officeHours: 'Monday to Friday: 09:00 AM - 05:30 PM (IST)',
};

export default function CSEContactPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentContactView departmentName="Computer Science & Engineering" departmentCode="CSE" contact={cseContact} />
    </DepartmentLayout>
  );
}
