"use client";

import React from "react";
import { translateStep } from "../utils/translation";

type PatternStepTextProps = {
  text: string;
  notationSystem: "VI" | "US";
  onSymbolClick: (symbol: string) => void;
};

export default function PatternStepText({
  text,
  notationSystem,
  onSymbolClick,
}: PatternStepTextProps) {
  const translated = translateStep(text, notationSystem);
  const symbols =
    notationSystem === "VI"
      ? ["CH", "SL", "BO", "X", "V", "A", "T", "F", "E"]
      : ["ch", "sl st", "bo", "sc", "inc", "dec", "hdc", "dc", "tr"];

  // Build regex to match symbols as standalone words
  const escapedSymbols = symbols.map((s) =>
    s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
  );
  const regexStr = escapedSymbols.map((s) => `(\\b${s}\\b)`).join("|");
  const regex = new RegExp(regexStr, notationSystem === "VI" ? "g" : "gi");

  const parts = translated.split(regex);
  if (parts.length <= 1) {
    return <>{translated}</>;
  }

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;

        const isSymbol = symbols.some(
          (s) => s.toLowerCase() === part.toLowerCase()
        );
        if (isSymbol) {
          return (
            <span
              key={index}
              style={{
                color: "var(--pink-dark)",
                fontWeight: "bold",
                cursor: "pointer",
                textDecoration: "underline dashed",
                textUnderlineOffset: "3px",
                background: "rgba(233, 30, 99, 0.05)",
                padding: "1px 4px",
                borderRadius: "4px",
                display: "inline-block",
              }}
              onClick={(e) => {
                e.stopPropagation(); // prevent row click toggle step from firing!
                onSymbolClick(part);
              }}
              title={`Click để tra cứu cách móc mũi ${part}`}
            >
              {part}
            </span>
          );
        }

        return part;
      })}
    </>
  );
}
