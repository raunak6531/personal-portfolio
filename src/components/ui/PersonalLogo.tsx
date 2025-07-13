"use client";

import { motion } from "framer-motion";

interface PersonalLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  isToggled?: boolean;
}

export function PersonalLogo({ className = "", size = 'md', onClick, isToggled = false }: PersonalLogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: isToggled ? 180 : 0
      }}
      transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <div className={`relative w-full h-full group cursor-pointer ${onClick ? 'hover:cursor-pointer' : ''}`}>
        {/* Outer ring with gradient border */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-white/10 to-transparent p-[1px] ${isToggled ? 'from-red-400/30 via-red-300/20' : ''}`}>
          <div className={`w-full h-full rounded-full bg-black/40 backdrop-blur-sm border ${isToggled ? 'border-red-400/30' : 'border-white/10'}`}>
            {/* Inner content */}
            <div className="w-full h-full rounded-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative overflow-hidden">
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
                <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 left-0.5 w-0.5 h-0.5 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              
              {/* Main logo - stylized 'R' */}
              <div 
                className={`${textSizes[size]} font-bold text-white/90 relative z-10 tracking-wider`}
                style={{ fontFamily: '"PP Neue Montreal", sans-serif' }}
              >
                R
              </div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
        
        {/* Subtle outer glow on hover */}
        <div className="absolute inset-0 rounded-full bg-white/10 blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
      </div>
    </motion.div>
  );
}
