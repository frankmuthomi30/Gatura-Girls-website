import { NewsItem, JobPosting, BannerAd, GalleryItem, LeadershipProfile, FAQItem, UsefulLink, HeroSlide, FeaturedVideo } from '../types';

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'St. Teresa Gatura Girls Celebrates Outstanding 8-4-4 KCSE & CBC Assessment Milestones',
    date: 'February 12, 2026',
    excerpt: 'Our graduating cohort achieved remarkable top-tier mean scores with over 88% qualifying for direct university entry in Kenya and international scholarships.',
    content: 'St. Teresa Gatura Girls Senior School has once again distinguished itself as a center of academic excellence in Gatanga Sub-County, Murang\'a County. During the recently released KCSE examination results and Grade 9 CBC Senior Secondary transition assessments, our students demonstrated exemplary performance in STEM, Humanities, and Creative Arts. The Board of Management and Principal extend warm congratulations to all teachers, parents, and students for their tireless dedication.',
    category: 'Academics',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'n2',
    title: 'Grade 10 Senior Secondary School (CBC) Pathways Orientation Launched',
    date: 'January 28, 2026',
    excerpt: 'Comprehensive briefing for parents and students on Senior School Pathway selection: STEM, Social Sciences, and Arts & Sports Science.',
    content: 'In line with the Ministry of Education guidelines and the Competency-Based Curriculum (CBC) framework, St. Teresa Gatura Girls has fully equipped specialized laboratories, computer hubs, and studio spaces to support Senior School learning pathways. Parents of incoming Grade 10 students are invited for personalized pathway advisory sessions starting next week.',
    category: 'CBC Updates',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'n3',
    title: 'Regional Science & Innovation Fair Champions 2026',
    date: 'January 15, 2026',
    excerpt: 'Gatura Innovation Club bagged 1st Place in Environmental Engineering and Renewable Energy at the Mt. Kenya East Science Congress.',
    content: 'Our brilliant young scientists developed a low-cost solar water purification system designed for rural agricultural communities along the Aberdare basin. The team will represent the region at the National Kenya Science and Engineering Fair in Nairobi.',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'n4',
    title: 'Annual Inter-House Sports Gala & Athletics Championship',
    date: 'December 10, 2025',
    excerpt: 'St. Teresa Gatura students showcase endurance, discipline, and sportsmanship across track, volleyball, basketball, and football events.',
    content: 'The school sports ground was alive with color and enthusiasm as St. Catherine House emerged overall champions in the 2025 Annual Sports Festival. We celebrate all our student athletes who continue to represent our school in regional tournaments.',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266200a?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_BANNERS: BannerAd[] = [
  {
    id: 'b1',
    title: '2027 Senior Secondary Intake Now Open!',
    subtitle: 'Offering both 8-4-4 and CBC Pathways with World-Class STEM & Humanities Labs in Murang\'a County.',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Apply For Admission',
    ctaLink: '#admissions',
    active: true,
    order: 1
  },
  {
    id: 'b2',
    title: 'Empowering Young Women for Global Leadership',
    subtitle: 'Nurturing Christian values, academic rigor, discipline, and holistic talent development since inception.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'Explore Campus Life',
    ctaLink: '#gallery',
    active: true,
    order: 2
  },
  {
    id: 'b3',
    title: 'Pioneering CBC Senior School Pathways',
    subtitle: 'Fully equipped for STEM, Social Sciences, and Creative Arts with modern ICT laboratories & sports facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80',
    ctaText: 'View Academic Programs',
    ctaLink: '#about',
    active: true,
    order: 3
  }
];

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: 'j1',
    title: 'Senior Secondary School Teacher — Physics & Chemistry (TSC Registered)',
    department: 'Sciences Department',
    employmentType: 'Full-time',
    deadline: 'March 15, 2026',
    description: 'St. Teresa Gatura Girls Senior School invites applications from energetic, qualified, and TSC-registered teachers for Physics and Chemistry in both 8-4-4 and CBC Grade 10-12 curricula.',
    requirements: [
      'Bachelor of Education (Science) or B.Sc with PGDE',
      'Valid Teachers Service Commission (TSC) Registration Number',
      'Minimum 3 years teaching experience in a reputable secondary school',
      'Demonstrated competence in CBC Senior School facilitation and ICT integration',
      'Strong commitment to holistic student development and discipline'
    ]
  },
  {
    id: 'j2',
    title: 'CBC Computer Studies / ICT & Coding Facilitator',
    department: 'ICT & Applied Sciences',
    employmentType: 'Full-time',
    deadline: 'March 20, 2026',
    description: 'We seek an innovative ICT Teacher to handle Senior Secondary Computer Studies, Robotics, and digital literacy programs.',
    requirements: [
      'Degree or Higher Diploma in Computer Science, IT, or Education (Computer Science)',
      'TSC registration preferred',
      'Experience managing school computer labs, network infrastructure, and e-learning platforms',
      'Proven track record in student robotics or coding clubs'
    ]
  },
  {
    id: 'j3',
    title: 'School Cateress & Nutrition Supervisor',
    department: 'Boarding & Support Services',
    employmentType: 'Contract',
    deadline: 'March 10, 2026',
    description: 'Responsible for overseeing balanced meal planning, kitchen hygiene, food inventory management, and dietary compliance for 1,200+ boarding students.',
    requirements: [
      'Diploma/Degree in Catering, Food Production, or Institutional Management',
      'Valid Food Handlers Certificate',
      'Minimum 4 years experience in a large educational institution',
      'Excellent leadership and inventory tracking skills'
    ]
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Modern Science Laboratory Session',
    category: 'Academics',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    caption: 'Students conducting chemistry titration experiments in our ultra-modern laboratory.'
  },
  {
    id: 'g2',
    title: 'Annual Cultural & Music Festival',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    caption: 'The school choir performing traditional folk songs at the regional drama and music competitions.'
  },
  {
    id: 'g3',
    title: 'State-of-the-Art Computer & Coding Hub',
    category: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Grade 10 students learning web development, Python, and digital media design.'
  },
  {
    id: 'g4',
    title: 'Basketball Court & Sports Complex',
    category: 'Sports',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    caption: 'The St. Teresa Falcons basketball team preparing for the County Games.'
  },
  {
    id: 'g5',
    title: 'Spacious & Serene Boarding Hostels',
    category: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80',
    caption: 'Clean, well-ventilated, secure boarding accommodations with solar-heated showers.'
  },
  {
    id: 'g6',
    title: 'Morning Assembly & Spiritual Reflection',
    category: 'Student Life',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    caption: 'Students gathered at the quadrangle for morning devotions and national anthem.'
  }
];

