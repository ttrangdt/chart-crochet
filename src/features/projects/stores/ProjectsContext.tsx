"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type YarnDetail = {
  brand: string;
  colorCode: string;
  lotNumber: string;
};

export type ActiveProject = {
  id: string;
  patternId: string;
  customName: string;
  category: string;
  difficulty: string;
  imageUrl: string;
  status: "planning" | "progressing" | "completed";
  completedSteps: Record<string, boolean>;
  rowCount: number;
  targetRows: number;
  materials: string[];
  tools: string[];
  notes: string;
  yarnDetails: YarnDetail[];
  createdDate: number;
  completedDate?: number;
};

type ProjectsContextType = {
  projects: ActiveProject[];
  activeProjectIdMap: Record<string, string>; // maps patternId -> active projectId for detail page selection
  setActiveProjectForPattern: (patternId: string, projectId: string) => void;
  createProject: (params: {
    patternId: string;
    customName: string;
    category: string;
    difficulty: string;
    imageUrl: string;
    materials: string[];
    tools: string[];
    yarnDetails: YarnDetail[];
    notes: string;
    targetRows: number;
  }) => ActiveProject;
  deleteProject: (id: string) => void;
  updateProjectProgress: (
    id: string,
    completedSteps: Record<string, boolean>,
    rowCount: number
  ) => void;
  updateProjectState: (id: string, updates: Partial<ActiveProject>) => void;
  getProjectsByPattern: (patternId: string) => ActiveProject[];
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const useProjects = () => {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error("useProjects must be used within ProjectsProvider");
  return ctx;
};

const STORAGE_PROJECTS_KEY = "crochet-projects-diary";
const STORAGE_ACTIVE_MAP_KEY = "crochet-active-projects-map";

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<ActiveProject[]>([]);
  const [activeProjectIdMap, setActiveProjectIdMap] = useState<Record<string, string>>({});

  // Loading from localStorage
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem(STORAGE_PROJECTS_KEY);
      let loadedProjects = savedProjects ? JSON.parse(savedProjects) : [];

      // Auto-populate a test project if empty
      if (loadedProjects.length === 0) {
        loadedProjects = [
          {
            id: "project_test_c001",
            patternId: "c001",
            customName: "Dự án mẫu Súp Lơ",
            category: "Rau Củ",
            difficulty: "2",
            imageUrl: "https://i.pinimg.com/736x/80/9a/9b/809a9bd4563e18ae0be88e6ca165ac5f.jpg",
            status: "progressing",
            completedSteps: {},
            rowCount: 2,
            targetRows: 24,
            materials: ["Len Milk Cotton 50g", "Bông gòn bi", "Mắt thú 6mm"],
            tools: ["Kim móc 2.5mm", "Kim khâu len", "Kéo"],
            notes: "Để ý móc đều tay để súp lơ không bị méo nha!",
            yarnDetails: [{ brand: "Milk Bò 50g", colorCode: "Xanh lá 26", lotNumber: "Lot A" }],
            createdDate: Date.now()
          }
        ];
        localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(loadedProjects));
      }
      setProjects(loadedProjects);
      
      const savedActiveMap = localStorage.getItem(STORAGE_ACTIVE_MAP_KEY);
      let activeMap = savedActiveMap ? JSON.parse(savedActiveMap) : {};
      if (!activeMap["c001"]) {
        activeMap["c001"] = "project_test_c001";
        localStorage.setItem(STORAGE_ACTIVE_MAP_KEY, JSON.stringify(activeMap));
      }
      setActiveProjectIdMap(activeMap);
    } catch (e) {
      console.error("Failed to load projects from localStorage", e);
    }
  }, []);

  const setActiveProjectForPattern = useCallback((patternId: string, projectId: string) => {
    setActiveProjectIdMap((prev) => {
      const updated = { ...prev, [patternId]: projectId };
      localStorage.setItem(STORAGE_ACTIVE_MAP_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const createProject = useCallback((params: {
    patternId: string;
    customName: string;
    category: string;
    difficulty: string;
    imageUrl: string;
    materials: string[];
    tools: string[];
    yarnDetails: YarnDetail[];
    notes: string;
    targetRows: number;
  }) => {
    const newProj: ActiveProject = {
      id: "project_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
      patternId: params.patternId,
      customName: params.customName || "Dự án mới",
      category: params.category,
      difficulty: params.difficulty,
      imageUrl: params.imageUrl,
      status: "planning",
      completedSteps: {},
      rowCount: 0,
      targetRows: params.targetRows || 10,
      materials: params.materials,
      tools: params.tools,
      notes: params.notes || "",
      yarnDetails: params.yarnDetails || [],
      createdDate: Date.now(),
    };

    setProjects((prev) => {
      const updated = [...prev, newProj];
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Auto set this newly created project as the active project for this pattern page
    setActiveProjectForPattern(params.patternId, newProj.id);

    return newProj;
  }, [setActiveProjectForPattern]);

  const deleteProject = useCallback((id: string) => {
    setProjects((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
      return updated;
    });

    // Remove from active map if it was active
    setActiveProjectIdMap((prev) => {
      const updated = { ...prev };
      let changed = false;
      for (const patternId in updated) {
        if (updated[patternId] === id) {
          delete updated[patternId];
          changed = true;
        }
      }
      if (changed) {
        localStorage.setItem(STORAGE_ACTIVE_MAP_KEY, JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  }, []);

  const updateProjectProgress = useCallback((
    id: string,
    completedSteps: Record<string, boolean>,
    rowCount: number
  ) => {
    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== id) return p;

        let newStatus = p.status;
        const stepLists = Object.keys(completedSteps);
        const completedCount = stepLists.filter(k => completedSteps[k]).length;
        
        if (completedCount > 0 || rowCount > 0) {
          newStatus = "progressing";
        }

        return {
          ...p,
          completedSteps,
          rowCount,
          status: newStatus as any,
        };
      });
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateProjectState = useCallback((id: string, updates: Partial<ActiveProject>) => {
    setProjects((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== id) return p;
        
        const merged = { ...p, ...updates };
        
        if (updates.status === "completed" && !p.completedDate) {
          merged.completedDate = Date.now();
        } else if (updates.status && updates.status !== "completed") {
          merged.completedDate = undefined;
        }

        return merged;
      });
      localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getProjectsByPattern = useCallback((patternId: string) => {
    return projects.filter((p) => p.patternId === patternId);
  }, [projects]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        activeProjectIdMap,
        setActiveProjectForPattern,
        createProject,
        deleteProject,
        updateProjectProgress,
        updateProjectState,
        getProjectsByPattern,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
