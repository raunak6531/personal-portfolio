"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  contentClassName?: string;
  disabled?: boolean;
}

export function Tooltip({
  children,
  content,
  position = 'top',
  delay = 300,
  className,
  contentClassName,
  disabled = false,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState<TooltipPosition>(position);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate optimal position after showing
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let newPosition = position;

    // Check if tooltip fits in the preferred position
    switch (position) {
      case 'top':
        if (triggerRect.top - tooltipRect.height < 60) {
          newPosition = 'bottom';
        }
        break;
      case 'bottom':
        if (triggerRect.bottom + tooltipRect.height > viewport.height - 60) {
          newPosition = 'top';
        }
        break;
      case 'left':
        if (triggerRect.left - tooltipRect.width < 20) {
          newPosition = 'right';
        }
        break;
      case 'right':
        if (triggerRect.right + tooltipRect.width > viewport.width - 20) {
          newPosition = 'left';
        }
        break;
    }

    setActualPosition(newPosition);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionClasses = () => {
    const baseClasses = 'absolute z-[9999] pointer-events-none';

    switch (actualPosition) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-4`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-4`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-4`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-4`;
      default:
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-4`;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = 'absolute w-2 h-2 bg-black/90 border border-white/20 transform rotate-45';

    switch (actualPosition) {
      case 'top':
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -translate-y-1/2`;
      case 'bottom':
        return `${baseClasses} bottom-full left-1/2 -translate-x-1/2 translate-y-1/2`;
      case 'left':
        return `${baseClasses} left-full top-1/2 -translate-x-1/2 -translate-y-1/2`;
      case 'right':
        return `${baseClasses} right-full top-1/2 translate-x-1/2 -translate-y-1/2`;
      default:
        return `${baseClasses} top-full left-1/2 -translate-x-1/2 -translate-y-1/2`;
    }
  };

  const getAnimationVariants = () => {
    const baseVariants = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    };

    switch (actualPosition) {
      case 'top':
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: 10 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: 10 },
        };
      case 'bottom':
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, y: -10 },
          animate: { ...baseVariants.animate, y: 0 },
          exit: { ...baseVariants.exit, y: -10 },
        };
      case 'left':
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: 10 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: 10 },
        };
      case 'right':
        return {
          ...baseVariants,
          initial: { ...baseVariants.initial, x: -10 },
          animate: { ...baseVariants.animate, x: 0 },
          exit: { ...baseVariants.exit, x: -10 },
        };
      default:
        return baseVariants;
    }
  };

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block bg-transparent border-none outline-none tooltip-container', className)}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      style={{ background: 'transparent', border: 'none', outline: 'none' }}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            className={getPositionClasses()}
            variants={getAnimationVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div
              className={cn(
                'px-4 py-2 text-sm font-medium text-white bg-black/90 border border-white/20 rounded-lg shadow-xl backdrop-blur-md',
                'max-w-xs break-words whitespace-nowrap',
                contentClassName
              )}
              style={{
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {content}
            </div>
            <div className={getArrowClasses()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Alternative implementation using peer-hover for simpler cases
interface SimpleTooltipProps {
  children: React.ReactNode;
  content: string;
  position?: TooltipPosition;
  className?: string;
}

export function SimpleTooltip({
  children,
  content,
  position = 'top',
  className,
}: SimpleTooltipProps) {
  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-4';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-4';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-4';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-4';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-4';
    }
  };

  return (
    <div className={cn('relative inline-block group bg-transparent border-none outline-none tooltip-container', className)} style={{ background: 'transparent', border: 'none', outline: 'none' }}>
      <div className="peer bg-transparent border-none outline-none tooltip-container" style={{ background: 'transparent', border: 'none', outline: 'none' }}>{children}</div>
      <div
        className={cn(
          'absolute z-50 px-3 py-2 text-sm font-medium text-popover-foreground bg-popover border border-border rounded-lg shadow-lg',
          'opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out',
          'pointer-events-none whitespace-nowrap backdrop-blur-sm',
          getPositionClasses()
        )}
      >
        {content}
      </div>
    </div>
  );
}
