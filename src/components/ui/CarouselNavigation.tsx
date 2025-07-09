"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Linkedin, Instagram, Github } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { Tooltip } from "./Tooltip";

const navItems = [
  { id: 1, icon: Home, label: "Home", href: "/" },
  { id: 2, icon: User, label: "About", href: "/about" },
  { id: 3, icon: Briefcase, label: "Projects", href: "/projects" },
  { id: 4, icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/raunak-sadana-640518204/", external: true },
  { id: 5, icon: Instagram, label: "Instagram", href: "https://www.instagram.com/raunak6531/", external: true },
  { id: 6, icon: FaXTwitter, label: "Twitter", href: "https://x.com/raunak6531", external: true },
  { id: 7, icon: Github, label: "GitHub", href: "https://github.com/raunak6531", external: true },
];

interface CarouselNavigationProps {
  isVisible?: boolean;
}

export function CarouselNavigation({ isVisible = true }: CarouselNavigationProps) {
  const [active, setActive] = useState(1);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (item: typeof navItems[0]) => {
    setActive(item.id);
    if (item.external) {
      window.open(item.href, "_blank");
    } else {
      router.push(item.href);
    }
  };

  // Set active based on current pathname
  React.useEffect(() => {
    const currentItem = navItems.find(item => !item.external && item.href === pathname);
    if (currentItem) {
      setActive(currentItem.id);
    }
  }, [pathname]);

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="bg-black/90 backdrop-blur-xl rounded-full p-3 flex items-center gap-1 shadow-2xl border border-white/20 relative"
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            style={{
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
        {navItems.map((item) => (
          <Tooltip
            key={item.id}
            content={item.label}
            position="top"
            delay={200}
          >
            <motion.button
              onClick={() => handleNavigation(item)}
              className={`relative p-3 rounded-full transition-all duration-100 group overflow-hidden hover:-translate-y-2 active:translate-y-0 active:scale-95
                ${active === item.id
                  ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10 hover:scale-105'
                }
              `}
              whileTap={{
                scale: active === item.id ? 1.05 : 0.95,
                transition: { duration: 0.05 }
              }}
              style={{
                boxShadow: active === item.id
                  ? '0 8px 32px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                  : '0 4px 16px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Hover glow effect */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-white/25 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-75 scale-90 group-hover:scale-110"
              />

              {/* Icon */}
              <div
                className="relative z-10 group-hover:rotate-3 transition-transform duration-75"
              >
                <item.icon className="w-5 h-5" />
              </div>

              {/* Active state indicator */}
              {active === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/50"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                />
              )}

              {/* Pulse effect for active item */}
              {active === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-white/20"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              )}
            </motion.button>
          </Tooltip>
        ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
