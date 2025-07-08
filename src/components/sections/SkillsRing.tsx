"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: "React", level: 95, color: "#61DAFB", icon: "⚛️" },
  { name: "TypeScript", level: 90, color: "#3178C6", icon: "📘" },
  { name: "Next.js", level: 88, color: "#000000", icon: "▲" },
  { name: "JavaScript", level: 92, color: "#F7DF1E", icon: "🟨" },
  { name: "CSS/SCSS", level: 85, color: "#1572B6", icon: "🎨" },
  { name: "Tailwind", level: 90, color: "#06B6D4", icon: "💨" },
  { name: "Node.js", level: 80, color: "#339933", icon: "🟢" },
  { name: "Git", level: 85, color: "#F05032", icon: "📦" },
  { name: "Figma", level: 75, color: "#F24E1E", icon: "🎯" },
  { name: "Three.js", level: 70, color: "#000000", icon: "🎲" },
  { name: "GSAP", level: 78, color: "#88CE02", icon: "⚡" },
  { name: "MongoDB", level: 72, color: "#47A248", icon: "🍃" },
];

export function SkillsRing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate the ring
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const radius = 200;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      {/* Loading Animation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-2xl font-bold text-muted-foreground">
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Skills...
          </motion.span>
        </div>
      </motion.div>

      {/* Skills Ring */}
      <motion.div
        ref={containerRef}
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.5 }}
        transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {/* Center Circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: isVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "backOut" }}
        >
          <span className="text-2xl font-bold text-white">Skills</span>
        </motion.div>

        {/* Skill Items */}
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          return (
            <motion.div
              key={skill.name}
              className="absolute group cursor-pointer"
              style={{
                left: x - 40,
                top: y - 40,
                transform: `rotate(-${rotation}deg)`, // Counter-rotate to keep text upright
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isVisible ? 1 : 0, 
                opacity: isVisible ? 1 : 0 
              }}
              transition={{ 
                duration: 0.6, 
                delay: 1.2 + index * 0.1, 
                ease: "backOut" 
              }}
              whileHover={{ 
                scale: 1.2, 
                zIndex: 10,
                transition: { duration: 0.2 }
              }}
            >
              {/* Skill Circle */}
              <div 
                className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-semibold shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`,
                }}
              >
                <span className="text-lg">{skill.icon}</span>
                <span className="text-xs mt-1">{skill.level}%</span>
              </div>

              {/* Skill Name Tooltip */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                {skill.name}
              </motion.div>

              {/* Connecting Line */}
              <div
                className="absolute top-1/2 left-1/2 origin-left h-0.5 bg-gradient-to-r from-white/30 to-transparent opacity-20 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                  width: `${radius * 0.3}px`,
                  transform: `translate(-50%, -50%) rotate(${angle * (180 / Math.PI) + 180}deg)`,
                }}
              />
            </motion.div>
          );
        })}

        {/* Outer Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white/10 rounded-full"
          style={{
            width: radius * 2 + 80,
            height: radius * 2 + 80,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 0.3 : 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
          style={{
            width: radius * 1.2,
            height: radius * 1.2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 0.2 : 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      {/* Interaction Hint */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 2.5 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hover to explore skills
        </motion.span>
      </motion.div>
    </div>
  );
}
