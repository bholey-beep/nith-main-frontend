'use client';

import React from 'react';
import DepartmentLayout from '../_components/DepartmentLayout';
import DepartmentOverviewView from '../_components/DepartmentOverviewView';

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

const phyOverviewData = {
  departmentName: 'Department of Physics & Photonics Science',
  departmentCode: 'PHY',
  deptSlug: 'phy',
  aboutText: [
    'The Department of Physics & Photonics Science at NIT Hamirpur has been a foundation of scientific inquiry, photonics research, and engineering physics education since 1986.',
    'The department offers undergraduate foundational physics courses, Master of Science (M.Sc. in Physics with specializations in Condensed Matter Physics, Nuclear Physics, and Photonics), and doctoral (Ph.D.) degree programmes. Students receive deep training in experimental instrumentation, quantum mechanics, laser optics, and semiconductor physics.',
    'Equipped with advanced photoluminescence setups, closed-cycle helium cryostats, RF magnetron sputtering systems, and spectroscopic ellipsometry, the department conducts cutting-edge research supported by DST, DAE-BRNS, and ISRO.',
  ],
  hodMessage: {
    name: 'Dr. Subhash Chand',
    designation: 'Head of Department & Professor',
    quote:
      'Physics uncovers the deepest principles governing nature and drives revolutionary technological leaps in quantum devices, semiconductors, and photonics. We welcome passionate students to explore the cosmos and quantum worlds with us.',
  },
  focusAreas: [
    'Condensed Matter Physics & Spintronics',
    'Photonics, Laser Optics & Fiber Sensors',
    'Theoretical & Experimental Nuclear Physics',
    'Nanoelectronics, Thin Films & Solar Cells',
    'High Energy Particle Physics & Cosmology',
    'Gas Sensing & Hydrogen Energy Evolution (HER)',
  ],
  programmes: [
    {
      name: 'Engineering Physics & Core Curriculum',
      level: 'Undergraduate',
      desc: 'Foundations of quantum mechanics, electromagnetism, wave optics, lasers, and semiconductor physics for B.Tech engineers.',
    },
    {
      name: 'Master of Science (M.Sc.) in Physics',
      level: 'Postgraduate (2 Years)',
      desc: 'Advanced postgraduate coursework in classical electrodynamics, solid-state physics, photonics, and nuclear physics.',
    },
    {
      name: 'Doctor of Philosophy (Ph.D.)',
      level: 'Doctoral (3-5 Years)',
      desc: 'Advanced doctoral research in topological insulators, magnetic thin films, optoelectronics, and high-energy physics.',
    },
  ],
  highlights: [
    {
      stat: '450+',
      title: 'SCI Research Articles',
      desc: 'Published in high-impact international journals including Physical Review, Applied Physics Letters, and Optica.',
    },
    {
      stat: '8+',
      title: 'Experimental Research Labs',
      desc: 'Equipped with Cryogenic testing, Photoluminescence, RF Sputtering, and Laser Spectrometers.',
    },
    {
      stat: '₹2.4Cr+',
      title: 'Sponsored Research Projects',
      desc: 'Funded by DAE-BRNS, CSIR, DST, and UGC-DAE Consortium for Scientific Research.',
    },
  ],
};

export default function PHYPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentOverviewView data={phyOverviewData} />
    </DepartmentLayout>
  );
}