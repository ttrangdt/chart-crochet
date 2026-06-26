"use client";

import React, { useState, useMemo } from "react";
import { Typography, Row, Col, Checkbox, Input, Empty, Button } from "antd";
import mockData from "@/data/mockData.json";
import { CopyOutlined, ReloadOutlined } from "@ant-design/icons";
import PatternCard from "@/components/common/PatternCard";

const { Title, Text } = Typography;

export default function PatternListView() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedYarns, setSelectedYarns] = useState<string[]>([]);

  const filteredCharts = useMemo(() => {
    return mockData.charts.filter((chart) => {
      // 1. Search text filter
      if (searchText) {
        const query = searchText.toLowerCase();
        const matchesName = chart.name.toLowerCase().includes(query);
        const matchesDesc = chart.description.toLowerCase().includes(query);
        const matchesMaterials = chart.materials.some(m => m.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesMaterials) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(chart.category)) {
          return false;
        }
      }

      // 3. Difficulty filter
      if (selectedDifficulties.length > 0) {
        if (!selectedDifficulties.includes(chart.difficulty)) {
          return false;
        }
      }

      // 4. Yarn type filter
      if (selectedYarns.length > 0) {
        const hasMatchingYarn = chart.materials.some(m => {
          const matLower = m.toLowerCase();
          return selectedYarns.some(y => {
            if (y === "Milk Cotton") return matLower.includes("milk") || matLower.includes("cotton");
            if (y === "Len Xù Lông Cừu") return matLower.includes("lông cừu") || matLower.includes("xù");
            if (y === "Len Cotton loang") return matLower.includes("loang");
            return matLower.includes(y.toLowerCase());
          });
        });
        if (!hasMatchingYarn) {
          return false;
        }
      }

      return true;
    });
  }, [searchText, selectedCategories, selectedDifficulties, selectedYarns]);

  const handleResetFilters = () => {
    setSearchText("");
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    setSelectedYarns([]);
  };

  return (
    <div className="animate-fade-in-up">
      <Row gutter={[32, 24]}>
        <Col xs={24} md={6}>
          <div
            style={{
              background: "var(--bg-card)",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
              border: "1px solid var(--border-soft)",
              position: "sticky",
              top: "100px",
              zIndex: 10,
            }}
          >
            <div style={{ marginBottom: "25px" }}>
              <Input.Search
                placeholder="Tìm mẫu móc..."
                size="large"
                enterButton
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ borderRadius: "10px", background: "var(--bg-card)" }}
              />
            </div>
            
            {/* Category Filter */}
            <div
              style={{
                marginBottom: "25px",
                borderBottom: "1px dashed var(--border-soft)",
                paddingBottom: "15px",
              }}
            >
              <Text
                strong
                style={{
                  color: "var(--pink-dark)",
                  display: "block",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                Danh mục
              </Text>
              <Checkbox.Group
                options={[
                  { label: "Rau Củ", value: "Rau Củ" },
                  { label: "Con Vật", value: "Con Vật" },
                  { label: "Hoa Lá", value: "Hoa Lá" },
                ]}
                value={selectedCategories}
                onChange={(checkedValues) => setSelectedCategories(checkedValues as string[])}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  color: "var(--text-main)",
                }}
              />
            </div>

            {/* Difficulty Filter */}
            <div
              style={{
                marginBottom: "25px",
                borderBottom: "1px dashed var(--border-soft)",
                paddingBottom: "15px",
              }}
            >
              <Text
                strong
                style={{
                  color: "var(--pink-dark)",
                  display: "block",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                Độ khó
              </Text>
              <Checkbox.Group
                options={[
                  { label: "Dễ", value: "Dễ" },
                  { label: "Vừa", value: "Vừa" },
                  { label: "Khó", value: "Khó" },
                ]}
                value={selectedDifficulties}
                onChange={(checkedValues) => setSelectedDifficulties(checkedValues as string[])}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              />
            </div>

            {/* Yarn Type Filter */}
            <div style={{ marginBottom: "25px" }}>
              <Text
                strong
                style={{
                  color: "var(--pink-dark)",
                  display: "block",
                  marginBottom: "15px",
                  fontSize: "16px",
                }}
              >
                Loại len sử dụng
              </Text>
              <Checkbox.Group
                options={[
                  { label: "Milk Cotton", value: "Milk Cotton" },
                  { label: "Lông Cừu", value: "Len Xù Lông Cừu" },
                  { label: "Cotton Loang", value: "Len Cotton loang" },
                ]}
                value={selectedYarns}
                onChange={(checkedValues) => setSelectedYarns(checkedValues as string[])}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              />
            </div>

            {/* Reset Button */}
            {(searchText || selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedYarns.length > 0) && (
              <Button
                type="dashed"
                danger
                block
                icon={<ReloadOutlined />}
                onClick={handleResetFilters}
                style={{ borderRadius: "10px" }}
              >
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </Col>

        <Col xs={24} md={18}>
          <Title
            level={2}
            style={{
              color: "var(--text-main)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "30px",
              borderBottom: "3px solid var(--pink-dark)",
              display: "inline-block",
            }}
          >
            <CopyOutlined /> KHO CHART ĐAN MÓC ({filteredCharts.length})
          </Title>
          
          {filteredCharts.length > 0 ? (
            <Row gutter={[24, 32]}>
              {filteredCharts.map((pattern) => (
                <Col xs={24} sm={12} lg={8} key={pattern.id}>
                  <PatternCard pattern={pattern} />
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ padding: "60px 0", background: "var(--bg-card)", borderRadius: "20px", border: "1px solid var(--border-soft)" }}>
              <Empty
                description={
                  <span style={{ color: "var(--text-sub)", fontSize: "16px" }}>
                    Huhu, không tìm thấy mẫu nào phù hợp với bộ lọc rồi... 😢
                  </span>
                }
              >
                <Button type="primary" onClick={handleResetFilters} style={{ borderRadius: "20px", background: "var(--pink-dark)", border: "none" }}>
                  Xem tất cả Chart
                </Button>
              </Empty>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
