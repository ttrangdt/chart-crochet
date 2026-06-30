"use client";

import React, { useState } from "react";
import {
  Row,
  Col,
  Typography,
  Button,
  Divider,
  Empty,
  Checkbox,
  Tooltip,
  Tabs,
} from "antd";
import { DeleteOutlined, ShoppingOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useBasket, BasketProject } from "@/components/BasketContext";
import { useProjects, ActiveProject } from "@/components/projects/ProjectsContext";
import ProjectList from "@/components/projects/ProjectList";

const { Title, Text } = Typography;

// ──────────────────────────────────────
// Gom nhóm nguyên liệu tổng hợp từ cả Giỏ đan và Dự án đang thực hiện
// ──────────────────────────────────────
type AggregatedItem = { name: string; count: number; isTools: boolean };

function aggregateItems(
  basketProjects: BasketProject[],
  activeProjects: ActiveProject[]
): AggregatedItem[] {
  const map = new Map<string, AggregatedItem>();

  // 1. Gom nhóm từ giỏ mua sắm (BasketContext)
  for (const proj of basketProjects) {
    for (const mat of proj.materials) {
      const key = mat;
      const existing = map.get(key);
      if (existing) {
        existing.count += proj.quantity;
      } else {
        map.set(key, { name: mat, count: proj.quantity, isTools: false });
      }
    }
    for (const tool of proj.tools) {
      const key = "tool::" + tool;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { name: tool, count: 1, isTools: true });
      }
    }
  }

  // 2. Gom nhóm thêm từ dự án đang lên kế hoạch hoặc đang móc (chưa hoàn thành)
  for (const proj of activeProjects) {
    if (proj.status === "completed") continue;
    for (const mat of proj.materials) {
      const key = mat;
      const existing = map.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(key, { name: mat, count: 1, isTools: false });
      }
    }
    for (const tool of proj.tools) {
      const key = "tool::" + tool;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { name: tool, count: 1, isTools: true });
      }
    }
  }

  return Array.from(map.values());
}

// ──────────────────────────────────────
// Component Card dự án nhỏ cho tab Giỏ đồ
// ──────────────────────────────────────
function ProjectCard({ project }: { project: BasketProject }) {
  const { updateQuantity, removeProject } = useBasket();
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-soft)",
        borderRadius: "18px",
        padding: "14px",
        display: "flex",
        gap: "12px",
        alignItems: "flex-start",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 6px 20px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Ảnh nhỏ */}
      <img
        src={project.imageUrl}
        alt={project.name}
        style={{
          width: "62px",
          height: "62px",
          borderRadius: "12px",
          objectFit: "cover",
          border: "2px solid var(--border-soft)",
          flexShrink: 0,
        }}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          strong
          style={{
            color: "var(--text-main)",
            fontSize: "14px",
            display: "block",
            marginBottom: "8px",
            lineHeight: "1.3",
          }}
          ellipsis
        >
          {project.name}
        </Text>

        {/* Bộ đếm số lượng */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => updateQuantity(project.patternId, project.quantity - 1)}
            disabled={project.quantity <= 1}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "1.5px solid var(--border-soft)",
              background: project.quantity <= 1 ? "var(--panel-bg)" : "var(--bg-card)",
              color: "var(--pink-dark)",
              cursor: project.quantity <= 1 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease",
            }}
          >
            −
          </button>

          <span
            style={{
              fontWeight: "900",
              fontSize: "18px",
              color: "var(--pink-dark)",
              minWidth: "24px",
              textAlign: "center",
            }}
          >
            {project.quantity}
          </span>

          <button
            onClick={() => updateQuantity(project.patternId, project.quantity + 1)}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              border: "none",
              background: "var(--pink-dark)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 3px 8px rgba(233,30,99,0.3)",
              transition: "all 0.2s ease",
            }}
          >
            +
          </button>

          <Text style={{ fontSize: "12px", color: "var(--text-sub)", marginLeft: "4px" }}>
            mẫu
          </Text>
        </div>
      </div>

      {/* Xoá */}
      <Tooltip title="Xóa khỏi giỏ">
        <Button
          type="text"
          danger
          size="small"
          icon={<DeleteOutlined />}
          onClick={() => removeProject(project.patternId)}
          style={{ flexShrink: 0, marginTop: "2px" }}
        />
      </Tooltip>
    </div>
  );
}

