"use client";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Tag,
  Button,
  Divider,
  Avatar,
  List,
  Breadcrumb,
  FloatButton,
  Progress,
  Switch,
  InputNumber,
  Checkbox,
  Rate,
  Input,
  Radio,
  notification,
  Select,
} from "antd";
import mockData from "@/data/mockData.json";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeftOutlined,
  MessageOutlined,
  CheckCircleFilled,
  CheckCircleOutlined,
  BookOutlined,
  ReloadOutlined,
  SoundOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTheme } from "@/components/Providers";
import { useBasket } from "@/components/BasketContext";
import { useProjects, CreateProjectModal, ProjectProgressHelper } from "@/features/projects";

const { Title, Paragraph, Text } = Typography;

export default function PatternDetailView() {
  const params = useParams();
  const router = useRouter();
  const { theme } = useTheme();
  const CheckIcon = theme === "matcha" ? CheckCircleOutlined : CheckCircleFilled;
  const { addProject, hasProject } = useBasket();
  const [notifApi, notifContextHolder] = notification.useNotification();
  const [basketAdding, setBasketAdding] = useState(false);
  const pattern = mockData.charts.find((p) => p.id === params.id);

  if (!pattern)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: 50,
          color: "var(--pink-dark)",
          fontWeight: "bold",
        }}
      >
        Không tìm thấy mẫu này
      </div>
    );

  // Projects hook
  const { projects, activeProjectIdMap, setActiveProjectForPattern, updateProjectProgress } = useProjects();
  const patternProjects = projects.filter((p) => p.patternId === pattern.id);
  const activeProjectId = activeProjectIdMap[pattern.id];
  const activeProject = patternProjects.find((p) => p.id === activeProjectId) || patternProjects[0];

  // Modal visibility
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Calculations for progress
  const stepLists = pattern ? Object.values(pattern.content) : [];
  const totalSteps = stepLists.reduce((sum, steps) => sum + (steps as string[]).length, 0);

  // Extract completedSteps from selected active project
  const completedSteps = activeProject ? activeProject.completedSteps : {};
  const completedCount = Object.keys(completedSteps).filter(k => completedSteps[k]).length;
  const overallPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const toggleStep = (part: string, index: number) => {
    if (!pattern) return;
    if (!activeProject) {
      notifApi.warning({
        message: "Chưa chọn Dự án móc",
        description: "Vui lòng chọn hoặc bấm 'Tạo dự án mới với mẫu này' bên dưới để lưu tiến độ móc nhé. 🌸",
        placement: "topRight",
        duration: 3.5,
      });
      return;
    }
    const stepKey = `${part}-${index}`;
    const updated = {
      ...completedSteps,
      [stepKey]: !completedSteps[stepKey],
    };
    updateProjectProgress(activeProject.id, updated, activeProject.rowCount);
  };

  // States for prepared materials & tools checklist
  const [preparedItems, setPreparedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (pattern) {
      const savedPrep = localStorage.getItem(`crochet-prepared-${pattern.id}`);
      if (savedPrep) {
        try {
          setPreparedItems(JSON.parse(savedPrep));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [pattern]);

  const togglePreparedItem = (key: string, checked: boolean) => {
    if (!pattern) return;
    const updated = {
      ...preparedItems,
      [key]: checked,
    };
    setPreparedItems(updated);
    localStorage.setItem(`crochet-prepared-${pattern.id}`, JSON.stringify(updated));
  };

  // State for translation notation system: "VI" (Vietnamese: X, V, A) vs "US" (US standard: sc, inc, dec)
  const [notationSystem, setNotationSystem] = useState<"VI" | "US">("VI");

  // Abbreviation translator function
  const translateStep = (text: string, system: "VI" | "US"): string => {
    if (system === "VI") {
      return text;
    }
    
    // Regular expression matching uppercase characters not surrounded by lowercase letters
    const letters = "[a-zA-Záàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ]";
    const makeRegex = (char: string) => new RegExp(`(?<!${letters})${char}(?!${letters})`, 'g');
    
    let result = text;
    result = result.replace(makeRegex("X"), "sc");
    result = result.replace(makeRegex("V"), "inc");
    result = result.replace(makeRegex("A"), "dec");
    result = result.replace(makeRegex("T"), "hdc");
    result = result.replace(makeRegex("F"), "dc");
    result = result.replace(makeRegex("E"), "tr");
    
    return result;
  };

  // Types and states for Community submissions & comments
  type CommentType = {
    id: string;
    author: string;
    content: string;
    verified: boolean;
    rating: number;
    image?: string;
    date: string;
  };

  const initialComments: CommentType[] = [
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
    }
  ];

  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [commentVerified, setCommentVerified] = useState(true);
  const [commentImage, setCommentImage] = useState<string>("");

  useEffect(() => {
    if (pattern) {
      const savedComments = localStorage.getItem(`crochet-comments-${pattern.id}`);
      if (savedComments) {
        try {
          setComments(JSON.parse(savedComments));
        } catch (e) {
          console.error(e);
        }
      } else {
        setComments(initialComments);
      }
    }
  }, [pattern]);

  const handleSubmitComment = () => {
    if (!commentAuthor.trim() || !commentContent.trim()) {
      alert("Vui lòng nhập đầy đủ tên và nội dung bình luận bạn nhé!");
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
      const updated = comments.filter(c => c.id !== commentId);
      setComments(updated);
      localStorage.setItem(`crochet-comments-${pattern.id}`, JSON.stringify(updated));
    }
  };

  return (
    <>
      {notifContextHolder}
      <div
        className="animate-fade-in-up"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        background: "var(--bg-card)",
        padding: "40px",
        borderRadius: "32px",
        boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <Breadcrumb style={{ fontSize: "15px" }}>
          <Breadcrumb.Item>
            <Link href="/patterns" style={{ color: "var(--pink-light)" }}>
              Kho Chart
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item
            style={{ color: "var(--text-main)", fontWeight: "bold" }}
          >
            {pattern.name}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Link href="/patterns">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            style={{ color: "var(--pink-dark)", fontWeight: "bold" }}
          >
            Trở Về Kho
          </Button>
        </Link>
      </div>

      <Title
        level={1}
        style={{
          textAlign: "center",
          color: "var(--text-main)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "40px",
        }}
      >
        {pattern.name}
      </Title>

      <Row gutter={[40, 40]}>
        <Col xs={24} md={12}>
          <img
            src={pattern.image_url}
            alt={pattern.name}
            style={{
              width: "100%",
              borderRadius: "20px",
              marginBottom: "20px",
              border: "2px solid var(--border-soft)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
            }}
          />
          <Paragraph
            style={{
              color: "var(--text-sub)",
              fontSize: "16px",
              lineHeight: "1.8",
              fontStyle: "italic",
              borderLeft: "5px solid var(--pink-dark)",
              paddingLeft: "15px",
            }}
          >
            "{pattern.description}"
          </Paragraph>

          <div
            style={{
              background:
                "linear-gradient(135deg, var(--panel-bg) 0%, var(--bg-card) 100%)",
              padding: "20px",
              borderRadius: "16px",
              marginTop: "20px",
              border: "1px solid var(--border-soft)",
            }}
          >
            <Title
              level={5}
              style={{
                color: "var(--pink-dark)",
                marginBottom: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Ghi chú dành cho tân thủ:
            </Title>
            <Text
              style={{
                color: "var(--text-main)",
                lineHeight: "1.6",
                display: "block",
              }}
            >
              Nhồi bông thật chặt ở các góc bo cong nhé. Len thừa sau khi kết
              thúc luồn sâu vào khối. Nhớ khoe ảnh cuối bài nha!
            </Text>
          </div>

          {/* TRÌNH TRỢ GIÚP ĐAN MÓC */}
          {/* TRÌNH TRỢ GIÚP ĐAN MÓC (DỰ ÁN ĐA NHIỆM) */}
          <div style={{ marginTop: "30px" }}>
            {/* Lựa chọn Dự án */}
            <div
              style={{
                background: "var(--bg-card)",
                padding: "20px",
                borderRadius: "20px",
                border: "2px solid var(--border-soft)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <Text strong style={{ color: "var(--text-main)", fontSize: "14px" }}>📁 Nhật ký Dự án:</Text>
                  {patternProjects.length > 0 ? (
                    <Select
                      value={activeProject?.id}
                      onChange={(val) => setActiveProjectForPattern(pattern.id, val)}
                      style={{ width: "200px", marginLeft: "10px" }}
                      options={patternProjects.map((p) => ({
                        value: p.id,
                        label: p.customName,
                      }))}
                    />
                  ) : (
                    <Text italic style={{ color: "var(--text-sub)", marginLeft: "10px" }}>Chưa có dự án nào</Text>
                  )}
                </div>
                
                <Button
                  type="dashed"
                  onClick={() => setCreateModalOpen(true)}
                  style={{
                    color: "var(--pink-dark)",
                    borderColor: "var(--pink-dark)",
                    borderRadius: "15px",
                    fontWeight: "bold"
                  }}
                >
                  ➕ Dự án mới
                </Button>
              </div>
            </div>

            {/* Trình trợ giúp chi tiết */}
            {activeProject ? (
              <ProjectProgressHelper project={activeProject} stepCount={totalSteps} />
            ) : (
              <div
                style={{
                  background: "var(--bg-card)",
                  padding: "40px 24px",
                  borderRadius: "20px",
                  border: "2px dashed var(--border-soft)",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(233,30,99,0.02)",
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "15px" }}>🧶</div>
                <Title level={5} style={{ color: "var(--text-main)", marginTop: 0 }}>Bạn chưa tạo Dự án móc cho mẫu này</Title>
                <Paragraph style={{ color: "var(--text-sub)", fontSize: "13px", padding: "0 10px" }}>
                  Hãy bắt đầu một dự án mới để ghi lưu nhật liệu mã màu sợi, lô len, ghi chú và tự động đồng bộ đếm hàng dòng móc nhé! ✨
                </Paragraph>
                <Button
                  type="primary"
                  onClick={() => setCreateModalOpen(true)}
                  style={{
                    background: "var(--pink-dark)",
                    border: "none",
                    borderRadius: "15px",
                    fontWeight: "bold",
                    marginTop: "10px",
                    padding: "0 25px"
                  }}
                >
                  Bắt đầu ngay 🚀
                </Button>
              </div>
            )}
          </div>

          {/* CreatProjectModal */}
          <CreateProjectModal
            pattern={{
              id: pattern.id,
              name: pattern.name,
              category: pattern.category,
              difficulty: String(pattern.difficulty_stars || 3),
              image_url: pattern.image_url,
              materials: pattern.materials || [],
              tools: pattern.tools || [],
            }}
            visible={createModalOpen}
            onCancel={() => setCreateModalOpen(false)}
          />
        </Col>

        <Col xs={24} md={12}>
          <div
            style={{
              background: "var(--panel-bg)",
              padding: "24px",
              borderRadius: "20px",
              marginBottom: "30px",
              border: "1px solid var(--border-soft)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px", flexWrap: "wrap", gap: "10px" }}>
              <Title
                level={4}
                style={{
                  color: "var(--pink-dark)",
                  margin: 0,
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                🎒 Chuẩn Bị Nguyên Liệu & Dụng Cụ
              </Title>
              <Tag style={{ background: "var(--pink-dark)", color: "#fff", border: "none", padding: "4px 12px", borderRadius: "10px", fontWeight: "bold" }}>
                Độ khó: {pattern.difficulty}
              </Tag>
            </div>

            <Row gutter={[24, 16]}>
              {/* Cột 1: Nguyên liệu */}
              <Col xs={24} sm={12}>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "12px", fontSize: "15px", borderLeft: "3px solid var(--pink-dark)", paddingLeft: "8px" }}>
                  Nguyên Liệu
                </Text>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pattern.materials.map((item: string, i: number) => {
                    const itemKey = `material-${i}`;
                    const isChecked = !!preparedItems[itemKey];
                    return (
                      <div key={itemKey} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => togglePreparedItem(itemKey, e.target.checked)}
                        >
                          <Text style={{ 
                            color: isChecked ? "var(--text-sub)" : "var(--text-main)",
                            textDecoration: isChecked ? "line-through" : "none",
                            fontSize: "14px",
                            lineHeight: "1.4"
                          }}>
                            {item}
                          </Text>
                        </Checkbox>
                        {!isChecked && (
                          <a 
                            href={`https://shopee.vn/search?keyword=${encodeURIComponent(item)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#EE4D2D", fontSize: "12px", fontWeight: "bold" }}
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
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "12px", fontSize: "15px", borderLeft: "3px solid var(--pink-dark)", paddingLeft: "8px" }}>
                  Dụng Cụ
                </Text>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {pattern.tools.map((item: string, i: number) => {
                    const itemKey = `tool-${i}`;
                    const isChecked = !!preparedItems[itemKey];
                    return (
                      <div key={itemKey} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => togglePreparedItem(itemKey, e.target.checked)}
                        >
                          <Text style={{ 
                            color: isChecked ? "var(--text-sub)" : "var(--text-main)",
                            textDecoration: isChecked ? "line-through" : "none",
                            fontSize: "14px",
                            lineHeight: "1.4"
                          }}>
                            {item}
                          </Text>
                        </Checkbox>
                        {!isChecked && (
                          <a 
                            href={`https://shopee.vn/search?keyword=${encodeURIComponent(item)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#EE4D2D", fontSize: "12px", fontWeight: "bold" }}
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
            <div style={{ marginTop: "20px" }}>
              <Button
                size="large"
                block
                onClick={() => {
                  if (!pattern) return;
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

          <div 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              borderBottom: "3px solid var(--pink-dark)", 
              paddingBottom: "10px", 
              marginBottom: "30px",
              flexWrap: "wrap",
              gap: "15px"
            }}
          >
            <Title
              level={4}
              style={{
                color: "var(--text-main)",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              HƯỚNG DẪN MÓC CHI TIẾT
            </Title>
            <Radio.Group 
              value={notationSystem} 
              onChange={(e) => setNotationSystem(e.target.value)}
              optionType="button"
              buttonStyle="solid"
              size="small"
              style={{ border: "none" }}
            >
              <Radio.Button value="VI" style={{ borderRadius: "8px 0 0 8px" }}>Viết tắt Việt (X, V, A)</Radio.Button>
              <Radio.Button value="US" style={{ borderRadius: "0 8px 8px 0" }}>Viết tắt Mỹ (sc, inc, dec)</Radio.Button>
            </Radio.Group>
          </div>

          {Object.entries(pattern.content).map(([part, steps], idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "25px",
                background: "var(--bg-card)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid var(--border-soft)",
              }}
            >
              <div
                style={{
                  fontWeight: "900",
                  color: "#fff",
                  background: "var(--pink-dark)",
                  padding: "10px 20px",
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {part}
              </div>
              <table
                className="info-table"
                style={{ width: "100%", fontSize: "15px", margin: 0 }}
              >
                <tbody>
                  {(steps as string[]).map((step, index) => {
                    const rowSplit = step.split(":");
                    const isEven = index % 2 === 0;
                    const isCompleted = !!completedSteps[`${part}-${index}`];
                    const tdBg = isCompleted 
                      ? "rgba(233, 30, 99, 0.04)" 
                      : (isEven ? "var(--bg-card)" : "var(--panel-bg)");
                    const cellOpacity = isCompleted ? 0.5 : 1;

                    return (
                      <tr
                        key={index}
                        onClick={() => toggleStep(part, index)}
                        style={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <td
                          style={{
                            fontWeight: "bold",
                            width: "95px",
                            textAlign: "center",
                            color: isCompleted ? "var(--text-sub)" : "var(--pink-dark)",
                            borderBottom: "1px solid var(--border-soft)",
                            padding: "12px",
                            backgroundColor: tdBg,
                            opacity: cellOpacity,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <span style={{ marginRight: "6px" }}>
                            {isCompleted ? (
                              <CheckIcon style={{ color: "var(--pink-dark)", fontSize: "13px" }} />
                            ) : (
                              <span style={{ 
                                display: "inline-block", 
                                width: "10px", 
                                height: "10px", 
                                borderRadius: "50%", 
                                border: "1.5px solid var(--pink-light)",
                                verticalAlign: "middle"
                              }} />
                            )}
                          </span>
                          {rowSplit[0]}
                        </td>
                        <td
                          style={{
                            color: isCompleted ? "var(--text-sub)" : "var(--text-main)",
                            fontWeight: "500",
                            borderBottom: "1px solid var(--border-soft)",
                            padding: "12px",
                            backgroundColor: tdBg,
                            opacity: cellOpacity,
                            textDecoration: isCompleted ? "line-through" : "none",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {translateStep(rowSplit[1] ? rowSplit[1].trim() : step, notationSystem)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </Col>
      </Row>

      <Divider
        style={{ borderColor: "var(--border-soft)", margin: "40px 0" }}
      />

      {/* NHẬT KÝ THÀNH PHẨM CỦA CỘNG ĐỒNG */}
      <div style={{ marginBottom: "50px" }}>
        <Title
          level={4}
          style={{ color: "var(--pink-dark)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}
        >
          <span style={{ fontSize: "22px" }}>📸</span> Góc Trả Bài - Community Showcase ({comments.filter(c => c.image).length})
        </Title>
        <Text style={{ display: "block", color: "var(--text-sub)", marginBottom: "25px", fontSize: "15px" }}>
          Hình ảnh sản phẩm thực tế được đan móc hoàn thiện từ bàn tay khéo léo của các bạn:
        </Text>

        <Row gutter={[20, 20]}>
          {comments.filter(c => c.image).map((c, i) => (
            <Col xs={12} sm={8} md={6} key={i}>
              <div 
                className="hover-card"
                style={{ 
                  borderRadius: "20px", 
                  overflow: "hidden", 
                  border: "2px solid var(--border-soft)",
                  position: "relative",
                  height: "190px",
                  boxShadow: "0 6px 15px rgba(0,0,0,0.02)"
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
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)", 
                    padding: "12px",
                    color: "#fff"
                  }}
                >
                  <Text strong style={{ color: "#fff", fontSize: "13px", display: "block" }}>{c.author}</Text>
                  <Rate disabled defaultValue={c.rating} style={{ fontSize: "10px", color: "#FAD02C" }} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      <Divider
        style={{ borderColor: "var(--border-soft)", margin: "40px 0" }}
      />

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
              boxShadow: "0 4px 15px rgba(0,0,0,0.02)"
            }}
          >
            <Title level={4} style={{ color: "var(--text-main)", margin: "0 0 20px 0", fontSize: "20px", fontWeight: "bold" }}>
              Gửi Bình Luận & Trả Bài Của Bạn
            </Title>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>Tên của bạn:</Text>
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
                  <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>Đánh giá:</Text>
                  <Rate value={commentRating} onChange={setCommentRating} />
                </div>
                <div style={{ marginTop: "20px" }}>
                  <Checkbox 
                    checked={commentVerified} 
                    onChange={(e) => setCommentVerified(e.target.checked)}
                  >
                    <Text strong style={{ color: "var(--text-main)" }}>Đã móc xong mẫu này</Text>
                  </Checkbox>
                </div>
              </div>

              <div>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>Khoe ảnh sản phẩm (Không bắt buộc):</Text>
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
                    style={{ borderRadius: "10px", border: "1px solid var(--border-soft)", width: "100%" }}
                  />
                  {commentImage && (
                    <div style={{ position: "relative", width: "50px", height: "50px", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border-soft)", flexShrink: 0 }}>
                      <img src={commentImage} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <Button 
                        type="text" 
                        size="small" 
                        danger 
                        onClick={() => setCommentImage("")}
                        style={{ position: "absolute", top: 0, right: 0, padding: 0, width: "16px", height: "16px", fontSize: "10px", background: "rgba(255,255,255,0.8)" }}
                      >
                        x
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Text strong style={{ color: "var(--text-main)", display: "block", marginBottom: "5px" }}>Nội dung bình luận:</Text>
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
                  border: "none"
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
            style={{ color: "var(--pink-dark)", display: "flex", alignItems: "center", gap: "10px", margin: "0 0 20px 0" }}
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
                    style={{ fontSize: "12px", display: "flex", alignItems: "center" }}
                  >
                    Xóa
                  </Button>
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
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "4px" }}>
                      <Rate disabled defaultValue={item.rating} style={{ fontSize: "11px", color: "#FAD02C" }} />
                      <Text style={{ color: "var(--text-sub)", display: "block", fontSize: "14px" }}>{item.content}</Text>
                      {item.image && (
                        <div style={{ alignSelf: "flex-start", marginTop: "5px", borderRadius: "10px", overflow: "hidden", border: "1px solid var(--border-soft)", maxWidth: "150px" }}>
                          <img src={item.image} alt="Thành phẩm" style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }} />
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

      {/* TÍNH NĂNG MỚI NÂNG CẤP XỊN XÒ THEO THEME */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 30, bottom: 40 }}
        icon={<BookOutlined />}
        tooltip={<span style={{ fontWeight: "bold" }}>Từ Điển Ký Hiệu</span>}
      >
        <FloatButton
          description="MR"
          shape="square"
          type="default"
          tooltip={
            <div style={{ textAlign: "center" }}>
              <b>Vòng tròn ma thuật</b>
              <br />
              <span style={{ fontSize: "12px" }}>Nhấp để xem bài Blog</span>
            </div>
          }
          onClick={() => router.push("/blog")}
          style={{ border: "1px solid var(--pink-dark)", marginBottom: "5px" }}
        />
        <FloatButton
          description="X"
          shape="square"
          type="default"
          tooltip={
            <div style={{ textAlign: "center" }}>
              <b>Mũi đơn</b>
              <br />
              <span style={{ fontSize: "12px" }}>Nhấp để xem bài Blog</span>
            </div>
          }
          onClick={() => router.push("/blog")}
          style={{ border: "1px solid var(--pink-dark)", marginBottom: "5px" }}
        />
        <FloatButton
          description="V"
          shape="square"
          type="default"
          tooltip={
            <div style={{ textAlign: "center" }}>
              <b>Mũi tăng</b>
              <br />
              <span style={{ fontSize: "12px" }}>Nhấp để xem bài Blog</span>
            </div>
          }
          onClick={() => router.push("/blog")}
          style={{ border: "1px solid var(--pink-dark)", marginBottom: "5px" }}
        />
        <FloatButton
          description="A"
          shape="square"
          type="default"
          tooltip={
            <div style={{ textAlign: "center" }}>
              <b>Mũi giảm</b>
              <br />
              <span style={{ fontSize: "12px" }}>Nhấp để xem bài Blog</span>
            </div>
          }
          onClick={() => router.push("/blog")}
          style={{ border: "1px solid var(--pink-dark)" }}
        />
      </FloatButton.Group>
    </div>
    </>
  );
}
