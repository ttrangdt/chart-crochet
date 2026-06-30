"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BasketProvider } from "./BasketContext";
import { ProjectsProvider } from "./projects/ProjectsContext";

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

const colorPrimaryMap: Record<ThemeName, string> = {
  pink: "#E91E63",
  matcha: "#2E7D32",
  blueberry: "#9C27B0",
  lemon: "#FBC02D",
  dark: "#ff609a",
};

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [themeName, setThemeState] = useState<ThemeName>("pink");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-mood") as ThemeName;
    if (savedTheme && ["pink", "matcha", "blueberry", "lemon", "dark"].includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const savedDark = localStorage.getItem("theme");
      const initialTheme = savedDark === "dark" ? "dark" : "pink";
      setThemeState(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
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

  const primaryColor = colorPrimaryMap[themeName] || "#E91E63";

  return (
    <ThemeContext.Provider value={{ theme: themeName, setTheme, isDarkMode, toggleTheme }}>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              algorithm: isDarkMode
                ? theme.darkAlgorithm
                : theme.defaultAlgorithm,
              token: {
                colorPrimary: primaryColor,
                fontFamily: "inherit",
                borderRadius: 12,
              },
              components: {
                Button: {
                  borderRadius: 20,
                },
                Menu: {
                  itemHoverColor: primaryColor,
                  itemSelectedColor: primaryColor,
                  horizontalItemSelectedColor: primaryColor,
                },
                Card: {
                  colorBgContainer: "var(--bg-card)",
                },
              },
            }}
          >
            <BasketProvider>
              <ProjectsProvider>
                {children}
              </ProjectsProvider>
            </BasketProvider>
          </ConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </ThemeContext.Provider>
  );
}
