"use client";

import React, { useState } from "react";
import { Typography, Tag, Row, Col, Checkbox, Button, notification } from "antd";
import { useBasket } from "@/features/basket";
import { patternStyles } from "./PatternDetail.styles";
import { Pattern } from "../types/patterns.types";

const { Text, Title } = Typography;

type PatternPreparedChecklistProps = {
  pattern: Pattern;
  preparedItems: Record<string, boolean>;
  togglePreparedItem: (key: string, checked: boolean) => void;
};

export default function PatternPreparedChecklist({
  pattern,
  preparedItems,
  togglePreparedItem,
}: PatternPreparedChecklistProps) {
  const { addProject, hasProject } = useBasket();
  const [notifApi, notifContextHolder] = notification.useNotification();
  const [basketAdding, setBasketAdding] = useState(false);

  return (
    <>
      {notifContextHolder}
      <div style={patternStyles.preparedMaterialsBox}>
        <div style={patternStyles.preparedMaterialsHeader}>
          <Title level={4} style={patternStyles.preparedMaterialsTitle}>
            🎒 Chuẩn Bị Nguyên Liệu & Dụng Cụ
          </Title>
          <Tag style={patternStyles.preparedMaterialsDifficultyTag}>
            Độ khó: {pattern.difficulty}
          </Tag>
        </div>

        <Row gutter={[24, 16]}>
          {/* Cột 1: Nguyên liệu */}
          <Col xs={24} sm={12}>
            <Text strong style={patternStyles.checklistColumnTitle}>
              Nguyên Liệu
            </Text>
            <div style={patternStyles.checklistItemsList}>
              {pattern.materials.map((item: string, i: number) => {
                const itemKey = `material-${i}`;
                const isChecked = !!preparedItems[itemKey];
                return (
                  <div key={itemKey} style={patternStyles.checklistItemRow}>
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => togglePreparedItem(itemKey, e.target.checked)}
                    >
                      <Text
                        style={{
                          color: isChecked ? "var(--text-sub)" : "var(--text-main)",
                          textDecoration: isChecked ? "line-through" : "none",
                          fontSize: "14px",
                          lineHeight: "1.4",
                        }}
                      >
                        {item}
                      </Text>
                    </Checkbox>
                    {!isChecked && (
                      <a
                        href={`https://shopee.vn/search?keyword=${encodeURIComponent(item)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={patternStyles.shopeeBuyLink}
                      >
                        Mua 🛒
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </Col>

          {/* Cột 2: Dụng cụ */}
          <Col xs={24} sm={12}>
            <Text strong style={patternStyles.checklistColumnTitle}>
              Dụng Cụ
            </Text>
            <div style={patternStyles.checklistItemsList}>
              {pattern.tools.map((item: string, i: number) => {
                const itemKey = `tool-${i}`;
                const isChecked = !!preparedItems[itemKey];
                return (
                  <div key={itemKey} style={patternStyles.checklistItemRow}>
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => togglePreparedItem(itemKey, e.target.checked)}
                    >
                      <Text
                        style={{
                          color: isChecked ? "var(--text-sub)" : "var(--text-main)",
                          textDecoration: isChecked ? "line-through" : "none",
                          fontSize: "14px",
                          lineHeight: "1.4",
                        }}
                      >
                        {item}
                      </Text>
                    </Checkbox>
                    {!isChecked && (
                      <a
                        href={`https://shopee.vn/search?keyword=${encodeURIComponent(item)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={patternStyles.shopeeBuyLink}
                      >
                        Mua 🛒
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>

        {/* NÚT BỎ VÀO GIỎ DỰ ÁN */}
        <div style={patternStyles.addToBasketBtnContainer}>
          <Button
            size="large"
            block
            onClick={() => {
              setBasketAdding(true);
              const alreadyIn = hasProject(pattern.id);
              addProject({
                patternId: pattern.id,
                name: pattern.name,
                imageUrl: pattern.image_url,
                materials: pattern.materials,
                tools: pattern.tools,
              });
              notifApi.success({
                message: alreadyIn ? "Đã thêm 1 mẫu nữa! 🧺" : "Thêm vào Giỏ thành công!",
                description: (
                  <span>
                    Nguyên liệu mẫu <strong>{pattern.name}</strong> đã vào Giỏ dự án của bạn rồi nhé! 🌸
                  </span>
                ),
                placement: "topRight",
                duration: 2.5,
              });
              setTimeout(() => setBasketAdding(false), 600);
            }}
            style={{
              background: "linear-gradient(45deg, var(--pink-dark), #d81b60)",
              color: "#fff",
              border: "none",
              borderRadius: "16px",
              height: "52px",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              boxShadow: "0 6px 18px rgba(233, 30, 99, 0.3)",
              transform: basketAdding ? "scale(0.96)" : "scale(1)",
              transition: "transform 0.15s ease",
            }}
          >
            🧺 Bỏ tất cả nguyên liệu mẫu này vào Giỏ đan!
          </Button>
        </div>
      </div>
    </>
  );
}
