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
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { useTheme } from "./Providers"; // Hook điều khiển theme

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

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
              <HeartFilled />
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

        {/* Nhóm công cụ bên phải (Search + Dark Mode) */}
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
            <HeartFilled /> Tiệm Len Nhỏ
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
            <HeartFilled />
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
            Lưu giữ đam mê trong từng vòng ma thuật.
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
    </Layout>
  );
}
