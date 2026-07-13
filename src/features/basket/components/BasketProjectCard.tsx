"use client";

import React from "react";
import { Typography, Button, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useBasket, BasketProject } from "../stores/BasketContext";

const { Text } = Typography;

type BasketProjectCardProps = {
  project: BasketProject;
};

export default function BasketProjectCard({ project }: BasketProjectCardProps) {
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
