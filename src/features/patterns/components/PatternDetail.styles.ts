import React from "react";

export const patternStyles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "var(--bg-card)",
    padding: "40px",
    borderRadius: "32px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
  } as React.CSSProperties,

  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  } as React.CSSProperties,

  breadcrumbTitle: {
    color: "var(--text-main)",
    fontWeight: "bold",
  } as React.CSSProperties,

  backButton: {
    color: "var(--pink-dark)",
    fontWeight: "bold",
  } as React.CSSProperties,

  pageTitle: {
    textAlign: "center",
    color: "var(--text-main)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "40px",
  } as React.CSSProperties,

  descriptionQuote: {
    color: "var(--text-sub)",
    fontSize: "16px",
    lineHeight: "1.8",
    fontStyle: "italic",
    borderLeft: "5px solid var(--pink-dark)",
    paddingLeft: "15px",
  } as React.CSSProperties,

  beginnerNotesBox: {
    background: "linear-gradient(135deg, var(--panel-bg) 0%, var(--bg-card) 100%)",
    padding: "20px",
    borderRadius: "16px",
    marginTop: "20px",
    border: "1px solid var(--border-soft)",
  } as React.CSSProperties,

  beginnerNotesTitle: {
    color: "var(--pink-dark)",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  } as React.CSSProperties,

  beginnerNotesText: {
    color: "var(--text-main)",
    lineHeight: "1.6",
    display: "block",
  } as React.CSSProperties,

  projectSelectBox: {
    background: "var(--bg-card)",
    padding: "20px",
    borderRadius: "20px",
    border: "2px solid var(--border-soft)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.03)",
    marginBottom: "20px",
  } as React.CSSProperties,

  projectSelectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  } as React.CSSProperties,

  projectSelectLabel: {
    color: "var(--text-main)",
    fontSize: "14px",
  } as React.CSSProperties,

  projectSelectDropdown: {
    width: "200px",
    marginLeft: "10px",
  } as React.CSSProperties,

  projectSelectEmpty: {
    color: "var(--text-sub)",
    marginLeft: "10px",
  } as React.CSSProperties,

  newProjectButton: {
    color: "var(--pink-dark)",
    borderColor: "var(--pink-dark)",
    borderRadius: "15px",
    fontWeight: "bold",
  } as React.CSSProperties,

  noProjectBox: {
    background: "var(--bg-card)",
    padding: "40px 24px",
    borderRadius: "20px",
    border: "2px dashed var(--border-soft)",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(233,30,99,0.02)",
  } as React.CSSProperties,

  noProjectIcon: {
    fontSize: "36px",
    marginBottom: "15px",
  } as React.CSSProperties,

  noProjectTitle: {
    color: "var(--text-main)",
    marginTop: 0,
  } as React.CSSProperties,

  noProjectDesc: {
    color: "var(--text-sub)",
    fontSize: "13px",
    padding: "0 10px",
  } as React.CSSProperties,

  noProjectBtn: {
    background: "var(--pink-dark)",
    border: "none",
    borderRadius: "15px",
    fontWeight: "bold",
    marginTop: "10px",
    padding: "0 25px",
  } as React.CSSProperties,

  preparedMaterialsBox: {
    background: "var(--panel-bg)",
    padding: "24px",
    borderRadius: "20px",
    marginBottom: "30px",
    border: "1px solid var(--border-soft)",
  } as React.CSSProperties,

  preparedMaterialsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    flexWrap: "wrap",
    gap: "10px",
  } as React.CSSProperties,

  preparedMaterialsTitle: {
    color: "var(--pink-dark)",
    margin: 0,
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,

  preparedMaterialsDifficultyTag: {
    background: "var(--pink-dark)",
    color: "#fff",
    border: "none",
    padding: "4px 12px",
    borderRadius: "10px",
    fontWeight: "bold",
  } as React.CSSProperties,

  checklistColumnTitle: {
    color: "var(--text-main)",
    display: "block",
    marginBottom: "12px",
    fontSize: "15px",
    borderLeft: "3px solid var(--pink-dark)",
    paddingLeft: "8px",
  } as React.CSSProperties,

  checklistItemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  } as React.CSSProperties,

  checklistItemRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as React.CSSProperties,

  shopeeBuyLink: {
    color: "#EE4D2D",
    fontSize: "12px",
    fontWeight: "bold",
  } as React.CSSProperties,

  addToBasketBtnContainer: {
    marginTop: "20px",
  } as React.CSSProperties,

  instructionsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "3px solid var(--pink-dark)",
    paddingBottom: "10px",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "15px",
  } as React.CSSProperties,

  instructionsTitle: {
    color: "var(--text-main)",
    textTransform: "uppercase",
    margin: 0,
  } as React.CSSProperties,

  partBox: {
    marginBottom: "25px",
    background: "var(--bg-card)",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid var(--border-soft)",
  } as React.CSSProperties,

  partHeader: {
    fontWeight: "900",
    color: "#fff",
    background: "var(--pink-dark)",
    padding: "10px 20px",
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  } as React.CSSProperties,

  floatDictButton: {
    position: "fixed",
    top: "145px",
    right: "35px",
    zIndex: 1000,
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "var(--bg-card)",
    border: "2.5px solid var(--pink-dark)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  } as React.CSSProperties,

  imageStyles: {
    width: "100%",
    borderRadius: "20px",
    marginBottom: "20px",
    border: "2px solid var(--border-soft)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
  } as React.CSSProperties,
};
