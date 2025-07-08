"use client";

import { useEffect, useRef, useState } from "react";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import dynamic from "next/dynamic";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

export default function About() {
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
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
      const sections = document.querySelectorAll('#hero, #philosophy, #skills, #experience');
      sections.forEach((section) => sectionObserver.observe(section));
    };

    // Delay observer setup to ensure DOM is ready
    setTimeout(observeElements, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-white overflow-hidden relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-30">
        <div
          ref={progressRef}
          className="h-full bg-white/60 transition-all duration-100 ease-out"
          style={{ width: '0%' }}
        />
      </div>

      {/* Silk Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0 opacity-30">
        <Silk
          speed={1.5}
          scale={0.6}
          color="#1a1a2e"
          noiseIntensity={0.6}
          rotation={0.05}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center" id="hero">
          <div className="text-center px-8">
            {/* Main Title */}
            <div className="mb-8">
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider uppercase animate-fade-in"
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  letterSpacing: '-0.03em',
                  lineHeight: '0.9',
                  animationDelay: '0.5s'
                }}
              >
                CLARITY
              </h1>
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider uppercase animate-fade-in"
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  letterSpacing: '-0.03em',
                  lineHeight: '0.9',
                  animationDelay: '0.8s'
                }}
              >
                THROUGH
              </h1>
              <h1
                className="text-6xl md:text-8xl lg:text-9xl font-light tracking-wider uppercase animate-fade-in"
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  letterSpacing: '-0.03em',
                  lineHeight: '0.9',
                  animationDelay: '1.1s'
                }}
              >
                SIMPLICITY
              </h1>
            </div>

            {/* Subtitle */}
            <div className="max-w-2xl mx-auto">
              <p
                className="text-lg md:text-xl opacity-70 leading-relaxed mb-8 animate-fade-in"
                style={{
                  fontFamily: '"TheGoodMonolith", sans-serif',
                  animationDelay: '1.5s'
                }}
              >
                Front-end developer by day, UI wizard by night. I indulge in crafting snappy interfaces turning caffeine and code into pixel-perfect experiences.
              </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
              </div>
              <p
                className="text-xs mt-2 opacity-60 uppercase tracking-wider"
                style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
              >
                Scroll
              </p>
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="min-h-screen flex items-center justify-center px-8" id="philosophy">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-4xl md:text-6xl font-light mb-12 uppercase tracking-wide scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              My Philosophy
            </h2>

            <div className="grid md:grid-cols-2 gap-12 text-left">
              <div className="scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <h3
                  className="text-2xl font-light mb-6 uppercase tracking-wide"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  Design Thinking
                </h3>
                <p
                  className="opacity-70 leading-relaxed mb-6"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  I believe great design isn't just about aesthetics—it's about solving problems elegantly. Every pixel serves a purpose, every interaction tells a story.
                </p>
                <p
                  className="opacity-70 leading-relaxed"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  My approach combines minimalist principles with functional design, creating interfaces that feel intuitive and effortless.
                </p>
              </div>

              <div className="scroll-reveal" style={{ animationDelay: '0.4s' }}>
                <h3
                  className="text-2xl font-light mb-6 uppercase tracking-wide"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  Code Craftsmanship
                </h3>
                <p
                  className="opacity-70 leading-relaxed mb-6"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Clean, maintainable code is the foundation of every great project. I write code that's not just functional, but readable and scalable.
                </p>
                <p
                  className="opacity-70 leading-relaxed"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Performance and accessibility aren't afterthoughts—they're integral parts of the development process from day one.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="min-h-screen flex items-center justify-center px-8" id="skills">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-4xl md:text-6xl font-light mb-16 uppercase tracking-wide text-center scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Skills & Expertise
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Frontend */}
              <div className="text-center scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3
                    className="text-2xl font-light mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Frontend
                  </h3>
                </div>
                <div className="space-y-4">
                  {['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'].map((skill, index) => (
                    <div
                      key={skill}
                      className="skill-item opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        fontFamily: '"TheGoodMonolith", sans-serif',
                        animationDelay: `${0.3 + index * 0.1}s`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="text-center scroll-reveal" style={{ animationDelay: '0.4s' }}>
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h3
                    className="text-2xl font-light mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Backend
                  </h3>
                </div>
                <div className="space-y-4">
                  {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'].map((skill, index) => (
                    <div
                      key={skill}
                      className="skill-item opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        fontFamily: '"TheGoodMonolith", sans-serif',
                        animationDelay: `${0.5 + index * 0.1}s`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div className="text-center scroll-reveal" style={{ animationDelay: '0.6s' }}>
                <div className="mb-8">
                  <div className="w-20 h-20 mx-auto mb-6 border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🛠️</span>
                  </div>
                  <h3
                    className="text-2xl font-light mb-6 uppercase tracking-wide"
                    style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                  >
                    Tools
                  </h3>
                </div>
                <div className="space-y-4">
                  {['Git & GitHub', 'Docker', 'AWS', 'Figma', 'VS Code'].map((skill, index) => (
                    <div
                      key={skill}
                      className="skill-item opacity-70 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        fontFamily: '"TheGoodMonolith", sans-serif',
                        animationDelay: `${0.7 + index * 0.1}s`
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="min-h-screen flex items-center justify-center px-8" id="experience">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl md:text-6xl font-light mb-16 uppercase tracking-wide text-center scroll-reveal"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              Experience
            </h2>

            <div className="space-y-16">
              {/* Experience Item 1 */}
              <div className="border-l border-white/20 pl-8 scroll-reveal" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-white rounded-full -ml-10 mr-6"></div>
                  <span
                    className="text-sm opacity-60 uppercase tracking-wider"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    2022 - Present
                  </span>
                </div>
                <h3
                  className="text-2xl font-light mb-4 uppercase tracking-wide"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  Senior Frontend Developer
                </h3>
                <p
                  className="text-lg opacity-80 mb-4"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Tech Innovations Inc.
                </p>
                <p
                  className="opacity-70 leading-relaxed"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Led the development of responsive web applications using React and Next.js. Collaborated with design teams to implement pixel-perfect interfaces and improved application performance by 40%.
                </p>
              </div>

              {/* Experience Item 2 */}
              <div className="border-l border-white/20 pl-8 scroll-reveal" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-white/60 rounded-full -ml-10 mr-6"></div>
                  <span
                    className="text-sm opacity-60 uppercase tracking-wider"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    2020 - 2022
                  </span>
                </div>
                <h3
                  className="text-2xl font-light mb-4 uppercase tracking-wide"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  Frontend Developer
                </h3>
                <p
                  className="text-lg opacity-80 mb-4"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Digital Solutions Co.
                </p>
                <p
                  className="opacity-70 leading-relaxed"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Developed and maintained multiple client websites and web applications. Specialized in creating smooth animations and interactive user experiences using modern JavaScript frameworks.
                </p>
              </div>

              {/* Experience Item 3 */}
              <div className="border-l border-white/20 pl-8 scroll-reveal" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 bg-white/40 rounded-full -ml-10 mr-6"></div>
                  <span
                    className="text-sm opacity-60 uppercase tracking-wider"
                    style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                  >
                    2019 - 2020
                  </span>
                </div>
                <h3
                  className="text-2xl font-light mb-4 uppercase tracking-wide"
                  style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
                >
                  Junior Web Developer
                </h3>
                <p
                  className="text-lg opacity-80 mb-4"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  StartUp Labs
                </p>
                <p
                  className="opacity-70 leading-relaxed"
                  style={{ fontFamily: '"TheGoodMonolith", sans-serif' }}
                >
                  Started my journey in web development, focusing on HTML, CSS, and JavaScript fundamentals. Contributed to various projects and learned the importance of clean, maintainable code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 space-y-6">
        {[
          { id: 'hero', label: 'About', icon: '01' },
          { id: 'philosophy', label: 'Philosophy', icon: '02' },
          { id: 'skills', label: 'Skills', icon: '03' },
          { id: 'experience', label: 'Experience', icon: '04' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => {
              const element = document.getElementById(section.id);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`nav-button group relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 hover:scale-110 active:scale-95 ${
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
            <span className="absolute right-16 top-1/2 transform -translate-y-1/2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap bg-black/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/10 pointer-events-none">
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

      {/* Navigation */}
      <CarouselNavigation />

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
          animation: fade-in 1s ease-out forwards;
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
      `}</style>
    </div>
  );
}
