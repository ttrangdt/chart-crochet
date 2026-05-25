"use client";

import { Typography, Row, Col, Card, Tag, Rate, Checkbox, Input } from "antd";
import Link from "next/link";
import mockData from "@/data/mockData.json";

const { Title, Text } = Typography;

export default function PatternListView() {
  return (
    <div className="animate-fade-in-up">
      {/* Khung Giao Diện Bộ Lọc Grid */}
      <Row gutter={[32, 24]}>
        {/* SIDEBAR BỘ LỌC BÊN TRÁI (1/4) */}
        <Col xs={24} md={6}>
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid #FFF5F7",
              position: "sticky",
              top: "100px",
            }}
          >
            {/* Tìm kiếm */}
            <div style={{ marginBottom: "25px" }}>
              <Input.Search
                placeholder="Tìm mẫu móc..."
                size="large"
                enterButton
                style={{ borderRadius: "10px" }}
              />
            </div>

            <div
              style={{
                marginBottom: "25px",
                borderBottom: "1px dashed #F8BBD0",
                paddingBottom: "15px",
              }}
            >
              <Text
                strong
                style={{
                  color: "#E91E63",
                  display: "block",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                Danh mục
              </Text>
              <Checkbox.Group
                options={[
                  "Móc khóa",
                  "Thú bông",
                  "Phụ kiện tóc",
                  "Đồ gia dụng",
                ]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              />
            </div>

            <div
              style={{
                marginBottom: "25px",
                borderBottom: "1px dashed #F8BBD0",
                paddingBottom: "15px",
              }}
            >
              <Text
                strong
                style={{
                  color: "#E91E63",
                  display: "block",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                Độ khó
              </Text>
              <Checkbox.Group
                options={["Mầm non (Dễ)", "Khéo tay (Vừa)", "Nghệ nhân (Khó)"]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              />
            </div>

            <div>
              <Text
                strong
                style={{
                  color: "#E91E63",
                  display: "block",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                Loại len sử dụng
              </Text>
              <Checkbox.Group
                options={["Milk bò", "Cotton loang", "Susan Family"]}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              />
            </div>
          </div>
        </Col>

        {/* DANH SÁCH SẢN PHẨM Ở BÊN PHẢI (3/4) */}
        <Col xs={24} md={18}>
          <Title
            level={2}
            style={{
              color: "#5D4037",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "30px",
              borderBottom: "3px solid #F8BBD0",
              display: "inline-block",
            }}
          >
            KHO CHART MIỄN PHÍ
          </Title>
          <Row gutter={[24, 32]}>
            {mockData.charts.map((pattern) => (
              <Col xs={24} sm={12} lg={8} key={pattern.id}>
                <Link href={`/patterns/${pattern.id}`}>
                  <Card
                    hoverable
                    className="hover-card"
                    cover={
                      <div
                        style={{
                          position: "relative",
                          overflow: "hidden",
                          borderRadius: "20px 20px 0 0",
                        }}
                      >
                        <img
                          alt={pattern.name}
                          src={pattern.image_url}
                          className="card-image"
                          style={{
                            height: "240px",
                            width: "100%",
                            objectFit: "cover",
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
                              padding: "4px 12px",
                              borderRadius: "8px",
                              fontWeight: "bold",
                              border: "none",
                              boxShadow: "0 4px 10px rgba(233,30,99,0.3)",
                              fontSize: "13px",
                            }}
                          >
                            FREE
                          </Tag>
                        )}
                        <div
                          className="card-quick-view"
                          style={{
                            position: "absolute",
                            bottom: -50,
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            background: "rgba(255,255,255,0.9)",
                            padding: "10px",
                            color: "#E91E63",
                            fontWeight: "bold",
                            letterSpacing: "1px",
                          }}
                        >
                          XEM NGAY
                        </div>
                      </div>
                    }
                    style={{
                      borderRadius: "20px",
                      border: "none",
                      boxShadow: "0 10px 20px rgba(93, 64, 55, 0.05)",
                    }}
                    styles={{ body: { padding: "15px 20px" } }}
                  >
                    <Title
                      level={5}
                      style={{
                        margin: "0 0 10px 0",
                        color: "#5D4037",
                        fontWeight: "900",
                        height: "45px",
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
                      }}
                    >
                      <Text type="secondary" style={{ fontSize: "13px" }}>
                        Rate:
                      </Text>
                      <Rate
                        disabled
                        defaultValue={pattern.difficulty_stars}
                        style={{ fontSize: "12px", color: "#F8BBD0" }}
                      />
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
