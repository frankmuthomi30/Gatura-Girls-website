/**
 * St. Teresa Gatura Girls Senior School Website
 * License: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BannerSlider } from './components/BannerSlider';
import { QuickStats } from './components/QuickStats';
import { Leadership } from './components/Leadership';
import { FAQAccordion } from './components/FAQAccordion';
import { WeatherLocation } from './components/WeatherLocation';
import { GalleryGrid } from './components/GalleryGrid';
import { NewsJobsSection } from './components/NewsJobsSection';
import { ContactForm } from './components/ContactForm';
import { AdmissionsPreview } from './components/AdmissionsPreview';
import { SchoolVideos } from './components/SchoolVideos';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';
import { INITIAL_FAQS, INITIAL_LINKS } from './data/initialData';
import { FAQItem, UsefulLink } from './types';
import { useAppData } from './hooks/useAppData';

export default function App() {
  const {
    news,
    jobs,
    banners,
    gallery,
    leadership,
    heroSlides,
    featuredVideos,
    messages,
    offlineWarning,
    refreshData,
    updateCollection,
  } = useAppData();

  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [links, setLinks] = useState<UsefulLink[]>(INITIAL_LINKS);

  // Global State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  
  const [activeSection, setActiveSection] = useState('hero');
  const [adminOpen, setAdminOpen] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);

  // Handle Dark Mode HTML class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleExplorePrograms = () => {
    const elem = document.getElementById('about');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {offlineWarning && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 px-4 py-2 text-center text-sm font-semibold shadow-md">
          Latest content is temporarily unavailable. Displaying previously cached information.
        </div>
      )}

      {/* Top Floating Glassmorphic Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenAdmissions={() => setAdmissionsOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          slides={heroSlides}
          onExplorePrograms={handleExplorePrograms}
          onOpenAdmissions={() => setAdmissionsOpen(true)}
        />

        {/* 2. Rotating Announcement Banners */}
        <BannerSlider
          banners={banners}
          onOpenAdmissions={() => setAdmissionsOpen(true)}
        />

        {/* 3. Quick Stats & Highlights Strip */}
        <QuickStats />

        {/* 4. Single Compact School Videos Showcase */}
        <SchoolVideos videos={featuredVideos} />

        {/* 5. Leadership Section */}
        <Leadership profiles={leadership} />

        {/* 6. About & Academic Systems (8-4-4 + CBC) & FAQ Accordion */}
        <FAQAccordion faqs={faqs} />

        {/* 7. Location, Live Google Map, Altitude & Weather Widget */}
        <WeatherLocation />

        {/* 8. Campus Photo Gallery */}
        <GalleryGrid gallery={gallery} />

        {/* 9. News & Career Vacancies Noticeboard */}
        <NewsJobsSection
          news={news}
          jobs={jobs}
          links={links}
          onOpenAdmissions={() => setAdmissionsOpen(true)}
        />

        {/* 10. Contact Us & Instant Form */}
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenAdmissions={() => setAdmissionsOpen(true)}
      />

      {/* Admissions Portal Modal */}
      <AdmissionsPreview
        isOpen={admissionsOpen}
        onClose={() => setAdmissionsOpen(false)}
      />

      {/* Admin Panel Modal */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        news={news}
        jobs={jobs}
        banners={banners}
        gallery={gallery}
        leadership={leadership}
        heroSlides={heroSlides}
        featuredVideos={featuredVideos}
        messages={messages}
        links={links}
        onRefreshData={refreshData}
        setNews={(data) => updateCollection('news', data)}
        setJobs={(data) => updateCollection('jobs', data)}
        setBanners={(data) => updateCollection('banners', data)}
        setGallery={(data) => updateCollection('gallery', data)}
        setLeadership={(data) => updateCollection('leadership', data)}
        setHeroSlides={(data) => updateCollection('heroSlides', data)}
        setFeaturedVideos={(data) => updateCollection('featuredVideos', data)}
        setMessages={(data) => updateCollection('messages', data)}
      />
    </div>
  );
}
