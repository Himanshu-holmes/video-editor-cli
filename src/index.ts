#!/usr/bin/env node

import { program } from "commander";
import { sayHello } from "./commands/helloCommand";
import { trim } from "./commands/trim";

program.version("1.0.0").description("My TypeScript CLI");

program.command("hello <c>").description("Say hello").action(sayHello);
program.option(
  "-t, --trim <start>",
  "Trim a video from start time for a given duration"
);
program.parse(process.argv);

const option = program.opts();
if (option.trim) {
    
    if (!option.trim.includes("-")){
        console.error(`please give duration to trim like this "00:00:00-00:10:20" `)
        process.exit(1)
    }
    console.log(option.trim.includes("-"));
  trim(option.trim);
}

console.log("options", option);
