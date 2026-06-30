"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type BasketProject = {
  patternId: string;
  name: string;
  imageUrl: string;
  materials: string[];
  tools: string[];
  quantity: number;
  addedAt: number;
};

type BasketContextType = {
  projects: BasketProject[];
  addProject: (project: Omit<BasketProject, "quantity" | "addedAt">) => boolean; // returns true if newly added
  removeProject: (patternId: string) => void;
  updateQuantity: (patternId: string, quantity: number) => void;
  totalItems: number;
  hasProject: (patternId: string) => boolean;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used within BasketProvider");
  return ctx;
};

const STORAGE_KEY = "yarn-basket-projects";

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<BasketProject[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProjects(JSON.parse(saved));
    } catch {
      // ignore
    }
  }, []);

  const save = (updated: BasketProject[]) => {
    setProjects(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addProject = useCallback((project: Omit<BasketProject, "quantity" | "addedAt">) => {
    let isNew = false;
    setProjects((prev) => {
      const exists = prev.find((p) => p.patternId === project.patternId);
      let updated: BasketProject[];
      if (exists) {
        updated = prev.map((p) =>
          p.patternId === project.patternId ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        isNew = true;
        updated = [...prev, { ...project, quantity: 1, addedAt: Date.now() }];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    return isNew;
  }, []);

  const removeProject = useCallback((patternId: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.patternId !== patternId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((patternId: string, quantity: number) => {
    if (quantity < 1) return;
    setProjects((prev) => {
      const updated = prev.map((p) =>
        p.patternId === patternId ? { ...p, quantity } : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const hasProject = useCallback(
    (patternId: string) => projects.some((p) => p.patternId === patternId),
    [projects]
  );

  const totalItems = projects.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <BasketContext.Provider value={{ projects, addProject, removeProject, updateQuantity, totalItems, hasProject }}>
      {children}
    </BasketContext.Provider>
  );
}
