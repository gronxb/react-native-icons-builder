import path from "path";
import { getCwd } from "./cwd";
import fs from "fs/promises";
import { log } from "./console";

export const saveIconCode = async (
  outputPath: string,
  filename: string,
  code: string
) => {
  const cwd = getCwd();
  const $outputPath = path.join(cwd, outputPath);
  await fs.mkdir($outputPath, { recursive: true });

  await fs.writeFile(path.join($outputPath, filename), code, "utf8");
};
