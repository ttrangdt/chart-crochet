"use client";

import React, { useState } from "react";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#F8BBD0",     // Hồng hoa anh đào
              colorTextBase: "#5D4037",    // Nâu gỗ trầm
              colorBgContainer: "#ffffff",
              fontFamily: "inherit",
              borderRadius: 8,
            },
            components: {
              Button: {
                colorPrimary: "#E91E63",   // Hồng sen đậm làm điểm nhấn cho nút bấm
                colorPrimaryHover: "#d81b60",
                colorPrimaryActive: "#c2185b",
                borderRadius: 20
              },
              Menu: {
                itemColor: "#5D4037",
                itemHoverColor: "#E91E63",
                itemSelectedColor: "#E91E63",
                horizontalItemSelectedColor: "#E91E63",
              }
            }
          }}
        >
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </QueryClientProvider>
  );
}
