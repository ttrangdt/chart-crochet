"use client";

import React from "react";
import { Typography, Row, Col, Carousel, Button } from "antd";
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
      subtitle: "Nơi những sợi len biết kể chuyện",
      cta: "Khám Phá Kho Chart Miễn Phí",
      link: "/patterns",
    },
    {
      id: 2,
      image: "./f00fca8f160bd9af51c851a4c6f63b58.jpg",
      title: "Quà Tặng Handmade",
      subtitle: "Gửi gắm yêu thương qua từng mũi móc",
      cta: "Xem Sản Phẩm Tự Đan",
      link: "/accessories",
    },
    {
      id: 3,
      image: "./61332c7c7ae6299b398a78dc8c4d5559.jpg",
      title: "Chuyện Của Len",
      subtitle: "Chia sẻ, học hỏi và kết nối mỗi ngày",
      cta: "Đọc Chuyện Của Len",
      link: "/blog",
    },
  ];

  return (
    <div className="animate-fade-in-up">
      {/* SECTION 1: CAROUSEL */}
      <div
        style={{
          marginBottom: "80px",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
          border: "2px solid var(--border-soft)",
          position: "relative",
        }}
      >
        <Carousel autoplay autoplaySpeed={4000} effect="fade" dotPlacement="bottom">
          {carouselData.map((item) => (
            <div key={item.id}>
              <div
                style={{
                  height: "550px",
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
                      "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(20,10,13,0.85) 100%)",
                  }}
                />

                <div
                  style={{
                    zIndex: 1,
                    background: "rgba(20, 10, 13, 0.4)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "40px 80px",
                    borderRadius: "24px",
                    transform: "translateY(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <Title
                    level={1}
                    style={{
                      color: "#FFF",
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      margin: 0,
                      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.title}
                  </Title>
                  <Paragraph
                    style={{
                      color: "var(--pink-light)",
                      fontSize: "22px",
                      marginTop: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    {item.subtitle}
                  </Paragraph>

                  <Link href={item.link}>
                    <Button
                      type="primary"
                      size="large"
                      className="wow-button"
                      style={{
                        marginTop: "20px",
                        borderRadius: "30px",
                        height: "55px",
                        padding: "0 40px",
                        fontSize: "18px",
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

      {/* SECTION 3: BST MỚI NHẤT */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title
          level={2}
          style={{
            color: "var(--pink-dark)",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: 0,
          }}
        >
          BỘ SƯU TẬP MỚI
        </Title>
        <Text style={{ fontSize: "16px", color: "var(--text-sub)" }}>
          Hí hí, Chart nóng hổi vừa thổi vừa xem!!!
        </Text>
      </div>
      <Row gutter={[32, 40]}>
        {mockData.charts.slice(0, 4).map((pattern) => (
          <Col xs={24} sm={12} md={12} lg={6} key={pattern.id}>
            <PatternCard pattern={pattern} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
