import React, { useState } from 'react';
import { FAQItem } from '../types';
import {
  HelpCircle,
  ChevronDown,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Compass,
  Layers,
  CheckCircle,
  FlaskConical,
  Sprout,
  Calculator,
  Languages,
  HeartPulse,
  Users,
  Cpu,
} from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

// ---------------------------------------------------------------------------
// Pathways types & data (mirrors the pathways.json shape)
// ---------------------------------------------------------------------------

interface Subject {
  code: string;
  name: string;
  category: string;
}

interface Pathway {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  subjects: Subject[];
}

interface CoreSubject {
  name: string;
  icon: React.ElementType;
}

const CORE_SUBJECTS: CoreSubject[] = [
  { name: 'Mathematics', icon: Calculator },
  { name: 'English', icon: Languages },
  { name: 'Kiswahili / KSL', icon: Languages },
  { name: 'Physical & Health Education', icon: HeartPulse },
  { name: 'Community Service Learning', icon: Users },
  { name: 'ICT', icon: Cpu },
];

const PATHWAY_ICON_MAP: Record<string, React.ElementType> = {
  flask: FlaskConical,
  'book-open': BookOpen,
};

const PATHWAYS: Pathway[] = [
  {
    id: 'stem',
    name: 'STEM',
    description:
      'Science, Technology, Engineering and Mathematics pathway for learners interested in scientific and technical careers.',
    icon: 'flask',
    color: '#16a34a',
    subjects: [
      { code: 'ST103', name: 'Biology', category: 'Science' },
      { code: 'ST105', name: 'Chemistry', category: 'Science' },
      { code: 'ST104', name: 'Physics', category: 'Science' },
      { code: 'ST109', name: 'Agriculture', category: 'Applied Science' },
      { code: 'ST107', name: 'Computer Studies', category: 'Technology' },
      { code: 'ST108', name: 'Home Science', category: 'Applied Science' },
      { code: 'SS216', name: 'Business Studies', category: 'Business' },
    ],
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences',
    description:
      'A pathway for learners pursuing humanities, business, languages and social sciences.',
    icon: 'book-open',
    color: '#2563eb',
    subjects: [
      { code: 'SS202', name: 'Literature in English', category: 'Languages' },
      { code: 'SS217', name: 'History & Citizenship', category: 'Humanities' },
      { code: 'SS218', name: 'Geography', category: 'Humanities' },
      { code: 'SS212', name: 'Christian Religious Education (CRE)', category: 'Religious Education' },
      { code: 'SS204', name: 'Fasihi ya Kiswahili', category: 'Languages' },
      { code: 'SS208', name: 'French', category: 'Languages' },
      { code: 'SS216', name: 'Business Studies', category: 'Business' },
      { code: 'ST107', name: 'Computer Studies', category: 'Technology' },
      { code: 'ST108', name: 'Home Science', category: 'Applied Science' },
      { code: 'ST109', name: 'Agriculture', category: 'Applied Science' },
    ],
  },
];

