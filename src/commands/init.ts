import * as p from "@clack/prompts";
import { initConfig } from "../utils/config";
import { log } from "../utils/console";

export const init = async () => {
  const config = await p.group(
    {
      typescript: () =>
        p.confirm({
          message: "Would you like to enable TypeScript support?",
        }),
      outputPath: () =>
        p.text({
          message: "Specify the directory for saving icons:",
          placeholder: "assets/icons",
          initialValue: "assets/icons",
        }),
    },
    {
      onCancel: ({ results }) => {
        p.cancel("cancelled.");
        process.exit(0);
      },
    }
  );

  try {
    const result = await initConfig({
      ...config,
      icons: [],
    });
    log.success("Project initialized successfully.");
    log.success(
      "Use `npx react-native-icons-builder add <icon-name>` to add an icon."
    );
    log.link(
      "Click here to explore available icons",
      "https://react-icons.github.io/react-icons/"
    );
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};
