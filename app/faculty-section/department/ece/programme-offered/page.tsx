'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentProgrammesView from '../../_components/DepartmentProgrammesView';

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

const eceProgrammes = [
  {
    degree: 'B.Tech in Electronics & Communication Engineering',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    intake: 120,
    description:
      'Foundational curriculum in semiconductor electronics, digital signal processing, microprocessors, microwave engineering, and wireless networks with extensive laboratory practice.',
    specializations: [
      'Analog & Digital Integrated Circuits',
      'Microprocessors & Microcontrollers',
      'Electromagnetic Fields & Antennas',
      'Wireless & Mobile Communications',
      'Digital Signal & Image Processing',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Dual Degree (B.Tech + M.Tech in ECE)',
    level: 'Integrated Postgraduate',
    duration: '5 Years (10 Semesters)',
    intake: 60,
    description:
      'Five-year integrated dual degree program with accelerated specialization in VLSI Design Automation and Communication Systems.',
    specializations: [
      'Advanced CMOS VLSI Design',
      'RF & Microwave Engineering',
      'MIMO Communication Systems',
      'Embedded System Prototyping',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'M.Tech in VLSI Design Automation & Techniques',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    intake: 30,
    description:
      'Premier master program focused on sub-micron semiconductor modeling, physical layout design, low-power architectures, and ASIC tape-out methodologies.',
    specializations: [
      'Low-Power VLSI Design',
      'ASIC & FPGA Design Flow',
      'MEMS & Nano-Electronics',
      'Testing & Verification of VLSI Circuits',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Doctor of Philosophy (Ph.D.) in ECE',
    level: 'Doctoral Research',
    duration: '3 - 5 Years',
    intake: 'As per vacancy',
    description:
      'Doctoral research program advancing frontiers in 5G/6G wireless waveforms, carbon nanotube interconnects, photonics, and biomedical signal instrumentation.',
    specializations: [
      'Semiconductor Device Physics',
      'Next-Gen Wireless Communications',
      'Optical & Photonic Devices',
      'Sensors & Embedded AI',
    ],
    syllabusLink: '/academics/doctoral-ordinances',
  },
];

export default function ECEProgrammesPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentProgrammesView departmentName="Electronics & Communication Engineering" programmes={eceProgrammes} />
    </DepartmentLayout>
  );
}