"use client";

import React from "react";
import { Card, Tag, Rate, Typography } from "antd";
import Link from "next/link";

import { Pattern } from "@/features/patterns/types/patterns.types";

const { Title, Text } = Typography;

export default function PatternCard({ pattern }: { pattern: Pattern }) {
  return (
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
                height: "260px",
                width: "100%",
                objectFit: "cover",
                borderRadius: "20px 20px 0 0",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "100px",
                background:
                  "linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
                pointerEvents: "none",
              }}
            />
            {pattern.is_free && (
              <Tag
                style={{
                  background: "var(--pink-dark)",
                  color: "#fff",
                  position: "absolute",
                  top: 15,
                  left: 15,
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  border: "none",
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
                color="rgba(255,255,255,0.8)"
                style={{
                  color: "var(--pink-dark)",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "bold",
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
            <div
              className="card-quick-view"
              style={{
                position: "absolute",
                bottom: -50,
                left: 0,
                right: 0,
                textAlign: "center",
                padding: "10px",
                fontWeight: "bold",
                letterSpacing: "1px",
                zIndex: 10,
              }}
            >
              XEM NGAY
            </div>
          </div>
        }
        style={{
          borderRadius: "20px",
          border: "none",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          background: "var(--bg-card)",
        }}
        styles={{ body: { padding: "20px" } }}
      >
        <Title
          level={5}
          style={{
            margin: "0 0 10px 0",
            color: "var(--text-main)",
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
            borderTop: "1px dashed var(--border-soft)",
            paddingTop: "15px",
            marginTop: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "var(--pink-dark)",
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
            <Text style={{ fontSize: "13px", color: "var(--text-sub)" }}>
              Tiệm Handmade
            </Text>
          </div>
          <Text
            style={{
              color: "var(--pink-dark)",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            Chi tiết &rarr;
          </Text>
        </div>
      </Card>
    </Link>
  );
}
