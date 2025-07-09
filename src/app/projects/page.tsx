"use client";

import { Projects } from "@/components/sections/Projects";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";

function ProjectsContent() {
  const { isNavVisible, toggleNavigation } = useNavigation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Projects />

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
