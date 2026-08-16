'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentPublicationsView from '../../_components/DepartmentPublicationsView';

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

const mscPublications = [
  {
    title: 'Microstructural Evolution and Mechanical Behavior of Friction Stir Processed Al-Si Alloys Reinforced with Nano-Ceramics',
    authors: 'Dr. Rita Maurya, et al.',
    journal: 'Materials Science and Engineering: A (Elsevier)',
    year: '2024',
    doi: '10.1016/j.msea.2024.146201',
    type: 'Journal',
    impactFactor: '6.4',
  },
  {
    title: 'High-Temperature Oxidation and Hot Corrosion Kinetics of Plasma-Sprayed Thermal Barrier Coatings for Gas Turbines',
    authors: 'Dr. Raj Bahadur Singh, Dr. Vishal Singh',
    journal: 'Surface and Coatings Technology (Elsevier)',
    year: '2024',
    doi: '10.1016/j.surfcoat.2024.130812',
    type: 'Journal',
    impactFactor: '5.4',
  },
  {
    title: 'Dielectric and Magnetoelectric Coupling in Multiferroic Ceramic Nanocomposites for Energy Harvesting',
    authors: 'Prof. Ravi Kumar, Dr. Debasish Sarkar',
    journal: 'Journal of the American Ceramic Society',
    year: '2023',
    doi: '10.1111/jace.19120',
    type: 'Journal',
    impactFactor: '3.9',
  },
  {
    title: 'Synthesis of Flexible Graphene-Polymer Hybrid Aerogels for High-Performance Supercapacitor Electrodes',
    authors: 'Dr. Vikram Verma',
    journal: 'Carbon (Elsevier)',
    year: '2023',
    doi: '10.1016/j.carbon.2023.118290',
    type: 'Journal',
    impactFactor: '10.9',
  },
];

export default function MSCResearchPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentPublicationsView departmentName="Materials Science & Engineering" publications={mscPublications} />
    </DepartmentLayout>
  );
}
