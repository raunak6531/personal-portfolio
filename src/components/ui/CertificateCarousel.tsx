"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  year: string;
  description: string;
  pdfPath: string;
  color: string;
}

interface CertificateCarouselProps {
  certificates: Certificate[];
}

// Color gradients for different certificate types
const colorGradients = {
  blue: {
    primary: "#3B82F6",
    secondary: "#60A5FA",
    wave1: "#6366F1",
    wave2: "#8B5CF6",
    wave3: "#A855F7"
  },
  green: {
    primary: "#10B981",
    secondary: "#34D399",
    wave1: "#059669",
    wave2: "#047857",
    wave3: "#065F46"
  },
  purple: {
    primary: "#8B5CF6",
    secondary: "#A78BFA",
    wave1: "#7C3AED",
    wave2: "#6D28D9",
    wave3: "#5B21B6"
  },
  red: {
    primary: "#EF4444",
    secondary: "#F87171",
    wave1: "#DC2626",
    wave2: "#B91C1C",
    wave3: "#991B1B"
  }
};

// Certificate icons mapping
const certificateIcons = {
  blue: ["🎓", "🔒", "☁️"],
  green: ["💻", "🏛️"],
  purple: ["📱", "⚙️"],
  red: ["🍷", "🍇"]
};

const getCertificateIcon = (id: number, color: string) => {
  const icons = certificateIcons[color as keyof typeof certificateIcons];
  return icons[(id - 1) % icons.length];
};

