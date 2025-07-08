"use client";

import { motion } from "framer-motion";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";
import { SkillsRingThree } from "@/components/sections/SkillsRingThree";
import SplitText from "@/components/ui/SplitText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import dynamic from "next/dynamic";

// Dynamically import Silk to avoid SSR issues with Three.js
const Silk = dynamic(() => import("@/components/ui/Silk"), { ssr: false });

export default function About() {
  return (
    <div className="h-screen overflow-hidden">
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-background">
        {/* Subtle Silk Background */}
        <div className="absolute inset-0 opacity-20">
          <Silk
            speed={1.5}
            scale={0.6}
            color="#1a1a2e"
            noiseIntensity={0.6}
            rotation={0.05}
          />
        </div>

        {/* Enhanced Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-1/4 left-1/6 w-2 h-20 bg-gradient-to-b from-blue-500/30 to-transparent"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/5 w-2 h-16 bg-gradient-to-b from-purple-500/30 to-transparent"
            animate={{
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, -180, -360],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">

            {/* Left Side - Text Content */}
            <div className="space-y-8 text-left">
              {/* Animated Title */}
              <div>
                <SplitText
                  text="About Me"
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground"
                  splitType="chars"
                  delay={50}
                  duration={0.8}
                  from={{ opacity: 0, y: 100, rotationX: -90 }}
                  to={{ opacity: 1, y: 0, rotationX: 0 }}
                  ease="back.out(1.7)"
                  triggerOnMount={true}
                  animationDelay={0.3}
                />
              </div>

              {/* Bio Text */}
              <div className="space-y-6">
                <SplitText
                  text="I'm Raunak, a passionate front-end developer who transforms ideas into stunning digital experiences. With a keen eye for design and a love for clean code, I create interfaces that not only look beautiful but feel intuitive."
                  className="text-lg text-muted-foreground leading-relaxed"
                  splitType="words"
                  delay={15}
                  duration={0.4}
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                  ease="power2.out"
                  triggerOnMount={true}
                  animationDelay={1.5}
                />

                <SplitText
                  text="When I'm not crafting pixel-perfect interfaces, you'll find me exploring the latest web technologies, contributing to open-source projects, or enjoying a good cup of coffee while debugging the mysteries of JavaScript."
                  className="text-lg text-muted-foreground leading-relaxed"
                  splitType="words"
                  delay={15}
                  duration={0.4}
                  from={{ opacity: 0, y: 20 }}
                  to={{ opacity: 1, y: 0 }}
                  ease="power2.out"
                  triggerOnMount={true}
                  animationDelay={2.5}
                />
              </div>

              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-3 gap-6 py-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Projects Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </motion.div>

              {/* Contact Button */}
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.5, duration: 0.6, ease: "backOut" }}
              >
                <AnimatedButton
                  onClick={() => window.location.href = "mailto:your.email@example.com"}
                >
                  Get In Touch
                </AnimatedButton>
              </motion.div>
            </div>

            {/* Right Side - Skills Ring */}
            <div className="relative flex items-center justify-center">
              <SkillsRingThree />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <CarouselNavigation />
      </section>
    </div>
  );
}
