import path from "path";
import type { Config } from "./config";
import { getCwd, getDirname } from "./cwd";
import fs from "fs/promises";
import { log } from "./console";
import { existsSync } from "fs";
import packageJson from "@/package.json";

const copyFile = async (src: string, dest: string) => {
  if (existsSync(dest)) {
    return;
  }

  const content = await fs.readFile(src, "utf8");
  const newContent = [
    `// Generated by react-native-icons-builder v${packageJson.version}`,
    content,
  ].join("\n");

  await fs.writeFile(dest, newContent, "utf8");
};

export const generateBaseCode = async (config: Config) => {
  const iconBase = config.typescript ? "iconBase.tsx" : "iconBase.jsx";
  const iconContext = config.typescript ? "iconContext.tsx" : "iconContext.jsx";

  const templatesPath = path.join(getDirname(), "..", "templates");
  const outputPath = path.join(getCwd(), config.outputPath);

  await fs.mkdir(outputPath, { recursive: true });
  await Promise.all([
    copyFile(
      path.join(templatesPath, iconBase),
      path.join(outputPath, iconBase)
    ).then(() => log.save(path.join(config.outputPath, iconBase))),
    copyFile(
      path.join(templatesPath, iconContext),
      path.join(outputPath, iconContext)
    ).then(() => log.save(path.join(config.outputPath, iconContext))),
  ]);
};
