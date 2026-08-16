'use client';

import React from 'react';
import DepartmentLayout from '../_components/DepartmentLayout';
import DepartmentOverviewView from '../_components/DepartmentOverviewView';

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

const eceOverviewData = {
  departmentName: 'Department of Electronics & Communication Engineering',
  departmentCode: 'ECE',
  deptSlug: 'ece',
  aboutText: [
    'The Department of Electronics and Communication Engineering at NIT Hamirpur was established in 1988. It stands at the forefront of semiconductor research, VLSI chip design, wireless 5G/6G communication systems, and embedded hardware development.',
    'The department offers undergraduate (B.Tech in ECE), integrated Dual Degree (B.Tech & M.Tech), postgraduate (M.Tech in VLSI Design Automation and Communication Systems), and doctoral (Ph.D.) programs. The academic curriculum is strongly intertwined with industrial CAD tools (Cadence, Synopsys, Mentor Graphics, HFSS, MATLAB).',
    'With generous funding from the Ministry of Electronics & Information Technology (MeitY) under the Chip-to-Startup (C2S) and SMDP-C2SD initiatives, the department houses cutting-edge clean-room simulation and chip testing equipment.',
  ],
  hodMessage: {
    name: 'Dr. Gargi Khanna',
    designation: 'Head of Department & Associate Professor',
    quote:
      'Welcome to the Department of Electronics & Communication Engineering. We are committed to pushing the frontiers of microelectronics, photonics, and next-generation communications to develop world-class engineers.',
  },
  focusAreas: [
    'VLSI & Microelectronics Chip Design',
    '5G/6G Wireless Networks & Antenna Design',
    'Signal & Digital Image Processing',
    'MEMS & Nano-Electronic Devices',
    'Embedded Systems & Robotics',
    'Optical Communication & Photonics',
  ],
  programmes: [
    {
      name: 'B.Tech in ECE',
      level: 'Undergraduate (4 Years)',
      desc: 'Foundational and advanced electronics, analog/digital circuits, microprocessors, and wireless communication systems.',
    },
    {
      name: 'Dual Degree (B.Tech + M.Tech)',
      level: 'Integrated (5 Years)',
      desc: 'Specialized 5-year integrated program in Communication Systems and VLSI Automation.',
    },
    {
      name: 'M.Tech in VLSI / Communication',
      level: 'Postgraduate (2 Years)',
      desc: 'Industry-standard chip design, physical layout, ASIC fabrication flow, and RF systems.',
    },
    {
      name: 'Doctor of Philosophy (Ph.D.)',
      level: 'Doctoral (3-5 Years)',
      desc: 'Cutting-edge doctoral research in semiconductor device modeling, 6G waveforms, and MEMS.',
    },
  ],
  highlights: [
    {
      stat: 'C2S',
      title: 'MeitY Chip-to-Startup Lab',
      desc: 'Funded by the Govt. of India for indigenous ASIC design and tape-outs.',
    },
    {
      stat: '10+',
      title: 'Advanced Labs',
      desc: 'Equipped with EDA Cadence suite, Ansys HFSS, and RF Spectrum Analyzers.',
    },
    {
      stat: '₹2.8Cr+',
      title: 'Funded Research Projects',
      desc: 'Supported by DRDO, ISRO, MeitY, and DST Science & Engineering Board.',
    },
  ],
};

export default function ECEPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentOverviewView data={eceOverviewData} />
    </DepartmentLayout>
  );
}