#!/usr/bin/env node

import { program } from "commander";
import { createFoldersIfNotExist, sayHello } from "./commands/helloCommand";
import { trim } from "./commands/trim";
import { execSync } from "child_process";

import { mergeVideos } from "./commands/merge";
import { outputPath, videoPath } from "./constants";

program.version("1.0.0").description("My TypeScript CLI");

program.command("vde").description("Say hello")
.action(createFoldersIfNotExist);
program.option(
  "-t, --trim <values...>",
  "Trim a video from start time for a given duration"
).option("-f,--filename <filename>","filename to trim")
program.option("-m,--merge <videos...>","Merge two videos ")
program.parse(process.argv);

const option = program.opts();

const repoPath = execSync("git rev-parse --show-toplevel").toString().trim();
console.log("trim optinssssss",option.trim,option.filename)
if (option.trim && option.filename) {
  
  const filename = option.filename
  trim(option.trim,repoPath+videoPath+filename,repoPath+outputPath);
}
if(option.merge){
   if(option.merge.length < 2){
    console.error("Please provide atleast two videos ")
   }
   const videofilePaths = option.merge.map((pt:string)=> repoPath+videoPath+pt)
   console.log("filepaths",videofilePaths)
   console.log("repo path",repoPath)
   mergeVideos(videofilePaths,repoPath+outputPath);
}


console.log("options", option);

// Example usage
// const video1Path = `${repoPath}/videos/clip.mkv`;
// const video2Path = `${repoPath}/videos/new.mkv`;
// const outputPath = `${repoPath}/output/merged_output.mp4`;

