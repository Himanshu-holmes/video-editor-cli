import { exec, execSync } from "node:child_process";

import { stderr, stdout } from "node:process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { runCommand } from "../utils/helper";
import { randomUUID } from "node:crypto";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

export async function trim(
  timeline: string,
  videoPath: string,
  outputPath: string
) {
  const start = timeline[0];
  const end = timeline[1];




  const uuid = randomUUID();
  const ffmpegCommand = `ffmpeg -i "${videoPath}" -ss ${start} -t ${end} -async 1 "${outputPath}${uuid}.mp4"`;

  try {
    const response = await runCommand(ffmpegCommand);
    console.log("your file name is ", `${outputPath}${uuid}.mp4`);
  } catch (error) {
    console.error("error", error);
  }
}
// export function loadVideo() {}
