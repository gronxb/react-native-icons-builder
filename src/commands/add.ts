import { syncIcons } from "../utils/generateIcon";
import { addIcons, checkIfConfigExists } from "../utils//config";
import { generateBaseCode } from "../utils/generateBaseCode";
import { init } from "./init";
import { checkAvailableIcons } from "../utils/checkAvailableIcons";
import { groupIconsByPrefix } from "../utils/groupIconsByPrefix";
import { log } from "../utils/console";

export const add = async (iconNames: string[]) => {
  try {
    if (!checkIfConfigExists()) {
      await init();
    }

    const groupedIcons = groupIconsByPrefix(iconNames);
    await Promise.all(
      groupedIcons.map(async ([prefix, icons]) => {
        if (!(await checkAvailableIcons(prefix, icons))) {
          throw new Error(`Not found ${icons.join(", ")}`);
        }
      })
    );

    const config = await addIcons(iconNames);
    await generateBaseCode(config);
    await syncIcons(config);
  } catch (error) {
    if (error instanceof Error) {
      log.error(error.message);
    } else {
      console.error(error);
    }
  }
};
