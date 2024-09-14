import { syncIcons } from "../utils/generateIcon";
import { loadConfig } from "../utils/config";

export const sync = async () => {
  try {
    const config = await loadConfig();
    await syncIcons(config);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
