'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  ChevronRight,
  Target,
  Zap,
  TrendingUp,
  Award,
  Compass,
  CheckCircle2,
  Calendar,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface GoalItem {
  id: number;
  icon: string;
  title: string;
  text: string;
  stats_label: string;
  stats_value: string;
}

interface RoadmapItem {
  id: number;
  year: string;
  title: string;
  focus: string;
  items?: string[];
}

interface PageData {
  hero_heading: string;
  hero_description: string;
  goals_heading: string;
  goals_subtitle: string;
  strategy_heading: string;
  strategy_description: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Target,
  Zap,
  TrendingUp,
  Award,
};

const FALLBACK_PAGE: PageData = {
  hero_heading: 'Institutional Strategic Goals & Roadmap',
  hero_description: 'Charting a transformative trajectory for academic distinction, global research competitiveness, state-of-the-art infrastructure, and sustainable Himalayan development.',
  goals_heading: 'Key Strategic Objectives',
  goals_subtitle: 'Milestones for Institutional Evolution and Excellence',
  strategy_heading: 'Strategic Multi-Year Roadmap',
  strategy_description: 'Phased implementation of multidisciplinary research clusters, digital campus infrastructure, industry-backed patent commercialization, and green energy self-sufficiency.',
};

const FALLBACK_GOALS = [
  {
    id: 1,
    icon: 'Target',
    title_en: 'Rank Among Top 20 Institutes in India (NIRF)',
    title_hi: 'भारत के शीर्ष 20 संस्थानों में स्थान (एनआईआरएफ)',
    text_en: 'Enhance faculty-to-student ratios, high-impact indexed publications, patents, and campus placements to achieve top NIRF and QS world rankings.',
    text_hi: 'शीर्ष एनआईआरएफ और क्यूएस विश्व रैंकिंग प्राप्त करने के लिए संकाय-छात्र अनुपात, उच्च-प्रभाव प्रकाशनों, पेटेंट और परिसर प्लेसमेंट को बढ़ाना।',
    stats_label_en: 'Target Rank',
    stats_label_hi: 'लक्ष्य रैंक',
    stats_value: 'Top 20'
  },
  {
    id: 2,
    icon: 'Zap',
    title_en: '100% Green & Zero Carbon Campus',
    title_hi: '100% हरित और शून्य कार्बन परिसर',
    text_en: 'Transition to 100% solar and micro-hydro energy, zero-waste recycling, electric intra-campus mobility, and rainwater harvesting.',
    text_hi: '100% सौर और लघु-जल ऊर्जा, शून्य-अपशिष्ट पुनर्चक्रण, इलेक्ट्रिक कैंपस मोबिलिटी और वर्षा जल संचयन में परिवर्तन।',
    stats_label_en: 'Green Energy Share',
    stats_label_hi: 'हरित ऊर्जा हिस्सा',
    stats_value: '100%'
  },
  {
    id: 3,
    icon: 'TrendingUp',
    title_en: 'Interdisciplinary AI & Quantum Research Hub',
    title_hi: 'अंतःविषय एआई और क्वांटम अनुसंधान केंद्र',
    text_en: 'Establish dedicated centres of excellence for Artificial Intelligence, Quantum Computing, Climate Resilience, and Advanced Semiconductor design.',
    text_hi: 'आर्टिफिशियल इंटेलिजेंस, क्वांटम कंप्यूटिंग, जलवायु लचीलापन और उन्नत सेमीकंडक्टर डिजाइन के लिए समर्पित उत्कृष्टता केंद्र स्थापित करना।',
    stats_label_en: 'Centres of Excellence',
    stats_label_hi: 'उत्कृष्टता केंद्र',
    stats_value: '10+'
  },
  {
    id: 4,
    icon: 'Award',
    title_en: 'Startup Incubation & 50+ New Patents Annually',
    title_hi: 'स्टार्टअप इनक्यूबेशन और प्रति वर्ष 50+ नए पेटेंट',
    text_en: 'Scale the Technology Business Incubator (TBI) to foster student startups, regional entrepreneurship, and intellectual property monetization.',
    text_hi: 'छात्र स्टार्टअप, क्षेत्रीय उद्यमिता और बौद्धिक संपदा मुद्रीकरण को बढ़ावा देने के लिए प्रौद्योगिकी व्यवसाय इनक्यूबेटर (टीबीआई) का विस्तार करना।',
    stats_label_en: 'Annual Patents & Startups',
    stats_label_hi: 'वार्षिक पेटेंट और स्टार्टअप',
    stats_value: '50+'
  }
];

