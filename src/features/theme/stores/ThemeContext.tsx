"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeName = "pink" | "matcha" | "blueberry" | "lemon" | "dark";

type ThemeContextType = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

export const colorPrimaryMap: Record<ThemeName, string> = {
  pink: "#E91E63",
  matcha: "#2E7D32",
  blueberry: "#9C27B0",
  lemon: "#FBC02D",
  dark: "#ff609a",
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeState] = useState<ThemeName>("pink");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme-mood") as ThemeName;
      if (savedTheme && ["pink", "matcha", "blueberry", "lemon", "dark"].includes(savedTheme)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else {
        const savedDark = localStorage.getItem("theme");
        const initialTheme = savedDark === "dark" ? "dark" : "pink";
        setThemeState(initialTheme);
        document.documentElement.setAttribute("data-theme", initialTheme);
      }
    } catch {
      // ignore
    }
  }, []);

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem("theme-mood", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const isDarkMode = themeName === "dark";
  const toggleTheme = () => {
    setTheme(themeName === "dark" ? "pink" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
