'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Header31 from '@/app/components/header3';
import Footer from '@/app/components/footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface FormData {
  fullName: string;
  rollNumber: string;
  email: string;
  mobile: string;
  degree: string;
  department: string;
  passingYear: string;
  currentOrganization: string;
  designation: string;
  industry: string;
  currentCity: string;
  currentCountry: string;
  areasOfInterest: string[];
  willingToSupport: string;
  consent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface HeadingData {
  title_en: string;
  title_hn: string;
  sub_title_en: string;
  sub_title_hn: string;
  about_title_en: string;
  about_title_hn: string;
  about_sub_en: string;
  about_sub_hn: string;
  card1_title_en: string;
  card1_title_hn: string;
  card1_desc_en: string;
  card1_desc_hn: string;
  card2_title_en: string;
  card2_title_hn: string;
  card2_desc_en: string;
  card2_desc_hn: string;
  card3_title_en: string;
  card3_title_hn: string;
  card3_desc_en: string;
  card3_desc_hn: string;
  card4_title_en: string;
  card4_title_hn: string;
  card4_desc_en: string;
  card4_desc_hn: string;
  help_title_en: string;
  help_title_hn: string;
  help_desc_en: string;
  help_desc_hn: string;
  help_email: string;
  help_phone: string;
}

const FALLBACK_HEADING: HeadingData = {
  title_en: 'Alumni Registration',
  title_hn: 'पूर्व छात्र पंजीकरण',
  sub_title_en: 'Join the official NIT Hamirpur Alumni Network. Stay connected, contribute to your alma mater, and be part of a thriving community of accomplished professionals.',
  sub_title_hn: 'आधिकारिक एनआईटी हमीरपुर पूर्व छात्र नेटवर्क में शामिल हों। जुड़े रहें, अपने अल्मा मेटर में योगदान दें, और कुशल पेशेवरों के एक समृद्ध समुदाय का हिस्सा बनें।',
  about_title_en: 'About Alumni Registration',
  about_title_hn: 'पूर्व छात्र पंजीकरण के बारे में',
  about_sub_en: 'Join thousands of NITH alumni worldwide. Registration takes only a few minutes and opens doors to lifelong connections and opportunities.',
  about_sub_hn: 'दुनिया भर में हजारों एनआईटीएच पूर्व छात्रों में शामिल हों। पंजीकरण में केवल कुछ मिनट लगते हैं और यह आजीवन संबंधों और अवसरों के द्वार खोलता है।',
  card1_title_en: 'Who Can Register',
  card1_title_hn: 'कौन पंजीकरण कर सकता है',
  card1_desc_en: 'All graduates of National Institute of Technology, Hamirpur, across all programs and batches. Whether you graduated decades ago or recently, we welcome you to join our alumni network.',
  card1_desc_hn: 'राष्ट्रीय प्रौद्योगिकी संस्थान, हमीरपुर के सभी स्नातक, सभी कार्यक्रमों और बैचों में। चाहे आप दशकों पहले स्नातक हुए हों या हाल ही में, हम पूर्व छात्र नेटवर्क में शामिल होने के लिए आपका स्वागत करते हैं।',
  card2_title_en: 'Purpose & Benefits',
  card2_title_hn: 'उद्देश्य और लाभ',
  card2_desc_en: 'Maintain an updated alumni database, facilitate networking opportunities, stay informed about institute developments, events, and initiatives. Connect with fellow alumni globally.',
  card2_desc_hn: 'एक अद्यतन पूर्व छात्र डेटाबेस बनाए रखें, नेटवर्किंग के अवसरों को सुगम बनाएं, संस्थान के विकास, कार्यक्रमों और पहलों के बारे में सूचित रहें। वैश्विक स्तर पर साथी पूर्व छात्रों के साथ जुड़ें।',
  card3_title_en: 'How We Use Your Data',
  card3_title_hn: 'हम आपके डेटा का उपयोग कैसे करते हैं',
  card3_desc_en: 'Your data is used solely for alumni engagement: event invitations, newsletters, mentorship programs, professional networking, and keeping you connected with your alma mater.',
  card3_desc_hn: 'आपके डेटा का उपयोग केवल पूर्व छात्र जुड़ाव के लिए किया जाता है: कार्यक्रम निमंत्रण, समाचार पत्र, परामर्श कार्यक्रम, पेशेवर नेटवर्किंग, और आपको अपने अल्मा मेटर से जोड़े रखना।',
  card4_title_en: 'Privacy & Security',
  card4_title_hn: 'गोपनीयता और सुरक्षा',
  card4_desc_en: 'We are committed to protecting your privacy. Your information will not be shared with third parties without consent and is stored securely in compliance with data protection regulations.',
  card4_desc_hn: 'हम आपकी गोपनीयता की रक्षा करने के लिए प्रतिबद्ध हैं। आपकी जानकारी सहमति के बिना तीसरे पक्षों के साथ साझा नहीं की जाएगी और डेटा सुरक्षा नियमों के अनुपालन में सुरक्षित रूप से संग्रहीत की जाती है।',
  help_title_en: 'Need Help?',
  help_title_hn: 'मदद की ज़रूरत है?',
  help_desc_en: 'If you encounter any issues during registration or have questions, please contact the Alumni Relations Office:',
  help_desc_hn: 'यदि आपको पंजीकरण के दौरान कोई समस्या आती है या आपके कोई प्रश्न हैं, तो कृपया पूर्व छात्र संबंध कार्यालय से संपर्क करें:',
  help_email: 'alumni@nith.ac.in',
  help_phone: '+91-1972-254802'
};

