"use client";

import React, { useState } from "react";
import {
  Typography,
  Row,
  Col,
  Tag,
  Modal,
  Button,
  Divider,
  Avatar,
  Card,
} from "antd";
import mockData from "@/data/mockData.json";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftOutlined,
  CopyOutlined,
  MessageOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

// Bảng Từ Điển Ký Hiệu Đan Móc Mẫu
const STITCH_DICTIONARY: Record<
  string,
  { name: string; desc: string; tip: string }
> = {
  MR: {
    name: "Magic Ring(Vòng tròn ma thuật)",
    desc: "Dùng để bắt đầu móc các bộ phận hình tròn/khối cầu.",
    tip: "Kéo chặt đuôi chỉ để giấu lỗ hổng ở giữa nhé!",
  },
  CH: {
    name: "Chain Stitch(Mũi xích/Mũi bính)",
    desc: "Mũi bính được dùng để tạo nền móc hoặc làm phần khởi đầu của sản phẩm.",
    tip: "Kéo len qua vòng trên kim để tạo thành một chuỗi các vòng liên tiếp.",
  },
  X: {
    name: "Single Crochet (Mũi Đơn)",
    desc: "Mũi cơ bản nhất, tạo sự chặt chẽ cho sản phẩm.",
    tip: "Siết nút vừa tay để bề mặt len đều phẳng.",
  },
  V: {
    name: "Increase (Mũi Tăng)",
    desc: "Móc 2 mũi đơn (X) vào cùng 1 chân để mở rộng vòng.",
    tip: "Chú ý đếm mũi cẩn thận ở các vòng tăng V.",
  },
  A: {
    name: "Decrease (Mũi Giảm/Tàng Hình)",
    desc: "Móc gộp 2 móc màng ngoài lại thành 1 để thu hẹp vòng không để lại lỗ.",
    tip: "Giảm tàng hình giúp thú bông không bị hở bông gòn bên trong.",
  },
};

