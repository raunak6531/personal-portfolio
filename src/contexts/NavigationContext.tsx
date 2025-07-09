"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isNavVisible: boolean;
  toggleNavigation: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleNavigation = () => {
    setIsNavVisible(prev => !prev);
  };

  return (
    <NavigationContext.Provider value={{ isNavVisible, toggleNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
