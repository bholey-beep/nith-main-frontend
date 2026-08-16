'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentFacultyView from '../../_components/DepartmentFacultyView';

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

const chemFallbackFaculty = [
  {
    title: 'Professors',
    featured: true,
    members: [
      {
        name: 'Dr. Pamita Awasthi',
        designation: 'HoD & Professor',
        interests: 'Organic Chemistry, Polymer Composites, Heterocyclic Chemistry',
        email: 'pamita@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Bharti Gaur',
        designation: 'Professor',
        interests: 'Polymer Chemistry, Sustainable Biomaterials, Nanotechnology',
        email: 'bhartigaur@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Kalyan Sundar Ghosh',
        designation: 'Professor',
        interests: 'Bioorganic and Biophysical Chemistry, Protein-Ligand Interactions',
        email: 'kalyan@nith.ac.in',
        qualification: 'Ph.D. (IIT Kharagpur)',
      },
    ],
  },
  {
    title: 'Assistant Professors (Grade-I)',
    members: [
      {
        name: 'Dr. Raj Kaushal',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Inorganic Chemistry, Coordination Polymers, Metal-Organic Frameworks',
        email: 'rajkaushal@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Jai Prakash',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Materials Chemistry, Functional Nanomaterials for Energy & Environment',
        email: 'jaip@nith.ac.in',
        qualification: 'Ph.D. (IIT Delhi)',
      },
    ],
  },
  {
    title: 'Assistant Professors (Grade-II)',
    members: [
      {
        name: 'Dr. Subhabrata Senapati',
        designation: 'Assistant Professor (Grade-II)',
        interests: 'Electrochemical Sensing, Catalysis, Green Synthesis',
        email: 'subhabrata@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Anoop Kumar',
        designation: 'Assistant Professor (Grade-II)',
        interests: 'Physical Chemistry, Molecular Dynamics & Spectroscopy',
        email: 'anoopk@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
];

export default function ChemFacultyPage() {
  return (
    <DepartmentLayout dept={chemMeta} deptSlug="chem">
      <DepartmentFacultyView departmentCode="chem" fallbackGroups={chemFallbackFaculty} />
    </DepartmentLayout>
  );
}