export function CertificateCarousel({ certificates }: CertificateCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="certificate-carousel w-full overflow-hidden py-12">
      {/* Infinite Marquee Container */}
      <div className="relative">
        <div
          className={`flex gap-8 ${isPaused ? 'animate-marquee-paused' : 'animate-marquee'}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* First set of certificates */}
          {certificates.map((certificate) => (
            <CertificateCard key={`first-${certificate.id}`} certificate={certificate} />
          ))}
          {/* Duplicate set for seamless loop */}
          {certificates.map((certificate) => (
            <CertificateCard key={`second-${certificate.id}`} certificate={certificate} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface CertificateCardProps {
  certificate: Certificate;
}

function CertificateCard({ certificate }: CertificateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  
  const colors = colorGradients[certificate.color as keyof typeof colorGradients] || colorGradients.blue;
  const icon = getCertificateIcon(certificate.id, certificate.color);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const xDeg = (y - 0.5) * 8;
    const yDeg = (x - 0.5) * -8;
    
    cardRef.current.style.transform = `perspective(1200px) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    
    // Apply parallax to layers
    const layers = cardRef.current.querySelectorAll('.card-layer');
    layers.forEach((layer, index) => {
      const depth = 30 * (index + 1);
      const offsetX = (x - 0.5) * 10 * (index + 1);
      const offsetY = (y - 0.5) * 10 * (index + 1);
      (layer as HTMLElement).style.transform = `translate3d(${offsetX}px, ${offsetY}px, ${depth}px)`;
    });

    // Apply wave animation
    const waveSvg = cardRef.current.querySelector('.wave-svg') as HTMLElement;
    if (waveSvg) {
      const moveX = (x - 0.5) * -20;
      const moveY = (y - 0.5) * -20;
      waveSvg.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;

    setIsHovered(false);
    cardRef.current.style.transform = '';

    const layers = cardRef.current.querySelectorAll('.card-layer');
    layers.forEach((layer) => {
      (layer as HTMLElement).style.transform = '';
    });

    const waveSvg = cardRef.current.querySelector('.wave-svg') as HTMLElement;
    if (waveSvg) {
      waveSvg.style.transform = '';
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    window.open(certificate.pdfPath, '_blank');
  };

  return (
    <motion.article
      ref={cardRef}
      className="deconstructed-card relative w-80 h-96 flex-shrink-0 overflow-hidden rounded-lg"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Image Layer */}
      <div className="card-layer absolute inset-0 overflow-hidden z-10">
        <svg className="wave-svg w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${certificate.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
            <linearGradient id={`wave1-${certificate.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.wave1} />
              <stop offset="50%" stopColor={colors.wave2} />
              <stop offset="100%" stopColor={colors.wave1} />
            </linearGradient>
            <linearGradient id={`wave2-${certificate.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.wave2} />
              <stop offset="50%" stopColor={colors.wave3} />
              <stop offset="100%" stopColor={colors.wave2} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#gradient-${certificate.id})`} />
          <path 
            d="M0,230 C30,220 60,240 90,230 C120,220 150,240 180,230 C210,220 240,240 270,230 C290,225 295,230 300,225 L300,400 L0,400 Z" 
            fill={`url(#wave1-${certificate.id})`} 
            opacity="0.8" 
          />
          <path 
            d="M0,260 C40,250 80,270 120,260 C160,250 200,270 240,260 C280,250 290,260 300,255 L300,400 L0,400 Z" 
            fill={`url(#wave2-${certificate.id})`} 
            opacity="0.9" 
          />
          <path 
            d="M0,290 C50,280 100,300 150,290 C200,280 250,300 300,290 L300,400 L0,400 Z" 
            fill="rgba(255,255,255,0.2)" 
            opacity="0.7" 
          />
        </svg>
      </div>

      {/* Frame Layer */}
      <div className="card-layer absolute inset-0 z-30 pointer-events-none">
        <svg viewBox="0 0 300 400" preserveAspectRatio="none" className="w-full h-full">
          <path
            className="frame-path"
            d="M 20,20 H 280 V 380 H 20 Z"
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="2"
            strokeDasharray="1520"
            style={{
              strokeDashoffset: isHovered ? 0 : 1520,
              transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </svg>
      </div>

      {/* Content Layer */}
      <div className="card-layer absolute inset-0 z-20 p-6 flex flex-col text-white">
        {/* Header */}
        <div className="content-fragment flex-shrink-0">
          <div className="flex items-center gap-8 mb-4">
            <div className="w-1 h-8 bg-white transition-all duration-500"
                 style={{
                   transform: isHovered ? 'scaleY(1)' : 'scaleY(0.5)',
                   transformOrigin: 'top'
                 }} />
            <span className="text-xs font-mono uppercase tracking-wider transition-all duration-500"
                  style={{
                    transform: isHovered ? 'translateX(0)' : 'translateX(-5px)',
                    opacity: isHovered ? 1 : 0.6
                  }}>
              {certificate.issuer}
            </span>
          </div>
          <h2 className="text-2xl font-black leading-tight mb-2 transition-all duration-500"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                opacity: isHovered ? 1 : 0.7
              }}>
            {certificate.title.split(' ').slice(0, 2).join(' ')}
          </h2>
          <h3 className="text-sm font-medium transition-all duration-500"
              style={{
                transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                opacity: isHovered ? 1 : 0.5
              }}>
            {certificate.title.split(' ').slice(2).join(' ')} • {certificate.year}
          </h3>
        </div>

        {/* Icon */}
        <div className="flex justify-center items-center flex-1 min-h-0">
          <div className="text-4xl transition-all duration-500"
               style={{ opacity: isHovered ? 1 : 0.8 }}>
            {icon}
          </div>
        </div>

        {/* Description */}
        <div className="content-fragment flex-shrink-0 mb-4">
          <p className="text-sm leading-relaxed transition-all duration-500"
             style={{
               fontFamily: '"TheGoodMonolith", sans-serif',
               transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
               opacity: isHovered ? 1 : 0.6
             }}>
            {certificate.description}
          </p>
        </div>

        {/* CTA */}
        <div className="content-fragment flex-shrink-0 mt-auto">
          <div
            className="relative inline-block w-full cursor-pointer"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={handleButtonClick}
          >
            <div className={`absolute inset-0 bg-white rounded transition-all duration-500`}
                 style={{
                   transform: isButtonHovered ? 'scaleX(1)' : 'scaleX(0)',
                   transformOrigin: 'left'
                 }} />
            <span className={`relative block text-xs font-mono font-bold uppercase tracking-wider transition-all duration-500 px-4 py-2.5 text-center rounded ${
              isButtonHovered ? 'text-black' : 'text-white'
            }`}
                  style={{
                    transform: isHovered ? 'translateX(0)' : 'translateX(-5px)',
                    opacity: isHovered ? 1 : 0.7
                  }}>
              VIEW CERTIFICATE
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
