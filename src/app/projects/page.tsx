"use client";

import { Projects } from "@/components/sections/Projects";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "@/styles/projects.css";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

function ProjectsContent() {
  const { isNavVisible, toggleNavigation } = useNavigation();
  const isMobile = useIsMobile();

  // R key functionality and mobile scroll setup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        toggleNavigation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Enable scrolling on mobile for projects page only
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    if (isMobile) {
      htmlElement.style.overflow = 'auto';
      bodyElement.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);

      // Restore overflow when leaving projects page
      if (isMobile) {
        htmlElement.style.overflow = '';
        bodyElement.style.overflow = '';
      }
    };
  }, [toggleNavigation, isMobile]);

  return (
    <div className={`min-h-screen bg-background text-white relative overflow-x-hidden ${
      isMobile ? 'overflow-y-auto' : ''
    }`}>
      {/* Silk Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Silk
          speed={2}
          scale={0.8}
          color="#1a1a2e"
          noiseIntensity={0.8}
          rotation={0.1}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8">
        <Projects />
      </div>

      {/* Personal Logo - Responsive positioning and sizing */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8 z-20">
        <PersonalLogo
          size={isMobile ? "sm" : "md"}
          onClick={toggleNavigation}
          isToggled={!isNavVisible}
        />
      </div>

      <CarouselNavigation isVisible={isNavVisible} />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <NavigationProvider>
      <ProjectsContent />
    </NavigationProvider>
  );
}
