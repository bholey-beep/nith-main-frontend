'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentProgrammesView from '../../_components/DepartmentProgrammesView';

const chemMeta = {
  code: 'CHEM',
  name: 'Department of Chemical Sciences & Engineering',
  nameHindi: 'रासायनिक विज्ञान एवं इंजीनियरिंग विभाग',
  established: '1986',
  stats: {
    facultyCount: '16+',
    labsCount: '8+',
    programmesCount: '3',
    publicationsCount: '340+',
  },
};

const chemProgrammes = [
  {
    degree: 'B.Tech in Chemical Engineering / Core Engineering Courses',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    intake: 60,
    description:
      'Rigorous foundational and applied engineering courses in chemistry, material balances, reaction engineering, fluid dynamics, and thermodynamics for engineering undergraduates.',
    specializations: [
      'Chemical Process Calculations',
      'Fluid & Particle Mechanics',
      'Heat & Mass Transfer Operations',
      'Chemical Reaction Engineering',
      'Process Dynamics & Control',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Master of Science (M.Sc.) in Chemistry',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    intake: 25,
    description:
      'Master programme designed to offer advanced theoretical and experimental specialization in Organic, Inorganic, Physical, Analytical, and Computational Chemistry with extensive laboratory project dissertations.',
    specializations: [
      'Advanced Organic Synthesis',
      'Coordination & Organometallic Chemistry',
      'Quantum Chemistry & Spectroscopy',
      'Polymer & Nanomaterials Science',
      'Medicinal Chemistry',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Doctor of Philosophy (Ph.D.) in Chemical Sciences',
    level: 'Doctoral Research',
    duration: '3 - 5 Years',
    intake: 'As per vacancy',
    description:
      'Doctoral research training emphasizing original contributions in green energy materials, battery electrodes, heterogeneous catalysis, biophysical protein dynamics, and water purification.',
    specializations: [
      'Energy Storage & Catalysis',
      'Biophysical & Bioinorganic Chemistry',
      'Nanostructured Polymer Composites',
      'Molecular Sensing & Optoelectronics',
    ],
    syllabusLink: '/academics/doctoral-ordinances',
  },
];

export default function ChemProgrammesPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentProgrammesView departmentName="Chemical Sciences & Engineering" programmes={chemProgrammes} />
    </DepartmentLayout>
  );
}