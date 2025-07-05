"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  User,
  Briefcase,
  Code,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Twitter
} from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "About", href: "/about" },
  { icon: Briefcase, label: "Projects", href: "/projects" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", external: true },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com", external: true },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com", external: true },
  { icon: Github, label: "GitHub", href: "https://github.com", external: true },
];

export function CarouselNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (item: typeof navigationItems[0]) => {
    if (item.external) {
      window.open(item.href, "_blank");
    } else {
      router.push(item.href);
    }
  };

  return (
    <div className="relative">
      {/* Main Navigation Container - Exact replica */}
      <motion.div
        className="bg-gray-800/95 backdrop-blur-md rounded-[2.5rem] px-8 py-5 shadow-2xl border border-gray-700/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-6">
          {navigationItems.map((item, index) => (
            <div key={item.label} className="relative">
              <motion.button
                onClick={() => handleNavigation(item)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative p-4 rounded-full transition-all duration-300 z-10 group"
                whileTap={{ scale: 0.9 }}
              >
                {/* Hover Background Circle - Exact match */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-gray-600/60 rounded-full scale-150"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                        duration: 0.3
                      }}
                      layoutId="hoverBg"
                    />
                  )}
                </AnimatePresence>

                {/* Icon */}
                <item.icon
                  className={`h-7 w-7 relative z-10 transition-all duration-300 ${
                    hoveredIndex === index
                      ? 'text-white scale-110'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                />

                {/* Active page indicator */}
                {!item.external && pathname === item.href && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                )}
              </motion.button>

              {/* Tooltip - Exact match */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-50"
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.25
                    }}
                  >
                    <div className="bg-gray-900/95 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-xl shadow-xl border border-gray-700/30 whitespace-nowrap">
                      {item.label}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
