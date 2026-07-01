import fs from "fs";
import path from "path";
import { BlogView } from "@/features/blog";

export default function Page() {
  // Copy assets on server side render
  if (typeof window === "undefined") {
    const sourceDir = "C:/Users/ADMIN/.gemini/antigravity/brain/f135b02c-e4e6-4a1a-9dd7-0601772fceaf";
    const destDir = "D:/chart-len/public";

    const filesToCopy = [
      { src: "featured_crochet_blog_1782876994248.png", dest: "featured_blog.png" },
      { src: "hide_yarn_ends_1782877003509.png", dest: "hide_yarn_ends.png" },
      { src: "yarn_balls_care_1782877011235.png", dest: "yarn_balls_care.png" },
      { src: "amigurumi_stuffing_1782877021164.png", dest: "amigurumi_stuffing.png" }
    ];

    filesToCopy.forEach(file => {
      const srcPath = path.join(sourceDir, file.src);
      const destPath = path.join(destDir, file.dest);
      if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(srcPath, destPath);
        } catch (e) {
          console.error("Failed to copy blog asset:", e);
        }
      }
    });
  }

  return <BlogView />;
}
