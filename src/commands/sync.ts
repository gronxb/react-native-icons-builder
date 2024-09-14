import { syncIcons } from "../utils/generateIcon";
import { loadConfig } from "../utils/config";
import { generateBaseCode } from "../utils/generateBaseCode";

export const sync = async () => {
  try {
    const config = await loadConfig();
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