// Group a pathway's subjects by their category, preserving first-seen order
function groupByCategory(subjects: Subject[]) {
  const order: string[] = [];
  const groups: Record<string, Subject[]> = {};
  subjects.forEach((s) => {
    if (!groups[s.category]) {
      groups[s.category] = [];
      order.push(s.category);
    }
    groups[s.category].push(s);
  });
  return order.map((category) => ({ category, subjects: groups[category] }));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePathwayId, setActivePathwayId] = useState<string>(PATHWAYS[0]?.id ?? '');

  const categories = ['All', 'General', 'Admissions', 'Academics', 'Boarding & Facilities'];

  const filteredFaqs = selectedCategory === 'All' 
    ? faqs 
    : (faqs || []).filter(f => f.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="about" className="py-20 bg-emerald-50/40 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* About School Overview Grid */}
        <div className="mb-20 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>About St. Teresa Gatura Girls</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              A Beacon of Girls' Education in Kenya
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Founded on Christian foundation principles, St. Teresa Gatura Girls Senior School provides a transformative academic environment where young women excel in sciences, humanities, leadership, and moral discipline.
            </p>
          </div>

          {/* 8-4-4 vs CBC Pathways Glassmorphism Card comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 8-4-4 Card */}
            <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">8-4-4 Curriculum System</h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">KCSE Form 1 — Form 4</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                Comprehensive secondary education designed for rigor in Kenya National Examinations Council (KNEC) standards.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Mathematics, Physics, Chemistry & Biology Focus</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Humanities: History, Geography, CRE, Business Studies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Languages: English, Kiswahili, French & German Options</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Targeted KCSE Revision & Mentorship Workshops</span>
                </li>
              </ul>
            </div>

            {/* CBC Senior Secondary Card */}
            <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-emerald-500/40 shadow-md space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                Grade 10–12 CBC Ready
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-emerald-500/30">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">CBC Senior Secondary Pathways</h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">Competency-Based Learning</p>
                </div>
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-light">
                Tailored educational pathways equipping learners with practical competencies, digital skills, and career orientation.
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span><strong>STEM Pathway:</strong> Pure Sciences, Computer Science & Engineering Studies</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span><strong>Social Sciences Pathway:</strong> Literature, Languages, Business & History</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span><strong>Arts & Sports Science Pathway:</strong> Performing Arts, Fine Art & Athletics</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Practical Community Service Learning (CSL) Projects</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Pathways Section — foundation core + branching STEM / Social Sciences */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>CBC Senior Secondary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              One Foundation, Two Pathways
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Every learner at St. Teresa Gatura builds from the same core, then
              branches into the pathway that fits her strengths and ambitions.
            </p>
          </div>

          {/* Foundation band — the shared trunk every pathway grows from */}
          <div className="relative mb-4">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/30 shadow-xl p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5 justify-center">
                <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                  The Core — Every Learner, Every Pathway
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {CORE_SUBJECTS.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <div
                      key={subject.name}
                      className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-emerald-50 dark:bg-slate-800/60 border border-emerald-100 dark:border-slate-700"
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                        {subject.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Branch connectors down to the two pathway cards (desktop only) */}
            <svg
              className="hidden lg:block absolute left-0 right-0 -bottom-10 w-full h-10 text-emerald-500/40"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 50 0 L 50 8 M 50 8 L 25 8 L 25 20 M 50 8 L 75 8 L 75 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.6"
              />
            </svg>
          </div>

          {/* Pathway cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-14 lg:mt-4">
            {PATHWAYS.map((pathway) => {
              const Icon = PATHWAY_ICON_MAP[pathway.icon] ?? BookOpen;
              const isActive = activePathwayId === pathway.id;
              const groups = groupByCategory(pathway.subjects);

              return (
                <div
                  key={pathway.id}
                  className="rounded-3xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all hover:border-emerald-500/40"
                  style={{ borderTopColor: pathway.color, borderTopWidth: 4 }}
                >
                  <button
                    onClick={() => setActivePathwayId(isActive ? '' : pathway.id)}
                    className="w-full p-8 text-left flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="p-3 rounded-2xl shrink-0"
                        style={{ backgroundColor: `${pathway.color}1a`, color: pathway.color }}
                      >
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                          {pathway.name} Pathway
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                          {pathway.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 shrink-0 mt-2 text-slate-400 transition-transform duration-300 ${
                        isActive ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {isActive && (
                    <div className="px-8 pb-8 space-y-5 border-t border-slate-200 dark:border-slate-800 pt-6">
                      {groups.map(({ category, subjects }) => (
                        <div key={category}>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                            {category}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {subjects.map((subject) => (
                              <span
                                key={subject.code}
                                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                              >
                                {subject.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-800">
          
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Frequently Asked Questions</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">Admissions & General Enquiries</h3>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-700 dark:text-emerald-400 focus:outline-none"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};