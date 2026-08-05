import React, { useState } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, ChevronDown, BookOpen, GraduationCap, Compass, Layers, CheckCircle } from 'lucide-react';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

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
