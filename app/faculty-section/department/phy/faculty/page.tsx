'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentFacultyView from '../../_components/DepartmentFacultyView';

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

const phyFallbackFaculty = [
  {
    title: 'Professors',
    featured: true,
    members: [
      {
        name: 'Dr. Subhash Chand',
        designation: 'HoD & Professor',
        interests: 'Condensed Matter Physics, Semiconductor Devices, Metal-Semiconductor Interfaces',
        email: 'schand@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Arvind K. Gathania',
        designation: 'Professor',
        interests: 'Condensed Matter Physics, Liquid Crystals, Polymer Composites',
        email: 'akgathania@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Kuldeep Kumar Sharma',
        designation: 'Professor',
        interests: 'High Energy Physics, Quark-Gluon Plasma, Phenomenological Models',
        email: 'kks@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Rajesh Kumar',
        designation: 'Professor',
        interests: 'Theoretical Nuclear Physics, Heavy-Ion Reactions, Nuclear Structure',
        email: 'rajesh_phy@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Assistant Professors (Grade-I)',
    members: [
      {
        name: 'Dr. Sandeep Sharma',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Experimental Condensed Matter Physics, Nanoelectronics, Hydrogen Evolution Reaction (HER), Gas Sensing',
        email: 'sandeep.phy@nith.ac.in',
        qualification: 'Ph.D. (IIT Delhi)',
      },
      {
        name: 'Dr. V.S. Rangra',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Dielectric Spectroscopy, Liquid Crystals, Nanofluids',
        email: 'rangra@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Ashok Kumar',
        designation: 'Assistant Professor (Grade-I)',
        interests: '2D Materials, Spintronics, Density Functional Theory (DFT)',
        email: 'ashok_phy@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
];

export default function PHYFacultyPage() {
  return (
    <DepartmentLayout dept={phyMeta} deptSlug="phy">
      <DepartmentFacultyView departmentCode="phy" fallbackGroups={phyFallbackFaculty} />
    </DepartmentLayout>
  );
}