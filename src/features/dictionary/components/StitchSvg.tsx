import React from "react";
import { StitchDefinition } from "../types/dictionary.types";

type StitchSvgProps = {
  type: StitchDefinition["svgType"];
};

export default function StitchSvg({ type }: StitchSvgProps) {
  const primaryColor = "var(--pink-dark)";
  const secondaryColor = "var(--pink-light)";
  const threadColor = "#4A90E2";

  switch (type) {
    case "mr":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <circle cx="50" cy="40" r="16" fill="none" stroke={threadColor} strokeWidth="3" strokeDasharray="3,0" />
          <path d="M 50 24 C 65 24, 72 38, 62 48 C 50 60, 32 32, 50 24" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 62 48 L 78 68" fill="none" stroke={secondaryColor} strokeWidth="2.5" />
          <circle cx="50" cy="24" r="2.5" fill="#2E7D32" />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)" fontWeight="bold">Siết giữ sợi ngắn để khép vòng</text>
        </svg>
      );
    case "chain":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <path d="M 50 10 C 35 25, 35 35, 50 45 C 65 35, 65 25, 50 10 Z" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 50 35 C 40 45, 40 55, 50 65 C 60 55, 60 45, 50 35 Z" fill="none" stroke={secondaryColor} strokeWidth="3" />
          <path d="M 50 5 L 50 70" fill="none" stroke="#2E7D32" strokeWidth="2" strokeDasharray="4,4" />
          <path d="M 46 65 L 50 72 L 54 65" fill="none" stroke="#2E7D32" strokeWidth="2" />
          <text x="50" y="78" textAnchor="middle" fontSize="6" fill="var(--text-sub)" fontWeight="bold">Chiều rút sợi</text>
        </svg>
      );
    case "single":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <path d="M 10 60 Q 30 50 50 60 T 90 60" fill="none" stroke="#999" strokeWidth="4" />
          <path d="M 30 60 L 30 75 M 50 60 L 50 75 M 70 60 L 70 75" fill="none" stroke="#ccc" strokeWidth="2" />
          <path d="M 50 20 L 50 58" fill="none" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M 50 20 C 50 10, 60 10, 60 18" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 35 30 Q 45 42 65 35" fill="none" stroke={threadColor} strokeWidth="2.5" strokeDasharray="3,2" />
          <polygon points="65,35 60,31 61,38" fill={threadColor} />
          <text x="50" y="72" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Kim luồn qua 2 cạnh chữ V</text>
        </svg>
      );
    case "increase":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <circle cx="50" cy="60" r="4" fill="#999" />
          <path d="M 50 60 L 30 25 Q 25 15 35 15 T 45 25" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 50 60 L 70 25 Q 75 15 65 15 T 55 25" fill="none" stroke={secondaryColor} strokeWidth="3" />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)" fontWeight="bold">2 mũi vắt chung 1 gốc</text>
        </svg>
      );
    case "decrease":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <circle cx="35" cy="60" r="3" fill="#999" />
          <circle cx="65" cy="60" r="3" fill="#999" />
          <path d="M 35 60 L 50 25" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 65 60 L 50 25" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 50 25 Q 50 12 60 15" fill="none" stroke={secondaryColor} strokeWidth="3.5" />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Chập 2 chân phía trước (FLO)</text>
        </svg>
      );
    case "w":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <circle cx="50" cy="65" r="4" fill="#999" />
          <path d="M 50 65 L 20 30" fill="none" stroke={primaryColor} strokeWidth="2.5" />
          <path d="M 50 65 L 50 25" fill="none" stroke={secondaryColor} strokeWidth="2.5" />
          <path d="M 50 65 L 80 30" fill="none" stroke={primaryColor} strokeWidth="2.5" />
          <text x="50" y="75" textAnchor="middle" fontSize="6" fill="var(--text-sub)">3 mũi chung chân nở rộng góc</text>
        </svg>
      );
    case "m":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <circle cx="25" cy="60" r="3" fill="#999" />
          <circle cx="50" cy="60" r="3" fill="#999" />
          <circle cx="75" cy="60" r="3" fill="#999" />
          <path d="M 25 60 L 50 25 M 50 60 L 50 25 M 75 60 L 50 25" fill="none" stroke={primaryColor} strokeWidth="2.5" />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Chập 3 mũi thành 1 đỉnh</text>
        </svg>
      );
    case "half-double":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <path d="M 50 15 C 40 25, 40 30, 50 38" fill="none" stroke={primaryColor} strokeWidth="3" />
          <ellipse cx="50" cy="20" rx="6" ry="3" fill="none" stroke={secondaryColor} strokeWidth="2" />
          <ellipse cx="50" cy="28" rx="7" ry="3" fill="none" stroke={threadColor} strokeWidth="2" />
          <path d="M 50 10 L 50 48" fill="none" stroke="#2E7D32" strokeWidth="2" strokeDasharray="3,3" />
          <polygon points="50,48 46,42 54,42" fill="#2E7D32" />
          <text x="50" y="72" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Rút qua 3 vòng mịn màng</text>
        </svg>
      );
    case "double":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <path d="M 51 60 Q 42 42 51 25" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 49 60 Q 58 42 49 25" fill="none" stroke={secondaryColor} strokeWidth="3" />
          <line x1="44" y1="45" x2="56" y2="42" stroke="white" strokeWidth="2" />
          <line x1="43" y1="35" x2="57" y2="32" stroke="white" strokeWidth="2" />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Kéo sợi 2 nấc cao xốp</text>
        </svg>
      );
    case "slip":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <path d="M 20 50 Q 50 35 80 50" fill="none" stroke="#999" strokeWidth="3" />
          <path d="M 50 38 L 50 48" fill="none" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
          <path d="M 53 25 Q 40 45 48 55" fill="none" stroke={threadColor} strokeWidth="2" />
          <polygon points="48,55 43,51 51,49" fill={threadColor} />
          <text x="50" y="70" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Kéo nhanh khóa hàng phẳng phiu</text>
        </svg>
      );
    case "blo":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          {/* V-stitch loop top */}
          <path d="M 20 30 Q 35 45 50 30 T 80 30" fill="none" stroke="#ccc" strokeWidth="4" />
          {/* Back loop highlight */}
          <path d="M 50 30 Q 65 15 80 30" fill="none" stroke={primaryColor} strokeWidth="4" />
          <circle cx="65" cy="22" r="3.5" fill="#2E7D32" />
          <text x="50" y="68" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Chỉ móc vào thớ len nửa phía sau</text>
        </svg>
      );
    case "flo":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          {/* V-stitch loop top */}
          <path d="M 20 30 Q 35 45 50 30 T 80 30" fill="none" stroke="#ccc" strokeWidth="4" />
          {/* Front loop highlight */}
          <path d="M 20 30 Q 35 45 50 30" fill="none" stroke={primaryColor} strokeWidth="4" />
          <circle cx="35" cy="38" r="3.5" fill="#2E7D32" />
          <text x="50" y="68" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Chỉ móc vào thớ len nửa phía trước</text>
        </svg>
      );
    case "bo":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          {/* Bubble texture cluster */}
          <ellipse cx="50" cy="40" rx="14" ry="18" fill="none" stroke={primaryColor} strokeWidth="3" />
          <path d="M 40 40 L 40 55 M 46 38 L 46 56 M 54 38 L 54 56 M 60 40 L 60 55" stroke={secondaryColor} strokeWidth="2.5" />
          <circle cx="50" cy="22" r="3.5" fill={threadColor} />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)" fontWeight="bold">Cụm hạt nổi nhô tròn 3D</text>
        </svg>
      );
    case "fo":
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          {/* Scissors & Cut thread */}
          <path d="M 30 45 L 70 45" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="3,3" />
          {/* Thread loop and needle */}
          <path d="M 50 15 L 50 43" fill="none" stroke={primaryColor} strokeWidth="3" />
          <circle cx="50" cy="15" r="2" fill={threadColor} />
          {/* Scissors handles */}
          <circle cx="35" cy="55" r="5" fill="none" stroke="red" strokeWidth="2.5" />
          <circle cx="45" cy="55" r="5" fill="none" stroke="red" strokeWidth="2.5" />
          <line x1="38" y1="51" x2="52" y2="35" stroke="red" strokeWidth="2.5" />
          <line x1="42" y1="51" x2="28" y2="35" stroke="red" strokeWidth="2.5" />
          <text x="50" y="74" textAnchor="middle" fontSize="6" fill="var(--text-sub)" fontWeight="bold">Cắt sợi & rút kim kết thúc</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 80" width="100%" height="150" style={{ background: "var(--panel-bg)", borderRadius: "16px" }}>
          <path d="M 20 40 Q 50 20 80 40 T 80 60" fill="none" stroke={primaryColor} strokeWidth="3.5" />
          <text x="50" y="70" textAnchor="middle" fontSize="6" fill="var(--text-sub)">Minh họa ký hiệu mũi tương ứng</text>
        </svg>
      );
  }
}
