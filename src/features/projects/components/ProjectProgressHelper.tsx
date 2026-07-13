"use client";

import React, { useState, useEffect } from "react";
import { Typography, Button, Divider, Switch, InputNumber } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { ActiveProject, useProjects } from "../stores/ProjectsContext";
import { projectStyles } from "./Projects.styles";
import { useAudioBeep } from "../hooks/useAudioBeep";
import { useDebouncedStorage } from "../hooks/useDebouncedStorage";

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
  const { playBeep } = useAudioBeep();
  const { debouncedSet, immediateSet } = useDebouncedStorage(600);

  // Stop watch states
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Pricing inputs
  const [materialCost, setMaterialCost] = useState(30000);
  const [hourlyWage, setHourlyWage] = useState(25000);
  const [taxProfit, setTaxProfit] = useState(15000);
  const [showEstimator, setShowEstimator] = useState(false);

  // Load timer status & pricing inputs on project change
  useEffect(() => {
    const savedTime = localStorage.getItem(`crochet-timer-${project.id}`);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSeconds(savedTime ? parseInt(savedTime, 10) : 0);
    setIsActive(false); // Stop when changing projects

    const mat = localStorage.getItem(`crochet-price-material-${project.id}`);
    const wage = localStorage.getItem(`crochet-price-wage-${project.id}`);
    const profit = localStorage.getItem(`crochet-price-profit-${project.id}`);
    setMaterialCost(mat ? parseInt(mat, 10) : 30000);
    setHourlyWage(wage ? parseInt(wage, 10) : 25000);
    setTaxProfit(profit ? parseInt(profit, 10) : 15000);
  }, [project.id]);

  // Stopwatch interval hook
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          const nextSec = prev + 1;
          debouncedSet(`crochet-timer-${project.id}`, String(nextSec));
          return nextSec;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, project.id]);

  const handleStart = () => setIsActive(true);
  const handlePause = () => setIsActive(false);
  const handleResetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    immediateSet(`crochet-timer-${project.id}`, "0");
  };

  const updateMaterial = (val: number | null) => {
    const clean = val || 0;
    setMaterialCost(clean);
    localStorage.setItem(`crochet-price-material-${project.id}`, String(clean));
  };
  const updateHourly = (val: number | null) => {
    const clean = val || 0;
    setHourlyWage(clean);
    localStorage.setItem(`crochet-price-wage-${project.id}`, String(clean));
  };
  const updateProfit = (val: number | null) => {
    const clean = val || 0;
    setTaxProfit(clean);
    localStorage.setItem(`crochet-price-profit-${project.id}`, String(clean));
  };

  // Format Helper
  const formatTime = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  // Calculations
  const hoursSpent = seconds / 3600;
  const laborCost = Math.round(hoursSpent * hourlyWage);
  const recommendedPrice = materialCost + laborCost + taxProfit;

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

      <div style={{ marginBottom: "15px" }}>
        <Text style={{ fontSize: "14px", color: "var(--text-main)" }} strong>
          Dự án đang theo dõi: <span style={{ color: "var(--pink-dark)" }}>{project.customName}</span>
        </Text>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <Text strong style={{ color: "var(--text-main)" }}>Tiến trình hoàn thành:</Text>
          <Text style={{ color: "var(--text-sub)", fontSize: "14px" }}>
            {completedCount}/{stepCount} hàng ({overallPercentage}%)
          </Text>
        </div>
        {/* Custom Animated Progress Bar with Rolling Yarn Ball 🧶 */}
        <div 
          style={{ 
            position: "relative", 
            height: "12px", 
            background: "var(--panel-bg)", 
            borderRadius: "10px", 
            marginBottom: "16px",
            marginTop: "12px",
            border: "1px solid var(--border-soft)",
            overflow: "visible"
          }}
        >
          <div 
            style={{ 
              width: `${overallPercentage}%`, 
              height: "100%", 
              background: "linear-gradient(90deg, var(--pink-light), var(--pink-dark))", 
              borderRadius: "10px",
              transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: `calc(${overallPercentage}% - 14px)`,
              fontSize: "22px",
              lineHeight: 1,
              transition: "left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              userSelect: "none",
              pointerEvents: "none",
              animation: overallPercentage > 0 ? "yarn-spin 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none"
            }}
            key={overallPercentage}
          >
            🧶
          </div>
        </div>


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

      <Divider style={{ margin: "20px 0", borderColor: "var(--border-soft)" }} />

      {/* BỘ BẤM GIỜ MÓC LEN */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <Text strong style={{ color: "var(--text-main)" }}>⏱️ Bộ bấm giờ móc (Timer):</Text>
          {seconds > 0 && (
            <Button
              size="small"
              type="text"
              onClick={handleResetTimer}
              icon={<ReloadOutlined style={{ fontSize: "11px" }} />}
              style={{ fontSize: "12px", color: "var(--text-sub)" }}
            >
              Reset Giờ
            </Button>
          )}
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
            <Text style={{ fontSize: "11px", color: "var(--text-sub)", letterSpacing: "1px" }}>THỜI GIAN TÍCH LŨY</Text>
            <span
              style={{
                fontSize: "30px",
                fontWeight: "900",
                color: isActive ? "var(--pink-dark)" : "var(--text-sub)",
                fontFamily: "monospace",
                transition: "color 0.3s ease",
              }}
            >
              {formatTime(seconds)}
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            {!isActive ? (
              <Button
                type="primary"
                onClick={handleStart}
                style={{
                  background: "#2E7D32",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                Bắt đầu ⏱️
              </Button>
            ) : (
              <Button
                type="primary"
                danger
                onClick={handlePause}
                style={{
                  background: "#E65100",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  height: "40px",
                }}
              >
                Tạm dừng ⏸️
              </Button>
            )}
          </div>
        </div>
      </div>

      <Divider style={{ margin: "20px 0", borderColor: "var(--border-soft)" }} />

      {/* MÁY TÍNH ĐỊNH GIÁ THÀNH PHẨM */}
      <div>
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            cursor: "pointer",
            padding: "5px 0"
          }}
          onClick={() => setShowEstimator(!showEstimator)}
        >
          <Text strong style={{ color: "var(--text-main)" }}>
            💰 Định giá gợi ý thành phẩm:
          </Text>
          <Text style={{ color: "var(--pink-dark)", fontSize: "12px", fontWeight: "bold" }}>
            {showEstimator ? "Thu gọn ▲" : "Chi tiết ▼"}
          </Text>
        </div>

        {showEstimator && (
          <div 
            style={{ 
              marginTop: "15px",
              background: "var(--panel-bg)",
              padding: "16px",
              borderRadius: "16px",
              border: "1px solid var(--border-soft)"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "13px" }}>Chi phí nguyên liệu (đ):</Text>
                <InputNumber
                  min={0}
                  step={5000}
                  value={materialCost}
                  onChange={updateMaterial}
                  style={{ width: "110px", borderRadius: "8px" }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "13px" }}>Lương / giờ mong muốn (đ):</Text>
                <InputNumber
                  min={0}
                  step={5000}
                  value={hourlyWage}
                  onChange={updateHourly}
                  style={{ width: "110px", borderRadius: "8px" }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "13px" }}>Khấu hao & Tiền lãi (đ):</Text>
                <InputNumber
                  min={0}
                  step={5000}
                  value={taxProfit}
                  onChange={updateProfit}
                  style={{ width: "110px", borderRadius: "8px" }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                />
              </div>

              <Divider style={{ margin: "8px 0", borderColor: "var(--border-soft)", borderStyle: "dashed" }} />

              {/* Hóa đơn kết xuất chi tiết */}
              <div style={{ fontSize: "13px", color: "var(--text-sub)", display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Phút móc tích lũy:</span>
                  <span style={{ fontWeight: "600", color: "var(--text-main)" }}>
                    {Math.floor(seconds / 60)} phút ({formatTime(seconds)})
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Tiền công ước tính:</span>
                  <span style={{ fontWeight: "600", color: "var(--text-main)" }}>
                    {laborCost.toLocaleString()} đ
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Chi phí nguyên liệu:</span>
                  <span style={{ fontWeight: "600", color: "var(--text-main)" }}>
                    {materialCost.toLocaleString()} đ
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Khấu hao & Tiền lãi:</span>
                  <span style={{ fontWeight: "600", color: "var(--text-main)" }}>
                    {taxProfit.toLocaleString()} đ
                  </span>
                </div>
              </div>

              <div 
                style={{ 
                  marginTop: "10px",
                  padding: "12px",
                  background: "var(--bg-card)",
                  borderRadius: "12px",
                  border: "1px solid var(--border-soft)",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "11px", color: "var(--text-sub)", letterSpacing: "1px" }}>GIÁ BÁN GỢI Ý ĐỀ XUẤT</div>
                <div style={{ fontSize: "22px", fontWeight: "900", color: "var(--pink-dark)" }}>
                  {recommendedPrice.toLocaleString()} ₫
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
