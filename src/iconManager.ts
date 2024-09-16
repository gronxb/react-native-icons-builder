import { initConfig, type Config } from "./utils/config";
import fs from "fs/promises";
import { separateCamelCase } from "./utils/separateCamelCase";
import { uniq } from "./utils/uniq";
import { log } from "./utils/console";
import { generateIconCode } from "./utils/generateIcon";
import { saveIconCode } from "./utils/saveIconCode";

export class IconManager {
  private config: Config;

  private _groupedIcons: [string, string[]][] = [];

  private _prefixCodeMap: Map<string, string> = new Map();

  private _resolutionTable: Record<string, string[]> = {
    fa: ["fa", "fa6"],
    hi: ["hi", "hi2"],
    io: ["io", "io5"],
  };

  constructor(config: Config) {
    this.config = config;
  }

  private get icons() {
    return this.config.icons;
  }

  public async getResolutionPrefixes(iconName: string) {
    const [prefix] = await separateCamelCase(iconName);
    const lowerCasePrefix = prefix.toLowerCase();

    const result: string[] = [];
    const resolutionPrefixes = this._resolutionTable[lowerCasePrefix] ?? [
      lowerCasePrefix,
    ];

    for (const prefix of resolutionPrefixes) {
      try {
        const iconCode = await this.getIconCodeByPrefix(prefix);
        if (iconCode?.includes(iconName)) {
          result.push(prefix);
        }
      } catch {}
    }

    return result;
  }

  public async getIconCodeByPrefix(prefix: string) {
    if (!this._prefixCodeMap.has(prefix)) {
      try {
        const prefixPath = await import.meta
          .resolve(`react-icons/${prefix}`)
          .replace("file://", "");

        const prefixCode = await fs.readFile(prefixPath, "utf8");
        this._prefixCodeMap.set(prefix, prefixCode);
      } catch {
        return null;
      }
    }

    return this._prefixCodeMap.get(prefix);
  }

  private groupIconsByPrefix() {
    const groupedIcons: { [key: string]: string[] } = {};

    for (const icon of this.icons) {
      const [prefix, name] = icon.split("/");
      if (!groupedIcons[prefix]) {
        groupedIcons[prefix] = [];
      }
      groupedIcons[prefix].push(name);
    }
    return Object.entries(groupedIcons);
  }

  get groupedIcons() {
    if (!this._groupedIcons.length) {
      this._groupedIcons = this.groupIconsByPrefix();
    }

    return this._groupedIcons;
  }

  public async addIcon(prefix: string, iconName: string) {
    const updatedIcons = uniq([...this.icons, `${prefix}/${iconName}`]);
    this.config.icons = updatedIcons;
    return initConfig(this.config);
  }

  public async sync() {
    const groupedIcons = this.groupedIcons;

    await Promise.allSettled(
      groupedIcons.map(async ([prefix, icons]) => {
        try {
          const data = await generateIconCode(
            prefix,
            icons,
            this.config.typescript
          );
          await saveIconCode(this.config.outputPath, data.filename, data.code);
        } catch (error) {
          log.error(`Not found ${prefix}`);
        }
      })
    );
  }
}
