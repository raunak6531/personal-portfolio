"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SkillItem {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const skills: SkillItem[] = [
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
  { name: "Python", level: 82, color: "#3776AB", icon: "🐍" },
  { name: "Docker", level: 75, color: "#2496ED", icon: "🐳" },
  { name: "AWS", level: 78, color: "#FF9900", icon: "☁️" },
];



export function CircularSkills() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.2);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto" style={{ height: '400px' }}>
      {/* Circular skills display */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-80 h-80">

          {/* Center circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white/20">
              <span className="text-white font-bold text-sm">SKILLS</span>
            </div>
          </div>

          {/* Inner ring - rotating clockwise */}
          <motion.div
            className="absolute inset-0"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {skills.slice(0, 8).map((skill, index) => {
              const angle = (index * 360) / 8;
              const radius = 100;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={skill.name}
                  className="absolute w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg border border-white/20 transition-all duration-300 hover:scale-110"
                  style={{
                    left: `calc(50% + ${x}px - 24px)`,
                    top: `calc(50% + ${y}px - 24px)`,
                    background: `linear-gradient(135deg, ${skill.color}80, ${skill.color}40)`,
                  }}
                  title={skill.name}
                >
                  {skill.icon}
                </div>
              );
            })}
          </motion.div>

          {/* Outer ring - rotating counter-clockwise */}
          <motion.div
            className="absolute inset-0"
            style={{ transform: `rotate(${-rotation * 0.7}deg)` }}
          >
            {skills.slice(8, 15).map((skill, index) => {
              const angle = (index * 360) / 7;
              const radius = 140;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;

              return (
                <div
                  key={skill.name}
                  className="absolute w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border border-white/20 transition-all duration-300 hover:scale-110"
                  style={{
                    left: `calc(50% + ${x}px - 20px)`,
                    top: `calc(50% + ${y}px - 20px)`,
                    background: `linear-gradient(135deg, ${skill.color}80, ${skill.color}40)`,
                  }}
                  title={skill.name}
                >
                  {skill.icon}
                </div>
              );
            })}
          </motion.div>

          {/* Ring borders */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-52 h-52 border border-white/10 rounded-full"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 h-72 border border-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
