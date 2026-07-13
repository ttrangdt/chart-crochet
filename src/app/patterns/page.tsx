import { Suspense } from "react";
import { PatternList } from "@/features/patterns";

export default function PatternsPage() {
  return (
    <Suspense fallback={null}>
      <PatternList />
    </Suspense>
  );
}
