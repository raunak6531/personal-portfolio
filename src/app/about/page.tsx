"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import dynamic from "next/dynamic";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

import { CertificateCarousel } from "@/components/ui/CertificateCarousel";

// Certificate data array
const certificatesData = [
  {
    id: 1,
    title: "Google Cybersecurity Certificate",
    issuer: "Coursera",
    year: "2024",
    description: "Comprehensive cybersecurity program covering threat detection, incident response, and security frameworks.",
    pdfPath: "/certificates/GoogleCybersecurityCertificate_Coursera.pdf",
    color: "blue"
  },
  {
    id: 2,
    title: "HTML, CSS & JavaScript",
    issuer: "Coursera",
    year: "2023",
    description: "Frontend web development fundamentals covering HTML5, CSS3, and JavaScript programming essentials.",
    pdfPath: "/certificates/Html,css,js_coursera.pdf",
    color: "green"
  },
  {
    id: 3,
    title: "Programming & Data Structures",
    issuer: "NPTEL",
    year: "2023",
    description: "Advanced programming concepts using Python with focus on data structures and algorithmic problem solving.",
    pdfPath: "/certificates/Programming, Data Structures and Algorithms using Python_NPTEL.pdf",
    color: "purple"
  },
  {
    id: 4,
    title: "Cloud Computing",
    issuer: "Coursera",
    year: "2023",
    description: "Cloud infrastructure, services, and deployment strategies covering major cloud platforms and architectures.",
    pdfPath: "/certificates/cloud_computing_Coursera.pdf",
    color: "blue"
  },
  {
    id: 5,
    title: "Design & Analysis of Algorithms",
    issuer: "NPTEL",
    year: "2022",
    description: "Advanced algorithmic techniques, complexity analysis, and optimization strategies for efficient problem solving.",
    pdfPath: "/certificates/design_and_analysis_of_algorithms_nptel.pdf",
    color: "green"
  },
  {
    id: 6,
    title: "Software Engineering",
    issuer: "Coursera",
    year: "2022",
    description: "Software development lifecycle, design patterns, testing methodologies, and project management principles.",
    pdfPath: "/certificates/software_engineering_coursera.pdf",
    color: "purple"
  },
  {
    id: 7,
    title: "Wine Tasting Certificate",
    issuer: "Coursera",
    year: "2024",
    description: "Professional wine tasting and appreciation course covering wine varieties, tasting techniques, and pairing principles.",
    pdfPath: "/certificates/Wine-Tasting_Coursera.pdf",
    color: "red"
  }
];

// Certificate card icons mapping
const certificateIcons = {
  blue: ["🎓", "🔒", "☁️"],
  green: ["💻", "🏛️"],
  purple: ["📱", "⚙️"],
  red: ["🍷", "🍇"]
};

// Function to get icon based on certificate ID and color
const getCertificateIcon = (id: number, color: string) => {
  const icons = certificateIcons[color as keyof typeof certificateIcons];
  return icons[(id - 1) % icons.length];
};



