import React, { useState } from 'react';
import { FAQItem } from '../types';
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  GraduationCap,
  Compass,
  Layers,
  CheckCircle,
  FlaskConical,
  Calculator,
  Languages,
  HeartPulse,
  Users,
  Cpu,
  Plane,
  Ticket,
} from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

// ---------------------------------------------------------------------------
// Pathways data (mirrors the pathways.json shape)
// ---------------------------------------------------------------------------

interface Subject {
  code: string;
  name: string;
  category: string;
}

interface Pathway {
  id: string;
  name: string;
  destination: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gate: string;
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

const PATHWAYS: Pathway[] = [
  {
    id: 'stem',
    name: 'STEM',
    destination: 'Sciences, Engineering & Technology',
    description:
      'For learners who think in numbers and experiments — built toward medicine, engineering and computing careers.',
    icon: FlaskConical,
    color: '#16a34a',
    gate: 'PWY-STEM',
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
    destination: 'Humanities, Business & Languages',
    description:
      'For learners who think in words and people — built toward law, journalism, business and public service.',
    icon: BookOpen,
    color: '#2563eb',
    gate: 'PWY-SOSC',
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

        {/* ------------------------------------------------------------- */}
        {/* Pathways — reframed as a journey: check in at the Terminal   */}
        {/* (core subjects), then board one of two flights (pathways).   */}
        {/* ------------------------------------------------------------- */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>CBC Senior Secondary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Every Learner Checks In the Same Way.
              <br className="hidden sm:block" /> She Boards Differently.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Six core subjects are the terminal every learner passes through.
              From there, she boards one of two pathways toward her destination.
            </p>
          </div>

          {/* TERMINAL — departure board for core subjects */}
          <div className="rounded-2xl bg-slate-900 border-t-4 border-amber-400 shadow-2xl shadow-slate-900/20 overflow-hidden mb-6">
            <div className="flex items-center justify-between px-5 sm:px-6 py-3 border-b border-slate-700/60">
              <div className="flex items-center gap-2 text-amber-400">
                <Plane className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">Terminal · Foundation Subjects</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">Required · All Learners</span>
              </div>
            </div>

            <div className="divide-y divide-slate-800">
              {CORE_SUBJECTS.map((subject, i) => {
                const Icon = subject.icon;
                return (
                  <div
                    key={subject.name}
                    className="flex items-center gap-4 px-5 sm:px-6 py-3 font-mono text-amber-300/90"
                  >
                    <span className="text-xs text-slate-500 w-6 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-sm sm:text-base tracking-wide uppercase flex-1">{subject.name}</span>
                    <span className="hidden sm:inline text-[10px] text-slate-500 tracking-widest">CHECKED IN</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOARDING PASSES — one ticket per pathway */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PATHWAYS.map((pathway) => {
              const Icon = pathway.icon;
              const groups = groupByCategory(pathway.subjects);

              return (
                <div
                  key={pathway.id}
                  className="relative flex flex-col sm:flex-row rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Ink stamp */}
                  <div
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 flex items-center gap-1 px-2.5 py-1 rounded-md border-2 -rotate-6 opacity-80 pointer-events-none"
                    style={{ borderColor: pathway.color, color: pathway.color }}
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[9px] font-extrabold uppercase tracking-widest">CBC Approved</span>
                  </div>

                  {/* Stub */}
                  <div
                    className="sm:w-36 shrink-0 flex sm:flex-col items-center justify-between sm:justify-center gap-3 p-5 border-b sm:border-b-0 sm:border-r border-dashed border-slate-300 dark:border-slate-700 relative"
                    style={{ backgroundColor: `${pathway.color}0d` }}
                  >
                    <div
                      className="p-3 rounded-2xl"
                      style={{ backgroundColor: `${pathway.color}1a`, color: pathway.color }}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="sm:text-center">
                      <p className="text-[10px] font-mono text-slate-400 tracking-widest">{pathway.gate}</p>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">{pathway.name}</p>
                    </div>

                    {/* Punch-hole notches on the perforation (desktop only) */}
                    <span className="hidden sm:block absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-emerald-50 dark:bg-slate-950" />
                    <span className="hidden sm:block absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-emerald-50 dark:bg-slate-950" />
                  </div>

                  {/* Manifest */}
                  <div className="flex-1 p-6 pt-8 sm:pt-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      <Ticket className="w-4 h-4" style={{ color: pathway.color }} />
                      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: pathway.color }}>
                        Destination: {pathway.destination}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-5">
                      {pathway.description}
                    </p>

                    <div className="space-y-4 flex-1">
                      {groups.map(({ category, subjects }) => (
                        <div key={category}>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
                            Class · {category}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                            {subjects.map((subject) => (
                              <span key={subject.code} className="text-xs text-slate-700 dark:text-slate-200 whitespace-nowrap">
                                <span className="font-mono text-slate-400 dark:text-slate-500 mr-1">{subject.code}</span>
                                {subject.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Barcode footer */}
                    <div className="mt-6 pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                      <div
                        className="h-6 flex-1 max-w-[160px] opacity-70"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 5px)',
                          color: pathway.color,
                        }}
                      />
                      <span className="text-[10px] font-mono text-slate-400 tracking-widest">
                        {pathway.gate}-{pathway.subjects.length}SUBJ
                      </span>
                    </div>
                  </div>
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