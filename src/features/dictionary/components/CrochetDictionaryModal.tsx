"use client";

import React, { useState, useEffect } from "react";
import { Modal, List, Typography, Tag, Space, Divider, Row, Col, Input, Alert } from "antd";
import { BookOutlined, SearchOutlined, SmileOutlined } from "@ant-design/icons";
import { STITCH_GLOSSARY } from "../constants/stitchGlossary";
import StitchSvg from "./StitchSvg";

const { Title, Text, Paragraph } = Typography;

type CrochetDictionaryModalProps = {
  open: boolean;
  onClose: () => void;
  selectedStitchSymbol?: string; // truyền vào từ viết tắt để tự động mở tab tương ứng
};

export default function CrochetDictionaryModal({
  open,
  onClose,
  selectedStitchSymbol,
}: CrochetDictionaryModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Đồng bộ hóa selectedStitchSymbol vào trường tìm kiếm khi mở Modal ra
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchTerm(selectedStitchSymbol || "");
    }
  }, [open, selectedStitchSymbol]);

  // Bộ lọc tìm kiếm thông minh
  const filteredGlossary = STITCH_GLOSSARY.filter((stitch) => {
    const rawSearch = searchTerm.trim().toLowerCase();
    if (!rawSearch) return true;

    // 1. Khớp chính xác ký hiệu viết tắt (ưu tiên tối cao)
    const usSymbols = stitch.usSymbol.toLowerCase().split(/[/\s]+/).map(s => s.trim()).filter(Boolean);
    const isExactMatch =
      stitch.symbol.toLowerCase() === rawSearch ||
      stitch.usSymbol.toLowerCase() === rawSearch ||
      usSymbols.includes(rawSearch);

    if (isExactMatch) return true;

    // Nếu người dùng nhập ký hiệu rất ngắn (<= 2 ký tự), ta CHỈ tìm trong viết tắt
    if (rawSearch.length <= 2) {
      return (
        stitch.symbol.toLowerCase().includes(rawSearch) ||
        usSymbols.some(us => us.startsWith(rawSearch))
      );
    }

    // Nếu từ khóa dài (> 2 ký tự), lọc rộng trong tên khoa học và mô tả
    return (
      stitch.symbol.toLowerCase().includes(rawSearch) ||
      stitch.usSymbol.toLowerCase().includes(rawSearch) ||
      stitch.nameVi.toLowerCase().includes(rawSearch) ||
      stitch.nameEn.toLowerCase().includes(rawSearch) ||
      stitch.description.toLowerCase().includes(rawSearch)
    );
  });

  // Đưa các mũi khớp chính xác ký hiệu viết tắt lên đầu tiên
  const sortedGlossary = [...filteredGlossary].sort((a, b) => {
    const rawSearch = searchTerm.trim().toLowerCase();
    if (!rawSearch) return 0;
    
    const aUsWords = a.usSymbol.toLowerCase().split(/[/\s]+/).map(s => s.trim()).filter(Boolean);
    const bUsWords = b.usSymbol.toLowerCase().split(/[/\s]+/).map(s => s.trim()).filter(Boolean);
    const aExact = a.symbol.toLowerCase() === rawSearch || aUsWords.includes(rawSearch);
    const bExact = b.symbol.toLowerCase() === rawSearch || bUsWords.includes(rawSearch);
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });

  return (
    <Modal
      title={
        <div style={{ fontSize: "18px", color: "var(--pink-dark)", display: "flex", alignItems: "center", gap: "10px" }}>
          <BookOutlined />
          Từ Điển Mũi Móc Trực Quan & Visual Dictionary
        </div>
      }
      open={open}
      onCancel={() => {
        setSearchTerm("");
        onClose();
      }}
      footer={null}
      width={780}
      style={{ borderRadius: "24px" }}
      destroyOnClose
    >
      <div style={{ marginTop: "15px" }}>
        {/* Thanh Tìm kiếm */}
        <Input
          placeholder="Nhập kí hiệu tra cứu (vd: X, V, A, MR, BLO, sc, inc, dec...)"
          prefix={<SearchOutlined style={{ color: "var(--text-sub)" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{
            borderRadius: "14px",
            height: "44px",
            border: "1.5px solid var(--border-soft)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
            marginBottom: "20px",
          }}
        />

        {selectedStitchSymbol && (
          <Alert
            type="info"
            showIcon
            message={
              <Text strong style={{ color: "var(--text-main)", fontSize: "13px" }}>
                Ký hiệu tra nhanh: <span style={{ color: "var(--pink-dark)" }}>{selectedStitchSymbol}</span>
              </Text>
            }
            description="Bạn có thể xóa chữ trong hộp tìm kiếm để xem tất cả các mũi móc khác trong thư viện."
            style={{ marginBottom: "20px", borderRadius: "14px" }}
            icon={<SmileOutlined style={{ color: "var(--pink-dark)" }} />}
          />
        )}

        <div style={{ maxHeight: "450px", overflowY: "auto", paddingRight: "8px" }}>
          <List
            itemLayout="vertical"
            dataSource={sortedGlossary}
            renderItem={(stitch) => {
              const isMatchedQuery =
                selectedStitchSymbol?.toUpperCase() === stitch.symbol.toUpperCase() ||
                selectedStitchSymbol?.toLowerCase() === stitch.usSymbol.toLowerCase();

              return (
                <List.Item
                  key={stitch.symbol}
                  style={{
                    background: isMatchedQuery ? "rgba(233, 30, 99, 0.04)" : "var(--bg-card)",
                    marginBottom: "16px",
                    borderRadius: "20px",
                    padding: "20px",
                    border: isMatchedQuery
                      ? "1.5px solid var(--pink-dark)"
                      : "1px solid var(--border-soft)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Row gutter={[20, 20]} align="middle">
                    {/* Cột trái: Ký tự, Tên, Miêu tả */}
                    <Col xs={24} sm={16}>
                      <Space align="baseline" wrap style={{ marginBottom: "8px" }}>
                        <Tag
                          color="pink"
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            border: "none",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          Ký tự Việt: {stitch.symbol}
                        </Tag>
                        <Tag
                          color="blue"
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            border: "none",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          Ký tự Mỹ: {stitch.usSymbol}
                        </Tag>
                        <Tag
                          color={
                            stitch.difficulty === "Dễ"
                              ? "green"
                              : stitch.difficulty === "Trung bình"
                              ? "orange"
                              : "red"
                          }
                          style={{ borderRadius: "6px", fontWeight: "bold" }}
                        >
                          Độ khó: {stitch.difficulty}
                        </Tag>
                      </Space>

                      <Title level={4} style={{ margin: "5px 0 10px 0", color: "var(--text-main)", fontWeight: "900" }}>
                        {stitch.nameVi} <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: "normal" }}>({stitch.nameEn})</span>
                      </Title>

                      <Paragraph style={{ color: "var(--text-sub)", fontSize: "13px", lineHeight: "1.6", marginBottom: "15px" }}>
                        {stitch.description}
                      </Paragraph>

                      <Divider style={{ margin: "10px 0", borderColor: "var(--border-soft)" }} />

                      <Text strong style={{ color: "var(--text-main)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                        Các bước thực hiện (Step-by-step):
                      </Text>
                      <ol style={{ paddingLeft: "20px", margin: 0, color: "var(--text-main)", fontSize: "13px", lineHeight: "1.6" }}>
                        {stitch.steps.map((step, idx) => (
                          <li key={idx} style={{ marginBottom: "4px" }}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </Col>

                    {/* Cột phải: Hình vẽ SVG */}
                    <Col xs={24} sm={8} style={{ textAlign: "center" }}>
                      <div style={{ padding: "8px" }}>
                        <StitchSvg type={stitch.svgType} />
                        <Text
                          style={{
                            fontSize: "11px",
                            color: "var(--text-sub)",
                            display: "block",
                            marginTop: "6px",
                            fontStyle: "italic",
                          }}
                        >
                          Hướng dẫn đường luồn sợi
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />

          {filteredGlossary.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
              <Text style={{ color: "var(--text-sub)" }}>Không tìm thấy mũi móc phù hợp với từ khóa &quot;{searchTerm}&quot;</Text>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
