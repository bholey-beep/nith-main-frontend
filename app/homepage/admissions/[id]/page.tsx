'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface AdmissionItem {
  id: number;
  title_en: string;
  title_hi: string;
  date: string;
  description_en: string;
  description_hi: string;
  category_en: string;
  category_hi: string;
}

export default function AdmissionDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [data, setData] = useState<AdmissionItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  const language = useSelector((state: RootState) => state.language.value);

  useEffect(() => {
    const id = params?.id;
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/v1/homepage/admission/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setData(json.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [params?.id]);

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>;
  }

  if (!data) {
    return <div className="p-10 text-center text-gray-500">Not found.</div>;
  }

  const isEn = language === 'en';

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 min-h-screen">
      <button 
        onClick={() => router.back()}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
      >
        &larr; {isEn ? 'Back' : 'वापस'}
      </button>
      
      <h1 className="text-3xl md:text-4xl font-bold text-[#631012] mb-4">
        {isEn ? data.title_en : data.title_hi}
      </h1>
      
      <div className="flex gap-4 text-sm text-gray-500 mb-8 border-b pb-4">
        {data.date && <span>{new Date(data.date).toLocaleDateString()}</span>}
        {(isEn ? data.category_en : data.category_hi) && <span>&bull; {isEn ? data.category_en : data.category_hi}</span>}
      </div>
      
      <div className="prose max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
        {isEn ? data.description_en : data.description_hi}
      </div>
    </div>
  );
}
