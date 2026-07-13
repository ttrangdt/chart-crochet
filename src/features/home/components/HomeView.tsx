"use client";

import React from "react";
import { Typography, Row, Col, Carousel, Button, Card, Avatar, Rate } from "antd";
import {
  BookOutlined,
  CompassOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import Link from "next/link";
import mockData from "@/data/mockData.json";
import { PatternCard } from "@/features/patterns";

const { Title, Text, Paragraph } = Typography;

export default function HomeView() {
  const carouselData = [
    {
      id: 1,
      image: "./3f78cdfb16a1f07c403b76466a29e740.jpg",
      title: "Bí Mật Chúng Mình",
      subtitle: "Nơi những sợi len biết kể câu chuyện tình của bạn",
      cta: "Khám Phá Kho Chart Miễn Phí",
      link: "/patterns",
    },
    {
      id: 2,
      image: "./f00fca8f160bd9af51c851a4c6f63b58.jpg",
      title: "Quà Tặng Handmade",
      subtitle: "Gửi gắm ngàn yêu thương qua từng mũi móc đan xen",
      cta: "Xem Sản Phẩm Tự Đan",
      link: "/accessories",
    },
    {
      id: 3,
      image: "./61332c7c7ae6299b398a78dc8c4d5559.jpg",
      title: "Chuyện Của Len",
      subtitle: "Nơi chia sẻ mẹo vặt, gỡ rối len sợi cho tân thủ",
      cta: "Đọc Chuyện Của Len",
      link: "/blog",
    },
  ];

  const features = [
    {
      icon: <ClockCircleOutlined style={{ fontSize: "28px", color: "var(--pink-dark)" }} />,
      title: "Bấm Giờ & Định Giá ⏱️",
      desc: "Lưu trữ thời gian đan móc tự động của dự án và gợi ý giá bán sản phẩm thương mại."
    },
    {
      icon: <HeartOutlined style={{ fontSize: "28px", color: "#2E7D32" }} />,
      title: "Đếm Hàng Chuẩn Bíp 🪄",
      desc: "Trợ lý đếm hàng có âm thanh pop bong bóng và cảm ứng rung giúp bạn không bị nhầm dòng."
    },
    {
      icon: <BookOutlined style={{ fontSize: "28px", color: "#E65100" }} />,
      title: "Dịch Hóa Thuật Ngữ 📚",
      desc: "Một chạm chuyển đổi toàn bộ chart giữa chuẩn Việt (X, A, V) sang chuẩn US (sc, dec, inc)."
    },
    {
      icon: <CompassOutlined style={{ fontSize: "28px", color: "#9C27B0" }} />,
      title: "Từ Điển Mũi Móc 📖",
      desc: "Tra cứu ký hiệu mũi móc chi tiết kèm hình vẽ minh họa ngay khi bấm vào dòng chart."
    }
  ];

  const showcase = [
    {
      id: 1,
      image: "/amigurumi_stuffing.png",
      patternName: "Súp Lơ Xanh",
      author: "@rose_nguyen",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=rose",
      review: "Chart dịch siêu chuẩn, tính năng đếm dòng phát ra tiếng bép bép rất dễ thương!"
    },
    {
      id: 2,
      image: "/hide_yarn_ends.png",
      patternName: "Bình Trà Nhỏ",
      author: "@bun_handmade",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=bun",
      review: "Công cụ định giá thành phẩm cứu rỗi cuộc đời mình, không lo bán lỗ nữa rồi!"
    },
    {
      id: 3,
      image: "/yarn_balls_care.png",
      patternName: "Hoa Hướng Dương",
      author: "@tiem_len_cua_linh",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=linh",
      review: "Màu sắc giao diện ấm cúng, thiết kế trang nhã giúp mình có cảm hứng móc hẳn!"
    }
  ];

  return (
    <div className="animate-fade-in-up" style={{ paddingBottom: "60px" }}>
      {/* SECTION 1: CAROUSEL HERO BANNER */}
      <div
        style={{
          marginBottom: "60px",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
          border: "1px solid var(--border-soft)",
          position: "relative",
        }}
      >
        <Carousel autoplay autoplaySpeed={4500} effect="fade" dotPlacement="bottom">
          {carouselData.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  height: "500px",
                  width: "100%",
                  backgroundImage: `url('${item.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(15,10,13,0.8) 100%)",
                  }}
                />

                <div
                  style={{
                    zIndex: 1,
                    background: "var(--bg-card)",
                    opacity: 0.95,
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--border-soft)",
                    padding: "36px 60px",
                    borderRadius: "28px",
                    maxWidth: "650px",
                    transform: "translateY(10px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                  }}
                  className="hover-card"
                >
                  <Title
                    level={2}
                    style={{
                      color: "var(--text-main)",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {item.title}
                  </Title>
                  <Paragraph
                    style={{
                      color: "var(--text-sub)",
                      fontSize: "17px",
                      marginTop: "12px",
                      fontStyle: "italic",
                      lineHeight: "1.6"
                    }}
                  >
                    &quot;{item.subtitle}&quot;
                  </Paragraph>

                  <Link href={item.link}>
                    <Button
                      type="primary"
                      size="large"
                      className="wow-button"
                      style={{
                        marginTop: "16px",
                        borderRadius: "20px",
                        height: "48px",
                        padding: "0 30px",
                        fontSize: "15px",
                        border: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {item.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* SECTION 2: PASTEL CATEGORY NAVIGATION QUICKLINKS */}
      <div style={{ textAlign: "center", marginBottom: "35px" }}>
        <Title level={3} style={{ color: "var(--text-main)", fontWeight: "bold", margin: 0, textTransform: "uppercase" }}>
          🧶 Cổng Thông Tin Tiệm Len
        </Title>
        <Text style={{ fontSize: "14px", color: "var(--text-sub)" }}>
          Truy cập nhanh các phân khu tính năng nổi bật của Tiệm
        </Text>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: "70px" }}>
        <Col xs={12} sm={12} md={6}>
          <Link href="/patterns">
            <Card
              hoverable
              style={{
                borderRadius: "24px",
                border: "2px solid var(--border-soft)",
                textAlign: "center",
                background: "rgba(233, 30, 99, 0.03)"
              }}
              className="hover-card"
            >
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>📖</div>
              <Title level={5} style={{ margin: 0, color: "var(--pink-dark)" }}>KHO CHART</Title>
              <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>Tra cứu công thức móc miễn phí</Text>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Link href="/patterns/c001">
            <Card
              hoverable
              style={{
                borderRadius: "24px",
                border: "2px solid var(--border-soft)",
                textAlign: "center",
                background: "rgba(46, 125, 50, 0.03)"
              }}
              className="hover-card"
            >
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>🪄</div>
              <Title level={5} style={{ margin: 0, color: "#2E7D32" }}>NHẬT KÝ MÓC</Title>
              <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>Đếm hàng, đếm giờ, định hóa đơn</Text>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Link href="/accessories">
            <Card
              hoverable
              style={{
                borderRadius: "24px",
                border: "2px solid var(--border-soft)",
                textAlign: "center",
                background: "rgba(255, 193, 7, 0.03)"
              }}
              className="hover-card"
            >
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>🎒</div>
              <Title level={5} style={{ margin: 0, color: "#BF8F00" }}>PHỤ KIỆN XINH</Title>
              <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>Mua dắm phụ kiện, bông, len sợi</Text>
            </Card>
          </Link>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Link href="/blog">
            <Card
              hoverable
              style={{
                borderRadius: "24px",
                border: "2px solid var(--border-soft)",
                textAlign: "center",
                background: "rgba(156, 39, 176, 0.03)"
              }}
              className="hover-card"
            >
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>💬</div>
              <Title level={5} style={{ margin: 0, color: "#9C27B0" }}>GÓC CHÉM GIÓ</Title>
              <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>Kể chuyện làm đồ và gỡ rối sợi len</Text>
            </Card>
          </Link>
        </Col>
      </Row>

      {/* SECTION 3: CLAYMORPHIC UTILITIES INFO */}
      <div
        style={{
          background: "var(--panel-bg)",
          borderRadius: "32px",
          padding: "45px 35px",
          border: "1px solid var(--border-soft)",
          marginBottom: "70px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title level={3} style={{ color: "var(--text-main)", fontWeight: "bold", margin: 0, textTransform: "uppercase" }}>
            🌸 Tiện ích đỉnh cao trợ giúp thợ len
          </Title>
          <Text style={{ fontSize: "14px", color: "var(--text-sub)" }}>
            Các công cụ thông minh duy nhất giúp đan móc chuyên nghiệp và định giá thành phẩm hiệu quả
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {features.map((f, i) => (
            <Col xs={24} sm={12} lg={6} key={i}>
              <div
                style={{
                  background: "var(--bg-card)",
                  padding: "24px",
                  borderRadius: "24px",
                  border: "1px solid var(--border-soft)",
                  height: "100%",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.02)"
                }}
                className="hover-card"
              >
                <div style={{ marginBottom: "15px" }}>{f.icon}</div>
                <Title level={5} style={{ color: "var(--text-main)", marginTop: 0, marginBottom: "8px" }}>
                  {f.title}
                </Title>
                <Text style={{ fontSize: "13px", color: "var(--text-sub)", lineHeight: "1.6", display: "block" }}>
                  {f.desc}
                </Text>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* SECTION 4: BST MỚI NHẤT */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title
          level={3}
          style={{
            color: "var(--pink-dark)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: 0,
            fontWeight: "bold",
          }}
        >
          🎁 Bộ sưu tập Chart mới nhất
        </Title>
        <Text style={{ fontSize: "14px", color: "var(--text-sub)" }}>
          Hí hí, Chart nóng hổi vừa thổi vừa móc ngay thui bạn ơi!!!
        </Text>
      </div>
      <Row gutter={[32, 40]} style={{ marginBottom: "70px" }}>
        {mockData.charts.slice(0, 4).map((pattern) => (
          <Col xs={24} sm={12} md={12} lg={6} key={pattern.id}>
            <PatternCard pattern={pattern} />
          </Col>
        ))}
      </Row>

      {/* SECTION 5: KHOE THÀNH PHẨM CỘNG ĐỒNG */}
      <div>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title
            level={3}
            style={{
              color: "var(--text-main)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              margin: 0,
              fontWeight: "bold"
            }}
          >
            ✨ Góc Khoe Thành Phẩm
          </Title>
          <Text style={{ fontSize: "14px", color: "var(--text-sub)" }}>
            Ảnh xinh do chính các bạn thợ tự tay móc đan và gửi phản hồi cho Tiệm
          </Text>
        </div>

        <Row gutter={[24, 24]}>
          {showcase.map((s) => (
            <Col xs={24} md={8} key={s.id}>
              <Card
                hoverable
                style={{
                  borderRadius: "24px",
                  border: "1px solid var(--border-soft)",
                  overflow: "hidden",
                  padding: 0
                }}
                styles={{ body: { padding: "20px" } }}
                className="hover-card"
              >
                <div style={{ overflow: "hidden", borderRadius: "16px", height: "240px", marginBottom: "15px" }}>
                  <img
                    src={s.image}
                    alt={s.patternName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                    className="hover-zoom-img"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Avatar src={s.avatar} size="small" />
                    <Text strong style={{ fontSize: "13px" }}>{s.author}</Text>
                  </div>
                  <Rate disabled defaultValue={5} style={{ fontSize: "12px" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                  <CheckCircleOutlined style={{ color: "#2E7D32", fontSize: "12px" }} />
                  <Text style={{ fontSize: "12px", background: "var(--panel-bg)", padding: "2px 8px", borderRadius: "8px", fontWeight: "bold", color: "var(--pink-dark)" }}>
                    Chart: {s.patternName}
                  </Text>
                </div>
                <Paragraph italic style={{ fontSize: "13px", color: "var(--text-sub)", margin: 0, lineHeight: "1.5" }}>
                  &quot;{s.review}&quot;
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <style>{`
        .hover-zoom-img:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
