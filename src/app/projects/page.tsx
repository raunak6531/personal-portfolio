"use client";

import { Projects } from "@/components/sections/Projects";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import dynamic from "next/dynamic";
import "@/styles/projects.css";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

function ProjectsContent() {
  const { isNavVisible, toggleNavigation } = useNavigation();

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
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
      <div className="relative z-10">
        <Projects />
      </div>

      {/* Personal Logo */}
      <div className="fixed top-8 left-8 z-20">
        <PersonalLogo
          size="md"
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
