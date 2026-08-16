'use client';

import React from 'react';
import DepartmentLayout from '../_components/DepartmentLayout';
import DepartmentOverviewView from '../_components/DepartmentOverviewView';

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

const chemOverviewData = {
  departmentName: 'Department of Chemical Sciences & Engineering',
  departmentCode: 'CHEM',
  deptSlug: 'chem',
  aboutText: [
    'The Department of Chemical Sciences & Engineering at NIT Hamirpur has been an integral pillar of foundational engineering and science education since the inception of the institute in 1986.',
    'The department provides world-class education in fundamental chemistry, advanced materials, polymer synthesis, chemical reaction engineering, and nano-catalysis. It offers undergraduate courses for B.Tech students, Master of Science (M.Sc. in Chemistry / Chemical Technology), and doctoral (Ph.D.) research.',
    'Equipped with modern analytical instrumentation such as UV-Vis spectrophotometers, FTIR spectrometers, HPLC, gas chromatography, and electrochemistry workstations, the department leads key national research projects funded by DST, CSIR, and SERB.',
  ],
  hodMessage: {
    name: 'Dr. Pamita Awasthi',
    designation: 'Head of Department & Professor',
    quote:
      'Our department bridges fundamental molecular science with macroscopic engineering applications. We aim to train scientific thinkers who innovate sustainable materials and green energy solutions.',
  },
  focusAreas: [
    'Functional Nanomaterials & Green Energy',
    'Bioorganic & Biophysical Chemistry',
    'Polymer Synthesis & Composite Materials',
    'Heterogeneous Catalysis & Electrochemistry',
    'Environmental Remediation & Water Purification',
    'Medicinal Chemistry & Drug Delivery',
  ],
  programmes: [
    {
      name: 'B.Tech Chemical Engineering / Core',
      level: 'Undergraduate (4 Years)',
      desc: 'Foundational and advanced chemical engineering, transport phenomena, thermodynamics, and plant design.',
    },
    {
      name: 'M.Sc. in Chemistry',
      level: 'Postgraduate (2 Years)',
      desc: 'In-depth specialization in organic, inorganic, physical, and computational chemistry with extensive lab dissertations.',
    },
    {
      name: 'Doctor of Philosophy (Ph.D.)',
      level: 'Doctoral (3-5 Years)',
      desc: 'Original research in sustainable catalysts, nanocomposites, photochemistry, and molecular biophysics.',
    },
  ],
  highlights: [
    {
      stat: '340+',
      title: 'SCI Research Publications',
      desc: 'High-impact articles in premier international chemical and materials science journals.',
    },
    {
      stat: '8+',
      title: 'Analytical Instrument Labs',
      desc: 'Equipped with UV-Vis, FTIR, Electrochemical workstations, and high-temp furnaces.',
    },
    {
      stat: '₹1.8Cr+',
      title: 'Sponsored Projects',
      desc: 'Active research grants from CSIR, DST-SERB, and Ministry of Environment.',
    },
  ],
};

export default function ChemPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentOverviewView data={chemOverviewData} />
    </DepartmentLayout>
  );
}