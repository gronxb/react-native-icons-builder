import pc from "picocolors";

export const log = {
  success: (message: string) => {
    console.log(pc.green(message));
  },
  link: (message: string, link: string) => {
    console.log(`\x1b]8;;${link}\x1b\\${message}\x1b]8;;\x1b\\`);
  },
  error: (message: string) => {
    console.log(pc.red(message));
  },
  notFound: (message: string) => {
    console.log(`${pc.red("Not Found:")} ${pc.bgRed(message)}`);
  },
};
