"use client";

import React, { useState, useEffect } from "react";
import { Modal, List, Typography, Tag, Space, Divider, Row, Col, Input, Alert } from "antd";
import {
  BookOutlined,
  SearchOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

export interface StitchDefinition {
  symbol: string;
  usSymbol: string;
  nameVi: string;
  nameEn: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  description: string;
  steps: string[];
  svgType: "chain" | "single" | "increase" | "decrease" | "half-double" | "double" | "slip" | "mr" | "blo" | "flo" | "bo" | "w" | "m" | "treble" | "fo";
}

// Danh sách đầy đủ 14 mũi móc đan cơ bản & nâng cao
export const STITCH_GLOSSARY: StitchDefinition[] = [
  {
    symbol: "MR",
    usSymbol: "MR / mc",
    nameVi: "Vòng tròn ma thuật",
    nameEn: "Magic Ring / Magic Circle",
    difficulty: "Trung bình",
    description: "Cách tốt nhất để bắt đầu móc các chi tiết hình tròn (đầu gấu, quả bóng...). Giúp siết khít lỗ tâm không để lộ bông nhồi.",
    steps: [
      "Quấn sợi len quanh các ngón tay để tạo thành một vòng tròn chồng lên nhau.",
      "Luồn kim móc dưới vòng tròn, bắt sợi len và kéo qua để tạo một vòng thòng lọng.",
      "Móc 1 mũi bính (CH) để khóa vòng tròn lại.",
      "Móc các mũi đơn (X) theo số lượng yêu cầu vào trong vòng tròn.",
      "Cầm đuôi len ngắn rút chặt để vòng tròn khép kín lại."
    ],
    svgType: "mr"
  },
  {
    symbol: "CH",
    usSymbol: "ch",
    nameVi: "Mũi bính (Mũi xích)",
    nameEn: "Chain Stitch",
    difficulty: "Dễ",
    description: "Mũi móc nền tảng đầu tiên để tạo chuỗi bính xuất phát hoặc tăng chiều cao hàng mới.",
    steps: [
      "Tạo một nút thòng lọng (slip knot) trên kim móc.",
      "Vòng len từ sau ra trước qua kim móc (Yarn Over).",
      "Kéo kim móc cùng sợi len vừa vắt qua vòng thòng lọng trên kim.",
      "Lặp lại để tạo chuỗi xích bính dài."
    ],
    svgType: "chain"
  },
  {
    symbol: "X",
    usSymbol: "sc",
    nameVi: "Mũi đơn",
    nameEn: "Single Crochet",
    difficulty: "Dễ",
    description: "Mũi móc nền tảng chủ chốt nhất của Amigurumi, cho thớ len phẳng mịn, kín kẽ và chắc chắn.",
    steps: [
      "Đâm kim móc xuyên qua chân mũi kế tiếp.",
      "Vắt dây len qua kim móc.",
      "Kéo sợi dây len đó xuyên qua chân móc cũ về phía trước (có 2 vòng trên kim).",
      "Vắt len tiếp tục rồi kéo qua cả 2 vòng len cùng một lúc."
    ],
    svgType: "single"
  },
  {
    symbol: "V",
    usSymbol: "inc",
    nameVi: "Mũi tăng (Mũi mở rộng)",
    nameEn: "Single Crochet Increase",
    difficulty: "Dễ",
    description: "Móc hai mũi đơn (X) vào cùng một chân móc để mở rộng chu vi sản phẩm.",
    steps: [
      "Móc 1 mũi đơn (X) hoàn chỉnh vào chân móc kề tiếp.",
      "Đâm kim tiếp tục lần thứ hai vào chính chân móc đó.",
      "Móc thêm 1 mũi đơn (X) nữa vào đó để hoàn thành tăng mũi."
    ],
    svgType: "increase"
  },
  {
    symbol: "A",
    usSymbol: "dec",
    nameVi: "Mũi giảm",
    nameEn: "Single Crochet Decrease",
    difficulty: "Trung bình",
    description: "Thu nhỏ chu vi bằng cách chập 2 chân móc cũ thành 1. Nên dùng mũi giảm ẩn (Invisible Decrease) cho thú bông sạch đẹp.",
    steps: [
      "Luồn kim qua cạnh trước (Front Loop Only - FLO) của chân móc thứ nhất.",
      "Luồn tiếp kim qua cạnh trước của chân móc thứ hai (3 vòng trên kim).",
      "Vắt len và kéo qua 2 vòng cạnh trước vừa luồn (còn 2 vòng trên kim).",
      "Vắt len tiếp lần nữa và kéo qua nốt 2 vòng còn lại."
    ],
    svgType: "decrease"
  },
  {
    symbol: "W",
    usSymbol: "inc3",
    nameVi: "Mũi tăng ba",
    nameEn: "3 Single Crochet in 1 Stitch",
    difficulty: "Trung bình",
    description: "Móc 3 mũi đơn (X) vào cùng một chân móc cũ. Thường ứng dụng tạo các góc nhọn của hình chữ nhật, hoặc gai thú bông.",
    steps: [
      "Móc mũi đơn thứ nhất vào chân móc cũ.",
      "Móc tiếp mũi đơn thứ hai vào chính chân móc đó.",
      "Móc tiếp mũi đơn thứ ba vào chính chân móc đó để có 3 mũi chụm chân."
    ],
    svgType: "w"
  },
  {
    symbol: "M",
    usSymbol: "dec3",
    nameVi: "Mũi giảm ba",
    nameEn: "Single Crochet 3 Together",
    difficulty: "Trung bình",
    description: "Chập liền 3 chân móc kề nhau lại thành 1 mũi duy nhất để giảm kích cỡ nhanh hoặc tạo nếp bóp gấp nhọn.",
    steps: [
      "Luồn kim qua cạnh trước (FLO) của chân móc thứ nhất, thứ hai và thứ ba liên tiếp.",
      "Vắt len kéo qua cả 3 cạnh trước vừa luồn.",
      "Vắt len lần nữa và kéo qua hai vòng dây còn lại trên kim để chập thành 1."
    ],
    svgType: "m"
  },
  {
    symbol: "T",
    usSymbol: "hdc",
    nameVi: "Mũi nửa kép (Mũi chữ T)",
    nameEn: "Half Double Crochet",
    difficulty: "Trung bình",
    description: "Mũi có chiều cao trung bình giữa mũi đơn và mũi kép, có tính co dãn tốt và liên kết mềm mại mượt mà.",
    steps: [
      "Vắt một vòng len qua kim móc trước khi luồn kim.",
      "Đâm kim xuyên qua chân mũi bính kề cạnh, vắt len kéo lên (có 3 vòng trên kim).",
      "Vắt len lần nữa rồi kéo kim lách qua hết cả 3 vòng cùng lúc."
    ],
    svgType: "half-double"
  },
  {
    symbol: "F",
    usSymbol: "dc",
    nameVi: "Mũi kép đơn",
    nameEn: "Double Crochet",
    difficulty: "Trung bình",
    description: "Mũi cao, thưa thoáng, thường làm diềm ren, trang phục búp bê hoặc hoa len.",
    steps: [
      "Vắt một vòng len qua kim móc, đâm kim xuyên qua chân móc cũ.",
      "Kéo len lên trước (có 3 vòng trên kim).",
      "Vắt len kéo dứt khoát qua 2 vòng len đầu tiên (còn 2 vòng trên kim).",
      "Vắt len và kéo qua nốt 2 vòng len cuối cùng."
    ],
    svgType: "double"
  },
  {
    symbol: "E",
    usSymbol: "tr",
    nameVi: "Mũi kép đôi",
    nameEn: "Treble Crochet",
    difficulty: "Trung bình",
    description: "Mũi rất cao, độ rủ tốt, thường để tạo cánh hoa dài thanh lịch hoặc lá cây.",
    steps: [
      "Quấn len 2 vòng quanh đầu kim móc.",
      "Đâm kim xuyên qua chân bính cũ, vắt len kéo qua phía trước (có 4 vòng trên kim).",
      "Vắt len kéo qua 2 vòng đầu tiên (còn 3 vòng trên kim).",
      "Vắt len kéo qua 2 vòng tiếp theo (còn 2 vòng trên kim).",
      "Vắt len kéo qua nốt 2 vòng cuối cùng."
    ],
    svgType: "treble"
  },
  {
    symbol: "SL",
    usSymbol: "sl st",
    nameVi: "Mũi dời (Mũi trượt)",
    nameEn: "Slip Stitch",
    difficulty: "Dễ",
    description: "Mũi thấp nhất dùng để khóa vòng tròn ma thuật, kết vòng móc hoa hoặc trượt lướt qua các chân mũi.",
    steps: [
      "Đâm kim qua chân móc kế tiếp.",
      "Vắt dây len qua kim đơn.",
      "Kéo thẳng sợi len đó lách qua chân móc cũ và vòng sẵn có trên kim móc."
    ],
    svgType: "slip"
  },
  {
    symbol: "BLO",
    usSymbol: "BLO",
    nameVi: "Móc cạnh sau (Back Loop Only)",
    nameEn: "Back Loop Only",
    difficulty: "Trung bình",
    description: "Chỉ đâm kim qua một cạnh nằm phía sau của chuỗi mũi chữ V. Giúp tạo đường vân hằn ngang dùng làm búp bê đứng vững, lật vành...",
    steps: [
      "Thay vì luồn qua cả 2 cạnh chữ V của chân móc cũ.",
      "Luồn kim chỉ qua 1 cạnh sau xa mắt mình nhất (Back Loop).",
      "Thực hiện móc mũi đơn (hoặc các mũi khác) bình thường trên cạnh sau đó."
    ],
    svgType: "blo"
  },
  {
    symbol: "FLO",
    usSymbol: "FLO",
    nameVi: "Móc cạnh trước (Front Loop Only)",
    nameEn: "Front Loop Only",
    difficulty: "Trung bình",
    description: "Chỉ đâm kim móc qua cạnh phía trước (phía giáp gần mắt bạn nhất). Dùng móc váy búp bê rẽ nhánh, làm xòe bèo nhún.",
    steps: [
      "Xác định cạnh trước của chân mũi chữ V (nằm gần phía bạn nhất).",
      "Đâm kim dứt khoát chỉ qua duy nhất 1 cạnh trước này.",
      "Thực hiện móc mũi đơn (X) hoặc mũi bính khác lên cạnh đó."
    ],
    svgType: "flo"
  },
  {
    symbol: "BO",
    usSymbol: "bo / bobble",
    nameVi: "Mũi hạt bắp (Mũi hạt nổi)",
    nameEn: "Bobble Stitch",
    difficulty: "Khó",
    description: "Gồm nhiều mũi kép đơn chung chân chập đầu lại để tạo ra các điểm gồ nổi 3D tinh nghịch (má hồng gồ, ngón chân thú bông...).",
    steps: [
      "Cách làm 5 kép chụm đầu: Vắt len đâm kim móc 1 mũi kép đơn mở (chưa rút 2 vòng cuối).",
      "Tiếp tục móc thêm 4 mũi kép đơn mở như vậy vào cùng chân móc cũ (lúc này có 6 vòng trên kim).",
      "Vắt len kéo dứt khoát sợi qua toàn bộ 6 vòng cùng lúc.",
      "Móc 1 bính khóa để ép khối hạt nổi tròn hẳn lên."
    ],
    svgType: "bo"
  },
  {
    symbol: "FO",
    usSymbol: "FO / fasten off",
    nameVi: "Chốt sợi (Cắt len / Kết thúc)",
    nameEn: "Fasten Off",
    difficulty: "Dễ",
    description: "Thao tác kết thúc cuối cùng để chốt dứt điểm sợi len, cắt sợi và giấu len thừa vào lòng thú bông để không bị tuột hàng.",
    steps: [
      "Móc 1 mũi dời (SL) vào chân kế tiếp để làm phẳng mép nối.",
      "Dùng kéo cắt sợi len chừa lại một đoạn dài khoảng 10 - 15 cm.",
      "Kéo thẳng kim móc lên để rút hết đầu sợi len qua vòng kim.",
      "Xỏ sợi len thừa vào kim khâu rồi đưa sâu luồn lách giấu đầu chỉ thừa vào ruột nhồi bông."
    ],
    svgType: "fo"
  }
];

// Hàm vẽ minh họa SVG động bằng Code CSS/SVG bắt mắt theo từng mũi móc
const renderStitchSVG = (type: StitchDefinition["svgType"]) => {
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
};

type CrochetDictionaryModalProps = {
  open: boolean;
  onClose: () => void;
  selectedStitchSymbol?: string; // truyền vào từ viết tắt để tự động mở tab tương ứng
};

export default function CrochetDictionaryModal({
  open,
  onClose,
  selectedStitchSymbol,
}: CrochetDictionaryModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Đồng bộ hóa selectedStitchSymbol vào trường tìm kiếm khi mở Modal ra
  useEffect(() => {
    if (open) {
      setSearchTerm(selectedStitchSymbol || "");
    }
  }, [open, selectedStitchSymbol]);

  // Bộ lọc tìm kiếm thông minh, không phân biệt hoa thường và không so trùng rộng với từ khóa quá ngắn
  const filteredGlossary = STITCH_GLOSSARY.filter((stitch) => {
    const rawSearch = searchTerm.trim().toLowerCase();
    if (!rawSearch) return true;

    // 1. Khớp chính xác ký hiệu viết tắt (ưu tiên tối cao)
    // 1. Khớp chính xác ký hiệu viết tắt (ưu tiên tối cao)
    const usSymbols = stitch.usSymbol.toLowerCase().split(/[/\s]+/).map(s => s.trim()).filter(Boolean);
    const isExactMatch =
      stitch.symbol.toLowerCase() === rawSearch ||
      stitch.usSymbol.toLowerCase() === rawSearch ||
      usSymbols.includes(rawSearch);

    if (isExactMatch) return true;

    // Nếu người dùng nhập ký hiệu rất ngắn (<= 2 ký tự), ta CHỈ tìm trong viết tắt và yêu cầu trùng khớp từ/tiền tố viết tắt để tránh trùng chữ cái ngẫu nhiên trong phần mô tả dài
    if (rawSearch.length <= 2) {
      return (
        stitch.symbol.toLowerCase().includes(rawSearch) ||
        usSymbols.some(us => us.startsWith(rawSearch))
      );
    }

    // Nếu từ khóa dài (> 2 ký tự), ta mới lọc rộng trong tên khoa học và mô tả
    return (
      stitch.symbol.toLowerCase().includes(rawSearch) ||
      stitch.usSymbol.toLowerCase().includes(rawSearch) ||
      stitch.nameVi.toLowerCase().includes(rawSearch) ||
      stitch.nameEn.toLowerCase().includes(rawSearch) ||
      stitch.description.toLowerCase().includes(rawSearch)
    );
  });

  // Đưa các mũi khớp chính xác ký hiệu viết tắt lên đầu tiên
  const sortedGlossary = [...filteredGlossary].sort((a, b) => {
    const rawSearch = searchTerm.trim().toLowerCase();
    if (!rawSearch) return 0;
    
    const aUsWords = a.usSymbol.toLowerCase().split(/[/\s]+/).map(s => s.trim()).filter(Boolean);
    const bUsWords = b.usSymbol.toLowerCase().split(/[/\s]+/).map(s => s.trim()).filter(Boolean);
    const aExact = a.symbol.toLowerCase() === rawSearch || aUsWords.includes(rawSearch);
    const bExact = b.symbol.toLowerCase() === rawSearch || bUsWords.includes(rawSearch);
    
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;
    return 0;
  });

  return (
    <Modal
      title={
        <div style={{ fontSize: "18px", color: "var(--pink-dark)", display: "flex", alignItems: "center", gap: "10px" }}>
          <BookOutlined />
          Từ Điển Mũi Móc Trực Quan & Visual Dictionary
        </div>
      }
      open={open}
      onCancel={() => {
        setSearchTerm("");
        onClose();
      }}
      footer={null}
      width={780}
      style={{ borderRadius: "24px" }}
      destroyOnHidden
    >
      <div style={{ marginTop: "15px" }}>
        {/* Thanh Tìm kiếm */}
        <Input
          placeholder="Nhập kí hiệu tra cứu (vd: X, V, A, MR, BLO, sc, inc, dec...)"
          prefix={<SearchOutlined style={{ color: "var(--text-sub)" }} />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          style={{
            borderRadius: "14px",
            height: "44px",
            border: "1.5px solid var(--border-soft)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
            marginBottom: "20px",
          }}
        />

        {selectedStitchSymbol && (
          <Alert
            type="info"
            showIcon
            message={
              <Text strong style={{ color: "var(--text-main)", fontSize: "13px" }}>
                Ký hiệu tra nhanh: <span style={{ color: "var(--pink-dark)" }}>{selectedStitchSymbol}</span>
              </Text>
            }
            description="Bạn có thể xóa chữ trong hộp tìm kiếm để xem tất cả các mũi móc khác trong thư viện."
            style={{ marginBottom: "20px", borderRadius: "14px" }}
            icon={<SmileOutlined style={{ color: "var(--pink-dark)" }} />}
          />
        )}

        <div style={{ maxHeight: "450px", overflowY: "auto", paddingRight: "8px" }}>
          <List
            itemLayout="vertical"
            dataSource={sortedGlossary}
            renderItem={(stitch) => {
              const isMatchedQuery =
                selectedStitchSymbol?.toUpperCase() === stitch.symbol.toUpperCase() ||
                selectedStitchSymbol?.toLowerCase() === stitch.usSymbol.toLowerCase();

              return (
                <List.Item
                  key={stitch.symbol}
                  style={{
                    background: isMatchedQuery ? "rgba(233, 30, 99, 0.04)" : "var(--bg-card)",
                    marginBottom: "16px",
                    borderRadius: "20px",
                    padding: "20px",
                    border: isMatchedQuery
                      ? "1.5px solid var(--pink-dark)"
                      : "1px solid var(--border-soft)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Row gutter={[20, 20]} align="middle">
                    {/* Cột trái: Ký tự, Tên, Miêu tả */}
                    <Col xs={24} sm={16}>
                      <Space align="baseline" wrap style={{ marginBottom: "8px" }}>
                        <Tag
                          color="pink"
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            border: "none",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          Ký tự Việt: {stitch.symbol}
                        </Tag>
                        <Tag
                          color="blue"
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            border: "none",
                            padding: "3px 8px",
                            borderRadius: "6px",
                          }}
                        >
                          Ký tự Mỹ: {stitch.usSymbol}
                        </Tag>
                        <Tag
                          color={
                            stitch.difficulty === "Dễ"
                              ? "green"
                              : stitch.difficulty === "Trung bình"
                              ? "orange"
                              : "red"
                          }
                          style={{ borderRadius: "6px", fontWeight: "bold" }}
                        >
                          Độ khó: {stitch.difficulty}
                        </Tag>
                      </Space>

                      <Title level={4} style={{ margin: "5px 0 10px 0", color: "var(--text-main)", fontWeight: "900" }}>
                        {stitch.nameVi} <span style={{ fontSize: "14px", color: "var(--text-sub)", fontWeight: "normal" }}>({stitch.nameEn})</span>
                      </Title>

                      <Paragraph style={{ color: "var(--text-sub)", fontSize: "13px", lineHeight: "1.6", marginBottom: "15px" }}>
                        {stitch.description}
                      </Paragraph>

                      <Divider style={{ margin: "10px 0", borderColor: "var(--border-soft)" }} />

                      <Text strong style={{ color: "var(--text-main)", fontSize: "13px", display: "block", marginBottom: "6px" }}>
                        Các bước thực hiện (Step-by-step):
                      </Text>
                      <ol style={{ paddingLeft: "20px", margin: 0, color: "var(--text-main)", fontSize: "13px", lineHeight: "1.6" }}>
                        {stitch.steps.map((step, idx) => (
                          <li key={idx} style={{ marginBottom: "4px" }}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </Col>

                    {/* Cột phải: Hình vẽ SVG */}
                    <Col xs={24} sm={8} style={{ textAlign: "center" }}>
                      <div style={{ padding: "8px" }}>
                        {renderStitchSVG(stitch.svgType)}
                        <Text
                          style={{
                            fontSize: "11px",
                            color: "var(--text-sub)",
                            display: "block",
                            marginTop: "6px",
                            fontStyle: "italic",
                          }}
                        >
                          Hướng dẫn đường luồn sợi
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </List.Item>
              );
            }}
          />

          {filteredGlossary.length === 0 && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🔍</div>
              <Text style={{ color: "var(--text-sub)" }}>Không tìm thấy mũi móc phù hợp với từ khóa "{searchTerm}"</Text>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
