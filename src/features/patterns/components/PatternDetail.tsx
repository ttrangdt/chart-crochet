"use client";

import React, { useState } from "react";
import { Typography, Row, Col, notification, Tooltip, Divider, Breadcrumb, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import mockData from "@/data/mockData.json";
import { useParams } from "next/navigation";

import { useProjects, CreateProjectModal } from "@/features/projects";
import { GaugeCalculator } from "@/features/gauge";
import { CrochetDictionaryModal } from "@/features/dictionary";

// Types, Styles, Hooks & Utils
import { Pattern } from "../types/patterns.types";
import { patternStyles } from "./PatternDetail.styles";
import { usePatternNotes } from "../hooks/usePatternNotes";
import { usePatternPrepared } from "../hooks/usePatternPrepared";

// Subcomponents
import PatternDetailHeader from "./PatternDetailHeader";
import PatternPreparedChecklist from "./PatternPreparedChecklist";
import PatternInstructions from "./PatternInstructions";
import PatternProjectJournal from "./PatternProjectJournal";
import PatternComments from "./PatternComments";

const { Title, Paragraph, Text } = Typography;


export default function PatternDetail() {
  const params = useParams();
  const [notifApi, notifContextHolder] = notification.useNotification();

  // Find current pattern
  const patternId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
  const pattern = patternId ? (mockData.charts.find((p) => p.id === patternId) as Pattern | undefined) : undefined;

  // Modals & Popups states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [dictOpen, setDictOpen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState<string | undefined>(undefined);
  const [btnHover, setBtnHover] = useState(false);
  const [notationSystem, setNotationSystem] = useState<"VI" | "US">("VI");

  // Load custom hooks for note taking and checklists
  const {
    rowNotes,
    editingNotePath,
    noteInputValue,
    setNoteInputValue,
    handleSaveNote,
    startEditingNote,
    cancelEditingNote,
  } = usePatternNotes(pattern);

  const { preparedItems, togglePreparedItem } = usePatternPrepared(pattern);

  // Projects context hooks
  const {
    projects,
    activeProjectIdMap,
    updateProjectProgress,
  } = useProjects();

  if (!pattern) {
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
  }

  const patternProjects = projects.filter((p) => p.patternId === pattern.id);
  const activeProjectId = activeProjectIdMap[pattern.id];
  const activeProject =
    patternProjects.find((p) => p.id === activeProjectId) || patternProjects[0];

  const completedSteps = activeProject ? activeProject.completedSteps : {};

  // Step calculations
  const stepLists = Object.values(pattern.content);
  const totalSteps = stepLists.reduce(
    (sum, steps) => sum + (steps as string[]).length,
    0
  );

  const toggleStep = (part: string, index: number) => {
    if (!activeProject) {
      notifApi.warning({
        message: "Chưa chọn Dự án móc",
        description:
          "Vui lòng chọn hoặc bấm 'Tạo dự án mới với mẫu này' bên dưới để lưu tiến độ móc nhé. 🌸",
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

  const handleOpenDictionary = (symbol?: string) => {
    setSelectedSymbol(symbol);
    setDictOpen(true);
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
          <Breadcrumb 
            style={{ fontSize: "15px" }}
            items={[
              {
                title: (
                  <Link href="/patterns" style={{ color: "var(--pink-light)" }}>
                    Kho Chart
                  </Link>
                ),
              },
              {
                title: (
                  <span style={{ color: "var(--text-main)", fontWeight: "bold" }}>
                    {pattern.name}
                  </span>
                ),
              },
            ]}
          />
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

        <Title level={1} style={patternStyles.pageTitle}>
          {pattern.name}
        </Title>

        <Row gutter={[40, 40]}>
          {/* Cột trái: Ảnh & Nhật ký dự án */}
          <Col xs={24} md={12}>
            <img
              src={pattern.image_url}
              alt={pattern.name}
              style={patternStyles.imageStyles}
            />
            <Paragraph style={patternStyles.descriptionQuote}>
              &quot;{pattern.description}&quot;
            </Paragraph>

            <div style={patternStyles.beginnerNotesBox}>
              <Title level={5} style={patternStyles.beginnerNotesTitle}>
                Ghi chú dành cho tân thủ:
              </Title>
              <Text style={patternStyles.beginnerNotesText}>
                Nhồi bông thật chặt ở các góc bo cong nhé. Len thừa sau khi kết
                thúc luồn sâu vào khối. Nhớ khoe ảnh cuối bài nha!
              </Text>
            </div>

            <PatternProjectJournal
              pattern={pattern}
              totalSteps={totalSteps}
              createModalOpen={createModalOpen}
              setCreateModalOpen={setCreateModalOpen}
            />

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
              open={createModalOpen}
              onCancel={() => setCreateModalOpen(false)}
            />
          </Col>

          {/* Cột phải: Checklist & Hướng dẫn đếm hàng dòng */}
          <Col xs={24} md={12}>
            <PatternPreparedChecklist
              pattern={pattern}
              preparedItems={preparedItems}
              togglePreparedItem={togglePreparedItem}
            />

            <PatternInstructions
              pattern={pattern}
              notationSystem={notationSystem}
              setNotationSystem={setNotationSystem}
              completedSteps={completedSteps}
              toggleStep={toggleStep}
              rowNotes={rowNotes}
              editingNotePath={editingNotePath}
              noteInputValue={noteInputValue}
              setNoteInputValue={setNoteInputValue}
              handleSaveNote={handleSaveNote}
              startEditingNote={startEditingNote}
              cancelEditingNote={cancelEditingNote}
              onOpenDictionary={handleOpenDictionary}
            />
          </Col>
        </Row>

        <div style={{ marginTop: "45px" }}>
          <GaugeCalculator pattern={pattern} />
        </div>

        <Divider style={{ borderColor: "var(--border-soft)", margin: "45px 0" }} />

        <PatternComments pattern={pattern} />

        {/* Nút tra cứu nhanh Từ điển nổi */}
        <Tooltip
          title={
            <span style={{ fontWeight: "bold" }}>
              Từ Điển Ký Hiệu Mũi Móc 📚
            </span>
          }
          placement="left"
        >
          <button
            onClick={() => handleOpenDictionary()}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              ...patternStyles.floatDictButton,
              boxShadow: btnHover
                ? "0 8px 25px rgba(233, 30, 99, 0.35)"
                : "0 6px 20px rgba(233, 30, 99, 0.25)",
              transform: btnHover ? "scale(1.1) translateY(-3px)" : "scale(1)",
            }}
          >
            <svg
              viewBox="0 0 64 64"
              width="36"
              height="36"
              fill="none"
              stroke="var(--pink-dark)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: "stroke 0.3s ease" }}
            >
              {/* Trang sách trái */}
              <path
                fill="var(--pink-light)"
                d="M32 46 C22 41, 10 41, 8 42 L 8 16 C10 15, 22 15, 32 20 Z"
                style={{ transition: "fill 0.3s ease" }}
              />
              {/* Trang sách phải */}
              <path
                fill="var(--pink-light)"
                d="M32 46 C42 41, 54 41, 56 42 L 56 16 C54 15, 42 15, 32 20 Z"
                style={{ transition: "fill 0.3s ease" }}
              />
              {/* Đường sống sách */}
              <path d="M32 20 L32 46" />
              {/* Kim móc đan cài qua */}
              <path d="M14 12 L50 48" stroke="#4A90E2" strokeWidth="4" />
              {/* Khuyên móc */}
              <path d="M46 45 Q 49 48, 45 49" stroke="#4A90E2" strokeWidth="4" />
            </svg>
          </button>
        </Tooltip>

        <CrochetDictionaryModal
          open={dictOpen}
          onClose={() => {
            setDictOpen(false);
            setSelectedSymbol(undefined);
          }}
          selectedStitchSymbol={selectedSymbol}
        />
      </div>
    </>
  );
}
