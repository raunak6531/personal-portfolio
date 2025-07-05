"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CarouselNavigation } from "@/components/ui/CarouselNavigation";

export function Hero() {

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Colorful animated lines */}
        <motion.div
          className="absolute top-20 left-1/4 w-1 h-32 bg-gradient-to-b from-purple-500 to-transparent"
          animate={{
            rotate: [0, 45, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-1 h-24 bg-gradient-to-b from-blue-500 to-transparent"
          animate={{
            rotate: [0, -30, 0],
            opacity: [0.4, 0.9, 0.4],
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
          animate={{
            rotate: [0, 60, 0],
            opacity: [0.2, 0.7, 0.2],
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
          animate={{
            rotate: [0, -45, 0],
            opacity: [0.3, 0.6, 0.3],
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
          animate={{
            rotate: [0, 30, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-12">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Hello World,
              <br />
              <span className="text-gray-300">I am Tech Nerd</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Front-end Web Developer with 4 years of experience in building
              beautiful and modern frameworks. Passionate about design, exploring
              new techniques, and contributing to open-source projects.
            </motion.p>
          </motion.div>

          {/* Know Me Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => window.location.href = "/about"}
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:scale-105"
            >
              Know Me
            </Button>
          </motion.div>

          {/* Carousel Navigation Menu */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CarouselNavigation />
          </motion.div>




        </div>
      </div>
    </section>
  );
}
