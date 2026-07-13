"use client";

import React from "react";
import { Typography, Radio, Input, Button, Tooltip } from "antd";
import {
  BookOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useTheme } from "@/features/theme";
import { patternStyles } from "./PatternDetail.styles";
import { Pattern } from "../types/patterns.types";
import PatternStepText from "./PatternStepText";

const { Title } = Typography;

type PatternInstructionsProps = {
  pattern: Pattern;
  notationSystem: "VI" | "US";
  setNotationSystem: (system: "VI" | "US") => void;
  completedSteps: Record<string, boolean>;
  toggleStep: (part: string, index: number) => void;
  rowNotes: Record<string, string>;
  editingNotePath: string | null;
  noteInputValue: string;
  setNoteInputValue: (val: string) => void;
  handleSaveNote: (part: string, index: number, noteText: string) => void;
  startEditingNote: (part: string, index: number, e: React.MouseEvent) => void;
  cancelEditingNote: () => void;
  onOpenDictionary: (symbol?: string) => void;
};

export default function PatternInstructions({
  pattern,
  notationSystem,
  setNotationSystem,
  completedSteps,
  toggleStep,
  rowNotes,
  editingNotePath,
  noteInputValue,
  setNoteInputValue,
  handleSaveNote,
  startEditingNote,
  cancelEditingNote,
  onOpenDictionary,
}: PatternInstructionsProps) {
  const { theme } = useTheme();
  const CheckIcon = theme === "matcha" ? CheckCircleOutlined : CheckCircleFilled;

  return (
    <>
      <div style={patternStyles.instructionsHeader}>
        <Title level={4} style={patternStyles.instructionsTitle}>
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
          <Radio.Button value="VI" style={{ borderRadius: "8px 0 0 8px" }}>
            Viết tắt Việt (X, V, A)
          </Radio.Button>
          <Radio.Button value="US" style={{ borderRadius: "0 8px 8px 0" }}>
            Viết tắt Mỹ (sc, inc, dec)
          </Radio.Button>
        </Radio.Group>
      </div>

      {Object.entries(pattern.content).map(([part, steps], idx) => (
        <div key={idx} style={patternStyles.partBox}>
          <div style={patternStyles.partHeader}>{part}</div>
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
                  : isEven
                  ? "var(--bg-card)"
                  : "var(--panel-bg)";
                const cellOpacity = isCompleted ? 0.5 : 1;

                return (
                  <tr key={index} style={{ transition: "all 0.3s ease" }}>
                    <td
                      onClick={() => toggleStep(part, index)}
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
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ marginRight: "6px" }}>
                        {isCompleted ? (
                          <CheckIcon
                            style={{ color: "var(--pink-dark)", fontSize: "13px" }}
                          />
                        ) : (
                          <span
                            style={{
                              display: "inline-block",
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              border: "1.5px solid var(--pink-light)",
                              verticalAlign: "middle",
                            }}
                          />
                        )}
                      </span>
                      {rowSplit[0]}
                    </td>
                    <td
                      onClick={() => toggleStep(part, index)}
                      style={{
                        color: isCompleted ? "var(--text-sub)" : "var(--text-main)",
                        fontWeight: "500",
                        borderBottom: "1px solid var(--border-soft)",
                        padding: "12px",
                        backgroundColor: tdBg,
                        opacity: cellOpacity,
                        textDecoration: isCompleted ? "line-through" : "none",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                    >
                      <div>
                        <PatternStepText
                          text={rowSplit[1] ? rowSplit[1].trim() : step}
                          notationSystem={notationSystem}
                          onSymbolClick={onOpenDictionary}
                        />
                      </div>

                      {/* Hiển thị Ghi chú dòng nếu có */}
                      {rowNotes[`${part}-${index}`] && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontSize: "12.5px",
                            marginTop: "8px",
                            color: "var(--text-main)",
                            background: "var(--panel-bg)",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            display: "inline-block",
                            borderLeft: "3px solid var(--pink-dark)",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                            boxSizing: "border-box",
                          }}
                        >
                          <span style={{ marginRight: "4px" }}>📝</span>{" "}
                          <i>{rowNotes[`${part}-${index}`]}</i>
                        </div>
                      )}

                      {/* Ô nhập liệu ghi chú dòng ẩn hiện inline */}
                      {editingNotePath === `${part}-${index}` && (
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            gap: "8px",
                            alignItems: "center",
                            width: "100%",
                          }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Input
                            size="small"
                            placeholder="Ghi chú số dòng, màu len hoặc ghi nhớ tại đây..."
                            value={noteInputValue}
                            onChange={(e) => setNoteInputValue(e.target.value)}
                            onPressEnter={() =>
                              handleSaveNote(part, index, noteInputValue)
                            }
                            style={{
                              maxWidth: "320px",
                              borderRadius: "8px",
                              height: "30px",
                            }}
                            autoFocus
                          />
                          <Button
                            size="small"
                            type="primary"
                            style={{ borderRadius: "6px" }}
                            onClick={() =>
                              handleSaveNote(part, index, noteInputValue)
                            }
                          >
                            Lưu
                          </Button>
                          <Button
                            size="small"
                            onClick={cancelEditingNote}
                            style={{ borderRadius: "6px" }}
                          >
                            Hủy
                          </Button>
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        width: "55px",
                        textAlign: "center",
                        borderBottom: "1px solid var(--border-soft)",
                        padding: "12px",
                        backgroundColor: tdBg,
                        opacity: cellOpacity,
                        transition: "all 0.3s ease",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip
                        title={
                          rowNotes[`${part}-${index}`]
                            ? "Sửa ghi chú dòng"
                            : "Thêm ghi chú dòng"
                        }
                      >
                        <Button
                          type="text"
                          size="small"
                          icon={
                            rowNotes[`${part}-${index}`] ? (
                              <BookOutlined
                                style={{ color: "var(--pink-dark)" }}
                              />
                            ) : (
                              <MessageOutlined
                                style={{ color: "var(--text-sub)" }}
                              />
                            )
                          }
                          onClick={(e) => startEditingNote(part, index, e)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
