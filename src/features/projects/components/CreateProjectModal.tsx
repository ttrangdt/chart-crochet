"use client";

import React, { useState } from "react";
import { Modal, Input, Button, Space, Form, InputNumber, notification, Divider } from "antd";
import { useProjects, YarnDetail } from "../stores/ProjectsContext";
import { projectStyles } from "./Projects.styles";
import { PlusOutlined as AntPlusOutlined, DeleteOutlined as AntDeleteOutlined, GiftOutlined as AntGiftOutlined } from "@ant-design/icons";

type CreateProjectModalProps = {
  pattern: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
    image_url: string;
    materials: string[];
    tools: string[];
  };
  open: boolean;
  onCancel: () => void;
  onSuccess?: (projectId: string) => void;
};

export default function CreateProjectModal({
  pattern,
  open,
  onCancel,
  onSuccess,
}: CreateProjectModalProps) {
  const { createProject } = useProjects();
  const [form] = Form.useForm();
  const [yarns, setYarns] = useState<YarnDetail[]>([{ brand: "", colorCode: "", lotNumber: "" }]);

  const handleAddYarn = () => {
    setYarns([...yarns, { brand: "", colorCode: "", lotNumber: "" }]);
  };

  const handleRemoveYarn = (index: number) => {
    setYarns(yarns.filter((_, i) => i !== index));
  };

  const handleYarnChange = (index: number, field: keyof YarnDetail, value: string) => {
    const updated = yarns.map((y, i) => (i === index ? { ...y, [field]: value } : y));
    setYarns(updated);
  };

  const handleSubmit = (values: Record<string, string | number>) => {
    const validYarns = yarns.filter((y) => y.brand.trim() !== "");
    
    const newProj = createProject({
      patternId: pattern.id,
      customName: String(values.customName || `Dự án ${pattern.name}`),
      category: pattern.category,
      difficulty: pattern.difficulty,
      imageUrl: pattern.image_url,
      materials: pattern.materials,
      tools: pattern.tools,
      yarnDetails: validYarns,
      notes: String(values.notes || ""),
      targetRows: Number(values.targetRows) || 10,
    });

    notification.success({
      message: "Khởi tạo thành công! 🪄",
      description: `Đã tạo nhật ký dự án "${newProj.customName}" thành công!`,
      duration: 3,
    });

    form.resetFields();
    setYarns([{ brand: "", colorCode: "", lotNumber: "" }]);
    if (onSuccess) onSuccess(newProj.id);
    onCancel();
  };

  return (
    <Modal
      title={
        <div style={{ ...projectStyles.headingText, fontSize: "18px", color: "var(--pink-dark)" }}>
          <AntGiftOutlined /> Bắt đầu dự án đan móc mới
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={480}
      style={{ borderRadius: "20px" }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ customName: `Dự án ${pattern.name}`, targetRows: 10 }}
      >
        <div style={projectStyles.formSection}>
          <label style={projectStyles.formLabel}>Tên riêng dự án của bạn:</label>
          <Form.Item
            name="customName"
            rules={[{ required: true, message: "Vui lòng đặt tên dự án!" }]}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Ví dụ: Súp lơ nhỏ xinh cho Na..." style={projectStyles.formInput} />
          </Form.Item>
        </div>

        <div style={projectStyles.formSection}>
          <label style={projectStyles.formLabel}>Mục tiêu số hàng để đếm (Row Target):</label>
          <Form.Item name="targetRows" style={{ marginBottom: 0 }}>
            <InputNumber min={1} style={{ ...projectStyles.formInput, width: "120px" }} />
          </Form.Item>
        </div>

        <Divider style={{ margin: "16px 0", borderColor: "var(--border-soft)" }}>
          <span style={{ fontSize: "13px", color: "var(--text-sub)", fontWeight: "bold" }}>🧵 Chi tiết len sử dụng (Mã màu & Lô cuộn)</span>
        </Divider>

        <div style={{ ...projectStyles.formSection, ...projectStyles.yarnListContainer }}>
          {yarns.map((yarn, idx) => (
            <Space
              key={idx}
              align="baseline"
              style={{ display: "flex", marginBottom: "8px", justifyContent: "space-between" }}
            >
              <Input
                placeholder="Tên Len (vd: Milk Cotton)"
                value={yarn.brand}
                onChange={(e) => handleYarnChange(idx, "brand", e.target.value)}
                style={{ ...projectStyles.formInput, width: "160px" }}
              />
              <Input
                placeholder="Mã màu (vd: #32)"
                value={yarn.colorCode}
                onChange={(e) => handleYarnChange(idx, "colorCode", e.target.value)}
                style={{ ...projectStyles.formInput, width: "100px" }}
              />
              <Input
                placeholder="Lô len (Dye Lot)"
                value={yarn.lotNumber}
                onChange={(e) => handleYarnChange(idx, "lotNumber", e.target.value)}
                style={{ ...projectStyles.formInput, width: "90px" }}
              />
              {yarns.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<AntDeleteOutlined />}
                  onClick={() => handleRemoveYarn(idx)}
                />
              )}
            </Space>
          ))}
          <Button
            type="dashed"
            icon={<AntPlusOutlined />}
            onClick={handleAddYarn}
            block
            style={{ borderRadius: "10px", marginTop: "4px" }}
          >
            Thêm loại len khác
          </Button>
        </div>

        <Divider style={{ margin: "16px 0", borderColor: "var(--border-soft)" }} />

        <div style={projectStyles.formSection}>
          <label style={projectStyles.formLabel}>Ghi chú ban đầu:</label>
          <Form.Item name="notes" style={{ marginBottom: 0 }}>
            <Input.TextArea
              placeholder="Bạn muốn lưu ý gì khi bắt đầu móc mẫu này không? (vd: móc kim 2.0mm thay vì 2.5mm cho bé thú chặt tay hơn...)"
              rows={3}
              style={projectStyles.formInput}
            />
          </Form.Item>
        </div>

        <Form.Item style={{ marginBottom: 0, marginTop: "24px", textAlign: "right" }}>
          <Space>
            <Button onClick={onCancel} style={{ borderRadius: "10px" }}>
              Hủy bỏ
            </Button>
            <Button type="primary" htmlType="submit" style={{ borderRadius: "10px", background: "var(--pink-dark)", border: "none" }}>
              Tạo dự án 🚀
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}
