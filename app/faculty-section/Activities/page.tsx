'use client';
import React from 'react';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { useEffect, useState } from 'react';

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  const [heading, setHeading] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const data = await fetch('http://localhost:4000/api/faculty-activities');
        const res = await data.json();
        setHeading(res);
      } catch (err) {
        console.error('Fetch heading failed:', err);
      }
    };

    const fetchActivities = async () => {
      try {
        const data = await fetch('http://localhost:4000/api/faculty-activities/subtext');
        const res = await data.json();
        if (Array.isArray(res)) {
          setActivities(res);
        }
      } catch (err) {
        console.error('Fetch activities failed:', err);
      }
    };

    fetchHeading();
    fetchActivities();
  }, []);

  const activitiesData = activities.length > 0 ? activities : [
    {
      heading_en: 'Academics',
      heading_hn: 'अकादमिक',
      subheading_en: 'Deans, Associate Deans of Academics',
      subheading_hn: 'अकादमिक के डीन, एसोसिएट डीन',
      small_text: 'Deans and Associate Deans of Academics represent the academic interests of the institution and oversee academic policies and procedures.',
    },
    {
      heading_en: 'Student Welfare',
      heading_hn: 'छात्र कल्याण',
      subheading_en: 'Deans, Associate Deans of Student Welfare',
      subheading_hn: 'छात्र कल्याण के डीन, एसोसिएट डीन',
      small_text: 'Deans and Associate Deans of Student Welfare are responsible for the well-being and overall development of the student community.',
    },
    {
      heading_en: 'Faculty Welfare',
      heading_hn: 'संकाय कल्याण',
      subheading_en: 'Deans, Associate Deans of Faculty Welfare',
      subheading_hn: 'संकाय कल्याण के डीन, एसोसिएट डीन',
      small_text: 'Deans and Associate Deans of Faculty Welfare support faculty members and work towards their professional development and well-being.',
    },
    {
      heading_en: 'Cultural Activities',
      heading_hn: 'सांस्कृतिक गतिविधियां',
      subheading_en: 'Coordinator of Cultural Activities',
      subheading_hn: 'सांस्कृतिक गतिविधियों के समन्वयक',
      small_text: 'The Coordinator of Cultural Activities manages and promotes cultural events and festivals within the institution.',
    },
    {
      heading_en: 'Technical Activities',
      heading_hn: 'तकनीकी गतिविधियां',
      subheading_en: 'Coordinator of Technical Activities',
      subheading_hn: 'तकनीकी गतिविधियों के समन्वयक',
      small_text: 'The Coordinator of Technical Activities organizes and encourages technical events and competitions for students.',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header31 />
      <div className="bg-white">
        <div className="bg-white relative flex flex-col pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-red-800 mb-4 animate-fade-in">
              {heading ? (language === 'en' ? heading.title_en : heading.title_hn) : (language === 'en' ? 'Faculty Activities' : 'संकाय गतिविधियां')}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {heading ? (language === 'en' ? heading.sub_title_en : heading.sub_title_hn) : (language === 'en' ? 'Empowering our faculty and students through diverse academic and administrative responsibilities.' : 'विविध शैक्षणिक और प्रशासनिक जिम्मेदारियों के माध्यम से हमारे संकाय और छात्रों को सशक्त बनाना।')}
            </p>
          </div>
import { RootState } from '../../store';
import { useEffect } from 'react';

export default function Page() {
  const language = useSelector((state: RootState) => state.language.value);
  useEffect(() => {
    const fetchLanguage = async () => {
      const data = await fetch('http://localhost:3000/api/getLanguage', {
        method: 'GET',
      });
      const res = await data.json();
      console.log(res);
    };

    fetchLanguage();
  }, []);

  return (
    <div className="min-h-screen bg-white">
     

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
            {activitiesData.map((activity, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500 opacity-50" />

                <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
                  {language === 'en' ? activity.heading_en : activity.heading_hn}
                </h3>
                
                {(() => {
                  const subheading = language === 'en' ? activity.subheading_en : activity.subheading_hn;
                  if (!subheading) return null;
                  const bulletPoints = subheading
                    .split(/[,;\n]+/)
                    .map((item: string) => item.trim())
                    .filter((item: string) => item.length > 0);

                  if (bulletPoints.length === 0) return null;

                  return (
                    <ul className="list-disc pl-5 text-red-700 font-semibold mb-4 text-sm uppercase tracking-wider relative z-10 space-y-1">
                      {bulletPoints.map((point: string, idx: number) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  );
                })()}

                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 relative z-10">
                  {language === 'en' ? activity.small_text : (activity.small_text_hn || activity.small_text)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
