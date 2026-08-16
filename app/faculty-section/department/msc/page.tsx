'use client';

import React from 'react';
import DepartmentLayout from '../_components/DepartmentLayout';
import DepartmentOverviewView from '../_components/DepartmentOverviewView';

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

const mscOverviewData = {
  departmentName: 'Department of Materials Science & Engineering',
  departmentCode: 'MSE',
  deptSlug: 'msc',
  aboutText: [
    'The Department of Materials Science & Engineering at NIT Hamirpur was established in 2013 to spearhead advanced multidisciplinary research in metallurgy, nanomaterials, energy storage devices, and functional ceramics.',
    'The department offers undergraduate (B.Tech in Materials Science & Engineering), postgraduate (M.Tech in Material Science & Engineering), and doctoral (Ph.D.) degree programmes. Students gain comprehensive exposure to structure-property relationships, computational materials modeling, corrosion engineering, and additive manufacturing.',
    'Housing sophisticated microscopy, metallurgical testing rigs, high-temperature sintering furnaces, and thin-film deposition units, the department actively collaborates with national laboratories such as DRDO, CSIR-NML, and BARC.',
  ],
  hodMessage: {
    name: 'Dr. Vishal Singh',
    designation: 'Head of Department & Associate Professor',
    quote:
      'Materials are the bedrock of modern engineering innovations. We strive to pioneer sustainable metallurgy, lightweight aerospace alloys, and advanced energy materials for next-generation industries.',
  },
  focusAreas: [
    'Physical Metallurgy & Phase Transformations',
    'Surface Engineering, Coatings & Tribology',
    'Functional Ceramics & Electronic Materials',
    'Metal & Polymer Matrix Composites',
    'Energy Storage, Batteries & Fuel Cells',
    'Friction Stir Processing & Additive Manufacturing',
  ],
  programmes: [
    {
      name: 'B.Tech in Materials Science & Engineering',
      level: 'Undergraduate (4 Years)',
      desc: 'Foundations of thermodynamics, crystallography, mechanical behavior, and synthesis of metals, polymers, and ceramics.',
    },
    {
      name: 'M.Tech in Materials Science & Engineering',
      level: 'Postgraduate (2 Years)',
      desc: 'Advanced metallurgy, characterization techniques, thin film deposition, and composite modeling with intensive thesis work.',
    },
    {
      name: 'Doctor of Philosophy (Ph.D.)',
      level: 'Doctoral (3-5 Years)',
      desc: 'Doctoral research focused on high-entropy alloys, thermal barrier coatings, corrosion kinetics, and battery materials.',
    },
  ],
  highlights: [
    {
      stat: '290+',
      title: 'SCI Research Publications',
      desc: 'Published in high-impact international materials and metallurgy journals.',
    },
    {
      stat: '7+',
      title: 'Specialized Testing Labs',
      desc: 'Equipped with metallurgical microscopes, UTM, microhardness testers, and XRD access.',
    },
    {
      stat: '₹2.1Cr+',
      title: 'R&D Grants',
      desc: 'Funded by DRDO AR&DB, SERB, and Ministry of Mines.',
    },
  ],
};

export default function MSCPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentOverviewView data={mscOverviewData} />
    </DepartmentLayout>
  );
}