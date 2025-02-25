import { execSync } from "node:child_process";

// Construct absolute path to the video file
export const videoFolder = `/videos/`;
export const outputFolder = `/output/`;
export const repoPath = execSync("git rev-parse --show-toplevel").toString().trim();