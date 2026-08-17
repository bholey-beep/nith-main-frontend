'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  ChevronRight,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  Sparkles,
  ExternalLink,
  Mail,
  Phone,
  Building,
  Image as ImageIcon,
  CheckCircle2,
  X,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { div } from 'framer-motion/client';

interface PastMeet {
  id: number;
  year: string;
  theme_en: string;
  theme_hn: string;
  date_en: string;
  date_hn: string;
  highlights_en: string;
  highlights_hn: string;
  attendees?: number;
  images?: string;
}

interface ScheduleItem {
  id: number;
  time_en: string;
  time_hn: string;
  activity_en: string;
  activity_hn: string;
  venue_en: string;
  venue_hn: string;
  speaker_en?: string;
  speaker_hn?: string;
}

interface GalleryImage {
  id: number;
  url: string;
  year: string;
  caption_en: string;
  caption_hn: string;
}

const FALLBACK_HEADING = {
  title_en: 'Annual Alumni Meet – NIT Hamirpur',
  title_hn: 'वार्षिक पूर्व छात्र सम्मेलन – एनआईटी हमीरपुर',
  sub_title_en: 'Celebrating shared traditions, innovation, and lifelong bonds with the proud alumni family across the globe.',
  sub_title_hn: 'दुनिया भर में गर्वित पूर्व छात्र परिवार के साथ साझा परंपराओं, नवाचार और आजीवन बंधनों का उत्सव।',
  about_title_en: 'About the Annual Alumni Meet',
  about_title_hn: 'वार्षिक पूर्व छात्र सम्मेलन के बारे में',
  about_desc1_en: 'The Annual Alumni Meet of National Institute of Technology Hamirpur serves as a grand homecoming celebration uniting distinguished alumni, faculty, researchers, and students. It provides a timeless platform to reconnect with classmates, walk down the lush pine-clad memory lanes of Hamirpur, and cherish the enduring bond with the alma mater.',
  about_desc1_hn: 'राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर का वार्षिक पूर्व छात्र सम्मेलन एक भव्य पुनर्मिलन उत्सव है जो प्रतिष्ठित पूर्व छात्रों, संकाय, शोधकर्ताओं और छात्रों को एकजुट करता है। यह सहपाठियों से फिर से जुड़ने, हमीरपुर की चीड़ की सुंदर वादियों की यादों में लौटने और अल्मा मेटर के साथ अपने स्थायी संबंध को संजोने का एक मंच प्रदान करता है।',
  about_desc2_en: 'Over the course of this cherished annual rendezvous, alumni witness the modern infrastructural transformations of NITH, participate in interactive student mentorship roundtables, and deliberate upon industry-academia collaborative programs that empower the next generation of engineers and technologists.',
  about_desc2_hn: 'इस प्रतिष्ठित वार्षिक सम्मेलन के दौरान, पूर्व छात्र एनआईटीएच के आधुनिक बुनियादी ढांचे के परिवर्तनों को देखते हैं, छात्र परामर्श गोलमेज बैठकों में भाग लेते हैं, और उद्योग-अकादमिक सहयोग कार्यक्रमों पर विचार-विमर्श करते हैं जो इंजीनियरों और प्रौद्योगिकीविदों की अगली पीढ़ी को सशक्त बनाते हैं।',
  about_desc3_en: 'The meet also features the prestigious Distinguished Alumni Awards ceremony, honoring exceptional alumni who have achieved exemplary milestones across multinational leadership, entrepreneurship, civil services, academic research, and community upliftment.',
  about_desc3_hn: 'सम्मेलन में प्रतिष्ठित विशिष्ट पूर्व छात्र पुरस्कार समारोह भी आयोजित किया जाता है, जिसमें बहुराष्ट्रीय नेतृत्व, उद्यमिता, सिविल सेवा, शैक्षणिक अनुसंधान और सामुदायिक उत्थान में असाधारण मील के पत्थर हासिल करने वाले पूर्व छात्रों को सम्मानित किया जाता है।',
  upcoming_title_en: 'Annual Alumni Homecoming Meet 2025',
  upcoming_title_hn: 'वार्षिक पूर्व छात्र पुनर्मिलन सम्मेलन 2025',
  upcoming_theme_en: 'Reconnecting Roots, Inspiring Futures',
  upcoming_theme_hn: 'जड़ों से जुड़ाव, भविष्य की प्रेरणा',
  upcoming_date_en: 'November 8–9, 2025',
  upcoming_date_hn: '8-9 नवंबर, 2025',
  upcoming_venue_en: 'Auditorium Complex, NIT Hamirpur (H.P.)',
  upcoming_venue_hn: 'ऑडिटोरियम परिसर, एनआईटी हमीरपुर (हि.प्र.)',
  upcoming_desc_en: 'Join hundreds of NITHians from batches spanning 1986 to 2024 for two memorable days of nostalgic walks, keynote addresses, department visitations, alumni sports fiesta, and an enchanting Himachali cultural gala dinner.',
  upcoming_desc_hn: '1986 से 2024 तक के बैचों के सैकड़ों एनआईटीएचियंस के साथ दो यादगार दिनों के लिए जुड़ें, जिसमें पुरानी यादों की सैर, मुख्य भाषण, विभाग भ्रमण, पूर्व छात्र खेल उत्सव और एक मनमोहक हिमाचली सांस्कृतिक गाला डिनर शामिल हैं।',
  upcoming_reg_open: true,
  upcoming_image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop',
  involve_title_en: 'Get in Touch with Alumni Cell',
  involve_title_hn: 'पूर्व छात्र प्रकोष्ठ से संपर्क करें',
  involve_desc_en: 'For queries regarding accommodation on campus, delegate passes, or batch reunion coordination:',
  involve_desc_hn: 'परिसर में आवास, प्रतिनिधि पास या बैच पुनर्मिलन समन्वय से संबंधित प्रश्नों के लिए संपर्क करें:',
  contact_email: 'dar@nith.ac.in',
  contact_phone: '+91-1972-254054 / 254634',
  contact_address_en: 'Office of Dean (Alumni & Resources), Administrative Block, NIT Hamirpur, Himachal Pradesh – 177005',
  contact_address_hn: 'डीन (पूर्व छात्र और संसाधन) कार्यालय, प्रशासनिक भवन, एनआईटी हमीरपुर, हिमाचल प्रदेश - 177005',
  connected_title_en: 'Stay Connected with the Global NITH Network',
  connected_title_hn: 'वैश्विक एनआईटीएच नेटवर्क से जुड़े रहें',
  connected_desc_en: 'Engage with your alma mater, mentor dynamic student leaders, share job referrals, and leave an everlasting legacy.',
  connected_desc_hn: 'अपने अल्मा मेटर से जुड़ें, ऊर्जावान छात्र नेताओं का मार्गदर्शन करें, जॉब रेफरल साझा करें और एक स्थायी विरासत छोड़ें।',
  link_register_label_en: 'Register for Homecoming 2025',
  link_register_label_hn: 'सम्मेलन 2025 के लिए पंजीकरण करें',
  link_register_url: '/alumni/registration',
  link_network_label_en: 'Browse Alumni Directory',
  link_network_label_hn: 'पूर्व छात्र निर्देशिका देखें',
  link_network_url: '/alumni/list',
  link_endowment_label_en: 'Contribute to Endowment Fund',
  link_endowment_label_hn: 'अक्षय निधि में योगदान करें',
  link_endowment_url: '/alumni/endowment-fund',
  btn_join_label_en: 'Alumni Portal Login',
  btn_join_label_hn: 'पूर्व छात्र पोर्टल लॉगिन',
  btn_join_url: '/alumni/registration',
  btn_sub_label_en: 'Download Souvenir Booklet',
  btn_sub_label_hn: 'स्मारिका पुस्तिका डाउनलोड करें',
  btn_sub_url: '/Download_routes/Miscellaneous-Downloads/general',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function AnnualAlumniMeetPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [heading, setHeading] = useState<any>(FALLBACK_HEADING);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [pastMeets, setPastMeets] = useState<PastMeet[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/alumni-annual-meet`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            if (data.heading) setHeading({ ...FALLBACK_HEADING, ...data.heading });
            if (Array.isArray(data.schedule)) setSchedule(data.schedule);
            if (Array.isArray(data.past)) setPastMeets(data.past);
            if (Array.isArray(data.gallery)) setGalleryImages(data.gallery);
          }
        }
      } catch (err) {
        console.error('Error fetching annual meet data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'पूर्व छात्र' : 'Alumni'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'वार्षिक पूर्व छात्र सम्मेलन' : 'Annual Alumni Meet'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* Page Title */}
        <div className="text-center space-y-2 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#631012] tracking-tight">
            {isHindi ? heading.title_hn : heading.title_en}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
            {isHindi ? heading.sub_title_hn : heading.sub_title_en}
          </p>
        </div>

        
         <div></div>

      
      </main>
    </div>
  );
}