export const INITIAL_LEADERSHIP: LeadershipProfile[] = [
  {
    id: 'l1',
    name: 'Sr. Beatrice Mwangi, HHCJ',
    role: 'Principal / Chief Administrative Officer',
    title: 'M.Ed. Educational Leadership, B.Ed. (Hons)',
    bio: 'Sr. Beatrice has spearheaded St. Teresa Gatura Girls for over 8 years, elevating academic standards, staff professional growth, and holistic values. Under her stewardship, the school expanded its modern STEM complex and established top-ranking CBC Senior Secondary learning facilities.',
    quote: 'Our goal is not merely to prepare young women for examinations, but to equip them with moral fortitude, critical thought, and visionary leadership to transform society.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    order: 1
  },
  {
    id: 'l2',
    name: 'Mr. Joseph K. Njuguna',
    role: 'Deputy Principal (Academics)',
    title: 'M.Sc. Mathematics Education, B.Ed. (Sciences)',
    bio: 'Mr. Njuguna coordinates academic strategy, curriculum alignment across 8-4-4 and CBC Senior Secondary pathways, teacher mentorship, and exam performance analysis.',
    quote: 'Academic success is built on consistent daily discipline, interactive inquiry, and a belief that every girl can master complex concepts.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    order: 2
  },
  {
    id: 'l3',
    name: 'Mrs. Mary W. Karanja',
    role: 'Deputy Principal (Administration & Boarding)',
    title: 'B.Ed. Guidance & Counseling',
    bio: 'Mrs. Karanja oversees student welfare, boarding management, discipline, co-curricular programs, and parent-school relations.',
    quote: 'A supportive, safe, and nurturing environment allows every student to discover her authentic talents and thrive spiritually, physically, and socially.',
    imageUrl: 'https://images.unsplash.com/photo-1580894732413-802c63ef2619?auto=format&fit=crop&w=800&q=80',
    order: 3
  },
  {
    id: 'l4',
    name: 'Mr. David M. Kamau',
    role: 'Dean of Academics & CBC Coordinator',
    title: 'B.Ed. Arts, Diploma in Curriculum Design',
    bio: 'Mr. Kamau guides CBC pathway implementation, continuous assessment reporting, career guidance, and university preparation.',
    quote: 'Senior Secondary education is where passion meets profession. We mentor students to align their pathway choices with future global careers.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    order: 4
  }
];

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

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'hs1',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    title: 'Academic Excellence & Character',
    subtitle: 'Nurturing visionary young women through Christian values & rigorous academics.',
    tag: 'KCSE & CBC Top School',
    order: 1
  },
  {
    id: 'hs2',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    title: 'State-of-the-Art STEM & ICT Labs',
    subtitle: 'Ultra-modern laboratories for Senior Secondary CBC STEM, Robotics, and Sciences.',
    tag: 'Grade 10 CBC Ready',
    order: 2
  },
  {
    id: 'hs3',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266200a?auto=format&fit=crop&w=1200&q=80',
    title: 'Holistic Sports & Cultural Clubs',
    subtitle: 'Fostering athletics, drama, music, robotics, and leadership clubs in Aberdare foothills.',
    tag: 'Champion Athletics',
    order: 3
  }
];

export const INITIAL_FEATURED_VIDEOS: FeaturedVideo[] = [
  {
    id: 'fv1',
    title: 'St. Teresa Gatura Girls Official Anthem & Choir Performance',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoId: 'dQw4w9WgXcQ',
    description: 'Our inspiring school anthem performed by St. Teresa Gatura Girls Senior Choir at the Murang\'a County Cultural Festival.',
    featured: true,
    order: 1,
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
  },
  {
    id: 'fv2',
    title: 'Senior Secondary CBC STEM & Robotics Exhibition 2026',
    youtubeUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
    videoId: 'L_LUpnjgPso',
    description: 'Highlights from our Grade 10 CBC STEM Pathway robotics and automated agricultural sensor projects presentation.',
    featured: false,
    order: 2,
    thumbnailUrl: 'https://img.youtube.com/vi/L_LUpnjgPso/hqdefault.jpg'
  },
  {
    id: 'fv3',
    title: 'Annual Graduation & Academic Prize Giving Ceremony',
    youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    videoId: 'kJQP7kiw5Fk',
    description: 'Celebrating academic excellence, spiritual devotion, and leadership awards at St. Teresa Gatura Girls.',
    featured: false,
    order: 3,
    thumbnailUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg'
  }
];