// ──────────────────────────────────────
// Trang chính BasketView
// ──────────────────────────────────────
export default function BasketView() {
  const { projects: basketProjects } = useBasket();
  const { projects: activeProjects } = useProjects();
  const aggregated = aggregateItems(basketProjects, activeProjects);
  const materials = aggregated.filter((i) => !i.isTools);
  const tools = aggregated.filter((i) => i.isTools);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const toggleChecked = (key: string) =>
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));

  const totalBasketProjects = basketProjects.reduce((s, p) => s + p.quantity, 0);

  const SHOPEE_AFFILIATE = "https://shope.ee/AKf31hdsoh"; // link affiliate tổng hợp Shopee

  return (
    <div className="animate-fade-in-up">
      {/* ─── Tiêu đề trang ─── */}
      <div style={{ marginBottom: "36px", textAlign: "center" }}>
        <Title
          level={2}
          style={{
            color: "var(--pink-dark)",
            margin: 0,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          🧺 Phòng Làm Việc & Giỏ Của Tôi
        </Title>
        <Text style={{ color: "var(--text-sub)", fontSize: "16px" }}>
          Nhật ký hành trình đan móc và bộ sưu tập nguyên vật liệu của riêng bạn~
        </Text>
      </div>

      <Tabs
        defaultActiveKey="diary"
        centered
        size="large"
        items={[
          {
            key: "diary",
            label: "📔 Nhật Ký Dự Án",
            children: (
              <div style={{ paddingTop: "15px" }}>
                <ProjectList />
              </div>
            ),
          },
          {
            key: "basket",
            label: "🛒 Giỏ Mua Nguyên Liệu",
            children: (
              <div style={{ paddingTop: "15px" }}>
                {basketProjects.length === 0 && activeProjects.filter((p) => p.status !== "completed").length === 0 ? (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                      <span style={{ color: "var(--text-sub)", fontSize: "15px" }}>
                        Hiện tại giỏ mua sắm trống và chưa có dự án đang hoạt động. Thêm vật liệu từ chart để bắt đầu nhé 🌸
                      </span>
                    }
                  >
                    <Link href="/patterns">
                      <Button
                        type="primary"
                        size="large"
                        style={{
                          background: "var(--pink-dark)",
                          border: "none",
                          borderRadius: "20px",
                          fontWeight: "bold",
                          height: "46px",
                          padding: "0 30px",
                        }}
                      >
                        Khám phá Kho Chart
                      </Button>
                    </Link>
                  </Empty>
                ) : (
                  <Row gutter={[28, 28]}>
                    {/* Cột trái: Danh sách dự án đang chuẩn bị nguyên liệu */}
                    <Col xs={24} md={8}>
                      <div
                        style={{
                          background: "var(--panel-bg)",
                          borderRadius: "24px",
                          padding: "24px",
                          border: "1px solid var(--border-soft)",
                          position: "sticky",
                          top: "100px",
                        }}
                      >
                        <Title
                          level={4}
                          style={{
                            color: "var(--text-main)",
                            margin: "0 0 20px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          🛍️ Cần chuẩn bị mua
                        </Title>

                        {basketProjects.length > 0 ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            {basketProjects.map((p) => (
                              <ProjectCard key={p.patternId} project={p} />
                            ))}
                          </div>
                        ) : (
                          <div style={{ padding: "20px 0", textAlign: "center", color: "var(--text-sub)", fontStyle: "italic" }}>
                            Không có dự án độc lập trong giỏ. Nguyên liệu đang tự động tổng hợp từ các Dự án đang móc ở Tab bên.
                          </div>
                        )}

                        <Divider style={{ borderColor: "var(--border-soft)", margin: "20px 0" }} />

                        <div style={{ textAlign: "center" }}>
                          <Text style={{ color: "var(--text-sub)", fontSize: "13px" }}>
                            Giỏ mua sắm:{" "}
                            <strong style={{ color: "var(--pink-dark)" }}>
                              {totalBasketProjects} mẫu
                            </strong>{" "}
                            được chọn 🌸
                          </Text>
                        </div>
                      </div>
                    </Col>

                    {/* Cột phải: Danh sách tổng hợp tất cả nguyên liệu */}
                    <Col xs={24} md={16}>
                      <div
                        style={{
                          background: "var(--bg-card)",
                          borderRadius: "24px",
                          padding: "28px",
                          border: "1px solid var(--border-soft)",
                          boxShadow: "0 6px 25px rgba(0,0,0,0.04)",
                        }}
                      >
                        <Title
                          level={4}
                          style={{
                            color: "var(--pink-dark)",
                            margin: "0 0 8px 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          ✨ Nguyên liệu tổng hợp (Auto-combined)
                        </Title>
                        <Text style={{ color: "var(--text-sub)", fontSize: "14px", display: "block", marginBottom: "24px" }}>
                          Tích vào ô khi bạn đã mua gọn được món đó. Danh sách được cập nhật phối hợp tự động từ cả giỏ hàng và các dự án chưa làm xong. 🛍
                        </Text>

                        {/* Nhóm: Nguyên liệu */}
                        {materials.length > 0 && (
                          <div style={{ marginBottom: "24px" }}>
                            <Text
                              strong
                              style={{
                                color: "var(--text-main)",
                                fontSize: "14px",
                                borderLeft: "3px solid var(--pink-dark)",
                                paddingLeft: "10px",
                                display: "block",
                                marginBottom: "14px",
                              }}
                            >
                              🧶 Len & Nguyên liệu
                            </Text>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {materials.map((item) => {
                                const key = item.name;
                                const isDone = !!checkedItems[key];
                                const shopeeUrl = `https://shopee.vn/search?keyword=${encodeURIComponent(item.name)}`;
                                return (
                                  <div
                                    key={key}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px 14px",
                                      borderRadius: "12px",
                                      background: isDone ? "var(--panel-bg)" : "var(--bg-card)",
                                      border: "1px solid var(--border-soft)",
                                      transition: "all 0.3s ease",
                                      opacity: isDone ? 0.6 : 1,
                                    }}
                                  >
                                    <Checkbox
                                      checked={isDone}
                                      onChange={() => toggleChecked(key)}
                                      style={{ marginRight: "4px" }}
                                    >
                                      <Text
                                        style={{
                                          color: isDone ? "var(--text-sub)" : "var(--text-main)",
                                          textDecoration: isDone ? "line-through" : "none",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {item.name}
                                        {item.count > 1 && (
                                          <span
                                            style={{
                                              marginLeft: "8px",
                                              background: "var(--pink-dark)",
                                              color: "#fff",
                                              borderRadius: "8px",
                                              padding: "1px 8px",
                                              fontSize: "12px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            ×{item.count}
                                          </span>
                                        )}
                                      </Text>
                                    </Checkbox>
                                    {!isDone && (
                                      <a
                                        href={shopeeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#EE4D2D",
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          whiteSpace: "nowrap",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                        }}
                                      >
                                        <ShoppingOutlined /> Mua
                                      </a>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Nhóm: Dụng cụ */}
                        {tools.length > 0 && (
                          <div style={{ marginBottom: "24px" }}>
                            <Text
                              strong
                              style={{
                                color: "var(--text-main)",
                                fontSize: "14px",
                                borderLeft: "3px solid var(--pink-dark)",
                                paddingLeft: "10px",
                                display: "block",
                                marginBottom: "14px",
                              }}
                            >
                              ✂️ Dụng cụ
                            </Text>
                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                              {tools.map((item) => {
                                const key = "tool::" + item.name;
                                const isDone = !!checkedItems[key];
                                const shopeeUrl = `https://shopee.vn/search?keyword=${encodeURIComponent(item.name)}`;
                                return (
                                  <div
                                    key={key}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      padding: "10px 14px",
                                      borderRadius: "12px",
                                      background: isDone ? "var(--panel-bg)" : "var(--bg-card)",
                                      border: "1px solid var(--border-soft)",
                                      transition: "all 0.3s ease",
                                      opacity: isDone ? 0.6 : 1,
                                    }}
                                  >
                                    <Checkbox
                                      checked={isDone}
                                      onChange={() => toggleChecked(key)}
                                    >
                                      <Text
                                        style={{
                                          color: isDone ? "var(--text-sub)" : "var(--text-main)",
                                          textDecoration: isDone ? "line-through" : "none",
                                          fontSize: "14px",
                                        }}
                                      >
                                        {item.name}
                                      </Text>
                                    </Checkbox>
                                    {!isDone && (
                                      <a
                                        href={shopeeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          color: "#EE4D2D",
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                          display: "flex",
                                          alignItems: "center",
                                          gap: "4px",
                                        }}
                                      >
                                        <ShoppingOutlined /> Mua
                                      </a>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <Divider style={{ borderColor: "var(--border-soft)", margin: "24px 0" }} />

                        {/* Nút Mua Trọn Bộ Shopee */}
                        <a
                          href={SHOPEE_AFFILIATE}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button
                            style={{
                              width: "100%",
                              padding: "16px 24px",
                              background: "linear-gradient(45deg, #EE4D2D, #FF7337)",
                              color: "#fff",
                              border: "none",
                              borderRadius: "20px",
                              fontSize: "17px",
                              fontWeight: "bold",
                              cursor: "pointer",
                              letterSpacing: "0.5px",
                              boxShadow: "0 8px 24px rgba(238,77,45,0.35)",
                              transition: "all 0.3s ease",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "translateY(-2px)";
                              e.currentTarget.style.boxShadow = "0 12px 30px rgba(238,77,45,0.45)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "0 8px 24px rgba(238,77,45,0.35)";
                            }}
                          >
                            🛍 Mua trọn bộ nguyên liệu này trên Shopee!
                          </button>
                        </a>

                        <Text
                          style={{
                            display: "block",
                            textAlign: "center",
                            fontSize: "12px",
                            color: "var(--text-sub)",
                            marginTop: "10px",
                          }}
                        >
                          Tiệm Len Nhỏ có thể nhận hoa hồng khi bạn mua qua link này — cảm ơn bạn đã ủng hộ tiệm! 🌸
                        </Text>
                      </div>
                    </Col>
                  </Row>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
