import { exec, execSync } from "node:child_process";


import { stderr, stdout } from "node:process";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function trim(timeline:string) {
      const splitTimeline = timeline.split("-")
      const start = splitTimeline[0]
      const end = splitTimeline[1]
      console.error(start,end)
//   console.log(`path: ${__dirname}`);

const repoPath = execSync("git rev-parse --show-toplevel").toString().trim();
  // Construct absolute path to the video file
  const videoPath = `${repoPath}/videos/Sanam.Teri.Kasam.2016.1080p.Hindi.BluRay.5.1.ESub.x264-HDHub4u.Tv.mkv`;
  const outputPath = `${__dirname}/../../output/clip.mkv`;
  console.log("Repo Path:", repoPath);


  const ffmpegCommand = `ffmpeg -i "${videoPath}" -ss ${start} -t ${end} -async 1 "${outputPath}"`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
// export function loadVideo() {}
