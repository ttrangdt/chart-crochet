"use client";

import React, { useState } from "react";
import { Typography, Row, Col, Card, Tag, Space, Button } from "antd";
import { 
  BookOutlined, 
  ClockCircleOutlined, 
  UserOutlined, 
  CalendarOutlined,
  ArrowRightOutlined 
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "post-featured",
    title: "Hành Trình Đan Móc Chiếc Khăn Choàng Đầu Mùa Ấm Áp & Trọn Vẹn",
    excerpt: "Khi những đợt gió lạnh đầu mùa khẽ chạm từng kẽ lá, cũng là lúc các tín đồ thủ công rục rịch chọn cho mình những cuộn len mềm mại cùng que móc thân thuộc. Một chiếc khăn choàng handmade không đơn giản chỉ để giữ ấm, nó chứa đựng cả sự nâng niu, tỉ mỉ đan dệt qua từng vòng xoáy chỉ. Bài viết này chia sẻ trọn vẹn hành trình từ khâu chọn len tới những phối màu tuyệt đối giúp bạn sở hữu một siêu phẩm độc bản...",
    date: "01/07/2026",
    readTime: "8 phút đọc",
    category: "Nhật ký",
    author: "Bảo Vy - Tiệm Len Nhỏ",
    image: "/featured_blog.png"
  },
  {
    id: "post-1",
    title: "Mẹo giấu sạch đầu sợi len thừa gọn gàng",
    excerpt: "Sợi len thừa sau khi thắt nút ráp thú luôn làm giảm nét thẩm mỹ của thành phẩm amigurumi. Bỏ túi ngay 3 mẹo lách kim giấu mối siêu mượt giúp chú thú bông của bạn sạch sẽ từ trong ra ngoài.",
    date: "30/06/2026",
    readTime: "4 phút đọc",
    category: "Mẹo hay",
    author: "Vy An",
    image: "/hide_yarn_ends.png"
  },
  {
    id: "post-2",
    title: "Bảo quản các cuộn len đan móc không xù lông",
    excerpt: "Làm sao để các sợi bông luôn tơi xốp mềm mại, không ẩm mốc sau thời gian dài cất trữ? Khám phá cách sắp xếp tủ len khoa học và điều chỉnh lực phơi sợi đơn giản mà hiệu quả cao.",
    date: "28/06/2026",
    readTime: "5 phút đọc",
    category: "Thiết yếu",
    author: "Thu Trang",
    image: "/yarn_balls_care.png"
  },
  {
    id: "post-3",
    title: "Nhồi bông đều tăm tắp cho thú Amigurumi căng tròn",
    excerpt: "Thú bông bị méo hay vón cục bông thường do kỹ thuật nhồi của bạn chưa chuẩn xác. Hướng dẫn chi tiết cách dàn bông từ các khe hẹp giúp bé thú luôn vững chãi, mũm mĩm đáng yêu.",
    date: "25/06/2026",
    readTime: "6 phút đọc",
    category: "Handmade",
    author: "Kim Ngân",
    image: "/amigurumi_stuffing.png"
  }
];

