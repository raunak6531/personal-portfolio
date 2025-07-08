"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";
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
];

function SkillSphere({ skill, position, index }: { skill: SkillItem; position: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      
      {hovered && (
        <Html distanceFactor={10} position={[0, 0.8, 0]}>
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap pointer-events-none">
            <div className="font-semibold">{skill.name}</div>
            <div className="text-xs opacity-80">{skill.level}% proficiency</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function SkillRing({ radius, skills, rotationSpeed }: { radius: number; skills: SkillItem[]; rotationSpeed: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <SkillSphere
            key={skill.name}
            skill={skill}
            position={[x, 0, z]}
            index={index}
          />
        );
      })}
      
      {/* Ring geometry */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 5, 8);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
      {/* Multiple rings */}
      <SkillRing radius={3} skills={skills.slice(0, 6)} rotationSpeed={0.2} />
      <SkillRing radius={5} skills={skills.slice(6)} rotationSpeed={-0.15} />
      
      {/* Center text */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        SKILLS
      </Text>
      
      {/* Particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
}

export function SkillsRingThree() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px]">
      {/* Loading overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-background/80 z-10"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
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
          <div className="flex space-x-1">
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

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 5, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>

      {/* Instructions */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <motion.p
          className="text-sm text-muted-foreground"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Hover over skills to learn more
        </motion.p>
      </motion.div>
    </div>
  );
}
