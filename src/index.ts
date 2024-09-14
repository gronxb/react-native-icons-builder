#!/usr/bin/env node

import { dependencies, version } from "@/package.json";
import { program } from "commander";
import pc from "picocolors";
import { init } from "./commands/init";
import { add } from "./commands/add";

program.version(
  [
    pc.green(`react-native-icons-builder: ${version}`),
    pc.green(`react-icons: ${dependencies["react-icons"]}`),
  ].join("\n")
);

program.description(
  "Generate React Native icons from React Icons. It uses SWC to transform the React Icons code to a React Native component."
);

program.command("init").description("Initialize the project").action(init);

program
  .command("add")
  .description("Add an icon to the project")
  .argument("<icon-name>", "The name of the icon to add")
  .action(add);

program.parse();