export default function AlumniRegistration() {
  const language = useSelector((state: RootState) => state.language.value) || 'en';
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<HeadingData>(FALLBACK_HEADING);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    rollNumber: '',
    email: '',
    mobile: '',
    degree: '',
    department: '',
    passingYear: '',
    currentOrganization: '',
    designation: '',
    industry: '',
    currentCity: '',
    currentCountry: '',
    areasOfInterest: [],
    willingToSupport: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch Heading details dynamically
  useEffect(() => {
    const fetchHeading = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/alumni-registration');
        if (res.ok) {
          const data = await res.json();
          if (data && data.title_en) {
            const merged = { ...FALLBACK_HEADING };
            Object.keys(FALLBACK_HEADING).forEach((key) => {
              const val = data[key];
              if (val !== null && val !== undefined && val !== '') {
                (merged as any)[key] = val;
              }
            });
            setHeading(merged);
          }
        }
      } catch (err) {
        console.error('Error fetching headings:', err);
      }
    };
    fetchHeading();
  }, []);

  const degrees = isHindi 
    ? ['बी.टेक', 'एम.टेक', 'पीएचडी', 'एमसीए', 'एमएससी', 'एमबीए', 'अन्य']
    : ['B.Tech', 'M.Tech', 'Ph.D', 'MCA', 'MSc', 'MBA', 'Other'];

  const departments = isHindi
    ? [
        'कंप्यूटर विज्ञान और इंजीनियरिंग',
        'इलेक्ट्रॉनिक्स और संचार इंजीनियरिंग',
        'इलेक्ट्रिकल इंजीनियरिंग',
        'मैकेनिकल इंजीनियरिंग',
        'सिविल इंजीनियरिंग',
        'केमिकल इंजीनियरिंग',
        'आर्किटेक्चर',
        'भौतिकी',
        'रसायन विज्ञान',
        'गणित',
        'प्रबंधन अध्ययन',
        'अन्य'
      ]
    : [
        'Computer Science & Engineering',
        'Electronics & Communication Engineering',
        'Electrical Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Chemical Engineering',
        'Architecture',
        'Physics',
        'Chemistry',
        'Mathematics',
        'Management Studies',
        'Other',
      ];

  const industries = isHindi
    ? [
        'सूचना प्रौद्योगिकी',
        'उत्पादन',
        'वित्त और बैंकिंग',
        'स्वास्थ्य सेवा',
        'शिक्षा',
        'सरकारी',
        'परामर्श',
        'अनुसंधान और विकास',
        'दूरसंचार',
        'ऊर्जा',
        'एयरोस्पेस',
        'ऑटोमोटिव',
        'अन्य'
      ]
    : [
        'Information Technology',
        'Manufacturing',
        'Finance & Banking',
        'Healthcare',
        'Education',
        'Government',
        'Consulting',
        'Research & Development',
        'Telecommunications',
        'Energy',
        'Aerospace',
        'Automotive',
        'Other',
      ];

  const interestOptions = isHindi
    ? [
        'छात्रों का मार्गदर्शन करना',
        'अतिथि व्याख्यान',
        'भर्ती सहायता',
        'अनुसंधान सहयोग',
        'धन जुटाना',
        'कार्यक्रम का आयोजन'
      ]
    : [
        'Mentoring Students',
        'Guest Lectures',
        'Recruitment Support',
        'Research Collaboration',
        'Fundraising',
        'Event Organization',
      ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isHindi ? 'पूरा नाम आवश्यक है' : 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = isHindi ? 'ईमेल आवश्यक है' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isHindi ? 'अमान्य ईमेल प्रारूप' : 'Invalid email format';
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = isHindi ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required';
    } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.mobile)) {
      newErrors.mobile = isHindi ? 'अमान्य मोबाइल नंबर' : 'Invalid mobile number';
    }

    if (!formData.degree) {
      newErrors.degree = isHindi ? 'डिग्री आवश्यक है' : 'Degree is required';
    }

    if (!formData.department) {
      newErrors.department = isHindi ? 'विभाग आवश्यक है' : 'Department is required';
    }

    if (!formData.passingYear) {
      newErrors.passingYear = isHindi ? 'उत्तीर्ण वर्ष आवश्यक है' : 'Passing year is required';
    }

    if (!formData.currentOrganization.trim()) {
      newErrors.currentOrganization = isHindi ? 'वर्तमान संगठन आवश्यक है' : 'Current organization is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = isHindi ? 'पद आवश्यक है' : 'Designation is required';
    }

    if (!formData.industry) {
      newErrors.industry = isHindi ? 'उद्योग आवश्यक है' : 'Industry is required';
    }

    if (!formData.currentCity.trim()) {
      newErrors.currentCity = isHindi ? 'वर्तमान शहर आवश्यक है' : 'Current city is required';
    }

    if (!formData.currentCountry.trim()) {
      newErrors.currentCountry = isHindi ? 'वर्तमान देश आवश्यक है' : 'Current country is required';
    }

    if (!formData.willingToSupport) {
      newErrors.willingToSupport = isHindi 
        ? 'कृपया पूर्व छात्र गतिविधियों का समर्थन करने की अपनी इच्छा का संकेत दें' 
        : 'Please indicate your willingness to support';
    }

    if (!formData.consent) {
      newErrors.consent = isHindi ? 'आपको नियमों और शर्तों से सहमत होना होगा' : 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleInterestChange = (interest: string) => {
    setFormData((prev) => {
      const currentInterests = prev.areasOfInterest;
      const newInterests = currentInterests.includes(interest)
        ? currentInterests.filter((i) => i !== interest)
        : [...currentInterests, interest];
      return { ...prev, areasOfInterest: newInterests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('http://localhost:4000/api/alumni-registration/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (!response.ok || !resData.success) {
        throw new Error(resData.error || 'Failed to submit registration');
      }

      setSubmitSuccess(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          rollNumber: '',
          email: '',
          mobile: '',
          degree: '',
          department: '',
          passingYear: '',
          currentOrganization: '',
          designation: '',
          industry: '',
          currentCity: '',
          currentCountry: '',
          areasOfInterest: [],
          willingToSupport: '',
          consent: false,
        });
        setSubmitSuccess(false);
      }, 5000);
    } catch (error: any) {
      setSubmitError(
        isHindi 
          ? 'फॉर्म जमा करते समय एक त्रुटि हुई। कृपया पुन: प्रयास करें।' 
          : error.message || 'An error occurred while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      rollNumber: '',
      email: '',
      mobile: '',
      degree: '',
      department: '',
      passingYear: '',
      currentOrganization: '',
      designation: '',
      industry: '',
      currentCity: '',
      currentCountry: '',
      areasOfInterest: [],
      willingToSupport: '',
      consent: false,
    });
    setErrors({});
    setSubmitError('');
    setSubmitSuccess(false);
  };

  // Translation Dictionary
  const textDict = {
    home: isHindi ? 'मुख्यपृष्ठ' : 'Home',
    alumni: isHindi ? 'पूर्व छात्र' : 'Alumni',
    registration: isHindi ? 'पंजीकरण' : 'Registration',
    aboutRegistration: isHindi ? 'पूर्व छात्र पंजीकरण के बारे में' : 'About Alumni Registration',
    mandatoryNotice: isHindi 
      ? 'तारांकित (*) चिह्न वाले सभी फ़ील्ड अनिवार्य हैं। पंजीकरण पूरा करने में आमतौर पर 5-7 मिनट लगते हैं।' 
      : 'All fields marked with * are mandatory. Registration typically takes 5-7 minutes to complete.',
    personalInfo: isHindi ? 'व्यक्तिगत जानकारी' : 'Personal Information',
    fullName: isHindi ? 'पूरा नाम' : 'Full Name',
    fullNamePlaceholder: isHindi ? 'अपना पूरा नाम दर्ज करें' : 'Enter your full name',
    rollNumber: isHindi ? 'अनुक्रमांक' : 'Roll Number',
    rollNumberPlaceholder: isHindi ? 'उदा. CSE-19201' : 'e.g., CSE-19201',
    ifAvailable: isHindi ? '(यदि उपलब्ध हो)' : '(if available)',
    email: isHindi ? 'ईमेल पता' : 'Email Address',
    emailPlaceholder: isHindi ? 'your.email@example.com' : 'your.email@example.com',
    mobile: isHindi ? 'मोबाइल नंबर' : 'Mobile Number',
    mobilePlaceholder: isHindi ? '+91 98765 43210' : '+91 98765 43210',
    academicInfo: isHindi ? 'शैक्षणिक जानकारी' : 'Academic Information',
    degree: isHindi ? 'डिग्री / कार्यक्रम' : 'Degree / Program',
    selectDegree: isHindi ? 'डिग्री चुनें' : 'Select Degree',
    department: isHindi ? 'विभाग' : 'Department',
    selectDepartment: isHindi ? 'विभाग चुनें' : 'Select Department',
    passingYear: isHindi ? 'बैच / उत्तीर्ण वर्ष' : 'Batch / Passing Year',
    passingYearPlaceholder: isHindi ? 'उदा. 2020 या 2016-2020' : 'e.g., 2020 or 2016-2020',
    professionalInfo: isHindi ? 'व्यावसायिक जानकारी' : 'Professional Information',
    currentOrg: isHindi ? 'वर्तमान संगठन' : 'Current Organization',
    currentOrgPlaceholder: isHindi ? 'कंपनी या संगठन का नाम' : 'Company or Organization name',
    designation: isHindi ? 'पद' : 'Designation',
    designationPlaceholder: isHindi ? 'आपका पद' : 'Your job title',
    industry: isHindi ? 'उद्योग / क्षेत्र' : 'Industry / Sector',
    selectIndustry: isHindi ? 'उद्योग चुनें' : 'Select Industry',
    currentCity: isHindi ? 'वर्तमान शहर' : 'Current City',
    currentCityPlaceholder: isHindi ? 'शहर का नाम' : 'City name',
    currentCountry: isHindi ? 'वर्तमान देश' : 'Current Country',
    currentCountryPlaceholder: isHindi ? 'देश का नाम' : 'Country name',
    additionalInfo: isHindi ? 'अतिरिक्त जानकारी' : 'Additional Information',
    optionalText: isHindi ? '(वैकल्पिक)' : '(Optional)',
    areasOfInterest: isHindi ? 'रुचि के क्षेत्र' : 'Areas of Interest',
    willingSupport: isHindi ? 'पूर्व छात्र गतिविधियों का समर्थन करने की इच्छा?' : 'Willingness to Support Alumni Activities',
    yes: isHindi ? 'हाँ' : 'Yes',
    no: isHindi ? 'नहीं' : 'No',
    privacyConsent: isHindi ? 'गोपनीयता और सहमति' : 'Privacy & Consent',
    consentCheckboxText: isHindi 
      ? 'मैं पुष्टि करता हूं कि प्रदान की गई जानकारी सही है और आधिकारिक पूर्व-छात्र संचार के लिए इसके उपयोग के लिए सहमति देता हूं। मैंने गोपनीयता नीति को पढ़ा है और उससे सहमत हूं।'
      : 'I confirm that the information provided is correct and consent to its use for official alumni-related communication. I have read and agree to the Privacy Policy.',
    privacyPolicy: isHindi ? 'गोपनीयता नीति' : 'Privacy Policy',
    submitButton: isHindi ? 'पंजीकरण जमा करें' : 'Submit Registration',
    submittingButton: isHindi ? 'जमा किया जा रहा है...' : 'Submitting...',
    resetButton: isHindi ? 'फॉर्म रीसेट करें' : 'Reset Form',
    needHelp: isHindi ? 'मदद की ज़रूरत है?' : 'Need Help?',
    needHelpDesc: isHindi 
      ? 'यदि आपको पंजीकरण के दौरान कोई समस्या आती है या आपके कोई प्रश्न हैं, तो कृपया पूर्व छात्र संबंध कार्यालय से संपर्क करें:'
      : 'If you encounter any issues during registration or have questions, please contact the Alumni Relations Office:',
    successTitle: isHindi ? 'पंजीकरण सफल रहा!' : 'Registration Successful!',
    successDesc: isHindi ? 'पंजीकरण करने के लिए धन्यवाद। आपको जल्द ही एक पुष्टिकरण ईमेल प्राप्त होगा।' : 'Thank you for registering. You will receive a confirmation email shortly.',
    errorTitle: isHindi ? 'प्रस्तुतिकरण त्रुटि' : 'Submission Error',
    noteText: isHindi ? 'नोट:' : 'Note'
  };

  const titleText = isHindi ? heading.title_hn : heading.title_en;
  const subTitleText = isHindi ? heading.sub_title_hn : heading.sub_title_en;
  
  const aboutTitleText = isHindi ? heading.about_title_hn : heading.about_title_en;
  const aboutSubText = isHindi ? heading.about_sub_hn : heading.about_sub_en;

  const card1Title = isHindi ? heading.card1_title_hn : heading.card1_title_en;
  const card1Desc = isHindi ? heading.card1_desc_hn : heading.card1_desc_en;
  
  const card2Title = isHindi ? heading.card2_title_hn : heading.card2_title_en;
  const card2Desc = isHindi ? heading.card2_desc_hn : heading.card2_desc_en;
  
  const card3Title = isHindi ? heading.card3_title_hn : heading.card3_title_en;
  const card3Desc = isHindi ? heading.card3_desc_hn : heading.card3_desc_en;
  
  const card4Title = isHindi ? heading.card4_title_hn : heading.card4_title_en;
  const card4Desc = isHindi ? heading.card4_desc_hn : heading.card4_desc_en;

  return (
    <>
      <Header31 />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gray-50 py-4 px-6 md:px-12 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link
                href="/"
                className="hover:text-[#800000] transition-colors duration-200"
              >
                {textDict.home}
              </Link>
              <span>›</span>
              <span className="text-gray-400">{textDict.alumni}</span>
              <span>›</span>
              <span className="text-[#800000] font-medium">{textDict.registration}</span>
            </nav>
          </div>
        </div>

        <section className="bg-gradient-to-br from-[#631012] via-[#7a1a1d] to-[#4a0c0e] py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {titleText}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {subTitleText}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-10 mb-8 shadow-sm"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#631012] to-[#7a1a1d] rounded-2xl mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {aboutTitleText}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  {aboutSubText}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card1Title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {card1Desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card2Title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {card2Desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card3Title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {card3Desc}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-amber-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {card4Title}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {card4Desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-200">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <svg
                    className="w-5 h-5 text-[#631012] flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong>{textDict.noteText}:</strong> {textDict.mandatoryNotice}
                  </span>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">
                        {textDict.successTitle}
                      </h3>
                      <p className="text-green-700 mt-1">
                        {textDict.successDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {submitError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-red-900">
                      {textDict.errorTitle}
                    </h3>
                    <p className="text-red-700 mt-1">{submitError}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-6 md:p-10"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#631012] text-white font-bold">
                      1
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {textDict.personalInfo}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.fullName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={textDict.fullNamePlaceholder}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="rollNumber"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.rollNumber}{' '}
                        <span className="text-gray-400 text-xs">
                          {textDict.ifAvailable}
                        </span>
                      </label>
                      <input
                        type="text"
                        id="rollNumber"
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all"
                        placeholder={textDict.rollNumberPlaceholder}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.email} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={textDict.emailPlaceholder}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.mobile} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.mobile ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder={textDict.mobilePlaceholder}
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.mobile}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#631012] text-white font-bold">
                      2
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {textDict.academicInfo}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="degree"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.degree} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.degree ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{textDict.selectDegree}</option>
                        {degrees.map((degree) => (
                          <option key={degree} value={degree}>
                            {degree}
                          </option>
                        ))}
                      </select>
                      {errors.degree && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.degree}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.department} <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.department
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      >
                        <option value="">{textDict.selectDepartment}</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.department}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="passingYear"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.passingYear}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="passingYear"
                        name="passingYear"
                        value={formData.passingYear}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.passingYear
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder={textDict.passingYearPlaceholder}
                      />
                      {errors.passingYear && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.passingYear}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#631012] text-white font-bold">
                      3
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {textDict.professionalInfo}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="currentOrganization"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.currentOrg}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="currentOrganization"
                        name="currentOrganization"
                        value={formData.currentOrganization}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.currentOrganization
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder={textDict.currentOrgPlaceholder}
                      />
                      {errors.currentOrganization && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.currentOrganization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="designation"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.designation} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.designation
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder={textDict.designationPlaceholder}
                      />
                      {errors.designation && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.designation}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="industry"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.industry}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.industry ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{textDict.selectIndustry}</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.industry}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="currentCity"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.currentCity} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="currentCity"
                        name="currentCity"
                        value={formData.currentCity}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.currentCity
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder={textDict.currentCityPlaceholder}
                      />
                      {errors.currentCity && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.currentCity}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="currentCountry"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        {textDict.currentCountry} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="currentCountry"
                        name="currentCountry"
                        value={formData.currentCountry}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#631012] focus:border-transparent transition-all ${
                          errors.currentCountry
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                        placeholder={textDict.currentCountryPlaceholder}
                      />
                      {errors.currentCountry && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.currentCountry}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#631012] text-white font-bold">
                      4
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {textDict.additionalInfo}{' '}
                      <span className="text-gray-400 text-lg">{textDict.optionalText}</span>
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {textDict.areasOfInterest}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {interestOptions.map((interest) => (
                          <label
                            key={interest}
                            className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={formData.areasOfInterest.includes(
                                interest
                              )}
                              onChange={() => handleInterestChange(interest)}
                              className="w-5 h-5 text-[#631012] rounded focus:ring-[#631012]"
                            />
                            <span className="text-gray-700">{interest}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {textDict.willingSupport}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="willingToSupport"
                            value="Yes"
                            checked={formData.willingToSupport === 'Yes'}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-[#631012] focus:ring-[#631012]"
                          />
                          <span className="text-gray-700">{textDict.yes}</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="willingToSupport"
                            value="No"
                            checked={formData.willingToSupport === 'No'}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-[#631012] focus:ring-[#631012]"
                          />
                          <span className="text-gray-700">{textDict.no}</span>
                        </label>
                      </div>
                      {errors.willingToSupport && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.willingToSupport}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {textDict.privacyConsent}
                    </h3>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className={`mt-1 w-5 h-5 text-[#631012] rounded focus:ring-[#631012] ${
                          errors.consent ? 'border-red-500' : ''
                        }`}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        {textDict.consentCheckboxText} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`flex-1 px-8 py-4 rounded-lg font-semibold text-white transition-all shadow-lg ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#631012] hover:bg-[#7a1a1d] shadow-[#631012]/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {textDict.submittingButton}
                      </span>
                    ) : (
                      textDict.submitButton
                    )}
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={handleReset}
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`px-8 py-4 rounded-lg font-semibold border-2 transition-all ${
                      isSubmitting
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                        : 'border-[#631012] text-[#631012] hover:bg-[#631012] hover:text-white'
                    }`}
                  >
                    {textDict.resetButton}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 bg-white rounded-2xl shadow-sm p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {isHindi ? (heading.help_title_hn || FALLBACK_HEADING.help_title_hn) : (heading.help_title_en || FALLBACK_HEADING.help_title_en)}
              </h3>
              <p className="text-gray-700 mb-4">
                {isHindi ? (heading.help_desc_hn || FALLBACK_HEADING.help_desc_hn) : (heading.help_desc_en || FALLBACK_HEADING.help_desc_en)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#631012] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    Email:{' '}
                    <a
                      href={`mailto:${heading.help_email || FALLBACK_HEADING.help_email}`}
                      className="text-[#631012] hover:underline"
                    >
                      {heading.help_email || FALLBACK_HEADING.help_email}
                    </a>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#631012] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-gray-700">Phone: {heading.help_phone || FALLBACK_HEADING.help_phone}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
