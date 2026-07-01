"use client";

import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Space,
  Input,
  Button,
  Drawer,
  Switch,
} from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeOutlined,
  ReadOutlined,
  PictureOutlined,
  SearchOutlined,
  BookOutlined,
  ContactsOutlined,
  MenuOutlined,
  HeartFilled,
  HeartOutlined,
  MoonOutlined,
  SunOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useTheme, ThemePicker } from "@/features/theme";
import { useBasket } from "@/features/basket";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const sloganMap: Record<string, string> = {
  pink: "Lưu giữ đam mê trong từng vòng ma thuật.",
  matcha: "Móc từng sợi len, dệt nên những bình yên nhỏ bé.",
  blueberry: "Sáng tạo thế giới tí hon từ những sợi len màu tím mộng mơ.",
  lemon: "Bắt đầu ngày mới tràn đầy năng lượng cùng những mũi móc lấp lánh!",
  dark: "Mỗi hàng len móc đêm muộn, thêu dệt giấc mơ êm đềm dưới ánh trăng.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { totalItems } = useBasket();

  const LogoIcon = theme === "matcha" ? HeartOutlined : HeartFilled;

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: (
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          Trang Chủ
        </Link>
      ),
      style: { fontWeight: "bold", color: "var(--text-main)" },
    },
    {
      key: "/patterns",
      icon: <ReadOutlined />,
      label: (
        <Link href="/patterns" onClick={() => setMobileMenuOpen(false)}>
          Kho Chart
        </Link>
      ),
      style: { fontWeight: "bold", color: "var(--text-main)" },
    },
    {
      key: "/accessories",
      icon: <PictureOutlined />,
      label: (
        <Link href="/accessories" onClick={() => setMobileMenuOpen(false)}>
          Phụ Kiện
        </Link>
      ),
      style: { fontWeight: "bold", color: "var(--text-main)" },
    },
    {
      key: "/blog",
      icon: <BookOutlined />,
      label: (
        <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
          Blog
        </Link>
      ),
      style: { fontWeight: "bold", color: "var(--text-main)" },
    },
    {
      key: "/contact",
      icon: <ContactsOutlined />,
      label: (
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
          Liên Hệ
        </Link>
      ),
      style: { fontWeight: "bold", color: "var(--text-main)" },
    },
  ];

  const selectedKey =
    menuItems.find(
      (item) => pathname.startsWith(item.key as string) && item.key !== "/",
    )?.key || "/";

  return (
    <Layout style={{ minHeight: "100vh", background: "transparent" }}>
      <Header
        className="glass-nav"
        style={{
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          zIndex: 99,
          position: "sticky",
          top: 0,
          height: "80px",
          justifyContent: "space-between",
        }}
      >
        {/* Nút Mobile */}
        <div className="mobile-menu-btn" style={{ flex: 1 }}>
          <Button
            type="text"
            icon={
              <MenuOutlined
                style={{ fontSize: "24px", color: "var(--pink-dark)" }}
              />
            }
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              textAlign: "center",
              lineHeight: "1",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                color: "var(--pink-dark)",
                animation: "fadeInUp 1s ease 0s",
              }}
            >
              <LogoIcon />
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "900",
                color: "var(--pink-dark)",
                letterSpacing: "1px",
              }}
            >
              TIỆM LEN NHỎ
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ flex: 2 }}>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey as string]}
            items={menuItems}
            style={{
              borderBottom: "none",
              background: "transparent",
              justifyContent: "center",
              fontSize: "15px",
            }}
          />
        </div>

        {/* Nhóm công cụ bên phải (Basket + Search + Dark Mode) */}
        <div
          className="desktop-search"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {/* Icon Giỏ Lấn */}
          <Link href="/basket" style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={<ShoppingOutlined style={{ fontSize: "22px", color: "var(--pink-dark)" }} />}
              style={{ padding: "4px 8px", display: "flex", alignItems: "center", justifyContent: "center" }}
            />
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  background: "var(--pink-dark)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: "basketBadgePop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={isDarkMode}
            onChange={toggleTheme}
            style={{ background: isDarkMode ? "#444" : "var(--pink-light)" }}
          />

          <Input
            placeholder="Tìm theo mẫu..."
            onPressEnter={() =>
              alert("Tính năng tìm kiếm sẽ có ở phase Backend!")
            }
            suffix={
              <SearchOutlined
                style={{ color: "var(--pink-dark)", cursor: "pointer" }}
              />
            }
            style={{
              borderRadius: "20px",
              width: "180px",
              border: "1px solid var(--border-soft)",
              background: "var(--panel-bg)",
              color: "var(--text-main)",
            }}
          />
        </div>

        <div
          className="mobile-menu-btn"
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={isDarkMode}
            onChange={toggleTheme}
            size="small"
          />
        </div>
      </Header>

      <Drawer
        title={
          <div style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>
            <LogoIcon /> Tiệm Len Nhỏ
          </div>
        }
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: "20px", background: "var(--bg-card)" }}>
          <Input
            placeholder="Tìm kiếm..."
            suffix={<SearchOutlined style={{ color: "var(--pink-dark)" }} />}
            style={{ borderRadius: "20px" }}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey as string]}
          items={menuItems}
          style={{
            borderRight: "none",
            fontSize: "16px",
            background: "var(--bg-card)",
            color: "var(--text-main)",
          }}
        />
      </Drawer>

      <Content
        style={{
          padding: "40px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {children}
      </Content>

      {/* Footer tự điều chỉnh nền theo thẻ */}
      <Footer
        style={{
          textAlign: "center",
          background: "var(--panel-bg)",
          color: "var(--text-main)",
          padding: "60px 20px",
          marginTop: "40px",
          borderRadius: "20px 20px 0 0",
          borderTop: "1px solid var(--border-soft)",
          transition: "0.3s ease",
        }}
      >
        <Space orientation="vertical" size="large">
          <div style={{ fontSize: "24px", color: "var(--pink-dark)" }}>
            <LogoIcon />
          </div>
          <Text
            style={{
              color: "var(--pink-dark)",
              fontWeight: "900",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            TIỆM LEN NHỎ
          </Text>
          <Text style={{ color: "var(--text-sub)" }}>
            {sloganMap[theme] || sloganMap.pink}
          </Text>
          <Text
            style={{
              color: "var(--text-sub)",
              fontSize: "12px",
              marginTop: "20px",
            }}
          >
            © {new Date().getFullYear()} Bản quyền thuộc về Tiệm
          </Text>
        </Space>
      </Footer>
      <ThemePicker />
    </Layout>
  );
}