export default function BlogView() {
  const [featuredHover, setFeaturedHover] = useState(false);

  const featured = BLOG_POSTS[0];
  const recents = BLOG_POSTS.slice(1);

  return (
    <div className="animate-fade-in-up">
      {/* HEADER SECTION - Giữ nguyên phong cách hiện tại */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          padding: "40px",
          borderRadius: "24px",
          background: "var(--bg-card)",
          border: "2px dashed var(--pink-light)",
        }}
      >
        <Title
          level={2}
          style={{
            color: "var(--pink-dark)",
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          <BookOutlined style={{ marginRight: 8 }} /> CHUYỆN CỦA LEN
        </Title>
        <Paragraph
          style={{
            color: "var(--text-sub)",
            fontSize: "16px",
            marginTop: "10px",
            fontStyle: "italic",
            marginBottom: 0
          }}
        >
          Ghi chép lại hành trình đan móc đầy sắc màu, những chia sẻ và bí mật tạo nên thành phẩm len bông hoàn mỹ.
        </Paragraph>
      </div>

      {/* BÀI VIẾT NỔI BẬT (FEATURED POST) */}
      <div style={{ marginBottom: "50px" }}>
        <Card
          bordered={false}
          style={{
            borderRadius: "24px",
            background: "var(--bg-card)",
            boxShadow: featuredHover 
              ? "0 15px 35px rgba(0,0,0,0.08)" 
              : "0 8px 24px rgba(0,0,0,0.04)",
            overflow: "hidden",
            transition: "all 0.3s ease",
          }}
          styles={{ body: { padding: "24px" } }}
          onMouseEnter={() => setFeaturedHover(true)}
          onMouseLeave={() => setFeaturedHover(false)}
        >
          <Row gutter={[32, 24]} align="middle">
            <Col xs={24} lg={12}>
              <div
                style={{
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  height: "360px",
                  width: "100%",
                }}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: featuredHover ? "scale(1.03)" : "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                />
                <Tag
                  color="var(--pink-dark)"
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "15px",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    padding: "4px 10px",
                  }}
                >
                  BÀI VIẾT NỔI BẬT ⭐
                </Tag>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <Space size="middle" style={{ fontSize: "14px", color: "var(--text-sub)" }}>
                  <span><Tag color="var(--pink-light)" style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>{featured.category}</Tag></span>
                  <span><CalendarOutlined style={{ marginRight: "4px" }} />{featured.date}</span>
                  <span><ClockCircleOutlined style={{ marginRight: "4px" }} />{featured.readTime}</span>
                </Space>

                <Title
                  level={2}
                  style={{
                    color: "var(--text-main)",
                    fontWeight: "bold",
                    margin: "5px 0 10px 0",
                    lineHeight: "1.3",
                    cursor: "pointer",
                  }}
                >
                  {featured.title}
                </Title>

                <Paragraph style={{ color: "var(--text-sub)", fontSize: "15px", lineHeight: "1.6", marginBottom: "15px" }}>
                  {featured.excerpt}
                </Paragraph>

                <Space size="large" align="center" style={{ width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
                  <Space style={{ fontSize: "13px", color: "var(--text-sub)" }}>
                    <UserOutlined />
                    <span>Người viết: <b>{featured.author}</b></span>
                  </Space>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<ArrowRightOutlined />}
                    style={{
                      background: "var(--pink-dark)",
                      border: "none",
                      fontWeight: "bold",
                      height: "40px",
                      padding: "0 24px",
                    }}
                  >
                    Đọc tiếp
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      <Title
        level={3}
        style={{
          color: "var(--text-main)",
          fontWeight: "bold",
          marginBottom: "30px",
          position: "relative",
          display: "inline-block",
        }}
      >
        Mới Nhất Từ Blog
        <span 
          style={{ 
            position: "absolute", 
            bottom: "-6px", 
            left: 0, 
            width: "50%", 
            height: "4px", 
            backgroundColor: "var(--pink-dark)",
            borderRadius: "2px" 
          }} 
        />
      </Title>

      {/* GRID CÁC BÀI VIẾT KHÁC */}
      <Row gutter={[24, 32]}>
        {recents.map((post) => (
          <Col xs={24} md={8} key={post.id}>
            <Card
              className="hover-card"
              hoverable
              style={{
                borderRadius: "24px",
                border: "1px solid var(--border-soft)",
                background: "var(--bg-card)",
                boxShadow: "0 6px 20px rgba(0,0,0,0.03)",
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column"
              }}
              styles={{ body: { padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" } }}
              cover={
                <div style={{ overflow: "hidden", height: "200px" }}>
                  <img
                    alt={post.title}
                    src={post.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "all 0.5s ease",
                    }}
                    className="card-image"
                  />
                </div>
              }
            >
              <div>
                <Space style={{ fontSize: "12px", color: "var(--text-sub)", marginBottom: "10px" }} size="middle">
                  <Tag color="default" style={{ borderRadius: "4px", fontWeight: "600" }}>{post.category}</Tag>
                  <span><ClockCircleOutlined style={{ marginRight: "3px" }} />{post.readTime}</span>
                </Space>
                
                <Title 
                  level={4} 
                  style={{ 
                    color: "var(--pink-dark)", 
                    fontWeight: "bold", 
                    lineHeight: "1.4", 
                    marginBottom: "10px",
                    fontSize: "17px",
                    height: "48px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {post.title}
                </Title>
                
                <Paragraph 
                  style={{ 
                    color: "var(--text-sub)", 
                    lineHeight: "1.6", 
                    fontSize: "14px",
                    marginBottom: "15px",
                    height: "66px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {post.excerpt}
                </Paragraph>
              </div>

              <div 
                style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  borderTop: "1px dashed var(--border-soft)", 
                  paddingTop: "15px",
                  marginTop: "10px"
                }}
              >
                <Text style={{ fontSize: "12px", color: "var(--text-sub)", fontStyle: "italic" }}>
                  {post.date}
                </Text>
                <a
                  style={{
                    color: "var(--pink-dark)",
                    fontWeight: "bold",
                    fontSize: "13px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  Xem thêm <ArrowRightOutlined style={{ fontSize: "11px" }} />
                </a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
