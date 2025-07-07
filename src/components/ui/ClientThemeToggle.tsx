"use client";

import dynamic from 'next/dynamic';

// Dynamically import ThemeToggle with no SSR to avoid hydration issues
const ThemeToggle = dynamic(() => import('./ThemeToggle').then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => null,
});

export function ClientThemeToggle() {
  return <ThemeToggle />;
}
