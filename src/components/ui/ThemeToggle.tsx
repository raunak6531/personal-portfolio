"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Tooltip } from './Tooltip';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'floating' | 'inline';
  showTooltip?: boolean;
}

export function ThemeToggle({
  className,
  size = 'md',
  variant = 'floating',
  showTooltip = true,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center rounded-full',
    'bg-background/80 backdrop-blur-md border border-border',
    'hover:bg-accent hover:text-accent-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    'transition-all duration-300 ease-out',
    'shadow-lg hover:shadow-xl',
    sizeClasses[size]
  );

  const floatingClasses = variant === 'floating' 
    ? 'fixed top-6 right-6 z-50' 
    : '';

  const toggleButton = (
    <motion.button
      onClick={toggleTheme}
      className={cn(baseClasses, floatingClasses, className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'backOut' }}
    >
      {/* Background circle for smooth transition */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/10"
        initial={false}
        animate={{
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Icon container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Sun className={cn(iconSizes[size], 'text-yellow-500')} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Moon className={cn(iconSizes[size], 'text-blue-400')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary/20"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 0 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    </motion.button>
  );

  if (showTooltip) {
    return (
      <Tooltip
        content={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        position="left"
        delay={500}
      >
        {toggleButton}
      </Tooltip>
    );
  }

  return toggleButton;
}

// Alternative compact version for headers/navbars
export function CompactThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        'relative p-2 rounded-lg',
        'text-foreground hover:text-primary',
        'hover:bg-accent/50 transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {theme === 'dark' ? (
          <motion.div
            key="sun-compact"
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5" />
          </motion.div>
        ) : (
          <motion.div
            key="moon-compact"
            initial={{ opacity: 0, rotate: 180 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -180 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </motion.button>
  );
}
