import { exec } from "child_process";

// Helper function to execute shell commands
export const runCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      resolve(stdout || stderr);
    });
  });
};
