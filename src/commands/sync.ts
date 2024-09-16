import { IconManager } from "../iconManager";
import { loadConfig } from "../utils/config";
import { generateBaseCode } from "../utils/generateBaseCode";

export const sync = async () => {
  try {
    const config = await loadConfig();
    const iconManager = new IconManager(config);
    await generateBaseCode(config);
    await iconManager.sync();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
