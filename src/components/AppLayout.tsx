"use client";

import React, { useState } from "react";
import { Layout, Menu, Typography, Space, Input, Button, Drawer } from "antd";
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
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: (
        <Link href="/" onClick={() => setMobileMenuOpen(false)}>
          Trang Chủ
        </Link>
      ),
      style: { fontWeight: "bold" },
    },
    {
      key: "/patterns",
      icon: <ReadOutlined />,
      label: (
        <Link href="/patterns" onClick={() => setMobileMenuOpen(false)}>
          Kho Chart
        </Link>
      ),
      style: { fontWeight: "bold" },
    },
    {
      key: "/accessories",
      icon: <PictureOutlined />,
      label: (
        <Link href="/accessories" onClick={() => setMobileMenuOpen(false)}>
          Phụ Kiện
        </Link>
      ),
      style: { fontWeight: "bold" },
    },
    {
      key: "/blog",
      icon: <BookOutlined />,
      label: (
        <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
          Blog
        </Link>
      ),
      style: { fontWeight: "bold" },
    },
    {
      key: "/contact",
      icon: <ContactsOutlined />,
      label: (
        <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
          Liên Hệ
        </Link>
      ),
      style: { fontWeight: "bold" },
    },
  ];

  const selectedKey =
    menuItems.find(
      (item) => pathname.startsWith(item.key as string) && item.key !== "/",
    )?.key || "/";

  // Giả kim thuật ô tìm kiếm
  const handleSearch = (value: string) => {
    if (value)
      alert(
        `Hệ thống đang được nâng cấp! Ghi nhận từ khóa "${value}", tính năng sẽ hoạt động khi có Database thật.`,
      );
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        backgroundImage: `url('https://i.pinimg.com/736x/15/44/f4/1544f47f14a2c56868ed825c800d7e15.jpg'), linear-gradient(180deg, #FFF5F7 0%, #FFFFFF 100%)`,
        backgroundSize: "cover", // ảnh phủ kín khung, có thể crop
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed", // tùy chọn: tạo hiệu ứng parallax nhẹ khi cuộn trang
      }}
    >
      <Header
        className="glass-nav"
        style={{
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(233, 30, 99, 0.08)",
          zIndex: 99,
          position: "sticky",
          top: 0,
          height: "80px",
          justifyContent: "space-between",
        }}
      >
        {/* Điểm Neo Responsive: Hiện nút gạch ngang trên Mobile */}
        <div className="mobile-menu-btn" style={{ flex: 1 }}>
          <Button
            type="text"
            icon={
              <MenuOutlined style={{ fontSize: "24px", color: "#E91E63" }} />
            }
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>

        {/* Lô-gô (Xóa hết icon text, dùng Icon Antd xịn) */}
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
                color: "#E91E63",
                animation: "fadeInUp 1s ease 0s",
              }}
            >
              <HeartFilled />
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "900",
                color: "#E91E63",
                letterSpacing: "1px",
              }}
            >
              TIỆM LEN NHỎ
            </div>
          </Link>
        </div>

        {/* Thanh Menu Nổi Trên Máy Tính */}
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

        <div
          className="desktop-search"
          style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
        >
          <Input
            placeholder="Tìm chart ở đây nè..."
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            suffix={
              <SearchOutlined style={{ color: "#E91E63", cursor: "pointer" }} />
            }
            style={{
              borderRadius: "20px",
              width: "220px",
              border: "1px solid #F8BBD0",
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.05)",
            }}
          />
        </div>

        {/* Thanh cân bằng độ rộng flex cho Mobile (cân đối 3 phần) */}
        <div className="mobile-menu-btn" style={{ flex: 1 }} />
      </Header>

      {/* Tủ kéo Mobile Toolbar Drawer dành cho Di Động */}
      <Drawer
        title={
          <div style={{ color: "#E91E63", fontWeight: "bold" }}>
            {/* <HeartFilled />  */}
            Tiệm Len Nhỏ
          </div>
        }
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        styles={{ body: { padding: 0 } }}
      >
        <div style={{ padding: "20px" }}>
          <Input
            placeholder="Tìm kiếm..."
            onPressEnter={(e) => handleSearch(e.currentTarget.value)}
            suffix={<SearchOutlined style={{ color: "#E91E63" }} />}
            style={{ borderRadius: "20px", border: "1px solid #F8BBD0" }}
          />
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey as string]}
          items={menuItems}
          style={{ borderRight: "none", fontSize: "16px" }}
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

      <Footer
        style={{
          textAlign: "center",
          background: "#F8BBD0",
          color: "#5D4037",
          marginTop: "40px",
          borderRadius: "20px 20px 0 0",
        }}
      >
        <Space orientation="vertical" size="large">
          <div style={{ fontSize: "24px", color: "#E91E63" }}>
            <HeartFilled />
          </div>
          <Text
            style={{
              color: "#E91E63",
              fontWeight: "900",
              fontSize: "18px",
              letterSpacing: "2px",
            }}
          >
            TIỆM LEN NHỎ
          </Text>
          <Text style={{ color: "#5D4037" }}>
            Lưu giữ đam mê trong từng vòng ma thuật.
          </Text>
          <Text
            style={{ color: "#5D4037", fontSize: "12px", marginTop: "20px" }}
          >
            © {new Date().getFullYear()} Bản quyền thuộc về Tiệm
          </Text>
        </Space>
      </Footer>
    </Layout>
  );
}
