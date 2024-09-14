import { syncIcons } from "../utils/generateIcon";
import { addIcons, checkIfConfigExists } from "../utils//config";
import { generateBaseCode } from "../utils/generateBaseCode";
import { init } from "./init";

export const add = async (iconNames: string[]) => {
  try {
    if (!checkIfConfigExists()) {
      await init();
    }
    const config = await addIcons(iconNames);
    await generateBaseCode(config);
    await syncIcons(config);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
