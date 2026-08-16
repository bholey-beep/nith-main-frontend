'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentPublicationsView from '../../_components/DepartmentPublicationsView';

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

const chemPublications = [
  {
    title: 'Engineered Metal-Organic Frameworks for Electrochemical Water Splitting and Supercapacitor Applications',
    authors: 'Dr. Jai Prakash, Dr. Raj Kaushal, et al.',
    journal: 'Journal of Materials Chemistry A (Royal Society of Chemistry)',
    year: '2024',
    doi: '10.1039/D4TA01290K',
    type: 'Journal',
    impactFactor: '11.9',
  },
  {
    title: 'Spectroscopic and Molecular Docking Insights into the Binding Interactions of Bioactive Flavonoids with Serum Albumins',
    authors: 'Dr. Kalyan Sundar Ghosh, et al.',
    journal: 'Spectrochimica Acta Part A: Molecular and Biomolecular Spectroscopy',
    year: '2024',
    doi: '10.1016/j.saa.2024.124019',
    type: 'Journal',
    impactFactor: '4.4',
  },
  {
    title: 'Synthesis of Biodegradable Nanocomposite Hydrogels for Sustained Agrochemical Release and Soil Moisture Retention',
    authors: 'Dr. Bharti Gaur, Dr. Pamita Awasthi',
    journal: 'ACS Applied Polymer Materials',
    year: '2023',
    doi: '10.1021/acsapm.3c01192',
    type: 'Journal',
    impactFactor: '5.0',
  },
  {
    title: 'Sustainable Heterogeneous Catalytic Degradation of Persistent Organic Pollutants Using Solar-Driven Nano-Photocatalysts',
    authors: 'Dr. Raj Kaushal, Dr. Subhabrata Senapati',
    journal: 'Chemical Engineering Journal (Elsevier)',
    year: '2023',
    doi: '10.1016/j.cej.2023.144182',
    type: 'Journal',
    impactFactor: '13.3',
  },
];

export default function ChemResearchPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentPublicationsView departmentName="Chemical Sciences & Engineering" publications={chemPublications} />
    </DepartmentLayout>
  );
}
