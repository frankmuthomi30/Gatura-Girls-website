import { NewsItem, JobPosting, BannerAd, GalleryItem, LeadershipProfile, FAQItem, UsefulLink, HeroSlide, FeaturedVideo } from '../types';

export const INITIAL_NEWS: NewsItem[] = [];

export const INITIAL_BANNERS: BannerAd[] = [];

export const INITIAL_JOBS: JobPosting[] = [];

export const INITIAL_GALLERY: GalleryItem[] = [];

export const INITIAL_LEADERSHIP: LeadershipProfile[] = [];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'f1',
    question: 'Where is St. Teresa Gatura Girls Senior School located?',
    answer: 'The school is located in Gatura Market, Gatanga Sub-County, Murang\'a County, Kenya — situated along the scenic foothills of the Aberdare Ranges at an elevation of approximately 1,880 meters above sea level. It is easily accessible via the Thika-Gatanga-Gatura tarmac road.',
    category: 'General',
    order: 1
  },
  {
    id: 'f2',
    question: 'What academic curricula and pathways are offered?',
    answer: 'St. Teresa Gatura Girls offers both the 8-4-4 System (preparing Form 1–4 students for KCSE) and the Competency-Based Curriculum (CBC) Senior Secondary Pathways (Grade 10–12) offering STEM (Science, Tech, Engineering, Math), Social Sciences (Humanities & Languages), and Arts & Sports Science pathways.',
    category: 'Academics',
    order: 2
  },
  {
    id: 'f3',
    question: 'How do I apply for Form 1 or Grade 10 CBC Admission?',
    answer: 'Admissions can be submitted online through our Online Admissions Portal on this website or directly at the school principal\'s office during working hours. Requirements include KCPE / Grade 9 KPSEA results slips, birth certificate copy, leaving certificate, and medical report.',
    category: 'Admissions',
    order: 3
  },
  {
    id: 'f4',
    question: 'What boarding facilities and amenities are provided?',
    answer: 'We provide self-contained boarding hostels with hot water solar showers, modern dining hall serving nutritious balanced meals, 24/7 security with CCTV & security personnel, sickbay staffed by a qualified nurse, and an expansive sports complex.',
    category: 'Boarding & Facilities',
    order: 4
  },
  {
    id: 'f5',
    question: 'What co-curricular activities and clubs exist at the school?',
    answer: 'Students actively participate in Journalism & Media, Science & Robotics, Drama & Music, Red Cross, St. John Ambulance, Presidents Award Scheme, Environmental Club, Christian Union, Catholic Action, Volleyball, Basketball, Football, Lawn Tennis, and Badminton.',
    category: 'General',
    order: 5
  }
];

export const INITIAL_LINKS: UsefulLink[] = [
  {
    id: 'l1',
    title: '2026 Term 1 School Fees Structure & Bank Details (PDF)',
    url: '#',
    category: 'Downloads',
    order: 1
  },
  {
    id: 'l2',
    title: 'Grade 10 Senior Secondary Pathway Selection Guide (KICD)',
    url: '#',
    category: 'KICD/CBC',
    order: 2
  },
  {
    id: 'l3',
    title: 'Parent-Teacher Association (PTA) Term Circular & Calendar',
    url: '#',
    category: 'Circulars',
    order: 3
  },
  {
    id: 'l4',
    title: 'Student E-Learning & Revision Portal Access',
    url: '#',
    category: 'Portals',
    order: 4
  }
];

export const INITIAL_HERO_SLIDES: HeroSlide[] = [];

export const INITIAL_FEATURED_VIDEOS: FeaturedVideo[] = [];

