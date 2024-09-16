import { checkIfConfigExists, loadConfig } from "../utils//config";
import { generateBaseCode } from "../utils/generateBaseCode";
import { init } from "./init";
import { log } from "../utils/console";
import { isCancel, select } from "@clack/prompts";
import { IconManager } from "src/iconManager";

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

    const overridePrefix = splitIconName.length === 2 ? splitIconName[0] : null;
    const $iconName = splitIconName.length === 2 ? splitIconName[1] : iconName;

    const undecidedPrefixes = !overridePrefix
      ? await iconManager.getResolutionPrefixes($iconName)
      : [overridePrefix];

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

    await iconManager.addIcon(prefix as string, $iconName);
    await generateBaseCode(config);
    await iconManager.sync();
    log.success("Icon added successfully");
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
    } else {
      console.error(error);
    }
  }
};
