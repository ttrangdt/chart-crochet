"use client";

import React, { useState, useEffect } from "react";
import { Typography, Progress, Button, Divider, Switch, InputNumber } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { ActiveProject, useProjects } from "./ProjectsContext";
import { projectStyles } from "./styles";

const { Title, Text } = Typography;

type ProjectProgressHelperProps = {
  project: ActiveProject;
  stepCount: number;
};

export default function ProjectProgressHelper({
  project,
  stepCount,
}: ProjectProgressHelperProps) {
  const { updateProjectProgress, updateProjectState } = useProjects();
  const [playAudio, setPlayAudio] = useState(true);

  // Audio synthethizer beep function
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); // 800Hz tone
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15); // fade out quickly

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (e) {
      console.warn("Web Audio API not supported or user gesture needed.", e);
    }
  };

  const completedCount = Object.keys(project.completedSteps).filter(
    (k) => project.completedSteps[k]
  ).length;
  const overallPercentage = stepCount > 0 ? Math.round((completedCount / stepCount) * 100) : 0;

  const handleResetProgress = () => {
    updateProjectProgress(project.id, {}, 0);
  };

  const handleUpdateCounter = (val: number) => {
    if (val < 0) return;
    updateProjectProgress(project.id, project.completedSteps, val);
    if (playAudio && val > project.rowCount) {
      playBeep();
    }
  };

  const handleUpdateTarget = (val: number | null) => {
    if (val === null || val < 1) return;
    updateProjectState(project.id, { targetRows: val });
  };

  return (
    <div style={projectStyles.progressWrapper}>
      <Title
        level={4}
        style={{
          color: "var(--pink-dark)",
          marginBottom: "20px",
          marginTop: 0,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderBottom: "1px dashed var(--border-soft)",
          paddingBottom: "10px",
        }}
      >
        <span role="img" aria-label="assistant">🪄</span> Trình Trợ Giúp Đan Móc Dự Án
      </Title>

      {/* Project details alert / name info */}
      <div style={{ marginBottom: "15px" }}>
        <Text style={{ fontSize: "14px", color: "var(--text-main)" }} strong>
          Dự án đang theo dõi: <span style={{ color: "var(--pink-dark)" }}>{project.customName}</span>
        </Text>
      </div>

      {/* Progress Chart */}
      <div style={{ marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <Text strong style={{ color: "var(--text-main)" }}>Tiến trình hoàn thành:</Text>
          <Text style={{ color: "var(--text-sub)", fontSize: "14px" }}>
            {completedCount}/{stepCount} hàng ({overallPercentage}%)
          </Text>
        </div>
        <Progress
          percent={overallPercentage}
          strokeColor="var(--pink-dark)"
          trailColor="var(--panel-bg)"
          style={{ marginBottom: "12px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Text italic style={{ fontSize: "13px", color: "var(--text-sub)", flex: 1, marginRight: "10px" }}>
            {overallPercentage === 0 && "Lên kim ngay nào bạn ơi! 🚀"}
            {overallPercentage > 0 && overallPercentage < 40 && "Vạn sự bắt đầu từ vòng ma thuật! 💪"}
            {overallPercentage >= 40 && overallPercentage < 80 && "Trông ra hình dáng siêu xinh rồi đó! 🌟"}
            {overallPercentage >= 80 && overallPercentage < 100 && "Sắp hoàn thành rồi, cố lên nốt thôi! 🔥"}
            {overallPercentage === 100 && "Dự án đã hoàn thành, quá xuất sắc! Đăng hình khoe thành quả đi nào! 🎉"}
          </Text>
          {completedCount > 0 && (
            <Button
              size="small"
              type="text"
              danger
              onClick={handleResetProgress}
              icon={<ReloadOutlined />}
              style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" }}
            >
              Làm mới
            </Button>
          )}
        </div>
      </div>

      <Divider style={{ margin: "15px 0", borderColor: "var(--border-soft)" }} />

      {/* Row Counter (Bộ Đếm Hàng Móc) */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <Text strong style={{ color: "var(--text-main)" }}>Bộ đếm hàng (Row Counter):</Text>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>Âm thanh:</Text>
            <Switch
              size="small"
              checked={playAudio}
              onChange={(checked) => setPlayAudio(checked)}
              style={{ background: playAudio ? "var(--pink-dark)" : "#ccc" }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--bg-card)",
            padding: "15px 20px",
            borderRadius: "16px",
            border: "1px solid var(--border-soft)",
            marginBottom: "15px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Text style={{ fontSize: "12px", color: "var(--text-sub)" }}>HÀNG HIỆN TẠI</Text>
            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: "900",
                  color: "var(--pink-dark)",
                  fontFamily: "monospace",
                }}
              >
                {project.rowCount}
              </span>
              <span style={{ fontSize: "16px", color: "var(--text-sub)" }}>/ {project.targetRows}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              shape="circle"
              size="large"
              onClick={() => handleUpdateCounter(project.rowCount - 1)}
              disabled={project.rowCount === 0}
              style={{ border: "1px solid var(--border-soft)", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              -
            </Button>
            <Button
              type="primary"
              shape="circle"
              size="large"
              onClick={() => handleUpdateCounter(project.rowCount + 1)}
              style={{
                background: "var(--pink-dark)",
                border: "none",
                boxShadow: "0 4px 10px rgba(233, 30, 99, 0.3)",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              +
            </Button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text style={{ fontSize: "13px", color: "var(--text-sub)" }}>Đặt mục tiêu:</Text>
            <InputNumber
              min={1}
              value={project.targetRows}
              onChange={handleUpdateTarget}
              style={{ width: "70px", borderRadius: "8px" }}
            />
          </div>
          {project.rowCount > 0 && (
            <Button
              size="small"
              type="text"
              onClick={() => handleUpdateCounter(0)}
              style={{ fontSize: "12px", color: "var(--text-sub)" }}
            >
              Reset Bộ Đếm
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
