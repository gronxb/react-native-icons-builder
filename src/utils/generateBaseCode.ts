import path from "path";
import type { Config } from "./config";
import { getCwd, getDirname } from "./cwd";
import fs from "fs/promises";

export const generateBaseCode = async (config: Config) => {
  const iconBase = config.typescript ? "iconBase.tsx" : "iconBase.jsx";
  const iconContext = config.typescript ? "iconContext.tsx" : "iconContext.jsx";

  const templatesPath = path.join(getDirname(), "..", "templates");
  const outputPath = path.join(getCwd(), config.outputPath);

  await fs.mkdir(outputPath, { recursive: true });
  await Promise.all([
    fs.copyFile(
      path.join(templatesPath, iconBase),
      path.join(outputPath, iconBase)
    ),
    fs.copyFile(
      path.join(templatesPath, iconContext),
      path.join(outputPath, iconContext)
    ),
  ]);
};
