'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import Aboutnith from '../slidebar/aboutnith/aboutnith';
import Academic from '../slidebar/Academics/academic';
import Administration from '../slidebar/Administration/administration';
import Authorities from '../slidebar/Authorities/authorities';
import Alumni from '../slidebar/Alumni/alumini';
import Department from '../slidebar/Departments/department';
import Downloads from '../slidebar/downloads/downloads';
import Faculty from '../slidebar/Faculty/faculty';
import Student from '../slidebar/Student/student';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { toggleLanguage } from '../../redux/language_converter';

function Header31() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200); // 400ms delay to allow moving mouse to the dropdown
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);
  const language = useSelector((state: RootState) => state.language.value);
  const dispatch = useDispatch();

  // Top Bar Lists
  const accessibilityItems = [
    { label: 'A+', label2: 'ए+' },
    { label: 'A-', label2: 'ए-' },
    { label: 'Toggle Contrast', label2: 'कंट्रास्ट' },
    { label: 'Grey Scale', label2: 'ग्रे स्केल' },
    { label: 'Links', label2: 'लिंक' },
    { label: 'Reset', label2: 'रीसेट' },
  ];

  const quickLinks = [
    { label: 'Home', label2: 'होम' },
    { label: 'Internet', label2: 'इंटरनेट' },
    { label: 'eOffice', label2: 'ई-ऑफिस' },
    { label: 'Directory', label2: 'डायरेक्टरी' },
    { label: 'Faculty Portfolio', label2: 'फैकल्टी पोर्टफोलियो' },
  ];

  return (
    <div className="flex flex-col w-full font-sans bg-white shadow-xl relative">
      <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(rgba(99,16,18,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,16,18,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0 transition-all duration-300"></div>

      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#500c0e] text-gray-300 text-[clamp(8px,1.5vw,10px)] py-1 sm:py-2 px-2 sm:px-4 md:px-8 border-b border-[#631012]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-1 sm:gap-2 tracking-[0.05em] sm:tracking-widest uppercase">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 opacity-90">
            {accessibilityItems.map((item) => (
              <button
                key={item.label}
                className="hover:text-white hover:underline transition-all duration-300 px-0.5 text-[clamp(7px,1.1vw,10px)] sm:text-[clamp(8px,1.3vw,11px)] md:text-[clamp(9px,1.5vw,12px)]"
              >
                {language == 'en' ? item.label : item.label2}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-5 font-semibold md:ml-auto">
            {quickLinks.map((item) => (
              <Link
                key={item.label}
                href="/"
                className="hover:text-white hover:underline decoration-white underline-offset-4 transition-all duration-300 text-[clamp(7px,1.1vw,10px)] sm:text-[clamp(8px,1.3vw,11px)] md:text-[clamp(9px,1.5vw,12px)] px-0.5"
              >
                {language == 'en' ? item.label : item.label2}
              </Link>
            ))}
            <span className="hidden md:block w-px h-3 bg-white/20 my-auto hover:text-black rounded-sm hover:bg-white" />
            <button
              type="button"
              className="hover:text-black rounded-sm hover:bg-white p-1 text-[clamp(7px,1.1vw,10px)] sm:text-[clamp(8px,1.3vw,11px)] md:text-[clamp(9px,1.5vw,12px)]"
              onClick={() => {
                dispatch(toggleLanguage());
              }}
            >
              {language === 'en' ? 'English' : 'हिंदी'}
            </button>
          </div>
        </div>
      </div>

      {/* 2. HEADER & NAVIGATION - COMBINED LAYOUT */}
      <div className="w-full bg-[#f8f9fa] border-b border-gray-200 relative z-20">
        <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row items-center justify-between px-2 sm:px-4 md:px-8 py-1.5 md:py-2 gap-3 md:gap-4">
          
          {/* === LEFT SIDE: LOGO & TITLE === */}
          <Link
            href="/"
            className="flex flex-row items-center gap-2 sm:gap-3"
          >
            {/* LOGO */}
            <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 flex-shrink-0">
              <img
                src="/l.png"
                alt="NITH Logo"
                className="object-contain h-full w-full"
              />
            </div>
            
            {/* TITLE */}
            <div className="flex flex-col justify-center text-left">
              <h3 className="text-[clamp(10px,1.1vw,14px)] font-bold text-[#631012] leading-[1.15]">
                राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर
              </h3>
              <h3 className="text-[clamp(10px,1.1vw,14px)] font-bold text-[#631012] leading-[1.15]">
                National Institute of Technology Hamirpur
              </h3>
              <p className="text-[clamp(8px,0.8vw,10px)] text-gray-600 mt-0.5">
                {language == 'en'
                  ? '(An Institute of National Importance)'
                  : '(राष्ट्रीय महत्व का संस्थान)'}
              </p>
            </div>
          </Link>

          {/* === RIGHT SIDE: NAVIGATION BAR === */}
          <nav className="flex flex-wrap items-center justify-center xl:justify-end gap-x-2 sm:gap-x-4 gap-y-1 mt-1 xl:mt-0">
            {[
              { id: 'about', label: 'About NITH', label2: 'संस्थान के बारे में' },
              { id: 'authorities', label: 'Authorities', label2: 'प्राधिकरण' },
              { id: 'administration', label: 'Administration', label2: 'प्रशासन' },
              { id: 'departments', label: 'Departments', label2: 'विभाग' },
              { id: 'academics', label: 'Academics', label2: 'शैक्षणिक' },
              { id: 'student', label: 'Student', label2: 'छात्र' },
              { id: 'faculty', label: 'Faculty', label2: 'संकाय' },
              { id: 'alumni', label: 'Alumni', label2: 'पूर्व छात्र' },
              { id: 'downloads', label: 'Downloads', label2: 'डाउनलोड' },
            ].map((item) => (
              <div
                key={item.id}
                className="text-[#333333] hover:text-[#631012] flex items-center gap-0.5 cursor-pointer transition-colors whitespace-nowrap text-[clamp(10px,1vw,12.5px)] py-1.5 group font-medium"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {language == 'en' ? item.label : item.label2}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 group-hover:text-[#631012] ${activeDropdown === item.id ? 'rotate-180 text-[#631012]' : 'text-gray-500'}`}
                />
              </div>
            ))}
          </nav>
        </div>

        {/* Dropdown Menu */}
        {activeDropdown && (
          <div
            className="absolute top-full left-0 right-0 bg-white text-black shadow-xl border-t border-gray-100 z-[9999]"
            style={{ minHeight: '300px', maxHeight: '70vh', overflowY: 'auto' }}
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-[1400px] mx-auto">
              {activeDropdown === 'about' && <Aboutnith />}
              {activeDropdown === 'authorities' && <Authorities />}
              {activeDropdown === 'administration' && <Administration />}
              {activeDropdown === 'departments' && <Department />}
              {activeDropdown === 'academics' && <Academic />}
              {activeDropdown === 'student' && <Student />}
              {activeDropdown === 'faculty' && <Faculty />}
              {activeDropdown === 'alumni' && <Alumni />}
              {activeDropdown === 'downloads' && <Downloads />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header31;
