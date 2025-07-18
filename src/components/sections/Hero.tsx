"use client";

import { motion } from "framer-motion";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { PersonalLogo } from "@/components/ui/PersonalLogo";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import SplitText from "@/components/ui/SplitText";
import { NavigationProvider, useNavigation } from "@/contexts/NavigationContext";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

function HeroContent() {
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
    <section id="home" className="h-screen relative overflow-hidden bg-background">
      {/* Silk Background - Absolutely positioned with z-0 */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Silk
          speed={2}
          scale={0.8}
          color="#1a1a2e"
          noiseIntensity={0.8}
          rotation={0.1}
        />
      </div>

      {/* Enhanced Animated background elements - Hidden on mobile for performance */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Dynamic colorful animated lines */}
          <motion.div
            className="absolute top-20 left-1/4 w-1 h-32 bg-gradient-to-b from-purple-500 to-transparent"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 45, 0],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-1 h-24 bg-gradient-to-b from-blue-500 to-transparent"
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              rotate: [0, -30, 0],
              x: [100, 0, 100],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-20 bg-gradient-to-b from-green-500 to-transparent"
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 60, 0],
            y: [-50, 0, -50],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-1 h-16 bg-gradient-to-b from-yellow-500 to-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, -45, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-1 h-28 bg-gradient-to-b from-pink-500 to-transparent"
          initial={{ opacity: 0, rotate: 90 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            rotate: [90, 30, 90],
            scale: [0.8, 1.1, 0.8],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-orange-400 rounded-full"
          animate={{
            x: [0, 40, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        </div>
      )}

      {/* Main Hero Content - Mobile-first responsive design */}
      <div className="flex items-center justify-center text-center h-full relative z-10">
        <div className="px-6 sm:px-8 md:px-12 lg:px-24 max-w-4xl mx-auto">
          {/* Main Content with Split Text Only */}
          <div className="space-y-6 md:space-y-8">
            {/* Animated Heading */}
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight hero-text">
              <SplitText
                text="Hey I'm Raunak,"
                className="block"
                splitType="chars"
                delay={50}
                duration={0.8}
                from={{ opacity: 0, y: 100, rotationX: -90 }}
                to={{ opacity: 1, y: 0, rotationX: 0 }}
                ease="back.out(1.7)"
                triggerOnMount={true}
                animationDelay={0.5}
              />
              {isMobile ? (
                <div className="block text-muted-foreground mt-2 text-lg sm:text-xl leading-tight hero-subtitle px-4">
                  <SplitText
                    text="your friendly"
                    className="inline"
                    splitType="chars"
                    delay={30}
                    duration={0.6}
                    from={{ opacity: 0, scale: 0, rotation: 180 }}
                    to={{ opacity: 1, scale: 1, rotation: 0 }}
                    ease="elastic.out(1, 0.3)"
                    triggerOnMount={true}
                    animationDelay={1.2}
                  />
                  <br />
                  <SplitText
                    text="neighbourhood developer"
                    className="inline"
                    splitType="chars"
                    delay={30}
                    duration={0.6}
                    from={{ opacity: 0, scale: 0, rotation: 180 }}
                    to={{ opacity: 1, scale: 1, rotation: 0 }}
                    ease="elastic.out(1, 0.3)"
                    triggerOnMount={true}
                    animationDelay={1.4}
                  />
                </div>
              ) : (
                <div className="block text-muted-foreground mt-2 text-2xl md:text-3xl lg:text-4xl leading-tight hero-subtitle">
                  <SplitText
                    text="your friendly neighbourhood developer"
                    className="inline"
                    splitType="chars"
                    delay={30}
                    duration={0.6}
                    from={{ opacity: 0, scale: 0, rotation: 180 }}
                    to={{ opacity: 1, scale: 1, rotation: 0 }}
                    ease="elastic.out(1, 0.3)"
                    triggerOnMount={true}
                    animationDelay={1.2}
                  />
                </div>
              )}
            </div>

            {/* Animated Description */}
            <div className="px-4 sm:px-0">
              <SplitText
                text="Front-end developer by day, UI wizard by night. I indulge in crafting snappy interfaces turning caffeine and code into pixel-perfect experiences. Bonus: I speak fluent React and sarcasm."
                className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed hero-text max-w-3xl mx-auto"
                splitType="words"
                delay={isMobile ? 30 : 20}
                duration={0.5}
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                ease="power2.out"
                triggerOnMount={true}
                animationDelay={2.0}
              />
            </div>
          </div>

          {/* Animated Resume Button - Centered with responsive padding and font sizes */}
          <div className="flex justify-center mt-8 md:mt-12">
            <AnimatedButton
              href="/finalresume.pdf"
              download={true}
              downloadFileName="Raunak_Resume.pdf"
              className="text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-3 sm:py-4"
            >
              Resume
            </AnimatedButton>
          </div>
        </div>
      </div>

      {/* Personal Logo - Responsive size using useIsMobile hook */}
      <div className="fixed top-6 sm:top-8 left-6 sm:left-8 z-20">
        <PersonalLogo
          size={isMobile ? "sm" : "md"}
          onClick={toggleNavigation}
          isToggled={!isNavVisible}
        />
      </div>

      {/* CarouselNavigation - Below content with proper margin */}
      <div className="mt-12 md:mt-16">
        <CarouselNavigation isVisible={isNavVisible} />
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <NavigationProvider>
      <HeroContent />
    </NavigationProvider>
  );
}
