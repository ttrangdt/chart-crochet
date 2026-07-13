"use client";

import React from "react";
import { Typography, Select, Button } from "antd";
import { useProjects, ProjectProgressHelper } from "@/features/projects";
import { patternStyles } from "./PatternDetail.styles";
import { Pattern } from "../types/patterns.types";

const { Text, Title, Paragraph } = Typography;

type PatternProjectJournalProps = {
  pattern: Pattern;
  totalSteps: number;
  createModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
};

export default function PatternProjectJournal({
  pattern,
  totalSteps,
  setCreateModalOpen,
}: PatternProjectJournalProps) {
  const {
    projects,
    activeProjectIdMap,
    setActiveProjectForPattern,
  } = useProjects();

  const patternProjects = projects.filter((p) => p.patternId === pattern.id);
  const activeProjectId = activeProjectIdMap[pattern.id];
  const activeProject =
    patternProjects.find((p) => p.id === activeProjectId) || patternProjects[0];

  return (
    <div style={{ marginTop: "30px" }}>
      {/* Lựa chọn Dự án */}
      <div style={patternStyles.projectSelectBox}>
        <div style={patternStyles.projectSelectHeader}>
          <div>
            <Text strong style={patternStyles.projectSelectLabel}>
              📁 Nhật ký Dự án:
            </Text>
            {patternProjects.length > 0 ? (
              <Select
                value={activeProject?.id}
                onChange={(val) => setActiveProjectForPattern(pattern.id, val)}
                style={patternStyles.projectSelectDropdown}
                options={patternProjects.map((p) => ({
                  value: p.id,
                  label: p.customName,
                }))}
              />
            ) : (
              <Text italic style={patternStyles.projectSelectEmpty}>
                Chưa có dự án nào
              </Text>
            )}
          </div>

          <Button
            type="dashed"
            onClick={() => setCreateModalOpen(true)}
            style={patternStyles.newProjectButton}
          >
            ➕ Dự án mới
          </Button>
        </div>
      </div>

      {/* Trình trợ giúp chi tiết */}
      {activeProject ? (
        <ProjectProgressHelper project={activeProject} stepCount={totalSteps} />
      ) : (
        <div style={patternStyles.noProjectBox}>
          <div style={patternStyles.noProjectIcon}>🧶</div>
          <Title level={5} style={patternStyles.noProjectTitle}>
            Bạn chưa tạo Dự án móc cho mẫu này
          </Title>
          <Paragraph style={patternStyles.noProjectDesc}>
            Hãy bắt đầu một dự án mới để ghi lưu nhật liệu mã màu sợi, lô len,
            ghi chú và tự động đồng bộ đếm hàng dòng móc nhé! ✨
          </Paragraph>
          <Button
            type="primary"
            onClick={() => setCreateModalOpen(true)}
            style={patternStyles.noProjectBtn}
          >
            Bắt đầu ngay 🚀
          </Button>
        </div>
      )}
    </div>
  );
}
