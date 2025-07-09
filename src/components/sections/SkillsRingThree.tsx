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

function SkillOrb({ skill, index, radius, totalSkills, rotationOffset = 0 }: {
  skill: SkillItem;
  index: number;
  radius: number;
  totalSkills: number;
  rotationOffset?: number;
}) {
  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + (radius > 150 ? 0.3 : 0.5)); // Outer ring slower
    }, 50);
    return () => clearInterval(interval);
  }, [radius]);

  const angle = (index / totalSkills) * 2 * Math.PI + (rotation * Math.PI) / 180 + rotationOffset;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute group cursor-pointer"
      style={{
        left: `calc(50% + ${x}px - 30px)`,
        top: `calc(50% + ${y}px - 30px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "backOut" }}
      whileHover={{ scale: 1.2, zIndex: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-semibold shadow-lg relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)`,
          boxShadow: hovered
            ? `0 0 40px ${skill.color}88, 0 0 80px ${skill.color}44`
            : `0 0 20px ${skill.color}44, 0 0 40px ${skill.color}22`,
        }}
        animate={{
          y: Math.sin((rotation + index * 30) * Math.PI / 180) * 8,
          rotateY: hovered ? 360 : 0,
        }}
        transition={{
          rotateY: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        <span className="text-xl mb-1">{skill.icon}</span>
        <span className="text-xs font-bold">{skill.level}%</span>

        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${skill.color}66, transparent 70%)`,
          }}
          animate={{
            scale: hovered ? [1, 1.4, 1] : [1, 1.1, 1],
            opacity: hovered ? [0.6, 1, 0.6] : [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      </motion.div>

      {/* Tooltip */}
      <motion.div
        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded text-sm whitespace-nowrap pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 10
        }}
        transition={{ duration: 0.2 }}
      >
        {skill.name}
      </motion.div>
    </motion.div>
  );
}

export function SkillsRingThree() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const innerRingSkills = skills.slice(0, 6);
  const outerRingSkills = skills.slice(6);

  return (
    <div className="relative w-[500px] h-[500px] mx-auto">
      {/* Loading overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        style={{ pointerEvents: isLoaded ? 'none' : 'auto' }}
      >
        <div className="text-center">
          <motion.div
            className="text-2xl font-bold text-foreground mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading Skills...
          </motion.div>
          <div className="flex justify-center space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Skills Ring Container */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.5 }}
        transition={{ duration: 1, delay: 0.5, ease: "backOut" }}
      >
        {/* Center Circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-20"
          initial={{ scale: 0 }}
          animate={{ scale: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "backOut" }}
        >
          <span className="text-sm font-bold text-white">SKILLS</span>
        </motion.div>

        {/* Inner Ring */}
        {innerRingSkills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            index={index}
            radius={130}
            totalSkills={innerRingSkills.length}
            rotationOffset={0}
          />
        ))}

        {/* Outer Ring */}
        {outerRingSkills.map((skill, index) => (
          <SkillOrb
            key={skill.name}
            skill={skill}
            index={index}
            radius={200}
            totalSkills={outerRingSkills.length}
            rotationOffset={Math.PI} // Counter-rotate outer ring
          />
        ))}

        {/* Ring Borders with Animation */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/20 rounded-full"
          style={{ width: 280, height: 280 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isLoaded ? 1 : 0,
            opacity: isLoaded ? 1 : 0,
            rotate: 360
          }}
          transition={{
            scale: { duration: 1, delay: 0.8 },
            opacity: { duration: 1, delay: 0.8 },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
          style={{ width: 420, height: 420 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isLoaded ? 1 : 0,
            opacity: isLoaded ? 1 : 0,
            rotate: -360
          }}
          transition={{
            scale: { duration: 1, delay: 1 },
            opacity: { duration: 1, delay: 1 },
            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
          }}
        />

        {/* Connecting Lines */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 0.1 : 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-20 bg-gradient-to-r from-transparent via-white/20 to-transparent origin-bottom"
              style={{
                transform: `rotate(${i * 30}deg)`,
                top: -10,
                left: -1,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hover over skills to explore
        </motion.p>
      </motion.div>
    </div>
  );
}
