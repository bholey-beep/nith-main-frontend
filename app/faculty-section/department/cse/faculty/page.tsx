'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentFacultyView from '../../_components/DepartmentFacultyView';

const cseMeta = {
  code: 'CSE',
  name: 'Department of Computer Science & Engineering',
  nameHindi: 'कंप्यूटर विज्ञान एवं इंजीनियरिंग विभाग',
  established: '1989',
  stats: {
    facultyCount: '24+',
    labsCount: '12+',
    programmesCount: '4',
    publicationsCount: '520+',
  },
};

const cseFallbackFaculty = [
  {
    title: 'Professors',
    featured: true,
    members: [
      {
        name: 'Prof. Lalit Kumar Awasthi',
        designation: 'Professor',
        interests: 'Mobile distributed systems, Fault tolerance, Sensor Networks, Network Security',
        email: 'lalit@nith.ac.in',
        qualification: 'Ph.D. (IIT Roorkee)',
      },
    ],
  },
  {
    title: 'Associate Professors',
    members: [
      {
        name: 'Dr. Siddhartha Chauhan',
        designation: 'HoD & Associate Professor',
        interests: 'Computer Science & Engineering, Wireless Networks, Distributed Systems',
        email: 'sid@nith.ac.in',
        qualification: 'Ph.D. (NIT Hamirpur)',
      },
      {
        name: 'Dr. Kamlesh Dutta',
        designation: 'Associate Professor',
        interests: 'Speech Processing, Machine Learning, Natural Language Processing',
        email: 'kd@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. T. P. Sharma',
        designation: 'Associate Professor',
        interests: 'Distributed systems, MANETs & VANETs, Wireless Sensor Networks',
        email: 'teek@nith.ac.in',
        qualification: 'Ph.D. (IIT Roorkee)',
      },
      {
        name: 'Dr. Naveen Chauhan',
        designation: 'Associate Professor',
        interests: 'Mobile Wireless Networks, Vehicular Ad hoc Networks, Internet of Things',
        email: 'naveen@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Pardeep Singh',
        designation: 'Associate Professor',
        interests: 'Software Engineering, Cloud Computing, Predictive Analytics',
        email: 'pardeep@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
  {
    title: 'Assistant Professors',
    members: [
      {
        name: 'Dr. Divakar Yadav',
        designation: 'Assistant Professor (Grade-I)',
        interests: 'Machine Learning, Information Retrieval, Data Mining',
        email: 'divakar@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Vijay Kumar Chaurasiya',
        designation: 'Assistant Professor',
        interests: 'Wireless Networks, Cyber Physical Systems, Optimization',
        email: 'vijay@nith.ac.in',
        qualification: 'Ph.D.',
      },
      {
        name: 'Dr. Basant Subba',
        designation: 'Assistant Professor',
        interests: 'Network Security, Intrusion Detection, Artificial Intelligence',
        email: 'basant@nith.ac.in',
        qualification: 'Ph.D.',
      },
    ],
  },
];

export default function CSEFacultyPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentFacultyView departmentCode="cse" fallbackGroups={cseFallbackFaculty} />
    </DepartmentLayout>
  );
}
