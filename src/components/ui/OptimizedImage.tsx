"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallback?: string;
  containerClassName?: string;
}

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallback = "/api/placeholder/400/300",
  ...props 
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-secondary/50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={hasError ? fallback : src}
          alt={alt}
          className={cn("transition-all duration-300", className)}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </motion.div>
    </div>
  );
}
