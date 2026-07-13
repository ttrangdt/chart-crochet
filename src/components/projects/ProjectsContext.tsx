// Migrated to src/features/projects
import React from "react";
export const ProjectsProvider = ({ children }: { children: React.ReactNode }) => children;
export const useProjects = () => ({} as Record<string, unknown>);
