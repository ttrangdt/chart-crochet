"use client";

import React, { useState } from "react";
import { ConfigProvider, theme } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BasketProvider } from "@/features/basket";
import { ProjectsProvider } from "@/features/projects";
import { ThemeProvider, useTheme, colorPrimaryMap } from "@/features/theme";

function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  const { theme: themeName, isDarkMode } = useTheme();
  const primaryColor = colorPrimaryMap[themeName] || "#E91E63";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
      {children}
    </ConfigProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AntdRegistry>
          <AntdConfigProvider>
            <BasketProvider>
              <ProjectsProvider>
                {children}
              </ProjectsProvider>
            </BasketProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
