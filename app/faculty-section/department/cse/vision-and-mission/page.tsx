'use client';

import React from 'react';
import DepartmentLayout from '../../_components/DepartmentLayout';
import DepartmentVisionMissionView from '../../_components/DepartmentVisionMissionView';

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

const cseVisionMission = {
  vision:
    'To build a strong research and teaching environment that responds swiftly to the challenges of the computing industry and produces globally competent computer science professionals with ethical responsibility.',
  mission: [
    'To impart high-quality undergraduate, postgraduate, and doctoral education through cutting-edge curricula and continuous pedagogy upgrades.',
    'To foster high-impact interdisciplinary research in Artificial Intelligence, Cyber Security, Distributed Systems, and emerging technologies.',
    'To cultivate leadership qualities, teamwork, entrepreneurial acumen, and social ethics among students.',
    'To build vibrant industry-academia partnerships, sponsored research collaborations, and knowledge dissemination platforms.',
  ],
  peos: [
    {
      title: 'PEO-1: Core Computing Excellence',
      desc: 'Graduates will demonstrate technical competence in designing, analyzing, and deploying scalable software and hardware systems.',
    },
    {
      title: 'PEO-2: Research & Higher Studies',
      desc: 'Graduates will engage in advanced research, pursuit of higher degrees, and innovation in scientific domains.',
    },
    {
      title: 'PEO-3: Professional Ethics & Leadership',
      desc: 'Graduates will exhibit ethical values, effective cross-disciplinary communication, and project leadership.',
    },
  ],
  psos: [
    {
      title: 'PSO-1: Algorithmic & Software Engineering',
      desc: 'Ability to analyze real-world engineering problems and engineer efficient algorithms and robust software architectures.',
    },
    {
      title: 'PSO-2: Applied Artificial Intelligence & Security',
      desc: 'Proficiency to design and implement intelligent, secure, and networked applications for industrial and societal impact.',
    },
  ],
};

export default function CSEVisionMissionPage() {
  return (
    <DepartmentLayout dept={cseMeta} deptSlug="cse">
      <DepartmentVisionMissionView departmentName="Computer Science & Engineering" data={cseVisionMission} />
    </DepartmentLayout>
  );
}