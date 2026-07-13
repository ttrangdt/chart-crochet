"use client";

import React, { useState, useEffect } from "react";
import { useTheme, ThemeName } from "../stores/ThemeContext";

export default function ThemePicker() {
  const { theme: currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes: { name: ThemeName; label: string; bg: string; border: string; icon: React.ReactNode }[] = [
    {
      name: "pink",
      label: "Mặc định (Hồng)",
      bg: "#FFF5F7",
      border: "#E91E63",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="5" fill="#FFE082" stroke="#5D4037" strokeWidth="1" />
          <path
            fill="none"
            stroke="#5D4037"
            strokeWidth="1.5"
            strokeLinecap="round"
            d="
              M 12 7 C 14 3, 18 7, 17 9
              C 21 8, 21 12, 19 13
              C 21 15, 17 19, 15 17
              C 14 21, 10 21, 9 19
              C 5 20, 3 16, 5 14
              C 1 13, 2 9, 5 8
              C 4 4, 9 4, 10 6
              C 11 4, 12 7, 12 7 Z"
          />
          <circle cx="12" cy="12" r="2.5" fill="#FBC02D" />
        </svg>
      ),
    },
    {
      name: "matcha",
      label: "Matcha Chilling",
      bg: "#F4F7F4",
      border: "#2E7D32",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            fill="#A5D6A7"
            stroke="#3E2723"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2 22C2 22 6 18 12 17C18 16 22 10 22 2C22 2 14 2 8 8C4 12 2 18 2 22Z"
          />
          <path stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" d="M9 13C12 12 17 10 22 2" />
        </svg>
      ),
    },
    {
      name: "blueberry",
      label: "Blueberry Mousse",
      bg: "#F3E5F5",
      border: "#9C27B0",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#263238" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path fill="#81C784" d="M12 8C10 5 10 2 12 1C14 2 14 5 12 8Z" />
          <path fill="#81C784" d="M10 8C7 7 4 8 3 10C4 12 7 11 10 8Z" />
          <path fill="#81C784" d="M14 8C17 7 20 8 21 10C20 12 17 11 14 8Z" />
          <circle cx="9" cy="14" r="4.5" fill="#9FA8DA" stroke="#263238" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="4.5" fill="#7986CB" stroke="#263238" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      name: "lemon",
      label: "Lemon Chiffon",
      bg: "#FFFDF0",
      border: "#FBC02D",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#4E342E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8.5" fill="#FFF59D" stroke="#4E342E" strokeWidth="1.5" />
          <circle cx="9.5" cy="11" r="1" fill="#4E342E" stroke="none" />
          <circle cx="14.5" cy="11" r="1" fill="#4E342E" stroke="none" />
          <ellipse cx="7.5" cy="12.5" rx="1.2" ry="0.6" fill="#FF8A80" stroke="none" />
          <ellipse cx="16.5" cy="12.5" rx="1.2" ry="0.6" fill="#FF8A80" stroke="none" />
          <path fill="#FFB74D" stroke="#4E342E" strokeWidth="1.2" d="M10 12.5c0 1.5 4 1.5 4 0H10Z" />
        </svg>
      ),
    },
    {
      name: "dark",
      label: "Bóng Đêm (Đen)",
      bg: "#1c1518",
      border: "#ff609a",
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#ff609a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path fill="#FFF9C4" d="M12 3a9 9 0 1 0 9 9 5.5 5.5 0 0 1-9-9Z" />
          <path stroke="#2a1f24" strokeWidth="1.2" d="M12 3a9 9 0 1 0 9 9 5.5 5.5 0 0 1-9-9Z" />
          <path stroke="#2a1f24" strokeWidth="1.2" d="M10 12.5c.3.5.7.5 1 0" />
          <circle cx="9" cy="13.5" r="0.6" fill="#FF8A80" stroke="none" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: "35px",
        right: "35px",
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Vòng tròn lựa chọn bay lên khi Hover / Click */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0) translateY(50px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => {
              setTheme(t.name);
              // close overlay after click
              setIsOpen(false);
            }}
            title={t.label}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: t.bg,
              border: `2.5px solid ${currentTheme === t.name ? t.border : "var(--border-soft)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: currentTheme === t.name 
                ? `0 0 12px ${t.border}88, 0 4px 10px rgba(0,0,0,0.15)` 
                : "0 4px 8px rgba(0,0,0,0.08)",
              transition: "all 0.3s ease",
              transform: currentTheme === t.name ? "scale(1.15)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.2) translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 6px 15px rgba(0,0,0,0.15)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = currentTheme === t.name ? "scale(1.15)" : "scale(1)";
              e.currentTarget.style.boxShadow = currentTheme === t.name 
                ? `0 0 12px ${t.border}88, 0 4px 10px rgba(0,0,0,0.15)` 
                : "0 4px 8px rgba(0,0,0,0.08)";
            }}
          >
            {t.icon}
          </button>
        ))}
      </div>

      {/* Nút Thắt Nơ Xinh Xắn (Bow ribbon toggle) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "var(--bg-card)",
          border: "2.5px solid var(--pink-dark)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 20px rgba(233, 30, 99, 0.25)",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isOpen ? "rotate(180deg) scale(1.05)" : "rotate(0deg) scale(1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = isOpen 
            ? "rotate(180deg) scale(1.1)" 
            : "scale(1.1) translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(233, 30, 99, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = isOpen ? "rotate(180deg) scale(1.05)" : "scale(1)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(233, 30, 99, 0.25)";
        }}
      >
        <svg
          viewBox="0 0 64 64"
          width="36"
          height="36"
          fill="none"
          stroke="var(--pink-dark)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: "stroke 0.3s ease" }}
        >
          {/* Cánh nơ bên trái */}
          <path fill="var(--pink-light)" d="M32 32 C12 12, 4 20, 8 36 C12 48, 24 40, 32 32 Z" style={{ transition: "fill 0.3s ease" }} />
          {/* Cánh nơ bên phải */}
          <path fill="var(--pink-light)" d="M32 32 C52 12, 60 20, 56 36 C52 48, 40 40, 32 32 Z" style={{ transition: "fill 0.3s ease" }} />
          {/* Ruy băng đuôi nơ */}
          <path d="M26 36 C20 48, 12 56, 12 56" />
          <path d="M30 38 C26 48, 18 56, 18 56" />
          <path d="M38 36 C44 48, 52 56, 52 56" />
          <path d="M34 38 C38 48, 46 56, 46 56" />
          {/* Nút thắt tròn ở giữa */}
          <circle cx="32" cy="32" r="6" fill="var(--pink-dark)" style={{ transition: "fill 0.3s ease" }} />
        </svg>
      </button>
    </div>
  );
}
