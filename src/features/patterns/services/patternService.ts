/**
 * Pattern Service — abstraction layer for pattern data access.
 * Currently backed by static mockData.json.
 * Swap implementation here when a real API is available — no other file changes needed.
 */

import mockData from "@/data/mockData.json";
import type { Pattern } from "../types/patterns.types";

const patterns = mockData.charts as Pattern[];

export const patternService = {
  /** Get all patterns */
  getAll(): Pattern[] {
    return patterns;
  },

  /** Get single pattern by ID */
  getById(id: string): Pattern | undefined {
    return patterns.find((p) => p.id === id);
  },

  /** Search patterns by text (name, description, materials) */
  search(query: string): Pattern[] {
    if (!query.trim()) return patterns;
    const q = query.toLowerCase();
    return patterns.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.materials.some((m) => m.toLowerCase().includes(q))
    );
  },

  /** Filter by category */
  filterByCategory(category: string[]): Pattern[] {
    if (!category.length) return patterns;
    return patterns.filter((p) => category.includes(p.category));
  },

  /** Get all unique categories */
  getCategories(): string[] {
    return [...new Set(patterns.map((p) => p.category))];
  },

  /** Get all unique difficulties */
  getDifficulties(): string[] {
    return [...new Set(patterns.map((p) => p.difficulty))];
  },
};