const FALLBACK_ROADMAP = [
  {
    id: 1,
    year: '2025-2026',
    title_en: 'Phase 1: Academic Modernization & Infrastructure Expansion',
    title_hi: 'चरण 1: शैक्षणिक आधुनिकीकरण और बुनियादी ढांचा विस्तार',
    focus_en: 'NEP 2020 Full Rollout, High-Performance Computing Cluster, New Smart Lecture Complex',
    focus_hi: 'एनईपी 2020 पूर्ण रोलआउट, उच्च प्रदर्शन कंप्यूटिंग क्लस्टर, नया स्मार्ट व्याख्यान परिसर',
  },
  {
    id: 2,
    year: '2027-2028',
    title_en: 'Phase 2: Global Research Collaborations & Innovation Surge',
    title_hi: 'चरण 2: वैश्विक अनुसंधान सहयोग और नवाचार वृद्धि',
    focus_en: 'International Joint Research Labs, Technology Transfer Accelerator, 100+ PhD Fellowships',
    focus_hi: 'अंतर्राष्ट्रीय संयुक्त अनुसंधान प्रयोगशालाएं, प्रौद्योगिकी हस्तांतरण त्वरक, 100+ पीएचडी फैलोशिप',
  },
  {
    id: 3,
    year: '2029-2030',
    title_en: 'Phase 3: Global Eminence & Net-Zero Model Himalayan Campus',
    title_hi: 'चरण 3: वैश्विक प्रतिष्ठा और नेट-जीरो मॉडल हिमालयी परिसर',
    focus_en: 'Top 500 QS World Ranking, Self-Sustaining Green Tech Ecosystem, World-Class Sports Complex',
    focus_hi: 'शीर्ष 500 क्यूएस विश्व रैंकिंग, आत्मनिर्भर ग्रीन टेक इकोसिस्टम, विश्व स्तरीय खेल परिसर',
  }
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export default function GoalsPage() {
  const language = useSelector((state: RootState) => state.language.value);
  const isHindi = language === 'hi';

  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [roadmaps, setRoadmaps] = useState<RoadmapItem[]>([]);
  const [pageData, setPageData] = useState<PageData>(FALLBACK_PAGE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchGoals() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/goals`, { cache: 'no-store' });
        const json = await res.json();
        if (json.success && !cancelled) {
          const gList = Array.isArray(json.goals) && json.goals.length > 0 ? json.goals : Array.isArray(json.data) && json.data.length > 0 ? json.data : FALLBACK_GOALS;
          setGoals(
            gList.map((g: any) => ({
              id: g.id,
              icon: g.icon || 'Target',
              title: isHindi && g.title_hi ? g.title_hi : g.title_en,
              text: isHindi && g.text_hi ? g.text_hi : g.text_en,
              stats_label: isHindi && g.stats_label_hi ? g.stats_label_hi : g.stats_label_en,
              stats_value: g.stats_value || '',
            }))
          );

          const rList = Array.isArray(json.roadmaps) && json.roadmaps.length > 0 ? json.roadmaps : FALLBACK_ROADMAP;
          setRoadmaps(
            rList.map((r: any) => ({
              id: r.id,
              year: r.year,
              title: isHindi && r.title_hi ? r.title_hi : r.title_en,
              focus: isHindi && r.focus_hi ? r.focus_hi : r.focus_en,
              items: isHindi && Array.isArray(r.items_hi) ? r.items_hi : Array.isArray(r.items_en) ? r.items_en : [],
            }))
          );

          if (json.page && (json.page.hero_heading_en || json.page.hero_heading_hi)) {
            setPageData({
              hero_heading: isHindi && json.page.hero_heading_hi ? json.page.hero_heading_hi : json.page.hero_heading_en || FALLBACK_PAGE.hero_heading,
              hero_description: isHindi && json.page.hero_description_hi ? json.page.hero_description_hi : json.page.hero_description_en || FALLBACK_PAGE.hero_description,
              goals_heading: isHindi && json.page.goals_heading_hi ? json.page.goals_heading_hi : json.page.goals_heading_en || FALLBACK_PAGE.goals_heading,
              goals_subtitle: isHindi && json.page.goals_subtitle_hi ? json.page.goals_subtitle_hi : json.page.goals_subtitle_en || FALLBACK_PAGE.goals_subtitle,
              strategy_heading: isHindi && json.page.strategy_heading_hi ? json.page.strategy_heading_hi : json.page.strategy_heading_en || FALLBACK_PAGE.strategy_heading,
              strategy_description: isHindi && json.page.strategy_description_hi ? json.page.strategy_description_hi : json.page.strategy_description_en || FALLBACK_PAGE.strategy_description,
            });
          }
        }
      } catch (err) {
        console.error('Error fetching goals:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchGoals();
    return () => {
      cancelled = true;
    };
  }, [isHindi]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans pb-24">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-gray-600 font-medium">
          <Link href="/" className="hover:text-[#631012] transition-colors">
            {isHindi ? 'होम' : 'Home'}
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-gray-400">{isHindi ? 'संस्थान के बारे में' : 'About NITH'}</span>
          <ChevronRight size={13} className="text-gray-400" />
          <span className="text-[#631012] font-bold">
            {isHindi ? 'रणनीतिक लक्ष्य और रोडमैप' : 'Goals & Roadmap'}
          </span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[#500c0e] via-[#631012] to-[#7a1a1d] text-white py-14 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Compass size={14} />
            <span>{isHindi ? 'संस्थागत दृष्टिकोण' : 'Strategic Vision'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {pageData.hero_heading}
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto text-sm sm:text-base font-light leading-relaxed">
            {pageData.hero_description}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 space-y-12">
        {/* Key Goals */}
        <div className="space-y-6">
          <div className="text-center space-y-1 pt-4">
            <h2 className="text-2xl font-bold text-[#631012] uppercase tracking-wide">
              {pageData.goals_heading}
            </h2>
            <p className="text-xs text-gray-500 max-w-xl mx-auto">
              {pageData.goals_subtitle}
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-gray-200">
              <Loader2 className="w-8 h-8 animate-spin text-[#631012] mb-2" />
              <p className="text-xs font-mono text-gray-500">Loading goals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((g) => {
                const IconComp = ICON_MAP[g.icon] || Target;
                return (
                  <div
                    key={g.id}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-[#631012]/40 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-xl bg-[#631012]/10 text-[#631012] flex items-center justify-center group-hover:bg-[#631012] group-hover:text-white transition-colors shrink-0">
                          <IconComp size={24} />
                        </div>
                        {g.stats_value && (
                          <span className="font-mono font-bold text-xs bg-[#631012]/10 text-[#631012] px-3 py-1 rounded-full border border-[#631012]/20">
                            {g.stats_value}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#631012] transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {g.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Multi-Year Roadmap */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#631012] uppercase tracking-wide">
              {pageData.strategy_heading}
            </h2>
            <p className="text-xs text-gray-500 max-w-2xl mx-auto">
              {pageData.strategy_description}
            </p>
          </div>

          <div className="space-y-6 pt-4">
            {roadmaps.map((r, index) => (
              <div
                key={r.id || index}
                className="bg-gray-50/70 rounded-xl p-5 border border-gray-200 hover:border-[#631012]/30 transition-all flex flex-col md:flex-row gap-4 md:items-center"
              >
                <div className="md:w-36 shrink-0 font-mono font-bold text-sm text-[#631012] bg-[#631012]/10 px-3 py-2 rounded-lg text-center border border-[#631012]/20">
                  {r.year}
                </div>
                <div className="flex-grow space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                    {r.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {r.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
