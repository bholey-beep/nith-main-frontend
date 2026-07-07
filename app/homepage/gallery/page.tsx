'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

interface GalleryImage {
  id: number;

  title_en: string;
  title_hi: string;

  category_en: string;
  category_hi: string;

  altText_en: string;
  altText_hi: string;

  imageUrl: string;
}

interface GalleryData {
  heading_en: string;
  heading_hi: string;

  description_en: string;
  description_hi: string;

  images: GalleryImage[];
}

export default function Gallery() {

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const [language, setLanguage] = useState<
    'en' | 'hi'
  >('en');

  const [galleryData, setGalleryData] =
    useState<GalleryData>({
      heading_en: '',
      heading_hi: '',

      description_en: '',
      description_hi: '',

      images: [],
    });

  const [loading, setLoading] =
    useState(true);

  // =====================================================
  // FETCH GALLERY
  // =====================================================

  useEffect(() => {

    let mounted = true;

    async function fetchGallery() {

      try {

        setLoading(true);

        const res = await fetch(
          'http://localhost:4000/v1/homepage/gallery'
        );

        const json = await res.json();

        if (
          mounted &&
          json.success
        ) {

          setGalleryData(json.data);
        }

      } catch (err) {

        console.error(
          'Error fetching gallery:',
          err
        );

      } finally {

        setLoading(false);
      }
    }

    fetchGallery();

    return () => {
      mounted = false;
    };

  }, []);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <section className="py-16 px-6 bg-white">

        <div className="max-w-7xl mx-auto flex justify-center items-center h-64">

          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#631012]" />
        </div>
      </section>
    );
  }

  return (

    <section className="py-16 px-6 bg-white">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

          {/* LEFT */}
          <div>

            <h2 className="text-4xl font-bold text-[#631012] mb-3 border-b-4 border-[#631012] pb-2 inline-block">

              {language === 'en'
                ? galleryData.heading_en
                : galleryData.heading_hi}
            </h2>

            <p className="text-gray-600 mt-4 max-w-3xl leading-relaxed">

              {language === 'en'
                ? galleryData.description_en
                : galleryData.description_hi}
            </p>
          </div>

          {/* LANGUAGE TOGGLE */}
          <div className="flex items-center bg-[#631012]/10 rounded-full p-1 w-fit">

            <button
              onClick={() =>
                setLanguage('en')
              }
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
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
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                language === 'hi'
                  ? 'bg-[#631012] text-white shadow'
                  : 'text-[#631012]'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* GALLERY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {galleryData.images.map((image) => (

            <div
              key={image.id}

              onClick={() =>
                setSelectedImage(image)
              }

              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:border-[#631012] transition-all duration-300 cursor-pointer h-72 w-full"
            >

              {/* IMAGE */}
              <div className="relative w-full h-full">

                <Image
                  src={
                    image.imageUrl
                      ? image.imageUrl
                      : '/placeholder.jpg'
                  }

                  alt={
                    language === 'en'
                      ? image.altText_en ||
                        image.title_en ||
                        'Gallery Image'
                      : image.altText_hi ||
                        image.title_hi ||
                        'गैलरी इमेज'
                  }

                  fill

                  unoptimized

                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#631012]/80 via-[#631012]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">

                {/* CATEGORY */}
                <div className="mb-3">

                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">

                    {language === 'en'
                      ? image.category_en
                      : image.category_hi}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="text-white font-bold text-lg">

                  {language === 'en'
                    ? image.title_en
                    : image.title_hi}
                </h3>
              </div>

              {/* TOP CORNER */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[48px] border-l-transparent border-t-[48px] border-t-[#631012]" />

              {/* CENTER ICON */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">

                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >

                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2-13h4v6h-4z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {selectedImage && (

          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"

            onClick={() =>
              setSelectedImage(null)
            }
          >

            <div
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"

              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* IMAGE */}
              <div className="relative w-full h-96">

                <Image
                  src={
                    selectedImage.imageUrl
                      ? selectedImage.imageUrl
                      : '/placeholder.jpg'
                  }

                  alt={
                    language === 'en'
                      ? selectedImage.altText_en ||
                        selectedImage.title_en ||
                        'Gallery Image'
                      : selectedImage.altText_hi ||
                        selectedImage.title_hi ||
                        'गैलरी इमेज'
                  }

                  fill

                  unoptimized

                  className="object-cover"
                />
              </div>

              {/* CLOSE */}
              <button
                onClick={() =>
                  setSelectedImage(null)
                }

                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#631012] text-white flex items-center justify-center hover:bg-red-900 transition-colors shadow-lg"
              >
                ✕
              </button>

              {/* INFO */}
              <div className="p-6 bg-white">

                <h2 className="text-2xl font-bold text-[#631012] mb-2">

                  {language === 'en'
                    ? selectedImage.title_en
                    : selectedImage.title_hi}
                </h2>

                <p className="text-gray-600 text-lg">

                  {language === 'en'
                    ? selectedImage.category_en
                    : selectedImage.category_hi}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}