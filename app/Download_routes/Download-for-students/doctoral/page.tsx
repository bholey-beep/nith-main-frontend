"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const selectLanguage = (state: any) => state.language.value;

interface DownloadItem {
  id: number;
  rank: number;
  type: "faculty" | "students" | "miscellaneous";
  category_en: "ug" | "pg" | "doctoral";
  category_hi: string;
  title_en: string;
  title_hi: string;
  particulars_en: string;
  particulars_hi: string;
  name_en: string;
  name_hi: string;

  form_type: "pdf" | "word" | "both";
  file_url?: string;
  word_url?: string;
}

export default function WorkshopDownloadsPage() {
  const language = useSelector(selectLanguage);

  const [data, setData] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);

  const type: DownloadItem["type"] = "students";
  const category: "ug" | "pg" | "doctoral" = "doctoral";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const API_BASE = "http://localhost:4000/v1/downloads";

        const res = await fetch(
          `${API_BASE}/data?type=${type}&category=${category}`,
        );

        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error fetching downloads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, category]);

  const headings =
    language === "hi"
      ? {
          sno: "क्रमांक",
          description: "विवरण",
          downloads: "डाउनलोड",
        }
      : {
          sno: "S.No",
          description: "Description",
          downloads: "Downloads",
        };

  return (
    <section className="py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="w-full bg-white rounded-t-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[80px_1fr_140px] gap-4 bg-gray-50 border-b border-gray-200 p-4 text-sm font-semibold text-gray-700">
            <div className="uppercase tracking-wider text-xs font-bold text-[#631012]">{headings.sno}</div>
            <div className="uppercase tracking-wider text-xs font-bold text-[#631012]">
              {headings.description}
            </div>
            <div className="text-center uppercase tracking-wider text-xs font-bold text-[#631012]">
              {headings.downloads}
            </div>
          </div>

          {/* Body */}
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : (
            data.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-[80px_1fr_140px] gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center"
                >
                  {/* Rank */}
                  <div className="text-center font-mono text-gray-400">
                    {item.rank}
                  </div>

                  {/* Description */}
                  <div className="text-gray-600 text-sm">
                    {language === "hi"
                      ? item.particulars_hi
                      : item.particulars_en}
                  </div>

                  {/* Download */}
                  <div className="flex justify-center gap-3">
                    {(item.form_type === "pdf" || item.form_type === "both") &&
                      item.file_url && (
                        <a
                          href={item.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#631012] hover:underline text-sm font-medium"
                        >
                          {language === "hi" ? "पीडीएफ" : "PDF"}
                        </a>
                      )}

                    {(item.form_type === "word" || item.form_type === "both") &&
                      item.word_url && (
                        <a
                          href={item.word_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#631012] hover:underline text-sm font-medium"
                        >
                          {language === "hi" ? "वर्ड" : "Word"}
                        </a>
                      )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
