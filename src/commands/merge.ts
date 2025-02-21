import { writeFileSync } from "fs";
import path from "path";
import { runCommand } from "../utils/helper";



// Function to get video information
const getVideoInfo = async (filePath: string): Promise<{ codec: string; resolution: string; frameRate: string }> => {
  const command = `ffprobe -v error -select_streams v:0 -show_entries stream=codec_name,width,height,r_frame_rate -of json "${filePath}"`;
  const output = await runCommand(command);
  const videoData = JSON.parse(output).streams[0];

  return {
    codec: videoData.codec_name,
    resolution: `${videoData.width}x${videoData.height}`,
    frameRate: videoData.r_frame_rate,
  };
};

// Function to conditionally merge multiple videos
export const mergeVideos = async (videos: string[], output: string) => {
  try {
    if (videos.length < 2) {
      console.log("❌ Need at least two videos to merge.");
      return;
    }

    // Get video info for all videos
    const videoInfo = await Promise.all(videos.map(getVideoInfo));

    // Check if all videos have the same properties
    const firstVideo = videoInfo[0];
    const allSameFormat = videoInfo.every(
      (info) =>
        info.codec === firstVideo.codec &&
        info.resolution === firstVideo.resolution &&
        info.frameRate === firstVideo.frameRate
    );

    if (allSameFormat) {
      console.log("✅ Videos are compatible. Using fast merging (no re-encoding).");

      // Create input list file
      const fileList = path.join(__dirname, "input.txt");
      writeFileSync(fileList, videos.map((v) => `file '${v}'`).join("\n"));

      // Merge using direct concatenation
      const concatCommand = `ffmpeg -f concat -safe 0 -i "${fileList}" -c copy "${output}"`;
      await runCommand(concatCommand);
    } else {
      console.log("⚠️ Videos have different properties. Re-encoding is required.");

      // Build FFmpeg command dynamically
      const inputFiles = videos.map((v) => `-i "${v}"`).join(" ");
      const filterComplex = videos
        .map((_, index) => `[${index}:v:0][${index}:a:0]`)
        .join("") + `concat=n=${videos.length}:v=1:a=1[outv][outa]`;

      const encodeCommand = `ffmpeg ${inputFiles} -filter_complex "${filterComplex}" -map "[outv]" -map "[outa]" "${output}"`;
      await runCommand(encodeCommand);
    }

    console.log(`🎉 Merging complete! Output file: ${output}`);
  } catch (error) {
    console.error("❌ Error merging videos:", error);
  }
};

// Example usage
// const repoPath = execSync("git rev-parse --show-toplevel").toString().trim();
// // Example usage
// const video1Path = "video1.mp4";
// const video2Path = "video2.mp4";
// const outputPath = "merged_output.mp4";

// mergeVideos(video1Path, video2Path, outputPath);
