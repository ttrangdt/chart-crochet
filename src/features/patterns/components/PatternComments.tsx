"use client";

import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Rate, Checkbox, Input, Button, Divider, List, Avatar, message } from "antd";
import {
  MessageOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useTheme } from "@/features/theme";
import { Pattern, CommentType } from "../types/patterns.types";

const { Title, Text } = Typography;

type PatternCommentsProps = {
  pattern: Pattern;
};

export default function PatternComments({ pattern }: PatternCommentsProps) {
  const { theme } = useTheme();
  const CheckIcon = theme === "matcha" ? CheckCircleOutlined : CheckCircleFilled;

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [commentVerified, setCommentVerified] = useState(true);
  const [commentImage, setCommentImage] = useState<string>("");

  useEffect(() => {
    if (pattern) {
      const defaultComments: CommentType[] = [
        {
          id: "1",
          author: "Trần Vân Anh",
          content: "Trời ơi mẫu dễ thương xỉu, chart tách chữ đậm nhạt nhìn dễ đọc quá! Mình móc bằng len Milk Cotton 50g mượt lắm.",
          verified: true,
          rating: 5,
          image: pattern.image_url,
          date: "01/06/2026",
        },
        {
          id: "2",
          author: "Chích Bông",
          content: "Mình mất 2 tiếng để hoàn thành, dùng len milk bò ra dáng béo béo xinh lắm nha mng. Móc đoạn R12 hơi đau tay một tí nhưng thành phẩm xứng đáng.",
          verified: true,
          rating: 4,
          image: pattern.img || pattern.image_url,
          date: "31/05/2026",
        },
        {
          id: "3",
          author: "Hoàng Yến",
          content: "Mẫu xinh xỉu luôn ạ! Cảm ơn tiệm đã chia sẻ free nha. Sẽ tiếp tục ủng hộ tiệm.",
          verified: false,
          rating: 5,
          date: "30/05/2026",
        },
      ];
      const savedComments = localStorage.getItem(`crochet-comments-${pattern.id}`);
      if (savedComments) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setComments(JSON.parse(savedComments));
        } catch (e) {
          console.error(e);
        }
      } else {
        setComments(defaultComments);
      }
    }
  }, [pattern]);

  const handleSubmitComment = () => {
    if (!commentAuthor.trim() || !commentContent.trim()) {
      message.warning("Vui lòng nhập đầy đủ tên và nội dung bình luận bạn nhé! 🌸");
      return;
    }

    const newComment: CommentType = {
      id: String(Date.now()),
      author: commentAuthor,
      content: commentContent,
      verified: commentVerified,
      rating: commentRating,
      image: commentImage || undefined,
      date: new Date().toLocaleDateString("vi-VN"),
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`crochet-comments-${pattern.id}`, JSON.stringify(updated));

    // Clear form fields
    setCommentAuthor("");
    setCommentContent("");
    setCommentRating(5);
    setCommentImage("");
  };

  const handleDeleteComment = (commentId: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bình luận này không?")) {
      const updated = comments.filter((c) => c.id !== commentId);
      setComments(updated);
      localStorage.setItem(`crochet-comments-${pattern.id}`, JSON.stringify(updated));
    }
  };

  return (
    <div>
      {/* NHẬT KÝ THÀNH PHẨM CỦA CỘNG ĐỒNG */}
      <div style={{ marginBottom: "50px" }}>
        <Title
          level={4}
          style={{
            color: "var(--pink-dark)",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "22px" }}>📸</span> Góc Trả Bài - Community
          Showcase ({comments.filter((c) => c.image).length})
        </Title>
        <Text
          style={{
            display: "block",
            color: "var(--text-sub)",
            marginBottom: "25px",
            fontSize: "15px",
          }}
        >
          Hình ảnh sản phẩm thực tế được đan móc hoàn thiện từ bàn tay khéo léo
          của các bạn:
        </Text>

        <Row gutter={[20, 20]}>
          {comments
            .filter((c) => c.image)
            .map((c, i) => (
              <Col xs={12} sm={8} md={6} key={i}>
                <div
                  className="hover-card"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "2px solid var(--border-soft)",
                    position: "relative",
                    height: "190px",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.02)",
                  }}
                >
                  <img
                    src={c.image}
                    alt={`Thành phẩm của ${c.author}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
                      padding: "12px",
                      color: "#fff",
                    }}
                  >
                    <Text
                      strong
                      style={{ color: "#fff", fontSize: "13px", display: "block" }}
                    >
                      {c.author}
                    </Text>
                    <Rate
                      disabled
                      defaultValue={c.rating}
                      style={{ fontSize: "10px", color: "#FAD02C" }}
                    />
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </div>

      <Divider style={{ borderColor: "var(--border-soft)", margin: "40px 0" }} />

      {/* BÌNH LUẬN VÀ TRẢ BÀI */}
      <Row gutter={[40, 40]}>
        {/* Cột trái: Form gửi bình luận */}
        <Col xs={24} md={12}>
          <div
            style={{
              background: "var(--panel-bg)",
              padding: "28px",
              borderRadius: "24px",
              border: "1px solid var(--border-soft)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
            }}
          >
            <Title
              level={4}
              style={{
                color: "var(--text-main)",
                margin: "0 0 20px 0",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Gửi Bình Luận & Trả Bài Của Bạn
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>
                  Tên của bạn:
                </Text>
                <Input
                  placeholder="Ví dụ: Thảo Vy..."
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  maxLength={30}
                  style={{ borderRadius: "10px", padding: "8px 12px" }}
                />
              </div>

              <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>
                <div>
                  <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>
                    Đánh giá:
                  </Text>
                  <Rate value={commentRating} onChange={setCommentRating} />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Checkbox
                    checked={commentVerified}
                    onChange={(e) => setCommentVerified(e.target.checked)}
                  >
                    <Text strong style={{ color: "var(--text-main)" }}>
                      Đã móc xong mẫu này
                  </Text>
                  </Checkbox>
                </div>
              </div>

              <div>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>
                  Khoe ảnh sản phẩm (Không bắt buộc):
                </Text>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setCommentImage(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid var(--border-soft)",
                      width: "100%",
                    }}
                  />
                  {commentImage && (
                    <div
                      style={{
                        position: "relative",
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid var(--border-soft)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={commentImage}
                        alt="preview"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <Button
                        type="text"
                        size="small"
                        danger
                        onClick={() => setCommentImage("")}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          padding: 0,
                          width: "16px",
                          height: "16px",
                          fontSize: "10px",
                          background: "rgba(255,255,255,0.8)",
                        }}
                      >
                        x
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>
                  Nội dung bình luận:
                </Text>
                <Input.TextArea
                  rows={4}
                  placeholder="Gói ghém vài lời nhắn gửi đáng yêu nhen..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  style={{ borderRadius: "10px", padding: "12px" }}
                />
              </div>

              <Button
                type="primary"
                onClick={handleSubmitComment}
                className="wow-button"
                style={{
                  height: "45px",
                  borderRadius: "15px",
                  fontWeight: "bold",
                  marginTop: "10px",
                  border: "none",
                }}
              >
                Gửi bài ngay thôi!
              </Button>
            </div>
          </div>
        </Col>

        {/* Cột phải: Danh sách bình luận */}
        <Col xs={24} md={12}>
          <Title
            level={4}
            style={{
              color: "var(--pink-dark)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "0 0 20px 0",
            }}
          >
            <MessageOutlined /> Bình luận & Góp Ý ({comments.length})
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={comments}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteComment(item.id)}
                    key="delete"
                    style={{
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Xóa
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "var(--pink-light)",
                        color: "var(--text-main)",
                        fontWeight: "bold",
                      }}
                    >
                      {item.author ? item.author[0].toUpperCase() : "A"}
                    </Avatar>
                  }
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <Text strong style={{ color: "var(--text-main)" }}>
                          {item.author}
                        </Text>
                        {item.verified && (
                          <CheckIcon
                            style={{ color: "var(--pink-dark)" }}
                            title="Đã từng móc thành công"
                          />
                        )}
                      </div>
                      <Text style={{ fontSize: "11px", color: "var(--text-sub)" }}>
                        {item.date}
                      </Text>
                    </div>
                  }
                  description={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginTop: "4px",
                      }}
                    >
                      <Rate
                        disabled
                        defaultValue={item.rating}
                        style={{ fontSize: "11px", color: "#FAD02C" }}
                      />
                      <Text style={{ color: "var(--text-sub)", display: "block", fontSize: "14px" }}>
                        {item.content}
                      </Text>
                      {item.image && (
                        <div
                          style={{
                            alignSelf: "flex-start",
                            marginTop: "5px",
                            borderRadius: "10px",
                            overflow: "hidden",
                            border: "1px solid var(--border-soft)",
                            maxWidth: "150px",
                          }}
                        >
                          <img
                            src={item.image}
                            alt="Thành phẩm"
                            style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
                          />
                        </div>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}
