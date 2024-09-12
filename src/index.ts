#!/usr/bin/env node
import { program } from "commander";
import { version, dependencies } from "@/package.json";
import pc from "picocolors";
import { generateIcon } from "./generateIcon";

program.version(
  [
    pc.green(`react-native-icons-generator: ${version}`),
    pc.green(`react-icons: ${dependencies["react-icons"]}`),
  ].join("\n")
);

program.description(
  "Generate React Native icons from React Icons. It uses SWC to transform the React Icons code to a React Native component."
);

program
  .command("add")
  .description("Add an icon to the project")
  .argument("<icon-name>", "The name of the icon to add")
  .action((iconName: string) => {
    console.log("Generating icons...");
    try {
      generateIcon(iconName);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
    }
  });

program.parse();
