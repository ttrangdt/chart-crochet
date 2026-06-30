import React from "react";

export const projectStyles = {
  card: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-soft)",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
    transition: "all 0.3s ease",
  } as React.CSSProperties,

  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 12px 25px rgba(233, 30, 99, 0.08)",
  } as React.CSSProperties,

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "24px",
    padding: "16px 0",
  } as React.CSSProperties,

  tabContainer: {
    padding: "20px 0",
  } as React.CSSProperties,

  formLabel: {
    fontWeight: "bold",
    color: "var(--text-main)",
    display: "block",
    marginBottom: "6px",
    fontSize: "14px",
  } as React.CSSProperties,

  formInput: {
    borderRadius: "10px",
    padding: "8px 12px",
    width: "100%",
  } as React.CSSProperties,

  formSection: {
    marginBottom: "16px",
  } as React.CSSProperties,

  progressWrapper: {
    padding: "18px",
    background: "var(--panel-bg)",
    borderRadius: "16px",
    border: "1px solid var(--border-soft)",
  } as React.CSSProperties,

  badgePlanning: {
    background: "rgba(156, 39, 176, 0.1)",
    color: "var(--pink-dark)",
    borderColor: "var(--border-soft)",
  } as React.CSSProperties,

  badgeProgressing: {
    background: "rgba(233, 30, 99, 0.1)",
    color: "var(--pink-dark)",
    borderColor: "var(--border-soft)",
  } as React.CSSProperties,

  badgeCompleted: {
    background: "rgba(46, 125, 50, 0.1)",
    color: "#2E7D32",
    borderColor: "#C8E6C9",
  } as React.CSSProperties,

  headingText: {
    color: "var(--text-main)",
    fontWeight: "bold",
  } as React.CSSProperties,

  subText: {
    color: "var(--text-sub)",
    fontSize: "13px",
  } as React.CSSProperties,

  yarnListContainer: {
    maxHeight: "150px",
    overflowY: "auto" as const,
    paddingRight: "6px",
  } as React.CSSProperties,
};
