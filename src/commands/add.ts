import { syncIcons } from "../utils/generateIcon";
import { addIcons } from "../utils//config";
import { generateBaseCode } from "../utils/generateBaseCode";

export const add = async (iconNames: string[]) => {
  try {
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
