import fs  from "fs"
import path from "path";
import { outputFolder, repoPath, videoFolder } from "../constants";
export function sayHello(name: string): void {
  console.log(`Hello, ${name}!`);
  
}

export function createFoldersIfNotExist():void{
  let vdPath =  path.join(repoPath,videoFolder)
  let otPath = path.join(repoPath,outputFolder)
  const isExistVd = fs.existsSync(vdPath)
  if(!isExistVd){
    fs.mkdirSync(vdPath,{recursive:true})
  }
  const isExistOt = fs.existsSync(otPath);
  if(!isExistOt){
    fs.mkdirSync(otPath)
  }
  
}