export default function PatternDetailView() {
  const params = useParams();
  const pattern = mockData.charts.find((p) => p.id === params.id);

  // Quản lý Modal Ký hiệu
  const [modalOpen, setModalOpen] = useState(false);
  const [activeStitch, setActiveStitch] = useState<string | null>(null);

  const openStitchHelp = (stitchKey: string) => {
    setActiveStitch(stitchKey);
    setModalOpen(true);
  };

  // Nếu id giả/chưa có DB
  if (!pattern)
    return (
      <div style={{ textAlign: "center", marginTop: 50, color: "#E91E63" }}>
        Không tìm thấy mẫu này 😥
      </div>
    );

  return (
    <div
      className="animate-fade-in-up"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        background: "#fff",
        padding: "50px",
        borderRadius: "32px",
        boxShadow: "0 8px 30px rgba(248,187,208,0.2)",
      }}
    >
      {/* Nút quay lại */}
      <Link
        href="/patterns"
        style={{ display: "inline-block", marginBottom: "20px" }}
      >
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          style={{ color: "#E91E63", fontWeight: "bold" }}
        >
          Quay lại Kho Chart
        </Button>
      </Link>

      {/* SINGLE COLUMN: 1 CỘT DUY NHẤT ĐỂ TẬP TRUNG */}
      <Title level={1} style={{ color: "#5D4037", marginBottom: "20px" }}>
        {pattern.name}
      </Title>

      {/* Thông số kỹ thuật Badge */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <Tag
          color="#F8BBD0"
          style={{
            color: "#5D4037",
            padding: "6px 15px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            border: "none",
          }}
        >
          Len: {pattern.materials[0]}
        </Tag>
        <Tag
          color="#F8BBD0"
          style={{
            color: "#5D4037",
            padding: "6px 15px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            border: "none",
          }}
        >
          Kim: {pattern.tools[0]}
        </Tag>
        <Tag
          color="#E91E63"
          style={{
            padding: "6px 15px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            border: "none",
          }}
        >
          Độ khó: {pattern.difficulty}
        </Tag>
      </div>

      {/* Ảnh Mẫu hiển thị cuộn ngang mini-gallery giả lập */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto",
          paddingBottom: "10px",
          marginBottom: "40px",
        }}
      >
        <img
          src={pattern.img}
          alt={pattern.name}
          style={{
            height: "350px",
            minWidth: "100%",
            objectFit: "cover",
            borderRadius: "24px",
          }}
        />
        {/* Trong DB thật sẽ render nhiều ảnh */}
      </div>

      <Paragraph
        style={{
          fontSize: "16px",
          color: "#666",
          fontStyle: "italic",
          borderLeft: "4px solid #E91E63",
          paddingLeft: "15px",
          marginBottom: "40px",
        }}
      >
        {pattern.description}
      </Paragraph>

      <Divider style={{ borderColor: "#FFF5F7", margin: "40px 0" }} />

      {/* PHẦN KÝ HIỆU KHOA HỌC: CHEAT SHEET NHANH */}
      <div
        style={{
          background: "#FFF5F7",
          padding: "20px 30px",
          borderRadius: "20px",
          marginBottom: "40px",
        }}
      >
        <Title level={4} style={{ color: "#E91E63", marginBottom: "15px" }}>
          <CopyOutlined /> Ký hiệu sử dụng
        </Title>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {["MR", "CH", "X", "V", "A"].map((k) => (
            <Button
              key={k}
              onClick={() => openStitchHelp(k)}
              style={{
                fontWeight: "bold",
                color: "#5D4037",
                borderColor: "#F8BBD0",
                borderRadius: "10px",
              }}
            >
              {k}
            </Button>
          ))}
        </div>
        {/* <Text
          style={{
            fontSize: "13px",
            color: "#E91E63",
            display: "block",
            marginTop: "10px",
          }}
        >
          * Tính năng Popup Tra Cứu siêu xịn dành cho người mới!
        </Text> */}
      </div>

      {/* HƯỚNG DẪN CHI TIẾT */}
      <Title
        level={3}
        style={{
          color: "#5D4037",
          textTransform: "uppercase",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        HƯỚNG DẪN MÓC CHI TIẾT
      </Title>

      {Object.entries(pattern.content).map(([part, steps], idx) => (
        <div key={idx} style={{ marginBottom: "40px" }}>
          <div
            style={{
              fontWeight: "900",
              color: "#fff",
              background: "#E91E63",
              display: "inline-block",
              padding: "8px 20px",
              borderRadius: "20px",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            {part}
          </div>
          <table
            className="info-table"
            style={{ width: "100%", fontSize: "16px" }}
          >
            <tbody>
              {(steps as string[]).map((step, index) => {
                const rowSplit = step.split(":");
                // Tô màu nhẹ chẵn lẻ cho dễ nhìn dòng
                const isEven = index % 2 === 0;
                return (
                  <tr
                    key={index}
                    style={{ background: isEven ? "#fff" : "#FAFAFA" }}
                  >
                    <td
                      style={{
                        fontWeight: "bold",
                        width: "80px",
                        textAlign: "center",
                        color: "#E91E63",
                        border: "1px solid #eee",
                        padding: "15px",
                      }}
                    >
                      {rowSplit[0]}
                    </td>
                    <td
                      style={{
                        color: "#444",
                        fontWeight: "500",
                        border: "1px solid #eee",
                        padding: "15px",
                      }}
                    >
                      {rowSplit[1] ? rowSplit[1].trim() : step}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

      {/* Phần Text Bổ Sang / Lời Kết Gắn Bó (Dummy text content) */}
      <div style={{ margin: "50px 0" }}>
        <Title level={4} style={{ color: "#5D4037" }}>
          Lưu ý nhỏ từ Tiệm:
        </Title>
        <Paragraph
          style={{ fontSize: "16px", color: "#666", lineHeight: "1.8" }}
        >
          Để bé thú bông giữ được form dáng tốt nhất, các bạn nhớ nhồi bông thật
          chặt ở các góc bo cong nhé. Len thừa sau khi kết thúc có thể dùng kim
          khâu luồn giấu kỹ vào bên trong. Chúc các bạn thành công! Đừng quên
          khoe ảnh bên dưới cho tiệm xem nhée.
        </Paragraph>
      </div>

      <Divider style={{ borderColor: "#F8BBD0" }} />

      {/* BÌNH LUẬN VÀ TRẢ BÀI */}
      <Title level={4} style={{ color: "#E91E63", marginBottom: "20px" }}>
        <MessageOutlined /> Bình luận & Trả ảnh (12)
      </Title>

      <Row gutter={[16, 16]}>
        {[
          {
            author: "Trần Vân Anh",
            content: "Mẫu dễ thương xỉu, chart viết cực kỳ dễ hiểu ạ huhu!",
            verified: true,
          },
          {
            author: "Chích Bông",
            content:
              "Mình mất 2 tiếng để hoàn thành, dùng len milk bò ra dáng xinh lắm nha mng.",
            verified: false,
          },
        ].map((item, index) => (
          <Col span={24} key={index}>
            <Card size="small" style={{ borderRadius: 8 }}>
              <div className="flex items-start gap-4">
                <Avatar
                  style={{ backgroundColor: "#F8BBD0", color: "#5D4037" }}
                >
                  {item.author[0]}
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Text strong style={{ color: "#5D4037" }}>
                      {item.author}
                    </Text>
                    {item.verified && (
                      <CheckCircleFilled style={{ color: "#52c41a" }} />
                    )}
                  </div>
                  <Text style={{ color: "#666" }}>{item.content}</Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* POPUP CHEAT SHEET KÝ HIỆU */}
      <Modal
        title={null}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={450}
        bodyStyle={{ padding: "30px", textAlign: "center" }}
      >
        {activeStitch && STITCH_DICTIONARY[activeStitch] && (
          <div>
            <div
              style={{
                fontSize: "50px",
                color: "#E91E63",
                fontWeight: "900",
                marginBottom: "10px",
              }}
            >
              {activeStitch}
            </div>
            <Title level={3} style={{ color: "#5D4037" }}>
              {STITCH_DICTIONARY[activeStitch].name}
            </Title>
            <Paragraph style={{ fontSize: "16px", color: "#666" }}>
              {STITCH_DICTIONARY[activeStitch].desc}
            </Paragraph>
            <div
              style={{
                background: "#FFF5F7",
                padding: "15px",
                borderRadius: "15px",
                marginTop: "20px",
                color: "#E91E63",
                border: "1px dashed #F8BBD0",
              }}
            >
              <b>Mẹo xịn:</b> {STITCH_DICTIONARY[activeStitch].tip}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
