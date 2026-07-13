export interface StitchDefinition {
  symbol: string;
  usSymbol: string;
  nameVi: string;
  nameEn: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  description: string;
  steps: string[];
  svgType:
    | "chain"
    | "single"
    | "increase"
    | "decrease"
    | "half-double"
    | "double"
    | "slip"
    | "mr"
    | "blo"
    | "flo"
    | "bo"
    | "w"
    | "m"
    | "treble"
    | "fo";
}
