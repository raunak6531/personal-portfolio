"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
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
  defaultTheme?: Theme;
}

export function ThemeProvider({ children, defaultTheme = 'dark' }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch by only setting theme after mount
  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    const initialTheme = savedTheme || systemTheme;
    setThemeState(initialTheme);
    
    // Apply theme to document
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(newTheme);
    
    // Update CSS custom properties
    if (newTheme === 'light') {
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '0 0% 3.9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '0 0% 3.9%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '0 0% 3.9%');
      root.style.setProperty('--primary', '221.2 83.2% 53.3%');
      root.style.setProperty('--primary-foreground', '210 40% 98%');
      root.style.setProperty('--secondary', '210 40% 96%');
      root.style.setProperty('--secondary-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--muted', '210 40% 96%');
      root.style.setProperty('--muted-foreground', '215.4 16.3% 46.9%');
      root.style.setProperty('--accent', '210 40% 96%');
      root.style.setProperty('--accent-foreground', '222.2 84% 4.9%');
      root.style.setProperty('--destructive', '0 84.2% 60.2%');
      root.style.setProperty('--destructive-foreground', '210 40% 98%');
      root.style.setProperty('--border', '214.3 31.8% 91.4%');
      root.style.setProperty('--input', '214.3 31.8% 91.4%');
      root.style.setProperty('--ring', '221.2 83.2% 53.3%');
    } else {
      // Dark theme (default values)
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
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  const value = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
