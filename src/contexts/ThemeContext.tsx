"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark';

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch by only setting theme after mount
  useEffect(() => {
    setMounted(true);

    // Apply dark theme to document
    applyTheme('dark');
  }, []);

  const applyTheme = (_newTheme: Theme) => {
    const root = document.documentElement;

    // Remove existing theme classes and add dark
    root.classList.remove('light', 'dark');
    root.classList.add('dark');

    // Apply dark theme CSS custom properties
    root.style.setProperty('--background', '0 0% 0%');
    root.style.setProperty('--foreground', '0 0% 100%');
    root.style.setProperty('--card', '0 0% 5%');
    root.style.setProperty('--card-foreground', '0 0% 100%');
    root.style.setProperty('--popover', '0 0% 5%');
    root.style.setProperty('--popover-foreground', '0 0% 100%');
    root.style.setProperty('--primary', '221.2 83.2% 53.3%');
    root.style.setProperty('--primary-foreground', '210 40% 98%');
    root.style.setProperty('--secondary', '0 0% 10%');
    root.style.setProperty('--secondary-foreground', '0 0% 100%');
    root.style.setProperty('--muted', '0 0% 15%');
    root.style.setProperty('--muted-foreground', '0 0% 60%');
    root.style.setProperty('--accent', '0 0% 15%');
    root.style.setProperty('--accent-foreground', '0 0% 100%');
    root.style.setProperty('--destructive', '0 84.2% 60.2%');
    root.style.setProperty('--destructive-foreground', '210 40% 98%');
    root.style.setProperty('--border', '0 0% 20%');
    root.style.setProperty('--input', '0 0% 15%');
    root.style.setProperty('--ring', '221.2 83.2% 53.3%');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  const value = {
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
