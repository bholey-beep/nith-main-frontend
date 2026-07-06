'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface GalleryImage {
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

function Gallery() {
    const language = useSelector((state: RootState) => state.language.value);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const [galleryData, setGalleryData] =
  useState<GalleryData>({
    heading_en: '',
    heading_hi: '',
    description_en: '',
    description_hi: '',
    images: [],
  });

  
  useEffect(() => {
  fetchGallery();
}, []);

const fetchGallery = async () => {
  try {
    const res = await fetch(
      'http://localhost:4000/v1/homepage/gallery'
    );

    const data = await res.json();

    setGalleryData(data);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-[#631012] mb-3 border-b-4 border-[#631012] pb-2 inline-block">
            {language === 'hi'
               ? galleryData.heading_hi   || 'गैलरी'
               : galleryData.heading_en   || 'Gallery'}
          </h2>
          <p className="text-gray-600 mt-4">
            {language === 'hi'
              ? galleryData.description_hi   || 'कैंपस इवेंट्स, अर्जित करने और जीवंत समुदाय से मौमेंट्स का अन्वेषण करें.'
              : galleryData.description_en   || 'Explore moments from our campus events, achievements, and vibrant community.'}
          </p>
        </div>

        {/* Masonry Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryData.images?.map((image, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-xl hover:border-[#631012] transition-all duration-300 cursor-pointer h-72 w-full"
              >
                {/* Image */}
                <div className="relative w-full h-full bg-gray-100">
                  <img
                    src={image.imageUrl}
                    alt={language === 'hi' ? image.altText_hi : image.altText_en}
                    className="w-full h-full object-fill group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#631012]/80 via-[#631012]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {/* Category badge */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">
                      {language === 'hi'
                       ? image.category_hi
                       : image.category_en}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg">
                    {language === 'hi'
                   ? image.title_hi
                   : image.title_en}
                  </h3>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-0 h-0 border-l-12 border-l-transparent border-t-12 border-t-[#631012] group-hover:border-l-12 group-hover:border-l-[#631012] transition-all duration-300"></div>

                {/* Icon - appears on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal/Lightbox */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-96 bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image display */}
              <div className="relative w-full h-96">
                <img
                  src={galleryData.images[selectedImage].imageUrl}
                  alt={language === 'hi' ? galleryData.images[selectedImage].altText_hi : galleryData.images[selectedImage].altText_en}
                  className="w-full h-full object-fill"
                />
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#631012] text-white flex items-center justify-center hover:bg-red-900 transition-colors shadow-lg"
              >
                ✕
              </button>

              {/* Info */}
              <div className="p-6 bg-white">
                <h2 className="text-2xl font-bold text-[#631012] mb-2">
                  {language === 'hi'? galleryData.images[selectedImage] ?.title_hi : galleryData.images[selectedImage] ?.title_en}
                </h2>
                <p className="text-gray-600">
                  {language === 'hi'? galleryData.images[selectedImage] ?.category_hi : galleryData.images[selectedImage] ?.category_en}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Gallery;
