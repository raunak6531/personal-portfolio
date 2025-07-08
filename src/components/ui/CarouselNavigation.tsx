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
  { id: 4, icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", external: true },
  { id: 5, icon: Instagram, label: "Instagram", href: "https://instagram.com", external: true },
  { id: 6, icon: Twitter, label: "Twitter", href: "https://twitter.com", external: true },
  { id: 7, icon: Github, label: "GitHub", href: "https://github.com", external: true },
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
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-md rounded-full p-4 flex gap-3 shadow-xl border border-border">
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
                ? 'bg-primary/20 scale-125 text-primary'
                : 'bg-muted/20 hover:bg-accent hover:text-accent-foreground text-muted-foreground'
              }
            `}
            whileHover={{
              y: -6,
              scale: active === item.id ? 1.25 : 1.08,
              transition: {
                type: "tween",
                duration: 0.15,
                ease: "easeOut"
              }
            }}
            whileTap={{
              scale: active === item.id ? 1.15 : 0.95,
              y: -2,
              transition: { duration: 0.1 }
            }}
            initial={{ y: 0 }}
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
            }}
            animate={{
              filter: active === item.id
                ? "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))"
                : "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))"
            }}
          >
            <motion.div
              whileHover={{
                filter: "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))",
                transition: { duration: 0.15, ease: "easeOut" }
              }}
            >
              <item.icon className={`transition-all duration-300 ${active === item.id ? 'text-xl' : 'text-lg'}`} />
            </motion.div>

            {active === item.id && (
              <span className="absolute inset-0 rounded-full border-2 border-primary/40"></span>
            )}
          </motion.button>
        </Tooltip>
      ))}
    </div>
  );
}
