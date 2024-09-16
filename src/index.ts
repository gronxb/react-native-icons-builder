#!/usr/bin/env node

import { dependencies, version } from "@/package.json";
import { program } from "commander";
import pc from "picocolors";
import { init } from "./commands/init";
import { add } from "./commands/add";
import { sync } from "./commands/sync";

program.version(
  [
    pc.green(`react-native-icons-builder: ${version}`),
    pc.green(`react-icons: ${dependencies["react-icons"]}`),
  ].join("\n")
);

program.description(
  "Generate React Native icons from React Icons. It uses SWC to transform the React Icons code to a React Native component."
);

program
  .command("init")
  .description("Initialize the project")
  .action(async () => {
    await init();
  });

program
  .command("add")
  .description("Add icons to the project")
  .argument("<icon-name>", "The names of the icon to add")
  .action(add);

program
  .command("sync")
  .description("Sync the icons to the project")
  .action(sync);

program.parse();
