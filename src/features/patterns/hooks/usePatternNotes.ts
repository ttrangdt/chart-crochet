import React, { useState, useEffect } from "react";
import { Pattern } from "../types/patterns.types";

export function usePatternNotes(pattern: Pattern | undefined) {
  const [rowNotes, setRowNotes] = useState<Record<string, string>>({});
  const [editingNotePath, setEditingNotePath] = useState<string | null>(null);
  const [noteInputValue, setNoteInputValue] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && pattern) {
      const initialNotes: Record<string, string> = {};
      Object.entries(pattern.content).forEach(([part, steps]) => {
        (steps as string[]).forEach((_, index) => {
          const key = `${pattern.id}-${part}-${index}-note`;
          const val = localStorage.getItem(key);
          if (val) {
            initialNotes[`${part}-${index}`] = val;
          }
        });
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRowNotes(initialNotes);
    }
  }, [pattern]);

  const handleSaveNote = (part: string, index: number, noteText: string) => {
    if (!pattern) return;
    const noteKey = `${pattern.id}-${part}-${index}-note`;
    if (noteText.trim()) {
      localStorage.setItem(noteKey, noteText.trim());
      setRowNotes((prev) => ({ ...prev, [`${part}-${index}`]: noteText.trim() }));
    } else {
      localStorage.removeItem(noteKey);
      setRowNotes((prev) => {
        const update = { ...prev };
        delete update[`${part}-${index}`];
        return update;
      });
    }
    setEditingNotePath(null);
  };

  const startEditingNote = (part: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingNotePath(`${part}-${index}`);
    setNoteInputValue(rowNotes[`${part}-${index}`] || "");
  };

  const cancelEditingNote = () => {
    setEditingNotePath(null);
  };

  return {
    rowNotes,
    editingNotePath,
    noteInputValue,
    setNoteInputValue,
    handleSaveNote,
    startEditingNote,
    cancelEditingNote,
  };
}
