"use client";

import { Contact } from "@/components/sections/Contact";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

function ContactContent() {
  const { isNavVisible, toggleNavigation } = useNavigation();
  const isMobile = useIsMobile();

  // R key functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        toggleNavigation();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleNavigation]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Silk Background Layer */}
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
      <div className="relative z-10">
        <Contact />
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

export default function ContactPage() {
  return (
    <NavigationProvider>
      <ContactContent />
    </NavigationProvider>
  );
}
