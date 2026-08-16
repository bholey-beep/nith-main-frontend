'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentPublicationsView from '../../_components/DepartmentPublicationsView';

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

const ecePublications = [
  {
    title: 'Performance Analysis of Multi-Layer Graphene Nanoribbon Interconnects for Sub-10nm VLSI Circuits',
    authors: 'Dr. Gargi Khanna, Prof. Rajeevan Chandel, et al.',
    journal: 'IEEE Transactions on Electron Devices',
    year: '2024',
    doi: '10.1109/TED.2024.3382910',
    type: 'Journal',
    impactFactor: '3.1',
  },
  {
    title: 'Reconfigurable Intelligent Surface-Assisted Massive MIMO for Beyond 5G Terahertz Communications',
    authors: 'Dr. Surender Soni, Dr. Ashok Kumar',
    journal: 'IEEE Communications Letters',
    year: '2024',
    doi: '10.1109/LCOMM.2024.3371982',
    type: 'Journal',
    impactFactor: '4.1',
  },
  {
    title: 'Design and Synthesis of Ultra-Wideband Compact Microstrip Antennas for High-Speed Wireless Links',
    authors: 'Dr. Ashwani Rana',
    journal: 'AEU - International Journal of Electronics and Communications',
    year: '2023',
    doi: '10.1016/j.aeue.2023.154820',
    type: 'Journal',
    impactFactor: '3.2',
  },
  {
    title: 'Novel All-Optical Logic Gates Based on 2D Photonic Crystal Waveguides',
    authors: 'Dr. G.R. Begh',
    journal: 'Optics & Laser Technology (Elsevier)',
    year: '2023',
    doi: '10.1016/j.optlastec.2023.109520',
    type: 'Journal',
    impactFactor: '5.0',
  },
  {
    title: 'Chip-to-Startup (C2S) Framework: Indigenous Mixed-Signal ASIC Design for Biomedical Sensing',
    authors: 'Dr. Gargi Khanna (PI), Prof. Rajeevan Chandel (Co-PI)',
    journal: 'Ministry of Electronics & Information Technology (MeitY) Grant',
    year: '2023',
    type: 'Project',
  },
];

export default function ECEResearchPage() {
  return (
    <DepartmentLayout dept={eceMeta} deptSlug="ece">
      <DepartmentPublicationsView departmentName="Electronics & Communication Engineering" publications={ecePublications} />
    </DepartmentLayout>
  );
}