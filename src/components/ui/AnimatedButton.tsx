"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
  download?: boolean;
  downloadFileName?: string;
}

export function AnimatedButton({
  children,
  onClick,
  className,
  href,
  download = false,
  downloadFileName
}: AnimatedButtonProps) {
  const handleClick = () => {
    if (download && href) {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = href;
      link.download = downloadFileName || 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn("uiverse relative z-[100]", className)}
      style={{ minWidth: '160px', zIndex: 100 }}
    >
      <div className="wrapper">
        <span>{children}</span>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
        <div className="circle circle-6"></div>
        <div className="circle circle-7"></div>
        <div className="circle circle-8"></div>
        <div className="circle circle-9"></div>
        <div className="circle circle-10"></div>
        <div className="circle circle-11"></div>
        <div className="circle circle-12"></div>
      </div>
    </button>
  );
}
