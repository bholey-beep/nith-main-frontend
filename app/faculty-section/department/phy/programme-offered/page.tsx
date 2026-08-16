'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentProgrammesView from '../../_components/DepartmentProgrammesView';

const phyMeta = {
  code: 'PHY',
  name: 'Department of Physics & Photonics Science',
  nameHindi: 'भौतिकी एवं फोटोनिक्स विज्ञान विभाग',
  established: '1986',
  stats: {
    facultyCount: '16+',
    labsCount: '8+',
    programmesCount: '3',
    publicationsCount: '450+',
  },
};

const phyProgrammes = [
  {
    degree: 'Engineering Physics & Foundational B.Tech Physics Curriculum',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    intake: 'All B.Tech Streams',
    description:
      'Rigorous core physical foundations covering classical mechanics, quantum theory, electrodynamics, fiber optics, laser physics, and semiconductor device physics for engineering students.',
    specializations: [
      'Quantum Mechanics & Applications',
      'Electromagnetic Theory & Optics',
      'Solid State Physics & Semiconductors',
      'Fiber Optics & Laser Technology',
      'Nanoscience & Nanotechnology',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Master of Science (M.Sc.) in Physics',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    intake: 25,
    description:
      'Master degree program providing deep theoretical understanding and intensive laboratory research in condensed matter physics, nuclear physics, photonics, and computational physics.',
    specializations: [
      'Advanced Condensed Matter Physics',
      'Photonics & Optoelectronic Devices',
      'Theoretical Nuclear & Particle Physics',
      'Computational Physics & Simulation',
      'Experimental Characterization Methods',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Doctor of Philosophy (Ph.D.) in Physics & Photonics',
    level: 'Doctoral Research',
    duration: '3 - 5 Years',
    intake: 'As per vacancy',
    description:
      'Doctoral research program advancing frontiers in spintronics, topological insulators, 2D van der Waals heterostructures, hydrogen evolution electrocatalysis, and relativistic nuclear collisions.',
    specializations: [
      'Condensed Matter Physics & Spintronics',
      'Laser Spectroscopy & Photonics',
      'Theoretical High Energy Physics',
      'Nanoelectronics & Gas Sensors',
    ],
    syllabusLink: '/academics/doctoral-ordinances',
  },
];

export default function PHYProgrammesPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentProgrammesView departmentName="Physics & Photonics Science" programmes={phyProgrammes} />
    </DepartmentLayout>
  );
}