function AboutContent() {
  const { isNavVisible, toggleNavigation } = useNavigation();
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [experienceView, setExperienceView] = useState<'responsibilities' | 'accomplishments'>('responsibilities');
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  // Touch/swipe handling for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [expandedSkillSection, setExpandedSkillSection] = useState<string | null>(null);
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Auto-hide swipe hint after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Define sections for keyboard navigation
  const sections = [
    { id: 'hero', label: 'About', icon: '01' },
    { id: 'philosophy', label: 'Philosophy', icon: '02' },
    { id: 'skills', label: 'Skills', icon: '03' },
    { id: 'experience', label: 'Experience', icon: '04' },
    { id: 'certifications', label: 'Certifications', icon: '05' },
    { id: 'contact', label: 'Contact', icon: '06' }
  ];

  // Swipe navigation functions
  const navigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToNextSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex < sections.length - 1) {
      navigateToSection(sections[currentIndex + 1].id);
    }
  };

  const navigateToPrevSection = () => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (currentIndex > 0) {
      navigateToSection(sections[currentIndex - 1].id);
    }
  };

  // Skills accordion toggle
  const toggleSkillSection = (sectionId: string) => {
    setExpandedSkillSection(expandedSkillSection === sectionId ? null : sectionId);
  };

  // All skills flattened for carousel
  const allSkills = [
    // Frontend
    { skill: 'React & Next.js', desc: 'The dynamic duo', category: 'Frontend', icon: '⚡', color: 'from-blue-500/20 to-cyan-500/20' },
    { skill: 'TypeScript', desc: 'JavaScript with trust issues', category: 'Frontend', icon: '⚡', color: 'from-blue-500/20 to-indigo-500/20' },
    { skill: 'Tailwind CSS', desc: 'The utility king', category: 'Frontend', icon: '⚡', color: 'from-cyan-500/20 to-teal-500/20' },
    { skill: 'Framer Motion', desc: 'Where UI starts to dance', category: 'Frontend', icon: '⚡', color: 'from-purple-500/20 to-pink-500/20' },
    { skill: 'Three.js', desc: 'When 2D isn\'t enough', category: 'Frontend', icon: '⚡', color: 'from-green-500/20 to-emerald-500/20' },
    // Backend
    { skill: 'Node.js', desc: 'JavaScript everywhere', category: 'Backend', icon: '⚙️', color: 'from-green-500/20 to-lime-500/20' },
    { skill: 'Python', desc: 'The Swiss Army knife', category: 'Backend', icon: '⚙️', color: 'from-yellow-500/20 to-orange-500/20' },
    { skill: 'PostgreSQL', desc: 'Relational reliability', category: 'Backend', icon: '⚙️', color: 'from-blue-500/20 to-sky-500/20' },
    { skill: 'MongoDB', desc: 'NoSQL freedom', category: 'Backend', icon: '⚙️', color: 'from-green-500/20 to-teal-500/20' },
    { skill: 'REST APIs', desc: 'The universal language', category: 'Backend', icon: '⚙️', color: 'from-orange-500/20 to-red-500/20' },
    // Tools
    { skill: 'Git & GitHub', desc: 'Version control savior', category: 'Tools', icon: '🛠️', color: 'from-gray-500/20 to-slate-500/20' },
    { skill: 'Vite', desc: 'Lightning-fast builds', category: 'Tools', icon: '🛠️', color: 'from-purple-500/20 to-violet-500/20' },
    { skill: 'Vercel', desc: 'Deploy with confidence', category: 'Tools', icon: '🛠️', color: 'from-black/20 to-gray-500/20' },
    { skill: 'Figma', desc: 'Design-dev bridge', category: 'Tools', icon: '🛠️', color: 'from-pink-500/20 to-rose-500/20' },
    { skill: 'VS Code', desc: 'Home sweet home', category: 'Tools', icon: '🛠️', color: 'from-blue-500/20 to-cyan-500/20' }
  ];

  // Carousel navigation
  const nextSkill = () => {
    setCurrentSkillIndex((prev) => (prev + 1) % allSkills.length);
    setShowSwipeHint(false);
  };

  const prevSkill = () => {
    setCurrentSkillIndex((prev) => (prev - 1 + allSkills.length) % allSkills.length);
    setShowSwipeHint(false);
  };

  const goToSkill = (index: number) => {
    setCurrentSkillIndex(index);
    setShowSwipeHint(false);
  };

  // Touch/swipe support for carousel
  const [carouselTouchStart, setCarouselTouchStart] = useState<number | null>(null);
  const [carouselTouchEnd, setCarouselTouchEnd] = useState<number | null>(null);

  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation(); // Prevent section navigation
    setCarouselTouchStart(e.targetTouches[0].clientX);
    setCarouselTouchEnd(null);
  };

  const handleCarouselTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation(); // Prevent section navigation
    setCarouselTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation(); // Prevent section navigation

    if (!carouselTouchStart || !carouselTouchEnd) return;

    const distance = carouselTouchStart - carouselTouchEnd;
    const isLeftSwipe = distance > 50;   // Swipe left = next skill
    const isRightSwipe = distance < -50; // Swipe right = previous skill

    if (isLeftSwipe) {
      nextSkill(); // Swipe left → next skill
    } else if (isRightSwipe) {
      prevSkill(); // Swipe right → previous skill
    }

    // Hide hint after first swipe
    setShowSwipeHint(false);

    // Reset touch states
    setCarouselTouchStart(null);
    setCarouselTouchEnd(null);
  };

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientY);

    // Prevent default scroll if we detect a potential swipe
    if (touchStart && Math.abs(touchStart - e.targetTouches[0].clientY) > 20) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 60; // Reduced threshold for better responsiveness
    const isDownSwipe = distance < -60;

    if (isUpSwipe || isDownSwipe) {
      // Haptic feedback simulation (vibration if available)
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }

      if (isUpSwipe) {
        navigateToNextSection();
      }
      if (isDownSwipe) {
        navigateToPrevSection();
      }
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Wheel event handler for desktop
  const handleWheel = (e: React.WheelEvent) => {
    if (isMobile) return;

    e.preventDefault();

    if (e.deltaY > 0) {
      navigateToNextSection();
    } else if (e.deltaY < 0) {
      navigateToPrevSection();
    }
  };

  // Keyboard navigation handler for sections
  const handleSectionKeyNavigation = (direction: 'up' | 'down') => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    let nextIndex;

    if (direction === 'up') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
    } else {
      nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    }

    const nextSection = sections[nextIndex];
    const element = document.getElementById(nextSection.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Set loaded state after component mounts to trigger animations
    setIsLoaded(true);

    // Scroll handler for progress bar
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      // Update progress bar
      if (progressRef.current) {
        const totalProgress = Math.min(scrollY / (documentHeight - window.innerHeight), 1);
        progressRef.current.style.width = `${totalProgress * 100}%`;
      }
    };

    // Event listeners
    window.addEventListener('scroll', handleScroll);

    // Scroll reveal observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Section observer for active navigation
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-20% 0px -20% 0px'
    });

    // Observe all scroll-reveal elements
    const observeElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal, .skill-item');
      elements.forEach((el) => observer.observe(el));

      // Observe sections for active navigation
      const sections = document.querySelectorAll('#hero, #philosophy, #skills, #experience, #certifications, #contact');
      sections.forEach((section) => sectionObserver.observe(section));
    };

    // Setup observer immediately but ensure DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements);
    } else {
      observeElements();
    }

    // Keyboard navigation for sections
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        handleSectionKeyNavigation('up');
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleSectionKeyNavigation('down');
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        toggleNavigation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, [activeSection]);

  return (
    <div
      className="min-h-screen bg-background text-white overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Scroll Progress Bar - Hidden on mobile */}
      <div className="hidden sm:block fixed top-0 left-0 w-full h-1 bg-white/10 z-30">
        <div
          ref={progressRef}
          className="h-full bg-white/60 transition-all duration-100 ease-out"
          style={{ width: '0%' }}
        />
      </div>

      {/* Silk Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-30">
        <Silk
          speed={2}
          scale={0.8}
          color="#1a1a2e"
          noiseIntensity={0.8}
          rotation={0.1}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center" id="hero">
          <div className="text-center px-4 sm:px-6 md:px-8">
            {/* Main Title */}
            <div className="mb-8 sm:mb-10 md:mb-12 space-y-4 sm:space-y-5 md:space-y-6">
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-light tracking-wider ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  letterSpacing: '0.05em',
                  lineHeight: '1.1',
                  animationDelay: isLoaded ? '0.5s' : '0s'
                }}
              >
                परंपरा
              </h1>
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-light tracking-wider ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  letterSpacing: '0.05em',
                  lineHeight: '1.1',
                  animationDelay: isLoaded ? '0.8s' : '0s'
                }}
              >
                प्रतिष्ठा
              </h1>
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-light tracking-wider ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  letterSpacing: '0.05em',
                  lineHeight: '1.1',
                  animationDelay: isLoaded ? '1.1s' : '0s'
                }}
              >
                अनुशासन
              </h1>
            </div>

            {/* Subtitle */}
            <div className="max-w-3xl mx-auto px-2 sm:px-4">
              <div className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: isLoaded ? '1.5s' : '0s' }}>
                <p
                  className="text-base sm:text-lg md:text-xl opacity-70 leading-relaxed mb-2"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Raised on React, disciplined by bugs, and powered by caffeine.
                </p>
              </div>
              <div className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: isLoaded ? '1.8s' : '0s' }}>
                <p
                  className="text-base sm:text-lg md:text-xl opacity-70 leading-relaxed mb-2"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  I follow the holy trinity: <span className="text-white/90 font-medium">परंपरा</span> of clean code, <span className="text-white/90 font-medium">प्रतिष्ठा</span> of shipping on time,
                </p>
              </div>
              <div className={`${isLoaded ? 'animate-fade-in' : 'opacity-0'} mb-6 sm:mb-8`} style={{ animationDelay: isLoaded ? '2.1s' : '0s' }}>
                <p
                  className="text-base sm:text-lg md:text-xl opacity-70 leading-relaxed"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  and <span className="text-white/90 font-medium">अनुशासन</span> of not rage-pushing to main.
                </p>
              </div>
            </div>


          </div>
        </div>

        {/* Philosophy Section */}
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8" id="philosophy">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mb-8 sm:mb-10 md:mb-12 uppercase tracking-wide scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              My Philosophy
            </h2>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 text-center md:text-left">
              <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="scroll-reveal" style={{ animationDelay: '0.3s' }}>
                  <h3
                    className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Design Philosophy
                  </h3>
                </div>
                <div className="scroll-reveal" style={{ animationDelay: '0.4s' }}>
                  <p
                    className="text-base sm:text-lg opacity-70 leading-relaxed mb-4 sm:mb-6"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    I believe in design with a purpose. No pixel should be just standing there.
                  </p>
                </div>
                <div className="scroll-reveal" style={{ animationDelay: '0.5s' }}>
                  <p
                    className="text-base sm:text-lg opacity-70 leading-relaxed mb-4 sm:mb-6"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    I like interfaces that speak before the user even clicks.
                  </p>
                </div>
                <div className="scroll-reveal" style={{ animationDelay: '0.6s' }}>
                  <p
                    className="text-base sm:text-lg opacity-70 leading-relaxed"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    Simplicity, clarity, and a sprinkle of aesthetic OCD — that&apos;s my UI religion.
                  </p>
                </div>
              </div>

              <div className="scroll-reveal" style={{ animationDelay: '0.7s' }}>
                <div className="scroll-reveal" style={{ animationDelay: '0.8s' }}>
                  <h3
                    className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Code Craftsmanship
                  </h3>
                </div>
                <div className="scroll-reveal" style={{ animationDelay: '0.9s' }}>
                  <p
                    className="text-base sm:text-lg opacity-70 leading-relaxed mb-4 sm:mb-6"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    Code is poetry — but with more semicolons and less crying (most days).
                  </p>
                </div>
                <div className="scroll-reveal" style={{ animationDelay: '1.0s' }}>
                  <p
                    className="text-base sm:text-lg opacity-70 leading-relaxed mb-4 sm:mb-6"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    I write code that others won&apos;t curse at. Scalable, accessible, fast as hell.
                  </p>
                </div>
                <div className="scroll-reveal" style={{ animationDelay: '1.1s' }}>
                  <p
                    className="text-base sm:text-lg opacity-70 leading-relaxed"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    If it&apos;s not maintainable, I don&apos;t ship it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="min-h-screen py-16 md:py-0 md:flex md:items-center justify-center px-4 sm:px-6 md:px-8" id="skills">
          <div className="max-w-4xl mx-auto w-full flex flex-col justify-center min-h-screen md:min-h-0">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-light mb-8 sm:mb-12 uppercase tracking-wide text-center scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              The Stack That Powers the Madness
            </h2>

            {/* Desktop Grid Layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Frontend */}
              <div className="text-center scroll-reveal" style={{ animationDelay: '0.4s' }}>
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">⚡</span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Frontend
                  </h3>
                </div>
                <div className="text-left">
                  <div className="scroll-reveal mb-4 sm:mb-6" style={{ animationDelay: '0.5s' }}>
                    <p
                      className="text-base sm:text-lg opacity-70 leading-relaxed mb-4"
                      style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                    >
                      Where pixels meet personality. I craft interfaces that don't just look good — they feel alive.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: 'React & Next.js', desc: 'The dynamic duo' },
                      { skill: 'TypeScript', desc: 'JavaScript with trust issues' },
                      { skill: 'Tailwind CSS', desc: 'The utility king' },
                      { skill: 'Framer Motion', desc: 'Where UI starts to dance' },
                      { skill: 'Three.js', desc: 'When 2D isn&apos;t enough' }
                    ].map((item, index) => (
                      <div
                        key={item.skill}
                        className="skill-item opacity-70 hover:opacity-100 transition-opacity duration-300 group"
                        style={{
                          fontFamily: '"TheGoodMonolith", sans-serif',
                          animationDelay: `${0.6 + index * 0.1}s`
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.skill}</span>
                          <span className="text-sm opacity-50 group-hover:opacity-70 transition-opacity">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Backend */}
              <div className="text-center scroll-reveal" style={{ animationDelay: '0.6s' }}>
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">⚙️</span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Backend
                  </h3>
                </div>
                <div className="text-left">
                  <div className="scroll-reveal mb-4 sm:mb-6" style={{ animationDelay: '0.7s' }}>
                    <p
                      className="text-base sm:text-lg opacity-70 leading-relaxed mb-4"
                      style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                    >
                      The engine room where data flows and logic lives. Building the backbone that never breaks.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: 'Node.js', desc: 'JavaScript everywhere' },
                      { skill: 'Python', desc: 'The Swiss Army knife' },
                      { skill: 'PostgreSQL', desc: 'Relational reliability' },
                      { skill: 'MongoDB', desc: 'NoSQL freedom' },
                      { skill: 'REST APIs', desc: 'The universal language' }
                    ].map((item, index) => (
                      <div
                        key={item.skill}
                        className="skill-item opacity-70 hover:opacity-100 transition-opacity duration-300 group"
                        style={{
                          fontFamily: '"TheGoodMonolith", sans-serif',
                          animationDelay: `${0.8 + index * 0.1}s`
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.skill}</span>
                          <span className="text-sm opacity-50 group-hover:opacity-70 transition-opacity">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools */}
              <div className="text-center scroll-reveal" style={{ animationDelay: '0.8s' }}>
                <div className="mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">🛠️</span>
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Tools
                  </h3>
                </div>
                <div className="text-left">
                  <div className="scroll-reveal mb-4 sm:mb-6" style={{ animationDelay: '0.9s' }}>
                    <p
                      className="text-base sm:text-lg opacity-70 leading-relaxed mb-4"
                      style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                    >
                      The arsenal that keeps me productive and (mostly) sane. These are my daily companions.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: 'Git & GitHub', desc: 'Version control savior' },
                      { skill: 'Vite', desc: 'Lightning-fast builds' },
                      { skill: 'Vercel', desc: 'Deploy with confidence' },
                      { skill: 'Figma', desc: 'Design-dev bridge' },
                      { skill: 'VS Code', desc: 'Home sweet home' }
                    ].map((item, index) => (
                      <div
                        key={item.skill}
                        className="skill-item opacity-70 hover:opacity-100 transition-opacity duration-300 group"
                        style={{
                          fontFamily: '"TheGoodMonolith", sans-serif',
                          animationDelay: `${1.0 + index * 0.1}s`
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.skill}</span>
                          <span className="text-sm opacity-50 group-hover:opacity-70 transition-opacity">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Skill Carousel */}
            <div className="md:hidden px-4">
              {/* Carousel Container */}
              <div className="relative carousel-container">
                {/* Main Skill Card */}
                <div
                  className="overflow-hidden rounded-3xl touch-pan-x"
                  onTouchStart={handleCarouselTouchStart}
                  onTouchMove={handleCarouselTouchMove}
                  onTouchEnd={handleCarouselTouchEnd}
                  style={{ touchAction: 'pan-x' }}
                >
                  <div
                    className="flex transition-transform duration-500 ease-out skill-carousel"
                    style={{ transform: `translateX(-${currentSkillIndex * 100}%)` }}
                  >
                    {allSkills.map((skill, index) => (
                      <div
                        key={`${skill.category}-${skill.skill}`}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <div className={`relative h-80 rounded-2xl backdrop-blur-sm bg-gradient-to-br ${skill.color} border border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-300 skill-card`}>
                          {/* Background Pattern */}
                          <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                          </div>

                          {/* Content */}
                          <div className="relative z-10 p-6 h-full flex flex-col justify-between">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                  <span className="text-xl">{skill.icon}</span>
                                </div>
                                <div>
                                  <div className="text-xs opacity-60 uppercase tracking-wider font-light">
                                    {skill.category}
                                  </div>
                                  <div className="text-xs opacity-40 mt-1">
                                    {index + 1} of {allSkills.length}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Main Content */}
                            <div className="text-center space-y-4">
                              <h3
                                className="text-2xl font-light tracking-wide"
                                style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                              >
                                {skill.skill}
                              </h3>
                              <p
                                className="text-base opacity-70 italic"
                                style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                              >
                                {skill.desc}
                              </p>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-center">
                              <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-white/60 rounded-full transition-all duration-300"
                                  style={{ width: `${((index + 1) / allSkills.length) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Swipe Hint */}
                {showSwipeHint && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/40 text-xs animate-pulse transition-opacity duration-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    <span style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}>Swipe to explore</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                )}
              </div>



              {/* Category Filter */}
              <div className="flex justify-center mt-6 gap-2 px-2">
                {['Frontend', 'Backend', 'Tools'].map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      const firstSkillIndex = allSkills.findIndex(skill => skill.category === category);
                      if (firstSkillIndex !== -1) goToSkill(firstSkillIndex);
                    }}
                    className={`px-3 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 category-filter whitespace-nowrap flex-shrink-0 ${
                      allSkills[currentSkillIndex]?.category === category
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80'
                    }`}
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="min-h-screen py-20 md:py-0 md:flex md:items-center justify-center px-4 md:px-8" id="experience">
          <div className="max-w-4xl mx-auto w-full">
            <h2
              className="text-3xl md:text-4xl lg:text-6xl font-light uppercase tracking-wide text-center scroll-reveal mb-6 md:mb-12"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Experience
            </h2>

            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line - Hidden on mobile */}
              <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent scroll-reveal" style={{ animationDelay: '0.1s' }}>
                {/* Timeline dot */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white/60 rounded-full border-2 border-white/20 backdrop-blur-sm scroll-reveal" style={{ animationDelay: '0.3s' }}></div>
                {/* Timeline glow effect */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/10 rounded-full blur-sm scroll-reveal" style={{ animationDelay: '0.4s' }}></div>
              </div>

              {/* Enhanced Experience Content */}
              <div className="md:ml-20 w-full">
                {/* Company Logo/Icon */}
                <div className="scroll-reveal mb-3 md:mb-4" style={{ animationDelay: '0.2s' }}>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 flex items-center justify-center backdrop-blur-sm">
                    <span className="text-xl md:text-2xl">💻</span>
                  </div>
                </div>

              {/* Company Name */}
              <div className="scroll-reveal mb-2 md:mb-3" style={{ animationDelay: '0.3s' }}>
                <h3
                  className="text-xl md:text-3xl font-light uppercase tracking-wide text-white/90"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  TechLearn Solutions
                </h3>
              </div>

              {/* Role with Easter Egg Tooltip */}
              <div className="scroll-reveal mb-2 md:mb-3 relative group" style={{ animationDelay: '0.4s' }}>
                <h4
                  className="text-base md:text-xl font-medium text-white/80 cursor-help hover:text-white transition-colors duration-300"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Frontend Intern
                </h4>

                {/* Easter Egg Tooltip */}
                <div className="absolute bottom-full left-0 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                  <div className="bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 whitespace-nowrap">
                    <p
                      className="text-sm text-white/90"
                      style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                    >
                      Frontend Intern... but also part-time bug slayer 🐛⚔️
                    </p>
                    {/* Arrow */}
                    <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-black/90"></div>
                  </div>
                </div>
              </div>

              {/* Duration */}
              <div className="scroll-reveal mb-4 md:mb-6" style={{ animationDelay: '0.5s' }}>
                <span
                  className="text-xs md:text-sm opacity-60 uppercase tracking-wider bg-white/5 px-2 py-1 md:px-3 md:py-1 rounded-full border border-white/10"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  2025 - Present
                </span>
              </div>

              {/* Tech Stack */}
              <div className="scroll-reveal mb-6 md:mb-8" style={{ animationDelay: '0.6s' }}>
                <h5
                  className="text-xs md:text-sm uppercase tracking-wider text-white/60 mb-2 md:mb-3"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  Tech Stack
                </h5>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {['React', 'Tailwind CSS'].map((tech, index) => (
                    <span
                      key={tech}
                      className="px-2 py-1 md:px-3 md:py-1 bg-white/10 rounded-full text-xs md:text-sm border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-default"
                      style={{
                        fontFamily: '"TheGoodMonolith", sans-serif',
                        animationDelay: `${0.7 + index * 0.1}s`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Toggle Content Section */}
              <div className="scroll-reveal" style={{ animationDelay: '0.8s' }}>
                {/* Toggle Buttons */}
                <div className="flex mb-3 md:mb-6 bg-white/5 rounded-full p-1 border border-white/10">
                  <button
                    onClick={() => setExperienceView('responsibilities')}
                    className={`flex-1 px-2 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      experienceView === 'responsibilities'
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    Responsibilities
                  </button>
                  <button
                    onClick={() => setExperienceView('accomplishments')}
                    className={`flex-1 px-2 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      experienceView === 'accomplishments'
                        ? 'bg-white/20 text-white shadow-lg'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    Accomplishments
                  </button>
                </div>

                {/* Content Display */}
                <div className="h-auto md:h-[280px] relative overflow-visible md:overflow-hidden">
                  <div className={`md:absolute md:inset-0 transition-all duration-500 ease-in-out ${
                    experienceView === 'responsibilities'
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-[-20px] pointer-events-none md:block hidden'
                  }`}>
                    <div className="space-y-2 md:space-y-4">
                      <h6
                        className="text-base md:text-xl font-medium text-white/90 mb-2 md:mb-4"
                        style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                      >
                        What I Do Daily
                      </h6>
                      <ul className="space-y-2 md:space-y-4">
                        {[
                          'Build responsive React components that actually work on all devices (yes, even Internet Explorer... just kidding)',
                          'Transform Figma designs into pixel-perfect interfaces using Tailwind CSS',
                          'Debug frontend issues and hunt down those sneaky CSS bugs',
                          'Collaborate with the team to implement new features and improvements',
                          'Write clean, maintainable code that future-me will thank present-me for'
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start opacity-80 hover:opacity-100 transition-opacity duration-300"
                            style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                          >
                            <span className="text-white/60 mr-2 md:mr-3 mt-0.5 md:mt-1 text-sm md:text-lg">•</span>
                            <span className="leading-relaxed text-xs md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className={`md:absolute md:inset-0 transition-all duration-500 ease-in-out ${
                    experienceView === 'accomplishments'
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-[20px] pointer-events-none md:block hidden'
                  }`}>
                    <div className="space-y-2 md:space-y-4">
                      <h6
                        className="text-base md:text-xl font-medium text-white/90 mb-2 md:mb-4"
                        style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                      >
                        Wins & Achievements
                      </h6>
                      <ul className="space-y-2 md:space-y-4">
                        {[
                          'Successfully implemented responsive design patterns that improved mobile user experience',
                          'Reduced component rendering time by optimizing React component structure',
                          'Contributed to the company\'s design system with reusable Tailwind components',
                          'Learned to debug like a detective and code like a poet (still working on the poetry part)',
                          'Gained hands-on experience with modern frontend development workflows'
                        ].map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start opacity-80 hover:opacity-100 transition-opacity duration-300"
                            style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                          >
                            <span className="text-green-400/60 mr-2 md:mr-3 mt-0.5 md:mt-1 text-sm md:text-lg">✓</span>
                            <span className="leading-relaxed text-xs md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="min-h-screen flex items-center justify-center px-4" id="certifications">
          <div className="max-w-7xl mx-auto w-full">
            <h2
              className="text-3xl md:text-4xl lg:text-6xl font-light mb-8 md:mb-16 uppercase tracking-wide text-center scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Certifications
            </h2>

            {/* Certificate Carousel */}
            <div className="scroll-reveal overflow-visible" style={{ animationDelay: '0.2s' }}>
              <CertificateCarousel certificates={certificatesData} />
            </div>

            {/* Instructions */}

          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="min-h-screen flex items-center justify-center px-4 md:px-8" id="contact">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-3xl md:text-4xl lg:text-6xl font-light mb-8 md:mb-16 uppercase tracking-wide text-center scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Get in Touch
            </h2>

            {/* Contact Card */}
            <div className="flex justify-center">
              <div className="contact-card scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="contact-card__img">
                  {/* Geometric pattern background */}
                  <div className="w-full h-full bg-gradient-to-br from-pink-400/30 via-red-400/20 to-orange-400/30 rounded-t-[20px] relative overflow-hidden">
                    {/* Triangular pattern overlay */}
                    <div className="absolute inset-0 opacity-40">
                      <svg width="100%" height="100%" viewBox="0 0 300 192" className="w-full h-full">
                        <defs>
                          <pattern id="triangles" x="0" y="0" width="40" height="35" patternUnits="userSpaceOnUse">
                            <polygon points="20,0 40,35 0,35" fill="#ff6b6b" opacity="0.3"/>
                            <polygon points="0,0 20,35 40,0" fill="#ff8e8e" opacity="0.2"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#triangles)"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="contact-card__avatar">
                  <div className="w-[130px] h-[130px] bg-gradient-to-br from-pink-500/40 to-red-500/40 rounded-full flex items-center justify-center border-4 border-black backdrop-blur-sm">
                    <img
                      src="/my_photo.jpg"
                      alt="Raunak Sadana"
                      className="w-[120px] h-[120px] rounded-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="contact-card__title">Raunak Sadana</h3>
                <p className="contact-card__subtitle">Web Development</p>
                <div className="flex gap-3 mt-4">
                  <button
                    className="contact-card__btn"
                    onClick={() => window.open('mailto:your.email@example.com', '_blank')}
                  >
                    Email
                  </button>
                  <button
                    className="contact-card__btn contact-card__btn--solid"
                    onClick={() => window.open('https://linkedin.com/in/yourprofile', '_blank')}
                  >
                    LinkedIn
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Description */}
            <div className="text-center mt-8 md:mt-16 scroll-reveal" style={{ animationDelay: '0.5s' }}>
              <p
                className="text-white/70 text-base max-w-2xl mx-auto leading-relaxed"
                style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
              >
                Ready to collaborate? Whether you have a project in mind, want to discuss opportunities,
                or just want to connect, I&apos;d love to hear from you. Let&apos;s build something amazing together!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation Dots - Hidden on mobile */}
      <div className="hidden lg:block fixed right-6 top-1/2 transform -translate-y-1/2 z-20 space-y-6">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`nav-button group relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-150 hover:scale-110 active:scale-95 ${
              activeSection === section.id
                ? 'active border-white/80 bg-white/10'
                : 'border-white/20 hover:border-white/60'
            }`}
            title={section.label}
          >
            {/* Dot indicator */}
            <div className={`w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125 ${
              activeSection === section.id
                ? 'bg-white/90 scale-125'
                : 'bg-white/30 group-hover:bg-white/80'
            }`}></div>

            {/* Number indicator */}
            <span
              className={`absolute text-xs font-light transition-opacity duration-300 ${
                activeSection === section.id
                  ? 'opacity-100'
                  : 'opacity-60 group-hover:opacity-100'
              }`}
              style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
            >
              {section.icon}
            </span>

            {/* Label tooltip */}
            <span className="absolute right-16 top-1/2 transform -translate-y-1/2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-150 whitespace-nowrap bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 pointer-events-none">
              <span
                className="font-light tracking-wide"
                style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
              >
                {section.label}
              </span>
              {/* Arrow */}
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-black/90 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Section Indicator - Minimal and elegant */}
      <div className="lg:hidden fixed top-1/2 right-3 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-white/90 scale-150'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>



      {/* Personal Logo */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20">
        <PersonalLogo
          size={isMobile ? "sm" : "md"}
          onClick={toggleNavigation}
          isToggled={!isNavVisible}
        />
      </div>

      {/* Navigation */}
      <CarouselNavigation isVisible={isNavVisible} />

      {/* Mobile Scroll Hint - Only show on first section */}
      {isMobile && activeSection === 'hero' && (
        <div className="mobile-scroll-hint">
          <div className="flex flex-col items-center">
            <span style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}>Swipe up to explore</span>
            <div className="mt-1 animate-bounce">↑</div>
          </div>
        </div>
      )}

      {/* R Button Hint - Subtle and elegant */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-10 opacity-60 hover:opacity-100 transition-all duration-300 animate-pulse hover:animate-none">
        <div className="flex items-center space-x-2 text-white/50 text-xs">
          <span style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}>Press</span>
          <div className="px-2 py-1 bg-white/10 rounded border border-white/20 backdrop-blur-sm hover:bg-white/20 hover:border-white/30 transition-all duration-300">
            <span className="font-mono text-white/70 hover:text-white/90">R</span>
          </div>
          <span style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}>for menu</span>
        </div>
      </div>



      {/* Font imports and animations */}
      <style jsx global>{`
        @import url("https://fonts.cdnfonts.com/css/thegoodmonolith");

        @font-face {
          font-family: "PP Neue Montreal";
          src: url("https://fonts.cdnfonts.com/s/64587/PPNeueMontreal-Medium.woff2") format("woff2");
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-reveal {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          opacity: 0;
          transform: translateY(30px);
          animation: fade-in 1s ease-out forwards;
          animation-fill-mode: both;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .skill-item {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .skill-item.visible {
          opacity: 0.7;
          transform: translateY(0);
        }

        .skill-item.visible:hover {
          opacity: 1;
        }

        /* Navigation button enhancements */
        .nav-button {
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .nav-button:hover {
          box-shadow: 0 6px 25px rgba(255, 255, 255, 0.1);
        }

        .nav-button.active {
          box-shadow: 0 6px 25px rgba(255, 255, 255, 0.2);
        }

        /* Subtle background texture */
        body::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("https://img.freepik.com/premium-photo/white-dust-scratches-black-background_279525-2.jpg?w=640");
          background-repeat: repeat;
          opacity: 0.02;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 1;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #111111;
        }

        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Contact Card Styles */
        .contact-card {
          position: relative;
          width: 300px;
          height: 384px;
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .contact-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .contact-card__img {
          height: 192px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .contact-card__avatar {
          position: absolute;
          width: 130px;
          height: 130px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          top: calc(50% - 65px);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .contact-card__title {
          margin-top: 60px;
          font-weight: 500;
          font-size: 18px;
          color: white;
          font-family: "PP Neue Montreal", sans-serif;
        }

        .contact-card__subtitle {
          margin-top: 10px;
          font-weight: 400;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.7);
          font-family: "TheGoodMonolith", sans-serif;
        }

        .contact-card__btn {
          padding: 10px 20px;
          border: 2px solid white;
          border-radius: 4px;
          font-weight: 700;
          font-size: 11px;
          color: white;
          background: transparent;
          text-transform: uppercase;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: "TheGoodMonolith", sans-serif;
          letter-spacing: 0.5px;
          min-width: 80px;
        }

        .contact-card__btn:hover {
          background: white;
          color: black;
          transform: translateY(-2px);
        }

        .contact-card__btn--solid {
          background: white;
          color: black;
        }

        .contact-card__btn--solid:hover {
          background: transparent;
          color: white;
          transform: translateY(-2px);
        }

        /* Mobile-specific improvements */
        @media (max-width: 640px) {
          .contact-card {
            width: 90%;
            max-width: 320px;
          }

          .contact-card__avatar {
            width: 100px;
            height: 100px;
          }

          .contact-card__avatar > div {
            width: 100px !important;
            height: 100px !important;
          }

          .contact-card__avatar img {
            width: 90px !important;
            height: 90px !important;
          }

          .contact-card__btn {
            padding: 8px 16px;
            font-size: 10px;
            min-width: 70px;
          }

          /* Improve touch targets */
          .nav-button {
            min-width: 44px;
            min-height: 44px;
          }

          /* Better text wrapping on mobile */
          .hero-subtitle {
            word-break: keep-all;
            overflow-wrap: break-word;
          }

          /* Mobile section spacing */
          .min-h-screen {
            min-height: 100vh;
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          /* Ensure content is scrollable */
          body {
            overflow-y: auto;
          }

          /* Mobile grid improvements */
          .grid {
            gap: 1.5rem;
          }

          /* Mobile skills section */
          .skill-item {
            font-size: 14px;
          }

          /* Prevent text cutoff in mobile skills */
          .mobile-skill-card {
            word-wrap: break-word;
            overflow-wrap: break-word;
            hyphens: auto;
          }

          .mobile-skill-text {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          /* Better mobile accordion spacing */
          @media (max-width: 480px) {
            .mobile-skill-card {
              padding: 0.75rem;
            }

            .skill-item {
              font-size: 13px;
            }
          }

          /* Skill Carousel Optimizations */
          .skill-carousel {
            will-change: transform;
            backface-visibility: hidden;
            transform-style: preserve-3d;
          }

          .skill-card {
            will-change: transform, opacity;
            backface-visibility: hidden;
          }

          .skill-card:hover {
            transform: translateY(-2px);
          }

          /* Smooth carousel transitions */
          .carousel-container {
            touch-action: pan-y;
            -webkit-overflow-scrolling: touch;
          }

          /* Navigation button animations */
          .nav-button {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .nav-button:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
          }

          .nav-button:active {
            transform: scale(0.95);
          }

          /* Dot indicator animations */
          .dot-indicator {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .dot-indicator:hover {
            transform: scale(1.2);
          }

          /* Category filter animations */
          .category-filter {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .category-filter:hover {
            transform: translateY(-1px);
          }

          /* Mobile experience section */
          .experience-content {
            padding: 1rem;
          }

          /* Mobile scroll indicator */
          .mobile-scroll-hint {
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            color: rgba(255, 255, 255, 0.7);
            font-size: 13px;
            z-index: 10;
            text-align: center;
          }

          /* Smooth scrolling for mobile */
          html {
            scroll-behavior: smooth;
          }

          /* Prevent overscroll bounce on iOS */
          body {
            overscroll-behavior: none;
          }

          /* Touch action for better swipe detection */
          .min-h-screen {
            touch-action: pan-y;
          }

          /* Ensure full-screen touch responsiveness */
          body, html {
            touch-action: manipulation;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
          }

          /* Better touch handling for mobile */
          @media (max-width: 768px) {
            * {
              -webkit-tap-highlight-color: transparent;
            }
          }

          /* Swipe feedback animation */
          @keyframes swipeIndicator {
            0% { opacity: 0; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(1.1); }
          }
        }

        /* Tablet improvements */
        @media (min-width: 641px) and (max-width: 1024px) {
          .contact-card {
            width: 85%;
            max-width: 380px;
          }
        }
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <NavigationProvider>
      <AboutContent />
    </NavigationProvider>
  );
}
