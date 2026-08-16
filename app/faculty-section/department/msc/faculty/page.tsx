'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentFacultyView from '../../_components/DepartmentFacultyView';

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

const mscFallbackFaculty = [
  {
    title: 'Professors',
    featured: true,
    members: [
      {
        name: 'Prof. Ravi Kumar',
        designation: 'Professor',
        interests: 'Materials Science & Engineering, Functional Ceramics, Magnetic Materials',
        email: 'ranade65@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Associate Professors',
    members: [
      {
        name: 'Dr. Vishal Singh',
        designation: 'HoD & Associate Professor',
        interests: 'Physical Metallurgy, Phase Transformations, High Strength Steels',
        email: 'vishalchib@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Assistant Professors (Grade-I)',
    members: [
      {
        name: 'Dr. Vikram Verma',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Nanomaterials, Polymer Composites, Flexible Electronic Devices',
        email: 'vikramv@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Rita Maurya',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Surface Engineering, Coating Deposition, Corrosion Studies, Friction Stir Processing (FSP)',
        email: 'ritam@nith.ac.in',
        qualification: 'Ph.D. (IIT Roorkee)',
      },
      {
        name: 'Dr. Raj Bahadur Singh',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Corrosion Engineering, Electrochemical Testing, Ceramic Coatings',
        email: 'rbsingh@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Assistant Professors (Grade-II)',
    members: [
      {
        name: 'Dr. Debasish Sarkar',
        designation: 'Assistant Professor (Grade-II)',
        interests: 'Advanced Functional Ceramics, Solid Oxide Fuel Cells, Energy Materials',
        email: 'debasish@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
];

export default function MSCFacultyPage() {
  return (
    <DepartmentLayout dept={mscMeta} deptSlug="msc">
      <DepartmentFacultyView departmentCode="msc" fallbackGroups={mscFallbackFaculty} />
    </DepartmentLayout>
  );
}