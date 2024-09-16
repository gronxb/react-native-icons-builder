import { checkIfConfigExists, loadConfig } from "../utils//config";
import { generateBaseCode } from "../utils/generateBaseCode";
import { init } from "./init";
import { log } from "../utils/console";
import { isCancel, select } from "@clack/prompts";
import { IconManager } from "src/iconManager";
import pc from "picocolors";

export const add = async (iconName: string) => {
  try {
    if (!checkIfConfigExists()) {
      await init();
    }
    const config = await loadConfig();
    const iconManager = new IconManager(config);

    const splitIconName = iconName.split("/");
    if (splitIconName.length >= 3) {
      log.error("Invalid icon name");
      return;
    }
    const [prefixOverride, iconNameToUse] =
      splitIconName.length === 2 ? splitIconName : [null, iconName];

    async function checkPrefixExists(prefix: string, icon: string) {
      const exists = await iconManager.checkIfIconExists(prefix, icon);
      return exists ? [prefix] : [];
    }

    async function getDefaultPrefixes(icon: string) {
      return await iconManager.getResolutionPrefixes(icon);
    }

    const undecidedPrefixes = prefixOverride
      ? await checkPrefixExists(prefixOverride, iconNameToUse)
      : await getDefaultPrefixes(iconNameToUse);

    if (undecidedPrefixes.length === 0) {
      log.notFound(iconNameToUse);
      return;
    }

    const prefix =
      undecidedPrefixes.length === 1
        ? undecidedPrefixes[0]
        : await select({
            message: "Pick a prefix.",
            options: undecidedPrefixes.map((prefix) => ({
              value: prefix,
              label: prefix,
            })),
          });

    if (isCancel(prefix)) {
      log.error("Operation cancelled");
      return;
    }

    await iconManager.addIcon(prefix as string, iconNameToUse);
    await generateBaseCode(config);
    await iconManager.sync();
    console.log(`${pc.green("Add")} ${iconNameToUse}`);
    console.log(
      pc.gray(`import { ${iconNameToUse} } from "${config.outputPath}/${prefix}";

<${iconNameToUse} size={24} />`)
    );
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
    } else {
      console.error(error);
    }
  }
};
