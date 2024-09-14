import { syncIcons } from "../utils/generateIcon";
import { addIcon } from "../utils//config";

export const add = async (iconName: string) => {
  try {
    const config = await addIcon(iconName);
    await syncIcons(config);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
