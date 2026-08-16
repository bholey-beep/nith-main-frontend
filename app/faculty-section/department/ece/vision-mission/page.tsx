'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentVisionMissionView from '../../_components/DepartmentVisionMissionView';

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

const eceVisionMission = {
  vision:
    'To become a globally recognized center of excellence in electronics and communication engineering education, fundamental research, and semiconductor innovations responsive to industry and society.',
  mission: [
    'To deliver rigorous, comprehensive education in analog, digital, VLSI, and communication systems with strong ethical and analytical grounding.',
    'To pursue groundbreaking translational research in microelectronics, 5G/6G, photonics, and embedded systems in partnership with premier industries.',
    'To nurture students into innovative problem-solvers, entrepreneurs, and responsible leaders.',
    'To maintain cutting-edge laboratory infrastructure complying with international standards.',
  ],
  peos: [
    {
      title: 'PEO-1: Technical Breadth & Depth',
      desc: 'Graduates will design and develop innovative electronics and communication hardware and software solutions.',
    },
    {
      title: 'PEO-2: Innovation & Higher Academia',
      desc: 'Graduates will succeed in advanced technical research, doctoral studies, and product engineering.',
    },
    {
      title: 'PEO-3: Professional Integrity & Adaptability',
      desc: 'Graduates will demonstrate professional ethics, leadership, and adaptability to emerging semiconductor paradigms.',
    },
  ],
  psos: [
    {
      title: 'PSO-1: VLSI & Embedded System Design',
      desc: 'Proficiency to design and implement complex ASIC/FPGA circuits, semiconductor devices, and real-time embedded systems.',
    },
    {
      title: 'PSO-2: Wireless & RF Communications',
      desc: 'Ability to model, simulate, and deploy high-frequency RF, microwave, antenna, and optical communication networks.',
    },
  ],
};

export default function ECEVisionMissionPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentVisionMissionView departmentName="Electronics & Communication Engineering" data={eceVisionMission} />
    </DepartmentLayout>
  );
}