"use client";

import { Skills } from "@/components/sections/Skills";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import dynamic from "next/dynamic";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

function SkillsContent() {
  const { isNavVisible, toggleNavigation } = useNavigation();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Silk Background Layer */}
      <div className="fixed inset-0 z-0 opacity-30">
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
        <Skills />
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

export default function SkillsPage() {
  return (
    <NavigationProvider>
      <SkillsContent />
    </NavigationProvider>
  );
}
