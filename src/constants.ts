import { execSync } from "node:child_process";

// Construct absolute path to the video file
export const videoPath = `/videos/`;
export const outputPath = `/output/`;
export const repoPath = execSync("git rev-parse --show-toplevel").toString().trim();