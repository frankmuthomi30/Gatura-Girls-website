import React, { useState } from 'react';
import { FAQItem } from '../types';
import {
  HelpCircle,
  ChevronDown,
  BookOpen,
  FlaskConical,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

interface Subject {
  code: string;
  name: string;
  category: string;
}

interface Pathway {
  id: string;
  name: string;
  description: string;
  icon: 'flask' | 'book-open';
  color: string;
  subjects: Subject[];
}

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
      { code: 'SS216', name: 'Business Studies', category: 'Business' }
    ]
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
      { code: 'ST109', name: 'Agriculture', category: 'Applied Science' }
    ]
  }
];

const ICONS = { flask: FlaskConical, 'book-open': BookOpen };

const groupByCategory = (subjects: Subject[]) => {
  const groups: Record<string, Subject[]> = {};
  subjects.forEach((s) => {
    groups[s.category] = groups[s.category] || [];
    groups[s.category].push(s);
  });
  return groups;
};

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePathway, setActivePathway] = useState<Pathway>(PATHWAYS[0]);

  const categories = ['All', 'General', 'Admissions', 'Academics', 'Boarding & Facilities'];

  const filteredFaqs =
    selectedCategory === 'All' ? faqs : (faqs || []).filter((f) => f.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const Icon = ICONS[activePathway.icon];
  const grouped = groupByCategory(activePathway.subjects);

  return (
    <section
      id="about"
      className="py-20 bg-[#FAF7F2] dark:bg-[#080D0B] text-[#161311] dark:text-[#F3F0E9] transition-colors relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Intro */}
        <div className="mb-16 space-y-16">

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>About St. Teresa Gatura Girls</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              A Beacon of Girls' Education in Kenya
            </h2>
            <p className="text-[#5B5346] dark:text-[#A8A196] text-base sm:text-lg font-light leading-relaxed">
              Founded on Christian foundation principles, St. Teresa Gatura Girls Senior School
              provides a transformative academic environment where young women excel in sciences,
              humanities, leadership, and moral discipline. As the 8-4-4 system is phased out
              nationally, our Senior School is fully anchored in the{' '}
              <strong className="text-[#161311] dark:text-white font-semibold">
                Competency-Based Curriculum (CBC)
              </strong>
              .
            </p>
          </div>

          {/* CBC Pathway Explorer */}
          <div className="rounded-2xl border border-[#D8D0C2] dark:border-[#1E2A24] bg-white dark:bg-[#0F1811] overflow-hidden">

            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 border-b border-[#D8D0C2] dark:border-[#1E2A24]">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-600 dark:bg-emerald-500" />
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-400">
                  Grade 10–12 · CBC Senior Secondary
                </p>
              </div>
              <span className="font-mono text-[11px] text-[#8A8478] dark:text-[#6B7280]">
                {activePathway.subjects.length} subjects on offer
              </span>
            </div>

            {/* Pathway tabs */}
            <div className="flex border-b border-[#D8D0C2] dark:border-[#1E2A24]">
              {PATHWAYS.map((pathway) => {
                const TabIcon = ICONS[pathway.icon];
                const isActive = activePathway.id === pathway.id;
                return (
                  <button
                    key={pathway.id}
                    onClick={() => setActivePathway(pathway)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 text-sm font-bold transition-all border-b-2 ${
                      isActive
                        ? 'border-current'
                        : 'border-transparent text-[#8A8478] dark:text-[#6B7280] hover:text-[#161311] dark:hover:text-white'
                    }`}
                    style={isActive ? { color: pathway.color, borderColor: pathway.color } : undefined}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{pathway.name} Pathway</span>
                  </button>
                );
              })}
            </div>

            {/* Active pathway detail */}
            <div className="p-6 sm:p-8 space-y-8">
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-xl shrink-0"
                  style={{ backgroundColor: `${activePathway.color}1A`, color: activePathway.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm sm:text-base text-[#5B5346] dark:text-[#A8A196] leading-relaxed max-w-2xl pt-1">
                  {activePathway.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                {Object.entries(grouped).map(([category, subjects]) => (
                  <div key={category} className="space-y-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A8478] dark:text-[#6B7280]">
                      {category}
                    </p>
                    <ul className="space-y-2">
                      {subjects.map((s) => (
                        <li key={s.code} className="flex items-center gap-2.5 text-sm">
                          <span
                            className="font-mono text-[10px] px-1.5 py-0.5 rounded shrink-0"
                            style={{ backgroundColor: `${activePathway.color}14`, color: activePathway.color }}
                          >
                            {s.code}
                          </span>
                          <span className="text-[#161311] dark:text-[#F3F0E9]">{s.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-8 border-t border-[#D8D0C2] dark:border-[#1E2A24]">

          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase">
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
                    ? 'bg-emerald-700 text-white shadow-sm shadow-emerald-700/20'
                    : 'bg-[#F0EBE0] dark:bg-[#131826] text-[#5B5346] dark:text-[#A8A196] hover:bg-[#E5DFD2] dark:hover:bg-[#1A2233]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-[#D8D0C2] dark:border-[#1E2A24] overflow-hidden bg-white dark:bg-[#0F1811] transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-base text-[#161311] dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 focus:outline-none"
                  >
                    <span className="pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-[#5B5346] dark:text-[#A8A196] leading-relaxed border-t border-[#D8D0C2]/60 dark:border-[#1E2A24]/60 bg-[#FAF7F2]/60 dark:bg-[#0A120E]/60">
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