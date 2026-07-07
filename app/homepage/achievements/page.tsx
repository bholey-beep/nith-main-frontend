'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Achievement {
  id: number;

  tagline_en: string;
  tagline_hi: string;

  heading_en: string;
  heading_hi: string;

  description_en: string;
  description_hi: string;

  image: string;

  created_at?: string;
  updated_at?: string;
}

interface TransformedAchievement {
  id: number;

  title_en: string;
  title_hi: string;

  description_en: string;
  description_hi: string;

  category_en: string;
  category_hi: string;

  image: string;
}

function Achieve() {
  const [language, setLanguage] = useState<
    'en' | 'hi'
  >('en');

  const [achievements, setAchievements] =
    useState<TransformedAchievement[]>(
      []
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const [selectedIndex, setSelectedIndex] =
    useState(0);

  // =========================
  // TRANSFORM DATA
  // =========================

  const transformAchievement = (
    achievement: Achievement
  ): TransformedAchievement => ({
    id: achievement.id,

    title_en:
      achievement.heading_en || '',

    title_hi:
      achievement.heading_hi || '',

    description_en:
      achievement.description_en || '',

    description_hi:
      achievement.description_hi || '',

    category_en:
      achievement.tagline_en || '',

    category_hi:
      achievement.tagline_hi || '',

    image: achievement.image || '',
  });

  // =========================
  // FETCH DATA
  // =========================

  useEffect(() => {
    const fetchAchievements =
      async () => {
        try {
          setLoading(true);

          setError(null);

          const res = await fetch(
            'http://localhost:4000/v1/homepage/achievements'
          );

          const json = await res.json();

          if (json.success) {
            const transformedAchievements =
              json.data.map(
                transformAchievement
              );

            setAchievements(
              transformedAchievements
            );

            if (
              transformedAchievements.length >
              0
            ) {
              setSelectedIndex(0);
            }
          } else {
            setError(
              'Failed to fetch achievements'
            );
          }
        } catch (err) {
          console.error(
            'Error fetching achievements:',
            err
          );

          setError(
            'Error fetching achievements'
          );
        } finally {
          setLoading(false);
        }
      };

    fetchAchievements();
  }, []);

  // =========================
  // NAVIGATION
  // =========================

  const handlePrev = () => {
    if (achievements.length === 0)
      return;

    setSelectedIndex(
      (prev) =>
        (prev -
          1 +
          achievements.length) %
        achievements.length
    );
  };

  const handleNext = () => {
    if (achievements.length === 0)
      return;

    setSelectedIndex(
      (prev) =>
        (prev + 1) %
        achievements.length
    );
  };

  // =========================
  // GET VISIBLE CARDS
  // =========================

  const getVisibleCards = () => {
    if (achievements.length === 0)
      return [];

    const result = [];

    for (let i = -2; i <= 2; i++) {
      const idx =
        (selectedIndex +
          i +
          achievements.length) %
        achievements.length;

      const achievement =
        achievements[idx];

      if (achievement) {
        result.push({
          achievement,
          index: idx,
          offset: i,
        });
      }
    }

    return result;
  };

  const visibleCards =
    getVisibleCards();

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-[#631012] border-b-4 border-[#631012] pb-2 inline-block">
              {language === 'en'
                ? 'Achievements'
                : 'उपलब्धियाँ'}
            </h2>

            {/* LANGUAGE TOGGLE */}
            <div className="flex items-center bg-[#F3F3F3] rounded-full p-1 border border-[#631012]/20">
              <button
                onClick={() =>
                  setLanguage('en')
                }
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-[#631012] text-white'
                    : 'text-[#631012]'
                }`}
              >
                English
              </button>

              <button
                onClick={() =>
                  setLanguage('hi')
                }
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  language === 'hi'
                    ? 'bg-[#631012] text-white'
                    : 'text-[#631012]'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#631012]" />
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#631012] mb-12 border-b-4 border-[#631012] pb-2 inline-block">
            {language === 'en'
              ? 'Achievements'
              : 'उपलब्धियाँ'}
          </h2>

          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (achievements.length === 0) {
    return (
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#631012] mb-12 border-b-4 border-[#631012] pb-2 inline-block">
            {language === 'en'
              ? 'Achievements'
              : 'उपलब्धियाँ'}
          </h2>

          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">
              {language === 'en'
                ? 'No achievements available'
                : 'कोई उपलब्धि उपलब्ध नहीं है'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-12">
          <h2 className="text-4xl font-bold text-[#631012] border-b-4 border-[#631012] pb-2 inline-block">
            {language === 'en'
              ? 'Achievements'
              : 'उपलब्धियाँ'}
          </h2>

          {/* LANGUAGE TOGGLE */}
          <div className="flex items-center bg-[#F3F3F3] rounded-full p-1 border border-[#631012]/20 w-fit">
            <button
              onClick={() =>
                setLanguage('en')
              }
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                language === 'en'
                  ? 'bg-[#631012] text-white shadow'
                  : 'text-[#631012]'
              }`}
            >
              English
            </button>

            <button
              onClick={() =>
                setLanguage('hi')
              }
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                language === 'hi'
                  ? 'bg-[#631012] text-white shadow'
                  : 'text-[#631012]'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="flex items-center gap-8">
          {/* LEFT BUTTON */}
          <button
            onClick={handlePrev}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-[#631012] text-white font-bold text-xl hover:bg-red-900 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
          >
            ←
          </button>

          {/* CARDS */}
          <div className="flex-1 overflow-hidden">
            <div className="relative h-[500px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                {visibleCards.map(
                  ({
                    achievement,
                    index,
                    offset,
                  }) => {
                    const isCenter =
                      offset === 0;

                    let scale = 0.7;

                    let opacity = 0.4;

                    let zIndex =
                      10 + offset;

                    if (
                      offset === -1 ||
                      offset === 1
                    ) {
                      scale = 0.85;

                      opacity = 0.7;

                      zIndex = 20;
                    } else if (
                      isCenter
                    ) {
                      scale = 1;

                      opacity = 1;

                      zIndex = 30;
                    }

                    return (
                      <div
                        key={`${achievement.id}-${offset}-${index}`}
                        onClick={() =>
                          setSelectedIndex(
                            index
                          )
                        }
                        className="absolute cursor-pointer transition-all duration-500 ease-out"
                        style={{
                          transform: `translateX(${
                            offset * 280
                          }px) scale(${scale})`,
                          opacity,
                          zIndex,
                        }}
                      >
                        {/* CARD */}
                        <div
                          className={`w-72 bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                            isCenter
                              ? 'border-[#631012] shadow-xl'
                              : 'border-gray-200 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {/* IMAGE */}
                          <div className="relative h-48 overflow-hidden bg-gray-100">
                            <Image
                              src={
                                achievement.image ||
                                '/placeholder.jpg'
                              }
                              alt={
                                language ===
                                'en'
                                  ? achievement.title_en ||
                                    'Achievement'
                                  : achievement.title_hi ||
                                    'उपलब्धि'
                              }
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          {/* CONTENT */}
                          <div className="p-6">
                            {/* CATEGORY */}
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 bg-[#631012]/10 text-[#631012] text-xs font-bold rounded-full border border-[#631012]/30">
                                {language ===
                                'en'
                                  ? achievement.category_en ||
                                    'General'
                                  : achievement.category_hi ||
                                    'सामान्य'}
                              </span>
                            </div>

                            {/* TITLE */}
                            <h3 className="text-lg font-bold text-[#631012] mb-3 line-clamp-2">
                              {language ===
                              'en'
                                ? achievement.title_en
                                : achievement.title_hi}
                            </h3>

                            {/* DESCRIPTION */}
                            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                              {language ===
                              'en'
                                ? achievement.description_en
                                : achievement.description_hi}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={handleNext}
            className="flex-shrink-0 w-12 h-12 rounded-full bg-[#631012] text-white font-bold text-xl hover:bg-red-900 transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
          >
            →
          </button>
        </div>

        {/* COUNTER */}
        <div className="flex justify-center mt-8">
          <p className="text-gray-600 font-semibold text-sm">
            <span className="text-[#631012] font-bold">
              {achievements.length >
              0
                ? selectedIndex + 1
                : 0}
            </span>{' '}
            / {achievements.length}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Achieve;