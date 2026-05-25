import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Lấy phông từ Google Fonts
import "./globals.css";
import Providers from "@/components/Providers";
import AppLayout from "@/components/AppLayout";

const inter = Inter({ subsets: ["latin", "vietnamese"] }); // Ép hỗ trợ tiếng Việt

export const metadata: Metadata = {
  title: "Góc Của Len 🧶",
  description: "Chia sẻ chart móc dệt và thành phẩm amigurumi đáng yêu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Providers>
          <AppLayout>
            {children}
          </AppLayout>
        </Providers>
      </body>
    </html>
  );
}
