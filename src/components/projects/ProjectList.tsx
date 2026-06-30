"use client";

import React, { useState, useMemo } from "react";
import { Input, Radio, Empty, Button } from "antd";
import { SearchOutlined, ReadOutlined } from "@ant-design/icons";
import { useProjects } from "./ProjectsContext";
import ProjectCard from "./ProjectCard";
import { projectStyles } from "./styles";
import Link from "next/link";

export default function ProjectList() {
  const { projects } = useProjects();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "planning" | "progressing" | "completed">("all");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.customName.toLowerCase().includes(searchText.toLowerCase()) ||
        project.notes.toLowerCase().includes(searchText.toLowerCase()) ||
        (project.yarnDetails &&
          project.yarnDetails.some((y) => y.brand.toLowerCase().includes(searchText.toLowerCase())));

      const matchesStatus = statusFilter === "all" || project.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [projects, searchText, statusFilter]);

  return (
    <div>
      {/* Filters header bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "24px",
        }}
      >
        <Radio.Group
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          optionType="button"
          buttonStyle="solid"
          size="middle"
        >
          <Radio.Button value="all" style={{ borderRadius: "8px 0 0 8px" }}>Tất cả ({projects.length})</Radio.Button>
          <Radio.Button value="planning">Lên kế hoạch ({projects.filter((p) => p.status === "planning").length})</Radio.Button>
          <Radio.Button value="progressing">Đang móc ({projects.filter((p) => p.status === "progressing").length})</Radio.Button>
          <Radio.Button value="completed" style={{ borderRadius: "0 8px 8px 0" }}>Hoàn thành ({projects.filter((p) => p.status === "completed").length})</Radio.Button>
        </Radio.Group>

        <Input
          placeholder="Tìm dự án, ghi chú, len..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          prefix={<SearchOutlined style={{ color: "var(--pink-dark)" }} />}
          style={{ width: "240px", borderRadius: "10px" }}
        />
      </div>

      {filteredProjects.length > 0 ? (
        <div style={projectStyles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "50px 0",
            background: "var(--panel-bg)",
            borderRadius: "20px",
            border: "1px dashed var(--border-soft)",
            textAlign: "center",
          }}
        >
          <Empty
            description={
              <span style={{ color: "var(--text-sub)", fontSize: "14px" }}>
                {projects.length === 0
                  ? "Bạn chưa có dự án đan móc nào. Hãy ghé thăm Kho để tạo dự án đầu tiên nhé! 🚀"
                  : "Không tìm thấy dự án nào khớp với bộ lọc của bạn."}
              </span>
            }
          >
            {projects.length === 0 && (
              <Link href="/patterns" passHref>
                <Button
                  type="primary"
                  icon={<ReadOutlined />}
                  style={{
                    background: "var(--pink-dark)",
                    border: "none",
                    borderRadius: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Khám phá Kho Chart
                </Button>
              </Link>
            )}
          </Empty>
        </div>
      )}
    </div>
  );
}
