import path from "path";
import fs from "fs/promises";
import { z } from "zod";
import { getCwd } from "./cwd";
import { uniq } from "./uniq";
import { existsSync } from "fs";

export const configSchema = z.object({
  typescript: z.boolean(),
  outputPath: z.string(),
  icons: z.array(z.string()),
});

export type Config = z.infer<typeof configSchema>;

export const loadConfig = async () => {
  const cwd = getCwd();

  const config = await fs
    .readFile(path.join(cwd, "react-native-icons-builder.json"), "utf8")
    .then((data) => {
      return configSchema.parse(JSON.parse(data));
    });

  return config;
};

export const addIcons = async (iconNames: string[]) => {
  const config = await loadConfig();
  const updatedIcons = uniq([...config.icons, ...iconNames]);
  config.icons = updatedIcons;

  return initConfig(config);
};

export const initConfig = async (config: Config) => {
  const cwd = getCwd();

  const data = configSchema.parse(config);

  await fs.writeFile(
    path.join(cwd, "react-native-icons-builder.json"),
    JSON.stringify(configSchema.parse(config), null, 2),
    "utf8"
  );
  return data;
};

export const checkIfConfigExists = () => {
  const cwd = getCwd();
  return existsSync(path.join(cwd, "react-native-icons-builder.json"));
};
