"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Linkedin, Instagram, Twitter, Github } from "lucide-react";
import { Tooltip } from "./Tooltip";

const navItems = [
  { id: 1, icon: Home, label: "Home", href: "/" },
  { id: 2, icon: User, label: "About", href: "/about" },
  { id: 3, icon: Briefcase, label: "Projects", href: "/projects" },
  { id: 4, icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/raunak", external: true },
  { id: 5, icon: Instagram, label: "Instagram", href: "https://instagram.com/raunak", external: true },
  { id: 6, icon: Twitter, label: "Twitter", href: "https://twitter.com/raunak", external: true },
  { id: 7, icon: Github, label: "GitHub", href: "https://github.com/raunak", external: true },
];

export function CarouselNavigation() {
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
      <div className="bg-black/95 backdrop-blur-lg rounded-full p-4 flex items-center gap-1 shadow-2xl border border-white/20">
        {navItems.map((item) => (
          <Tooltip
            key={item.id}
            content={item.label}
            position="top"
            delay={200}
          >
            <motion.button
              onClick={() => handleNavigation(item)}
              className={`relative p-3 rounded-full transition-all duration-300 group
                ${active === item.id
                  ? 'bg-primary text-white scale-110'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
              whileHover={{
                y: -6,
                scale: active === item.id ? 1.1 : 1.05,
                transition: {
                  type: "tween",
                  duration: 0.15,
                  ease: "easeOut"
                }
              }}
              whileTap={{
                scale: active === item.id ? 1.05 : 0.95,
                y: -2,
                transition: { duration: 0.1 }
              }}
              initial={{ y: 0 }}
            >
              <item.icon className="w-5 h-5" />

              {active === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
