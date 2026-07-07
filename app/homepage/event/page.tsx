'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Calendar,
  FileText,
  AlertCircle,
  ArrowRight,
  X,
} from 'lucide-react';

interface EventItem {
  id?: number;
  title_en: string;
  title_hi: string;
  date: string;
  description_en: string;
  description_hi: string;
  category_en: string;
  category_hi: string;
  created_at?: string;
  updated_at?: string;
}

type Lang = 'en' | 'hi';

// Hindi numerals mapping
const hindiNumerals: { [key: string]: string } = {
  '0': '०',
  '1': '१',
  '2': '२',
  '3': '३',
  '4': '४',
  '5': '५',
  '6': '६',
  '7': '७',
  '8': '८',
  '9': '९',
};

// Hindi month names
const hindiMonths = [
  'जनवरी',
  'फरवरी',
  'मार्च',
  'अप्रैल',
  'मई',
  'जून',
  'जुलाई',
  'अगस्त',
  'सितंबर',
  'अक्टूबर',
  'नवंबर',
  'दिसंबर',
];

// Convert English numerals to Hindi
const convertToHindiNumerals = (str: string): string => {
  return str
    .split('')
    .map((char) => hindiNumerals[char] || char)
    .join('');
};

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>('en');

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:4000/v1/homepage/event');

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setEvents(result.data.events);
      } else {
        throw new Error(result.message || 'Failed to fetch events');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const formatDateForDisplayEn = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
      const day = date.getDate();
      return `${month} ${day}`;
    } catch {
      return dateString;
    }
  };

  const formatDateForDisplayHi = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;

      const monthIndex = date.getMonth();
      const month = hindiMonths[monthIndex];
      const day = convertToHindiNumerals(date.getDate().toString());
      return `${month} ${day}`;
    } catch {
      return dateString;
    }
  };

  const getFormattedDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return { month: '', day: '' };

      if (lang === 'en') {
        const month = date
          .toLocaleString('default', { month: 'short' })
          .toUpperCase();
        const day = date.getDate().toString();
        return { month, day };
      } else {
        const monthIndex = date.getMonth();
        const month = hindiMonths[monthIndex];
        const day = convertToHindiNumerals(date.getDate().toString());
        return { month, day };
      }
    } catch {
      return { month: '', day: '' };
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-gray-50 py-12 font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-12 text-center">
              <p className="text-lg text-gray-600">
                {lang === 'en' ? 'Loading event...' : 'समाचार लोड हो रहे हैं...'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-gray-50 py-12 font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
            <div className="px-8 py-12 text-center">
              <p className="text-lg text-red-600 font-semibold mb-4">
                {lang === 'en' ? 'Error Loading Event' : 'समाचार लोड करने में त्रुटि'}
              </p>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={fetchEvents}
                className="bg-[#631012] hover:bg-[#7a1214] text-white px-6 py-2 rounded-lg transition-colors"
              >
                {lang === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="w-full bg-gray-50 py-12 font-sans">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-8 py-12 text-center">
              <p className="text-lg text-gray-600">
                {lang === 'en' ? 'No events available' : 'कोई समाचार उपलब्ध नहीं है'}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const isEn = lang === 'en';

  return (
    <section className="w-full bg-gray-50 py-12 font-sans">
      {/* Container: Set to w-full to cover whole width */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* The Card Container */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col w-full">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white z-10">
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-bold text-[#631012] underline tracking-tight">
                {isEn ? 'Latest Event' : 'नवीनतम समाचार'}
              </h2>
            </div>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-4 py-2 bg-[#631012] text-white rounded-lg text-sm font-medium hover:bg-[#7a1214] transition-colors"
            >
              {lang === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>

          {/* Single Column List (Flex-Col) */}
          <div className="flex flex-col h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {events.map((item) => {
              const dateInfo = getFormattedDate(item.date);

              return (
                <div
                  key={item.id}
                  className="group relative flex items-center justify-between py-6 px-8 border-b border-gray-100 hover:bg-[#631012]/5 transition-all duration-300 cursor-pointer"
                >
                  {/* Left Side: Icon & Date */}
                  <div className="flex items-start gap-6 flex-1">
                    {/* Date Box: Increased size to w-16 h-16 */}
                    <div className="hidden sm:flex flex-col items-center justify-center w-16 h-16 flex-shrink-0 rounded-2xl bg-gray-50 border border-gray-200 text-gray-500 group-hover:border-[#631012]/20 group-hover:text-[#631012] transition-colors shadow-sm">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                        {dateInfo.month}
                      </span>
                      <span className="text-xl font-extrabold">
                        {dateInfo.day}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center gap-2 pr-6">
                      <div className="flex items-center gap-3">
                        {/* Tag */}
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md border tracking-wide bg-gray-100 text-gray-600 border-gray-200 group-hover:bg-white">
                          {isEn ? item.category_en : item.category_hi}
                        </span>
                      </div>

                      {/* Text: Increased to text-lg */}
                      <p className="text-lg font-medium leading-relaxed transition-colors text-gray-700 group-hover:text-black">
                        {isEn ? item.title_en : item.title_hi}
                      </p>

                      {/* Description Preview */}
                      <p className="text-sm text-gray-600 line-clamp-1">
                        {isEn ? item.description_en : item.description_hi}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Arrow Action - Increased Size */}
                  <div className="flex-shrink-0 pl-4">
                    <button
                      onClick={() => setSelectedEvent(item)}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-gray-300 border border-transparent group-hover:bg-[#631012] group-hover:text-white group-hover:border-[#631012] transition-all duration-300 transform group-hover:translate-x-2 shadow-sm hover:scale-110"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full Page Modal */}
      {selectedEvent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={24} className="text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-8 sm:p-12">
              {/* Header Section */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  {/* Date Box */}
                  <div className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gray-50 border-2 border-gray-200 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500 opacity-70">
                      {getFormattedDate(selectedEvent.date).month}
                    </span>
                    <span className="text-2xl font-extrabold text-[#631012]">
                      {getFormattedDate(selectedEvent.date).day}
                    </span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold px-3 py-1.5 rounded-md border bg-gray-100 text-gray-600 border-gray-200">
                        {isEn ? selectedEvent.category_en : selectedEvent.category_hi}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-[#171717] mb-4 leading-tight">
                  {isEn ? selectedEvent.title_en : selectedEvent.title_hi}
                </h1>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {isEn ? selectedEvent.description_en : selectedEvent.description_hi}
                </p>

                {/* Additional Information Section */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                  <h3 className="font-semibold text-[#171717] mb-3">
                    {isEn ? 'Details' : 'विवरण'}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-[#171717]">
                        {isEn ? 'Date' : 'तारीख'}:
                      </span>{' '}
                      {isEn
                        ? formatDateForDisplayEn(selectedEvent.date)
                        : formatDateForDisplayHi(selectedEvent.date)}
                    </p>
                    <p>
                      <span className="font-medium text-[#171717]">
                        {isEn ? 'Category' : 'श्रेणी'}:
                      </span>{' '}
                      {isEn ? selectedEvent.category_en : selectedEvent.category_hi}
                    </p>
                    {selectedEvent.created_at && (
                      <p>
                        <span className="font-medium text-[#171717]">
                          {isEn ? 'Posted' : 'पोस्ट किया गया'}:
                        </span>{' '}
                        {new Date(selectedEvent.created_at).toLocaleDateString(
                          isEn ? 'en-US' : 'hi-IN'
                        )}
                      </p>
                    )}
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-full bg-[#631012] hover:bg-[#7a1214] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {isEn ? 'Close' : 'बंद करें'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles for the custom scrollbar and animations */}
      <style jsx global>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}