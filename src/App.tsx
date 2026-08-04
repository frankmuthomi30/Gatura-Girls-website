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

import { 
  INITIAL_NEWS, 
  INITIAL_BANNERS, 
  INITIAL_JOBS, 
  INITIAL_GALLERY, 
  INITIAL_LEADERSHIP, 
  INITIAL_FAQS, 
  INITIAL_LINKS,
  INITIAL_HERO_SLIDES,
  INITIAL_FEATURED_VIDEOS
} from './data/initialData';

import { 
  db, 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  setDoc
} from './firebase';

import { NewsItem, JobPosting, BannerAd, GalleryItem, LeadershipProfile, FAQItem, ContactMessage, UsefulLink, HeroSlide, FeaturedVideo } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return false; // Start with light mode
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [admissionsOpen, setAdmissionsOpen] = useState<boolean>(false);

  // Helper to safely load state from localStorage or initial fallback
  const loadInitialState = <T,>(key: string, seededKey: string, initialData: T[]): T[] => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) return JSON.parse(saved);
      if (localStorage.getItem(seededKey) === 'true') return [];
    } catch (e) {}
    return initialData;
  };

  // Firestore & Fallback Data State
  const [news, setNews] = useState<NewsItem[]>(() => loadInitialState('st_teresa_news', 'st_teresa_seeded_news', INITIAL_NEWS));
  const [jobs, setJobs] = useState<JobPosting[]>(() => loadInitialState('st_teresa_jobs', 'st_teresa_seeded_jobs', INITIAL_JOBS));
  const [banners, setBanners] = useState<BannerAd[]>(() => loadInitialState('st_teresa_banners', 'st_teresa_seeded_banners', INITIAL_BANNERS));
  const [gallery, setGallery] = useState<GalleryItem[]>(() => loadInitialState('st_teresa_gallery', 'st_teresa_seeded_gallery', INITIAL_GALLERY));
  const [leadership, setLeadership] = useState<LeadershipProfile[]>(() => loadInitialState('st_teresa_leadership', 'st_teresa_seeded_leadership', INITIAL_LEADERSHIP));
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => loadInitialState('st_teresa_hero', 'st_teresa_seeded_heroSlides', INITIAL_HERO_SLIDES));
  const [featuredVideos, setFeaturedVideos] = useState<FeaturedVideo[]>(() => loadInitialState('st_teresa_videos', 'st_teresa_seeded_featured_videos', INITIAL_FEATURED_VIDEOS));

  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('st_teresa_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });
  const [links, setLinks] = useState<UsefulLink[]>(INITIAL_LINKS);

  // Sync state to LocalStorage
  useEffect(() => { try { localStorage.setItem('st_teresa_news', JSON.stringify(news)); } catch (e) {} }, [news]);
  useEffect(() => { try { localStorage.setItem('st_teresa_jobs', JSON.stringify(jobs)); } catch (e) {} }, [jobs]);
  useEffect(() => { try { localStorage.setItem('st_teresa_banners', JSON.stringify(banners)); } catch (e) {} }, [banners]);
  useEffect(() => { try { localStorage.setItem('st_teresa_gallery', JSON.stringify(gallery)); } catch (e) {} }, [gallery]);
  useEffect(() => { try { localStorage.setItem('st_teresa_leadership', JSON.stringify(leadership)); } catch (e) {} }, [leadership]);
  useEffect(() => { try { localStorage.setItem('st_teresa_hero', JSON.stringify(heroSlides)); } catch (e) {} }, [heroSlides]);
  useEffect(() => { try { localStorage.setItem('st_teresa_videos', JSON.stringify(featuredVideos)); } catch (e) {} }, [featuredVideos]);
  useEffect(() => { try { localStorage.setItem('st_teresa_messages', JSON.stringify(messages)); } catch (e) {} }, [messages]);

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

  // Helper to seed initial documents into Firestore ONCE if collection is brand new
  const seedIfEmpty = async (colName: string, initialItems: any[], setState: (items: any[]) => void) => {
    const key = `st_teresa_seeded_${colName}`;
    if (localStorage.getItem(key) === 'true') {
      setState([]);
      return;
    }
    try {
      localStorage.setItem(key, 'true');
      setState(initialItems);
      for (const item of initialItems) {
        await setDoc(doc(db, colName, String(item.id)), {
          ...item,
          createdAt: new Date().toISOString()
        });
      }
    } catch (e) {
      console.log(`Failed to seed ${colName}:`, e);
    }
  };

  // Realtime subscription to Firestore collections
  const fetchData = () => {
    try {
      // News
      const newsUnsub = onSnapshot(collection(db, 'news'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_news', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as NewsItem[];
          setNews(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_news') !== 'true') {
            seedIfEmpty('news', INITIAL_NEWS, setNews);
          } else {
            setNews([]);
          }
        }
      }, err => console.log('Firestore News fallback active'));

      // Jobs
      const jobsUnsub = onSnapshot(collection(db, 'jobs'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_jobs', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as JobPosting[];
          setJobs(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_jobs') !== 'true') {
            seedIfEmpty('jobs', INITIAL_JOBS, setJobs);
          } else {
            setJobs([]);
          }
        }
      }, err => console.log('Firestore Jobs fallback active'));

      // Banners
      const bannersUnsub = onSnapshot(collection(db, 'banners'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_banners', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BannerAd[];
          setBanners(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_banners') !== 'true') {
            seedIfEmpty('banners', INITIAL_BANNERS, setBanners);
          } else {
            setBanners([]);
          }
        }
      }, err => console.log('Firestore Banners fallback active'));

      // Gallery
      const galleryUnsub = onSnapshot(collection(db, 'gallery'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_gallery', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryItem[];
          setGallery(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_gallery') !== 'true') {
            seedIfEmpty('gallery', INITIAL_GALLERY, setGallery);
          } else {
            setGallery([]);
          }
        }
      }, err => console.log('Firestore Gallery fallback active'));

      // Leadership
      const leaderUnsub = onSnapshot(collection(db, 'leadership'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_leadership', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LeadershipProfile[];
          setLeadership(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_leadership') !== 'true') {
            seedIfEmpty('leadership', INITIAL_LEADERSHIP, setLeadership);
          } else {
            setLeadership([]);
          }
        }
      }, err => console.log('Firestore Leadership fallback active'));

      // Hero Slides
      const heroUnsub = onSnapshot(collection(db, 'heroSlides'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_heroSlides', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as HeroSlide[];
          setHeroSlides(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_heroSlides') !== 'true') {
            seedIfEmpty('heroSlides', INITIAL_HERO_SLIDES, setHeroSlides);
          } else {
            setHeroSlides([]);
          }
        }
      }, err => console.log('Firestore Hero Slides fallback active'));

      // Featured Videos
      const videosUnsub = onSnapshot(collection(db, 'featured_videos'), (snapshot) => {
        if (!snapshot.empty) {
          localStorage.setItem('st_teresa_seeded_featured_videos', 'true');
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as FeaturedVideo[];
          setFeaturedVideos(loaded);
        } else {
          if (localStorage.getItem('st_teresa_seeded_featured_videos') !== 'true') {
            seedIfEmpty('featured_videos', INITIAL_FEATURED_VIDEOS, setFeaturedVideos);
          } else {
            setFeaturedVideos([]);
          }
        }
      }, err => console.log('Firestore Featured Videos fallback active'));

      // Messages
      const msgUnsub = onSnapshot(collection(db, 'messages'), (snapshot) => {
        if (!snapshot.empty) {
          const loaded = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ContactMessage[];
          setMessages(loaded);
        } else {
          setMessages([]);
        }
      }, err => console.log('Firestore Messages fallback active'));

      return () => {
        newsUnsub();
        jobsUnsub();
        bannersUnsub();
        galleryUnsub();
        leaderUnsub();
        heroUnsub();
        videosUnsub();
        msgUnsub();
      };
    } catch (err) {
      console.log('Using initial client data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExplorePrograms = () => {
    const elem = document.getElementById('about');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors font-sans selection:bg-emerald-500 selection:text-slate-950">
      
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
        onRefreshData={fetchData}
        setNews={setNews}
        setJobs={setJobs}
        setBanners={setBanners}
        setGallery={setGallery}
        setLeadership={setLeadership}
        setHeroSlides={setHeroSlides}
        setFeaturedVideos={setFeaturedVideos}
        setMessages={setMessages}
      />

    </div>
  );
}
