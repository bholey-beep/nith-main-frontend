'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import Image from 'next/image';

import {
  useSelector,
  useDispatch,
} from 'react-redux';

import { RootState } from '../../store';

import { toggleLanguage } from '../../redux/language_converter';

// ======================================================
// TYPES
// ======================================================

interface DirectorData {
  image: string;

  label_en: string;
  label_hi: string;

  heading_en: string;
  heading_hi: string;

  name_en: string;
  name_hi: string;

  designation_en: string;
  designation_hi: string;

  institute_en: string;
  institute_hi: string;

  message_en: string;
  message_hi: string;
}

// ======================================================
// API BASE
// ======================================================

const API_BASE =
  'http://localhost:4000';

// ======================================================
// COMPONENT
// ======================================================

export default function Director() {

  // ======================================================
  // REDUX
  // ======================================================

  const dispatch =
    useDispatch();

  const language =
    useSelector(
      (
        state: RootState
      ) =>
        state.language.value
    );

  // ======================================================
  // STATE
  // ======================================================

  const [
    directorData,
    setDirectorData,
  ] = useState<DirectorData>({
    image: '',

    label_en: '',
    label_hi: '',

    heading_en: '',
    heading_hi: '',

    name_en: '',
    name_hi: '',

    designation_en: '',
    designation_hi: '',

    institute_en: '',
    institute_hi: '',

    message_en: '',
    message_hi: '',
  });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');

  // ======================================================
  // FETCH DATA
  // ======================================================

  useEffect(() => {

    let mounted = true;

    async function fetchDirector() {

      try {

        setLoading(true);

        const res =
          await fetch(
            `${API_BASE}/v1/homepage/director`,
            {
              cache:
                'no-store',
            }
          );

        if (!res.ok) {
          throw new Error(
            'Failed to fetch director data'
          );
        }

        const json =
          await res.json();

        console.log(
          'Director API:',
          json
        );

        if (
          mounted &&
          json.success
        ) {

          setDirectorData({

            image:
              json.data.image || '',

            label_en:
              json.data.label_en || '',

            label_hi:
              json.data.label_hi || '',

            heading_en:
              json.data.heading_en || '',

            heading_hi:
              json.data.heading_hi || '',

            name_en:
              json.data.name_en || '',

            name_hi:
              json.data.name_hi || '',

            designation_en:
              json.data.designation_en || '',

            designation_hi:
              json.data.designation_hi || '',

            institute_en:
              json.data.institute_en || '',

            institute_hi:
              json.data.institute_hi || '',

            message_en:
              json.data.message_en || '',

            message_hi:
              json.data.message_hi || '',
          });
        }

      } catch (err) {

        console.error(
          'Error fetching director:',
          err
        );

        setError(
          'Failed to fetch director data'
        );

      } finally {

        setLoading(false);
      }
    }

    fetchDirector();

    return () => {
      mounted = false;
    };

  }, []);

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {

    return (

      <section className="py-20 flex justify-center items-center bg-white">

        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#631012]" />

      </section>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

  if (error) {

    return (

      <section className="py-20 flex justify-center items-center bg-white">

        <p className="text-gray-600">
          {error}
        </p>

      </section>
    );
  }

  // ======================================================
  // LANGUAGE DATA
  // ======================================================

  const label =
    language === 'hi'
      ? directorData.label_hi
      : directorData.label_en;

  const heading =
    language === 'hi'
      ? directorData.heading_hi
      : directorData.heading_en;

  const name =
    language === 'hi'
      ? directorData.name_hi
      : directorData.name_en;

  const designation =
    language === 'hi'
      ? directorData.designation_hi
      : directorData.designation_en;

  const institute =
    language === 'hi'
      ? directorData.institute_hi
      : directorData.institute_en;

  const message =
    language === 'hi'
      ? directorData.message_hi
      : directorData.message_en;

  // ======================================================
  // UI
  // ======================================================

  return (

    <section className="relative px-4 md:px-8 bg-gradient-to-b from-white to-gray-50 overflow-hidden py-16">

      {/* BACKGROUND */}

      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#631012]/5 skew-x-12 translate-x-20 pointer-events-none" />

      <div className="absolute top-10 left-10 w-32 h-32 bg-gray-200 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* LANGUAGE TOGGLE */}

        <div className="flex justify-end mb-8">

          <button
            onClick={() =>
              dispatch(
                toggleLanguage()
              )
            }
            className="bg-[#631012] hover:bg-[#7a1214] text-white px-5 py-2 rounded-lg transition-all duration-300"
          >

            {language ===
            'en'
              ? 'हिंदी'
              : 'English'}

          </button>

        </div>

        {/* HEADER */}

        <div className="text-center mb-16">

          <span className="text-[#631012] font-bold tracking-widest uppercase text-sm">

            {label}

          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">

            {heading}

          </h2>

          <div className="w-20 h-1.5 bg-[#631012] mx-auto mt-4 rounded-full" />

        </div>

        {/* CONTENT */}

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* IMAGE */}

          <div className="relative group shrink-0 w-full sm:w-80">

            <div className="relative w-full h-96 sm:h-[28rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">

              {directorData.image && (

                <Image
                  src={directorData.image}
                  alt={name || 'Director'}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-700 group-hover:scale-110 brightness-100 group-hover:brightness-110"
                  priority
                />

              )}

            </div>

          </div>

          {/* TEXT */}

          <div className="relative flex-1 text-center lg:text-left mt-12 lg:mt-0">

            <blockquote className="text-lg md:text-2xl leading-relaxed md:leading-9 text-gray-800 font-serif italic mb-8 relative z-10 tracking-wide">

              &ldquo;
              {message}
              &rdquo;

            </blockquote>

            <div className="w-16 h-1 bg-gradient-to-r from-[#631012] to-[#631012]/40 mx-auto lg:mx-0 mb-6 rounded-full" />

            <div className="flex flex-col items-center lg:items-start gap-2">

              <div className="space-y-1">

                <h3 className="text-2xl md:text-3xl font-bold text-[#631012] leading-tight">

                  {name}

                </h3>

                <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-widest">

                  {designation}

                </p>

              </div>

              <div className="mt-4 pt-4 border-t-2 border-gray-300 w-full lg:w-auto">

                <p className="text-xs text-gray-500 font-semibold tracking-wider uppercase">

                  {institute}

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}