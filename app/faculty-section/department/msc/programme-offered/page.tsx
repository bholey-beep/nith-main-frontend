'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentProgrammesView from '../../_components/DepartmentProgrammesView';

const mscMeta = {
  code: 'MSE',
  name: 'Department of Materials Science & Engineering',
  nameHindi: 'पदार्थ विज्ञान एवं इंजीनियरिंग विभाग',
  established: '2013',
  stats: {
    facultyCount: '12+',
    labsCount: '7+',
    programmesCount: '3',
    publicationsCount: '290+',
  },
};

const mscProgrammes = [
  {
    degree: 'B.Tech in Materials Science & Engineering',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    intake: 40,
    description:
      'Foundational undergraduate programme covering physical metallurgy, thermodynamics of materials, phase transformations, mechanical testing, composite design, and nanomaterials.',
    specializations: [
      'Physical & Mechanical Metallurgy',
      'Ceramics & Polymeric Materials',
      'Corrosion & Surface Engineering',
      'Electronic & Magnetic Materials',
      'Computational Materials Science',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'M.Tech in Material Science & Engineering',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    intake: 20,
    description:
      'Advanced master degree focusing on high-temperature superalloys, advanced thin-film coatings, electrochemical energy devices, and materials characterization.',
    specializations: [
      'Advanced Structural Materials',
      'Functional Nanomaterials & Devices',
      'Thin Film Deposition & Surface Modifications',
      'Additive Manufacturing & 3D Printing',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Doctor of Philosophy (Ph.D.) in Materials Science',
    level: 'Doctoral Research',
    duration: '3 - 5 Years',
    intake: 'As per vacancy',
    description:
      'Doctoral research program advancing high-entropy alloys, solid oxide fuel cells, friction stir processing, tribology, and green battery electrodes.',
    specializations: [
      'Energy Storage & Conversion Materials',
      'Surface Engineering & Tribology',
      'Advanced Functional Ceramics',
      'Lightweight Aerospace Materials',
    ],
    syllabusLink: '/academics/doctoral-ordinances',
  },
];

export default function MSCProgrammesPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentProgrammesView departmentName="Materials Science & Engineering" programmes={mscProgrammes} />
    </DepartmentLayout>
  );
}