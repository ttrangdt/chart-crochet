"use client";

import { Typography, Row, Col, Card, Tag, Rate, Carousel, Button } from "antd";
import Link from "next/link";
import mockData from "@/data/mockData.json";
import {
  BookOutlined,
  CameraOutlined,
  RocketOutlined,
} from "@ant-design/icons";

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
      cta: "Xem Sản Phẩm Yêu Thích",
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
      {/* SECTION 1: CAROUSEL CAO CẤP */}
      <div
        style={{
          marginBottom: "80px",
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 15px 40px rgba(248, 187, 208, 0.4)",
          border: "4px solid #fff",
          position: "relative",
        }}
      >
        <Carousel
          autoplay
          autoplaySpeed={1000}
          effect="fade"
          dots={true}
          infinite={true}
        >
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
                {/* Lớp màng mờ Focus */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(93,64,55,0.7) 100%)",
                  }}
                />

                {/* Khu vực nội dung có Glassmorphism xịn xò */}
                <div
                  style={{
                    zIndex: 1,
                    background: "rgba(255, 255, 255, 0.15)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "40px 80px",
                    borderRadius: "24px",
                    transform: "translateY(10px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <Title
                    level={1}
                    style={{
                      color: "#FFF",
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      margin: 0,
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {item.title}
                  </Title>
                  <Paragraph
                    style={{
                      color: "#F8BBD0",
                      fontSize: "22px",
                      marginTop: "10px",
                      fontStyle: "italic",
                      fontWeight: "400",
                      letterSpacing: "1px",
                      textShadow: "0 1px 3px rgba(0,0,0,0.4)",
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

      {/* SECTION 3: 4 MẪU MỚI NHẤT VỚI BỐ CỤC SIÊU MƯỢT */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title
          level={2}
          style={{
            color: "#E91E63",
            textTransform: "uppercase",
            letterSpacing: "2px",
            margin: 0,
            fontWeight: "900",
          }}
        >
          BỘ SƯU TẬP MỚI
        </Title>
        <Text style={{ fontSize: "16px", color: "#666" }}>
          Hí hí, Chart nóng hổi vừa thổi vừa xem!!!
        </Text>
      </div>
      <Row gutter={[32, 40]}>
        {mockData.charts.slice(0, 4).map((pattern) => (
          <Col xs={24} sm={12} md={12} lg={6} key={pattern.id}>
            <Link href={`/patterns/${pattern.id}`}>
              <Card
                hoverable
                className="hover-card"
                cover={
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      alt={pattern.name}
                      src={pattern.image_url}
                      className="card-image"
                      style={{
                        height: "280px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "24px 24px 0 0",
                      }}
                    />

                    {/* Overlay gradient nổi chữ */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "120px",
                        background:
                          "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                        borderRadius: "0 0 0 0",
                        pointerEvents: "none",
                      }}
                    />

                    {pattern.is_free && (
                      <Tag
                        style={{
                          background: "#E91E63",
                          color: "#fff",
                          position: "absolute",
                          top: 15,
                          right: 15,
                          padding: "5px 15px",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          border: "none",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                          fontSize: "12px",
                          letterSpacing: "1px",
                        }}
                      >
                        FREE
                      </Tag>
                    )}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 15,
                        left: 15,
                        right: 15,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Tag
                        color="rgba(255,255,255,0.85)"
                        style={{
                          color: "#E91E63",
                          border: "none",
                          borderRadius: "10px",
                          fontWeight: "900",
                          padding: "2px 10px",
                        }}
                      >
                        {pattern.category}
                      </Tag>
                      <Rate
                        disabled
                        defaultValue={pattern.difficulty_stars}
                        style={{ fontSize: "12px", color: "#FAD02C" }}
                      />
                    </div>
                  </div>
                }
                style={{
                  borderRadius: "24px",
                  border: "none",
                  boxShadow: "0 10px 25px rgba(93, 64, 55, 0.08)",
                }}
                styles={{ body: { padding: "20px" } }}
              >
                <Title
                  level={5}
                  style={{
                    margin: "0 0 10px 0",
                    color: "#5D4037",
                    fontWeight: "900",
                    height: "45px",
                    lineHeight: "1.4",
                  }}
                  ellipsis={{ rows: 2 }}
                >
                  {pattern.name}
                </Title>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px dashed #F8BBD0",
                    paddingTop: "15px",
                    marginTop: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        background: "#E91E63",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      H
                    </div>
                    <Text style={{ fontSize: "13px", color: "#666" }}>
                      Tiệm Handmade
                    </Text>
                  </div>
                  <Text
                    style={{
                      color: "#E91E63",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    Chi tiết &rarr;
                  </Text>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
