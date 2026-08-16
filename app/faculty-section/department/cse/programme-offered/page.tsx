'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentProgrammesView from '../../_components/DepartmentProgrammesView';

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

const cseProgrammes = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    intake: 120,
    description:
      'Our flagship undergraduate programme covers foundational and advanced computer science topics, software engineering, algorithms, computer architecture, compilers, databases, and applied machine learning.',
    specializations: [
      'Data Structures & Algorithms',
      'Operating Systems & Kernel Design',
      'Database Management Systems',
      'Computer Networks & Protocols',
      'Artificial Intelligence & Machine Learning',
      'Full Stack Software Development',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Dual Degree (B.Tech + M.Tech in CSE)',
    level: 'Integrated Postgraduate',
    duration: '5 Years (10 Semesters)',
    intake: 60,
    description:
      'An integrated five-year course designed for students seeking fast-track postgraduate specialization with extensive laboratory thesis work.',
    specializations: [
      'Advanced Cloud Computing',
      'Cyber Physical Systems',
      'Deep Learning Applications',
      'High Performance Computing',
      'Cryptography & Network Security',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'M.Tech in Computer Science & Engineering',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    intake: 30,
    description:
      'Rigorous research-driven master program emphasizing cutting-edge theoretical analysis, systems development, and independent dissertation.',
    specializations: [
      'Wireless Sensor Networks',
      'Natural Language Processing',
      'Internet of Things (IoT)',
      'Distributed Algorithms',
    ],
    syllabusLink: '/academics/course-structure-syllabus',
  },
  {
    degree: 'Doctor of Philosophy (Ph.D.) in CSE',
    level: 'Doctoral Research',
    duration: '3 - 5 Years',
    intake: 'As per vacancy',
    description:
      'Full-time and part-time doctoral research programs focused on publishing in premier IEEE/ACM journals, developing innovative patents, and contributing to foundational computing theory.',
    specializations: [
      'Artificial Intelligence & Deep Learning',
      'Information & Network Security',
      'Mobile & Wireless Computing',
      'Cloud & Edge Computing',
      'Computer Vision & Speech Processing',
    ],
    syllabusLink: '/academics/doctoral-ordinances',
  },
];

export default function CSEProgrammesPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentProgrammesView departmentName="Computer Science & Engineering" programmes={cseProgrammes} />
    </DepartmentLayout>
  );
}
