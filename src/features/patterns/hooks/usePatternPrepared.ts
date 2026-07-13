import { useState, useEffect } from "react";
import { Pattern } from "../types/patterns.types";

export function usePatternPrepared(pattern: Pattern | undefined) {
  const [preparedItems, setPreparedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (pattern) {
      const savedPrep = localStorage.getItem(`crochet-prepared-${pattern.id}`);
      if (savedPrep) {
        try {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setPreparedItems(JSON.parse(savedPrep));
        } catch (e) {
          console.error(e);
        }
      } else {
        setPreparedItems({});
      }
    }
  }, [pattern]);

  const togglePreparedItem = (key: string, checked: boolean) => {
    if (!pattern) return;
    const updated = {
      ...preparedItems,
      [key]: checked,
    };
    setPreparedItems(updated);
    localStorage.setItem(`crochet-prepared-${pattern.id}`, JSON.stringify(updated));
  };

  return {
    preparedItems,
    togglePreparedItem,
  };
}
