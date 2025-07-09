"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  // Optimized mouse position update with requestAnimationFrame
  const updateMousePosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement;
    setIsHovering(true);

    // Set different cursor variants based on element type
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      setCursorVariant("button");
    } else if (target.tagName === 'A' || target.closest('a')) {
      setCursorVariant("link");
    } else if (target.closest('[data-cursor="text"]') || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      setCursorVariant("text");
    } else {
      setCursorVariant("hover");
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setCursorVariant("default");
  }, []);

  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    // Add event listeners for interactive elements with better selector
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, [data-cursor], .cursor-pointer'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Mouse events
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  // Only show on desktop
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.innerWidth >= 1024 && !('ontouchstart' in window));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (!isDesktop) return null;

  // Define cursor variants with sleek, classy styling
  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: "rgba(255, 255, 255, 0.85)", // subtle white for dark theme
      mixBlendMode: "normal" as const,
    },
    hover: {
      scale: 1.3, // smaller scale for subtlety
      backgroundColor: "rgba(255, 255, 255, 0.95)", // slightly brighter white on hover
      mixBlendMode: "normal" as const,
    },
    button: {
      scale: 1.4, // more subtle than before
      backgroundColor: "rgba(255, 255, 255, 0.9)", // clean white for buttons
      mixBlendMode: "normal" as const,
    },
    link: {
      scale: 1.2, // subtle scale for links
      backgroundColor: "rgba(255, 255, 255, 0.9)", // consistent white
      mixBlendMode: "normal" as const,
    },
    text: {
      scale: 0.9, // slightly smaller for text inputs
      backgroundColor: "rgba(255, 255, 255, 0.7)", // dimmed for text areas
      mixBlendMode: "normal" as const,
    },
  };

  const trailVariants = {
    default: { scale: 1, opacity: 0.15 },
    hover: { scale: 1.6, opacity: 0.25 }, // more subtle trail
    button: { scale: 1.8, opacity: 0.3 }, // reduced from 2.5
    link: { scale: 1.5, opacity: 0.2 }, // more elegant
    text: { scale: 1.2, opacity: 0.18 },
  };

  return (
    <>
      {/* Subtle outer glow effect */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-30"
        style={{
          background: `radial-gradient(circle, ${
            isHovering
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(255, 255, 255, 0.04)"
          } 0%, transparent 60%)`,
          borderRadius: "50%",
        }}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.2 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 25,
          backgroundColor: { duration: 0.4, ease: "easeInOut" },
        }}
      />

      {/* Main cursor with subtle effects */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-50"
        style={{
          backgroundColor: cursorVariants[cursorVariant as keyof typeof cursorVariants].backgroundColor,
          mixBlendMode: cursorVariants[cursorVariant as keyof typeof cursorVariants].mixBlendMode,
          boxShadow: isHovering
            ? `0 0 12px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 255, 255, 0.2)`
            : `0 0 8px rgba(255, 255, 255, 0.4), 0 0 16px rgba(255, 255, 255, 0.1)`,
        }}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isClicking ? 0.8 : cursorVariants[cursorVariant as keyof typeof cursorVariants].scale,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
          mass: 0.5,
          backgroundColor: { duration: 0.3, ease: "easeInOut" },
        }}
      />

      {/* Subtle trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-40"
        style={{
          borderColor: `rgba(255, 255, 255, 0.2)`,
          borderWidth: "1px",
          backdropFilter: "blur(0.5px)",
          background: `rgba(255, 255, 255, 0.015)`,
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isClicking ? 0.6 : trailVariants[cursorVariant as keyof typeof trailVariants].scale,
          opacity: trailVariants[cursorVariant as keyof typeof trailVariants].opacity,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.8,
          borderColor: { duration: 0.3, ease: "easeInOut" },
          background: { duration: 0.3, ease: "easeInOut" },
        }}
      />

      {/* Subtle click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-45"
          style={{
            background: `radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 60%)`,
            borderRadius: "50%",
          }}
          initial={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: mousePosition.x - 10,
            y: mousePosition.y - 10,
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        />
      )}
    </>
  );
}
