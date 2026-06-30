"use client";

import React, { useState } from "react";
import { Card, Tag, Progress, Button, Tooltip, Space, Badge, Modal, Form, Input, Select, InputNumber, Divider } from "antd";
import { EditOutlined, DeleteOutlined, CompassOutlined, CalendarOutlined, FileTextOutlined } from "@ant-design/icons";
import { ActiveProject, useProjects } from "./ProjectsContext";
import { projectStyles } from "./styles";
import Link from "next/link";

type ProjectCardProps = {
  project: ActiveProject;
};

export default function ProjectCard({ project }: { project: ActiveProject }) {
  const { deleteProject, updateProjectState, setActiveProjectForPattern } = useProjects();
  const [hovered, setHovered] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form] = Form.useForm();

  // Progress calculations
  const completedStepsKeys = Object.keys(project.completedSteps);
  const completedStepCount = completedStepsKeys.filter(k => project.completedSteps[k]).length;
  
  // To avoid dividing by zero or if custom total is not available, we can compute it if we know the chart.
  // Wait, let's just use a simplified formula:
  // If the project doesn't have chart steps count, we can retrieve steps from context or mockData
  // Let's compute custom progress
  // Since we pass materials/tools list, let's see how many items.
  // Wait, we can pass steps count too or let's load it from mockData based on patternId!
  const mockData = require("@/data/mockData.json");
  const pattern = mockData.charts.find((c: any) => c.id === project.patternId);
  const stepCount = pattern ? Object.values(pattern.content).reduce((sum: number, steps: any) => sum + steps.length, 0) : 0;
  const progressPercent = stepCount > 0 ? Math.round((completedStepCount / stepCount) * 100) : 0;

  const handleDelete = () => {
    Modal.confirm({
      title: "Xác nhận xóa dự án",
      content: `Bạn có chắc muốn xóa dự án "${project.customName}"? Toàn bộ nhật ký và tiến độ lưu trữ của dự án sẽ bị mất vĩnh viễn.`,
      okText: "Xóa ngay",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteProject(project.id);
      },
    });
  };

  const handleEditSubmit = (values: any) => {
    updateProjectState(project.id, {
      customName: values.customName,
      status: values.status,
      notes: values.notes,
      targetRows: values.targetRows,
    });
    setEditModalOpen(false);
  };

  const getStatusTag = (status: ActiveProject["status"]) => {
    switch (status) {
      case "planning":
        return <Tag style={projectStyles.badgePlanning}>📋 Lên kế hoạch</Tag>;
      case "progressing":
        return <Tag style={projectStyles.badgeProgressing}>⚡ Đang móc</Tag>;
      case "completed":
        return <Tag style={projectStyles.badgeCompleted}>🎉 Hoàn thành</Tag>;
    }
  };

  return (
    <>
      <Card
        hoverable
        style={{
          ...projectStyles.card,
          ...(hovered ? projectStyles.cardHover : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        styles={{ body: { padding: "16px" } }}
      >
        <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <img
            src={project.imageUrl}
            alt={project.customName}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "14px",
              objectFit: "cover",
              border: "1.5px solid var(--border-soft)",
              flexShrink: 0,
            }}
          />

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "5px" }}>
              <span style={{ fontSize: "12px", color: "var(--text-sub)", fontWeight: "bold" }}>
                Mẫu: {pattern?.name || "Ẩn danh"}
              </span>
              {getStatusTag(project.status)}
            </div>
            
            <span
              style={{
                fontSize: "16px",
                fontWeight: "900",
                color: "var(--text-main)",
                display: "block",
                margin: "4px 0 8px 0",
                lineHeight: "1.3",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={project.customName}
            >
              {project.customName}
            </span>

            {/* Yarn lot helper */}
            {project.yarnDetails && project.yarnDetails.length > 0 && (
              <div style={{ marginBottom: "6px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {project.yarnDetails.map((y, i) => (
                  <Tag key={i} size="small" style={{ fontSize: "10px", margin: 0 }}>
                    🧵 {y.brand} {y.colorCode ? `(Màu ${y.colorCode})` : ""} {y.lotNumber ? `- Lô ${y.lotNumber}` : ""}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Progress block */}
        <div style={{ margin: "14px 0 10px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "4px", color: "var(--text-sub)" }}>
            <span>Hàng móc: {completedStepCount}/{stepCount} ({progressPercent}%)</span>
            <span>Bộ đếm: {project.rowCount}/{project.targetRows} hàng</span>
          </div>
          <Progress
            percent={progressPercent}
            size="small"
            strokeColor={project.status === "completed" ? "#2E7D32" : "var(--pink-dark)"}
            trailColor="var(--panel-bg)"
          />
        </div>

        {/* Notes quick read */}
        {project.notes && (
          <div
            style={{
              background: "var(--panel-bg)",
              borderRadius: "8px",
              padding: "6px 10px",
              fontSize: "12px",
              color: "var(--text-sub)",
              display: "flex",
              alignItems: "flex-start",
              gap: "6px",
              marginBottom: "12px",
            }}
          >
            <FileTextOutlined style={{ marginTop: "3px", color: "var(--pink-dark)" }} />
            <span style={{ fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {project.notes}
            </span>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--text-sub)" }}>
          <div>
            <CalendarOutlined /> <span style={{ fontSize: "11px" }}>{new Date(project.createdDate).toLocaleDateString("vi-VN")}</span>
          </div>

          <Space>
            <Tooltip title="Chỉnh sửa chi tiết">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined style={{ color: "var(--text-sub)" }} />}
                onClick={() => {
                  form.setFieldsValue({
                    customName: project.customName,
                    status: project.status,
                    notes: project.notes,
                    targetRows: project.targetRows,
                  });
                  setEditModalOpen(true);
                }}
              />
            </Tooltip>

            <Tooltip title="Xóa dự án">
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
              />
            </Tooltip>

            <Link href={`/patterns/${project.patternId}`} passHref>
              <Button
                type="primary"
                size="small"
                icon={<CompassOutlined />}
                onClick={() => {
                  setActiveProjectForPattern(project.patternId, project.id);
                }}
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  background: "var(--pink-dark)",
                  border: "none",
                }}
              >
                Móc Ngay
              </Button>
            </Link>
          </Space>
        </div>
      </Card>

      {/* Edit Project details modal */}
      <Modal
        title={
          <div style={{ ...projectStyles.headingText, color: "var(--pink-dark)" }}>
            Chỉnh sửa tiến trình dự án
          </div>
        }
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        onOk={() => form.submit()}
        okText="Lưu lại"
        cancelText="Bỏ qua"
        destroyOnClose
        style={{ borderRadius: "20px" }}
      >
        <Form form={form} layout="vertical" onFinish={handleEditSubmit} style={{ marginTop: "15px" }}>
          <Form.Item
            name="customName"
            label={<span style={projectStyles.formLabel}>Tên riêng dự án:</span>}
            rules={[{ required: true, message: "Tên dự án không được bỏ trống!" }]}
          >
            <Input style={projectStyles.formInput} />
          </Form.Item>

          <Form.Item
            name="status"
            label={<span style={projectStyles.formLabel}>Trạng thái:</span>}
          >
            <Select style={{ borderRadius: "10px" }}>
              <Select.Option value="planning">📋 Lên kế hoạch</Select.Option>
              <Select.Option value="progressing">⚡ Đang móc</Select.Option>
              <Select.Option value="completed">🎉 Hoàn thành</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="targetRows"
            label={<span style={projectStyles.formLabel}>Mục tiêu hàng đếm (Row Target):</span>}
          >
            <InputNumber min={1} style={{ ...projectStyles.formInput, width: "120px" }} />
          </Form.Item>

          <Form.Item
            name="notes"
            label={<span style={projectStyles.formLabel}>Ghi chú đan móc:</span>}
          >
            <Input.TextArea rows={3} style={projectStyles.formInput} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
