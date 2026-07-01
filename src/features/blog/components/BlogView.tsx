"use client";

import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { BookOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function BlogView() {
  return (
    <div className="animate-fade-in-up">
      <div
        style={{
          textAlign: "center",
          marginBottom: "50px",
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
          }}
        >
          Ghi chép lại hành trình và chia sẻ tip...
        </Paragraph>
      </div>

      <Row gutter={[24, 32]}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Col xs={24} md={8} key={i}>
            <Card
              className="hover-card"
              style={{
                borderRadius: "24px",
                border: "none",
                background: "var(--bg-card)",
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
              }}
            >
              <Title level={4} style={{ color: "var(--pink-dark)", fontWeight: "bold" }}>
                Mẹo nhỏ #{i}: Phân biệt mũi đơn X và mũi chữ V
              </Title>
              <Paragraph style={{ color: "var(--text-sub)", lineHeight: "1.6" }}>
                Chia sẻ bí quyết giúp người mới dễ dàng làm quen với Chart thú.
                Chấm dứt cảnh tháo len móc lại...
              </Paragraph>
              <a
                style={{
                  color: "var(--pink-dark)",
                  fontWeight: "bold",
                  padding: "8px 20px",
                  display: "inline-block",
                  background: "var(--pink-light)",
                  borderRadius: "20px",
                }}
              >
                Đọc tiếp &rarr;
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
